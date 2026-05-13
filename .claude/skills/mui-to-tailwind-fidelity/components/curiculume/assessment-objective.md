# Component — `<AssessmentObjective>` (curiculume)

Curriculum-page Assessment Objectives section: centered heading, then two side-by-side outlined boxes ("Core Qualification of the AQS" / "Extended Qualification of the AQs"). Each box has a heading, a vertical bullet-list (4 items) with circle dots, and a weight image to the right.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\assessment-objective.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\assessment-objective.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box width=auto margin=lg:11vh 6vh>
├── <Box flex center marginY=lg:4vh>
│   └── <Grid container spacing={3}>
│       └── <Grid item xs=12>
│           <Box width=lg:50% margin=0 auto>
│             <Typography Obj>Assessment Objective...</Typography>
│           </Box>
└── <Box>
    └── <Grid container spacing={1}>
        {CoreAos.map((item) => (
          <Grid item xs=12 sm=12 md=12 lg=6>            ← 2 cols only at lg
            <Box Boxes (outlined card)>
              <Typography heading>{item.heading}</Typography>
              <Box flex/flexDir={xs:col, sm:row, lg:row} alignItems=center>
                <Box width=lg:60% sm:100% md:90%>       ← left: bullets
                  {item.desc.map((desc) => (
                    <Box textBox flex>
                      <Typography><Image Elipse h=3vh /></Typography>   ← circle dot
                      <Typography textBoxdes1>{desc}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box width=lg:40% sm:49% md:90%>        ← right: weight image
                  <Image weight w=auto h=30vh pt=2vh />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| outer Box | `margin` | (none) | (none) | (none) | 11vh 6vh |
| centering Box marginY | — | (none) | (none) | (none) | 4vh |
| heading wrap | `width` | (full) | (full) | (full) | 50% |
| heading wrap | `margin` | 0 auto | 0 auto | 0 auto | 0 auto |
| cards Grid | `spacing` | 1 (8px) | 1 | 1 | 1 |
| cards Grid item | column span | 12 | 12 | 12 | 6 (2 cols only at lg) |
| Boxes (card) | `marginX` | (none) | 1.5vh | (md: 1.5 — note typo `md: "1.5"` no unit, browser drops it) | 1vh |
| Boxes (card) | `border` | 1px solid #BEBEBE | (same) | (same) | (same) |
| Boxes (card) | `borderRadius` | 3vh | 3vh | 3vh | 3vh |
| Boxes (card) | `paddingX` | (none) | 2.5vh | (sm) | 5vh |
| Boxes (card) | `paddingBottom` | (none) | 0 | (sm) | 6vh |
| inner flex | `flexDirection` | column | row | (sm) | row |
| inner flex | `alignItems` | center | center | center | center |
| left bullets wrap | `width` | (full?) | 100% | 90% | 60% |
| right image wrap | `width` | (full?) | 49% | 90% | 40% |
| textBox | `paddingY` | 2vh | 1vh | 2vh | 1vh |
| textBox | `display` | flex | (same) | (same) | (same) |
| textBoxdes1 | `paddingX` | (none) | 1.5vh | (sm) | 2vh |
| Elipse image inline | `height` | 3vh | (same) | (same) | (same) |
| weight image inline | `height` / `paddingTop` | 30vh / 2vh | (same) | (same) | (same) |

### Typography

| Element | xs | sm | md | lg | Weight | Align |
|---|---|---|---|---|---|---|
| Obj (heading) | 3vh | (default) | (default) | 6vh | 600 | center |
| Obj `lineHeight` | 7vh | (default) | (default) | 7vh | — | — |
| heading (card heading) | (default) | 2.5vh | (sm) | 4vh | 600 | (default left) |
| heading `lineHeight` | 7vh | (default) | (default) | 17vh | — | — |
| textBoxdes1 | (default) | (default) | (default) | 2.2vh | (default) | (default) |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#BEBEBE` | card border | arbitrary `border-[#BEBEBE]` |

### Animations / interactions

- None.

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list:

| # | Risk | Expected | Severity |
|---|---|---|---|
| A1 | Mapping `Obj` 3vh / 6vh to heading triplet | Preserve `vh`: `text-[3vh] lg:text-[6vh]` with `font-semibold leading-[7vh] text-center` | high |
| A2 | Card-heading `sm: 2.5vh, lg: 4vh` plus huge `lineHeight: 17vh` at lg | `sm:text-[2.5vh] lg:text-[4vh] font-semibold leading-[7vh] lg:leading-[17vh]` | high |
| A3 | textBoxdes1 `2.2vh` only at lg | `lg:text-[2.2vh]` | medium |
| A4 | Cards Grid `xs=12 sm=12 md=12 lg=6` → `grid-cols-1 lg:grid-cols-2` (lg is first non-12) | ✓ `grid grid-cols-1 lg:grid-cols-2 gap-2` (spacing 1 → gap-2) | **high** |
| A5 | Inner flex direction `xs=col, sm=row, lg=row` | `flex flex-col sm:flex-row` | medium |
| A6 | Left/right widths cascade `lg=60%/40%, sm=100%/49%, md=90%/90%` | tricky — `w-full sm:w-full md:w-[90%] lg:w-[60%]` (left), `w-full sm:w-[49%] md:w-[90%] lg:w-[40%]` (right) | high |
| A7 | Outer margin `lg: "11vh 6vh"` (only lg) | `lg:my-[11vh] lg:mx-[6vh]` | medium |
| A8 | Card marginX cascade `sm:1.5vh, lg:1vh` (with bogus `md:"1.5"`) | `sm:mx-[1.5vh] lg:mx-[1vh]` (drop md bogus value) | low |
| A9 | Card paddingX cascade `sm:2.5vh, lg:5vh` | `sm:px-[2.5vh] lg:px-[5vh]` | medium |
| A10 | Card paddingBottom cascade `sm:0, lg:6vh` | `sm:pb-0 lg:pb-[6vh]` | low |
| A11 | Heading wrap `width: lg:50%` + `margin:0 auto` | `lg:w-1/2 mx-auto` | medium |
| A12 | Elipse `<Typography>` wraps an image — unusual pattern, semantically wrong | Replace `<Typography><Image/></Typography>` with `<span><Image/></span>` or just `<Image/>` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="w-auto lg:m-[11vh_6vh]">
  <div className="flex w-full items-center justify-center text-center lg:my-[4vh]">
    <div className="mx-auto lg:w-1/2">
      <p className="text-center font-semibold leading-[7vh] text-[3vh] lg:text-[6vh] lg:leading-[7vh]">
        Assessment Objective (AQs) in The Cambridge IGCSE Math
      </p>
    </div>
  </div>

  <div>
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {CoreAos.map((item, index) => (
        <div
          key={index}
          className="rounded-[3vh] border border-[#BEBEBE] sm:mx-[1.5vh] sm:px-[2.5vh] sm:pb-0 lg:mx-[1vh] lg:px-[5vh] lg:pb-[6vh]"
        >
          <p className="font-semibold leading-[7vh] sm:text-[2.5vh] lg:text-[4vh] lg:leading-[17vh]">
            {item.heading}
          </p>
          <div className="flex w-full flex-col items-center sm:flex-row">
            <div className="w-full md:w-[90%] lg:w-[60%]">
              {item.desc.map((desc, descIndex) => (
                <div key={descIndex} className="flex py-[2vh] sm:py-[1vh] md:py-[2vh] lg:py-[1vh]">
                  <span><Image src={item.Elipse} alt="circle" style={{ height: "3vh" }} /></span>
                  <p className="sm:px-[1.5vh] lg:px-[2vh] lg:text-[2.2vh]">{desc}</p>
                </div>
              ))}
            </div>
            <div className="w-full sm:w-[49%] md:w-[90%] lg:w-[40%]">
              <Image src={item.weight} alt="weight" style={{ width: "auto", height: "30vh", paddingTop: "2vh" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 1 col (one card per row). Inner flex column (bullets above image). Heading 3vh (~20px). Cards have no border padding (sm/lg only). textBox padding 2vh. No margins.
- **768px**: still 1 col (lg break only). Inner flex row; left bullets 100%, right image 49% — note image takes less than half (clipping likely). Card heading 2.5vh, marginX 1.5vh, paddingX 2.5vh.
- **1280px**: 2 cols. Inner flex row; left 60%, right 40%. Card heading 4vh with massive lineHeight 17vh (~163px tall row — looks like a typo but is intentional). Outer m: 11vh 6vh.
- **1920px**: same as 1280; absolute margins make outer spacing more pronounced.

---

## §5 RTL notes

No AR variant. If added: bullets list reading order flips naturally with `dir="rtl"`; image stays on the same flex side (right in LTR, left in RTL). `mx-auto` on heading is RTL-safe.
