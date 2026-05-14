# Pages Catalogue

Index of every user-facing route in `tuitionalFrontend\src\app\`. Each row links to the per-page spec, which documents the **section sequence**, **inter-section spacing** (typically `my-[5vh] md:my-[10vh]`), and any page-level container max-widths.

The page spec **does not** re-document individual section components — it links to their entries in [components-catalogue.md](./components-catalogue.md).

> **Arabic mirror routes** (`/ar/<route>`) are noted inline in each main spec — they use the same section sequence with `ar-*` component variants. No separate spec unless the layout substantively differs.

---

## English (LTR) routes

| Route | Spec | MUI source |
|---|---|---|
| `/` | [pages/home.md](./pages/home.md) | `src/app/page.tsx` |
| `/about` | [pages/about.md](./pages/about.md) | `src/app/about/page.tsx` |
| `/blog` | [pages/blog.md](./pages/blog.md) | `src/app/blog/page.tsx` |
| `/blog/[slug]` | [pages/blog-detail.md](./pages/blog-detail.md) | `src/app/blog/[slug]/page.tsx` |
| `/blog/category/[slug]` | [pages/blog-category.md](./pages/blog-category.md) | `src/app/blog/category/[slug]/page.tsx` |
| `/blog/tag/[slug]` | [pages/blog-tag.md](./pages/blog-tag.md) | `src/app/blog/tag/[slug]/page.tsx` |
| `/careers` | [pages/careers.md](./pages/careers.md) | `src/app/careers/page.tsx` |
| `/contact` | [pages/contact.md](./pages/contact.md) | `src/app/contact/page.tsx` |
| `/pricing` | [pages/pricing.md](./pages/pricing.md) | `src/app/pricing/page.tsx` |
| `/testimonials` | [pages/testimonials.md](./pages/testimonials.md) | `src/app/testimonials/page.tsx` |
| `/a-level` | [pages/a-level.md](./pages/a-level.md) | `src/app/a-level/page.tsx` |
| `/gcse` | [pages/gcse.md](./pages/gcse.md) | `src/app/gcse/page.tsx` |
| `/igcse` | [pages/igcse.md](./pages/igcse.md) | `src/app/igcse/page.tsx` |
| `/online` | [pages/online.md](./pages/online.md) | `src/app/online/page.tsx` |
| `/online/[slug]` | [pages/online-slug.md](./pages/online-slug.md) | `src/app/online/[slug]/page.tsx` |
| `/curiculume` (sic) | [pages/curiculume.md](./pages/curiculume.md) | `src/app/curiculume/page.tsx` |
| `/maincuriculume` (sic) | [pages/maincuriculume.md](./pages/maincuriculume.md) | `src/app/maincuriculume/page.tsx` |
| `/privacy-policy` | [pages/privacy-policy.md](./pages/privacy-policy.md) | `src/app/privacy-policy/page.tsx` |
| `/terms-and-conditions` | [pages/terms-and-conditions.md](./pages/terms-and-conditions.md) | `src/app/terms-and-conditions/page.tsx` |
| `/thank-you` | [pages/thank-you.md](./pages/thank-you.md) | `src/app/thank-you/page.tsx` |
| `/404` | [pages/not-found.md](./pages/not-found.md) | `src/app/404/page.tsx` |

## Arabic (RTL) mirror routes

Each of these uses the same layout as its EN counterpart, with `ar-*` component variants. **No separate spec file** unless the layout differs — refer to the EN page spec and check its §5 RTL notes.

| Route | EN counterpart spec | MUI source |
|---|---|---|
| `/ar` | [pages/home.md](./pages/home.md) | `src/app/ar/page.tsx` |
| `/ar/about` | [pages/about.md](./pages/about.md) | `src/app/ar/about/page.tsx` |
| `/ar/blog` | [pages/blog.md](./pages/blog.md) | `src/app/ar/blog/page.tsx` |
| `/ar/blog/[slug]` | [pages/blog-detail.md](./pages/blog-detail.md) | `src/app/ar/blog/[slug]/page.tsx` |
| `/ar/blog/category/[slug]` | [pages/blog-category.md](./pages/blog-category.md) | `src/app/ar/blog/category/[slug]/page.tsx` |
| `/ar/blog/tag/[slug]` | [pages/blog-tag.md](./pages/blog-tag.md) | `src/app/ar/blog/tag/[slug]/page.tsx` |
| `/ar/careers` | [pages/careers.md](./pages/careers.md) | `src/app/ar/careers/page.tsx` |
| `/ar/contact` | [pages/contact.md](./pages/contact.md) | `src/app/ar/contact/page.tsx` |
| `/ar/pricing` | [pages/pricing.md](./pages/pricing.md) | `src/app/ar/pricing/page.tsx` |
| `/ar/testimonials` | [pages/testimonials.md](./pages/testimonials.md) | `src/app/ar/testimonials/page.tsx` |
| `/ar/online` | [pages/online.md](./pages/online.md) | `src/app/ar/online/page.tsx` |
| `/ar/online/[slug]` | [pages/online-slug.md](./pages/online-slug.md) | `src/app/ar/online/[slug]/page.tsx` |
| `/ar/privacy-policy` | [pages/privacy-policy.md](./pages/privacy-policy.md) | `src/app/ar/privacy-policy/page.tsx` |
| `/ar/terms-and-conditions` | [pages/terms-and-conditions.md](./pages/terms-and-conditions.md) | `src/app/ar/terms-and-conditions/page.tsx` |

---

## Reading a page spec

Each page spec follows the same template:

1. **§1 Section sequence (MUI source)** — the order of components rendered on the page.
2. **§2 Page-level layout rhythm** — `marginY`/`paddingY` between sections (almost always `my-[5vh] md:my-[10vh]`).
3. **§3 Container / max-width rules** — outermost wrapper, sticky-header padding-top.
4. **§4 Section components used** — bullets linking to per-component specs.
5. **§5 Tailwind port status** — line-numbered bug list against the current `page.tsx`.
6. **§6 Verification at 4 widths** — 375, 768, 1280, 1920.
7. **§7 SEO / metadata** — `metadata` exports, JSON-LD blocks.

When fixing a page, start by verifying the **section sequence** matches MUI. Then verify the **inter-section margins**. Most page-level bugs are these two — the rest live in the individual component specs.

## The universal page rhythm template

Most pages in this codebase follow this skeleton (see [pages/home.md](./pages/home.md) for the full example).

### CRITICAL: header compensation

MUI's `<Header>` outer Box is `position: absolute` (no flow space). Tailwind's is `position: sticky` (consumes `calc(2vh + 72px)` at xs / `calc(2vh + 80px)` at sm+). Every page must compensate for this difference. Two patterns:

**Pattern A — full-viewport hero (100vh module CSS container):**
```tsx
// In page.tsx — pass heroClassName for correct gradient strip
<Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />

// In page.module.css — negative margin-top to cancel header flow height
// .container { height: 100vh; margin-top: calc(-2vh - 72px); }
// @media (min-width: 600px) { .container { margin-top: calc(-2vh - 80px); } }
<div className={styles.container}>
  <HeroSection />
</div>
```

**Pattern B — standard padding-top hero:**
```tsx
<Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />

{/* padding-top equals sticky header height + MUI original pt */}
<div className="pt-[calc(2vh+72px)] sm:pt-[calc(2vh+80px)] lg:pt-[70px]">
  <HeroSection />
</div>
```

**Sections after the hero** — separated by `my-[5vh] md:my-[10vh]` wrappers (matches MUI `marginY: { xs: "5vh", md: "10vh" }`):

```tsx
<>
  <Header heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70" />

  {/* Hero — compensate for sticky header (Pattern A or B per page) */}
  <div className={styles.container}>
    <HeroSection />
  </div>

  {/* Sections — my-[5vh] md:my-[10vh] is the standard inter-section rhythm */}
  <DirectFollowupSection />

  <div className="my-[5vh] md:my-[10vh]">
    <NextSection />
  </div>

  <SectionWithOwnInternalMargins />

  <div className="my-[5vh] md:my-[10vh]">
    <ContactOrFinalSection />
  </div>

  <ServerFooter />
</>
```

Bookmark this — most pages reuse it. Page-specific specs only document deviations. Always check [components/shared/header.md §5](./components/shared/header.md) for the full heroClassName + compensation pattern before editing any page.
