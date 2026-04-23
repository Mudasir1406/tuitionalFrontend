---
name: tuitionalFrontend UI QA
description: Mandatory QA gate for all frontend work on the public marketing site. Run every check in this file before declaring any UI task complete. Non-passing items are blockers — do not ship until resolved.
type: qa
---

# tuitionalFrontend — UI Quality Assurance

> **When to run:** After completing ANY UI task (new component, view edit, section change, style adjustment, translation addition, SEO update, redirect).
> **How to run:** Work through each section top-to-bottom. Mark each item ✅ PASS or ❌ FAIL with a note. A single ❌ blocks delivery.
> **Paired docs:** [RULES.md](./RULES.md) for the hard rules, [Design.md](./Design.md) for tokens, [UI.md](./UI.md) for templates.

---

## QA-00 — Scope & Intent

| Check | Expected |
|---|---|
| 0.1 | The change matches the user's request exactly — no unauthorized additions, refactors, or "while we're here" edits |
| 0.2 | No foundation file was modified without explicit approval (see [RULES.md §13](./RULES.md)) |
| 0.3 | No new dependency was added to `package.json` without approval |
| 0.4 | No new image remote host / font / API route / secret was introduced without approval |
| 0.5 | The task belongs in this repo (rendering) — not the CMS (content) |

---

## QA-01 — Stack & Dependencies

| Check | Expected |
|---|---|
| 1.1 | Only approved libraries in use (MUI, Emotion, swiper, moment, axios, firebase, react-hot-toast, cheerio, react-phone-number-input, wavesurfer.js, country-flag-icons) |
| 1.2 | No Tailwind / Bootstrap / SCSS / animation library / state manager added |
| 1.3 | No rich-text editor, no drag-and-drop library — this repo does not use them |
| 1.4 | No `@mui/lab` or `@mui/x-*` import |
| 1.5 | Package manager commands use `npm`, not `yarn` |

---

## QA-02 — Styling Compliance

### Both patterns accepted — consistency within a file

| Check | Expected |
|---|---|
| 2.1 | The component uses **either** Pattern A (`sx` + `const styles`) **or** Pattern B (CSS module) — consistently, not mixed for the same property |
| 2.2 | If Pattern B: the `.module.css` file lives next to the `.tsx` in the same folder |
| 2.3 | No `styled()` / `makeStyles` / `withStyles` usage |
| 2.4 | No edits to [globals.css](src/app/globals.css) or [style.css](src/app/style.css) |
| 2.5 | No `theme.palette.*` or `theme.spacing(n)` inside `sx` — literal values or CSS variables only |
| 2.6 | No `em` units anywhere; no `vw` for font-size |
| 2.7 | No inline `style={{}}` except for runtime-computed values, `next/image` sizing, or specific `Link` overrides |

---

## QA-03 — Design Tokens

### Colors

| Check | Expected |
|---|---|
| 3.1 | Brand blue: `#38b6ff` or `var(--color-accent)` — both fine |
| 3.2 | Section wash: `#D7F0FF` |
| 3.3 | Body text: `#2d2d2d` / `var(--color-text-main)`; headline black: `#000` |
| 3.4 | Neutrals outside pricing: `#666`, `#454545`, `#2d2d2d` |
| 3.5 | Pricing slate (`#1e293b`, `#334155`, `#64748b`, `#e2e8f0`, `#f1f5f9`, `#f8fafc`) used ONLY inside `components/pricing/` |
| 3.6 | No invented colors |

### Typography

| Check | Expected |
|---|---|
| 3.7 | Typography uses `<Typography variant="h1\|h2\|…">` where possible |
| 3.8 | Hand-sized text pulls values from `TYPOGRAPHY_TOKENS` (no improvised `rem` / `px`) |
| 3.9 | `fontFamily` is set only via CSS variable or `leagueSpartan.className` — not literal family strings |
| 3.10 | Input `fontSize` never drops below `16px` on mobile |

### Shadows & Radii

| Check | Expected |
|---|---|
| 3.11 | Shadows match the table in [Design.md §3](./Design.md) |
| 3.12 | Radii in `{8px, 10px, 12px, 16px, 20px, 50%}` — no invented values |

---

## QA-04 — i18n (CRITICAL — this repo's #1 defect source)

| Check | Expected |
|---|---|
| 4.1 | `t` is called as a FUNCTION: `t("nav.home")` — never as `t.nav.home` |
| 4.2 | Hook comes from `@/hooks/useI18n` or `@/context/language-context` — not a homegrown alternative |
| 4.3 | Every user-facing string exists in BOTH `src/locales/en.json` AND `src/locales/ar.json` |
| 4.4 | No hardcoded English-only string on a surface that ships to `/ar/**` |
| 4.5 | New keys added follow the existing dot-path structure (e.g. `"myFeature.title"`, not flat prefixes) |
| 4.6 | Keys are consumed from the JSON files, not inlined by importing `en.json` directly |

### Quick verification

Open the AR route in a browser with `/ar/<route>`. If you see ANY English that isn't a brand name or a URL, it's a defect — a missing key fell back.

---

## QA-05 — RTL & Bilingual Layout

| Check | Expected |
|---|---|
| 5.1 | `<html dir="rtl" lang="ar">` on `/ar/**` pages (verify in DevTools) |
| 5.2 | Direction-sensitive styles have `isRTL` / `isArabic` conditionals: `flexDirection`, `textAlign`, `justifyContent`, `right/left`, `transformOrigin`, Drawer `anchor` |
| 5.3 | OR — a paired `ar-*.tsx` / `Ar*.tsx` twin file handles the AR layout |
| 5.4 | When editing a shared concept, the Arabic twin was updated in lockstep |
| 5.5 | New `/route` has an `/ar/route` mirror (or an explicit documented reason it's EN-only) |
| 5.6 | AR text renders in Noto Sans Arabic (the `html[dir="rtl"] *` selector in globals.css handles this automatically — no manual `fontFamily` needed) |

### Quick verification

1. Open `/<route>` and `/ar/<route>` side-by-side.
2. The AR version should feel mirrored: the primary column sits on the right for LTR readers' intuition, icons/arrows point correctly, headings align right.
3. If `/ar` looks identical to `/` or broken, RTL is not wired up.

---

## QA-06 — Server/Client Boundary & Data

| Check | Expected |
|---|---|
| 6.1 | `app/**/page.tsx` is a Server Component (no `"use client"`) and calls services directly |
| 6.2 | Client components don't call Firebase SDK in their render path |
| 6.3 | No `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` anywhere — this repo is READ-ONLY |
| 6.4 | Service functions return `null` / `[]` / `undefined` on failure — never throw upstream |
| 6.5 | Missing data is handled with `redirect("/404")` in the Server Component |
| 6.6 | Collection naming uses the `-en` / `-ar` suffix convention consistently |

---

## QA-07 — Routing & SEO

| Check | Expected |
|---|---|
| 7.1 | `generateMetadata` (or static `metadata` export) is defined for new routes |
| 7.2 | Exactly one `<h1>` on the page (use DevTools "Accessibility → Landmarks" or `$$('h1')` in console) |
| 7.3 | Heading hierarchy is strict — no skipping (no `<h1>` followed by `<h3>`) |
| 7.4 | Every `next/image` has a descriptive `alt` attribute |
| 7.5 | Remote images come from hosts already allowlisted in [next.config.mjs](next.config.mjs) |
| 7.6 | New routes appear in `/sitemap.xml` (either via [sitemap.ts](src/app/sitemap.ts) hand-listing or dynamic iteration) |
| 7.7 | Legacy misspelled routes (`/curiculume`, `/maincuriculume`) are still reachable — not renamed |
| 7.8 | If the task added a redirect, it was added to [next.config.mjs](next.config.mjs) `redirects()`, not via `redirect()` in a route file |

---

## QA-08 — Analytics Preservation

| Check | Expected |
|---|---|
| 8.1 | GTM noscript iframe still present in `<body>` |
| 8.2 | Facebook Pixel inline init script still present in `<head>` |
| 8.3 | `<FbPixelPageView />` still mounted in [layout.tsx](src/app/layout.tsx) |
| 8.4 | `<UniversalSchema />` JSON-LD still present |
| 8.5 | Facebook domain-verification `<meta>` still present |
| 8.6 | If the task fired a new Pixel event (Lead, Contact, etc.), server-side mirror was sent via `/api/meta-conversion` |
| 8.7 | `PIXEL_TOKEN` from [src/utils/env.ts](src/utils/env.ts) is NOT exposed to the client |

### Verification

- DevTools → Network → filter by `facebook.com` → load the page → confirm a `tr?id=1950457082424995&ev=PageView` request fires
- DevTools → Network → filter by `googletagmanager.com` → confirm GTM container loads

---

## QA-09 — Responsive Layout

| Check | Expected |
|---|---|
| 9.1 | Test at 320px (smallest mobile), 600px (sm), 900px (md), 1200px (lg), 1920px (desktop) |
| 9.2 | No horizontal scroll at any width (globals.css enforces this globally — your code should NOT re-introduce it) |
| 9.3 | Typography scales correctly: h1 on mobile ≈ 1.75rem, not 3rem (theme override handles this automatically for `<Typography>`) |
| 9.4 | Inputs never drop below 16px font-size on mobile (iOS zoom prevention) |
| 9.5 | Interactive hit targets ≥ 44×44px on mobile |
| 9.6 | Images don't break layout: `width`/`height` are set explicitly; hero uses `priority` |
| 9.7 | Breakpoint overlaps are consistent: MUI `xs/sm/md/lg/xl` at `0/600/900/1200/1536` matches CSS-module breakpoints |

---

## QA-10 — Provider & Root Hygiene

| Check | Expected |
|---|---|
| 10.1 | No second `ThemeProvider` / `I18nProvider` / `DrawerProvider` mounted anywhere (all are at the root in [layout.tsx](src/app/layout.tsx)) |
| 10.2 | Only one `<Toaster />` mounted |
| 10.3 | Context consumption via `useI18n()`, `useDrawer()`, `useTheme()` — no prop-drilling of context values |

---

## QA-11 — Interaction & Feedback

| Check | Expected |
|---|---|
| 11.1 | Loading states (where relevant) use `CircularProgress` or `Skeleton` |
| 11.2 | Form submission errors use `toast.error(bilingual string)` |
| 11.3 | Form submission success uses `toast.success(bilingual string)` |
| 11.4 | No `alert()`, no `window.confirm()` anywhere in new code |
| 11.5 | Hover / focus states are visible and accessible |
| 11.6 | Keyboard navigation works: Tab order is sensible, Enter/Space triggers interactive elements |

---

## QA-12 — Legacy Preservation

| Check | Expected |
|---|---|
| 12.1 | Legacy misspelled files/routes unchanged: `curiculume/`, `maincuriculume/`, `form-dialouge.tsx`, `ar-form-dialouge.tsx`, `students-says.tsx`, etc. |
| 12.2 | `placment` spelling preserved in Firestore reads (it's the key the CMS writes) |
| 12.3 | `src/context/` (singular) still hosts the two existing providers — no new `src/contexts/` folder |
| 12.4 | Both grade-subject-level renderer variants (V1 + V2) still work |

---

## QA-13 — Build & Lint

Run these and confirm clean output:

```bash
npm run lint     # no errors, no new warnings
npm run build    # builds successfully
```

| Check | Expected |
|---|---|
| 13.1 | `npm run lint` exits 0 with no new warnings |
| 13.2 | `npm run build` completes successfully |
| 13.3 | No TypeScript errors (strict mode is on in this repo — mind your types) |
| 13.4 | No new console errors / warnings at runtime on the affected routes |
| 13.5 | No obvious bundle-size regression (check with `npm run build:analyze` if touching a large surface) |

---

## QA-14 — Manual Smoke Test

Run the dev server and click through:

```bash
npm run dev
```

Then open:

1. `http://localhost:3000/<new-or-changed-route>` — verify EN
2. `http://localhost:3000/ar/<same-route>` — verify AR
3. DevTools Mobile Emulation → iPhone SE (375×667) — verify layout
4. DevTools Mobile Emulation → iPad (768×1024) — verify layout
5. DevTools Network tab — confirm no unexpected failures or slow resources
6. DevTools Console — confirm no new errors or warnings

---

## QA-15 — Secrets & Security

| Check | Expected |
|---|---|
| 15.1 | No new secrets committed to source |
| 15.2 | `PIXEL_TOKEN` in [src/utils/env.ts](src/utils/env.ts) is untouched (known debt, not your task) |
| 15.3 | API routes that use sensitive tokens (meta-conversion) keep them server-side |
| 15.4 | No new `console.log` of user data, tokens, or internal IDs |

---

## QA-16 — Final Sign-off

Before declaring done, confirm ALL of the following:

```
☐ QA-00 through QA-15 all ✅
☐ [RULES.md](./RULES.md) §19 pre-commit gate passes
☐ Both EN and AR routes manually verified in a browser
☐ Both desktop and mobile layouts manually verified
☐ No foundation file modified without approval
☐ No new dependency / font / remote host / secret / API route
☐ Analytics tags still fire correctly
☐ npm run lint clean
☐ npm run build successful
☐ No regression in Lighthouse / Core Web Vitals (spot check)
☐ No content-data changes were made here (they belong in the CMS)
```

If any item is ❌, **stop, fix, re-verify**. Do not ship partial work.

---

**End.** Quality is the feature — ship a clean diff or none at all.
