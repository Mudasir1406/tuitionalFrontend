---
name: tuitionalFrontend SEO Fix Playbook
description: Step-by-step fix guide for every SEO issue found by the SEO Audit agent. Ordered by severity and impact. Use this after running SEO-AUDIT.md to systematically resolve findings.
type: seo-fixes
---

# tuitionalFrontend — SEO Fix Playbook

> **Purpose:** Companion to [SEO-AUDIT.md](./SEO-AUDIT.md). After the audit identifies issues, this playbook provides the exact fix for each one, in priority order.
> **Rule:** Every fix must comply with [RULES.md](../ui-pipeline/RULES.md). Foundation file edits (layout.tsx, next.config.mjs, globals.css) require user approval.

---

## Phase 1 — CRITICAL (Fix Immediately)

### FIX-01: Sitemap `/blogs/` → `/blog/` path bug

**File:** [src/app/sitemap.ts:21](src/app/sitemap.ts)

**Problem:** Blog URLs in sitemap use `/blogs/` (plural) but actual route is `/blog/` (singular). Every blog post in the sitemap is a broken 404 link submitted to Google.

**Fix:**
```tsx
// Line 21: Change
url: `${SITE_URL}/blogs/${slug.id}`,
// To:
url: `${SITE_URL}/blog/${slug.id}`,
```

Also fix line 46:
```tsx
// Change
url: `${SITE_URL}/blogs`,
// To:
url: `${SITE_URL}/blog`,
```

---

### FIX-02: Add Arabic URLs to sitemap

**File:** [src/app/sitemap.ts](src/app/sitemap.ts)

**Problem:** Zero `/ar/**` URLs in sitemap. Google doesn't know about the Arabic version of the site.

**Fix:** After generating EN URLs, mirror them for AR:

```tsx
// After building pageUrls and blogUrls, add AR mirrors:
const arStaticPages: MetadataRoute.Sitemap = staticPages
  .filter(p => !p.url.includes('/ar/'))
  .map(p => ({
    ...p,
    url: p.url.replace(SITE_URL, `${SITE_URL}/ar`),
    priority: (p.priority ?? 0.5) - 0.1, // slightly lower priority
  }));

const arPageUrls: MetadataRoute.Sitemap = (
  await getAllDocumentsFromCollection("grade-subject-level-ar") ?? []
).map((slug) => ({
  url: `${SITE_URL}/ar/online/${slug.id}`,
  lastModified: slug.lastModified
    ? new Date(slug.lastModified.seconds * 1000)
    : new Date(),
  changeFrequency: "weekly" as const,
  priority: 0.6,
}));

const arBlogUrls: MetadataRoute.Sitemap = (
  await getAllDocumentsFromCollection("blogs-v1-ar") ?? []
).map((slug) => ({
  url: `${SITE_URL}/ar/blog/${slug.id}`,
  lastModified: slug.lastModified
    ? new Date(slug.lastModified.seconds * 1000)
    : new Date(),
  changeFrequency: "weekly" as const,
  priority: 0.6,
}));

return [...staticPages, ...arStaticPages, ...pageUrls, ...arPageUrls, ...blogUrls, ...arBlogUrls];
```

---

### FIX-03: Remove phantom `/tutors` from sitemap

**File:** [src/app/sitemap.ts](src/app/sitemap.ts)

**Problem:** `/tutors` is in the staticPages array but no route exists at `src/app/tutors/`. This submits a 404 to Google.

**Fix:** Remove the `/tutors` entry from the `staticPages` array.

---

### FIX-04: Add missing static pages to sitemap

**File:** [src/app/sitemap.ts](src/app/sitemap.ts)

**Problem:** `/igcse`, `/gcse`, `/a-level`, `/privacy-policy`, `/terms-and-conditions`, `/thank-you` are all missing.

**Fix:** Add them to the `staticPages` array (except `/thank-you` which should likely stay out of sitemap as a conversion confirmation page).

---

### FIX-05: Add `generateMetadata` to `/online/[slug]`

**File:** [src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx)

**Problem:** Highest-traffic dynamic pages have no `<title>`, no `<meta description>`, no canonical, no Open Graph. Google is indexing these with the root layout's generic "Tuitional" title.

**Fix:** Add `generateMetadata` that reads from the page's Firestore data. See template in [SEO-AUDIT.md §SEO-02](./SEO-AUDIT.md).

**Mirror:** Apply same pattern to [src/app/ar/online/[slug]/page.tsx](src/app/ar/online/[slug]/page.tsx).

---

### FIX-06: Add `generateMetadata` to `/blog/[slug]`

**File:** [src/app/blog/[slug]/page.tsx](src/app/blog/[slug]/page.tsx)

**Problem:** Blog posts are a primary SEO asset. Without dynamic metadata, they all share the generic root title.

**Fix:** Similar pattern to FIX-05, reading from blog Firestore data. Include `datePublished`, `dateModified` in Open Graph.

**Mirror:** Apply to [src/app/ar/blog/[slug]/page.tsx](src/app/ar/blog/[slug]/page.tsx).

---

### FIX-07: Implement hreflang across all pages

**Problem:** No hreflang tags exist anywhere. Google cannot associate EN/AR page pairs, leading to:
- Duplicate content signals
- Wrong language version showing in search results
- Lost ranking in Arabic search queries

**Fix pattern for static pages:**
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

**Fix pattern for dynamic pages:**
```tsx
alternates: {
  canonical: `${SITE_URL}/online/${params.slug}`,
  languages: {
    "en": `${SITE_URL}/online/${params.slug}`,
    "ar": `${SITE_URL}/ar/online/${params.slug}`,
    "x-default": `${SITE_URL}/online/${params.slug}`,
  },
},
```

**Apply to ALL pages that have an AR mirror.** Both the EN page and the AR page must include the full `languages` map pointing to each other.

---

### FIX-08: Reconcile conflicting Organization schemas

**Files:** [UniversalSchema.tsx](src/components/seo/UniversalSchema.tsx) + [page.tsx](src/app/page.tsx)

**Problem:** Two different Organization schemas with conflicting data (founding date, location, ratings). Google may penalize for inconsistent entity signals.

**Fix:**
1. Confirm the correct data with stakeholders
2. Remove the duplicate `homeSchema` from `page.tsx`
3. Keep one authoritative Organization schema in `UniversalSchema.tsx`
4. If the home page needs page-specific schema (WebPage, FAQPage), add only those types — not a second Organization

---

## Phase 2 — HIGH (Fix Within 1 Sprint)

### FIX-09: Add metadata to all static pages missing it

Pages needing metadata added:
- `src/app/about/page.tsx`
- `src/app/a-level/page.tsx`
- `src/app/gcse/page.tsx`
- `src/app/curiculume/page.tsx`
- `src/app/maincuriculume/page.tsx`
- `src/app/privacy-policy/page.tsx`
- `src/app/terms-and-conditions/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/category/[slug]/page.tsx`
- `src/app/blog/tag/[slug]/page.tsx`
- AR mirrors of all the above

Each needs: `title`, `description`, `alternates.canonical`, `alternates.languages`, `openGraph`.

---

### FIX-10: Update LocalBusiness `validThrough`

**File:** [UniversalSchema.tsx](src/components/seo/UniversalSchema.tsx)

**Problem:** `validThrough: "2025-12-31"` is expired.

**Fix:** Either update to a future date or remove the `validFrom`/`validThrough` fields entirely (they're optional for opening hours).

---

### FIX-11: Add Article schema to blog posts

**File:** Create in the blog `[slug]/page.tsx` or as a component

**Fix:** Render `@type: "Article"` JSON-LD per blog post:
```json
{
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Person", "name": "..." },
  "publisher": { "@id": "https://tuitionaledu.com/#organization" },
  "image": "...",
  "mainEntityOfPage": "https://tuitionaledu.com/blog/[slug]"
}
```

---

### FIX-12: Add `Disallow: /api/` to robots.txt

**File:** [src/app/robots.txt](src/app/robots.txt)

**Fix:**
```
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://tuitionaledu.com/sitemap.xml
```

---

### FIX-13: Audit and fix empty/generic `alt` attributes on images

Run the grep commands from SEO-07 and fix any:
- `alt=""` → descriptive text
- `alt="image"` or `alt="icon"` → specific descriptive text
- Missing `alt` → add appropriate text

---

## Phase 3 — MEDIUM (Fix Within 2 Sprints)

### FIX-14: Dynamic breadcrumbs per page

Replace the static BreadcrumbList in UniversalSchema with per-page breadcrumbs rendered in `generateMetadata` or as a component.

### FIX-15: FAQ schema on FAQ sections

Pages with FAQ accordions should render `@type: "FAQPage"` schema alongside the accordion.

### FIX-16: Course/Service schema on `/online/[slug]`

Each tutoring page should have `@type: "Course"` schema:
```json
{
  "@type": "Course",
  "name": "IGCSE Mathematics Online Tutoring",
  "description": "...",
  "provider": { "@id": "https://tuitionaledu.com/#organization" },
  "courseMode": "online",
  "educationalLevel": "IGCSE",
  "inLanguage": ["en", "ar"]
}
```

### FIX-17: Standardize logo URL

Use a stable path (not a hash-based Next.js static URL) for the logo in all schema.

### FIX-18: Add Open Graph images

Set a default OG image in root layout metadata, and override per-page where appropriate (blog posts should use their hero image).

---

## Phase 4 — LOW (Backlog)

### FIX-19: Remove non-standard `expertise` property from Organization schema
### FIX-20: Use real reviewer names in Review schema
### FIX-21: Add Twitter Card metadata
### FIX-22: Add `wordCount` to Article schema for blog posts
### FIX-23: Consider location-specific landing pages for local SEO

---

## Verification After Fixes

After implementing fixes, verify with:

1. **Google Rich Results Test** — paste each key URL
2. **Schema Markup Validator** — validate JSON-LD
3. **Google Search Console** — submit updated sitemap, request re-crawl
4. **PageSpeed Insights** — ensure no performance regression
5. **Run [QA.md](../ui-pipeline/QA.md)** — full QA gate
6. **Manual check** — `view-source:` on key pages, confirm `<title>`, `<meta>`, `<link rel="canonical">`, hreflang tags

---

**End.** Fix in priority order. One PR per phase. Verify after each phase before moving to the next.
