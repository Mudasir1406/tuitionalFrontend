# Component — `<EducationalCounseling>` (curiculume)

Two-column section: left column carries a blue "Educational Counseling" pill + dynamic heading + paragraph + Enroll Now CTA; right column shows the `Guidence.png` mascot image. Splits to 2 columns only at `lg` (≥1200px).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\educational-counseling.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\curiculume\educational-counseling.tsx` |
| Arabic variant | MUI `tuitionalFrontend-mui-baseline\src\components\curiculume\ar-educational-counseling.tsx` / Tailwind `tuitionalFrontend\src\components\curiculume\ar-educational-counseling.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box paddingX="5vw">
└── <Grid container spacing={2} alignItems="center">
    ├── <Grid item xs=12 sm=12 md=12 lg=6>          ← left
    │   <Box>
    │     <Typography counseling variant="subtitle2">Educational Counseling</Typography>
    │     <Typography guidence variant={data.headerTag} dangerouslySetInnerHTML={data.header} />
    │     <Typography desc variant="body2" dangerouslySetInnerHTML={data.paragraph} />
    │     <Box btnDiv>
    │       <div buttonDiv>
    │         <PopUpButton containedBtn text="Enroll Now" href="popup" />
    │       </div>
    │     </Box>
    │   </Box>
    └── <Grid item xs=12 sm=12 md=12 lg=6 alignItems="end">    ← right
        <Box><Image counsling w=100% h=auto /></Box>
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| root | `paddingX` | 5vw | 5vw | 5vw | 5vw |
| Grid container | `spacing` / `alignItems` | 2 (16px) / center | (same) | (same) | (same) |
| Grid item | column span | 12 (1 col) | 12 | 12 | 6 (2 cols only at lg) |
| counseling pill | `background` | `#B8E1F9` | (same) | (same) | (same) |
| counseling pill | `borderRadius` | 5vh | 5vh | 5vh | 5vh |
| counseling pill | `width` | 53% | 28vh | 30vh | 22vh |
| counseling pill | `fontSize` | 2vh | 2.5vh | 2.2vh | 2vh |
| counseling pill | `paddingX` | 3vh | 3.6vw | (sm) | (sm) |
| counseling pill | `paddingY` | 2vh | 1.5vh | (sm) | (sm) |
| counseling pill | `color` | `#1F90D1` | (same) | (same) | (same) |
| btnDiv | display/justifyContent/maxWidth/marginRight | flex / space-between / `{xs:100%, md:90%}` / auto | (same) | (same) | (same) |
| guidence (header) | `textAlign` | start | start | start | left |
| guidence (header) | `width` | 80vw | (default) | (default) | 40vw |
| guidence (header) | `paddingY` | 2vh | 2.5vh | 3vh | 3vh |
| desc | `width` | 80vw | (default) | (default) | 40vw |
| desc | `textAlign` | start | start | start | start |
| desc | `color` | `#2D2D2D` | (same) | (same) | (same) |
| containedBtn | `paddingY` | 1.5vh | 2vh | (sm) | 1.5vh |
| containedBtn | `marginY` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `paddingX` | 3vh | 4vh | (sm) | (sm) |
| containedBtn | `borderRadius` | 10px | 10px | 10px | 10px |
| containedBtn | `width` | 100% | 100% | 100% | 100% |
| image (right) | inline w/h | 100% / auto | (same) | (same) | (same) |

### Typography

| Element | Variant | xs | sm | md | lg | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| counseling pill | `subtitle2` + explicit fontSize | 2vh | 2.5vh | 2.2vh | 2vh | (default) | `#1F90D1` | League Spartan |
| guidence (header) | dynamic `data.headerTag` (h1-h6) — typography commented out, so it falls back to the **variant default** (h3 mobile/tablet/desktop triplet) | per variant | per variant | per variant | per variant | per variant (700 for h1-h3) | (default) | League Spartan |
| desc | `body2` (commented out custom sizes) | 14px (body2 mobile = body2 desktop = 14px) | (same) | (same) | (same) | 400 | `#2D2D2D` | League Spartan |
| containedBtn label | (commented out — uses MUI Button default) | 15px mobile | 16px | 16px | 16px | (default 500-ish via MUI Button) | white | League Spartan via className |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#B8E1F9` | pill bg | arbitrary `bg-[#B8E1F9]` |
| `#1F90D1` | pill text | arbitrary `text-[#1F90D1]` |
| `#2D2D2D` | desc color | `text-ink-900` |
| `#38B6FF` | button bg | `bg-brand-500` |
| `1px 4px 24px 0px #38B6FFB2` | button shadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- containedBtn `transition: "all .5s ease-in-out"` + `:hover { transform: scale(1.02) }` (and bg stays).

---

## §2 Tailwind port — bug list

Audit of `tuitionalFrontend\src\components\curiculume\educational-counseling.tsx`:

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| E1 | — | **Missing the "Educational Counseling" pill entirely** | Should render `<p className="...pill styles...">Educational Counseling</p>` before the header. MUI source has this typography. Port skips it. | **high** — content missing |
| E2 | 15 | Grid: `grid grid-cols-1 items-center gap-4 lg:grid-cols-2` | ✓ Match (xs=12 lg=6, gap-4 = 16px = spacing 2) | ok |
| E3 | 18 | Header: `w-[80vw] py-[2vh] text-start text-h3-mobile sm:py-[2.5vh] sm:text-h3-tablet md:py-[3vh] lg:w-[40vw] lg:py-[3vh] lg:text-h3` | MUI guidence has no fontSize (commented out), so it falls back to variant defaults — but the variant is **dynamic** from `data.headerTag`. Port hardcodes h3 triplet. Acceptable for h3 default; **bug** when CMS sends h2. | medium |
| E4 | 18 | Header: `font-heading` | League Spartan via className already → ✓ | ok |
| E5 | 18 | Header: `text-ink-900` | MUI: no color override (default text). Acceptable. | low |
| E6 | 18 | Header: `text-start` only, missing `lg:text-left` | MUI: `textAlign: { xs: "start", lg: "left" }` — visually same (start = left in LTR). ✓ acceptable. | ok |
| E7 | 22 | Paragraph: `font-heading text-body text-ink-900 lg:w-[40vw] w-[80vw] text-start` | MUI: `variant="body2"` → 14px = `text-small` (token-mapping §1). Port uses `text-body` (16px). **Bug — 2px too large.** Also `font-heading` should be `font-body` for body2. | **medium** |
| E8 | 25 | btnDiv: `mr-auto flex max-w-full justify-between md:max-w-[90%]` | MUI: `display: flex, justifyContent: space-between, maxWidth: { xs: "100%", md: "90%" }, marginRight: "auto"` → ✓ Match | ok |
| E9 | 26 | buttonDiv: `flex w-full items-end` | MUI: `display: flex, alignItems: flex-end` (no width on the div) — port adds `w-full`. Functional difference: the PopUpButton stretches to fill. Acceptable | low |
| E10 | 30 | PopUpButton className: `my-[2vh] w-full rounded-[10px] px-[3vh] py-[1.5vh] sm:px-[4vh] sm:py-[2vh] lg:py-[1.5vh] transition-all duration-500 hover:scale-[1.02]` | ✓ Match MUI containedBtn cascade. (Note: missing `text-button-mobile sm:text-button` for button font sizing) | medium |
| E11 | 31-35 | Button style: `boxShadow` / `backgroundColor` / `color` inline | Should use Tailwind classes `bg-brand-500 text-white shadow-[1px_4px_24px_0px_#38B6FFB2]` instead of inline style for token consistency. Functional match. | low (token preference) |
| E12 | 30 | Missing `ease-in-out` easing on transition | `transition-all duration-500 ease-in-out` | low |
| E13 | 30 | Missing `normal-case font-bold` (button is `textTransform: none`, `fontWeight: 700` per the commented-out properties) | add `normal-case font-bold` | low |
| E14 | 30 | Missing `font-heading text-[2vh]` — MUI doesn't set fontSize on the button (commented out), but the visual default for `<Button>` in MUI is 0.875rem; this codebase commonly uses `text-button` triplet for parity | Acceptable to leave default. | low |
| E15 | 41-46 | Image wrap is just `<div>` then `<Image>` — no `items-end` | MUI: `<Grid alignItems="end">` is a per-item alignment override (vertical end). Tailwind grid item `lg:self-end` would match — minor. | low |

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="px-[5vw]">
    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
      <div>
        {/* Missing pill - add this */}
        <p
          className={`${leagueSpartan.className} rounded-[5vh] bg-[#B8E1F9] text-center font-heading text-[2vh] text-[#1F90D1] w-[53%] px-[3vh] py-[2vh] sm:w-[28vh] sm:px-[3.6vw] sm:py-[1.5vh] sm:text-[2.5vh] md:w-[30vh] md:text-[2.2vh] lg:w-[22vh] lg:text-[2vh]`}
        >
          Educational Counseling
        </p>

        <HeaderTag
          className={`${leagueSpartan.className} w-[80vw] py-[2vh] text-start font-heading text-h3-mobile sm:py-[2.5vh] sm:text-h3-tablet md:py-[3vh] lg:w-[40vw] lg:py-[3vh] lg:text-h3 lg:text-left`}
          dangerouslySetInnerHTML={{ __html: data?.header }}
        />

        <p
          className={`${leagueSpartan.className} w-[80vw] text-start font-body text-small text-ink-900 lg:w-[40vw]`}
          dangerouslySetInnerHTML={{ __html: data?.paragraph }}
        />

        <div className="mr-auto flex max-w-full justify-between md:max-w-[90%]">
          <div className="flex w-full items-end">
            <PopUpButton
              text="Enroll Now"
              href="popup"
              className={`${leagueSpartan.className} my-[2vh] w-full rounded-[10px] bg-brand-500 px-[3vh] py-[1.5vh] font-heading font-bold normal-case text-white shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 ease-in-out hover:scale-[1.02] sm:px-[4vh] sm:py-[2vh] lg:py-[1.5vh]`}
            />
          </div>
        </div>
      </div>

      <div className="lg:self-end">
        <Image src={counsling} alt="Counseling Image" className="h-auto w-full" />
      </div>
    </div>
  </div>
);
```

---

## §4 Verification at 4 widths

- **375px**: 1 col stacked. Pill at 53% width (~199px) with 2vh font; header h3 mobile (1.125rem) with `py-2vh`; paragraph 14px width 80vw (~300px); button full-width.
- **768px**: still 1 col. Pill at 28vh (~243px width assuming 870h viewport) at 2.5vh font; paragraph 14px; button full-width with 4vh paddingX and 2vh paddingY.
- **1280px**: 2 cols. Pill at 22vh (~150px width) at 2vh; header h3 desktop (1.5rem) with 40vw width; paragraph 14px width 40vw (~512px); button full-width within left column. Image right.
- **1920px**: same; image takes full right column width.

---

## §5 RTL notes (ar-educational-counseling.tsx)

- AR variant has `direction: "rtl"` (MUI) → port has `dir="rtl"` on outer div. ✓ in port.
- AR pill text-align: center (same as LTR `textAlign: "center"`) → ✓.
- AR header textAlign: `xs/sm/md: "end", lg: "right"` → port uses `text-end`. ✓.
- AR desc textAlign: `end` everywhere → port uses `text-end`. ✓.
- btnDiv `marginLeft: "auto"` (AR) vs `marginRight: "auto"` (LTR) → AR port has `ml-auto`. ✓.
- AR port **does** have the "الإرشاد التعليمي" pill (line 18-22). The LTR port is the one missing the pill — bug E1.
- Same body2→text-body bug (E7) likely applies to AR port — audit it.

**ar-educational-counseling.tsx port-specific bugs:**

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| ArE1 | 19 | Pill: `font-heading text-[2vh] ...` | ✓ Match MUI AR fontSize cascade (2vh / 2.5vh / 2.2vh / 2vh) | ok |
| ArE2 | 28 | Paragraph: `font-heading text-body text-ink-900` | Same as LTR E7 — should be `font-body text-small` | medium |
| ArE3 | 24 | Header: hardcoded `text-h3` triplet despite dynamic `data.headerTag` | Same as LTR E3 — should map dynamically | medium |
