# Component — `VideoBasedReview` (testimonials)

"Video-Based Reviews" section — one large featured video card on the left, a vertical list of smaller review cards (poster thumbnail + name/country/watch link) on the right. Two-column at desktop (lg=7/5), single column below.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\video-based-reviews.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\video-based-reviews.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\testimonials\ar-video-based-reviews.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier (flex col, items-center, justify-center)
├── Typography component="h2" sx={styles.heading}  ──→ "Video-Based Reviews"  (with ::before linesMobileWhite/linesInvertWhite)
└── Grid container spacing={2}
    ├── Grid item xs=12 sm=12 md=12 lg=7 xl=7
    │   └── Card (w-100%, h cascade, shadow, rounded-20px)
    │       └── CardMedia component="video" src={item.video} controls poster={...}  (w-100%, h-100%)
    └── Grid item xs=12 sm=12 md=12 lg=5 xl=5  (flex, justify-center, items-center)
        └── Grid container spacing={2}
            └── Grid item xs=12  ×N (filtered non-selected)
                └── Card sx={styles.card}  (rounded-20px, glass white/70, shadow, padding 10px, flex row, items-center)
                    ├── CardMedia component="video" (responsive size, rounded-10px)
                    └── Box marginLeft="25px"
                        ├── Typography sx={styles.userName}   ──→ name
                        ├── Typography sx={styles.country}    ──→ country
                        └── Typography sx={styles.watch}      ──→ "Watch Video" + PlayArrowIcon
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| `.contanier` | display | flex col items-center justify-center | — | — | — | — |
| `h2.heading` | `fontSize` | `35px` | `40px` | `55px` | `55px` | — |
| `h2.heading` | `lineHeight` | `45px` | `50px` | `65px` | `65px` | — |
| `h2.heading` | `fontWeight` | `600` | — | — | — | — |
| `h2.heading` | `textAlign` | center | center | start | start | — |
| `h2.heading` | `marginBottom` | `50px` | `50px` | `50px` | `50px` | — |
| `h2.heading` | `position` | relative | — | — | — | — |
| `h2.heading::before` | `left` | `10` | `-30` | `-30` | `-30` | — |
| `h2.heading::before` | `top` | `-15` | `-50` | `-50` | `-50` | — |
| `h2.heading::before` | `backgroundImage` | linesMobileWhite | linesInvertWhite | linesInvertWhite | linesInvertWhite | — |
| `h2.heading::before` | `height/width` | `12px / 14px` | — | — | — | — |
| `Grid container spacing={2}` | gap | 16px | — | — | — | — |
| Left `Card` | `width / height` | `100% / 327px` | `100% / 400px` | `100% / 500px` | `100% / 707px` | — |
| Left `Card` | `borderRadius` | `20px` | — | — | — | — |
| Left `Card` | `boxShadow` | `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D` | — | — | — | — |
| Right column container | display | flex justify-center items-center | — | — | — | — |
| Right inner `Grid container spacing={2}` | gap | 16px | — | — | — | — |
| Inner `Card` (review card) | `height` | `147px` | — | — | `204px` | — |
| Inner `Card` | `padding` | `10px` | — | — | — | — |
| Inner `Card` | `borderRadius` | `20px` | — | — | — | — |
| Inner `Card` | `backgroundColor` | `rgba(255,255,255,0.7)` | — | — | — | — |
| Inner `Card` | `boxShadow` | `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000D` | — | — | — | — |
| Inner `Card` display | flex items-center | — | — | — | — | — |
| Inner `<video>` | `width` | `184px` | — | — | `283px` | — |
| Inner `<video>` | `height` | `135px` | — | — | `204px` | — |
| Inner `<video>` | `borderRadius` | `10px` | — | — | — | — |
| Inner text `Box` | `marginLeft` | `25px` | — | — | — | — |
| `.userName` | `fontSize` | `20px` | `30px` | `30px` | `30px` | — |
| `.userName` | `lineHeight` | `32px` | — | — | — | — |
| `.userName` | `fontWeight` | `600` | — | — | — | — |
| `.userName` | `color` | black | — | — | — | — |
| `.userName` | `marginY` | `10px` | — | — | `20px` | — |
| `.country` | `fontSize` | `18px` | — | — | — | — |
| `.country` | `lineHeight` | `20px` | — | — | — | — |
| `.country` | `fontWeight` | `400` | — | — | — | — |
| `.country` | `marginY` | `10px` | — | — | `20px` | — |
| `.watch` | `fontSize` | `18px` | — | — | — | — |
| `.watch` | `lineHeight` | `20px` | — | — | — | — |
| `.watch` | `fontWeight` | `600` | — | — | — | — |
| `.watch` | `color` | `#00A1FF` | — | — | — | — |
| `.watch` | `marginY` | `20px` | — | — | — | — |
| `.watch` | display | flex items-center | — | — | — | — |

### Typography

| Element | Mobile | sm | md | Desktop (lg) | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `h2.heading` | 35/45 | 40/50 | 55/65 | 55/65 | 600 | black | League Spartan |
| `.userName` | 20/32 | 30/32 | 30/32 | 30/32 | 600 | black | League Spartan |
| `.country` | 18/20 | — | — | — | 400 | black | League Spartan |
| `.watch` | 18/20 | — | — | — | 600 | `#00A1FF` | League Spartan |

> The h2 uses **literal px** values (35/40/55/55), **not** the theme's h2 token (22/28/36). Preserve the literal values via arbitrary classes.

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `black` | `text-black` |
| `#00A1FF` (watch link) | `text-[#00A1FF]` (no token) |
| `rgba(255,255,255,0.7)` (card bg) | `bg-white/70` |
| `#00000026` shadow stop (~15% alpha black) | preserved in inline shadow string |
| `#0000000D` shadow stop (~5% alpha black) | preserved in inline shadow string |

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 21 | `h2`: `relative mb-[50px] text-center font-heading text-[35px] font-semibold leading-[45px] sm:text-[40px] sm:leading-[50px] md:text-start md:text-[55px] md:leading-[65px] lg:text-start lg:text-[55px] lg:leading-[65px] text-black` | ✓ Matches MUI literal cascade. `font-semibold` matches `fontWeight: 600`. md+ left-aligned. | OK ✓ |
| B2 | 26 | linesMobileWhite: `absolute -top-[15px] left-[10px] z-10 h-[12px] w-[14px] object-contain sm:hidden` | MUI xs: `left: 10, top: -15`. ✓. Size 12×14 ✓. | OK ✓ |
| B3 | 32 | linesInvertWhite: `absolute -left-[30px] -top-[50px] z-10 hidden h-[12px] w-[14px] object-contain sm:block` | MUI sm/md/lg: `left: -30, top: -50`. ✓. Size **12×14** in MUI → ✓ preserved. (Note: identical decorative size at both breakpoints; MUI didn't enlarge.) | OK ✓ |
| B4 | 37 | Grid: `grid grid-cols-1 gap-4 lg:grid-cols-12` | MUI `<Grid container spacing={2}>` = 16px both axes → `gap-4` ✓. `lg:grid-cols-12` for 7/5 split ✓. | OK ✓ |
| B5 | 39 | Left Card wrapper: `h-[327px] w-full overflow-hidden rounded-[20px] shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] sm:h-[400px] md:h-[500px] lg:h-[707px]` | ✓ Matches MUI cascade and shadow. `overflow-hidden` is a port-only addition (needed to clip the rounded corners on `<video>`). | OK ✓ |
| B6 | 44-50 | `<video>`: `h-full w-full` | ✓ Matches MUI `CardMedia sx={{ width: "100%", height: "100%" }}`. | OK ✓ |
| B7 | 55 | Right column: `flex items-center justify-center lg:col-span-5` | ✓ Matches MUI `display: flex justifyContent: center alignItems: center`. | OK ✓ |
| B8 | 56 | Inner grid: `grid grid-cols-1 gap-4` | ✓ Matches MUI inner `Grid container spacing={2}`. | OK ✓ |
| B9 | 63 | Review Card: `flex h-[147px] items-center rounded-[20px] bg-white/70 p-[10px] shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] lg:h-[204px]` | ✓ Matches MUI. | OK ✓ |
| B10 | 65-70 | Inner `<video>`: `h-[135px] w-[184px] rounded-md lg:h-[204px] lg:w-[283px]` | MUI `borderRadius: "10px"` → `rounded-md` (if Tailwind config maps `md` to 10px per token map). Sizes ✓. | OK ✓ |
| B11 | 71 | Text wrapper: `ms-[25px]` | MUI uses physical `marginLeft: "25px"`. The AR variant flips to `marginRight: "25px"`. Tailwind `ms-[25px]` (margin-inline-start) is **logical** → automatically becomes margin-right in RTL. ✓ correct. | OK ✓ |
| B12 | 72 | `.userName` `<p>`: `my-[10px] font-heading text-[20px] font-semibold leading-[32px] text-black sm:text-[30px] lg:my-[20px]` | MUI cascade: `fontSize: 20/30/30/30`, `lineHeight: 32` (all sizes), `marginY: { xs: 10px, lg: 20px }`. Current: `text-[20px] sm:text-[30px]` ✓; `leading-[32px]` ✓; `my-[10px] lg:my-[20px]` ✓. | OK ✓ |
| B13 | 75 | `.country` `<p>`: `my-[10px] font-heading text-[18px] font-normal leading-[20px] text-black lg:my-[20px]` | ✓ Matches. | OK ✓ |
| B14 | 78 | `.watch` `<p>`: `my-[20px] flex items-center font-heading text-[18px] font-semibold leading-[20px] text-[#00A1FF]` | ✓ Matches MUI. | OK ✓ |
| B15 | 79 | `<Play size={18} className="ms-1" />` | MUI uses `<PlayArrowIcon />` inline-after-text with no margin override; default MUI icon size is 24px. The Tailwind port shrinks to 18px and adds `ms-1` (4px gap). The visual outcome is smaller/closer to text than MUI. Severity depends on design tolerance. | Low |
| B16 | 26 | linesMobileWhite image: MUI also sets the image size to **12px × 14px** at all breakpoints; the AR `ar-video-based-reviews.tsx` keeps the same size. ✓ | — | OK ✓ |
| B17 | 15 | The Tailwind port reads i18n via `en.json` / `ar.json` directly with a `locale` prop default `"en"` | This is a port-side convention divergence. MUI splits LTR and RTL into separate components. The Tailwind port unifies them. Doesn't affect styling but document the routing change: the page route must pass `locale="ar"` from `/ar/testimonials`. | Doc only |
| B18 | n/a | Container `Box .contanier` flex direction column is replicated in `<div className="flex flex-col items-center justify-center">` | ✓ matches. | OK ✓ |
| B19 | 21 | Heading: missing `text-h2-mobile sm:text-h2-tablet lg:text-h2` triplet | MUI overrides the theme `h2` via explicit sx fontSize 35/40/55/55, so the triplet is **wrong** here. Current use of arbitrary `text-[35px] sm:text-[40px] md:text-[55px] lg:text-[55px]` is **correct**. | OK ✓ |

### Critical fixes

None major. The component is largely faithful. Two minor watchpoints:

1. **B15** — `<Play size={18}>` shrinks the icon vs MUI's default 24px. Decide if this is intentional or revert to `size={24}` to match MUI baseline.
2. **B11** — Confirm `ms-[25px]` resolves correctly in RTL (it should via logical-property map).

---

## §3 Corrected Tailwind classNames

No structural change needed. Suggested polish:

```tsx
// Watch link — increase icon size to match MUI default
<p className="my-[20px] flex items-center font-heading text-[18px] font-semibold leading-[20px] text-[#00A1FF]">
  {t.watch_video} <Play size={24} className="ms-1" />
</p>
```

### From → To

| From | To |
|---|---|
| `<Play size={18} className="ms-1" />` | `<Play size={24} className="ms-1" />` (optional polish) |

---

## §4 Verification at 4 widths

- **375 px** — Single column. Heading 35px / lh 45px center, mb 50px. Decorative linesMobileWhite at `(10, -15)`, 12×14 px. Featured video card 100% × 327px, rounded-20. Review cards stack: 147px tall, 10px padding, 184×135 thumbnail (rounded-10), 25px gap to text, name 20px / lh 32, country 18px / lh 20, watch 18px / lh 20 in `#00A1FF`.
- **768 px** — Heading 40px / lh 50px **still center** (md=900 not reached). Featured video 100% × 400px. Review thumbnail still 184×135. Name 30px (sm). Decorative still linesInvertWhite (sm break reached).
- **1280 px** — Two-column grid (7/5). Heading 55px / lh 65px **left-aligned**. Featured video 100% × 707px (left col). Right col: review cards stacked, each 204px tall, thumbnail 283×204 (rounded-10), name 30px / lh 32, my-20 each.
- **1920 px** — Same as 1280; grid maintains 7/5 ratio.

---

## §5 RTL notes

- AR variant flips `marginLeft: "25px"` → `marginRight: "25px"` and `::before.left` → `::before.right`.
- The Tailwind port uses logical `ms-[25px]` → ✓ auto-flips.
- The decorative images use physical `-left-[30px]` / `left-[10px]` — these will not flip in RTL. Replace with `-start-[30px]` / `start-[10px]` for the AR pass.
- Heading `text-start` is already logical (md+ alignment).
- The Tailwind port reads from `ar.json` based on a `locale` prop. Ensure the consuming page (`/ar/testimonials`) passes `locale="ar"`.
- The `flex items-center` order inside each review card naturally reverses in RTL — video moves to the right, text block to the left. This is the desired behavior per the AR baseline.
