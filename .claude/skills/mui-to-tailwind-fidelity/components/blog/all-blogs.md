# Component — `<AllBlogs>`

Catalog grid for `/blog`. Renders `BlogCard` tiles in a responsive grid with a "More" button that progressively reveals 3 more rows at a time, plus a white fade gradient at the bottom while more remain.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\all-blogs\All-Blogs.tsx` + `All-blogs.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\all-blogs\All-Blogs.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-all-blogs\Ar-All-Blogs.tsx` (RTL: no layout diff) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.blogs (relative wrapper, max-width 1200, my-8 auto)
├── .blogContainer (CSS Grid auto-fit minmax(300px, 1fr), gap 24, padding 20)
│   └── BlogCard × N (slice 0..visibleCount, default 6, +3 per More click)
├── .fadeEffect (absolute, bottom-2vh, height-75vh, linear-gradient transparent→white) [conditional]
└── .loadMoreButton (flex centered, mt-20)
    └── <Button> "More" — contained, brand-blue, w-160, padding-18, radius-10, mt/mb-20
```

### Dimensions & spacing

| Element | Property | <768px | 768-1024px | 1025-1440px | ≥1441px |
|---|---|---|---|---|---|
| `.blogs` | `margin` | `2rem auto` | `2rem auto` | `2rem auto` | `2rem auto` |
| `.blogs` | `max-width` | `1200px` | `1200px` | `1200px` | `1200px` |
| `.blogContainer` | grid template | `auto-fit minmax(300px, 1fr)` | **2 cols** | **3 cols** | **3 cols** |
| `.blogContainer` | `gap` | `24px` | `24px` | `24px` | `24px` |
| `.blogContainer` | `padding` | `20px` | `20px` | `20px` | `20px` |
| `.loadMoreButton` | `margin-top` | `20px` | `20px` | `20px` | `20px` |
| `.fadeEffect` | `height` | `75vh` | `75vh` | `75vh` | `75vh` |
| `.fadeEffect` | `bottom` | `2vh` | `2vh` | `2vh` | `2vh` |

### Typography

Button label inherits MUI `<Button variant="contained">` + `leagueSpartan.className` → `text-button-mobile sm:text-button` (15→16px), font-heading.

### Colors

| Hex | Token |
|---|---|
| `#38b6ff` (button bg) | `bg-brand-500` |
| `linear-gradient(to bottom, transparent, white)` (fade) | `bg-gradient-to-b from-transparent to-white` |

### Animations / interactions

- Button `transition: all 0.5s ease-in-out`, hover `transform: scale(1.02)` + softer brand-glow shadow
- "More" advances `visibleCount` by 3 (initial 6)

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| AB1 | 16 | `relative` | `relative mx-auto my-8 max-w-[1200px] overflow-hidden` — MUI `.blogs { margin: 2rem auto; max-width: 1200px; overflow: hidden }` | high |
| AB2 | 17 | `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3` | The MUI source uses CSS Grid `auto-fit minmax(300px, 1fr)` + breakpoint overrides at **768px (2 cols)** and **1025px (3 cols)**. In Tailwind `md=900, lg=1200`, the closest faithful triplet is `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — current `sm:grid-cols-2` splits 100px too early (600 vs MUI 768) | high |
| AB3 | 17 | `gap-6` (24px) | OK — matches MUI `gap: 24px` | none |
| AB4 | 17 | (no `p-5`) | Add `p-5` — MUI `.blogContainer { padding: 20px }` | med |
| AB5 | 23 | `h-32` (128px) | `h-[75vh] bottom-[2vh]` — MUI fade is 75vh tall, anchored 2vh above bottom (long fade behind the More button) | high |
| AB6 | 23 | `bottom-0 left-0 right-0` | `bottom-[2vh] left-0 right-0 z-10` — MUI sets `z-index: 10` on fade and `z-index: 11` on button so button sits above the fade | med |
| AB7 | 26 | `py-6` | `mt-5 z-[11]` — MUI `.loadMoreButton { margin-top: 20px }` and the button has `z-index: 11` to clear the fade | med |
| AB8 | 27 | Default Button "primary" | The MUI `.containedButton` has explicit: `w-[160px] py-[18px] mx-auto my-5 rounded-[10px] bg-brand-500 shadow-[6px_6px_6px_0px_rgba(56,182,255,0.1)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[6px_6px_6px_0px_rgba(56,182,255,0.46)]` — current relies on default Button width | med |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="relative mx-auto my-8 max-w-[1200px] overflow-hidden">
  <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 lg:grid-cols-3">
    {blogs.slice(0, visibleCount).map((blog) => (
      <BlogCard data={blog} key={blog.id} />
    ))}
  </div>

  {blogs?.length > 3 && visibleCount < blogs.length && (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-[2vh] left-0 right-0 z-10 h-[75vh] bg-gradient-to-b from-transparent to-white"
    />
  )}

  {visibleCount < blogs.length && (
    <div className="z-[11] mt-5 flex items-center justify-center">
      <Button
        onClick={() => setVisibleCount((c) => c + 3)}
        variant="primary"
        className="mx-auto my-5 w-[160px] rounded-[10px] bg-brand-500 px-0 py-[18px] font-heading text-button-mobile shadow-[6px_6px_6px_0px_rgba(56,182,255,0.1)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[6px_6px_6px_0px_rgba(56,182,255,0.46)] sm:text-button"
      >
        More
      </Button>
    </div>
  )}
</div>
```

## §4 Verification at 4 widths

- **375**: 1 column, 300px+ wide cards (auto-fit). Fade visible if >6 blogs.
- **768**: 2 columns (MUI rule kicks in at 768 = Tailwind `md=900` boundary; Tailwind splits 132px later — acceptable drift, but verify the 768-899 band stays single-column in Tailwind whereas MUI shows 2 cols).
- **1280**: 3 columns. Fade strongly visible behind "More".
- **1920**: 3 columns (MUI caps at 3 at this width, not 4 despite the comment in source).

## §5 RTL notes

No RTL-specific layout. `Ar-All-blogs.module.css` is identical apart from container alignment. No additional Tailwind classes needed beyond global `dir="rtl"`.
