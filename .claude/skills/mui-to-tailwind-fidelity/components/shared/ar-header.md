# Component — `ArHeader` (MUI only — port has no equivalent)

The Arabic-specific header. Structurally identical to `header.tsx` but with: (a) RTL-mirrored decorative circles, (b) RTL margins on logo + menu icon, (c) `direction: rtl` on Toolbar, (d) hardcoded Arabic copy (`الرئيسية`, `من نحن`, etc.), (e) `/ar/...` href prefixes, (f) WhatsApp icon on the **left** instead of right.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\ar-header.tsx` |
| Tailwind port | **Does not exist.** The port uses one bilingual `header.tsx` with `isRTL` from `useI18n()` branching navItems internally. |

---

## §1 MUI source — extracted properties

Same `styles` object as `header.tsx`, with these RTL-only overrides applied unconditionally:

| Element | LTR (header.tsx) | RTL (ar-header.tsx) | Tailwind equivalent |
|---|---|---|---|
| `container.marginLeft` | `5vw` | `5vw` (kept) + `marginRight: 5vw` added | `mx-[5vw]` |
| `whatsapp.right` | `0` | flipped to `left: 0` | `bottom-0 left-0` |
| `logo.marginLeft` | `-10px` | flipped to `marginRight: -10px` | `me-[-10px]` (RTL → `mr` becomes effective left) — simpler: just `ms-[-10px]` works in both |
| `logoMobile.marginLeft` | `-15px` | flipped to `marginRight: -15px` | same logic — `ms-[-15px]` |
| `menu.marginRight` | `1vw` | flipped to `marginLeft: 1vw` | `me-[1vw]` |
| `leftCircle.left` | `{xs:1.2vw, sm:2.5vw, md:5vw, lg:4.5vw}` | flipped to `right: {…}` | `end-[1.2vw] sm:end-[2.5vw] md:end-[5vw] lg:end-[4.5vw]` |
| `leftCircle.animation` | `lg: bounceAndForward…` | `none` (explicitly disabled) | omit `animate-*` |
| `rightCircle.right` | `3.5vw` | flipped to `left: 3.5vw` | `start-[3.5vw]` |
| `rightCircle.animation` | (commented) | `none` (explicit) | no animation |
| `toolBar.direction` | (none) | `direction: rtl` | `dir="rtl"` on parent |
| `navSection.justifyContent` | (none) | `flex-start` | `justify-start` |
| `logoSection.marginRight` | `1.5vw` | flipped to `marginLeft: 2vw` | `ms-[2vw]` |
| `buttonsSection.marginLeft` | `1.5vw` | flipped to `marginRight: 1.5vw` | `me-[1.5vw]` |
| Nav copy | EN keys via `t()` | hardcoded AR: `"الرئيسية"`, `"من نحن"`, `"المجتمع والفعاليات"`, `"الشهادات"`, `"اتصل بنا"` | — |
| Button copy | EN via `t()` | hardcoded AR: `"اختبار SAT بالذكاء الاصطناعي"`, `"احجز دروس تجريبية"` | — |
| `href` prefixes | `/`, `/about`, `/testimonials`, `/contact` | `/ar`, `/ar/about`, `/ar/testimonials`, `/ar/contact` | — |
| Alt text | `"Logo"` | `"شعار تيوشنال"`, `"واتساب"` | — |

All other dimensions / typography / shadows are identical to `header.tsx` — see `components/shared/header.md`.

---

## §2 Tailwind port — bug list

The port has no `ar-header.tsx`. Instead, `header.tsx` reads `isRTL = useI18n().isRTL` and branches `navItems` array based on locale. Bugs vs the MUI AR baseline:

| # | Concern | Severity |
|---|---|---|
| AH1 | WhatsApp icon position: MUI AR puts it on the **left** (`left: 0`). The port `header.tsx` uses `right-0` always. | medium |
| AH2 | `marginLeft: 5vw` → port uses `mx-[5vw]`. MUI AR uses BOTH `marginLeft: 5vw` AND `marginRight: 5vw` (so `mx-[5vw]`). EN MUI uses only `marginLeft: 5vw`. The port's `mx-[5vw]` matches the AR variant, NOT the EN variant — so EN may look slightly different from MUI EN baseline. | low |
| AH3 | Circles: in MUI AR, both `leftCircle` and `rightCircle` have `animation: none`. The port `header.tsx` keeps the animation on always (regardless of locale). | medium |
| AH4 | Logo offsets: MUI AR uses `marginRight: -10px` (instead of `marginLeft: -10px`). Port uses `me-[1.5vw]` which is RTL-aware but the exact negative-margin pull (`-10px`) is missing. | low |
| AH5 | Toolbar `direction: rtl` in MUI is omitted from port; relies on global `<html dir="rtl">`. Verify the toolbar children stack correctly. | low |
| AH6 | `navSection.justifyContent: flex-start` in MUI AR. Port nav uses `lg:flex items-center gap-[2vw]` (no `justify-start`). Order is preserved by HTML order + RTL `dir`, so result is similar. | low |

---

## §3 Corrected Tailwind classNames

If the team decides to forge a dedicated `ar-header.tsx` (recommended for parity with MUI baseline), key blocks to add:

```tsx
// Container — note the symmetric mx
<header className="sticky top-0 z-[1000] mx-[5vw] mt-[2vh] flex w-[90%] items-center justify-between rounded-md bg-white/70 py-[1vh] shadow-header lg:justify-evenly" dir="rtl">

// leftCircle — flipped to end-* (RTL = visually on the left)
<div className="absolute h-[3vh] w-[3vh] top-[1.7vh] end-[1.2vw] rounded-full bg-brand-500 sm:h-[4.5vh] sm:w-[4.5vh] sm:end-[2.5vw] md:h-[5vh] md:w-[5vh] md:end-[5vw] lg:h-[7.5vh] lg:w-[7.5vh] lg:end-[4.5vw]" />
{/* NO animation in RTL */}

// rightCircle — flipped to start-*
<div className="absolute h-[6vh] w-[6vh] top-[3.2vh] start-[3.5vw] rounded-full bg-brand-500 sm:h-[7vh] sm:w-[7vh] md:h-[8vh] md:w-[8vh] lg:h-[10.9vh] lg:w-[10.9vh]" />

// WhatsApp — left in RTL
<div className="fixed bottom-0 left-0 z-[1000] p-10 animate-[rotateAnimation_2s_ease-in-out_infinite]">
```

Or, if keeping a single bilingual `header.tsx`, add `isRTL`-conditional overrides:
- Animation: `!isRTL && "lg:animate-[bounceAndForword_4s_linear_infinite_alternate]"`
- WhatsApp: `isRTL ? "left-0" : "right-0"`
- Container: keep `mx-[5vw]` (matches AR) OR `ms-[5vw]` (matches EN with auto-RTL flip).

## §4 Verification at 4 widths

In RTL at 375/768/1280/1920:
- Decorative left/right circles are visually mirrored vs `/` (EN)
- WhatsApp button bottom-**left** (not bottom-right)
- Logo on the right side, hamburger on the left side
- Nav links read right-to-left

## §5 RTL notes

The current bilingual approach in `header.tsx` is reasonable but loses two MUI baseline behaviors: (1) circle animations disabled in RTL to prevent horizontal overflow, (2) WhatsApp icon on the left. Both warrant `isRTL` conditionals.
