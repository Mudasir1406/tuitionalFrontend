# Component — `<Hero>` (blog index / category / tag pages)

The hero at the top of `/blog`, `/blog/category/[slug]`, `/blog/tag/[slug]`. Headline + descriptor + email-subscribe pill + Trustpilot rating row. Uses a decorative `::before` pseudo-element on the headline ("lines" PNG accent).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\hero\Hero.tsx` + `Hero.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\hero\Hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-hero\Ar-Hero.tsx` (RTL: see §5) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.heroContainer (flex col, left-aligned at lg; centered <768px)
├── h1.expertText (slug or "Our Blogs"; brand blue; ::before accent)
├── p.desc (body2; 14px; centered <1200px, left ≥1200px)
├── .mobileContanier (search-pill)
│   ├── TextField (60% width, no border)
│   └── Button "Subscribe!" (40% width, half-pill)
└── <Box> (Trustpilot row)
    ├── greenstar image (3vh × 3vh) + Typography "Trustpilot" (subtitle2 = stat-label)
    └── Typography "Excellent (4.7/5)" (caption = small) + greenstars image (3vh × 14vh)
```

### Dimensions & spacing

| Element | Property | Mobile (<576) | Tablet (576-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.heroContainer` | align/text | center | center (>=768 center) | left / flex-start |
| `.desc` | margin-top | `1vh` | `1vh` | `1vh` |
| `.desc` | padding-x | `2vh` | `2vh` (centered ≥768) | `0` |
| `.desc` | width | auto | auto | `90%` |
| `.mobileContanier` | width | `100%` (max) | `50vw` (≥768) | `50vw` |
| `.mobileContanier` | margin-top | `2vh` | `2vh` | `2vh` (effectively — overridden by inline `marginTop: 8vh` initial then media reset) |
| `.mobileContanier` | height | `5.5vh` | `8.5vh` (default) | `8.5vh` |
| `.mobileContanier` | border-radius | `2vh` | `2vh` | `2vh` |
| `.mobileContanier` | bg / shadow | white / inset shadows | same | same |
| `.button` | width | 40% | 40% | 40% |
| `.button` | height | `5.5vh` | `8.5vh` | `8.5vh` |
| `.button` | radius (right side) | `14px` | `14px` | `14px` |
| Trustpilot row marginTop | `sx` value | `1vh` (xs) | `2vh` (sm) | `6vh` (lg) |
| Trustpilot row gap | | `1rem` | `1rem` | `1rem` |
| greenstar | width/height | `3vh × 3vh` | same | same |
| greenstars | width/height | `3vh × 14vh` | same | same |
| `::before` (decoration) | top/h/w | `-2.5vh / 1.9vh / 2vh` | same | `-3vh / 4.3vh / 4.3vh` (lg) |
| `::before` image | | `linesMobile.png` | `linesMobile.png` (≥768 from `right: 0`) | `lines.png` |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `.expertText` h1 | `h1` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | `#38b6ff` (brand-500) | League Spartan |
| `.desc` p | `body2` | 0.875rem (14px) | 0.875rem | 0.875rem | 400 | `#000` (black) | League Spartan (via className override) |
| Trustpilot label | `subtitle2` | 0.875rem | 0.875rem | 0.875rem | (default) | inherits | League Spartan |
| Excellent label | `caption` | 0.875rem | 0.875rem | 0.875rem | 400 | inherits | League Spartan |
| Button label | (Button default) | 15px | 16px | 16px | 600 | white | League Spartan |

### Colors

| Hex | Token |
|---|---|
| `#38b6ff` (h1) | `text-brand-500` |
| `#000000` (desc) | `text-black` |
| `#fff` (search pill bg) | `bg-white` |
| `#ffffff` (button text) | `text-white` |
| `0px -5px 5px 0px rgba(0,0,0,0.2) inset, 0px 4px 5px 0px rgba(0,0,0,0.25) inset` (search pill) | arbitrary |
| `0px -5px 15px 0px rgba(0,0,0,0.2) inset` (button) | arbitrary |
| `1px 4px 14px 0px #38b6ff89` (button hover) | arbitrary |

### Animations / interactions

- Button `transition: all 0.5s ease-in-out`, hover `scale(1.02)` + brand-glow box-shadow
- `::before` is purely decorative — keep as Tailwind `before:` pseudo

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| H1 | 17 | `text-center lg:items-start lg:text-left` | OK — matches MUI media-query progression (centered <1200, left-aligned ≥1200) | none |
| H2 | 17 | (no `items-center` for <768 break) | MUI `.heroContainer` is `align-items: flex-start` by default and `align-items: center` <768 — current uses `items-center lg:items-start` which collapses 576-1199 to center (slight drift but visually fine) | low |
| H3 | 19 | `mt-[1vh] mb-[0vh] pr-[2vw]` | The MUI `.heading` (not `.expertText` — they're applied to the same heading) uses `margin-top: 3vh; margin-bottom: 3vh; padding-right: 2vw`. The mobile media-query drops `margin-top: 2vh`. Current `mt-[1vh]` is too tight. Use `mt-[2vh] mb-[3vh] pr-[2vw] sm:mt-[3vh]` | med |
| H4 | 19 | `text-h1-mobile sm:text-h1-tablet lg:text-h1` | OK — correct triplet (28/36/48) | none |
| H5 | 19 | `relative inline-block` | Current `inline-block` is fine; MUI uses `display: inline; position: relative` — `inline-block` is preferred in modern flow | none |
| H6 | 21 | `before:left-0 before:-top-[2.5vh] before:h-[1.9vh] before:w-[2vh]` | Correct mobile values | none |
| H7 | 22 | `md:before:left-auto md:before:right-0` | MUI switches anchor to `right: 0` at `min-width: 768` — `md:` (Tailwind=900) is 132px late but acceptable | low |
| H8 | 23 | `lg:before:-top-[3vh] lg:before:h-[4.3vh] lg:before:w-[4.3vh]` | Correct ≥1200 values + `bg-[url('/assets/images/static/lines.png')]` | none |
| H9 | 28 | `text-body-mobile sm:text-body` for `.desc` | MUI uses `variant="body2"` → 14px both viewports. Should be `text-small` (14px) not body (15→16px). Slight up-scale. | med |
| H10 | 28 | `text-black` | OK (`#000`) | none |
| H11 | 28 | `mt-[1vh] px-[2vh]` | OK (matches `margin-top: 3vh` reset to `1vh` by media query, padding-x 2vh) | none |
| H12 | 28 | `lg:px-0 lg:w-[90%]` | Correct | none |
| H13 | 34 | `mt-[1vh]` | MUI initial `margin-top: 8vh`, mobile override to `2vh`, ≥768 `2vh`. Current `1vh` is too tight on the search pill. Use `mt-[2vh] lg:mt-[2vh]` (the 8vh original was overridden by every media query) | med |
| H14 | 34 | `w-[95%] h-[5.5vh] md:max-w-[50vw] lg:h-[8.5vh]` | Acceptable: MUI mobile is `max-width: 100%` (effectively the parent), 5.5vh, then 8.5vh at ≥576px, 50vw max ≥768px. Closer match: `w-[95%] h-[5.5vh] sm:max-w-full sm:h-[8.5vh] md:max-w-[50vw]` | low |
| H15 | 36 | `rounded-[2vh] shadow-[...inset,...inset]` | OK matches | none |
| H16 | 42 | input className with `text-form-input` (16px) | OK — iOS-zoom safe | none |
| H17 | 47 | Button `w-[40%] h-full rounded-l-none rounded-r-[14px]` | OK | none |
| H18 | 53 | `mt-[1vh] sm:mt-[1.5vh] lg:mt-[2vh]` | MUI sx is `{ xs: "1vh", sm: "2vh", lg: "6vh" }`. Tablet should be `sm:mt-[2vh]`, desktop **`lg:mt-[6vh]`** not `2vh` | high |
| H19 | 53 | `flex-row items-center justify-center lg:justify-start` | OK (mui `flexDirection: { xs: "row", lg: "row" }, alignItems: { xs: "center", lg: "flex-start" }, justifyContent: { xs: "center", lg: "start" }`) | none |
| H20 | 60 | `text-stat-label uppercase` | Wrong — MUI uses `variant="subtitle2"` here, which is `stat-label` sizing **without uppercase** (the `categoryTag` variant has uppercase, not subtitle2). Drop `uppercase`. | med |
| H21 | 65 | `text-small` | OK — MUI variant="caption" → 14px | none |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="flex flex-col items-center text-center lg:items-start lg:text-left">
  <h1
    className="relative mt-[2vh] mb-[3vh] inline-block pr-[2vw] font-heading text-h1-mobile sm:text-h1-tablet sm:mt-[3vh] lg:text-h1 text-brand-500
      before:content-[''] before:absolute before:z-10 before:bg-no-repeat before:bg-contain
      before:left-0 before:-top-[2.5vh] before:h-[1.9vh] before:w-[2vh] before:bg-[url('/assets/images/static/linesMobile.png')]
      md:before:left-auto md:before:right-0
      lg:before:-top-[3vh] lg:before:h-[4.3vh] lg:before:w-[4.3vh] lg:before:bg-[url('/assets/images/static/lines.png')]"
  >
    {slug ?? "Our Blogs"}
  </h1>

  <p className="mt-[1vh] px-[2vh] font-heading text-small text-black lg:px-0 lg:w-[90%]">
    Your source for expert tips, academic strategies, and learning resources
    for Cambridge, AP, and more
  </p>

  <div
    className="mt-[2vh] flex items-center justify-center w-[95%] h-[5.5vh] sm:h-[8.5vh] md:max-w-[50vw] bg-white rounded-[2vh]
      shadow-[0px_-5px_5px_0px_rgba(0,0,0,0.2)_inset,0px_4px_5px_0px_rgba(0,0,0,0.25)_inset]"
  >
    <input
      type="email"
      placeholder="Your Email*"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-[60%] h-full bg-transparent border-0 px-4 font-heading text-form-input text-ink-900 outline-none placeholder:text-ink-400"
    />
    <Button
      onClick={() => {}}
      variant="primary"
      className="w-[40%] h-full rounded-l-none rounded-r-[14px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.2)_inset] transition-all duration-500 hover:scale-[1.02] hover:shadow-[1px_4px_14px_0px_rgba(56,182,255,0.54)]"
    >
      Subscribe!
    </Button>
  </div>

  <div className="mt-[1vh] flex flex-row items-center justify-center gap-4 sm:mt-[2vh] lg:mt-[6vh] lg:justify-start">
    <div className="inline-flex items-center gap-2">
      <Image src={greenstar} alt="" className="block h-[3vh] w-[3vh] shrink-0 object-contain" />
      <span className="font-heading text-stat-label">Trustpilot</span>
    </div>
    <div className="inline-flex items-center gap-2">
      <span className="font-heading text-small">Excellent (4.7/5)</span>
      <Image src={greenstars} alt="" className="block h-[3vh] w-[14vh] shrink-0 object-contain" />
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375 (iPhone SE)**: search pill is full-width with 5.5vh height; h1 is 28px centered; Trustpilot row centered with 1vh top.
- **768 (iPad Mini)**: search pill capped at 50vw, height 8.5vh; h1 36px centered (Tailwind `sm:` at 600 means desktop sizing kicks in earlier than MUI's 768 — slight drift, acceptable).
- **1280 (Laptop S)**: h1 48px left-aligned with `lines.png` decoration on right; Trustpilot row left-aligned at `mt-[6vh]`.
- **1920**: same as 1280, more whitespace.

## §5 RTL notes

`Ar-Hero.module.css` adds these RTL overrides (don't apply in LTR):
- `.heroContainerRTL` → `align-items: flex-end; text-align: right; direction: rtl`
- `.expertText::before` anchor flips left↔right at each breakpoint
- `.mobileContanierRTL` → `flex-direction: row-reverse`
- `.buttonRTL` → right-rounded → left-rounded (`rounded-r-none rounded-l-[14px]`)
- `.descRTL` at ≥1200 → `text-align: end; padding-left/right: 0`

When `isArabic`, swap:
```tsx
className={cn(
  "...base...",
  isArabic && "rtl:items-end rtl:text-right rtl:flex-row-reverse",
)}
```
plus button `rounded-l-[14px] rounded-r-none` and `::before` `lg:rtl:before:left-0 lg:rtl:before:right-auto`.
