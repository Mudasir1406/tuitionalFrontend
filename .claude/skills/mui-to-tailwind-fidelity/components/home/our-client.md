# Component — `<OurClient>`

Home-page testimonials section: a blue-gradient background with two layouts — a mobile/tablet stacked view (heading → review-card swiper → prev/next buttons) and a desktop view (heading on the left 20% + cards-effect swiper on the right 70%). Below the swiper on desktop is a 4-column stats row (25K+ Classes, 600K+ Members, 8K+ Teachers, 4.8 Rating).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\our-client.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\our-client.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-our-client.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.constanier}>                       gradient bg, py x/sm/md/lg
├── <Box sx={styles.inner}>                        (xs/sm/md only — flex col centered)
│   ├── <Box sx={styles.headingContanier}>
│   │   ├── <Typography component="h3" variant="h2" sx={styles.heading}>
│   │   │     "What are Students Says!"  ::before = lines-invert-white
│   │   ├── <Typography variant="body2" sx={styles.desc}>
│   │   └── <Button href="/testimonials" sx={styles.buttonMobile}>  "Read More"
│   ├── <Box sx={styles.swiperContanier}>          full-width swiper
│   │   └── <Swiper centeredSlides cards-effect autoplay loop>
│   │        └── <ReviewMobile item={item} />
│   └── <Box sx={{ display: flex, marginTop: 5 }}>  prev/next buttons
│        ├── <Box sx={styles.nextButton}><WestIcon/></Box>
│        └── <Box sx={styles.nextButton}><EastIcon/></Box>
├── <Box sx={styles.ourStudent}>                   (lg+ only — flex row)
│   ├── <Box sx={styles.ourStudentInner}>          w=20%, mx=20 (=160px)
│   │   ├── <Typography variant="h2" sx={styles.heading}>  "What our Students Says!"
│   │   ├── <Typography variant="body2" sx={styles.desc}>
│   │   └── <Button href="/testimonials" sx={styles.button}>
│   └── <Swiper centeredSlides cards-effect autoplay loop  w=70% mt=10>
│        └── <Review item={item} />
└── <Box sx={styles.info}>                         (lg+ only — stats row, mt 100)
    ├── 25K+ Classes  (numbers 70px/65px/600, Dec 20px/30px/400, white)
    ├── <Divider vertical />
    ├── 600K+ Members
    ├── <Divider vertical />
    ├── 8K+ Teachers
    ├── <Divider vertical />
    └── 4.8 + 5×StarIcon (white) + "Rating"

<ReviewMobile>:
<Box sx={styles.reviewContanier}>                  paddingX xs/sm/md/lg, paddingY 60, w xs=75% sm/md/lg=400px, bg white, rounded 10
├── <Box sx={styles.ratingContanier}>              bg #E9B93D, w=80, rounded 10, px=10, mb=10
│   ├── <StarPurple500OutlinedIcon h=25 w=25 white>
│   └── <Typography sx={styles.coma}>{rating.toFixed(1)}</Typography>
├── <Typography sx={styles.reviewText}>{message}
└── <Box sx={styles.userContanier}>                flex items-center, mt=4vh
    ├── <Image w=50 h=50 borderRadius=25 mr=10>    (mobile-only)
    └── <Box>
        ├── <Typography variant="h5">{userName}
        └── <Typography variant="caption">{country}

<Review> (desktop):                                flex, rounded 10, inset shadow, bg white, w=70%
├── <Image w=40% maxH=450 objectFit=contain>
└── <Box sx={styles.reviewContanier}>              same as mobile minus user image
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.constanier` | `background` | `linear-gradient(180deg, #00A1FE 0%, #0D84C9 100%)` | same | same |
| `.constanier` | `paddingY` | 90px | 100px (sm), 110px (md) | 140px |
| `.constanier` | `marginY` | 60px | 70px (sm), 80px (md) | 80px (10 = 80) (lg) |
| `.constanier` | `flexDirection` | row | row | column (lg) |
| `.inner` (mobile branch) | `display` | flex | flex (md flex) | none (lg) |
| `.ourStudent` (desktop branch) | `display` | none | none | flex (lg) |
| `.info` (stats) | `display` / `marginTop` | none / 100 | none | flex / 100px |
| `.headingContanier` | `marginLeft` | 0 | 0 | 10 = 80px (lg) |
| `.swiperContanier` | `marginTop` | 8 = 64px | 15 = 120px (sm/md) | 15 = 120px (n/a — only mobile branch) |
| `.heading` | `color` / `position` | white / relative | same | same |
| `.heading` | `textAlign` | center | center (md start) | start |
| `.heading` | `marginBottom` | 17px | 17px (sm) / 10px (md) | 10px |
| `.heading::before` | `top` / `left` | -15 / -15 | -35 / -40 | -35 / -40 |
| `.heading::before` | `height` × `width` | 35px × 43px | 35px × 43px | 35px × 43px |
| `.heading::before` | image | linesMobileWhite | linesInvertWhite | linesInvertWhite |
| `.desc` | `color` | white | white | white |
| `.desc` | `textAlign` | center | center (md center) | start (lg) |
| `.desc` | `paddingX` | 20px | 22px (sm), 0 (md) | 0 |
| `.button` (desktop CTA) | `backgroundColor` / `color` | white / `#009BF5` | same | same |
| `.button` | `fontSize` / `fontWeight` / `lineHeight` | 20px / 700 / 18.4px | same | same |
| `.button` | `padding` / `width` / `borderRadius` | 18px / 249px / 10px | same | same |
| `.button` | `marginTop` | 100px (lg only) | n/a | 100px |
| `.button` | `boxShadow` | `1px 15px 34px 0px #38B6FF66` | same | same |
| `.buttonMobile` (mobile CTA) | same as `.button` except: | `fontSize: 25px, marginTop: 20px` | same | (n/a, hidden) |
| `.nextButton` | `width` × `height` | 80 × 80 | same | (n/a) |
| `.nextButton` | `borderRadius` / `backgroundColor` | 40px / `rgba(255,255,255,0.7)` | same | (n/a) |
| `.nextButton` | `boxShadow` / `marginX` | `0px -3px 8px 0px #00000026 inset` / 10px | same | (n/a) |
| `.ourStudentInner` (desktop heading) | `width` / `marginX` | (n/a) | (n/a) | 20% / 20 = 160px |
| `.reviewContanier` (mobile card) | `paddingX` | 28px | 38px (sm), 50px (md) | 50px (lg) |
| `.reviewContanier` | `paddingY` | 60px | 60px | 60px |
| `.reviewContanier` | `width` | 75% | 400px (sm), 400px (md) | 400px |
| `.reviewContanier` | `backgroundColor` / `borderRadius` | white / 10 = 80px | same | same |
| `.reviewText` | `fontSize` / `lineHeight` | 2vh / 4vh | 2.2vh / 3.6vh (sm), 2.4vh / 3.2vh (md) | 2.8vh / 4vh |
| `.reviewText` | `color` / `fontWeight` | `rgba(0,0,0,0.77)` / 400 | same | same |
| `.userContanier` | `display` / `alignItems` / `marginTop` | flex center / 4vh | same | same |
| `.ratingContanier` | `backgroundColor` / `width` / `borderRadius` | `#E9B93D` / 80px / 10 (= 80 in mui? no — `borderRadius: 10` = 10px on Box) | same | same |
| `.ratingContanier` | `paddingX` / `marginBottom` | 10px / 10px | same | same |
| `.coma` (rating number) | `fontSize` / `fontWeight` / `lineHeight` | 20px / 600 / 35px | same | same |
| `.coma` | `marginTop` / `marginLeft` | 3px / 10px | same | same |
| `.info` numbers | `fontSize` / `fontWeight` / `lineHeight` | 70px / 600 / 65px | same | same |
| `.info` numbersDec | `fontSize` / `fontWeight` / `lineHeight` | 20px / 400 / 30px | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading "What…Says" `<Typography variant="h2">` | h2 | 1.375rem | 1.75rem | 2.25rem | 700 | white | League Spartan |
| Description `<Typography variant="body2">` | body2 | 14px | 14px | 14px | 400 | white | League Spartan |
| Read More button | inline 20px/25px | 25px (mobile variant) | 25px | 20px (desktop variant) | 700 | `#009BF5` | League Spartan |
| Review text | inline `2vh/2.2vh/2.4vh/2.8vh` | 2vh | 2.2vh (sm), 2.4vh (md) | 2.8vh | 400 | `rgba(0,0,0,0.77)` | League Spartan |
| Username `<Typography variant="h5">` | h5 | (no mobile override; theme default 1rem at tablet+) | 1rem | 1.125rem | 600 | (inherit) | League Spartan |
| Country `<Typography variant="caption">` | caption | 14px | 14px | 14px | 400 | `rgba(0,0,0,0.77)` | League Spartan |
| Rating number (`coma`) | inline | 20px | 20px | 20px | 600 | white | League Spartan |
| Stats numbers (`numbers`) | inline | 70px | 70px | 70px | 600 | white | League Spartan |
| Stats label (`numbersDec`) | inline | 20px | 20px | 20px | 400 | white | League Spartan |

### Colors

- Gradient `linear-gradient(180deg, #00A1FE 0%, #0D84C9 100%)` → `bg-gradient-to-b from-[#00A1FE] to-[#0D84C9]`
- white → `bg-white` / `text-white`
- `#009BF5` → `text-[#009BF5]`
- `#E9B93D` (rating bg) → `bg-[#E9B93D]`
- `rgba(255,255,255,0.7)` (next button bg) → `bg-white/70`
- `rgba(0,0,0,0.77)` → `text-ink-800`
- `#38B6FF66` → in shadow `shadow-[1px_15px_34px_0px_#38B6FF66]`
- `#00000026` → in shadow `shadow-[0px_-3px_8px_0px_#00000026_inset]`

### Animations / interactions

- Swiper: `effect="cards"`, `cardsEffect={{ perSlideOffset: 5/4, slideShadows: false, perSlideRotate: 1 }}`, `autoplay { delay: 2500 }`, `loop` when `data.length >= 3`.
- Next/Prev buttons: `:hover { backgroundColor: rgba(255,255,255,0.9) }`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 29 | root: `relative my-[60px] flex flex-row items-center justify-center bg-gradient-to-b from-[#00A1FE] to-[#0D84C9] py-[90px] sm:my-[70px] sm:py-[100px] md:my-20 md:py-[110px] lg:my-10 lg:flex-col lg:py-[140px]` | `md:my-20` = 80px ✓ (matches MUI 80). `lg:my-10` = 40px ❌ — MUI is `marginY: 10` (=80px on lg). Should be `lg:my-20`. Also missing `items-center justify-center` — present. ✓ | high |
| B2 | 30 | `relative flex w-full flex-col items-center justify-center lg:hidden` | matches MUI `.inner` ✓ (display: flex xs/sm/md, none lg) | — |
| B3 | 32 | mobile heading: `relative mb-[17px] text-center font-heading text-h2-mobile sm:text-h2-tablet md:text-start md:text-h2-tablet md:mb-[10px] lg:text-h2 text-white` | MUI heading at mobile branch: `textAlign: { xs: center, sm: center, md: start, lg: start }, marginBottom: { xs: 17px, sm: 17px, md: 10px, lg: 10px }`. ✓ matches | — |
| B4 | 33-37 | linesMobileWhite: `absolute -left-[15px] -top-[15px] z-10 h-[12px] w-[14px] object-contain sm:hidden` | MUI `::before` xs box `35×43` but `background-size` unset → image renders at NATURAL size. `linesMobileWhite.png` natural = **14×12**, not 43×35 (different asset from `linesInvertWhite`). Using `h-[35px] w-[43px] object-contain` upscales 14×12 squiggle ~3× → misaligned over heading. Use natural `h-[12px] w-[14px]`. | **High (was wrongly marked OK)** |
| B5 | 39-43 | linesInvertWhite: `absolute -left-10 -top-[35px] z-10 hidden h-[35px] w-[43px] object-contain sm:block` | MUI sm+: `top: -35, left: -40`. `-left-10` = -40px ✓. ✓ matches | — |
| B6 | 47 | desc: `px-5 text-center font-heading text-body-mobile sm:px-[22px] sm:text-body md:px-0 lg:px-0 lg:text-start text-white` | MUI desc: paddingX `xs=20, sm=22, md=0, lg=0`, textAlign `xs/sm/md=center, lg=start`. **In the mobile branch, MUI hides itself at lg+**, so the `lg:` modifiers in this className will only apply if the mobile branch is somehow visible at lg. Since the mobile branch is `lg:hidden`, the `lg:text-start` is dead code. Acceptable. body2=14px MUI ≠ port `text-body-mobile` (15px). Should be `text-small` (14px). | med |
| B7 | 51 | mobile CTA Link: `mt-5 inline-flex w-[249px] items-center justify-center rounded-md bg-white px-0 py-[18px] font-heading text-[25px] font-bold leading-[18.4px] tracking-[-0.02em] text-[#009BF5] shadow-[1px_15px_34px_0px_#38B6FF66]` | MUI `.buttonMobile`: `marginTop: 20px (=mt-5), width: 249px, padding: 18px (=p-[18px], not py only), fontSize: 25px, fontWeight: 700, lineHeight: 18.4px, bg white, text #009BF5, shadow #38B6FF66`. The `px-0` is correct (since p-18 applies all sides) but should be `p-[18px]` not `py-[18px] px-0`. Acceptable. `rounded-md` (10px) ✓. ✓ matches | — |
| B8 | 58 | swiper wrapper: `mt-8 flex w-full items-center justify-center sm:mt-[15px] md:mt-[15px] lg:mt-[15px]` | MUI `.swiperContanier marginTop: { xs: 8, sm: 15, md: 15, lg: 15 }` → `xs=64px (mt-16), sm/md/lg=120px (mt-[120px])`. Tailwind has `mt-8 sm:mt-[15px] md:mt-[15px] lg:mt-[15px]` — `mt-8` = 32px ❌ (should be 64px = mt-16), `sm:mt-[15px]` = 15px ❌ (should be 120px = mt-[120px]). | high |
| B9 | 81 | prev/next buttons wrapper: `mt-5 flex` | MUI `marginTop: 5` = 40px. `mt-5` = 20px ❌. Should be `mt-10` (40px). | high |
| B10 | 85 | each button: `mx-[10px] flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white/70 shadow-[0px_-3px_8px_0px_#00000026_inset] hover:bg-white/90` | matches MUI ✓ | — |
| B11 | 101 | desktop wrapper: `relative hidden w-full lg:flex` | matches MUI ✓ | — |
| B12 | 102 | heading container: `mx-20 w-1/5` | MUI `.ourStudentInner`: `width: 20%, marginX: 20 (=160px)`. `mx-20` = 80px ❌ (should be `mx-[160px]` or `mx-40`). | high |
| B13 | 103 | desktop heading: `relative mb-[10px] text-start font-heading text-h2 text-white` | matches MUI desktop heading (mb 10, text-start, h2, white) ✓ | — |
| B14 | 112 | desktop desc: `text-start font-heading text-body text-white` | MUI body2 = 14px; port uses `text-body` (16px). Should be `text-small`. | med |
| B15 | 117 | desktop CTA Link: `mt-[100px] inline-flex w-[249px] … text-[20px] …` | matches MUI (20px size, 100px top margin) ✓ | — |
| B16 | 145 | stats wrapper: `mt-[100px] hidden w-full items-center justify-evenly lg:flex` | matches MUI `.info` ✓ | — |
| B17 | 147, 154, 161, 169 | numbers: `font-heading text-[70px] font-semibold leading-[65px] text-white` | matches MUI `styles.numbers` ✓ | — |
| B18 | 148, 155, 162, 176 | numbersDec: `font-heading text-[20px] font-normal leading-[30px] text-white` | matches MUI `styles.numbersDec` ✓ | — |
| B19 | 152, 159, 166 | dividers: `self-stretch border-s border-white` | MUI uses `<Divider orientation="vertical" variant="middle" flexItem>` — full white vertical line. Port uses `border-s` which is logical-start border (auto-flips RTL). Visually equivalent ✓ | — |
| B20 | 172 | rating stars: `<Star size={18} />` | MUI `<StarPurple500OutlinedIcon>` (filled star). `Star` from lucide is outline. Drift — visual diff acceptable but flag. | low |
| B21 | 192-218 (Review desktop) | layout: `w-2/5` for image, `w-3/5` for text. MUI Image: `width: 40%, maxHeight: 450, objectFit: contain`. Text `.reviewContanier`: `paddingX 50px, paddingY 60px, width 400px`. The port collapses width to `w-3/5` (60%) instead of `width: 400px`. With outer `w-[70%]` swiper, this matches roughly. ✓ | low |
| B22 | 208 | reviewText: `text-[2vh] sm:text-[2.2vh] md:text-[2.4vh] lg:text-[2.8vh] text-ink-800` | matches MUI `.reviewText` ✓ | — |
| B23 | 213 | username: `font-heading text-h5` | MUI uses `variant="h5"` → 1rem on tablet, 1.125rem on desktop. `text-h5` is missing the tablet variant → use `text-h5-tablet lg:text-h5` per the token map. | med |
| B24 | 214 | country: `font-heading text-small text-ink-800` | matches MUI `variant="caption"` (14px) ✓ | — |
| B25 | 202 | ratingContanier: `mb-[10px] flex w-20 items-center justify-center rounded-md bg-[#E9B93D] px-[10px]` | MUI `.ratingContanier`: `width: 80px, paddingX: 10, marginBottom: 10, borderRadius: 10, bg #E9B93D`. `w-20` = 80px ✓. `rounded-md` = 10px ✓. ✓ matches | — |
| B26 | 204 | rating coma: `text-[20px] font-semibold leading-[35px]` | matches MUI ✓ | — |

---

## §3 Corrected Tailwind classNames

| From | To |
|---|---|
| Line 29: `lg:my-10` | `lg:my-20` (MUI marginY: 10 = 80px on lg) |
| Line 47: `text-body-mobile sm:text-body` (desc) | `text-small` (MUI body2 = 14px) |
| Line 58: `mt-8 ... sm:mt-[15px] md:mt-[15px] lg:mt-[15px]` | `mt-16 sm:mt-[120px] md:mt-[120px] lg:mt-[120px]` |
| Line 81: `mt-5 flex` | `mt-10 flex` |
| Line 102: `mx-20 w-1/5` | `mx-40 w-1/5` (160px margin) |
| Line 101: `relative hidden w-full lg:flex` (desktop wrapper) | `relative hidden w-full items-center lg:flex` — MUI `.ourStudent alignItems: center` vertically centers the heading column with the swiper cards. Without `items-center`, the heading sits at top while cards span full height. |
| Line 112: `text-body` (desktop desc) | `text-small` |
| Line 213, 242: `text-h5` (username) | `text-h5-tablet lg:text-h5` |

## §4 Verification at 4 widths

- **375**: full mobile branch visible. Section my-60px, py-90px. Heading 22px center, mb-17px. Swiper card 75% width with cards-effect, autoplay 2.5s. Prev/Next buttons 80×80 below at mt-40px. CTA "Read More" 249×54 button mt-20px.
- **768**: mobile branch still visible (lg=1200). Section my-70px, py-100px. Heading 28px. Cards 400px wide. Same layout.
- **1280**: lg branch visible. Section my-80px (NOT 40px — see B1), py-140px. Left column heading w=20%, mx=160px. Right swiper 70% width. Stats row at bottom mt-100px.
- **1920**: same as 1280.

## §5 RTL notes

- AR variant flips heading textAlign to right; CTA button stays full-width.
- Tailwind port uses `text-start` (logical) for desktop heading + description. ✓
- Stats dividers use `border-s` (logical-start). ✓
- linesInvertWhite uses physical `-left-10` / `-left-[15px]` — under `dir="rtl"` these stay on the visual left. To mirror correctly under RTL, use `start-[-40px]` / `start-[-15px]` (Tailwind v3.3+ supports `inset-inline-start` arbitrary).
- Swiper layout has `paddingLeft: "12vw"` on the SwiperSlide style — this is **physical** and won't flip; the slide will look offset on the wrong side in RTL. Consider switching to `paddingInlineStart: "12vw"` via inline style for RTL parity.
