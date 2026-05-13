# Page — `/curiculume` (sic — intentional misspelling)

Legacy curriculum landing page (V1). Very long section list — hero + 18 follow-on sections wrapped in bare `<Grid>` elements (no per-section `marginY`). Uses two layered background images behind the `<MathsSubjects>` block.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\curiculume\page.tsx` |
| Tailwind port | **NOT YET PORTED** — no `tuitionalFrontend\src\app\curiculume\page.tsx` exists. |
| Arabic variant | (no `/ar/curiculume` route.) |

**Do not rename `curiculume` → `curriculum`** during the port — imports and routes depend on the misspelled slug.

## §1 Section sequence (MUI source)

```tsx
<Header />
<Container sx={{
  width: { lg: "100%", sm: "100%" },
  paddingTop: { xs: "120px", sm: "150px", md: "200px", lg: 0, xl: 0 },
  height: { xs: "100%", lg: "100vh" },
  display: "flex", alignItems: "end",
}}>
  <Grid container>
    <Grid item lg={6} md={12} sm={12} xs={12}><Hero /></Grid>
    <Grid item lg={6} md={12} sm={12} xs={12} sx={{ position: "relative", "::before": { backgroundImage: `url(${curiculumeImage.src})`, ... } }}>
      <HeroInfo />
    </Grid>
  </Grid>
</Container>

<Grid><SectionsBox /></Grid>

{/* Layered backgrounds for MathsSubjects */}
<Grid container sx={{
  backgroundImage: `url(${subjectIGC.src})`,
  backgroundPosition: "center",
  height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "60vh" },
  width: "100%", backgroundRepeat: "no-repeat", position: "relative",
}}>
  <Grid container sx={{
    backgroundImage: `url(${circleIGC.src})`,
    backgroundPosition: "right",
    backgroundSize: "contain",
    height: { xs: "120vh", sm: "50vh", md: "100vh", lg: "70vh" },
    width: "100%", backgroundRepeat: "no-repeat", position: "absolute", right: 0,
  }}>
    <MathsSubjects />
  </Grid>
</Grid>

<Grid><CAIE /></Grid>
<Grid><IGCSMath /></Grid>
<Grid><GradingScale /></Grid>
<Grid><AssessmentObjective /></Grid>
<Grid><SubjectOfferings /></Grid>
<Grid><Offer /></Grid>
<Grid><FeaturesOfTuitionals /></Grid>
<Grid><TutorsDifferent /></Grid>
<Grid><Pricing /></Grid>
<Grid><StudentSays /></Grid>
<Grid><TuitionalCompetitors /></Grid>
<Grid sx={{ marginX: "3vh" }}><GetStarted data={getStarted} /></Grid>     {/* mx: 3vh */}
<Grid><FrequentlyQuestions /></Grid>
<Grid><JoinUs /></Grid>
<Grid><Footer /></Grid>
```

## §2 Page-level layout rhythm

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| Outer `<Container>` (hero) | `paddingTop: { xs: 120, sm: 150, md: 200, lg: 0, xl: 0 }px`, `height: { xs: 100%, lg: 100vh }`, `display: flex, alignItems: end` | `flex items-end h-full lg:h-screen pt-[120px] sm:pt-[150px] md:pt-[200px] lg:pt-0` |
| MathsSubjects layered bg (outer) | `height: { xs: 120vh, sm: 50vh, md: 100vh, lg: 60vh }`, `background: subjectIGC, position: center` | `h-[120vh] sm:h-[50vh] md:h-[100vh] lg:h-[60vh] bg-[url(...)] bg-center bg-no-repeat relative` |
| MathsSubjects layered bg (inner) | `height: { xs: 120vh, sm: 50vh, md: 100vh, lg: 70vh }`, `background: circleIGC, position: right, size: contain, position: absolute, right: 0` | `h-[120vh] sm:h-[50vh] md:h-[100vh] lg:h-[70vh] bg-[url(...)] bg-right bg-contain bg-no-repeat absolute right-0` |
| GetStarted wrapper | `marginX: "3vh"` | `mx-[3vh]` |
| All other section wrappers | bare `<Grid>` — no spacing | `<div>` with no class |

**No inter-section `marginY` at page level** — every section component owns its own vertical rhythm. This is unlike `/a-level` (which has uniform `my-6` page-level wrappers).

## §3 Container / max-width rules

- Hero `<Container>` has `width: { lg: "100%", sm: "100%" }` — effectively full-width override of MUI Container's default cap. Translation: do NOT use `lg:max-w-[1450px]` here; this page wants the hero to span the viewport.
- Hero column split: `<Grid item lg={6} md={12} sm={12} xs={12}>` — **two cols only at `lg` (1200px+)**. Tailwind: `grid-cols-1 lg:grid-cols-2`. Do NOT use `md:grid-cols-2`.

## §4 Section components used

All under `tuitionalFrontend-mui-baseline\src\components\curiculume\`:
- `<Hero>`, `<HeroInfo>`, `<SectionsBox>`, `<MathsSubjects>`, `<CAIE>`, `<IGCSMath>`, `<GradingScale>`, `<AssessmentObjective>`, `<SubjectOfferings>`, `<Offer>`, `<FeaturesOfTuitionals>`, `<TutorsDifferent>`, `<Pricing>`, `<StudentSays>`, `<TuitionalCompetitors>`, `<FrequentlyQuestions>`, `<JoinUs>`
- Plus shared `<GetStarted>` from `components/home/get-started.tsx`
- `<Footer>` (footer-wrapper)

## §5 Tailwind port status

**Not ported yet.** When porting:

1. Translate the hero `<Container sx>` to `<div className="flex items-end h-full lg:h-screen pt-[120px] sm:pt-[150px] md:pt-[200px] lg:pt-0">`.
2. Replace the two `<Grid item lg={6} md={12}>` with `<div className="grid grid-cols-1 lg:grid-cols-2">` — pay attention to **lg-only** column split.
3. Keep the MathsSubjects layered background structure (relative outer + absolute inner) with the height ladder verbatim.
4. The dense `<Grid><Section /></Grid>` list translates to bare `<div><Section /></div>` (no class). Section components own their rhythm.
5. The single `<Grid sx={{ marginX: "3vh" }}><GetStarted /></Grid>` wrapper translates to `<div className="mx-[3vh]">`.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

The layered-bg block has aggressive `vh` heights — at 375 (mobile in portrait) it's `120vh` tall, which on a 667-tall iPhone SE is 800px. At 1280 (laptop, lg+) it drops to `60vh` (`480px`). Verify the `<MathsSubjects>` content stays vertically centered against the background.

## §7 SEO / metadata

No `metadata` export. No JSON-LD. This page is legacy and may eventually be deprecated in favor of the V2 curriculum landing pages (`/a-level`, `/gcse`, `/igcse`).
