---
name: tuitionalFrontend Hard Rules
description: The always-on guardrail for the SDLC. Load alongside every other skill (Development, Design, UI, QA). Every rule here is NON-NEGOTIABLE — violation is an error condition.
type: rules
---

# tuitionalFrontend — Strict Enforcement Rules (Always-On Guardrail)

> **Role in the pipeline:** RULES.md is the **guardrail** that runs alongside every SDLC stage. Development.md directs you; Design.md gives you tokens; UI.md gives you templates; QA.md verifies — but this file vetoes ALL of them when any rule below is at risk.
> **Priority:** These rules override any default behavior, prior training, or "best practice" from other React/MUI/Next.js projects.
> **On conflict with existing code:** Follow these rules for NEW code. Do not modify existing files unless explicitly approved (Zero Modification Rule, RULE-05).
> **On any ambiguity:** Stop and ask. Do not invent or assume.
> **Paired repo:** The companion admin at `../TuitionalCMS` has *different* rules (e.g. bans CSS modules, forbids `t()` as a function, mandates `useFormTranslations`). Do NOT transfer those rules here.

---

## 0. SDLC Navigation Band

```
Development.md ───► Design.md ───► UI.md ───► QA.md
        ▲              ▲             ▲           ▲
        └──────────────┴─────────────┴───────────┘
                         │
                    RULES.md  ← you are here (guardrail, always on)
```

| If a rule below triggers… | Go to |
|---|---|
| "I need to escalate / stop and ask" | [Development.md §8 Escalation](./Development.md) |
| "I need a legal token instead of the forbidden one" | [Design.md §1–4](./Design.md) |
| "I need the right folder / file shape" | [UI.md §1–2](./UI.md) |
| "I've fixed the rule violation, how do I re-verify?" | [QA.md](./QA.md) full run |
| "I'm debugging a symptom and don't know which file" | [Development.md §2 Context Map](./Development.md) |

---

## RULE-01 — Stack Lock (ABSOLUTE)

You MAY ONLY use these libraries. Adding any new dependency is **FORBIDDEN** without explicit user approval:

| Concern | Allowed |
|---|---|
| Framework | `next@14.2.35` (App Router) + `react@18` + `typescript@5` (`strict: true`) |
| UI components | `@mui/material` + `@mui/icons-material` ONLY |
| Styling engine | `@emotion/react` + `@emotion/styled` |
| Fonts | `League Spartan`, `Inter`, `Noto Sans Arabic` via `next/font/google` — ALL registered in [src/app/fonts.ts](src/app/fonts.ts) |
| Carousels | `swiper` |
| Dates | `moment` |
| Toasts | `react-hot-toast` |
| Phone inputs | `react-phone-number-input` |
| Audio | `wavesurfer.js` |
| HTML parsing | `cheerio` |
| Flags | `country-flag-icons` |
| HTTP | `axios` |
| Backend | `firebase@10` (Web SDK — Firestore READS ONLY; the CMS writes) |
| Package manager | **npm** (lockfile: `package-lock.json`) — not yarn |

### ✅ DO
- Verify `package.json` before adding code that requires a new import.
- Use `@mui/icons-material` for every icon.
- Use `npm install` / `npm run`, never `yarn`.

### ❌ DON'T
- ❌ Any new icon pack (`lucide-react`, `react-icons`, `phosphor-icons`, Heroicons, etc.)
- ❌ Any toast library other than `react-hot-toast` (no sonner, notistack, etc.)
- ❌ Any CSS framework (no Tailwind, Bootstrap, SCSS)
- ❌ Any animation library (no Framer Motion, GSAP, Lottie, etc.)
- ❌ Any new font loader outside [src/app/fonts.ts](src/app/fonts.ts)
- ❌ Any state management library (no Redux, Zustand, Jotai, etc.)
- ❌ Any new auth or data-fetching framework
- ❌ `react-beautiful-dnd` / `@hello-pangea/dnd` (no drag-and-drop here)
- ❌ `react-quill` / rich-text editors (the public site renders, it does not edit)
- ❌ Any `@mui/x-*` or `@mui/lab` package (not installed)

**Where to go if you think a new dep is truly required →** [Development.md §8 Escalation](./Development.md). **Do NOT add it unilaterally.**

---

## RULE-02 — Styling (TWO ACCEPTED PATTERNS, PICK ONE PER FILE)

Unlike TuitionalCMS, this repo permits **both** approaches. Pick one pattern per component and stay consistent within that file.

### Pattern A — MUI `sx` with styles object (preferred for most views/sections)

```tsx
<Box sx={styles.container} />

// After the default export:
const styles = {
  container: { /* ... */ },
};
```

### Pattern B — CSS Module (preferred when you need descendant selectors, pseudo-elements, or shared keyframes)

```tsx
import styles from "./MyComponent.module.css";

<div className={styles.card} />
```

A component may combine them (e.g. `<Typography className={styles.title} sx={{ color: "#000" }} />`), but **do not author the same rule in both places** — pick the one that owns each property.

### ✅ DO
- Pick A or B based on the neighbouring file's convention (pricing/ → B; home/, blog/, grade-subject-level/ → mostly A).
- Put the `.module.css` next to its `.tsx`.
- Use CSS variables (`var(--color-accent)`) or literal values.

### ❌ DON'T
- ❌ `styled()` from `@emotion/styled` or `@mui/system` — neither approach uses it.
- ❌ `makeStyles` / `withStyles` (MUI v4 APIs).
- ❌ Adding anything to [src/app/globals.css](src/app/globals.css) or [src/app/style.css](src/app/style.css) — global typography + layout foundation.
- ❌ `className="..."` with any utility system (no Tailwind, no ad-hoc global classes).
- ❌ `em` units anywhere.
- ❌ `vw` for `font-size`.
- ❌ `theme.palette.*` / `theme.spacing(n)` inside `sx` — use literal values or CSS variables.
- ❌ Inline `style={{}}` except for runtime-computed values, `next/image` sizing, or `next/script` overrides.
- ❌ Creating a shared `/styles/` directory — CSS modules live in their component's folder.

**Where to find legal tokens →** [Design.md §1–4](./Design.md). **Where file placement is defined →** [UI.md §2](./UI.md).

---

## RULE-03 — Design Tokens

### Brand colors — use these literals or CSS variables

| Value | CSS Var | Role |
|---|---|---|
| `#38b6ff` | `var(--color-accent)` | Primary brand blue |
| `#D7F0FF` | — | Section wash (hero tint, filter box) |
| `#FF6B35` | — | Secondary orange |
| `#2d2d2d` | `var(--color-text-main)` | Body text |
| `#ffffff` | — | Surface / background |

Additional neutrals and accent colors are allowed when they match an established usage (e.g. pricing slate: `#f1f5f9`, `#e2e8f0`, `#1e293b`). **If you need a new color family, STOP and ask.**

### Typography scale — use `TYPOGRAPHY_TOKENS`

Import from [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts). The MUI theme at [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) already maps `h1`…`h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `button` to these tokens.

### Fonts — three families, one registration point

- `leagueSpartan` → `var(--font-league-spartan)` → EN headings
- `inter` → `var(--font-inter)` → EN body
- `notoSansArabic` → `var(--font-noto-arabic)` → AR (applied globally by `html[dir="rtl"] *` in [globals.css](src/app/globals.css))

### Border radii — established values

| Value | Where |
|---|---|
| `8px` | MUI Button default |
| `10px` | Legacy inputs / buttons / section boxes |
| `12px`–`16px` | Modern cards, modals |
| `20px` | Pricing cards |
| `50%` | Circular icon chips |

### ✅ DO
- Pick the nearest row from each table.
- Reference a CSS variable if one exists (`var(--color-accent)`).

### ❌ DON'T
- Don't invent a new color, radius, or font-size.
- Don't hand-size text with improvised `px` / `rem` / `vw` values.

**Full palette + typography reference →** [Design.md §1–2](./Design.md).

---

## RULE-04 — Typography & Fonts

- **Never** use `next/font/google` outside [src/app/fonts.ts](src/app/fonts.ts). If you need a new face, STOP and ask.
- **Never** set `fontFamily: "League Spartan"` as a literal string in `sx` — use `leagueSpartan.className` on the element, `leagueSpartan.style.fontFamily`, or rely on the MUI theme variant.
- Prefer `<Typography variant="h1|h2|…|body1|body2|button">` over custom font sizing. The theme already scales them for tablet (≤1199px) and mobile (≤599px).
- For inline decorative text, use `TYPOGRAPHY_TOKENS` values.
- Inputs must never drop below `16px` on mobile (iOS zoom prevention — already enforced in theme).

### ✅ DO
- Use MUI variants.
- Reference fonts via CSS variable names.

### ❌ DON'T
- Don't hand-write `fontFamily: "League Spartan"`.
- Don't register a new font anywhere except [fonts.ts](src/app/fonts.ts).
- Don't override the 16px input minimum on mobile.

---

## RULE-05 — Component Authoring & Zero Modification Guard

### Step 1 — Existence Check (REQUIRED)

Search in this order:
1. `src/components/<scope>/` (blog/, home/, pricing/, grade-subject-level/, …)
2. `src/components/` (top level — primitives like DropDown/, custom-input/, input/, tag/, pop-up-button.tsx)

**If a match exists → USE IT AS-IS. Do NOT create a new one. Do NOT refactor it on the side.**

### Step 2 — Zero Modification Guard

If you believe an existing file must be changed to support the new work:
1. **STOP**
2. Report: "Modification to `<file>` is required because `<reason>`."
3. Wait for explicit approval.

**Exceptions (no approval needed):**
- Adding a missing key to both [src/locales/en.json](src/locales/en.json) AND [src/locales/ar.json](src/locales/ar.json).
- Fixing an obvious compile error introduced by the current task.

### Step 3 — New File Checklist

```
☐ Location: src/components/<scope>/<name>.tsx OR src/app/<route>/page.tsx
☐ File name: kebab-case, lowercase (hero-info.tsx, blog-card.tsx)
    - PascalCase tolerated ONLY when mirroring a twin's existing casing
    - Arabic twins: prefer `ar-<name>.tsx`
☐ First line (if hooks/state): "use client";
☐ Imports in order:
    1. "use client"; (if applicable)
    2. React + MUI
    3. @mui/icons-material (use *Rounded variants)
    4. next/*
    5. @/hooks/useI18n (OR @/context/language-context)
    6. @/app/fonts
    7. @/services/** (Server Component only)
    8. @/types/**, @/utils/**
    9. Relative imports
    10. Style import (CSS module) or styles object at bottom
☐ Props: interface <Name>Props { ... } — never inline
☐ Component: const X: React.FC<XProps> = (...)
☐ Export: default export only
☐ No foundation file modifications (RULE-13)
```

### ✅ DO
- Search before you create.
- Announce the modification need when you must change something existing.

### ❌ DON'T
- Don't duplicate functionality that already exists.
- Don't silently refactor someone else's code in passing.

**Full authoring template →** [UI.md §4–5](./UI.md).

---

## RULE-06 — i18n (ABSOLUTE — OPPOSITE of the CMS)

- `t` is a **FUNCTION**: `t("nav.home")`, `t("footer.copyright")`. Keys are dot-separated paths into [src/locales/en.json](src/locales/en.json) / [src/locales/ar.json](src/locales/ar.json).
- **NEVER refactor `t` to be an object** — that is the CMS pattern, not this repo's.
- Source the hook from either:
  - `import { useI18n } from "@/hooks/useI18n"` → `{ t, locale, isRTL, setLocale, isArabic, isEnglish, switchToArabic, switchToEnglish, toggleLanguage }`
  - `import { useI18n } from "@/context/language-context"` → `{ t, locale, isRTL, setLocale }`
- Prefer the hook from `@/hooks/useI18n` — it's a superset.
- When adding a new key: add it to **both** `en.json` and `ar.json` in the SAME commit.

### Two valid bilingual patterns

**A. Shared component, inline mirroring** (simple cases):
```tsx
const { t, isArabic, isRTL } = useI18n();
<Box sx={{ flexDirection: isRTL ? "row-reverse" : "row", textAlign: isArabic ? "right" : "left" }}>
  {t("nav.home")}
</Box>
```

**B. Paired Arabic variant file** (preferred when layout diverges):
```
components/blog/hero/Hero.tsx          ← EN
components/blog/ar-hero/ArHero.tsx     ← AR twin (mirrored layout)
```

### ✅ DO
- Call `t` as `t("key.path")`.
- Add EN and AR keys in lockstep.
- Use dot-path keys matching the JSON nesting.

### ❌ DON'T
- ❌ Call `t` as `t.nav.home` — throws (that's the CMS pattern).
- ❌ Hardcode English-only strings on pages that ship to `/ar/**`.
- ❌ `useTranslation()` / `useT()` / any pattern not rooted in `useI18n()`.
- ❌ Import from `@/locales/*.json` directly inside components.

**Where to fix English-leak defects →** [src/locales/ar.json](src/locales/ar.json) (missing key).

---

## RULE-07 — RTL Mirroring (NO Stylis plugin here)

Direction is controlled by three layers:

1. **`<html dir>`** — [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) sets `dir="rtl"` on AR routes.
2. **Global CSS** — [globals.css](src/app/globals.css) applies `direction: rtl` and swaps font stacks under `html[dir="rtl"]`.
3. **Component-level conditionals** — you write them by hand.

Apply these conditionals manually on any direction-sensitive style:

```tsx
flexDirection:    isRTL ? "row-reverse" : "row"
textAlign:        isRTL ? "right"       : "left"
justifyContent:   isRTL ? "flex-end"    : "flex-start"
transformOrigin:  isRTL ? "top right"   : "top left"
right:            isRTL ? 14            : "auto"
left:             isRTL ? "auto"        : 14
anchor={isRTL ? "right" : "left"}   // Drawer
```

### ✅ DO
- Flip direction-sensitive styles manually with `isRTL`.
- Create an `Ar<Name>.tsx` / `ar-<name>.tsx` twin when conditionals grow unwieldy.

### ❌ DON'T
- Don't try to install `stylis-plugin-rtl` — it is NOT in this repo.
- Don't write RTL overrides in [globals.css](src/app/globals.css) beyond what's already there.

---

## RULE-08 — Data & Services

- Components MUST NOT use the Firebase SDK directly (no `getDoc`, `setDoc`, `collection`, `query` inside component files).
- All Firestore reads go through [src/services/](src/services/).
- This repo is **READ-ONLY** against Firestore. The CMS (`../TuitionalCMS`) is the write side.
- Service functions return `null` / `[]` / `undefined` on failure — they do not throw.
- **Server Components** call services and pass props down. **Client Components** receive props.
- Collection naming: `-en` / `-ar` suffix (`grade-subject-level-en`, `blogs-v1-ar`, `page-categories-en`, `component-sequence-ar`).
- Preserve the `placment` misspelling in `component-sequence-*` docs — comes from CMS schema.

### ✅ DO
- Route every Firestore access through `src/services/`.
- Return empty/null on failure so callers can render fallback UI.

### ❌ DON'T
- ❌ `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` anywhere in this repo.
- ❌ `getDoc` / `collection` / `query` inside a component file.
- ❌ Toasts for "saved successfully" / "deleted" — there are no content mutations here.

**Where to find the service registry →** [UI.md §9](./UI.md) / [Development.md §2 Data defects](./Development.md).

---

## RULE-09 — Routing Rules

- Two language roots: `/…` (EN) and `/ar/…` (AR). When adding a new route, **add the Arabic mirror at the same time**, or document why it's EN-only.
- Legacy misspelled routes are live URLs: `/curiculume`, `/maincuriculume`. **DO NOT rename** — they are indexed.
- All redirect rules live in [next.config.mjs](next.config.mjs). Add new redirects there; do NOT call `redirect()` inside a route file unless the mapping is dynamic.
- Don't introduce new `/api/*` routes casually. The two existing ones ([/api/location](src/app/api/location/route.ts), [/api/meta-conversion](src/app/api/meta-conversion/route.ts)) have narrow purposes. Adding a third needs approval.
- [sitemap.ts](src/app/sitemap.ts) pulls slugs from Firestore — if you add a new dynamic section, update the sitemap in the same PR.

### ✅ DO
- Add `/ar/<route>/page.tsx` alongside every new `/<route>/page.tsx`.
- Use `redirect("/404")` when data is missing — matches existing pattern.

### ❌ DON'T
- ❌ Rename `curiculume/` / `maincuriculume/` (broken links, lost SEO).
- ❌ Add a new `/api/*` route without escalation.

---

## RULE-10 — Responsive Layout

- Use MUI breakpoint object syntax: `{ xs, sm, md, lg, xl }`.
- `@media` inside `.module.css` is also acceptable. Keep breakpoints aligned with MUI defaults (0 / 600 / 900 / 1200 / 1536).
- Always pair `vh`-driven input heights with a `minHeight` safety clamp (e.g. `minHeight: 48px`).
- Never introduce horizontal overflow. [globals.css](src/app/globals.css) enforces `overflow-x: hidden; max-width: 100vw` at `html/body` — don't rely on it to mask runaway widths.

### ✅ DO
- Collapse identical breakpoint values (`{ xs: "20px", sm: "20px" }` → `"20px"`).
- Test at 320px, 600px, 900px, 1200px, 1920px.

### ❌ DON'T
- ❌ `theme.breakpoints.up()` / `.down()` inside `sx`.
- ❌ Raw `@media` inside `sx`.
- ❌ Introduce horizontal scroll.

---

## RULE-11 — Provider Rules (ABSOLUTE)

**NEVER mount a second instance of:**
- `ThemeProvider` (already in [layout.tsx](src/app/layout.tsx))
- `I18nProvider` (already in layout)
- `DrawerProvider` (already in layout)
- `<Toaster />` (already in layout)

All are provided at the root. Consume via hooks (`useI18n`, `useTheme`, `useDrawer`).

### ✅ DO
- Consume providers through hooks.

### ❌ DON'T
- Don't wrap a section in a second provider "just in case".

---

## RULE-12 — MUI Component & Icon Guidance

**Permitted MUI components:**
`Box`, `Stack`, `Typography`, `Button`, `IconButton`, `Grid`, `Paper`, `Dialog*`, `Drawer`, `Menu*`, `List*`, `Autocomplete`, `Select`, `MenuItem`, `TextField`, `Checkbox`, `FormControlLabel`, `Tooltip`, `Accordion*`, `AppBar`, `Toolbar`, `Divider`, `CircularProgress`, `Skeleton`, `Link`.

**Icon preference:** Use `Rounded` variants where they exist (`MenuRounded`, `ExpandMoreRounded`, `CloseRounded`).

### ✅ DO
- Use `MenuRounded` over `Menu`.
- Use `CircularProgress` / `Skeleton` for loading states.

### ❌ DON'T
- ❌ `@mui/lab` / `@mui/x-*` (not installed — adding them is a dependency change).
- ❌ `styled()` / `makeStyles` / `withStyles`.
- ❌ `theme.palette.*` / `theme.spacing(n)` inside `sx`.

---

## RULE-13 — Foundation Files (DO NOT TOUCH WITHOUT APPROVAL)

These files are load-bearing. Modifications require explicit user approval:

| File | Purpose |
|---|---|
| [src/app/layout.tsx](src/app/layout.tsx) | root providers, analytics tags, head metadata |
| [src/app/globals.css](src/app/globals.css) | base typography, RTL font stack, keyframes |
| [src/app/style.css](src/app/style.css) | additional shared styles |
| [src/app/fonts.ts](src/app/fonts.ts) | font registration |
| [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) | MUI theme wiring |
| [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) | typography scale source of truth |
| [src/context/language-context.tsx](src/context/language-context.tsx) | I18nProvider + `t(key)` implementation |
| [src/context/drawer-context.tsx](src/context/drawer-context.tsx) | mobile drawer state |
| [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) | `<html dir/lang>` control |
| [src/hooks/useI18n.ts](src/hooks/useI18n.ts) | i18n hook wrapper |
| [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) | Firestore init |
| [next.config.mjs](next.config.mjs) | image hosts, redirects, chunk splitting |
| [src/app/metrics/**](src/app/metrics/) | analytics trackers |
| [src/utils/env.ts](src/utils/env.ts) | SITE_URL + hardcoded Pixel token (known debt) |

### ✅ DO
- Treat these files as read-only until the user approves a change.
- Consume what they export (fonts, theme, hooks) — don't patch them.

### ❌ DON'T
- Don't edit these during a feature task.
- Don't replicate their patterns elsewhere (e.g. don't register fonts in a second file).

---

## RULE-14 — Analytics & SEO (PRESERVE)

- Do **not** remove or re-parent in [layout.tsx](src/app/layout.tsx):
  - Facebook Pixel inline init (`1950457082424995`)
  - GTM noscript iframe (`GTM-NG7HWSZT`)
  - Facebook domain-verification meta
  - `<UniversalSchema />` JSON-LD
- Route-change Pixel tracking runs via [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx) — keep it mounted.
- Server-side Conversions API proxy: [src/app/api/meta-conversion/route.ts](src/app/api/meta-conversion/route.ts). Do not expose its access token client-side.
- Every `next/image` needs descriptive `alt`. Use `priority` for above-the-fold hero images only.
- Only one `<h1>` per page. Heading hierarchy must be strict.
- Image remote hosts are allowlisted in [next.config.mjs](next.config.mjs). Loading from a new host requires updating the config (foundation-file change → approval).

### ✅ DO
- Let analytics tags remain exactly where they are.
- Fire server-side mirror events through `/api/meta-conversion` for high-value conversions.

### ❌ DON'T
- Don't wrap analytics in a custom wrapper component.
- Don't log `PIXEL_TOKEN` or send it to the client.

---

## RULE-15 — File Naming

- All new files: `kebab-case`, all-lowercase (`hero-info.tsx`, `blog-card.tsx`) — preferred.
- PascalCase tolerated only when a twin already uses PascalCase (blog/, pricing/, teacher-card/).
- **DO NOT rename these legacy files/routes** — imports and live URLs depend on them:
  - `curiculume/` (folder + route)
  - `maincuriculume/` (folder + route)
  - `form-dialouge.tsx`, `ar-form-dialouge.tsx`, `form-dialouge-v1.tsx` (misspelling inherited from CMS)
  - `ar-contact-us.tsx` and similar `ar-*.tsx` pairs
  - `students-says.tsx`, `students-says-v2.tsx`
- Import alias: use `@/` (`@/components/…`, `@/hooks/…`, `@/services/…`).
- `src/context/` is SINGULAR here. Put new contexts there. Do NOT create `src/contexts/`.

### ✅ DO
- Use `@/` alias for cross-folder imports.
- Author new files in kebab-case.

### ❌ DON'T
- Don't rename legacy misspellings.
- Don't create a `src/contexts/` folder here.

---

## RULE-16 — Architecture Constraints

- **Server Component** (`app/**/page.tsx`): reads params, calls services, passes props. Use `redirect("/404")` for not-found — not `notFound()`.
- **Client View / Component**: starts with `"use client"`, holds UI state, receives data as props.
- The grade-subject-level renderer has **two variants** — `variant === "new"` → `GradeSubjectLevelV2`; else → `GradeSubjectLevel`. Both still exist in the wild.
- The `component-sequence-*` collection drives section order for the legacy variant; the new variant uses per-section `sequenceNumber`. Respect both.

### ✅ DO
- Keep `page.tsx` server-rendered.
- Check `variant` before editing a grade-subject-level section.

### ❌ DON'T
- Don't remove V1 code paths.
- Don't fetch inside client components on render.

---

## RULE-17 — Secrets

- Do not add new secrets to source. [src/utils/env.ts](src/utils/env.ts) already hardcodes `PIXEL_TOKEN` — known debt, not a pattern to extend.
- Firebase Web SDK config in [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) is intentionally public — safe to commit.
- If a new secret is genuinely required, STOP and ask: this repo has no `.env` loading pattern wired up.

### ✅ DO
- Keep high-value tokens server-side only (see `/api/meta-conversion`).

### ❌ DON'T
- Don't add a new `.env` variable without escalation.
- Don't log tokens or user identifiers to the console.

---

## RULE-18 — Escalation (STOP AND ASK)

Stop and request human review if ANY of the following:

1. A color, typography scale, or radius you need does not have precedent in the codebase.
2. A new UI pattern has no precedent in `src/components/**` (date picker, stepper, kanban, virtualized list, video chrome, etc.).
3. A new dependency would be installed.
4. Any foundation file from RULE-13 needs to change.
5. A new authentication, data-fetching, or state-management pattern is required.
6. A new Firestore collection is needed, OR a WRITE operation (this repo is read-only).
7. A new `/api/*` route is required.
8. A new image remote host must be allowlisted.
9. A new font family is required.
10. A folder/route misspelling would need to be "fixed" (imports/URLs break).

**Where to phrase the escalation →** [Development.md §8](./Development.md).

---

## RULE-19 — Pre-Commit Quality Gate

Before declaring any task complete (run AFTER implementation, BEFORE shipping — this feeds [QA.md](./QA.md)):

```
☐ Pattern A OR Pattern B used consistently within the new file (no mix of both for the same property)
☐ No new .module.css file sharing a name with an existing one (collision risk)
☐ No new dependency in package.json
☐ No foundation file modified (RULE-13)
☐ No theme.palette.* or theme.spacing(n) inside sx
☐ No em units, no vw for font-size
☐ Typography uses TYPOGRAPHY_TOKENS or MUI variants — no invented font sizes
☐ t is called as t("key.path") — never as t.key
☐ Every user-facing string has BOTH en.json and ar.json entries (or uses an inline isArabic ternary)
☐ Every direction-sensitive style flips on isRTL (or a paired Ar*.tsx twin exists)
☐ New /route has a /ar/route twin (or an explicit reason it is EN-only)
☐ Any new `next/image` has descriptive alt and comes from an allowlisted remote host
☐ No Firebase SDK call in a component file
☐ No write operation against Firestore
☐ No duplicate of an existing reusable component
☐ No second ThemeProvider / I18nProvider / DrawerProvider / Toaster mounted
☐ If a legacy-misspelled file/folder was touched, spelling was preserved
☐ npm run lint passes
☐ npm run build passes
```

---

## 20. Next stop in the pipeline

After RULE-19 passes, proceed to the full QA gate: [QA.md](./QA.md) — work through QA-00 through QA-16.

If a rule above is at risk, loop back:
- **Token issue** → [Design.md](./Design.md)
- **Template / folder issue** → [UI.md](./UI.md)
- **Unsure what file owns the behavior** → [Development.md §2 Context Map](./Development.md)

---

**Any violation of a RULE above is an error condition. Stop, revert, and comply.**
