# Component — `StudentSays` (v1)

Video testimonials section: heading + paragraph + responsive 4-column grid of video player cards (1→2→3→4 cols at xs→sm→md→lg). Uses MUI `CardMedia component="video"`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\students-says.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\students-says.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box container (flex col centered, paddingX lg:5vw, margin xs:0 3vw / lg:0 2vh, width lg:auto)
  Typography variant=h2 — heading textAlign {xs:center, sm:center, md:start, lg:start}
  Typography variant=body2 — desc textAlign {xs:center, sm:center, md:start, lg:center}
  Grid container spacing=2
    Grid item xs=12 sm=6 md=4 lg=3
      Card sx={card} — w 100%, h xs:165px / lg:48vh, borderRadius 20px
        CardMedia component=video poster=... — same dims
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| container | paddingX | 0 | — | — | 5vw |
| container | margin | 0vh 3vw | — | — | 0vh 2vh |
| desc | width | 100% | — | — | 139vh |
| desc | padding | 2vh 0 4vh 0 | — | — | 1vh 0 3vh 0 |
| desc | textAlign | center | center | start | center |
| Grid spacing | 16px | | | |
| Grid item cols | 1 | 2 | 3 | 4 |
| card | w/h/radius | 100% / 165px / 20px | | | 100% / 48vh / 20px |

### Typography

| Text | Variant | Sizes | Font |
|---|---|---|---|
| Heading | h2 | 22/28/36px @ 700 | League Spartan |
| Paragraph | body2 | 14px all | League Spartan |

### Colors

| MUI | Tailwind |
|---|---|
| desc color `#2D2D2D` | `text-ink-900` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 10 | `mx-[3vw] flex flex-col items-center justify-center px-0 lg:mx-[2vh] lg:px-[5vw]` | matches | OK |
| B2 | 12 | heading triplet `text-h2-mobile sm:text-h2-tablet md:text-start lg:text-start lg:text-h2` | matches | OK |
| B3 | 16 | desc `text-body-mobile sm:text-body` | MUI `body2` → `text-small` (14px) — port uses 15/16px | **Med** |
| B4 | 16 | textAlign cascade `text-center md:text-start lg:text-center` | matches MUI | OK |
| B5 | 20 | `grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` | matches `xs=12 sm=6 md=4 lg=3` | OK |
| B6 | 22-29 | Heights on the WRAPPER (`h-[165px] lg:h-[48vh] overflow-hidden rounded-[20px]`); video is `block h-full w-full object-cover rounded-[20px]` | MUI sets `borderRadius:"20px"` on BOTH `Card` AND `CardMedia` | **High** |

**B6 detail** — two stacked bugs:
1. A `<video controls>` renders its native **media-controls enclosure** in a layer that ignores the element's own `border-radius` at the BOTTOM corners (Chrome). So `rounded-[20px]` on the video alone fixes the top but leaves the bottom (controls bar) square.
2. The wrapper's `overflow-hidden` only clips that if the wrapper actually bounds the video. Putting `h-[165px]/lg:h-[48vh]` on the **video** and leaving the wrapper auto-height (plus the video defaulting to `display:inline`) let the video render past the wrapper box — nothing got clipped.

Fix: put the explicit heights + `overflow-hidden rounded-[20px]` on the **wrapper**, and make the video `block h-full w-full object-cover` (so it exactly fills the bounded wrapper and `overflow-hidden` clips all four corners — controls enclosure included). Keep `rounded-[20px]` on the video too as belt-and-braces.

## §3 Corrected Tailwind classNames

```tsx
<div className="w-full px-0 py-[2vh] pb-[4vh] text-center font-heading text-small text-ink-900 md:text-start lg:w-[139vh] lg:py-[1vh] lg:pb-[3vh] lg:text-center">

{/* heights + clip on the WRAPPER; video is block + fills it. Wrapper auto-height + heights-on-video does NOT clip. */}
<div className="h-[165px] w-full overflow-hidden rounded-[20px] lg:h-[48vh]">
  <video src={poster.video} controls poster={poster.thumbnil}
    className="block h-full w-full rounded-[20px] object-cover" />
</div>
```

## §4 Verification

- 375: heading 22px center, desc 14px center, 1 col h-165px videos.
- 768: 28px center, text-start desc, 2 cols.
- 1280: 36px text-start, desc text-center w-[139vh], 4 cols h-[48vh].
- 1920: same.

## §5 RTL notes
No AR variant. `text-start`/`text-center` flip correctly.
