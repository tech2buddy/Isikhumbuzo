import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const googleKey = process.env.GOOGLE_PLACES_API_KEY;
  const reviewUrl = placeId ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}` : undefined;
  let googleReviews: unknown[] = [];
  if (placeId && googleKey) {
    try { const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, { headers: { "X-Goog-Api-Key": googleKey, "X-Goog-FieldMask": "reviews,googleMapsUri" }, cache: "no-store" }); const data = await response.json(); googleReviews = (data.reviews ?? []).map((review: { text?: { text?: string }; authorAttribution?: { displayName?: string } }) => ({ name: review.authorAttribution?.displayName ?? "Google reviewer", text: review.text?.text ?? "" })).filter((review: { text: string }) => review.text); } catch { /* Keep Supabase reviews available. */ }
  }
  if (!url || !serviceKey) return reply({ reviews: googleReviews, reviewUrl, configured: false });
  try { const response = await fetch(`${url}/rest/v1/reviews?select=id,name,review_text,photo_path,created_at&approved=eq.true&order=created_at.desc&limit=12`, { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` }, cache: "no-store" }); const data = await response.json(); return reply({ reviews: [...data.map((review: { name: string; review_text: string; photo_path?: string }) => ({ name: review.name, text: review.review_text, photoUrl: review.photo_path ? `${url}/storage/v1/object/public/review-photos/${review.photo_path}` : undefined })), ...googleReviews], reviewUrl, configured: true }); } catch { return reply({ reviews: googleReviews, reviewUrl, configured: false }); }
}

export async function POST(request: Request) {
  if (!url || !serviceKey) return reply({ error: "Reviews are not configured yet." }, 503);
  let form: FormData;
  try { form = await request.formData(); } catch { return reply({ error: "Invalid review form." }, 400); }
  const name = String(form.get("name") ?? "").trim(); const text = String(form.get("text") ?? "").trim();
  if (name.length < 2 || name.length > 80 || text.length < 10 || text.length > 1200) return reply({ error: "Please provide a name and review." }, 400);
  const insert = await fetch(`${url}/rest/v1/reviews`, { method: "POST", headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ name, review_text: text }) });
  return insert.ok ? reply({ ok: true }, 201) : reply({ error: "Review could not be saved." }, 502);
}
