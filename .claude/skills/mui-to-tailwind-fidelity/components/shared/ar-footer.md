# Component — `ArFooter` (MUI only — port has no equivalent)

The Arabic-specific footer. Same content/markup as `Footer.tsx` but with: (a) RTL-mirrored decorative circles, (b) RTL margin properties (`marginRight` on text, `marginLeft` on icons), (c) hardcoded Arabic copy, (d) Arabic alt-text, (e) `<footer dir="rtl">` root.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\ar-footer.tsx` |
| Tailwind port | **Does not exist.** `tuitionalFrontend\src\components\ar-server-footer.tsx` wraps the LTR `<Footer />` in `<div dir="rtl">` instead. |

---

## §1 MUI source — extracted properties

Structurally identical to `Footer.tsx`. The deltas vs the EN footer (footer.tsx) are limited to:

| Element | LTR (footer.tsx) | RTL (ar-footer.tsx) |
|---|---|---|
| `<footer>` root | (none) | `<footer dir="rtl">` |
| `rightCircle.top:70 right:60` | `right: 60` | `left: 60` (flipped) |
| `leftCircle.bottom:0 left:-230` | `left: -230` | `right: -230` (flipped) |
| `admissionText.marginLeft: 10px` | `marginLeft: 10px` | `marginRight: 10px` |
| `social.marginRight: 20px` | `marginRight: 20px` | `marginLeft: 20px` |
| Banner row `marginY: { … 70/80/90/100 }` | `marginTop: { …70/80/90/100 }` | `marginY: {…}` (uses both sides; MUI baseline uses `marginY` instead of `marginTop` here — minor) |
| Hardcoded copy | EN strings via `t(...)` | hardcoded AR strings ("التسجيل مفتوح…", "المناهج الدراسية", "المواد الدراسية", "احصل على المساعدة", "من نحن", "جميع الحقوق محفوظة ©2025 تيوشنال") |
| Alt text | `alt="plan"`, `alt="logo"`, `alt="facebook"` | `alt="خطة"`, `alt="شعار تيوشنال"`, `alt="فيسبوك"`, etc. |
| Admission banner Grid keys | `lg=6` | `lg=5.5` (40-px wider phone column) |
| Subjects column | normal | adds explicit `height: { lg: 650px }` + `flexWrap: wrap` |

Everything else (typography, spacing ladder, container shadow, gradient bg, FooterLinks, body2 line-heights, divider) is **identical to footer.tsx** — see `components/shared/footer.md`.

### Typography (same as footer.tsx)
- `admissionText` — `subtitle1` (statNumber: 1.75/2.25/3rem) white, marginRight 10 (RTL)
- `phoneText` — `subtitle1` instead of `h2` (this is different from footer.tsx EN where phone uses `variant="h2"`!)
- `desc` — `body2` mt-10 text-black, text-align (xs/sm:center md/lg:start)
- `heading` — `subtitle2`, fontWeight 700, mb-15 mt-12
- `text` (about-us rows) — `body2`, lineHeight ladder 35/40/40/45
- `rights` — `subtitle2`, marginY ladder 20/30/50/70

### Colors / shadows
Identical to footer.tsx — `bg-footer-fade`, `shadow-footer-card`, `bg-brand-500` contact strip.

---

## §2 Tailwind port — bug list

The port has **no `ar-footer.tsx`**. `ar-server-footer.tsx` uses `<div dir="rtl"><Footer /></div>`. This means:

| # | Concern | Severity |
|---|---|---|
| AF1 | The visual mirror works only if every `marginLeft/Right`, `left/right` in `footer.tsx` is rewritten as logical `ms/me`/`start/end`. Audit needed. | high |
| AF2 | The MUI AR variant uses `subtitle1` (3rem statNumber) for phone, vs `h2` (2.25rem) in EN footer. Port currently renders the EN typography for both. This is a deliberate AR-only sizing tweak that the LTR-only Footer cannot reproduce. | medium |
| AF3 | The subjects column has `height: 650px lg:` + `flexWrap: wrap` in AR (causes 2-column layout for long subject list). Port renders it like the EN column. | medium |
| AF4 | The banner grid uses `lg=5.5` (not `lg=6`) for the admission text in AR, leaving more room for the wider phone column. Port renders `lg=6`. | low |
| AF5 | Hardcoded AR copy is replaced by `t(footer.…)` lookups in the port — depends on the AR translation file containing the right keys. Verify translations.ts. | low |

---

## §3 Corrected Tailwind classNames

If creating `tuitionalFrontend/src/components/ar-footer.tsx`, fork `footer.tsx` and:
- Apply class `dir="rtl"` to the root `<footer>`
- Change `right-[60px]` → `left-[60px]` on rightCircle
- Change `-left-[230px]` → `-right-[230px]` on leftCircle
- Change `ms-[10px]` on admissionText → `me-[10px]` (or keep logical and rely on dir flip)
- Change `me-5` on social icons → `ms-5`
- Use `subtitle1` (statNumber) for phone typography:
  `text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]` font-bold leading-[1]
- Subjects column: add `lg:h-[650px] lg:flex-wrap`

## §4 Verification at 4 widths

Open `/ar` pages at 375/768/1280/1920 and confirm:
- Decorative circles are mirrored vs `/` (EN)
- Subjects column at 1200+ wraps to 2 sublists
- Admission tagline column is slightly narrower than EN (5.5/12 vs 6/12)
- Phone reads ~3rem instead of ~2.25rem on desktop

## §5 RTL notes

The MUI AR file is essentially the LTR file with logical-side overrides. The cleanest port is to use logical properties throughout `footer.tsx` and let `<div dir="rtl">` do the flipping — that's what `ar-server-footer.tsx` currently does. Items AF2/AF3/AF4 above are the typography/layout deltas that cannot be expressed as a simple direction flip — they require an explicit AR component or conditional `isRTL` styling inside `footer.tsx`.
