# Search setup for Isikhumbulo Memorial

Preferred public URL: https://www.isikhumbulo.co.za/
The non-www domain currently redirects permanently to this address. Metadata, structured data and the sitemap now match it.

## After deploying

1. Open https://search.google.com/search-console and add a **Domain** property: `isikhumbulo.co.za` (no protocol or www). This covers both hostnames.
2. Follow Google's DNS verification. If it supplies a TXT value, add a TXT record in GoDaddy with name `@`, the exact value from Google, and default TTL. Keep the existing records. Return to Search Console and Verify. Keep this verification record afterward.
3. In Sitemaps, submit `https://www.isikhumbulo.co.za/sitemap.xml`.
4. In URL Inspection, inspect `https://www.isikhumbulo.co.za/` and `https://www.isikhumbulo.co.za/catalog`. Use Test Live URL, then Request Indexing when eligible.
5. Check Page indexing for errors. In URL Inspection, confirm Google's selected canonical matches the www URL. A non-www URL reported as a redirect is expected.
6. In the existing Google Business Profile, set the website to `https://www.isikhumbulo.co.za/`. Keep the real business name, phone and address consistent. Do not add spelling variants or keywords to the business name. Confirm profile ownership verification is complete.
7. The owner-provided Google Business Profile share link, `https://share.google/2WFNrU0Wueo6tCSlr`, is included in the site's business structured data. Its redirect destination could not be independently checked from the development environment.
8. After data appears, inspect Search Console Performance → Queries for branded searches. Search Console is more reliable than repeatedly searching Google manually to check indexing.

## AI discovery and name variations

Public pages are crawlable under robots.txt. No special AI file guarantees inclusion. Google AI search uses ordinary search eligibility. ChatGPT search uses OAI-SearchBot; the site's wildcard rules allow it to read public pages. Hosting firewall rules must also permit legitimate crawlers.

Use the correct brand consistently: Isikhumbulo Memorial. Existing short-name variants are Isikhumbulo and IsikhumbuloMemorial. Capitalisation does not require separate pages. Typos such as Isikhumbuzo or Iskhumbulo are not guaranteed to resolve to this business; don't create misleading alternate business names or pages stuffed with spelling errors. Discovery depends on indexing, relevance, real references and profile consistency. No ranking or AI recommendation is guaranteed.

Sources:
- https://support.google.com/webmasters/answer/9008080
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.openai.com/api/docs/bots
