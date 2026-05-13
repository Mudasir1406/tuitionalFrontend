# Component — `<Accordion>`

Sidebar accordion used by `<LeftSection>` to expand/collapse Category and Tag lists in the blog detail layout. Tiny, but its styling sets the tonal expectation for every other sidebar widget.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\accordion\Accordion.tsx` + `Accordion.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\accordion\Accordion.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-accordion\Ar-Accordion.tsx` (RTL alignment only — no layout diff) |

## §1 MUI source — extracted properties

### Layout tree

```
.accordion (rounded card, sky-tint background)
├── .header (click target)
│   ├── <Typography variant="body2"> title (League Spartan via className)
│   └── .icon (▲/▼ unicode, 12px, color #333)
└── .items (ul, only when isOpen)
    └── <Typography variant="caption" component="li"> link rows
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| `.accordion` | `padding` | `16px` | `16px` | `16px` |
| `.accordion` | `border-radius` | `16px` | `16px` | `16px` |
| `.accordion` | `margin-bottom` | `16px` | `16px` | `16px` |
| `.accordion` | `box-shadow` (closed) | `0px 2px 6px rgba(0,0,0,0.1)` | same | same |
| `.accordion.open` | `box-shadow` | `0px 4px 12px rgba(0,0,0,0.15)` | same | same |
| `.items` | `margin` | `16px 0 0` | same | same |
| `.items li` | `margin-bottom` | `8px` | `8px` | `8px` |
| `.header .icon` | `font-size` | `12px` | `12px` | `12px` |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Title | `body2` + `component="b"` | 14px | 14px | 14px | bold (`<b>`) | inherits (`#333`) | `font-heading` (League Spartan) |
| List item | `caption` | 14px | 14px | 14px | 400 | `#333` | `font-heading` |
| Icon (▲/▼) | — | 12px | 12px | 12px | — | `#333` | — |

### Colors

| Hex | Token |
|---|---|
| `#f0f9ff` (accordion bg) | not in palette — use arbitrary `bg-[#f0f9ff]` (sky-50-ish) |
| `#333` (icon/list color) | `text-ink-900` (closest — actual `#333` ≈ `#2d2d2d`) |

### Animations / interactions

- `transition: box-shadow 0.2s ease-in-out` on `.accordion`
- Box-shadow elevates ~2x when `.open`

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| A1 | 19 | `border border-ink-200 bg-white p-3` | `bg-[#f0f9ff] p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.1)]` — MUI uses sky-tint card with shadow, no border, padding 16px | high |
| A2 | 19 | `rounded-md` (6px) | `rounded-[16px]` — MUI 16px | high |
| A3 | 19 | (no `mb-4`) | Add `mb-4` — MUI `.accordion { margin-bottom: 16px }` | med |
| A4 | 19 | (no open-state shadow upgrade) | Add `${isOpen ? "shadow-[0px_4px_12px_rgba(0,0,0,0.15)]" : "shadow-[0px_2px_6px_rgba(0,0,0,0.1)]"} transition-shadow duration-200` | med |
| A5 | 23-26 | Lucide `ChevronUp/Down` 16px | Acceptable swap (MUI uses ▲/▼ unicode at 12px). Reduce `size={14}` to be closer | low |
| A6 | 25 | `<b>{title}</b>` with `font-bold` on parent | OK — MUI uses `<Typography variant="body2" component="b">` (14px bold). Current matches. | none |
| A7 | 29 | `mt-2 flex flex-col gap-1` | `mt-4 flex flex-col gap-2` — MUI `.items { margin: 16px 0 0 }`, `li { margin-bottom: 8px }` | med |
| A8 | 37 | `text-small text-ink-700` | `text-small text-ink-900` — MUI list color is `#333` (closer to ink-900) | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div
  className={cn(
    "mb-4 rounded-[16px] bg-[#f0f9ff] p-4 transition-shadow duration-200",
    isOpen
      ? "shadow-[0px_4px_12px_rgba(0,0,0,0.15)]"
      : "shadow-[0px_2px_6px_rgba(0,0,0,0.1)]",
  )}
>
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="flex w-full items-center justify-between font-heading"
  >
    <b className="font-heading text-small font-bold text-ink-900">{title}</b>
    <span className="text-[12px] text-ink-900">
      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </span>
  </button>
  {isOpen && (
    <ul className="mt-4 flex flex-col gap-2">
      {items?.map((item, index) => (
        <a href={`${blogBaseUrl}/${queryKey}/${item.id}`} key={index}>
          <li className="font-heading text-small text-ink-900 hover:text-brand-500">
            {item?.name}
          </li>
        </a>
      ))}
    </ul>
  )}
</div>
```

## §4 Verification at 4 widths

- **375 / 768 / 1280 / 1920** — accordion card width is determined by its parent (sidebar column); content inside is uniform across breakpoints. Verify shadow elevation visually deepens on open.

## §5 RTL notes

`Ar-Accordion.module.css` is identical to LTR — RTL auto-mirroring via Tailwind's `[dir="rtl"]` (or `stylis-plugin-rtl` in MUI) handles flex/text-align. No layout-specific tweaks required.
