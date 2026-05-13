# 02 — Spacing & Layout Translation

How to translate every flavor of MUI spacing/layout into Tailwind classes without losing precision. Use this after looking up raw values in [01-token-mapping.md](./01-token-mapping.md).

---

## §1 The three spacing systems in MUI and how they map

MUI exposes spacing through **three different API shapes**. Recognize the shape first, then translate.

### Shape A: `<Grid>` props

```tsx
<Grid container spacing={2}>
<Grid container columnSpacing={2} rowSpacing={1}>
<Grid item xs={12} lg={6}>
```

→ Tailwind: convert the parent `<Grid container>` to `<div className="grid ...">` with `gap-*` and `grid-cols-*`. See [01-token-mapping.md §3](./01-token-mapping.md).

### Shape B: `<Stack>` props

```tsx
<Stack spacing={2}>
<Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
```

→ Tailwind: convert to `<div className="flex flex-col gap-4">` (or `flex-row`). `Stack` is always flex, vertical by default.

| Stack prop | Tailwind |
|---|---|
| `direction="row"` | `flex-row` |
| `direction="column"` (default) | `flex-col` |
| `spacing={n}` | `gap-{n*2}` (lookup) |
| `alignItems="center"` | `items-center` |
| `alignItems="flex-start"` | `items-start` |
| `alignItems="flex-end"` | `items-end` |
| `justifyContent="center"` | `justify-center` |
| `justifyContent="space-between"` | `justify-between` |
| `justifyContent="space-around"` | `justify-around` |
| `flexWrap="wrap"` | `flex-wrap` |

### Shape C: `sx` shorthand on `<Box>` / `<Typography>` / anything

```tsx
<Box sx={{ p: 3, mt: 2, mx: "auto", gap: 1.5 }}>
<Typography sx={{ marginY: { xs: "4vh", lg: "6vh" } }}>
```

→ Tailwind: each `sx` key maps to one class. The `xs/sm/md/lg/xl` object form maps to Tailwind responsive prefixes (see §3 below).

| MUI `sx` key | Tailwind prefix |
|---|---|
| `p` | `p-` |
| `pt` `pb` `pl` `pr` | `pt-` `pb-` `pl-` `pr-` |
| `px` | `px-` |
| `py` | `py-` |
| `m` | `m-` (use `-` for negative, e.g. `-m-2`) |
| `mt` `mb` `ml` `mr` | `mt-` `mb-` `ml-` `mr-` |
| `mx` | `mx-` |
| `my` | `my-` |
| `gap` | `gap-` |
| `columnGap` | `gap-x-` |
| `rowGap` | `gap-y-` |
| `width` | `w-` |
| `height` | `h-` |
| `maxWidth` | `max-w-` |
| `maxHeight` | `max-h-` |
| `minWidth` | `min-w-` |
| `minHeight` | `min-h-` |
| `flexDirection` | `flex-row` / `flex-col` / `flex-row-reverse` / `flex-col-reverse` |
| `alignItems` | `items-*` |
| `justifyContent` | `justify-*` |
| `flexWrap` | `flex-wrap` / `flex-nowrap` |
| `flex` | `flex-1`, `flex-auto`, `flex-[0.55]`, etc. |
| `position` | `relative` / `absolute` / `fixed` / `sticky` |
| `top` `bottom` `left` `right` | `top-` `bottom-` `left-` `right-` |
| `zIndex` | `z-` (e.g. `z-10`, `z-[2]`) |
| `display` | `block` / `flex` / `inline-flex` / `grid` / `hidden` |
| `overflow` | `overflow-*` |
| `borderRadius` | `rounded-*` |
| `boxShadow` | `shadow-*` |
| `backgroundColor` / `bgcolor` | `bg-*` |
| `color` | `text-*` |
| `border` | `border` + `border-*` |
| `textAlign` | `text-left` / `text-center` / `text-right` |
| `fontFamily` | `font-heading` / `font-body` / `font-arabic` |
| `fontWeight` | `font-*` |
| `fontSize` | `text-*` (use a token if possible; if explicit `1.5rem`, use `text-[1.5rem]`) |
| `lineHeight` | `leading-*` |
| `letterSpacing` | `tracking-*` |

---

## §2 The breakpoint inversion trap (Grid vs sx)

**Two different conventions live in the same MUI file** — don't conflate them.

### Convention 1: `sx` breakpoint objects are mobile-first

```tsx
sx={{ height: { xs: "25vh", lg: "40vh" } }}
```

This means: **at xs (mobile base) = 25vh; at lg (1200+) = 40vh.** Mobile is the floor, larger sizes override upward. Translates 1:1 to Tailwind:

```tsx
className="h-[25vh] lg:h-[40vh]"
```

### Convention 2: `<Grid item>` props specify the column span at each breakpoint

```tsx
<Grid item xs={12} sm={12} md={12} lg={6}>
```

This means: **on xs/sm/md, full-width (12/12). On lg+, half-width (6/12).** So 2 columns appear **at lg, not sooner**. Tailwind:

```tsx
// On the parent:
<div className="grid grid-cols-1 lg:grid-cols-2">
```

**The bug**: writing `sm:grid-cols-2` because "MUI mentioned `sm={12}`" — but `sm={12}` is _the same as default_ (full-width), and the 2-column moment is the smallest breakpoint where the item drops below 12. In this example that's `lg`.

### Algorithm for Grid → grid-cols translation

1. Read the smallest breakpoint where the `Grid item` value is **less than 12**.
2. That breakpoint becomes the Tailwind prefix.
3. Convert the `={n}` to `grid-cols-{12/n}` (because `12 / n` columns fit).

| MUI item span at smallest-non-12 breakpoint | Tailwind grid-cols |
|---|---|
| `={6}` | `grid-cols-2` |
| `={4}` | `grid-cols-3` |
| `={3}` | `grid-cols-4` |
| `={2}` | `grid-cols-6` |

---

## §3 Responsive `sx` object expansion

```tsx
sx={{
  margin: { xs: "5vh 3vh 3vh", lg: "0 7vh" }
}}
```

Expand into longhand first:

```tsx
sx={{
  marginTop: { xs: "5vh", lg: "0" },
  marginRight: { xs: "3vh", lg: "7vh" },
  marginBottom: { xs: "3vh", lg: "0" },
  marginLeft: { xs: "3vh", lg: "7vh" },
}}
```

Then translate each:

```tsx
className={cn(
  "mt-[5vh] mr-[3vh] mb-[3vh] ml-[3vh]",
  "lg:mt-0 lg:mr-[7vh] lg:mb-0 lg:ml-[7vh]",
)}
```

Or, if x/y are symmetric, collapse:

```tsx
className="my-[5vh] mx-[3vh] lg:my-0 lg:mx-[7vh]"
```

---

## §4 Inter-section spacing on a page (the marginY rhythm)

MUI page-level layout uses `marginY` on each section to control vertical rhythm:

```tsx
<HeroSection />
<Box sx={{ marginY: { xs: "4vh", sm: "5vh", lg: "6vh" } }} />  // spacer
<InfoSection />
<Box sx={{ marginY: { xs: "4vh", sm: "5vh", lg: "6vh" } }} />
<TestimonialsSection />
```

Or directly on the section component:

```tsx
<Box sx={{ marginY: { xs: "4vh", sm: "5vh", lg: "6vh" } }}>
  <SectionContent />
</Box>
```

### Translation rules

- **Spacer Boxes** → `<div className="my-[4vh] sm:my-[5vh] lg:my-[6vh]" aria-hidden />` (or fold the margin into the next section's `mt-*`).
- **MarginY on the section wrapper** → wrap the section's root `<div>` with the Tailwind margin classes. **Don't change `padding`** if MUI used `margin`.

### Common page-level rhythm values

Verified by sampling several MUI page sources. Use these as defaults when MUI doesn't specify:

| Context | MUI value | Tailwind |
|---|---|---|
| Section divider (most common) | `{ xs: "4vh", sm: "5vh", lg: "6vh" }` | `my-[4vh] sm:my-[5vh] lg:my-[6vh]` |
| Tight section divider | `{ xs: "3vh", lg: "4vh" }` | `my-[3vh] lg:my-[4vh]` |
| Hero-to-next-section | `{ xs: "5vh", lg: "8vh" }` | `my-[5vh] lg:my-[8vh]` |
| Final section before footer | `{ xs: "5vh", lg: "10vh" }` | `mb-[5vh] lg:mb-[10vh]` |

Always confirm with the MUI source — don't apply these blindly.

---

## §5 Intra-component spacing (forms, cards, lists)

### Form fields

MUI typically uses `<Grid container columnSpacing={2} rowSpacing={1}>` (16px × 8px) for two-column forms.

**Right**: `grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2`

**Wrong** (seen in current port): `grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5`
- `sm:grid-cols-2` splits at 600px → fields too narrow on tablet
- `gap-y-5` is 20px → MUI used 8px

### Cards (BlogCard, PackageCard pattern)

MUI cards usually have:
- `padding: 3` (24px) inside the card → `p-6`
- `gap: 2` (16px) between card sections → `gap-4`
- `borderRadius: "20px"` → `rounded-[20px]`
- A box-shadow string → translate via [01-token-mapping.md §6](./01-token-mapping.md)

### List of cards (catalog grids)

MUI: `<Grid container spacing={3}><Grid item xs={12} sm={6} md={4} lg={3}>` → 1 → 2 → 3 → 4 cols at the four breakpoints.

Tailwind: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`

---

## §6 Common MUI patterns — quick translation cheatsheet

### Centered max-width container

```tsx
<Container maxWidth="lg" sx={{ py: 4 }}>
```

→

```tsx
<div className="mx-auto w-full max-w-[1200px] px-4 py-8">
```

MUI `<Container maxWidth>` pixel values: `xs=444px`, `sm=600px`, `md=900px` (used elsewhere as 960), `lg=1200px`, `xl=1536px`. The actual breakpoint widths are the same.

### Show/hide responsively

```tsx
sx={{ display: { xs: "none", md: "block" } }}
```

→ `hidden md:block`

```tsx
sx={{ display: { xs: "block", md: "none" } }}
```

→ `block md:hidden`

```tsx
sx={{ display: { xs: "none", sm: "flex" } }}
```

→ `hidden sm:flex`

### Absolute positioning with responsive offsets

```tsx
sx={{
  position: "absolute",
  top: { lg: 50, xs: 130 },
  right: 0,
}}
```

→ `absolute top-[130px] right-0 lg:top-[50px]`

Note: bare numeric values in `sx` for position properties are **pixels**, not spacing units. `top: 50` is 50px, not 400px.

### Flex column with two children growing differently

```tsx
sx={{
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  gap: { xs: 3, lg: 4 },
}}
// Child A:
sx={{ flex: { lg: 0.45 } }}
// Child B:
sx={{ flex: { lg: 0.55 } }}
```

→ Parent: `flex flex-col gap-6 lg:flex-row lg:gap-8`
→ Child A: `lg:flex-[0.45]`
→ Child B: `lg:flex-[0.55]`

### RTL-aware flex direction

When the MUI file uses `flexDirection: isArabic ? "row-reverse" : "row"`:

→ Pull `isRTL` from `useI18n()` and apply `cn("flex", isRTL ? "flex-row-reverse" : "flex-row")` or `cn("flex flex-row", isRTL && "rtl:flex-row-reverse")` depending on the existing project convention. Check the surrounding file before picking — keep the project consistent.

---

## §7 What NOT to translate

These MUI features have no Tailwind class equivalent — keep or skip as noted:

| MUI feature | Action |
|---|---|
| `<Typography variant="...">` | Replace with a semantic HTML tag (`<h2>`, `<p>`, `<span>`) + typography className. Don't preserve the `<Typography>` wrapper. |
| `<Grid container>` / `<Grid item>` | Replace with `<div className="grid ...">`. Don't keep `Grid` imports. |
| `<Stack>` | Replace with `<div className="flex ...">`. Don't keep `Stack` imports. |
| `<Box>` | Replace with `<div>`. Don't keep `Box` imports. |
| `<Container>` | Replace with a `<div className="mx-auto w-full max-w-[...] px-*">`. |
| `theme.palette.primary.main` | Replace with the literal hex from MUI palette → Tailwind color class (see [01-token-mapping.md §5](./01-token-mapping.md)). |
| `theme.spacing(n)` | Replace with the Tailwind class (n × 8 → multiply by 2 for the Tailwind unit). |
| `theme.breakpoints.up('md')` in JS conditions | Replace with `useMediaQuery` or, preferably, a `md:` Tailwind class. Avoid JS-driven layout when possible. |
| MUI CSS-modules (`*.module.css`) | Port rules one-by-one into Tailwind classNames. Do **not** import the `.module.css` in the Tailwind side — the Tailwind project enforces no CSS modules. |
| Inline `style={{ ... }}` props that duplicate `sx` | Translate the same way. If style and sx both set the same property, prefer `sx`'s value (it wins in MUI). |

---

## §8 Verification checklist (per-component, after translation)

Before declaring a component done:

- [ ] Every `<Typography>` replaced with semantic HTML + typography className triplet
- [ ] Every `<Grid>` / `<Stack>` / `<Box>` / `<Container>` replaced with `<div>`
- [ ] No remaining `sx=`, `style=` (except for dynamic values like image dimensions)
- [ ] Every responsive value uses the right Tailwind prefix (verify with §2 algorithm if Grid was involved)
- [ ] Every `vh`/`vw` preserved (no silent conversion to `rem`/`px`)
- [ ] Every color matches a token from [01-token-mapping.md §5](./01-token-mapping.md) — no raw hex unless MUI had it as a one-off
- [ ] Visual side-by-side with MUI baseline at 375 / 768 / 1280 / 1920 (see [03-responsiveness.md](./03-responsiveness.md))
