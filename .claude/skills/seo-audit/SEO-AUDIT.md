---
name: tuitionalFrontend SEO Audit
description: Comprehensive SEO audit agent for the Tuitional public site. Run this to identify and fix technical SEO, on-page SEO, structured data, i18n SEO, sitemap, performance, and content-gap issues across all EN and AR routes.
type: seo-audit
---

# tuitionalFrontend — SEO Audit Agent

> **Purpose:** Systematically audit every SEO surface of the Tuitional public site and produce actionable findings ranked by impact. This agent covers technical SEO, on-page optimization, structured data, international SEO (hreflang/RTL), sitemap integrity, Core Web Vitals, and content gaps.
> **Scope:** This is the **public read-only site** (`tuitionaledu.com`). Content changes (titles, body copy inside Firestore) belong in the CMS — this agent audits the rendering, metadata, schema, and technical infrastructure.
> **When to run:** Before any major release, quarterly SEO health checks, after adding new routes/pages, or when organic traffic drops.

---

## 0. Navigation Band

```
SEO-AUDIT.md (you are here)
     │
     ├── SEO-01  Technical SEO (crawlability, indexing, redirects)
     ├── SEO-02  On-Page SEO (metadata, headings, content signals)
     ├── SEO-03  Structured Data / JSON-LD
     ├── SEO-04  International SEO (hreflang, i18n, RTL)
     ├── SEO-05  Sitemap & Robots
     ├── SEO-06  Performance & Core Web Vitals
     ├── SEO-07  Image SEO
     ├── SEO-08  Internal Linking & URL Architecture
     ├── SEO-09  Blog SEO
     ├── SEO-10  Local SEO & GBP
     └── SEO-11  Competitive Gap Analysis
```

**Relationship to other skills:**
- [RULES.md](../ui-pipeline/RULES.md) — any fix must comply with the hard rules (no new deps, no foundation file edits without approval)
- [Development.md](../ui-pipeline/Development.md) — use the Context Map (§2) to locate files
- [QA.md](../ui-pipeline/QA.md) — after fixing SEO issues, run the full QA gate

---

## SEO-01 — Technical SEO (Crawlability & Indexing)

### Audit checklist

| # | Check | How to verify | Severity |
|---|---|---|---|
| 1.1 | **robots.txt** allows all important paths and blocks only admin/API | Read [src/app/robots.txt](src/app/robots.txt) — confirm `Allow: /`, `Disallow: /api/`, no accidental blocks on `/online/`, `/blog/`, `/ar/` | CRITICAL |
| 1.2 | **No `noindex` meta** on public pages | Grep all `page.tsx` for `robots: "noindex"` or `<meta name="robots"` — should return zero on public routes | CRITICAL |
| 1.3 | **Canonical URLs** on every page | Every `page.tsx` with `metadata` must have `alternates.canonical`. Check for missing canonicals and self-referencing canonical errors | HIGH |
| 1.4 | **HTTP status codes correct** | Redirects in [next.config.mjs](next.config.mjs) use `permanent: true` (301). Dynamic pages return 200 or redirect to `/404`. No soft 404s (200 with "not found" content) | HIGH |
| 1.5 | **Trailing slash consistency** | Next.js default is no trailing slash. Confirm `trailingSlash` is not set in config. All internal links and canonicals must be without trailing slash | MEDIUM |
| 1.6 | **HTTPS enforced** | All canonical URLs, sitemap URLs, and internal links use `https://` not `http://` | CRITICAL |
| 1.7 | **Redirect chains** | No redirect → redirect chains in [next.config.mjs](next.config.mjs). Each source maps to a final destination directly | MEDIUM |
| 1.8 | **404 page returns 404 status** | [src/app/404/page.tsx](src/app/404/page.tsx) or [src/app/not-found.tsx](src/app/not-found.tsx) must return HTTP 404, not 200 | HIGH |

### How to fix

```
Canonical missing    → Add `alternates: { canonical: \`\${SITE_URL}/route\` }` to metadata export
noindex found        → Remove the robots directive from metadata
Redirect chain       → Update source to point directly to final destination
```

### Files to inspect
- [src/app/robots.txt](src/app/robots.txt)
- [next.config.mjs](next.config.mjs) `redirects()` array
- Every `src/app/**/page.tsx` — check `metadata` export
- [src/app/not-found.tsx](src/app/not-found.tsx)

---

## SEO-02 — On-Page SEO (Metadata & Content Signals)

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 2.1 | **Every page has `<title>`** | All `page.tsx` files export `metadata` or `generateMetadata` with a `title` field | CRITICAL |
| 2.2 | **Title length** | 50–60 characters. Include primary keyword + brand ("Tuitional") | HIGH |
| 2.3 | **Title uniqueness** | No two pages share the same `<title>` | HIGH |
| 2.4 | **Meta description** | Every page has a `description` in metadata. 150–160 chars. Contains target keyword and a CTA | HIGH |
| 2.5 | **Description uniqueness** | No two pages share the same `description` | MEDIUM |
| 2.6 | **Single `<h1>` per page** | Run `$$('h1')` in console on each page — must return exactly 1 | CRITICAL |
| 2.7 | **H1 contains primary keyword** | The `<h1>` text should include the page's target keyword | HIGH |
| 2.8 | **Heading hierarchy** | Strict `h1 > h2 > h3` — no skipping levels (h1 then h3, or h2 then h4) | HIGH |
| 2.9 | **Open Graph tags** | `openGraph.title`, `openGraph.description`, `openGraph.images`, `openGraph.url`, `openGraph.type` present | MEDIUM |
| 2.10 | **Twitter Card tags** | `twitter.card`, `twitter.title`, `twitter.description` present | LOW |

### Pages missing metadata (known gaps from codebase analysis)

The following `page.tsx` files have **NO metadata export** — these are CRITICAL gaps:

```
src/app/about/page.tsx             ← NO metadata
src/app/blog/page.tsx              ← NO metadata
src/app/blog/[slug]/page.tsx       ← NO metadata or generateMetadata
src/app/blog/category/[slug]/page.tsx
src/app/blog/tag/[slug]/page.tsx
src/app/online/[slug]/page.tsx     ← NO generateMetadata (dynamic pages!)
src/app/a-level/page.tsx           ← NO metadata
src/app/gcse/page.tsx              ← NO metadata
src/app/curiculume/page.tsx        ← NO metadata
src/app/maincuriculume/page.tsx    ← NO metadata
src/app/privacy-policy/page.tsx    ← NO metadata
src/app/terms-and-conditions/page.tsx ← NO metadata
src/app/404/page.tsx               ← NO metadata
src/app/ar/blog/[slug]/page.tsx    ← NO metadata
src/app/ar/blog/page.tsx           ← NO metadata
src/app/ar/blog/category/[slug]/page.tsx
src/app/ar/blog/tag/[slug]/page.tsx
src/app/ar/online/[slug]/page.tsx  ← NO generateMetadata
src/app/ar/privacy-policy/page.tsx
src/app/ar/terms-and-conditions/page.tsx
```

### Priority fix order
1. `/online/[slug]` and `/ar/online/[slug]` — highest traffic dynamic pages, need `generateMetadata`
2. `/blog/[slug]` and `/ar/blog/[slug]` — blog posts need dynamic titles from Firestore data
3. `/about` — high-authority static page
4. `/blog` — listing page
5. Remaining static pages

### How to add `generateMetadata` for dynamic pages

```tsx
// src/app/online/[slug]/page.tsx
import { Metadata } from "next";
import { getPageData } from "@/services/grade-subject-level/grade-subject-level";
import { SITE_URL } from "@/utils/env";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getPageData(params.slug);
  if (!data) return {};
  return {
    title: data.meta_title || data.hero?.heading || `Online Tutoring - ${params.slug}`,
    description: data.meta_description || data.hero?.subheading || "",
    alternates: {
      canonical: `${SITE_URL}/online/${params.slug}`,
      languages: {
        "en": `${SITE_URL}/online/${params.slug}`,
        "ar": `${SITE_URL}/ar/online/${params.slug}`,
      },
    },
    openGraph: {
      title: data.meta_title || data.hero?.heading,
      description: data.meta_description || data.hero?.subheading,
      url: `${SITE_URL}/online/${params.slug}`,
      type: "website",
    },
  };
}
```

---

## SEO-03 — Structured Data / JSON-LD

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 3.1 | **Organization schema valid** | [UniversalSchema.tsx](src/components/seo/UniversalSchema.tsx) `@graph[0]` — validate at https://validator.schema.org | HIGH |
| 3.2 | **No conflicting Organization data** | [src/app/page.tsx](src/app/page.tsx) has a DUPLICATE `homeSchema` with DIFFERENT data (foundingDate "2022" vs "2020", foundingLocation "Sharjah" vs "Dubai", ratingValue "4.4" vs "4.7", reviewCount "100" vs "108"). **These must be reconciled** | CRITICAL |
| 3.3 | **LocalBusiness `validThrough`** | Currently hardcoded to `2025-12-31` — **already expired**. Must be updated or removed | HIGH |
| 3.4 | **BreadcrumbList is static** | Current breadcrumb only has 5 items (Home, About, Blog, Testimonials, Contact). Should be dynamic per-page | MEDIUM |
| 3.5 | **Blog posts need Article schema** | `/blog/[slug]` pages should have `@type: "Article"` with `headline`, `datePublished`, `dateModified`, `author`, `image` | HIGH |
| 3.6 | **FAQ schema on FAQ sections** | Pages with FAQ accordion sections should have `@type: "FAQPage"` schema | MEDIUM |
| 3.7 | **Course/Service schema per tutoring page** | `/online/[slug]` pages should have `@type: "Course"` or `@type: "Service"` schema with specific details | MEDIUM |
| 3.8 | **Review schema compliance** | Reviews in UniversalSchema use generic author names ("Tuitional Parent", "Tuitional Student") — Google may flag these as non-specific. Use real reviewer names from Trustpilot | LOW |
| 3.9 | **`expertise` is non-standard** | The `expertise` array in Organization schema is not a valid Schema.org property. Use `knowsAbout` instead (which already exists — so remove `expertise`) | LOW |
| 3.10 | **Logo URL uses hardcoded hash** | `logo.16d39b17.png` — this hash changes on rebuild. Use a stable path like `/assets/images/static/logo.png` or host on CDN | MEDIUM |

### Known conflicts to resolve

| Field | UniversalSchema.tsx | page.tsx homeSchema | Which is correct? |
|---|---|---|---|
| foundingDate | "2020" | "2022" | Verify with stakeholders |
| foundingLocation | "Dubai, UAE" | "Sharjah, UAE" | Verify with stakeholders |
| ratingValue | "4.7" | "4.4" | Use current Trustpilot rating |
| reviewCount | "108" | "100" | Use current Trustpilot count |
| telephone format | "+971-56-490-0376" | "+971 56 490 0376" | Standardize to E.164: "+971564900376" |

---

## SEO-04 — International SEO (hreflang / i18n / RTL)

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 4.1 | **hreflang tags on every bilingual page** | Every EN page must declare `<link rel="alternate" hreflang="ar" href="...">` pointing to its AR twin, and vice versa. Both must also include `hreflang="x-default"` pointing to EN | CRITICAL |
| 4.2 | **hreflang reciprocity** | If `/about` points to `/ar/about` as Arabic alternate, then `/ar/about` must point back to `/about` as English alternate | CRITICAL |
| 4.3 | **No hreflang currently exists** | NONE of the current pages implement `alternates.languages` in metadata — this is a **major gap** for international SEO | CRITICAL |
| 4.4 | **`<html lang>` correct** | EN pages: `lang="en"`, AR pages: `lang="ar"` — handled by [html-wrapper.tsx](src/components/html-wrapper.tsx) ✅ | OK |
| 4.5 | **`<html dir>` correct** | EN: `dir="ltr"`, AR: `dir="rtl"` — handled by html-wrapper.tsx ✅ | OK |
| 4.6 | **AR pages not in sitemap** | Current [sitemap.ts](src/app/sitemap.ts) only generates EN URLs. Arabic URLs (`/ar/**`) are completely missing | CRITICAL |
| 4.7 | **AR canonical self-referencing** | AR pages that have canonicals correctly point to themselves (not to EN version) ✅ | OK |

### How to implement hreflang

Add `alternates.languages` to every metadata export:

```tsx
alternates: {
  canonical: `${SITE_URL}/about`,
  languages: {
    "en": `${SITE_URL}/about`,
    "ar": `${SITE_URL}/ar/about`,
    "x-default": `${SITE_URL}/about`,
  },
},
```

### How to fix sitemap for AR

```tsx
// In sitemap.ts, duplicate each entry with /ar/ prefix:
const arPageUrls = pageUrls.map(entry => ({
  ...entry,
  url: entry.url.replace(SITE_URL, `${SITE_URL}/ar`),
}));
return [...staticPages, ...arStaticPages, ...pageUrls, ...arPageUrls, ...blogUrls, ...arBlogUrls];
```

---

## SEO-05 — Sitemap & Robots

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 5.1 | **Sitemap reachable** | `https://tuitionaledu.com/sitemap.xml` returns 200 with valid XML | CRITICAL |
| 5.2 | **All public routes in sitemap** | Static pages (about, contact, pricing, testimonials, careers, igcse, gcse, a-level, privacy-policy, terms-and-conditions) present | HIGH |
| 5.3 | **Blog URL path mismatch** | Sitemap generates `/blogs/${slug.id}` (plural) but actual routes are `/blog/${slug}` (singular). **Broken URLs in sitemap** | CRITICAL |
| 5.4 | **`/tutors` in sitemap but route doesn't exist** | `${SITE_URL}/tutors` is listed but there's no `src/app/tutors/` route — generates a 404 in sitemap | HIGH |
| 5.5 | **Arabic pages missing** | No `/ar/**` URLs in sitemap (see SEO-04.6) | CRITICAL |
| 5.6 | **IGCSE, GCSE, A-Level missing from sitemap** | These curriculum landing pages are not in the `staticPages` array | HIGH |
| 5.7 | **`lastModified` stale** | Static pages like about, contact, testimonials use hardcoded dates from 2024 — should auto-update or reflect actual modification dates | LOW |
| 5.8 | **robots.txt references sitemap** | `Sitemap: https://tuitionaledu.com/sitemap.xml` present ✅ | OK |
| 5.9 | **robots.txt doesn't block `/api/`** | Currently no Disallow for `/api/` — should add `Disallow: /api/` to prevent crawling of API endpoints | MEDIUM |
| 5.10 | **`/igcse` blocked in robots.txt** | `next-sitemap.config.js` excludes `/igcse` and robots.txt disallows it — verify this is still intentional | MEDIUM |

### Critical bug: `/blogs/` vs `/blog/`

In [sitemap.ts:21](src/app/sitemap.ts#L21):
```tsx
url: `${SITE_URL}/blogs/${slug.id}`,  // WRONG — route is /blog/ not /blogs/
```
Should be:
```tsx
url: `${SITE_URL}/blog/${slug.id}`,   // CORRECT
```

---

## SEO-06 — Performance & Core Web Vitals

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 6.1 | **LCP < 2.5s** | Above-the-fold hero image uses `priority` + `sizes` + `placeholder="blur"` | HIGH |
| 6.2 | **CLS < 0.1** | All images have explicit `width`/`height` or `fill` + container sizing. Fonts use `display: "swap"` | HIGH |
| 6.3 | **INP < 200ms** | No heavy synchronous JS on interaction. Dynamic imports for below-fold components | MEDIUM |
| 6.4 | **Font loading optimized** | Three fonts registered in [fonts.ts](src/app/fonts.ts) with `display: "swap"`. Arabic font has `preload: false` ✅ | OK |
| 6.5 | **Bundle splitting** | MUI + vendor chunks separated via [next.config.mjs](next.config.mjs) webpack config ✅ | OK |
| 6.6 | **Below-fold components lazy-loaded** | Home page uses `dynamic()` imports with `ssr: false` for below-fold ✅ | OK |
| 6.7 | **Third-party script impact** | FB Pixel, GTM, Clarity all load `afterInteractive` — verify they don't block render | MEDIUM |
| 6.8 | **Image formats** | Next.js configured for WebP + AVIF ✅ | OK |

### How to measure
```bash
npm run build && npm start
# Then run Lighthouse on localhost:3000
# Or use: npx lighthouse https://tuitionaledu.com --output=json
```

---

## SEO-07 — Image SEO

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 7.1 | **All images have descriptive `alt`** | Grep for `alt=""` or missing `alt` in `next/image` usage. Empty alts = invisible to search | HIGH |
| 7.2 | **Alt text contains keywords** | Hero images, service illustrations should have keyword-rich alt text, not generic "image" | MEDIUM |
| 7.3 | **`next/image` used everywhere** | No raw `<img>` tags (except inside `<noscript>` for analytics pixels) | HIGH |
| 7.4 | **`sizes` attribute set** | Responsive images should have `sizes` to prevent downloading oversized images on mobile | MEDIUM |
| 7.5 | **Hero images use `priority`** | Only above-the-fold hero images should have `priority` — not every image | MEDIUM |
| 7.6 | **File names are descriptive** | Image file names should be keyword-rich (`igcse-math-tutoring.webp` not `img_001.webp`) | LOW |

### How to verify
```bash
# Find empty alt attributes
grep -rn 'alt=""' src/components/ src/app/
# Find raw img tags
grep -rn '<img ' src/components/ src/app/ --include="*.tsx"
```

---

## SEO-08 — Internal Linking & URL Architecture

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 8.1 | **URL structure is clean** | `/online/caie-igcse-math-tutors` — descriptive, keyword-rich, lowercase, hyphenated ✅ | OK |
| 8.2 | **No orphan pages** | Every public page is reachable from navigation or internal links | MEDIUM |
| 8.3 | **Footer links cover key pages** | Footer includes links to main service pages, about, contact, blog, pricing | MEDIUM |
| 8.4 | **Blog posts link to service pages** | Blog CTAs and related content sections link to `/online/[slug]` pages | MEDIUM |
| 8.5 | **Breadcrumbs on inner pages** | Service pages, blog posts, and curriculum pages should have visual breadcrumbs | MEDIUM |
| 8.6 | **`next/link` used for internal links** | All internal navigation uses Next.js `<Link>` for client-side transitions and prefetching | MEDIUM |
| 8.7 | **No broken internal links** | Crawl all pages and check for 404 responses on internal links | HIGH |

---

## SEO-09 — Blog SEO

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 9.1 | **Blog posts have `generateMetadata`** | Dynamic title, description from Firestore `PageData` | CRITICAL |
| 9.2 | **Article structured data** | Each blog post renders `@type: "Article"` JSON-LD with `headline`, `datePublished`, `dateModified`, `author`, `image`, `publisher` | HIGH |
| 9.3 | **Blog category/tag pages have metadata** | `/blog/category/[slug]` and `/blog/tag/[slug]` need unique titles | HIGH |
| 9.4 | **Blog listing has pagination** | If paginated, use `rel="next"` / `rel="prev"` or ensure all pages are in sitemap | MEDIUM |
| 9.5 | **Author pages / profiles** | Blog posts credit authors — consider linking to author profiles for E-E-A-T | LOW |
| 9.6 | **Related posts / internal links** | Blog posts should link to related content and service pages | MEDIUM |
| 9.7 | **Reading time / word count signals** | Optional but good for engagement — structured data can include `wordCount` | LOW |

---

## SEO-10 — Local SEO & Google Business Profile

### Audit checklist

| # | Check | Expected | Severity |
|---|---|---|---|
| 10.1 | **NAP consistency** | Name, Address, Phone consistent across UniversalSchema, page.tsx homeSchema, contact page, and Google Business Profile | HIGH |
| 10.2 | **LocalBusiness schema complete** | Address, geo coordinates, openingHours, priceRange, telephone, email all present ✅ | OK |
| 10.3 | **Service area pages** | Consider creating location-specific pages (`/online-tutoring-dubai`, `/online-tutoring-riyadh`) for local SEO in target markets | LOW |
| 10.4 | **GBP link matches site URL** | Google Business Profile should link to `https://tuitionaledu.com` exactly | MEDIUM |

---

## SEO-11 — Competitive Gap Analysis

### Areas to research

| # | Topic | Action |
|---|---|---|
| 11.1 | **Target keyword mapping** | Create a keyword → page mapping for every public route. Ensure no keyword cannibalization between pages |
| 11.2 | **Content gaps** | Compare service pages against competitors for missing subjects/curricula |
| 11.3 | **Backlink profile** | Audit referring domains — look for disavow opportunities and link-building targets |
| 11.4 | **SERP features** | Check which queries trigger featured snippets, PAA, knowledge panels — optimize content structure to win them |
| 11.5 | **Competitor structured data** | Check what schema types competitors use that Tuitional doesn't |

---

## Severity Legend

| Level | Meaning | SLA |
|---|---|---|
| **CRITICAL** | Blocks indexing, causes ranking loss, or violates Google guidelines | Fix immediately |
| **HIGH** | Significant SEO impact — missed traffic or poor user signals | Fix within 1 sprint |
| **MEDIUM** | Optimization opportunity — improves rankings but not blocking | Fix within 2 sprints |
| **LOW** | Nice-to-have — marginal improvement | Backlog |

---

## Running the Audit

### Automated checks (run in sequence)

```bash
# 1. Build the site
npm run build

# 2. Start production server
npm start &

# 3. Check sitemap
curl -s http://localhost:3000/sitemap.xml | head -50

# 4. Check robots.txt
curl -s http://localhost:3000/robots.txt

# 5. Check metadata on key pages
curl -s http://localhost:3000 | grep -i '<title\|<meta name="description\|<link rel="canonical\|hreflang'
curl -s http://localhost:3000/online | grep -i '<title\|<meta name="description\|<link rel="canonical\|hreflang'
curl -s http://localhost:3000/blog | grep -i '<title\|<meta name="description\|<link rel="canonical\|hreflang'
curl -s http://localhost:3000/ar | grep -i '<title\|<meta name="description\|<link rel="canonical\|hreflang'

# 6. Check heading hierarchy
curl -s http://localhost:3000 | grep -oP '<h[1-6][^>]*>.*?</h[1-6]>'

# 7. Validate structured data
curl -s http://localhost:3000 | grep 'application/ld+json'

# 8. Bundle analysis
npm run build:analyze
```

### Manual checks

1. Google Search Console → Coverage report → check indexed vs excluded
2. Google Rich Results Test → paste key URLs
3. PageSpeed Insights → test home, /online/[popular-slug], /blog/[popular-slug]
4. Mobile-Friendly Test → test AR pages specifically
5. Site search `site:tuitionaledu.com` → check indexed page count and titles

---

## Output Format

After running the audit, produce a report in this format:

```markdown
# SEO Audit Report — tuitionaledu.com
**Date:** YYYY-MM-DD
**Audited by:** Claude SEO Agent

## Executive Summary
- Total issues found: X
- Critical: X | High: X | Medium: X | Low: X

## Findings by Section

### SEO-01 Technical SEO
| # | Issue | Severity | File | Fix |
|---|---|---|---|---|
| 1.1 | robots.txt missing /api/ block | MEDIUM | src/app/robots.txt | Add `Disallow: /api/` |

### SEO-02 On-Page SEO
...

## Priority Action Plan
1. [CRITICAL] Fix sitemap /blogs/ → /blog/ path
2. [CRITICAL] Add generateMetadata to /online/[slug]
3. [CRITICAL] Implement hreflang across all pages
...
```

---

## Files Reference

| Concern | File(s) |
|---|---|
| Root metadata | [src/app/layout.tsx](src/app/layout.tsx) |
| Page metadata | `src/app/**/page.tsx` — `metadata` or `generateMetadata` export |
| Structured data (global) | [src/components/seo/UniversalSchema.tsx](src/components/seo/UniversalSchema.tsx) |
| Structured data (home) | [src/app/page.tsx](src/app/page.tsx) `homeSchema` const |
| Sitemap | [src/app/sitemap.ts](src/app/sitemap.ts) |
| Robots | [src/app/robots.txt](src/app/robots.txt) |
| Sitemap config | [next-sitemap.config.js](next-sitemap.config.js) |
| Redirects | [next.config.mjs](next.config.mjs) `redirects()` |
| Image config | [next.config.mjs](next.config.mjs) `images.remotePatterns` |
| Fonts | [src/app/fonts.ts](src/app/fonts.ts) |
| i18n | [src/context/language-context.tsx](src/context/language-context.tsx) |
| HTML dir/lang | [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) |
| Analytics | [src/app/metrics/](src/app/metrics/) |
| Constants | [src/utils/env.ts](src/utils/env.ts) |

---

**End.** Run this audit end-to-end. Every CRITICAL finding is a blocker. Produce the report, get approval, then fix using the standard SDLC pipeline (Development.md → Design.md → UI.md → QA.md).
