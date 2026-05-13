# Page — `/testimonials`

Reviews page. Hero (with `<HeroInfo>` portrait), in-page `#testimonials` anchor wrapping `<ReviewsOnWp>`, then `<ReviewsOnSp>`, a tinted band around `<OurClient>` + `<VideoBasedReview>`, and a final `<ContactUs>` with custom background.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\testimonials\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\testimonials\page.tsx` |
| Arabic variant | `/ar/testimonials` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}><Hero /></div>
    <div className={styles["hero-picture"]}><HeroInfo /></div>
  </div>
</div>

<div id="testimonials">
  <ReviewsOnWp reviews={wpReviews} />
</div>

<ReviewsOnSp />

<Box sx={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.7),#DAF2FF)" }}>
  <OurClient data={data} />
  <Container sx={style.contanier}>
    <VideoBasedReview />
  </Container>
</Box>

<Box>
  <ContactUs background={{ background: "#DAF2FF" }} filterData={filterData} />
</Box>

<Footer />
```

## §2 Page-level layout rhythm

| Wrapper | MUI value | Tailwind translation |
|---|---|---|
| Hero `.container` | from `testimonials.module.css` | n/a (module CSS reused) |
| `#testimonials` div | no styling — just an anchor | `<div id="testimonials">` |
| Mid gradient `<Box>` | `background: linear-gradient(to bottom, rgba(255,255,255,0.7),#DAF2FF)` | `bg-gradient-to-b from-white/70 to-[#DAF2FF]` |
| `style.contanier` (VideoBasedReview) | `maxWidth: { lg: 1650 }`, `paddingY: { xs: 5vh, md: 10vh }` | `mx-auto py-[5vh] md:py-[10vh] lg:max-w-[1650px]` |
| ContactUs `<Box>` | bare wrapper (background passed as prop) | bare wrapper |

No `marginY: 5vh/10vh` per-section wrappers on this page — each section component owns its own rhythm. The exception is `<VideoBasedReview>`, which sits inside a Container with `paddingY: 5vh/10vh`.

## §3 Container / max-width rules

- Hero max-width and side padding from `testimonials.module.css`.
- `<VideoBasedReview>` capped at `1650px` from `lg` up.
- `<ReviewsOnWp>`, `<ReviewsOnSp>`, `<OurClient>`, `<ContactUs>` set their own max-widths internally.

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\testimonials\hero.tsx`
- `<HeroInfo>` — `tuitionalFrontend-mui-baseline\src\components\testimonials\hero-info.tsx`
- `<ReviewsOnWp>` — `tuitionalFrontend-mui-baseline\src\components\testimonials\reviews-on-wp.tsx` (WhatsApp reviews)
- `<ReviewsOnSp>` — `tuitionalFrontend-mui-baseline\src\components\testimonials\reviews-on-sp.tsx`
- `<OurClient>` — `tuitionalFrontend-mui-baseline\src\components\home\our-client.tsx` (shared with `/`)
- `<VideoBasedReview>` — `tuitionalFrontend-mui-baseline\src\components\testimonials\video-based-reviews.tsx`
- `<ContactUs>` — `tuitionalFrontend-mui-baseline\src\components\home\contact-us.tsx` (shared with `/`, accepts `background` prop)

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\testimonials\page.tsx`):

- Line 47: `bg-gradient-to-b from-white/70 to-[#DAF2FF]` — correct.
- Line 49: `mx-auto py-[5vh] md:py-[10vh] lg:max-w-[1650px]` — matches `style.contanier`.
- Line 43-45: `<div id="testimonials">` preserved with `<ReviewsOnWp>`.
- Line 54: `<ContactUs background={{ background: "#DAF2FF" }} />` — prop passed correctly.

No discrepancies at page level. **Note**: the MUI source has both `Header` and `Footer` imported; the port also imports them — match.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

Gradient should span `<OurClient>` + `<VideoBasedReview>` together. `#testimonials` is a hash-link target — verify smooth-scroll jumps land on `<ReviewsOnWp>`.

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "Testimonials - Hear What Our Students Have to Say",
  description: "Students at Tuitional have always spoken highly ...",
  alternates: { canonical: `${SITE_URL}/testimonials` },
};
```

Preserved verbatim. No JSON-LD on this page.
