"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Pause, Play, Quote } from "lucide-react";
import styles from "./Reviews.module.css";

// Publish only genuine reviews with permission to display the reviewer's name.
type Review = { name: string; text: string; authorUrl?: string; url?: string; date?: string };
const FACEBOOK = "https://www.facebook.com/share/1DHdrPcL7u/?mibextid=wwXIfr";

export default function Reviews() {
  const [paused, setPaused] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewUrl, setReviewUrl] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [attributions, setAttributions] = useState<{ name: string; url?: string }[]>([]);
  const [shareStatus, setShareStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const section = useRef<HTMLElement>(null);
  const displayed = reviews;

  useEffect(() => {
    const controller = new AbortController();
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      fetch("/api/reviews", { signal: controller.signal }).then(response => response.json()).then(data => {
        setReviews(data.reviews ?? []);
        setReviewUrl(data.reviewUrl ?? "");
        setMapsUrl(data.mapsUrl ?? "");
        setAttributions(data.attributions ?? []);
      }).catch(() => { /* Keep the invitation usable when Google is unavailable. */ });
    }, { rootMargin: "200px" });
    if (section.current) observer.observe(section.current);
    return () => { controller.abort(); observer.disconnect(); };
  }, []);

  async function share() {
    const url = reviewUrl || `${window.location.origin}/#reviews`;
    try {
      if (navigator.share) await navigator.share({ title: "Share your experience with Isikhumbulo Memorial", url });
      else { await navigator.clipboard.writeText(url); setShareStatus("Review link copied."); }
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) setShareStatus(`Copy this link: ${url}`);
    }
  }
  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setFormStatus("Sending…");
    try {
      const response = await fetch("/api/reviews", { method: "POST", body: new FormData(event.currentTarget), signal: AbortSignal.timeout(30000) });
      const result = await response.json().catch(() => ({}));
      setFormStatus(response.ok ? "Thank you. Your review will appear after our team approves it." : (result.error || "We couldn’t send your review. Please try again."));
      if (response.ok) event.currentTarget.reset();
    } catch { setFormStatus("We couldn’t connect. Please try again."); }
    finally { setSending(false); }
  }
  return (
    <section ref={section} id="reviews" aria-labelledby="reviews-title" className={styles.section} data-paused={paused}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}><span /> REVIEWS &amp; REFLECTIONS</p>
            <h2 id="reviews-title">A lasting tribute.<br /><em>A personal experience.</em></h2>
          </div>
          <p className={styles.intro}>Behind every memorial is a family, a story, and a moment that matters. Your experience deserves to be heard.</p>
        </div>

        {displayed.length ? <div className={styles.reviews} aria-label="Customer reviews from Google Maps">
          {displayed.map(review => <figure key={review.name + review.text} className={styles.review}>
            <p className={styles.eyebrow}>CUSTOMER REVIEW</p>
            <Quote size={32} aria-hidden="true" />
            <blockquote>{review.text}</blockquote>
            <figcaption>{review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noreferrer">{review.name}</a> : review.name}{review.date && <p>{review.date}</p>}{review.url && <a href={review.url} target="_blank" rel="noreferrer">Read on Google Maps ↗</a>}</figcaption>
          </figure>)}
        </div> : <div className={styles.invitation}>
          <div className={styles.art} aria-hidden="true">
            <div className={styles.orbit} /><div className={styles.orbitInner} />
            <Quote className={styles.quote} strokeWidth={0.8} />
            <span className={styles.artLabel}>EVERY EXPERIENCE MATTERS</span>
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>YOUR WORDS, IN YOUR OWN TIME</p>
            <h3>Share a little<br />of your <em>journey.</em></h3>
            <p>If we have helped your family create a memorial, we would love to hear about your experience. Your words can help another family take their first step.</p>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className={styles.cta}>Share your experience on Facebook <ArrowUpRight size={19} aria-hidden="true" /></a>
            <span className={styles.note}>Visit our Facebook page to leave your feedback.</span>
          </div>
        </div>}

        <form onSubmit={submitReview} className={styles.reviewForm} encType="multipart/form-data">
          <p className={styles.eyebrow}>SHARE YOUR EXPERIENCE</p>
          <div className={styles.formGrid}><input name="name" required maxLength={80} placeholder="Your name" aria-label="Your name" /><textarea name="text" required maxLength={1200} rows={3} placeholder="Tell us about your experience" aria-label="Your review" /><label className={styles.upload}>Add a photo (optional)<input type="file" name="photo" accept="image/jpeg,image/png,image/webp" /></label><button type="submit" disabled={sending} className={styles.cta}>{sending ? "Sending…" : "Submit review"} <ArrowUpRight size={18} /></button></div>
          <p role="status" className={styles.note}>{formStatus}</p>
        </form>
        <div className={styles.reviewActions}>
          <a href={reviewUrl || FACEBOOK} target="_blank" rel="noreferrer" className={styles.cta}>{reviewUrl ? "Leave a Google review" : "Leave feedback on Facebook"} <ArrowUpRight size={18} /></a>
          <button type="button" onClick={share} className={styles.cta}>Share review link <ArrowUpRight size={18} /></button>
          {mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer" className={styles.note}>Reviews supplied by Google Maps · View all reviews ↗</a>}
          {attributions.map(item => <span key={item.name} className={styles.note}>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.name}</a> : item.name}</span>)}
          <p role="status" className={styles.note}>{shareStatus}</p>
        </div>
        <div className={styles.bottom}>
          <p>Remembered with love. Shared with care.</p>
          <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play reviews section animation" : "Pause reviews section animation"} className={styles.motionControl}>
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />} {paused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </div>
      <div className={styles.ribbon} aria-hidden="true"><div className={styles.track}>{[0, 1].map(index => <span key={index}>YOUR STORY <i>✦</i> YOUR EXPERIENCE <i>✦</i> YOUR WORDS <i>✦</i> </span>)}</div></div>
    </section>
  );
}
