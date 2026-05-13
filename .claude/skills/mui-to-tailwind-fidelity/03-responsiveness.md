# 03 — Responsiveness Verification

20-device matrix + Chrome DevTools workflow + per-device check list. A change that hasn't been visually verified against the MUI baseline at the four reference widths is not done.

---

## §1 The 20-device test matrix

These are the exact viewport sizes that Chrome DevTools ships with (or that match common physical devices). Walk through them in this order — mobile-up — so each test builds on the last.

### Mobile (9 devices)

| # | Device | Viewport (CSS px) | DPR | Tailwind band |
|---|---|---|---|---|
| 1 | iPhone SE (2/3) | 375 × 667 | 2 | base |
| 2 | iPhone 12 mini | 360 × 780 | 3 | base |
| 3 | iPhone 14 | 390 × 844 | 3 | base |
| 4 | iPhone 14 Pro Max | 430 × 932 | 3 | base |
| 5 | Samsung Galaxy S8+ | 360 × 740 | 4 | base |
| 6 | Samsung Galaxy S20 Ultra | 412 × 915 | 3.5 | base |
| 7 | Samsung Galaxy A51/A71 | 412 × 914 | 2.625 | base |
| 8 | Pixel 5 | 393 × 851 | 2.75 | base |
| 9 | Pixel 7 | 412 × 915 | 2.625 | base |

All mobile devices fall under the `base` Tailwind band (< 600px). Watch for MUI's mobile rem shrink (`html { font-size: 15px }`) — confirm it's reproduced (see [04-foundation-fixes.md](./04-foundation-fixes.md)).

### Tablet & small laptop (7 devices)

| # | Device | Viewport (CSS px) | DPR | Tailwind band |
|---|---|---|---|---|
| 10 | Surface Duo | 540 × 720 | 2.5 | base (under 600) |
| 11 | iPad Mini | 768 × 1024 | 2 | `sm:` (≥600) |
| 12 | iPad Air | 820 × 1180 | 2 | `sm:` |
| 13 | iPad Pro 11" | 834 × 1194 | 2 | `sm:` |
| 14 | Surface Pro 7 | 912 × 1368 | 2 | `sm:` |
| 15 | Nest Hub | 1024 × 600 | 1 | `lg:` (≥1200… edge case below) |
| 16 | iPad Pro 12.9" | 1024 × 1366 | 2 | `md:` (≥900, <1200) |

**Edge case**: Surface Duo at 540px is mobile, even though "tablet-class device". Test it.
**Edge case**: Nest Hub at 1024 × 600 is short and wide — vertical rhythm bugs surface here.

### Laptop & desktop (4 devices/sizes)

| # | Device | Viewport (CSS px) | DPR | Tailwind band |
|---|---|---|---|---|
| 17 | Laptop S | 1280 × 800 | 1 | `lg:` (≥1200) |
| 18 | Laptop M | 1440 × 900 | 1-2 | `lg:` |
| 19 | Laptop L / Desktop FHD | 1680 × 1050 or 1920 × 1080 | 1-2 | `xl:` (≥1500 in this repo) |
| 20 | Desktop XL / QHD | 2560 × 1440 | 1-2 | `2xl:` (≥2000) |

### Reference widths (mandatory for every fix)

If you can only test four widths, use these — they cover one device from each Tailwind band:

| Width | Represents | Band |
|---|---|---|
| 375 | iPhone SE | base (mobile) |
| 768 | iPad Mini | `sm:` (tablet) |
| 1280 | Laptop S | `lg:` (desktop) |
| 1920 | Desktop FHD | `xl:` (large desktop) |

---

## §2 Chrome DevTools workflow

Goal: side-by-side visual diff between MUI baseline and Tailwind port at each device size.

### Setup (one-time)

1. Open the Tailwind project: `cd C:\Users\pc\Desktop\Work\Tuitional\tuitionalFrontend && yarn dev` — serves on `http://localhost:3000`.
2. Open the MUI baseline in a **separate terminal**: `cd C:\Users\pc\Desktop\Work\Tuitional\tuitionalFrontend-mui-baseline && yarn dev --port 3001` — serves on `http://localhost:3001`.
3. Open two Chrome windows side-by-side. Left = MUI baseline (`:3001`), Right = Tailwind port (`:3000`).

### Per-fix workflow

For each component or page you've changed:

1. **Open both windows to the same route.** E.g. left = `localhost:3001/contact`, right = `localhost:3000/contact`.
2. **Open DevTools in both** (`Ctrl+Shift+I`) and toggle Device Toolbar (`Ctrl+Shift+M`).
3. **Step through the 20 devices** in the dropdown. At each device:
   - Eyeball typography: same size? same line breaks?
   - Eyeball grid/flex: same column count? same wrapping?
   - Eyeball spacing: vertical rhythm between sections matches?
   - Eyeball images: same aspect ratio? no overflow?
   - Eyeball CTAs: button tap-target ≥ 44 × 44 px?
   - Check `Console` for warnings (key errors, hydration mismatches).
4. **Log mismatches** in a checklist as you go. Don't try to fix mid-walk — finish the walk, then triage.
5. **At each Tailwind breakpoint boundary (599→600, 899→900, 1199→1200, 1499→1500)** also test ±1 px (drag the responsive frame). Boundary bugs hide here.
6. **Test both `dir="ltr"` (English) and `dir="rtl"` (Arabic)** by navigating to the `/ar/...` equivalent route. RTL changes flex direction and text-align — verify both.

### What "matches" means

- Typography: same `font-size` at the same width (use DevTools Inspector to check `computed` styles when in doubt — sizes should match to ±0.1px).
- Spacing: same vertical and horizontal gaps. Measure with the DevTools ruler / spacing overlay (Element panel → hover the box).
- Grid: same number of columns at the same width.
- Color: same hex (eyedrop with DevTools color picker if in doubt — bg / text / shadow).

Differences ≤ 2px in margins or ≤ 1px in typography are tolerated. Anything larger is a regression — fix or document.

---

## §3 Per-device check list (run this at every viewport)

| # | Check | What to look for |
|---|---|---|
| 1 | Typography size | Heading + body match MUI at this width. No truncation, no overflow. |
| 2 | Line wrapping | Headlines/copy wrap at same point as MUI (a font-size mismatch shows here first). |
| 3 | Grid column count | Same number of columns. Critical at 600 / 900 / 1200 boundaries. |
| 4 | Vertical rhythm | Inter-section margins look the same. Especially hero → next section gap. |
| 5 | Image aspect / size | Images don't stretch, crop, or overflow. Same height as MUI. |
| 6 | CTA tap target | Primary button is ≥ 44 × 44 px on touch viewports (1-9, 10). |
| 7 | Horizontal scroll | None. No element extends past `100vw`. Check by scrolling left-right. |
| 8 | Form input zoom | Tapping an input on mobile does **not** trigger iOS zoom (input must be ≥ 16px). |
| 9 | Sticky / fixed elements | Header, footer, drawer overlays — no layout jump on scroll. |
| 10 | Modal / dialog | Dialogs are dismissible, content fits within viewport, no scroll-lock fail. |
| 11 | Drawer breakpoint | Hamburger appears at correct breakpoint (matches MUI). |
| 12 | RTL mirroring | When `dir="rtl"`, layout mirrors. Icons that should NOT flip (chevrons in some contexts) don't flip. |

---

## §4 Common responsive bugs and the device that surfaces them

| Bug | Surfaces at |
|---|---|
| `sm:grid-cols-2` should be `lg:grid-cols-2` | iPad Mini (768), iPad Pro 12.9 (1024) — looks squashed |
| Mobile `font-size: 15px` rem shrink not reproduced | Any mobile device — copy/heading appears ~6.7% larger than MUI |
| iOS-zoom on input | Real iPhone (DevTools alone won't surface — test on a physical phone or by tapping with touch mode on) |
| Hero `vh` height too tall on short screens | Nest Hub (1024 × 600), iPhone SE landscape |
| `xl:` breakpoint mismatch (1500 vs 1536) | Laptop L between 1500-1535 — Tailwind kicks in early |
| Padding using fixed `px` where MUI used `vh` | Larger tablets where `vh` would be much greater (iPad Pro 12.9) |
| Drawer breakpoint set too low | iPad Mini / Air — drawer appears when full nav should be visible (or vice versa) |
| Heading h1 stays desktop-sized on tablet | iPad Mini / Air — h1 looks oversized (mobile/tablet/desktop triplet missed) |

---

## §5 Verification report template

When fixing a component, paste this into the PR/commit message after the walk-through:

```
Verified against MUI baseline at:
- [ ] 375 (iPhone SE)
- [ ] 768 (iPad Mini)
- [ ] 1280 (Laptop S)
- [ ] 1920 (Desktop FHD)
- [ ] dir="rtl" at 375
- [ ] dir="rtl" at 1280

Devices spot-checked from the 20-device matrix:
- [ ] iPhone 14 (390)
- [ ] Samsung Galaxy S20 Ultra (412)
- [ ] Surface Duo (540) — boundary case
- [ ] iPad Pro 12.9 (1024) — boundary case
- [ ] Nest Hub (1024 × 600) — short viewport

Regressions caught: <list> or "none"
```

A fix without this report is not done.

---

## §6 When the MUI baseline isn't available locally

If `tuitionalFrontend-mui-baseline` won't build (broken deps, missing env, etc.):

1. Read the MUI source file directly and **build a mental model** of expected layout at each width based on `sx={{ ... }}` values.
2. Capture reference screenshots from production at `https://tuitionaledu.com` if those routes are live (the MUI baseline is the deployed production design).
3. Take measurements with DevTools on the production site at each of the 4 reference widths. Write the expected px values into the per-component spec file before changing the Tailwind port.

Don't skip verification just because the baseline won't boot — the production site is the same design.
