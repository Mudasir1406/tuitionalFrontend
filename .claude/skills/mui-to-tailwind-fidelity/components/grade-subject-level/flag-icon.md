# Component — `FlagIcon`

Inline SVG flag renderer for ~10 country codes (`sa`, `ae`, `us`, `gb`, `fr`, `de`, `ca`, `au`, `es`, `it`, default). Used by `HorizontalTutorCarousel` to overlay a small country flag on each tutor card.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\horizontal-carousel\FlagIcon.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\horizontal-carousel\FlagIcon.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div (inline-block, border-radius 50%, overflow hidden, w=size, h=size)
  <switch countryCode>
    case "sa" → <svg> with rect green + rect white + text "SA"
    case "ae" → <svg> UAE flag (red base + 3 colored rects)
    case "us" → <svg> USA stripes
    case "gb" → <svg> Union Jack
    case "fr" → <svg> France vertical tricolour
    case "de" → <svg> Germany horizontal tricolour
    case "ca" → <svg> Canada (red bars + maple leaf polygon)
    case "au" → <svg> Australia (blue base + crosses)
    case "es" → <svg> Spain (red base + yellow band)
    case "it" → <svg> Italy vertical tricolour
    default → <svg> gray rect with code text
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| outer div | display | inline-block |
| outer div | border-radius | 50% |
| outer div | overflow | hidden |
| outer div | width × height | size × size (default 20px) |
| svg viewBox | | `0 0 24 16` (3:2 aspect) |
| svg width × height | | size × size (default 20) |

### Colors
Per-country hex values — not theme-controlled, no Tailwind equivalents needed.

### Animations
None.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 113-115 | Wrapper: `inline-block overflow-hidden rounded-full` + `style={{ width: size, height: size }}` | MUI uses inline style `{ display: 'inline-block', borderRadius: '50%', overflow: 'hidden', width: size, height: size }`. Tailwind version is semantically identical, just refactored to classes. | OK |
| B2 | All SVG cases | Inline SVGs identical to MUI baseline | matches | OK |

The component is a faithful 1:1 port — no styling bugs.

## §3 Corrected Tailwind classNames

No changes needed. Current implementation is correct.

```tsx
<div
  className="inline-block overflow-hidden rounded-full"
  style={{ width: size, height: size }}
>
  {getFlagSvg(countryCode)}
</div>
```

## §4 Verification at 4 widths

- **375 / 768 / 1280 / 1920**: identical — `size` prop is controlled by parent (`HorizontalTutorCarousel` passes 24). The flag is a self-contained inline SVG.

## §5 RTL notes

- Flags are non-directional symbols (country flags don't flip in RTL).
- No physical positioning inside this component — wrapper relies on parent for placement.
- No RTL concerns.
