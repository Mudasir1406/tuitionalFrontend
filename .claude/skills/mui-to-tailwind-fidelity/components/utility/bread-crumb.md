# Component — `Breadcrumb`

URL-segment-driven breadcrumb nav. Splits `usePathname()` on `/`, filters `blog/tag` and `blog/category` intermediate segments, renders `Home > Seg1 > Seg2 > …` with the last segment as the active label.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\bread-crumb\bread-crumb.tsx` + `style.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\bread-crumb\bread-crumb.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
nav.breadcrumb              (flex items-center justify-center, col-gap 24px, p 10px, radius 8px, bg #eaf6ff)
├── <a href="/"><Typography variant="body2" component="p" .link>Home</Typography></a>
└── breadcrumbItems.map →
    div.breadcrumbItem       (flex items-center justify-center, col-gap 16px, cursor pointer)
    ├── Typography.separator " > " (mx 5px, color #999)
    └── (last) Typography.link.active   variant="body2" component="p"   "Final Label"  (font-weight medium, color #007bff)
        or      <a href={href}><Typography variant="body2" component="p" .link>Label</Typography></a>
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| .breadcrumb | display / flex | flex, items-center, justify-content center |
| .breadcrumb | column-gap | 24px |
| .breadcrumb | padding | 10px |
| .breadcrumb | border-radius | 8px |
| .breadcrumb | background-color | #eaf6ff |
| .breadcrumbItem | column-gap | 16px |
| .separator | margin | `0 5px` (horizontal 5px) |

### Typography

| Element | Variant | Sizes | Weight | Color | Font |
|---|---|---|---|---|---|
| Home / non-active links | body2 | 14px → `text-small` | normal | #2d2d2d (`text-ink-900`) | League Spartan |
| .active (last segment) | body2 | 14px → `text-small` | `medium` (CSS keyword → 500, actually invalid; resolves to normal in some browsers) | #007bff | League Spartan |
| .separator | (no variant, plain Typography) | inherit (16px default body) | normal | #999 | (inherits — not leagueSpartan) |

### Colors

| Element | Color |
|---|---|
| .breadcrumb bg | #eaf6ff |
| .breadcrumbItem text | #333 |
| .link | #2d2d2d |
| .active | #007bff |
| .separator | #999 |

### Animations / interactions

- `.link:hover { text-decoration: underline }` (no transition).
- No transform/scale.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 33 | `gap-x-6` (24px) | matches MUI `column-gap: 24px` | ✓ |
| 2 | 33 | `p-2.5` (10px) | matches MUI `padding: 10px` | ✓ |
| 3 | 33 | `rounded-lg` (16px) | MUI `border-radius: 8px` → `rounded` or `rounded-[8px]`. `rounded-lg` is 16px. | **HIGH** |
| 4 | 33 | `bg-[#eaf6ff]` | matches | ✓ |
| 5 | 35 | `text-body` (16px) | MUI `variant="body2"` = 14px → `text-small` | **HIGH** |
| 6 | 35 | `text-ink-900` | matches MUI `.link { color: #2d2d2d }` | ✓ |
| 7 | 35 | `hover:underline` | matches MUI `.link:hover { text-decoration: underline }` | ✓ |
| 8 | 40 | `gap-x-4` (16px) | matches MUI `.breadcrumbItem { column-gap: 16px }` | ✓ |
| 9 | 41 | `<p className="mx-1.5 text-[#999]">` | MUI `.separator { margin: 0 5px; color: #999 }` → `mx-1.5` is 6px (1px off; use `mx-[5px]` literal). Font-size: inherits from breadcrumb body — port has no explicit token, will inherit `text-body` ≈ 16px while MUI Typography (no variant) defaults to body1 (16px). | LOW — 1px margin drift, font roughly matches |
| 10 | 44 | `text-body` (16px) | MUI active label is `variant="body2"` = 14px → `text-small` | **HIGH** |
| 11 | 44 | `font-medium` (500) | matches MUI `.active { font-weight: medium }` (which is invalid CSS — defaults vary). 500 is the correct interpretation. | ✓ |
| 12 | 44 | `text-[#007bff]` | matches MUI `.active { color: #007bff }` | ✓ |
| 13 | 50 | `text-body` (16px) | MUI non-active items also `variant="body2"` = 14px → `text-small` | **HIGH** |
| 14 | 50 | `text-ink-900` | matches MUI default text color | ✓ |
| 15 | 40 | `cursor-pointer` on entire breadcrumbItem div | matches MUI `.breadcrumbItem { cursor: pointer }` | ✓ |
| 16 | (missing) | breadcrumb wrapper does not have explicit `text-ink-900` for the `.breadcrumbItem` containers | MUI `.breadcrumbItem { color: #333 }` (close to ink-900 #2d2d2d but not identical) | LOW |

### Summary

**4 distinct bugs**: #3 wrong radius (lg vs 8px), #5/#10/#13 all three `<p>` text elements use `text-body` (16px) instead of `text-small` (14px). Plus #9 minor 1px margin drift on separator.

## §3 Corrected Tailwind classNames

```tsx
<nav className="flex items-center justify-center gap-x-6 rounded-[8px] bg-[#eaf6ff] p-2.5">
  <a href="/" className="no-underline">
    <p className={cn(leagueSpartan.className,
      // was text-body → text-small (14px)
      "font-heading text-small text-ink-900 hover:underline"
    )}>Home</p>
  </a>

  {breadcrumbItems.map((item, i) => (
    <div key={i} className="flex cursor-pointer items-center justify-center gap-x-4 text-ink-900">
      {/* separator: 5px margin literal, color #999 */}
      <p className="mx-[5px] text-[#999]">&gt;</p>
      {i === breadcrumbItems.length - 1 ? (
        <p className={cn(leagueSpartan.className,
          // was text-body → text-small
          "font-heading text-small font-medium text-[#007bff]"
        )}>{item.label}</p>
      ) : (
        <a href={item.href} className="no-underline">
          <p className={cn(leagueSpartan.className,
            // was text-body → text-small
            "font-heading text-small text-ink-900 hover:underline"
          )}>{item.label}</p>
        </a>
      )}
    </div>
  ))}
</nav>
```

## §4 Verification at 4 widths

- All widths: text 14px, gap 24px between top-level items, 16px inside each item, 5px around `>` separators, 10px padding, 8px radius.
- No responsive variation in MUI source.

## §5 RTL notes

- `gap-x-*` and `column-gap` are non-directional in CSS Grid/Flex — order flips automatically under `dir="rtl"` (Home appears on the right, last segment on the left).
- `mx-[5px]` is symmetric — no flip needed.
- The literal `>` character does NOT auto-mirror in RTL — visually it still points right. If the design calls for a `<` separator in AR, branch via `useI18n().isRTL` and emit the appropriate character. (MUI source does not do this, so the port is correct in following the source.)
- `text-align` is not set on any element; native bidi handles label rendering correctly inside `<p>`.
