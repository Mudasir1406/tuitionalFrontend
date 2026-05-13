# Component — `<GradingScale>` (curiculume)

Curriculum-page grading-scale table: a header row of 4 subject pills, then 4 assessment rows ("Change to Assessment" / "Total Marks" / "Duration" / "Item Type") + a final "Other Information" row. Each row is a card with inset shadow.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\grading-scale.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\grading-scale.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box marginX/Y>                                  ← lg-only margins
└── <Box width=100%>
│   └── <Grid container spacing={2}>             ← subjects pill row
│       {subjectsNames.map((name) => (
│         <Grid item xs=12 sm=6 md=6 lg=3>
│           <Box><Typography text>{name}</Typography></Box>
│         </Grid>
│       ))}
├── {assessments.map((assessment, index) => (    ← 4 rows
│     <Box rowCard (bg alternates blue/white)>
│       <Grid container spacing={2}>
│         <Grid item xs=12 sm=4 md=4 lg=4>
│           <Typography assesment>{assessment.name}</Typography>
│         </Grid>
│         {assessment.papers.map((paper) => (
│           <Grid item xs=6 sm=2 md=2 lg=2>
│             <Typography papers>{paper}</Typography>
│           </Grid>
│         ))}
│       </Grid>
│     </Box>
│   ))}
└── <Box otherInfoCard>
    <Grid container spacing={2}>
      <Grid item xs=12 sm=4 md=4 lg=4>
        <Box paddingTop=15vh><Typography assesment>Other Information</Typography></Box>
      </Grid>
      {[...Array(4)].map((_, colIndex) => (
        <Grid item xs=6 sm=2 md=2 lg=2>
          {otherInfo.map((info) => <Typography papers>{info}</Typography>)}
        </Grid>
      ))}
    </Grid>
  </Box>
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| outer Box | `marginX` | (none) | (none) | (none) | 7vh |
| outer Box | `marginY` | (none) | 5vh | (sm) | 5vh |
| subject Grid | `spacing` | 2 (16px) | (same) | (same) | (same) |
| subject Grid item | column span | 12 (1 col) | 6 (2 cols) | 6 | 3 (4 cols) |
| pill (.text) | `borderRadius` | 5vh | 5vh | 5vh | 5vh |
| pill (.text) | `background` | `#FFF` | (same) | (same) | (same) |
| pill (.text) | `boxShadow` | `0px -1px 10px 0px rgba(0, 0, 0, 0.15) inset` | (same) | (same) | (same) |
| pill (.text) | `paddingY` | (none) | 1.5vh | (sm) | 2vh |
| pill (.text) | display | flex / center / center | (same) | (same) | (same) |
| row card | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| row card | `background` | `#9EDCFF` (first row) / `#FFF` (others) | (same) | (same) | (same) |
| row card | `boxShadow` | `0px -5px 15px 0px rgba(0, 0, 0, 0.20)` | (same) | (same) | (same) |
| row card | `backdropFilter` | blur(5px) | (same) | (same) | (same) |
| row card | `height` | 12vh | 12vh | 12vh | 12vh |
| row card | `paddingX` | (none) | (none) | (none) | 5vh |
| row card | `marginTop` | (none) | (none) | (none) | 9vh |
| row Grid | `spacing` | 2 (16px) | (same) | (same) | (same) |
| name col | xs=12 sm=4 md=4 lg=4 (1 col mobile, 3 cols sm+) | — | — | — | — |
| paper cols | xs=6 sm=2 md=2 lg=2 (2 cols mobile, 6 cols sm+) | — | — | — | — |
| assesment | `paddingY` | (none) | (none) | (none) | 1.5vh |
| papers | `paddingY` | (none) | (none) | (none) | 1.5vh |
| Other Info card | `height` | auto | auto | auto | auto |
| Other Info card | `paddingX` | (none) | (none) | (none) | 5vh |
| Other Info card | `marginTop` | (none) | (none) | (none) | 9vh |
| Other Info name-col extra | `paddingTop` | 15vh | 15vh | 15vh | 15vh |

### Typography

| Element | xs | sm | md | lg | Weight | Align |
|---|---|---|---|---|---|---|
| pill (.text) | (default ~1rem) | (default) | (default) | 2.3vh | (default) | center |
| assesment | (default) | (default) | (default) | 3vh | 600 | (default left) |
| papers | (default) | (default) | (default) | 2.4vh | (default) | center |

Note: many breakpoints have no fontSize entry; falls back to default.

### Colors

| Hex | Where | Token |
|---|---|---|
| `#FFF` | pill bg / row card bg (non-first) / other-info card bg | `bg-white` |
| `#9EDCFF` | first row card bg | `bg-[#9EDCFF]` |
| `0px -1px 10px 0px rgba(0,0,0,0.15) inset` | pill shadow | arbitrary `shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset]` |
| `0px -5px 15px 0px rgba(0,0,0,0.20)` | row card shadow | `shadow-benefit-box`-ish (token is `rgba(56,182,255,0.20)` — different alpha source; preserve arbitrary) |

### Animations / interactions

- None (static).

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list:

| # | Risk | Expected | Severity |
|---|---|---|---|
| G1 | Mapping pill fontSize 2.3vh to text-small | Use literal `text-[2.3vh]` (only at lg in MUI; below lg falls back to default ~1rem — leave it as `text-base lg:text-[2.3vh]`) | high |
| G2 | Mapping assesment fontSize 3vh, papers 2.4vh to heading triplet | Preserve: assesment `lg:text-[3vh]`, papers `lg:text-[2.4vh]` | high |
| G3 | Pill Grid: `xs=12 sm=6 lg=3` translates to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` | ✓ Correct breakpoint inversion (sm is first non-12, lg is the second drop) | medium |
| G4 | Row card Grid: `xs=12 sm=4 lg=4` (name col) + `xs=6 sm=2 lg=2` (paper cols) | Within row: name takes 1/3 (md+), papers each take 1/6. At xs: name full-width, papers half-width. **Tricky**: this requires either a flex layout with explicit widths or `grid-cols-12` with `col-span`. Recommended translation: `grid grid-cols-12 gap-4` with name `col-span-12 sm:col-span-4` and papers `col-span-6 sm:col-span-2`. | high |
| G5 | Row card height fixed at 12vh — text inside might overflow | `h-[12vh]` (preserve) | medium |
| G6 | Row card paddingX 5vh only at lg | `lg:px-[5vh]` (no smaller value) | medium |
| G7 | Row card marginTop 9vh only at lg | `lg:mt-[9vh]` — at <1200px rows touch each other (this matches MUI behavior — likely intentional or unfinished design) | medium |
| G8 | Outer marginX 7vh only at lg | `lg:mx-[7vh]` | medium |
| G9 | Outer marginY 5vh at sm+ | `sm:my-[5vh]` (no xs base — but inherits 0) | medium |
| G10 | Don't drop the `boxShadow` on pill — it's inset and subtle | arbitrary `shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset]` | low |
| G11 | "Other Information" inner Box `paddingTop: 15vh` is the alignment hack to vertically center against 5 stacked papers | `pt-[15vh]` (preserve) | low |
| G12 | First row card background bg-[#9EDCFF] (index === 0) | conditional className | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="lg:mx-[7vh] sm:my-[5vh] lg:my-[5vh]">
  {/* Subjects row */}
  <div className="w-full">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {subjectsNames.map((name, index) => (
        <div key={index}>
          <p className="flex items-center justify-center rounded-[5vh] bg-white shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset] sm:py-[1.5vh] lg:py-[2vh] lg:text-[2.3vh]">
            {name}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Assessment rows */}
  {assessments.map((assessment, index) => (
    <div
      key={index}
      className={`grid h-[12vh] grid-cols-12 gap-4 rounded-[2vh] backdrop-blur-[5px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)] lg:mt-[9vh] lg:px-[5vh] ${
        index === 0 ? "bg-[#9EDCFF]" : "bg-white"
      }`}
    >
      <div className="col-span-12 sm:col-span-4">
        <p className="font-semibold lg:py-[1.5vh] lg:text-[3vh]">{assessment.name}</p>
      </div>
      {assessment.papers.map((paper, i) => (
        <div key={i} className="col-span-6 sm:col-span-2">
          <p className="text-center lg:py-[1.5vh] lg:text-[2.4vh]">{paper}</p>
        </div>
      ))}
    </div>
  ))}

  {/* Other Info row */}
  <div className="grid h-auto grid-cols-12 gap-4 rounded-[2vh] bg-white backdrop-blur-[5px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)] lg:mt-[9vh] lg:px-[5vh]">
    <div className="col-span-12 sm:col-span-4">
      <div className="pt-[15vh]">
        <p className="font-semibold lg:py-[1.5vh] lg:text-[3vh]">Other Information</p>
      </div>
    </div>
    {[...Array(4)].map((_, colIndex) => (
      <div key={colIndex} className="col-span-6 sm:col-span-2">
        {otherInfo.map((info, i) => (
          <p key={i} className="text-center lg:py-[1.5vh] lg:text-[2.4vh]">{info}</p>
        ))}
      </div>
    ))}
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 4 pills stacked (1 col); rows: assessment-name full width then 4 paper cells in 2x2 grid (col-span-6). Heights 12vh, no marginTop between rows (touching). Default font sizes. No outer margins.
- **768px**: pills in 2 columns; row layout = 4-col-name + 4×2-col-paper in a 12-col grid. Text default size. my-[5vh] applies.
- **1280px**: pills in 4 columns; rows have lg:mt-9vh between, lg:px-5vh inside; pill text 2.3vh; assesment 3vh; papers 2.4vh; outer mx-7vh.
- **1920px**: same as 1280; outer margins absolute.

---

## §5 RTL notes

No AR variant. If/when added: text-align inherits via `dir="rtl"`; the 12-col grid preserves logical position so no flips needed. The "Other Information" `paddingTop: 15vh` is a vertical-spacing hack that's RTL-safe.
