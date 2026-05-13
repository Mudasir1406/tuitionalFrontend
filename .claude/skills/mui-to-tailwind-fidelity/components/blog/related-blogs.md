# Component — `<RelatedBlogs>`

3-card strip rendered at the bottom of a blog detail article. Renders a "Related Blogs" centered heading plus up to 3 `<BlogCard>` tiles.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\relatedBlogs\RelatedBlogs.tsx` + `RelatedBlogs.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\relatedBlogs\RelatedBlogs.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-relatedBlogs\Ar-RelatedBlogs.tsx` (RTL: no layout diff) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
├── <Typography variant="h4" .heading> "Related Blogs" (centered)
└── <div .blogContainer>
    └── BlogCard × ≤3
```

### Dimensions & spacing

| Element | Property | <768px | 768-1024px | 1025-1440px | ≥1441px |
|---|---|---|---|---|---|
| `.heading` | text-align | center | center | center | center |
| `.blogContainer` | grid template | `auto-fit minmax(300px, 1fr)` | **2 cols** | **3 cols** | **3 cols** |
| `.blogContainer` | gap | `20px` | `20px` | `20px` | `20px` |
| `.blogContainer` | padding | `20px` | `20px` | `20px` | `20px` |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| "Related Blogs" | `h4` | 16px | 18px | 20px | 600 | inherits | League Spartan |

### Colors

No tokens specific to this component — inherits page background.

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| RB1 | 11 | `<p className="text-center font-heading text-h4">Related Blogs</p>` | Should be `<h4>` not `<p>` (MUI uses `variant="h4" component="p"` — but the semantic role is a heading). Use `<h4 className="text-center font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4">`. The current `text-h4` jumps straight to desktop 20px on mobile; needs the triplet. | high |
| RB2 | 11 | (no `mb-5` or spacing below heading) | Add `mb-5` — naturally MUI uses the grid `padding: 20px` which separates them, but explicit gap is clearer | low |
| RB3 | 12 | `grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 p-5 md:grid-cols-2 lg:grid-cols-3` | OK — closely matches MUI grid behavior. `gap-5` = 20px ✓, `p-5` = 20px ✓, `md:grid-cols-2` ≈ MUI 768px split (Tailwind md=900, drift acceptable), `lg:grid-cols-3` ≈ MUI 1025 split (Tailwind lg=1200, drift ~175px). | low |

---

## §3 Corrected Tailwind classNames

```tsx
<>
  <h4 className="mb-5 text-center font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4 text-ink-900">
    Related Blogs
  </h4>
  <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
    {blogs?.slice(0, 3)?.map((blog) => (
      <BlogCard data={blog} key={blog.id} />
    ))}
  </div>
</>
```

## §4 Verification at 4 widths

- **375**: single column, 300px+ cards via auto-fit. Heading 16px centered.
- **768**: 1 col still (auto-fit 300px minimum; in 768px wrapper this stays 1 col, but with `md:grid-cols-2` engaged at 900px). At 768 Tailwind, only auto-fit applies → 2 cols if container is ≥600 wide.
- **1280**: 3 cols.
- **1920**: 3 cols.

## §5 RTL notes

`Ar-RelatedBlogs.module.css` is identical. No RTL-specific tweaks needed. Heading translates via `useI18n()` — `t.relatedBlogs` (currently hardcoded "Related Blogs" in port).
