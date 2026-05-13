# Page — `/blog/tag/[slug]`

Blog index filtered to a single tag. Identical structure to `/blog/category/[slug]` except it filters by `blog_tag.tags[].id === slug`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\blog\tag\[slug]\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\blog\tag\[slug]\page.tsx` |
| Arabic variant | `/ar/blog/tag/[slug]` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}>
      <Hero slug={tag?.name?.en || "Tag"} />
    </div>
    <div className={styles["hero-picture"]} />
  </div>
</div>

<div className={styles.verticalMargin}>
  <SchoolLogosSection />
</div>

<Breadcrumb />
<AllBlogs blogs={filteredData} />

<Footer />
```

`<SearchBar>` is dynamically imported but commented out in JSX.

## §2 Page-level layout rhythm

Identical to `/blog/category/[slug]`. All rhythm from `blog.module.css` (`.container`, `.verticalMargin`). No inline `Box sx` margins.

| CSS-Modules selector | Value | Tailwind equivalent |
|---|---|---|
| `.container` | hero wrapper, paddingTop ladder | n/a |
| `.verticalMargin` | `5vh / 7vh` | `my-[5vh] md:my-[7vh]` |

## §3 Container / max-width rules

Same as `/blog/category/[slug]`.

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\blog\hero\Hero.tsx`
- `<SchoolLogosSection>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx`
- `<Breadcrumb>` — `tuitionalFrontend-mui-baseline\src\components\bread-crumb\bread-crumb.tsx`
- `<AllBlogs>` — `tuitionalFrontend-mui-baseline\src\components\blog\all-blogs\All-Blogs.tsx`

## §5 Tailwind port status

Port at `tuitionalFrontend\src\app\blog\tag\[slug]\page.tsx`. Apply same audit as `/blog/category/[slug]`: ensure no extra `max-w-7xl` or padded wrapper around `<Breadcrumb> + <AllBlogs>`.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

## §7 SEO / metadata

No `metadata` export. Tag name renders only inside `<Hero slug={...}>`. No JSON-LD.
