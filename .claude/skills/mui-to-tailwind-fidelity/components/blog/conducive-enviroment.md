# Component — `<ConduciveEnviroment>` (sic — preserved misspelling)

Static demo section showing a 4-image grid + two long-form paragraph blocks with decorative ellipses positioned absolutely. Used as inline blog content. Low priority for fidelity (visual demo with hardcoded text).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\conducive-enviroment.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\blog\conducive-enviroment.tsx` |
| Arabic variant | none |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
├── <Box margin: {lg: "0 7vh", xs: "5vh 3vh 3vh"}>
│   └── <Grid container spacing={1}> (4 image tiles)
│       └── <Grid item xs={6} sm={6} md={6} lg={3}> × 4
│           └── <Box bg-image, height: {lg: 40vh, xs: 25vh}, radius: 2vh>
└── <Box position: relative>
    └── <Box margin: {lg: "8vh 0"}>
        └── <Grid container spacing={1}>
            ├── <Grid item xs={12} lg={12}> (full width)
            │   └── two .textBox blocks (heading + 2 paragraphs each)
            └── two absolutely-positioned ellipse images
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| Outer margin (top section) | margin | `5vh 3vh 3vh` | `5vh 3vh 3vh` | `0 7vh` |
| Image grid | spacing | `8px` (spacing={1}) | `8px` | `8px` |
| Image tile | columns | 2 (xs=6) | 2 (sm=6) | 4 (lg=3) |
| Image tile | height | `25vh` | `25vh` | `40vh` |
| Image tile | border-radius | `2vh` | `2vh` | `2vh` |
| Text section margin-y | | (none) | (none) | `8vh 0` |
| Ellipse 1 | bottom | `250px` (xs) | — | `50px` (lg) |
| Ellipse 2 | top | `130px` (xs) | — | `50px` (lg); right: `0` |
| Ellipse size | width | `8vh` | `8vh` | `8vh` |

### Typography (sx)

| Element | sx fontSize | Mobile | Desktop | Weight | Color |
|---|---|---|---|---|---|
| `style.heading` | `{lg: "5vh", xs: "3vh"}` | `3vh` | `5vh` | 600 | `#000` |
| `style.heading` width | `{lg: "auto", xs: "35vh"}` | `35vh` | auto | — | — |
| `style.para` | `{lg: "2.4vh", xs: "1.5vh"}` | `1.5vh` | `2.4vh` | 400 | `#2D2D2D` |
| `style.para` width | `{lg: "125vh", xs: "44vh", sm: "55vh"}` | `44vh` | `125vh` (sm=55vh) | — | — |
| `style.para` padding-top | `{lg: "2vh", sm: "1.5vh"}` | `1.5vh` (sm) | `2vh` | — | — |
| `style.para` text-align | `{lg: "left", xs: "left", sm: "justify"}` | left | left (lg); justify (sm) | — | — |

### Colors

| Hex | Token |
|---|---|
| `#000` heading | `text-black` |
| `#2D2D2D` para | `text-ink-900` |

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| CE1 | 30 | `mx-[3vh] my-[5vh] mb-[3vh] lg:mx-[7vh] lg:my-0` | MUI uses `margin: "5vh 3vh 3vh"` shorthand → mt=5vh, mr=ml=3vh, mb=3vh. Tailwind has `mt-[5vh] mb-[3vh] mx-[3vh]`. Current uses `my-[5vh] mb-[3vh]` (which collapses my then overrides mb — net: mt=5vh mb=3vh) → equivalent. Slight readability nit. | low |
| CE2 | 31 | `grid grid-cols-2 gap-1 lg:grid-cols-4` | MUI uses Grid `xs={6} sm={6} md={6} lg={3}` = 2 cols below lg, 4 cols at lg+. The `gap-1` (4px) ≠ MUI `spacing={1}` (8px). Use `gap-2` (8px). | med |
| CE3 | 35 | `h-[25vh] w-full rounded-[2vh] bg-cover bg-center lg:h-[40vh]` | OK matches | none |
| CE4 | 43 | `lg:my-[8vh]` | OK matches `margin: {lg: "8vh 0"}` | none |
| CE5 | 47 | `w-[35vh] text-center font-heading text-[3vh] font-semibold text-black lg:w-auto lg:text-[5vh]` | OK matches sx (3vh / 5vh, w-35vh / auto, 600 weight, black) | none |
| CE6 | 50 | `w-[44vh] pt-[1.5vh] text-start font-heading text-[1.5vh] font-normal text-ink-900 sm:w-[55vh] sm:text-justify lg:w-[125vh] lg:pt-[2vh] lg:text-[2.4vh]` | OK matches sx (xs: 44vh/1.5vh/start; sm: 55vh/justify; lg: 125vh/2vh/2.4vh/left). Note MUI text-align is `{lg: "left", xs: "left", sm: "justify"}` — port uses `text-start sm:text-justify` (start auto-flips RTL, but MUI hardcoded `left`). Acceptable LTR-first behavior. | low |
| CE7 | 70-75 | Ellipse positioning `absolute bottom-[250px] lg:bottom-[50px]` and `absolute right-0 top-[130px] lg:top-[50px]` | OK matches MUI sx | none |
| CE8 | 71, 74 | `h-auto w-[8vh]` for ellipse images | OK matches sx (width: "8vh", height: "auto") | none |

---

## §3 Corrected Tailwind classNames

Component is largely correct. Only `gap-2` correction needed:

```tsx
<div className="mx-[3vh] my-[5vh] mb-[3vh] lg:mx-[7vh] lg:my-0">
  <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
    {/* image tiles */}
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: 2 columns of images at 25vh height, paragraphs 44vh wide, text-align start.
- **768**: 2 cols still (md=6 in MUI = 2 cols; lg=3 = 4 cols only ≥1200). Paragraphs widen to 55vh, justify.
- **1280**: 4 columns of images at 40vh, paragraphs 125vh wide, left-aligned, mt-8vh between sections.
- **1920**: same as 1280, more whitespace.

## §5 RTL notes

No AR variant. If Arabic blog support requires this component, hardcoded English text must move to translations. Layout itself is symmetric — no flips needed.
