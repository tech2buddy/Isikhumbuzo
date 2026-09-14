import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { DESIGNS } from "@/lib/catalog";

const TO = "isikhumbulomemorial@gmail.com";
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });

  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16000) return NextResponse.json({ error: "Enquiry is too long." }, { status: 413 });
    const input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid enquiry");
    const fields: Record<string, string> = {};
    const limits: Record<string, number> = { name: 100, email: 160, phone: 30, location: 150, message: 1000 };
    for (const [field, limit] of Object.entries(limits)) {
      const value = input[field] ?? "";
      if (typeof value !== "string" || value.length > limit) throw new Error("Invalid field");
      fields[field] = value.trim();
    }
    fields.email = fields.email.toLowerCase();
    if (!fields.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !/^[+0-9() .-]{7,30}$/.test(fields.phone) || fields.phone.replace(/\D/g, "").length < 7) throw new Error("Invalid contact details");
    const rawCodes = input.codes ?? [input.code];
    if (!Array.isArray(rawCodes) || !rawCodes.length || rawCodes.length > DESIGNS.length || rawCodes.some((c: unknown) => typeof c !== "string")) throw new Error("Invalid designs");
    const codes = [...new Set<string>(rawCodes)].sort();
    const consultation = codes.length === 1 && codes[0] === "CONSULTATION";
    const designs = consultation ? [] : codes.map(code => {
      const design = DESIGNS.find(item => item.code === code);
      if (!design) throw new Error("Unknown design");
      return design;
    });
    const body: Record<string, string> = { ...fields, code: codes.join(", "), style: consultation ? "General consultation" : "Selected memorials" };
    const name = escapeHtml(body.name.trim());
    const email = escapeHtml(body.email.trim());
    const phone = escapeHtml(body.phone.trim());
    const location = escapeHtml((body.location || "Not provided").trim());
    const message = escapeHtml((body.message || "No additional message.").trim()).replace(/\n/g, "<br>");
    const designHtml = designs.map(design => `<div style="border:1px solid #c89b3c;padding:18px;margin-bottom:24px"><img src="https://isikhumbulo.co.za${design.image}" alt="${escapeHtml(design.code)}" style="display:block;width:100%;max-height:300px;object-fit:contain"><p style="font-family:Georgia,serif;font-size:26px">${escapeHtml(design.code)}</p><p>${escapeHtml(design.style)} collection</p></div>`).join("");
    const payload = {
        from: "Isikhumbulo Memorial <onboarding@resend.dev>",
        to: [TO],
        reply_to: body.email,
        subject: `Memorial enquiry — ${body.code}`,
        html: `<div style="margin:0;background:#090909;padding:32px 16px;font-family:Arial,sans-serif;color:#302b23"><div style="max-width:620px;margin:0 auto;background:#f7f4ed;border-top:4px solid #c89b3c"><div style="background:#090909;padding:28px 32px"><div style="font-size:12px;letter-spacing:3px;color:#e1bc66">ISIKHUMBULO MEMORIAL</div><div style="margin-top:8px;font-size:11px;letter-spacing:2px;color:#b8b5af">HONOURING EVERY LIFE · PRESERVING EVERY MEMORY</div></div><div style="padding:32px"><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a742e">New personal enquiry</div><h1 style="margin:10px 0 24px;font-family:Georgia,serif;font-size:32px;font-weight:400;color:#15130f">${consultation ? "Consultation request" : "Tombstone enquiry"}</h1>${designHtml}<table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6"><tr><td style="padding:7px 0;color:#9a742e;width:38%">Name</td><td style="padding:7px 0">${name}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Email</td><td style="padding:7px 0">${email}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Phone</td><td style="padding:7px 0">${phone}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Location</td><td style="padding:7px 0">${location}</td></tr></table><div style="margin-top:24px;padding-top:18px;border-top:1px solid #d8c9a9;font-size:14px;line-height:1.7"><div style="font-size:11px;letter-spacing:2px;color:#9a742e;text-transform:uppercase;margin-bottom:8px">Message</div>${message}</div></div><div style="padding:18px 32px;background:#15130f;color:#b8b5af;font-size:11px;letter-spacing:1px">Reply directly to this email to contact the enquirer.</div></div></div>`,
        text: [
          `New enquiry for ${body.code} (${body.style})`,
          "",
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Phone: ${body.phone}`,
          `Location: ${body.location || "Not provided"}`,
          "",
          body.message || "No additional message.",
        ].join("\n"),
    };
    // Provider-backed duplicate protection across server instances for 24 hours.
    const serialized = JSON.stringify(payload);
    const key = createHmac("sha256", apiKey).update(serialized).digest("hex");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `enquiry/${key}` },
      body: serialized, signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 400 });
  }
}
