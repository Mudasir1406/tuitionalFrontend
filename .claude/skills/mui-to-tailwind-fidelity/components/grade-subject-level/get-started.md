# Component — `GetStarted` (3-step CTA)

"Get Started in 3 Easy Steps!" headline with a decorative `lines-invert.png` doodle on top, followed by three step cards (image + heading + description + "Book a Demo" button). Desktop = 3-col `<Grid>`; tablet/mobile = Swiper carousel with arrow controls.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\get-started.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\get-started.tsx` |
| Arabic variant | `ar-get-started.tsx` (Tailwind side) |

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer)
  Typography variant=h1 component=p          "Get Started in 3 Easy Steps!"  (h1 with ::before decoration)
  Box lg:flex only (desktop grid)
    Grid container spacing=3 justify=center
      × N   Grid item xs=12 sm=12 md=6 lg=4
        GetStartedBox
  Box xs/sm/md:flex lg:none (mobile/tablet swiper)
    Swiper pagination clickable spaceBetween=20 centered loop autoplay 5000ms breakpoints
      Box arrowDiv leftDiv (only xs flex, sm none) → ArrowLeftRounded large
      Box arrowDiv rightDiv (only xs flex, sm none) → ArrowRightRounded large
      SwiperSlide × N  → GetStartedBox

GetStartedBox:
  Box .contanier (sic) (h auto, w lg 80% / xl 400px, bg #D7F0FF, p 10px 30px, m 10px auto, radius 10px, flex col items-center)
    Box .imageBox (w 300px, h xs 150 sm 250 md 250, flex center)
      Image 300×300 object-contain
    Typography variant=h4 component=strong .boxHeading (text-center my 2vh)
    Typography variant=body2 component=p .boxDesc (text-center my 2vh)
    PopUpButton .containedBtn
```

### Dimensions & spacing

| Element | Property | Mobile (xs) | sm (≥600) | md (≥900) | lg (≥1200) |
|---|---|---|---|---|---|
| heading | marginTop | 70px | 80px | 95px | 75px |
| heading | marginBottom | 20px | 20px | 20px | 20px |
| heading | paddingLeft | 1 (=8px) | 5 (=40px) | 5 (=40px) | 0 |
| heading | textAlign | center | center | center | center |
| heading::before bg | image | linesMobile | linesInvert | linesInvert | linesInvert |
| heading::before left | | 10% | 10% | 23% | 29% |
| heading::before top | | -20 | -40 | -40 | -40 |
| heading::before w × h | | 50×50 | 43×35 | 43×35 | 43×35 |
| Grid spacing | (=24px gap both axes) | n/a | n/a | n/a | 24px |
| Grid container | display | none | none | none | flex |
| Swiper container | display | flex | flex | flex | none |
| Swiper spaceBetween | | 20 (override 10 at 320/520/700/1040) | | | |
| Swiper slidesPerView | | 1 / 1 / 2 / 3 (at 320/520/700/1040) | | | |
| arrowDiv | display | flex | none | none | none |
| arrowDiv | bg | lightGray | | | |
| arrowDiv | w × h | 40 × 40 | | | |
| arrowDiv | border-radius | 50px | | | |
| leftDiv / rightDiv | position | absolute top:50% left/right:10px translateY(-50%) | | | |
| `.contanier` (GetStartedBox) | width | (auto) | (auto) | (auto) | 80% / xl 400px |
| `.contanier` | padding | 10px 30px | same | same | same |
| `.contanier` | margin | 10px auto | same | same | same |
| `.contanier` | bg | #D7F0FF | | | |
| `.contanier` | border-radius | 10px | | | |
| `.imageBox` | width | 300px | 300 | 300 | 300 |
| `.imageBox` | height | 150px | 250 | 250 | (250 implicit, md applies; lg has no override → 250) |
| `.boxHeading` | margin | 2vh 0 | | | |
| `.boxDesc` | margin | 2vh 0 | | | |
| `.containedBtn` (button) | bg | #38B6FF | | | |
| `.containedBtn` | color | white | | | |
| `.containedBtn` | padding | 18px | | | |
| `.containedBtn` | width | 249px | | | |
| `.containedBtn` | margin | 2vh 0 | | | |
| `.containedBtn` | line-height | 18.4px | | | |
| `.containedBtn` | letter-spacing | -2% | | | |
| `.containedBtn` | border-radius | 10px | | | |
| `.containedBtn` | box-shadow | `1px 15px 34px 0px #38B6FF66` | | | |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Headline | `h1` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | League Spartan |
| "3" span | inherit | inherit | inherit | inherit | inherit | inherit (color #38B6FF) |
| Box heading | `h4` | 1rem | 1.125rem | 1.25rem | 600 | League Spartan |
| Box desc | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Button | `<Button>` default | 0.9375rem | 1rem | 1rem | 500 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| `#38B6FF` | `text-brand-500` / `bg-brand-500` |
| `#D7F0FF` | `bg-brand-50` |
| lightGray (arrow bg) | `bg-ink-200` |
| `#38B6FF66` shadow | arbitrary `shadow-[1px_15px_34px_0px_#38B6FF66]` |

### Animations

Swiper autoplay 5000ms; pagination dots; loop when length≥3. No CSS animations on hover.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 33 | `text-h1-mobile sm:text-h1-tablet lg:text-h1` ✓ | matches | OK |
| B2 | 33 | `mt-[70px] sm:mt-20 (=80) md:mt-[95px] lg:mt-[75px]` ✓ | matches | OK |
| B3 | 33 | `mb-5` (=20px) ✓ | matches | OK |
| B4 | 33 | `sm:ps-5 md:ps-5 lg:ps-0` (no `ps-1` mobile) | MUI mobile `paddingLeft: 1` (=8px). Port omits. | **Low** — 8px missing on mobile |
| B5 | 38, 40 | `::before` decoration done via two `<Image>` tags (mobile/desktop) instead of MUI `::before backgroundImage`. Sizes: mobile `h-[50px] w-[50px] left-[10%] -top-5` ✓; desktop `h-[35px] w-[43px] sm:-top-10 sm:left-[10%] md:left-[23%] lg:-top-[30px] lg:left-[33%]` | MUI: mobile 50×50 left 10% top -20 ✓; desktop 43×35 with left 10%/23%/29% and top -40 sm/md/lg. Port has `lg:left-[33%]` (MUI=29%) and `lg:-top-[30px]` (MUI=-40px). | **Med** — desktop decoration position drifts |
| B6 | 50 | `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3` | MUI `<Grid item xs=12 sm=12 md=6 lg=4 spacing=3>` → 1 col xs/sm, 2 cols md, 3 cols lg. Port has `sm:grid-cols-2` (=600px) instead of `md:grid-cols-2` (=900px). Breakpoint inversion. | **High** — splits to 2 cols 300px too early |
| B7 | 49 | `hidden ... lg:flex` ✓ | matches MUI desktop-only display rule | OK |
| B8 | 57 | `flex flex-row lg:hidden` ✓ | matches MUI mobile/tablet display rule | OK |
| B9 | 61, 69 | Arrows `flex h-10 w-10 ... rounded-full bg-ink-200 sm:hidden` | matches MUI `arrowDiv { 40×40 bg lightGray; display: xs flex / sm none }` ✓ | OK |
| B10 | 64 | `<ArrowLeft size={24}>` from lucide-react | MUI uses `<ArrowLeftRounded fontSize="large">` (≈35px). Lucide is a NEW DEPENDENCY. | **Critical** — replace with MUI icon or inline SVG; check that fontSize matches "large" ≈35px |
| B11 | 107 | `mx-auto my-[10px] flex h-auto w-full flex-col items-center rounded-md bg-brand-50 px-[30px] py-[10px] lg:w-4/5 xl:w-[400px]` | matches MUI `.contanier` ✓ | OK |
| B12 | 108 | `h-[150px] w-[300px] ... sm:h-[250px] md:h-[250px]` | matches `.imageBox { w:300, h: xs:150 sm:250 md:250 }` ✓ | OK |
| B13 | 117 | heading `text-h4 text-ink-900` | MUI variant=h4 → `text-h4-mobile sm:text-h4-tablet lg:text-h4`. Port uses only `text-h4` (desktop size on all breakpoints). | **Med** — heading sizing doesn't shrink on mobile |
| B14 | 118 | desc `text-body text-ink-700` | MUI variant=body2 → `text-small` (0.875rem). Port uses `text-body` (1rem). | **Med** — desc is 1px too big on mobile, 2px too big on desktop |
| B15 | 122 | button `w-[249px] rounded-[10px] bg-brand-500 p-[18px] ... shadow-[1px_15px_34px_0px_#38B6FF66]` | MUI: `width:249px; p:18px; bg:#38B6FF; color:white; border-radius:10px; line-height:18.4px; letter-spacing:-2%; margin:2vh 0; shadow ✓`. Port matches except missing letter-spacing (`-tracking-[0.02em]` ✓ — port has `tracking-[-0.02em]` ✓). Looks OK. | OK |
| B16 | 122 | (`my-[2vh]` is on button) | matches | OK |
| B17 | 6 | lucide-react import (icons) | NEW DEPENDENCY | **Critical** |

## §3 Corrected Tailwind classNames

```tsx
{/* Headline */}
<p className="relative mb-5 mt-[70px] ps-[8px] text-center font-heading text-h1-mobile text-ink-900 sm:mt-20 sm:ps-5 sm:text-h1-tablet md:mt-[95px] md:ps-5 lg:mt-[75px] lg:ps-0 lg:text-h1">
  <Image src={linesMobile} alt="" aria-hidden="true"
    className="absolute -top-5 left-[10%] z-10 h-[50px] w-[50px] object-contain sm:hidden" />
  <Image src={linesInvert} alt="" aria-hidden="true"
    className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:left-[10%] sm:block md:left-[23%] lg:-top-10 lg:left-[29%]" />
  Get Started in <span className="text-brand-500">3</span> Easy Steps!
</p>

{/* Desktop grid: 1 / 2 / 3 cols at xs/md/lg */}
<div className="mx-auto hidden w-[90%] lg:flex">
  <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {data?.map(...)}
  </div>
</div>

{/* Card heading + desc with proper variant tokens */}
<strong className="my-[2vh] text-center font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4">{heading}</strong>
<p className="my-[2vh] text-center font-body text-small text-ink-700">{description}</p>
```

Swap lucide arrows for MUI's `ArrowLeftRounded`/`ArrowRightRounded` (Tailwind side already imports `@mui/icons-material` elsewhere — verify) or inline SVG. Use `text-[35px]` size to match `fontSize="large"`.

## §4 Verification at 4 widths

- **375**: heading text-h1-mobile (28px), mt 70px, ps 8px; mobile decoration `linesMobile` 50×50 at left 10% top -20px; **Swiper visible**, 1 slide per view.
- **768**: heading text-h1-tablet (36px), mt 80px; **Swiper visible**, 2 slides per view (breakpoint 700px applies).
- **1280**: heading text-h1 (48px), mt 75px; **Desktop grid visible**, 3 cols; cards w 80% / xl 400px.
- **1920**: same as lg.

## §5 RTL notes

- `ar-get-started.tsx` exists in Tailwind side. Heading text is RTL-flipped (Arabic translation of "Get Started…").
- `::before` decoration position: MUI uses `left: …%` which DOES NOT flip in RTL. AR version should mirror to `right`. Tailwind `left-[X%]` does NOT flip; use `start-[X%]` (logical) or write a separate AR component.
- Swiper has built-in `dir="rtl"` mode — pass it from parent. Arrow positions auto-flip with `start-[10px]` / `end-[10px]`.
- Card content is centered → direction-agnostic.
