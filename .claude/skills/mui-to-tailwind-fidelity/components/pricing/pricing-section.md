# Component — `PricingSection`

The `/pricing` middle section: an H2 "Our packages" title, a session-type toggle (Online Sessions / Custom Package Builder), and a 3-column grid of `PackageCard`s or — on the custom tab — a dashed-box placeholder. Imports a lazy `CustomPricingModal` for the "Custom Package Builder" tab.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\PricingSection.tsx` + `PricingSection.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\pricing\PricingSection.tsx` |
| Arabic variant | MUI: `ArPricingSection.tsx` (same shape, Arabic strings); Tailwind: `ArPricingSection.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<section .container>
  <Container maxWidth="lg">
    <div .header>
      <Typography variant="h2" .title>Our packages</Typography>
      <div .toggleContainer>
        <div .toggleWrapper>
          <Button .toggleButton[.toggleActive?] onClick=… >Online Sessions (Save up to 30%)</Button>
          <Button .toggleButton[.toggleActive?] onClick=… >Custom Package Builder</Button>
        </div>
      </div>
    </div>

    {sessionType === 'online' ? (
      <div .packagesGrid>
        {pricingData.packages.slice(0,3).map((pkg, idx) => (
          <div .packageCardWrapper key=pkg.id>
            <PackageCard package={pkg} userCountry={…} isPopular={idx===1} sessionType={sessionType} />
          </div>
        ))}
      </div>
    ) : (
      <div .customPlaceholder>
        <div .customMessage>
          <Typography variant="h4" .customTitle>🎯 Custom Package Builder</Typography>
          <Typography .customDescription>Configure your perfect tutoring package…</Typography>
          {!isModalOpen && (
            <Button .reopenButton onClick=… >Open Package Builder</Button>
          )}
        </div>
      </div>
    )}

    <CustomPricingModal open={isModalOpen} onClose={…} … />
  </Container>
</section>
```

### Dimensions & spacing

| Element | Property | XS (≤480) | Mobile (≤968) | Sm-tablet (769-968) | Tablet (969-1200) | Desktop (default) | Large (≥1201) |
|---|---|---|---|---|---|---|---|
| `.container` | padding | `32px 0` | `40px 0` | (same) | (same) | `80px 0` | `100px 0` |
| `.header` | margin-bottom | `28px` | `32px` | — | — | `64px` | `80px` |
| `.packagesGrid` | grid-template-columns | `1fr` | `1fr` | `1fr` (`max-w-500px`) | `repeat(3,1fr)` | `repeat(3,1fr)` | (same) |
| `.packagesGrid` | gap | `16px` | `20px` | `28px` | `24px` | `32px` | `40px` |
| `.packagesGrid` | max-width / padding | `0 12px` | `0 16px` | `0 20px` (max-500) | `0 20px` | `0 auto, max 1200` | (same) |
| `.toggleWrapper` | padding | `3px` | `4px` | `5px` (max-450) | (default 6) | `6px` | — |
| `.toggleWrapper` | max-width (mobile) | `320px` | `350px` | `450px` | — | (n/a) | — |
| `.toggleWrapper` | flex-direction | `column` | `column` | row | row | row | row |
| `.toggleWrapper` | background / radius / shadow | `#f1f5f9` / `16px` / `0 2px 8px rgba(0,0,0,0.06)` | (same) | — | — | — | — |
| `.toggleButton` | padding | `12px 16px` | `14px 20px` | `12px 20px` | `12px 20px` | `12px 24px` | `14px 28px` |
| `.toggleButton` | font-size | `14px` | `15px` | `15px` | `14px` | `15px` | `16px` |
| `.toggleButton` | border-radius | `12px` | (same) | — | — | `12px` | — |
| `.toggleActive` | bg / color / shadow | `#38b6ff` / white / `0 2px 8px rgba(56,182,255,0.3)` | — | — | — | — | — |
| `.customPlaceholder` | padding | `20px 12px` | `24px 16px` | `40px 20px` | — | `60px 40px` | — |
| `.customPlaceholder` | min-height | `280px` | `300px` | `350px` | — | `400px` | — |
| `.customMessage` | padding | `24px 16px` | `32px 24px` | `40px 32px` | — | `48px 40px` | — |
| `.customMessage` | border-radius | `12px` | `16px` | — | — | `24px` | — |
| `.customMessage` | border / bg | `2px dashed #cbd5e1` / gradient `#f8fafc → #f1f5f9` | — | — | — | — | — |
| `.customMessage` | gap (children) | `3vh` (set by `.customMessage` rule) | — | — | — | (same) | — |
| `.reopenButton` | padding | `10px 20px` | `12px 24px` | — | — | `14px 32px` | — |
| `.reopenButton` | font-size | `14px` | `15px` | — | — | `16px` | — |
| `.reopenButton` | border-radius | `12px` | (same) | — | — | `12px` | — |
| `.reopenButton` | max-width (mobile) | `250px` | `280px` | — | — | n/a | — |
| `.reopenButton` | shadow | `0 4px 12px rgba(56,182,255,0.3)` | — | — | — | — | — |

### Typography

| Element | XS | Mobile | Tablet | Desktop | Large |
|---|---|---|---|---|---|
| `.title` | `24px` | `28px` | `42px` (969-1200) | `48px` | `56px` |
| `.title` | weight 700, color `#1e293b`, line-height 1.2, margin-bottom `20-40px`, padding `0 12-16px` | — | — | — | — |
| `.toggleButton` (color resting) | `#64748b` w 500 | — | — | — | — |
| `.toggleActive` (color) | white w 500 (inherits weight from `.toggleButton`) | — | — | — | — |
| `.customTitle` | `20px` | `24px` | `28px` (969-1200) | `32px` | — |
| `.customTitle` | weight 700, color `#1e293b`, line-height 1.3, margin-bottom `10-16px` | — | — | — | — |
| `.customDescription` | `15px` | `16px` | `17px` (969-1200) | `18px` | — |
| `.customDescription` | color `#64748b`, line-height 1.5-1.6, max-width 500, margin x auto, margin-bottom `20-32px` | — | — | — | — |
| `.reopenButton` | text 14-16px weight 600, color white, text-transform none | — | — | — | — |

All Typography uses `leagueSpartan.className`.

### Colors

| Hex | Role | Tailwind |
|---|---|---|
| `#1e293b` | titles | `text-[#1e293b]` |
| `#38b6ff` / `#2563eb` | toggleActive bg / hover bg, reopenButton bg / hover | `bg-brand-500` / `bg-[#2563eb]` |
| `#f1f5f9` | toggleWrapper bg | `bg-[#f1f5f9]` |
| `#64748b` | toggleButton resting color, customDescription | `text-[#64748b]` |
| `#cbd5e1` | dashed placeholder border | `border-[#cbd5e1]` |
| `#f8fafc → #f1f5f9` | customMessage gradient bg | `bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]` |
| `#f0f9ff → #e0f2fe` | customMessage hover gradient | `hover:bg-gradient-to-br hover:from-[#f0f9ff] hover:to-[#e0f2fe]` |

### Animations / interactions

- `.toggleButton`: `transition: all 0.3s ease`. Hover gets `bg rgba(56,182,255,0.1)` + `text-#38b6ff`.
- `.customMessage`: `transition: all 0.3s ease`. Hover swaps gradient + border to brand-500 + `translateY(-2px)` + blue shadow.
- `.reopenButton`: hover `translateY(-2px)` + brighter shadow.
- `prefers-reduced-motion` strips transitions.

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\PricingSection.tsx`

The port mostly preserves the layout but loses MUI's exact toggle pill, the dashed-box treatment, and the responsive title sizing scheme.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 85 | `<section className="py-12">` | MUI `.container` padding: `80px 0` desktop / `100px 0` large / `40px 0` ≤968 / `32px 0` ≤480. Use `py-[40px] sm:py-[80px] lg:py-[100px] max-[480px]:py-[32px]`. Currently `py-12` (48px) is way too short on desktop. | High |
| B2 | 86 | `<Container size="lg">` | OK (1200 max-width matches MUI Container maxWidth="lg" = 1200px). | OK |
| B3 | 87 | `<div className="flex flex-col items-center gap-6">` header wrapper | MUI `.header` is `text-center, margin-bottom 64px (80 lg, 32 mobile, 28 xs)`. The title also has `margin-bottom: 40px` between it and the toggle. Use `mb-[32px] sm:mb-[64px] lg:mb-[80px] max-[480px]:mb-[28px] text-center` and remove `gap-6` (let the title's `mb-10` and toggle layout handle it). | Medium |
| B4 | 88 | `<h2 className="text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-ink-900">` | The triplet defaults `22 / 28 / 36`. MUI `.title` is `24 (xs) / 28 (≤968) / 42 (969-1200) / 48 (≥969) / 56 (≥1201)` — a 5-stop scale. Use arbitrary `text-[24px] max-[480px]:text-[24px] sm:text-[28px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold text-[#1e293b] leading-[1.2] mb-5 sm:mb-10`. | High |
| B5 | 92 | Toggle wrapper: `inline-flex rounded-full bg-ink-100 p-1` | MUI `.toggleWrapper`: `bg #f1f5f9` (matches `ink-100`), `border-radius 16px` (NOT `rounded-full`), `padding 6px (4 mobile, 3 xs)`, `gap 4px`, `shadow 0 2px 8px rgba(0,0,0,0.06)`, `flex-direction column` on mobile (≤968). Use `inline-flex flex-col gap-1 rounded-2xl bg-[#f1f5f9] p-1.5 max-md:p-1 max-[480px]:p-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:flex-row md:gap-1 max-md:w-full max-md:max-w-[350px] max-[480px]:max-w-[320px]`. | High |
| B6 | 93-99 | Toggle buttons: `rounded-full px-4 py-2 font-heading text-form-input font-semibold transition-colors` and selected `bg-white text-brand-500 shadow-sm` | MUI `.toggleButton`: `padding 12px 24px (14px 20px mobile)`, `border-radius 12px`, font-size scales `14-15-16`. Resting `bg transparent, color #64748b`. Active `bg #38b6ff, color white, shadow 0 2px 8px rgba(56,182,255,0.3)`. Active hover `bg #2563eb`. Hover resting `bg rgba(56,182,255,0.1), text #38b6ff`. Currently active state uses `bg-white text-brand-500` — exact inverse of MUI's `bg-brand-500 text-white`. **Critical color inversion bug**. | Critical |
| B7 | 93-99 | `font-semibold` on toggle button | MUI is `font-weight: 500`. Use `font-medium`. | Low |
| B8 | 93-99 | `text-form-input` (1rem) | MUI: `15px` desktop, `14px` tablet (969-1200), `16px` large. Use `text-[15px] md:text-[14px] lg:text-[15px] xl:text-[16px]`. | Medium |
| B9 | 117 | `<div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">` packages grid | MUI `.packagesGrid`: `grid-template-columns: repeat(3, 1fr)` desktop, `repeat(3, 1fr)` tablet (969-1200), `1fr` mobile (≤968), `gap 32px (40 large, 24 tablet, 20 mobile, 16 xs)`, `max-width 1200, margin auto, align-items start`. The breakpoint inversion: 2 cols at md (900) is **wrong** — MUI goes directly 1 → 3 at 969px. Use `mt-12 grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[24px] lg:gap-[32px] xl:gap-[40px] max-w-[1200px] mx-auto items-start max-[480px]:gap-[16px]`. Also remove `md:grid-cols-2`. | High |
| B10 | 119 | Wrapper missing | Currently maps cards directly. MUI wraps each in `.packageCardWrapper { width: 100% }`. Inside CSS grid that's automatic — but for safety wrap: `<div className="w-full">` per card. Optional. | Low |
| B11 | 133 | `<div className="mt-12 rounded-lg bg-brand-50 p-12 text-center">` customPlaceholder | MUI `.customPlaceholder` is `min-height 400px (300 mobile, 350 sm-tablet, 280 xs), padding 60px 40px (40 20 sm-tablet, 24 16 mobile, 20 12 xs), max-width 800, margin auto, display flex justify-center items-center`. Inside lives `.customMessage`. The current port collapses both into one `div` with `bg-brand-50`. Should be a wrapper + inner: `mt-12 flex items-center justify-center min-h-[280px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] max-w-[800px] mx-auto px-[12px] py-[20px] sm:px-[16px] sm:py-[24px] md:px-[20px] md:py-[40px] lg:px-[40px] lg:py-[60px]`, then the inner `.customMessage`. | High |
| B12 | 133 | Missing `.customMessage` chrome | MUI inner: `text-center, bg gradient #f8fafc → #f1f5f9, border 2px dashed #cbd5e1, border-radius 24px (16 mobile, 12 xs), padding 48px 40px (40 32 sm-tablet, 32 24 mobile, 24 16 xs), flex flex-col items-center, gap 3vh, transition all 0.3s, hover: gradient #f0f9ff → #e0f2fe, border-color brand-500, translateY(-2px), shadow blue`. Add: `flex flex-col items-center gap-[3vh] w-full text-center rounded-[24px] max-md:rounded-2xl max-[480px]:rounded-xl border-2 border-dashed border-[#cbd5e1] bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-10 py-12 max-md:px-6 max-md:py-8 max-[480px]:px-4 max-[480px]:py-6 transition-all duration-300 hover:border-brand-500 hover:bg-gradient-to-br hover:from-[#f0f9ff] hover:to-[#e0f2fe] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(56,182,255,0.15)]`. | High |
| B13 | 134 | `<h4 className="font-heading text-h4 text-ink-900">` customTitle (= 20/18/16) | MUI `.customTitle`: `32 / 24-28 / 20`. Use `text-[20px] max-[480px]:text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#1e293b] leading-[1.3] mb-3 sm:mb-4`. | High |
| B14 | 135 | `<p className="mt-2 font-heading text-body text-ink-700">` customDescription | MUI: `18 / 16-17 / 15`. Use `text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-[#64748b] leading-[1.5] md:leading-[1.6] max-w-[500px] mx-auto mb-5 sm:mb-6 lg:mb-8`. | High |
| B15 | 139 | `<Button onClick={...} variant="primary" className="mt-6 font-heading">Open Package Builder</Button>` | MUI `.reopenButton`: custom button — `bg #38b6ff, padding 14px 32px (12 24 mobile, 10 20 xs), border-radius 12px, font 16px (15 mobile, 14 xs) weight 600, text-transform none, shadow 0 4px 12px rgba(56,182,255,0.3)`. Mobile max-width `280px (250 xs)`. Hover: `bg #2563eb, translateY(-2px), shadow 0 6px 20px rgba(56,182,255,0.4)`. The primitive `Button variant="primary"` is `bg-brand-500` but the padding/shadow/radius likely differ. Spell out the className: `bg-brand-500 text-white font-semibold text-[14px] sm:text-[15px] lg:text-[16px] px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 rounded-[12px] shadow-[0_4px_12px_rgba(56,182,255,0.3)] transition-all duration-300 hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(56,182,255,0.4)] max-md:w-full max-md:max-w-[280px] max-[480px]:max-w-[250px]`. | High |
| B16 | overall | No `Suspense`/lazy modal pattern issue, but `CustomPricingModal` mounted always | Currently lazy-loaded — same as MUI. ✓ | OK |
| B17 | overall | Mobile toggle wrapper doesn't full-width / stack | Add the mobile rules from B5 (column direction, `max-w-[350px] mx-auto`, etc.). Without this the toggle pills overflow horizontally on phones with the long English label "Online Sessions (Save up to 30%)". | High |

---

## §3 Corrected Tailwind classNames (header + toggle key pieces)

```tsx
<section className="bg-white py-[40px] sm:py-[80px] lg:py-[100px] max-[480px]:py-[32px]">
  <Container size="lg">
    {/* Header */}
    <div className="text-center mb-[32px] sm:mb-[64px] lg:mb-[80px] max-[480px]:mb-[28px]">
      <h2 className="font-heading text-[24px] sm:text-[28px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-bold leading-[1.2] text-[#1e293b] mb-5 sm:mb-10 px-3 sm:px-4">
        Our packages
      </h2>

      <div className="flex justify-center max-md:px-3">
        <div className={cn(
          "inline-flex flex-col gap-1 md:flex-row md:gap-1",
          "rounded-2xl bg-[#f1f5f9] p-1.5 max-md:p-1 max-[480px]:p-[3px]",
          "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
          "max-md:w-full max-md:max-w-[350px] max-[480px]:max-w-[320px]",
        )}>
          <button
            type="button"
            onClick={() => handleTabChange("online")}
            className={cn(
              "rounded-[12px] font-heading font-medium transition-all duration-300 whitespace-normal text-center leading-[1.3]",
              "px-4 py-2.5 max-md:px-4 max-md:py-3 max-[480px]:px-3 max-[480px]:py-2.5",
              "text-[15px] md:text-[14px] lg:text-[15px] xl:text-[16px] max-md:text-[15px] max-[480px]:text-[14px]",
              sessionType === "online"
                ? "bg-brand-500 text-white shadow-[0_2px_8px_rgba(56,182,255,0.3)] hover:bg-[#2563eb]"
                : "bg-transparent text-[#64748b] hover:bg-[rgba(56,182,255,0.1)] hover:text-brand-500",
            )}
          >
            Online Sessions (Save up to 30%)
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("custom")}
            className={cn(/* same shape as above */)}
          >
            Custom Package Builder
          </button>
        </div>
      </div>
    </div>

    {/* Packages grid */}
    {sessionType === "online" ? (
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[24px] lg:gap-[32px] xl:gap-[40px] max-w-[1200px] mx-auto items-start max-[480px]:gap-[16px] max-[480px]:px-3 sm:px-4 md:px-5">
        {pricingData.packages.slice(0, 3).map((pkg, idx) => (
          <PackageCard key={pkg.id} package={pkg} userCountry={filters.country} locale={locale} isPopular={idx === 1} sessionType={sessionType} />
        ))}
      </div>
    ) : (
      <div className="mt-12 flex items-center justify-center min-h-[280px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] max-w-[800px] mx-auto px-3 py-5 sm:px-4 sm:py-6 md:px-5 md:py-10 lg:px-10 lg:py-15">
        <div className="flex flex-col items-center gap-[3vh] w-full text-center rounded-[24px] max-md:rounded-2xl max-[480px]:rounded-xl border-2 border-dashed border-[#cbd5e1] bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] px-10 py-12 max-md:px-6 max-md:py-8 max-[480px]:px-4 max-[480px]:py-6 transition-all duration-300 hover:border-brand-500 hover:bg-gradient-to-br hover:from-[#f0f9ff] hover:to-[#e0f2fe] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(56,182,255,0.15)]">
          <h4 className="font-heading font-bold leading-[1.3] text-[#1e293b] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px]">
            🎯 Custom Package Builder
          </h4>
          <p className="font-heading text-[#64748b] leading-[1.5] md:leading-[1.6] max-w-[500px] mx-auto text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px]">
            Configure your perfect tutoring package with flexible hours, subjects, and pricing tiers. The builder will open automatically.
          </p>
          {!isModalOpen && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-heading font-semibold text-white bg-brand-500 rounded-[12px] text-[14px] sm:text-[15px] lg:text-[16px] px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5 shadow-[0_4px_12px_rgba(56,182,255,0.3)] transition-all duration-300 hover:bg-[#2563eb] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(56,182,255,0.4)] max-md:w-full max-md:max-w-[280px] max-[480px]:max-w-[250px]"
            >
              Open Package Builder
            </button>
          )}
        </div>
      </div>
    )}

    <CustomPricingModal open={isModalOpen} onClose={() => setIsModalOpen(false)} userCountry={filters.country} dropdownOptions={dropdownOptions} />
  </Container>
</section>
```

---

## §4 Verification at 4 widths

- **375px**: `py-[32px]` (≤480 rule), title 24px, mb 28px. Toggle stacks vertical, max-width 320px centered, padding `3px`. Single-column package grid, gap 16px. Custom message radius 12px, padding 24/16, button 10/20 padding, title 20px, description 15px.
- **768px**: `py-[40px]` (≤968 rule), title 28px (MUI sm-tablet 769-968 keeps mobile size), mb 32px. Toggle still stacks vertical (≤968), max-width 450px. Single column grid, gap 28px.
- **1280px**: `py-[80px]` desktop, title 48px (we add 42px between 969-1200 via `md:text-[42px]`; at 1280 we're at `lg:text-[48px]`). 3-column grid gap 32px. Custom message 48/40 padding, title 32px, desc 18px.
- **1920px**: `py-[100px]` (≥1201 rule), title 56px (`xl:text-[56px]`). Grid gap 40px. Container caps at 1200 wide centered.

---

## §5 RTL notes

`ArPricingSection.tsx` is a separate file with:

- Root `dir="rtl"` (line 89).
- Title "باقاتنا" (one word, much shorter than English "Our packages" — but H2 sizing identical).
- Toggle labels Arabic: "جلسات عبر الإنترنت (وفر حتى 30%)" and "منشئ الباقات المخصصة". Shorter than English — verify they don't look tiny inside the pill; might need slightly less horizontal padding on the toggle.
- Custom placeholder strings translated.
- The grid is `direction-agnostic` (3 equal columns) — no flipping needed.
- `font-heading` on Arabic content is **wrong** — League Spartan has no Arabic glyphs. Drop `font-heading` so the global `html[dir="rtl"] *` rule promotes Noto Sans Arabic. Currently AR section uses `font-heading` on lines 92, 102 etc — break this.
- The toggle's active state shadow `0_2px_8px_rgba(56,182,255,0.3)` is fine; shadows don't flip.
- Hover translateY transforms are not directional — keep as-is.
