# Page — `/about`

Static "About Us" marketing page. Hero with `<Hero>` + `<HeroInfo>` on the right (handled by a CSS-Modules `grid-container`), then four full-width content sections wrapped in `<Grid sx={...}>` containers.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\about\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\about\page.tsx` |
| Arabic variant | `/ar/about` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}><Hero /></div>
    <div className={styles["hero-picture"]}><HeroInfo /></div>
  </div>
</div>

<Grid sx={style.aboutUsContainer}>      <AboutUs /> </Grid>
<Grid sx={style.whyChooseContainer}>    <WhyChooseTuitional /> </Grid>
<Grid sx={style.getStartedContainer}>   <GetStarted data={getStarted} /> </Grid>
<Grid sx={style.studentSaysContainer}>  <StudentSays data={studentSays} /> </Grid>
<Footer />
```

## §2 Page-level layout rhythm

| Section wrapper | MUI value | Tailwind translation |
|---|---|---|
| `.aboutUsContainer` | `background: linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))`, `paddingX: { xs: 24px, sm: 24px, md: 3vw, lg: 6vw }` | `bg-gradient-to-b from-[#D7F0FF] to-white/70 px-6 sm:px-6 md:px-[3vw] lg:px-[6vw]` |
| `.whyChooseContainer` | `paddingX: { xs: 24px, sm: 24px, md: 3vw, lg: 6vw }`, `marginY: { xs: 5vh, md: 10vh }` | `my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]` |
| `.getStartedContainer` | same as whyChoose | same |
| `.studentSaysContainer` | `background: #9EDCFF`, `paddingY: { xs: 5vh, md: 10vh }` | `bg-[#9EDCFF] py-[5vh] md:py-[10vh]` |

Hero positioning lives in `about.module.css` (`styles.container` + `styles["grid-container"]` + `styles.hero` + `styles["hero-picture"]`). Module CSS is reused by both repos. Not translated to Tailwind classes — both ports import the same module file.

## §3 Container / max-width rules

- The hero container uses `about.module.css .container` (`height: 100vh; display: flex; justify-content: flex-end; align-items: center; max-width: 90vw at lg+`). The inner `.grid-container` has `margin: 0 28px` — NOT 4vw/5vw side padding (prior spec text was wrong).
- No `<Container maxWidth>` wrapper on the content sections — instead, each `<Grid>` has its own `paddingX` ladder (`24px → 24px → 3vw → 6vw`).
- Sticky-header compensation is via `.hero { padding-top }` in `about.module.css` — NOT a paddingTop ladder on `.container` (prior spec text was wrong). Values: 5vh (≤575px) / 15vh (576–767px) / 10vh (768–991px) / 0 (≥1200px). The 992–1199px band has no padding-top (commented out in source).

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\about\hero\hero.tsx`
- `<HeroInfo>` — `tuitionalFrontend-mui-baseline\src\components\about\hero-info.tsx`
- `<AboutUs>` — `tuitionalFrontend-mui-baseline\src\components\about\about-us.tsx`
- `<WhyChooseTuitional>` — `tuitionalFrontend-mui-baseline\src\components\about\why-choose-tuitional.tsx`
- `<GetStarted>` — `tuitionalFrontend-mui-baseline\src\components\home\get-started.tsx` (shared)
- `<StudentSays>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\students-says.tsx` (shared)
- `<Footer>` — `tuitionalFrontend-mui-baseline\src\components\footer-wrapper.tsx`

## §5 Header structural difference (CRITICAL)

MUI `<Header>` outer Box is `position: "absolute"` — takes **zero** flow space. Hero container starts at top of viewport; `height: 100vh` occupies full screen.

Tailwind `<Header>` is `position: sticky` in normal flow — takes up `calc(2vh + 72px)` at xs, `calc(2vh + 80px)` at sm+. Without compensation, `.container { height: 100vh }` overflows and hero content starts too far down.

**Fix applied:**
1. `about.module.css .container`: `margin-top: calc(-2vh - 72px)` (xs), `calc(-2vh - 80px)` (≥600px) — pulls container up by exactly the sticky header height.
2. `about/page.tsx`: Pass `heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70"` to `<Header />` — matches MUI outer Box height ladder and gradient (vs wrong solid `#EDF8FF` default).
3. `header.tsx` decorative strip: `z-0` → `z-[-1]` — strip must paint BEHIND hero content, not on top. MUI `circleBox` is `zIndex: -2`.

## §6 Tailwind port status

The port (`tuitionalFrontend\src\app\about\page.tsx`) faithfully translates the four section wrappers:

- Line 36: `bg-gradient-to-b from-[#D7F0FF] to-white/70 px-6 sm:px-6 md:px-[3vw] lg:px-[6vw]` — matches `style.aboutUsContainer`.
- Line 39: `my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]` — matches `style.whyChooseContainer`.
- Line 42: same — matches `style.getStartedContainer`.
- Line 45: `bg-[#9EDCFF] py-[5vh] md:py-[10vh]` — matches `style.studentSaysContainer`.

No discrepancies at page level. Audit each section component separately for intra-component fidelity.

## §7 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375px: hero fills full viewport with gradient strip behind it (no visible seam at header join). At 1280+ side padding kicks up to `6vw`. The `#9EDCFF` Student Says block has no top/bottom margin — its vertical breathing room comes from the `paddingY: 5vh/10vh`.

## §8 SEO / metadata

No `metadata` export in MUI source. Title/description are managed at layout level. No JSON-LD on this page.
