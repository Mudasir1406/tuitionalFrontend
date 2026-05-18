# Component — `<GetStarted>`

Home-page "How to Get Started" section: a centered heading with `linesInvert` decorative icon, then either (a) a 3-column responsive grid of step cards on desktop (lg+) or (b) a Swiper carousel below lg. Each card shows an illustration, an h4 step title, a body paragraph, and a "Get Started" CTA.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\get-started.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\get-started.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-get-started.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box>
├── <Typography component="h2" variant="h2" sx={styles.heading}>
│     How to Get Started
│     ::before → linesMobile (xs) or linesInvert (sm+)
├── <Box sx={styles.getStarted}>            (lg+ only, flex row)
│   └── <Grid container>
│        └── data.map → <Grid item xs=12 sm=12 md=6 lg=4>
│                       └── <GetStartedBox …/>
└── <Box sx={styles.swiperContanier}>       (<lg only, swiper carousel)
    └── <Swiper breakpoints autoplay pagination loop>
         └── <SwiperSlide style={styles.slide}>
                <GetStartedBox …/>

<GetStartedBox>:
<Box sx={styles.contanier}>                 bg #D7F0FF, rounded 10px, p 10px, m 10px (lg)
├── <Box w=100% maxW=300>
│   └── <Image w=300 h={isLg ? 300 : 280}>
├── <Typography component="strong" variant="h4" sx={styles.boxHeading}>  centered, mt/mb 16px
├── <Typography variant="body2" sx={styles.boxDesc}>                     centered, mb 24px
└── <PopUpButton sx={styles.containedBtn}>                               w=249px, p 18px, mb 36px, rounded 10px
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.heading` | `textAlign` | center | center | center |
| `.heading` | `marginBottom` | 20px | 20px | 20px |
| `.heading` | `paddingLeft` | 1 (=8px) | 5 (=40px) (sm/md) | 0 |
| `.heading::before` | `left` | 14% | 18% (sm), 36% (md) | 36% (carries lg unset → md) |
| `.heading::before` | `top` | -20 | -40 (sm/md) | -40 |
| `.heading::before` | `height` × `width` | 50px × 50px (BOX size) | 35px × 43px | 35px × 43px |
| `.heading::before` | `backgroundImage` | linesMobile | linesInvert | linesInvert |

> **xs trap**: the `::before` BOX is 50×50, but MUI uses `background-repeat: no-repeat` with **no `background-size`** → the image renders at its **natural size** (linesMobile.png ≈ 20×19px), top-left-anchored inside the 50px box. The 50px is just positioning slack. A Tailwind `<Image>` port must NOT use `h-[50px] w-[50px] object-contain` — that scales the ~20×19 squiggle up 2.5× and it overlaps the heading text. Use `h-[19px] w-5` (same natural size the `why-choose-tuitional` port uses for the same asset).
| `.swiperContanier` | `display` | block | block (md block) | none (lg) |
| `.swiperContanier` | `overflow` | hidden | hidden | (n/a) |
| `.swiperContanier` | `paddingBottom` / `width` | 40px / 100% | same | (n/a) |
| `.getStarted` | `display` | none | none (md none) | flex (lg) |
| `.getStarted` | `flexDirection` | row | row | row |
| `<Grid container>` | (no spacing prop) | spacing 0 | spacing 0 | spacing 0 |
| `<Grid item>` span | (only renders at lg) | (n/a) | (n/a) | 4/12 (lg) |
| `.contanier` (GetStartedBox) | `height` | auto | auto | auto |
| `.contanier` | `width` | 100% (xs) | 100% | auto (lg) |
| `.contanier` | `backgroundColor` | `#D7F0FF` | same | same |
| `.contanier` | `padding` / `margin` | 10px / 0 | 10px / 0 | 10px / 10px (lg) |
| `.contanier` | `borderRadius` | 10px | 10px | 10px |
| `.contanier` | `display` / `flexDirection` / `alignItems` | flex col center | same | same |
| Image wrapper | `width` / `maxWidth` | 100% / 300 | same | same |
| Image | `width` × `height` | 300 × 280 | 300 × 280 | 300 × 300 (lg) |
| Image | `objectFit` / `height auto` | cover, h auto | same | same |
| `.boxHeading` | `textAlign` / `marginTop` / `marginBottom` | center / 16px / 16px | same | same |
| `.boxDesc` | `textAlign` / `marginBottom` | center / 24px | same | same |
| `.containedBtn` (PopUpButton) | `width` | 249px | 249px | 249px |
| `.containedBtn` | `padding` | 18px | 18px | 18px |
| `.containedBtn` | `borderRadius` / `marginBottom` | 10px / 36px | same | same |
| `.containedBtn` | `backgroundColor` / `color` | `#38B6FF` / white | same | same |
| `.containedBtn` | `boxShadow` | `1px 15px 34px 0px #38B6FF66` | same | same |
| `.containedBtn` | `textTransform` / `letterSpacing` | none / -2% | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Section heading | h2 | 1.375rem | 1.75rem | 2.25rem | 700 | (not specified — inherits default `#000`) | League Spartan |
| Card heading `<Typography component="strong" variant="h4">` | h4 | 1rem (16px) | 1.125rem (18px) | 1.25rem (20px) | 600 | (inherits) | League Spartan |
| Card description `<Typography variant="body2">` | body2 | 0.875rem | 14px | 14px | 400 | (inherits) | League Spartan |
| Button label | inline (PopUpButton sx) | (not specified — uses MUI Button default 15px/16px) | | | 700 (Button default) | white | League Spartan |

### Colors

- `#D7F0FF` → `bg-brand-50` (card)
- `#38B6FF` → `bg-brand-500` (CTA)
- `#38B6FF66` → in shadow: `shadow-[1px_15px_34px_0px_#38B6FF66]`
- Heading color: default black (no override)

### Animations / interactions

- Swiper: `autoplay` delay 3000ms, `pagination dynamicBullets`, `loop` when `data.length >= 3`.
- Card hover: no specified hover effects (button keeps same bg).

---

## §2 Tailwind port — bug list

| # | Line | Current className | Expected | Severity |
|---|---|---|---|---|
| B1 | 35 | h2: `relative mb-5 ps-1 text-center font-heading text-h2-mobile sm:ps-5 sm:text-h2-tablet md:ps-5 lg:ps-0 lg:text-h2 text-black` | MUI: paddingLeft `xs=1 (8px), sm=5 (40px), md=5 (40px), lg=0`. The `ps-1` = 4px, **not 8px** — Tailwind's `ps-1` is 4px. Should be `ps-2` (8px). `sm:ps-5` = 20px in Tailwind, **not 40px**. Should be `sm:ps-10` (40px) and `md:ps-10`. | high |
| B2 | 35 | `mb-5` (20px) | matches MUI `marginBottom: 20px` ✓ | — |
| B3 | 36-41 | linesMobile: `absolute -top-5 left-[14%] z-10 h-[19px] w-5 object-contain sm:hidden` | MUI xs `::before` box is 50×50 but `background-size` is unset → image at NATURAL size (~20×19). `h-[50px] w-[50px] object-contain` scales it up 2.5× → **overlaps the heading**. Correct: `h-[19px] w-5`. `-top-5` (-20px) & `left-[14%]` match MUI. | **High** (was wrongly marked OK) |
| B4 | 42-47 | linesInvert: `absolute z-10 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:left-[18%] sm:block md:left-[36%]` | MUI sm+: `top: -40`, `left: 18%` (sm), `36%` (md). 35×43. ✓ matches | — |
| B5 | 49 | accent span: `text-brand-500` | MUI has no accent span — the heading is one `<Typography>` with no inner span. The Tailwind port introduces a `{accent && <span>}` for an i18n accent that doesn't exist in MUI. Acceptable if `home.get_started.heading_accent` is empty in EN. | low |
| B6 | 53 | desktop grid wrapper: `hidden flex-row lg:flex` | MUI `.getStarted` is `display: { xs: "none", lg: "flex" }, flexDirection: "row"`. ✓ matches | — |
| B7 | 54 | grid: `grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3` | **Wrong breakpoints**: MUI `<Grid item xs=12 sm=12 md=6 lg=4>` → 1 col (xs/sm), 2 cols (md=900), 3 cols (lg=1200). But the entire `.getStarted` parent is `display: none` until lg, so md=6 never visibly applies. The desktop branch only renders at lg+, so this grid should be **only `grid grid-cols-3`** (always 3-col when visible). Current `sm:grid-cols-2 md:grid-cols-2` is dead code (parent hidden until lg). Simplify to `grid grid-cols-3`. | low (dead code, visually identical) |
| B8 | 61 | mobile swiper wrapper: `block w-full overflow-hidden pb-10 lg:hidden` | MUI `.swiperContanier`: `display: { xs: "block", sm: "block", md: "block", lg: "none" }, overflow: hidden, paddingBottom: 40px, width: 100%`. `pb-10` = 40px ✓. ✓ matches | — |
| B9 | 97 | card root: `m-1 flex h-auto w-full flex-col items-center rounded-md bg-brand-50 p-[10px] lg:m-[10px] lg:w-auto` | MUI `.contanier`: `padding: 10px, margin: { lg: 10px }, borderRadius: 10px, bg #D7F0FF`. `m-1` = 4px on mobile is invented (MUI has no margin until lg). Should be `m-0 lg:m-[10px]`. `rounded-md` = 10px ✓. ✓ partial. | med |
| B10 | 98 | image wrapper: `flex w-full max-w-[300px] items-center justify-center` | matches MUI ✓ | — |
| B11 | 103 | Image: `width=300, height=300` (no responsive) | MUI uses media query `theme.breakpoints.up("lg")` to set `height: 300` (lg+) vs `280` (below). Port hardcodes 300. Visually invisible since Image scales via CSS to `h-auto w-full`. ✓ acceptable | — |
| B12 | 104 | Image className: `h-auto w-full object-cover` | matches MUI inline style ✓ | — |
| B13 | 107 | `<strong>`: `mt-4 mb-4 block text-center font-heading text-h4-mobile lg:text-h4` | MUI: variant h4 = 16/18/20px. Port uses `text-h4-mobile lg:text-h4` (16/20). **Missing `sm:text-h4-tablet`** (18px on 600-1199). | med |
| B14 | 110 | `<p>`: `mb-6 text-center font-heading text-small` | MUI `.boxDesc`: `marginBottom: 24px, textAlign: center`. body2 = 14px. `mb-6` = 24px ✓. `text-small` = 14px ✓. ✓ matches | — |
| B15 | 114 | PopUpButton className: `mb-9 w-[249px] rounded-[10px] bg-brand-500 p-[18px] text-button-mobile font-bold tracking-[-0.02em] text-white sm:text-button shadow-[1px_15px_34px_0px_#38B6FF66] hover:bg-brand-500` | MUI `.containedBtn`: `marginBottom: 36px, width: 249px, padding: 18px, borderRadius: 10px, bg #38B6FF, color white, boxShadow #38B6FF66, textTransform none, letterSpacing -2%`. `mb-9` = 36px ✓. ✓ matches | — |

---

## §3 Corrected Tailwind classNames

| From | To |
|---|---|
| Line 35: `ps-1 … sm:ps-5 … md:ps-5 … lg:ps-0` | `ps-2 … sm:ps-10 … md:ps-10 … lg:ps-0` |
| Line 40: linesMobile `h-[50px] w-[50px] object-contain` | `h-[19px] w-5 object-contain` (natural asset size — 50px scales it up and overlaps title) |
| Line 54: `grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3` | `grid w-full grid-cols-3` (parent hidden until lg) |
| Line 97: `m-1 … lg:m-[10px]` | `m-0 … lg:m-[10px]` |
| Line 107: `text-h4-mobile lg:text-h4` | `text-h4-mobile sm:text-h4-tablet lg:text-h4` |
| Card root `h-auto` | `h-full min-h-[400px] sm:min-h-[520px] lg:min-h-[560px]` (responsive floor, matches image-height triplet) + image wrapper `shrink-0` + description `flex-1` + button `mt-auto shrink-0` — locks card height regardless of description length, button always anchored to bottom |

## §4 Verification at 4 widths

- **375**: heading 22px center, ps-8px, mb-20px. linesMobile icon at NATURAL size (~20×19, NOT 50×50) at left 14%/top -20 — sits above the heading, no text overlap. Swiper visible (1 slide per view), 3-second autoplay. Each slide is a card with bg #D7F0FF, p 10px, image 300x280, h4 16px, body 14px, button 249×54px with blue shadow.
- **768**: heading 28px center, ps-40px (sm), linesInvert at left 18%/top -40. Still swiper (md branch hidden until lg). 2 slides per view (700px breakpoint in Swiper config = 2 slides). h4 18px.
- **1280**: heading 36px center, ps-0. linesInvert at left 36%. Desktop grid visible (3 columns). 3 cards side-by-side, m-10px gap, image 300×300. h4 20px.
- **1920**: same as 1280 (cards wider via grid).

## §5 RTL notes

- AR variant flips heading and card content text-align to right.
- Tailwind port uses `text-center` everywhere — direction-agnostic. ✓
- `ps-*` (start) used instead of `pl-*` — auto-flips. ✓
- linesMobile/linesInvert positioned with `left-[14%]` / `left-[18%]` / `left-[36%]`. These are **physical** offsets — under `dir="rtl"` they will NOT mirror (the icon stays on the visual left, but the AR heading sits visually on the right, so the icon appears far from the text). To make RTL-correct: use `start-[14%]` / `start-[18%]` / `start-[36%]` (inset-inline-start).
- Swiper: per-direction `dir` prop may need to be set on the Swiper component for slide order to flip. Not currently passed.
