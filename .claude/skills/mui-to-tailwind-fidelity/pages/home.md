# Example 02 — Home Page (`/`) Section Rhythm

The `/` route assembles a fixed sequence of marketing sections. This file documents the **inter-section spacing** the MUI baseline applies. Verify these rhythm values whenever fixing the home page, and reuse the pattern on `/about`, `/careers`, `/testimonials`, `/contact`, the curriculum routes, etc.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\page.tsx` |

---

## §1 Section sequence (MUI)

```tsx
<Header />
<Container sx={styles.contanier}>
  <div className={style["grid-container"]}>
    <div className={style["hero"]}><Filter data={filterData} /></div>
    <div className={style["hero-picture"]}>
      <div className={style["image-container"]}><Image .../></div>
      <Info />
    </div>
  </div>
</Container>
<Trusted />
<Box sx={styles.verticalMargin}>
  <GetStarted data={getStarted} />
</Box>
<OurClient data={data} />
<Box sx={styles.backgroundImage}>
  <Container sx={{ maxWidth: { lg: "1450px" } }}>
    <Faqs />
  </Container>
</Box>
<Box sx={styles.verticalMargin}>
  <ContactUs filterData={filterData} />
</Box>
<ServerFooter />
```

## §2 Rhythm tokens used on this page

| MUI variable | Definition (from `page.tsx:228-287`) | Where applied | Tailwind |
|---|---|---|---|
| `styles.verticalMargin` | `{ marginY: { xs: "5vh", md: "10vh" } }` | Wraps `<GetStarted>` and `<ContactUs>` | `my-[5vh] md:my-[10vh]` |
| `styles.contanier` (sic) | `{ maxWidth: { lg: "1650px" }, paddingTop: { xs/sm/md: "120px", lg/xl: "70px" }, minHeight: { xs: "100%", lg: "100vh" }, display: "flex", alignItems: "end" }` | Hero container | `mx-auto flex min-h-full items-end pt-[120px] lg:min-h-screen lg:max-w-[1650px] lg:pt-[70px]` |
| `Container sx={{ maxWidth: { lg: "1450px" } }}` (inline on FAQs) | `lg:max-w-[1450px]` | FAQs container | `mx-auto lg:max-w-[1450px]` |
| `styles.backgroundImage::before` | Decorative line image, mobile: `lineSmall.png` at `bottom: 90%/83%/80%`, height `25vw`. Desktop: `faqLine.webp` at `bottom: -90px`, height `281px` | Behind FAQs section | Use two absolutely-positioned `<div>` siblings with `bg-cover bg-top bg-no-repeat`, swapping at `lg:` |

## §3 Inter-section rhythm (the visible vertical gaps)

| Pair | MUI gap | Tailwind |
|---|---|---|
| `<Header>` → `<Container>` hero | 70-120px top padding on container (no margin between) | `pt-[120px] lg:pt-[70px]` on hero container |
| Hero `<Container>` → `<Trusted>` | None — `<Trusted>` follows directly | No class |
| `<Trusted>` → `<GetStarted>` | `marginY: { xs: "5vh", md: "10vh" }` on GetStarted wrapper | `my-[5vh] md:my-[10vh]` |
| `<GetStarted>` → `<OurClient>` | Above wrapper's `marginY` is the only gap | (already covered) |
| `<OurClient>` → `<Faqs>` | None (Faqs has its own decorative bg) | No class |
| `<Faqs>` → `<ContactUs>` | `marginY: { xs: "5vh", md: "10vh" }` on ContactUs wrapper | `my-[5vh] md:my-[10vh]` |
| `<ContactUs>` → `<ServerFooter>` | Same wrapper margin | (already covered) |

**The rhythm template for any page section break:** `my-[5vh] md:my-[10vh]` (mobile = 5vh, desktop ≥900 = 10vh). Use this on the section wrapper, not as a spacer div.

## §4 Current Tailwind port status

The home page port at `tuitionalFrontend\src\app\page.tsx` is **mostly correct**:

| MUI value | Tailwind class | Status |
|---|---|---|
| `paddingTop: { xs: "120px", sm: "120px", md: "120px", lg: "70px", xl: "70px" }` | `pt-[120px] sm:pt-[120px] md:pt-[120px] lg:pt-[70px] xl:pt-[70px]` | ✓ (redundant `sm:` and `md:` can be dropped since they match xs — but no behavior change) |
| `minHeight: { xs: "100%", lg: "100vh" }` | `min-h-full lg:min-h-screen` | ✓ |
| `maxWidth: { lg: "1650px" }` on container | `lg:max-w-[1650px]` | ✓ |
| `display: "flex", alignItems: "end"` | `flex items-end` | ✓ |
| `marginY: { xs: "5vh", md: "10vh" }` (used twice) | `my-[5vh] md:my-[10vh]` | ✓ |
| `maxWidth: { lg: "1450px" }` on FAQs container | `lg:max-w-[1450px]` | ✓ |
| `backgroundImage::before` (the decorative FAQ line) | Two absolute `<div>` siblings | ✓ (well-translated — different approach but visually identical) |

**Verdict**: the home page layout itself doesn't need fixes. The spacing complaints likely live INSIDE each section component (`<Filter>`, `<Info>`, `<Trusted>`, `<GetStarted>`, `<OurClient>`, `<Faqs>`, `<ContactUs>`, `<ServerFooter>`), not in `page.tsx`. Audit each component using the methodology in [SKILL.md](../SKILL.md) Phase 1-3.

### §4b Hero grid-container — mobile horizontal margin

MUI/Tailwind `page.module.css` `.grid-container` defaults to `margin: 0 28px` (≥576). At `max-width: 575px` the MUI source resets to `margin: 0` — no horizontal padding on phones. Result: `<Filter>` content touches viewport edges on xs.

Fix in [page.module.css](src/app/page.module.css) xs media query:
```css
@media (max-width: 575px) {
  .grid-container { margin: 0 16px; }  /* was: 0 */
}
```

This is an intentional divergence from MUI (which has `0`). Keep the 28px at sm+ to match.

### §4a Header heroClassName (REQUIRED)

The home `/` is a **Fix B padding-top hero page** (uses `pt-[120px] lg:pt-[70px]` on hero container). Per QUICKFIX §6 and [[header]] §5, it must pass `heroClassName` to `<Header>` so the decorative gradient strip matches MUI:

```tsx
<Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />
```

Default `DEFAULT_HERO_BG` (`h-[90px] sm:h-[100px] lg:h-[110px] bg-[#EDF8FF]`) is a solid-color fallback for non-hero pages and produces a visible color seam under the hero gradient.

## §5 Rhythm template to copy onto any page

When porting any new page (e.g. `/igcse`, `/about`, `/careers`), use this skeleton:

```tsx
<>
  <Header />

  {/* Hero — paddingTop varies, no margin-bottom */}
  <div className="mx-auto flex items-end pt-[120px] lg:max-w-[1650px] lg:pt-[70px]">
    <HeroSection />
  </div>

  {/* Content sections — each wrapped with the rhythm class */}
  <SectionDirectlyAfterHero />  {/* no extra margin */}

  <div className="my-[5vh] md:my-[10vh]">
    <NextSection />
  </div>

  <SectionWithoutWrapper />  {/* if it has its own internal margins */}

  <div className="my-[5vh] md:my-[10vh]">
    <PenultimateSection />
  </div>

  <ServerFooter />
</>
```

Rules:
1. **Hero** is always first, padding-top compensates for sticky header (70-120px).
2. The hero **never** has a bottom margin — the next section determines spacing via its own `my-[5vh] md:my-[10vh]` wrapper, or sits flush.
3. The **footer** never has a top margin — the last content section does.
4. Most pairs of sections are separated by `my-[5vh] md:my-[10vh]`. Some sections (`<Trusted>`, `<OurClient>`, `<Faqs>`) have **built-in vertical padding** and flow without an extra wrapper margin — check each component's MUI source before wrapping.

## §6 Verification

After applying the rhythm template:
- **375px**: 5vh gap between sections (≈ 33px on a 667px-tall viewport). Should feel "tight, mobile-economical".
- **768px**: 5vh (≈ 51px on a 1024-tall viewport) — md hasn't kicked in yet (md=900).
- **1280px**: 10vh (≈ 80px on an 800-tall laptop). Should feel "spacious, desktop-confident".
- **1920px**: 10vh (≈ 108px on a 1080 desktop).

Open both `localhost:3001/` (MUI) and `localhost:3000/` (Tailwind) side-by-side and step through. The vertical gaps should match within ±4px at every device.
