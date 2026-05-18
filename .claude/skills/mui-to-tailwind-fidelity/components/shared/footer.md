# Example 06 — `<Footer>`

The site footer — dense, multi-column, responsive. Used on every public page.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\footer.tsx` (200+ lines) |
| Tailwind port | `tuitionalFrontend\src\components\footer.tsx` |

This example focuses on the **structural** properties — exact column counts at each breakpoint, the inter-column gaps, and the typography. The hundred-line footer markup itself is too long to quote in full; read the source files directly.

---

## §1 MUI source — structural properties

### Outer chrome (`styles.background`, `styles.contanier`)

Read `tuitionalFrontend-mui-baseline\src\components\footer.tsx` after line 220 for the full `styles` object. Key values:

- Background gradient: `bg-footer-fade` (already in tailwind.config.ts → `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)`)
- Two decorative circles (`leftCircle`, `rightCircle`) — absolute-positioned. Use the existing `animate-left-circle` / `animate-right-circle` Tailwind animations if present in MUI.

### Top contact strip (the "Get In Touch" row above the columns)

| Element | MUI | Tailwind translation |
|---|---|---|
| `<Grid container spacing={2}>` (16px) | flex row | `flex items-center justify-center gap-4` |
| Logo image grid item: `<Grid item lg={1} sm={12}>` | full-width below lg, 1/12 at lg+ | `w-full lg:w-[8.33%]` (1/12 ≈ 8.33%) |
| Admission text grid item: `<Grid item lg={6}>` | hidden below lg (no `sm/md` value means default 12) | `w-full lg:w-1/2` |
| Admission text MUI variant | `<Typography variant="subtitle1">` (3rem stat-number) | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-heading` |
| Phone block grid item: `<Grid item lg={3}>` | 1/4 at lg+ | `w-full lg:w-1/4` |
| Phone number MUI variant | `<Typography variant="h2">` (3rem desktop) — UNUSUAL choice for a phone number | `text-h2-mobile sm:text-h2-tablet lg:text-h2 font-heading` |
| CTA button grid item: `<Grid item lg={2}>` | 1/6 at lg+ | `w-full lg:w-[16.67%]` |

### Column grid (the four-column link section below the strip)

The full row uses **`<Grid container columnSpacing={5}>` (gap-10 = 40px)**.

| Column | MUI Grid item | Visible at | Tailwind |
|---|---|---|---|
| Logo + tagline + social | `<Grid item lg={3} sm={12}>` | full-width below lg, 1/4 at lg+ | `w-full lg:w-1/4` |
| Curriculums | `<Grid item lg={3} sm={6} xs={6}>` | half-width below lg, 1/4 at lg+ | `w-1/2 lg:w-1/4` |
| Subjects | `<Grid item lg={3} sm={6} xs={6}>` | half-width below lg, 1/4 at lg+ | `w-1/2 lg:w-1/4` |
| (other column — depends on which page; varies) | similar `lg={3} sm={6}` | same | same |

Container-level responsive padding/margin:

```ts
marginTop: { xs: "70px", sm: "80px", md: "90px", lg: "100px" }   // top of column row
paddingLeft: { xs: 0, md: "5vw" }
paddingRight: "2vw"
width: { xs: "100%", sm: "100%" }
```

→ Tailwind: `mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[100px] md:ps-[5vw] pe-[2vw] w-full`

### Typography in columns

| Element | MUI | Tailwind |
|---|---|---|
| Column heading ("Curriculums", "Subjects", …) | `<Typography variant="subtitle2">` → 14px stat-label uppercase | `text-stat-label uppercase font-heading` |
| Description paragraph | `<Typography variant="body2">` → 14px | `text-small font-body` |
| Social icons | `style={styles.social}` — typically ~20-30px | match MUI's exact px size — read styles object |

### `<FooterLinks>` sub-component

Each link list uses gap and padding from `FooterLinks/FooterLinks.tsx` — read separately if links look misaligned.

---

## §2 The common bugs in the footer port

Without the corrected diff (footer is too long to quote), apply this checklist when reviewing `tuitionalFrontend\src\components\footer.tsx`:

| # | Check | Common drift |
|---|---|---|
| F1 | Top contact row breaks to column on mobile | Tailwind often uses `flex-col lg:flex-row`. MUI's `<Grid container>` w/ `lg=1 sm=12` → full-width below lg. Correct. |
| F2 | Admission text typography size | MUI uses `subtitle1` = stat-number (3rem). Tailwind sometimes uses `text-h2` or `text-h3` — wrong. Must be `text-stat-number-*`. |
| F3 | Phone number typography size | MUI uses `variant="h2"` (3rem). Tailwind sometimes uses `text-h4` — wrong. Must be `text-h2-*`. |
| F4 | Column row gap | MUI `columnSpacing={5}` = 40px. Tailwind sometimes uses `gap-4` (16) or `gap-6` (24) — too tight. Use `gap-10`. |
| F5 | Column breakpoint | MUI `lg={3} sm={6}` → 4 cols at lg+, 2 cols at sm-md. Tailwind sometimes uses `md:grid-cols-2 lg:grid-cols-4` (the md break is at 900 not 600). Use `sm:grid-cols-2 lg:grid-cols-4`. |
| F6 | Top margin | MUI `marginTop: { xs: 70, sm: 80, md: 90, lg: 100 }`. Tailwind often uses a single `mt-20`. Use the full responsive ladder. |
| F7 | Footer card box-shadow | MUI uses inset `5px -5px 8px 0px rgba(0,0,0,0.15) inset, -6px 2px 8px 0px rgba(0,0,0,0.15) inset, 0px 4px 4px 0px rgba(0,0,0,0.25)`. Tailwind has `shadow-footer-card` for this. Use it. |
| F8 | Decorative animated circles | MUI uses inline `animation: "leftCircleAnimation 2s ease-in-out infinite"`. Tailwind has `animate-left-circle` / `animate-right-circle` (already in config). Apply them. |
| F9 | RTL flex direction | The footer renders many flex rows. Each must have `flexDirection: isRTL ? "row-reverse" : "row"`. Translate to `rtl:flex-row-reverse`. |

---

## §3 Reusable column-grid template

For any multi-column footer-style section:

```tsx
<div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-[70px] sm:mt-[80px] md:mt-[90px] lg:mt-[100px] w-full pe-[2vw] md:ps-[5vw]">
  {/* Col 1: brand+social (full-width on mobile, 1/4 at lg) — needs custom span */}
  <div className="col-span-2 lg:col-span-1">…</div>

  {/* Col 2-4: link lists (half-width below lg, 1/4 at lg+) */}
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>
```

The trick: brand column wants `col-span-2` (full width) below lg but normal `col-span-1` at lg. Encode as `col-span-2 lg:col-span-1`.

---

## §4 Verification

After applying footer fixes, walk through the 20-device matrix in [03-responsiveness.md](../03-responsiveness.md). Pay particular attention to:

- **iPad Mini (768px)**: brand column should be full-width, links columns should be 2-up (2 cols of links).
- **Laptop S (1280px)**: 4-column layout with brand on the left.
- **Surface Duo (540px)**: same as mobile (brand full-width, links 2-up).
- **Nest Hub (1024 × 600)**: short viewport — footer may need scroll. Verify the inter-column `gap-10` (40px) doesn't push content under the fold awkwardly.
- **RTL at every width**: column order reverses; brand should appear on the right at lg+.

---

## §5 Known issues + fixes

### Phone number row wraps on small mobile (≤375px)

MUI applies `<Typography variant="h2">` (22/28/36px) to the inline phone number. At xs that's 22px bold; combined with `width: 80%` on `.contactContanier` and the phone icon, the string `+971 56 490 0376` ends up just over the available width on a 320–375px viewport and wraps to two lines.

Fix in the Tailwind port: downsize the mobile font and force `whitespace-nowrap`. Also shrink the phone icon at mobile so it doesn't steal width:

```tsx
<Image
  src={phone.src}
  alt="phone"
  className="block h-6 w-6 sm:h-8 sm:w-8 lg:h-auto lg:w-auto shrink-0"
/>
<span className="mx-[10px] whitespace-nowrap text-white font-bold leading-none tracking-[-0.01em]
                 text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[2.25rem]">
  +971 56 490 0376
</span>
```

This is intentionally a divergence from the strict MUI triplet — MUI's stock h2 mobile size produces a layout bug at xs. Keep the desktop value (`lg:text-[2.25rem]`) identical to MUI.

### Footer overall too tall + fonts too small on desktop

Two independent forces pile up: MUI's outer `paddingY: { xs: 40, md: 100 }` + inner grid `marginTop: { xs: 70, sm: 80, md: 90, lg: 100 }` + socialBox `marginBottom: 80` + copyright `marginY: { xs: 20, sm: 30, md: 50, lg: 70 }` adds up to a footer that occupies ~1.5 viewports tall on a 1080 desktop. Plus tightening fonts to `text-small` (14px) per MUI body2 made desktop look anemic.

Compress aggressively at every breakpoint. Visual goal: fits in a single laptop viewport (1280×800) without scrolling within the footer itself.

| Element | MUI source | Compressed Tailwind |
|---|---|---|
| Outer wrapper py | `paddingY: { xs: 40px, md: 100px }` | `py-6 md:py-[40px]` |
| Inner grid mt | `mt-[70px] sm:mt-20 md:mt-[90px] lg:mt-[100px]` | `mt-8 sm:mt-10 md:mt-10 lg:mt-10` |
| socialBox mt / mb | `mt-10 lg:mt-[70px]` / `mb-20` | `mt-4 lg:mt-6` / `mb-4 lg:mb-6` |
| desc mt | `mt-10` | `mt-6` |
| Copyright my | `my-5 sm:my-[30px] md:my-[50px] lg:my-[70px]` | `my-3 sm:my-4 md:my-4 lg:my-5` |
| Section heading font | `text-sm` | `text-sm lg:text-base` |
| About-us item font + leading | `text-sm leading-[35–45px]` | `text-sm lg:text-base leading-[24–30px]` |
| `<FooterLinks>` `<p>` | `text-body` + `leading-[35–45px]` | `text-small lg:text-base leading-[24–30px]` |

### Single-row banner layout (lg) + mobile center alignment

Original port used fixed-percentage Grid widths (`lg:w-[8.333%]/45.833%/29.167%/16.667%`) on 4 children = 100%. Combined with `gap-4` (3 gaps × 16px = 48px) → overflowed and **wrapped on lg**. Reference design has all four items inline on lg.

Fix:
```tsx
<div className="flex w-full flex-wrap items-center justify-center gap-4 lg:flex-nowrap lg:justify-between lg:gap-4">
  <div className="flex w-full justify-center lg:w-auto lg:shrink-0">{/* plane */}</div>
  <div className="w-full text-center md:text-start lg:flex-1 lg:min-w-0">{/* admission text */}</div>
  <div className="w-full lg:w-auto lg:shrink-0">{/* phone */}</div>
  <div className="flex w-full justify-center lg:w-auto lg:shrink-0">{/* enroll */}</div>
</div>
```

Key: drop fixed percentages → `lg:w-auto lg:shrink-0` on rigid items + `lg:flex-1 lg:min-w-0` on the text. `lg:flex-nowrap` forces single row.

**Mobile center alignment bug**: `<span text-center ms-[10px]>` is an *inline* element — `text-center` only centers text inside the span itself, not within its parent. The `ms-[10px]` then shifts everything off-center. Fix: hoist `text-center md:text-start` to the wrapper `<div>`; drop `ms-[10px]` at xs, keep `md:ms-[10px]` for desktop start spacing.

### Banner — tuned values (matches design reference)

After three iterations (full MUI → over-compressed → tuned → single-row), these values match the deployed `tuitionaledu.com/` reference and fit one row on lg:

| Element | Value |
|---|---|
| `.contactContanier` padding | `p-[12px] sm:p-4 md:p-[20px] lg:p-[24px]` |
| `.contactContanier` `-mt` | `-mt-[50px]` |
| Plane circle | `h-[70px] min-h-[70px] max-h-[85px] lg:h-[80px]` |
| Plane image (inner) | `width: 44px, height: 52px, marginTop: 8px` |
| Admission text | `text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem]` (20/24/28/30px) — fits single row with phone + CTA |
| Phone icon | `h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11` |
| Phone number | `text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.625rem]` (16/20/24/26px) |
| Enroll CTA | `px-[18px] py-[12px] text-[0.875rem] md:px-[22px] md:py-[14px] md:text-[1rem] lg:w-auto lg:px-[24px] lg:py-[14px] lg:text-[1rem]` |
| Inner grid mt | `mt-10 sm:mt-12 md:mt-12 lg:mt-12` |
| socialBox mt / mb | `mt-6 lg:mt-8` / `mb-6 lg:mb-8` |
| Copyright my | `my-4 sm:my-5 md:my-5 lg:my-6` |

Net effect: banner reads big and confident at desktop without dwarfing the link grid; mobile stays compact.

### Banner ("Admissions Are Open …") compression

The blue banner with plane icon + admission text + phone + Enroll button is the biggest single height-consumer. MUI uses `variant="subtitle1"` (3rem at lg = 48px) for the admission text + `variant="h2"` (36px at lg) for the phone — combined with `h-[9vh]` (~80px) plane circle and `py-2vh` button padding, the banner alone takes 200+px at lg.

Compressed banner:

| Element | Original | Compressed |
|---|---|---|
| `.contactContanier` padding | `p-[10px] sm:p-5 md:p-[25px] lg:p-[30px]` | `p-[10px] sm:p-4 md:p-[16px] lg:p-[18px]` |
| `.contactContanier` `-mt` | `-mt-[70px]` (banner overlaps -70 above parent) | `-mt-[40px]` |
| Plane circle | `h-[9vh] min-h-[75px] max-h-[90px]` (~80–90px) | `h-[60px] lg:h-[70px]` with smaller inner plane image (36×44 not 50×60) |
| Admission text | `text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]` (28/36/48px) | `text-[1.125rem] sm:text-[1.375rem] md:text-[1.5rem] lg:text-[1.75rem]` (18/22/24/28px) |
| Phone number | `text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[2.25rem]` | `text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] lg:text-[1.375rem]` |
| Enroll CTA | `px-[25px] py-[1.5vh] leading-[23px]` | `px-[16px] py-[10px] text-[0.875rem] leading-[18px]` |

This is an intentional, heavy divergence from strict MUI fidelity. The MUI desktop footer renders ~1000px tall on a 1080 monitor; compressed version is ~500–600px. Mobile spacing is unchanged from prior compression pass.

### Link-list vertical spacing too tall

MUI `.text` lineHeight is `35/40/40/45px` on a `variant="body2"` (14px) font → rows render ~21–31px taller than the glyphs. Cumulative effect on a 10-item list is a footer that scrolls a lot. Tighten without breaking MUI fidelity on the heading hierarchy:

| Token | MUI source | Tighter Tailwind |
|---|---|---|
| `<FooterLinks>` `<p>` | `text-body` + `leading-[35px] sm:leading-[40px] md:leading-[40px] lg:leading-[45px]` | `text-small leading-[26px] sm:leading-[30px] md:leading-[32px] lg:leading-[35px]` |
| `<aboutUs>` items in `footer.tsx` | same | same |

Notes:
- `body2` = 14px → use `text-small`, not `text-body` (16px).
- Verify side-by-side with MUI; if MUI's tall lineHeight is intentional, revert. The current port trades strict parity for usable density.
