# Component — `<PopularSubjects>` (curiculume)

Grid of subject cards (icon + name) under a centered header. Cards have an inset shadow and hover-scale + background color change.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\popular-igcse-subjects.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\curiculume\popular-igcse-subjects.tsx` |
| Arabic variant | (none — Tag direction handled via Tag component / dir attribute upstream) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box paddingX="5vw">
├── <Box><Typography popularText (headerTag)>{header HTML}</Typography></Box>
└── <Box>
    └── <Grid container spacing={2} justifyContent="center">
        {data.subjects.map((item, index) => (
          <Grid item xs=6 sm=6 md=3 lg=3 xl=2>
            <Box cardsBoxes>
              <Image icon w=40 h=40 />
              <Typography variant="caption" component="p">{item.name}</Typography>
            </Box>
          </Grid>
        ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| root | `paddingX` | 5vw | 5vw | 5vw | 5vw | 5vw |
| popularText | `textAlign` | center | center | center | center | center |
| popularText | `margin` | `0 auto 2.5vh auto` | (same) | (same) | (same) | (same) |
| Grid container | `spacing` / `justifyContent` | 2 (16px) / center | (same) | (same) | (same) | (same) |
| Grid item | column span | 6 (2 cols) | 6 | 3 (4 cols) | 3 | 2 (6 cols) |
| cardsBoxes | `background` | `#FFF` | `#FFF` | `#FFF` | `#FFF` | `#FFF` |
| cardsBoxes | `borderRadius` | 2vh | 2vh | 2vh | 2vh | 2vh |
| cardsBoxes | `boxShadow` | `0px -2.171px 6.514px 0px rgba(0, 0, 0, 0.20) inset` | (same) | (same) | (same) | (same) |
| cardsBoxes | `backdropFilter` | blur(5px) | (same) | (same) | (same) | (same) |
| cardsBoxes | `padding` | 2vh | 2vh | 2vh | 3vh | 3vh |
| cardsBoxes | `display/flexDirection/alignItems/justifyContent` | flex row, center, left | (same) | (same) | (same) | (same) |
| cardsBoxes | `columnGap` | 10px | 10px | 10px | 10px | 10px |
| cardsBoxes | `height` | 5vh | 5vh | 5vh | 5vh | 5vh |
| cardsBoxes | `transition` | all .5s ease-in-out | (same) | (same) | (same) | (same) |
| icon image | inline w/h | 40 / 40 | (same) | (same) | (same) | (same) |

### Typography

| Element | Variant | Resolves to | Weight | Color | Align | Font |
|---|---|---|---|---|---|---|
| popularText (header) | dynamic `data.headerTag` (h1-h6) | use the triplet for whichever tag — h3 default → `text-h3-mobile sm:text-h3-tablet lg:text-h3` | per heading default (700 for h1-h3, 600 for h4-h6) | (default) | center | League Spartan |
| subjects (item.name) | `variant="caption" component="p"` | 14px (`text-small`) | (caption default 400) | `#2D2D2D` | (default — within flex, no align) | League Spartan |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#FFF` | card bg | `bg-white` |
| `#2D2D2D` | subject text | `text-ink-900` |
| `#9EDCFF` | hover bg | arbitrary `hover:bg-[#9EDCFF]` |

### Animations / interactions

- `transition: all .5s ease-in-out` → `transition-all duration-500 ease-in-out`.
- `:hover { transform: scale(1.05); background: #9EDCFF }` → `hover:scale-105 hover:bg-[#9EDCFF]`.

---

## §2 Tailwind port — bug list

Audit of `tuitionalFrontend\src\components\curiculume\popular-igcse-subjects.tsx`:

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| P1 | 18 | Header: `text-h3-mobile sm:text-h3-tablet lg:text-h3` (hardcoded to h3) | MUI uses dynamic `data.headerTag` — when CMS sends `h2`, the rendered tag changes but the visual size stays at h3. **Bug**: when header is h2, port renders an `<h2>` but with h3 sizing. The MUI `<Typography variant={tag}>` applies typography for the variant. Should pass the actual variant: e.g. `headerTag === "h2"` → `text-h2-mobile sm:text-h2-tablet lg:text-h2`. | medium |
| P2 | 18 | Header `mx-auto mb-[2.5vh]` | MUI: `margin: "0 auto 2.5vh auto"` → top 0, bottom 2.5vh, x auto → `mx-auto mb-[2.5vh] mt-0` ✓ (current omits mt-0 but tw default is 0) | ok |
| P3 | 22 | Grid `grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6` | MUI Grid: `xs=6 (cols-2) sm=6 (cols-2) md=3 (cols-4) lg=3 (cols-4) xl=2 (cols-6)`. ✓ Match. | ok |
| P4 | 22 | Missing `justify-center` | MUI: `<Grid container justifyContent="center">` → add `justify-center` (or just let `justify-items-center` if you want every cell centered). Practical effect minor because cells fill. | low |
| P5 | 33 | Card: `bg-white` | ✓ Match | ok |
| P6 | 33 | Card: `p-[2vh] lg:p-[3vh]` | MUI: `{ xs: "2vh", lg: "3vh" }` → ✓ Match | ok |
| P7 | 33 | Card: `gap-2.5` (10px) | MUI: `columnGap: "10px"` → ✓ Match (10px) | ok |
| P8 | 33 | Card: `h-[5vh] lg:h-[5vh]` | MUI: `{ xs: "5vh", lg: "5vh" }` — redundant lg but ✓ | ok |
| P9 | 33 | Card: `justify-start` | MUI: `justifyContent: "left"` → ✓ `justify-start` | ok |
| P10 | 33 | Card: `rounded-[2vh]` | ✓ Match | ok |
| P11 | 33 | Card: `shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset]` | ✓ Match exact | ok |
| P12 | 33 | Card: `backdrop-blur-[5px]` | ✓ Match | ok |
| P13 | 33 | Card: `transition-all duration-500` (no easing) | MUI: `all .5s ease-in-out` → add `ease-in-out`. Tailwind default `transition-all` uses `cubic-bezier(0.4,0,0.2,1)` not ease-in-out. **Bug** — visual feel differs subtly. | low |
| P14 | 33 | Hover: `hover:scale-105 hover:bg-[#9EDCFF]` | ✓ Match | ok |
| P15 | 45 | Name: `font-heading text-caption` | MUI: `variant="caption"` → 14px = `text-small` (per token-mapping §1: "for MUI variant=caption use `text-small`"). Current uses `text-caption` (0.75rem / 12px). **Bug — text-small is 14px** | **medium** |
| P16 | 45 | Name: `font-heading` | MUI uses `leagueSpartan.className` — League Spartan is the heading font in this codebase. ✓ Acceptable; `font-heading` matches. | ok |
| P17 | 45 | Name: `text-ink-900` | MUI color `#2D2D2D` → `text-ink-900` ✓ | ok |
| P18 | 33 | `cursor-pointer` added | MUI: no cursor:pointer. Cosmetic. ✓ ok | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="px-[5vw]">
  <HeaderTag
    className={`${leagueSpartan.className} mx-auto mb-[2.5vh] text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900`}
    dangerouslySetInnerHTML={{ __html: data?.header }}
  />

  <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-4 xl:grid-cols-6">
    {data?.subjects?.map((item, index) => (
      <div
        key={index}
        className="flex h-[5vh] cursor-pointer items-center justify-start gap-2.5 rounded-[2vh] bg-white p-[2vh] backdrop-blur-[5px] shadow-[0px_-2.171px_6.514px_0px_rgba(0,0,0,0.20)_inset] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-[#9EDCFF] lg:p-[3vh]"
      >
        <Image src={item?.icon || fallbackUrl} alt="icon" width={40} height={40} />
        <p className={`${leagueSpartan.className} font-heading text-small text-ink-900`}>
          {item.name}
        </p>
      </div>
    ))}
  </div>
</div>
```

(Note: redundant `sm:grid-cols-2 lg:grid-cols-4` already implied by `grid-cols-2 md:grid-cols-4` — keep them dropped.)

If you want to honor dynamic `headerTag` typography:

```tsx
const headerSize = {
  h1: "text-h1-mobile sm:text-h1-tablet lg:text-h1",
  h2: "text-h2-mobile sm:text-h2-tablet lg:text-h2",
  h3: "text-h3-mobile sm:text-h3-tablet lg:text-h3",
  h4: "text-h4-mobile sm:text-h4-tablet lg:text-h4",
  h5: "text-h5-tablet lg:text-h5",
  h6: "text-h6",
}[HeaderTag];
```

---

## §4 Verification at 4 widths

- **375px**: 2 columns; cards 5vh tall (~33px) — small but matches MUI. Subject names 14px (`text-small`). Header h3 mobile (1.125rem).
- **768px**: still 2 columns (sm); cards 5vh; header h3 tablet (1.25rem).
- **1280px**: 4 columns (md→4); cards 5vh, padding 3vh; header h3 desktop (1.5rem).
- **1920px**: 6 columns (xl); cards 5vh padding 3vh.

---

## §5 RTL notes

- `justifyContent: "left"` on cards becomes visually "right" in RTL via Tailwind's `justify-start`. Acceptable for icon + name reading order in AR.
- Tag direction otherwise handled upstream by `dir="rtl"` on the page.
