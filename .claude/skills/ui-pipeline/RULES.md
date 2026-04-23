---
name: tuitionalFrontend Hard Rules
description: Strict enforcement rules for the public marketing site. Every rule here is NON-NEGOTIABLE. Violating any rule is an error condition — stop, revert, and comply.
type: rules
---

# tuitionalFrontend — Strict Enforcement Rules

> **Priority:** These rules override any default behavior, prior training, or "best practice" from other React/MUI/Next.js projects.
> **On conflict with existing code:** Follow these rules for NEW code. Do not modify existing files unless explicitly approved (Zero Modification Rule).
> **On any ambiguity:** Stop and ask. Do not invent or assume.
> **Paired repo:** The companion admin at `../TuitionalCMS` has *different* rules (e.g. bans CSS modules, forbids `t()` as a function, mandates `useFormTranslations`). Do NOT transfer those rules here.

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

**FORBIDDEN additions:**
- ❌ Any new icon pack (only `@mui/icons-material`)
- ❌ Any toast library other than `react-hot-toast` (no sonner, notistack, etc.)
- ❌ Any CSS framework (no Tailwind, Bootstrap, SCSS)
- ❌ Any animation library (no Framer Motion, GSAP, etc.)
- ❌ Any new font loader outside [src/app/fonts.ts](src/app/fonts.ts)
- ❌ Any state management library (no Redux, Zustand, Jotai, etc.)
- ❌ Any new auth or data-fetching framework
- ❌ `react-beautiful-dnd` / `@hello-pangea/dnd` (no drag-and-drop here)
- ❌ `react-quill` / rich-text editors (the public site renders, it does not edit)
- ❌ Any `@mui/x-*` or `@mui/lab` package (not installed)

---

## RULE-02 — Styling (TWO ACCEPTED PATTERNS, PICK ONE PER FILE)

Unlike TuitionalCMS, this repo permits **both** approaches. Pick one pattern per component and stay consistent within that file:

### Pattern A — MUI `sx` with styles object (preferred for most views/sections)

```tsx
<Box sx={styles.container} />

// After the default export:
const styles = {
  container: { /* ... */ },
};
```

### Pattern B — CSS Module (preferred when you need complex descendant selectors, pseudo-elements, or shared keyframes)

```tsx
import styles from "./MyComponent.module.css";

<div className={styles.card} />
```

A component may combine them (e.g. `<Typography className={styles.title} sx={{ color: "#000" }} />`), but **do not author the same rule in both places** — pick the one that owns each property.

**FORBIDDEN regardless of pattern:**
- ❌ `styled()` from `@emotion/styled` or `@mui/system` — neither approach uses it
- ❌ `makeStyles` / `withStyles` (MUI v4 APIs)
- ❌ Adding anything to [src/app/globals.css](src/app/globals.css) or [src/app/style.css](src/app/style.css) — those are global typography + layout foundation
- ❌ `className="..."` with any utility system (no Tailwind, no ad-hoc global classes)
- ❌ `em` units anywhere
- ❌ `vw` for `font-size` (use `rem` via `TYPOGRAPHY_TOKENS` or a clamp)
- ❌ `theme.palette.*` or `theme.spacing(n)` inside `sx` — use literal values or CSS variables (`var(--color-accent)`)
- ❌ Inline `style={{}}` except for: (a) runtime-computed values, (b) `next/image` sizing, (c) `next/script` dangerously-set HTML overrides

**When adding a new `*.module.css` file:** Name it in the component's own folder next to the `.tsx` (e.g. `src/components/pricing/PackageCard.module.css`). Do NOT create a shared `/styles/` directory.

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

Additional neutrals and accent colors are allowed when they match an established usage in the codebase (e.g. the pricing cards use `#f1f5f9`, `#e2e8f0`, `#1e293b` from a consistent slate scale). **If you need a new color family,** STOP and ask — do not pluck arbitrary hex values.

### Typography scale — use `TYPOGRAPHY_TOKENS`

Import from [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts). The MUI theme at [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) already maps `h1`…`h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `button` to these tokens. Prefer `<Typography variant="h2">` over hand-sized font rules so the theme controls responsiveness.

If you must hand-size (e.g. decorative display text), use `rem`-based values from the scale — NEVER invent a new `px` or `vw` font size.

### Fonts — three families, one registration point

- `leagueSpartan` → `var(--font-league-spartan)` → EN headings (theme already wires this)
- `inter` → `var(--font-inter)` → EN body (theme default)
- `notoSansArabic` → `var(--font-noto-arabic)` → AR (applied globally by the `html[dir="rtl"] *` rule in [globals.css](src/app/globals.css))

You should rarely set `fontFamily` manually — the root `<html className>` + the MUI theme + the RTL CSS selector handle it. If you do, reference the CSS variable, not the literal family name.

### Border radii — established values

| Value | Where |
|---|---|
| `8px` | MUI Button default (set in theme) |
| `10px` | Legacy inputs / buttons / section boxes (grade-subject-level + home) |
| `12px`–`16px` | Modern cards, modals, CTA blocks |
| `20px` | Pricing cards |
| `50%` | Circular icon chips |

Stay within this palette. If you need a different radius, check whether an existing component already uses it first.

---

## RULE-04 — Typography & Fonts

- **Never** use `next/font/google` outside [src/app/fonts.ts](src/app/fonts.ts). If you need a new face, STOP and ask.
- **Never** set `fontFamily: "League Spartan"` as a literal string in `sx` — use `leagueSpartan.className` on the element, or `leagueSpartan.style.fontFamily`, or rely on the MUI theme variant.
- Prefer `<Typography variant="h1|h2|…|body1|body2|button">` over custom font sizing. The theme already scales them for tablet (≤1199px) and mobile (≤599px).
- For inline decorative text, use `TYPOGRAPHY_TOKENS` values (e.g. `fontSize: TYPOGRAPHY_TOKENS.desktop.h2.rem`) instead of literal `rem`s.
- No `em` units for font-size. No `vw` for font-size.
- Inputs must never drop below `16px` on mobile (prevents iOS zoom). The theme already enforces this via `MuiInputBase` — do not override it back down.

---

## RULE-05 — Component Authoring

Before writing ANY new component:

### Step 1 — Existence Check (REQUIRED)
Search in this order:
1. `src/components/<scope>/` (where scope matches the feature area — `blog/`, `home/`, `pricing/`, `grade-subject-level/`, etc.)
2. `src/components/` (top level — primitives like `custom-input/`, `DropDown/`, `input/`, `tag/`, `pop-up-button.tsx`)

**If a match exists → USE IT AS-IS. Do NOT create a new one. Do NOT refactor it on the side.**

### Step 2 — Zero Modification Guard
If you believe an existing file must be changed to support the new work:
1. STOP
2. Report: "Modification to `<file>` is required because `<reason>`."
3. Wait for explicit approval

**Exceptions (no approval needed):**
- Adding a missing key to [src/locales/en.json](src/locales/en.json) **and** [src/locales/ar.json](src/locales/ar.json) (both must get the key)
- Fixing an obvious compile error introduced by the current task

### Step 3 — New File Checklist

```
☐ Location:
    src/components/<scope>/<name>.tsx   ← scoped to a feature area
    src/components/<name>.tsx           ← top-level primitive (rare)
    src/app/<route>/page.tsx            ← new route (Server Component by default)

☐ File name:
    - kebab-case, lowercase for new files (hero-info.tsx, blog-card.tsx)
    - PascalCase is tolerated ONLY when mirroring a twin file's existing casing
      (e.g. ArHero.tsx next to Hero.tsx in pricing/)
    - Arabic twins: prefer `ar-<name>.tsx` (matches home/, blog/, grade-subject-level/)

☐ First line (if hooks, state, or browser APIs): "use client";

☐ Imports in order:
    1. "use client"; (if applicable)
    2. React + MUI
    3. @mui/icons-material (use *Rounded variants where they exist)
    4. next/*
    5. @/hooks/useI18n (OR @/context/language-context directly)
    6. @/app/fonts (only if you need className at the element level)
    7. @/services/** (only at Server Component level — NEVER in client components on render)
    8. @/types/**, @/utils/**
    9. Relative imports
    10. Style import (CSS module) or styles object at bottom

☐ Props: interface <Name>Props { ... }  (never inline in the signature)

☐ Component: const X: React.FC<XProps> = (...) or function X(...)

☐ Export: default export only

☐ No foundation file modifications (see RULE-13)
```

---

## RULE-06 — i18n (ABSOLUTE — differs from CMS)

- `t` is a **FUNCTION**: `t("nav.home")`, `t("footer.copyright")`. Keys are dot-separated paths into [src/locales/en.json](src/locales/en.json) / [src/locales/ar.json](src/locales/ar.json).
- **NEVER refactor `t` to be an object** — that is the CMS pattern, not this repo's.
- Source the hook from either:
  - `import { useI18n } from "@/hooks/useI18n"` → gives `{ t, locale, isRTL, setLocale, isArabic, isEnglish, switchToArabic, switchToEnglish, toggleLanguage }`
  - `import { useI18n } from "@/context/language-context"` → gives `{ t, locale, isRTL, setLocale }` only
- Prefer the hook from `@/hooks/useI18n` — it's a superset.
- When adding a new key: add it to **both** `en.json` and `ar.json` in the SAME commit. Missing keys fall back to EN, then to the raw key string — users will see gibberish.

### Two valid bilingual patterns

**A. Shared component, inline mirroring** (simple cases):
```tsx
const { t, isArabic, isRTL } = useI18n();
<Box sx={{ flexDirection: isRTL ? "row-reverse" : "row", textAlign: isArabic ? "right" : "left" }}>
  {t("nav.home")}
</Box>
```

**B. Paired Arabic variant file** (preferred when layout diverges significantly):
```
components/blog/hero/Hero.tsx          ← EN
components/blog/ar-hero/ArHero.tsx     ← AR twin (mirrored layout)
```
The `/ar/**` pages import the `Ar*` twin. When editing a shared surface, **check if an Arabic twin exists** and keep them in sync.

**FORBIDDEN:**
- ❌ Calling `t` as an object: `t.nav.home` — throws (`t` is a function here)
- ❌ Hardcoding English-only strings on a page that ships to `/ar/**`
- ❌ `useTranslation()` / `useT()` / any pattern not rooted in `useI18n()`
- ❌ Importing directly from `@/locales/*.json` inside components (always go through `t(key)`)

---

## RULE-07 — RTL Mirroring (no Stylis plugin here)

There is **no** `stylis-plugin-rtl` in this repo. Direction is controlled by three layers:

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
// Drawer:
anchor={isRTL ? "right" : "left"}
```

If the layout is complex enough that inline conditionals become messy, **create an `Ar<Name>.tsx` twin file** instead (see RULE-06 pattern B). This is the codebase's established idiom.

---

## RULE-08 — Data & Services

- Components MUST NOT use the Firebase SDK directly (no `getDoc`, `setDoc`, `collection`, `query` inside component files).
- All Firestore reads go through [src/services/](src/services/).
- This repo is **READ-ONLY** against Firestore. The CMS (`../TuitionalCMS`) is the write side.
  - **Do NOT** introduce `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` in this repo.
  - **Do NOT** add toasts for "saved successfully" / "deleted" — there are no content mutations here. (Toasts for contact-form submissions are fine and use `react-hot-toast`.)
- Service functions return `null` / `[]` / `undefined` on failure — they do not throw. Callers render fallback UI.
- **Server Components** (`app/**/page.tsx`) call services and pass props down. **Client Components** receive props; they must not call services on render (use `useEffect` only when genuinely client-only, e.g. geo-IP lookup).
- Collection naming: `-en` suffix for English, `-ar` for Arabic (`grade-subject-level-en`, `blogs-v1-ar`, `page-categories-en`, `component-sequence-ar`). Preserve this convention; it is shared with the CMS.
- Preserve the `placment` misspelling in `component-sequence-*` — it comes from the CMS schema.

---

## RULE-09 — Routing Rules

- Two language roots: `/…` (EN) and `/ar/…` (AR). When adding a new route, **add the Arabic mirror at the same time**, or document explicitly why it's EN-only.
- Legacy misspelled routes are live URLs: `/curiculume`, `/maincuriculume`. **Do NOT rename the folders or the URLs** — they are indexed.
- All redirect rules live in [next.config.mjs](next.config.mjs). Add new redirects there; do NOT call `redirect()` inside a route file unless the mapping is dynamic (i.e. depends on runtime data).
- Don't introduce new `/api/*` routes casually. The two existing ones ([/api/location](src/app/api/location/route.ts), [/api/meta-conversion](src/app/api/meta-conversion/route.ts)) have narrow purposes. Adding a third needs user approval.
- [sitemap.ts](src/app/sitemap.ts) pulls slugs from Firestore — if you add a new dynamic section, update the sitemap in the same PR.

---

## RULE-10 — Responsive Layout

- Use MUI breakpoint object syntax: `{ xs: ..., sm: ..., md: ..., lg: ..., xl: ... }`. Acceptable.
- `@media` inside `.module.css` is ALSO acceptable (that is the whole point of the CSS-module path). Keep breakpoints aligned with MUI defaults: 0 / 600 / 900 / 1200 / 1536.
- **FORBIDDEN inside `sx`:** `theme.breakpoints.up()`, `theme.breakpoints.down()`, raw `@media`
- Collapse identical breakpoint values: `{ xs: "20px", sm: "20px", md: "20px" }` → `"20px"`
- Always pair `vh`-driven input heights with a `minHeight` safety clamp (e.g. `minHeight: 48px`) — inputs collapse on short viewports otherwise.
- Never introduce horizontal overflow. [globals.css](src/app/globals.css) already applies `overflow-x: hidden; max-width: 100vw` at `html` / `body` — don't undo it, and don't rely on it to mask runaway widths.

---

## RULE-11 — Provider Rules (ABSOLUTE)

**NEVER mount a second instance of:**
- `ThemeProvider` (already in [layout.tsx](src/app/layout.tsx))
- `I18nProvider` (already in layout)
- `DrawerProvider` (already in layout)
- `<Toaster />` (already in layout)

All of them are provided at the root. Consume via hooks (`useI18n`, `useTheme`, `useDrawer`).

---

## RULE-12 — MUI Component & Icon Guidance

**Permitted MUI components:**
`Box`, `Stack`, `Typography`, `Button`, `IconButton`, `Grid`, `Paper`, `Dialog*`, `Drawer`, `Menu*`, `List*`, `Autocomplete`, `Select`, `MenuItem`, `TextField`, `Checkbox`, `FormControlLabel`, `Tooltip`, `Accordion*`, `AppBar`, `Toolbar`, `Divider`, `CircularProgress`, `Skeleton`, `Link`.

**Icon preference:** Use `Rounded` variants where they exist (`MenuRounded`, `ExpandMoreRounded`, `CloseRounded`).

**FORBIDDEN:**
- ❌ `@mui/lab` / `@mui/x-*` (not installed — adding them is a dependency change)
- ❌ `styled()` / `makeStyles` / `withStyles`
- ❌ `theme.palette.*` / `theme.spacing(n)` inside `sx`

---

## RULE-13 — Foundation Files (DO NOT TOUCH WITHOUT APPROVAL)

These files are load-bearing for the entire app. Modifications require explicit user approval:

- [src/app/layout.tsx](src/app/layout.tsx) — root providers, analytics tags, head metadata
- [src/app/globals.css](src/app/globals.css) — base typography, RTL font stack, keyframes, standardized typography block
- [src/app/style.css](src/app/style.css) — additional shared styles
- [src/app/fonts.ts](src/app/fonts.ts) — font registration
- [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) — MUI theme wiring
- [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) — typography scale source of truth
- [src/context/language-context.tsx](src/context/language-context.tsx) — I18nProvider + `t(key)` implementation
- [src/context/drawer-context.tsx](src/context/drawer-context.tsx) — mobile drawer state
- [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) — `<html dir/lang>` control
- [src/hooks/useI18n.ts](src/hooks/useI18n.ts) — i18n hook wrapper
- [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) — Firestore init
- [next.config.mjs](next.config.mjs) — image hosts, redirects, chunk splitting
- [src/app/metrics/**](src/app/metrics/) — analytics trackers
- [src/app/layout.tsx](src/app/layout.tsx) inline Pixel / GTM scripts
- [src/utils/env.ts](src/utils/env.ts) — SITE_URL + hardcoded Pixel token (known debt; don't propagate the pattern but don't rewrite it without approval either)

---

## RULE-14 — Analytics & SEO (PRESERVE)

- Do **not** remove or re-parent these scripts in [layout.tsx](src/app/layout.tsx):
  - Facebook Pixel inline init (`1950457082424995`)
  - GTM noscript iframe (`GTM-NG7HWSZT`)
  - Facebook domain-verification meta
  - `<UniversalSchema />` JSON-LD
- Route-change Pixel tracking runs via [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx). Keep it mounted.
- Server-side Conversions API proxy: [src/app/api/meta-conversion/route.ts](src/app/api/meta-conversion/route.ts). Do not expose its access token client-side.
- Every `next/image` needs descriptive `alt`. Use `priority` for above-the-fold hero images only.
- Only one `<h1>` per page. Heading hierarchy must be strict (no skipping levels).
- Image remote hosts are allowlisted in [next.config.mjs](next.config.mjs). Loading an image from a new host requires updating the config (and is a foundation-file change → requires approval).

---

## RULE-15 — File Naming

- All new files: `kebab-case`, all-lowercase (`hero-info.tsx`, `blog-card.tsx`) — preferred.
- PascalCase filenames are tolerated when a twin file already uses PascalCase (`Hero.tsx` + `ArHero.tsx` in blog/, the pricing/ folder is entirely PascalCase).
- **DO NOT** rename these legacy files/routes — imports and live URLs depend on them:
  - `curiculume/` (folder + route)
  - `maincuriculume/` (folder + route)
  - `form-dialouge.tsx`, `ar-form-dialouge.tsx` (misspelling inherited from CMS)
  - `ar-contact-us.tsx` and similar `ar-*.tsx` pairs
- Import alias: use `@/` for cross-folder imports (`@/components/…`, `@/hooks/…`, `@/services/…`).
- `src/context/` is SINGULAR here (different from CMS). Put new contexts there. Do NOT create `src/contexts/` (plural).

---

## RULE-16 — Architecture Constraints

- **Server Component** (`app/**/page.tsx`): reads params, calls services, passes props. Use `redirect("/404")` for not-found (matches existing pattern — don't introduce `notFound()`).
- **Client View / Component**: starts with `"use client"`, holds UI state, receives data as props. Do not fetch on render in a client component.
- The grade-subject-level renderer has **two variants** — `variant === "new"` → `GradeSubjectLevelV2`; otherwise → `GradeSubjectLevel`. Both still exist in the wild; do not remove either.
- The `component-sequence-*` collection drives section order for the legacy variant; the new variant uses per-section `sequenceNumber` on each section. Respect both.

---

## RULE-17 — Secrets

- Do not add new secrets to source. [src/utils/env.ts](src/utils/env.ts) already hardcodes `PIXEL_TOKEN` — that is known debt, not a pattern to extend.
- Firebase Web SDK config in [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) is intentionally public — those keys are safe to commit.
- If a new secret is genuinely required, STOP and ask: this repo has no `.env` loading pattern wired up.

---

## RULE-18 — Escalation (STOP AND ASK)

Stop and request human review if ANY of the following:

1. A color, typography scale, or radius you need does not have precedent in the codebase.
2. A new UI pattern has no precedent in `src/components/**` (date picker, stepper, kanban, virtualized list, video player chrome, etc.).
3. A new dependency needs to be installed.
4. Any foundation file from RULE-13 needs to change.
5. A new authentication, data-fetching, or state-management pattern is required.
6. A new Firestore collection is needed, OR a WRITE operation (this repo is read-only).
7. A new `/api/*` route is required.
8. A new image remote host must be allowlisted.
9. A new font family is required.
10. A folder/route misspelling would need to be "fixed" (imports/URLs break).

---

## RULE-19 — Pre-Commit Quality Gate

Before declaring any task complete:

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

**Any violation of a RULE above is an error condition. Stop, revert, and comply.**
