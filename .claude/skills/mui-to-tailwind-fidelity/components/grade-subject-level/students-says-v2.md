# Component — `StudentSaysV2`

Variant of StudentSays with a **mobile carousel** (<768px) + desktop grid (≥768px) hybrid. Adds touch-swipe handlers and dot indicators on mobile.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\students-says-v2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\students-says-v2.tsx` |
| CSS module (MUI) | `students-says-v2.module.css` (still referenced from MUI .tsx) |

## §1 MUI source — extracted properties

### Layout tree

```
Box container (flex col centered, padding 0 5vw, margin 0 2vh)
  Typography variant=h2 — heading.textAlign: start (center on mobile via media query)
  Typography variant=body2 — desc (color #2D2D2D, w 139vh, textAlign center, padding 1vh 0 3vh; mobile: w 100%, padding 2vh 0 4vh)
  if isMobile (window.innerWidth < 768):
    mobileContainer (w 100% relative overflow-hidden rounded 20px)
      mobileCarousel (display:flex, transition transform 0.3s ease-in-out, w 100%)
        each video: mobileVideoItem (min-w 100% flex-shrink 0)
          mobileCard (w 100%, h 165px, rounded 20px)
          CardMedia component=video (same)
      dotContainer (flex justify-center gap 0.5rem mt 1rem padding 0.5rem 0)
        each dot 8x8px rounded 50% bg #ddd (active: bg #38B6FF, scale 1.2)
  else:
    Grid container spacing=2 with xs=12 sm=6 md=4 lg=3 → CardMedia w 100% h 48vh
```

### Dimensions & spacing

| Element | Property | xs/mobile | sm | md | lg |
|---|---|---|---|---|---|
| container | padding | 0 3vw | 0 5vw | 0 5vw | 0 5vw |
| container | margin | 0 | 0 2vh | 0 2vh | 0 2vh |
| heading | textAlign | center | start | start | start |
| desc | width | 100% | 139vh | 139vh | 139vh |
| desc | padding | 2vh 0 4vh | 1vh 0 3vh | | |
| mobileCard | h | 165px | | | |
| desktop card | h | — | 48vh | 48vh | 48vh |
| dot | w/h | 8px / 8px | | | |

### Typography

| Element | Variant | Sizes | Font |
|---|---|---|---|
| Heading | h2 | 22/28/36px @ 700 | League Spartan |
| Desc | body2 | 14px | League Spartan |

### Colors

| MUI | Tailwind |
|---|---|
| dot bg `#ddd` | `bg-ink-300` |
| dot active `#38B6FF` | `bg-brand-500` |
| desc `#2D2D2D` | `text-ink-900` |

### Animations / interactions

- `mobileCarousel transition: transform 0.3s ease-in-out` (port uses `duration-500` — twice as slow).
- Dot scale 1.2 on active state.
- Hover on inactive dot: `bg-#38B6FF` with `opacity: 0.7`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 54 | container `mx-[3vw] flex flex-col items-center justify-center px-0 lg:mx-[2vh] lg:px-[5vw]` | matches | OK |
| B2 | 56 | heading triplet `text-h2-mobile sm:text-h2-tablet md:text-start lg:text-start lg:text-h2` | matches | OK |
| B3 | 60 | desc `text-body-mobile sm:text-body` | MUI body2 → `text-small`. | Med |
| B4 | 76 | mobile carousel `transition-transform duration-500` | MUI 0.3s = `duration-300` | Med |
| B5 | 80 | mobile slide `w-full shrink-0 px-2` | MUI has no horizontal padding on `mobileVideoItem` (port adds `px-2`). | Low (port enhancement) |
| B6 | 86 | mobile video `h-[200px] w-full` | MUI `h-165px` | **Med** — 35px taller |
| B7 | 101 | dot inactive `bg-ink-300` | MUI `#ddd` ~ `bg-ink-300` (`#dddddd` ≈) | OK |
| B8 | 102 | dot active `bg-brand-500` | matches | OK |
| B9 | 102 | dot active missing `scale-[1.2]` | MUI `.dotActive { transform: scale(1.2) }` | Low |
| B10 | 111 | desktop grid `grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4` | MUI uses `xs=12 sm=6 md=4 lg=3` → 1→2→3→4. Port starts at 2 cols at base. | **Med** — base is 2 cols instead of 1 (but port also has the mobile carousel that pre-empts this for <768px) |
| B11 | 118 | desktop video `h-[200px] w-full lg:h-[48vh]` | MUI lg 48vh ✓ but tablet 200px instead of 48vh from sm onwards | Low — only affects 768-1199 band |

## §3 Corrected Tailwind classNames

```tsx
// desc — use text-small
<div className="w-full px-0 py-[2vh] pb-[4vh] text-center font-heading text-small text-ink-900 md:text-start lg:w-[139vh] lg:py-[1vh] lg:pb-[3vh] lg:text-center">

// mobile carousel transition
<div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>

// mobile video
<video src={video.video} controls poster={video.thumbnil} className="h-[165px] w-full" />

// active dot — add scale
className={cn(
  "h-2 w-2 rounded-full transition-all",
  index === currentIndex ? "bg-brand-500 scale-[1.2]" : "bg-ink-300",
)}

// desktop grid — start at 1 col
<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
```

## §4 Verification

- **375**: mobile carousel branch (isMobile=true), 1 slide visible, h-[165px], dots below.
- **768**: isMobile=false flips to desktop grid. Should be 3 cols at md.
- **1280**: 4 cols, h-[48vh].
- **1920**: same as lg.

## §5 RTL notes

No AR variant; touch handlers are direction-agnostic. The carousel `translateX(-Nx100%)` assumes LTR direction. In RTL, slide direction should reverse — either swap the sign or use `transform: translateX(${currentIndex * 100}%)` when `dir="rtl"`. Port and MUI both ignore this.
