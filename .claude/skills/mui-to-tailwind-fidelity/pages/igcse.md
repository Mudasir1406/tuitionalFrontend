# Page — `/igcse`

IGCSE marketing landing page (V2 / `HeaderV3` family). Same skeleton as `/a-level` and `/gcse`, with two notable differences:

1. Uses `BenifitsSection` (V1, not V2) for the benefits section.
2. The FAQs use the older `<Faqs>` from `@/components/home/faqs` wrapped with **extra horizontal margin** (`mx: 10` = 80px) rather than `<FrequentlyQuestions>`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\igcse\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\igcse\page.tsx` |
| Arabic variant | (no `/ar/igcse` route.) |

## §1 Section sequence (MUI source)

```tsx
<Box className={leagueSpartan.className} sx={{ overflowX, width: "100%", minHeight: "100vh", ... }}>
  <HeaderV3 />
  <CountdownTimer />

  {/* Hero — same as a-level / gcse */}
  <Box sx={styles.heroContainer}><Box sx={styles.heroWrapper}>
    <Grid container spacing={3} sx={styles.heroGrid}>
      <Grid item xs={12} sm={12} md={12} lg={6}><HeroV2 data={heroData} withForm bulletPoints={heroBulletPoints} /></Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}><FormV2 /></Grid>
    </Grid>
  </Box></Box>

  <Box sx={styles.verticalMargin}><SchoolLogosSection /></Box>
  <Box sx={styles.verticalMargin}><TutorSectionV2 data={tutorSectionData} /></Box>
  <Box sx={styles.verticalMargin}><SectionsBox /></Box>                                  {/* V1 */}
  <Box sx={styles.verticalMargin}><TrustpilotCarousel text="..." /></Box>
  <Box sx={styles.verticalMargin}><BenifitsSectionV2 data={benefitsSectionData} /></Box>  {/* note: imports BenifitsSection V1 in alias */}
  <Box sx={styles.verticalMargin}><PopularIgcseSubjectsV2 title="Popular IGCSE Subjects We Cover" headerTag="h2" /></Box>
  <Box sx={styles.verticalMargin}><StudentSaysV2 data={studentSaysData} /></Box>
  <Box sx={styles.verticalMargin}><SectionsBox /></Box>                                   {/* V1 second instance */}
  <Box sx={styles.verticalMargin}><GetStartedV2 /></Box>

  <Box sx={{ ...styles.verticalMargin, mx: 10 }}>                                          {/* mx: 10 ≈ 80px */}
    <Faqs />                                                                                {/* from @/components/home/faqs */}
  </Box>

  <FooterV2 />
</Box>
```

**Differences vs a-level / gcse:**
- Uses `SectionsBox` (V1) where a-level/gcse use `SectionsBoxV2`.
- The `BenifitsSectionV2` alias imports from `BenifitsSection` (V1) — see line 52-56 of the MUI source.
- Final FAQs section uses `<Faqs>` (the home-page FAQ component) wrapped in `mx: 10` (80px horizontal margin). a-level/gcse use `<FrequentlyQuestions>` with no extra `mx`.
- Imports `FormV2Dialog` but does not render it.

## §2 Page-level layout rhythm

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| `styles.verticalMargin` | `my: 3` | `my-6` |
| `styles.heroContainer` | `pt: { xs: 3, lg: 4 }`, `minHeight: { xs: "auto", lg: "90vh" }`, `px: { xs: 2, lg: 6 }` | `flex items-center justify-center px-4 pt-6 lg:min-h-[90vh] lg:px-12 lg:pt-8` |
| `styles.heroWrapper` | `maxWidth: 1400` | `w-full max-w-[1400px]` |
| Heading container around FAQs | `{ ...verticalMargin, mx: 10 }` | `my-6 mx-20` |

## §3 Container / max-width rules

- Hero capped at 1400px.
- FAQs wrapper carries 80px (`mx-20`) horizontal margin in addition to `my-6` — easy to miss in port. Verify the FAQ block looks narrower than the surrounding sections.

## §4 Section components used

Same as [a-level.md §4](./a-level.md), with these substitutions:
- `<SectionsBox>` (V1) — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\sectionsbox.tsx`
- `<BenifitsSectionV2>` alias → `<BenifitsSection>` V1 — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\benifts-section\BenifitsSection.tsx`
- `<Faqs>` (instead of `<FrequentlyQuestions>`) — `tuitionalFrontend-mui-baseline\src\components\home\faqs.tsx`

## §5 Tailwind port status

Audit `tuitionalFrontend\src\app\igcse\page.tsx`:

- Verify the FAQs wrapper has `my-6 mx-20` (or `my-6 mx-[80px]`), NOT just `my-6` — otherwise the FAQ block stretches edge-to-edge instead of pulling in.
- Verify `<SectionsBox>` (V1) is imported, not `<SectionsBoxV2>`. They look similar but render differently.
- The `<Faqs>` from `home/faqs` has its own internal layout — do not wrap with additional padding.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 1280+ the FAQ block visibly insets by 80px on both sides. At 375px `mx-20` is 80px out of 375 — leaves only 215px of width. Verify FAQs look intentional at mobile width (might need a `lg:mx-20` only — but MUI applies `mx: 10` without breakpoint qualifier, so preserve the literal mapping unless QA flags it).

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "IGCSE Tutoring | Tuitional",
  description: "Get the best IGCSE tutoring at Tuitional.",
  robots: {
    index: false, follow: false, nocache: true,    // currently noindex
    googleBot: { index: false, follow: false, noimageindex: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};
```

**The IGCSE page is `noindex` in the baseline** — preserve this in the port. Removing `robots: index: false` would expose an unfinished page to search engines.
