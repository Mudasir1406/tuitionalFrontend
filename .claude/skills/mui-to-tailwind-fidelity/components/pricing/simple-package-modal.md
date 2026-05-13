# Component — `SimplePackageModal`

A 4-field configuration dialog ("Build Your Custom Package"): grade, subjects (multi), curriculum, sessions/week. Below the form sits a price estimate (Base rate / Sessions per month / Estimated Monthly). Submitting fires an `alert()`. Far simpler than `CustomPricingModal` — single column on mobile, 2 cols on desktop, no live pricing API.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\SimplePackageModal.tsx` + `SimplePackageModal.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\SimplePackageModal.tsx` |
| Arabic variant | None. |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Dialog maxWidth="sm" fullWidth className=.modal PaperProps={ className: .modalPaper }>
  <DialogTitle .modalHeader>
    <div .headerContent>
      <Typography variant="h6" .modalTitle>Build Your Custom Package</Typography>
      <IconButton .closeButton><CloseIcon /></IconButton>
    </div>
  </DialogTitle>

  <DialogContent .modalContent>
    <Typography .description>Select your preferences to create a personalized tutoring package.</Typography>

    <div .formGrid>
      <div .formField × 4>
        <Typography .fieldLabel>Grade Level *</Typography>
        <DropDown … />
      </div>
    </div>

    <div .priceEstimate>
      <div .priceRow><span .priceLabel>Base rate:</span><span .priceValue>USD 50/hour</span></div>
      <div .priceRow><span .priceLabel>Sessions/month:</span><span .priceValue>8 sessions</span></div>
      <div .totalRow><span .totalLabel>Estimated Monthly:</span><span .totalValue>USD 400</span></div>
    </div>
  </DialogContent>

  <DialogActions .modalActions>
    <Button .cancelButton onClick=handleClose>Cancel</Button>
    <Button variant="contained" .submitButton onClick=handleSubmit disabled=!canSubmit>Get Quote</Button>
  </DialogActions>
</Dialog>
```

### Dimensions & spacing

| Element | Property | Mobile (≤768) | Desktop (default) |
|---|---|---|---|
| `.modalPaper` | border-radius / shadow | `16px` / `0 8px 32px rgba(0,0,0,0.12)` | (same) |
| `.modalHeader` | padding | `1rem 1rem 0` (16/16/0) | `1.5rem 1.5rem 0` (24/24/0) |
| `.modalHeader` | border-bottom | `1px solid #f1f5f9` | (same) |
| `.modalTitle` | font-size | `1.125rem` (18px) | `1.25rem` (20px) |
| `.modalTitle` | weight / color | 600 / `#1e293b` | (same) |
| `.closeButton` | color / padding | `#64748b` / `0.5rem` | (same) |
| `.closeButton` hover | bg `#f1f5f9` color `#1e293b` | (same) |
| `.modalContent` | padding | `1rem` | `1.5rem` |
| `.description` | font-size / color | `0.875rem` / `#64748b`, text-center, margin-bottom 1.5rem | (same) |
| `.formGrid` | grid-template-columns | `1fr` | `1fr 1fr` |
| `.formGrid` | gap | `0.75rem` (12px) | `1rem` (16px) |
| `.formGrid` | margin-bottom | `1.5rem` | (same) |
| `.formField` | display / direction / gap | flex column gap `0.5rem` | (same) |
| `.fieldLabel` | font-size / weight / color | `0.875rem` / 600 / `#374151` | (same) |
| `.priceEstimate` | bg / border / radius / padding | `#f8fafc` / `1px solid #e2e8f0` / `12px` / `1rem` | (same) |
| `.priceRow` | display | flex space-between, margin-bottom `0.5rem` | (same) |
| `.priceRow:last-of-type` | margin-bottom | `0.75rem` | (same) |
| `.totalRow` | border-top / padding-top | `1px solid #e2e8f0` / `0.75rem` | (same) |
| `.priceLabel` / `.priceValue` | font-size | `0.875rem` (14px) | (same) |
| `.priceLabel` color | `#64748b`, normal | (same) |
| `.priceValue` color | `#1e293b`, weight 500 | (same) |
| `.totalLabel` | `1rem` (16px), weight 600, `#374151` | (same) |
| `.totalValue` | `1.125rem` (18px), weight 700, `#38B6FF` | (same) |
| `.modalActions` | padding | `0 1rem 1rem` (`0 16/16/0`) | `0 1.5rem 1.5rem` |
| `.modalActions` | gap | `0.75rem` | (same) |
| `.modalActions` | flex-direction (mobile) | `column-reverse` | `row` |
| `.cancelButton` / `.submitButton` | padding | `0.75rem 1.5rem` | (same) |
| `.cancelButton` | border / bg / color / radius | `1px solid #e5e7eb` / `transparent` / `#64748b` / `8px` | — |
| `.submitButton` | bg / color / weight | `#38B6FF` / white / 600 | — |
| `.submitButton` | shadow | `0 2px 8px rgba(56,182,255,0.3)` | — |
| Mobile button width | `100%` | n/a |

### Typography

- `.modalTitle`: 1.25rem desktop / 1.125rem mobile, weight 600, `#1e293b`.
- `.description`: 0.875rem, `#64748b`, centered.
- `.fieldLabel`: 0.875rem, weight 600, `#374151`.
- `.priceLabel` / `.priceValue`: 0.875rem.
- `.totalLabel`: 1rem, weight 600, `#374151`.
- `.totalValue`: 1.125rem, weight 700, `#38B6FF`.
- Cancel / submit buttons: weight 500/600.
- Modal-wide `font-family` set to League Spartan via `.modal *` global rule + `leagueSpartan.className` on every Typography.

### Colors

| Hex | Role | Tailwind |
|---|---|---|
| `#38B6FF` | totalValue text, submit bg | `text-brand-500` / `bg-brand-500` |
| `#2563eb` | submit hover bg | `bg-[#2563eb]` |
| `#1e293b` | modalTitle, priceValue | `text-[#1e293b]` |
| `#374151` | fieldLabel, totalLabel, cancel hover text | `text-[#374151]` |
| `#64748b` | description, priceLabel, close, cancel resting | `text-[#64748b]` |
| `#f1f5f9` | header border-bottom, close hover bg | `border-[#f1f5f9]` |
| `#e5e7eb` | cancel border resting | `border-[#e5e7eb]` |
| `#d1d5db` | cancel hover border | `border-[#d1d5db]` |
| `#f8fafc` / `#e2e8f0` | priceEstimate bg / border / totalRow border-top | `bg-[#f8fafc]` / `border-[#e2e8f0]` |
| `#f9fafb` | cancel hover bg | `bg-[#f9fafb]` |

### Animations / interactions

- `.submitButton`: `transition: all 0.3s ease`, hover `translateY(-1px)` + brighter shadow + `bg #2563eb`.
- `.submitButton:disabled`: `bg #e5e7eb, color #9ca3af, no shadow/transform, cursor not-allowed`.
- `.cancelButton`: `transition: all 0.2s ease`, hover bg/border/text swap.
- `.closeButton`: hover bg `#f1f5f9` + color shift.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\SimplePackageModal.tsx`

The port uses `<HouseDialog size="md">` — losing modal sizing/chrome — and substitutes the `Button` primitive for both cancel and submit. Form grid is single-column at all sizes despite MUI being 2-col desktop.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 72 | `<HouseDialog open={open} onClose={handleClose} title="Build Your Custom Package" size="md">` | MUI uses `maxWidth="sm"` (= 600px wide, not "md"). Should be `size="sm"` if HouseDialog supports it. Also MUI paper: `rounded-[16px]`, shadow `0 8px 32px rgba(0,0,0,0.12)`. Verify HouseDialog applies these. | Medium |
| B2 | 72 | Title rendered through HouseDialog's `title` prop | MUI title is wrapped in `.modalHeader` w/ `border-bottom: 1px solid #f1f5f9`. Verify HouseDialog's header chrome matches; if not, set `chrome="custom"` and render header manually. | Medium |
| B3 | 73 | `<p className="font-heading text-body text-ink-700">` description | MUI: `0.875rem (14px) #64748b text-center margin-bottom 1.5rem`. Use `text-[14px] text-[#64748b] text-center mb-6 font-heading`. Currently `text-body` (16px) is too large. | Medium |
| B4 | 77 | `mt-6 grid grid-cols-1 gap-4` form grid | MUI: `grid-cols-1` mobile, `grid-cols-2` desktop, gap `12px` mobile / `16px` desktop. Use `mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6`. Breakpoint: MUI mobile rule is `≤768`, so `sm:` (600) splits too early — to be exact use `md:grid-cols-2` (since MUI breaks at 768, Tailwind `md:` at 900 is too late, `sm:` at 600 too early). Pick `sm:grid-cols-2` for closer fit. | Medium |
| B5 | 77 | Missing `margin-bottom: 1.5rem` on form grid | Add `mb-6`. | Low |
| B6 | 79 | `<label className="mb-1 block font-heading text-form-label text-ink-700">Grade Level *</label>` | MUI `.fieldLabel`: `0.875rem (14px) font-weight: 600 color: #374151`. `text-form-label` is the right size token (14px), but `text-ink-700` ≠ `#374151`. Also `.formField` is `flex flex-col gap-0.5rem` — currently the port uses `mb-1` (4px) which equals 0.25rem instead of 0.5rem. Use `mb-2 block font-heading text-[14px] font-semibold text-[#374151]`. | Medium |
| B7 | 125 | `<div className="mt-6 rounded-md bg-brand-50 p-4">` priceEstimate | MUI: `bg #f8fafc, border 1px solid #e2e8f0, radius 12px, padding 1rem`. Use `mt-6 rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4`. The brand-50 is wrong (too blue). | High |
| B8 | 127 | `<div className="flex items-center justify-between">` priceRow | MUI `.priceRow { margin-bottom: 0.5rem }`. Add `mb-2`. | Low |
| B9 | 128 | `<span className="font-heading text-small text-ink-700">Base rate:</span>` priceLabel | MUI: `0.875rem (text-small ✓) #64748b normal`. Replace `text-ink-700` (`#475569`) with `text-[#64748b]`. | Low |
| B10 | 129 | `<span className="font-heading text-small font-semibold text-ink-900">USD 50/hour</span>` priceValue | MUI: `0.875rem #1e293b weight 500` (medium, not semibold). Use `text-small font-medium text-[#1e293b]`. | Low |
| B11 | 138 | `mt-3 flex items-center justify-between border-t border-ink-200 pt-3` totalRow | MUI `.totalRow` border-top `1px solid #e2e8f0`, padding-top `0.75rem`. Use `mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-3`. The token `border-ink-200` is `#E2E8F0` ✓ which matches. OK. | OK |
| B12 | 139 | `<span className="font-heading text-h6 text-ink-900">Estimated Monthly:</span>` totalLabel | `text-h6` = 1rem (16px) ✓. But weight needs `font-semibold` and color `#374151`. Use `text-h6 font-semibold text-[#374151]`. | Low |
| B13 | 140 | `<span className="font-heading text-h5 font-bold text-brand-500">{currency} {monthly}</span>` totalValue | MUI: `1.125rem (= text-h5 18px) weight 700 color #38B6FF`. ✓ `text-h5 font-bold text-brand-500` matches. | OK |
| B14 | 146 | `<div className="mt-6 flex justify-end gap-2">` modalActions | MUI: `padding 0 1.5rem 1.5rem, gap 0.75rem, flex-direction row (column-reverse mobile)`. Use `mt-6 flex justify-end gap-3 max-md:flex-col-reverse`. | Medium |
| B15 | 147 | `<Button onClick={handleClose} variant="ghost">Cancel</Button>` | MUI `.cancelButton`: `border 1px solid #e5e7eb, bg transparent, color #64748b, weight 500, padding 0.75rem 1.5rem, radius 8px, text-transform none`. Hover: `bg #f9fafb, border #d1d5db, color #374151`. Mobile: `width 100%`. `variant="ghost"` primitive probably doesn't apply this exact chrome — spell it out: `border border-[#e5e7eb] bg-transparent text-[#64748b] font-medium px-6 py-3 rounded-md transition-all duration-200 hover:bg-[#f9fafb] hover:border-[#d1d5db] hover:text-[#374151] max-md:w-full`. | Medium |
| B16 | 150 | `<Button onClick={handleSubmit} disabled={!canSubmit()} variant="primary">Get Quote</Button>` | MUI `.submitButton`: `bg #38B6FF (hover #2563eb), color white, weight 600, padding 0.75rem 1.5rem, radius 8px, text-transform none, shadow 0 2px 8px rgba(56,182,255,0.3) (hover deeper)`. Hover `translateY(-1px)`. Disabled: `bg #e5e7eb, color #9ca3af, no shadow/transform`. Mobile: `width 100%`. Spell out: `bg-brand-500 text-white font-semibold px-6 py-3 rounded-md shadow-[0_2px_8px_rgba(56,182,255,0.3)] transition-all duration-300 hover:bg-[#2563eb] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed max-md:w-full`. | Medium |
| B17 | overall | Modal-wide global `font-family: League Spartan` rule | MUI applies `.modal * { font-family: League Spartan }` (line 5 of CSS). The port relies on `font-heading` on each element. Both arrive at the same result if every text element has `font-heading`. Verify there are no plain non-classed text nodes that fall through to body font. | Low |

---

## §3 Corrected Tailwind classNames

```tsx
<HouseDialog open={open} onClose={handleClose} title="Build Your Custom Package" size="sm">
  <p className="font-heading text-[14px] text-[#64748b] text-center mb-6">
    Select your preferences to create a personalized tutoring package.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
    <div className="flex flex-col gap-2">
      <label className="block font-heading text-[14px] font-semibold text-[#374151]">Grade Level *</label>
      <DropDown name="grade" placeholder="Select grade" data={filterOptions.grades} value={config.grade} onChange={handleFieldChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label className="block font-heading text-[14px] font-semibold text-[#374151]">Subjects * (Select multiple)</label>
      <DropDown name="subjects" placeholder="Select subjects" data={filterOptions.subjects} value={config.subjects} onChange={handleFieldChange} multiple />
    </div>
    <div className="flex flex-col gap-2">
      <label className="block font-heading text-[14px] font-semibold text-[#374151]">Curriculum *</label>
      <DropDown name="curriculum" placeholder="Select curriculum" data={filterOptions.curricula} value={config.curriculum} onChange={handleFieldChange} />
    </div>
    <div className="flex flex-col gap-2">
      <label className="block font-heading text-[14px] font-semibold text-[#374151]">Sessions per week</label>
      <DropDown name="sessionsPerWeek" placeholder="Select sessions" data={sessionsOptions} value={config.sessionsPerWeek.toString()} onChange={handleFieldChange} />
    </div>
  </div>

  <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="font-heading text-[14px] text-[#64748b]">Base rate:</span>
      <span className="font-heading text-[14px] font-medium text-[#1e293b]">{currency} {baseRate}/hour</span>
    </div>
    <div className="flex items-center justify-between mb-3">
      <span className="font-heading text-[14px] text-[#64748b]">Sessions/month:</span>
      <span className="font-heading text-[14px] font-medium text-[#1e293b]">{config.sessionsPerWeek * 4} sessions</span>
    </div>
    <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-3">
      <span className="font-heading text-[16px] font-semibold text-[#374151]">Estimated Monthly:</span>
      <span className="font-heading text-[18px] font-bold text-brand-500">{currency} {calculateMonthlyPrice()}</span>
    </div>
  </div>

  <div className="mt-6 flex justify-end gap-3 max-md:flex-col-reverse">
    <button
      type="button"
      onClick={handleClose}
      className="font-heading border border-[#e5e7eb] bg-transparent text-[#64748b] font-medium px-6 py-3 rounded-md transition-all duration-200 hover:bg-[#f9fafb] hover:border-[#d1d5db] hover:text-[#374151] max-md:w-full"
    >
      Cancel
    </button>
    <button
      type="button"
      onClick={handleSubmit}
      disabled={!canSubmit()}
      className={cn(
        "font-heading bg-brand-500 text-white font-semibold px-6 py-3 rounded-md",
        "shadow-[0_2px_8px_rgba(56,182,255,0.3)] transition-all duration-300",
        "hover:bg-[#2563eb] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)]",
        "disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed",
        "max-md:w-full",
      )}
    >
      Get Quote
    </button>
  </div>
</HouseDialog>
```

---

## §4 Verification at 4 widths

- **375px**: dialog full-width with horizontal margin (HouseDialog default). Title 18px, description 14px center. Form 1 col, gap 12px. Buttons stack `flex-col-reverse` (Get Quote above Cancel), each `w-full`.
- **768px**: still mobile (≤768 rule). 1 col form. Buttons stacked. Modal title 18px.
- **1280px**: 2-col form, gap 16px. Buttons row layout, each `w-auto`. Title 20px. Modal header padding `24/24/0`.
- **1920px**: same as 1280; verify dialog caps at `maxWidth="sm"` (600px) and doesn't grow further.

---

## §5 RTL notes

No AR variant exists. If added:

- Wrap `HouseDialog` content in `dir="rtl"`.
- The `flex justify-end` button row flips automatically — submit ends up on the visual left under RTL. To keep submit visually on the right (Arabic convention puts the primary action on the right), use `flex flex-row-reverse` instead.
- Form labels' `*` (asterisk) appears after the label in LTR; in RTL it visually leads — fine, "required-marker first" is a convention.
- `font-heading` is wrong for Arabic (League Spartan is Latin-only). Drop it on Arabic strings and let the global `html[dir="rtl"] *` rule promote `Noto Sans Arabic`.
