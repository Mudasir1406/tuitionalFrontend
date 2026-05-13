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
