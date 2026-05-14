# Component — `WhyChooseTuitional`

The "Why Choose Tuitional?" section on `/about` and `/ar/about`. Renders a section heading (with a decorative `lines` pseudo-element) above three `InfoBox` cards (Experienced Tutors / One-on-One Learning / Flexible Schedules). Cards stack vertically below 1200px and sit in a 3-column flex row at lg+.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\about\why-choose-tuitional.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\about\why-choose-tuitional.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\about\ar-why-choose-tuitional.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box  (root)
├── Box.headingContanier  (flex-col, items-center, w:100%, mb {xs:auto, lg:24px})
│   └── Typography.mainHeading h2  variant="h2"  ← "Why Choose Tuitional?"
│       └── ::before (decorative lines image — absolute, mobile: linesMobile.png, lg: linesInvert.png)
└── Grid (container or item; toggles on isGreaterThanLarge), spacing 0 or 2, sx=gridContainer
    └── Grid.gridItem md=12 lg=3  × 3 cards
        └── InfoBox  (rgba(255,255,255,0.7) bg, w/h responsive, radius 10px, padding 24px, shadow)
            ├── Box.icon  (circle, white bg, responsive size, marginTop lg:-80px)
            │   └── Box (image holder, responsive size)
            │       └── Image (scholarHat / book / calendar SVG)
            └── Box (h:35%)
                ├── Typography.heading h3  variant="h3"  ← card heading
                └── Typography.dec p  variant="body2"  ← card description
```

### Dimensions & spacing (per `styles` object)

#### Root + heading

| Element | Property | Mobile (<600) | sm (600–899) | md (900–1199) | lg (1200–1499) | xl (≥1500) |
|---|---|---|---|---|---|---|
| `.headingContanier` | `display` | flex | flex | flex | flex | flex |
| `.headingContanier` | `alignItems` | center | center | center | center | center |
| `.headingContanier` | `flexDirection` | column | column | column | column | column |
| `.headingContanier` | `width` | 100% | 100% | 100% | 100% | 100% |
| `.headingContanier` | `background` | transparent | transparent | transparent | transparent | transparent |
| `.headingContanier` | `marginBottom` | `auto` | `auto` | `auto` | `24px` | `24px` |
| `.mainHeading` | `marginTop` | `40px` | `50px` | `70px` | `105px` | `105px` |
| `.mainHeading` | `marginBottom` | `20px` | `20px` | `20px` | `20px` | `20px` |
| `.mainHeading` | `display` | flex | flex | flex | flex | flex |
| `.mainHeading` | `position` | relative | relative | relative | relative | relative |
| `.mainHeading` | `textAlign` | center | center | center | center | center |
| `.mainHeading` | `alignItems` | center | center | center | center | center |
| `.mainHeading` | `justifyContent` | center | center | center | center | center |
| `.mainHeading` | `color` | `#000000` | same | same | same | same |
| `.mainHeading::before` | `content` | `""` | `""` | `""` | `""` | `""` |
| `.mainHeading::before` | `position` | absolute | absolute | absolute | absolute | absolute |
| `.mainHeading::before` | `backgroundImage` | `linesMobile.png` | `linesInvert.png` | `linesInvert.png` | `linesInvert.png` | `linesInvert.png` |
| `.mainHeading::before` | `height` | `19px` | `35px` | `35px` | `35px` | `35px` |
| `.mainHeading::before` | `width` | `20px` | `43px` | `43px` | `43px` | `43px` |
| `.mainHeading::before` | `top` | `-12` (px) | `-35` (px) | `-35` | `-35` | `-35` |
| `.mainHeading::before` | `left` | `11%` | `-6%` | `-6%` | `-6%` | `-6%` |
| `.mainHeading::before` | `backgroundRepeat` | no-repeat | no-repeat | no-repeat | no-repeat | no-repeat |

#### Grid container

| Element | Property | Mobile | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| `.gridContainer` | `display` | flex | flex | flex | flex | flex |
| `.gridContainer` | `alignItems` | stretch | stretch | stretch | stretch | stretch |
| `.gridContainer` | `justifyContent` | center | center | center | center | center |
| `.gridContainer` | `width` | 100% | 100% | 100% | 100% | 100% |
| `.gridContainer` | `columnGap` | `0` | `0` | `0` | `24px` | `24px` |
| `.gridContainer` | `rowGap` | `16px` | `16px` | `16px` | `0` | `0` |
| `.gridContainer` | `flexDirection` | column | column | column | row | row |
| `.gridContainer` | `flexWrap` | wrap | wrap | wrap | wrap | wrap |
| `.gridItem` | `marginBottom` | `16px` | `16px` | `16px` | `0` | `0` |
| `.gridItem` | `width` | `100%` | `100%` | `90%` | `auto` | `auto` |
| `.gridItem` | `display` | flex | flex | flex | flex | flex |
| `.gridItem` | `justifyContent` | center | center | center | center | center |

#### InfoBox card

| Element | Property | Mobile | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| Card root | `backgroundColor` | `rgba(255,255,255,0.7)` | same | same | same | same |
| Card root | `width` | `100%` | `320px` | `360px` | `380px` | `420px` |
| Card root | `height` | `auto` | `280px` | `320px` | `400px` | `460px` |
| Card root | `minHeight` | `250px` | `280px` | `320px` | `400px` | (not set; falls through to lg=400) |
| Card root | `display` | flex | flex | flex | flex | flex |
| Card root | `alignItems` | center | center | center | center | center |
| Card root | `justifyContent` | center | center | center | center | center |
| Card root | `flexDirection` | column | column | column | column | column |
| Card root | `borderRadius` | `10px` | same | same | same | same |
| Card root | `padding` | `24px` | same | same | same | same |
| Card root | `boxShadow` | `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D` | same | same | same | same |
| Card root | `position` | relative | relative | relative | relative | relative |
| Card root | `marginX` | (not set) | `24px` | `24px` | `24px` | `24px` |
| `.icon` (outer circle) | `width` / `height` | `45px` | `55px` | `75px` | `115px` | `115px` |
| `.icon` | `backgroundColor` | `white` | same | same | same | same |
| `.icon` | `display` / align / justify | flex / center / center | same | same | same | same |
| `.icon` | `borderRadius` | `60px` | same | same | same | same |
| `.icon` | `boxShadow` | `0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526` | same | same | same | same |
| `.icon` | `marginBottom` | `10px` | `20px` | `30px` | `40px` | `40px` |
| `.icon` | `marginTop` | (not set; default 0) | (not set; 0) | (not set; 0) | `-80px` | `-80px` |
| Inner image holder | `width` / `height` | `20px` | `30px` | `45px` | `45px` | `45px` |
| Image `<Image>` | `style.width / height` | `100% / 100%` | same | same | same | same |
| Text container `<Box sx={{ height: "35%" }}>` | `height` | `35%` | `35%` | `35%` | `35%` | `35%` |
| `.heading` (card h3) | `marginBottom` | `10px` | `15px` | `18px` | `22px` | `22px` |
| `.heading` | `textAlign` | center | center | center | center | center |
| `.heading` | `fontSize` | `16px` | `18px` | `20px` | `24px` | `28px` |
| `.heading` | `fontWeight` | `600` | same | same | same | same |
| `.heading` | `lineHeight` | `20px` | `22px` | `24px` | `28px` | `32px` |
| `.dec` (card body) | `textAlign` | center | center | center | center | center |
| `.dec` | `maxWidth` | `100%` | `280px` | `320px` | `340px` | `380px` |
| `.dec` | `color` | `rgba(0,0,0,0.77)` | same | same | same | same |
| `.dec` | `fontSize` | `12px` | `13px` | `14px` | `15px` | `16px` |
| `.dec` | `lineHeight` | `16px` | `17px` | `18px` | `20px` | `22px` |
| `.dec` | `margin` | `auto` | `auto` | `auto` | `auto` | `auto` |

### Typography

| Element | MUI variant | Mobile | sm | md | lg | xl | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|---|
| `.mainHeading` "Why Choose Tuitional?" | `h2` | 22px | 28px | 28px | 36px | 36px | 700 | `#000` | League Spartan |
| `.heading` card h3 | `h3` overridden by `sx.fontSize` | 16px | 18px | 20px | 24px | 28px | 600 | (default; black) | League Spartan |
| `.dec` card body | `body2` overridden by `sx.fontSize` | 12px | 13px | 14px | 15px | 16px | 400 | `rgba(0,0,0,0.77)` | League Spartan |

### Colors

| MUI | Tailwind |
|---|---|
| `#000000` | `text-black` |
| `#38b6ff` (none direct here; brand) | `text-brand-500` |
| `rgba(255,255,255,0.7)` | `bg-white/70` |
| `rgba(0,0,0,0.77)` | `text-ink-800` |
| `#FFFFFF` | `bg-white` |

### Shadows

| MUI | Tailwind |
|---|---|
| `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D` | `shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D]` (per `01-token-mapping.md §6`, this is the "contact form glass" pattern — could also use a token if `tailwind.config.ts` exposes one with this exact spec) |
| `0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526` | `shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526]` |

### Animations / interactions

None directly. Cards are static. The `Grid container={!isGreaterThanLarge}` JS-driven layout toggle is a code smell — in Tailwind, replace with CSS-only responsive layout (flex-col below 1200, flex-row at lg+).

### Grid → Tailwind cols translation (CORRECTED — flex-wrap was wrong)

Per source: `<Grid item md={12} lg={3}>` — 3 cards stack vertically below lg, sit in one row at lg+.

**Earlier guidance said use `flex flex-col lg:flex-row lg:flex-wrap` — that was WRONG and caused a real bug.** The `InfoBox` has fixed widths (`lg:w-[380px] xl:w-[420px]`). Three 380px cards + 2×24px gap = 1188px. At a 1200–1280px viewport, after the page's `lg:px-[6vw]` padding the available width is ~1056–1126px — **less than 1188px** — so `flex-wrap` wraps the third card onto a second row. The cards only fit on one row above ~1340px.

**Correct translation**: use a CSS grid that is genuinely 1-col below lg and 3-col at lg+, and make the card width fluid at lg so it fills the grid cell instead of overflowing it:

```tsx
// container:
<div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-6">
  {items.map(... => <div className="flex justify-center">...</div>)}
</div>

// InfoBox root at lg — drop the fixed lg:w-[380px] xl:w-[420px], use fluid + cap:
//   ...lg:w-full lg:max-w-[420px] xl:h-[460px]
```

`grid-cols-3` is the right call here — it guarantees "3 in a row on large, 1 on small" (the actual design intent). The old worry that grid "forces 12/12 span" is irrelevant: MUI's `justifyContent: center` + fixed card widths just meant the row was centered; a 3-col grid with `lg:max-w-[420px]` cards centered in their cells reproduces that look without the wrap fragility.

---

## §2 Tailwind port — bug list

Current port: `tuitionalFrontend\src\components\about\why-choose-tuitional.tsx` (lines 30–88).

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| WC1 | 33 | `<div className="relative flex h-auto min-h-[250px] w-full flex-col items-center justify-center rounded-md bg-white/70 p-6 shadow-[...] sm:mx-6 sm:h-[280px] sm:w-[320px] md:h-[320px] md:w-[360px] lg:h-[400px] lg:w-[380px] xl:h-[460px] xl:w-[420px]">` | Looks right; let's verify each piece:<br>• `relative` ✓<br>• `min-h-[250px]` ✓ (xs)<br>• `w-full` ✓ (xs)<br>• `rounded-md` — MUI: `10px`. ✓ (per token map `rounded-md`=10px)<br>• `bg-white/70` ✓<br>• `p-6` (24px) ✓<br>• `sm:mx-6` (24px) ✓ MUI `marginX: { sm: "24px" }`<br>• `sm:h-[280px] sm:w-[320px]` ✓<br>• `md:h-[320px] md:w-[360px]` ✓<br>• `lg:h-[400px] lg:w-[380px]` ✓<br>• `xl:h-[460px] xl:w-[420px]` ✓<br>**Issue: missing `sm:min-h-[280px] md:min-h-[320px] lg:min-h-[400px]` (`minHeight` responsive override).** MUI has these explicit minHeights. With `lg:h-[400px]` set, minHeight is moot — but at lg the `h-[400px]` already equals minHeight 400. Below lg, the explicit minHeights matter. **Add minHeights.** | medium |
| WC2 | 34 | `.icon` wrapper: `mb-[10px] flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-[...] sm:mb-5 sm:h-[55px] sm:w-[55px] md:mb-[30px] md:h-[75px] md:w-[75px] lg:-mt-20 lg:mb-10 lg:h-[115px] lg:w-[115px]` | • `rounded-full` — MUI says `borderRadius: "60px"`. On a 45–115px square element, `60px` ≈ ~half on small, fully round on 45px (60>45). **`rounded-full` is correct** (visually rounds the square). ✓<br>• `mb-[10px]` xs, `sm:mb-5` (20px) ✓, `md:mb-[30px]` ✓, `lg:mb-10` (40px) ✓<br>• `lg:-mt-20` — MUI `marginTop: { lg: "-80px" }`. `-mt-20` = `-80px` ✓<br>• Sizes ✓<br>• Shadow: `0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526` — check shadow string. Tailwind port uses `shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526]` (line 34). ✓<br>**No issues.** | — |
| WC3 | 35 | Inner image holder: `h-5 w-5 sm:h-[30px] sm:w-[30px] md:h-[45px] md:w-[45px] lg:h-[45px] lg:w-[45px]` | MUI: 20px (xs) → 30 (sm) → 45 (md) → 45 (lg). `h-5 w-5` = 20px ✓. ✓ All match. | — |
| WC4 | 36 | `<Image src={src} alt={alt} className="h-full w-full" />` | MUI `style={{ width: "100%", height: "100%" }}` — no object-fit specified. ✓ `h-full w-full` matches. Alt text: MUI uses static `alt="sucess"` (sic) / `alt="book"` / `alt="calendar"`. Tailwind port uses the `iconMap` alt — slight improvement. ✓ Keep. | — |
| WC5 | 39 | Text container `<div className="h-[35%]">` | MUI `<Box sx={{ height: "35%" }}>`. ✓ Match. Keep. | — |
| WC6 | 40 | Card h3: `mb-[10px] text-center font-heading text-[16px] font-semibold leading-5 sm:mb-[15px] sm:text-[18px] sm:leading-[22px] md:mb-[18px] md:text-[20px] md:leading-6 lg:mb-[22px] lg:text-2xl lg:leading-7 xl:text-[28px] xl:leading-8` | Verify against MUI table:<br>• mb: 10/15/18/22/22 → `mb-[10px] sm:mb-[15px] md:mb-[18px] lg:mb-[22px]` ✓ (xl inherits)<br>• text size: 16/18/20/24/28 → `text-[16px] sm:text-[18px] md:text-[20px] lg:text-2xl xl:text-[28px]` ✓ (`text-2xl` = 24px per Tailwind defaults; verify in `tailwind.config.ts` — if 24px ✓, if different use `lg:text-[24px]`)<br>• leading: 20/22/24/28/32 → `leading-5 sm:leading-[22px] md:leading-6 lg:leading-7 xl:leading-8` (`leading-5`=20, `leading-6`=24, `leading-7`=28, `leading-8`=32) ✓<br>• weight 600 → `font-semibold` ✓<br>• `text-center` ✓<br>**No color set in MUI for `.heading` → inherits black. Current port: no color class. Default text color comes from globals.** ✓ Acceptable.<br>**No issues here.** | — |
| WC7 | 43 | Card p `mx-auto max-w-full text-center font-heading text-[12px] leading-4 text-ink-800 sm:max-w-[280px] sm:text-[13px] sm:leading-[17px] md:max-w-[320px] md:text-[14px] md:leading-[18px] lg:max-w-[340px] lg:text-[15px] lg:leading-5 xl:max-w-[380px] xl:text-base xl:leading-[22px]` | Verify:<br>• max-w: 100%/280/320/340/380 → `max-w-full sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[380px]` ✓<br>• text: 12/13/14/15/16 → ✓ (`text-base`=16)<br>• leading: 16/17/18/20/22 → `leading-4`=16, `leading-[17px]`, `leading-[18px]`, `leading-5`=20, `leading-[22px]` ✓<br>• `margin: auto` → `mx-auto` ✓ (this covers vertical too in MUI `margin:auto`, but in flexbox it pushes the element vertically; the Tailwind port uses only `mx-auto` which is horizontal. **MUI's `margin: auto` is stronger.** Replace with `m-auto` to include vertical auto-centering.)<br>• color `rgba(0,0,0,0.77)` → `text-ink-800` ✓<br>• `text-center` ✓<br>**Bug**: change `mx-auto` to `m-auto`. | low |
| WC8 | 58 | Outer heading container: `<div className="mb-auto flex w-full flex-col items-center bg-transparent lg:mb-6">` | MUI `.headingContanier.marginBottom: { xs: "auto", lg: "24px" }`. `mb-auto` (xs) + `lg:mb-6` (24px). ✓ Match. Items, flex-col, w-full, bg-transparent ✓. Keep. | — |
| WC9 | 59 | h2: `relative mb-5 mt-10 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black` | MUI:<br>• marginTop xs/sm/md/lg: 40/50/70/105 ✓ (`mt-10`=40)<br>• marginBottom: 20 ✓ (`mb-5`=20)<br>• `display: flex` ✓<br>• `position: relative` ✓<br>• `textAlign: center` ✓<br>• `alignItems: center, justifyContent: center` ✓<br>• `color: #000` ✓<br>**Typography**: `text-h2-mobile sm:text-h2-tablet lg:text-h2` ✓ — but note the MUI table also implies `md` keeps `h2-tablet` (28px), which the current port handles correctly since there's no `md:` override (sm: stays in effect until `lg:`).<br>**No bugs**. ✓ Keep. | — |
| WC10 | 60–71 | Decorative `<Image>` elements inside the `<h2>` | MUI `.mainHeading::before` is positioned `top: { xs:-12, sm:-35, md:-35, lg:-35 }`, `left: { xs: "11%", sm:"-6%", md:"-6%", lg:"-6%" }`, width 20/43/43/43, height 19/35/35/35, with `linesMobile.png` (xs) and `linesInvert.png` (sm/md/lg).<br>Current port:<br>• Mobile `<Image>`: `absolute -top-3 left-[11%] h-[19px] w-5 object-contain sm:hidden`. `-top-3` = -12px ✓. `left-[11%]` ✓. `h-[19px] w-5` ✓. `sm:hidden` ✓.<br>• Desktop `<Image>`: `absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block`. ✓ all match.<br>**No bugs**. | — |
| WC11 | 76 | Grid container — was `flex flex-col flex-wrap ... lg:flex-row`, now `grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-6` | **The `flex-wrap` approach is broken** — fixed-width cards (380/420px) overflow the lg container and wrap to a 2nd row at 1200–1280px. Replace with a real `grid grid-cols-1 lg:grid-cols-3`. See §1 "Grid → Tailwind cols translation (CORRECTED)". | **High** |
| WC12 | 78–82 | Card wrapper — was `mb-4 flex w-full justify-center sm:w-full md:w-[90%] lg:mb-0 lg:w-auto`, now `flex justify-center` | With a real grid, the cell IS the column — width juggling (`md:w-[90%] lg:w-auto`) and `mb-4` (gap handles spacing) are no longer needed. Just `flex justify-center` to center the card in its cell. | **High** |
| WC16 | 33 | InfoBox root fixed lg width `lg:w-[380px] xl:w-[420px]` | Fixed widths are what caused the wrap. With `lg:grid-cols-3`, change to fluid `lg:w-full lg:max-w-[420px]` so each card fills its grid cell (centered, capped at 420px). Keep `xl:h-[460px]`. | **High** |
| WC13 | (missing) | No JS toggling Grid `container={!isGreaterThanLarge}` | MUI's runtime media-query toggle is replaced by CSS-only responsive flex. The Tailwind port has correctly elided the JS toggle. ✓ Keep. | — |
| WC14 | 40 | Card heading uses `text-2xl` for lg | Verify in `tailwind.config.ts`: if `text-2xl` resolves to 24px, this is correct. The MUI heading at lg is `fontSize: "24px"`. If `text-2xl` in this Tailwind config is anything other than 24px, replace with `lg:text-[24px]`. | low |
| WC15 | 33 | `rounded-md` on card root | MUI `borderRadius: "10px"`. Per `01-token-mapping.md §7`, `rounded-md` = 10px in this repo. ✓ Keep — but **verify against `tailwind.config.ts`** to be certain. If `rounded-md` is anything else (e.g. 6px in default Tailwind), replace with `rounded-[10px]`. | low |

---

## §3 Corrected Tailwind JSX (delta only — most of the current port is correct)

The current port is largely correct. Key fixes:

```tsx
// InfoBox root — responsive minHeights + FLUID lg width (no fixed lg:w-[380px]/xl:w-[420px]):
<div className="relative flex h-auto min-h-[250px] w-full flex-col items-center justify-center rounded-[10px] bg-white/70 p-6 shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] sm:mx-6 sm:h-[280px] sm:min-h-[280px] sm:w-[320px] md:h-[320px] md:min-h-[320px] md:w-[360px] lg:h-[400px] lg:min-h-[400px] lg:w-full lg:max-w-[420px] xl:h-[460px]">

// Card description — change mx-auto → m-auto:
<p className="m-auto max-w-full text-center font-heading text-[12px] leading-4 text-ink-800 sm:max-w-[280px] sm:text-[13px] sm:leading-[17px] md:max-w-[320px] md:text-[14px] md:leading-[18px] lg:max-w-[340px] lg:text-[15px] lg:leading-5 xl:max-w-[380px] xl:text-base xl:leading-[22px]">

// Container — real grid (1-col small, 3-col large), NOT flex-wrap:
<div className="grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-6">
  {items.map(... => (
    <div key={i} className="flex justify-center">
      <InfoBox ... />
    </div>
  ))}
</div>
```

Per-element from → to summary:

| Element | From | To |
|---|---|---|
| Card root | `rounded-md` | `rounded-[10px]` (explicit, avoids token ambiguity) |
| Card root | `sm:h-[280px] sm:w-[320px]` | `sm:h-[280px] sm:min-h-[280px] sm:w-[320px]` |
| Card root | `md:h-[320px] md:w-[360px]` | `md:h-[320px] md:min-h-[320px] md:w-[360px]` |
| Card root | `lg:h-[400px] lg:w-[380px] xl:h-[460px] xl:w-[420px]` | `lg:h-[400px] lg:min-h-[400px] lg:w-full lg:max-w-[420px] xl:h-[460px]` (fluid lg width — fixed width caused the wrap bug) |
| Card p (description) | `mx-auto` | `m-auto` |
| Card h3 | `lg:text-2xl` | `lg:text-[24px]` (only if `text-2xl` doesn't resolve to 24px in this config — verify) |
| Container | `flex w-full flex-wrap items-stretch justify-center gap-y-4 lg:flex-row lg:gap-x-6 lg:gap-y-0` | `grid w-full grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-6` |
| Card wrapper | `mb-4 flex w-full justify-center sm:w-full md:w-[90%] lg:mb-0 lg:w-auto` | `flex justify-center` |

---

## §4 Verification at 4 reference widths

- **375 (iPhone SE)**: Section h2 centered ("Why Choose Tuitional?"), 22px, mt=40px, mb=20px. Decorative `linesMobile` line ~12px above-left of heading, sized 19×20px. Below heading: `mb-auto` (stretches `.headingContanier` to fill any remaining flex space, but no parent flex so behaves as `mb-auto` ≈ no extra space). Three cards stacked vertically, each `w-full min-h-[250px] p-6` with white/70 bg, 10px radius, 16px vertical gap between them. Each card: 45×45px icon circle (white bg, inset shadow), 20×20px inner image, mb=10px below icon. Card h3 16px, leading 20px, mb=10px. Card p 12px, leading 16px, m-auto center.
- **768 (iPad Mini)**: Section h2 28px. Decorative `linesInvert` at top=-35px, left=-6%, 35×43px. Cards: each becomes 320×280px (w×h), still stacked column-style (md=12 means 1 col below lg), with 24px horizontal mx auto-centering them. Icon circle 55×55px, inner image 30×30px, mb=20 (sm uses 20px from MUI `marginBottom: { sm: "20px" }`). Card h3 18px leading 22px mb=15. Card p 13px leading 17px max-w-[280px].
- **1280 (Laptop S)**: Section h2 36px, mt=105px. `.headingContanier.mb-6` (24px below heading). Three cards in a `lg:grid-cols-3` row, 24px gap, **all three on one row** (no wrap — the old flex-wrap version wrapped the 3rd card here). Each card height 400px, width fills its grid cell capped at 420px. Icon 115×115px, mt=-80px (pulled up out of card), inner image 45×45px, mb=40px. Card h3 24px leading 28px mb=22. Card p 15px leading 20px max-w-[340px].
- **1920 (Desktop)**: Section h2 still 36px (MUI has no `xl` step for h2). Three cards on one row, each 460px tall, width = cell capped at 420px. Icon still 115×115px (MUI doesn't grow it at xl), card h3 28px leading 32, card p 16px leading 22 max-w-[380px].

---

## §5 RTL notes

`ar-why-choose-tuitional.tsx` mirrors:
- Root `<Box dir="rtl">`.
- `.mainHeading::before.right` instead of `left` (i.e. decorative line on the right side of the centered heading).
- `InfoBox` root `direction: "rtl"`.
- Headings remain `textAlign: center` and `justifyContent: center` — no change (since the heading is centered horizontally, RTL doesn't flip it).
- Card content remains center-aligned (`textAlign: center`).

Recommended Tailwind handling:
- The two decorative `<Image>` elements inside the section `<h2>` should swap `left` ↔ `right` based on `isRTL`. Use `useI18n().isRTL` and conditionally apply:
  - Mobile image (xs): `left-[11%]` ↔ `right-[11%]`
  - Desktop image (sm+): `-left-[6%]` ↔ `-right-[6%]`
  - Pattern: `<Image className={cn("absolute ...", isRTL ? "right-[11%]" : "left-[11%]")} />`
- Card-level RTL: since text is centered and there's no left/right padding asymmetry inside cards, no per-card RTL adjustments are needed beyond the parent `dir="rtl"` on the page root (which cascades `font-arabic` to descendants per `01-token-mapping.md §1`).
- `gridContainer.columnGap` and `rowGap` are non-directional — no RTL concerns.

If `isRTL` is not already destructured (current line 52 has `const { t, isRTL } = useI18n();`), it's available. Use it to switch the decorative `<Image>` `left/right` props.
