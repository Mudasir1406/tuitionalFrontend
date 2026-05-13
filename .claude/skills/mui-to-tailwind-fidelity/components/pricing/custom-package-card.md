# Component — `CustomPackageCard`

A gradient-bordered "Build Your Package" card with a custom pill badge, gradient text title/amount, feature list, and a gradient CTA. Visually distinct from `PackageCard` — the entire chrome is gradient-driven (no solid backgrounds or borders) and it features a top accent bar plus a hover glow halo.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\CustomPackageCard.tsx` + `CustomPackageCard.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\CustomPackageCard.tsx` |
| Arabic variant | None in either repo. |

---

## §1 MUI source — extracted properties

### Layout tree

```
.card (relative, overflow-hidden, h-full, flex flex-col, translateY(-2px) at rest)
├─ ::before (top accent bar, height 4, full-width gradient)
├─ ::after (halo, opacity 0 → 0.1 on hover)
├─ .customBadge (absolute top-4 right-4)
│  └─ .badgeText "⚡ CUSTOM PLAN"
├─ .header (text-center, border-bottom)
│  ├─ .packageTitle "Build Your Package"
│  └─ .description "Design your perfect..."
├─ .priceSection (text-center)
│  ├─ .startingText "Starting from"
│  ├─ .price (flex baseline center)
│  │  ├─ .currency
│  │  └─ .amount
│  ├─ .period "per hour"
│  └─ .customText "Build exactly what you need"
└─ .content (flex-1, flex-col)
   ├─ .features (mb-6, flex-1)
   │  └─ .featuresList ul
   │     └─ .featureItem × 5  (svg + span)
   └─ .actions (mt-auto)
      ├─ .primaryButton "Build Your Package"
      └─ .guarantee "🔒 Free consultation included"
```

### Dimensions & spacing

| Element | Property | Mobile (≤768) | Tablet (769-1024) | Desktop (default) | Large (≥1200) |
|---|---|---|---|---|---|
| `.card` | border | `2px solid #38B6FF` | (same) | (same) | (same) |
| `.card` | border-radius | `16px` | — | — | — |
| `.card` | background | `linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)` | — | — | — |
| `.card` | box-shadow | `0 10px 25px -3px rgba(56,182,255,0.15), 0 4px 6px -2px rgba(56,182,255,0.05)` | — | — | — |
| `.card` | transform | `translateY(-2px)` (rest); hover `translateY(-6px)`; lg hover `translateY(-8px)` | — | — | — |
| `.card::before` | `height: 4px`, full-width gradient `linear-gradient(90deg, #38B6FF 0%, #2563eb 50%, #7c3aed 100%)` | (same) | — | — | — |
| `.customBadge` | top/right | `12px` / `12px` | — | `16px` / `16px` | — |
| `.customBadge` | padding | `6px 10px` | — | `8px 14px` | — |
| `.customBadge` | border-radius | `20px` | — | (same) | — |
| `.customBadge` | box-shadow | `0 4px 12px rgba(56,182,255,0.3)` | — | — | — |
| `.header` | padding | `24px 20px 20px` | — | `32px 24px 24px` | `40px 28px 28px` |
| `.header` | border-bottom | `1px solid #e2e8f0` | — | — | — |
| `.header` | background | `linear-gradient(135deg, rgba(56,182,255,0.02) 0%, rgba(124,58,237,0.02) 100%)` | — | — | — |
| `.priceSection` | padding | `20px` | — | `24px` | — |
| `.priceSection` | background | `linear-gradient(135deg, rgba(56,182,255,0.01) 0%, rgba(255,255,255,1) 100%)` | — | — | — |
| `.content` | padding | `0 20px 24px` | `0 22px 28px` | `0 24px 32px` | `0 28px 40px` |
| `.features` | margin-bottom | `24px`, flex-1 | (same) | (same) | (same) |
| `.featureItem` | margin-bottom | `10px` | — | `12px` | — |
| `.checkIcon` | size / margin-right | `18px / 10px` | — | `20px / 12px` | — |
| `.primaryButton` | padding | `14px 20px` | — | `16px 24px` | — |
| `.primaryButton` | border-radius | `12px` | — | (same) | — |
| `.primaryButton` | margin-bottom | `16px` | — | (same) | — |

### Typography

| Element | Mobile | Tablet | Desktop | Large | Weight / color |
|---|---|---|---|---|---|
| `.badgeText` | 10px | — | 11px | — | 700, white, uppercase, letter-spacing 0.5px |
| `.packageTitle` | 20px | 22px | 24px | — | 700, gradient-clipped text (`#38B6FF → #2563eb → #7c3aed`), line-height 1.2 |
| `.description` | (inherits 14px) | — | 14px | — | normal, `#64748b`, line-height 1.5 |
| `.startingText` | 14px | — | (same) | — | 500, `#64748b`, margin-bottom 8 |
| `.currency` | (inherits) | — | 20px | — | 600, gradient-clipped (`#38B6FF → #7c3aed`), margin-right 4 |
| `.amount` | 36px | 42px | 48px | — | 800, gradient-clipped, letter-spacing -0.02em, line-height 1 |
| `.period` | 16px | — | (same) | — | 500, `#64748b`, margin 0 0 8px 0 |
| `.customText` | 14px | — | (same) | — | 600, `#7c3aed` |
| `.featureItem` | 14px | — | 15px | — | normal, `#374151`, line-height 1.5 |
| `.primaryButton` text | 15px | — | 16px | — | 600, white, letter-spacing 0.025em, text-transform none |
| `.guarantee` | (inherits) | — | 13px | — | 500, `#10b981` |

All text gets `leagueSpartan.className` from the JSX (lines 31, 38, 41, 48, 51, 55, 58, 69, 84, 89).

### Colors (literal hex — do NOT normalize)

| Hex | Role | Tailwind |
|---|---|---|
| `#38B6FF` | gradient stop + border (card) + bg gradient stops | `brand-500` |
| `#2563eb` | gradient stop (middle) — blue-600 | `[#2563eb]` |
| `#7c3aed` | gradient stop (end) — violet-600; also `.customText` solid | `[#7c3aed]` |
| `#ffffff → #f8fafc` | card body gradient | `from-white to-[#f8fafc]` |
| `#e2e8f0` | header border-bottom (slate-200) | `border-[#e2e8f0]` |
| `#64748b` | description / startingText / period | `[#64748b]` (slate-500) |
| `#374151` | featureItem text (slate-700-ish) | `[#374151]` |
| `#10b981` | guarantee text (emerald-500) | `[#10b981]` |

### Animations / interactions

- `.card`: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`; rest `translateY(-2px)`; hover `translateY(-6px)`, deeper shadow, border `#2563eb`; large-screen hover `translateY(-8px)`.
- `.card::after` halo: opacity 0 → 0.1 on hover.
- `.primaryButton`: `transition: all 0.2s ease`; `::before` shimmer pseudo-element slides left → right on hover; hover `translateY(-2px)` + violet-tinted shadow.
- `prefers-reduced-motion` strips all transitions and the shimmer pseudo.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\CustomPackageCard.tsx`

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 26 | `rounded-lg bg-gradient-to-br from-brand-50 to-white p-6 shadow-card ring-2 ring-brand-500` | Card is `rounded-[16px]`, white→`#f8fafc` gradient, NOT brand-50; uses `border-2 border-brand-500` (not ring), translateY(-2px) at rest, distinct shadow. Padding is NOT uniform 6 — section paddings differ. | Critical |
| B2 | 26 | Missing top accent gradient bar (`::before`) | Add `<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed]" />` | High |
| B3 | 27 | Badge: `absolute -top-3 start-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase text-white` | Badge is **inside-corner** at `top:16px right:16px` (max-md: `top:12px right:12px`), `rounded-[20px]`, gradient bg (`#38B6FF → #2563eb → #7c3aed`), shadow `0 4px 12px rgba(56,182,255,0.3)`. Text `11px` desktop / `10px` mobile. | High |
| B4 | 27 | `-top-3 start-6` puts badge floating above-card | MUI keeps badge inside the card, top-right corner. Change to `top-4 end-4 max-md:top-3 max-md:end-3`. | High |
| B5 | 31 | `<div className="mb-4 mt-2">` (header) | MUI `.header` has padding `32/24/24` desktop, border-bottom `1px solid #e2e8f0`, faint gradient bg, text-center. Should be a separate panel. | High |
| B6 | 32 | `<h3 className="font-heading text-h4 text-ink-900">` (text-h4 = 20px/18px/16px) | MUI: `20px sm:22px lg:24px`, gradient-clipped text, 700. Use arbitrary `text-[20px] sm:text-[22px] lg:text-[24px] font-bold bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent leading-[1.2]`. | High |
| B7 | 33 | `text-small text-ink-700` (14px) | Color `#64748b`, line-height 1.5. Replace `text-ink-700` with `text-[#64748b] leading-[1.5]`. | Medium |
| B8 | 38 | `mb-6 border-b border-ink-200 pb-4` is the price section | MUI `.priceSection` is its OWN panel with `padding: 24px` desktop (`20px` mobile), faint gradient bg, text-center, no border-bottom. Remove border, add panel padding + center alignment. | High |
| B9 | 39 | `<p>Starting from</p>` plain | MUI `.startingText` 14px, weight 500, `#64748b`, `margin-bottom: 8px`. Use `text-[14px] font-medium text-[#64748b] mb-2`. | Medium |
| B10 | 40 | `flex items-baseline gap-1` (price row) | MUI: `flex items-baseline justify-center mb-2`. Add `justify-center mb-2`. | Medium |
| B11 | 41 | `text-h5 text-ink-700` currency (= 18px) | MUI 20px desktop, weight 600, gradient-clipped (`#38B6FF → #7c3aed`), `margin-right: 4px`. Replace with `text-[20px] font-semibold bg-gradient-to-r from-brand-500 to-[#7c3aed] bg-clip-text text-transparent mr-1`. | High |
| B12 | 42 | `text-stat-number text-ink-900` amount (48px desktop) | MUI: `36px sm:42px lg:48px xl:52px`, weight 800, gradient-clipped, letter-spacing -0.02em, line-height 1. Need `text-[36px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent tracking-[-0.02em] leading-[1]`. | High |
| B13 | 44 | `text-small text-ink-700` period | MUI `16px`, weight 500, `#64748b`, `margin: 0 0 8px 0`. Use `text-[16px] font-medium text-[#64748b] mb-2`. | Medium |
| B14 | 45 | `mt-1 text-small text-brand-700` customText | MUI `14px font-semibold text-[#7c3aed]`. Use `text-[14px] font-semibold text-[#7c3aed]`. Drop `mt-1` (priceSection already has rhythm). | Medium |
| B15 | 49 | `flex flex-col gap-2` features ul | MUI: each featureItem has `margin-bottom: 12px` (`10px` mobile) — equivalent to `gap-3 max-md:gap-[10px]`. Currently `gap-2` is 8px. | Medium |
| B16 | 51 | `flex items-start gap-2 font-heading text-small text-ink-800` | MUI featureItem: `15px` desktop / `14px` mobile, color `#374151`, line-height 1.5, gap is 12px (`10px` mobile). Use `flex items-start gap-3 max-md:gap-[10px] text-[14px] sm:text-[15px] text-[#374151] leading-[1.5]`. | Medium |
| B17 | 52 | `<Check size={16} className="mt-0.5 shrink-0 text-success" />` | MUI uses a `20x20` (`18x18` mobile) svg colored `#7c3aed` — NOT green, NOT a 16px lucide check. Use `<Check size={20} className="mt-0.5 shrink-0 text-[#7c3aed] max-md:size-[18px]" />` or equivalent (note: `max-md:size-*` is Tailwind 3.4+; if not supported use a wrapper sized via class). | High |
| B18 | 60 | `<Button onClick={onBuildPackage} variant="primary" className="w-full font-heading">` | MUI `.primaryButton` is fully custom: gradient bg `#38B6FF → #2563eb → #7c3aed`, padding `16px 24px` (`14px 20px` mobile), `rounded-[12px]`, text 16px (15px mobile) weight 600, letter-spacing 0.025em, shadow `0 8px 25px 0 rgba(56,182,255,0.35)`, has shimmer overlay on hover. Cannot reuse the primitive Button (solid brand-500). Need custom button. | High |
| B19 | 63 | `mt-3 text-center text-small text-ink-700` guarantee | MUI: `13px`, weight 500, color `#10b981` (emerald), `flex items-center justify-center gap-1.5`. Use `mt-4 flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#10b981]`. | Medium |
| B20 | overall | No `translateY(-2px)` rest state, no hover transform/shadow swap | Add: outer wrapper `transition-all duration-300 -translate-y-0.5 hover:-translate-y-1.5 lg:hover:-translate-y-2 hover:shadow-[0_20px_40px_-3px_rgba(56,182,255,0.25),0_8px_16px_-2px_rgba(56,182,255,0.1)] hover:border-[#2563eb]`. | High |
| B21 | overall | Missing `::after` halo glow | Optional: add a `pointer-events-none absolute -inset-0.5 rounded-[18px] bg-gradient-to-br from-brand-500 via-[#2563eb] to-[#7c3aed] opacity-0 transition-opacity duration-300 group-hover:opacity-10 -z-10`. | Low |

---

## §3 Corrected Tailwind classNames

Root:

```tsx
<div
  className={cn(
    "group relative h-full flex flex-col overflow-hidden",
    "rounded-[16px] border-2 border-brand-500",
    "bg-gradient-to-br from-white to-[#f8fafc]",
    "shadow-[0_10px_25px_-3px_rgba(56,182,255,0.15),0_4px_6px_-2px_rgba(56,182,255,0.05)]",
    "-translate-y-0.5 transition-all duration-300",
    "hover:-translate-y-1.5 lg:hover:-translate-y-2",
    "hover:shadow-[0_20px_40px_-3px_rgba(56,182,255,0.25),0_8px_16px_-2px_rgba(56,182,255,0.1)]",
    "hover:border-[#2563eb]",
  )}
>
  {/* top accent bar */}
  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed]" />

  {/* badge */}
  <div
    className={cn(
      "absolute top-4 end-4 max-md:top-3 max-md:end-3",
      "rounded-[20px] px-3.5 py-2 max-md:px-2.5 max-md:py-1.5",
      "bg-gradient-to-br from-brand-500 via-[#2563eb] to-[#7c3aed]",
      "shadow-[0_4px_12px_rgba(56,182,255,0.3)] z-10",
    )}
  >
    <span className="font-heading text-[11px] max-md:text-[10px] font-bold uppercase tracking-[0.5px] text-white">
      ⚡ CUSTOM PLAN
    </span>
  </div>

  {/* header */}
  <div
    className={cn(
      "text-center border-b border-[#e2e8f0]",
      "px-6 pt-8 pb-6 max-md:px-5 max-md:pt-6 max-md:pb-5 lg:px-7 lg:pt-10 lg:pb-7",
      "bg-gradient-to-br from-[rgba(56,182,255,0.02)] to-[rgba(124,58,237,0.02)]",
    )}
  >
    <h3 className="font-heading text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[1.2] bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent mb-2">
      Build Your Package
    </h3>
    <p className="font-heading text-[14px] leading-[1.5] text-[#64748b] m-0">
      Design your perfect tutoring experience with complete flexibility and personalization.
    </p>
  </div>

  {/* price */}
  <div className="text-center px-6 py-6 max-md:px-5 max-md:py-5 bg-gradient-to-br from-[rgba(56,182,255,0.01)] to-white">
    <p className="font-heading text-[14px] font-medium text-[#64748b] mb-2">Starting from</p>
    <div className="flex items-baseline justify-center mb-2">
      <span className="font-heading text-[20px] font-semibold mr-1 bg-gradient-to-r from-brand-500 to-[#7c3aed] bg-clip-text text-transparent">
        {currency}
      </span>
      <span className="font-heading text-[36px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold leading-none tracking-[-0.02em] bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
        {baseRate}
      </span>
    </div>
    <p className="font-heading text-[16px] font-medium text-[#64748b] mb-2">per hour</p>
    <p className="font-heading text-[14px] font-semibold text-[#7c3aed]">Build exactly what you need</p>
  </div>

  {/* content */}
  <div className="flex-1 flex flex-col px-6 pb-8 max-md:px-5 max-md:pb-6 lg:px-7 lg:pb-10">
    <ul className="flex-1 flex flex-col gap-3 max-md:gap-[10px] mb-6 list-none p-0 m-0">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className="font-heading flex items-start gap-3 max-md:gap-[10px] text-[14px] sm:text-[15px] leading-[1.5] text-[#374151]"
        >
          <Check size={20} className="mt-0.5 shrink-0 text-[#7c3aed] max-md:[&]:h-[18px] max-md:[&]:w-[18px]" aria-hidden="true" />
          <span className="flex-1">{feature}</span>
        </li>
      ))}
    </ul>

    {/* actions */}
    <div className="mt-auto text-center">
      <button
        type="button"
        onClick={onBuildPackage}
        className={cn(
          "relative overflow-hidden w-full font-heading",
          "rounded-[12px] px-6 py-4 max-md:px-5 max-md:py-3.5",
          "text-[16px] max-md:text-[15px] font-semibold tracking-[0.025em] text-white",
          "bg-gradient-to-br from-brand-500 via-[#2563eb] to-[#7c3aed]",
          "shadow-[0_8px_25px_0_rgba(56,182,255,0.35)]",
          "transition-all duration-200 hover:-translate-y-0.5",
          "hover:shadow-[0_12px_35px_0_rgba(124,58,237,0.4)]",
          "mb-4",
        )}
      >
        Build Your Package
      </button>
      <p className="font-heading flex items-center justify-center gap-1.5 text-[13px] font-medium text-[#10b981]">
        🔒 Free consultation included
      </p>
    </div>
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: Card padding pattern: header `24/20/20`, price `20`, content `0/20/24`. Title 20px, amount 36px. Badge inside-corner at 12/12, text 10px. Check icons 18px violet.
- **768px**: Tablet rules kick in (768 sits on the 769 boundary — at 768 we're still in mobile, MUI's `max-width: 768` rule applies). Title 22px tablet kicks at ≥769. Amount 42px tablet. Verify badge transitions to 16/16 placement at ≥769.
- **1280px**: Desktop defaults. Title 24px, amount 48px, content 0/24/32, header 32/24/24. Hover translates -6px.
- **1920px**: Same as 1280 + the `≥1200` overrides — header `40/28/28`, content `0/28/40`, amount 52px (NOT 48), hover translates -8px.

---

## §5 RTL notes

No AR variant exists. If one is added:

- Switch `top-4 end-4` → already direction-aware (`end` flips on RTL). Just include `dir="rtl"` on root.
- All flex containers are `justify-center` / `items-center` (price row), so no `flex-row-reverse` needed.
- Gradient direction `bg-gradient-to-br` is a visual flourish, not directional — keep as-is.
- Letter-spacing on `.amount` is set to `-0.02em` — Arabic numerals (Hindi-Arabic glyphs in Cairo/Noto Sans Arabic) handle negative tracking poorly. Consider dropping `tracking-[-0.02em]` for the RTL build.
- "Build exactly what you need" / "🔒 Free consultation included" / "⚡ CUSTOM PLAN" all need Arabic translation in any future AR build.
