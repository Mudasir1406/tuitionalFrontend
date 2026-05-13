# Example 08 — Blog Detail Page (`/blog/[slug]`)

Long-form article page. Loads a Firestore blog doc, then renders sections in `sequenceNumber` order via `<BlogSequences>`. Layout: a left sidebar (`<LeftSection>` with search + related blogs + tags) and a wide right column (the article).

| Side | Path |
|---|---|
| MUI source — route | `tuitionalFrontend-mui-baseline\src\app\blog\[slug]\page.tsx` |
| MUI source — layout component | `tuitionalFrontend-mui-baseline\src\components\blog\blogSequences\blog-sequences.tsx` + `.module.css` |
| Tailwind port — route | `tuitionalFrontend\src\app\blog\[slug]\page.tsx` |
| Tailwind port — layout | `tuitionalFrontend\src\components\blog\blogSequences\blog-sequences.tsx` |

The route file (`page.tsx`) is just a data loader — `await getBlogData → <BlogSequences>`. **All layout decisions live in `BlogSequences.module.css`**. The skill applies to that file.

---

## §1 MUI source — layout properties

### Container (the article-page outer wrapper)

| Property | <575px | 576-767px | 768-991px | 992-1199px | ≥1200px |
|---|---|---|---|---|---|
| `padding` (horizontal) | `0 4vw` | (default) `0 5vw` | (default) `0 5vw` | (default) `0 5vw` | (default) `0 5vw` |
| `.verticalMargin { margin }` | `5vh 0` | `5vh 0` | `5vh 0` | `7vh 0` | `7vh 0` |
| `.bottomMargin { margin-bottom }` | `5vh` | `5vh` | `5vh` | `7vh` | `7vh` |

Tailwind translation (mapping MUI's Bootstrap breakpoints to Tailwind):
- `.container` → `<div className="px-[4vw] sm:px-[5vw]">` (4vw below 600, 5vw above — close enough to MUI's 575 boundary)
- `.verticalMargin` → `<div className="my-[5vh] md:my-[7vh]">` (md=900 maps closest to MUI's 992)
- `.bottomMargin` → `<div className="mb-[5vh] md:mb-[7vh]">`

### Main layout (sidebar + article)

| Property | <992px | ≥992px |
|---|---|---|
| `.main { display }` | flex | flex |
| `.main { flex-direction }` | **column-reverse** | row |
| `.main { justify-content }` | (n/a) | space-between |
| `.mainLeft { flex }` | 1 (full-width) | **0.2** |
| `.mainRight { flex }` | 1 (full-width) | **0.75** |

The **column-reverse** is critical: when the layout stacks, the article appears **above** the sidebar on mobile. Most ports forget the `-reverse` and put the sidebar above, which buries the article below 600px of sidebar widgets.

Tailwind translation:
```tsx
<div className="flex flex-col-reverse md:flex-row md:justify-between">
  <div className="flex-1 md:flex-[0.2]">{/* sidebar */}</div>
  <div className="flex-1 md:flex-[0.75]">{/* article */}</div>
</div>
```

Note: MUI's breakpoint is 992 (Bootstrap `lg`), Tailwind's `md` is 900. 92px of drift means iPad Pro 11" at 834 px stays single-column in both, but the 900-991 band switches to two-column in Tailwind ~92px earlier than MUI. **Acceptable drift — document it but don't fix unless QA flags.**

### Hero image (inline blog header image, not the hero section)

| Property | <575px | 576-767px | 768-991px | 992-1199px | ≥1200px |
|---|---|---|---|---|---|
| `.imageDiv { width }` | 90% | 90% | 90% | 90% | 90% |
| `.imageDiv { height }` | (default 40vh, then blogImg overrides) | (default) | (default) | (default) | (default) |
| `.blogImg { height }` (overrides imageDiv) | **20vh** | (inherits 40vh) | **30vh** | **35vh** | **70vh** |
| `.blogImg { border-radius }` | 16px | 16px | 16px | 16px | 16px |
| `.blogImg { object-fit }` | cover | cover | cover | cover | cover |

Tailwind (collapsing to Tailwind breakpoints):
```tsx
<div className="relative mx-auto h-[40vh] w-[90%]">
  <Image
    fill
    className="h-[20vh] rounded-[16px] object-cover sm:h-[40vh] md:h-[30vh] lg:h-[70vh]"
    {...imageProps}
  />
</div>
```

Note the **non-monotonic sequence** (`20 → 40 → 30 → 70`). The 576-767 band inherits the default 40vh (no override), so it's actually larger than the next band (768-991 = 30vh). This is intentional in the MUI source — preserve it.

---

## §2 Article content typography (rendered by `<Hero>` and `<MainSection>`)

The article body comes from a Firestore blog doc (`blogContent.content` field) — HTML from the CMS's Quill editor. It's rendered inside `<MainSection>` (line 54-56 of `blog-sequences.tsx`).

The content uses **default HTML tags** (`<h1>` through `<h6>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<img>`). Since the Tailwind globals.css already defines responsive sizes for `<h1>`-`<h6>` and `<p>` (see [04-foundation-fixes.md §1](../04-foundation-fixes.md)), the article body **picks up correct typography automatically** — no Tailwind classes needed on the article HTML.

**Watch out for** Tailwind's `@tailwind base` preflight which resets margins. globals.css restores them (lines 467-507) — but if those CSS rules are accidentally deleted, all article body text loses its rhythm.

Inline images inside the article body:
```css
.typographyContent img {
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
```

If `<MainSection>` wraps the article in a className like `typographyContent`, port that style:

```tsx
<div className="[&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full">
  {/* article HTML */}
</div>
```

(Tailwind's child selectors via `[&_img]:` apply rules to descendant `img` tags.)

---

## §3 Section sequence inside the article

`<BlogSequences>` renders sections by `sequenceNumber`. Common sequence:

```
heroSection (1)         → Hero component (full-bleed image + title + meta)
imageDiv (after hero)   → the responsive blog image (above)
blogContent (5)         → article body HTML
postCTA (6)             → "Subscribe / Book demo" CTA
relatedBlogs            → 3-up grid of <BlogCard> (see Example 04)
tag (7)                 → tag chips
```

Each section component handles its own padding/margin. Don't add page-level `my-*` between them — the components own their rhythm.

---

## §4 Tailwind port checklist

When reviewing `tuitionalFrontend\src\components\blog\blogSequences\blog-sequences.tsx`:

- [ ] `.container` → `px-[4vw] sm:px-[5vw]`
- [ ] `.verticalMargin` → `my-[5vh] md:my-[7vh]`
- [ ] `.bottomMargin` → `mb-[5vh] md:mb-[7vh]`
- [ ] `.main` → `flex flex-col-reverse md:flex-row md:justify-between` — **column-REVERSE on mobile**
- [ ] `.mainLeft` → `flex-1 md:flex-[0.2]`
- [ ] `.mainRight` → `flex-1 md:flex-[0.75]`
- [ ] `.imageDiv` → `relative mx-auto w-[90%] h-[40vh]`
- [ ] `.blogImg` → `rounded-[16px] object-cover h-[20vh] sm:h-[40vh] md:h-[30vh] lg:h-[70vh]`
- [ ] Article body image styling: `[&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full`
- [ ] No `<Typography>` or `<Box>` imports from MUI remaining in the port

---

## §5 Verification

- **375px (iPhone SE)**: sidebar appears BELOW the article (column-reverse). Outer padding 4vw (~15px). Article image 20vh tall (~133px on 667 viewport).
- **768px (iPad Mini)**: still single-column reversed (md not reached). Padding 5vw (~38px). Article image 40vh ≈ 410px.
- **1280px (Laptop S)**: two columns. Left sidebar = 20% width, article = 75% width. Article image 70vh ≈ 560px.
- **1920px**: same layout, more whitespace. Article image stays at 70vh ≈ 756px.

If at any width the **sidebar is on top of the article**, the `-reverse` is missing.
If at **768px** the article image looks small (~150px), the `sm:h-[40vh]` rule is missing.

---

## §6 The cross-page lesson

This page demonstrates a pattern not seen in `02-home-page.md`: the **sidebar layout**. Reuse this template for any two-column page where the sidebar should appear *below* the main content on mobile (the natural reading-priority order):

```tsx
<div className="flex flex-col-reverse md:flex-row md:justify-between">
  <aside className="flex-1 md:flex-[0.2]">{/* secondary */}</aside>
  <main className="flex-1 md:flex-[0.75]">{/* primary content */}</main>
</div>
```

Not `flex-col md:flex-row` — the `-reverse` ensures the article reads first on phones. Bookmark this.
