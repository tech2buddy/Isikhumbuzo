import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  return ["", "/catalog", "/privacy-policy", "/terms-of-service", "/site-map"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/catalog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/catalog" ? 0.9 : 0.3,
  }));
}
