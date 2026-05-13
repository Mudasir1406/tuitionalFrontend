# Component — `<BlogSequences>`

Page-level layout orchestrator for the blog detail route. Iterates over the Firestore `PageData` doc and renders each section (`heroSection`, `blogContent`, `Faqs`, `blog_tag`, `postCTA`, `relatedBlogs`) using the original `sequenceNumber` order. The component owns the sidebar + article column layout, the inter-section vertical rhythm (`.verticalMargin`), and the inline hero image.

| Side | Path |
|---|---|
| MUI source — TSX | `tuitionalFrontend-mui-baseline\src\components\blog\blogSequences\blog-sequences.tsx` |
| MUI source — module CSS | `tuitionalFrontend-mui-baseline\src\components\blog\blogSequences\BlogSequences.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\blogSequences\blog-sequences.tsx` |
| Arabic variant | (none — handled by route prefix `/ar/blog/[slug]` via shared component) |

This spec extracts the exact per-breakpoint dimensions of the wrapper, sidebar/article split, and inline image from the module CSS. For section-by-section drill-down, see the per-component specs (`hero-nested.md`, `left-section.md`, `post-cta.md`, `related-blogs.md`, `tags-social.md`).

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Header />
  {Object.entries(data).map(([key]) => (
    <div key={key}>
      {renderSection(key.trim())}    // dispatches by name
    </div>
  ))}
  <ServerFooter />
</>

// renderSection(name) emits one of:

heroSection:
  <Hero data={...} timestamp={...} showSocial={...} />
  {image && (
    <div className={styles.imageDiv}>              // pos:relative w:90% mx:auto h:40vh
      <Image src={image} alt={altText} fill        // .blogImg: rounded-16 object-cover
             className={styles.blogImg} />
    </div>
  )}
  <div className={styles.container}>               // padding: 0 5vw
    <div className={styles.verticalMargin}></div>  // empty spacer: my-7vh
    <div className={styles.verticalMargin}>
      <Breadcrumb />
    </div>
  </div>

blogContent / Faqs / blog_tag / postCTA (each wrapped in <BlogInnerLaylout>):
  <div className={styles.container}>               // padding: 0 5vw
    <div className={styles.verticalMargin}>        // my-7vh (responsive)
      <div className={styles.main}>                // flex row, justify-between
        <div className={styles.mainLeft}>          // flex 0.2 (desktop) / flex 1 (<992)
          {!onlyChildren && <LeftSection ... />}
        </div>
        <div className={styles.mainRight}>         // flex 0.75 (desktop) / flex 1 (<992)
          {children}                               // the actual section content
        </div>
      </div>
    </div>
  </div>

relatedBlogs:
  <div className={styles.container}>
    <div className={styles.verticalMargin}>
      <RelatedBlogs blogs={allBlogs} />
    </div>
  </div>
```

The `BlogInnerLaylout` wrapper is reused for `blogContent`, `Faqs`, `blog_tag`, `postCTA`. The sidebar is rendered **only once** (gated by `isLeftSectionRendered` flag) — first content section that renders gets the sidebar; the rest pass `onlyChildren` to suppress it.

### Dimensions & spacing — `.container` (outer wrapper)

| Property | <575px | 576-767px | 768-991px | 992-1199px | ≥1200px |
|---|---|---|---|---|---|
| `padding` | `0 4vw` | `0 5vw` (default) | `0 5vw` (default) | `0 5vw` (default) | `0 5vw` (default) |

### Dimensions & spacing — `.verticalMargin` / `.bottomMargin`

| Property | <575px | 576-767px | 768-991px | 992-1199px | ≥1200px |
|---|---|---|---|---|---|
| `.verticalMargin { margin }` | `5vh 0` | `5vh 0` | `5vh 0` | `7vh 0` | `7vh 0` |
| `.bottomMargin { margin-bottom }` | `5vh` | `5vh` | `5vh` | `7vh` | `7vh` |

### Dimensions & spacing — `.main` / `.mainLeft` / `.mainRight` (sidebar + article)

| Property | <992px | ≥992px |
|---|---|---|
| `.main { display }` | flex | flex |
| `.main { flex-direction }` | **`column-reverse`** | `row` (default) |
| `.main { justify-content }` | (n/a) | `space-between` |
| `.mainLeft { flex }` | `1` (full-width) | **`0.2`** |
| `.mainRight { flex }` | `1` (full-width) | **`0.75`** |

**Critical:** `flex-direction: column-reverse` means **on mobile/tablet the article (`mainRight`) appears ABOVE the sidebar (`mainLeft`)**. Most ports forget the `-reverse` and bury the article under hundreds of pixels of sidebar widgets.

### Dimensions & spacing — `.imageDiv` (inline blog header image)

| Property | <575px | 576-767px | 768-991px | 992-1199px | ≥1200px |
|---|---|---|---|---|---|
| `.imageDiv { position }` | `relative` | `relative` | `relative` | `relative` | `relative` |
| `.imageDiv { width }` | `90%` | `90%` | `90%` | `90%` | `90%` |
| `.imageDiv { margin }` | `auto` | `auto` | `auto` | `auto` | `auto` |
| `.imageDiv { height }` | `40vh` (default; overridden by `.blogImg`) | `40vh` | `40vh` | `40vh` | `40vh` |
| `.blogImg { height }` | **`20vh`** | (inherits `40vh`) | **`30vh`** | **`35vh`** | **`70vh`** |
| `.blogImg { border-radius }` | `16px` | `16px` | `16px` | `16px` | `16px` |
| `.blogImg { object-fit }` | `cover` | `cover` | `cover` | `cover` | `cover` |

### Dimensions & spacing — `.typographyContent img` (images embedded in rendered HTML)

| Property | Value |
|---|---|
| `max-width` | `100%` |
| `width` | `100%` |
| `height` | `auto` |
| `display` | `block` |
| `margin` | `0 auto` (centered) |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Font family |
|---|---|---|---|---|---|---|
| Blog HTML content `<Typography component="div">` | `data.headerTag` (default `"h3"`) — does NOT scale typography of the rendered HTML; only sets root element tag | inherits | inherits | inherits | inherit | `leagueSpartan.className` (League Spartan applied at content root) |

Note: the `<Typography variant={...} component="div">` here is unusual — MUI's `variant` styles the outer `<div>`, but the HTML inside (`<h1>`, `<h2>`, `<p>`, etc.) is rendered raw from Quill output. The `.typographyContent` selector only handles `img` styling. The remaining typography comes from the global heading/body rules in `globals.css`.

### Colors

No color tokens applied at this layout level. All colors come from descendants (`Hero`, `LeftSection`, `Faqs`, etc.).

### Animations / interactions

None at this level. `Hero`, `Breadcrumb`, `RelatedBlogs`, etc. own their own animations.

---

## §2 Tailwind port — bug list

Comparing `tuitionalFrontend\src\components\blog\blogSequences\blog-sequences.tsx` against §1:

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | (overall) | The layout is **flattened** — sidebar + article live in ONE outer `<div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 lg:grid-cols-12">` (lines 113-134) and ALL non-hero sections render into the right column. MUI's structure rewraps every section in its own `.container > .verticalMargin > .main` block (each with `flex-col-reverse md:flex-row`). | Restore the MUI per-section wrapper pattern, or accept the simplification but match MUI's spacing tokens (currently the entire structural rhythm is wrong). | high |
| B2 | 95 | `h-[40vh]` on the inline hero image div | Per MUI `.blogImg` overrides: `h-[20vh] md:h-[30vh] lg:h-[35vh] xl:h-[70vh]` (mobile→576-767px→768-991px→992-1199px→≥1200px). The current single `40vh` only matches the 576-767px band; mobile is double-tall and desktop is half-tall. | high |
| B3 | 95 | `max-w-screen-xl` on image div (Tailwind default ≈ 1280px) | MUI uses `width: 90%` with `margin: auto` — no max-width. Should be `w-[90%] mx-auto`. | med |
| B4 | 95 | (no `rounded-16`) on the image div / image | MUI `.blogImg { border-radius: 16px }` → `rounded-2xl` (Tailwind's `rounded-2xl` = 16px). Currently the image has neither `rounded-*` nor the `object-cover` (object-cover is present at line 100, good). | high |
| B5 | 100 | `<Image className="object-cover" />` — no border radius | Add `rounded-2xl` so the `border-radius: 16px` lands on the actual image element (since `fill` makes the wrapper the radius target). Apply to both wrapper and image to be safe: `<div className="... rounded-2xl overflow-hidden">`. | med |
| B6 | 104 | `<div className="mx-auto max-w-screen-xl px-4">` for the Breadcrumb wrapper | MUI uses `.container` = `padding: 0 5vw` (and `0 4vw` below 575px) — **no max-width**, **no horizontal margin**. Should be `px-[4vw] sm:px-[5vw]`. | high |
| B7 | 105 | `<div className="my-4">` around Breadcrumb (16px symmetric) | MUI: `.verticalMargin { margin: 5vh 0 }` mobile/<992, `7vh 0` ≥992. Should be `my-[5vh] lg:my-[7vh]` (`lg`=1200 is the closest Tailwind breakpoint to MUI's 992 boundary — 200px drift, document it). | high |
| B8 | (missing) | No empty spacer `<div>` between `Hero` and `Breadcrumb` | MUI has TWO consecutive `.verticalMargin` divs (one empty, one wrapping `Breadcrumb`) for ~14vh total gap. The port has only one (`my-4` = 16px). Add a sibling `<div className="my-[5vh] lg:my-[7vh]" aria-hidden />` before the Breadcrumb wrapper. | med |
| B9 | 113 | `<div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 lg:grid-cols-12">` | MUI uses **`flex`** with `column-reverse`/`row`, NOT a grid. Should be `<div className="flex flex-col-reverse lg:flex-row lg:justify-between px-[4vw] sm:px-[5vw] my-[5vh] lg:my-[7vh]">` (lg=1200 maps to MUI's 992 boundary; 200px drift acceptable). | high |
| B10 | 113 | `max-w-screen-xl` (1280px cap) | MUI `.container` has **no max-width** — the wrapper is full-width minus 4-5vw padding. Remove `max-w-screen-xl` and `mx-auto`. | high |
| B11 | 113 | `px-4` (16px constant) | MUI: `padding: 0 4vw` mobile, `0 5vw` default. Should be `px-[4vw] sm:px-[5vw]`. | high |
| B12 | 113 | `gap-6` (24px) on grid | MUI `.main` has `justify-content: space-between` and zero gap (the flex split is 0.2 + 0.75 = 0.95, leaving 5% as the natural gap). For Tailwind flex: drop `gap-6`, keep `justify-between`. | med |
| B13 | 113 | `lg:grid-cols-12` (Tailwind `lg`=1200) + col-spans 3/9 | MUI splits at 992 (Bootstrap `lg`), not 1200. Tailwind has no 992 breakpoint — closest is `lg`=1200 (200px later) or `md`=900 (92px earlier). **The skill recommends `md:`** (900) so the desktop layout kicks in earlier and matches MUI more closely. Use `md:flex-row md:justify-between` with `md:flex-[0.2]` / `md:flex-[0.75]`. | med |
| B14 | 114 | `<div className="lg:col-span-3">` sidebar | MUI: `.mainLeft { flex: 0.2 }` at ≥992. Should be `<div className="md:flex-[0.2]">` (or `lg:flex-[0.2]`). Currently the sidebar gets **25% width** (3/12); MUI gives it **20%**. | low |
| B15 | 117 | `<div className="lg:col-span-9">` article | MUI: `.mainRight { flex: 0.75 }` at ≥992. Should be `<div className="md:flex-[0.75]">`. Currently the article gets **75% width** (9/12) ≈ correct ratio, but `flex 0.75` + `flex 0.2` with `justify-between` leaves a 5% inter-column gutter that grid-cols-12 doesn't produce. | low |
| B16 | (missing) | **No `flex-col-reverse`** | This is the most user-visible bug. On mobile, the current port renders **sidebar (LeftSection: search, tags, related) FIRST**, then the article. MUI does the opposite via `column-reverse`: article first, sidebar (which is supplementary) below. Add `flex-col-reverse` to the parent at the mobile base, with `lg:flex-row` (or `md:flex-row`) to flip on desktop. | **high** |
| B17 | 48 | `<div className="my-6">` around `blogContent` (24px symmetric) | MUI `.verticalMargin` = 5vh (≈40-50px) or 7vh (≈56-70px). Should be `my-[5vh] lg:my-[7vh]`. The 24px constant is 30-50% too small. | high |
| B18 | 61 | `<div className="my-6">` around `Faqs` | Same as B17 — should be `my-[5vh] lg:my-[7vh]`. | high |
| B19 | 70 | `<div className="my-6">` around `postCTA` | Same as B17. | high |
| B20 | 124 | `<div className="my-6">` around `BlogAuthorProfile` | Same as B17. (Note: `authorProfile` is rendered unconditionally after sections in the port, but MUI's source doesn't include `BlogAuthorProfile` here — it's part of `Hero` via the `authorProfile` prop. Either remove from port OR match spacing.) | med |
| B21 | 129 | `<div className="my-6">` around `RelatedBlogs` | MUI wraps RelatedBlogs in its own `.container > .verticalMargin` (full-width, 4-5vw padding, 5/7vh vertical). Should be wrapped in a separate `<div className="px-[4vw] sm:px-[5vw] my-[5vh] lg:my-[7vh]">`, OUTSIDE the sidebar+article column. The current port renders RelatedBlogs INSIDE the article column (line 128-132) — wrong scope, it should span full content width like MUI. | high |
| B22 | 50 | `prose font-heading text-ink-900 max-w-none` for HTML content | MUI uses `leagueSpartan.className` + `.typographyContent` (which only styles `img` children — max-w 100%, w 100%, h auto, display block, margin 0 auto). The `prose` plugin imposes its own typography reset that doesn't match MUI's `globals.css` heading sizes. Replace with `font-heading text-ink-900 [&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full`. | med |
| B23 | 95 | `<div className="relative mx-auto h-[40vh] max-w-screen-xl">` image wrapper sits BEFORE the breadcrumb wrapper and OUTSIDE any container — but MUI nests the image OUTSIDE `.container` too (correct), then puts the breadcrumb inside `.container`. Structurally OK; only the height/width tokens are wrong (B2, B3). | — | (no bug, just confirming structure) |
| B24 | 17 | `BlogAuthorProfile` is dynamic-imported in the port but never rendered in MUI's `BlogSequences` | MUI passes `authorProfile` as a prop INTO `<Hero>` (see `hero-nested.md`). The port renders it as a separate sibling. Decide: either keep port's pattern (and document divergence) or move into `Hero`. **Recommendation**: keep but match spacing. | low |
| B25 | (filter loop) | The port runs **two separate iterations** (`.filter(includes("heroSection"))` then `.filter(!includes("heroSection"))`) — diverges from MUI which iterates once and dispatches by name. The visible effect: section order in the Firestore doc is **lost** for non-hero sections (they always render in `Object.entries` order, but `Faqs` may have a smaller `sequenceNumber` than `blogContent` and should render first). MUI preserves the doc's key order; the port also preserves it within the second filter, so functionally identical EXCEPT when the doc has hero in the middle (rare). | low |
| B26 | (missing) | `blog_tag` / `tag` section handler | MUI's `renderSection` has a branch for `name.includes("blog_tag") || name.includes("tag")` rendering `<TagsAndSocial>`. The port has no handler for this → tags section silently disappears if present in the doc. Add a branch in `renderRightContent`. | high |

---

## §3 Corrected Tailwind classNames

Apply edits B1-B26. Key from→to translations:

```tsx
// Outer hero image wrapper (was line 95-103)
// FROM:
<div className="relative mx-auto h-[40vh] max-w-screen-xl">
  <Image src={sectionData.image} alt={...} fill className="object-cover" />
</div>
// TO:
<div className="relative mx-auto h-[20vh] w-[90%] overflow-hidden rounded-2xl
                sm:h-[40vh] md:h-[30vh] lg:h-[35vh] xl:h-[70vh]">
  <Image src={sectionData.image} alt={...} fill className="object-cover" />
</div>

// Breadcrumb wrapper (was line 104-108)
// FROM:
<div className="mx-auto max-w-screen-xl px-4">
  <div className="my-4">
    <Breadcrumb />
  </div>
</div>
// TO:
<div className="px-[4vw] sm:px-[5vw]">
  <div className="my-[5vh] lg:my-[7vh]" aria-hidden />
  <div className="my-[5vh] lg:my-[7vh]">
    <Breadcrumb />
  </div>
</div>

// Main sidebar+article wrapper (was line 113)
// FROM:
<div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 lg:grid-cols-12">
  <div className="lg:col-span-3"><LeftSection .../></div>
  <div className="lg:col-span-9">{/* article sections */}</div>
</div>
// TO:
<div className="px-[4vw] sm:px-[5vw] my-[5vh] lg:my-[7vh]">
  <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
    <div className="w-full lg:flex-[0.2]">
      <LeftSection tags={allTags} categories={allCategories} />
    </div>
    <div className="w-full lg:flex-[0.75]">
      {/* article sections — each wrapped my-[5vh] lg:my-[7vh] */}
    </div>
  </div>
</div>

// Per-section wrappers inside the article column (was `my-6`)
// FROM:
<div className="my-6">{children}</div>
// TO:
<div className="my-[5vh] lg:my-[7vh]">{children}</div>

// Blog HTML content (was line 48-54)
// FROM:
<div className="prose font-heading text-ink-900 max-w-none"
     dangerouslySetInnerHTML={{ __html: ... }} />
// TO:
<div className={`${leagueSpartan.className} font-heading text-ink-900
                 [&_img]:mx-auto [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full`}
     dangerouslySetInnerHTML={{ __html: ... }} />

// RelatedBlogs wrapper (was inside article column, line 128-132)
// MOVE OUTSIDE the sidebar/article flex wrapper:
{allBlogs && allBlogs.length > 0 && (
  <div className="px-[4vw] sm:px-[5vw]">
    <div className="my-[5vh] lg:my-[7vh]">
      <RelatedBlogs blogs={allBlogs} />
    </div>
  </div>
)}

// Add the missing blog_tag handler in renderRightContent:
if (name.includes("blog_tag") || name.includes("tag")) {
  return (
    <div className="my-[5vh] lg:my-[7vh]">
      <TagsAndSocial
        tags={(data?.[name as keyof PageData] as any)?.data || allTags}
        showSocial={(data as any)?.postCTA?.isShow}
      />
    </div>
  );
}
```

---

## §4 Verification at 4 widths

| Width | What to check |
|---|---|
| **375** (iPhone SE) | Hero image `h-[20vh]`. Padding `px-[4vw]` (≈15px each side). Article appears ABOVE the sidebar (via `flex-col-reverse`). Section margins ≈ 5vh (≈33px on a 667-tall viewport). |
| **768** (iPad Mini) | Hero image `h-[30vh]` (MUI's 768-991 band). Padding `px-[5vw]` (≈38px each side). Layout still stacked (article above sidebar). Section margins still 5vh. |
| **1280** (Laptop S) | Hero image `h-[70vh]` (≥1200). Padding `px-[5vw]` (≈64px). Layout switched to row: sidebar left (20%), article right (75%), 5% gutter. Section margins 7vh (≈54px on 768-tall window). |
| **1920** (Desktop) | Same as 1280 visually. Hero image `h-[70vh]`. Section margins 7vh (≈76px on 1080-tall). |

Cross-check side-by-side with MUI baseline at each width. Visible regressions if any of: sidebar appearing above article on mobile, image too tall on phone (40vh instead of 20vh), image too short on desktop (40vh instead of 70vh), sections cramped together (24px instead of 50-70px), missing tag section.

---

## §5 RTL notes

- The component itself has no LTR-specific axis decisions — the sidebar+article order is dictated by the **visual** `flex-col-reverse` / `lg:flex-row` rules, both of which are direction-neutral.
- Inside `LeftSection`, `TagsAndSocial`, etc. — RTL is handled per-component (see their specs).
- The blog HTML content from Quill is **already in the doc's authored language** (no flip needed). For `/ar/blog/[slug]` the content comes pre-translated from the `blogs-v1-ar` collection.
- If wrapping the inline image with `overflow-hidden rounded-2xl`, the `<Image>` does not flip in RTL (images are not directional). No special handling.
- The Breadcrumb component has its own RTL flow — do not add `dir="..."` or `rtl:flex-row-reverse` at this layer.
