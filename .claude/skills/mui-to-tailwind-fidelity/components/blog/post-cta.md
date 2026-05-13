# Component — `<PostCTA>`

Brand-blue CTA bar shown after blog content. "Admissions are Open" copy + plan icon + "Enroll Now!" white pill button. Overlaps the section above by `-70px` (intentional negative margin to bridge sections).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\postCTA\PostCTA.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\blog\postCTA\PostCTA.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-postCTA\Ar-PostCTA.tsx` (RTL: text-align flips, no major layout diff) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box .contactContanier> (brand-blue bg, marginTop -70px, padding {xs:10,sm:20,md:25,lg:30}, radius 5)
└── <Grid container spacing={2}> (row, items-center, justify-{xs:center, sm:space-between})
    ├── <Grid item xs={12} sm={3} md={2.5}>
    │   └── <Box .imageContanier> (circular white badge 9vh, max/min 90/75) > <Image plan>
    ├── <Grid item xs={12} sm={6} md={6.5}>
    │   └── <Typography variant="subtitle1" sx={admissionText}> "Admissions are Open..."
    └── <Grid item xs={12} sm={3} md={3}>
        └── <PopUpButton text="Enroll Now!" sx={contactButton}>
```

### Dimensions & spacing

| Element | Property | Mobile (xs) | Tablet (sm) | Medium (md) | Desktop (lg) |
|---|---|---|---|---|---|
| `.contactContanier` | padding | `10px` | `20px` | `25px` | `30px` |
| `.contactContanier` | margin-top | `-70px` | `-70px` | `-70px` | `-70px` |
| `.contactContanier` | bg | `rgba(56,182,255,1)` | same | same | same |
| `.contactContanier` | border-radius | `5px` | `5px` | `5px` | `5px` |
| Grid `spacing` | gap | `16px` (both axes from spacing={2}) | same | same | same |
| `.imageContanier` | width/height | `9vh` (75-90px clamp) | same | same | same |
| `.imageContanier` | radius | `50%` | `50%` | `50%` | `50%` |
| Plan icon | width × height | `50 × 60px` | same | same | same |
| Plan icon | margin-top | `10px` | same | same | same |
| `.contactButton` padding-y | | `1.5vh` | `1.5vh` | `2vh` | `2vh` |
| `.contactButton` padding-x | | `25px` | `25px` | `22px` | `25px` |
| `.contactButton` radius | | `10px` | `10px` | `10px` | `10px` |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `.admissionText` | `subtitle1` (= stat-number) | 28px | 36px | 48px | (default 700) | white | League Spartan |
| `.admissionText` text-align | — | center | center | start (md+) | — | — | — |
| `.admissionText` margin-left | — | `10px` | `10px` | `10px` | — | — | — |
| Button "Enroll Now!" | (Button default) | 15→16px | 16px | 16px | 600 | `#009BF5` | League Spartan |
| Button line-height | | `23px` | same | same | — | — | — |
| Button letter-spacing | | `-2%` | same | same | — | — | — |

### Colors

| Hex | Token |
|---|---|
| `rgba(56,182,255,1)` (`#38b6ff`) bg | `bg-brand-500` |
| `#fff` (badge / button bg) | `bg-white` |
| `#009BF5` (button text) | not a token — use `text-[#009BF5]` (close to brand-500 but slightly different) |
| white text on bar | `text-white` |
| `1px 15px 34px 0px rgba(0,0,0,0.2)` (button shadow) | `shadow-cta-white` |

### Animations / interactions

- Button `:hover` keeps `bg-white` + same shadow (no change). Just consistency on hover.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| PC1 | 8 | `-mt-[70px] flex w-auto items-center rounded bg-brand-500 p-[10px] sm:p-5 md:p-[25px] lg:p-[30px]` | OK matches MUI (radius 5px ≈ `rounded`, padding progression correct) | none |
| PC2 | 9 | `grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-12 sm:justify-between` | Acceptable — MUI uses `Grid spacing={2}` (=16px both axes, so `gap-4` is correct). The `grid-cols-12 sm:` matches the 600px-up split. | none |
| PC3 | 11 | `h-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px] w-[9vh] ... rounded-full bg-white` | OK matches | none |
| PC4 | 18 | `mt-[10px] h-[60px] w-[50px] object-contain` | OK matches | none |
| PC5 | 22 | `sm:col-span-6 md:col-span-7` for text | MUI has `sm={6} md={6.5}` — Tailwind grid can't do 6.5/12. `md:col-span-7` rounds up. Acceptable. | low |
| PC6 | 23 | `text-stat-number-mobile sm:text-stat-number-tablet md:text-start lg:text-stat-number text-white` | OK — MUI uses `variant="subtitle1"` which maps to stat-number triplet (28/36/48). Tailwind triplet is correct. | none |
| PC7 | 23 | `ms-[10px] text-center md:text-start` | OK matches `marginLeft: 10px` and text-align xs/sm/md split | none |
| PC8 | 27 | `sm:col-span-3 md:col-span-3` for button col | OK | none |
| PC9 | 28-40 | PopUpButton with inline `style={{}}` and `px-[25px] py-[1.5vh] md:px-[22px] md:py-[2vh] lg:px-[25px]` | The inline `style={{...}}` is sub-optimal but matches MUI values exactly. Refactor to className-only: `bg-white text-[#009BF5] rounded-[10px] tracking-[-0.02em] leading-[23px] shadow-cta-white px-[25px] py-[1.5vh] md:px-[22px] md:py-[2vh] lg:px-[25px] hover:bg-white hover:shadow-cta-white` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="-mt-[70px] flex w-auto items-center rounded bg-brand-500 p-[10px] sm:p-5 md:p-[25px] lg:p-[30px]">
  <div className="grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-12 sm:justify-between">
    <div className="flex justify-center sm:col-span-3 md:col-span-2">
      <div className="flex h-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px] w-[9vh] items-center justify-center rounded-full bg-white">
        <Image
          src={plan.src}
          width={plan.width}
          height={plan.height}
          alt="plan"
          quality={100}
          className="mt-[10px] h-[60px] w-[50px] object-contain"
        />
      </div>
    </div>
    <div className="flex justify-center sm:col-span-6 md:col-span-7">
      <p className="ms-[10px] text-center font-heading text-stat-number-mobile text-white sm:text-stat-number-tablet md:text-start lg:text-stat-number">
        Admissions are Open for the Next Year Batch
      </p>
    </div>
    <div className="flex justify-center sm:col-span-3">
      <PopUpButton
        text="Enroll Now!"
        href="popup"
        className="rounded-[10px] bg-white px-[25px] py-[1.5vh] font-heading text-button-mobile leading-[23px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white hover:bg-white hover:shadow-cta-white md:px-[22px] md:py-[2vh] lg:px-[25px] sm:text-button"
      />
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: stacked single column (`grid-cols-1`), all items centered, white badge above title above button.
- **768**: `sm:grid-cols-12` engaged → 3-col split (3/6/3 spans), title centered.
- **1280**: 2/7/3 spans (md), title left-aligned.
- **1920**: same as 1280, more whitespace.

## §5 RTL notes

`Ar-PostCTA.tsx` mirrors text-align (subtitle becomes right-aligned at md+ in RTL). Use `rtl:md:text-end` if explicit RTL gating needed. The negative `-mt-[70px]` and padding remain unchanged.
