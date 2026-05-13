# Example 05 — Pricing `<PackageCard>`

A pricing tier card. Used on `/pricing` and `/ar/pricing`. Image: a tall white card with title, big price, feature list with green checks, CTA button. Has a "popular" variant with blue background.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\PackageCard.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\PackageCard.tsx` |

**Verdict up front**: the Tailwind port substantially redesigned this component rather than porting it. The user-visible result is a different-looking pricing card from the MUI baseline. The fixes below restore MUI's visual.

---

## §1 MUI source — the precise dimensions

### Card chrome (per `.module.css`)

| Property | Mobile (<768) | Tablet (769-1024) | Desktop (default) | Large (≥1200) | XL (≥1440) |
|---|---|---|---|---|---|
| `padding` | 32px 24px | 36px 28px | **40px 32px** | 48px 36px | (1200 rule) |
| `border-radius` | 20px | 20px | **20px** | 20px | 20px |
| `border` | 2px solid #f1f5f9 (`ink-200` ≈) | — | — | — | — |
| `box-shadow` | `0 4px 20px rgba(0,0,0,0.08)` | — | — | — | — |
| `display` | flex flex-col | — | — | — | — |
| `text-align` | center | — | — | — | — |
| Hover | `translateY(-8px)`, shadow → `0 8px 30px rgba(0,0,0,0.12)`, border → `#e2e8f0` | — | — | — | — |
| Transition | `all 0.3s ease` | — | — | — | — |

### "Popular" variant

| Property | Value |
|---|---|
| `background` | `#38b6ff` (brand-500) |
| `border-color` | `#38b6ff` |
| `color` | white |
| `transform` | `translateY(-4px)` |
| `box-shadow` | `0 8px 30px rgba(56, 182, 255, 0.25)` |
| `margin` | `4px 0 8px 0` |
| Hover | `translateY(-12px)`, deeper shadow |
| Mobile override (<768) | `transform: none, margin: 0 0 32px 0, scale: 1, box-shadow: 0 4px 20px rgba(56,182,255,0.25)` — no translate on mobile |

### Typography

| Element | Property | Mobile (<768) | Tablet (769-1024) | Desktop | Large (≥1200) | XL (≥1440) |
|---|---|---|---|---|---|---|
| `.packageTitle` | font-size | **20px** | **22px** | **32px** | (same) | **28px** |
| `.packageTitle` | font-weight / color | 700 / `#1e293b` | — | — | — | — |
| `.packageTitle` | line-height | 1.2 | — | — | — | — |
| `.amount` | font-size | **36px** | **42px** | **48px** | **52px** | — |
| `.amount` | font-weight / color | 800 / `#1e293b` | — | — | — | — |
| `.amount` | letter-spacing | -0.02em | — | — | — | — |
| `.currency` | font-size | (inherits — 24px on desktop in module) | — | **24px** | — | — |
| `.currency` | color / weight | `#64748b` / 600 | — | — | — | — |
| `.period` | font-size / color | 16px / `#64748b` / 500 | — | — | — | — |
| `.crossed` | font-size / color | 14px / `#94a3b8` (`text-decoration: line-through`) | — | — | — | — |
| `.savings` | font-size / color / bg | 12px / white / **`#22c55e`** (green-500, NOT the brand success #51B893) padding 2/8 radius 12 | — | — | — | — |
| `.featureText` | font-size | **16px** (mobile + lg) / **18px** (desktop default) / **15px** (xl) | — | — | — | — |
| `.featureItem` | color | `#475569` (`ink-700` ≈) | — | — | — | — |
| `.moreFeatures` | font-size / color | 14px (13px mobile) / `#38b6ff` | — | — | — | — |
| `.checkIcon` | size / bg | **20x20px green `#22c55e` circle**, white check inside, `font-size: 12px`, `font-weight: bold`, `margin-right: 12px` | — | — | — | — |

### Action button (`.actionButton`)

| Property | Value (default — non-popular) |
|---|---|
| `background` | `#1e293b` (slate-800) — NOT brand blue! |
| `color` | white |
| `font-weight` | 600 |
| `padding` | `16px 32px` desktop / `14px 24px` mobile |
| `border-radius` | **16px** |
| `font-size` | 16px desktop / 15px mobile |
| `text-transform` | none |
| `letter-spacing` | 0.025em |
| `width` | 100% |
| Hover | `bg → #334155`, `translateY(-2px)`, shadow |

Popular button variant: `bg white, color #1e293b, border 2px solid white`. Hover: `bg #f8fafc`.

### Spacing rhythm inside the card

| Section gap | Mobile | Desktop |
|---|---|---|
| `.header { margin-bottom }` | 24px | 8px |
| `.priceSection { margin-bottom }` | 32px | 24px |
| `.features { margin-bottom }` / `gap` | 20px / 12px | 24px / 12px |
| `.priceContainer` to `.period` | (no margin) | (no margin) |
| `.originalPrice` to crossed/savings | `gap: 8px` | `gap: 8px` |

---

## §2 The Tailwind port has rewritten the card — full delta

Reading `tuitionalFrontend\src\components\pricing\PackageCard.tsx`:

| # | Aspect | Current Tailwind | Should be (per MUI) |
|---|---|---|---|
| B1 | Outer chrome | `relative flex flex-col rounded-lg bg-white p-6 shadow-card` (8px radius, 24px padding, default light shadow) | `relative flex flex-col rounded-[20px] border-2 border-[#f1f5f9] bg-white p-8 text-center shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_0_rgba(0,0,0,0.12)] sm:p-9 md:p-10 lg:p-12` |
| B2 | Popular variant | `ring-2 ring-brand-500` | Replace with: `bg-brand-500 border-brand-500 text-white -translate-y-1 shadow-[0_8px_30px_0_rgba(56,182,255,0.25)] my-1 hover:-translate-y-3 max-md:my-0 max-md:mb-8 max-md:translate-y-0` — completely different visual treatment |
| B3 | Package title `<h3 className="font-heading text-h4 text-ink-900">` | `text-h4` = 20px desktop / 18px tablet / 16px mobile (h4-mobile) | MUI's `.packageTitle` is **32px desktop / 22px tablet / 20px mobile**. None of the standard `text-h*` tokens fit (h2 is 36 / 28 / 22 — closer but not exact). **Use `text-[20px] sm:text-[22px] lg:text-[32px]` arbitrary values** since this component has custom non-token sizes. |
| B4 | Title color/weight | `text-ink-900` (= `#2d2d2d`) | `text-[#1e293b]` — slate-800, not ink-900 |
| B5 | Price section | `mb-6 border-b border-ink-200 pb-4` | `mb-6 sm:mb-8 max-md:mb-8` — no border-bottom in MUI. Remove the divider. |
| B6 | Currency | `font-heading text-h5 text-ink-700` (= 18px) | `font-heading text-[24px] font-semibold text-[#64748b]` |
| B7 | Amount | `font-heading text-stat-number text-ink-900` (= 3rem/48px desktop — coincidentally matches, but no responsive triplet) | `font-heading text-[36px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold text-[#1e293b] tracking-[-0.02em]` |
| B8 | Period text | `font-heading text-small text-ink-700` (= 14px) | `font-heading text-[16px] font-medium text-[#64748b]` |
| B9 | Crossed price | `line-through text-ink-500` | `line-through text-[14px] text-[#94a3b8]` |
| B10 | Savings badge | `text-success font-semibold` | `bg-[#22c55e] text-white text-[12px] font-semibold px-2 py-0.5 rounded-xl` (note: MUI uses `#22c55e` Tailwind-green-500, NOT the brand `#51B893` `success` token) |
| B11 | Features container | `flex flex-col gap-2` | `flex flex-col gap-3 mb-6 max-md:mb-5` |
| B12 | Feature item | `flex items-start gap-2 font-heading text-small text-ink-800` | `flex items-start text-start text-[#475569] leading-[1.5] text-[16px] sm:text-[18px] lg:text-[16px] xl:text-[15px] font-heading` (the responsive size **inverts** at xl — MUI's CSS shrinks featureText to 15px at ≥1440. Strange but documented.) |
| B13 | Check icon | `<Check size={16} className="text-success" />` (a lucide check glyph) | **A 20x20 `#22c55e` circle with a white "✓" character inside**: `<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white text-[12px] font-bold me-3">✓</span>`. MUI uses a literal ASCII check, not an icon. |
| B14 | More-features button | `text-start font-heading text-small text-brand-500 hover:underline` | `text-center text-[14px] sm:text-[13px] font-heading font-semibold text-brand-500 py-2 max-md:text-[13px] max-md:py-1.5 cursor-pointer select-none hover:-translate-y-px transition-all duration-200` (note: 13px on mobile, 14px desktop — text shrinks on mobile, unusual) |
| B15 | Action button | `<Button variant={isPopular ? "primary" : "outline"}>` from `@/components/ui/button` | Custom: `bg-[#1e293b] text-white font-heading font-semibold text-[16px] sm:text-[15px] px-8 py-4 max-md:px-6 max-md:py-3.5 rounded-[16px] tracking-[0.025em] w-full transition-all duration-300 hover:bg-[#334155] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(30,41,59,0.3)]`. Popular variant flips: `bg-white text-[#1e293b] border-2 border-white hover:bg-[#f8fafc]` |
| B16 | Actions wrapper | `mt-6` | `mt-auto` (uses `flex-1` on `.content` so button sticks to bottom) |

This is a **substantial rewrite**. Don't try to fix it in one pass; do it in stages.

---

## §3 Suggested staged rollout

1. **Stage 1** (most visible fix): card padding, border-radius, package title size, price amount size, popular variant background swap.
2. **Stage 2**: feature list — check icon, gap, text size.
3. **Stage 3**: action button — colors, padding, radius.
4. **Stage 4**: hover transforms + transitions.

After each stage, run the verification on the device matrix.

---

## §4 Key takeaway

**This component uses a different color palette than the rest of the codebase.** MUI's PackageCard uses slate (`#1e293b`, `#475569`, `#64748b`, `#94a3b8`, `#f1f5f9`) — Tailwind defaults, not the brand `ink-*` ramp. Same for the check icon green: `#22c55e` (Tailwind green-500), not the brand `success #51B893`.

When porting this kind of "lifted from somewhere else" component:
- Don't normalize the inline hex values to brand tokens just because they look close. Slate-700 ≠ ink-700.
- Don't substitute lucide icons when MUI uses literal CSS shapes (the green check circle is a `div`, not an icon).
- Don't use the `ui/Button` primitive when MUI uses a custom styled button — replicate the styles literally.

The rule of thumb: when MUI uses raw hex colors NOT in [token-mapping.md §5](../01-token-mapping.md), use Tailwind arbitrary values (`bg-[#1e293b]`), not the closest brand token.
