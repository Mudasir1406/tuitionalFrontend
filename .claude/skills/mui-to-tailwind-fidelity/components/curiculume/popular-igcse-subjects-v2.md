# Component — `<PopularIgcseSubjectsV2>` (curiculume)

Variant of `popular-igcse-subjects` that uses a hardcoded subject list (no icons) and alternating card backgrounds (`#e7f1f7` / `#c9ebff`). Used on the three curriculum landing pages.

**v2 is used on:** `/gcse` ([src/app/gcse/page.tsx:187](../../../../src/app/gcse/page.tsx)), `/igcse` ([src/app/igcse/page.tsx:172](../../../../src/app/igcse/page.tsx)), `/a-level` ([src/app/a-level/page.tsx:192](../../../../src/app/a-level/page.tsx)).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\popular-igcse-subjects-v2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\curiculume\popular-igcse-subjects-v2.tsx` |
| Arabic variant | (none — language is consumed via the page that imports v2) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box paddingX="5vw">
├── <Box><Typography popularText variant=headerTag>{title}</Typography></Box>
└── <Box>
    └── <Grid container spacing={2} justifyContent="center">
        {hardcodedSubjects.map((item, index) => (
          <Grid item xs=6 sm=6 md=3 lg=3 xl=2>
            <Box cardsBoxes (bg = alternating)>
              <Typography subjects variant="caption" component="p">{item.name}</Typography>
            </Box>
          </Grid>
        ))}
```

`isMobile = useMediaQuery(theme.breakpoints.down('md'))` → at <900px the bg color follows `index % 2 === 0 ? "#e7f1f7" : "#c9ebff"` (same rule used desktop). Effectively constant.

### Dimensions & spacing

Same as `popular-igcse-subjects` with these differences:

| Element | Property | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| cardsBoxes | `background` | alternating `#e7f1f7` / `#c9ebff` | (same) | (same) | (same) | (same) |
| cardsBoxes | `justifyContent` | **center** (vs LTR `left` in v1) | (same) | (same) | (same) | (same) |
| cardsBoxes | `:hover` | `scale(1.05); background: cardColor; opacity: 0.8` | (same) | (same) | (same) | (same) |
| subjects (name) | `fontSize` | 0.9rem | 0.9rem | 0.9rem | 1rem | 1rem |
| subjects (name) | `fontWeight` | 600 | 600 | 600 | 600 | 600 |
| subjects (name) | `color` | `#2D2D2D` | (same) | (same) | (same) | (same) |
| (no Image inside) | — | — | — | — | — | — |

All other tokens (5vw padding, 2vh radius, 5vh height, 2vh/3vh padding, columnSpacing 2 → gap-4, shadow inset, blur 5px, transition .5s ease-in-out) match v1.

### Typography

| Element | Variant | Font | xs | lg | Weight | Color |
|---|---|---|---|---|---|---|
| header | dynamic `headerTag` (default h2) | League Spartan | per heading triplet for the variant | per triplet | 700 (h1-h3) / 600 (h4-h6) | inherit |
| subjects | `variant="caption"` + explicit fontSize 0.9rem/1rem | League Spartan | 0.9rem (~14.4px) | 1rem (16px) | 600 | `#2D2D2D` |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#e7f1f7` | even card bg | arbitrary `bg-[#e7f1f7]` |
| `#c9ebff` | odd card bg | arbitrary `bg-[#c9ebff]` |
| `#2D2D2D` | subject text | `text-ink-900` |

### Animations / interactions

- `transition: all .5s ease-in-out` → `transition-all duration-500 ease-in-out`.
- `:hover { scale(1.05); opacity: 0.8 }` → `hover:scale-105 hover:opacity-80`. (Hover keeps card color; no color change.)

---

## §2 Tailwind port — bug list

Audit of `tuitionalFrontend\src\components\curiculume\popular-igcse-subjects-v2.tsx`:

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| V1 | 39 | Header: `text-h3-mobile sm:text-h3-tablet lg:text-h3` (hardcoded h3) | Default prop `headerTag = "h2"` in this component → should use h2 triplet by default. With dynamic headerTag, ideally pick triplet based on tag. **Bug**: when default h2 is used, port renders h3-size text. | **high** |
| V2 | 44 | Grid: `grid-cols-2 justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6` | ✓ Match. (Redundant `sm:` / `lg:` repeats but harmless.) | ok |
| V3 | 50 | Card: `transition-all duration-500` (no easing) | Add `ease-in-out` to match `.5s ease-in-out`. | low |
| V4 | 50 | Card: `justify-center` | ✓ Match (v2 uses center) | ok |
| V5 | 50 | Card: `p-[2vh] lg:p-[3vh]` h-[5vh] | ✓ Match | ok |
| V6 | 51 | Background applied via `style={{ background: cardColor }}` (inline) | MUI also uses dynamic bg inline-style. ✓ Acceptable. Could use `data-attr` and Tailwind classes, but inline is fine. | ok |
| V7 | 50 | Hover: `hover:scale-105 hover:opacity-80` | ✓ Match MUI hover (`opacity: 0.8` + same bg) | ok |
| V8 | 54 | Subject name: `font-heading text-[0.9rem] font-semibold text-[#2D2D2D] lg:text-[1rem]` | ✓ Match MUI `fontSize: { xs: "0.9rem", lg: "1rem" } fontWeight: 600 color: #2D2D2D`. (Note: `text-[#2D2D2D]` could be `text-ink-900` for consistency.) | low (token preference) |
| V9 | 50 | Card uses `text-center` | MUI cardsBoxes uses `textAlign: "center"` (yes — note v2 differs from v1 here). ✓ Match | ok |
| V10 | 50 | Card has no `flex-row` explicit | MUI: `flexDirection: "row"` — but with single child, no impact. ✓ | ok |
| V11 | 38 | `<HeaderTag>` uses raw `headerTag.toLowerCase()` | MUI uses the tag as-is. Match. | ok |
| V12 | — | No backdrop-blur missing | MUI: `backdropFilter: blur(5px)` → `backdrop-blur-[5px]` is present on line 50 ✓ | ok |
| V13 | 50 | Shadow: `shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset]` | ✓ Match | ok |

---

## §3 Corrected Tailwind classNames

```tsx
const headerSize = {
  h1: "text-h1-mobile sm:text-h1-tablet lg:text-h1",
  h2: "text-h2-mobile sm:text-h2-tablet lg:text-h2",
  h3: "text-h3-mobile sm:text-h3-tablet lg:text-h3",
  h4: "text-h4-mobile sm:text-h4-tablet lg:text-h4",
  h5: "text-h5-tablet lg:text-h5",
  h6: "text-h6",
}[HeaderTag] ?? "text-h2-mobile sm:text-h2-tablet lg:text-h2";

return (
  <div className="px-[5vw]">
    <HeaderTag className={`${leagueSpartan.className} mx-auto mb-[2.5vh] text-center font-heading ${headerSize} text-ink-900`}>
      {title}
    </HeaderTag>

    <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-4 xl:grid-cols-6">
      {hardcodedSubjects.map((item, index) => {
        const cardColor = index % 2 === 0 ? "#e7f1f7" : "#c9ebff";
        return (
          <div
            key={index}
            style={{ background: cardColor }}
            className="flex h-[5vh] cursor-pointer items-center justify-center rounded-[2vh] p-[2vh] text-center backdrop-blur-[5px] shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset] transition-all duration-500 ease-in-out hover:scale-105 hover:opacity-80 lg:p-[3vh]"
          >
            <span className={`${leagueSpartan.className} font-heading text-[0.9rem] font-semibold text-ink-900 lg:text-[1rem]`}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
```

---

## §4 Verification at 4 widths

- **375px**: 2 columns; cards alternating `#e7f1f7` / `#c9ebff`; centered names at 0.9rem; default header `<h2>` should render at 1.375rem (h2 mobile).
- **768px**: still 2 columns (sm); header at h2 tablet 1.75rem.
- **1280px**: 4 columns (md→4); cards padding 3vh; header h2 desktop 2.25rem; names jump to 1rem.
- **1920px**: 6 columns (xl).

---

## §5 RTL notes

When rendered on an Arabic page (these landing pages have AR variants under `/ar/...`): the page-level `dir="rtl"` flips reading order of the 2/4/6-column grid (right-to-left card sequence). No component-level RTL handling needed.
