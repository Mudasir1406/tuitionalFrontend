# Component — `Tag`

There are **two unrelated `Tag` components** in this folder family — same component name, different files, different styles, different APIs.

| Variant | MUI source | Tailwind port | Used by |
|---|---|---|---|
| **A. Indexed color tag** (`tag/Tag.tsx`) | `tuitionalFrontend-mui-baseline\src\components\tag\Tag.tsx` + `Tag.module.css` | `tuitionalFrontend\src\components\tag\Tag.tsx` (CSS inlined into Tailwind) | `ImageCard`, tutor-card subject pills |
| **B. Green pill tag** (`tags/Tag.tsx`) | `tuitionalFrontend-mui-baseline\src\components\tags\Tag.tsx` + `Tag.module.css` | `tuitionalFrontend\src\components\tags\Tag.tsx` (CSS inlined) | Blog post tag rail, sitemap chips |

Note: `tags/Tag.module.css` defines unused multi-color classes (`bg-purple-100`, `green`, `bg-red-100`, etc.) — only the base `.tag` rule (green pill) is actually applied. The other classes are dead code in the MUI source.

---

## Variant A — `tag/Tag.tsx` (indexed color tag)

### §1A MUI source — extracted properties

#### Layout tree

```
<a href={link}>
  <Typography variant="caption" component="p"
              className="leagueSpartan + styles.tag + colorClasses[index%5]">
    {label}
  </Typography>
</a>
```

`colorClasses` cycles through `color1..color5` (5 hex pairs).

#### Dimensions & spacing (from `Tag.module.css`)

| Property | Value |
|---|---|
| display | flex |
| align-items | center |
| height | 24px |
| padding | `0 10px` (vertical 0, horizontal 10) |
| border-radius | 8px |
| line-height | 0 |
| white-space | nowrap |
| user-select | none |
| cursor | pointer |
| transition | `transform 0.2s ease` |
| hover transform | `scale(1.05)` |
| margin | none (commented out) |
| font-weight | 500 |
| text-align | center |

#### Typography

| Property | Value |
|---|---|
| MUI variant | `caption` |
| font-size (per 01-token-mapping §1) | 14px / `text-small` |
| font-family | League Spartan (via `leagueSpartan.className`) |
| font-weight | 500 (.tag rule) |

#### Colors (5-cycle by `index % 5`)

| Class | bg | text |
|---|---|---|
| color1 | #f8d7da | #721c24 |
| color2 | #d4edda | #155724 |
| color3 | #d1ecf1 | #0c5460 |
| color4 | #fff3cd | #856404 |
| color5 | #e2e3e5 | #383d41 |

#### Animations / interactions

- `transform: scale(1.05)` on hover. `transition: transform 0.2s ease`.
- Wraps a real `<a>` — click navigates. No JS handler is active (the inline `onClick` is commented out).

### §2A Tailwind port — bug list

Port file: `tuitionalFrontend\src\components\tag\Tag.tsx` (no `.module.css`, CSS inlined as arbitrary Tailwind).

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 23 | `text-[11px]` | `text-small` (14px) — MUI variant="caption" = 14px per 01-token-mapping §1 | **HIGH — fonts 3px smaller than MUI** |
| 2 | 23 | `font-medium` (500) | matches MUI .tag `font-weight: 500` | ✓ |
| 3 | 23 | `h-6 my-1` | `h-6` matches (24px). `my-1` (4px vertical) is **invented** — MUI .tag has `margin: 5px` commented out, no actual margin. | LOW — adds 8px stack height not in MUI |
| 4 | 23 | `rounded-md` (10px) | `rounded-lg` (8px) — MUI uses `border-radius: 8px`. `rounded-md` is 10px in `tailwind.config.ts`. | MED |
| 5 | 23 | `px-2` (8px) | `px-2.5` (10px) — MUI uses `padding: 0 10px` | MED |
| 6 | 23 | `leading-none` | MUI uses `line-height: 0` (truly 0). `leading-none` = 1. Both render visually identical due to `h-6` controlling box height — but be aware of the literal divergence. | LOW |
| 7 | (missing) | no hover state | MUI has `transform: scale(1.05); transition: transform 0.2s ease` on hover — port omits | LOW |
| 8 | 23 | `inline-flex` `items-center` | matches MUI `display: flex; align-items: center` | ✓ |
| 9 | 27 | wraps in `<a>` only when `isClickable !== false && link` | MUI always wraps in `<a>` — port adds new `isClickable` prop; semantically richer but a divergence | LOW — intentional improvement |

### §3A Corrected Tailwind classNames

```tsx
const COLORS = [
  "bg-[#f8d7da] text-[#721c24]",
  "bg-[#d4edda] text-[#155724]",
  "bg-[#d1ecf1] text-[#0c5460]",
  "bg-[#fff3cd] text-[#856404]",
  "bg-[#e2e3e5] text-[#383d41]",
];

const className = cn(
  leagueSpartan.className,
  COLORS[index % COLORS.length],
  // box (was h-6 my-1 → drop my-1, MUI has no margin)
  "inline-flex h-6 items-center whitespace-nowrap select-none cursor-pointer",
  // spacing & radius (was px-2 rounded-md → fix to px-2.5 rounded-lg)
  "rounded-lg px-2.5",
  // typography (was text-[11px] → text-small, the MUI caption size)
  "font-heading text-small font-medium leading-none",
  // hover (missing in port)
  "transition-transform duration-200 ease-out hover:scale-[1.05]",
);
```

### §4A Verification at 4 widths

- All four widths: `h-6` = 24px, `text-small` = 14px, `px-2.5` = 10px on each side, `rounded-lg` = 8px.
- No responsive variation (MUI .module.css has no media queries for this component).

### §5A RTL notes

- No directional padding (`px-2.5` is symmetric). No `text-align` is set so AR text follows the parent `dir="rtl"` document direction.
- `whitespace-nowrap` keeps the chip on one line regardless of direction.

---

## Variant B — `tags/Tag.tsx` (green pill tag)

### §1B MUI source — extracted properties

#### Layout tree

```
<a href={link}>
  <Typography variant="caption" component="p"
              className="styles.tag + leagueSpartan">
    {label}
  </Typography>
</a>
```

Only the base `.tag` class is applied. The 9 alternate color classes in the CSS module are not consumed.

#### Dimensions & spacing (from `tags/Tag.module.css`)

| Property | Value |
|---|---|
| display | inline-block |
| padding | `4px 8px` |
| border-radius | 4px |
| margin-right | 8px |
| margin-bottom | 8px |
| box-shadow | `0 1px 2px rgba(0, 0, 0, 0.1)` |
| cursor | pointer |
| background-color | #08b463 |
| color | white |

#### Typography

| Property | Value |
|---|---|
| MUI variant | `caption` → 14px / `text-small` |
| font-family | League Spartan |

### §2B Tailwind port — bug list

Port file: `tuitionalFrontend\src\components\tags\Tag.tsx`.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 14 | `text-caption` | `text-small` — MUI variant="caption" maps to **14px** in this theme per 01-token-mapping §1. `text-caption` in the Tailwind config is 12px. | **HIGH — fonts 2px smaller** |
| 2 | 14 | `rounded` (8px default) | `rounded-sm` (4px) — MUI uses `border-radius: 4px` | **HIGH** |
| 3 | 14 | `px-2 py-1` (8/4) | matches MUI `padding: 4px 8px` | ✓ |
| 4 | 14 | `me-2 mb-2` | matches MUI `margin-right: 8px; margin-bottom: 8px` (and `me-2` is RTL-aware, preferable) | ✓ |
| 5 | 14 | `shadow-[0_1px_2px_rgba(0,0,0,0.1)]` | matches MUI `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)` | ✓ |
| 6 | 14 | `bg-[#08b463] text-white` | matches MUI `.tag` colors | ✓ |
| 7 | 14 | `inline-block cursor-pointer` | matches MUI | ✓ |

### §3B Corrected Tailwind classNames

```tsx
<p className={cn(
  leagueSpartan.className,
  "inline-block cursor-pointer",
  // spacing
  "me-2 mb-2 px-2 py-1",
  // radius (was rounded (8px) → rounded-sm (4px))
  "rounded-sm",
  // surface
  "bg-[#08b463] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
  // typography (was text-caption (12px) → text-small (14px))
  "font-heading text-small",
)}>
  {label}
</p>
```

### §4B Verification at 4 widths

- All widths: `text-small` = 14px, padding 8px×4px, radius 4px.
- No responsive variation in MUI source.

### §5B RTL notes

- Port already uses logical property `me-2` (margin-inline-end) — flips correctly under `dir="rtl"`. Keep this — do NOT replace with `mr-2`.
- `mb-2` is non-directional.

---

## Catch-all bug count

- Variant A (`tag/Tag.tsx`): **6 bugs** (#1, #3, #4, #5, #6, #7) — fonts/radius/padding/margin/hover/line-height drift.
- Variant B (`tags/Tag.tsx`): **2 bugs** (#1, #2) — font-size and radius wrong token.
