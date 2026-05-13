# Component — `TutorSectionV2`

Same shell as `TutorSection` but adds a `Horizontal Carousel` view option and uses hardcoded tutor data instead of fetching. When `data.view === "Horizontal Carousel"`, renders `<HorizontalTutorCarousel>` (own title) instead of the standard title + grid/list pair.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\TutorSectionV2.tsx` (shares `style.module.css`) |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\TutorSectionV2.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main
  if view === "Horizontal Carousel":
    HorizontalTutorCarousel(tutors, title)
  else:
    Typography variant=headerTag||h3 .title  data.header
    div .mt1
      GridView | ListView
```

### Dimensions, typography
Identical to [tutor-section.md](./tutor-section.md) §1. Shares the same `style.module.css`.

### Data
- Uses hardcoded `hardcodedTutors` array (9 tutors with images at `/assets/images/tutors/*.png`).
- No `getTutorsByFilter` call → safe to render in client component.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 131 | `px-6 py-12 lg:py-16` | MUI `.main { padding: 0 24px }` on ≥576px and `0 12px` on <576px; no vertical padding | **High** — vertical padding fabricated |
| B2 | 131 | `px-6` always | MUI: `px-3` (12px) below 576px, `px-6` (24px) above | **Med** |
| B3 | 140 | `text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900` | matches | OK |
| B4 | 140 | (no `mb-[1vh]` on title) | MUI `.title { margin-bottom: 1vh }` | **Med** |
| B5 | 143 | `mt-8` (=32px) | MUI `.mt1 { margin-top: 2vh }` (~14-19px) | **High** |
| B6 | 132-136 | HorizontalTutorCarousel branch uses same wrapper padding | matches MUI | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="px-3 sm:px-6">
  {data?.view === "Horizontal Carousel" ? (
    <HorizontalTutorCarousel
      tutors={val}
      title={data?.header || "Meet Some Of Our Expert IGCSE Tutors"}
    />
  ) : (
    <>
      <HeaderTag
        className="mb-[1vh] text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="mt-[2vh]">
        {data?.view === "Row View" ? <ListView data={val} /> : <GridView cardsData={val} />}
      </div>
    </>
  )}
</div>
```

## §4 Verification at 4 widths

- **375**: px-3 (12px), title h3-mobile (18px), mt-[2vh] below title.
- **768**: px-6 (24px), title h3-tablet (20px).
- **1280**: px-6, title h3 (24px).
- **1920**: same as lg.

## §5 RTL notes
Same as [tutor-section.md](./tutor-section.md) §5. Horizontal carousel needs its own RTL pass — see [horizontal-tutor-carousel.md](./horizontal-tutor-carousel.md).
