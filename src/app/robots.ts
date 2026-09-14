import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://isikhumbulo.co.za/sitemap.xml",
    host: "https://isikhumbulo.co.za",
  };
}
