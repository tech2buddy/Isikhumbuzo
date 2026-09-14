import { NextResponse } from "next/server";

const TO = "isikhumbulomemorial@gmail.com";
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });

  try {
    const body = await request.json();
    const required = ["name", "email", "phone", "code", "style"];
    if (required.some((field) => typeof body[field] !== "string" || !body[field].trim())) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    const code = escapeHtml(body.code.trim());
    const style = escapeHtml(body.style.trim());
    const name = escapeHtml(body.name.trim());
    const email = escapeHtml(body.email.trim());
    const phone = escapeHtml(body.phone.trim());
    const location = escapeHtml((body.location || "Not provided").trim());
    const message = escapeHtml((body.message || "No additional message.").trim()).replace(/\n/g, "<br>");
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || request.url).replace(/\/api\/enquiries.*$/, "").replace(/\/$/, "");
    const imageUrl = body.image ? `${siteUrl}${String(body.image).startsWith("/") ? body.image : `/${body.image}`}` : "";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Isikhumbulo Memorial <onboarding@resend.dev>",
        to: [TO],
        reply_to: body.email,
        subject: `Memorial enquiry — ${body.code}`,
        html: `<div style="margin:0;background:#090909;padding:32px 16px;font-family:Arial,sans-serif;color:#302b23"><div style="max-width:620px;margin:0 auto;background:#f7f4ed;border-top:4px solid #c89b3c"><div style="background:#090909;padding:28px 32px"><div style="font-size:12px;letter-spacing:3px;color:#e1bc66">ISIKHUMBULO MEMORIAL</div><div style="margin-top:8px;font-size:11px;letter-spacing:2px;color:#b8b5af">HONOURING EVERY LIFE · PRESERVING EVERY MEMORY</div></div><div style="padding:32px"><div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a742e">New personal enquiry</div><h1 style="margin:10px 0 24px;font-family:Georgia,serif;font-size:32px;font-weight:400;color:#15130f">Tombstone enquiry</h1>${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${code} memorial design" style="display:block;width:100%;max-height:360px;object-fit:contain;background:#15130f;margin-bottom:24px">` : ""}<div style="border:1px solid #c89b3c;background:#fff;padding:18px 20px;margin-bottom:24px"><div style="font-size:11px;letter-spacing:2px;color:#9a742e;text-transform:uppercase">Selected design</div><div style="margin-top:8px;font-family:Georgia,serif;font-size:26px;color:#15130f">${code}</div><div style="margin-top:5px;font-size:13px;color:#6b6257">${style} collection</div></div><table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6"><tr><td style="padding:7px 0;color:#9a742e;width:38%">Name</td><td style="padding:7px 0">${name}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Email</td><td style="padding:7px 0">${email}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Phone</td><td style="padding:7px 0">${phone}</td></tr><tr><td style="padding:7px 0;color:#9a742e">Location</td><td style="padding:7px 0">${location}</td></tr></table><div style="margin-top:24px;padding-top:18px;border-top:1px solid #d8c9a9;font-size:14px;line-height:1.7"><div style="font-size:11px;letter-spacing:2px;color:#9a742e;text-transform:uppercase;margin-bottom:8px">Message</div>${message}</div></div><div style="padding:18px 32px;background:#15130f;color:#b8b5af;font-size:11px;letter-spacing:1px">Reply directly to this email to contact the enquirer.</div></div></div>`,
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
      }),
    });

    if (!response.ok) return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The enquiry could not be sent." }, { status: 400 });
  }
}
