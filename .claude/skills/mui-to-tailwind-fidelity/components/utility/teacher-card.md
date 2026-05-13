# Component — `TeacherCard`

Horizontal tutor row card (image + name + hours + short bio + two action buttons). Used in tutor listing pages.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\teacher-card\TeacherCard.tsx` + `TeacherCard.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\teacher-card\TeacherCard.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div.card           (flex row, white bg, w 95%/92% @ ≤576, mx auto, my 16px, p 16px/12px @ ≤576, radius 12px, shadow)
└── div.cardContent (flex row → flex col @ ≤576, text-center @ ≤576, w 100%)
    ├── div.imageSection (shrink-0, mr 16px)
    │   └── Image.teacherImage (80×80, radius 50%, object-cover)
    ├── div.infoSection (grow, mr 16px, mb 16px @ ≤576)
    │   ├── Typography variant="subtitle1" component="h5"   {firstName lastName}
    │   ├── Typography variant="caption" component="span"   +{hours} {label}    (font-weight 600 via .bold)
    │   └── Typography variant="body2"  component="div"     {description.substring(0,120)} (mt 6px via .mt1)
    └── div.actionSection (flex col gap 8px, shrink-0)
        ├── PopUpButton  sx={style.contactButton}           "Book A Demo"
        └── Button.outlinedButton variant="contained"        "View Profile"
```

### Dimensions & spacing

| Element | Property | Default | ≤576px |
|---|---|---|---|
| .card | width | 95% | 92% |
| .card | padding | 16px | 12px |
| .card | margin | `16px auto` | same |
| .card | border-radius | 12px | same |
| .card | box-shadow | `rgba(99,99,99,0.2) 0px 2px 8px 0px` | same |
| .cardContent | flex-direction | row | column |
| .cardContent | text-align | (default) | center |
| .teacherImage | size | 80×80px | same |
| .teacherImage | border-radius | 50% | same |
| .imageSection | margin-right | 16px | (column → no longer relevant) |
| .infoSection | margin-right | 16px | (column → no longer relevant) |
| .infoSection | margin-bottom | (none) | 16px |
| .actionSection | gap | 8px | same |
| .mt1 | margin-top | 6px | same |
| .outlinedButton | padding | 2vh | same |
| .outlinedButton | border | `2px solid green` | same |
| .outlinedButton | border-radius | 10px | same |
| .outlinedButton | line-height | 18.4px | same |
| contactButton (inline `style`) | padding | 18px | same |
| contactButton | margin | `20px 0` | same |
| contactButton | border-radius | 10px | same |
| contactButton | box-shadow | `1px 15px 34px 0px rgba(56,182,255,0.4)` | same |
| contactButton | bg | #38b6ff | same |

### Typography

| Element | Variant | Sizes per breakpoint | Weight | Color | Font |
|---|---|---|---|---|---|
| name | subtitle1 | 1.75rem (mobile) / 2.25rem (tablet) / 3rem (desktop) → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` per 01-token-mapping §1 special variants | 700 | inherit (black) | League Spartan |
| hours-line | caption | 14px (`text-small`) | 600 (.bold) | inherit | League Spartan |
| description div | body2 | 14px (`text-small`) | normal | inherit | League Spartan |
| Book A Demo (PopUpButton) | (button text) | 1rem (16px) — `text-button-mobile sm:text-button` | normal (no override) | white | (inherits) |
| View Profile (.outlinedButton) | (button text) | inherits MUI Button default — `text-button-mobile sm:text-button` (15px/16px) | normal | green | League Spartan |

### Colors

| Element | Color |
|---|---|
| .card bg | white |
| .card shadow | `rgba(99,99,99,0.2)` |
| .outlinedButton color & border | `green` (CSS literal — typically `#008000`) |
| .outlinedButton bg | white |
| contactButton bg / text | `#38b6ff` / white |
| contactButton shadow | `rgba(56,182,255,0.4)` |
| .bold (name) | inherits — typically near-black on white card |

### Animations / interactions

- `.outlinedButton` and contactButton both have `transition: all 0.5s ease-in-out` and `:hover { transform: scale(1.02) }`.
- contactButton hover shadow change: `1px 4px 24px 0px #38b6ffb2`.
- Card itself has commented-out `:hover { transform: translateY(-4px) }` — currently inert.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 46 | `my-4` (16px) `mx-auto` | matches MUI `margin: 16px auto` | ✓ |
| 2 | 46 | `w-[92%] sm:w-[95%]` | matches MUI 92% (≤576) / 95% (default) — BUT MUI uses `max-width: 576px` not `sm:` (600px). The `sm:` prefix kicks in 24px later than MUI. | LOW — 24px off |
| 3 | 46 | `p-3 sm:p-4` (12 / 16) | matches MUI `padding: 12px @ ≤576, 16px default` — same 24px breakpoint drift as #2 | LOW |
| 4 | 46 | `rounded-xl` (24px) | MUI uses `border-radius: 12px` → use `rounded-[12px]` or `rounded-lg` (16px) — `rounded-xl` is too large | **HIGH** |
| 5 | 46 | `shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]` | matches MUI shadow | ✓ |
| 6 | 47 | `flex-col items-center sm:flex-row` | matches MUI `cardContent` row-default / col @ ≤576 — same 24px drift | LOW |
| 7 | 48 | `me-0 mb-4 sm:me-4 sm:mb-0` | matches `imageSection { margin-right: 16px }` + `.infoSection { margin-bottom: 16px @ ≤576 }`. `me-` is RTL-aware which is correct. | ✓ |
| 8 | 52–53 | `Image width={80} height={80}` + `h-20 w-20` | matches `.teacherImage { width: 80px; height: 80px }` | ✓ |
| 9 | 54 | `rounded-full object-cover` | matches `border-radius: 50%; object-fit: cover` | ✓ |
| 10 | 57 | `me-0 sm:me-4 text-center sm:text-start` | matches `.infoSection { margin-right: 16px }` + `.cardContent { text-align: center @ ≤576 }` (port writes `text-start` which is RTL-aware — better than MUI's literal `text-align: center` reset) | ✓ |
| 11 | 58 | `text-h5` | **WRONG** — MUI uses `variant="subtitle1"` not `h5`. subtitle1 = 28/36/48px (`text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number`). h5 = 18px desktop. Names render dramatically smaller in port. | **CRITICAL** |
| 12 | 58 | `font-heading text-ink-900` | font-heading matches; text-ink-900 is fine | ✓ |
| 13 | 61 | `text-caption` (12px) | MUI `variant="caption"` = 14px per 01-token-mapping → `text-small` | **HIGH** |
| 14 | 61 | `font-semibold` (600) | matches `.bold { font-weight: 600 }` | ✓ |
| 15 | 65 | `mt-1.5` (6px) | matches `.mt1 { margin-top: 6px }` | ✓ |
| 16 | 65 | `text-small` (14px) | matches MUI `variant="body2"` = 14px | ✓ |
| 17 | 65 | `font-heading` | MUI passes `leagueSpartan.className` — port uses `font-heading` token (same family). | ✓ |
| 18 | 65 | `text-ink-700` | **WRONG token** — `text-ink-700` is not enumerated; description in MUI inherits default body color (no `color` override). Use `text-ink-900` for parity or drop. | LOW |
| 19 | 71 | `flex-col gap-2` on actionSection | matches MUI `display: flex; flex-direction: column; gap: 8px` | ✓ |
| 20 | 75-83 | `<PopUpButton style={{ boxShadow, bg, lh, br, padding, color }}>` | matches MUI `style.contactButton` literal values (incl. `padding: 2vh`) — wait, MUI uses `padding: 18px` and `margin: 20px 0`. Port writes `padding: "2vh"` and **no margin**. | MED — padding 2vh (~18px on 900h, but viewport-coupled) vs literal 18px; missing `margin: 20px 0` |
| 21 | 75 | `hover:scale-[1.02]` | matches MUI `:hover { transform: scale(1.02) }` | ✓ |
| 22 | 75 | `transition-all duration-500 ease-in-out` | matches MUI `transition: all 0.5s ease-in-out` | ✓ |
| 23 | 88 | `border-2 border-[green] bg-white p-[2vh] font-heading text-[green]` | matches `.outlinedButton { padding: 2vh; border: 2px solid green; background-color: white; color: green }` | ✓ |
| 24 | 88 | `rounded-[10px]` (10px) | matches `.outlinedButton { border-radius: 10px }` | ✓ |
| 25 | 88 | `leading-[18.4px]` | matches `.outlinedButton { line-height: 18.4px }` | ✓ |
| 26 | 88 | `normal-case` | matches MUI Button default `text-transform: none` | ✓ |
| 27 | 88 | (font-size) — implied default | MUI Button variant default → `text-button-mobile sm:text-button` (15/16px) — port has no explicit class, will inherit body. Recommend explicit triplet. | LOW |

### Summary

**7 distinct bugs**: #2 + #3 + #6 breakpoint drift (576 vs 600), #4 radius too large, #11 wrong typography variant (CRITICAL), #13 caption font-size, #18 wrong text color token, #20 padding/margin drift on PopUpButton, #27 missing explicit button text-size triplet.

## §3 Corrected Tailwind classNames

```tsx
// root
<div className="mx-auto my-4 flex w-[92%] items-center justify-between rounded-[12px] bg-white p-3 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] max-[576px]:w-[92%] max-[576px]:p-3 sm:w-[95%] sm:p-4">

// inner row → column @ ≤576
<div className="flex w-full flex-col items-center text-center max-[576px]:flex-col max-[576px]:text-center sm:flex-row sm:text-start">

// image col — unchanged
<div className="shrink-0 me-0 mb-4 max-[576px]:mb-4 sm:me-4 sm:mb-0">

// info col
<div className="grow me-0 sm:me-4 max-[576px]:mb-4 sm:mb-0">
  {/* Name: was text-h5 → MUI subtitle1 triplet */}
  <h5 className={cn(leagueSpartan.className,
    "font-heading text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-bold text-ink-900"
  )}>
    {fullName}
  </h5>
  {/* Hours: text-caption → text-small */}
  <span className={cn(leagueSpartan.className,
    "font-heading text-small font-semibold"
  )}>
    +{hours} {label}
  </span>
  {/* Description: drop text-ink-700, keep text-small */}
  <div className={cn(leagueSpartan.className,
    "mt-1.5 font-heading text-small"
  )}
    dangerouslySetInnerHTML={{ __html: desc.substring(0, 120) }}
  />
</div>

// action col
<div className="flex shrink-0 flex-col gap-2">
  {/* contact button: literal padding 18px + my-5 (20px 0) margins */}
  <PopUpButton
    text={t.bookADemo} href="popup"
    className="my-5 w-full self-center rounded-[10px] bg-brand-500 text-white text-center text-button-mobile sm:text-button shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] transition-all duration-500 ease-in-out hover:scale-[1.02] hover:shadow-[1px_4px_24px_0px_rgba(56,182,255,0.7)]"
    style={{ padding: "18px", lineHeight: "18.4px" }}
  />
  {/* view profile */}
  <button type="button"
    className={cn(leagueSpartan.className,
      "self-center rounded-[10px] border-2 border-[green] bg-white p-[2vh] font-heading text-button-mobile sm:text-button text-[green] normal-case leading-[18.4px] transition-all duration-500 ease-in-out hover:scale-[1.02]"
    )}>
    {t.viewProfile}
  </button>
</div>
```

## §4 Verification at 4 widths

- 375 (<576 band): card width 92% of viewport ≈ 345px, p 12px, content stacks column, text-center. Name 28px (subtitle1 mobile).
- 768 (≥576, default band): card width 95%, p 16px, row layout. Name 36px (subtitle1 tablet).
- 1280 (default band): card width 95%, name 48px (subtitle1 desktop).
- 1920: same as 1280.

## §5 RTL notes

- Port already uses `me-` (margin-inline-end) and `text-start` — both flip correctly under `dir="rtl"`. Keep them.
- `flex-row` direction: MUI does not set `flexDirection: isArabic ? "row-reverse" : "row"`, and the port doesn't either — the visual order (image | info | actions) flips naturally via the parent `dir="rtl"` document direction with logical CSS in the default flex flow.
- `.outlinedButton` and contactButton use `box-shadow` (non-directional) and centered text — safe in both directions.
