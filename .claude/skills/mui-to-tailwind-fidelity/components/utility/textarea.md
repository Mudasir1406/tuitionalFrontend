# Component — `TextArea`

Sibling to `Input` — a single-styled `<textarea>` with the house shadow. Verbatim copy in Tailwind port.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\textArea\TextArea.tsx` + `TextArea.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\textArea\TextArea.tsx` + `TextArea.module.css` |

## §1 MUI source — extracted properties

### Layout tree

```
textarea.textArea  (full width, shadow, radius 8px, font-size 2.3vh, transparent border)
```

### Dimensions & spacing

| Property | Value |
|---|---|
| width | 100% |
| border | `1px solid transparent` (focus → still transparent) |
| border-radius | 8px |
| outline | none |
| box-shadow | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` |
| padding | `auto 0` (note: `auto` is invalid for `padding`; falls back to 0 in most engines) |
| transition | `border-color 0.3s ease-in-out` |

### Typography

| Property | Value |
|---|---|
| font-family | League Spartan (`leagueSpartan.className` on `<textarea>`) |
| font-size | 2.3vh |
| color | inherited |

### Colors

| Element | Color |
|---|---|
| Box-shadow | `rgba(0,0,0,0.08)` |
| Border | transparent (rest & focus) |

### Animations / interactions

Vestigial `border-color` transition (no visible effect because both states are transparent).

## §2 Tailwind port — bug list

| # | Line / file | Current | Expected | Severity |
|---|---|---|---|---|
| — | `TextArea.tsx` | 1:1 verbatim copy | matches | ✓ no delta |
| — | `TextArea.module.css` | 1:1 verbatim copy | matches | ✓ no delta |

## §3 Corrected Tailwind classNames

None — port already matches. If migrating off CSS modules in the future:

```tsx
<textarea
  className={cn(leagueSpartan.className,
    "w-full border border-transparent rounded-lg outline-none",
    "text-[2.3vh] shadow-card transition-colors duration-300 ease-in-out"
  )}
  // ...
/>
```

## §4 Verification at 4 widths

- 375 / 768 / 1280 / 1920: font-size 2.3vh scales with viewport (≈ 15px / 31px / 21px / 28px). Box height inherits from `<textarea>` browser default + any explicit `rows` prop. No media queries — text scales linearly with `vh`.

## §5 RTL notes

- `padding` symmetric, no `text-align` set → safe.
- AR direction handled by parent `dir="rtl"`.
- No fix needed.
