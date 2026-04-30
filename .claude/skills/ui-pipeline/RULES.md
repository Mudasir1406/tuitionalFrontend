---
name: tuitionalFrontend Hard Rules
description: The always-on guardrail for the SDLC. Load alongside every other skill (Development, Design, UI, QA). Every rule here is NON-NEGOTIABLE — violation is an error condition.
type: rules
---

# tuitionalFrontend — Strict Enforcement Rules (Always-On Guardrail)

> **Role in the pipeline:** RULES.md is the **guardrail** that runs alongside every SDLC stage. Development.md directs you; Design.md gives you tokens; UI.md gives you templates; QA.md verifies — but this file vetoes ALL of them when any rule below is at risk.
> **Priority:** These rules override any default behavior, prior training, or "best practice" from other React/Next.js projects.
> **On conflict with existing code:** Follow these rules for NEW code. Do not modify existing files unless explicitly approved (Zero Modification Rule, RULE-05).
> **On any ambiguity:** Stop and ask. Do not invent or assume.
> **Paired repo:** The companion admin at `../TuitionalCMS` is still on Material UI and has different rules. Do NOT transfer those rules here.

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
| Framework | `next@14.2.35` (App Router) + `react@18` + `typescript@5` |
| Styling | **Tailwind CSS 3.4** + `clsx` + `tailwind-merge` (via `cn()` from [src/utils/cn.ts](src/utils/cn.ts)) |
| Interactive primitives | `@headlessui/react@2` (Dialog, Listbox, Disclosure, Tab, Transition) |
| Icons | **`lucide-react` ONLY** |
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
- Use `lucide-react` for every icon (`Menu`, `X`, `ChevronDown`, etc.).
- Use the house components in [src/components/ui/](src/components/ui/) (`Button`, `Input`, `Container`, `Dialog`, `Drawer`, `Select`) before reaching for raw HTML.
- Use `cn(...)` from `@/utils/cn` for conditional class merging — never raw string concatenation.
- Use `npm install` / `npm run`, never `yarn`.

### ❌ DON'T
- ❌ **`@mui/material`, `@mui/icons-material`, `@emotion/*`, `stylis-plugin-rtl`** — REMOVED. They are not installed.
- ❌ Any other icon pack (`react-icons`, `phosphor-icons`, Heroicons, etc.) — `lucide-react` only.
- ❌ Any toast library other than `react-hot-toast` (no sonner, notistack, etc.)
- ❌ Any other CSS framework (no Bootstrap, no extra design system on top of Tailwind)
- ❌ Any animation library (no Framer Motion, GSAP, Lottie, etc.) — use Tailwind animation utilities + Headless UI Transition.
- ❌ Any new font loader outside [src/app/fonts.ts](src/app/fonts.ts)
- ❌ Any state management library (no Redux, Zustand, Jotai, etc.)
- ❌ Any new auth or data-fetching framework
- ❌ `react-beautiful-dnd` / `@hello-pangea/dnd` (no drag-and-drop here)
- ❌ `react-quill` / rich-text editors (the public site renders, it does not edit)

**Where to go if you think a new dep is truly required →** [Development.md §8 Escalation](./Development.md). **Do NOT add it unilaterally.**

---

## RULE-02 — Styling (TAILWIND-ONLY)

Every component is styled with **Tailwind utility classes**. The `sx` prop, MUI `<Box>`, MUI `<Typography>`, `styled()`, `makeStyles`, and `@emotion/styled` are all forbidden.

### Default pattern

```tsx
import { cn } from "@/utils/cn";

<div className={cn(
  "flex items-center gap-3 rounded-md bg-brand-50 px-4 py-2",
  active && "ring-2 ring-brand-500",
)}>
  …
</div>
```

### When inline `style={{}}` is acceptable

- Runtime-computed values (a color hex from data, a `transform: translateX(${px})`, etc.).
- Background images sourced from imported assets (`url(${img.src})`).
- A handful of preserved legacy values (e.g. exact `boxShadow` strings) where porting them to a Tailwind arbitrary class would hurt readability.

### CSS Modules

Existing `*.module.css` files (e.g. [src/components/quill/TextEditor.module.css](src/components/quill/TextEditor.module.css), `trustpilot-carousel/TrustpilotCarousel.module.css`, route-level `*.module.css` files for layout shells) are tolerated where they ship third-party CSS or grid layouts that pre-date the migration. **Do not author new `.module.css` files** — use Tailwind classes instead.

### ✅ DO
- Use Tailwind utility classes for 99% of styling.
- Use `cn()` for conditional classes — never raw string concatenation.
- Add custom design tokens via [tailwind.config.ts](tailwind.config.ts) (`theme.extend`), not arbitrary one-off classes that should be tokens.
- For RTL-sensitive spacing/positioning, use **logical properties** (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`).

### ❌ DON'T
- ❌ `@mui/material`, `<Box>`, `<Typography>`, `<Grid>`, `sx={...}` — they're not installed.
- ❌ `@emotion/styled`, `styled()`, `makeStyles`, `withStyles`.
- ❌ New `.module.css` files (existing ones are grandfathered).
- ❌ Adding rules to [src/app/globals.css](src/app/globals.css) — global typography + layout foundation.
- ❌ `theme.palette.*` / `theme.spacing(n)` — there is no MUI theme.
- ❌ `em` units anywhere.
- ❌ `vw` for `font-size`.
- ❌ Hand-flipping with `flex-row-reverse` driven by `isRTL` — use logical properties + Tailwind's automatic RTL flip on `html[dir="rtl"]`.

**Where to find legal tokens →** [Design.md §1–4](./Design.md). **Where file placement is defined →** [UI.md §2](./UI.md).

---

## RULE-03 — Design Tokens (TAILWIND CONFIG)

All tokens live in [tailwind.config.ts](tailwind.config.ts) under `theme.extend`. Use the named tokens (`bg-brand-500`, `text-h1`, `font-heading`) — do not hardcode hex/rem values that already have a token.

### Brand colors — Tailwind classes

| Token | Hex | Role |
|---|---|---|
| `bg-brand-500` / `text-brand-500` | `#38B6FF` | Primary brand blue (buttons, focus, icons) |
| `bg-brand-200` | `#9EDCFF` | Hover wash, secondary accent |
| `bg-brand-50` | `#D7F0FF` | Section tint (hero, filter box, CMS blocks) |
| `text-ink-900` | `#2D2D2D` | Body text |
| `text-ink-700` | `rgba(0,0,0,0.77)` | Secondary text, input value |
| Surface | `bg-white` / `bg-ink-50` | Cards, panels |
| `text-success` | `#51B893` | Success accent |
| `text-warning` | `#FFB000` | Warning |
| `text-danger` | `#B70000` | Destructive |

Additional ramps (`ink-100..900`, `brand-100..900`) are wired in `tailwind.config.ts`. Reference them — don't reinvent.

### Typography — text-* tokens

Every entry from [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) is reproduced as a `text-*` size:

- Display: `text-h1`, `text-h1-tablet`, `text-h1-mobile`
- Body: `text-body`, `text-body-mobile`
- Specialized: `text-stat-number`, `text-caption`, `text-form-input`

Always pair a heading with a font-family token:
```tsx
<h2 className="font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-ink-900">…</h2>
```

### Fonts — three families, one registration point

- `font-heading` → `var(--font-league-spartan)` → headings
- `font-body` → `var(--font-inter)` → EN body
- `font-arabic` → `var(--font-noto-arabic)` → AR (also auto-applied via `html[dir="rtl"] *` in [globals.css](src/app/globals.css))

### Border radii — established tokens

| Class | Value | Where |
|---|---|---|
| `rounded` / `rounded-md` | 4–6 px | small chips |
| `rounded-lg` | 8 px | most cards / buttons |
| `rounded-[10px]` | 10 px | legacy hero buttons (preserved) |
| `rounded-xl` | 12 px | section blocks |
| `rounded-2xl` | 16 px | modern cards / dialogs |
| `rounded-full` | circle | avatars, icon chips |

### ✅ DO
- Pick the nearest named token.
- Add new tokens via `theme.extend` in [tailwind.config.ts](tailwind.config.ts), not via inline arbitrary values that recur.

### ❌ DON'T
- Don't invent a new color, radius, or font-size by hardcoding hex/rem values that should be tokens.
- Don't hand-size text with improvised `px` / `rem` / `vw` values when a `text-*` token exists.

**Full palette + typography reference →** [Design.md §1–2](./Design.md).

---

## RULE-04 — Typography & Fonts

- **Never** use `next/font/google` outside [src/app/fonts.ts](src/app/fonts.ts). If you need a new face, STOP and ask.
- **Never** hardcode `fontFamily: "League Spartan"` — always use the `font-heading` Tailwind class (or the next/font className when forwarding to a third-party library).
- Prefer the typography tokens (`text-h1`, `text-body`, etc.) over custom font sizing. Mobile/tablet variants exist (`text-h1-mobile`, `text-h1-tablet`) — use them with breakpoint prefixes:
  ```tsx
  <h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1">…</h1>
  ```
- Inputs must never drop below `16px` on mobile (iOS zoom prevention — already enforced in [globals.css](src/app/globals.css)).

### ✅ DO
- Use `text-*` tokens with responsive prefixes.
- Reference fonts via Tailwind `font-heading` / `font-body` / `font-arabic`.

### ❌ DON'T
- Don't hand-write `fontFamily: "League Spartan"`.
- Don't register a new font anywhere except [fonts.ts](src/app/fonts.ts).
- Don't override the 16px input minimum on mobile.

---

## RULE-05 — Component Authoring & Zero Modification Guard

### Step 1 — Existence Check (REQUIRED)

Search in this order:
1. [src/components/ui/](src/components/ui/) — house primitives (`Button`, `Input`, `Container`, `Dialog`, `Drawer`, `Select`). Use these before reaching for raw HTML.
2. `src/components/<scope>/` (blog/, home/, pricing/, grade-subject-level/, …)
3. `src/components/` (top level — primitives like DropDown/, custom-input/, input/, tag/, pop-up-button.tsx)

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
    2. React
    3. lucide-react icons
    4. @headlessui/react primitives
    5. next/* (Image, Link, dynamic, navigation)
    6. @/components/ui/* (house primitives)
    7. @/context/language-context (or @/hooks/useI18n)
    8. @/app/fonts (only when forwarding `next/font` className)
    9. @/services/** (Server Component only)
    10. @/types/**, @/utils/**
    11. Relative imports
☐ Props: interface <Name>Props { ... } — never inline
☐ Component: const X: React.FC<XProps> = (...)
☐ Export: default export only
☐ Styling: Tailwind classes via cn() — no sx, no inline style for static values
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

**A. Shared component, logical properties** (preferred — works for most cases):
```tsx
const { t, isRTL } = useI18n();
<div className="flex items-center text-start ms-4">
  {t("nav.home")}
</div>
```
Logical properties (`ms-*`, `me-*`, `text-start`, `text-end`, `start-*`, `end-*`) flip automatically under `html[dir="rtl"]`.

**B. Paired Arabic variant file** (preferred when layout truly diverges):
```
components/blog/hero/Hero.tsx          ← EN
components/blog/ar-hero/ArHero.tsx     ← AR twin (mirrored layout)
```
Use `dir="rtl"` on the AR variant's outer wrapper.

### ✅ DO
- Call `t` as `t("key.path")`.
- Add EN and AR keys in lockstep.
- Use logical properties for direction-sensitive spacing.

### ❌ DON'T
- ❌ Call `t` as `t.nav.home` — throws (that's the CMS pattern).
- ❌ Hardcode English-only strings on pages that ship to `/ar/**`.
- ❌ `useTranslation()` / `useT()` / any pattern not rooted in `useI18n()`.
- ❌ Import from `@/locales/*.json` directly inside components.
- ❌ `flex-row-reverse` on RTL — use logical properties instead.

**Where to fix English-leak defects →** [src/locales/ar.json](src/locales/ar.json) (missing key).

---

## RULE-07 — RTL via Logical Properties (NO Stylis plugin here)

Direction is controlled by three layers:

1. **`<html dir>`** — [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) sets `dir="rtl"` on AR routes.
2. **Global CSS** — [globals.css](src/app/globals.css) applies `direction: rtl` and swaps font stacks under `html[dir="rtl"]`.
3. **Tailwind logical properties** — flip automatically based on `dir`.

### Use logical properties

```tsx
className="ms-4 me-2 ps-3 pe-3 text-start text-end start-0 end-0"
//          margin-start, margin-end, padding-start, padding-end,
//          text-align: start/end, inset-inline-start/end
```

These flip automatically under `html[dir="rtl"]`. **Do not** write `isRTL ? "ml-4" : "mr-4"` — it's redundant noise.

### When manual flipping is appropriate

Reserve `rtl:` variant or hand-conditioned styles for cases where LTR/RTL designs **genuinely diverge** — different icon order, mirrored hero composition, etc. Add a one-line comment when you do.

### ✅ DO
- Use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`.
- Create an `Ar<Name>.tsx` / `ar-<name>.tsx` twin when LTR and AR layouts truly diverge.

### ❌ DON'T
- Don't try to install `stylis-plugin-rtl` — it is NOT in this repo.
- Don't write `isRTL ? "ml-4" : "mr-4"` — use `ms-4`.
- Don't write `flex-row-reverse` driven by `isRTL` — let logical properties do the flip.
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
- Marketing landing pages: `/a-level`, `/gcse`, `/igcse`, `/thank-you` use the minimal `HeaderV3` (logo only) instead of the full nav. Don't change which pages get which header without approval.
- All redirect rules live in [next.config.mjs](next.config.mjs). Add new redirects there; do NOT call `redirect()` inside a route file unless the mapping is dynamic.
- Don't introduce new `/api/*` routes casually. The two existing ones ([/api/location](src/app/api/location/route.ts), [/api/meta-conversion](src/app/api/meta-conversion/route.ts)) have narrow purposes. Adding a third needs approval.
- [sitemap.ts](src/app/sitemap.ts) pulls slugs from Firestore — if you add a new dynamic section, update the sitemap in the same PR.

### ✅ DO
- Add `/ar/<route>/page.tsx` alongside every new `/<route>/page.tsx`.
- Use `redirect("/404")` when data is missing — matches existing pattern.

### ❌ DON'T
- ❌ Add a new `/api/*` route without escalation.
- ❌ Introduce a new top-level public route without checking sitemap + nav implications.

---

## RULE-10 — Responsive Layout (MOBILE-FIRST)

- Use Tailwind's mobile-first breakpoint cascade: default (mobile) → `sm:` → `md:` → `lg:` → `xl:` → `2xl:`.
- Custom breakpoints are configured in [tailwind.config.ts](tailwind.config.ts):
  - `sm: 600px`
  - `md: 900px`
  - `lg: 1200px`
  - `xl: 1500px`
  - `2xl: 2000px`
- Always pair `vh`-driven input heights with a `min-h-*` safety clamp (e.g. `h-[5.5vh] min-h-[44px]`).
- Never introduce horizontal overflow. [globals.css](src/app/globals.css) enforces `overflow-x: hidden; max-width: 100vw` at `html/body` — don't rely on it to mask runaway widths.

### ✅ DO
- Default styles target mobile; layer on larger breakpoints with prefixes.
- Test at 360px, 768px, 1200px, 1500px in both EN and AR.

### ❌ DON'T
- ❌ Desktop-first authoring (writing `lg:hidden md:block sm:hidden hidden` instead of `block lg:hidden`).
- ❌ Introduce horizontal scroll.
- ❌ Use `useMediaQuery()` for layout — prefer pure CSS responsive classes. JS breakpoints only when a render-time decision is genuinely required.

---

## RULE-11 — Provider Rules (ABSOLUTE)

**NEVER mount a second instance of:**
- `I18nProvider` (already in [layout.tsx](src/app/layout.tsx))
- `DrawerProvider` (already in layout)
- `<Toaster />` (already in layout)

All are provided at the root. Consume via hooks (`useI18n`, `useDrawer`).

> **Note:** There is **no `ThemeProvider`** anymore. The MUI theme was removed when the migration to Tailwind completed. Tokens come from `tailwind.config.ts`.

### ✅ DO
- Consume providers through hooks.

### ❌ DON'T
- Don't wrap a section in a second provider "just in case".
- Don't reintroduce `ThemeProvider` from MUI — MUI is uninstalled.

---

## RULE-12 — Interactive Primitives & Icons

**Permitted house primitives** ([src/components/ui/](src/components/ui/)):
`Button`, `Input`, `Container`, `Dialog`, `Drawer`, `Select`. Use these whenever they fit.

**Underlying interactive primitives:** `@headlessui/react` (`Dialog`, `DialogPanel`, `Listbox`, `ListboxButton`, `ListboxOption`, `Disclosure`, `DisclosureButton`, `DisclosurePanel`, `Tab`, `TabGroup`, `TabList`, `TabPanel`, `Transition`, `TransitionChild`).

**Icons:** `lucide-react` ONLY (`Menu`, `X`, `ChevronDown`, `ArrowRight`, `Plus`, `Minus`, `Check`, `BadgeCheck`, etc.). All ~23 icons used across the codebase have direct lucide equivalents.

### ✅ DO
- Use the house `Button` for every clickable element with button styling.
- Use Headless UI Disclosure for accordions, Listbox for selects, Dialog for modals + drawers.
- Use lucide-react for every icon.

### ❌ DON'T
- ❌ Reach for `@mui/material` — it's uninstalled.
- ❌ Reach for `@mui/icons-material` — uninstalled.
- ❌ Mix lucide and other icon packs in the same file.
- ❌ Roll a custom modal/dropdown when Headless UI ships one.

---

## RULE-13 — Foundation Files (DO NOT TOUCH WITHOUT APPROVAL)

These files are load-bearing. Modifications require explicit user approval:

| File | Purpose |
|---|---|
| [src/app/layout.tsx](src/app/layout.tsx) | root providers, analytics tags, head metadata |
| [src/app/globals.css](src/app/globals.css) | Tailwind directives, base typography, RTL font stack, keyframes |
| [src/app/fonts.ts](src/app/fonts.ts) | font registration |
| [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) | typography scale source of truth (mirrored in tailwind config) |
| [tailwind.config.ts](tailwind.config.ts) | colors, fonts, breakpoints, type scale, animations, plugins |
| [postcss.config.js](postcss.config.js) | PostCSS pipeline (Tailwind + Autoprefixer) |
| [src/utils/cn.ts](src/utils/cn.ts) | `cn()` helper (clsx + tailwind-merge) |
| [src/context/language-context.tsx](src/context/language-context.tsx) | I18nProvider + `t(key)` implementation |
| [src/context/drawer-context.tsx](src/context/drawer-context.tsx) | mobile drawer state |
| [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) | `<html dir/lang>` control |
| [src/components/ui/](src/components/ui/) | house primitives — extend, don't rewrite |
| [src/hooks/useI18n.ts](src/hooks/useI18n.ts) | i18n hook wrapper |
| [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) | Firestore init |
| [next.config.mjs](next.config.mjs) | image hosts, redirects, chunk splitting |
| [src/app/metrics/**](src/app/metrics/) | analytics trackers |
| [src/utils/env.ts](src/utils/env.ts) | SITE_URL + hardcoded Pixel token (known debt) |

### ✅ DO
- Treat these files as read-only until the user approves a change.
- Consume what they export (fonts, hooks, house primitives) — don't patch them.

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
- **DO NOT rename these legacy files** — imports depend on them:
  - `form-dialouge.tsx`, `form-dialouge-v1.tsx` (misspelling inherited from CMS)
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

1. A color, typography scale, or radius you need does not have a precedent token in `tailwind.config.ts`.
2. A new UI pattern has no precedent in `src/components/**` (date picker, stepper, kanban, virtualized list, video chrome, etc.).
3. A new dependency would be installed.
4. Any foundation file from RULE-13 needs to change.
5. A new authentication, data-fetching, or state-management pattern is required.
6. A new Firestore collection is needed, OR a WRITE operation (this repo is read-only).
7. A new `/api/*` route is required.
8. A new image remote host must be allowlisted.
9. A new font family is required.
10. Reintroducing MUI / Emotion / a second styling library is being considered (it shouldn't be).

**Where to phrase the escalation →** [Development.md §8](./Development.md).

---

## RULE-19 — Pre-Commit Quality Gate

Before declaring any task complete (run AFTER implementation, BEFORE shipping — this feeds [QA.md](./QA.md)):

```
☐ Tailwind utilities used for styling — no sx, no @mui/* import, no @emotion/* import
☐ cn() used for conditional class merging — no string concatenation of classNames
☐ No new .module.css file (existing ones are grandfathered)
☐ No new dependency in package.json
☐ No foundation file modified (RULE-13)
☐ No em units, no vw for font-size
☐ Typography uses text-* tokens — no invented font sizes
☐ Logical properties (ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start, text-end) used for direction-sensitive styling
☐ No `flex-row-reverse` driven by isRTL — let logical properties flip automatically
☐ Mobile-first responsive cascade (default → sm: → md: → lg: → xl: → 2xl:)
☐ Every form `<input>` has min-h-[44px] (or equivalent) on mobile
☐ t is called as t("key.path") — never as t.key
☐ Every user-facing string has BOTH en.json and ar.json entries (or uses an inline isArabic ternary)
☐ New /route has a /ar/route twin (or an explicit reason it is EN-only)
☐ Any new `next/image` has descriptive alt and comes from an allowlisted remote host
☐ No Firebase SDK call in a component file
☐ No write operation against Firestore
☐ No duplicate of an existing reusable component (especially of @/components/ui/*)
☐ No second I18nProvider / DrawerProvider / Toaster mounted
☐ No reintroduction of ThemeProvider, @mui/*, or @emotion/* — they are uninstalled
☐ Icons come from lucide-react — no other icon pack
☐ Interactive primitives use @headlessui/react — no custom modal/dropdown reinventions
☐ If a legacy-misspelled file was touched, spelling was preserved
☐ Visual identity preserved: render the affected route at 360 / 768 / 1200 / 1500 in both EN and AR before shipping
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
