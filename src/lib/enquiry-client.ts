export type EnquiryPayload = {
  codes?: string[];
  code?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

const receipts = new Map<string, number>();
const DAY = 24 * 60 * 60 * 1000;

// Store only a digest and expiry, never the visitor's personal details.
export async function sendEnquiry(payload: EnquiryPayload): Promise<"sent" | "already"> {
  const normalized = {
    codes: [...new Set(payload.codes ?? [payload.code ?? ""])].sort(),
    name: payload.name.trim(), email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(), location: payload.location.trim(), message: payload.message.trim(),
  };
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(normalized)));
  const key = "enquiry-receipt-v1:" + Array.from(new Uint8Array(bytes), n => n.toString(16).padStart(2, "0")).join("");
  let expiry = receipts.get(key) ?? 0;
  try { expiry = Math.max(expiry, Number(localStorage.getItem(key)) || 0); } catch { /* Storage may be blocked. */ }
  if (expiry > Date.now()) return "already";
  const response = await fetch("/api/enquiries", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized), signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error("Unable to send enquiry");
  const result = await response.json();
  if (!result.ok) throw new Error("Unable to confirm enquiry");
  expiry = Date.now() + DAY;
  receipts.set(key, expiry);
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const oldKey = localStorage.key(i);
      if (oldKey?.startsWith("enquiry-receipt-v1:") && Number(localStorage.getItem(oldKey)) <= Date.now()) localStorage.removeItem(oldKey);
    }
    localStorage.setItem(key, String(expiry));
  } catch { /* The server still protects retries when storage is unavailable. */ }
  return result.alreadySent ? "already" : "sent";
}
