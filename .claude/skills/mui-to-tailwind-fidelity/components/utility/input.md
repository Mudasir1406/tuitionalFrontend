# Component — `Input`

Borderless shadowed text input (the "house input" style). Both repos use `Input.module.css` — verbatim copy. The bulk of the original JSX (floating label, focus state) is commented out in source; the file ships only the unstyled `<input>` line.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\input\Input.tsx` + `Input.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\input\Input.tsx` + `Input.module.css` |

## §1 MUI source — extracted properties

### Layout tree

```
div.container  (shadow, white bg, h 5.4vh, px 8px, radius 8px, flex items-center)
└── input.input  (font-size 2.667vh default / 2.2vh @ ≤768 / 2.1vh @ ≤480)
```

### Dimensions & spacing

| Element | Property | Default | ≤768px | ≤480px |
|---|---|---|---|---|
| .container | height | 5.4vh | same | same |
| .container | padding-left/right | 8px | same | same |
| .container | border-radius | 8px | same | same |
| .container | box-shadow | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | same | same |
| .input | font-size | 2.667vh | 2.2vh | 2.1vh / line-height 2.3vh |
| .input | padding | 0 | same | same |
| .input | width | 100% | same | same |
| .input | border | `1px solid transparent` (focus: still transparent) | same | same |
| .input | outline | none | same | same |

### Typography

| Property | Value |
|---|---|
| font-family | League Spartan (via `leagueSpartan.className` on the input) |
| font-size | 2.667vh → 2.2vh → 2.1vh |
| color | inherited (no rule) |

### Colors

| Element | Color |
|---|---|
| .container bg | white |
| .container shadow | `rgba(0,0,0,0.08)` |
| .input border (focus & rest) | transparent |

### Animations / interactions

- `transition: border-color 0.3s ease-in-out` on the input.
- No focus/hover style is actually visible because both border colors are transparent — vestigial.

## §2 Tailwind port — bug list

| # | Line / file | Current | Expected | Severity |
|---|---|---|---|---|
| — | `Input.tsx` | 1:1 verbatim copy of MUI source | matches | ✓ no delta |
| — | `Input.module.css` | 1:1 verbatim copy | matches | ✓ no delta |

The port preserves the `.module.css` pattern (explicitly grandfathered for this component family per CLAUDE.md style rules).

## §3 Corrected Tailwind classNames

None needed. If a future refactor migrates this away from CSS modules, the equivalent Tailwind classes are:

```tsx
{/* Container */}
<div className="flex h-[5.4vh] items-center rounded-lg bg-white px-2 shadow-card">
  <input
    className={cn(leagueSpartan.className,
      "w-full border border-transparent outline-none p-0 bg-transparent",
      "text-[2.667vh] max-md:text-[2.2vh] max-[480px]:text-[2.1vh] max-[480px]:leading-[2.3vh]"
    )}
    // ...
  />
</div>
```

But **don't migrate** — the .module.css is the canonical pattern.

## §4 Verification at 4 widths

- 375 (<480 band): input font-size 2.1vh / lh 2.3vh ≈ 17px text.
- 768 (≤768 band): 2.2vh ≈ 17px.
- 1280 (default): 2.667vh ≈ 21px.
- 1920 (default): 2.667vh ≈ 28px.

## §5 RTL notes

- `.module.css` is auto-flipped by `stylis-plugin-rtl`? No — that plugin only operates on Emotion (MUI) styles. CSS modules are NOT flipped.
- `padding-left: 8px; padding-right: 8px;` on `.container` is symmetric — safe regardless.
- Input's `text-align` is unset; native AR direction is handled by `dir="rtl"` on parent (`html[dir="rtl"]`).
- **Known caveat:** the wider Input form ecosystem in this repo uses `useFormTranslations` for label/placeholder alignment; this barebones `Input` has neither, so no alignment shim is needed.
