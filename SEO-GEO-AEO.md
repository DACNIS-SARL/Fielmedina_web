# FielMedina web: SEO, GEO and AEO work order

Audit of `Fielmedina_web` as it stands on `main`. Every finding below was
verified against the code in this repository and, where marked LIVE, against
the deployed site and the app stores on **2026-08-30**.

This is a work order, not a design brief. Visual design is explicitly out of
scope (see "Out of scope" at the end).

Definitions used here:

- **SEO**: classic search indexing and ranking (Google, Bing).
- **GEO** (Generative Engine Optimisation): being retrievable and citable by AI
  answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Meta AI).
- **AEO** (Answer Engine Optimisation): structuring content so it can be lifted
  as a direct answer (structured data, FAQ, plain factual statements).

---

## 0. Before changing anything

1. Record a baseline. Run PageSpeed Insights on `https://www.fielmedina.com/`
   for mobile and desktop and save the four category scores plus LCP, CLS and
   TBT. No baseline was captured in this audit, so do not trust any
   before/after claim that is not measured from this point.
2. Open Google Search Console and record: indexed page count, any coverage
   errors, and which queries currently produce impressions.
3. Do not start until both are recorded.

---

## 1. CRITICAL: Cloudflare blocks every AI crawler (LIVE, not in this repo)

**Status:** confirmed live on 2026-08-30.

The served `robots.txt` does not match `app/robots.ts`. Cloudflare injects a
managed block ahead of the application's own rules:

```
Content-Signal: search=yes, ai-train=no, use=reference

Disallow: /   for  Amazonbot, Applebot-Extended, Bytespider, CCBot,
                   ClaudeBot, CloudflareBrowserRenderingCrawler,
                   Google-Extended, GPTBot, meta-externalagent
```

Consequences:

- `Google-Extended` blocked removes the site from Google AI Overviews.
- `GPTBot` blocked removes it from ChatGPT's index.
- `ClaudeBot`, `meta-externalagent`, `Applebot-Extended` likewise.

**Nothing in this repository can override this.** No change to `app/robots.ts`
will help while the managed rules are in place.

**Required:** in the Cloudflare dashboard, under AI Crawl Control (previously
"AI Scrapers and Crawlers" / Bot Management), allow the crawlers that feed
answer engines. Decide deliberately whether to keep `ai-train=no` while setting
`ai-input`/`use` to permit answering, since training and answering are separate
signals.

**Verify:** `curl -s https://www.fielmedina.com/robots.txt` no longer contains
`Disallow: /` for the agents above.

This single item is worth more than everything else in this document. Do it
first, and do not report GEO progress until it is done.

---

## 2. CRITICAL: the sitemap submits French URLs that do not exist

**File:** `app/sitemap.ts`

French entries are built by string concatenation:

```ts
const localePrefix = locale === 'en' ? '' : `/${locale}`;
url: `${baseUrl}${localePrefix}${route.path}`
```

That produces `/fr/about`, `/fr/contact`, `/fr/privacy-policy`,
`/fr/terms-conditions`. None of these are real routes. `i18n/routing.ts`
defines localised pathnames:

| canonical | actual French route |
|---|---|
| `/about` | `/fr/a-propos` |
| `/contact` | `/fr/contactez-nous` |
| `/privacy-policy` | `/fr/politique-de-confidentialite` |
| `/terms-conditions` | `/fr/conditions-generales-dutilisation` |

Four of the ten submitted URLs are therefore dead. There is also a duplicate
root entry: `routes` already contains `path: ''`, and the code then calls
`sitemapEntries.unshift(...)` with the bare `baseUrl`.

**Required:**

- Resolve every URL through `getPathname` from `i18n/navigation`, so the
  sitemap can never drift from the router again.
- Remove the duplicated root entry.
- Add `alternates.languages` per entry, including `x-default`. Google reads
  hreflang from the sitemap as well as from the page head, and it is what stops
  the FR pages competing with the EN pages in France.

**Verify:** `curl -s https://www.fielmedina.com/sitemap.xml`, then request every
`<loc>` and confirm each returns 200 with no redirect. Resubmit in Search
Console afterwards so the dead URLs drop out.

---

## 3. HIGH: robots.txt and sitemap.xml contradict each other

**File:** `app/robots.ts`

```ts
disallow: ['/api/', '/server-status', '/privacy-policy', '/terms-conditions'],
```

Those last two paths are simultaneously submitted in `sitemap.ts`. Telling a
crawler to index a page and not to crawl it in the same breath costs trust for
the whole domain, and app-store reviewers expect both pages to be reachable.

**Required:**

- Stop disallowing `/privacy-policy` and `/terms-conditions`.
- Add `/go/` to the disallow list. It is the Meta ad attribution redirect
  (`app/go/open/route.ts`), a 307 to a store listing, so crawling it spends
  budget and indexes nothing. Do not otherwise touch that route: it is load
  bearing for Universal Links and ad attribution.
- Add explicit `allow` rules for the answer-engine user agents. This does not
  defeat Cloudflare on its own (see item 1) but it makes intent unambiguous.

**Verify:** the served `robots.txt` allows both legal pages, and no URL appears
in both the sitemap and a Disallow rule.

---

## 4. HIGH: structured data is stale, disconnected, and contradicts the page

**File:** `components/seo/StructuredData.tsx`

Problems, all verified:

1. The file is `'use client'`. JSON-LD is read from the served HTML and never
   from the DOM at runtime, so this hydrates a component for no reason. Make it
   a server component.
2. `softwareVersion: '1.0.0'` (line 87). The App Store currently reports
   **2.1.7**, released 21 Aug 2026.
3. The `FAQPage` block is hand-written in this file and does **not** match the
   FAQ rendered from `messages/en.json` / `messages/fr.json`. Google drops FAQ
   rich results when markup and visible content disagree. Generate the schema
   from the same message objects the page renders, so the two cannot drift.
4. FAQ answer text still says *"Optional premium story packs will arrive later
   in 2025"* (line 156). It is 2026.
5. No `aggregateRating`, despite real public ratings existing. This is the
   single easiest rich-result win available.
6. Five separate `<script>` blocks with no shared graph. Emit one
   `@graph` with `@id` cross-references so engines can connect Organization,
   WebSite, MobileApplication and FAQPage.
7. Only Sousse is described. The app also covers Monastir.

**Real figures, read from the stores on 2026-08-30. Re-check before publishing,
these move:**

| Source | Rating | Count |
|---|---|---|
| App Store (Tunisia storefront, id 6751167445) | 4.75 | 4 ratings |
| Google Play (`com.fielmedina.sousse`) | 4.7 | 14 ratings |
| Combined, weighted | **4.7** | **18 ratings** |

Google Play also reports 500+ downloads. App version 2.1.7.

**Do not round these up.** The site currently displays "4.8" and "Based on 20+
reviews", which is not what either store reports. `aggregateRating` must match
what is visible on the page, and both must match the stores.

**Required additions worth making:** `featureList`, `offers` with `price: 0`,
`installUrl` for both stores, `inLanguage: ['en','fr']`, and an `ItemList` of
`TouristDestination` for the cities actually shipped. Keep announced cities out
of structured data; describe them in copy only.

**Verify:** Google Rich Results Test and Schema.org validator on the live URL,
plus a manual check that every FAQ question in the JSON-LD appears verbatim on
the page.

---

## 5. HIGH: head and metadata correctness

**File:** `app/[locale]/layout.tsx`

1. **Invalid markup.** `<GoogleTagManager />` is rendered at line 124, between
   `<html>` and `<head>`. Nothing is allowed there. Move it inside `<body>`.
2. **hreflang is only half declared.** `generateMetadata` sets
   `alternates.canonical` but not `alternates.languages` (line 66). The
   hreflang links are instead hand-written as `<link>` tags further down. Pick
   one mechanism. Prefer `alternates.languages` with `x-default`, and delete the
   manual tags, then confirm in the built HTML that they are emitted once each.
3. **`og:image` is wrong.** It points at `/logo.png` and declares
   `width: 1200, height: 630`. The actual file is **1670x446**. Social
   platforms crop against the declared box, so every shared link renders badly.
   Produce a real 1200x630 image. A per-locale variant is worth it since the
   card carries copy.

**File:** `app/[locale]/head.tsx`

Dead code. The App Router ignores `head.tsx`; it is a Pages Router convention.
It also declares canonical and hreflang a third time. Delete it.

**File:** `app/layout.tsx`

Exports a `metadata` object with the title *"FielMedina - Discover Sousse
Medina"* and an AI-guide description. It is never used, and it is a second,
stale source of truth for the same fields. Remove the export.

**Verify:** view source on the live page and confirm exactly one `canonical`,
one `hreflang` per locale plus one `x-default`, a valid `<head>`, and an
`og:image` whose declared dimensions match the file.

---

## 6. MEDIUM: metadata copy claims coverage that does not exist

**File:** `messages/en.json` and `messages/fr.json`, `metadata.home`

Current description: *"Discover Tunisia, Morocco, Algeria, and beyond..."*

The app ships Sousse and Monastir. Morocco and Algeria are roadmap. This is a
GEO liability specifically: answer engines quote descriptions verbatim, so an
assistant will tell a traveller the app covers Marrakech, and the review that
follows lands on the store listing.

**Required:** describe shipped coverage in `metadata`, `og:description` and
structured data. Roadmap belongs in page copy, clearly marked as roadmap.

Title and description length targets: title under 60 characters, description
between 120 and 155.

---

## 7. MEDIUM: no llms.txt

There is no `/llms.txt`. It is not a ranking factor and no engine guarantees
reading it, but it is cheap and it is the one file where the app's facts can be
stated unambiguously for a model: what the app is, which cities are live, what
it costs, which languages, what it is *not* for, and the canonical links.

**Required:** add `public/llms.txt`. Keep it factual and keep the shipped/
announced distinction explicit. Update it whenever a city ships.

---

## 8. MEDIUM: Core Web Vitals, which now feed both SEO and GEO

These are code-level findings. Measure the baseline first (section 0), then fix
in this order:

1. **`app/layout.tsx` wraps every route in `ApolloProvider`.** Only
   `components/ui/PrivacyPolicy.tsx` and `components/ui/TermsConditions.tsx`
   query the CMS (via `lib/hooks/usePages.ts`). Every visitor to the homepage
   currently downloads and hydrates the Apollo client for nothing. Scope the
   provider to those two routes.

2. **`NextIntlClientProvider` receives the full message bundle.**
   `messages/en.json` is 46 KB and `messages/fr.json` is 51 KB, and the whole
   object is serialised into the RSC payload of every page. The `legal`
   namespace alone is about 15 KB and is only used on two routes. Pass a subset
   per route.

3. **`components/ui/Partners.tsx` is a client component that fetches after
   hydration** with two sequential POSTs and `cache: 'no-store'` (lines 23 and
   44), rendering a `min-h-screen` spinner into the middle of the page while it
   waits (lines 78 and 89). That is a guaranteed layout shift on every visit,
   for content that changes a few times a year. Make it a server component with
   `next: { revalidate: 3600 }`, and render nothing when the CMS is
   unreachable rather than a full-viewport error block.

4. **Source images are very heavy.**

   | File | Size |
   |---|---|
   | `public/partners/ontt.png` | 4.0 MB |
   | `public/slider/001.png` | 1.6 MB |
   | `public/slider/002.png` | 1.1 MB |
   | `public/slider/003.png` | 1.2 MB |
   | `public/slider/004.png` | 1.3 MB |
   | `public/slider/005.png` | 1.0 MB |
   | `public/slider/006.png` | 0.9 MB |

   `next/image` reduces what is served, but these still cost deploy weight and
   first-request optimisation latency. Converting the slider PNGs to WebP at
   the same pixel dimensions took them to roughly 74 to 160 KB each in testing,
   and the ONTT logo to about 28 KB. The ONTT source is 5715x2362 for a logo
   rendered at roughly 180px wide.

5. **SVGs routed through the image optimizer.** `/logo.svg` and the store badge
   SVGs gain nothing from raster optimisation and can be requested at absurd
   widths. Serve them unoptimized.

**Verify:** PageSpeed Insights on mobile, compared against the section 0
baseline. Targets: LCP under 2.5s, CLS under 0.1, TBT under 200ms.

---

## 9. The actual ceiling: five pages

The site has five indexable pages: home, about, contact, privacy, terms. Every
fix above improves how well those five pages are understood. None of them
creates a reason to rank for the queries that matter.

Queries a traveller actually types, or asks an assistant:

- "best app for Sousse medina"
- "how to not get lost in a medina"
- "offline map Tunisia no data"
- "what to do in Sousse this week"
- "is it safe to walk the medina at night"
- "how much should I pay in a Tunisian souk"

None of these have a page to land on. The highest-value work after section 1 is
a content layer: one page per live city, and a small number of genuinely useful
guides that answer the questions above. That is also what makes the site
quotable by an answer engine, which is the whole GEO mechanism: engines cite
pages that answer a specific question, not homepages.

Suggested first set, in order:

1. `/sousse` - what the medina is, what to see, opening hours, real prices.
2. `/monastir` - same shape.
3. One practical guide, for example "Walking the Sousse medina without data".

Keep the existing URL structure and add underneath it. Do not restructure
routes: they are indexed, and `app/go/open/route.ts` plus
`public/.well-known/apple-app-site-association` depend on the current shape.

---

## Constraints for whoever implements this

- **Do not change** route slugs, the `www` canonical host, nav labels, form
  field names, or `app/go/open/route.ts`. The apex-to-www redirect is
  deliberate and settled; all ad deep links use `www`.
- **Do not invent numbers.** Ratings, review counts, download counts and place
  counts must match the stores and the app. If a figure cannot be sourced, omit
  it rather than estimate it.
- **Structured data must match visible content.** Any FAQ, rating or price in
  JSON-LD has to appear on the page too.
- **Preserve existing accessibility work.** The skip link, `aria-label`s and
  focus states in the current components are correct; do not regress them.
- Verify each item with the stated check before marking it done.

## Out of scope

Visual design, layout, typography, colour, photography and copywriting voice.
This document covers only what makes the site findable, crawlable, understood
and quotable.

## Sources

- Live `robots.txt`, fetched 2026-08-30.
- App Store lookup API for id 6751167445, Tunisia storefront, 2026-08-30.
- Google Play listing for `com.fielmedina.sousse`, 2026-08-30.
- Repository state at commit `40a8ea7` on `main`.
