# Page — `/online/[slug]`

Grade-Subject-Level dynamic page. Loads a Firestore `PageData` document by slug and renders sections in `sequenceNumber` order. Branches on `data.variant`:

- `data.variant === "new"` → `<GradeSubjectLevelV2 data={sortedJson} />` (V2 layout)
- Otherwise → `<GradeSubjectLevel data={data} sequence={sequence} />` (legacy / V1 layout)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\online\[slug]\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\online\[slug]\page.tsx` |
| Arabic variant | `/ar/online/[slug]` — uses ar-* components; same fetch + variant branching. |

## §1 Section sequence (MUI source)

The page file is a **pure data loader** — no JSX layout besides the variant branch:

```tsx
const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, sequence] = await Promise.all([
    getPageData(params.slug),
    getPageSequence(),
  ]);

  if (!data) return redirect("/404");
  if (!sequence) return <div>Error: Component sequence not found.</div>;

  if (data?.variant === "new") {
    return <GradeSubjectLevelV2 data={sortJsonObjectBySequenceNumber(data) as any} />;
  }
  return <GradeSubjectLevel data={data} sequence={sequence} />;
};
```

Where `sortJsonObjectBySequenceNumber` sorts the page-data object entries by their `sequenceNumber` field (sections without one go to `Infinity`).

## §2 Page-level layout rhythm

**All layout decisions live inside `<GradeSubjectLevel>` (V1) or `<GradeSubjectLevelV2>` (V2)** — see those component specs separately. Typical V1 sequence (driven by `componentSequence` from `getPageSequence()`):

```
hero_section → SchoolLogosSection → benefits → tutors → student_says → faqs → contact → footer
```

V2 sequence is dictated by per-page `sequenceNumber` fields and uses the V2 component family (HeroV2 + FormV2 split, TutorSectionV2, BenifitsSectionV2, etc. — same family as `/a-level`, `/gcse`, `/igcse`).

## §3 Container / max-width rules

- V1 path: `<GradeSubjectLevel>` wraps sections in its own `<Container>` with max-width.
- V2 path: `<GradeSubjectLevelV2>` mirrors the curriculum landing page pattern — `1400px` hero wrapper, `my: 3` (24px) between sections.

## §4 Section components used

- `<GradeSubjectLevel>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\grade-subject-level.tsx`
- `<GradeSubjectLevelV2>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\grade-subject-level-v2.tsx`

Page calls `redirect("/404")` if `getPageData` returns nullish, and renders a plain-text error if `getPageSequence` is null.

## §5 Tailwind port status

The Tailwind port (`tuitionalFrontend\src\app\online\[slug]\page.tsx`) should be a 1:1 translation of the loader logic. Audit:

- Same `Promise.all([getPageData, getPageSequence])` fetch?
- Same `sortJsonObjectBySequenceNumber` helper?
- Same `data.variant === "new"` branch to `<GradeSubjectLevelV2>`?
- Same `redirect("/404")` on null data?

No styling lives on this file. Page-level fidelity = loader correctness.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

Verification happens **on the rendered V1 / V2 component**, not on the page file. Test a slug like `/online/igcse-mathematics-uae` (or whatever the canonical demo slug is) at all four widths.

## §7 SEO / metadata

No `metadata` export on the page file — both `<GradeSubjectLevel>` and `<GradeSubjectLevelV2>` may emit per-page schema via `<Script>` JSON-LD blocks based on the loaded Firestore `jsonLdSchema` field. Verify those scripts are emitted in the port at the equivalent point in the component tree.
