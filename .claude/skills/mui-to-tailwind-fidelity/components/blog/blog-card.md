# Example 04 — Blog Card (`<BlogCard>`)

A blog post tile used in `/blog`, `/blog/category/[slug]`, `/blog/tag/[slug]`, and the related-posts strip. Image + date + title + arrow-CTA. Critical for the blog index visual rhythm.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\blog-card\BlogCard.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\blog-card\BlogCard.tsx` |

---

## §1 MUI source — extracted properties

### Layout

```
.card { border-radius: 8px; overflow: hidden; }
└── .imageWrapper { position: relative; width: 100%; height: 400px }
│   └── Image (border-radius: 16px; object-fit: cover)
└── .textDiv { padding: 10px; display: flex; justify-content: space-between; align-items: center }
    ├── .textDiv_text (left column)
    │   ├── .date <p variant="body1"> { color: #a7a7a7; margin-bottom: 8px } — "DD/MM/YYYY"
    │   └── .title <p variant="subtitle2"> { cursor: pointer } — heroSection.header
    └── .textDiv_text (right column)
        └── .iconDiv { background-color: #38b6ff; width/height: 48px; border-radius: 50px; flex centered; color: white }
            └── <NorthEastIcon> (MUI)
```

### Card-level

| Property | Value |
|---|---|
| Card `border-radius` | **8px** (`rounded-[8px]` or `rounded`) |
| Card `background` | (none — transparent; container provides bg) |
| Card `padding` | (none — text sits flush with card edges, padding only on `.textDiv`) |
| Card `box-shadow` | (none) |
| Card hover | `transform: scale(1.02)` over 0.3s ease — modest |

### Image

| Property | Value |
|---|---|
| Wrapper `width` / `height` | `100% × 400px` (fixed height — does NOT use `aspect-ratio`) |
| Image `border-radius` | `16px` |
| Image `object-fit` | `cover` |

### Text section

| Property | Value |
|---|---|
| `.textDiv` `padding` | `10px` |
| `.textDiv` flex | `space-between`, `align-items: center` |
| `.date` `color` | `#a7a7a7` (light grey) |
| `.date` `margin-bottom` | `8px` |
| `.date` MUI variant | `variant="body1"` → 16px desktop, 15px mobile |
| `.title` MUI variant | `variant="subtitle2"` → 14px (stat-label sizing), `font-weight: 500`, `letter-spacing: 0.05em`, **uppercase via theme**? **No** — MUI's `subtitle2` does not set text-transform; only `categoryTag` does. So `.title` is **mixed case**, 14px, font-weight 500. |
| `.title` `cursor` | `pointer` |

### Icon button

| Property | Value |
|---|---|
| `.iconDiv` `width` / `height` | `48 × 48px` |
| `.iconDiv` `border-radius` | `50px` (effectively full) |
| `.iconDiv` `background-color` | `#38b6ff` (brand-500) |
| `.iconDiv` `color` | `white` |
| `.iconDiv` `box-shadow` | (none) |
| `.iconDiv` shape | flex centered |
| Icon | `<NorthEastIcon>` from `@mui/icons-material` (∽ arrow up-right) |

---

## §2 Tailwind port — bugs found

Reading `tuitionalFrontend\src\components\blog\blog-card\BlogCard.tsx`:

| # | Line(s) | Current Tailwind | Should be (per MUI) |
|---|---|---|---|
| B1 | 31 | `rounded-xl` (24px) | `rounded-[8px]` — MUI `.card` has 8px |
| B2 | 31 | `bg-white p-3 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]` | Remove — MUI `.card` has no background, no padding, no shadow. The current Tailwind invented a card chrome that MUI doesn't have. |
| B3 | 32 | `aspect-square w-full overflow-hidden rounded-lg` | `relative h-[400px] w-full overflow-hidden rounded-[16px]` — MUI uses **fixed 400px height**, not square aspect ratio. The `aspect-square` makes the card too short on narrow viewports and too tall on wide ones. |
| B4 | 32 | `rounded-lg` (16px) on wrapper | The 16px radius is on the **image** in MUI, not the wrapper. But practically `overflow-hidden + rounded-[16px]` on the wrapper achieves the same effect — ✓ acceptable. |
| B5 | 40 | `flex items-end justify-between gap-3 px-1 pt-4 pb-2` | `flex items-center justify-between gap-3 p-[10px]` — MUI uses `items-center` (not end), and uniform `padding: 10px`, not asymmetric. |
| B6 | 42 | `font-heading text-small text-ink-700` for date | `font-body text-body-mobile sm:text-body text-[#a7a7a7]` — MUI used `variant="body1"` (16px desktop), not 14px small. Color is exactly `#a7a7a7`, not `ink-700`. **And date should be in `font-body`** because variant="body1" uses Inter not League Spartan. (Although the MUI component does add `leagueSpartan.className` to the `<Typography>`, overriding to League Spartan — so actually `font-heading` is correct here. The MUI `Typography variant="body1"` would normally use body font, but the explicit className wins.) |
| B7 | 43 | (no `mb-[8px]` on date) | Add `mb-[8px]` — MUI `.date { margin-bottom: 8px }` |
| B8 | 46 | `mt-2 font-heading text-h5 uppercase text-ink-900` for title | `font-heading text-small text-ink-900 font-medium` — MUI used `variant="subtitle2"` → 14px stat-label sizing without uppercase (subtitle2 is NOT uppercase, despite stat-label class being uppercase elsewhere). And no `mt-2` — the date's `mb-[8px]` is the only gap. Current `text-h5` is 18px desktop → way larger than MUI's 14px. **Major visual regression.** |
| B9 | 46 | `uppercase` on title | Remove — MUI doesn't uppercase `.title` |
| B10 | 46 | `hover:text-brand-500` | Acceptable — MUI has no hover but the brand-blue hover hint matches the broader project hover style |
| B11 | 53 | `h-12 w-12 ... shadow-[0_4px_12px_0_rgba(56,182,255,0.4)] hover:bg-brand-600` | `h-12 w-12 rounded-full bg-brand-500 text-white` — MUI `.iconDiv` has **no shadow** and **no hover bg change**. Remove the shadow and the hover. (Keep `h-12 w-12 rounded-full` — those match MUI's 48×48 border-radius:50px.) |
| B12 | 56 | `<ArrowUpRight size={22} />` (lucide) | Acceptable swap for MUI's `<NorthEastIcon>` — visually identical glyph |
| B13 | (missing) | (no hover on `.card`) | Add `hover:scale-[1.02] transition-transform duration-300` on the outer `<div>` to match MUI `.card:hover { transform: scale(1.02); transition: transform 0.3s ease }` |

---

## §3 The corrected component

```tsx
function BlogCard({ data }: Props) {
  const pathname = usePathname();
  const isArabicRoute = pathname.startsWith("/ar");
  const blogBaseUrl = isArabicRoute ? "/ar/blog" : "/blog";

  return (
    <div className="overflow-hidden rounded-[8px] transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-[400px] w-full overflow-hidden rounded-[16px]">
        <Image
          src={data?.heroSection?.image || dummyImg1}
          alt={data?.heroSection?.imageAltText || ""}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-between p-[10px]">
        <div className="flex-1">
          <p className="mb-[8px] font-heading text-body-mobile text-[#a7a7a7] sm:text-body">
            {moment(data?.timestamp?.seconds * 1000).format("DD/MM/YYYY")}
          </p>
          <a href={`${blogBaseUrl}/${data?.slugData}`}>
            <p className="cursor-pointer font-heading text-small font-medium text-ink-900 hover:text-brand-500">
              {data?.heroSection?.header}
            </p>
          </a>
        </div>
        <a
          href={`${blogBaseUrl}/${data?.slugData}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
          aria-label="Read more"
        >
          <ArrowUpRight size={22} />
        </a>
      </div>
    </div>
  );
}
```

---

## §4 Why each correction matters

- **B3 (image height)** — `aspect-square` on a 300px-wide card → 300px tall. On a 600px-wide card → 600px tall. MUI baseline keeps a constant 400px regardless of width, producing a more uniform grid. Visual difference is dramatic at desktop widths.
- **B8 (title size)** — current `text-h5` (18px) makes the title compete with adjacent UI for attention; MUI's 14px subtitle2 keeps it secondary to the image. This is a categorical visual hierarchy bug.
- **B6 (date color)** — `text-ink-700` is `#3A3A3A` (near-black), MUI's `#a7a7a7` is a true light grey. The date should recede.
- **B2 (card chrome)** — the invented white background + shadow makes the card look "Material UI"-y in the worst sense. MUI baseline lets cards sit on the page background with only image+text — much cleaner.

---

## §5 Reusable lessons for any card-style component

1. **Cards rarely have their own background in this design system.** Most cards rely on their container's background. Check MUI before adding `bg-white shadow-card` reflexively.
2. **Card images use `height: 400px` (fixed), not `aspect-square`.** Across the codebase (`BlogCard`, `TeacherCard`, `ImageCard`), fixed pixel heights are the norm. Use `aspect-square` only when MUI explicitly used `aspect-ratio: 1`.
3. **Typography variants matter precisely.** `variant="body1"` (16px) and `variant="subtitle2"` (14px) are NOT swappable for `text-h5` (18px). When you see `<Typography variant="body1">`, the answer is `text-body-mobile sm:text-body`, not `text-h5`.
4. **MUI material icons → lucide-react swaps** are acceptable when visually identical. `NorthEastIcon` → `ArrowUpRight` ✓. But `SchoolOutlinedIcon` → `GraduationCap` ✗ (different glyph — fine for this design system but verify).
5. **Hover effects in MUI's CSS modules** (`.card:hover {}`) — port to Tailwind via `hover:` modifiers, including the `transition-*` so the effect is smooth.
