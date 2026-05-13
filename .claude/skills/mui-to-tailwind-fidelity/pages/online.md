# Page — `/online`

Online tutoring index. Server-fetches `grade-subject-level-en` docs and renders them as a card grid linking to `/online/[slug]`. This is **not** a marketing landing page — it's a minimal, mostly-inline-styled directory.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\online\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\online\page.tsx` |
| Arabic variant | `/ar/online` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<Box sx={{ minHeight: "100vh", paddingTop: "120px", paddingX: { xs: "3vw", md: "5vw" }, paddingY: { xs: "2vh", md: "4vh" } }}>
  <Box sx={{ textAlign: "center", marginBottom: { xs: "4vh", md: "6vh" } }}>
    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1a1a1a", marginBottom: "1rem" }}>
      Personalized Online Learning
    </h1>
    <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "800px", margin: "0 auto" }}>
      Get personalized online tutoring ...
    </p>
  </Box>

  {data && data.length > 0 && (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 3, marginTop: 4 }}>
      {data.map((course) => (
        <Box component="a" href={`/online/${course.id}`} sx={{ padding: 3, border, borderRadius, ... }}>
          <Box component="img" src={...} />
          <h3 style={...}>{course.hero_section?.title || course.id}</h3>
          <p style={...}>{course.hero_section?.subtitle}</p>
          <Box sx={{ padding: "8px 16px", backgroundColor: "#2196f3", color: "white", ... }}>Learn More</Box>
        </Box>
      ))}
    </Box>
  )}
</Box>
<ServerFooter />
```

## §2 Page-level layout rhythm

Most styling is inline / `sx`-level (no module CSS, no design tokens). Page-level wrapper rhythm:

| Property | MUI value | Tailwind translation |
|---|---|---|
| Outer `<Box>` | `minHeight: "100vh", paddingTop: "120px"` (sticky-header clearance) | `min-h-screen pt-[120px]` |
| Outer `<Box>` paddingX | `{ xs: "3vw", md: "5vw" }` | `px-[3vw] md:px-[5vw]` |
| Outer `<Box>` paddingY | `{ xs: "2vh", md: "4vh" }` | `py-[2vh] md:py-[4vh]` |
| Heading block | `marginBottom: { xs: "4vh", md: "6vh" }` | `mb-[4vh] md:mb-[6vh]` |
| Grid | `display: grid, gridTemplateColumns: { xs: 1fr, md: 2fr, lg: 3fr }, gap: 3 (24px), marginTop: 4 (32px)` | `grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3` |

**Breakpoint note**: MUI `md=900px → 2 cols`, `lg=1200px → 3 cols`. Tailwind `md=768px → 2 cols`, `lg=1024px → 3 cols`. The Tailwind port goes to 2-col at 768px instead of 900px — **drift of 132px**. Acceptable per skill rules unless QA flags it.

## §3 Container / max-width rules

- No explicit max-width on the outer container — fills viewport with `px-[3vw] / md:px-[5vw]` gutters.
- The hero `<p>` paragraph caps at `max-width: 800px` (`max-w-[800px]`).

## §4 Section components used

- `<Header>` — dynamic import of `@/components.Header`
- `<ServerFooter>` — dynamic import of `@/components/server-footer`
- No specialized section components — this page renders cards inline from Firestore data.

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\online\page.tsx`):

- Line 34: `min-h-screen px-[3vw] py-[2vh] pt-[120px] md:px-[5vw] md:py-[4vh]` — matches MUI inline `sx`.
- Line 35: `mb-[4vh] text-center md:mb-[6vh]` — matches heading block.
- Line 38-41: hero `<h1>` and `<p>` use Tailwind arbitrary-value classes (`text-[2.5rem]`, `text-[1.2rem]`) — matches MUI inline `style` literals.
- Line 45: `mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3` — matches MUI grid. Same breakpoint-inversion drift noted in §2.
- Lines 47-72: card uses Tailwind classes for border, hover, image, title, subtitle, CTA pill — visually equivalent.

**Improvement in port**: uses Next.js `<Link>` (line 47) and `<Image>` (line 53) instead of MUI's `component="a"` and `component="img"`. This is a positive change (better client-side nav and image optimization). Preserve.

**Minor drift**: hero font-sizes use literal rem (`text-[2.5rem]`) instead of the `text-h1-mobile sm:text-h1-tablet lg:text-h1` triplet. Since the MUI source uses literal rem inline, the Tailwind port matches by being equally literal. Do not "upgrade" to the typography triplet unless redesigning this page.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375 the grid is 1-col. At 768 jumps to 2-col (Tailwind drift — see §2). At 1024+ becomes 3-col. Hero `<p>` should max out at 800px on wide screens.

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "Online Tutoring Services - Tuitional",
  description: "Get personalized online tutoring from qualified teachers ...",
  alternates: { canonical: `${SITE_URL}/online` },
  openGraph: {
    title: "...", description: "...", url: `${SITE_URL}/online`, locale: "en",
  },
};
```

Preserved verbatim in port. No JSON-LD.
