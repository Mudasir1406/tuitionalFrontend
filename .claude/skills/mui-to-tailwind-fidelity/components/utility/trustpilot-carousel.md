# Component — `TrustpilotCarousel`

Auto-scrolling testimonial carousel with 1-up mobile / 3-up desktop layout, swipe support, dots indicator. Reviews are hard-coded in `useMemo` inside the file. Both repos use the same `TrustpilotCarousel.module.css` verbatim.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\trustpilot-carousel\TrustpilotCarousel.tsx` + `TrustpilotCarousel.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\trustpilot-carousel\TrustpilotCarousel.tsx` + `TrustpilotCarousel.module.css` |

## §1 MUI source — extracted properties

All visible styling is in `TrustpilotCarousel.module.css` (the port preserves this file). The TSX only assembles the JSX tree.

### Layout tree

```
Box.carouselContainer            (w 100%, max-w 1200, mx auto, padding 3rem 1rem 2rem 1rem, overflow visible)
├── Box.header                    (text-center)
│   ├── Typography variant=h4 .title         "What Our Students Say"
│   └── Typography variant=body1 .subtitle   (optional text)
├── Box.carouselWrapper           (relative, flex items-center, gap 1rem, overflow visible)
│   └── Box.reviewsContainer      (flex 1, padding 2rem 2rem 1.5rem 2rem, overflow visible)
│       └── Grid container spacing={2} .reviewsGrid  (flex, padding 0.5rem 0)
│           └── Grid item xs={12} md={4} .reviewGridItem  (flex justify-center, padding 0 0.5rem)
│               └── Box.reviewCard         (white bg, border 1px #e0e0e0, radius 12px, p 1.5rem, h 280px,
│                                           flex col justify-between, shadow `0 2px 12px rgba(0,0,0,0.08)`,
│                                           w 100%, max-w 350px, animate slideIn 0.5s)
│                   ├── Box.starsContainer (flex gap 2px, mb 1rem)
│                   ├── Typography h6 .reviewTitle    (fs 1.1rem, weight 600, color #333, mb 0.75rem, lh 1.3)
│                   ├── Typography body2 .reviewText  (fs 0.95rem, color #555, lh 1.5, mb 1rem, flex 1, line-clamp 4)
│                   └── Box.reviewFooter   (flex justify-between items-end, mt auto)
│                       ├── Box.reviewerInfo (flex col)
│                       │   ├── Typography body2 .reviewerName (fs 0.9rem, weight 600, color #333)
│                       │   └── Typography caption .timePosted (fs 0.8rem, color #888)
│                       └── Box.verifiedBadge (flex items-center gap 0.25rem)
│                           ├── VerifiedIcon .verifiedIcon (color #00B67A, fs 1rem)
│                           └── Typography caption .verifiedText (fs 0.75rem, weight 500, color #00B67A)
└── Box.dotsContainer            (flex justify-center gap 0.5rem)
    └── Box.dot × 6              (8x8, radius 50%, bg #ddd, .dotActive { bg #00B67A, scale 1.2 })
```

### Dimensions & spacing — all in `TrustpilotCarousel.module.css`

| Element | Property | Default | ≤1024 / ≥769 | ≤768 | ≤480 |
|---|---|---|---|---|---|
| .carouselContainer | padding | `3rem 1rem 2rem 1rem` | `3rem 2rem 2rem 2rem` | `3rem 1rem 2rem 1rem` | `1.5rem 0.5rem` |
| .carouselContainer | max-width / margin | 1200px / 0 auto | same | same | same |
| .carouselWrapper | gap | 1rem | same | 0.5rem | same |
| .reviewsContainer | padding | `2rem 2rem 1.5rem 2rem` | same | `2rem 1.5rem 1.5rem 1.5rem` | `1rem 1rem 0.5rem 1rem` |
| .reviewsGrid | padding | `0.5rem 0` | same | same | same |
| .reviewGridItem | padding | `0 0.5rem` | same | same | same |
| .reviewCard | padding / height / max-w | 1.5rem / 280px / 350px | (same except max-w 320px) | 1.25rem / 260px / none (margin 0 0.5rem) | 1rem / 240px / inherit |
| .navButton | size | 48×48px | 44×44px | 40×40px | 36×36px |
| .starsContainer | margin-bottom | 1rem | same | same | same |
| .reviewTitle | margin-bottom | 0.75rem | same | same | same |
| .reviewText | margin-bottom | 1rem | same | same | same |
| .reviewerName | margin-bottom | 0.25rem | same | same | same |
| .dot | size | 8×8px | same | same | same |
| .dotsContainer | gap | 0.5rem | same | same | same |

### Typography — overridden by CSS module with `!important`

| Element | MUI variant | Default | ≤768 | ≤480 |
|---|---|---|---|---|
| .title | h4 | **2.5rem** (40px) `!important`, weight 700, color #333 | 2rem (32px) | 1.75rem (28px) |
| .subtitle | body1 | **1.1rem** (17.6px) `!important`, color #666 | 1rem | same |
| .reviewTitle | h6 | **1.1rem** (17.6px) `!important`, weight 600, color #333, lh 1.3 | 1rem | same |
| .reviewText | body2 | **0.95rem** (15.2px) `!important`, color #555, lh 1.5 | 0.9rem | same |
| .reviewerName | body2 | **0.9rem** (14.4px) `!important`, weight 600, color #333 | same | same |
| .timePosted | caption | **0.8rem** (12.8px) `!important`, color #888 | same | same |
| .verifiedText | caption | **0.75rem** (12px) `!important`, weight 500, color #00B67A | same | same |
| .trustpilotText | — | 18px, weight 600, color #00B67A | same | same |
| .star | — | 1.2rem | same | same |

The `!important` matters — they override the MUI Typography variant defaults. Translate as literal `rem` arbitrary values; do NOT map to the typography triplet tokens.

### Colors

| Element | Color |
|---|---|
| .title / .reviewTitle / .reviewerName / .excellentText | #333 / #1a1a1a |
| .subtitle | #666 |
| .reviewText | #555 |
| .timePosted | #888 |
| .starFilled / .verifiedIcon / .verifiedText / .dotActive | `#00b67a` (Trustpilot green) |
| .starEmpty | #ddd |
| .reviewCard bg | white |
| .reviewCard border | #e0e0e0 |
| .dot bg | #ddd |
| .arrowIcon | #666 |

### Animations / interactions

- `@keyframes slideIn` — opacity 0 → 1, translateX 30px → 0. Applied to `.reviewCard { animation: slideIn 0.5s ease-out }`.
- `.reviewCard:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.12); transform: translateY(-2px) }`.
- `.dot:hover { background-color: #00B67A }`, `.dotActive { transform: scale(1.2) }`.
- Auto-advance every 4s while `isAutoScrolling`. Pause for 8-10s after manual swipe / dot click.
- Touch swipe handler with 50px threshold.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 151 | uses `styles.carouselContainer` (CSS module) | matches MUI 1:1 (verbatim CSS module copy) | ✓ |
| 2 | 153-156 | `<h4 className={styles.title}>` and `<p className={styles.subtitle}>` | matches MUI Typography variant=h4/body1 (the CSS module's `!important` rules override variant defaults — semantically `<h4>` is fine) | ✓ |
| 3 | 168 | `className={`${styles.reviewsGrid} grid grid-cols-1 gap-4 md:grid-cols-3`}` | MUI uses `<Grid container spacing={2}><Grid item xs={12} md={4}>` → 1 col on xs (default), **3 cols starting at md (900px)** because each item is 4/12 wide. Port: `md:grid-cols-3` (kicks in at md = 900 in this repo) matches. The `gap-4` (16px) matches MUI `spacing={2}` (16px). However the port ALSO keeps the CSS-module `.reviewsGrid { display: flex; padding: 0.5rem 0 }` — combining `display: flex` from CSS with `display: grid` from Tailwind. Tailwind class wins by specificity (last in cascade), but the CSS module is now partially dead. | LOW — visually fine but mixes paradigms |
| 4 | 170-172 | `<div className={styles.reviewGridItem}>` per review | MUI `<Grid item xs={12} md={4}>` translates to no explicit class on the child once the parent is `grid grid-cols-1 md:grid-cols-3` — children fill their cells automatically. The `.reviewGridItem` class (padding 0 0.5rem) is still applied via CSS module — fine, but redundant. | LOW |
| 5 | 195 | Replaced MUI `VerifiedIcon` (Material Icons) with `BadgeCheck` (lucide-react) | Different icon family — visually different glyph. MUI VerifiedIcon is the filled MUI checkmark badge; BadgeCheck is the lucide outline. | MED — visual divergence in the verified badge |
| 6 | 211-222 | `<button type="button" className={...} aria-label=...>` for dots | MUI used `<Box ... onClick>` (a `<div>`). Port using `<button>` is semantically better and keyboard-accessible. | ✓ improvement |
| 7 | (CSS module) | All `!important` rules preserved via shared `.module.css` | matches MUI 1:1 — same file copied byte-for-byte | ✓ |
| 8 | (TSX) | No nav arrow buttons rendered in port OR MUI — both omit | matches | ✓ |
| 9 | 158 | `<p ... >{text && text}</p>` is rendered even when `text` is falsy (empty paragraph) | MUI does the same (`{text&& text}`) — both render empty `<p>` when text is undefined. Functionally equivalent. | ✓ — match |
| 10 | (TSX) | `display: flex` in `.reviewsGrid` CSS module overlaps with `grid` from Tailwind | When two `display` rules conflict, the one with higher specificity / later cascade wins. The Tailwind `grid` (utility class) typically wins over `.reviewsGrid` (single class selector) only because Tailwind utilities come AFTER CSS modules in the bundle. Verify in DevTools. To be safe, drop the redundant `.reviewsGrid` class. | LOW — risk of cascade surprise |

### Summary

**1 visible bug** (#5 — icon family swap from MUI `VerifiedIcon` to lucide `BadgeCheck`). Everything else is structurally faithful because the CSS module was copied verbatim.

Note: Per project rule "No CSS Modules outside `quill/`", this CSS-module port may eventually need to be flattened into Tailwind classes. If that migration is requested, mirror every value in `TrustpilotCarousel.module.css` into arbitrary Tailwind classes — there are no token-level shortcuts because of the `!important` rem overrides.

## §3 Corrected Tailwind classNames

For bug #5 — replace `BadgeCheck` import with an MUI-equivalent fill-style icon. lucide's closest match is `BadgeCheck` already; if the design demands the MUI filled checkmark badge, use `ShieldCheck` (filled-style) or commit to a custom SVG. Recommended minimal fix:

```tsx
// Pick an icon that visually matches the MUI VerifiedIcon (filled green badge with white check):
// Option A — keep lucide, accept slight stylistic delta (current state)
import { BadgeCheck } from "lucide-react";

// Option B — use a hand-rolled SVG matching MUI's geometry exactly
const VerifiedSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 .96 8.6 1.5 6.71 4.7 3.1 5.51l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
  </svg>
);
```

If accepting the lucide swap (Option A), the only "fix" is documenting that the verified badge looks slightly different from MUI. No className changes required.

If migrating off the CSS module, every selector in `TrustpilotCarousel.module.css` needs to be inlined. That's a separate larger task; see this file's CSS extraction tables above for the literal values.

## §4 Verification at 4 widths

- 375 (≤480 band): container padding `1.5rem 0.5rem`, 1 review visible, card 240px tall + 1rem padding, dots row at bottom. Title 1.75rem (28px). Review title 1rem (16px).
- 768 (≤768 band, tablet bottom of range): container padding `3rem 1rem 2rem 1rem` (default class) BUT the `@media (max-width: 768px)` block adds `3rem 1rem 2rem 1rem` (same). 1 review visible (window.innerWidth < 768 ? 1 : 3, runtime check). Title 2rem (32px). Card 260px tall.
- 1280 (default): 3 reviews visible (md:grid-cols-3 at 900+). Title 2.5rem (40px). Card 280px tall, max-w 350px.
- 1920: same as 1280.

## §5 RTL notes

- The carousel uses `flex` / `grid` with no directional padding asymmetry except `.carouselContainer { padding: 3rem 1rem 2rem 1rem }` (top-right-bottom-left order). The 1rem left and 1rem right are equal, so no flip needed.
- `.reviewsContainer { padding: 2rem 2rem 1.5rem 2rem }` — also symmetric horizontally.
- `.reviewFooter { justify-content: space-between }` — reviewer info on the left, verified badge on the right in LTR; flips automatically in RTL.
- `.starsContainer` and `.verifiedBadge` use `gap` — direction-agnostic.
- The `@keyframes slideIn` translates `translateX(30px) → 0` — this is **direction-fixed** (always slides from the right side regardless of locale). For pure RTL fidelity, the keyframe would need a mirrored variant. MUI source does not address this; port matches.
- CSS modules are NOT auto-flipped by `stylis-plugin-rtl` (Emotion-only). All directional rules in `TrustpilotCarousel.module.css` need to be manually inspected for RTL — but as shown above, every padding/margin in the file is symmetric.
