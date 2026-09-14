import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://isikhumbulo.co.za";
  return ["", "/catalog", "/privacy-policy", "/terms-of-service", "/site-map"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "/catalog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/catalog" ? 0.9 : 0.3,
  }));
}
