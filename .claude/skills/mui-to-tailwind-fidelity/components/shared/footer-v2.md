# Component — `FooterV2`

Lighter 2-column footer used on the SEO landing pages (`/a-level`, `/gcse`, `/igcse`). Same chrome as `Footer` (gradient bg, white inner card, decorative circles, contact banner) but with a left **brand + description + credibility badges + social** column and a right **Contact Info** column. No Curriculums/Subjects/GetHelp/AboutUs link lists.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\footerV2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\footerV2.tsx` |
| Used on | `/a-level`, `/gcse`, `/igcse` (in both repos) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<footer>
  <Box.background (bg-footer-fade, py: xs:30px md:60px, position relative)>
    ├─ Box.rightCircle (decorative, 135×135, top:70 right:60)
    ├─ Box.leftCircle  (decorative, 330/430×… bottom:0 left:-230)
    └─ Box.contanier (w-90%, rounded-10, bg-white/70, shadow-footer-card)
         ├─ Box.contactContanier (cyan strip, -mt-70)
         │     └─ Grid container spacing={2}
         │          ├─ Grid lg=1 md=1 sm=12 xs=12 → plan-icon disc (9vh circle white)
         │          ├─ Grid lg=5.5 md=5.5 sm=12 xs=12 → "Registered in UAE …" Typography subtitle1
         │          ├─ Grid lg=3 md=3 sm=12 xs=12 → phone-icon + "+971 …" Typography subtitle1
         │          └─ Grid lg=2.5 md=2.5 sm=12 xs=12 → PopUpButtonV2 "Book a Free Trial"
         ├─ Grid container columnSpacing={5} (mt: xs:30/sm:40/md:50/lg:60)
         │     ├─ Grid lg=6 md=6 sm=12 xs=12 → Logo + desc + credibility (3 lines green) + social
         │     └─ Grid lg=6 md=6 sm=12 xs=12 → "Contact Info" h + 3 contact lines
         ├─ <Divider /> (color:black, width:78%)
         └─ Typography "© 2024 Tuitional" (subtitle2, my: xs:15 sm:20 md:30 lg:40, text-center)
```

### Dimensions & spacing (footerV2.tsx lines 235-500)

| Element | Property | Value | Tailwind |
|---|---|---|---|
| `background` | `paddingY` | `{ xs:30px, md:60px }` | `py-[30px] md:py-[60px]` |
| `contanier` | `width` | `90%` | `w-[90%]` |
| `contanier` | `borderRadius` | `10px` | `rounded-[10px]` |
| `contanier` | `boxShadow` | (3-layer inset) | `shadow-footer-card` |
| `contanier` | `backgroundColor` | `rgba(255,255,255,0.7)` | `bg-white/70` |
| `contactContanier` | `padding` | `{ xs:10, sm:20, md:25, lg:30 }` | `p-[10px] sm:p-5 md:p-[25px] lg:p-[30px]` |
| `contactContanier` | `width` | `{ xs:80%, sm:80%, md:85% }` | `w-4/5 md:w-[85%]` |
| `contactContanier` | `marginTop` | `-70px` | `-mt-[70px]` |
| `imageContanier` | `width/height` | `9vh` (min `75px`, max `90px`) | `h-[9vh] w-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px]` |
| 2nd Grid container | `columnSpacing` | `5` (40px) | `gap-x-10` |
| 2nd Grid container | `marginY` | `{ xs:30, sm:40, md:50, lg:60 }` | `my-[30px] sm:my-10 md:my-[50px] lg:my-[60px]` |
| 2nd Grid container | `paddingLeft` | `{ xs:1rem, md:5vw }` | `ps-4 md:ps-[5vw]` |
| 2nd Grid container | `paddingRight` | `{ xs:1rem, md:2vw }` | `pe-4 md:pe-[2vw]` |
| `desc` | `marginTop` | `40px` | `mt-10` |
| `credibilityBox` | `marginTop` | `{ xs:20, lg:30 }` | `mt-5 lg:mt-[30px]` |
| `credibilityBox` | `marginBottom` | `20px` | `mb-5` |
| `credibilityText` | `marginBottom` | `8px` | `mb-2` |
| `heading` | `marginBottom` | `15px` | `mb-[15px]` |
| `heading` | `marginTop` | `12px` | `mt-3` |
| `text` (contact lines) | `lineHeight` | `{ xs:35, sm:40, md:40, lg:45 }` | `leading-[35px] sm:leading-10 md:leading-10 lg:leading-[45px]` |
| `rights` | `marginY` | `{ xs:15, sm:20, md:30, lg:40 }` | `my-[15px] sm:my-5 md:my-[30px] lg:my-10` |
| `<Divider>` | `width` | `78%` | `w-[78%]` |

### Typography

| Element | MUI variant | Mobile / Tablet / Desktop | Weight | Color | Font |
|---|---|---|---|---|---|
| `admissionText` ("Registered…") | `subtitle1` (statNumber) | `1.75rem` / `2.25rem` / `3rem` | `700` | `white` | `font-heading` |
| `phoneText` | `subtitle1` (statNumber) | `1.75rem` / `2.25rem` / `3rem` | `700` | `white` | `font-heading` |
| `contactButton` label | `MuiButton`-default | `1rem` / `1rem` / `1rem` | `700` | `#009BF5` | `font-heading` |
| `desc` | `body2` | `0.875rem` (all) | `400` | `#000000` | `font-body` |
| `credibilityText` (3 lines) | `body2` + override | `0.95rem` (`fontSize: 0.95rem`) | `600` | `#22C55E` (green) | `font-heading` |
| `heading` ("Contact Info") | `subtitle2` (statLabel) | `0.875rem` uppercase | `700` | inherit | `font-heading` |
| `text` (contact items) | `body2` | `0.875rem` | `400` | `black` | `font-body` |
| `rights` ("© 2024…") | `subtitle2` (statLabel) | `0.875rem` uppercase | `500` | inherit | `font-heading` |

### Colors

| Token | Value |
|---|---|
| Background gradient | `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)` → `bg-footer-fade` |
| Card bg | `rgba(255,255,255,0.7)` → `bg-white/70` |
| Card shadow | `5px -5px 8px rgba(0,0,0,0.15) inset, -6px 2px 8px rgba(0,0,0,0.15) inset, 0px 4px 4px rgba(0,0,0,0.25)` → `shadow-footer-card` |
| Contact strip bg | `rgba(56,182,255,1)` = `bg-brand-500` |
| Decorative circles | `#37B6FF` |
| CTA button bg | `white` |
| CTA button color | `#009BF5` |
| Credibility text | `#22C55E` (lime/green-500) |

### Grid breakpoint plan

Banner row: MUI `lg=1 / lg=5.5 / lg=3 / lg=2.5` (all sub-12 only at `lg`) → **stack below 1200 px** (mobile-first), 4-cell row at `lg+`.
Content row: MUI `lg=6 md=6` (both) → 2-col at `md+`, stacked below 900 px. (This is different from `Footer.tsx` which uses `lg=3` for 4-col).

→ Tailwind: `grid grid-cols-1 md:grid-cols-2 gap-x-10`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| FV1 | footerV2.tsx:14 | `const FooterV2: React.FC = async () => {` then `useI18n()` inside | `async` server-component cannot call client hook `useI18n`. Either remove `async` + add `"use client"`, or remove `useI18n`. **Runtime bug.** | critical |
| FV2 | footerV2.tsx:28 | Banner row uses `flex-col md:flex-row` | MUI uses Grid `lg=1/5.5/3/2.5`: stacks BELOW `lg` (1200), 4-cell at lg+. Port stacks below `md` (900). Wrong breakpoint. | high |
| FV3 | footerV2.tsx:30 | Plan icon disc: `h-[75px] w-[75px] lg:h-[85px] lg:w-[85px]` | MUI: `width/height: 9vh` with `min: 75px` / `max: 90px` — viewport-driven, NOT lg-breakpoint. Use `h-[9vh] w-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px]`. | high |
| FV4 | footerV2.tsx:48 | Tagline: `text-sm md:text-base` (≈14/16 px) | MUI: `<Typography variant="subtitle1">` → statNumber **1.75rem mobile / 2.25rem tablet / 3rem desktop** with `font-bold leading-[1]`. Port is dramatically smaller. | critical |
| FV5 | footerV2.tsx:64 | Phone: `text-sm md:text-base` | Same as FV4 — should be `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-bold`. | critical |
| FV6 | footerV2.tsx:75 | CTA button: missing `text-h4 font-bold` (MUI subtitle1) | MUI hardcodes `fontSize` via theme typography subtitle1 default. Add Tailwind font-size match. | medium |
| FV7 | footerV2.tsx:82 | Content row: `grid-cols-1 md:grid-cols-2 gap-8 md:gap-10` | MUI Grid `lg=6 md=6` → `md:grid-cols-2` correct. `columnSpacing={5}` (40 px) → `gap-x-10` only; `rowSpacing` not set so `gap-y-0`. Port adds `gap-8` (32 px row) — not from MUI. | medium |
| FV8 | footerV2.tsx:82 | `px-5 py-8 sm:px-8 md:px-[5vw]` | MUI: `paddingLeft: { xs: 1rem, md: 5vw }`, `paddingRight: { xs: 1rem, md: 2vw }`, `marginY: { xs:30, sm:40, md:50, lg:60 }`. Port uses `py-8` (32 px), missing the responsive marginY ladder. | high |
| FV9 | footerV2.tsx:96 | Desc: `text-sm` correct, but `mt-4` not `mt-10` (MUI `marginTop: 40px`) | Use `mt-10`. | high |
| FV10 | footerV2.tsx:104 | Credibility: `mt-4 lg:mt-6 gap-[6px]` | MUI: `marginTop: { xs:20, lg:30 }, marginBottom:20`, individual rows `marginBottom: 8px` (= `gap-2` close). Use `mt-5 lg:mt-[30px] mb-5 gap-2`. | medium |
| FV11 | footerV2.tsx:112 | Credibility text: `text-[0.9rem]` | MUI: `fontSize: 0.95rem` — close but use `text-[0.95rem]`. | low |
| FV12 | footerV2.tsx:120 | Social icons row: `mt-5 md:mt-4 gap-3` | MUI does NOT define a `socialBox` in footerV2 (different from footer.tsx). The port renders 3 fluency icons sized 36×36. Verify against MUI: MUI footerV2 has no social section (it has credibility badges instead). Inspect — possible drift adding social icons not in baseline. | medium |
| FV13 | footerV2.tsx:131 | Social icons sized 36×36 | MUI `styles.social` in footerV2 = `48×48` (same as footer.tsx). | medium |
| FV14 | footerV2.tsx:163 | Right column: "Contact Info" + 3 lines | MUI shows same content but renders with `Typography variant="body2"`. Port uses 20×20 icons + small text — MUI has plain text only (no icons). Drift. | medium |
| FV15 | footerV2.tsx:166 | "Contact Info" heading: `mb-4 mt-3` | MUI: `marginBottom: 15px, marginTop: 12px` → `mb-[15px] mt-3` (mt-3 = 12 px). Close, ok. | low |
| FV16 | footerV2.tsx:230 | `<hr className="w-[78%] border-t border-black" />` | Matches MUI Divider width 78%. | none |
| FV17 | footerV2.tsx:234 | Copyright: `my-5 sm:my-[30px] md:my-[50px] lg:my-[70px]` | MUI footerV2: `marginY: { xs:15, sm:20, md:30, lg:40 }` — port uses footer.tsx values (xs:20/sm:30/md:50/lg:70), NOT footerV2's smaller ladder. | medium |
| FV18 | footerV2.tsx:21 | Circles drop `flex display` from MUI (used `flex` for compat) | OK as drift; circles render. | none |

---

## §3 Corrected Tailwind classNames (key spots)

**Top: remove `async` + add `"use client"`** (since `useI18n` is a client hook):
```tsx
"use client";
// ...
const FooterV2: React.FC = () => {
  const { t, locale } = useI18n();
  // ...
};
```

**Banner row — 4 stacking breakpoint at lg:**
```tsx
<div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:gap-5">
  {/* plan icon, lg=1 (8.33%) */}
  <div className="flex w-full justify-center lg:w-[8.333%]">
    <div className="flex h-[9vh] w-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px] items-center justify-center rounded-full bg-white">
      {/* … */}
    </div>
  </div>
  {/* tagline, lg=5.5 (45.833%) */}
  <p className={`${leagueSpartan.className} w-full lg:w-[45.833%] text-center md:text-start text-white font-bold leading-[1] text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]`}>
    Registered in UAE • Established Since 2020 • Headquarters: Sharjah
  </p>
  {/* phone, lg=3 (25%) */}
  <div className="flex w-full lg:w-1/4 items-center justify-center lg:justify-start">
    <Image src={phone.src} … />
    <span className={`${leagueSpartan.className} ms-[10px] text-white font-bold leading-[1] text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]`}>
      +971 56 490 0376
    </span>
  </div>
  {/* CTA, lg=2.5 (20.833%) */}
  <div className="flex w-full lg:w-[20.833%] justify-center lg:justify-start">
    <PopUpButtonV2 text="Book a Free Trial" href="popup"
      className="block w-full rounded-[10px] bg-white px-[25px] py-[1.5vh] text-center leading-[23px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white md:px-[22px] md:py-[2vh] lg:px-[25px] lg:py-[2vh]" />
  </div>
</div>
```

**Content grid:**
```tsx
<div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-10 ps-4 pe-4 md:ps-[5vw] md:pe-[2vw] my-[30px] sm:my-10 md:my-[50px] lg:my-[60px]">
  {/* … */}
</div>
```

**Copyright row (footerV2 ladder):**
```tsx
<p className={`${leagueSpartan.className} text-sm font-medium uppercase leading-[1.4] tracking-[0.05em] my-[15px] sm:my-5 md:my-[30px] lg:my-10 text-center text-ink-900`}>
  © 2024 Tuitional
</p>
```

## §4 Verification at 4 widths

- **375 px**: banner stacks (plan disc / tagline 1.75rem / phone 1.75rem / CTA full-width); content grid 1-col; tagline visible centered.
- **768 px**: banner still stacked (below `lg`); content `md:grid-cols-2` (2-col Logo+Contact).
- **1280 px**: banner becomes 4-cell row; content 2-col with `5vw` left padding.
- **1920 px**: same as 1280 with looser horizontal breathing room.

## §5 RTL notes

- Banner row at `lg:flex-row` needs `rtl:flex-row-reverse` so plan icon appears on the right.
- Tagline `text-center md:text-start` will work automatically (CSS `start` flips with `dir`).
- `ms-[10px]` / `pe-[2vw]` / `ps-[5vw]` already RTL-aware.
- Phone-row `flex` reverses automatically with `dir="rtl"` if `flex-row-reverse` rule applied.
