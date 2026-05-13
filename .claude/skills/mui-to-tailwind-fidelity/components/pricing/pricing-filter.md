# Component — `PricingFilter`

A horizontal filter bar with 3 dropdowns (grade / subject / curriculum), a "Clear Filters" action, and a results-count line. Currently UNUSED in the MUI source — `PricingSection.tsx` line 142 has it commented out. Still ported in both repos in case it returns.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\PricingFilter.tsx` + `PricingFilter.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\PricingFilter.tsx` |
| Arabic variant | None. |

---

## §1 MUI source — extracted properties

### Layout tree

```
.container (white panel, rounded-12, shadow)
├─ .filterSection
│  └─ .filterGrid (auto-fit minmax(200,1fr), gap 1.5rem, align-items end)
│     ├─ .filterItem × 3  (each wraps a DropDown)
│     └─ .filterActions
│        └─ .clearButton  (rendered only when hasActiveFilters)
└─ .resultsInfo (padding-top 1rem, border-top)
   └─ .resultsText "Showing {N} package(s) available in {country}"
```

### Dimensions & spacing

| Element | Property | Mobile (≤768) | Tablet (769-1024) | Desktop (≥1200) |
|---|---|---|---|---|
| `.container` | padding | `1.5rem` (24px) | (default 2rem) | `2rem` (32px) |
| `.container` | margin-bottom | `1.5rem` (24px) | (default 2rem) | `2rem` |
| `.container` | background / radius | `white` / `12px` | — | — |
| `.container` | box-shadow | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)` | — | — |
| `.filterSection` | margin-bottom | `1rem` | — | — |
| `.filterGrid` | grid-template-columns | `1fr` | `repeat(2, 1fr)` | `repeat(4, 1fr)` |
| `.filterGrid` | gap | `1rem` (16px) | (default 1.5rem) | `1.5rem` (24px) |
| `.filterGrid` | align-items | `end` | — | — |
| `.clearButton` | padding | `0.75rem 1rem` (12/16) | — | — |
| `.clearButton` | border-radius | `8px` | — | — |
| `.clearButton` | width (mobile) | `100%` | — | — |
| `.resultsInfo` | padding-top | `1rem` | — | — |
| `.resultsInfo` | border-top | `1px solid #e5e7eb` | — | — |

### Typography

| Element | font-size | weight | color | font |
|---|---|---|---|---|
| `.clearButton` | `0.875rem` (14px) | `500` | `#6b7280` (hover `#374151`) | inherits |
| `.resultsText` Typography | inherits MUI body (1rem) but classed `text-small` look — declares `font-size: 0.875rem` (14px) | normal | `#64748b` | uses `leagueSpartan.className` |
| `.resultsCount` span | inherits 14px | `600` | `#38B6FF` | — |
| `.userCountry` span | inherits | `600` | `#374151` | — |

### Colors

| Hex | Role | Tailwind |
|---|---|---|
| `#38B6FF` | resultsCount text | `text-brand-500` |
| `#f3f4f6` / `#e5e7eb` | clearButton bg / hover bg / resultsInfo border-top | `bg-[#f3f4f6]` / `bg-[#e5e7eb]` / `border-[#e5e7eb]` |
| `#6b7280` / `#374151` / `#64748b` | clearButton text / hover / resultsText | `text-[#6b7280]` / `text-[#374151]` / `text-[#64748b]` |
| `white` | container bg | `bg-white` |

### Animations / interactions

- `.clearButton`: `transition: all 0.2s ease`.
- No other transitions.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\PricingFilter.tsx`

The port drops the panel chrome entirely (no white card, no shadow, no rounded-12 border) and rebases the grid columns wrong.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 52 | `<div className="space-y-4">` root | MUI: `.container` is a white card, `rounded-[12px]`, `padding 2rem (1.5rem mobile)`, `margin-bottom 2rem (1.5rem mobile)`, `box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)`. Use `rounded-[12px] bg-white p-6 lg:p-8 mb-6 lg:mb-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] space-y-4`. | High |
| B2 | 53 | `grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4` | MUI uses `auto-fit minmax(200px, 1fr)` (responsive intrinsic) with `gap 1.5rem`. Mobile rule: `1fr` gap `1rem`. Tablet (769-1024): `repeat(2, 1fr)`. Desktop (≥1200): `repeat(4, 1fr)`. The breakpoint inversion rule says: `<Grid item lg={3}>` → `lg:grid-cols-4` (NOT `sm:`). Current `sm:grid-cols-2` splits at 600px instead of MUI's 769. Use `grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 items-end`. Also missing `items-end`. | High |
| B3 | 75 | `<div className="flex items-center">` clearButton wrapper | MUI `.filterActions { display:flex; justify-content: flex-end; align-items: center }` desktop, `justify-content: stretch` mobile. Use `flex items-center justify-end max-md:justify-stretch`. | Medium |
| B4 | 80 | `clearButton: rounded-md border border-ink-200 bg-white px-4 py-2 font-heading text-form-input text-ink-700 hover:bg-ink-50` (= 16px text, 8/16 padding) | MUI: `bg #f3f4f6`, color `#6b7280`, `border: none`, padding `0.75rem 1rem` (12/16), radius `8px`, text `0.875rem` (14px) weight 500. Mobile: `width: 100%`. Hover: `bg #e5e7eb`, color `#374151`. Use `rounded-md border-0 bg-[#f3f4f6] px-4 py-3 text-[14px] font-medium text-[#6b7280] transition-all duration-200 hover:bg-[#e5e7eb] hover:text-[#374151] max-md:w-full`. | Medium |
| B5 | 88 | `<p className="font-heading text-small text-ink-700">` results text | MUI `.resultsInfo` wraps it with `padding-top: 1rem; border-top: 1px solid #e5e7eb`. Currently the port doesn't divide results from filters with a border. Use `pt-4 border-t border-[#e5e7eb] font-heading text-[14px] text-[#64748b]`. | Medium |
| B6 | 89 | `<span className="font-semibold text-ink-900">{count}</span>` count badge | MUI `.resultsCount`: weight 600, color `#38B6FF`. Use `font-semibold text-brand-500`. | Medium |
| B7 | 93 | `<span className="font-semibold text-brand-500">{userCountry}</span>` country | MUI `.userCountry`: weight 600, color `#374151`. Currently using brand-500 (matches `.resultsCount`), but MUI assigns brand-500 ONLY to the count and `#374151` to country. Swap colors: count → `text-brand-500`, country → `text-[#374151]`. | Low |
| B8 | overall | Missing `align-items: end` on the grid | Add `items-end` to the grid container. Aligns dropdown labels/inputs with the clear-button bottom. | Low |
| B9 | 75 | Clear button wrapper rendered even when no active filters | MUI keeps the cell occupied but conditional renders the button. Tailwind matches this — verified. | OK |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="rounded-[12px] bg-white p-6 lg:p-8 mb-6 lg:mb-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] space-y-4">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 items-end">
    <DropDown name="grade" placeholder="All Grades" data={filterOptions.grades} value={filters.grade} onChange={handleFilterChange} />
    <DropDown name="subject" placeholder="All Subjects" data={filterOptions.subjects} value={filters.subject} onChange={handleFilterChange} />
    <DropDown name="curriculum" placeholder="All Curricula" data={filterOptions.curricula} value={filters.curriculum} onChange={handleFilterChange} />
    <div className="flex items-center justify-end max-md:justify-stretch">
      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-md border-0 bg-[#f3f4f6] px-4 py-3 text-[14px] font-medium text-[#6b7280] transition-all duration-200 hover:bg-[#e5e7eb] hover:text-[#374151] max-md:w-full"
        >
          Clear Filters
        </button>
      )}
    </div>
  </div>

  <p className="pt-4 border-t border-[#e5e7eb] font-heading text-[14px] text-[#64748b]">
    Showing <span className="font-semibold text-brand-500">{filteredPackages.length}</span>{" "}
    package{filteredPackages.length !== 1 ? "s" : ""}
    {userCountry && (
      <>
        {" "}available in <span className="font-semibold text-[#374151]">{userCountry}</span>
      </>
    )}
  </p>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 1 column. Clear button stretches to 100% width. Padding `1.5rem`, margin-bottom `1.5rem`. Border-top above results.
- **768px**: still mobile (MUI breakpoint at 769 — at exactly 768 we're below). 1 column. (At 769+ → 2 columns.)
- **1280px**: 4 columns. Padding `2rem`. Gap `1.5rem`. Clear button at end of row 1.
- **1920px**: same as 1280.

Note: at the 769-1199 band MUI gives 2 columns. The corrected `md:grid-cols-2 lg:grid-cols-4` produces 2 cols from `md:` (900) up to `lg:` (1200). That's a 769-899 dead zone where MUI shows 2 cols but Tailwind shows 1. If pixel-perfect across 769-899 matters, use `[@media(min-width:769px)]:grid-cols-2` instead of `md:grid-cols-2`.

---

## §5 RTL notes

No AR variant. The component reads cleanly under RTL:

- `items-end` is logical and works in both directions.
- `justify-end` flips automatically — clear button moves to visual left under RTL. To keep the clear button at the visual right under both directions, use `[justify-content:flex-end]` (physical) or duplicate as `ltr:justify-end rtl:justify-start`.
- "Showing X packages available in Y" — translation needs to handle Arabic plurals (dual / plural). Translation rule expected on the locale wrapper, not this component.
