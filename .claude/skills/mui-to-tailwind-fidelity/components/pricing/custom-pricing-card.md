# Component — `CustomPricingCard`

A near-duplicate of `CustomPackageCard` — same gradient chrome, same accent bar, same badge, same gradient title and price — but with different copy (`"Configure Your Package"`, `"⚡ CUSTOM PRICING"`, `"Free consultation & trial session"`) and a `max-width: 400px; margin: 0 auto` constraint that centers it within a single-column container. CTA is "Configure Package" and triggers a modal.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\CustomPricingCard.tsx` + `CustomPricingCard.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\CustomPricingCard.tsx` |
| Arabic variant | None. |

The CSS is byte-for-byte identical to `CustomPackageCard.module.css` **except** `.card` adds `max-width: 400px; margin: 0 auto` and the badge text differs. **All spacing, typography, colors, animations are identical** — see [custom-package-card.md §1](./custom-package-card.md) for the full extraction.

---

## §1 MUI source — delta vs CustomPackageCard

| Element | CustomPackageCard | CustomPricingCard |
|---|---|---|
| `.card` `max-width` | (none — fills column) | `400px` |
| `.card` `margin` | (none) | `0 auto` |
| Badge text | `⚡ CUSTOM PLAN` | `⚡ CUSTOM PRICING` |
| Title | `Build Your Package` | `Configure Your Package` |
| Description | `Design your perfect tutoring experience…` | `Build your perfect tutoring plan with hour-based pricing…` |
| `.customText` | `Build exactly what you need` | `Price varies by subject & volume` |
| Amount | `{baseRate}` from props | hard-coded `50` |
| Currency | `{currency}` prop | derived from `userCountry` via inline map (no shared util) |
| Features array | 5 items | 6 items |
| CTA label | `Build Your Package` | `Configure Package` |
| Guarantee | `🔒 Free consultation included` | `🔒 Free consultation & trial session` |
| `onClick` | `onBuildPackage` | `onConfigureClick` |

Everything else (padding, radii, gradients, shadows, transforms, transitions, mobile/tablet/desktop typography triplet, the `::before` accent bar, the `::after` halo, the `.primaryButton` shimmer pseudo, the `prefers-reduced-motion` block) is character-for-character the same. See [custom-package-card.md](./custom-package-card.md) for the full reference.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\CustomPricingCard.tsx`

The Tailwind port replicates the same bugs as `CustomPackageCard` (the file is essentially the same template). Bug numbers map 1:1 to [custom-package-card.md §2](./custom-package-card.md). The deltas specific to this file:

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B-CP1 | 34 | Root: `rounded-lg bg-gradient-to-br from-brand-50 to-white p-6 shadow-card ring-2 ring-brand-500` (no max-width) | Add `mx-auto max-w-[400px]` to constrain card. Plus all the chrome fixes from CustomPackageCard B1, B2, B20. | Critical |
| B-CP2 | 35 | Badge text `⚡ CUSTOM PRICING` with `text-xs font-bold uppercase` | Same badge placement + sizing bugs as CustomPackageCard B3, B4 — must be inside top-right corner, gradient bg, `11px` desktop / `10px` mobile. | High |
| B-CP3 | 50 | `text-stat-number text-ink-900` on amount `50` | Same triplet bug as CustomPackageCard B12 — should be `text-[36px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold` with gradient clip. | High |
| B-CP4 | 49 | Currency from inline `getCurrency()` map | The MUI map is the same: keep `getCurrency` as written, but the CURRENCY span styling must match CustomPackageCard B11 (20px, weight 600, gradient-clipped, `mr-1`). | High |
| B-CP5 | 53 | `text-small text-brand-700` on customText "Price varies by subject & volume" | Per MUI: `14px font-semibold text-[#7c3aed]`. Same as CustomPackageCard B14. | Medium |
| B-CP6 | 62 | `<Check size={16} className="text-success" />` (lucide green check) | Per MUI: `20x20` (`18x18` mobile) violet check, color `#7c3aed`. Same as CustomPackageCard B17. | High |
| B-CP7 | 70 | `<Button variant="primary">Configure Package</Button>` | Replace with custom gradient button identical to CustomPackageCard B18. Label changes to "Configure Package". | High |
| B-CP8 | 73 | `text-small text-ink-700` on guarantee | Per MUI: `13px font-medium text-[#10b981]` with `flex items-center justify-center gap-1.5`. Same as CustomPackageCard B19. | Medium |
| B-CP9 | overall | Missing top accent bar, missing rest translateY(-2), missing hover transforms, missing border-radius `16px`, missing inside-corner badge, missing gradient backgrounds on header/priceSection | All same as CustomPackageCard B1, B2, B5, B8, B20. | Critical |

---

## §3 Corrected Tailwind classNames

Identical to the corrected output in [custom-package-card.md §3](./custom-package-card.md), with two differences:

1. **Add `mx-auto max-w-[400px]`** to the root wrapper to apply MUI's `.card { max-width: 400px; margin: 0 auto }`.
2. Change copy strings: badge → "⚡ CUSTOM PRICING", title → "Configure Your Package", description → "Build your perfect tutoring plan with hour-based pricing and volume discounts.", customText → "Price varies by subject & volume", CTA → "Configure Package", guarantee → "🔒 Free consultation & trial session".
3. Hard-code amount to `50`. Currency lookup remains inline `getCurrency(userCountry)`.

```tsx
<div className={cn(
  "group relative h-full flex flex-col overflow-hidden",
  "mx-auto max-w-[400px]",                              // ← only delta vs CustomPackageCard
  "rounded-[16px] border-2 border-brand-500",
  "bg-gradient-to-br from-white to-[#f8fafc]",
  "shadow-[0_10px_25px_-3px_rgba(56,182,255,0.15),0_4px_6px_-2px_rgba(56,182,255,0.05)]",
  "-translate-y-0.5 transition-all duration-300",
  "hover:-translate-y-1.5 lg:hover:-translate-y-2",
  "hover:shadow-[0_20px_40px_-3px_rgba(56,182,255,0.25),0_8px_16px_-2px_rgba(56,182,255,0.1)]",
  "hover:border-[#2563eb]",
)}>
  {/* … same structure as CustomPackageCard, with copy swapped … */}
</div>
```

---

## §4 Verification at 4 widths

Same as CustomPackageCard verification, plus:

- **375px**: card width = `min(375 - 32px page padding, 400px)` → card fills viewport up to ~343px. Centered within parent.
- **768px**: card capped at 400px width, centered.
- **1280px**: same — card width never exceeds 400px, sits centered in the column (typically inside a `Container size="lg"` single-column layout).
- **1920px**: same as 1280 — confirm the card does not grow with the viewport.

The `max-w-[400px] mx-auto` is what distinguishes this card from `CustomPackageCard`'s use inside grids.

---

## §5 RTL notes

No AR variant. If added, same notes as [custom-package-card.md §5](./custom-package-card.md). The badge sits at `end-4` for direction-awareness.
