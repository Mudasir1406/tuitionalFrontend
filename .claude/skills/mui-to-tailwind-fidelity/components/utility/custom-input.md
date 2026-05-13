# Component — `CustomInput`

Minimal borderless input forwarded ref, used as a building block inside larger MUI fields. MUI baseline wraps an MUI `TextField` with notch+padding overrides; Tailwind port collapses to a plain `<input>` with classNames.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\custom-input\custom-input.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\custom-input\custom-input.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
TextField  (fullWidth, ref forwarded, leagueSpartan className on outer + InputProps)
  └── InputProps.sx:
      - .MuiOutlinedInput-notchedOutline { border: none }
      - padding: 0
      - height: 0    ← collapses MUI's default 40px input height
```

### Dimensions & spacing

| Property | Value |
|---|---|
| width | 100% (`fullWidth`) |
| inner padding | 0 |
| inner height | 0 (intentionally collapsed — parent supplies height) |
| outline border | none |

### Typography

| Property | Value |
|---|---|
| font-family | League Spartan (`leagueSpartan.className`) on outer + InputProps |
| font-size | MUI default `body1` (16px desktop / 15px mobile) — unless overridden by parent |
| color | inherited |

### Colors

None — transparent input on parent background.

### Animations / interactions

None.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 14 (`placeholder:text-ink-400`) | uses Tailwind token `text-ink-400` for placeholder | MUI baseline did not set placeholder color (inherits MUI default ~rgba(0,0,0,0.42)). `text-ink-400` is the project's nearest token but not a 1:1 trace. | low |
| 2 | 11 (`h-full w-full`) | sets `h-full` so input fills parent container height | MUI source set `height: 0` (forcing parent dimensions to drive height). Both achieve the same visual result when parent has a defined height; acceptable. | none |

The port intentionally drops the MUI `TextField` wrapper and the `MuiOutlinedInput-notchedOutline { border: none }` override — both unnecessary on a plain `<input>`. Functionally equivalent.

## §3 Corrected Tailwind classNames

```tsx
<input
  ref={ref}
  {...rest}
  className={cn(
    leagueSpartan.className,
    "h-full w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-400",
    className,
  )}
/>
```

Current implementation is acceptable — no change required.

## §4 Verification at 4 widths
- 375 / 768 / 1280 / 1920: input fills parent. Parent supplies height; this component is dimensionless.

## §5 RTL notes
- `<input>` text direction follows `dir` attribute or `direction` CSS on parent — no per-component fix.
- Placeholder text inherits direction from `dir="rtl"` on parent (`html[dir="rtl"]`).
