# Page — `/maincuriculume` (sic — intentional misspelling)

Legacy main-curriculum overview page. Hero with a layered foreground icon strip (Personalized Learning / Interactive Classes / Mentorship Programs) floating in `position: absolute` below the hero, then 7 sequential bare `<Grid>` sections.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\maincuriculume\page.tsx` |
| Tailwind port | **NOT YET PORTED** — no `tuitionalFrontend\src\app\maincuriculume\page.tsx` exists. |
| Arabic variant | (no `/ar/maincuriculume` route.) |

## §1 Section sequence (MUI source)

```tsx
<Header />

<Box sx={{
  width: { lg: "100%", sm: "100%" },
  paddingTop: { xs: "120px", sm: "150px", md: "200px", lg: 0, xl: 0 },
  height: { xs: "100%", lg: "100vh" },
  display: "flex", alignItems: "end",
  position: "relative",
}}>
  <Grid container>
    <Grid item lg={6} md={12} sm={12} xs={12}><Hero /></Grid>
    <Grid item lg={6} md={12} sm={12} xs={12} sx={{
      position: "relative",
      "::before": {
        backgroundImage: `url(${mainImage.src})`,
        backgroundPosition: "bottom", backgroundSize: "contain",
        height: { xs: "50vh", sm: "100vh", md: "80vh", lg: "70vh" },
        width: "100%", backgroundRepeat: "no-repeat",
        position: "absolute", bottom: 60, zIndex: 1,
      },
    }}>
      <HeroInfo />
    </Grid>
  </Grid>
</Box>

{/* Floating icon strip — positioned ABSOLUTE relative to the hero's parent */}
<Box sx={{
  display: "flex", alignItems: "center",
  background: "rgba(255, 255, 255, 0.70)",
  boxShadow: "0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20) inset",
  backdropFilter: "blur(5px)",
  width: "140vh", height: "10vh",
  padding: "0 0 0 14vh",
  position: "absolute", bottom: 120,
  gap: "2rem",
}}>
  <Box sx={style.icontxt}><Image src={personal} ... /><Typography sx={{ fontSize: "2.4vh", fontWeight: 600 }}>Personalized Learning</Typography></Box>
  <Box sx={style.icontxt}><Image src={interactive} ... /><Typography sx={{ fontSize: "2.4vh", fontWeight: 600 }}>Interactive Classes</Typography></Box>
  <Box sx={style.icontxt}><Image src={memo} ... /><Typography sx={{ fontSize: "2.4vh", fontWeight: 600 }}>Mentorship Programs</Typography></Box>
</Box>

<Grid><HomeCurriculume /></Grid>
<Grid><CurriculumOverview /></Grid>
<Grid><NeedExpertGuidence /></Grid>          {/* sic */}
<Grid><DetailedCurriculum /></Grid>
<Grid><Benifit /></Grid>                      {/* sic */}
<Grid><StudentsSay /></Grid>
<Grid><JoinUs /></Grid>
<Footer />
```

## §2 Page-level layout rhythm

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| Hero `<Box>` | `paddingTop: { xs: 120, sm: 150, md: 200, lg: 0 }px`, `height: { xs: 100%, lg: 100vh }`, `display: flex, alignItems: end, position: relative` | `flex items-end relative h-full lg:h-screen pt-[120px] sm:pt-[150px] md:pt-[200px] lg:pt-0` |
| Hero right column `::before` | `height: { xs: 50vh, sm: 100vh, md: 80vh, lg: 70vh }`, `bottom: 60`, `zIndex: 1`, `backgroundImage: mainImage` | Use absolutely-positioned `<div>` sibling with `h-[50vh] sm:h-[100vh] md:h-[80vh] lg:h-[70vh] bottom-[60px] z-10 bg-[url(...)] bg-bottom bg-contain bg-no-repeat absolute w-full` |
| Icon strip `<Box>` | `width: 140vh`, `height: 10vh`, `padding: 0 0 0 14vh`, `position: absolute, bottom: 120`, `gap: 2rem`, glassmorphic bg | `flex items-center w-[140vh] h-[10vh] pl-[14vh] absolute bottom-[120px] gap-8 bg-white/70 backdrop-blur-[5px] shadow-[...]` |
| Icon `<Typography>` | `fontSize: "2.4vh", fontWeight: 600` | `text-[2.4vh] font-semibold` |
| All other section wrappers | bare `<Grid>` | `<div>` with no class |

Notable use of `vh` units for the icon strip — `140vh` width on a 800px-tall viewport is 1120px. On a 1080-tall desktop it's 1512px. Verify the strip behaves on portrait orientation.

## §3 Container / max-width rules

- No `<Container>` cap — hero spans full width.
- Hero column split: `lg={6} md={12}` → Tailwind `lg:grid-cols-2`, **not** `md:grid-cols-2`.
- Floating icon strip is `position: absolute` — its parent must have `position: relative` (the hero `<Box>` does). The strip overlaps the hero's bottom and the start of `<HomeCurriculume>`.

## §4 Section components used

All under `tuitionalFrontend-mui-baseline\src\components\maincuriculume\`:
- `<Hero>`, `<HeroInfo>`, `<HomeCurriculume>`, `<CurriculumOverview>`, `<NeedExpertGuidence>`, `<DetailedCurriculum>`, `<Benifit>` (sic), `<StudentsSay>`, `<JoinUs>`
- `<Footer>` (footer-wrapper)

Also imports `personal`, `interactive`, `memo` SVG icons from `public/assets/images/svg/`.

## §5 Tailwind port status

**Not ported yet.** When porting:

1. Match the hero's `position: relative` so the floating icon strip can position itself.
2. Use `lg:grid-cols-2` (NOT `md:grid-cols-2`) for the hero split.
3. Translate the hero right-column `::before` to a dedicated absolutely-positioned `<div>` sibling — `::before` is hard to author in Tailwind without `before:` arbitrary classes; an explicit sibling is cleaner.
4. The icon strip is glassmorphic with two inset shadows — keep `bg-white/70 backdrop-blur-[5px] shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)_inset]`.
5. `vh` units everywhere — preserve literal (`w-[140vh]`, `h-[10vh]`, `pl-[14vh]`, `text-[2.4vh]`, `bottom-[120px]`). Do not convert to pixels.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375px the icon strip width `140vh` is `140 * (375/?)` — assuming 667-tall viewport, `140vh` = `934px`, **wider than viewport**. The strip will overflow; this matches the MUI baseline behavior (the page is somewhat broken on mobile, by design — it's a legacy desktop-first layout).

## §7 SEO / metadata

No `metadata` export. No JSON-LD. Legacy.
