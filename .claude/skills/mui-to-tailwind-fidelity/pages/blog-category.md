# Page — `/blog/category/[slug]`

Blog index filtered to a single category. Server-renders blogs filtered by `heroSection.category.data[].id === slug`. Same layout shell as `/blog` plus a `<Breadcrumb />`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\blog\category\[slug]\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\blog\category\[slug]\page.tsx` |
| Arabic variant | `/ar/blog/category/[slug]` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}>
      <Hero slug={category?.name?.en || "Category"} />
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

Note: the imported `<SearchBar>` is **commented out** in the MUI source — only `<Breadcrumb />` precedes the grid.

## §2 Page-level layout rhythm

Same as `/blog` — all rhythm comes from `blog.module.css` (`.container`, `.verticalMargin`). No `Box sx` margins on the page file.

| CSS-Modules selector | Value | Tailwind equivalent |
|---|---|---|
| `.container` | hero wrapper, 4vw/5vw side padding + 120/150/200 px paddingTop ladder | n/a (module CSS) |
| `.verticalMargin` | `5vh / 7vh` block-margin | `my-[5vh] md:my-[7vh]` |

## §3 Container / max-width rules

- Module CSS owns hero max-width and side padding.
- `<Breadcrumb>` and `<AllBlogs>` own their own widths.

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\blog\hero\Hero.tsx` (accepts `slug` prop to render category name in hero)
- `<SchoolLogosSection>` — `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx`
- `<Breadcrumb>` — `tuitionalFrontend-mui-baseline\src\components\bread-crumb\bread-crumb.tsx`
- `<AllBlogs>` — `tuitionalFrontend-mui-baseline\src\components\blog\all-blogs\All-Blogs.tsx`

## §5 Tailwind port status

The Tailwind port file exists (`tuitionalFrontend\src\app\blog\category\[slug]\page.tsx`). Check whether it adds the same `max-w-7xl` wrapper bug seen in `/blog`. If it does, remove the wrapper to match MUI (Breadcrumb + AllBlogs sit flush against their own internal wrappers).

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

Breadcrumb font size and link styling are inherited from `globals.css` — verify it picks up correctly. Grid should match `/blog`'s rendering at all 4 widths.

## §7 SEO / metadata

No `metadata` export in MUI source. Inherits parent layout metadata. Category name surfaces via the `<Hero slug={...}>` prop only.
