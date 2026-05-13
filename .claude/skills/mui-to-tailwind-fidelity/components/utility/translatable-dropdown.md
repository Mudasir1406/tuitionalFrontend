# Component — `TranslatableDropDown`

Custom-built dropdown (no MUI `Select`) with optional EN/AR subject translation and multi-select support. The styling lives entirely in a sibling `DropDown.css` file shared with `DropDown.tsx`. The Tailwind port is a verbatim copy of both files.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\DropDown\TranslatableDropDown.tsx` + `DropDown.css` |
| Tailwind port | `tuitionalFrontend\src\components\DropDown\TranslatableDropDown.tsx` + `DropDown.css` |

## §1 MUI source — extracted properties

### Layout tree

```
div.dropdown                 (relative, w 100%, font 2.3vh / 1.8vh @ ≤480, leagueSpartan)
├── div.dropdown-header      (flex space-between, h 5.4vh, px 8px, shadow-card, radius 8px, white bg)
│   ├── div > span.dropdown-placeholder  (inline color via style — gray when placeholder, black when value)
│   └── span.dropdown-arrow              (font 12px, color #888 — text "▲" or "▼")
└── ul.dropdown-menu (when isOpen)
    └── li.dropdown-item    (padding 8px 12px; hover bg #f0f0f0; .selected bg #e0e0e0 + font-weight 600)
```

### Dimensions & spacing (from `DropDown.css`)

| Element | Property | Default | ≤480px |
|---|---|---|---|
| .dropdown | width | 100% | same |
| .dropdown | font-size | 2.3vh | 1.8vh / line-height 2.3vh |
| .dropdown-header | height | 5.4vh | same |
| .dropdown-header | padding-left/right | 8px | same |
| .dropdown-header | border-radius | 8px | same |
| .dropdown-header | box-shadow | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | same |
| .dropdown-arrow | font-size | 12px | same |
| .dropdown-menu | top | 100% (offset 4px via margin-top) | same |
| .dropdown-menu | margin-top | 4px | same |
| .dropdown-menu | border | `1px solid #ccc` | same |
| .dropdown-menu | border-radius | 8px | same |
| .dropdown-menu | max-height | 200px | same |
| .dropdown-menu | box-shadow | `0 4px 6px rgba(0, 0, 0, 0.1)` | same |
| .dropdown-menu | font-size | 2.3vh | inherited shrink to 1.8vh |
| .dropdown-item | padding | 8px 12px | same |

Inline JSX overrides (in `TranslatableDropDown.tsx`):
- `style={{ marginTop, marginBottom }}` — caller passes raw strings, applied to root `.dropdown` div.
- `style={{ color: isPlaceholder ? "gray" : "black" }}` on `.dropdown-placeholder` span.

### Typography

| Element | Variant | Sizes | Weight | Color | Font |
|---|---|---|---|---|---|
| .dropdown / menu / item | (inherits) | 2.3vh default / 1.8vh @ ≤480 lh 2.3vh | normal | inherited | League Spartan (via `!important` in CSS) |
| .dropdown-arrow | n/a | 12px (fixed) | normal | #888 | (inherits) |
| .dropdown-item.selected | n/a | inherited | 600 | inherited | League Spartan |

### Colors

| Element | Color |
|---|---|
| .dropdown-header bg | white |
| .dropdown-header shadow | `rgba(0,0,0,0.08)` |
| .dropdown-arrow text | #888 |
| .dropdown-menu bg | #fff |
| .dropdown-menu border | #ccc |
| .dropdown-item hover bg | #f0f0f0 |
| .dropdown-item.selected bg | #e0e0e0 |
| .dropdown-item border-bottom (not last) | #eee |
| .dropdown-placeholder color (placeholder state) | gray (literal CSS color name) |
| .dropdown-placeholder color (value state) | black |

### Animations / interactions

- `.dropdown-item` has `transition: background 0.2s`.
- No transform/scale animation. Arrow flips via text content swap (▼/▲).
- Click-outside listener closes menu (`mousedown` on document, ref-based hit test).

## §2 Tailwind port — bug list

| # | Line / file | Current | Expected | Severity |
|---|---|---|---|---|
| — | `TranslatableDropDown.tsx` | 1:1 verbatim copy of MUI source | matches | ✓ no delta |
| — | `DropDown.css` | 1:1 verbatim copy of MUI source | matches | ✓ no delta |

The CSS file is reused unchanged. Per the project's CSS-modules grandfather clause, both `DropDown.tsx` and `TranslatableDropDown.tsx` share `DropDown.css` — this is the canonical pattern for this dropdown family.

## §3 Corrected Tailwind classNames

None required. If a future migration moves this off plain CSS, the equivalent Tailwind shape is:

```tsx
// root
<div className={cn(leagueSpartan.className,
  "relative w-full text-[2.3vh] max-[480px]:text-[1.8vh] max-[480px]:leading-[2.3vh]"
)} style={{ marginTop, marginBottom }}>
  {/* header */}
  <div className="flex h-[5.4vh] items-center justify-between rounded-lg bg-white px-2 shadow-card cursor-pointer outline-none">
    <span style={{ color: isPlaceholder ? "gray" : "black" }}>{label}</span>
    <span className="text-[12px] text-[#888]">{isOpen ? "▲" : "▼"}</span>
  </div>
  {/* menu */}
  {isOpen && (
    <ul className="absolute inset-x-0 top-full z-[1000] mt-1 max-h-[200px] list-none overflow-y-auto rounded-lg border border-[#ccc] bg-white p-0 text-[2.3vh] shadow-[0_4px_6px_rgba(0,0,0,0.1)] max-[480px]:text-[1.8vh]">
      {/* items */}
      <li className="cursor-pointer px-3 py-2 transition-colors duration-200 hover:bg-[#f0f0f0] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[#eee] aria-selected:bg-[#e0e0e0] aria-selected:font-semibold">
        {label}
      </li>
    </ul>
  )}
</div>
```

Don't migrate — the CSS-modules-style file is the canonical pattern alongside `DropDown.tsx`.

## §4 Verification at 4 widths

- 375 (<480 band): root + menu 1.8vh ≈ 15px, lh 2.3vh ≈ 19px; arrow 12px; header height 5.4vh ≈ 36px.
- 768 (default band): root 2.3vh ≈ 18px; header height 5.4vh ≈ 41px.
- 1280: 2.3vh ≈ 17px; header 5.4vh ≈ 39px.
- 1920: 2.3vh ≈ 25px; header 5.4vh ≈ 58px.

## §5 RTL notes

- `DropDown.css` is plain CSS — **not** auto-flipped by `stylis-plugin-rtl` (that plugin only handles Emotion). All paddings are symmetric (`padding-left/right: 8px` on the header, `padding: 8px 12px` on items), so no manual mirror is needed.
- `.dropdown-menu` is positioned with `left: 0; right: 0;` — works for both directions.
- Selected-value text alignment follows the parent `dir="rtl"` document direction (no explicit `text-align`).
- Caller is expected to translate display values via the component's built-in `isSubjectField` + `locale` branch; the dropdown itself does not RTL-flip its layout because nothing inside is directional.
