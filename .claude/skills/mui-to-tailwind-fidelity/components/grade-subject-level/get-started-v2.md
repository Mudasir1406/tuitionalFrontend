# Component — `GetStartedV2`

V2 variant of `GetStarted` with hardcoded 3-step data (Get Started / Meet Your Mentor / Take The Leap), a custom touch-swipe carousel on mobile/tablet (no Swiper.js), and a desktop grid identical to v1.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\get-started-v2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\get-started-v2.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer)
  Typography variant=h1 component=p              "Get Started in 3 Easy Steps!"  (same heading sx as v1)
  Box lg:flex only                                desktop grid
    Grid container spacing=3 → xs=12 sm=12 md=6 lg=4 items
      GetStartedBox
  Box xs/sm/md:flex lg:none                       mobile custom carousel
    Box .carouselContainer (touch handlers; w 100% maxW 320px; padding 1rem; minH 320px; flex center; mx auto)
      × N Box .slideItem (display: index===current ? flex : none; absolute inset-0)
        Box .cardContainer (minW/maxW 280px; bg #E3F2FD; p 1rem; radius 12px; flex col items-center; shadow; border)
          Box .imageBox (w 200px; h xs:100 / sm-md:150)
            Image 200×200 object-contain
          Typography h4 strong .boxHeading
          Typography body2 p .boxDesc
          PopUpButton .containedBtn
    Box .dotsContainer (flex justify-center gap 0.5rem mt 1.5rem pb 1rem)
      × N Box .dot (8×8 round; bg current=#38B6FF else #ddd; cursor)
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| heading | (same as v1) — see [get-started.md](./get-started.md) §1 | |
| `.carouselContainer` | width / maxWidth / minHeight / padding / mx | 100% / 320px / 320px / 1rem / auto |
| `.cardContainer` | minWidth / maxWidth | 280px / 280px |
| `.cardContainer` | bg | `#E3F2FD` |
| `.cardContainer` | padding | 1rem (=16px) |
| `.cardContainer` | borderRadius | 12px |
| `.cardContainer` | boxShadow | `0 2px 12px rgba(0,0,0,0.08)` |
| `.cardContainer` | border | `1px solid #f0f0f0` |
| `.cardContainer` | transition | `all 0.3s ease` |
| `.imageBox` (mobile card) | width / height | 200px / xs:100 sm:150 md:150 |
| `.boxHeading` / `.boxDesc` | text-align / margin | center / **0** (commented out!) |
| `.dotsContainer` | mt / gap / pb | 1.5rem (24px) / 0.5rem (8px) / 1rem (16px) |
| `.dot` | w × h | 8 × 8 |
| `.dot` | bg | active `#38B6FF` else `#ddd` |
| `.dot` | borderRadius | 50% |
| `.containedBtn` (button) | same as v1 — width 249px, p 18px, bg #38B6FF, radius 10px, shadow `1px 15px 34px 0px #38B6FF66`, mt 2vh 0 | |
| `.contanier` (desktop GetStartedBox) | minWidth | xs:280 sm:300 lg:80% |
| `.contanier` | maxWidth | xs:280 sm:300 lg:350 |
| `.contanier` | bg | `#D7F0FF` |
| `.contanier` | padding | `15px 20px` |
| `.contanier` | margin | `10px auto` |
| `.contanier` | borderRadius | xs:12 sm:12 lg:10 |
| `.imageBox` (desktop) | width | 200 |
| `.imageBox` (desktop) | height | xs:100 sm:150 md:150 |

### Typography

Same as [get-started.md](./get-started.md) §1.

### Animations / interactions

- Auto-advance every 5000ms.
- Touch swipe: distance > 50px advances; < -50px previous.
- Slide transition: instant in MUI (`display: none/flex`). No `translateX` animation.
- Dot transition: `all 0.3s ease`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 67 | Heading same as v1 — has same bugs around mobile `ps`, decoration position. | (see get-started.md) | (carry over) |
| B2 | 84 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | MUI md=6 lg=4 → should be `md:grid-cols-2 lg:grid-cols-3`. Same breakpoint inversion as v1. | **High** |
| B3 | 98-100 | Uses CSS `translateX(-currentIndex * 100%)` transition for slide animation | MUI uses `display: none/flex` (instant cut). Port adds 300ms animation that MUI doesn't have. | **Low** — visual enhancement that diverges from MUI |
| B4 | 103 | mobile card wrapper `w-full shrink-0 px-6` | MUI `.cardContainer { minW/maxW 280px }` — port allows full-width slides while MUI caps cards at 280px wide. | **Med** — cards are wider on mobile |
| B5 | 104 | `rounded-xl border border-ink-100 bg-[#E3F2FD] p-4 shadow-card` | MUI: `border-radius: 12px` (`rounded-xl` = 24px in Tailwind ❌), `border: 1px solid #f0f0f0`, `shadow: 0 2px 12px rgba(0,0,0,0.08)`. Port uses `rounded-xl` (24px not 12px). Tailwind `rounded-xl` = 24px per config. | **Med** — corners 2x too round |
| B6 | 105 | `h-[200px] w-[200px]` | MUI `.imageBox { width:200, height: xs:100 sm:150 md:150 }` — port pins height 200 across all breakpoints. | **Med** — image box too tall on mobile (200 vs 100) |
| B7 | 114 | `my-2 font-heading text-h4 text-ink-900` | MUI variant=h4 → `text-h4-mobile sm:text-h4-tablet lg:text-h4`. `boxHeading` margin is COMMENTED OUT in MUI (= 0). Port adds `my-2`. | **Med** — adds extra spacing MUI doesn't have |
| B8 | 117 | `my-2 text-center font-heading text-small text-ink-700` | MUI body2 → `text-small` ✓. Margin commented out → should be 0. Port `my-2` (=8px) extra. | **Low** |
| B9 | 123 | mobile button `px-[18px] py-3 ...` (no fixed width) | MUI button has `width: 249px` always. Port lets button auto-size. | **Med** |
| B10 | 131-145 | dots: active `h-3 w-8` (pill) vs inactive `h-3 w-3`; gap 3 (=12px); mt 6 (=24px); pb 6 (=24px); colors `bg-brand-500` / `bg-brand-200` | MUI dots: 8×8 round always; gap 0.5rem (=8px) → `gap-2`; mt 1.5rem (=24px) → `mt-6` ✓; pb 1rem (=16px) → `pb-4`; colors `#38B6FF` / `#ddd`. **Port redesigns dots as pill indicators** which MUI doesn't have. | **High** — dots visually different |
| B11 | 167-188 | Desktop card same as v1 with `h-[250px] w-[300px]` image box | MUI V2 desktop `.imageBox { width:200; height: xs:100 sm:150 md:150 }` — much smaller than v1. Also `.contanier { minW/maxW: xs 280 sm 300 lg 80%/350 }`, `padding: 15px 20px`, `borderRadius: xs 12 sm 12 lg 10`. Port still uses v1 dims (300×250 image, w-4/5 xl-400). | **High** — desktop card sizing differs entirely from v1 |
| B12 | 167 | `px-[30px] py-[10px] rounded-md bg-brand-50` | MUI: `padding: 15px 20px` (`px-5 py-[15px]`), `border-radius: 10px` (=`rounded-md` ✓), bg `#D7F0FF` ✓ | **Med** — padding wrong |
| B13 | 177 | desktop heading `text-h4` (no responsive triplet) | should be `text-h4-mobile sm:text-h4-tablet lg:text-h4` | **Med** |
| B14 | 180 | desktop desc `text-body` | MUI variant=body2 → `text-small` | **Med** |

## §3 Corrected Tailwind classNames

```tsx
{/* Headline — same as v1 corrected */}
<p className="relative mb-5 mt-[70px] ps-[8px] text-center font-heading text-h1-mobile text-ink-900 sm:mt-20 sm:ps-5 sm:text-h1-tablet md:mt-[95px] md:ps-5 lg:mt-[75px] lg:ps-0 lg:text-h1">
  ...
</p>

{/* Desktop grid — fix breakpoint */}
<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {data.map((item, index) => <DesktopCard key={index} {...item} />)}
</div>

{/* Mobile card */}
<div className="flex w-full max-w-[280px] flex-col items-center rounded-[12px] border border-[#f0f0f0] bg-[#E3F2FD] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] mx-auto">
  <div className="flex h-[100px] w-[200px] items-center justify-center sm:h-[150px] md:h-[150px]">
    <Image src={item.image} alt="" width={200} height={200} className="h-full w-full object-contain" />
  </div>
  <strong className="font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4">{item.heading}</strong>
  <p className="text-center font-heading text-small text-ink-700">{item.description}</p>
  <PopUpButton href="popup" text={item.ButtonText}
    className="my-[2vh] w-[249px] rounded-[10px] bg-brand-500 p-[18px] font-bold leading-[18.4px] tracking-[-0.02em] text-white shadow-[1px_15px_34px_0px_#38B6FF66] hover:bg-brand-500" />
</div>

{/* Dots — 8×8 round, gap-2, mt-6, pb-4 */}
<div className="mt-6 flex items-center justify-center gap-2 pb-4">
  {data.map((_, index) => (
    <button key={index} type="button" onClick={() => setCurrentIndex(index)}
      className={cn(
        "h-2 w-2 rounded-full transition-all duration-300",
        index === currentIndex ? "bg-brand-500" : "bg-[#ddd]"
      )}
      aria-label={`Slide ${index + 1}`}
    />
  ))}
</div>

{/* Desktop card */}
const DesktopCard: React.FC<CardProps> = ({ heading, description, image, ButtonText }) => (
  <div className="mx-auto my-[10px] flex h-auto w-full min-w-[280px] max-w-[280px] flex-col items-center rounded-[12px] bg-brand-50 px-5 py-[15px] sm:min-w-[300px] sm:max-w-[300px] sm:rounded-[12px] lg:w-4/5 lg:min-w-[80%] lg:max-w-[350px] lg:rounded-md">
    <div className="flex h-[100px] w-[200px] items-center justify-center sm:h-[150px] md:h-[150px]">
      <Image src={image} alt="" width={200} height={200} className="h-full w-full object-contain" />
    </div>
    <strong className="text-center font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4">{heading}</strong>
    <p className="text-center font-heading text-small text-ink-700">{description}</p>
    <PopUpButton href="popup" text={ButtonText}
      className="my-[2vh] w-[249px] rounded-[10px] bg-brand-500 p-[18px] font-bold leading-[18.4px] tracking-[-0.02em] text-white shadow-[1px_15px_34px_0px_#38B6FF66] hover:bg-brand-500" />
  </div>
);
```

## §4 Verification at 4 widths

- **375**: heading h1-mobile, mobile carousel single slide w/ max-w 280px, image-box 100px tall, 3 round dots 8×8.
- **768**: heading h1-tablet, mobile carousel still active (lg:hidden ends at 1200), image-box 150px tall.
- **1280**: desktop grid 3 cols with V2 cards (px-5 py-[15px], image 200×150).
- **1920**: same as lg.

## §5 RTL notes

- Same heading decoration position concern as v1 — `left` doesn't flip.
- Touch swipe handlers use `clientX` absolute — fine for both directions.
- `translateX(-currentIndex * 100%)` (if kept) needs to be `translateX(currentIndex * 100%)` in RTL or use `inset-inline-start` math.
- Dots are direction-agnostic.
