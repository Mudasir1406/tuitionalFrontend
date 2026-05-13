# Component — `ImageCard`

Portrait tutor card with a large image at top, name + subject/curriculum tag rails, university, short bio, rating, and a "Book A Demo" button. Used in the tutor section grid.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\image-card\ImageCard.tsx` + `ImageCard.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\image-card\ImageCard.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div.card                      (white bg, radius 12px, shadow `0 4px 8px rgba(0,0,0,0.1)`, w 100%)
├── div.imageWrapper          (relative, w 100%, h 250px, overflow hidden, radius 12px)
│   └── Image.image           (layout=fill, objectFit=contain)
└── div.cardTextDiv           (padding 16px)
    ├── Typography.heading    variant="subtitle1" component="p" → name (cursor pointer, mb 6px, hover scaleY 1.2)
    ├── div.subjects          (flex wrap, row-gap 4px, column-gap 4px, mb 8px) → [Tag…]
    ├── div.subjects          (flex wrap, …) → [Tag…] (curriculum)
    ├── Typography.title      variant="body2" → university
    ├── Typography.title      variant="body2" → description.substring(0,90)
    ├── div.rating            (flex items-center, col-gap 12px, mt 12px)
    │   ├── Image.stars       (h 3vh, w 14vh)
    │   └── Typography variant="subtitle2" → successRate
    └── PopUpButton           inline style.contactButton → "Book A Demo"
```

### Dimensions & spacing

| Element | Property | Default | ≤576px | ≥768/992 |
|---|---|---|---|---|
| .card | bg | white | same | same |
| .card | border-radius | 12px | same | same |
| .card | box-shadow | `0 4px 8px rgba(0,0,0,0.1)` | same | same |
| .card | width | 100% | same | same |
| .cardTextDiv | padding | 16px | same | same |
| .imageWrapper | width | 100% | same | same |
| .imageWrapper | height | **250px** (FIXED) | same | same |
| .imageWrapper | border-radius | 12px | same | same |
| .heading | margin-bottom | 6px | same | same |
| .subjects | flex/gap | wrap, row-gap 4px, col-gap 4px, mb 8px | same | same |
| .rating | mt | 12px, col-gap 12px | same | same |
| .stars | height | 3vh | same | same |
| .stars | width | 14vh | same | same |
| .contactButton (inline style) | padding | 18px | same | same |
| .contactButton | margin | `20px 0` | same | same |
| .contactButton | border-radius | 10px | same | same |
| .contactButton | width | 100% | same | same |

All `.containedButton` font-size media queries (≤576 / ≥768 / ≥992) are commented out — no responsive font scaling in source.

### Typography

| Element | Variant | Sizes per breakpoint | Weight | Color | Font |
|---|---|---|---|---|---|
| .heading (name) | subtitle1 | 28 / 36 / 48px → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` | 700 | inherit | League Spartan |
| Tag pills | (caption — see `tag.md`) | 14px → `text-small` | 500 | per index color | League Spartan |
| .title (university, desc) | body2 | 14px → `text-small` | normal | inherit | League Spartan |
| rating value | subtitle2 | 14px (`text-stat-label`) | inherit | inherit | League Spartan |
| Book A Demo button | (button text) | `text-button-mobile sm:text-button` (15/16px) | normal | white | (inherits) |

### Colors

| Element | Color |
|---|---|
| .card bg | white |
| .card shadow | `rgba(0,0,0,0.1)` |
| .contactButton bg / text | #38b6ff / white |
| .contactButton shadow | `rgba(56,182,255,0.4)` (1px 15px 34px) |
| Tag pills | 5-color cycle (see `tag.md` Variant A) |

### Animations / interactions

- `.heading` cursor pointer + `transition: transform 0.3s ease`, on hover `transform: scaleY(1.2)` (vertical stretch — visually quirky).
- `.contactButton` `transition: all 0.5s ease-in-out`, `:hover { transform: scale(1.02); box-shadow: 1px 4px 24px 0px #38b6ffb2 }`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 22 | `rounded-2xl` (16px) | MUI uses `border-radius: 12px` → `rounded-[12px]` or `rounded-lg` | MED |
| 2 | 22 | `shadow-[0_8px_24px_-8px_rgba(56,182,255,0.25),0_2px_8px_rgba(0,0,0,0.06)]` | MUI uses `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)` (single value, neutral gray). Port substitutes a brand-tinted shadow not in MUI. | **HIGH — diverges visually** |
| 3 | 22 | `transition-shadow duration-300 hover:shadow-[...]` | MUI .card has no hover. Port adds non-MUI hover state. | LOW |
| 4 | 23 | `aspect-square` (1:1 ratio) | MUI uses **fixed `height: 250px`** with `width: 100%`. Port makes height ratio-dependent — at wide cards the image becomes taller, at narrow ones shorter. | **HIGH** |
| 5 | 23 | `rounded-t-2xl` | MUI has `border-radius: 12px` on the wrapper (all 4 corners). Port rounds top only. | MED — visually the bottom corners now expose card bg (still rounds since card is also rounded), but radius value mismatched too. |
| 6 | 23 | `bg-[#eaf6ff]` | MUI `.imageWrapper` has no background-color. Port adds tint. | MED — divergent visual |
| 7 | 28 | `objectFit="contain"` via `className="object-contain"` | matches MUI `objectFit="contain"` | ✓ |
| 8 | 33 | `gap-1.5 p-3.5` (6px / 14px) | MUI `.cardTextDiv { padding: 16px }`. No gap is defined in MUI source (each child uses its own margin). Port uses 14px (`p-3.5`) — 2px short. | MED |
| 9 | 34 | `<h3 onClick=...>` semantically wrong tag | MUI uses `Typography variant="subtitle1" component="p"` (it's a `<p>` element semantically). Port uses `<h3>` — should be `<p>` to match. | LOW |
| 10 | 36 | `text-lg font-bold leading-tight` | **WRONG** — MUI `variant="subtitle1"` = `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` (28/36/48px). `text-lg` = 18px. Major undershoot. | **CRITICAL** |
| 11 | 41 | `gap-x-1 gap-y-0.5` (4px / 2px) | MUI `.subjects { row-gap: 4px; column-gap: 4px }` → `gap-1` or `gap-x-1 gap-y-1` (4px both axes). Port y-gap is half. | MED |
| 12 | (missing) | no `mb-2` on subjects rows | MUI `.subjects { margin-bottom: 8px }` between the two tag rails | MED |
| 13 | (missing) | no `.title` line for `data.university` | MUI renders **two** `Typography variant="body2"` rows — first university, second description. Port has only the description; **university name is dropped**. | **HIGH — content missing** |
| 14 | 63-66 | `line-clamp-2 ... text-[13px] leading-snug text-gray-600` | MUI uses `Typography variant="body2"` = 14px (`text-small`), `font-heading` (leagueSpartan), no clamp. Port forces 13px + clamp-2 + gray-600. | **HIGH** |
| 15 | 65 | substring removed — `data?.Description ?? ""` | MUI calls `data?.Description?.substring(0, 90)`. Port renders the full string and relies on `line-clamp-2`. Functional but byte-count differs (clamp can leak full HTML markup into the DOM). | LOW |
| 16 | 68 | `mt-0.5 gap-2` (2px / 8px) | MUI `.rating { margin-top: 12px; column-gap: 12px }` → `mt-3 gap-3`. Port mt is 10px short, gap 4px short. | **HIGH** |
| 17 | 69-75 | `Image width={100} height={20} h-5 w-auto` | MUI `.stars { height: 3vh; width: 14vh }` — viewport-coupled, NOT fixed px. Port hard-codes 20px height. | **HIGH — preserves vh per token-mapping §4** |
| 18 | 77 | `text-xs font-medium` (12px) | MUI `variant="subtitle2"` → `text-stat-label` (14px). Port undersize. | MED |
| 19 | 79 | adds `%` suffix to successRate | MUI source renders raw `{data?.["Success rate"]}` (no suffix). | LOW — content divergence |
| 20 | 86 | `rounded-[10px] bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold shadow-[0_15px_34px_-8px_rgba(56,182,255,0.5)] hover:scale-[1.02]` | MUI `style.contactButton`: `padding: 18px`, `margin: 20px 0`, `border-radius: 10px`, `box-shadow: 1px 15px 34px 0px rgba(56,182,255,0.4)`. Port has different padding (px-4 py-2.5 = 16/10), no margin, different shadow offset, smaller text. | **HIGH** |
| 21 | 86 | `mt-auto` on button | MUI has no `mt-auto`. Port adds to push button to bottom of flex card. Reasonable in a fixed-height card but the MUI card has no fixed height. | LOW |

### Summary

**~14 distinct bugs** (#1 radius, #2 shadow, #4 image height, #5 wrap radius, #6 image bg, #8 padding, #10 name font (CRITICAL), #11 tag gaps, #12 mb on subjects rows, #13 university dropped, #14 description type drift, #16 rating spacing, #17 stars dimensions, #18 rating font, #20 button padding/shadow). Plus minor: #3, #7, #9, #15, #19, #21.

## §3 Corrected Tailwind classNames

```tsx
<div className="w-full rounded-[12px] bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
  {/* Image wrapper: FIXED 250px height, full rounded-12, no tint */}
  <div className="relative h-[250px] w-full overflow-hidden rounded-[12px]">
    <Image src={...} alt="..." fill className="object-contain" />
  </div>

  {/* Text body: 16px padding, NO gap (children own their margin) */}
  <div className="p-4">
    {/* Name: subtitle1 triplet, was text-lg → 28/36/48 */}
    <p onClick={openModal} className={cn(leagueSpartan.className,
      "mb-1.5 cursor-pointer font-heading font-bold transition-transform duration-300 hover:scale-y-[1.2]",
      "text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number"
    )}>{fullName}</p>

    {/* Subject tags: 4px both axes, mb 8px */}
    <div className="mb-2 flex flex-wrap gap-1">
      {data?.Subjects?.map((t, i) => <Tag key={i} label={t} index={i} isClickable={false} />)}
    </div>
    {/* Curriculum tags */}
    <div className="mb-2 flex flex-wrap gap-1">
      {data?.Curiculum?.map((t, i) => <Tag key={i} label={t} index={i} isClickable={false} />)}
    </div>

    {/* University (was MISSING in port) */}
    <p className={cn(leagueSpartan.className, "font-heading text-small")}>{data.university}</p>

    {/* Description: 90-char trim, body2 = text-small */}
    <p className={cn(leagueSpartan.className, "font-heading text-small")}
       dangerouslySetInnerHTML={{ __html: data?.Description?.substring(0, 90) }} />

    {/* Rating: mt 12px, gap 12px */}
    <div className="mt-3 flex items-center gap-3">
      <Image src={greenstars} alt="" className="h-[3vh] w-[14vh]" />
      <p className={cn(leagueSpartan.className, "font-heading text-stat-label")}>
        {data?.["Success rate"]}
      </p>
    </div>

    {/* Book A Demo: literal MUI button values */}
    <PopUpButton
      text={locale === "ar" ? "احجز حصة تجريبية" : "Book A Demo"}
      href="popup"
      className="my-5 w-full self-center rounded-[10px] bg-[#38b6ff] text-center text-button-mobile sm:text-button text-white normal-case shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-[#38b6ff] hover:shadow-[1px_4px_24px_0px_rgba(56,182,255,0.7)]"
      style={{ padding: "18px", lineHeight: "18.4px" }}
    />
  </div>
</div>
```

## §4 Verification at 4 widths

- 375: card width 100% of grid cell, image **always 250px tall** (vh independent), tags wrap onto multiple lines, button full width.
- 768: same fixed image height; name font scales to `text-stat-number-mobile` → tablet (36px) only at sm.
- 1280: name reaches `text-stat-number` (48px); rating stars 3vh × 14vh ≈ 22 × 100px.
- 1920: name 48px (no further scale beyond lg).

## §5 RTL notes

- Tag pills inside use `me-` (logical) — flip correctly.
- `.subjects` flex wrap is direction-agnostic; in `dir="rtl"` items will start from the right edge of the row automatically.
- `.rating` `flex items-center gap-3` is non-directional. The text on the right of the stars in EN appears to the left of the stars in AR — that's the expected RTL behavior, no override needed.
- Description text-align inherits doc direction; do not add explicit `text-left`.
- The button is full-width and center-aligned text — direction-safe.
