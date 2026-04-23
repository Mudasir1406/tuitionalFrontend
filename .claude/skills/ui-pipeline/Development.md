---
name: tuitionalFrontend Development Playbook
description: Execution playbook for delivering new features and bug fixes on the public marketing site. Load this skill FIRST — it sequences intake, scoping, implementation, and verification, and tells you when to pull in RULES.md, Design.md, UI.md, QA.md.
type: development
---

# tuitionalFrontend — Senior Developer Execution Playbook

> **Authority:** This is the entry-point skill. Load it before any task. Every section below tells you when to load a companion skill — do not short-circuit to a companion without reading this document first.
> **Mindset:** Operate as a senior software engineer who owns the outcome: understand before touching code, write minimal correct changes, verify against the full ruleset, and never ship partial work.
> **Reminder:** This repo is the **public read-only site**. The CMS at `../TuitionalCMS` writes Firestore; this repo reads it. Feature work here is about rendering, SEO, performance, and i18n — not authoring content.

---

## 0. Core principles (always on)

1. **Understand the request.** Read the ask twice. If anything is ambiguous (scope, surface, EN-only vs bilingual), STOP and ask before coding.
2. **The codebase is the source of truth.** Docs drift; code doesn't. When doc and code disagree, trust the code and flag the doc for an update.
3. **Match neighbouring patterns.** If the feature folder you're editing uses CSS modules (pricing/), don't introduce an `sx` styles object. If it uses `sx` (home/, grade-subject-level/), don't convert it to CSS modules. Consistency > purity.
4. **No partial work.** If something blocks you, say so; don't ship half-done pages.
5. **Read-only mindset.** This repo does not mutate Firestore. If a task seems to require a write, STOP — it probably belongs in the CMS.

---

## 1. Intake — 5-minute checklist before any edit

Before opening any file:

```
☐ What is the concrete deliverable? (page, section, bug fix, SEO update, perf tweak)
☐ Which route(s)? EN only, AR only, or both?
☐ Which Firestore collection(s) does it read?
☐ Is there an existing EN component, an AR twin, both, or neither?
☐ What does "done" look like? How will I verify it?
☐ Are there any foundation files involved? (requires approval)
☐ Does it introduce a new dependency, font, API route, or image host? (requires approval)
```

If any of the last two are `yes`, STOP and ask.

---

## 2. Scoping — identify existing components before writing new ones

For the feature at hand, search in this order (see [UI.md §10](./UI.md) for the full map):

1. `src/components/<feature>/` — scoped folders
2. `src/components/` (top level) — primitives
3. `src/app/<route>/` — existing route files
4. `src/services/<domain>/` — data readers

**If a match exists, USE IT.** Do not refactor it on the side of a feature task. If the existing component is wrong in a way that blocks the task, report the modification need and wait for approval.

---

## 3. Companion skills — when to load each

| Need | Skill |
|---|---|
| Rule enforcement, anti-patterns, forbidden tools | [RULES.md](./RULES.md) — **load on every task** |
| Colors, typography scale, patterns, radii, shadows, routes, site anatomy | [Design.md](./Design.md) |
| File templates, folder conventions, twin pattern, i18n authoring, routing | [UI.md](./UI.md) |
| Pre-commit verification | [QA.md](./QA.md) — **load before declaring done** |

Always load RULES.md. Always run QA.md before declaring done.

---

## 4. Implementation — step by step

### 4.1 Create the data path first (if new)

If the task reads a new Firestore field or collection:
1. Check `src/types/*.ts` for an existing type. Extend rather than redefine.
2. Add or extend a service function in `src/services/<domain>/*.ts`.
3. Service functions: `async`, return `Type | null`, never throw.
4. Use the `-en` / `-ar` locale suffix convention:
   ```tsx
   const collectionName = locale === "ar" ? "foo-ar" : "foo-en";
   ```

### 4.2 Wire up the Server Component

- `src/app/<route>/page.tsx` is a Server Component by default.
- Await the service call.
- `redirect("/404")` for missing data (match existing pattern).
- Pass data to a client component as props.
- Export `generateMetadata` for `<title>` / `<meta description>` if SEO-relevant.

### 4.3 Build the view

- Start with `"use client";` if you need state/effects/hooks
- Add `useI18n()` if any user-facing string is shown
- Pick Pattern A (sx) or Pattern B (CSS module) based on neighbouring files (see [UI.md §3–4](./UI.md))
- Apply RTL conditionals (`isRTL`, `isArabic`) to direction-sensitive styles, OR create a twin file for diverging Arabic layouts
- Prefer MUI `variant`-driven typography over hand-sized text
- Use `next/image` for all images, with `alt` + explicit dimensions

### 4.4 Add translations

Both locale files in the same commit:
- [src/locales/en.json](src/locales/en.json)
- [src/locales/ar.json](src/locales/ar.json)

**Missing AR keys surface as English strings on `/ar/**` — treat it as a defect.**

### 4.5 Add Arabic mirror route/component (if bilingual)

- Create `src/app/ar/<route>/page.tsx` with the appropriate locale parameter
- If layout diverges, create a twin component (`ar-*.tsx` or `Ar*.tsx` matching local convention)
- Both the EN page and the AR page must render without console errors

### 4.6 Update sitemap & metadata

- If the new page should appear in search results, verify [src/app/sitemap.ts](src/app/sitemap.ts) picks it up. Static routes are hand-added; dynamic routes iterate Firestore slugs.
- `robots.txt` and `next-sitemap.config.js` may also need attention for larger additions — confirm before editing.
- Always provide `generateMetadata` for new routes (or a static `metadata` export).

---

## 5. Verification — run before declaring done

Follow [QA.md](./QA.md) end to end. Short form:

```bash
npm run lint       # Must be clean
npm run build      # Must succeed
npm run dev        # Manual browser verification
```

Manual checks:
- Visit the new route on `/` and confirm it renders
- Visit the AR mirror at `/ar/<route>` and confirm:
  - Strings are Arabic
  - Layout mirrors correctly (or twin file takes over)
  - `<html dir="rtl" lang="ar">` on the page (check DevTools)
- Resize to mobile width — nothing overflows, no horizontal scroll, inputs are ≥16px
- Open DevTools → Network: confirm no `404`s, no failed Firestore reads
- Check the Elements panel for a single `<h1>` and correct heading hierarchy
- Lighthouse (optional): aim to not regress LCP / CLS / TBT

---

## 6. Common task recipes

### 6.1 "Add a new static landing page"

1. Intake → scoping
2. Create `src/app/<slug>/page.tsx` (Server Component, metadata, import view)
3. Create `src/app/ar/<slug>/page.tsx` (mirror, imports AR view)
4. Create `src/views/<slug>-view.tsx` or `src/components/<slug>/<slug>-view.tsx` + twin
5. Create section components under `src/components/<slug>/` + twins
6. Add keys to both `en.json` and `ar.json`
7. Check [sitemap.ts](src/app/sitemap.ts) picks up the new routes
8. QA + build + manual check

### 6.2 "Adjust a visible section (EN + AR)"

1. Find the EN file in `src/components/<scope>/`
2. Find the AR twin (`ar-*.tsx` or `Ar*.tsx` inside a sibling folder)
3. Apply the change to BOTH
4. If a new string is introduced, add to both locale files
5. QA + manual check on both routes

### 6.3 "Render a new Firestore field"

1. Update the type in `src/types/*.ts`
2. Update the service read (usually just `as PageData` — it flows through)
3. Update the renderer component(s)
4. Check both the `variant === "new"` (V2) and legacy renderer if it's a grade-subject-level field
5. If the field is text, it's authored per-language in the CMS — do NOT translate it client-side; render what comes from Firestore
6. QA + manual check

### 6.4 "SEO fix / metadata update"

1. Identify the route file
2. Update `generateMetadata` return (title, description, openGraph, alternates)
3. For site-wide changes, consider [src/components/seo/UniversalSchema](src/components/seo/) — foundation-adjacent, confirm before editing
4. Check `/sitemap.xml` and `robots.txt` are still consistent
5. Build + view-source verification

### 6.5 "Performance regression"

1. Reproduce with `npm run build && npm start` (port 3000) — dev mode is noisy
2. `npm run build:analyze` for bundle size
3. Check: are any heavy components statically imported where they should be dynamic?
4. Check: any new image remote hosts triggering slow LCP?
5. Check: any new synchronous Firestore read blocking the server render?
6. Refer to [PERFORMANCE_OPTIMIZATION_PLAN.md](PERFORMANCE_OPTIMIZATION_PLAN.md) for the longer playbook

### 6.6 "Legacy URL redirect"

1. Redirects belong in [next.config.mjs](next.config.mjs) `redirects()` array
2. `next.config.mjs` is a foundation-adjacent file — confirm with the user before editing
3. Use `permanent: true` unless the mapping is temporary
4. Deploy + verify with `curl -I https://staging.tuitionaledu.com/old-url`

---

## 7. Things that LOOK like this repo's job but AREN'T

| Task | Where it actually belongs |
|---|---|
| Edit page content (hero title, FAQs, tutor bios) | TuitionalCMS |
| Add a new blog post | TuitionalCMS |
| Adjust pricing numbers | TuitionalCMS (`custom-pricing` collection) |
| Translate an existing blog from EN to AR | TuitionalCMS translation UI |
| Add a new Firestore collection | TuitionalCMS (schema) THEN tuitionalFrontend (renderer) |

If the request boils down to "change what's on the page" (content), redirect to the CMS. If it's "change how content is rendered" (layout, component, behavior, SEO), it belongs here.

---

## 8. Escalate — STOP AND ASK

Stop immediately and request human input when any of the following is true:

1. The design requires a color / shadow / radius not already established in [Design.md](./Design.md).
2. A new UI pattern (stepper, date picker, video chrome, etc.) has no precedent in `src/components/**`.
3. A new dependency needs to be installed (`package.json` delta of any kind).
4. A foundation file from [RULES.md §13](./RULES.md) needs editing.
5. A new `/api/*` route, Firestore write, auth pattern, or data-fetching framework is required.
6. A new image remote host needs allowlisting in [next.config.mjs](next.config.mjs).
7. A new font family is required.
8. You would need to rename a legacy-misspelled file, folder, or route to finish the work.
9. A Firestore schema change is implied (requires coordination with the CMS).
10. The request implies deleting or modifying content data (that's a CMS task).

---

## 9. Definition of Done

```
☐ All [QA.md](./QA.md) gates pass
☐ All [RULES.md](./RULES.md) rules satisfied
☐ Manual browser verification: EN route AND AR route both render correctly
☐ npm run lint is clean
☐ npm run build succeeds
☐ No new console errors or warnings introduced
☐ No regressions in Lighthouse / Core Web Vitals for the touched routes
☐ SEO integrity preserved (one <h1>, hierarchy correct, alt text, metadata complete)
☐ Analytics tags still fire on the page (verify Pixel PageView in DevTools → Network)
☐ No secrets added to source
☐ Any content-data changes were directed to the CMS, not made here
```

If anything is not green, **fix it or escalate — do not ship**.

---

**End.** Read the ask, respect the codebase, verify everything, ship nothing partial.
