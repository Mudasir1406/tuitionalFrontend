# Component — `GradeSubjectLevelV2`

**Active variant on production /online/[slug] pages.** Same orchestration role as v1, but routes sections by `name.includes(...)` (substring match) instead of switch-case equality. Adds 6 new section names: `hero_section_with_form`, `igcse_in_dubai`, `link_list`, `igcse_tutoring_program`, `school_logos`, `tutor_program`, `book_demo_cta`, `why_igsce` (typo preserved). Iterates `Object.entries(data)` and renders each.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\grade-subject-level-v2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\grade-subject-level-v2.tsx` |
| Arabic variant | `ar-grade-subject-level-v2.tsx` |

## §1 MUI source — extracted properties

### Layout tree (key cases)

```
Header
{Object.entries(data).map([key, value]) =>
  switch (key.includes):
    hero_section:
      Box sx={heroContanier}
        Grid container sx={{ marginTop: { md: "2vh", lg: "18vh" } }}
          Grid item lg=6 → <Hero/>
          <HeroInfo/>
    book_demo_cta: Box sx={verticalMargin}><SectionsBox/>
    with_form (the form-bearing hero):
      Box sx={heroContanier}
        Box sx={{ marginTop:{md:"2vh", lg:"18vh"}, width:"100%" }}
          Grid container gap={4} sx={heroDiv}  // alignItems:center, padding:"100 0"
            Grid item lg=6 → <Hero withForm/>
            Grid item lg=5 sx={{margin:"24px 0"}} → <Form/>
    igcse_in_dubai:   Box sx={verticalMargin}><BenifitsOfStudyingSection/>
    link_list:        Box sx={verticalMargin}><LinkListViewSection/>
    igcse_tutoring_program (isShow): <BenifitsSection/>  // NO verticalMargin wrapper
    school_logos:     Box sx={verticalMargin}><SchoolLogosSection/>
    tutor_section:    Box sx={verticalMargin}><TutorSection/>
    tutor_program:    Box sx={verticalMargin}><TutoringProgramSection/>
    main_content:     Box sx={verticalMargin}><MainContent/>
    phone_cta:        Box sx={phoneContanier}><Box sx={phoneBackground}/><PhoneCta/>
    demo_pointers:    Box sx={verticalMargin}><DemoPointers/>
    popular_subjects: Box sx={verticalMargin}><PopularSubjects/>
    education_counseling: Box sx={verticalMargin}><EducationalCounseling/>
    why_igsce:        Box sx={verticalMargin}><WhyChoose/>
    what_our_student_says: Box sx={verticalMargin}><StudentSays/>
    blog_CTA:         Box sx={verticalMargin}><BlogCta/>
    Faqs:             Box sx={verticalMargin}><FrequentlyQuestions/>
    what_we_offer (isShow): Box sx={verticalMargin}><Offer/>
    get_started (isShow): Box sx={verticalMargin}><GetStarted/>
}
ServerFooter
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg | xl |
|---|---|---|---|---|---|---|
| `verticalMargin` | marginY | 5vh | — | 10vh | 10vh | — |
| `heroContanier` (v2) | paddingTop | 120px | 120px | 120px | 0 | 0 |
| `heroContanier` (v2) | height | 100% | — | — | 100vh | — |
| `heroContanier` (v2) | display/align | flex/center (NOT end like v1) | — | — | — | — |
| `heroContanier` (v2) | marginX | 3vw | 3vw | — | 0 | — |
| Inner `Grid container` for plain hero | marginTop | — | — | 2vh | 18vh | — |
| `with_form` inner wrapper | marginTop | — | — | 2vh | 18vh | — |
| `with_form` Grid container | gap | 32px (gap={4}) | — | — | — | — |
| `with_form` `<Form/>` item | margin | 24px 0 (always) | — | — | — | — |
| `heroDiv` | padding | "100 0" (= 100px 0; MUI parses as numbers if no unit then px, so 100px top/bottom) | — | — | — | — |
| `phoneContanier` | paddingBottom | 5vh | — | — | — | — |

### Typography
n/a — orchestrator.

### Colors

Same `phoneBackground` gradient. No other inline colors on this layer.

### Animations / interactions
None.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 73-74 | `HERO_CONTAINER_CLS = "relative mx-[3vw] flex h-full items-center pt-[120px] sm:mx-[3vw] sm:pt-[120px] md:pt-[120px] lg:mx-0 lg:h-screen lg:pt-0"` | `items-center` matches v2. ✓ | OK |
| B2 | 86 | hero wrapped in `<div className="bg-gradient-to-b from-[#EDF8FF] to-white">` | Same drift as v1; MUI does **not** apply a tinted background. | Med (visual drift) |
| B3 | 88 | `<div className="grid w-full grid-cols-1 md:mt-[2vh] lg:mt-[10vh] lg:grid-cols-2">` | MUI marginTop is `md: 2vh, lg: 18vh` — port uses `lg: 10vh` instead of `lg: 18vh`. | **High** (8vh top margin lost on lg) |
| B4 | 75-76 | `WITH_FORM_CONTAINER_CLS = "relative flex w-full items-center bg-[#EDF8FF] pt-[5vh] pb-[8vh] lg:min-h-[calc(100vh-90px)] lg:pt-[10vh]"` | MUI uses `heroContanier` (same as plain hero) — same `pt-[120px] sm:pt-[120px] md:pt-[120px] lg:pt-0` and `h-screen lg:`. Port diverges substantially: uses `bg-[#EDF8FF]` solid, `pt-[5vh]`, `pb-[8vh]` and `lg:min-h-[calc(100vh-90px)] lg:pt-[10vh]`. | High (different paddingTop math, has solid bg) |
| B5 | 111 | `<div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-4 px-[5vw] py-[4vh] lg:grid-cols-12">` | MUI is `Grid container gap={4}` (gap-4 ✓), but uses `<Grid item lg={6}>` (= `lg:grid-cols-2`, not `lg:grid-cols-12`); inner items are `lg={6}` and `lg={5}` (sum 11/12). Port models as 12-col with `lg:col-span-6` / `lg:col-span-5` (lines 114, 116) — actually that maps correctly. | Low (modeling via 12-col grid is equivalent to lg=6/lg=5) |
| B6 | 115 | `<div className="my-6 lg:col-span-5">` Form wrapper | matches `sx={{ margin: "24px 0" }}` (my-6 = 24px ✓) | OK |
| B7 | 113 | `<Hero data=... withForm />` — but **MUI v2 with_form passes `<Hero …>` not `<HeroV2 …>`** | The Tailwind port also uses `<Hero …/>` here; **note** that MUI `heroV2.tsx` exists with bullet points + CheckCircle for the with_form case, but v2 calls plain `Hero`. This is consistent — `Hero withForm` shows a centered subtitle line, not the bullet points. If bulletPoints are needed, swap to `HeroV2`. | Low (inconsistency carried over) |
| B8 | 134-138 | `igcse_tutoring_program`: bare `<BenifitsSection>` no wrapper | matches MUI (which also has no `verticalMargin` here) | OK |

## §3 Corrected Tailwind classNames

Key changes:

```tsx
// hero_section block — match MUI marginTop lg:18vh
<div className="grid w-full grid-cols-1 md:mt-[2vh] lg:mt-[18vh] lg:grid-cols-2">

// with_form block — match heroContanier instead of bespoke wrapper
<div className="relative flex h-full items-center mx-[3vw] pt-[120px] sm:pt-[120px] md:pt-[120px] lg:mx-0 lg:h-screen lg:pt-0">
  <div className="w-full md:mt-[2vh] lg:mt-[18vh]">
    <div className="grid grid-cols-1 items-center gap-8 p-[100px_0] lg:grid-cols-12">
      <div className="lg:col-span-6"><Hero data={...} withForm /></div>
      <div className="my-6 lg:col-span-5"><Form /></div>
    </div>
  </div>
</div>
```

(`gap={4}` in MUI is 32px → `gap-8`, not `gap-4` (16px). Verify — MUI Grid `gap={4}` = `theme.spacing(4)` = `4×8 = 32px`.)

## §4 Verification at 4 widths

- **375**: hero `pt-[120px]`, items-center, mx-[3vw]. with_form grid stacks 1 col, p-[100px_0] vertical pad.
- **768**: same pt-[120px], 1 col still.
- **1280**: pt-0, h-screen, 2 cols. Inner Grid `mt-[18vh]` (180px on 1000px viewport) — port currently shows 100px (10vh).
- **1920**: same as lg+.

## §5 RTL notes

`ar-grade-subject-level-v2.tsx` mirrors structurally. The Hero/Form column order should flip in RTL (Form on the left visually). Use `dir="rtl"` at the root + `flex-row-reverse` if Tailwind grid order needs explicit swap. The hero grid `lg:grid-cols-12` does not auto-reverse — apply `lg:[direction:rtl]` or reorder children manually.
