# Component — `<OptionsImageHome>`

Static demo component showing a "Home > Blog" breadcrumb pill plus a wrap of category chips. Used as a hardcoded design demo (NOT wired to live data — categories are inline string literals). Low priority for fidelity.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\options-image-home.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\blog\options-image-home.tsx` |
| Arabic variant | none |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box margin: {lg: "0 7vh", xs: "0 2vh"}>
├── <Grid container> > <Grid item xs={12}> <Box .homeblogbox> "Home > Blog" pill (h: {lg: 8vh, xs: auto, sm: 5vh}, my: {lg: 5vh, xs: 6vh})
└── 4 <Grid container> rows of category chips (each Grid item uses xs/sm/md/lg col-spans that sum to ~12, with arbitrary fractional values like lg=1.2, 1.5, 1.8, 2)
    └── <Box .optionBox> > <Typography .options> category label
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| Outer wrapper | margin-x | `2vh` | `2vh` | `7vh` |
| `.homeblogbox` | background | `#E7F6FF` | same | same |
| `.homeblogbox` | shadow | `0px 2px 1px 0px rgba(0,0,0,0.05), 0px -3px 8px 0px rgba(56,182,255,0.20) inset` | same | same |
| `.homeblogbox` | backdrop-filter | `blur(5px)` | same | same |
| `.homeblogbox` | border-radius | `1vh` | `1vh` | `1vh` |
| `.homeblogbox` | height | `auto` | `5vh` | `8vh` |
| `.homeblogbox` | margin-y | `6vh` | `6vh` | `5vh` |
| `.homeblog` (text) | padding-top | `1vh` (sm) | `1vh` | `1.8vh` |
| `.optionBox` | background | white | white | white |
| `.optionBox` | shadow | `0px -1px 4px 0px rgba(0,0,0,0.15) inset` | same | same |
| `.optionBox` | border-radius | `5vh` | `5vh` | `5vh` |
| `.optionBox` | padding | `2vh 0` | `2vh 0` | `2vh 0` |
| Row 3 (`sx={{margin: {lg: "2vh 0"}}}`) | margin-y at lg | — | — | `2vh 0` |

### Typography

| Element | sx fontSize | Mobile | Tablet | Desktop | Weight | Color |
|---|---|---|---|---|---|---|
| `.homeblog` | `{lg: "3vh", xs: "1.6vh"}` | `1.6vh` | `1.6vh` | `3vh` | 500 | `#2D2D2D` (ink-900) |
| `.options` | `{lg: "2vh", xs: "1.6"}` (NOTE: `1.6` no unit — likely typo for `1.6vh`) | `1.6vh` | `1.6vh` | `2vh` | 600 | `#2D2D2D` |

### Colors

| Hex | Token |
|---|---|
| `#E7F6FF` | brand-50 alt — use arbitrary `bg-[#E7F6FF]` |
| `#38B6FF` (link "Blog" inside breadcrumb) | `text-brand-500` |
| `#2D2D2D` | `text-ink-900` |
| white (chip) | `bg-white` |

### Animations / interactions

- None. Static labels.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| OIH1 | 26 | `mx-[2vh] lg:mx-[7vh]` | OK | none |
| OIH2 | 27 | `my-[6vh] h-auto ... sm:h-[5vh] lg:my-[5vh] lg:h-[8vh]` | OK matches MUI breakpoint pattern | none |
| OIH3 | 27 | `bg-[#E7F6FF] backdrop-blur-sm shadow-[...]` | OK matches | none |
| OIH4 | 28 | `text-[1.6vh] ... sm:pt-[1vh] lg:pt-[1.8vh] lg:text-[3vh]` | OK matches MUI | none |
| OIH5 | 32 | `flex flex-wrap gap-2` for chip rows | MUI uses **`<Grid container>`** with explicit fractional column spans (xs=2.5, 3, 6, etc. summing to 12, with hard line breaks per row). Current `flex-wrap` lets chips flow freely. The visual result differs: MUI has 4 distinct rows with controlled widths; current flows into N rows depending on viewport. Acceptable simplification for static demo, but flag if pixel-perfect required. | low |
| OIH6 | 36 | `flex-1 ... px-3 py-[2vh]` with `style={{minWidth: "fit-content"}}` | MUI `.optionBox { padding: 2vh 0 }` (no horizontal padding). The chips fit text via Grid spans, not flex-grow + min-width. Current is a reasonable approximation. | low |
| OIH7 | 36 | `rounded-[5vh]` | OK | none |
| OIH8 | 39 | `text-[1.6vh] lg:text-[2vh]` | OK matches | none |

---

## §3 Corrected Tailwind classNames

Component is largely correct (low priority). If a pixel-perfect port is required:

```tsx
{/* Replace flex-wrap with explicit 4-row Grid */}
<div className="grid grid-cols-12 gap-2">
  <div className="col-span-3 sm:col-span-2"><Chip>All</Chip></div>
  <div className="col-span-7 sm:col-span-4 lg:col-span-2"><Chip>Applying for University</Chip></div>
  {/* ... rest of row 1 ... */}
</div>
```

Otherwise leave current implementation in place (visual divergence is minor).

## §4 Verification at 4 widths

- **375 / 768 / 1280 / 1920**: Breadcrumb pill height changes (`auto / 5vh / 8vh`), chip wrap layout flows. Heights and shadows are preserved.

## §5 RTL notes

No AR variant exists in MUI baseline. If Arabic support is added, hardcoded English category strings must move to `useI18n()` dictionary.
