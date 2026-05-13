# Component — `GridView` (tutor section)

Horizontal tutor carousel with previous/next arrows. Shows 1 / 2 / 4 cards by viewport (MUI breakpoint: 768 = 2, 1200 = 4) — Tailwind port shows 1 / 2 / 3 / 4 (introduces a 3-col 900-1199 band that MUI doesn't have). Auto-advances every 5s unless hovered.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\grid-view\GridView.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\grid-view\GridView.tsx` |
| Arabic variant | `ArGridView` (MUI side) |

## §1 MUI source — extracted properties

### Layout tree

```
div .carouselContainer (relative, max-w 85vw, flex items-center justify-center, mx auto)
  button .leftButton                 ← W icon, info color
  div .cardContainer (w 100% overflow-hidden flex)
    div .cardWrapper (w 100% flex, transition transform 0.5s)
      × N div .card (flex 1 0 calc(23.7%) / 48% at sm / 94% mobile; margin 8px) → ImageCard
  button .rightButton                ← E icon, info color
```

### Visible-cards algorithm (MUI)

```ts
if (window.innerWidth >= 1200) return 4;
if (window.innerWidth >= 768) return 2;
return 1;
```

### Dimensions & spacing

| Element | Property | Mobile (<576) | sm (576-767) | md (768-991) | lg (992-1199) | xl (≥1200) | xxl (≥1400) |
|---|---|---|---|---|---|---|---|
| `.carouselContainer` | max-width | 100% | 100% | 100% | 100% | 85vw | 85% |
| `.card` | flex | 1 0 94% | 1 0 23.7% | 1 0 48% | 1 0 23.7% | 1 0 23.7% | 1 0 23.7% |
| `.card` | margin | 8px | 8px | 8px | 8px | 8px | 8px |
| `.leftButton` / `.rightButton` | bg | `#e5e7eb` | | | | | |
| Buttons | padding / radius | 8px / 50% | | | | | |
| Buttons | shadow | `0 2px 4px rgba(0,0,0,0.1)` | | | | | |
| Buttons | hover bg | `#d1d5db` | | | | | |
| `.cardWrapper` | transition | `transform 0.5s ease-in-out` | | | | | |

### Animations

- Auto-advance every 5000ms unless `isHovered`.
- 500ms ease-in-out translateX transitions.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 12-18 | `getVisibleCards` returns **1/2/3/4** (at 600/900/1200) | MUI returns **1/2/4** (at 768/1200). Port introduces a 3-col band at 900-1199 that MUI doesn't have. | **High** — wrong visible card count |
| B2 | 12-18 | `if (window.innerWidth >= 600) return 2;` | MUI uses 768 not 600 | **Med** — 2-col kicks in 168px too early |
| B3 | 60 | wrapper `mx-10 sm:mx-14` (no `max-w-[85vw]`) | MUI `.carouselContainer { max-width: 85vw at xl+, 100% below }`. Port uses fixed `mx-10`/`mx-14` for buttons. | **Med** — width constraint missing on desktop |
| B4 | 63 | `gap-4` (=16px) between cards | MUI `.card { margin: 8px }` = 8px margin on each side → effective gap 16px (cumulative from both adjacent margins) ✓ | OK |
| B5 | 80-87, 89-96 | buttons absolute `-left-10 sm:-left-14`, `h-10 w-10 bg-white text-brand-500 shadow-card hover:bg-brand-50` | MUI buttons inline (not absolute), bg `#e5e7eb`, padding 8px, radius 50%, shadow `0 2px 4px rgba(0,0,0,0.1)`, hover `#d1d5db`. Port positions ABSOLUTE and uses brand colors. | **High** — buttons positioned and colored differently |
| B6 | 86, 95 | `ArrowLeft/ArrowRight` from lucide size 20 | MUI uses `<West/East color="info">` from `@mui/icons-material`. Lucide is NEW DEPENDENCY. MUI `color="info"` resolves to theme info palette (blue tones). | **Critical** — dep + color/icon |
| B7 | 32 | `maxIndex` calc shared with MUI ✓ | matches | OK |
| B8 | 48-53 | autoplay disabled on hover ✓ | matches | OK |
| B9 | 55-57 | Tailwind port computes `cardBasis` with explicit gap subtraction (`calc(${100/visibleCards}% - …)`) | MUI uses simpler `flex: 1 0 calc(23.7%)` with `margin: 8px`. Port refactors but should produce visually equivalent result. | OK |

## §3 Corrected Tailwind classNames

```tsx
const getVisibleCards = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

return (
  <div className="relative mx-auto max-w-full xl:max-w-[85vw] flex items-center justify-center">
    <button onClick={handlePrev} className="flex items-center justify-center rounded-full bg-[#e5e7eb] p-2 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#d1d5db]" aria-label="Previous">
      {/* MUI West icon — color: info (blue) */}
      <svg ... className="h-6 w-6 text-info" />
    </button>

    <div className="w-full overflow-hidden flex">
      <div className="flex w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${translateOffset})` }}>
        {cardsData?.map((card, i) => (
          <div key={i} className="m-2 flex shrink-0"
            style={{ flex: `1 0 calc(${cardBasis})` }}
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <ImageCard data={card} locale={locale} />
          </div>
        ))}
      </div>
    </div>

    <button onClick={handleNext} className="flex items-center justify-center rounded-full bg-[#e5e7eb] p-2 shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#d1d5db]" aria-label="Next">
      <svg ... className="h-6 w-6 text-info" />
    </button>
  </div>
);
```

Replace lucide arrows with MUI's `East` / `West` (or inline SVG approximations).

## §4 Verification at 4 widths

- **375 (<768)**: 1 card visible per slide; gap 16px via 8px margin.
- **768 (768-1199)**: 2 cards visible (MUI breakpoint at 768, not 900).
- **1280 (≥1200)**: 4 cards visible; container max-w 85vw centered.
- **1920**: 4 cards visible; container max-w 85% per `.module.css` xxl rule.

## §5 RTL notes

- `ArGridView` (MUI side) flips arrow positions: `leftButton` semantically becomes "next" (visually right in RTL), `rightButton` becomes "previous".
- Port should swap `handlePrev`/`handleNext` bindings under `dir="rtl"`, or use logical `start`/`end` positioning + keep semantics (Previous = inset-inline-start).
- `translateX` direction also inverts in RTL — `translateX(-X%)` should become `translateX(X%)` (or use CSS `translate` with logical inset).
