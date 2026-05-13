# Component — `<TutorModal>`

A profile dialog that opens when clicking a tutor card. Shows the tutor's image, name, subject + curriculum tags, university, description, success-rate stars, and a primary "Book A Demo" CTA. White rounded card with inner shadow + a divider between header and body.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\tutor-modal.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\tutor-modal.tsx` |
| Arabic variant | (no `ar-tutor-modal.tsx` — locale handled via `locale` prop in the same file) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Dialog open keepMounted maxWidth={false} sx={styles.dialog}>
└── <DialogContent sx={styles.contanier}>             white card, rounded 30, inset shadow, w xs=83vw md=50vw
    ├── <Box sx={styles.header}>                      flex justify-between, mx-3vh, mt-3vh, mb-2vh
    │   ├── <Typography sx={styles.dialogHeading}>    "First Last" — 3vh / 2.2vh / 500
    │   └── <ClearRoundedIcon onClick={handleClose} w/h: 30px>
    ├── <Divider />
    └── <Box sx={styles.mainDiv}>                     maxH 70vh, overflowY auto, px/y 2%
        ├── <Box sx={styles.imageWrapper}>            relative, w=100%, h=250px, overflow hidden, rounded 12
        │   └── <Image layout=fill objectFit=contain />
        └── <Box sx={styles.cardTextDiv}>             padding 16px
            ├── <Typography component="p" variant="subtitle1">"First Last"
            ├── <Box sx={styles.subjects}>            flex wrap, rowGap 4, columnGap 4, mb 8
            │   └── data.Subjects.map → <Tag label index>
            ├── <Box sx={styles.subjects}>            curriculum tags
            ├── <Typography component="p" variant="body2">{university}
            ├── <Typography variant="body2" dangerouslySetInnerHTML>{description}
            ├── <Box sx={styles.rating}>              flex items-center, columnGap 12, mt 12
            │   ├── <Image src={greenstars} style={{ h:3vh, w:14vh }}>
            │   └── <Typography component="p" variant="subtitle2">{successRate}
            └── <PopUpButton text="Book A Demo" sx={styles.contactButton}>  shadow, p 18, m 20 0, w 100%, rounded 10
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-899) | Desktop (≥900) |
|---|---|---|---|---|
| `.contanier` | `width` | 83vw | 83vw | 50vw (md+) |
| `.contanier` | `borderRadius` / `padding` | 30px / 0 | same | same |
| `.contanier` | `boxShadow` | `0px -3px 8px 0px rgba(0,0,0,0.15) inset, 0px 2px 1px 0px rgba(0,0,0,0.05)` | same | same |
| `.contanier` | `backgroundColor` / `overflow` | white / auto | same | same |
| `.mainDiv` | `maxHeight` / `overflowY` | 70vh / auto | same | same |
| `.mainDiv` | `paddingX` / `paddingY` | 2% / 2% | same | same |
| `.header` | `marginX` / `marginTop` / `marginBottom` | 3vh / 3vh / 2vh | same | same |
| `.header` | `display` / `alignItems` / `justifyContent` | flex / center / space-between | same | same |
| `.dialogHeading` | `fontSize` / `lineHeight` / `fontWeight` | 3vh / 2.2vh / 500 | same | same |
| `.dialogHeading` | `color` / `letterSpacing` | `rgba(0,0,0,1)` / -2% | same | same |
| ClearRoundedIcon | `width` / `height` / `cursor` | 30 / 30 / pointer | same | same |
| `.imageWrapper` | `position` / `width` / `height` | relative / 100% / 250px | same | same |
| `.imageWrapper` | `overflow` / `borderRadius` | hidden / 12px | same | same |
| `.cardTextDiv` | `padding` | 16px | 16px | 16px |
| `.subjects` | `display` / `flexWrap` / `justifyContent` | flex wrap left | same | same |
| `.subjects` | `rowGap` / `columnGap` / `marginBottom` | 4px / 4px / 8px | same | same |
| `.rating` | `display` / `alignItems` / `textAlign` | flex center center | same | same |
| `.rating` | `columnGap` / `marginTop` | 12px / 12px | same | same |
| `.stars` (image inline style) | `height` / `width` | 3vh / 14vh | same | same |
| `.contactButton` (PopUpButton) | `padding` | 18px | 18px | 18px |
| `.contactButton` | `margin` | 20px 0 | same | same |
| `.contactButton` | `borderRadius` / `width` | 10px / 100% | same | same |
| `.contactButton` | `backgroundColor` / `color` | `#38b6ff` / white | same | same |
| `.contactButton` | `boxShadow` | `1px 15px 34px 0px rgba(56, 182, 255, 0.4)` | same | same |
| `.contactButton` | `transition` | `all 0.5s ease-in-out` | same | same |
| `.contactButton` `:hover` | `transform` / `boxShadow` | scale(1.02) / `1px 4px 24px 0px #38b6ffb2` | same | same |

### Typography

| Element | MUI variant / inline | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Header heading (name) | inline `fontSize 3vh, lineHeight 2.2vh, fontWeight 500` | 3vh | 3vh | 3vh | 500 | `rgba(0,0,0,1)` | League Spartan |
| Card body name `<Typography variant="subtitle1">` | subtitle1 (statNumber) | 1.75rem | 2.25rem | 3rem | 600 (default subtitle1 wt) | (inherit) | League Spartan |
| University `<Typography variant="body2">` | body2 | 14px | 14px | 14px | 400 | (inherit) | League Spartan |
| Description `<Typography variant="body2">` | body2 | 14px | 14px | 14px | 400 | (inherit) | League Spartan |
| Success rate `<Typography variant="subtitle2">` | subtitle2 (statLabel) | 14px | 14px | 14px | (subtitle2 default 500) | (inherit) | League Spartan |

### Colors

- `white` → `bg-white`
- `rgba(0,0,0,1)` → `text-black`
- `#38b6ff` → `bg-brand-500`
- container shadow → `shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]`
- button shadow → `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]`
- hover shadow → `shadow-[1px_4px_24px_0px_#38b6ffb2]`

### Animations / interactions

- Button: `transition: all 0.5s ease-in-out`, on hover `scale(1.02)` + different shadow.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 40 | container: `-m-4 sm:-m-6 rounded-[30px] bg-white shadow-[…] overflow-hidden w-[83vw] md:w-[50vw]` | MUI `.contanier`: width `xs=83vw, md=50vw`, rounded 30, inset shadow, padding 0, overflow auto, bg white. `overflow-hidden` ≠ MUI `overflow: auto` — should be `overflow-auto`. The `-m-4 sm:-m-6` is to escape HouseDialog padding (port-specific workaround). ✓ partial — fix overflow. | med |
| B2 | 41 | header: `mt-[3vh] mb-[2vh] mx-[3vh] flex items-center justify-between` | matches MUI `.header` (mx-3vh, mt-3vh, mb-2vh, flex justify-between) ✓ | — |
| B3 | 42 | h2: `font-heading text-[3vh] font-medium leading-[2.2vh] tracking-tight text-black` | MUI `.dialogHeading`: fontSize 3vh, lineHeight 2.2vh, fontWeight 500, letterSpacing -2% (`tracking-[-0.02em]`). `tracking-tight` is `-0.025em` — close but not exact. Should be `tracking-[-0.02em]`. | low |
| B4 | 51 | `<X size={30} />` | MUI `<ClearRoundedIcon w=30 h=30>`. Visual drift — different glyph. Acceptable. | low |
| B5 | 54 | `<hr className="border-ink-200" />` | matches MUI `<Divider />` ✓ | — |
| B6 | 56 | body: `max-h-[70vh] overflow-y-auto px-[2%] py-[2%]` | matches MUI `.mainDiv` ✓ | — |
| B7 | 57 | imageWrapper: `relative h-[250px] w-full overflow-hidden rounded-xl` | MUI `.imageWrapper`: w 100%, h 250px, overflow hidden, rounded 12px. `rounded-xl` = 24px ❌ (Tailwind default), should be `rounded-[12px]`. | med |
| B8 | 62 | image: `fill` + `className="object-contain"` | matches MUI `layout=fill objectFit=contain` ✓ | — |
| B9 | 65 | text wrapper: `p-4` (=16px) | matches MUI `.cardTextDiv` ✓ | — |
| B10 | 66 | name: `font-heading text-stat-number-mobile` | MUI uses `variant="subtitle1"` → `text-stat-number` triplet. Port omits responsive override — uses mobile size only. Should be `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number`. | high |
| B11 | 69 | tags: `mb-2 flex flex-wrap justify-start gap-x-1 gap-y-1` | MUI `.subjects`: `marginBottom: 8px, rowGap: 4px, columnGap: 4px, flexWrap, justify-left`. `mb-2` = 8px ✓. `gap-x-1 gap-y-1` = 4px each ✓. `justify-start` ✓. ✓ matches | — |
| B12 | 79 | university `<p>`: `font-heading text-small` | matches MUI body2 = 14px ✓ | — |
| B13 | 80-83 | description `<p>`: `font-heading text-small` with `dangerouslySetInnerHTML` | matches MUI body2 ✓ | — |
| B14 | 84 | rating: `mt-3 flex items-center text-center gap-x-3` | MUI `.rating`: `mt 12px, columnGap 12px, items-center, textAlign center`. `mt-3` = 12px ✓. `gap-x-3` = 12px ✓. ✓ matches | — |
| B15 | 88 | stars Image: `className="h-[3vh] w-[14vh]"` | matches MUI inline style ✓ | — |
| B16 | 90 | success-rate `<p>`: `font-heading text-small font-medium uppercase leading-[1.4] tracking-[0.05em]` | MUI `variant="subtitle2"` (statLabel) → `text-stat-label uppercase`. Port adds `font-medium uppercase leading-[1.4] tracking-[0.05em]` — closer to original than `text-stat-label`. ✓ (workable both ways). The `font-medium` matches subtitle2 default (500). Acceptable. | low |
| B17 | 96 | PopUpButton: `my-5 w-full self-center rounded-[10px] bg-brand-500 p-[18px] font-heading font-bold leading-[18.4px] text-white shadow-[…] transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-brand-500` | MUI `.contactButton`: `padding 18px, margin "20px 0" (=my-5), borderRadius 10px, width 100%, bg #38b6ff, color white, transition 0.5s, shadow, hover scale 1.02 + different shadow`. **Missing**: `hover:shadow-[1px_4px_24px_0px_#38b6ffb2]` (the hover shadow override). | med |

---

## §3 Corrected Tailwind classNames

| From | To |
|---|---|
| Line 40: `overflow-hidden` (on container) | `overflow-auto` |
| Line 42: `tracking-tight` | `tracking-[-0.02em]` |
| Line 57: `rounded-xl` | `rounded-[12px]` |
| Line 66: `text-stat-number-mobile` | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` |
| Line 96: add hover shadow override | add `hover:shadow-[1px_4px_24px_0px_#38b6ffb2]` |

## §4 Verification at 4 widths

- **375**: dialog 83vw, rounded-30, white, inset shadow. Header h2 at 3vh (~22-30px) with X icon top-right. Image 250px tall full-width, rounded-12px. Tags row, 4px gap. Description body. Stars + success rate row at mt-12px. Button bg-brand-500, p-18px, my-20px, w-100%, rounded-10.
- **768**: dialog still 83vw (md=900, not yet reached). Name text 2.25rem (sm tablet size).
- **1280**: dialog 50vw. Name 3rem (lg desktop). Same vertical rhythm.
- **1920**: dialog 50vw (~960px). Image still 250px (fixed height).

## §5 RTL notes

- No AR variant file — locale handled via prop and shows AR button label only.
- Header: `flex items-center justify-between` — auto-flips order under `dir="rtl"`. ✓
- Tags use `justify-start` (logical) — flips to right. ✓
- Stars + success rate use `gap-x-3` (direction-agnostic). The stars image is fixed-aspect (3vh × 14vh) and not directional. ✓
- Description rendered via `dangerouslySetInnerHTML` — relies on the source HTML's directionality. If AR description ships with `<p>` tags lacking `dir`, the text inherits container dir (✓).
- Button is centered (`self-center`, `w-full`). No directional issues.
