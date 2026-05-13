# Component — `TeamValues` (careers)

Section with centered "Our Team Values" `<h2>` (with decorative lines `::before`) and a flex-wrap row of six identical `InfoBox` cards. Each card: circular icon badge (top), heading (h5), and 2-3 line description. Cards stack full-width on mobile, switch to fixed-width auto from `sm` upward.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\careers\team-values.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\careers\team-values.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\careers\ar-team-values.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box (marginBottom: {xs:0, md:0})>             // section root — effectively no margin
├── <Box styles.headingContanier>              // flex col, items-center, w:100%, bg:transparent
│   └── <Typography variant="h2" styles.mainHeading>  // h2 with ::before lines decoration
└── <Grid container spacing={2} (flex centered)>
    └── <Grid item (width: {xs:"100%", sm:"auto"})> × 6
        └── <InfoBox heading dec icon>
            ├── <Box styles.icon>                 // round avatar wrapper (white, shadow)
            │   └── <Box (sized) > <Image svg /> </Box>
            └── <Box (height:35%)>
                ├── <Typography variant="h5" styles.heading>     // value name
                └── <Typography variant="body2" styles.dec>      // description
```

### Dimensions & spacing

#### `<Box>` outer root
| Property | All breakpoints |
|---|---|
| `marginBottom` | `0` (xs) `0` (md) → no margin |

#### `.mainHeading` (h2)
| Property | Mobile (xs) | sm | md | lg |
|---|---|---|---|---|
| `display` | `flex` | same | same | same |
| `marginTop` | `40px` | `50px` | `70px` | `105px` |
| `marginBottom` | `20px` | `20px` | `20px` | `20px` |
| `position` | `relative` | same | same | same |
| `textAlign` | `center` | same | same | same |
| `alignItems` | `center` | same | same | same |
| `justifyContent` | `center` | same | same | same |
| `color` | `#000000` | same | same | same |
| `::before` `backgroundImage` | `linesMobile` | `linesInvert` | `linesInvert` | `linesInvert` |
| `::before` `height` | `19px` | `35px` | `35px` | `35px` |
| `::before` `width` | `20px` | `43px` | `43px` | `43px` |
| `::before` `top` | `-12` (px) | `-35` | `-35` | `-35` |
| `::before` `left` | `11%` | `-6%` | `-6%` | `-6%` |

#### `Grid container spacing={2}` (cards row)
| Property | All |
|---|---|
| Gap | `16px` (column + row) |
| `display`/`alignItems`/`justifyContent` | flex / center / center |

#### Each card `<Box>` (in InfoBox)
| Property | Mobile (xs) | sm | md | lg |
|---|---|---|---|---|
| `backgroundColor` | `rgba(255,255,255,0.7)` | same | same | same |
| `width` | `100%` | `322px` | `360px` | `460px` |
| `height` | `200px` | `285px` | `313px` | `413px` |
| `display`/`flexDirection`/etc | `flex col, items-center, justify-center` | same | same | same |
| `borderRadius` | `10px` | same | same | same |
| `boxShadow` | `"0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D"` | same | same | same |
| `position` | `relative` | same | same | same |

> AR variant adds `direction: "rtl"` to the card. No other AR mirror.

#### `.icon` (round badge)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `width` | `45px` | `55px` | `75px` | `115px` |
| `height` | `45px` | `55px` | `75px` | `115px` |
| `backgroundColor` | `white` | same | same | same |
| `borderRadius` | `60px` (effectively full) | same | same | same |
| `boxShadow` | `"0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526"` | same | same | same |
| `marginBottom` | `10px` | `20px` | `30px` | `40px` |
| `display`/`flex`/center | `flex, items-center, justify-center` | same | same | same |

#### Inner icon image `<Box>` (svg dimensions)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `width` | `20px` | `30px` | `45px` | `45px` |
| `height` | `20px` | `30px` | `45px` | `45px` |

#### `.heading` (h5 in InfoBox)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `marginBottom` | `10px` | `15px` | `18px` | `22px` |
| `textAlign` | `center` | same | same | same |

#### `.dec` (body2 in InfoBox)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `textAlign` | `center` | same | same | same |
| `maxWidth` | `90%` | `90%` | `280px` | `300px` |
| `color` | `rgba(0,0,0,0.77)` | same | same | same |
| `margin` | `auto` (horizontal centering) | same | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Main heading "Our Team Values" | `variant="h2"` | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000000` | `leagueSpartan` (`font-heading`) |
| Card heading (e.g. "Succeed together") | `variant="h5"` | inherits → 1rem (h5 has no <600 override) | 1rem (16px) | 1.125rem (18px) | 600 | inherit (black) | `leagueSpartan` |
| Card dec (description) | `variant="body2"` | 14px | 14px | 14px | 400 | `rgba(0,0,0,0.77)` | `leagueSpartan` |

> Per [01-token-mapping.md](../../01-token-mapping.md) §Typography: `h5` triplet → `text-h5-tablet lg:text-h5` (no mobile override).

### Colors

| MUI | Tailwind |
|---|---|
| `#000000` (main heading) | `text-black` |
| `rgba(255,255,255,0.7)` (card bg) | `bg-white/70` |
| `white` (icon bg) | `bg-white` |
| `rgba(0,0,0,0.77)` (dec text) | `text-ink-800` |
| card shadow `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D` | inline `shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D]` |
| icon shadow `0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526` | inline `shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526]` |

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

Reference: `tuitionalFrontend\src\components\careers\team-values.tsx`.

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 37 | InfoBox root `relative flex h-[200px] w-full flex-col items-center justify-center rounded-md bg-white/70 shadow-[...] sm:h-[285px] sm:w-[322px] md:h-[313px] md:w-[360px] lg:h-[413px] lg:w-[460px]` | ✓ matches all dims. `rounded-md` (10px in this repo) matches `borderRadius:"10px"`. ✓ | — |
| B2 | 38 | icon `.mb-[10px] flex h-[45px] w-[45px] items-center justify-center rounded-full bg-white shadow-[...] sm:mb-5 sm:h-[55px] sm:w-[55px] md:mb-[30px] md:h-[75px] md:w-[75px] lg:mb-10 lg:h-[115px] lg:w-[115px]` | ✓ matches. `rounded-full` correctly substitutes `60px` (which becomes pill at the small sizes here — visually identical). | — |
| B3 | 39 | inner icon `h-5 w-5 sm:h-[30px] sm:w-[30px] md:h-[45px] md:w-[45px] lg:h-[45px] lg:w-[45px]` | ✗ `h-5 w-5` = 20px → ✓. `sm:h-[30px]` → ✓. md/lg 45/45 → ✓. **All match**. | — |
| B4 | 44 | card heading `mb-[10px] text-center font-heading text-h5-tablet sm:mb-[15px] sm:text-h5 md:mb-[18px] lg:mb-[22px] lg:text-h5` | ✗ Typography triplet for `h5` per token-mapping should be `text-h5-tablet lg:text-h5` (no mobile-base override; mobile uses tablet size as base). Current applies `text-h5-tablet` at base and `sm:text-h5` at sm AND `lg:text-h5` at lg. **The `sm:text-h5` bumps to desktop size at 600px — wrong**. Should drop `sm:text-h5` and keep only `lg:text-h5`. | **med** |
| B5 | 44 | margins `mb-[10px] sm:mb-[15px] md:mb-[18px] lg:mb-[22px]` | ✓ matches MUI `marginBottom:{xs:"10px", sm:"15px", md:"18px", lg:"22px"}` | — |
| B6 | 47 | dec `mx-auto max-w-[90%] whitespace-pre-line text-center font-heading text-small text-ink-800 md:max-w-[280px] lg:max-w-[300px]` | ✓ matches. `text-small` for `body2` per token table. `text-ink-800` for `rgba(0,0,0,0.77)`. ✓ `whitespace-pre-line` is **needed** to render MUI's literal `\n` newlines in the dec strings (e.g. helpful, debate). | — |
| B7 | 47 | dec `font-heading` (League Spartan) | ✓ matches MUI which passes `leagueSpartan.className` — overrides `body2`'s default. | — |
| B8 | 93 | section h2 `relative mt-10 mb-5 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black` | ✓ matches. `mt-10` = 40px (xs), `sm:mt-[50px]`, `md:mt-[70px]`, `lg:mt-[105px]`. `mb-5` = 20px (constant). Typography triplet correct. | — |
| B9 | 95-105 | decorative lines images on h2 — `linesMobile` (mobile) at `-top-3 left-[11%] h-[19px] w-5`; `linesInvert` (sm+) at `-left-[6%] -top-[35px] h-[35px] w-[43px] sm:block` | ✓ matches MUI offsets `top:{-12 xs, -35 sm/md/lg}` and `left:{"11%" xs, "-6%" sm/md/lg}`. | — |
| B10 | 111 | cards container `flex flex-wrap items-center justify-center gap-4` | ✓ matches `Grid container spacing={2}` (16px gap, centered, flex). `gap-4` = 16px = `spacing={2}*8`. ✓ | — |
| B11 | 113 | per-card `w-full sm:w-auto` | ✓ matches `width: {xs:"100%", sm:"auto"}` | — |

**Net bugs**: only B4 (the `sm:text-h5` should not exist — it makes the card heading jump to desktop size at sm, when MUI's h5 stays at tablet size from 600–1199px).

---

## §3 Corrected Tailwind classNames

Only one change needed (B4):

```tsx
// InfoBox heading — drop sm:text-h5
<h3 className="mb-[10px] text-center font-heading text-h5-tablet sm:mb-[15px] md:mb-[18px] lg:mb-[22px] lg:text-h5">
  {heading}
</h3>
```

| line | from | to |
|---|---|---|
| 44 | `text-h5-tablet sm:mb-[15px] sm:text-h5 md:mb-[18px] lg:mb-[22px] lg:text-h5` | `text-h5-tablet sm:mb-[15px] md:mb-[18px] lg:mb-[22px] lg:text-h5` |

All other classes match MUI source.

---

## §4 Verification at 4 widths

- **375px** — section heading 22px (`text-h2-mobile`), mt 40, mb 20. Cards stack full-width, h 200px. Icon 45px round, image inside 20px. Card heading 16px (`text-h5-tablet` = 1rem from token table). Card dec 14px, max-w 90%.
- **768px** — section heading 28px (`sm:text-h2-tablet`), mt 50. Cards switch to fixed width 322px / h 285px. Icon 55px / inner 30px. Card heading still 16px (after B4 fix; was incorrectly 18px). Dec max-w 90%.
- **1280px** — section heading 36px (`lg:text-h2`), mt 105. Cards w 460px / h 413px. Icon 115px / inner 45px. Card heading 18px (`lg:text-h5`). Dec max-w 300px.
- **1920px** — same as 1280; no `xl:` rules.

---

## §5 RTL notes

Arabic variant: `ar-team-values.tsx` adds `dir="rtl"` on the outer `<Box>` and the **InfoBox card** root (`direction: "rtl"`). The decorative lines `::before` swaps `left` → `right`:
- LTR: `left: { xs:"11%", sm:"-6%", md:"-6%", lg:"-6%" }`
- RTL: `right: { xs:"11%", sm:"-6%", md:"-6%", lg:"-6%" }`

Tailwind port action:
- Apply `dir="rtl"` at the page/locale layer (no per-component prop needed) and use `ltr:` / `rtl:` modifiers on the lines decoration:
  ```tsx
  <Image ... className="absolute -top-3 h-[19px] w-5 object-contain sm:hidden ltr:left-[11%] rtl:right-[11%]" />
  <Image ... className="absolute hidden h-[35px] w-[43px] object-contain sm:block sm:-top-[35px] ltr:sm:-left-[6%] rtl:sm:-right-[6%]" />
  ```
- The card text (`text-center`) needs no flipping. The card root flex column has no directional children — no `flex-row-reverse` needed.
- The font fallback to `Noto Sans Arabic` is handled globally via `html[dir="rtl"] *` per project foundation; no per-card change.
