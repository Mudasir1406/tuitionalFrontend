# Component — `<Filter>`

Home-page hero filter: the H1 "Online Tutoring Platform — Customized for 1:1 Online Tutoring Sessions", description paragraph, then a tinted card (`#D7F0FF`) containing 2 dropdowns + 1 wide dropdown + "Get Started" CTA. The card has a subtle `rotateAnimation` keyframe.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\filter.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\filter.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-filter.tsx` (handled via `isRTL` / `locale` in Tailwind port) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.filter}>                                     flex col, justify-center, max-h 700px
├── <Typography component="h1" variant="h1" sx={styles.heading}>
│     Online Tutoring 
│     <Typography component="span" variant="h1" sx={styles.expertText}>
│        Platform <br />                                      ::before → lines image
│     </Typography>
│     Customized for 1:1 Online Tutoring Sessions
├── <Typography component="p" variant="body1" sx={styles.desc}>
│     Tuitional Is An Online Tutoring Platform Providing…
└── <Box sx={styles.filterBox}>                              bg #D7F0FF + rotateAnimation
    └── <Grid container spacing={2}>
        ├── <Grid item lg={6} sm/xs/md=12>  DropDown Curriculum
        ├── <Grid item lg={6} sm/xs/md=12>  DropDown Grade
        ├── <Grid item lg={7} sm/xs/md=12>  DropDown Subject (multiple)
        └── <Grid item lg={5} sm/xs/md=12>  PopUpButton "Get Started"
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.filter` (root) | `height` / `width` | 100% / 100% | same | same |
| `.filter` | `display` / `flexDirection` / `justifyContent` | flex col center | same | same |
| `.filter` | `maxHeight` | 700px | 700px | 700px |
| `.heading` | `width` | 100% (default) | 100% | 90% (lg only) |
| `.heading` | `textAlign` | center | center | start (lg) |
| `.heading` | `marginTop` | 2vh | 3vh (sm), 4vh (md) | 5vh |
| `.heading` | `color` | `#000000` | same | same |
| `.expertText` (inner span) | `color` | `var(--color-accent)` (= brand blue) | same | same |
| `.expertText` | `display` | inline | inline | inline |
| `.expertText::before` (lines image) | `top` | -20.5 | -20.5 (sm), -30.5 (md) | -30.5 |
| `.expertText::before` | `right` | (default) | (md=0) | -45 (lg) |
| `.expertText::before` | `backgroundImage` | linesMobile | linesMobile (sm), lines (md) | lines |
| `.expertText::before` | `height/width` | linesMobile.height × width | sm linesMobile, md lines | lines |
| `.desc` | `textAlign` | center | center | start (lg) |
| `.desc` | `paddingX` | 2vh | 2vh | 0vh (lg) |
| `.desc` | `marginTop` | 2vh | 3vh (sm), 4vh (md) | 4vh (carries from md, no explicit lg) |
| `.desc` | `color` | `#000000` | same | same |
| `.filterBox` | `backgroundColor` | `#D7F0FF` | same | same |
| `.filterBox` | `paddingY` | 4vh | 4vh (sm), 5vh (md) | 5vh |
| `.filterBox` | `paddingX` | 2vh | 2vh (sm), 3vh (md) | 3vh |
| `.filterBox` | `borderRadius` | 2vh | 2vh (sm), 1vh (md) | 1vh |
| `.filterBox` | `marginTop` | 4vh | 4vh | 4vh |
| `.filterBox` | `maxHeight` | 70vh | 70vh | 70vh |
| `.filterBox` | `animation` | `rotateAnimation 1s ease-in-out infinite` | same | same |
| `.filterBox` | `transformOrigin` | center | same | same |
| `<Grid container spacing={2}>` | spacing | 16px both axes | same | same |
| `<Grid item lg={6}>` (rows 1-2) | column span | 12/12 | 12/12 (md=12) | 6/12 (lg only) |
| `<Grid item lg={7}>` (row 3 col A) | column span | 12/12 | 12/12 | 7/12 (lg) |
| `<Grid item lg={5}>` (row 3 col B) | column span | 12/12 | 12/12 | 5/12 (lg) |
| `.containedBtn` (Get Started) | `backgroundColor` | `#38B6FF` | same | same |
| `.containedBtn` | `boxShadow` | `1px 4px 24px 0px #38B6FFB2` | same | same |
| `.containedBtn` | `padding` | 2vh | 2vh | 2vh |
| `.containedBtn` | `borderRadius` | 10px | 10px | 10px |
| `.containedBtn` | `width` | 100% | 100% | 100% |
| `.containedBtn` | `fontSize` | 2vh | 2vh | 2vh |
| `.containedBtn` | `fontWeight` | 700 | 700 | 700 |
| `.containedBtn` | `lineHeight` | 1.6vh | 1.6vh | 1.6vh |
| `.containedBtn` | `letterSpacing` | -2% (≈ -0.02em) | same | same |
| `.containedBtn` | `color` / `textTransform` | white / none | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading `<Typography variant="h1">` (root + span) | h1 | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | `#000000` (`.expertText` brand blue) | League Spartan |
| Description `<Typography variant="body1">` | body1 | 0.9375rem (15px) | 1rem | 1rem | 400 | `#000000` | League Spartan |
| Button label | inline `fontSize: 2vh, fontWeight: 700, lineHeight: 1.6vh` | 2vh | 2vh | 2vh | 700 | white | League Spartan |

### Colors

- `#000000` → `text-black` (heading, desc)
- `var(--color-accent)` (brand blue) → `text-brand-500` (expertText)
- `#D7F0FF` → `bg-brand-50` (filterBox)
- `#38B6FF` → `bg-brand-500` (CTA)
- `#38B6FFB2` → in shadow: `shadow-[1px_4px_24px_0px_#38B6FFB2]`

### Animations / interactions

- `.filterBox` has `animation: rotateAnimation 1s ease-in-out infinite`. The Tailwind project already has the `@keyframes rotateAnimation` in `globals.css` (verify) — apply as `animate-[rotateAnimation_1s_ease-in-out_infinite]` with `origin-center`.

---

## §2 Tailwind port — bug list

| # | Line | Current className | Expected | Severity |
|---|---|---|---|---|
| B1 | 68 | `flex h-full max-h-[700px] w-full flex-col justify-center` | matches MUI ✓ | — |
| B2 | 69 | h1: `mt-[2vh] text-center font-heading text-h1-mobile sm:mt-[3vh] sm:text-h1-tablet md:mt-[4vh] lg:mt-[5vh] lg:w-[90%] lg:text-start lg:text-h1 text-black` | matches MUI heading (mt 2/3/4/5vh, center→start at lg, w-90% at lg, h1 triplet, black) ✓ | — |
| B3 | 71 | span: `relative inline text-brand-500` | matches MUI `.expertText` (inline + brand blue) ✓ | — |
| B4 | 72-87 | nested linesMobile / lines image with `absolute -top-5 right-0 z-10 object-contain md:hidden` + `lines` `-top-[30px] right-0 hidden md:block lg:-right-[45px]` | MUI has `top: { xs: -20.5, sm: -20.5, md: -30.5, lg: -30.5 }`. Tailwind has `-top-5` (=20px) and `-top-[30px]` — close to -20.5/-30.5. Acceptable rounding (off by 0.5px). MUI right `lg: -45` → `lg:-right-[45px]` ✓. For sm/md the MUI right is `0` for md and default (auto) for xs/sm — Tailwind has `right-0` always until lg. Visually matches MUI. ✓ | low |
| B5 | 73-79 | linesMobile responsive: `md:hidden` shown until md; lines `hidden md:block`. MUI uses md as boundary too ✓ | — |
| B6 | 93 | p: `mt-[2vh] px-[2vh] text-center font-heading text-body-mobile sm:mt-[3vh] sm:text-body md:mt-[4vh] lg:px-0 lg:text-start text-black` | matches MUI desc (mt 2/3/4vh, px 2vh until lg, body triplet, center→start lg, black) ✓ | — |
| B7 | 97 | filterBox: `mt-[4vh] max-h-[70vh] origin-center animate-[rotateAnimation_1s_ease-in-out_infinite] rounded-[2vh] bg-brand-50 px-[2vh] py-[4vh] sm:px-[2vh] md:rounded-[1vh] md:px-[3vh] md:py-[5vh] lg:rounded-[1vh] lg:px-[3vh] lg:py-[5vh]` | matches MUI `.filterBox` (px 2vh/2vh/3vh/3vh, py 4vh/4vh/5vh/5vh, radius 2vh/2vh/1vh/1vh, bg brand-50, mt 4vh, max-h 70vh, rotateAnimation, origin-center) ✓ | — |
| B8 | 98 | grid: `grid grid-cols-1 gap-4 lg:grid-cols-12` | MUI uses `<Grid container spacing={2}>` → 16px both axes = `gap-4` ✓. lg-cols-12 with col-span 6/6/7/5 = matches `lg={6}/lg={6}/lg={7}/lg={5}` ✓ | — |
| B9 | 99/110/121/133 | `lg:col-span-6` / `lg:col-span-6` / `lg:col-span-7` / `lg:col-span-5` | matches MUI ✓ | — |
| B10 | 138 | PopUpButton: `w-full rounded-[10px] bg-brand-500 p-[2vh] font-heading text-[2vh] font-bold leading-[1.6vh] tracking-[-0.02em] text-white shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500` | matches MUI `.containedBtn` (width 100%, p 2vh, radius 10px, bg brand, text 2vh/700/1.6vh/-2%/white, shadow `#38B6FFB2`, no hover change) ✓ | — |

**Net assessment**: This port is virtually pixel-perfect with MUI. No fixes required.

The minor `-top-5` vs `-top-[20.5px]` rounding (0.5px) is invisible in practice.

---

## §3 Corrected Tailwind classNames

No corrections required. The port matches MUI 1:1.

## §4 Verification at 4 widths

- **375**: h1 28px center, `mt-[2vh]`. Description 15px center, `px-[2vh]`. Filter card 2vh radius, py-4vh, px-2vh, full-width grid with single column (1 dropdown per row, then CTA full-width). `rotateAnimation` running.
- **768**: h1 36px center, `mt-[3vh]` (sm) or `mt-[4vh]` (md). Card now has md treatment: 1vh radius, py-5vh, px-3vh. Lines image swap (lines, not linesMobile) at -30px from md. Still single-column grid.
- **1280**: h1 48px **start-aligned**, w-90%, `mt-[5vh]`. Description 16px start-aligned, no padding-x. Card 1vh radius, py-5vh. Grid splits to 6/6 + 7/5. Lines image at `right-[-45px]` from lg.
- **1920**: same as 1280.

## §5 RTL notes

- AR variant adds `direction: "rtl"` to the root and keeps `textAlign: { xs: "center", lg: "start" }` (which flips to right-align at lg under rtl).
- Decorative lines image is positioned with `right: ...` / `-right-[...]` — under `dir="rtl"` these are physical-right which becomes visually-left. AR variant in MUI does NOT flip the lines image (it uses the same `right: { md: 0, lg: -45 }`). So the Tailwind port's `right-0 lg:-right-[45px]` is consistent with the AR baseline.
- Heading `lg:text-start` is direction-aware (`text-start` flips automatically). ✓
- Description `lg:text-start` same.
- All else direction-agnostic (flex col / grid col).
