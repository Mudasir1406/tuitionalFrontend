# Page — `/blog`

Blog index. Hero (with optional search query echo), school-logos band, search bar, and the full grid of blog cards via `<AllBlogs>`. Server-renders Firestore `blogs-v1-en` docs and filters by `?search=` if present.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\blog\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\blog\page.tsx` |
| Arabic variant | `/ar/blog` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}><Hero /></div>
    <div className={styles["hero-picture"]} />
  </div>
</div>

<div className={styles.verticalMargin}>
  <SchoolLogosSection />
</div>

<SearchBar searchQuery={searchParams?.search || ""} />
<AllBlogs blogs={filteredData} />

<Footer />
```

The hero's right column (`hero-picture`) is empty — it holds the decorative background image set in `blog.module.css`.

## §2 Page-level layout rhythm

All page-level rhythm comes from the CSS-Modules file `blog.module.css`:

| CSS-Modules selector | MUI/CSS value | Tailwind equivalent (informational — module CSS is still loaded directly) |
|---|---|---|
| `.container` (hero wrapper) | typical 4vw/5vw side padding + 120/150/200 paddingTop ladder | n/a (module CSS is reused) |
| `.verticalMargin` | `5vh / 7vh` block-margin | `my-[5vh] md:my-[7vh]` |

There are NO MUI `<Box sx>` or inline `<Grid sx>` margins on this page — everything is delegated to `blog.module.css` and to the section components themselves.

## §3 Container / max-width rules

- Outer hero container max-width and side padding are owned by `blog.module.css .container`.
- `<SearchBar>` and `<AllBlogs>` own their own max-width (they render inside their own internal wrappers).
- Sticky-header compensation: paddingTop ladder lives in `.container`.

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\blog\hero\Hero.tsx`
- `<SchoolLogosSection>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx`
- `<SearchBar>` — `tuitionalFrontend-mui-baseline\src\components\blog\search-bar\SearchBar.tsx`
- `<AllBlogs>` — `tuitionalFrontend-mui-baseline\src\components\blog\all-blogs\All-Blogs.tsx` (renders a grid of `<BlogCard>` — see `examples/04-blog-card.md`)

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\blog\page.tsx`) introduces extra wrapping not present in MUI:

- Lines 33-54 wrap the entire body (Header + hero + logos + search + grid) in a `bg-gradient-to-b from-[#EDF8FF] via-[#EDF8FF] to-white` div. **The MUI baseline has no such gradient.** Bug — remove or trace to a design decision.
- Lines 48-53: extra `<div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">` around `<SearchBar>` and `<AllBlogs>`, plus a `mt-10` between them. **MUI has no such wrapper or spacer** — `<SearchBar>` and `<AllBlogs>` sit flush. Bug — collapse to the MUI structure.

`.verticalMargin` for `<SchoolLogosSection>` is still imported from `blog.module.css`, so that rhythm matches.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

At 375px, hero pt should be 120px. At 1280+ the `<AllBlogs>` grid should expand to its module-CSS max-width (not the Tailwind port's `max-w-7xl`). If the grid is narrower than MUI on a 1920 screen, the extra `max-w-7xl` wrapper is the culprit.

## §7 SEO / metadata

No `metadata` export in MUI source. Pages relying on parent-layout metadata.
