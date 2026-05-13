# Component — `<Trusted>`

Home-page "Trusted By Students At Top Schools" section: a gradient blue→white background with a centered heading + a horizontally scrolling row of school logo boxes that auto-slide via the `slide` keyframe.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\trusted.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\trusted.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-trusted.tsx` (handled via `locale` prop) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.background}>                          gradient bg, flex col centered, w=100vw
├── <Typography component="h2" variant="h2" sx={styles.heading}>
│     "Trusted By Students At Top Schools"  ::before = lines image
└── <Box sx={styles.slideContainer}>                 w=100%, overflow hidden
    └── <Box sx={styles.slideContent}>               flex, whitespace nowrap, animation slide 20s linear infinite, mt 5vh
        └── trustedSchools.images.map → <Box>        ms 10px, bg transparent
             └── <ImageBox imageSource>              80×80 image inside a white card
                  └── <Image w=80 h=80 />

<ImageBox>:
<Box sx={styles.imageBox} className="schoolsBox">    bg white, rounded 10, flex center, h xs=107 lg=40vh, w xs=177 lg=349, maxH 190px
└── <Image w=80 h=80 />
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.background` | `background` | `linear-gradient(to bottom, #D3EFFE, rgba(255, 255, 255, 0.7))` | same | same |
| `.background` | `height` / `width` | 100% / 100vw | same | same |
| `.background` | `display` / `flexDirection` / `alignItems` / `justifyContent` | flex col center / center | same | same |
| `.background` | `marginTop` | 0vh | 0vh | 0vh |
| `.background` | `zIndex` | -2 | -2 | -2 |
| `.heading` | `color` | `#000000` | same | same |
| `.heading` | `marginTop` | 7vh | 8vh (sm), 9.5vh (md) | 10.5vh |
| `.heading` | `textAlign` / `position` | center / relative | same | same |
| `.heading` | `paddingX` | 2vw | 0vw (sm, md) | 0vw |
| `.heading::before` | `left` | 2vw | -3.5vw (sm), -3vw (md) | -35px |
| `.heading::before` | `top` | -2vh | -3vh (sm, md) | -40px |
| `.heading::before` | `height` × `width` | 100 × 100 | 100 × 100 | 100 × 100 |
| `.heading::before` | `backgroundImage` | linesmobile | linesInvert | linesInvert |
| `.slideContainer` | `width` / `overflow` / `position` | 100% / hidden / relative | same | same |
| `.slideContent` | `display` / `whiteSpace` | flex / nowrap | same | same |
| `.slideContent` | `animation` | `slide 20s linear infinite` | same | same |
| `.slideContent` | `marginTop` | 5vh | 5vh | 5vh |
| Image item wrapper `<Box>` | `marginLeft` / `background` | 10px / transparent | same | same |
| `.imageBox` | `height` | 107px | 107px | 40vh (lg) |
| `.imageBox` | `width` | 177px | 177px | 349px (lg) |
| `.imageBox` | `maxHeight` | 190px | 190px | 190px |
| `.imageBox` | `backgroundColor` / `borderRadius` | white / 10px | same | same |
| `.imageBox` | `alignItems` / `display` / `justifyContent` | center / flex / center | same | same |
| Inner `<Image>` | `width` × `height` | 80 × 80 | 80 × 80 | 80 × 80 |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading `<Typography variant="h2">` | h2 | 1.375rem | 1.75rem | 2.25rem | 700 | `#000000` | League Spartan |

### Colors

- gradient → arbitrary `bg-gradient-to-b from-[#D3EFFE] to-white/70`
- `white` (card bg) → `bg-white`
- `#000000` (heading) → `text-black`
- transparent (item wrapper bg) → `bg-transparent`

### Animations / interactions

- `.slideContent` has `animation: slide 20s linear infinite`. The Tailwind project must have `@keyframes slide` in `globals.css`. Apply as `animate-[slide_20s_linear_infinite]`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 23 | root: `-z-[2] flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3EFFE] to-white/70` | matches MUI `.background` (z -2, flex col center, w 100vw, gradient) ✓. `h-full` should be inherited; MUI `height: 100%` ✓. ✓ matches | — |
| B2 | 24 | h2: `relative mt-[7vh] text-center font-heading text-h2-mobile sm:mt-[8vh] sm:text-h2-tablet md:mt-[9.5vh] lg:mt-[10.5vh] lg:text-h2 px-[2vw] sm:px-0 text-black` | matches MUI heading (mt 7/8/9.5/10.5vh, h2 triplet, center, black, px 2vw mobile then 0). ✓ matches | — |
| B3 | 25-30 | linesMobile: `absolute -top-[2vh] left-[2vw] z-10 h-[100px] w-[100px] object-contain sm:hidden` | MUI `::before` xs: `top: -2vh, left: 2vw, height: 100, width: 100, image: linesmobile`. ✓ matches | — |
| B4 | 31-36 | linesInvert: `absolute z-10 hidden h-[100px] w-[100px] object-contain sm:-left-[3.5vw] sm:-top-[3vh] sm:block md:-left-[3vw] md:-top-[3vh] lg:-left-[35px] lg:-top-10` | MUI `::before` sm: `top: -3vh, left: -3.5vw`, md: `top: -3vh, left: -3vw`, lg: `top: -40px, left: -35px`. `lg:-top-10` = -40px ✓. ✓ matches | — |
| B5 | 40 | wrapper: `relative mt-[5vh] w-full overflow-hidden` | matches MUI `.slideContainer` + transferred mt-5vh from `.slideContent`. ✓ matches | — |
| B6 | 41 | inner: `flex animate-[slide_20s_linear_infinite] whitespace-nowrap` | matches MUI `.slideContent` (flex, nowrap, slide animation). Note: MUI `.slideContent` also has `marginTop: 5vh` which the port has moved to the outer wrapper (line 40) — visually equivalent. ✓ | — |
| B7 | 43 | item: `ms-[10px] bg-transparent` | matches MUI `marginLeft: 10px, background: transparent` (auto-flips RTL). ✓ | — |
| B8 | 60 | `.imageBox`: `schoolsBox flex h-[107px] w-[177px] max-h-[190px] items-center justify-center rounded-md bg-white lg:h-[40vh] lg:w-[349px]` | MUI: `h: { xs: 107, lg: 40vh }, w: { xs: 177, lg: 349 }, maxH: 190px, bg white, rounded 10`. `rounded-md` = 10px ✓. **Missing tablet/md states** — MUI uses only xs/lg, with sm and md inheriting xs values. ✓ matches (sm/md fall through to xs values, lg overrides). ✓ | — |
| B9 | 61 | Image: `<Image src={imageSource} width={80} height={80} alt="" />` | matches MUI `<Image width={80} height={80}>`. ✓ matches | — |

**Net assessment**: this port is virtually pixel-perfect. No fixes required.

---

## §3 Corrected Tailwind classNames

No corrections required. The port matches MUI 1:1.

## §4 Verification at 4 widths

- **375**: gradient bg full width, heading 22px center mt-7vh, px-2vw. linesMobile icon 100×100 at left-2vw top--2vh. Below: row of school logos (auto-sliding 20s, items 177×107 with 10px logo inside, ms-10px each).
- **768**: heading 28px center mt-8vh (sm) or mt-9.5vh (md). linesInvert icon 100×100 at left -3.5vw top -3vh (sm) or -3vw (md).
- **1280**: heading 36px center mt-10.5vh. linesInvert icon at left -35px top -40px. School logo boxes scale to 349×40vh (~320-400px tall).
- **1920**: same as 1280, viewport wider so more logos visible at once.

## §5 RTL notes

- AR variant (`ar-trusted.tsx`) keeps the heading textAlign center.
- Tailwind port uses `text-center` and `flex-col items-center` — direction-agnostic. ✓
- Item wrapper uses `ms-[10px]` (start margin) — auto-flips. ✓
- linesMobile/linesInvert icons use `left-[2vw]` / `-left-[3.5vw]` / `-left-[35px]` — these are **physical-left**, won't flip under `dir="rtl"`. Under RTL, the icon will sit on the visual-left of a right-aligned heading, looking visually offset. To make RTL-correct, swap to `start-[2vw]` / `-start-[3.5vw]` / `-start-[35px]`. Confirm whether MUI's `ar-trusted.tsx` mirrors them; if not, the LTR-physical placement is intentional.
- The `slide` keyframe is direction-physical (translates to the right): under `dir="rtl"` it will appear to slide in the wrong direction. Consider flipping the keyframe via `animation-direction: reverse` when RTL, or define a second keyframe `slide-rtl`.
