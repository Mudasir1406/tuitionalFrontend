# Component — `<Offer>` (curiculume)

"What We Offer" section: 4 informational cards arranged in a 2-up grid (one large + two halves on the left, mirrored on the right) on lg+ that stacks to a single column below 1200px. Each card has a heading, a "Learn More" button, and a decorative image.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\offer.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\curiculume\offer.tsx` |
| Arabic variant | MUI `tuitionalFrontend-mui-baseline\src\components\curiculume\ar-offer.tsx` / Tailwind `tuitionalFrontend\src\components\curiculume\ar-offer.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box paddingX>                                          ← outer
├── <Typography h3>What We Offer</Typography>
└── <Box marginX>
    └── <Grid container spacing={2}>                    ← 16px gap
        ├── <Grid item xs=12 lg=6>                      ← left column
        │   ├── <Box card1 my=16px>                     ← coverage card (image on right of flex)
        │   │   └── flex: [text+button]  [Image offer1 h-100%]
        │   └── <Grid container spacing={2}>            ← 2 half-cards
        │       ├── <Grid item xs=6 lg=6> card2 (offer2)
        │       └── <Grid item xs=6 lg=6> card3 (offer3)
        └── <Grid item xs=12 lg=6 flexDirection={xs:'column-reverse', md:'column'}> ← right column
            ├── <Grid container spacing={2}>            ← 2 half-cards (mirror)
            │   ├── card my=16px (offer2)
            │   └── card my=16px (offer3)
            └── <Box card>                              ← coverage card (mirror)
                └── flex: [text+button]  [Image offer1 h-100%]
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| root | `paddingX` | 0 | 0 | 2vw | 5vw |
| inner wrapper | `marginX` | 1.5vh | 1.5vh | 2.5vh | 0 |
| outer Grid container | `spacing` | 2 (16px) | 2 | 2 | 2 |
| inner Grid container | `spacing` | 2 | 2 | 2 | 2 |
| coverage card | `marginY` | 16px | 16px | 16px | 16px |
| coverage card | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| coverage card | `background` | `#9EDCFF` | (same) | (same) | (same) |
| right-column wrapper | `flexDirection` | column-reverse | column-reverse | column | column |
| right column half-cards | `marginY` (on outer wrapper Box) | 16px | 16px | 16px | 16px |
| coveragetext (heading inside coverage card) | `width` | 100% | 70% | (sm) | 70% |
| coveragetext | `paddingX` / `paddingTop` | 3vh | 4vh | (sm) | 4vh |
| regulartxt (heading inside half-card) | `width` | 80% | 65% | (sm) | 70% |
| regulartxt | `paddingX` | 1.5vh | 1.5vh | (sm) | 3vh |
| regulartxt | `paddingTop` | 1.5vh | 1.5vh | (sm) | 4vh |
| containedBtn | `padding` | 1vh 0 | 1vh 0 | 1vh 0 | 1vh 0 |
| containedBtn | `margin` | 16px | 16px | 2vh 3vh | 2vh 3vh |
| containedBtn | `width` | 50% | 30% | 30% | 14vh |
| containedBtn | `borderRadius` | 10px | 10px | 10px | 10px |
| containedBtn | `fontSize` | 1.5vh | 1.5vh | 1.5vh | 1.5vh |
| containedBtn | `fontWeight` | 700 | 700 | 700 | 700 |
| small image wrap | `width` / `textAlign` | 100% / right | 100% / right | 100% / right | (same) |
| small image wrap | `height` | 15vh | 20vh | 25vh | 25vh (no lg override; md value cascades) |
| small image wrap | `marginTop` | -40px | -40px | -40px | -40px |
| small image wrap | `overflow` | hidden | hidden | hidden | hidden |
| coverage image container (style.responsiveImageContainer) | `height` default | — | — | — | 25vh |
| coverage image container | `@media (max-width: 960px)` | — | — | 20vh | — |
| coverage image container | `@media (max-width: 600px)` | 15vh | (15vh) | — | — |
| coverage image container | `@media (max-width: 400px)` | auto | — | — | — |

### Typography

| Element | Variant | xs | sm | md | lg | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| "What We Offer" header | `<Typography variant="h3">` (no fontSize override — uses theme h3) | 1.125rem (h3 mobile) | 1.25rem (tablet) | (cascades) | 1.5rem (h3 desktop) | 700 | inherit | League Spartan |
| coveragetext | `variant="subtitle2"` (no explicit fontSize) | (default `subtitle2` text-stat-label-ish; ~0.875rem) | 0.875rem | 0.875rem | 0.875rem | (subtitle2 default 500) | `#2D2D2D` | League Spartan |
| regulartxt | `variant="subtitle2"` | 0.875rem | 0.875rem | 0.875rem | 0.875rem | (default) | `#2D2D2D` | League Spartan |
| containedBtn label | `fontSize: "1.5vh"` (inline) | 1.5vh | 1.5vh | 1.5vh | 1.5vh | 700 | white | League Spartan |
| header `lineHeight` | inline | 6vh | 6vh | 6vh | 6vh | — | — | — |
| header `textAlign` | inline | center | center | center | center | — | — | — |
| header `fontWeight` | inline | 600 | 600 | 600 | 600 | — | — | — |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#9EDCFF` | card background | arbitrary `bg-[#9EDCFF]` (no token) |
| `#2D2D2D` | coveragetext/regulartxt color | `text-ink-900` |
| `#38B6FF` | containedBtn bg | `bg-brand-500` |
| `#38B6FFB2` shadow | containedBtn boxShadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- containedBtn `transition: "all .5s ease-in-out"` + `:hover { transform: "scale(1.05)" }` (and bg stays `#38B6FF`).
- `textTransform: "none"` → `normal-case`.

---

## §2 Tailwind port — bug list

Audit of `tuitionalFrontend\src\components\curiculume\offer.tsx`:

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 42 | `text-h2-mobile sm:text-h2-tablet lg:text-h2 font-semibold leading-[6vh]` | Header is `variant="h3"`, not h2. Should be `text-h3-mobile sm:text-h3-tablet lg:text-h3 font-semibold leading-[6vh]`. | **high** — wrong typography variant |
| B2 | 42 | `text-ink-900` | MUI sets no explicit color (uses theme default). `text-ink-900` is acceptable since theme body color in this codebase. | low |
| B3 | 12-13 | `COVERAGE_TEXT_CLS` includes `text-h6 font-semibold` | MUI uses `variant="subtitle2"` (≈0.875rem default weight, not 600). Should drop `text-h6 font-semibold` and use plain `font-body text-small text-ink-900` (or omit the size — MUI relies on subtitle2 default). | **high** — wrong size/weight |
| B4 | 15-16 | `REGULAR_TEXT_CLS` includes `text-h6 font-semibold` | Same as B3 — `variant="subtitle2"` → `font-body text-small text-ink-900` (no font-semibold override). | **high** |
| B5 | 10 | Button `BUTTON_CLS` uses `m-4` (16px all sides) at xs and `md:m-[2vh_3vh]` | MUI margin: `{ xs: "16px", sm: "16px", md: "2vh 3vh", lg: "2vh 3vh" }`. Tailwind has `m-4 md:m-[2vh_3vh]`. Correct breakpoints. ✓ Keep | ok |
| B6 | 10 | Button `BUTTON_CLS` has `w-1/2 sm:w-[30%] md:w-[30%] lg:w-[14vh]` | MUI width: `{ xs: "50%", sm: "30%", md: "30%", lg: "14vh" }`. ✓ Match | ok |
| B7 | 10 | Button `bg-[#38B6FF]` | Should use `bg-brand-500` per token mapping. | low (visual match either way) |
| B8 | 10 | Button `shadow-[1px_4px_24px_0px_#38B6FFB2]` | ✓ Match MUI `1px 4px 24px 0px #38B6FFB2`. | ok |
| B9 | 19 | `SmallImageWrap` uses `-mt-10` (40px) | MUI uses `marginTop: "-40px"` — `-mt-10` = -40px ✓ Match. | ok |
| B10 | 19 | `SmallImageWrap` `h-[15vh] sm:h-[20vh] md:h-[25vh]` | MUI: `{ xs: "15vh", sm: "20vh", md: "25vh" }` ✓ Match. | ok |
| B11 | 47 | Outer wrap `mx-[1.5vh] sm:mx-[1.5vh] md:mx-[2.5vh] lg:mx-0` | ✓ Match. | ok |
| B12 | 48 | Outer grid `grid grid-cols-1 gap-4 lg:grid-cols-2` | MUI: `<Grid container spacing={2}>` (16px) + `lg={6}` items → ✓ Correct breakpoint inversion. | ok |
| B13 | 51 | `my-4` on coverage card | MUI: `marginY: "16px"` → `my-4` ✓ | ok |
| B14 | 63 / 134 | Coverage image container `h-[15vh] sm:h-[20vh] md:h-[25vh] lg:h-[25vh]` | MUI custom media queries (max-width: 960=20vh, 600=15vh, 400=auto). The map to Tailwind mobile-first `h-auto sm:h-[15vh] md:h-[20vh] lg:h-[25vh]` would be closer. Current port has `h-[15vh] sm:h-[20vh] md:h-[25vh]` which inverts the MUI's max-width logic but lands within 5vh of correct. **Bug**: at xs<400px MUI expects `height: auto`, current port forces `15vh`. | medium |
| B15 | 50 | Left column wrapper has no `flex-col-reverse md:flex-col`. MUI source applies this only to the right column. | ✓ Correct (left col is plain) | ok |
| B16 | 96 | Right column `flex flex-col-reverse md:flex-col` | MUI: `flexDirection: { xs: "column-reverse", md: "column" }` ✓ | ok |
| B17 | 98, 103, 109 | Right column half-cards have `my-4` | MUI: `marginY: "16px"` ✓ on the right column half-cards. (Note: left column half-cards do **not** have marginY in MUI — current port matches.) | ok |
| B18 | 122 | Bottom-right coverage card has no `my-4` | MUI: no `marginY` on the right-side coverage card (only on the left-side coverage card at line 71). ✓ Match. | ok |
| B19 | 13 | `COVERAGE_TEXT_CLS` width is `w-full sm:w-[70%] lg:w-[70%]` | MUI: `{ xs: "100%", sm: "70%", lg: "70%" }` ✓ | ok |
| B20 | 16 | `REGULAR_TEXT_CLS` `w-4/5` (80%) | MUI: `{ xs: "80%", sm: "65%", lg: "70%" }` — `w-4/5 sm:w-[65%] lg:w-[70%]` is correct, ✓ Match. | ok |
| B21 | 42 | Header has no `mb-`/`margin` | MUI has no margin on the header — only `lineHeight: 6vh` and inherits surrounding spacing. ✓ | ok |

Net: 4 typography bugs (B1, B3, B4) — those are the main visual issues. The layout/grid translations are correct.

---

## §3 Corrected Tailwind classNames

```tsx
// Header (line 41-45)
<h3
  className={`${leagueSpartan.className} text-center font-heading text-h3-mobile font-semibold leading-[6vh] text-ink-900 sm:text-h3-tablet lg:text-h3`}
>
  What We Offer
</h3>

// COVERAGE_TEXT_CLS
const COVERAGE_TEXT_CLS =
  "w-full px-[3vh] pt-[3vh] font-body text-small text-[#2D2D2D] sm:w-[70%] sm:px-[4vh] sm:pt-[4vh] lg:w-[70%] lg:px-[4vh] lg:pt-[4vh]";

// REGULAR_TEXT_CLS
const REGULAR_TEXT_CLS =
  "w-4/5 px-[1.5vh] pt-[1.5vh] font-body text-small text-[#2D2D2D] sm:w-[65%] sm:px-[1.5vh] sm:pt-[1.5vh] lg:w-[70%] lg:px-[3vh] lg:pt-[4vh]";

// Coverage image container (lines 63, 134)
<div className="h-auto overflow-hidden sm:h-[15vh] md:h-[20vh] lg:h-[25vh]">
```

---

## §4 Verification at 4 widths

- **375px**: 1-column stack. Coverage card image height collapses to `auto` (MUI <400 rule). Coverage heading 100% width with 3vh padding. Half-cards 80% heading width, 1.5vh padding, button at 50% width. "What We Offer" header at h3 mobile (1.125rem).
- **768px**: still 1-column (lg break at 1200). Coverage image now `15vh` (between 600 and 960). Heading width drops to 70%/65%. Button at 30%. Header at h3 tablet (1.25rem).
- **1280px**: 2-column grid. Right column flips back to normal order (`md:flex-col`). Coverage image `25vh`. Header at h3 desktop (1.5rem).
- **1920px**: same as 1280; padding-x 5vw means ~96px gutters.

---

## §5 RTL notes (ar-offer.tsx)

- Root has `direction: "rtl"` (MUI) → port has `dir="rtl"` on outer div. ✓
- Button alignment: MUI LTR uses `justifyContent: "left"`; AR variant uses `justifyContent: "right"` → Tailwind LTR `justify-start`, AR `justify-end`. ✓
- Small image wrap `textAlign: "left"` in AR (vs `"right"` in LTR) → `text-end` on RTL means visually left (correct mirror).
- Coverage heading and regular text both have `textAlign: "right"` in AR — current port relies on `dir="rtl"` cascading, doesn't add explicit `text-end`. **Acceptable** because RTL inherits text alignment.
- Same B1/B3/B4 typography bugs apply to ar-offer.tsx (uses identical class constants). Apply the same corrections.
