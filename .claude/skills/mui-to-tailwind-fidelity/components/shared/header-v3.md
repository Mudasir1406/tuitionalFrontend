# Component — `HeaderV3`

Minimal landing-page header for SEO funnel pages (`/a-level`, `/gcse`, `/igcse`). No nav, no CTAs, no glassmorphism — just **white bar, centered logo, soft shadow, fixed-position WhatsApp icon**. Total height 70 px.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\header-v3.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\header-v3.tsx` |
| Used on | `/a-level/page.tsx`, `/gcse/page.tsx`, `/igcse/page.tsx` (in both repos) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Box.headerContainer>
    <Box.logoContainer>
      <Link href="/">
        ├─ Box.logo       (desktop, hidden < md)
        │   └─ <Image logo.png 200×49, h-45 w-auto, object-contain>
        └─ Box.logoMobile (mobile, hidden ≥ md)
            └─ <Image logoMobile.png 160×49, h-40 w-auto, object-contain>
  <Box.whatsapp>
    <Link target="_blank" href="https://wa.me/97144396296">
      <Image whatsapp icon 60×60>
```

### Dimensions & spacing (header-v3.tsx:64-121)

| Element | Property | Value | Tailwind |
|---|---|---|---|
| `headerContainer` | `backgroundColor` | `white` | `bg-white` |
| `headerContainer` | `boxShadow` | `0 2px 10px rgba(0,0,0,0.1)` | `shadow-[0_2px_10px_rgba(0,0,0,0.1)]` |
| `headerContainer` | `zIndex` | `1100` | `z-[1100]` |
| `headerContainer` | `width` | `100%` | `w-full` |
| `headerContainer` | `height` | `70px` | `h-[70px]` |
| `headerContainer` | `display` | `flex` | `flex` |
| `headerContainer` | `justifyContent` | `center` | `justify-center` |
| `headerContainer` | `alignItems` | `center` | `items-center` |
| `headerContainer` | `padding` | `0` | (omit) |
| `logo` (desktop) | `display` | `{ xs: none, md: flex }` | `hidden md:flex` |
| `logoMobile` | `display` | `{ xs: flex, md: none }` | `flex md:hidden` |
| `logoImage` | `width` / `height` | `auto` / `45px` | `h-[45px] w-auto object-contain` |
| `logoMobileImage` | `width` / `height` | `auto` / `40px` | `h-[40px] w-auto object-contain` |
| `whatsapp` | `position` | `fixed` | `fixed` |
| `whatsapp` | `bottom` / `right` | `0` / `0` | `bottom-0 right-0` |
| `whatsapp` | `padding` | `5` (MUI = 40 px) | `p-10` |
| `whatsapp` | `zIndex` | `1000` | `z-[1000]` |
| `whatsapp` | `animation` | `rotateAnimation 2s ease-in-out infinite` | `animate-[rotateAnimation_2s_ease-in-out_infinite]` |

### Typography

None — no text content beyond logo images and WhatsApp icon.

### Colors

| Token | Value |
|---|---|
| Container bg | `white` |
| Container shadow | `0 2px 10px rgba(0,0,0,0.1)` |

### Animations / interactions
- WhatsApp icon rotates via `rotateAnimation` keyframe (defined in `globals.css`).
- Logo Link has no hover styling.
- No sticky positioning (`position: fixed` commented out in MUI source).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| H3-1 | header-v3.tsx:11 | `z-[1100] flex h-[70px] w-full items-center justify-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]` | Matches MUI exactly. | none |
| H3-2 | header-v3.tsx:14-22 | Desktop logo: `hidden items-center md:flex` + `<Image w=200 h=49 className="h-[45px] w-auto object-contain">` | MUI: `display { xs: none, md: flex }` → correct; image `width: auto, height: 45px, objectFit: contain` → correct. | none |
| H3-3 | header-v3.tsx:23-32 | Mobile logo: `flex items-center md:hidden` + `width=160 height=49` → `h-[40px] w-auto object-contain` | Matches MUI exactly. | none |
| H3-4 | header-v3.tsx:36 | `fixed bottom-0 end-0 z-[1000] animate-[...] p-5` | MUI uses `right: 0` (NOT logical `end`); port uses `end-0` which flips in RTL. MUI explicitly comments "Change left to right for bottom-right positioning" — should be `right-0`, NOT `end-0`. | medium |
| H3-5 | header-v3.tsx:36 | `p-5` (Tailwind = 20 px) | MUI: `padding: 5` = MUI spacing 5 × 8 = **40 px** → should be `p-10`. | high |

---

## §3 Corrected Tailwind classNames

```tsx
<>
  <header className="z-[1100] flex h-[70px] w-full items-center justify-center bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
    <Link href="/" className="flex items-center no-underline">
      <span className="hidden items-center md:flex">
        <Image src={logo.src} alt="Tuitional Logo" width={200} height={49} priority
               className="h-[45px] w-auto object-contain" />
      </span>
      <span className="flex items-center md:hidden">
        <Image src={logoMobile.src} alt="Tuitional Logo" width={160} height={49} priority
               className="h-[40px] w-auto object-contain" />
      </span>
    </Link>
  </header>

  <div className="fixed bottom-0 right-0 z-[1000] p-10 animate-[rotateAnimation_2s_ease-in-out_infinite]">
    <Link href="https://wa.me/97144396296" target="_blank" rel="noopener noreferrer">
      <Image src="https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000"
             width={60} height={60} alt="WhatsApp" />
    </Link>
  </div>
</>
```

## §4 Verification at 4 widths

- **375 px**: white 70-px bar with `logoMobile` (40-px tall) centered. WhatsApp icon bottom-right (~60×60) with 40-px padding.
- **768 px**: still mobile logo (`md:hidden` cutover is at 900); desktop logo not yet visible.
- **1280 px**: desktop logo `h-[45px]` visible centered. WhatsApp bottom-right.
- **1920 px**: same.

Note: cutover here is **`md` (900 px)**, not `lg` (1200 px) — this is the MUI source value, intentionally different from `header.tsx`.

## §5 RTL notes

- HeaderV3 is **language-agnostic** in MUI (no `isRTL`, no `useI18n`). Port matches.
- WhatsApp icon: MUI hardcodes `right: 0`. Port uses `end-0` which flips to `left-0` in RTL. **This is a deviation** — MUI keeps WhatsApp on the right even in RTL. Change `end-0` → `right-0`.
- Logo is centered (`justify-center`), so no flip needed.
