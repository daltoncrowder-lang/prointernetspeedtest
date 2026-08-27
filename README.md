# Pro Internet Speed Test

Astro static site + Cloudflare Pages Functions. The content pages are pre-rendered
HTML (per-route, for SEO); the speed test runs client-side against our own
`/api/*` Functions, which stream test data over Cloudflare's edge — **no egress
billing**, no third-party endpoints, no user data leaving the browser.

## Stack
- **Astro** — static per-route HTML for the homepage, guides, FAQ, About, Privacy.
- **Cloudflare Pages** — hosting + build.
- **Pages Functions** (`/functions/api/*`) — `download`, `upload`, `ping` endpoints.

## Local dev
```bash
npm install
npm run dev      # site only; /api/* needs the Cloudflare runtime (see below)
npm run build    # outputs to dist/
```
To test the `/api/*` Functions locally, use Wrangler:
```bash
npx wrangler pages dev dist
```

## Deploy to Cloudflare Pages
1. Push this folder to a GitHub repo. **Important:** the repo root must contain
   `src/`, `public/`, `functions/`, `package.json`, and `astro.config.mjs`
   directly — don't nest them inside another folder and don't upload a zip.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Functions are auto-detected from `/functions` — nothing to configure.
4. Add the custom domain `prointernetspeedtest.com` under the project's
   **Custom domains** tab.
5. After deploy, sanity-check the endpoints: open
   `https://<your-domain>/api/ping` (should return `pong`) and run a full test.

## Cost
- Functions run on Cloudflare with **zero egress/bandwidth charges**.
- Free tier: 100,000 Function requests/day. Each speed test makes roughly
  15–40 requests, so ~2,500–6,000 tests/day fit the free tier.
- Beyond that it's the flat **$5/mo** Workers Paid plan (10M requests included),
  still with no bandwidth charges.

## AdSense — manual steps
Publisher ID `pub-5419958342829322` is already wired in.
1. **Ad units:** create in-article units in AdSense → *Ads → By ad unit*, then
   paste each `data-ad-slot` id into the `<AdSlot slot="…" />` usages
   (About, FAQ, and the three guides). The tool/homepage is intentionally ad-free.
2. **Consent (EEA/UK/CH):** in AdSense → *Privacy & messaging*, publish the
   certified **GDPR consent message** and enable the European regulations
   message. It hooks into the loader already present on content pages.
3. Add the site in AdSense and submit for review once content is indexed.

## Notes on approval
This is a tool site, so the primary AdSense risk is "low value content."
Mitigations already built in: the four required surfaces (tool intro, guides,
FAQ, About), plus Privacy. Before submitting, let the guides get indexed in
Search Console and consider expanding the guide set (see below).

## Next content to add (SEO long-tail)
- "How to test internet speed" / "how speed tests work"
- "Mbps vs MBps" (download-time explainer)
- "Good upload speed for streaming / working from home"
- "[Provider] speed test" landing pages for major ISPs
- "Wi-Fi vs Ethernet speed" comparison
