# MUI → Tailwind Quick Fix — Single Reference

One file. Fixes any UI issue. No cross-referencing needed.

Repos:
- **MUI source (READ ONLY)**: `/Users/ammarabid/Downloads/tuitionalFrontend-mui/src/`
- **Tailwind port (EDIT HERE)**: `/Users/ammarabid/Desktop/Desktop/Tuitional/tuitionalFrontend/src/`

---

## STEP 1 — Read the MUI source first

Always read the matching MUI file before touching a single class. Path mirrors the Tailwind side 1:1.

Read:
- The `.tsx` file (all `sx={{}}`, `style={{}}`, `<Grid>` props, `<Typography variant>`)
- Any `.module.css` sibling (raw CSS values, breakpoints, keyframes)
- Any `styles.` object defined in the same file

Never invent values. Every class must trace to a MUI source line.

---

## STEP 2 — Typography triplet (always all three)

Every text element needs all three breakpoint variants. Mobile base first.

| MUI variant | Tailwind triplet |
|---|---|
| `h1` | `text-h1-mobile sm:text-h1-tablet lg:text-h1` |
| `h2` | `text-h2-mobile sm:text-h2-tablet lg:text-h2` |
| `h3` | `text-h3-mobile sm:text-h3-tablet lg:text-h3` |
| `h4` | `text-h4-mobile sm:text-h4-tablet lg:text-h4` |
| `body1` | `text-body-mobile sm:text-body` |
| `body2` / `caption` / `small` | `text-small` (no responsive — 0.875rem always) |
| `button` | `text-button-mobile sm:text-button` |
| stat number | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` |

Font families:
- `font-heading` — League Spartan (headings, buttons, nav)
- `font-body` — Inter (body text, captions)
- `font-arabic` — Noto Sans Arabic (RTL content)

---

## STEP 3 — Spacing translation

### MUI spacing unit → Tailwind

MUI `spacing(1)` = 8px = Tailwind `2`. Formula: **MUI n × 2 = Tailwind class number**.

| MUI `spacing(n)` or `p={n}` | px | Tailwind |
|---|---|---|
| 1 | 8px | `p-2` |
| 2 | 16px | `p-4` |
| 3 | 24px | `p-6` |
| 4 | 32px | `p-8` |
| 5 | 40px | `p-10` |
| 6 | 48px | `p-12` |

### `sx` object → Tailwind (direct mapping)

| MUI `sx` key | Tailwind prefix |
|---|---|
| `p` / `px` / `py` / `pt` / `pb` | `p-` / `px-` / `py-` / `pt-` / `pb-` |
| `m` / `mx` / `my` / `mt` / `mb` | `m-` / `mx-` / `my-` / `mt-` / `mb-` |
| `gap` / `columnGap` / `rowGap` | `gap-` / `gap-x-` / `gap-y-` |
| `width` / `height` | `w-` / `h-` |
| `maxWidth` / `maxHeight` | `max-w-` / `max-h-` |
| `minWidth` / `minHeight` | `min-w-` / `min-h-` |
| `display: "flex"` | `flex` |
| `display: "grid"` | `grid` |
| `display: { xs: "none", lg: "flex" }` | `hidden lg:flex` |
| `flexDirection` | `flex-row` / `flex-col` |
| `alignItems` | `items-*` |
| `justifyContent` | `justify-*` |
| `position: "absolute"` | `absolute` |
| `position: "sticky"` | `sticky` |
| `zIndex: n` | `z-[n]` |
| `borderRadius: "10px"` | `rounded-md` |
| `borderRadius: "16px"` | `rounded-lg` |
| `backgroundColor: "#38B6FF"` | `bg-brand-500` |
| `color: "black"` | `text-black` |
| `boxShadow: "..."` | look up in §Colors & Shadows below |

### Responsive `sx` object → Tailwind prefixes

```tsx
// MUI
sx={{ marginY: { xs: "5vh", md: "10vh" } }}

// Tailwind (mobile-first, xs = no prefix, then breakpoint prefix)
className="my-[5vh] md:my-[10vh]"
```

Never approximate `vh`/`vw` to `px`. Keep viewport units literal.

### Standard inter-section rhythm

Most page sections use this vertical margin:

```tsx
className="my-[5vh] md:my-[10vh]"
// or with padding wrappers:
className="py-[5vh] md:py-[10vh]"
```

---

## STEP 4 — Grid / columns breakpoint rule

**The #1 bug in the port**: using `sm:grid-cols-2` when MUI used `lg={6}`.

**Algorithm**:
1. Read `<Grid item xs={12} sm={12} md={12} lg={6}>` — find the SMALLEST breakpoint where value < 12.
2. That breakpoint (here: `lg`) = the Tailwind prefix.
3. `12 / n` = number of columns. `lg={6}` → `lg:grid-cols-2`.

```
MUI lg={6}  → lg:grid-cols-2   (NEVER sm:grid-cols-2)
MUI lg={4}  → lg:grid-cols-3
MUI lg={3}  → lg:grid-cols-4
MUI md={6}  → md:grid-cols-2
MUI sm={6}  → sm:grid-cols-2
```

### Stack → flex

```tsx
<Stack direction="row" spacing={2} alignItems="center">
// →
<div className="flex flex-row items-center gap-4">

<Stack spacing={3} direction={{ xs: "column", lg: "row" }}>
// →
<div className="flex flex-col gap-6 lg:flex-row">
```

### Container → max-width div

```tsx
<Container maxWidth="lg">
// →
<div className="mx-auto w-full max-w-[1200px] px-6">
```

---

## STEP 5 — Colors & Shadows (exact tokens)

### Colors

| Token | Hex | Usage |
|---|---|---|
| `brand-50` | `#D7F0FF` | Light blue bg, gradient start |
| `brand-500` | `#38B6FF` | Primary blue — buttons, icons, accents |
| `ink-800` | `rgba(0,0,0,0.77)` | Secondary text |
| `ink-900` | `#2D2D2D` | Primary body text |
| `success` | `#51B893` | Green (outlined button, success states) |
| `warning` | `#FFB000` | Amber |
| `danger` | `#B70000` | Red |

### Shadows

| Token | MUI value |
|---|---|
| `shadow-header` | `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` |
| `shadow-brand-glow` | `0.1vh 1.5vh 3.4vh 0px #38B6FF66` |
| `shadow-card` | `0px 4px 12.6px 0px #009BF526` |

### Border radii

| Token | px |
|---|---|
| `rounded-md` | 10px |
| `rounded-lg` | 16px |
| `rounded-[1vh]` | viewport-relative (buttons) |

---

## STEP 6 — Header compensation (CRITICAL for every hero page)

### Root cause

MUI `<Header>` outer Box = `position: absolute` → zero flow space. Hero starts at viewport top.

Tailwind `<Header>` = `position: sticky` → takes up `calc(2vh + 72px)` (xs) / `calc(2vh + 80px)` (sm+) in flow. Hero starts BELOW header.

Result: hero content appears too far down, `height: 100vh` containers overflow.

### Fix the decorative strip (always)

```tsx
// header.tsx — strip must be z-[-1], NOT z-0:
<div aria-hidden className={cn("pointer-events-none absolute start-0 top-0 z-[-1] w-full", heroClassName ?? DEFAULT_HERO_BG)} />
```

### Fix A — pages with `height: 100vh` module CSS container (about, careers, testimonials)

In `page.module.css`:
```css
.container {
  height: 100vh;
  margin-top: calc(-2vh - 72px);   /* cancel sticky header at xs */
}
@media (min-width: 600px) {
  .container { margin-top: calc(-2vh - 80px); }  /* sm+ header = 80px */
}
```

In `page.tsx`:
```tsx
<Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />
```

### Fix B — pages with padding-top hero (home, grade pages)

```tsx
<Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />
<div className="pt-[calc(2vh+72px)] sm:pt-[calc(2vh+80px)] lg:pt-[...MUI-value...]">
  <HeroContent />
</div>
```

### Simple text pages (no big hero)

Omit `heroClassName` — the default `DEFAULT_HERO_BG` solid fallback is fine.

---

## STEP 7 — Breakpoints reference

| Tailwind prefix | min-width | Maps to MUI |
|---|---|---|
| (none) | 0px | `xs` |
| `sm:` | 600px | `sm` |
| `md:` | 900px | `md` |
| `lg:` | 1200px | `lg` |
| `xl:` | 1500px | `xl` (MUI is 1536 — 36px gap, minor) |
| `2xl:` | 2000px | beyond MUI |

Desktop nav, logo, CTAs: **always `lg:`** (not `md:`). Hamburger shows below `lg:`.

---

## STEP 8 — RTL rules

| Pattern | LTR | RTL-aware |
|---|---|---|
| Margin-right | `mr-4` | `me-4` |
| Margin-left | `ml-4` | `ms-4` |
| Padding-right | `pr-4` | `pe-4` |
| Padding-left | `pl-4` | `ps-4` |
| Flex direction | `flex-row` | `flex-row rtl:flex-row-reverse` or conditional `cn("flex", isRTL ? "flex-row-reverse" : "flex-row")` |
| Text align | `text-left` | `text-start` |
| Text align right | `text-right` | `text-end` |

Always pull `const { isRTL } = useI18n()` in client components that need RTL logic.

---

## STEP 9 — i18n `t()` rule

```ts
// language-context.tsx — correct:
return value ?? key;   // "" renders as "", not as key

// NEVER:
return value || key;   // "" falls through to key → shows key literal in UI
```

If `t("some.key")` shows the key string instead of its value, check:
1. Is the key missing from `en.json`? → Add it.
2. Is the value an empty string? → The `??` fix ensures `""` renders as `""`.

---

## STEP 10 — Verification (mandatory before done)

Visual diff at 4 widths, Tailwind port vs MUI source:

| Width | Device | Tailwind band |
|---|---|---|
| 375 | iPhone SE | base |
| 768 | iPad Mini | `sm:` |
| 1280 | Laptop S | `lg:` |
| 1920 | Desktop FHD | `xl:` |

Per-width checks:
- [ ] Typography size matches MUI (same heading/body px)
- [ ] Grid column count matches MUI at each width
- [ ] Vertical rhythm (inter-section margins) matches
- [ ] Images same aspect ratio, no overflow
- [ ] No horizontal scroll
- [ ] Hero fills viewport correctly (no gap at top, no overflow at bottom)
- [ ] Header strip: correct gradient, correct height, no color seam
- [ ] RTL: layout mirrors at `/ar/...` route

Then run: `npm run lint && npm run build` — both must pass.

---

## Common bug → fix lookup

| Symptom | Root cause | Fix |
|---|---|---|
| Hero content too far down / 100vh overflows | Sticky header takes flow space, MUI header doesn't | Fix A or B in §6 |
| Color stripe / seam between header and hero | `heroClassName` not passed, default solid color used | Pass `heroClassName` in §6 |
| Hero images/text covered by strip | Decorative strip `z-0` paints over content | Change `z-0` → `z-[-1]` |
| 2 columns appear on iPad (768px) | `sm:grid-cols-2` should be `lg:grid-cols-2` | §4 Grid rule |
| Heading too big on tablet | Missing `sm:text-h2-tablet` in triplet | §2 typography triplet |
| Spacing way off | `gap-y-5` (20px) instead of `gap-y-2` (8px) — spacing unit confusion | §3 MUI n × 2 |
| `t("some.key")` shows key literal | Empty locale value `""` treated as falsy by `\|\|` | Check `language-context.tsx` uses `??` |
| `vh` values converted to `px` | Approximation error | Keep `vh` literal: `my-[5vh]` |
| Desktop nav shows on iPad | Cutover at `md:` instead of `lg:` | Change `md:hidden/flex` → `lg:hidden/flex` |
| Text renders in Inter instead of League Spartan | Missing `font-heading` | Add `font-heading` to className |
| Box shadow / glow missing | Shadow class missing or raw value not matching token | Use `shadow-brand-glow`, `shadow-header`, `shadow-card` |
| Animation not working | keyframe name mismatch | Use exact name from `globals.css` keyframes in `animate-[name_...]` |
| Double vertical spacing between form rows | Grid `gap-y-*` stacks on top of each field's own `mt-[1.5vh]` (Input/DropDown/PhoneInput already carry top margin) | Drop `gap-y-*`, keep `gap-x-*` only. Let per-field margins drive row rhythm. |
| Visible 1px border around `<Textarea>` (`components/ui/input.tsx`) | House Textarea renders raw `<textarea>` with no `border:0`; browser UA stylesheet paints default | Add `border-0 focus:ring-0` to className. Matches MUI `.textArea { border: none !important }`. |
