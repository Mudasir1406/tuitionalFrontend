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

- The hero uses the standard CSS-Modules `container` (4vw/5vw side padding via `about.module.css`).
- No `<Container maxWidth>` wrapper on the content sections — instead, each `<Grid>` has its own `paddingX` ladder (`24px → 24px → 3vw → 6vw`).
- Sticky-header compensation lives in `about.module.css .container` (paddingTop ladder typical to all marketing pages: 120/150/200/0/0 px).

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\about\hero\hero.tsx`
- `<HeroInfo>` — `tuitionalFrontend-mui-baseline\src\components\about\hero-info.tsx`
- `<AboutUs>` — `tuitionalFrontend-mui-baseline\src\components\about\about-us.tsx`
- `<WhyChooseTuitional>` — `tuitionalFrontend-mui-baseline\src\components\about\why-choose-tuitional.tsx`
- `<GetStarted>` — `tuitionalFrontend-mui-baseline\src\components\home\get-started.tsx` (shared)
- `<StudentSays>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\students-says.tsx` (shared)
- `<Footer>` — `tuitionalFrontend-mui-baseline\src\components\footer-wrapper.tsx`

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\about\page.tsx`) faithfully translates the four section wrappers:

- Line 36: `bg-gradient-to-b from-[#D7F0FF] to-white/70 px-6 sm:px-6 md:px-[3vw] lg:px-[6vw]` — matches `style.aboutUsContainer`.
- Line 39: `my-[5vh] px-6 sm:px-6 md:my-[10vh] md:px-[3vw] lg:px-[6vw]` — matches `style.whyChooseContainer`.
- Line 42: same — matches `style.getStartedContainer`.
- Line 45: `bg-[#9EDCFF] py-[5vh] md:py-[10vh]` — matches `style.studentSaysContainer`.

No discrepancies at page level. Audit each section component separately for intra-component fidelity.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375px the gradient-tinted `aboutUsContainer` should sit flush after the hero. At 1280+ side padding kicks up to `6vw`. The `#9EDCFF` Student Says block has no top/bottom margin — its vertical breathing room comes from the `paddingY: 5vh/10vh`.

## §7 SEO / metadata

No `metadata` export in MUI source. Title/description are managed at layout level. No JSON-LD on this page.
