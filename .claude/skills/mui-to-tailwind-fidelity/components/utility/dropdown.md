# Component — `DropDown`

Reusable custom select (used in heavy forms, e.g. school logos / pricing). Renders a CSS-driven header + dropdown menu; no MUI components used in either repo. Sibling `TranslatableDropDown.tsx` is a thin wrapper that pulls option labels from `useI18n()`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\DropDown\DropDown.tsx` + `DropDown.css` |
| Tailwind port | `tuitionalFrontend\src\components\DropDown\DropDown.tsx` + `DropDown.css` |

## §1 MUI source — extracted properties

### Layout tree

```
div.dropdown  (relative, w-full, font-size 2.3vh, League Spartan)
├── div.dropdown-header  (flex justify-between items-center, shadow, radius 8px, h 5.4vh, px 8px)
│   ├── span.dropdown-placeholder  (color gray | black)
│   └── span.dropdown-arrow         ("▲" / "▼", 12px, #888)
└── ul.dropdown-menu  (absolute top:100%, z 1000, white bg, border 1px #ccc, radius 8px, mt 4px, max-h 200px, scroll, shadow)
    └── li.dropdown-item  (padding 8px 12px, hover #f0f0f0, selected #e0e0e0 bold, border-bottom 1px #eee)
```

### Dimensions & spacing

| Element | Property | Default | mobile (<480px) |
|---|---|---|---|
| .dropdown | font-size | 2.3vh | 1.8vh / line-height 2.3vh |
| .dropdown-header | height | 5.4vh | same |
| .dropdown-header | padding-left/right | 8px | same |
| .dropdown-header | border-radius | 8px | same |
| .dropdown-header | box-shadow | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | same |
| .dropdown-menu | max-height | 200px | same |
| .dropdown-menu | margin-top | 4px | same |
| .dropdown-menu | font-size | 2.3vh | inherit |
| .dropdown-item | padding | `8px 12px` | same |

### Typography

| Element | font-family | font-size | weight |
|---|---|---|---|
| `.dropdown` / header / menu / item | League Spartan (`var(--font-league-spartan)`) with `!important` | 2.3vh (1.8vh xs) | inherit |
| Selected item | — | — | 600 |
| Arrow | inherit | 12px | inherit |

### Colors

| Element | Color |
|---|---|
| Placeholder (placeholder state) | gray (inline `style.color = "gray"`) |
| Placeholder (selected state) | black (inline `style.color = "black"`) |
| Arrow | #888 |
| Menu border | #ccc |
| Item hover | #f0f0f0 |
| Item selected | #e0e0e0 |
| Item bottom border | #eee |

### Animations / interactions

- Item hover: `background 0.2s` transition.
- Click outside (mousedown handler) closes the dropdown.
- Header click toggles open state.

## §2 Tailwind port — bug list

| # | Line / file | Current | Expected | Severity |
|---|---|---|---|---|
| — | both files identical | TSX 1:1 copy; `DropDown.css` 1:1 copy | matches | ✓ no delta |

**The Tailwind port is a verbatim copy** (TSX + CSS) of the MUI source. No bugs to fix. The component does not use any MUI primitives even in the baseline.

Caveat — the file `TranslatableDropDown.tsx` exists in both; spot-check independently if i18n breaks.

## §3 Corrected Tailwind classNames

None needed — port already matches. The CSS file (`DropDown.css`) is the established pattern for this component.

## §4 Verification at 4 widths

- 375: arrow + placeholder visible; menu opens to <=200px; font-size 2.3vh (~18px tall).
- 768 / 1280: header 5.4vh, arrow 12px stable.
- 1920: 5.4vh ~ 60px header; menu opens 200px below.

## §5 RTL notes

- Plain `.css` (not `.module.css`) **bypasses `stylis-plugin-rtl`** — RTL flipping does not happen automatically.
- `padding-left: 8px; padding-right: 8px;` is symmetric → no flip needed.
- `text-align` is not set → inherits from parent → safe.
- `.dropdown-menu` `left: 0; right: 0;` symmetric → safe.
- Arrow position (right of header due to `justify-between`) flips automatically with parent `dir="rtl"`.
- No fix required.
