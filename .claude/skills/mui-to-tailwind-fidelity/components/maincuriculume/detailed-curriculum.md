# Component — `DetailedCurriculum` (maincuriculume)

Tabbed (British / American / International) curriculum drill-down with a two-column layout: left = list of exam boards, right = list of stages with descriptions. **Not ported** in Tailwind.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\detailed-curriculum.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (margin lg: 7vh)
├── Typography.detail  ("Detailed Curriculum Information")
├── Box  (flex col → row at sm, gap 2vh, mt 4vh)
│   └── Button × 3   (British / American / International tabs)
└── Box  (margin "5vh 0")
    └── Grid container spacing={2}
        ├── Grid item xs=12 sm=4 md=4 lg=3
        │   └── Box.boxstyle  (left list)
        │       └── Typography.typographyWithBorder × N
        └── Grid item xs=12 sm=8 md=8 lg=9
            └── Box.rightBoxStyle  (right detail panel)
                └── Box.boxWithBorder × M
                    ├── Typography.cambridge (title, 60% width on lg)
                    └── Typography.typographyWithPadding (description, 100% width)
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| Outer Box | margin | 0 | 0 | 0 | 7vh |
| Tab row | flexDirection | column | row | row | row |
| Tab row | gap | 2vh | 2vh | 2vh | 2vh |
| Tab row | marginTop | 4vh | 4vh | 4vh | 4vh |
| Button | padding | `1.5vh 3vh` | `1.5vh 3vh` | — | — |
| Button | borderRadius | 5vh | 5vh | — | — |
| Button | width | 100% | auto | auto | auto |
| Button | border | `1px solid #B1B1B1` | same | — | — |
| Grid container | spacing | 16px | 16px | 16px | 16px |
| Grid item (left) | columns | 12/12 | 4/12 | 4/12 | **3/12** |
| Grid item (right) | columns | 12/12 | 8/12 | 8/12 | **9/12** |
| boxstyle (left) | width | — | — | — | 45vh |
| boxstyle | borderRadius | 2vh | 2vh | 2vh | 2vh |
| typographyWithBorder | padding | `3vh 4vh` | same | — | — |
| typographyWithBorder | marginBottom | 8px | 8px | — | — |
| rightBoxStyle | padding | 0vh | 0vh | 0vh | `2vh 8vh 10vh 8vh` |
| cambridge (title) | padding | 0 | 0 | 0 | `3vh 0 3vh 2vh` |
| cambridge | width | 100% | 100% | 100% | 60% |
| typographyWithPadding | padding | 0 | 0 | 0 | `3.5vh 0 3vh 2vh` |
| typographyWithPadding | width | 100% | 100% | 100% | 100% |
| typographyWithPadding | borderLeft | `.5px solid #D7D7D7` | same | — | — |

### Typography

| Element | xs | lg | weight | color |
|---|---|---|---|---|
| detail | — | 6vh | 600 | inherit |
| typographyWithBorder | — | 3vh | 600 | `#000` (or `#38B6FF` when `title === "CAIE"`) |
| cambridge | 1vh | 3vh | 600 | inherit |
| typographyWithPadding | 1.5vh | 2vh | 600 | inherit |
| Button label | inherit | inherit | — | bg `#38B6FF` when selected else `#FFF`, text `#FFF`/`#000` |

### Colors

| Element | Color / shadow |
|---|---|
| Selected tab bg | `#38B6FF`, text `#FFF` |
| Unselected tab bg | `#FFF`, text `#000`, border `#B1B1B1` |
| boxstyle (left) | bg `#FFF`, shadow `0px -3px 8px 0px rgba(0, 0, 0, 0.20)`, filter `drop-shadow(0px 2px 1px rgba(0,0,0,0.05))`, backdrop-blur 5px |
| rightBoxStyle | bg `#FFF`, shadow `0px 2px 1px 0px rgba(0,0,0,0.05), 0px -3px 8px 0px rgba(0,0,0,0.20)`, filter + backdrop-blur same |
| Row dividers | `.5px solid #D7D7D7` |
| CAIE highlight | `#38B6FF` |

### Animations / interactions

- Button: `textTransform: "none"`. Hover preserves unselected bg (`button.backgroundColor`) — so the selected tab loses its `#38B6FF` bg on hover. (Likely an MUI source bug — preserve behavior unless intentional fix.)
- Click on Tab → `setSelectedCurriculum(label.split(' ')[0])` swaps content.

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

Key cells:

```tsx
{/* Wrapper */}
<div className="lg:m-[7vh]">

  {/* Heading */}
  <p className="text-center font-semibold lg:text-[6vh]">
    Detailed Curriculum Information
  </p>

  {/* Tab row */}
  <div className="mt-[4vh] flex flex-col items-center justify-center gap-[2vh] sm:flex-row">
    {buttonData.map((b) => {
      const isSelected = b.label.split(" ")[0] === selectedCurriculum;
      return (
        <button
          key={b.label}
          onClick={() => handleButtonClick(b.label.split(" ")[0])}
          className={`w-full sm:w-auto rounded-[5vh] border border-[#B1B1B1]
                      px-[3vh] py-[1.5vh] normal-case
                      ${isSelected ? "bg-brand-500 text-white" : "bg-white text-black"}`}
        >
          {b.label}
        </button>
      );
    })}
  </div>

  {/* Grid */}
  <div className="my-[5vh] grid grid-cols-1 gap-4 sm:grid-cols-12">
    <div className="sm:col-span-4 lg:col-span-3">
      <div className="lg:w-[45vh] rounded-[2vh] bg-white backdrop-blur-[5px]
                       shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.20)]
                       [filter:drop-shadow(0px_2px_1px_rgba(0,0,0,0.05))]">
        {firstColumn.map((item, i) => (
          <p key={i}
             className={`mb-2 border-b-[0.5px] border-[#D7D7D7] px-[4vh] py-[3vh]
                          font-semibold lg:text-[3vh]
                          ${item.title === "CAIE" ? "text-brand-500" : "text-black"}`}>
            {item.title}
          </p>
        ))}
      </div>
    </div>

    <div className="sm:col-span-8 lg:col-span-9">
      <div className="rounded-[2vh] bg-white backdrop-blur-[5px]
                       p-0 lg:pt-[2vh] lg:pe-[8vh] lg:pb-[10vh] lg:ps-[8vh]
                       shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(0,0,0,0.20)]
                       [filter:drop-shadow(0px_2px_1px_rgba(0,0,0,0.05))]">
        {secondColumn.map((s, i) => (
          <div key={i} className="flex border-b-[0.5px] border-[#D7D7D7]">
            <p className="font-semibold w-full lg:w-[60%] text-[1vh] lg:text-[3vh]
                          p-0 lg:py-[3vh] lg:ps-[2vh]">{s.title}</p>
            <div
              className="font-semibold border-l-[0.5px] border-[#D7D7D7] w-full
                          text-[1.5vh] lg:text-[2vh]
                          p-0 lg:pt-[3.5vh] lg:pb-[3vh] lg:ps-[2vh]"
              dangerouslySetInnerHTML={{ __html: s.description }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

Breakpoint trap: MUI uses `sm={4}/sm={8}` so the 3/9-col layout starts at sm (600px), then narrows to `lg={3}/lg={9}` (proportions stay similar). Use `sm:col-span-{4,8}` + `lg:col-span-{3,9}`.

## §4 Verification at 4 widths
- 375: full-column stack; tab buttons stack column with `w-full`.
- 768: tabs in a row, two columns appear (4/8 split).
- 1280: 3/9 split, `45vh` left panel.
- 1920: same proportions, generous outer 7vh margin.

## §5 RTL notes
- `padding: "3.5vh 0 3vh 2vh"` is direction-dependent → use `ps-[2vh]` (logical inline-start).
- `borderLeft: ".5px solid #D7D7D7"` on the description column → use `border-s-[0.5px]` (logical) so the divider sits between title and desc regardless of direction.
- Tab labels (British / American / International Curriculum) are English-only in MUI source — translation work needed for AR variant.
