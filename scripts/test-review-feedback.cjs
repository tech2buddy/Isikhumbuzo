const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

async function scenario(ok) {
  const state = []; let cursor = 0; let resolve; let resets = 0; let requests = 0;
  const pending = new Promise(done => { resolve = done; });
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync('src/components/Reviews.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, {
    exports, AbortSignal,
    FormData: class { constructor(form) { assert.ok(form, 'form must be captured before waiting'); } },
    fetch: () => { requests++; return pending; },
    require: id => id === 'react' ? {
      useState: initial => { const slot = cursor++; if (!(slot in state)) state[slot] = initial; return [state[slot], value => { state[slot] = value; }]; },
      useRef: initial => { const slot = cursor++; if (!(slot in state)) state[slot] = { current: initial }; return state[slot]; },
      useEffect: () => {},
    } : id === 'react/jsx-runtime' ? { jsx, jsxs: jsx } : id.endsWith('.css') ? { default: {} } : {},
  });
  const render = () => { cursor = 0; return exports.default(); };
  const find = (node, type) => {
    if (!node || typeof node !== 'object') return null;
    if (node.type === type) return node;
    for (const child of [node.props?.children].flat(Infinity)) { const result = find(child, type); if (result) return result; }
    return null;
  };
  const form = find(render(), 'form');
  const event = { preventDefault() {}, currentTarget: { reset() { resets++; } } };
  const submission = form.props.onSubmit(event);
  await form.props.onSubmit(event);
  assert.equal(requests, 1, 'rapid taps must not submit twice');
  event.currentTarget = null; // React clears this once the handler yields.
  resolve({ ok, json: async () => ok ? { ok: true } : { error: 'Please retry later.' } });
  await submission;
  const result = JSON.stringify(render());
  assert.equal(resets, ok ? 1 : 0);
  assert.equal(result.includes('Review sent successfully.'), ok);
  assert.ok(!result.includes('We couldn’t connect'));
  if (!ok) assert.ok(result.includes('Please retry later.'));
}
(async () => { await scenario(true); await scenario(false); console.log('PASS: success after React event cleanup, duplicate taps, and API failure feedback. No network requests sent.'); })().catch(error => { console.error(error); process.exitCode = 1; });
