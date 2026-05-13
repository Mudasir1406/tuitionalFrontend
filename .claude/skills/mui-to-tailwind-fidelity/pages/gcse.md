# Page — `/gcse`

GCSE marketing landing page (V2 / `HeaderV3` family). Identical skeleton to `/a-level` with GCSE-specific copy (hero header, FAQs, popular subjects title, student-says title).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\gcse\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\gcse\page.tsx` |
| Arabic variant | (no `/ar/gcse` route.) |

## §1 Section sequence (MUI source)

Identical to `/a-level`. See [a-level.md §1](./a-level.md) — same component order, same wrappers. Only the props differ:

- `heroData.header`: "Achieve Outstanding GCSE Results! ... Top-Rated GCSE Tutors Are Here to Help."
- `tutorSectionData.curriculum`: `"GCSE"`
- `benefitsSectionData.section`: `"Why Choose Our GCSE Program"`
- `studentSaysData.header`: `"Video Testimonials from Our GCSE Students"`
- `TrustpilotCarousel title`: `"What Our GCSE Students Say"`
- `PopularIgcseSubjectsV2 title`: `"Popular GCSE Subjects We Cover"`
- `faqsData`: GCSE-specific FAQs (5 entries vs A-Level's 6)
- Additionally imports `FormV2Dialog` but doesn't render it

## §2 Page-level layout rhythm

Identical to `/a-level`:

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| `styles.verticalMargin` | `my: 3` | `my-6` |
| `styles.heroContainer` | `pt: { xs: 3, lg: 4 }`, `minHeight: { xs: "auto", lg: "90vh" }`, `px: { xs: 2, lg: 6 }` | `flex items-center justify-center px-4 pt-6 lg:min-h-[90vh] lg:px-12 lg:pt-8` |
| `styles.heroWrapper` | `maxWidth: 1400` | `w-full max-w-[1400px]` |
| `styles.heroGrid` | `alignItems: center`, `spacing={3}` | `grid grid-cols-1 items-center gap-6 lg:grid-cols-2` |

See [a-level.md §2](./a-level.md) for the full rationale.

## §3 Container / max-width rules

Identical to `/a-level`. Hero capped at 1400px; section components own their own gutters.

## §4 Section components used

Identical to [a-level.md §4](./a-level.md). All V2 components are the same imports.

## §5 Tailwind port status

Audit `tuitionalFrontend\src\app\gcse\page.tsx` against the [a-level.md §5](./a-level.md) checklist. The two pages should be structurally identical at the JSX-shell level (only copy strings change).

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

Same as `/a-level`.

## §7 SEO / metadata

No `metadata` export — relies on root layout. All copy hardcoded.
