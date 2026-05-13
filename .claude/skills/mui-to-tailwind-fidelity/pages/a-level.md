# Page — `/a-level`

A-Level marketing landing page (V2 / `HeaderV3` family). Two-column hero (HeroV2 + FormV2) at the top, then 10 sequenced sections (logos, tutors, sectionsbox, trustpilot, benefits, popular subjects, video reviews, second sectionsbox, get started, FAQs). Sibling pages `/gcse` and `/igcse` use the same skeleton with different copy.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\a-level\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\a-level\page.tsx` |
| Arabic variant | (no `/ar/a-level` route in baseline.) |

## §1 Section sequence (MUI source)

```tsx
<Box className={leagueSpartan.className} sx={{ overflowX: "hidden", width: "100%", minHeight: "100vh", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
  <HeaderV3 />
  <CountdownTimer />

  {/* Hero — two columns lg+, stacked below */}
  <Box sx={styles.heroContainer}>
    <Box sx={styles.heroWrapper}>
      <Grid container spacing={3} sx={styles.heroGrid}>
        <Grid item xs={12} sm={12} md={12} lg={6}><HeroV2 data={heroData} withForm bulletPoints={heroBulletPoints} /></Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}><FormV2 /></Grid>
      </Grid>
    </Box>
  </Box>

  <Box sx={styles.verticalMargin}><SchoolLogosSection /></Box>
  <Box sx={styles.verticalMargin}><TutorSectionV2 data={tutorSectionData} /></Box>
  <Box sx={styles.verticalMargin}><SectionsBoxV2 /></Box>
  <Box sx={styles.verticalMargin}><TrustpilotCarousel title="What Our A-Level Students Say" text="..." /></Box>
  <Box sx={styles.verticalMargin}><BenifitsSectionV2 data={benefitsSectionData} /></Box>
  <Box sx={styles.verticalMargin}><PopularIgcseSubjectsV2 title="Popular A-Level Subjects We Cover" headerTag="h2" /></Box>
  <Box sx={styles.verticalMargin}><StudentSaysV2 data={studentSaysData} title="Video Testimonials from Our A-Level Students" /></Box>
  <Box sx={styles.verticalMargin}><SectionsBoxV2 /></Box>            {/* second instance */}
  <Box sx={styles.verticalMargin}><GetStartedV2 /></Box>
  <Box sx={styles.verticalMargin}><FrequentlyQuestions data={faqsData} /></Box>

  <FooterV2 />
</Box>
```

## §2 Page-level layout rhythm

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| Outer Box | `overflowX: "hidden", width: "100%", minHeight: "100vh"` + font smoothing | `overflow-x-hidden w-full min-h-screen antialiased` + `leagueSpartan.className` |
| `styles.verticalMargin` | `my: 3` (24px) — **simplified, not `5vh/10vh`** | `my-6` |
| `styles.heroContainer` | `pt: { xs: 3, lg: 4 }` (24/32px), `minHeight: { xs: "auto", lg: "90vh" }`, `display: flex`, `alignItems: center`, `justifyContent: center`, `px: { xs: 2, lg: 6 }` (16/48px) | `flex items-center justify-center px-4 pt-6 lg:min-h-[90vh] lg:px-12 lg:pt-8` |
| `styles.heroWrapper` | `width: "100%", maxWidth: 1400` | `w-full max-w-[1400px]` |
| `styles.heroGrid` | `alignItems: "center"` + `spacing={3}` (24px gap) | `grid grid-cols-1 items-center gap-6 lg:grid-cols-2` |
| `styles.heroContent` | `display: flex, flexDirection: column` | `flex flex-col` |
| `styles.formWrapper` | `pt: { xs: 0, lg: 0 }` (no padding) | (omit — defaults are zero) |

**The whole V2 family (a-level, gcse, igcse) uses `my-6` (24px) between sections, NOT the `my-[5vh] md:my-[10vh]` rhythm from the home page.** Do not "fix" this by applying the home rhythm — it would visually break the dense V2 layout.

## §3 Container / max-width rules

- Hero wrapper capped at `1400px` (`max-w-[1400px]`) with `px-4 lg:px-12` gutters.
- `lg:grid-cols-2` for hero split (HeroV2 on the left, FormV2 on the right) — corresponds to MUI `lg={6}`. **Do not** use `md:grid-cols-2` here.
- The `CountdownTimer` is in normal flow (not fixed), so the hero's `pt-6` is small (24px) rather than the marketing-page `pt-[120px]` ladder.

## §4 Section components used

- `<HeaderV3>` — `tuitionalFrontend-mui-baseline\src\components\header-v3.tsx`
- `<CountdownTimer>` — `tuitionalFrontend-mui-baseline\src\components\countdown\CountdownTimer.tsx`
- `<HeroV2>` (with form) — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\heroV2.tsx`
- `<FormV2>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\form\formV2.tsx`
- `<SchoolLogosSection>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx`
- `<TutorSectionV2>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\TutorSectionV2.tsx`
- `<SectionsBoxV2>` (×2) — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\sectionsboxV2.tsx`
- `<TrustpilotCarousel>` — `tuitionalFrontend-mui-baseline\src\components\trustpilot-carousel\TrustpilotCarousel.tsx`
- `<BenifitsSectionV2>` (sic) — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\benifts-section\BenifitsSectionV2.tsx`
- `<PopularIgcseSubjectsV2>` — `tuitionalFrontend-mui-baseline\src\components\curiculume\popular-igcse-subjects-v2.tsx`
- `<StudentSaysV2>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\students-says-v2.tsx`
- `<GetStartedV2>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\get-started-v2.tsx`
- `<FrequentlyQuestions>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\faqs.tsx`
- `<FooterV2>` — `tuitionalFrontend-mui-baseline\src\components\footerV2.tsx`

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\a-level\page.tsx`) is a faithful translation:

- Line 152: `flex items-center justify-center px-4 pt-6 lg:min-h-[90vh] lg:px-12 lg:pt-8` — matches `styles.heroContainer`.
- Line 153: `w-full max-w-[1400px]` — matches `styles.heroWrapper`.
- Line 154: `grid grid-cols-1 items-center gap-6 lg:grid-cols-2` — correct breakpoint inversion (MUI `lg={6}` → Tailwind `lg:grid-cols-2`).
- Lines 169-214: `my-6` on every section wrapper — matches MUI `my: 3`.

No discrepancies at page level. **Note**: the outer `<Box className={leagueSpartan.className} sx={{ overflowX: "hidden", ... }}>` translated to a div with corresponding Tailwind classes — verify the `antialiased` and `leagueSpartan` font are both applied at the root.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375 and 768 the hero is a single column (HeroV2 stacked above FormV2). At 1280+ the two-column split kicks in. Section gap stays at 24px (`my-6`) regardless of viewport — visibly tighter than the marketing pages.

## §7 SEO / metadata

No `metadata` export — relies on root layout. Hero data, FAQs, bullet points, and tutor filter data are all hardcoded at the top of the page file (not from Firestore).
