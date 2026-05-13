# Component — `<FeaturesOfTuitionals>` (curiculume)

Curriculum-page "Features of Tuitional's Online Classes" section: a heading + supporting paragraph at top in a 2-col row, then a 4-up grid of 8 icon-cards. Two specific cards ("Live interactive sessions" + "Customized Study Plans") get a tinted background and extra bottom padding.

**Note**: the task brief lists `featured-of-tuitionals.tsx` as a separate file — that file does not exist in the MUI baseline. It is a typo for `features-of-tuitionals.tsx` (this file). Only one spec needed.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\features-of-tuitionals.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\features-of-tuitionals.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box marginX>
├── <Grid container spacing={2}>             ← top text row
│   ├── <Grid item xs=12 sm=6 md=6 lg=6>     ← title left
│   │   <Box><Typography featureText>Features of Tuitional's...</Typography></Box>
│   └── <Grid item xs=12 sm=6 md=6 lg=6>     ← desc right
│       <Box display=flex justifyContent=flex-end>
│         <Typography featureDesc>Lorem ipsum...</Typography>
│       </Box>
└── <Box marginY>
    └── <Grid container spacing={2}>
        {Cards.map((item) => (
          <Grid item xs=12 sm=6 md=6 lg=3>     ← 4-up at lg
            <Box [cardsBoxes, optional bg+padding for special two cards]>
              <Image icon h=10vh />
              <Typography heading>{item.heading}</Typography>
            </Box>
          </Grid>
        ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| outer Box | `marginX` | 2.5vh | 2.5vh | (sm) | 7vh |
| top Grid | `spacing` | 2 (16px) | 2 | 2 | 2 |
| top Grid item | xs=12 sm=6 lg=6 → first non-12 at `sm` | 1 col | 2 cols | 2 cols | 2 cols |
| desc wrapper | `display/justifyContent` | flex / flex-end | (same) | (same) | (same) |
| cards-section Box | `marginY` | 4vh | 5vh | (sm) | 6vh |
| cards Grid | `spacing` | 2 (16px) | 2 | 2 | 2 |
| cards Grid item | xs=12 sm=6 md=6 lg=3 → 1 / 2 / 2 / 4 cols | 1 | 2 | 2 | 4 |
| cardsBoxes | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| cardsBoxes | `boxShadow` | `0px -5px 15px 0px rgba(0, 0, 0, 0.20)` | (same) | (same) | (same) |
| cardsBoxes | `backdropFilter` | blur(5px) | (same) | (same) | (same) |
| cardsBoxes | `textAlign` | center | center | center | center |
| cardsBoxes | `padding` | 4vh | 4vh | 4vh | 4vh |
| special cards (Live / Customized) | `background` | `#9EDCFF` (set explicitly on first card; second card has no background entry so it stays default) | — | — | — |
| special cards | `paddingBottom` | 9vh | 9vh | 9vh | 9vh |
| icon image | inline `height` | 10vh | 10vh | 10vh | 10vh |

**Note**: the conditional logic is `(item.heading === "Live interactive sessions" || item.heading === "Customized Study Plans") && { paddingBottom: "9vh", background: item.background }`. Only the first item (`Live interactive sessions`) has `background: "#9EDCFF"` defined in the data; the second matched item has `item.background === undefined`, so its background falls back to `undefined`. Practical effect: only the first card has the blue bg.

### Typography

| Element | xs | sm | md | lg | Weight |
|---|---|---|---|---|---|
| featureText | 2.5vh | 2vh | (sm) | 6vh | 600 |
| featureText `width` | 35vh | 25vh | (sm) | 72vh | — |
| featureDesc | (default) | (default) | (default) | 2.1vh | 400 |
| featureDesc `width` | 100vh | 70vh | (sm) | 65vh | — |
| featureDesc `lineHeight` | 3vh | 3vh | 3vh | 3vh | — |
| heading (card title) | (default) | (default) | (default) | 3vh | 600 |
| heading color | `#2D2D2D` | (same) | (same) | (same) | — |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#9EDCFF` | special card bg (only "Live interactive sessions") | `bg-[#9EDCFF]` |
| `#2D2D2D` | card heading | `text-ink-900` |
| `0px -5px 15px 0px rgba(0, 0, 0, 0.20)` | card shadow | arbitrary `shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)]` |

### Animations / interactions

- None.

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list:

| # | Risk | Expected | Severity |
|---|---|---|---|
| F1 | Mapping `featureText` `vh`-sizes to heading triplet | Preserve `vh`: `text-[2.5vh] sm:text-[2vh] lg:text-[6vh]` with `font-semibold` | high |
| F2 | featureText `width` is the unusual `xs: "35vh", sm: "25vh", lg: "72vh"` (height-relative width) | Preserve `w-[35vh] sm:w-[25vh] lg:w-[72vh]` | high |
| F3 | featureDesc `width: 100vh` at xs — will overflow narrow screens | Preserve `w-[100vh] sm:w-[70vh] lg:w-[65vh]` (note this is bug-prone in original) | high |
| F4 | Top Grid: `xs=12 sm=6` → `grid-cols-1 sm:grid-cols-2` (first non-12 is sm) | ✓ `grid grid-cols-1 sm:grid-cols-2 gap-4` | high |
| F5 | Cards Grid: `xs=12 sm=6 md=6 lg=3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (sm first non-12, lg drops further) | ✓ `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` | high |
| F6 | marginY responsive `xs=4vh sm=5vh lg=6vh` | `my-[4vh] sm:my-[5vh] lg:my-[6vh]` | medium |
| F7 | Outer marginX `xs=2.5vh sm=2.5vh lg=7vh` | `mx-[2.5vh] lg:mx-[7vh]` | medium |
| F8 | Conditional background only on "Live interactive sessions" card | Apply via template literal: `${item.heading === "Live..." ? "bg-[#9EDCFF]" : ""}` | medium |
| F9 | Conditional paddingBottom on both "Live..." and "Customized..." | Apply `pb-[9vh]` conditionally | medium |
| F10 | Skipping `justify-end` for desc wrapper | `flex justify-end` | low |
| F11 | featureDesc lineHeight 3vh | `leading-[3vh]` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="mx-[2.5vh] lg:mx-[7vh]">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <p className="w-[35vh] font-semibold text-[2.5vh] sm:w-[25vh] sm:text-[2vh] lg:w-[72vh] lg:text-[6vh]">
        Features of Tuitional&rsquo;s Online Classes (Vectors)
      </p>
    </div>
    <div className="flex justify-end">
      <p className="w-[100vh] font-normal leading-[3vh] sm:w-[70vh] lg:w-[65vh] lg:text-[2.1vh]">
        Lorem ipsum dolor sit amet consectetur. Vivamus at sed imperdiet convallis integer. Ipsum amet ultrices praesent tellus. Pellentesque in in sollicitudin rhoncus lectus eget lectus nunc rhoncus.
      </p>
    </div>
  </div>

  <div className="my-[4vh] sm:my-[5vh] lg:my-[6vh]">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Cards.map((item, index) => {
        const isSpecial =
          item.heading === "Live interactive sessions" ||
          item.heading === "Customized Study Plans";
        return (
          <div
            key={index}
            className={`rounded-[2vh] p-[4vh] text-center backdrop-blur-[5px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)] ${
              isSpecial ? "pb-[9vh]" : ""
            } ${item.background ? "bg-[#9EDCFF]" : ""}`}
          >
            <Image src={item.icon} alt="icons" style={{ height: "10vh" }} />
            <p className="font-semibold text-ink-900 lg:text-[3vh]">{item.heading}</p>
          </div>
        );
      })}
    </div>
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 1 col text row (title above desc), 1 col cards. Title 2.5vh (~17px) width 35vh (~233px overflow on 375 viewport ⚠). Desc width 100vh — major horizontal overflow. **Original MUI has the same bug.**
- **768px**: 2 col text row; 2 col cards; title 2vh width 25vh (167px); desc 70vh (467px — overflows 768 in MUI too).
- **1280px**: 2 col text row; 4 col cards; title 6vh (~58px) width 72vh (~480px); desc 65vh (~432px). 5vh card-section marginY.
- **1920px**: same as 1280 with absolute spacing.

---

## §5 RTL notes

No AR variant. `flex justify-end` would reverse in RTL (LTR end = right → in RTL means left); designer's intent was probably "align the desc to the gutter opposite the title", so flipping is correct.
