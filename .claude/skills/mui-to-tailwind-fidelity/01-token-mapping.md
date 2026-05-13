# 01 — Token Mapping (MUI → Tailwind)

Authoritative lookup tables. Every value here is traced to a specific MUI source line. Use these to translate. **Never invent values.**

Sources:
- `tuitionalFrontend-mui-baseline\src\app\assets\css\typographyTokens.ts` (typography)
- `tuitionalFrontend-mui-baseline\src\app\assets\css\theme.ts` (MUI theme + breakpoint media queries)
- `tuitionalFrontend-mui-baseline\src\app\globals.css` (base element rules)
- `tuitionalFrontend\tailwind.config.ts` (current Tailwind tokens)

---

## §1 Typography

The MUI theme applies different `font-size` per breakpoint via `@media (max-width: 1199px)` and `@media (max-width: 599px)`. Translate this to Tailwind's mobile-first cascade as `text-{variant}-mobile sm:text-{variant}-tablet lg:text-{variant}`. The order matters: **mobile base first, then `sm:` for tablet, then `lg:` for desktop.**

### Headings

| MUI variant | Mobile (<600px) | Tablet (600-1199px) | Desktop (≥1200px) | Tailwind triplet |
|---|---|---|---|---|
| `h1` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | `text-h1-mobile sm:text-h1-tablet lg:text-h1` |
| `h2` | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | `text-h2-mobile sm:text-h2-tablet lg:text-h2` |
| `h3` | 1.125rem (18px) | 1.25rem (20px) | 1.5rem (24px) | `text-h3-mobile sm:text-h3-tablet lg:text-h3` |
| `h4` | 1rem (16px) | 1.125rem (18px) | 1.25rem (20px) | `text-h4-mobile sm:text-h4-tablet lg:text-h4` |
| `h5` | (no mobile override) | 1rem (16px) | 1.125rem (18px) | `text-h5-tablet lg:text-h5` |
| `h6` | (no responsive override) | 1rem (16px) | 1rem (16px) | `text-h6` |

All heading weights: **h1/h2/h3 = 700, h4/h5/h6 = 600**. Font-family: `font-heading` (League Spartan).

### Body & captions

| MUI variant | Mobile | Desktop | Tailwind class | Font |
|---|---|---|---|---|
| `body1` | 0.9375rem (15px) | 1rem (16px) | `text-body-mobile sm:text-body` | `font-body` (Inter) |
| `body2` | 0.875rem (14px) | 0.875rem (14px) | `text-small` | `font-body` |
| `caption` | 0.875rem (14px) | 0.875rem (14px) | `text-small` | `font-body` |
| `small` (HTML `<small>`) | 0.875rem | 0.875rem | `text-small` | `font-body` |

Note: Tailwind config also defines `caption` = 0.75rem. Reserve `text-caption` for non-MUI uses; for MUI `variant="caption"` use `text-small` (MUI maps caption to 14px in this theme).

### Special variants

| MUI variant | Mobile | Tablet | Desktop | Tailwind triplet | Font |
|---|---|---|---|---|---|
| `subtitle1` (statNumber) | 1.75rem | 2.25rem | 3rem | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` | `font-heading` |
| `subtitle2` (statLabel) | 0.875rem | 0.875rem | 0.875rem | `text-stat-label` (add `uppercase`) | `font-body` |
| `button` (MUI Button label) | 0.9375rem (15px) | 1rem (16px) | 1rem (16px) | `text-button-mobile sm:text-button` | `font-heading` |
| `nav` (navigation links) | 1rem | 1rem | 1rem | `text-nav` | `font-body` |
| `formLabel` (input label) | 0.875rem | 0.875rem | 0.875rem | `text-form-label` | `font-body` |
| `formInput` (input value text) | **1rem (never reduce — iOS zoom)** | 1rem | 1rem | `text-form-input` | `font-body` |
| `categoryTag` | 0.875rem | 0.875rem | 0.875rem | `text-category-tag` (add `uppercase`) | `font-heading` |

### Font families

| Tailwind class | Resolves to | Use for |
|---|---|---|
| `font-heading` | League Spartan (via `--font-league-spartan`) | All headings, button labels, statNumber, categoryTag |
| `font-body` | Inter (via `--font-inter`) | Body, small, caption, nav, formLabel, formInput |
| `font-arabic` | Noto Sans Arabic | Auto-applied via `html[dir="rtl"] *` rule — don't add manually |

### Typography weights (when a custom weight is needed)

MUI weights map to Tailwind: 400→`font-normal`, 500→`font-medium`, 600→`font-semibold`, 700→`font-bold`. The fontSize tokens above already encode default weights via Tailwind's tuple form, so a plain `text-h2` already implies `font-weight: 700`. Only add `font-*` when you need to override.

---

## §2 Breakpoints

### MUI defaults vs Tailwind config (in this repo)

| Name | MUI (default) | Tailwind (this repo) | Match? |
|---|---|---|---|
| xs | 0px | (no prefix, mobile-first base) | ✓ |
| sm | 600px | `sm: 600px` | ✓ |
| md | 900px | `md: 900px` | ✓ |
| lg | 1200px | `lg: 1200px` | ✓ |
| xl | 1536px | `xl: 1500px` | ✗ 36px short |
| (none) | — | `2xl: 2000px` | (MUI has no equivalent) |

The `xl` divergence (1500 vs 1536) means components using `xl:` in Tailwind kick in 36px earlier than MUI's `xl`. In practice this affects only the 1500-1535px band. See [04-foundation-fixes.md](./04-foundation-fixes.md) for the optional fix.

### Direction of mapping

MUI `sx={{ x: { xs: A, sm: B, md: C, lg: D, xl: E } }}` is **mobile-first cascade**, identical in semantics to Tailwind's mobile-first prefixes:

| MUI key | Tailwind prefix |
|---|---|
| `xs` | (no prefix) |
| `sm` | `sm:` |
| `md` | `md:` |
| `lg` | `lg:` |
| `xl` | `xl:` |

So `sx={{ marginTop: { xs: "4vh", sm: "5vh", lg: "6vh" } }}` → `mt-[4vh] sm:mt-[5vh] lg:mt-[6vh]`.

### Typography breakpoint inversion (the trap)

The MUI theme defines typography with `max-width` media queries:

```ts
"@media (max-width: 1199px)": { fontSize: ... },  // tablet
"@media (max-width: 599px)": { fontSize: ... },   // mobile
```

That's **desktop-first** for typography only. Translation rule:
- `max-width: 599px` rule → mobile = base (no prefix)
- `max-width: 1199px` rule (but not max 599) → tablet = `sm:`
- default rule (no media query) → desktop = `lg:`

This is why the typography cascade is `text-h1-mobile sm:text-h1-tablet lg:text-h1` (three steps, ascending).

---

## §3 MUI Grid → Tailwind grid-cols

MUI `<Grid container>` with `<Grid item xs={A} sm={B} md={C} lg={D}>` maps to CSS Grid. The MUI Grid item `={n}` is "n out of 12 columns wide".

### Quick lookup (most common patterns)

| MUI Grid item | Visual behavior | Tailwind classes (on parent) |
|---|---|---|
| `xs={12}` (only) | 1 column on all sizes | `grid grid-cols-1` |
| `xs={12} sm={6}` | 1 col mobile, 2 cols ≥600px | `grid grid-cols-1 sm:grid-cols-2` |
| `xs={12} md={6}` | 1 col mobile/sm, 2 cols ≥900px | `grid grid-cols-1 md:grid-cols-2` |
| `xs={12} lg={6}` ← **most common in this codebase** | 1 col below 1200px, 2 cols ≥1200px | `grid grid-cols-1 lg:grid-cols-2` |
| `xs={12} sm={6} md={4}` | 1 → 2 → 3 cols | `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3` |
| `xs={12} sm={6} lg={4}` | 1 → 2 → 3 (skipping md) | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| `xs={6}` (no other) | 2 cols at all sizes | `grid grid-cols-2` |
| `xs={4}` | 3 cols at all sizes | `grid grid-cols-3` |
| `xs={3}` | 4 cols at all sizes | `grid grid-cols-4` |
| `xs={12} md={12} lg={6}` | 1 col below 1200, 2 at lg+ | `grid grid-cols-1 lg:grid-cols-2` (md=12 is the default, drop it) |

### The breakpoint inversion rule (memorize)

**The Tailwind prefix matches the MUI key at which the item shrinks below `={12}`.**

- MUI `lg={6} md={12} sm={12} xs={12}` → only at `lg` does the item become 6/12 → use `lg:grid-cols-2`
- MUI `sm={6} xs={12}` → at `sm` it shrinks → use `sm:grid-cols-2`

**Bug to avoid (seen repeatedly in the port):** `<Grid item lg={6} md={12} ...>` written as `sm:grid-cols-2` instead of `lg:grid-cols-2`. This makes the layout split too early.

### `columnSpacing` / `rowSpacing` / `spacing`

| MUI prop | Pixel value | Tailwind |
|---|---|---|
| `<Grid container spacing={1}>` | 8px both axes | `gap-2` |
| `<Grid container spacing={2}>` | 16px both axes | `gap-4` |
| `<Grid container spacing={3}>` | 24px both axes | `gap-6` |
| `<Grid container columnSpacing={2} rowSpacing={1}>` | 16px col, 8px row | `gap-x-4 gap-y-2` |
| `<Grid container columnSpacing={2} rowSpacing={2}>` | 16px both | `gap-4` (or `gap-x-4 gap-y-4`) |
| `<Grid container columnSpacing={3} rowSpacing={1.5}>` | 24px col, 12px row | `gap-x-6 gap-y-3` |

---

## §4 MUI `spacing(n)` lookup

MUI's spacing base unit is **8px** (default, not overridden in this theme). Every numeric `spacing` prop is `n × 8`.

| MUI value | Pixels | Tailwind equivalent |
|---|---|---|
| `0` | 0 | `0` |
| `0.5` | 4 | `1` (e.g. `p-1`, `m-1`, `gap-1`) |
| `1` | 8 | `2` (`p-2`, `m-2`, `gap-2`) |
| `1.5` | 12 | `3` |
| `2` | 16 | `4` |
| `2.5` | 20 | `5` |
| `3` | 24 | `6` |
| `4` | 32 | `8` |
| `5` | 40 | `10` |
| `6` | 48 | `12` |
| `7` | 56 | `14` |
| `8` | 64 | `16` |
| `10` | 80 | `20` |
| `12` | 96 | `24` |

Applies to: `p`, `m`, `mt/mb/ml/mr`, `pt/pb/pl/pr`, `gap`, `columnGap`, `rowGap`, `spacing`, `columnSpacing`, `rowSpacing`. In `sx`, MUI also accepts `mx/my/px/py` — same rule.

### Examples

| MUI | Tailwind |
|---|---|
| `<Box sx={{ p: 3 }}>` | `p-6` |
| `<Box sx={{ pt: 2, pb: 4 }}>` | `pt-4 pb-8` |
| `<Box sx={{ mx: "auto", my: 5 }}>` | `mx-auto my-10` |
| `<Stack spacing={2}>` | `flex flex-col gap-4` |
| `<Stack direction="row" spacing={3}>` | `flex flex-row gap-6` |

### `vh`/`vw` literal preservation

When MUI uses `vh`/`vw` strings instead of numeric spacing:

| MUI | Tailwind |
|---|---|
| `sx={{ marginY: "4vh" }}` | `my-[4vh]` |
| `sx={{ marginY: { xs: "4vh", sm: "5vh", lg: "6vh" } }}` | `my-[4vh] sm:my-[5vh] lg:my-[6vh]` |
| `sx={{ padding: "5vh 3vh" }}` | `py-[5vh] px-[3vh]` |
| `sx={{ height: "40vh" }}` | `h-[40vh]` |
| `sx={{ height: { xs: "25vh", lg: "40vh" } }}` | `h-[25vh] lg:h-[40vh]` |

Do not convert `vh` to `rem` or `px`. The codebase relies on `vh` for vertical rhythm; the port must preserve it.

---

## §5 Colors

`tailwind.config.ts` already defines the brand palette. **Confirmed mapping:**

| MUI hex (used inline) | Tailwind class |
|---|---|
| `#38b6ff`, `#38B6FF` (primary blue) | `bg-brand-500` / `text-brand-500` |
| `#D7F0FF` (section tint) | `bg-brand-50` |
| `rgba(81, 184, 147, 1)`, `#51B893` (success) | `text-success` / `bg-success` |
| `#FFB000` (warning) | `text-warning` |
| `#B70000` (destructive) | `text-danger` |
| `#2d2d2d` (body text) | `text-ink-900` |
| `rgba(0,0,0,0.77)` (input text) | `text-ink-800` |
| `#ffffff` | `text-white` / `bg-white` |

For brand color shades not enumerated above (e.g. `brand-100`, `brand-700`), use only when the MUI source explicitly references that shade. Don't substitute a shade for a different inline hex.

---

## §6 Shadows

`tailwind.config.ts` defines these custom shadows. **Confirmed mapping:**

| MUI inline shadow string | Tailwind class |
|---|---|
| `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | `shadow-card` |
| `0.1vh 1.5vh 3.4vh 0px rgba(56, 182, 255, 0.4)` | `shadow-brand-glow` |
| `1px 15px 34px 0px rgba(56, 182, 255, 0.4)` | use arbitrary: `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` (note: similar but not identical to brand-glow) |
| `inset 0px -5px 15px 0px rgba(56, 182, 255, 0.2)` | `shadow-benefit-box` |
| `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` | `shadow-header` |
| `0px -3px 8px 0px rgba(0, 155, 245, 0.15) inset, 0px 2px 1px 0px rgba(0, 0, 0, 0.05)` | use arbitrary: `shadow-[0px_-3px_8px_0px_rgba(0,155,245,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]` (contact form glass) |
| `1px 15px 34px 0px rgba(0,0,0,0.2)` | `shadow-cta-white` |
| `5px -5px 8px 0px rgba(0,0,0,0.15) inset, -6px 2px 8px 0px rgba(0,0,0,0.15) inset, 0px 4px 4px 0px rgba(0,0,0,0.25)` | `shadow-footer-card` |

If the MUI shadow doesn't appear above, use Tailwind's arbitrary `shadow-[...]` syntax — preserve the exact string with underscores in place of spaces.

---

## §7 Border radius

| MUI inline `borderRadius` | Tailwind class |
|---|---|
| `4px` | `rounded-sm` |
| `8px` | `rounded` (default) |
| `10px` | `rounded-md` |
| `16px` | `rounded-lg` |
| `20px` | `rounded-[20px]` (use arbitrary — no token; common on cards/images) |
| `24px` | `rounded-xl` |
| `9999px` / `50%` | `rounded-full` |
| `2vh` | `rounded-[2vh]` |
| `5px` | `rounded-[5px]` |

---

## §8 Backgrounds

`tailwind.config.ts` defines these gradients. **Confirmed mapping:**

| MUI gradient | Tailwind class |
|---|---|
| `linear-gradient(to bottom, #DBF1FF, #EDF8FF)` | `bg-hero-fade` |
| `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)` | `bg-footer-fade` |
| `linear-gradient(to bottom, #FFFFFF, #58B9F6)` | `bg-benefit-fade` |
| `linear-gradient(to top, rgba(255,255,255,0.7), #D7F0FF)` | `bg-gradient-to-t from-white/70 to-brand-50` (no preset — compose) |

---

## §9 Animations

`tailwind.config.ts` exposes `pulse`, `left-circle`, `right-circle`. Use `animate-pulse`, `animate-left-circle`, `animate-right-circle`.

For MUI inline keyframes not in the config (`bounce`, `bounceOnce`, `delayAndBounce`, `filterAnimation`, `rotateAnimation`, `swing`, `bounceAndForword`, `slide`):
- These live in `tuitionalFrontend-mui-baseline\src\app\globals.css` and are referenced by component-level `style={{ animation: "..." }}` props.
- **Port path**: copy the `@keyframes` block into the Tailwind side's `globals.css` (already partially done — verify before duplicating) and use the existing keyframe name via Tailwind's arbitrary `animate-[NAME_2s_ease-in-out_infinite]` syntax, or extend `tailwind.config.ts` `keyframes/animation`. Pick one approach per keyframe — don't fragment.

---

## §10 Quick reference: top 12 translations

Memorize these — they cover ~75% of bugs in the port.

| MUI | Tailwind |
|---|---|
| `<Typography variant="h2">` | `<h2 className="font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2">` |
| `<Typography variant="body1">` | `<p className="font-body text-body-mobile sm:text-body">` |
| `<Grid container columnSpacing={2} rowSpacing={1}>` + `<Grid item xs={12} lg={6}>` | `<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">` |
| `<Box sx={{ p: 3 }}>` | `<div className="p-6">` |
| `<Box sx={{ marginY: { xs: "4vh", sm: "5vh", lg: "6vh" } }}>` | `<div className="my-[4vh] sm:my-[5vh] lg:my-[6vh]">` |
| `<Stack spacing={2}>` | `<div className="flex flex-col gap-4">` |
| `<Stack direction="row" spacing={3}>` | `<div className="flex flex-row gap-6">` |
| `sx={{ display: { xs: "none", lg: "block" } }}` | `hidden lg:block` |
| `sx={{ display: { xs: "block", lg: "none" } }}` | `block lg:hidden` |
| `sx={{ borderRadius: "20px" }}` | `rounded-[20px]` |
| `sx={{ height: { xs: "25vh", lg: "40vh" } }}` | `h-[25vh] lg:h-[40vh]` |
| `sx={{ color: "rgba(81, 184, 147, 1)" }}` | `text-success` |
