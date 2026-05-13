# Component — `ReviewsOnSp` (testimonials)

"Reviews on Social Platforms" section — left side a girl-in-circle illustration, right side an `<h2>` headline, paragraph, and a "99% • Student's complete classes successfully." stat row separated by a vertical divider.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\reviews-on-sp.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\reviews-on-sp.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\testimonials\ar-reviews-on-sp.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Grid container spacing={4} (sx={ background: { xs: linear-gradient..., lg: none } })
├── Grid item xs=12 md=12 lg=7
│   └── Box (h-100, w-100, flex, justify-center, relative, mt {70/60/60/0})
│       └── Image girlInCircle (style { height: auto, width: "90%" })
└── Grid item xs=12 md=12 lg=5
    └── Box (paddingBottom: 52px)
        ├── Typography component="h2" variant="h2" sx={styles.heading}  ──→ "Reviews on Social <br/> Platforms"  (with ::before linesInvert/linesMobile image)
        ├── Typography component="p" variant="h5" sx={styles.desc}  ──→ "The teachers at Tuitional..."
        └── Box (flex row, justify-center, items-center, mt: 80px, paddingLeft { xs:50px ... lg:0 })
            ├── Typography sx={styles.percent}  ──→ "99%"
            ├── Divider orientation="vertical" variant="middle" flexItem sx={{ color: black, marginX: 2 }}
            └── Typography sx={styles.complete}  ──→ "Student's complete<br/>classes successfully."
```

### Dimensions & spacing

| Element | Property | xs (mobile) | sm | md | lg (desktop) |
|---|---|---|---|---|---|
| `Grid container` | `spacing` | 4 (= 32px gap both axes) | — | — | — |
| `Grid container` | `background` | gradient | gradient | gradient | `none` |
| Left `Box` | `marginTop` | `"70px"` | `"60px"` | `"60px"` | `"0px"` |
| Left `Box` | `width / height` | `100% / 100%` | — | — | — |
| `<Image>` girlInCircle | `style.width` | `"90%"` | — | — | — |
| `<Image>` girlInCircle | `style.height` | `"auto"` | — | — | — |
| Right `Box` | `paddingBottom` | `"52px"` | — | — | — |
| `h2.heading` | `marginTop` | `"70px"` | `"80px"` | `"95px"` | `"105px"` |
| `h2.heading` | `paddingX` | `"50px"` | `"50px"` | `"50px"` | `0` |
| `h2.heading` | `textAlign` | center | center | center | `left` |
| `h2.heading::before` | `left` | `40` | `10` | `-30` | `-30` |
| `h2.heading::before` | `top` | `-20` | `10` | `-30` | `-50` |
| `h2.heading::before` | `backgroundImage` | linesMobile | linesInvert | linesInvert | linesInvert |
| `h2.heading::before` | `height` | `35px` | `35px` | `35px` | `35px` |
| `h2.heading::before` | `width` | (default) | (default) | (default) | `43px` |
| `p.desc` | `paddingLeft` | `"50px"` | `"50px"` | `"50px"` | `0` |
| `p.desc` | `textAlign` | center | center | center | left |
| `p.desc` | `width` | (default) | — | — | `60%` |
| Stat row `Box` | `display` | flex row | — | — | — |
| Stat row `Box` | `marginTop` | `"80px"` | — | — | — |
| Stat row `Box` | `paddingLeft` | `"50px"` | `"50px"` | `"50px"` | `0` |
| `Divider` | `marginX` | `2` (= 16px) | — | — | — |
| `Divider` | `color` | black | — | — | — |
| `Divider` | orientation | vertical | — | — | — |
| `Divider` | variant | middle (default middle inset 8px) | — | — | — |
| `.complete` | `width` | (default) | — | — | `60%` |

### Typography

| Element | MUI variant | Mobile | sm | md | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| `h2.heading` | `variant="h2"` (no sx fontSize override) | 22px | 28px | 28px | 36px | 700 | `#000000` | League Spartan |
| `p.desc` | `variant="h5"` + `sx.fontSize` override | `18px` | `20px` | `25px` | `25px` | 400 | black | League Spartan |
| `p.desc` line-height | — | `25px` | `30px` | `40px` | `40px` | — | — | — |
| `.percent` ("99%") | inline | `60px` | `60px` | `60px` | `85px` | 700 | `#38B6FF` (xs/sm/md) → `black` (lg) | League Spartan |
| `.percent` line-height | — | `55px` | `55px` | `55px` | `65px` | — | — | — |
| `.complete` | inline | `18px` | `20px` | `25px` | `25px` | 400 | black | League Spartan |
| `.complete` line-height | — | `25px` | `30px` | `40px` | `40px` | — | — | — |

> The MUI `variant="h5"` is **overridden** by explicit `fontSize`/`lineHeight` in `sx`. Don't rely on the `h5` typography token; the inline values are authoritative (18/20/25/25 px).

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `#000000` / `black` | `text-black` |
| `#38B6FF` (mobile percent) | `text-brand-500` |
| Gradient `linear-gradient(360deg, rgba(211,239,255,0) 0%, #D3EFFF 6.36%, #D3EFFF 44.4%, rgba(211,239,255,0) 100%)` | arbitrary `bg-[linear-gradient(360deg,rgba(211,239,255,0)_0%,#D3EFFF_6.36%,#D3EFFF_44.4%,rgba(211,239,255,0)_100%)]` (mobile only; remove at lg with `lg:bg-none`) |

### Animations / interactions

None. Static layout.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 14 | `grid grid-cols-1 gap-8 ... lg:grid-cols-12 lg:bg-none` | MUI `Grid container spacing={4}` = 32px gap → `gap-8` ✓. `lg:grid-cols-12` is correct for the 7/5 column split. | OK ✓ |
| B2 | 14 | Gradient applied at base, dropped at `lg:bg-none` | ✓ Matches MUI. | OK ✓ |
| B3 | 15 | Left column uses `lg:col-span-7` | ✓ Matches MUI `lg={7}`. | OK ✓ |
| B4 | 16 | `mt-[70px] sm:mt-[60px] md:mt-[60px] lg:mt-0` | ✓ Matches MUI cascade. | OK ✓ |
| B5 | 23 | Image `className="h-auto w-[90%]"` | ✓ Matches `style={{ height: "auto", width: "90%" }}`. | OK ✓ |
| B6 | 27 | Right column `lg:col-span-5` | ✓ Matches MUI `lg={5}`. | OK ✓ |
| B7 | 28 | Right inner `pb-[52px]` | ✓ Matches MUI `paddingBottom: "52px"`. | OK ✓ |
| B8 | 29 | `h2`: `relative mt-[70px] px-[50px] text-center font-heading text-h2-mobile sm:mt-[80px] sm:text-h2-tablet md:mt-[95px] lg:mt-[105px] lg:px-0 lg:text-start lg:text-h2 text-black` | ✓ Triplet correct. mt cascade correct. paddingX matches. textAlign matches. | OK ✓ |
| B9 | 33–40 | Two `<Image>` elements swap at `sm:hidden` / `sm:block` for `linesMobile` ↔ `linesInvert` | MUI swaps at **sm (600px)**: xs uses `linesMobile`, sm+ uses `linesInvert`. Current `sm:hidden` / `sm:block` is correct. | OK ✓ |
| B10 | 34 | linesMobile image positioning: `absolute -top-5 left-10 z-10 h-[35px] w-[43px]` | MUI xs: `top: -20, left: 40`. `-top-5 = -20px ✓` and `left-10 = 40px ✓`. **But MUI gives `width: { lg: "43px" }` only** — at xs the width is default (intrinsic). Hard-coding `w-[43px]` at base is a port-only choice; acceptable. | Low |
| B11 | 39 | linesInvert image: `absolute z-10 hidden h-[35px] w-[43px] object-contain sm:left-[10px] sm:top-[10px] sm:block md:-left-[30px] md:-top-[30px] lg:-left-[30px] lg:-top-[50px]` | MUI sm: `left: 10, top: 10`. ✓. md: `left: -30, top: -30`. ✓. lg: `left: -30, top: -50`. ✓. | OK ✓ |
| B12 | 46 | `p.desc`: `px-[50px] text-center text-[18px] font-normal leading-[25px] sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:px-0 lg:text-start lg:text-[25px] lg:leading-[40px] text-black font-heading` | ✓ Matches MUI explicit cascade (18/20/25/25 and 25/30/40/40). Note: only `paddingLeft` in MUI, current uses `px-[50px]` (both sides). MUI only sets `paddingLeft`. Fix: use `ps-[50px] lg:ps-0` to match exactly (and respect RTL). | Medium |
| B13 | 50 | Stat row: `mt-20 flex flex-row items-center justify-center ps-[50px] lg:ps-0` | ✓ MUI `marginTop: "80px"` → Tailwind `mt-20` = 80px ✓. `paddingLeft: { xs: 50px ... lg: 0 }` → `ps-[50px] lg:ps-0` ✓. | OK ✓ |
| B14 | 51 | `.percent`: `font-heading text-[60px] font-bold leading-[55px] text-brand-500 lg:text-[85px] lg:leading-[65px] lg:text-black` | ✓ Matches MUI cascade. (60/60/60/85 — the sm and md are also 60, so no override needed.) | OK ✓ |
| B15 | 54 | Divider: `mx-2 self-stretch border-s border-black` | MUI `<Divider orientation="vertical" variant="middle" flexItem sx={{ color: "black", marginX: 2 }}>` — `marginX: 2` = 16px → `mx-4` (Tailwind unit 4 = 16px), **not** `mx-2` (which is 8px). Also `variant="middle"` adds vertical inset (margin-y) of 8px on a `<Divider variant="middle" />`. | Medium |
| B16 | 54 | Divider uses `border-s` (start-side border) | A logical-side border on a `self-stretch` div produces a single-vertical line. MUI uses a `<Divider>` (which is its own element with a border). Visually equivalent. **But** `border-s` is LTR=left / RTL=right. Combined with the structure, current is acceptable. | OK ✓ |
| B17 | 55 | `.complete` `<p>`: `text-[18px] font-normal leading-[25px] sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:text-[25px] lg:leading-[40px] text-black font-heading` | ✓ Matches MUI cascade. | OK ✓ |
| B18 | 29 | `h2` uses Tailwind `text-h2-*` triplet (22/28/36) | MUI `variant="h2"` resolves to 22/28/36 — ✓. Note: the original Tuitional design had explicit `35/40/55/55px` in many testimonial headings (e.g. ReviewsOnWp, VideoBased). The `ReviewsOnSp` heading is **not** overridden in MUI sx, so the triplet value (22/28/36) is correct here. | OK ✓ |

### Critical fixes

1. **B12** — `px-[50px]` → `ps-[50px] lg:ps-0` (MUI only set `paddingLeft`, not symmetric).
2. **B15** — `mx-2` → `mx-4` (MUI `marginX: 2` is 16px in the 8px MUI spacing system).

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="grid grid-cols-1 gap-8 bg-[linear-gradient(360deg,rgba(211,239,255,0)_0%,#D3EFFF_6.36%,#D3EFFF_44.4%,rgba(211,239,255,0)_100%)] lg:grid-cols-12 lg:bg-none">
    <div className="lg:col-span-7">
      <div className="relative mt-[70px] flex h-full w-full justify-center sm:mt-[60px] md:mt-[60px] lg:mt-0">
        <Image
          src={girlInCircle.src}
          width={girlInCircle.width}
          height={girlInCircle.height}
          alt={t("testimonials.reviews_on_sp.image_alt")}
          className="h-auto w-[90%]"
        />
      </div>
    </div>

    <div className="lg:col-span-5">
      <div className="pb-[52px]">
        <h2 className="relative mt-[70px] px-[50px] text-center text-black font-heading text-h2-mobile sm:mt-[80px] sm:text-h2-tablet md:mt-[95px] lg:mt-[105px] lg:px-0 lg:text-start lg:text-h2">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -top-5 left-10 z-10 h-[35px] w-[43px] object-contain sm:hidden"
          />
          <Image
            src={linesInvert}
            alt=""
            aria-hidden="true"
            className="absolute z-10 hidden h-[35px] w-[43px] object-contain sm:left-[10px] sm:top-[10px] sm:block md:-left-[30px] md:-top-[30px] lg:-left-[30px] lg:-top-[50px]"
          />
          {t("testimonials.reviews_on_sp.heading_line_1")} <br />
          {t("testimonials.reviews_on_sp.heading_line_2")}
        </h2>

        <p className="ps-[50px] text-center font-heading text-[18px] font-normal leading-[25px] text-black sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:ps-0 lg:text-start lg:text-[25px] lg:leading-[40px]">
          {t("testimonials.reviews_on_sp.description")}
        </p>

        <div className="mt-20 flex flex-row items-center justify-center ps-[50px] lg:ps-0">
          <span className="font-heading text-[60px] font-bold leading-[55px] text-brand-500 lg:text-[85px] lg:leading-[65px] lg:text-black">
            {t("testimonials.reviews_on_sp.percent")}
          </span>
          <div className="mx-4 my-2 self-stretch border-s border-black" />
          <p className="font-heading text-[18px] font-normal leading-[25px] text-black sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] lg:w-[60%] lg:text-[25px] lg:leading-[40px]">
            {t("testimonials.reviews_on_sp.complete_line_1")}
            <br />
            {t("testimonials.reviews_on_sp.complete_line_2")}
          </p>
        </div>
      </div>
    </div>
  </div>
);
```

### From → To

| From | To |
|---|---|
| `px-[50px] ... lg:px-0` on `p.desc` | `ps-[50px] lg:ps-0` |
| `mx-2 self-stretch border-s border-black` (divider) | `mx-4 my-2 self-stretch border-s border-black` |

---

## §4 Verification at 4 widths

- **375 px** — Single column, mobile gradient visible. Image 90% wide, top margin 70px. Heading 22px center, padding-start 50px. linesMobile decorative at `left:40, top:-20`. Description 18px / lh 25px center, padding-start 50px. Stat row centered, padding-start 50px, percent 60px blue, divider 16px horizontal margins, complete 18px/25px.
- **768 px** — Same single-column layout. Image top margin 60px. Heading 28px center, decorative swaps to linesInvert at `left:10, top:10`. Description 20px / lh 30px. Percent still 60px / blue.
- **1280 px** — Two-column grid (7/5). Background gradient cleared. Image top margin 0. Heading 36px **left-aligned**, no horizontal padding, decorative at `left:-30, top:-50` (43×35px). Description 25px / lh 40px left-aligned, width 60%. Percent 85px / black; divider 16px margin; complete 25px / lh 40px.
- **1920 px** — Same as 1280; layout doesn't change between lg and xl.

---

## §5 RTL notes

- The AR variant (`ar-reviews-on-sp.tsx`) flips:
  - `paddingLeft` on heading/desc → `paddingRight`
  - `textAlign: { lg: "left" }` → `textAlign: { lg: "right" }`
  - `::before.left` → `::before.right`
- The Tailwind port already uses logical classes:
  - `ps-[50px]` resolves to `padding-inline-start` → flips correctly.
  - `lg:text-start` resolves to `text-align: start` → flips correctly.
- The decorative `<Image>` uses `left-10` / `sm:left-[10px]` / `md:-left-[30px]` / `lg:-left-[30px]` (physical `left`). In RTL these need to become `right-*` equivalents. Fix in port by switching to logical `start-*`/`end-*`:
  - `left-10` → `start-10`
  - `sm:left-[10px]` → `sm:start-[10px]`
  - `md:-left-[30px]` → `md:-start-[30px]`
  - `lg:-left-[30px]` → `lg:-start-[30px]`
- `border-s` for the divider is logical → already correct.
