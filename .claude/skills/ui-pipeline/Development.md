---
name: tuitionalFrontend Development Playbook
description: The SDLC entry-point skill. Load this FIRST. It sequences every task (intake → design → implement → verify → sign-off) and hands off to Design.md → UI.md → RULES.md → QA.md at the right moment.
type: development
---

# tuitionalFrontend — Development Playbook (SDLC Entry Point)

> **Role in the pipeline:** Stage 1 of 5. This is the **orchestrator**. Every other skill plugs into this file's phases.
> **Mindset:** Operate as a senior engineer who owns the outcome — understand before touching code, write the minimum correct change, verify against the full ruleset, never ship partial work.
> **Repo reminder:** This is the **public read-only site**. The CMS at `../TuitionalCMS` writes Firestore; this repo only reads it. "Change the content" → CMS. "Change how content is rendered / laid out / SEO'd / performance" → here.

---

## 0. The SDLC Chain — Read This First

You are inside a five-document pipeline. Every task walks this path exactly once:

```
┌──────────────────┐      ┌────────────┐      ┌────────┐      ┌─────────┐      ┌───────┐
│ Development.md   │ ───► │ Design.md  │ ───► │ UI.md  │ ───► │ QA.md   │ ───► │ Done  │
│ (this file)      │      │ tokens +   │      │ templ. │      │ gates   │      │       │
│ orchestrator     │      │ anatomy    │      │ idioms │      │ verify  │      │       │
└─────┬────────────┘      └─────┬──────┘      └────┬───┘      └────┬────┘      └───────┘
      │                         │                  │                │
      └─────────────────────────┴──────────────────┴────────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  RULES.md    │  always-on enforcement gate,
                            │  guardrails  │  consulted by every step
                            └──────────────┘
```

**Hand-off rules:**

| From | To | When |
|---|---|---|
| Development §1 intake | [Design.md](./Design.md) | You have a concrete deliverable and need tokens / patterns / site anatomy |
| Development §4 implement | [UI.md](./UI.md) | You know the design and need the file template / folder convention / bilingual idiom |
| Any step | [RULES.md](./RULES.md) | Always. Never write code without it loaded. |
| Development §5 verify | [QA.md](./QA.md) | Before you declare done. Every item must be ✅ |
| QA fails | back to Development §4 | Fix, then re-run QA. Do not ship partials. |

If you find yourself drifting off this chain, stop and re-enter at the right stage.

---

## 1. Intake — classify the task first, then run the matching checklist

Identify which type of work you have before opening any file:

| Type | Description | Go to |
|---|---|---|
| **New feature / page** | Net-new route, section, or component that doesn't exist yet | §1.1 |
| **Bug fix** | Something that worked before is broken | §1.2 |
| **Extend / change existing feature** | Modifying a component, section, or flow that already ships | §1.3 |

---

### 1.1 New feature or new page — checklist

Answer all questions before opening a file:

```
☐ What is the concrete deliverable? (page, section, SEO update, perf tweak)
☐ Which route(s)? EN only, AR only, or both?
☐ Which Firestore collection(s) does it read?
☐ Is there an existing EN component, an AR twin, both, or neither?
☐ What does "done" look like? How will I verify it in the browser?
☐ Are foundation files involved? (requires approval — see RULES §RULE-13)
☐ Does it need a new dependency, font, API route, or image host? (requires approval)
```

#### ✅ DO
- Re-read the user's message twice before answering.
- Ask for clarification if ANY of "scope / surface / EN-only vs bilingual" is ambiguous.
- Use the **Context Map** (§2) to confirm nothing similar already exists.

#### ❌ DON'T
- Don't start coding just because you "roughly understand" the task.
- Don't assume a task is EN-only — the site is bilingual by default.
- Don't open a file that isn't mentioned in the task without confirming it's relevant.

**If the last two boxes are `yes` — STOP and ask.**

---

### 1.2 Bug fix — checklist

```
☐ Reproduce the bug: which exact route (EN / AR / both)?
☐ Which component / file owns the broken surface? (use §2 Context Map if unsure)
☐ Is the defect visual (styling), data (service / Firestore), routing (404 / redirect), or i18n (English leaks on AR)?
☐ Is the fix self-contained, or does it touch a foundation file? (foundation → approval required)
☐ Will the fix affect the EN and AR versions differently?
☐ What's the minimal change that repairs the defect without touching unrelated code?
```

#### ✅ DO
- Use §2 Context Map as your first move when you can't identify the file.
- Fix only what's broken — no "while I'm here" refactors.
- Verify the fix on BOTH the EN and AR routes.

#### ❌ DON'T
- Don't apply a broad fix when a narrow one will do.
- Don't touch a foundation file to fix a bug in a component — if a foundation file is involved, escalate (§8).
- Don't skip the AR check just because the bug was reported on the EN route.

---

### 1.3 Extending / changing an existing feature — checklist

Use this when the component or section already ships and you're modifying its behaviour, copy, layout, data, or styling.

```
☐ Locate the exact file(s) involved — use §2 Context Map or a search in src/components/<feature>/
☐ Does an Arabic twin exist? (ar-*.tsx / Ar*.tsx) — it must receive the same change
☐ What is the current behaviour / appearance, and what exactly changes?
☐ Is the change additive (new prop / new section / new key) or destructive (remove / rename / reorder)?
☐ Does the change affect the Firestore data shape? (if yes → CMS must be updated first — STOP and coordinate)
☐ Does the change require a new translation key? (add to BOTH en.json and ar.json in the same commit)
☐ Does the change affect the grade-subject-level V1 renderer, V2 renderer, or both?
   → V1: src/components/grade-subject-level/grade-subject-level.tsx + sectionsbox.tsx
   → V2: src/components/grade-subject-level/grade-subject-level-v2.tsx + sectionsboxV2.tsx
☐ Is this component shared across multiple routes? (check imports before narrowing your change)
☐ Are foundation files involved? (requires approval — see RULES §RULE-13)
☐ What does the before/after look like? How will I verify in the browser on EN and AR?
```

#### ✅ DO
- Read the existing component fully before writing a single line — understand what it does and why.
- Make the same change to the EN file **and** its AR twin in the same commit.
- If a new string is introduced, add to [src/locales/en.json](src/locales/en.json) **and** [src/locales/ar.json](src/locales/ar.json).
- Honour the Zero Modification Guard ([RULES §RULE-05](./RULES.md)): if modifying a shared primitive, report and get approval first.
- Preserve any legacy misspellings (field names, file names) exactly as-is — the CMS schema and live URLs depend on them.
- Check whether the component is used in more than one route: `grep -rn "import.*<ComponentName>" src/` before scoping your change.

#### ❌ DON'T
- Don't change a shared primitive component "just a little" without checking every consumer — regressions spread silently.
- Don't rename props or restructure the component's interface — it's a breaking change for every caller.
- Don't change the Firestore field names this repo reads — the CMS writes them; "cleaning up" the name here breaks the feed.
- Don't update only the EN file and assume the AR twin will "inherit" the change — it won't.
- Don't add a new section/block to a page without adding the corresponding AR translation keys.
- Don't reorder sections in the grade-subject-level renderer without checking `component-sequence-*` in Firestore (the CMS controls order for V1; V2 uses `sequenceNumber` per-section).
- Don't convert the component's styling pattern (e.g. change Pattern A → Pattern B) as part of a functional change — keep the scope tight.

**If the change implies a Firestore schema update → STOP. Coordinate with the CMS first, then return here.**

---

## 2. When Something Goes Wrong — Context Map

Use this table to navigate directly to the right file when you hit a symptom. Every other skill references back to this map.

### Layout / UI defects

| Symptom | Navigate to | Why |
|---|---|---|
| Home page hero looks wrong | [src/components/home/filter.tsx](src/components/home/filter.tsx) (EN) / [ar-filter.tsx](src/components/home/ar-filter.tsx) (AR) | Home hero + lead form lives here |
| Home page other sections broken | [src/components/home/](src/components/home/) — `info.tsx`, `get-started.tsx`, `trusted.tsx`, `our-client.tsx`, `faqs.tsx`, `questions.tsx`, `popular-searches.tsx`, `contact-us.tsx` — each has an `ar-*.tsx` twin | |
| Header / nav layout issue | [src/components/header.tsx](src/components/header.tsx), [header-v2.tsx](src/components/header-v2.tsx), [header-v3.tsx](src/components/header-v3.tsx), [ar-header.tsx](src/components/ar-header.tsx) | Three variants exist — confirm which the target route imports |
| Mobile drawer broken | [src/components/drawer.tsx](src/components/drawer.tsx) (dynamic-imported in layout) + [src/context/drawer-context.tsx](src/context/drawer-context.tsx) | |
| Footer layout issue | [src/components/footer.tsx](src/components/footer.tsx), [footerV2.tsx](src/components/footerV2.tsx), [server-footer.tsx](src/components/server-footer.tsx), [footer-wrapper.tsx](src/components/footer-wrapper.tsx), [ar-footer.tsx](src/components/ar-footer.tsx), [ar-server-footer.tsx](src/components/ar-server-footer.tsx) | |
| Blog list / blog detail layout | [src/components/blog/](src/components/blog/) — `hero/`, `all-blogs/`, `blog-card/`, `search-bar/`, `accordion/`, `author-profile/`, `relatedBlogs/`, `postCTA/`, `tags-social/`, `blogSequences/`; each has `ar-*` twin | |
| Grade-subject-level page wrong | Check `variant === "new"` branch in [src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx): V2 → [grade-subject-level-v2.tsx](src/components/grade-subject-level/grade-subject-level-v2.tsx); legacy → [grade-subject-level.tsx](src/components/grade-subject-level/grade-subject-level.tsx). Dispatch maps in [sectionsbox.tsx](src/components/grade-subject-level/sectionsbox.tsx) / [sectionsboxV2.tsx](src/components/grade-subject-level/sectionsboxV2.tsx) | Two renderers coexist |
| Pricing page wrong | [src/components/pricing/](src/components/pricing/) — CSS-module heavy, PascalCase file names |
| Curriculum landing page | `/igcse` → [src/app/igcse/](src/app/igcse/), `/gcse` → [src/app/gcse/](src/app/gcse/), `/a-level` → [src/app/a-level/](src/app/a-level/). Legacy: [curiculume/](src/app/curiculume/), [maincuriculume/](src/app/maincuriculume/) (preserve misspelling) |

### Data / Firestore defects

| Symptom | Navigate to | Why |
|---|---|---|
| Page data missing / `redirect("/404")` firing | Service in [src/services/grade-subject-level/](src/services/grade-subject-level/) — confirm collection name uses correct `-en` / `-ar` suffix |
| Blog data missing | [src/services/grade-subject-level/](src/services/grade-subject-level/) (blogs live there too) |
| Pricing numbers wrong | [src/services/pricing/](src/services/pricing/) — also confirm the CMS wrote the doc |
| Dropdown options missing | [src/services/filter-data/](src/services/filter-data/), [src/services/dropdown/](src/services/dropdown/) |
| Contact form submit failing | [src/services/contact-form/](src/services/contact-form/) + [src/services/email-service/](src/services/email-service/) |
| Testimonials / reviews | [src/services/testimonials/](src/services/testimonials/), [src/services/video-reviews/](src/services/video-reviews/), [src/services/reviews-on-wp/](src/services/reviews-on-wp/) |
| Countdown offer data | [src/services/countdown/](src/services/countdown/) |
| FAQs or footer data | [src/services/faqs/](src/services/faqs/), [src/services/footer/](src/services/footer/) |
| Schools / trusted logos | [src/services/trusted-schools/](src/services/trusted-schools/) |

### Routing / URL defects

| Symptom | Navigate to | Why |
|---|---|---|
| 404 on a new route | [src/app/<route>/page.tsx](src/app/) + make sure [src/app/ar/<route>/page.tsx](src/app/ar/) exists |
| Redirect missing or wrong | [next.config.mjs](next.config.mjs) `redirects()` array (foundation file → approval required) |
| Sitemap missing a URL | [src/app/sitemap.ts](src/app/sitemap.ts) (reads Firestore slug lists for dynamic routes, hand-adds static routes) |
| `robots.txt` issue | [src/app/robots.txt](src/app/robots.txt) |
| Legacy URL broken | Check [curiculume/](src/app/curiculume/) and [maincuriculume/](src/app/maincuriculume/) still exist — never rename the misspellings |

### i18n / bilingual defects

| Symptom | Navigate to | Why |
|---|---|---|
| English leaks onto `/ar/**` | Missing key in [src/locales/ar.json](src/locales/ar.json) — add it; falls back to EN, then to raw key |
| `t` throws at runtime | You called it as `t.key` — here it is a **function**: `t("key.path")`. See [src/hooks/useI18n.ts](src/hooks/useI18n.ts) and [src/context/language-context.tsx](src/context/language-context.tsx) |
| RTL mirror not working | Three layers: [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) (sets `html dir`), [src/app/globals.css](src/app/globals.css) (global RTL + Arabic font swap), Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) which auto-flip under `dir="rtl"`. NO stylis plugin |
| AR font wrong | Expected: Noto Sans Arabic via `html[dir="rtl"] *` in [globals.css](src/app/globals.css). If overridden manually, remove the override |

### SEO / Analytics defects

| Symptom | Navigate to | Why |
|---|---|---|
| Missing `<title>` / `<meta>` | `generateMetadata` export in the route's `page.tsx` |
| JSON-LD schema wrong / missing | [src/components/seo/](src/components/seo/) (UniversalSchema) — foundation-adjacent |
| Pixel PageView not firing | [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx), mounted in [src/app/layout.tsx](src/app/layout.tsx) |
| GTM / GA4 / Clarity not loading | Inline scripts + mounts in [src/app/layout.tsx](src/app/layout.tsx) (foundation — don't touch without approval) |
| Server-side FB Conversions API broken | [src/app/api/meta-conversion/route.ts](src/app/api/meta-conversion/route.ts) + `PIXEL_TOKEN` in [src/utils/env.ts](src/utils/env.ts) |

### Performance defects

| Symptom | Navigate to | Why |
|---|---|---|
| Bundle bloated | `npm run build:analyze` + check dynamic-import usage |
| LCP regression | Confirm above-the-fold `<Image priority />`, no remote host on hero |
| Heavy component eagerly imported | Use `dynamic()` pattern — see [drawer.tsx](src/components/drawer.tsx), [DropDown/](src/components/DropDown/), [pop-up-button.tsx](src/components/pop-up-button.tsx) |
| Long playbook reference | [PERFORMANCE_OPTIMIZATION_PLAN.md](PERFORMANCE_OPTIMIZATION_PLAN.md) |

### Foundation / config defects (approval required before edit)

| Symptom | Navigate to |
|---|---|
| Theme / typography / palette changes | [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts), [typographyTokens.ts](src/app/assets/css/typographyTokens.ts) |
| Font registration | [src/app/fonts.ts](src/app/fonts.ts) |
| Global CSS / RTL / standardized typography | [src/app/globals.css](src/app/globals.css), [src/app/style.css](src/app/style.css) |
| Root providers / analytics | [src/app/layout.tsx](src/app/layout.tsx) |
| i18n provider / `t` implementation | [src/context/language-context.tsx](src/context/language-context.tsx) |
| Drawer provider | [src/context/drawer-context.tsx](src/context/drawer-context.tsx) |
| `<html dir/lang>` logic | [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) |
| Firestore init | [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) |
| Next.js config (hosts, redirects, chunks) | [next.config.mjs](next.config.mjs) |

---

## 3. Scoping — find existing components before writing new ones

Search in this order (full map in [UI.md §10](./UI.md)):

1. `src/components/<feature>/` — scoped folders (blog/, home/, pricing/, grade-subject-level/, etc.)
2. `src/components/` — top-level primitives (DropDown/, custom-input/, input/, tag/, pop-up-button.tsx, …)
3. `src/app/<route>/` — existing route files
4. `src/services/<domain>/` — data readers

### ✅ DO
- Run a `grep` / `glob` for the semantic name in `src/components/` **before** authoring anything.
- Reuse as-is, even if it means accepting slightly odd prop names.
- Report modification needs and **wait for approval** (Zero Modification Rule — [RULES §RULE-05](./RULES.md)).

### ❌ DON'T
- Don't create a "cleaner" version of an existing component on the side.
- Don't refactor a neighbouring file "while you're here" — scope creep is an error condition.
- Don't assume an absence — the same primitive may live under a slightly different name (e.g. `DropDown/` vs. `custom-input/`).

---

## 4. Implementation — the SDLC build phase

> **Before you write any code:** make sure [RULES.md](./RULES.md) is loaded. It is the guardrail for every sub-step below.
> **For every pattern you pick:** consult [Design.md](./Design.md) for tokens and [UI.md](./UI.md) for file templates.

### 4.1 Create the data path first (if new)

**Navigate to:** [src/types/](src/types/) → [src/services/<domain>/](src/services/)

1. Check [src/types/*.ts](src/types/) for an existing type — extend rather than redefine.
2. Add or extend a service function in [src/services/<domain>/*.ts](src/services/).
3. Services are `async`, return `Type | null`, never throw.
4. Use the `-en` / `-ar` locale suffix convention:

   ```tsx
   const collectionName = locale === "ar" ? "foo-ar" : "foo-en";
   ```

#### ✅ DO
- Preserve the `placment` misspelling in `component-sequence-*` reads — it comes from the CMS schema.
- Return `null` / `[]` / `undefined` on failure; let the caller render a fallback.
- Keep all Firestore calls inside `src/services/`.

#### ❌ DON'T
- Don't throw from a service — callers won't handle it.
- Don't introduce `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` anywhere (this repo is READ-ONLY — [RULES §RULE-08](./RULES.md)).
- Don't call the Firebase SDK from a component file (enforced — [RULES §RULE-08](./RULES.md)).

### 4.2 Wire up the Server Component

**Navigate to:** [src/app/<route>/page.tsx](src/app/)

- `page.tsx` is a Server Component by default.
- `await` the service call.
- `redirect("/404")` for missing data (match existing pattern — NOT `notFound()`).
- Pass data to a client component as props.
- Export `generateMetadata` for `<title>` / `<meta description>` when SEO-relevant.

#### ✅ DO
- Always add the Arabic mirror at [src/app/ar/<route>/page.tsx](src/app/ar/) in the same commit.
- Use the locale parameter (`"en"` / `"ar"`) when calling services.

#### ❌ DON'T
- Don't add `"use client"` to a `page.tsx` (breaks data-fetch pattern).
- Don't call services from a client component on render — pass props from the server parent.
- Don't use `notFound()` — this repo uses `redirect("/404")`.

### 4.3 Build the view

**Navigate to:** [src/components/<feature>/<name>.tsx](src/components/) (or new folder)

- Start with `"use client";` on line 1 if you need state/effects/hooks.
- Add `useI18n()` for any user-facing string.
- Style with Tailwind utility classes; use `cn()` from `@/utils/cn` for conditional classes — see [UI.md §4](./UI.md).
- Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) for direction-sensitive layout, OR create an `ar-*.tsx` twin when LTR/AR layouts genuinely diverge.
- Prefer the `text-*` Tailwind tokens (`text-h1`, `text-h2-mobile`, `text-body`) over hand-sized text — see [Design.md §2](./Design.md).
- Reach for the house primitives in [src/components/ui/](src/components/ui/) (`Button`, `Input`, `Container`, `Dialog`, `Drawer`, `Select`) before raw HTML.
- Use `next/image` for all images with explicit `alt` + `width` + `height` (or `fill`).

#### ✅ DO
- Match the styling rhythm of the folder you're in (Tailwind classes throughout).
- Import `useI18n` from `@/hooks/useI18n` (superset) rather than `@/context/language-context`.
- Use `lucide-react` for icons.
- Set `priority` on above-the-fold hero images only.

#### ❌ DON'T
- Don't reintroduce `@mui/*` / `@emotion/*` imports — they are uninstalled ([RULES §RULE-01](./RULES.md)).
- Don't author new `*.module.css` files — Tailwind covers it.
- Don't use `em` for anything; don't use `vw` for font-size.
- Don't rely on `<img>` — always `next/image`.
- Don't write `flex-row-reverse` driven by `isRTL` — let logical properties auto-flip.

### 4.4 Add translations

**Navigate to:** [src/locales/en.json](src/locales/en.json) AND [src/locales/ar.json](src/locales/ar.json)

Both files in the same commit. Missing AR keys surface as English strings on `/ar/**` — treat it as a defect.

#### ✅ DO
- Use dot-path keys (`"myFeature.title"`) that mirror the JSON nesting.
- For one-off strings, an inline `{isArabic ? "مرحبا" : "Welcome"}` is fine.

#### ❌ DON'T
- Don't call `t` as an object (`t.key`) — it's a function here (`t("key")`). Opposite of the CMS.
- Don't import `en.json` directly into a component — always go through `t()`.
- Don't ship with an English string visible on `/ar/**`.

### 4.5 Add the Arabic mirror route / component (if bilingual)

**Navigate to:** [src/app/ar/<route>/page.tsx](src/app/ar/) + [src/components/<feature>/ar-<name>.tsx](src/components/) (or `Ar<Name>.tsx` inside a scoped folder)

- If the layout diverges significantly from EN, create a twin (`ar-*.tsx` or `Ar*.tsx` matching local convention).
- Both the EN page and the AR page must render without console errors.

#### ✅ DO
- Match the casing convention of the feature folder (kebab `ar-` in `home/`, PascalCase `Ar` in `blog/` and `pricing/`).
- Update the AR twin in lockstep whenever you touch the EN file.

#### ❌ DON'T
- Don't mix kebab-case and PascalCase inside one folder.
- Don't ship a new route without its `/ar/<route>` mirror unless you have documented a reason.

### 4.6 Update sitemap & metadata

**Navigate to:** [src/app/sitemap.ts](src/app/sitemap.ts) + `generateMetadata` in the new `page.tsx`

- Static routes are hand-added; dynamic routes iterate Firestore slugs.
- `robots.txt` and `next-sitemap.config.js` may need attention for larger additions — confirm before editing.

#### ✅ DO
- Always export `generateMetadata` (or a static `metadata` object) for new routes.
- Verify `/sitemap.xml` includes the new URL via `curl -s http://localhost:3000/sitemap.xml | grep <slug>`.

#### ❌ DON'T
- Don't add large dynamic iterators into `sitemap.ts` without checking existing patterns.
- Don't edit `next.config.mjs` or `robots.txt` without approval.

---

## 5. Verification — the SDLC test phase

**Hand off to:** [QA.md](./QA.md) — work through every gate top-to-bottom.

Quick pass:

```bash
npm run lint       # Must be clean
npm run build      # Must succeed
npm run dev        # Manual browser verification
```

### Manual checks (also listed in QA.md)

- Visit the new route on `/` and confirm it renders.
- Visit the AR mirror at `/ar/<route>` and confirm:
  - Strings are Arabic.
  - Layout mirrors correctly (or twin takes over).
  - `<html dir="rtl" lang="ar">` in DevTools.
- Resize to mobile width — no horizontal scroll, inputs ≥ 16px.
- DevTools → Network: no 404s, no failed Firestore reads.
- Elements panel: exactly one `<h1>`, correct heading hierarchy.
- Lighthouse (optional): don't regress LCP / CLS / TBT.

### ✅ DO
- Run QA.md end-to-end; don't cherry-pick checks.
- Treat any ❌ as a blocker — fix, re-run, re-verify.

### ❌ DON'T
- Don't claim a build pass you didn't actually run.
- Don't skip the AR check because "it's just EN strings".

---

## 6. Common Task Recipes

Each recipe tells you exactly where to go and in what order.

### 6.1 "Add a new static landing page"

1. **Intake** → §1 checklist, **Scoping** → §3.
2. **Design** → [Design.md §1–7](./Design.md) for tokens and screen anatomy.
3. [src/app/<slug>/page.tsx](src/app/) — Server Component, metadata, import view.
4. [src/app/ar/<slug>/page.tsx](src/app/ar/) — mirror, imports AR view.
5. [src/views/<slug>-view.tsx](src/views/) **or** [src/components/<slug>/<slug>-view.tsx](src/components/) + twin.
6. [src/components/<slug>/](src/components/) — section components + twins.
7. [src/locales/en.json](src/locales/en.json) + [src/locales/ar.json](src/locales/ar.json) keys.
8. [src/app/sitemap.ts](src/app/sitemap.ts) — confirm inclusion.
9. **Verify** → [QA.md](./QA.md) full run + manual browser check.

**DO:** copy the shape of a nearby existing page.  **DON'T:** introduce a new font/host/dependency.

### 6.2 "Adjust a visible section (EN + AR)"

1. Locate EN file in [src/components/<scope>/](src/components/).
2. Locate AR twin (`ar-*.tsx` or `Ar*.tsx` inside a sibling folder).
3. Apply the change to BOTH.
4. If a new string is introduced: add to [en.json](src/locales/en.json) **and** [ar.json](src/locales/ar.json).
5. Verify both routes manually.

**DO:** keep the EN file and the AR twin structurally identical where possible.  **DON'T:** edit only EN and assume AR will follow.

### 6.3 "Render a new Firestore field"

1. Update the type in [src/types/*.ts](src/types/).
2. Update the service read in [src/services/<domain>/](src/services/) (usually just `as PageData`).
3. Update the renderer component(s).
4. Check BOTH [grade-subject-level-v2.tsx](src/components/grade-subject-level/grade-subject-level-v2.tsx) and [grade-subject-level.tsx](src/components/grade-subject-level/grade-subject-level.tsx) if it's a grade-subject-level field.
5. If the field is text, it's authored per-language in the CMS — render what comes from Firestore. **Do NOT translate client-side.**

**DO:** preserve existing field casing / misspellings (e.g. `placment`).  **DON'T:** rename fields to "clean up" schemas — the CMS writes them.

### 6.4 "SEO fix / metadata update"

1. Identify the route file at [src/app/<route>/page.tsx](src/app/).
2. Update `generateMetadata` return (title, description, openGraph, alternates).
3. For site-wide changes involving [UniversalSchema](src/components/seo/) — foundation-adjacent, confirm before editing.
4. Check `/sitemap.xml` and `robots.txt` stay consistent.
5. Build + view-source verification.

**DO:** make sure EN and AR metadata both update.  **DON'T:** inline the schema JSON-LD in a new place — there is one central site-wide component.

### 6.5 "Performance regression"

1. Reproduce with `npm run build && npm start` (port 3000) — dev mode is noisy.
2. `npm run build:analyze` for bundle size.
3. Check: are any heavy components statically imported where they should be dynamic?
4. Check: any new image remote hosts slowing LCP?
5. Check: any synchronous Firestore read blocking the server render?
6. Refer to [PERFORMANCE_OPTIMIZATION_PLAN.md](PERFORMANCE_OPTIMIZATION_PLAN.md).

**DO:** profile before you optimize.  **DON'T:** add Framer Motion / animation libraries to "smooth" things out — forbidden ([RULES §RULE-01](./RULES.md)).

### 6.6 "Legacy URL redirect"

1. Redirects live in [next.config.mjs](next.config.mjs) `redirects()` array.
2. `next.config.mjs` is foundation-adjacent — confirm with the user before editing.
3. Use `permanent: true` unless the mapping is temporary.
4. Deploy + verify with `curl -I https://staging.tuitionaledu.com/old-url`.

**DO:** add 301s with `permanent: true` by default.  **DON'T:** put the redirect inside a route file — it breaks static analysis.

---

## 7. Things that LOOK like this repo's job but AREN'T

| Task | Where it actually belongs |
|---|---|
| Edit page content (hero title, FAQs, tutor bios) | **TuitionalCMS** |
| Add a new blog post | **TuitionalCMS** |
| Adjust pricing numbers | **TuitionalCMS** (`custom-pricing` collection) |
| Translate an existing blog from EN to AR | **TuitionalCMS** translation UI |
| Add a new Firestore collection | **TuitionalCMS** (schema) → then tuitionalFrontend (renderer) |

### ✅ DO
- Redirect content requests to the CMS.
- Render whatever comes out of Firestore.

### ❌ DON'T
- Don't add forms that write to Firestore — this repo is READ-ONLY.
- Don't translate content text client-side — it's authored per-language in the CMS.

---

## 8. Escalation — STOP AND ASK

Stop immediately and request human input when ANY of the following is true:

1. The design requires a color / shadow / radius not already in [Design.md §1–4](./Design.md).
2. A UI pattern (stepper, date picker, video chrome, etc.) has no precedent in `src/components/**`.
3. A new dependency would be installed (`package.json` delta of any kind).
4. A foundation file from [RULES §RULE-13](./RULES.md) needs editing.
5. A new `/api/*` route, Firestore write, auth pattern, or data-fetching framework is required.
6. A new image remote host needs allowlisting in [next.config.mjs](next.config.mjs).
7. A new font family is required.
8. You would need to rename a legacy-misspelled file/folder/route to finish the work.
9. A Firestore schema change is implied (coordinate with the CMS).
10. The request implies mutating content data (that's a CMS task).

---

## 9. Cross-Repo Contrast (CMS vs this repo)

Both repos have `.claude/skills/ui-pipeline/` folders — **do not copy rules between them**:

| Concern | This repo (tuitionalFrontend) | TuitionalCMS |
|---|---|---|
| `t` | Function: `t("key.path")` | Plain object: `t.key` |
| Styling | `sx` **OR** CSS modules | `sx` ONLY (CSS modules banned) |
| DnD | None | `@hello-pangea/dnd` |
| Rich text | None | Quill |
| Form helper | inline `useI18n()` | `useFormTranslations()` mandatory |
| Package manager | `npm` | `yarn` |
| Direction | READS Firestore | WRITES Firestore |
| Context folder | `src/context/` (singular) | `src/contexts/` (plural) |

---

## 10. Definition of Done

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

## 11. Next stop in the pipeline

- **Need tokens, palettes, or screen anatomy?** → [Design.md](./Design.md)
- **Need file templates, bilingual idioms, folder conventions?** → [UI.md](./UI.md)
- **Need to verify the hard gates?** → [RULES.md](./RULES.md)
- **Ready to declare done?** → [QA.md](./QA.md)

**End.** Read the ask, respect the codebase, verify everything, ship nothing partial.
