# Component — `PricingPageClient`

The top-level client wrapper for `/pricing`. Contains: a hero with H1 + subtitle, a dynamically-imported `PricingSection`, and a lazy-loaded `TrustSection` (stats cards + achievement badges). All styles for this file live in `src/app/pricing/pricing.module.css` — NOT in the component's folder.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pricing\PricingPageClient.tsx` (imports `../../app/pricing/pricing.module.css`) |
| Tailwind port | `tuitionalFrontend\src\components\pricing\PricingPageClient.tsx` |
| Arabic variant | MUI: `ArPricingPageClient.tsx` (same shape, Arabic copy); Tailwind: `ArPricingPageClient.tsx` |

⚠️ The MUI styles live in `app/pricing/pricing.module.css` which was NOT read in this audit. The structure / class names below are extracted from JSX; precise CSS dimension values would require reading that module file (a follow-up if the port needs exact values).

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <section className=.hero>
    <Container maxWidth="lg">
      <div .heroContent>
        <Typography variant="h1" .heroTitle>Find Your Perfect Tutoring Package</Typography>
        <Typography .heroSubtitle>Expert tutoring tailored to…</Typography>
      </div>
    </Container>
  </section>

  <PricingSection filters={...} dropdownOptions={...} locale={locale} />

  <Suspense fallback={<div min-height:400px bg #f8fafc center>Loading testimonials...</div>}>
    <TrustSection /> {/* lazy */}
  </Suspense>
</>

TrustSection:
<section .trustSection>
  <Container maxWidth="lg">
    <div .trustContent>
      <div .trustHeader>
        <Typography variant="h3" .trustTitle>Trusted by Students Worldwide</Typography>
        <Typography .trustSubtitle>Join thousands of successful students…</Typography>
      </div>
      <div .statsGrid>
        <div .statCard × 4>
          <div .statIcon>🎓 / 👨‍🏫 / 📚 / ⭐</div>
          <Typography .statNumber>10,000+ / 500+ / 15+ / 98%</Typography>
          <Typography .statLabel>Students Tutored / …</Typography>
          <div .statProgress>
            <div .progressBar style={{ width: '90%' }} />
          </div>
        </div>
      </div>
      <div .achievementBadges>
        <div .badge × 4>
          <span .badgeIcon>🏆 / 🌟 / 🔒 / 💯</span>
          <span .badgeText>Top Rated Platform / Award Winning / Secure & Trusted / Results Guaranteed</span>
        </div>
      </div>
    </div>
  </Container>
</section>
```

### Dimensions / typography (from JSX hints — full values in pricing.module.css not extracted)

| Element | MUI hint | Expected Tailwind |
|---|---|---|
| `<Typography variant="h1">` | h1 typography token = `1.75rem mobile / 2.25rem tablet / 3rem desktop` | `text-h1-mobile sm:text-h1-tablet lg:text-h1` |
| `<Typography variant="h3">` (trustTitle) | `1.125rem / 1.25rem / 1.5rem` | `text-h3-mobile sm:text-h3-tablet lg:text-h3` |
| `<Typography>` (heroSubtitle, trustSubtitle, statLabel, badgeText) | MUI body1 = `0.9375 mobile / 1rem desktop` | `text-body-mobile sm:text-body` |
| `<Typography>` `.statNumber` | likely matches `subtitle1` token = stat-number | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` |
| All Typography | `leagueSpartan.className` applied | add `font-heading` |

### Stat card pattern (from JSX)

| Element | Visual hint |
|---|---|
| `.statCard` | rounded card with shadow, white bg |
| `.statIcon` | large emoji (likely 2.5rem) |
| `.statProgress` | thin track w/ filled bar (width set via style prop, 0-100%) |
| `.progressBar` | filled bar — likely brand-500 |

### Achievement badge pattern

| Element | Visual hint |
|---|---|
| `.achievementBadges` | flex wrap, centered, gap-3 |
| `.badge` | pill: white bg, shadow, padding `px-4 py-2`, gap-2 |

---

## §2 Tailwind port — bug list

Tailwind file: `tuitionalFrontend\src\components\pricing\PricingPageClient.tsx`

The port re-implements styles inline (since the project doesn't allow `.module.css`). What's there is close in shape but uses tokens instead of MUI hex literals — and the heading typography is partially correct, partially missing the triplet.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 100 | `<section className="bg-gradient-to-br from-brand-50 to-white py-20">` hero | MUI hero CSS not extracted in this audit. Likely a softer gradient or solid `bg-brand-50`/white with longer padding `py-[6vh] lg:py-[10vh]`. Confirm by reading `pricing.module.css`. Current py-20 (80px) is fine as a placeholder. | Medium (verify with module file) |
| B2 | 103 | `<h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">` | ✓ Correctly uses the triplet. | OK |
| B3 | 106 | `<p className="mx-auto mt-4 max-w-2xl font-heading text-body text-ink-700">` subtitle | MUI body has a mobile/desktop pair: `text-body-mobile sm:text-body`. Add the mobile token. Current `text-body` only applies the 16px desktop size on all sizes. | Medium |
| B4 | 117 | Suspense fallback `bg-ink-50` | MUI fallback (inline) uses `backgroundColor: '#f8fafc'`. `bg-ink-50` is `#F8FAFC` — should match. ✓ | OK |
| B5 | 25 | TrustSection root `bg-brand-50 py-16` (64px) | MUI `.trustSection` CSS not extracted. The brand-50 bg is plausible. Padding `py-16` is a guess; MUI probably uses `py-[8vh] lg:py-[10vh]`. | Medium (verify) |
| B6 | 28 | `<h3 className="font-heading text-h3 text-ink-900">` — NOT the triplet | Should be `text-h3-mobile sm:text-h3-tablet lg:text-h3` per the typography rule. | High |
| B7 | 29 | `<p className="mt-2 font-heading text-body text-ink-700">` | Missing mobile variant: `text-body-mobile sm:text-body`. | Medium |
| B8 | 33 | `mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4` stats grid | MUI grid in the original likely is `repeat(2,1fr)` mobile → `repeat(4,1fr)` desktop. The current breakpoint inversion is correct: 2 cols below 1200 (`grid-cols-2`), 4 at lg+. Could be wrong if MUI used `sm:grid-cols-2 md:grid-cols-4` — but 2→4 is plausible. | Verify |
| B9 | 40 | `rounded-lg bg-white p-6 text-center shadow-card` stat card | MUI card likely has different chrome — but `shadow-card` token (`0 1px 4px rgba(0,0,0,0.08)`) is a sensible default. Padding `p-6` (24px) is a guess. | Verify |
| B10 | 42 | `<p className="mt-2 font-heading text-h3 font-bold text-brand-500">` stat number | The MUI Typography has NO `variant` set — so it inherits body. The class `.statNumber` likely styles it to a large number. Conjecture: `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number text-brand-500 font-extrabold`. Current `text-h3` is way too small for a "10,000+" hero stat. | High |
| B11 | 43 | `<p className="font-heading text-small text-ink-700">` stat label | MUI typography token `subtitle2` = `0.875rem` = 14px = `text-stat-label`. Use `text-stat-label uppercase` (MUI stat labels are usually uppercase). | Medium |
| B12 | 44-46 | Progress bar: `h-1 rounded-full bg-ink-200` track + `h-1 bg-brand-500` fill | OK shape. MUI might use a thicker bar (h-2). Verify with CSS. | Verify |
| B13 | 50 | `mt-12 flex flex-wrap justify-center gap-3` badges row | Looks reasonable. | OK |
| B14 | 57 | `flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card` badge | OK shape — pill with shadow. Verify badge padding and font size match `.badge` rule. | Verify |
| B15 | 59 | `<span className="font-heading text-small font-semibold text-ink-900">` badge text | If MUI `.badgeText` is `0.875rem` it matches `text-small`. ✓ probable. | OK |
| B16 | overall | Missing inter-section margins (between hero / pricing / trust) | If MUI has explicit `marginY: { xs: '4vh', sm: '5vh', lg: '6vh' }` between sections, the port currently relies on each section's own `py-*`. Verify with `pricing.module.css` and add wrapping `<div className="my-[4vh] sm:my-[5vh] lg:my-[6vh]" />` if needed. | Medium |

---

## §3 Corrected Tailwind classNames (high-confidence edits only)

```tsx
{/* Hero */}
<section className="bg-gradient-to-br from-brand-50 to-white py-[8vh] sm:py-[10vh] lg:py-[12vh]">
  <Container size="lg">
    <div className="text-center">
      <h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">
        Find Your Perfect Tutoring Package
      </h1>
      <p className="mx-auto mt-4 max-w-2xl font-heading text-body-mobile sm:text-body text-ink-700">
        Expert tutoring tailored to your curriculum, grade level, and learning goals. Join thousands of students achieving academic excellence with our personalized approach.
      </p>
    </div>
  </Container>
</section>

{/* TrustSection — verified-token edits */}
<section className="bg-brand-50 py-[8vh] lg:py-[10vh]">
  <Container size="lg">
    <div className="text-center">
      <h3 className="font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900">
        Trusted by Students Worldwide
      </h3>
      <p className="mt-2 font-heading text-body-mobile sm:text-body text-ink-700">
        Join thousands of successful students who have achieved their academic goals with our expert tutoring
      </p>
    </div>

    <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-lg bg-white p-6 text-center shadow-card">
          <div className="text-4xl">{stat.icon}</div>
          <p className="mt-2 font-heading text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-extrabold text-brand-500">
            {stat.number}
          </p>
          <p className="font-heading text-stat-label uppercase text-ink-700">{stat.label}</p>
          <div className="mt-3 h-1 rounded-full bg-ink-200">
            <div className="h-1 rounded-full bg-brand-500" style={{ width: `${stat.progress}%` }} />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {badges.map((badge, i) => (
        <div key={i} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card">
          <span className="text-base">{badge.icon}</span>
          <span className="font-heading text-small font-semibold text-ink-900">{badge.text}</span>
        </div>
      ))}
    </div>
  </Container>
</section>
```

The two unverified items (hero/trust py vertical rhythm, statCard exact padding) need a read of `tuitionalFrontend-mui-baseline\src\app\pricing\pricing.module.css` to lock down precisely. Until then keep the changes above as the high-confidence baseline.

---

## §4 Verification at 4 widths

- **375px**: H1 mobile size (`text-h1-mobile` = 28px). Subtitle 15px. Stats grid 2 cols, badges wrap. Card padding `p-6`.
- **768px**: H1 tablet size (`text-h1-tablet` = 36px), subtitle 16px. Stats 2 cols still, badges in 1-2 rows depending on text length.
- **1280px**: H1 desktop (`text-h1` = 48px). Stats 4 cols. Badges single row.
- **1920px**: same as 1280; verify the `Container size="lg"` (1200px wide) sits centered with side margins.

---

## §5 RTL notes

`ArPricingPageClient.tsx` is a separate file. Differences:

- Root sections wrapped `dir="rtl"` (line 25 of `ArPricingPageClient.tsx`).
- Translates every string: "اعثر على باقة التدريس المثالية لك" (H1), "موثوق من قبل الطلاب حول العالم" (trust title), four Arabic stat labels, four Arabic badge labels.
- The H1 is wider in Arabic — verify `max-w-2xl` doesn't truncate awkwardly. Probably needs `max-w-3xl rtl:max-w-3xl`.
- `flex` order doesn't need reversing (centered content).
- Arabic numerals "10,000+" / "500+" / "15+" / "98%" stay in Latin form in the source — leave them as-is.
- Critically, Arabic body text needs `font-arabic` (`Noto Sans Arabic` / `Cairo`), NOT `font-heading` (League Spartan, Latin only). The current AR port uses `font-heading` on lines 28, 29 etc — this is wrong for Arabic content. Either drop `font-heading` so the global `html[dir="rtl"] *` rule applies `font-arabic`, or explicitly add `font-arabic`.
