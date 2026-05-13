# Component — `Ar-Tag`

Arabic-locale variant of the green-pill `Tag` (Variant B from `tag.md`). Byte-for-byte identical CSS module to `tags/Tag.module.css` — the file exists separately so the Arabic blog rail can swap the component without changing imports. JSX is the same shape; only the exported symbol name differs (`ArTag` vs `Tag`).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\ar-tags\Ar-Tag.tsx` + `Ar-Tag.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\ar-tags\Ar-Tag.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
<a href={link}>
  <Typography variant="caption" component="p"
              className="styles.tag + leagueSpartan">
    {label}
  </Typography>
</a>
```

### Dimensions & spacing

`Ar-Tag.module.css` `.tag` rule (identical to `tags/Tag.module.css`):

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

### Typography

| Property | Value |
|---|---|
| MUI variant | `caption` → 14px / `text-small` |
| font-family | League Spartan |
| weight | normal (no override) |
| color | white |

### Colors

| Element | Color |
|---|---|
| .tag bg | #08b463 |
| .tag text | white |
| shadow | `rgba(0,0,0,0.1)` |

### Animations / interactions

- No transition. No hover transform.
- Inline `onClick={redirectToExternal(link)}` is commented out. Navigation is purely via the wrapping `<a href={link}>`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 14 | `text-caption` | `text-small` — MUI `variant="caption"` = 14px per 01-token-mapping §1. `text-caption` token in Tailwind config is 12px. | **HIGH — fonts 2px smaller** |
| 2 | 14 | `rounded` (8px default) | `rounded-sm` (4px) — MUI `.tag` `border-radius: 4px` | **HIGH** |
| 3 | 14 | `px-2 py-1` (8/4) | matches MUI `padding: 4px 8px` | ✓ |
| 4 | 14 | `me-2 mb-2` | matches MUI `margin-right: 8px; margin-bottom: 8px` (logical `me-` is correct for RTL) | ✓ |
| 5 | 14 | `shadow-[0_1px_2px_rgba(0,0,0,0.1)]` | matches MUI | ✓ |
| 6 | 14 | `bg-[#08b463] text-white` | matches MUI | ✓ |
| 7 | 14 | `inline-block cursor-pointer` | matches MUI | ✓ |
| 8 | 14 | `font-heading` | matches `leagueSpartan.className` intent | ✓ |

Same bugs as Variant B of `tag.md` — this is an unintentional cross-file shared mistake.

## §3 Corrected Tailwind classNames

```tsx
<p className={cn(
  leagueSpartan.className,
  "inline-block cursor-pointer",
  // spacing — symmetric, logical
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

## §4 Verification at 4 widths

- All widths: `text-small` = 14px, padding 8px × 4px, radius 4px. No responsive variation in source.

## §5 RTL notes

- This is the AR variant — RTL behavior is the **primary** rendering mode.
- `me-2` (margin-inline-end) flips correctly under `dir="rtl"` to `margin-left: 8px`. Critical: do NOT replace with `mr-2` (which would put the gap on the right in AR, breaking the natural text flow).
- `mb-2` is direction-agnostic.
- Native AR text direction inside the `<p>` is handled by `dir="rtl"` on the parent document — no `text-align` override needed.
- The component logic does not change with locale; the same JSX renders in both EN and AR contexts (the AR usage is just import-site routing).
