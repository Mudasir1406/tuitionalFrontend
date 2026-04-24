---
name: tuitionalFrontend UI QA
description: Stage 4 of the SDLC — the final verification gate. Run every check in this file before declaring any UI task complete. Non-passing items are blockers; a single ❌ returns you to the implementation phase.
type: qa
---

# tuitionalFrontend — UI Quality Assurance (SDLC Stage 4)

> **Where you are in the pipeline:** You arrived here from [UI.md §15 Authoring Checklist](./UI.md) with the implementation complete. This is the final gate before ship. If ANY item below is ❌, loop back to [Development.md §4 Implementation](./Development.md) and fix, then re-run this gate.
> **When to run:** After completing ANY UI task (new component, view edit, section change, style adjustment, translation addition, SEO update, redirect).
> **How to run:** Work through each section top-to-bottom. Mark each item ✅ PASS or ❌ FAIL with a note. A single ❌ blocks delivery.
> **Paired docs:** [RULES.md](./RULES.md) for the hard rules, [Design.md](./Design.md) for tokens, [UI.md](./UI.md) for templates.

---

## 0. SDLC Navigation Band

```
Development.md ───► Design.md ───► UI.md ───►  [QA.md — you are here]  ───► Ship
                                                         ▲
                                                         │  always consult
                                                         ▼
                                                    RULES.md
```

| If a QA item fails… | Go to |
|---|---|
| Wrong token (color/shadow/radius) | [Design.md §1–4](./Design.md) |
| Wrong file template / folder | [UI.md §3–5](./UI.md) |
| Forbidden API / dependency used | [RULES.md §RULE-01 / §RULE-02](./RULES.md) |
| Need to understand what file owns the symptom | [Development.md §2 Context Map](./Development.md) |
| Full QA failure → re-enter implementation | [Development.md §4](./Development.md) |

---

## QA-00 — Scope & Intent

| Check | Expected |
|---|---|
| 0.1 | The change matches the user's request exactly — no unauthorized additions, refactors, or "while we're here" edits |
| 0.2 | No foundation file was modified without explicit approval (see [RULES §RULE-13](./RULES.md)) |
| 0.3 | No new dependency was added to `package.json` without approval |
| 0.4 | No new image remote host / font / API route / secret was introduced without approval |
| 0.5 | The task belongs in this repo (rendering) — not the CMS (content) |

### ✅ DO
- Diff the scope against the original user message before signing off.
- If you did something "extra", revert it.

### ❌ DON'T
- Don't ship a refactor stapled onto a feature task.
- Don't edit a foundation file and hope no one notices.

---

## QA-01 — Stack & Dependencies

| Check | Expected |
|---|---|
| 1.1 | Only approved libraries (`@mui/material`, `@mui/icons-material`, `@emotion/*`, `swiper`, `moment`, `axios`, `firebase`, `react-hot-toast`, `cheerio`, `react-phone-number-input`, `wavesurfer.js`, `country-flag-icons`) |
| 1.2 | No Tailwind / Bootstrap / SCSS / animation library / state manager added |
| 1.3 | No rich-text editor, no drag-and-drop library — this repo does not use them |
| 1.4 | No `@mui/lab` or `@mui/x-*` import |
| 1.5 | Package manager commands use `npm`, not `yarn` |

### ✅ DO
- Run `git diff package.json package-lock.json` — should be empty for a typical feature task.

### ❌ DON'T
- Don't install even a tiny helper library without approval.

**If this fails →** revert the dep, re-plan via [Development.md §8 Escalation](./Development.md).

---

## QA-02 — Styling Compliance

| Check | Expected |
|---|---|
| 2.1 | The component uses **either** Pattern A (`sx` + `const styles`) **or** Pattern B (CSS module) — consistently, not mixed for the same property |
| 2.2 | If Pattern B: the `.module.css` lives next to the `.tsx` in the same folder |
| 2.3 | No `styled()` / `makeStyles` / `withStyles` usage |
| 2.4 | No edits to [globals.css](src/app/globals.css) or [style.css](src/app/style.css) |
| 2.5 | No `theme.palette.*` or `theme.spacing(n)` inside `sx` — literal values or CSS variables only |
| 2.6 | No `em` units anywhere; no `vw` for font-size |
| 2.7 | No inline `style={{}}` except for runtime-computed values, `next/image` sizing, or specific `Link` overrides |

### ✅ DO
- Grep the new file for `styled(`, `makeStyles`, `theme.palette`, `theme.spacing`, `em`, `vw` — all should return zero.

### ❌ DON'T
- Don't mix Pattern A + Pattern B for the same property.

**If this fails →** [UI.md §4–5](./UI.md) has the clean templates.

---

## QA-03 — Design Tokens

### Colors

| Check | Expected |
|---|---|
| 3.1 | Brand blue: `#38b6ff` or `var(--color-accent)` |
| 3.2 | Section wash: `#D7F0FF` |
| 3.3 | Body text: `#2d2d2d` / `var(--color-text-main)`; headline black: `#000` |
| 3.4 | Neutrals outside pricing: `#666`, `#454545`, `#2d2d2d` |
| 3.5 | Pricing slate used ONLY inside [components/pricing/](src/components/pricing/) |
| 3.6 | No invented colors |

### Typography

| Check | Expected |
|---|---|
| 3.7 | `<Typography variant="h1\|h2\|…">` used where possible |
| 3.8 | Hand-sized text pulls from `TYPOGRAPHY_TOKENS` |
| 3.9 | `fontFamily` set only via CSS variable or `leagueSpartan.className` |
| 3.10 | Input `fontSize` never drops below `16px` on mobile |

### Shadows & Radii

| Check | Expected |
|---|---|
| 3.11 | Shadows match the table in [Design.md §3](./Design.md) |
| 3.12 | Radii in `{8px, 10px, 12px, 16px, 20px, 50%}` — no invented values |

### ✅ DO
- Keep a browser tab open on [Design.md](./Design.md) while you run this section.

### ❌ DON'T
- Don't guess "this shade looks close enough" — open Design.md and match exactly.

**If this fails →** pick legal tokens from [Design.md §1–4](./Design.md).

---

## QA-04 — i18n (CRITICAL — this repo's #1 defect source)

| Check | Expected |
|---|---|
| 4.1 | `t` is called as a FUNCTION: `t("nav.home")` — never as `t.nav.home` |
| 4.2 | Hook comes from `@/hooks/useI18n` or `@/context/language-context` |
| 4.3 | Every user-facing string exists in BOTH `src/locales/en.json` AND `src/locales/ar.json` |
| 4.4 | No hardcoded English-only string on a surface that ships to `/ar/**` |
| 4.5 | New keys follow the existing dot-path structure |
| 4.6 | Keys are consumed via `t()`, not inlined by importing `en.json` directly |

### Quick verification

Open `/ar/<route>` in the browser. If you see ANY English that isn't a brand name or URL, it's a defect — a missing key fell back.

### ✅ DO
- Add EN and AR keys in the SAME commit.
- Use `grep -n "t\." src/components/<new-file>.tsx` — there should be no hits (you're not calling `t` as an object).

### ❌ DON'T
- ❌ `t.nav.home` (that's the CMS pattern — throws here).
- ❌ `import en from "@/locales/en.json"` inside a component.

**If this fails →** [src/locales/ar.json](src/locales/ar.json) for missing keys; [UI.md §7](./UI.md) for the correct pattern.

---

## QA-05 — RTL & Bilingual Layout

| Check | Expected |
|---|---|
| 5.1 | `<html dir="rtl" lang="ar">` on `/ar/**` pages (verify in DevTools) |
| 5.2 | Direction-sensitive styles have `isRTL` / `isArabic` conditionals: `flexDirection`, `textAlign`, `justifyContent`, `right/left`, `transformOrigin`, Drawer `anchor` |
| 5.3 | OR — a paired `ar-*.tsx` / `Ar*.tsx` twin file handles AR layout |
| 5.4 | When editing a shared concept, the Arabic twin was updated in lockstep |
| 5.5 | New `/route` has an `/ar/route` mirror (or an explicit documented reason it's EN-only) |
| 5.6 | AR text renders in Noto Sans Arabic (handled by `html[dir="rtl"] *` in [globals.css](src/app/globals.css)) |

### Quick verification

1. Open `/<route>` and `/ar/<route>` side-by-side.
2. The AR version should feel mirrored: primary column on the right, icons/arrows point correctly, headings align right.
3. If `/ar` looks identical to `/` or broken, RTL is not wired up.

### ✅ DO
- Spot-check with Chrome DevTools' "Toggle device toolbar" + Arabic emulation.

### ❌ DON'T
- Don't install `stylis-plugin-rtl` — this repo handles RTL manually.

**If this fails →** [RULES §RULE-07](./RULES.md); [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) for dir logic.

---

## QA-06 — Server/Client Boundary & Data

| Check | Expected |
|---|---|
| 6.1 | `app/**/page.tsx` is a Server Component (no `"use client"`) and calls services directly |
| 6.2 | Client components don't call Firebase SDK in their render path |
| 6.3 | No `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` anywhere — READ-ONLY repo |
| 6.4 | Service functions return `null` / `[]` / `undefined` on failure — never throw upstream |
| 6.5 | Missing data handled with `redirect("/404")` in the Server Component |
| 6.6 | Collection naming uses `-en` / `-ar` suffix consistently |

### ✅ DO
- `grep -rn "setDoc\|addDoc\|updateDoc\|deleteDoc" src/` — should return zero hits.
- Verify services in [src/services/<domain>/](src/services/) return `null`/`[]` not `throw`.

### ❌ DON'T
- Don't introduce write ops.
- Don't call `getDoc`/`collection`/`query` inside `src/components/`.

**If this fails →** [RULES §RULE-08](./RULES.md); service registry in [UI.md §9](./UI.md).

---

## QA-07 — Routing & SEO

| Check | Expected |
|---|---|
| 7.1 | `generateMetadata` (or static `metadata` export) defined for new routes |
| 7.2 | Exactly one `<h1>` on the page (DevTools: `$$('h1')` in console) |
| 7.3 | Heading hierarchy is strict — no skipping |
| 7.4 | Every `next/image` has a descriptive `alt` attribute |
| 7.5 | Remote images come from hosts already allowlisted in [next.config.mjs](next.config.mjs) |
| 7.6 | New routes appear in `/sitemap.xml` (via [sitemap.ts](src/app/sitemap.ts)) |
| 7.7 | Legacy misspelled routes (`/curiculume`, `/maincuriculume`) still reachable — not renamed |
| 7.8 | Added redirects live in [next.config.mjs](next.config.mjs) `redirects()`, not via `redirect()` in a route file |

### ✅ DO
- `curl -s http://localhost:3000/sitemap.xml | grep <new-slug>` to verify.
- DevTools → Elements → search `<h1` — should match exactly once.

### ❌ DON'T
- Don't rename legacy routes.
- Don't add `generateMetadata` with a duplicate title of another page.

**If this fails →** [RULES §RULE-09, §RULE-14](./RULES.md).

---

## QA-08 — Analytics Preservation

| Check | Expected |
|---|---|
| 8.1 | GTM noscript iframe still present in `<body>` |
| 8.2 | Facebook Pixel inline init script still present in `<head>` |
| 8.3 | `<FbPixelPageView />` still mounted in [layout.tsx](src/app/layout.tsx) |
| 8.4 | `<UniversalSchema />` JSON-LD still present |
| 8.5 | Facebook domain-verification `<meta>` still present |
| 8.6 | New Pixel events (Lead, Contact, etc.) mirror server-side via `/api/meta-conversion` |
| 8.7 | `PIXEL_TOKEN` from [src/utils/env.ts](src/utils/env.ts) NOT exposed to the client |

### Verification

- DevTools → Network → filter `facebook.com` → load the page → confirm `tr?id=1950457082424995&ev=PageView` fires.
- DevTools → Network → filter `googletagmanager.com` → confirm GTM container loads.

### ✅ DO
- Check DevTools after every route change.

### ❌ DON'T
- Don't move or wrap the analytics scripts.

**If this fails →** [RULES §RULE-14](./RULES.md); tracker file at [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx).

---

## QA-09 — Responsive Layout

| Check | Expected |
|---|---|
| 9.1 | Test at 320px (smallest mobile), 600px (sm), 900px (md), 1200px (lg), 1920px (desktop) |
| 9.2 | No horizontal scroll at any width |
| 9.3 | Typography scales: h1 on mobile ≈ 1.75rem, not 3rem |
| 9.4 | Inputs never drop below 16px font-size on mobile (iOS zoom prevention) |
| 9.5 | Interactive hit targets ≥ 44×44px on mobile |
| 9.6 | Images: `width`/`height` explicit; hero uses `priority` |
| 9.7 | Breakpoints match MUI `xs/sm/md/lg/xl` at `0/600/900/1200/1536` |

### ✅ DO
- Use DevTools' responsive mode at the exact widths above, not "close enough" values.

### ❌ DON'T
- Don't introduce horizontal overflow (enforced globally by [globals.css](src/app/globals.css)).

**If this fails →** [RULES §RULE-10](./RULES.md); [Design.md §6](./Design.md) for breakpoints.

---

## QA-10 — Provider & Root Hygiene

| Check | Expected |
|---|---|
| 10.1 | No second `ThemeProvider` / `I18nProvider` / `DrawerProvider` mounted (all at root in [layout.tsx](src/app/layout.tsx)) |
| 10.2 | Only one `<Toaster />` mounted |
| 10.3 | Context consumption via hooks (`useI18n()`, `useDrawer()`, `useTheme()`) — no prop-drilling |

### ✅ DO
- Grep for `ThemeProvider`, `I18nProvider`, `DrawerProvider`, `<Toaster` — each should appear once ([layout.tsx](src/app/layout.tsx)).

### ❌ DON'T
- Don't wrap a subtree in a second provider.

**If this fails →** [RULES §RULE-11](./RULES.md).

---

## QA-11 — Interaction & Feedback

| Check | Expected |
|---|---|
| 11.1 | Loading states use `CircularProgress` or `Skeleton` |
| 11.2 | Form submission errors use `toast.error(bilingual string)` |
| 11.3 | Form submission success uses `toast.success(bilingual string)` |
| 11.4 | No `alert()`, no `window.confirm()` anywhere in new code |
| 11.5 | Hover / focus states visible and accessible |
| 11.6 | Keyboard navigation: Tab order sensible, Enter/Space triggers interactive elements |

### ✅ DO
- Tab through the new UI with the keyboard only.
- Trigger a form error and confirm the toast reads correctly in both languages.

### ❌ DON'T
- Don't use `alert()` / `window.confirm()` — not the house pattern.

---

## QA-12 — Legacy Preservation

| Check | Expected |
|---|---|
| 12.1 | Legacy misspelled files/routes unchanged: `curiculume/`, `maincuriculume/`, `form-dialouge.tsx`, `ar-form-dialouge.tsx`, `students-says.tsx`, etc. |
| 12.2 | `placment` spelling preserved in Firestore reads |
| 12.3 | `src/context/` (singular) still hosts the two providers — no new `src/contexts/` folder |
| 12.4 | Both grade-subject-level renderer variants (V1 + V2) still work |

### ✅ DO
- `git diff --name-only` and verify no legacy misspelling was "corrected".
- Visit both `/online/<slug>` (V2) and a legacy V1 slug to confirm both still render.

### ❌ DON'T
- Don't rename a single legacy file.

**If this fails →** [RULES §RULE-15](./RULES.md).

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
| 13.3 | No TypeScript errors (strict mode is on — mind your types) |
| 13.4 | No new console errors / warnings at runtime on the affected routes |
| 13.5 | No obvious bundle-size regression (check with `npm run build:analyze` if touching a large surface) |

### ✅ DO
- Run `npm run build` from a fresh `.next` if you've been dev-serving (`rm -rf .next && npm run build`).

### ❌ DON'T
- Don't suppress lint with `// eslint-disable-next-line` to force a pass.
- Don't ship with TypeScript errors.

---

## QA-14 — Manual Smoke Test

```bash
npm run dev
```

Then open:

1. `http://localhost:3000/<new-or-changed-route>` — verify EN.
2. `http://localhost:3000/ar/<same-route>` — verify AR.
3. DevTools Mobile Emulation → iPhone SE (375×667) — verify layout.
4. DevTools Mobile Emulation → iPad (768×1024) — verify layout.
5. DevTools Network tab — confirm no unexpected failures / slow resources.
6. DevTools Console — confirm no new errors / warnings.

### ✅ DO
- Click every new CTA.
- Trigger every new form submission path.

### ❌ DON'T
- Don't declare "works on my machine" without running the actual routes.

---

## QA-15 — Secrets & Security

| Check | Expected |
|---|---|
| 15.1 | No new secrets committed to source |
| 15.2 | `PIXEL_TOKEN` in [src/utils/env.ts](src/utils/env.ts) untouched (known debt) |
| 15.3 | API routes with sensitive tokens (meta-conversion) keep them server-side |
| 15.4 | No new `console.log` of user data, tokens, or internal IDs |

### ✅ DO
- Grep the diff for `console.log`, `token`, `secret`, `api-key` — sanity-check each hit.

### ❌ DON'T
- Don't add `.env` variables that leak into the client bundle (no `NEXT_PUBLIC_*` for secrets).

**If this fails →** [RULES §RULE-17](./RULES.md).

---

## QA-16 — Final Sign-off

Before declaring done, confirm ALL of the following:

```
☐ QA-00 through QA-15 all ✅
☐ [RULES.md §RULE-19](./RULES.md) pre-commit gate passes
☐ Both EN and AR routes manually verified in a browser
☐ Both desktop and mobile layouts manually verified
☐ No foundation file modified without approval
☐ No new dependency / font / remote host / secret / API route
☐ Analytics tags still fire correctly
☐ npm run lint clean
☐ npm run build successful
☐ No regression in Lighthouse / Core Web Vitals (spot check)
☐ No content-data changes were made here (belongs in the CMS)
```

### ✅ DO
- Ship only when every box is green.

### ❌ DON'T
- Don't ship a partial pass "and clean up in a follow-up" — that follow-up rarely happens.

---

## 17. Where to go next

- **Passed every gate?** → Ship.
- **Failed a gate?** → Return to [Development.md §4 Implementation](./Development.md), fix, then re-run this full QA.
- **Need to re-confirm a rule?** → [RULES.md](./RULES.md).
- **Need a design token?** → [Design.md](./Design.md).
- **Need a code template?** → [UI.md](./UI.md).
- **Need to locate the right file for a symptom?** → [Development.md §2 Context Map](./Development.md).

---

**End.** Quality is the feature — ship a clean diff or none at all.
