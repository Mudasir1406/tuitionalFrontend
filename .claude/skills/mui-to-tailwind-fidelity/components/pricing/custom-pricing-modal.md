# Component — `CustomPricingModal`

The Custom Package Builder dialog. A 90vh-tall modal opened from `PricingSection` when the user toggles to the "Custom Package Builder" tab. It contains a gradient header strip, a scrollable list of "package rows" (each a card with a row-number circle and a 6-col grid of dropdowns + hours input + live price block), an "Add Another Subject" button, a fixed-bottom summary, and a "Proceed to Book" CTA.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\CustomPricingModal.tsx` + `CustomPricingModal.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\CustomPricingModal.tsx` |
| Arabic variant | MUI: `ArCustomPricingModal.tsx` (uses same `.module.css`, Arabic copy + RTL); Tailwind: `ArCustomPricingModal.tsx` (separate file, same primitive `<HouseDialog>` wrapper). |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Dialog className=.modal maxWidth="lg" fullWidth>
  PaperProps={ className: .modalPaper }   // border-radius 20, max-h 90vh, height 90vh, margin 20, flex-col

  ├─ .modalHeader (gradient bar across top, rounded-top 20)
  │  ├─ .modalTitle "Custom Package Builder" (variant="h5")
  │  └─ <IconButton .closeButton><Close/></IconButton>

  ├─ .modalContent (flex-1, flex-col, overflow-hidden, bg #f8fafc)
  │  ├─ .scrollableContent (flex-1 overflow-y auto, thin scrollbar)
  │  │  ├─ .rowsContainer (padding 20px 32px 12px)
  │  │  │   └─ .packageRow × N
  │  │  │      ├─ .rowNumber (24px gradient circle)
  │  │  │      ├─ .rowContent (grid-template-columns 0.8 0.8 1 1 0.8 1.6fr, gap 6px)
  │  │  │      │  ├─ FormControl .dropdown × 4 (Grade, Level, Subject, Curriculum)
  │  │  │      │  ├─ .hoursInput → TextField .hoursField
  │  │  │      │  └─ .priceDetails (or .loadingPrice or .errorPrice)
  │  │  │      └─ .rowActions  →  .deleteButton (IconButton)
  │  │  └─ .addRowSection (padding 12px 32px 16px, centered)
  │  │       └─ .addRowButton (dashed brand border, gradient bg, "Add Another Subject")
  │  └─ .fixedBottomSection (flex-shrink-0, white, border-top 2px #e2e8f0)
  │     ├─ .divider
  │     ├─ .totalSummary (padding 20 32, white)
  │     │  └─ .summaryContent (between, gradient bg, rounded-16)
  │     │     ├─ .summaryLabel "Total Cost"
  │     │     └─ .summaryPricing
  │     │        ├─ .totalPrice (gradient text)
  │     │        └─ .totalSavings (green)
  │     └─ .modalFooter (padding 16 32 24)
  │        └─ .proceedButton (gradient, "Proceed to Book")
```

### Dimensions & spacing

| Element | Property | Mobile (≤600) | Tablet (≤900) | Tablet-wide (≤1200) | Desktop |
|---|---|---|---|---|---|
| `.modalPaper` | margin | `4px` | `8px` | (default) | `20px` |
| `.modalPaper` | height / max-height | `96vh` / `96vh` | `96vh` | (default) | `90vh` / `90vh` |
| `.modalPaper` | border-radius | `16px` | (default) | — | `20px` |
| `.modalPaper` | box-shadow | `0 25px 50px rgba(0,0,0,0.15)` | — | — | — |
| `.modalHeader` | padding | `12px 16px` | `12px 16px` | (default) | `24px 32px` |
| `.modalHeader` | background | gradient `#38B6FF → #2563eb → #7c3aed`, color white | — | — | — |
| `.modalHeader` | border-radius | `16px 16px 0 0` | — | — | `20px 20px 0 0` |
| `.modalContent` | background | `#f8fafc` | — | — | — |
| `.rowsContainer` | padding | `12px 16px 8px` | `12px 16px 8px` | (default) | `20px 32px 12px` |
| `.packageRow` | padding | `8px 6px` | `8px 6px` | — | `8px 12px` |
| `.packageRow` | margin-bottom | `6px` (`4px` at ≤900) | — | — | `6px` |
| `.packageRow` | border-radius | `6px` | (default) | — | `8px` |
| `.packageRow` | border | `1px solid #e2e8f0` | — | — | — |
| `.packageRow` | min-height | — | — | — | `48px` |
| `.packageRow` | display | flex column (`gap: 6px`) | flex column | — | flex row (`gap: 8px`) |
| `.rowNumber` | size | `18px` (≤900) | — | — | `24px` |
| `.rowContent` | grid-template-columns | `1fr` (col) at ≤600; `0.8fr 1.2fr` at ≤900; `repeat(5,1fr)` at ≤1200 | — | — | `0.8fr 0.8fr 1fr 1fr 0.8fr 1.6fr` |
| `.rowContent` | gap | `10px` (≤600) / `8px` (≤900) / `4px` (≤1200) | — | — | `6px` |
| `.dropdown` | min-width | — | — | — | `80px` (`70px` at ≤1200) |
| `.dropdown` MuiOutlinedInput-root | min-height | `36px` (≤600) | `32px` (≤900) | — | `32px` |
| `.dropdown` MuiOutlinedInput-root | border-radius | `6px` | — | — | `6px` |
| `.hoursField` | min-height | (same as `.dropdown`) | — | — | `32px` |
| `.priceDetails` | padding | `6px 8px` (≤900) | — | — | `6px 12px` |
| `.priceDetails` | background | `rgba(255,255,255,0.95)` w/ `backdrop-filter blur(8px)` | — | — | — |
| `.priceDetails` | border / radius | `1px solid rgba(56,182,255,0.2)` / `8px` | — | — | — |
| `.priceDetails` | box-shadow | `0 2px 8px rgba(0,0,0,0.05)` | — | — | — |
| `.priceDetails` | min-width | — | — | — | `120px` |
| `.addRowSection` | padding | `12px 16px 16px` | (same) | — | `12px 32px 16px` |
| `.addRowSection` | background | `#f8fafc` | — | — | — |
| `.addRowButton` | padding | `12px 24px` (≤600) | — | — | `8px 20px` |
| `.addRowButton` | border | `1px dashed #38B6FF` | — | — | — |
| `.addRowButton` | border-radius | `8px` | — | — | `8px` |
| `.totalSummary` | padding | `16px 16px` (≤600) | `12px 16px` (≤900) | — | `20px 32px` |
| `.summaryContent` | padding | `16px 20px` (≤600) | — | — | `20px 24px` |
| `.summaryContent` | border-radius | `12px` (≤600) | — | — | `16px` |
| `.summaryContent` | border | `2px solid rgba(56,182,255,0.1)` | — | — | — |
| `.summaryContent` | background | gradient `rgba(56,182,255,0.05) → rgba(124,58,237,0.05)` | — | — | — |
| `.modalFooter` | padding | `12px 16px 20px` (≤600) | `12px 16px 16px` (≤900) | — | `16px 32px 24px` |
| `.proceedButton` | padding | `14px 24px` (≤600) / `12px 20px` (≤900) | — | — | `16px 32px` |
| `.proceedButton` | border-radius | `12px` (≤600) | — | — | `16px` |

### Typography

| Element | Mobile (≤600) | Tablet (≤900) | Desktop | Weight / color |
|---|---|---|---|---|
| `.modalTitle` | `16px` | `16px` | `24px` | 700, white |
| `.rowNumberText` | `9px` (≤900) | — | `11px` | 700, white |
| `.dropdown` MuiOutlinedInput-root | `12px` (`11px` at ≤1200) | `12px` | `12px` | — |
| `.dropdown` MuiInputLabel-root | `12px` | (same) | `12px` | 500 |
| `.hoursField` | `12px` | — | `12px` | — |
| `.currentPrice` | `15px` (≤600) | `16px` (≤900) | `16px` | 700, gradient text, line-height 1.2 |
| `.originalPrice` | `12px` (≤600) | `13px` (≤900) | `12px` | 500, `#ef4444`, line-through |
| `.savingsText` | `10px` | `11px` (≤900) | `10px` | 600, `#10b981` |
| `.discountInfo` | (same) | (same) | `8px` | 500, `#6b7280` (also a second `.discountInfo` at 10px in same file — last-defined wins) |
| `.loadingText` | (same) | — | `11px` | 500, `#6b7280`, italic |
| `.errorText` | (same) | — | `10px` | 500, `#dc2626` |
| `.summaryLabel` | `16px` (≤600) | — | `20px` | 600, `#1e293b` |
| `.totalPrice` | `22px` (≤600) | `24px` (≤900) | `32px` | 800, gradient text, line-height 1 |
| `.totalSavings` | — | — | `14px` | 600, `#10b981` |
| `.addRowButton` | `15px` (≤600) | — | `14px` | 600, `#38B6FF`, text-transform none |
| `.proceedButton` | `16px` (≤600) | `14px` (≤900) | `18px` | 700, white, letter-spacing 0.025em |

Modal title uses `leagueSpartan.className`. Most numeric text is intentionally NOT wrapped in `leagueSpartan` (Typography lines 350-376) — only label text is.

### Colors

| Hex | Role | Tailwind |
|---|---|---|
| `#38B6FF → #2563eb → #7c3aed` | header / current price / total price / proceed / row number / add-row gradients | `bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed]` |
| `#f8fafc` | modalContent bg, addRowSection bg, fallback paper | `bg-[#f8fafc]` |
| `#e2e8f0` | row border, divider, fixedBottom border-top | `border-[#e2e8f0]` |
| `#ef4444` / `#dc2626` | original-price strike / error text / delete button | `text-[#ef4444]` / `bg-[rgba(239,68,68,0.1)]` |
| `#10b981` / `#059669` | savings text, totalSavings, discounted gradient | `text-[#10b981]` |
| `#1e293b` | summaryLabel, totalCostText | `text-[#1e293b]` |
| `#6b7280` | discountInfo, loadingText, scrollbar | `text-[#6b7280]` |

### Animations / interactions

- `.packageRow`: `animation: slideInUp 0.3s ease-out` (translateY 20→0, opacity 0→1).
- `.packageRow`: `transition: all 0.2s ease`, hover translates `-1px`, border `#38B6FF`, blue shadow.
- `.modalHeader .closeButton:hover`: `scale(1.1)`, bg `rgba(255,255,255,0.1)`.
- `.deleteButton:hover`: `scale(1.1)`, bg `rgba(239,68,68,0.2)`.
- `.proceedButton:hover`: `translateY(-2px)` + violet shadow + shimmer pseudo.
- `prefers-reduced-motion` disables animations + transforms + shimmer.
- Backdrop has `backdrop-filter: blur(4px)`.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\CustomPricingModal.tsx`

The Tailwind port uses the project's primitive `<HouseDialog>` wrapper, which masks ALL of the bespoke MUI chrome. Result: the modal looks like a generic dialog, not the gradient-branded Custom Package Builder.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 272 | `<HouseDialog open={...} title="Custom Package Builder" size="xl">` | MUI: custom 90vh-tall modal with gradient header strip across top, white paper (`bg-#f8fafc` inside), border-radius 20 (16 mobile), heavy shadow `0 25px 50px rgba(0,0,0,0.15)`. Plus backdrop blur(4px). House dialog won't produce this — either extend `HouseDialog` or replace with a custom Radix Dialog. | Critical |
| B2 | 181 | `<div className="flex flex-col gap-3 rounded-md border border-ink-200 bg-white p-4">` row | MUI `.packageRow`: `border 1px solid #e2e8f0`, radius `8px` (`6px` mobile), padding `8px 12px` desktop (`8px 6px` mobile), min-height 48px, white bg, `flex flex-row gap-2 items-center` at ≥900px (column below). Has slideInUp animation. Replace with `flex flex-col max-md:flex-col md:flex-row md:items-center gap-2 rounded-md md:rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 max-md:px-1.5 max-md:py-2 md:min-h-[48px] animate-[slideInUp_0.3s_ease-out]`. | High |
| B3 | 183 | `<span className="rounded-full bg-brand-500 px-3 py-1 font-heading text-small font-bold text-white">{index+1}</span>` | MUI `.rowNumber` is a perfect **24×24 circle** (18×18 at ≤900), gradient bg `#38B6FF → #2563eb`, white text `11px` (`9px` ≤900) weight 700, shadow `0 2px 4px rgba(56,182,255,0.2)`. Use `inline-flex h-6 w-6 max-md:h-[18px] max-md:w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#2563eb] text-[11px] max-md:text-[9px] font-bold text-white shadow-[0_2px_4px_rgba(56,182,255,0.2)]`. | High |
| B4 | 190 | Delete: `rounded-full p-2 text-ink-700 hover:bg-ink-100 hover:text-danger` Trash size 18 | MUI: red color `#ef4444`, semi-red bg `rgba(239,68,68,0.1)`, hover `scale(1.1)` + darker red bg. Replace with `rounded-full p-2 bg-[rgba(239,68,68,0.1)] text-[#ef4444] transition-all duration-200 hover:bg-[rgba(239,68,68,0.2)] hover:scale-110`. | Medium |
| B5 | 198 | Row content grid: `grid grid-cols-2 gap-3 lg:grid-cols-5` | MUI desktop grid: `0.8fr 0.8fr 1fr 1fr 0.8fr 1.6fr` (6 columns) with gap 6px. Tablet `repeat(5,1fr)` gap 4. Mobile ≤900: 2 cols `0.8fr 1.2fr`. Mobile ≤600: `flex-col`. Use `grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.8fr_0.8fr_1fr_1fr_0.8fr_1.6fr] gap-[10px] sm:gap-2 lg:gap-1.5` and put the price block as a wider column on lg. | High |
| B6 | 199-225 | Selects + Input bundled together in the same grid → price block lives in a separate flex row | MUI grid puts dropdowns + hours + price details all on the SAME row (6 columns). Restructure so price details is the 6th cell of the grid at lg+, not a separate row. | High |
| B7 | 234 | Hours input: `h-11 ... shadow-card focus-visible:ring-2` | MUI hoursField is the standard MUI Outlined input: `min-height: 32px`, radius `6px`, font-size `12px`, no `shadow-card` — hover/focus add brand shadow. Use `h-8 rounded-md border border-[#e2e8f0] bg-white px-2 text-[12px] hover:shadow-[0_4px_12px_rgba(56,182,255,0.1)] hover:border-brand-500 focus-visible:border-brand-500 focus-visible:shadow-[0_4px_12px_rgba(56,182,255,0.25)] focus-visible:outline-none`. | Medium |
| B8 | 238 | Price block: `flex flex-wrap items-center gap-3` plain row | MUI `.priceDetails`: white-translucent panel with `backdrop-filter: blur(8px)`, `1px solid rgba(56,182,255,0.2)` border, `8px` radius, `6px 12px` padding (`6px 8px` ≤900), centered, `min-width: 120px`. Wrap inner content in: `text-center bg-white/95 backdrop-blur-md rounded-lg border border-[rgba(56,182,255,0.2)] p-1.5 sm:px-3 sm:py-1.5 min-w-[120px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]`. | High |
| B9 | 245 | `text-h5 font-bold text-brand-500` on currentPrice | MUI `.currentPrice` is `16px` weight 700 with **gradient text** (`#38B6FF → #2563eb → #7c3aed`), line-height 1.2, margin-bottom 2px. Use `text-[16px] font-bold leading-[1.2] mb-0.5 bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent`. | High |
| B10 | 251 | `text-small text-ink-500 line-through` originalPrice | MUI `.originalPrice`: `12px` (`13px` ≤900), color `#ef4444`, weight 500, line-through, line-height 1.1, margin-bottom 1px. Use `text-[12px] sm:max-lg:text-[13px] font-medium text-[#ef4444] line-through leading-[1.1] mb-px`. | Medium |
| B11 | 255 | `text-small font-semibold text-success` savingsText | MUI `.savingsText`: `10px` (`11px` ≤900), color `#10b981`, weight 600, line-height 1.1. Use `text-[10px] sm:max-lg:text-[11px] font-semibold text-[#10b981] leading-[1.1]`. | Medium |
| B12 | 261 | `text-small text-ink-700` discount info | MUI `.discountInfo` (second definition in module): `10px font-medium text-[#6b7280] leading-[1.1] mt-0.5`. The CSS file declares the rule twice (lines 310, 439) — the later wins, so `10px`. Use `text-[10px] font-medium text-[#6b7280] leading-[1.1] mt-0.5`. | Low |
| B13 | 280 | `<div className="flex justify-start"><Button variant="outline" …>Add Another Subject</Button></div>` | MUI `.addRowSection` is `center-justified` (`display: flex; justify-content: center`) with `padding: 12px 32px 16px` (`12px 16px 16px` mobile) and `bg-[#f8fafc]`. The button is `1px dashed #38B6FF`, light gradient bg, `text-[14px] font-semibold text-brand-500 px-5 py-2 rounded-md` with hover that gives a stronger gradient + brand-500 shadow. Use `justify-center` and a custom dashed button. | Medium |
| B14 | 287 | `<hr className="border-ink-200" />` | MUI `.divider` from MUI material-ui `<Divider>` (`background: #e2e8f0`). Use `<hr className="border-0 border-t border-[#e2e8f0]" />`. | Low |
| B15 | 289 | `rounded-md bg-brand-50 p-4` summary container | MUI `.summaryContent`: `padding 20px 24px` desktop (`16px 20px` mobile), `border-radius 16px` (`12px` mobile), `border 2px solid rgba(56,182,255,0.1)`, gradient bg `rgba(56,182,255,0.05) → rgba(124,58,237,0.05)`, sits inside `.totalSummary` wrapper with white bg + `padding 20px 32px`. Wrap with `bg-white p-5 lg:px-8 lg:py-5` then inner: `flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5 rounded-[12px] lg:rounded-2xl border-2 border-[rgba(56,182,255,0.1)] bg-gradient-to-br from-[rgba(56,182,255,0.05)] to-[rgba(124,58,237,0.05)]`. At ≤900 the inner flex switches to column with center alignment. | High |
| B16 | 291 | `text-h5 text-ink-900` "Total Cost" (= 18px) | MUI `.summaryLabel`: `20px` desktop (`16px` ≤600), weight 600, color `#1e293b`. Use `text-[16px] lg:text-[20px] font-semibold text-[#1e293b]`. | Medium |
| B17 | 293 | `text-h3 font-bold text-brand-500` total price (= 24px) | MUI `.totalPrice`: `32px` desktop (`22px` ≤600, `24px` ≤900, line-height 1), weight 800, gradient text. Use `text-[22px] sm:text-[24px] lg:text-[32px] font-extrabold leading-none bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent`. | High |
| B18 | 298 | `text-small font-semibold text-success` total savings | MUI `.totalSavings`: `14px font-semibold text-[#10b981] mt-1`. Currently 14px (`text-small` = 14px) — match. Just swap `text-success` → `text-[#10b981]`. | Low |
| B19 | 307 | `<Button variant="primary" size="lg" className="w-full font-heading">Proceed to Book</Button>` | MUI `.proceedButton`: gradient bg `#38B6FF → #2563eb → #7c3aed`, `padding 16px 32px` (`14px 24px` ≤600, `12px 20px` ≤900), `border-radius 16px` (`12px` ≤600), `font-size 18px` (`16px` ≤600, `14px` ≤900), weight 700, letter-spacing 0.025em, shadow `0 8px 25px rgba(56,182,255,0.4)`, shimmer pseudo on hover, hover `translateY(-2px)`. Cannot use the `Button` primitive (solid brand-500). Build custom. | High |
| B20 | overall | No backdrop blur, no 90vh height constraint | If keeping `HouseDialog`, ensure its DialogContent allows `max-h-[90vh] max-md:max-h-[96vh]` and `bg-[#f8fafc]`. Backdrop blur(4px) must be added to the `HouseDialog` overlay. | High |
| B21 | overall | Missing `.modalHeader` gradient strip | The header is currently HouseDialog's plain title bar. Add a full-width gradient strip behind the title row matching `bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] text-white px-4 py-3 lg:px-8 lg:py-6 rounded-t-[16px] lg:rounded-t-[20px]`. | High |

---

## §3 Corrected Tailwind classNames

The MUI version is a hand-rolled dialog, NOT MUI's `<Dialog>` primitive being decorated — well, it is, but with the entire chrome overridden. The Tailwind port should either:

**Option A** (recommended): bypass `HouseDialog` and use a Radix/Headless modal primitive directly, applying all MUI styles.

**Option B**: extend `HouseDialog` with `chrome="custom"` and pass through className overrides for header, content background, content padding.

Header strip:

```tsx
<div className="bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] text-white px-4 py-3 lg:px-8 lg:py-6 flex items-center justify-between rounded-t-[16px] lg:rounded-t-[20px]">
  <h2 className="font-heading text-[16px] lg:text-[24px] font-bold m-0">Custom Package Builder</h2>
  <button onClick={handleClose} className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 hover:scale-110" aria-label="Close">
    <X size={20} className="text-white" />
  </button>
</div>
```

Package row (desktop horizontal, mobile stacked):

```tsx
<div
  key={row.id}
  className={cn(
    "relative animate-[slideInUp_0.3s_ease-out] transition-all duration-200",
    "flex flex-col md:flex-row md:items-center gap-1.5 md:gap-2",
    "px-1.5 py-2 md:px-3",
    "rounded-md md:rounded-lg",
    "border border-[#e2e8f0]",
    "bg-gradient-to-br from-white to-[#fafbfc]",
    "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
    "hover:border-brand-500 hover:-translate-y-px",
    "hover:shadow-[0_6px_20px_rgba(56,182,255,0.12),0_2px_6px_rgba(56,182,255,0.08)]",
    "md:min-h-[48px]",
  )}
>
  {/* number circle */}
  <span className="inline-flex h-[18px] w-[18px] lg:h-6 lg:w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-[#2563eb] text-[9px] lg:text-[11px] font-bold text-white shadow-[0_2px_4px_rgba(56,182,255,0.2)]">
    {index + 1}
  </span>

  {/* dropdowns + hours + price */}
  <div className="flex-1 grid grid-cols-1 sm:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.8fr_0.8fr_1fr_1fr_0.8fr_1.6fr] gap-[10px] sm:gap-1 lg:gap-1.5 items-center">
    {/* … 4 selects, 1 input, 1 priceDetails block … */}
  </div>

  {/* delete */}
  {rows.length > 1 && (
    <button
      type="button"
      onClick={() => removeRow(row.id)}
      aria-label="Remove row"
      className="ms-auto rounded-full p-2 bg-[rgba(239,68,68,0.1)] text-[#ef4444] transition-all duration-200 hover:bg-[rgba(239,68,68,0.2)] hover:scale-110"
    >
      <Trash2 size={18} />
    </button>
  )}
</div>
```

Price details block:

```tsx
<div className="text-center bg-white/95 backdrop-blur-md rounded-lg border border-[rgba(56,182,255,0.2)] py-1.5 px-2 lg:px-3 lg:min-w-[120px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
  {row.isCalculating ? (
    <p className="text-[11px] font-medium italic text-[#6b7280]">Calculating...</p>
  ) : row.calculationError ? (
    <p className="text-[10px] font-medium text-[#dc2626] leading-[1.2]">{row.calculationError}</p>
  ) : (
    <>
      <p className="text-[16px] font-bold leading-[1.2] mb-0.5 bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
        {getCurrencySymbol(getCurrency(row.country))}{row.totalCost.toFixed(0)}
      </p>
      {row.savings > 0 && (
        <>
          <p className="text-[12px] font-medium text-[#ef4444] line-through leading-[1.1] mb-px">
            {getCurrencySymbol(getCurrency(row.country))}{row.originalCost.toFixed(0)}
          </p>
          <p className="text-[10px] font-semibold text-[#10b981] leading-[1.1]">
            Save {row.discountPercentage}%
          </p>
        </>
      )}
      {row.discountPercentage > 0 && (
        <p className="text-[10px] font-medium text-[#6b7280] leading-[1.1] mt-0.5">
          {row.finalRate.toFixed(0)} {getCurrency(row.country)}/hour
        </p>
      )}
    </>
  )}
</div>
```

Add-row button:

```tsx
<div className="flex justify-center bg-[#f8fafc] px-4 py-3 lg:px-8 lg:py-4">
  <button
    type="button"
    onClick={addNewRow}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-md",
      "px-5 py-2 max-md:px-6 max-md:py-3",
      "text-[14px] max-md:text-[15px] font-semibold text-brand-500",
      "border border-dashed border-brand-500",
      "bg-gradient-to-br from-[rgba(56,182,255,0.08)] to-[rgba(124,58,237,0.08)]",
      "transition-all duration-200",
      "hover:bg-gradient-to-br hover:from-[rgba(56,182,255,0.2)] hover:to-[rgba(124,58,237,0.2)]",
      "hover:border-[#2563eb] hover:-translate-y-0.5",
      "hover:shadow-[0_8px_25px_rgba(56,182,255,0.2)]",
    )}
  >
    <Plus size={18} />
    Add Another Subject
  </button>
</div>
```

Total summary + proceed button:

```tsx
<div className="bg-white px-4 py-3 lg:px-8 lg:py-5">
  <div className={cn(
    "flex items-center justify-between max-md:flex-col max-md:gap-2 max-md:text-center",
    "rounded-[12px] lg:rounded-2xl border-2 border-[rgba(56,182,255,0.1)]",
    "px-5 py-4 lg:px-6 lg:py-5",
    "bg-gradient-to-br from-[rgba(56,182,255,0.05)] to-[rgba(124,58,237,0.05)]",
  )}>
    <p className="font-heading text-[16px] lg:text-[20px] font-semibold text-[#1e293b]">Total Cost</p>
    <div className="text-end max-md:text-center">
      <p className="font-heading text-[22px] sm:text-[24px] lg:text-[32px] font-extrabold leading-none bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed] bg-clip-text text-transparent">
        {getCurrencySymbol(getCurrency(userCountry))}{getTotalCost().toFixed(0)}
      </p>
      {getTotalSavings() > 0 && (
        <p className="font-heading mt-1 text-[14px] font-semibold text-[#10b981]">
          You save {getCurrencySymbol(getCurrency(userCountry))}{getTotalSavings().toFixed(0)}
        </p>
      )}
    </div>
  </div>
</div>

<div className="bg-white px-4 py-3 pb-5 lg:px-8 lg:py-4 lg:pb-6">
  <button
    type="button"
    onClick={handleProceed}
    className={cn(
      "relative w-full overflow-hidden",
      "rounded-[12px] lg:rounded-2xl",
      "px-6 py-3 sm:py-3.5 lg:px-8 lg:py-4",
      "text-[14px] sm:text-[16px] lg:text-[18px] font-bold tracking-[0.025em] text-white",
      "bg-gradient-to-r from-brand-500 via-[#2563eb] to-[#7c3aed]",
      "shadow-[0_8px_25px_rgba(56,182,255,0.4)]",
      "transition-all duration-300",
      "hover:-translate-y-0.5",
      "hover:shadow-[0_15px_35px_rgba(124,58,237,0.5)]",
    )}
  >
    Proceed to Book
  </button>
</div>
```

The `slideInUp` keyframe needs to be added to `globals.css` (or `tailwind.config.ts` `keyframes`):

```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## §4 Verification at 4 widths

- **375px**: rows stack vertically (`flex-col`). Dropdowns each full-width, hours field 100%, price block panel underneath. Header padding `12/16`, modal margin `4px`, paper height `96vh`, radius `16px`. Total summary stacks (label above pricing, both centered). Proceed button text 14px, padding `12px 20px`, radius `12px`.
- **768px**: rows split into 2 columns inside row: `0.8fr 1.2fr` — dropdowns vs hours+price wrapped. Modal margin `8px`, paper height `96vh`. Modal title still 16px.
- **1280px**: rows go to full 6-column horizontal grid (`0.8 0.8 1 1 0.8 1.6fr`). Modal margin `20px`, paper height `90vh`, radius `20px`. Title `24px`. Total price `32px`, summary `padding 20px 32px`.
- **1920px**: same as 1280; no further breakpoint overrides.

---

## §5 RTL notes

`ArCustomPricingModal.tsx` exists in both repos and shares the same structure as the English version with two extra wrinkles:

- Add `dir="rtl"` on the modal paper root.
- AR variant uses additional pricing details — `.pricingDisplay`, `.originalRate::before { content: "قبل: " }`, `.discountedRate::before { content: "بعد الخصم: " }` — see lines 352-427 of `CustomPricingModal.module.css`. These `::before` pseudo-elements inject Arabic labels before the rate spans. In the Tailwind port, surface the same labels as plain `<span>` children inside `pricingDisplay` so they render in both LTR and RTL:

```tsx
<p className="text-[14px] font-bold ..."><span className="text-[9px] font-medium text-[#6b7280]">قبل: </span>{originalRate}</p>
<p className="text-[14px] font-bold ..."><span className="text-[9px] font-semibold text-[#10b981]">بعد الخصم: </span>{discountedRate}</p>
```

- The number circle (`.rowNumber`) stays a circle in RTL — does not need flipping.
- The 6-column grid layout (`0.8fr 0.8fr 1fr 1fr 0.8fr 1.6fr`) reads visually right-to-left under RTL automatically — order is `1 → 2 → 3 → 4 → 5 → 6` becoming visually right-to-left. If the AR modal needs a specific reading order, reorder cells in JSX rather than reversing the grid.
- Delete button is at `.rowActions { margin-left: auto }` — under RTL this becomes `margin-right: auto`, putting the delete on the visual left. To keep the delete in the **same physical corner** under both directions, use `ms-auto` (logical, flips). To **mirror** it (delete moves to visual left under RTL), keep `ml-auto`. MUI uses physical `margin-left: auto` (line 472), so behavior in MUI's RTL is "delete moves to visual left". Match this with `ml-auto` (NOT `ms-auto`).
