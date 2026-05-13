# Component — `GradeSubjectLevel` (v1)

Page-level orchestrator for `/[slug]` grade-subject-level pages. Routes a sequence of section names (`"Hero Section"`, `"Main Content"`, `"Phone CTA "` (sic — trailing space), `"Tutor Section"`, `"Demo Pointers"`, `"Popular Subjects"`, `"Education Counseling"`, `"What our Student Says"`, `"Blog CTA"`, `"FAQs"`, `"what we offer"`, `"get started"`) to dedicated section components based on a Firestore `Component_Sequence_Type`. Composes `Hero` + `HeroInfo` in a 50/50 grid for the hero, then renders each subsequent section inside a `verticalMargin` spacer. v1 is the legacy variant — v2 (`-v2.tsx`) is used on the live dynamic `/online/[slug]` page.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\grade-subject-level.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\grade-subject-level.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\ar-grade-subject-level.tsx` (and Tailwind side) |

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Header />
  {sequence.sections.sort(...).map(section =>
    <section style={{ all: "unset" }}>
      switch(section.name):
        "Hero Section":
          <Box sx={styles.heroContanier}>
            <Grid container>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Hero data={...} />
              </Grid>
              <HeroInfo image=... imageAltText=... />  // contains its own Grid item lg={6}
            </Grid>
          </Box>
          <SectionsBox />
        "Main Content":      <Box sx={verticalMargin}><MainContent /></Box>
        "Phone CTA ":        <Box sx={phoneContanier}><Box sx={phoneBackground} /><PhoneCta /></Box>
        "Demo Pointers":     <Box sx={verticalMargin}><DemoPointers /></Box>
        "Popular Subjects":  <Box sx={verticalMargin}><PopularSubjects /></Box>
        "Education Counseling":<Box sx={verticalMargin}><EducationalCounseling /></Box>
        "What our Student Says":<Box sx={verticalMargin}><StudentSays /></Box>
        "Blog CTA":          <Box sx={verticalMargin}><BlogCta /></Box>
        "FAQs":              <Box sx={verticalMargin}><FrequentlyQuestions /></Box>
        "what we offer":     <Box sx={verticalMargin}><Offer /></Box>
        "get started":       <Box sx={verticalMargin}><GetStarted /></Box>
    </section>
  )}
  <ServerFooter />
```

### Dimensions & spacing

| Element | Property | Mobile (xs) | Tablet (sm) | md | Desktop (lg) | xl |
|---|---|---|---|---|---|---|
| `heroContanier` | paddingTop | 120px | 150px | 200px | 0 | 0 |
| `heroContanier` | height | 100% | — | — | 100vh | — |
| `heroContanier` | marginX | 3vw | 3vw | — | 0 | — |
| `heroContanier` | display/align | flex/end | — | — | — | — |
| `verticalMargin` (every non-hero section wrapper) | marginY | 5vh | — | 10vh | 10vh | — |
| `phoneContanier` | position/paddingBottom | relative / 5vh | — | — | — | — |
| `phoneBackground` | position/zIndex | absolute / -1 | — | — | — | — |

### Typography
n/a — orchestrator only.

### Colors

| MUI value | Tailwind token |
|---|---|
| `linear-gradient(0deg, #9EDCFF 29.51%, rgba(158,220,255,0.959175) 34.02%, ... 70.49%)` (phone bg) | Inline `style` arbitrary — no token; preserve string verbatim |

### Animations / interactions
None at this layer.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 65 | `<div className="bg-gradient-to-b from-[#EDF8FF] to-white">` wrapping the hero container | MUI has **no** gradient background on the v1 hero container — only `heroContanier` flexbox. The blue fade is from the page background, not this wrapper. | Med (visual drift — extra tint behind hero) |
| B2 | 66 | `items-center` on heroContainer | MUI uses `alignItems: "end"` (`items-end`) — only the v2 variant uses `alignItems: "center"` | High (hero content vertical anchoring wrong) |
| B3 | 66 | `pt-[120px] sm:pt-[120px] md:pt-[120px]` | MUI: `xs: 120px, sm: 150px, md: 200px` — port collapses tablet/md to mobile | High (mobile/tablet hero top offset wrong) |
| B4 | 66 | `lg:h-screen` (`100vh`) | matches `lg: "100vh"` | OK |
| B5 | 67 | `<div className="grid w-full grid-cols-1 md:mt-[2vh] lg:mt-[10vh] lg:grid-cols-2">` | MUI has `<Grid container>` with no top margin and no md spacer — the `md:mt-[2vh] lg:mt-[10vh]` is a port-only addition; ok to keep if visually equivalent but not in MUI | Low (port-only; consider removing) |
| B6 | 67 | `lg:grid-cols-2` | matches `<Grid item lg={6}>` correctly | OK |
| B7 | 83, 106, 114, 122, 130, 138, 146, 154, 161, 167 | `my-[5vh] md:my-[10vh]` | matches `marginY: { xs: "5vh", md: "10vh" }` | OK |
| B8 | 103-110 | `case "Tutor Section":` block | MUI v1 does **not** include a `"Tutor Section"` case (it's commented out in MUI) — port adds a tutor section case which is not in MUI v1. | Low (intentional port enhancement; matches v2) |

## §3 Corrected Tailwind classNames

```tsx
// case "Hero Section":
{data?.hero_section && (
  <div className="relative flex h-full items-end mx-[3vw] pt-[120px] sm:pt-[150px] md:pt-[200px] lg:mx-0 lg:h-screen lg:pt-0">
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      <Hero data={data?.hero_section} />
      <HeroInfo image={...} imageAltText={...} />
    </div>
  </div>
)}
<SectionsBox />
```

Remove the wrapper gradient `bg-gradient-to-b from-[#EDF8FF] to-white` unless explicitly required by design.

## §4 Verification at 4 widths

- **375px** (xs): hero with `pt-[120px]`, mx-[3vw], items-end. SectionsBox visible below. All subsequent sections separated by `my-[5vh]` (~37px on 750px tall viewport).
- **768px** (sm/md): `pt-[150px]` at sm=768, `pt-[200px]` at md=900+. Hero still 1 col.
- **1280px** (lg): `pt-0`, `h-screen` hero, 2 cols (Hero left half, HeroInfo right half). `my-[10vh]` between sections.
- **1920px** (xl): same as lg behavior; layout doesn't change above 1200px.

## §5 RTL notes

AR variant exists at `ar-grade-subject-level.tsx`. Layout structurally identical but:
- The hero grid order should reverse (HeroInfo first visually on the right when reading right-to-left). MUI sets `direction: "rtl"` on inner Box; Tailwind side needs `dir="rtl"` on the root container or the `rtl:` modifiers (e.g. `rtl:[direction:rtl]`).
- All `mx-[3vw]` and `pt-*` mirror correctly under MUI Emotion RTL plugin; on Tailwind side, prefer `ms-/me-` if asymmetric, but symmetric `mx-` is unaffected.
- `phoneBackground` gradient direction (`0deg`) is direction-agnostic.
