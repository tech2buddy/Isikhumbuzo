const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const { webcrypto } = require('node:crypto');

function load(file, overrides = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require, Request, Response, AbortSignal, TextEncoder, process: { env: { RESEND_API_KEY: 'test-only-not-a-real-key' } }, ...overrides }, { filename: file });
  return exports;
}

async function main() {
  const catalog = load('src/lib/catalog.ts');
  const calls = [];
  let providerFails = false;
  const provider = async (_, options) => {
    calls.push(options);
    return Response.json(providerFails ? { error: 'temporary' } : { id: 'mock' }, { status: providerFails ? 503 : 200 });
  };
  const { POST } = load('src/app/api/enquiries/route.ts', {
    fetch: provider,
    require: id => id === 'next/server' ? { NextResponse: Response } : id === '@/lib/catalog' ? catalog : require(id),
  });
  const details = { codes: ['CGE33', 'GCE34'], name: '<Visitor>', email: 'visitor@example.com', phone: '0760990333', location: '', message: 'Please compare these.' };
  const post = body => POST(new Request('http://localhost/api/enquiries', { method: 'POST', body: JSON.stringify(body) }));
  assert.equal((await post(details)).status, 200);
  const email = JSON.parse(calls[0].body);
  assert.equal(email.to.length, 1);
  assert.match(email.html, /cge33.png/);
  assert.match(email.html, /gce34.png/);
  assert.match(email.html, /&lt;Visitor&gt;/);
  assert.ok(!email.html.includes('<Visitor>'));
  await Promise.all([post({ ...details, codes: ['GCE34', 'CGE33', 'CGE33'] }), post(details)]);
  assert.equal(new Set(calls.map(call => call.headers['Idempotency-Key'])).size, 1, 'simultaneous/reordered duplicates must share provider key');
  assert.equal(new Set(calls.map(call => call.body)).size, 1);
  await post({ ...details, codes: ['GCG42'] });
  assert.notEqual(calls.at(-1).headers['Idempotency-Key'], calls[0].headers['Idempotency-Key']);
  const beforeInvalid = calls.length;
  for (const invalid of [{ ...details, codes: ['FAKE'] }, { ...details, phone: 'abcdefgh' }, { ...details, message: {} }, { ...details, email: 'invalid' }, { ...details, codes: [] }]) assert.equal((await post(invalid)).status, 400);
  assert.equal(calls.length, beforeInvalid, 'invalid requests must never reach provider');
  assert.equal((await post({ ...details, message: 'x'.repeat(17000) })).status, 413);
  providerFails = true;
  assert.equal((await post(details)).status, 502);
  const retryKey = calls.at(-1).headers['Idempotency-Key'];
  providerFails = false;
  await post(details);
  assert.equal(calls.at(-1).headers['Idempotency-Key'], retryKey);
  assert.equal((await post({ ...details, codes: ['CONSULTATION'] })).status, 200);

  const storage = new Map();
  const localStorage = { get length() { return storage.size; }, key: i => [...storage.keys()][i], getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) };
  let browserCalls = 0;
  let clientFails = false;
  const clientEnv = { crypto: webcrypto, localStorage, fetch: async () => { browserCalls++; return Response.json({ ok: !clientFails }, { status: clientFails ? 502 : 200 }); } };
  const client = load('src/lib/enquiry-client.ts', clientEnv);
  assert.equal(await client.sendEnquiry(details), 'sent');
  assert.equal(await client.sendEnquiry(details), 'already');
  assert.equal(await load('src/lib/enquiry-client.ts', clientEnv).sendEnquiry(details), 'already', 'receipts survive reload');
  assert.equal(browserCalls, 1);
  clientFails = true;
  const different = { ...details, codes: ['GCG42'] };
  await assert.rejects(client.sendEnquiry(different));
  clientFails = false;
  assert.equal(await client.sendEnquiry(different), 'sent', 'failed sends remain retryable');
  assert.ok([...storage.keys()].every(key => !key.includes('visitor')));
  console.log('PASS: combined images, validation, stable provider keys, changed selections, retries, consultation compatibility and browser receipts. No real emails sent.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
