# Component — `CountrySelector`

A pill-shaped country picker rendered next to pricing. The MUI build is a custom button + portal-mounted dropdown driven by `CountrySelector.module.css`. The Arabic variant is a full MUI `<Select>` rebuild (`ArCountrySelector.tsx`) that reuses the same `.module.css`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\CountrySelector.tsx` + `CountrySelector.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\CountrySelector.tsx` |
| Arabic variant | MUI: `ArCountrySelector.tsx` (re-uses same `.module.css`); Tailwind: `ArCountrySelector.tsx` (uses `@headlessui/react` Listbox) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.container (relative inline-block, ref → containerRef)
└─ .trigger (button)
   ├─ .flag       (emoji span)
   ├─ .countryName (code text — flex:1, text-align:left)
   ├─ .currency   (small "(USD)" span)
   └─ .chevron    (16x16 svg)

createPortal → document.body:
.backdrop (fixed inset-0, z-999, onClick closes)
.dropdown[.dropdownUp?] (position:fixed via inline style, min-width:280)
└─ .dropdownContent (padding 0.5rem 0, max-h 50vh, overflow-y auto)
   └─ .option × N
      ├─ .optionFlag
      ├─ .optionInfo
      │  ├─ .optionName    (<Typography>, fw 500)
      │  └─ .optionCurrency ("Prices in USD")
      └─ .checkIcon (1.25rem svg, selected only)
```

### Dimensions & spacing

| Element | Property | Mobile (≤768) | Desktop (default) |
|---|---|---|---|
| `.trigger` | padding | `0.625rem 0.875rem` (10/14px) | `0.75rem 1rem` (12/16px) |
| `.trigger` | gap | `0.5rem` (8px) | `0.5rem` |
| `.trigger` | min-width | `180px` | `200px` |
| `.trigger` | border | `2px solid #e5e7eb` | (same) |
| `.trigger` | border-radius | `8px` | `8px` |
| `.trigger` | background | `white` (hover `#f9fafb`) | (same) |
| `.trigger` focus | border `#38B6FF`, shadow `0 0 0 3px rgba(56,182,255,0.1)` | (same) |
| `.backdrop` | position fixed, inset 0, z-index `999` | — |
| `.dropdown` | min-width | `260px` | `280px` |
| `.dropdown` | border | `1px solid #e5e7eb`, radius `8px` | (same) |
| `.dropdown` | box-shadow | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | (same) |
| `.dropdown` | z-index | `1000` | (same) |
| `.dropdownContent` | padding | `0.5rem 0` (8/0) | (same) |
| `.dropdownContent` | max-height / overflow | `50vh` / `auto` (overscroll-behavior `contain`) | (same) |
| `.option` | padding | `0.875rem 1rem` (14/16) | `0.75rem 1rem` (12/16) |
| `.option` | gap | `0.75rem` (12px) | (same) |
| `.checkIcon` | size | `1.25rem` (20px) | (same) |

### Typography

| Element | font-size | weight | color | font |
|---|---|---|---|---|
| `.trigger` (root) | `0.875rem` (14px) | `500` | inherited | system stack |
| `.flag` / `.optionFlag` | `1.125rem` (18px) | — | — | emoji |
| `.countryName` | `0.875rem` | `500` | `#374151` | — |
| `.currency` (in trigger) | `0.75rem` (12px) | inherited | `#6b7280` | — |
| `.optionName` (Typography) | inherited (1rem from MUI body1) | `500` (override) | `inherit` (selected `#2563eb`) | MUI body |
| `.optionCurrency` (Typography) | `0.75rem` | inherited | `#6b7280` (selected `#6366f1`) | MUI body |

Note: this component does **not** apply `leagueSpartan.className`. MUI text uses MUI's default body typography (Roboto by default — but the project resets `body { font-family }` globally so this lands on the page font).

### Colors

| Hex | Role | Tailwind |
|---|---|---|
| `#38B6FF` | trigger focus / hover border, check icon | brand-500 / `text-brand-500` |
| `#e5e7eb` | trigger + dropdown border (resting) | `border-[#e5e7eb]` (arbitrary; nearest ink-200 is `#E2E8F0` — NOT equal) |
| `#f9fafb` | trigger hover bg, option focus bg | `bg-[#f9fafb]` |
| `#374151` | country name text | `text-[#374151]` (slate-700) |
| `#6b7280` | currency + chevron + option-currency | `text-[#6b7280]` (slate-500) |
| `#eff6ff` | selected option bg | `bg-[#eff6ff]` (blue-50) |
| `#dbeafe` | selected option hover bg | `bg-[#dbeafe]` (blue-100) |
| `#2563eb` | selected option text | `text-[#2563eb]` (blue-600) |
| `#6366f1` | selected option currency text | `text-[#6366f1]` (indigo-500) |
| `#f3f4f6` | `.option:focus` bg | `bg-[#f3f4f6]` |

Do not normalize these to brand `ink-*` — they're literal Tailwind defaults the MUI build pulled in.

### Animations / interactions

- `.trigger`: `transition: all 0.2s ease`
- `.chevron`: `transition: transform 0.2s ease`; rotates 180° via `:has(.dropdown)` (will not fire in the Tailwind port; needs explicit `[aria-expanded]` flip).
- `.option`: `transition: background-color 0.2s ease`.
- Dropdown vertical placement: JS measures viewport, sets `dropdownPosition` to `up` or `down` (then via inline style `top: rect.top - 8` and `transform: translateY(-100%)`).

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\CountrySelector.tsx`

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 76 | `border-ink-200 ... shadow-card hover:bg-ink-50` (~12/16 padding via `px-4 py-2`) | `border-2 border-[#e5e7eb]` and `min-w-[200px] md:min-w-[200px] max-md:min-w-[180px]`. Trigger needs explicit 2px border, MUI has no `shadow-card` — only focus shadow. | High |
| B2 | 76 | `text-form-input` (1rem) on trigger | MUI trigger text is `14px` `500`. Use `text-small font-medium` or `text-[14px] font-medium`. | High |
| B3 | 76 | `font-heading` | MUI does NOT apply League Spartan to the trigger (no `leagueSpartan.className`). Drop `font-heading`; let the body font cascade. | Medium |
| B4 | 78 | `text-xl` (1.25rem) on flag | MUI uses `1.125rem` (18px). Should be `text-lg`. | Low |
| B5 | 79 | `font-semibold` on country code | MUI `.countryName` is `font-weight: 500`. Should be `font-medium`. | Medium |
| B6 | 79 | `text-ink-900` on country code | MUI uses `#374151` (slate-700). Use `text-[#374151]`. | Medium |
| B7 | 80 | `text-ink-700` on currency | MUI `0.75rem`, color `#6b7280`. Use `text-[12px] text-[#6b7280]` (currently lacks size override). | Medium |
| B8 | 81 | Chevron 16px, no rotation on open | MUI rotates 180deg on open. Add `className={cn('transition-transform', isOpen && 'rotate-180')}`. | Medium |
| B9 | 87 | `fixed inset-0 z-40` backdrop | MUI uses `z-index: 999`. With `z-50` on dropdown that's fine — but no visible difference. Keep but bump dropdown to higher than backdrop. OK. | Low |
| B10 | 92-99 | Dropdown: `min-w-[280px] rounded-md ... shadow-xl ring-1 ring-ink-200` | MUI radius `8px` (`rounded-md` already matches token table). `shadow-xl` ≠ MUI's `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` — use `shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]`. `ring-ink-200` (`#E2E8F0`) ≠ MUI's `#e5e7eb` — use `border border-[#e5e7eb]` instead of ring. | Medium |
| B11 | 102 | `max-h-[350px]` (JS estimate) | MUI CSS `.dropdownContent` declares `max-height: 50vh`. Use `max-h-[50vh]` to match. | Medium |
| B12 | 102 | `py-1` (4px) | MUI `padding: 0.5rem 0` (8px). Use `py-2`. | Low |
| B13 | 111 | option `px-4 py-3` (16/12) | MUI desktop `0.75rem 1rem` (12/16) → matches as `px-4 py-3`. But mobile MUI uses `0.875rem 1rem` (14/16): add `max-md:py-[14px]`. Note: gap `gap-3` is correct. | Low |
| B14 | 112 | `bg-brand-50` selected option | MUI uses `#eff6ff` (blue-50, different from brand-50 `#D7F0FF`). Use `bg-[#eff6ff]` and add `hover:bg-[#dbeafe]` for selected hover. | Medium |
| B15 | 115 | `text-2xl` on option flag | MUI `1.125rem` (18px) → should be `text-lg`. | Low |
| B16 | 117 | `text-form-input font-semibold text-ink-900` option name | MUI `.optionName` is `font-weight: 500`, color inherits (defaults to body text). Drop `font-semibold` → `font-medium`. Drop `text-ink-900` (let inherit). | Medium |
| B17 | 120 | `text-small text-ink-700` option currency | MUI `0.75rem` (`text-[12px]`) — `text-small` is 14px. And selected color flips to `#6366f1`. Use `text-[12px] text-[#6b7280]` and add `group-aria-selected:text-[#6366f1]` conditional. | Medium |
| B18 | 124 | `text-brand-500` check, `size={18}` | MUI uses `1.25rem` (20px). Use `size={20}`. | Low |
| B19 | overall | Missing transition on trigger (no `transition` class) | Add `transition-colors duration-200` on trigger. | Low |
| B20 | overall | Trigger has no focus ring matching MUI's `0 0 0 3px rgba(56,182,255,0.1)` | Add `focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:border-brand-500`. | Medium |

---

## §3 Corrected Tailwind classNames

Trigger:

```tsx
<button
  type="button"
  onClick={handleToggleOpen}
  aria-expanded={isOpen}
  className={cn(
    "flex min-w-[200px] max-md:min-w-[180px] items-center gap-2",
    "rounded-md border-2 border-[#e5e7eb] bg-white",
    "px-4 py-3 max-md:px-[14px] max-md:py-[10px]",
    "text-[14px] font-medium",
    "transition-colors duration-200 hover:bg-[#f9fafb] hover:border-brand-500",
    "focus-visible:outline-none focus-visible:border-brand-500",
    "focus-visible:shadow-[0_0_0_3px_rgba(56,182,255,0.1)]",
  )}
>
  <span className="text-lg">{currentCountryInfo.flag}</span>
  <span className="flex-1 text-start text-[#374151]">{currentCountryInfo.code}</span>
  <span className="text-[12px] text-[#6b7280]">({currentCountryInfo.currency})</span>
  <ChevronDown
    size={16}
    aria-hidden="true"
    className={cn("text-[#6b7280] transition-transform duration-200", isOpen && "rotate-180")}
  />
</button>
```

Dropdown (portal):

```tsx
<div className="fixed inset-0 z-[999]" onClick={() => setIsOpen(false)} aria-hidden="true" />
<div
  className={cn(
    "fixed z-[1000] min-w-[280px] max-md:min-w-[260px]",
    "rounded-md border border-[#e5e7eb] bg-white",
    "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
    dropdownPosition === "up" && "-translate-y-full",
  )}
  style={{
    left: dropdownRect.left,
    top: dropdownPosition === "up" ? dropdownRect.top - 8 : dropdownRect.bottom + 8,
    width: dropdownRect.width,
  }}
>
  <div className="max-h-[50vh] overflow-y-auto overscroll-contain py-2">
    {SUPPORTED_COUNTRIES.map((country) => {
      const isSelected = selectedCountry === country.code;
      return (
        <button
          key={country.code}
          type="button"
          onClick={() => handleCountryChange(country.code)}
          className={cn(
            "flex w-full items-center gap-3 px-4 py-3 max-md:py-[14px] text-start",
            "transition-colors duration-200",
            isSelected ? "bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]" : "hover:bg-[#f9fafb]",
            "focus-visible:bg-[#f3f4f6] focus-visible:outline-none",
          )}
        >
          <span className="text-lg shrink-0">{country.flag}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{country.name}</p>
            <p className={cn("text-[12px]", isSelected ? "text-[#6366f1]" : "text-[#6b7280]")}>
              Prices in {country.currency}
            </p>
          </div>
          {isSelected && <Check size={20} className="text-brand-500 shrink-0" />}
        </button>
      );
    })}
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: trigger `min-w-[180px]`, padding `10px 14px`, dropdown floating below or above container; option padding 14/16. Compare emoji + code visual weight against MUI.
- **768px**: trigger desktop padding `12/16`, still fits inline next to "Country:" label. Dropdown 280px wide.
- **1280px**: identical to 768; verify `:hover` border flips to `#38B6FF`.
- **1920px**: identical; check that the portal `top: rect.bottom + 8` lands exactly 8px below the trigger.

---

## §5 RTL notes

`ArCountrySelector.tsx` (Tailwind) is a totally different implementation — uses `@headlessui/react` `Listbox`. It rebuilds the same visual: pill trigger + dropdown.

- Wrap root in `dir="rtl"`. Already present (line 32).
- `gap-2` flips naturally under RTL; no `space-x-*` is used so no flipping needed there.
- `text-start` (line 65) is correct — it resolves to right-aligned under RTL.
- Selected check icon currently rendered at the END of the option (after the name span). In MUI's LTR build the check is also at end (right). In RTL this resolves to the visual left — that's consistent with MUI's RTL Arabic rendering (MUI doesn't flip the check). OK.
- Country code lookup difference: AR variant displays `country.nameAr`. The pricing key passed up still goes through `mapApiCountryToPricing` — confirm `country.dbKey` is set for every supported country.
- AR variant has no separate `.module.css`; it shares `CountrySelector.module.css` (in MUI) but the Tailwind port does not need a shared style file.
