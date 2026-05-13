# Component — `ReviewsOnWp` (testimonials)

"Reviews on WhatsApp" section — full-bleed gradient backdrop, centered `<h2>` headline, a grid of `<Waveform>` audio cards (4 visible, "Load More" reveals all), a trust-line caption, and a white "Load More" pill button.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\reviews-on-wp.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\reviews-on-wp.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\testimonials\ar-reviews-on-wp.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box sx={styles.background}  (full-width gradient, flex col, items-center, justify-center)
├── Typography component="h2" variant="h2" sx={styles.heading}  ──→ "Reviews on WhatsApp"  (with ::before linesInvert/linesMobile)
├── Grid container sx={styles.gridContanier} rowSpacing={2}
│   └── Grid item lg={6}  ×N  ──→ <Waveform audio image>
├── Typography variant="body2"  ──→ "10000+ student trusting our Tuitional classes."
└── Button variant="contained" sx={styles.containedBtn}  ──→ "Load More"
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| `.background` | `background` | `linear-gradient(to bottom, #D3EFFE, rgba(255,255,255,0.7))` | — | — | — |
| `.background` | `height` | `"100%"` | — | — | — |
| `.background` | `width` | `"100vw"` | — | — | — |
| `.background` | `zIndex` | `-2` | — | — | — |
| `.background` | `marginTop` | `"0px"` | `"0px"` | `"0px"` | `"0px"` |
| `.background` | `display/items/justify` | `flex col items-center justify-center` | — | — | — |
| `h2.heading` | `marginTop` | `"70px"` | `"80px"` | `"95px"` | `"105px"` |
| `h2.heading` | `paddingX` | `"0px"` | `0` | `0` | `0` |
| `h2.heading` | `textAlign` | `center` | — | — | — |
| `h2.heading::before` | `left` | `-10` | `-35` | `-35` | `-35` |
| `h2.heading::before` | `top` | `-20` | `-35` | `-35` | `-35` |
| `h2.heading::before` | `backgroundImage` | linesMobile | linesInvert | linesInvert | linesInvert |
| `h2.heading::before` | `height / width` | `35px / 43px` | — | — | — |
| `.gridContanier` | `display/items/justify` | `flex items-center justify-center` | — | — | — |
| `.gridContanier` | `maxWidth` | (default) | — | — | `1260px` |
| `.gridContanier` | `marginY` | `"50px"` | — | — | — |
| `Grid container` | `rowSpacing` | `2` (= 16px row gap) | — | — | — |
| `Grid item` | column span | (default xs=12 → full row) | (default xs=12) | (default xs=12) | `lg=6` → 2 cols |
| `.containedBtn` | `width` | `220px` | — | — | — |
| `.containedBtn` | `padding` | `"18px"` | — | — | — |
| `.containedBtn` | `borderRadius` | `"10px"` | — | — | — |
| `.containedBtn` | `marginTop` | `"20px"` | — | — | — |
| `.containedBtn` | `boxShadow` | `1px 15px 34px 0px rgba(0,0,0,0.15)` | — | — | — |
| `.containedBtn` | `backgroundColor` | `white` | — | — | — |
| `.containedBtn` | `letterSpacing` | `-2%` | — | — | — |
| `.containedBtn` | `transition` | `all ease-out 0.2s` | — | — | — |
| `.containedBtn` | `transform` | `scale(1)` | — | — | — |
| `.containedBtn:hover` | `transform` | `scale(1.06)` | — | — | — |
| `.containedBtn` | `textTransform` | none | — | — | — |
| `.containedBtn` | `color` | `rgba(0,155,245,1)` | — | — | — |

### Typography

| Element | MUI variant | Mobile | sm | md | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| `h2.heading` | `variant="h2"` (sx commented out, falls to theme) | 22px | 28px | 28px | 36px | 700 | `#000000` | League Spartan |
| trust-line `<p>` | `variant="body2"` | 14px | 14px | 14px | 14px | 400 | inherit (theme: ink-900) | League Spartan |
| `.containedBtn` label | MUI Button default | 15px | 16px | 16px | 16px | 700 | `rgba(0,155,245,1)` | League Spartan |

> The MUI source has the explicit `fontSize`/`lineHeight` sx keys for `h2.heading` and button label **commented out** — both fall back to the theme cascade.

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| Gradient `linear-gradient(to bottom, #D3EFFE, rgba(255,255,255,0.7))` | `bg-gradient-to-b from-[#D3EFFE] to-white/70` |
| `#000000` (heading) | `text-black` |
| `white` (button bg) | `bg-white` |
| `rgba(0,155,245,1)` (button text) | `text-[#009BF5]` (no token; preserve hex) |
| `rgba(0,0,0,0.15)` (button shadow) | inline shadow string |

### Animations / interactions

- Button: `transform: scale(1)` → `scale(1.06)` on hover, `transition: all ease-out 0.2s`. Translate to `transition-all duration-200 ease-out hover:scale-[1.06]`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 27 | Root: `-z-[2] flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3EFFE] to-white/70` | ✓ Matches MUI gradient, h, w. `z-index: -2` ✓ (`-z-[2]`). | OK ✓ |
| B2 | 28 | `h2`: `relative mt-[70px] text-center font-heading text-h2-mobile sm:text-h2-tablet sm:mt-20 md:mt-[95px] lg:mt-[105px] lg:text-h2 text-black` | MUI `marginTop: { xs: 70, sm: 80, md: 95, lg: 105 }`. Current uses `mt-[70px] sm:mt-20 md:mt-[95px] lg:mt-[105px]`. `sm:mt-20` = 80px ✓. | OK ✓ |
| B3 | 33 | linesMobile image: `absolute -left-[10px] -top-5 z-10 h-[35px] w-[43px] object-contain sm:hidden` | MUI xs: `left: -10, top: -20`. `-left-[10px] ✓`, `-top-5 = -20px ✓`. | OK ✓ |
| B4 | 39 | linesInvert image: `absolute -left-[35px] -top-[35px] z-10 hidden h-[35px] w-[43px] object-contain sm:block` | MUI sm/md/lg: `left: -35, top: -35`. ✓ | OK ✓ |
| B5 | 44 | Grid container: `my-[50px] grid w-full grid-cols-1 items-center justify-center gap-y-4 lg:max-w-[1260px] lg:grid-cols-2 lg:gap-x-4` | MUI: `rowSpacing={2}` = 16px = `gap-y-4` ✓. `marginY: "50px"` → `my-[50px]` ✓. `maxWidth: { lg: "1260px" }` → `lg:max-w-[1260px]` ✓. `lg:grid-cols-2` ✓ (MUI `lg={6}`). `lg:gap-x-4` (16px column gap) — MUI doesn't specify columnSpacing, so column gap defaults to **0**. Current `lg:gap-x-4` is a 16px addition not in MUI; remove for fidelity. | Low |
| B6 | 44 | Each item is wrapped in `<div className="flex justify-center">` | MUI `Grid item lg={6}` renders the `<Waveform>` directly without an explicit centering wrapper. The `.gridContanier` has `justifyContent: center` which centers the items. Current wrapper is a port-only addition; acceptable for centering on single-column layout. | OK ✓ |
| B7 | 52 | Trust-line `<p>`: `font-heading text-small` | ✓ MUI `variant="body2"` = 14px = `text-small`. | OK ✓ |
| B8 | 52 | Trust-line `<p>` missing explicit color | MUI doesn't set a color on the trust-line, inherits ink-900-ish from theme. Current relies on inheritance from white/transparent background — may look faded over the gradient. Consider `text-black` for parity. | Low |
| B9 | 59 | Button: `mt-5 w-[220px] rounded-md bg-white px-0 py-[18px] font-heading text-button leading-[18.4px] tracking-[-0.02em] text-[#009BF5] shadow-[1px_15px_34px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:scale-[1.06] hover:bg-white` | • MUI `padding: "18px"` is **both x and y**; `px-0 py-[18px]` zeroes horizontal. Use `p-[18px]` (or `py-[18px] px-[18px]`).<br>• `mt-5` = 20px ✓ (matches `marginTop: "20px"`).<br>• `rounded-md` = 10px ✓ (matches MUI `borderRadius: "10px"` per token mapping).<br>• `leading-[18.4px]` — MUI **comments this out**; theme button line-height applies. Remove `leading-[18.4px]`.<br>• Missing `font-bold` / `normal-case`. MUI Button label is 700 weight and `textTransform: "none"`. Add `font-bold normal-case`. | High |
| B10 | 59 | `text-button` (without `-mobile`) | Use the triplet `text-button-mobile sm:text-button` per [01-token-mapping.md §1](../../01-token-mapping.md). | Medium |
| B11 | 28 | `h2` uses `text-h2-*` triplet (22/28/36) | MUI source's `h2.heading` has `fontSize`/`lineHeight` **commented out**, so it falls through to `variant="h2"` theme tokens. Current is correct. | OK ✓ |
| B12 | n/a | Root container missing `relative` | MUI source uses `position` only on the heading (relative). The background `Box` doesn't need it. ✓ | OK ✓ |
| B13 | n/a | The `Box` containing the trust-line is missing margin between the grid and the trust-line | MUI: grid has `marginY: "50px"` (covers both top + bottom 50px). Trust-line follows immediately after the grid's bottom margin, then 20px before the button. Current `mt-5` on button = 20px; the trust-line itself has no explicit margin. ✓ | OK ✓ |

### Critical fixes

1. **B9** — Button padding: `px-0 py-[18px]` → `p-[18px]`. Adds horizontal padding to match MUI.
2. **B9** — Remove `leading-[18.4px]` (commented out in MUI). Add `font-bold normal-case`.
3. **B10** — Replace `text-button` with `text-button-mobile sm:text-button` triplet.

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="-z-[2] flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3EFFE] to-white/70">
    <h2 className="relative mt-[70px] text-center text-black font-heading text-h2-mobile sm:mt-20 sm:text-h2-tablet md:mt-[95px] lg:mt-[105px] lg:text-h2">
      <Image
        src={linesMobile}
        alt=""
        aria-hidden="true"
        className="absolute -left-[10px] -top-5 z-10 h-[35px] w-[43px] object-contain sm:hidden"
      />
      <Image
        src={linesInvert}
        alt=""
        aria-hidden="true"
        className="absolute -left-[35px] -top-[35px] z-10 hidden h-[35px] w-[43px] object-contain sm:block"
      />
      {t("testimonials.reviews_on_wp.heading")}
    </h2>

    <div className="my-[50px] grid w-full grid-cols-1 items-center justify-center gap-y-4 lg:max-w-[1260px] lg:grid-cols-2">
      {displayedReviews.map((item, index) => (
        <div key={index} className="flex justify-center">
          <Waveform audio={item.audio} image={item.imageUrl} />
        </div>
      ))}
    </div>

    <p className="font-heading text-small text-black">
      {t("testimonials.reviews_on_wp.trust_line")}
    </p>

    {!showAll && (
      <Button
        onClick={handleLoadMore}
        className="mt-5 w-[220px] rounded-[10px] bg-white p-[18px] font-heading text-button-mobile sm:text-button font-bold normal-case tracking-[-0.02em] text-[#009BF5] shadow-[1px_15px_34px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out hover:scale-[1.06] hover:bg-white"
      >
        {t("testimonials.reviews_on_wp.load_more")}
      </Button>
    )}
  </div>
);
```

### From → To

| From | To |
|---|---|
| `px-0 py-[18px]` (button) | `p-[18px]` |
| `text-button leading-[18.4px]` | `text-button-mobile sm:text-button` |
| (no `font-bold normal-case`) | `font-bold normal-case` |
| `lg:gap-x-4` on grid | (remove — MUI column gap is 0) |

---

## §4 Verification at 4 widths

- **375 px** — Full-width gradient. Heading 22px center, top margin 70px. Decorative linesMobile at `(-10, -20)`. Audio cards stack in 1 column with 16px row gap, `my-[50px]` wrap margin. Trust-line 14px center. Button white, 220px wide, 18px padding all sides, 20px margin-top.
- **768 px** — Heading 28px center, top margin 80px. Decorative swaps to linesInvert at `(-35, -35)`. Still 1-column waveform grid.
- **1280 px** — Heading 36px center, top margin 105px. Grid becomes 2-column inside max-w 1260px container. Waveform width 580px (per the Waveform component) means two side-by-side fit comfortably under 1260px.
- **1920 px** — Same as 1280; container caps at 1260px.

---

## §5 RTL notes

- AR variant (`ar-reviews-on-wp.tsx`) flips `::before.left: -10` → `right: -10`, etc.
- The Tailwind port uses **physical** `-left-[10px]` / `sm:-left-[35px]` on decorative images. These will not auto-flip in RTL. Replace with logical `-start-[10px]` / `sm:-start-[35px]`.
- All other layout (flex-col items-center, centered text, button) is symmetric and doesn't need RTL flipping.
- The `w-screen` root forces the section to span the viewport regardless of writing direction.
