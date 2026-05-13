# Example 07 — `<Header>` (Sticky Nav + Mobile Drawer)

The sticky glassmorphic AppBar that appears at the top of every page. Switches between desktop nav and hamburger drawer.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\header.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\header.tsx` |

---

## §1 MUI source — extracted properties

### Container chrome (`styles.container`)

| Property | Value | Tailwind |
|---|---|---|
| `width` | `90%` | `w-[90%]` |
| `border-radius` | `10px` | `rounded-md` (10px is the MUI default border-radius token) |
| `box-shadow` | `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` | `shadow-header` (already in tailwind.config.ts) |
| `background-color` | `rgba(255,255,255,0.7)` | `bg-white/70` |
| `justify-content` | `{ md: "space-between", lg: "space-evenly" }` | `md:justify-between lg:justify-evenly` |
| `margin-top` | `2vh` | `mt-[2vh]` |
| `padding-y` | `1vh` | `py-[1vh]` |
| `z-index` | `1000` | `z-[1000]` |
| `align-items` | `center` | `items-center` |
| `margin-left` | `5vw` | `ms-[5vw]` (RTL-aware) |
| AppBar `position` | `sticky` | `sticky top-0` |

### Critical breakpoint: desktop nav ↔ mobile drawer

**The cutover is at `lg` (1200px).** Below 1200, everything is hamburger; at 1200+, the full desktop nav appears.

| Element | Visible at | MUI display object | Tailwind |
|---|---|---|---|
| Full logo (200×49) | `lg+` only | `{ xs/sm/md: "none", lg: "flex" }` | `hidden lg:flex` |
| Mobile logo | below `lg` | `{ md: "flex", lg: "none" }` | `flex lg:hidden` |
| Nav links typography | `lg+` only | `{ xs/sm/md: "none", lg: "flex" }` | `hidden lg:flex` |
| Outlined CTA "AI Digital SAT" | `lg+` only | `{ xs/sm/md: "none", lg: "flex" }` | `hidden lg:flex` |
| Contained CTA "Book Demo" | `lg+` only | `{ xs/sm/md: "none", lg: "flex" }` | `hidden lg:flex` |
| `<MenuRoundedIcon>` (hamburger) | below `lg` | `{ xs/sm/md: "flex", lg: "none" }` | `flex lg:hidden` |

**Bug to watch for**: Tailwind ports often use `md:hidden` / `md:flex` for the cutover. That puts the desktop nav on at 900px — iPad Mini and iPad Air would show desktop nav (with no room). Use `lg:` consistently.

### Nav link typography

| Property | Value |
|---|---|
| `font-size` | `2.1vh` |
| `font-weight` | `400` |
| `line-height` | `1.84vh` |
| `text-align` | `center` |
| `color` | `black` |

Tailwind: `text-[2.1vh] leading-[1.84vh] font-normal text-black`. **Note**: the project's `font-heading` (League Spartan) is applied via `className={leagueSpartan.className}` separately — keep that.

### Contained button "Book Demo"

| Property | Value |
|---|---|
| `box-shadow` | `0.1vh 1.5vh 3.4vh 0px #38B6FF66` | `shadow-brand-glow` |
| `background-color` | `#38B6FF` | `bg-brand-500` |
| `padding-y` | `1.5vh` | `py-[1.5vh]` |
| `font-size` | `1.5vh` | `text-[1.5vh]` |
| `font-weight` | `700` | `font-bold` |
| `line-height` | `1.84vh` | `leading-[1.84vh]` |
| `letter-spacing` | `-2%` (= -0.02em) | `tracking-[-0.02em]` |
| `border-radius` | `1vh` | `rounded-[1vh]` |
| `:hover` keeps everything the same | (intentional — no hover delta) | no `hover:` overrides |

### Outlined button "AI Digital SAT"

| Property | Value |
|---|---|
| `color` | `#51B893` | `text-success` |
| `border-color` | `#51B893` | `border-success` |
| `padding-y` | `1.2vh` | `py-[1.2vh]` |
| `padding-x` | `1.5vw` | `px-[1.5vw]` |
| `font-size` | `1.5vh` | `text-[1.5vh]` |
| `font-weight` | `700` | `font-bold` |
| `line-height` | `1.84vh` | `leading-[1.84vh]` |
| `min-width` | `fit-content` | `min-w-fit` |
| `white-space` | `nowrap` | `whitespace-nowrap` |
| `transition` | `none` | `transition-none` |
| Variant: `outlined` | also add `border` and the success color | `border bg-transparent` |

### Mobile menu icon

| Property | Value |
|---|---|
| `color` | `#38B6FF` | `text-brand-500` |
| `width/height` | `4vh × 4vh` | `h-[4vh] w-[4vh]` |
| `margin-right` | `1vw` | `me-[1vw]` (RTL-aware) |

### Decorative circles (`leftCircle`, `rightCircle`)

Both absolute, blue (`#38B6FF`), full radius, behind content.

`leftCircle`:
| Property | xs / sm / md / lg | Tailwind |
|---|---|---|
| `width`, `height` | `3vh` / `4.5vh` / `5vh` / `7.5vh` | `h-[3vh] w-[3vh] sm:h-[4.5vh] sm:w-[4.5vh] md:h-[5vh] md:w-[5vh] lg:h-[7.5vh] lg:w-[7.5vh]` |
| `top` | `1.7vh` | `top-[1.7vh]` |
| `left` | `1.2vw / 2.5vw / 5vw / 4.5vw` | `left-[1.2vw] sm:left-[2.5vw] md:left-[5vw] lg:left-[4.5vw]` |
| `animation` | `lg: "bounceAndForward 4s linear infinite alternate"` (note: typo "Forward" vs "Forword" in globals.css) | `lg:animate-[bounceAndForword_4s_linear_infinite_alternate]` (use the typo'd name to match globals.css keyframe) |

`rightCircle`:
| Property | xs / sm / md / lg |
|---|---|
| `width`, `height` | `6vh / 7vh / 8vh / 10.9vh` |
| `top` | `3.2vh` |
| `right` | `3.5vw` (constant) |
| animation | commented out — no animation applied |

### Background gradient strip

A purely decorative `<Box>` behind the AppBar:

| Property | Value |
|---|---|
| `position` | `absolute` |
| `width` | `100%` |
| `height` | `{ xs/sm: "10vh", md: "20vh", lg: "30vh" }` |
| Background | None (just transparent positioning) |

→ `absolute w-full h-[10vh] md:h-[20vh] lg:h-[30vh]`. The shape provides visual breathing room behind the sticky AppBar; not strictly required but contributes to the "floating glass" feel.

### Fixed WhatsApp button (bottom-right)

| Property | Value |
|---|---|
| `position` | `fixed` |
| `bottom`, `right` | `0`, `0` |
| `padding` | `5` (= 40px) | `p-10` |
| `z-index` | `1000` | `z-[1000]` |
| `animation` | `rotateAnimation 2s ease-in-out infinite` | `animate-[rotateAnimation_2s_ease-in-out_infinite]` |

Width/height of the actual icon: 60×60.

---

## §2 The two most common header port bugs

1. **Wrong cutover breakpoint.** Many ports use `md:` (900) instead of `lg:` (1200) for the desktop-nav vs hamburger toggle. The result: iPad Mini, iPad Air, iPad Pro 11" all try to show the full nav, which doesn't fit. **Always use `lg:`** unless MUI explicitly uses `md`.

2. **Missing `font-heading` on nav links.** The MUI source applies `className={leagueSpartan.className}` to every nav `<Typography>`. The Tailwind port must include `font-heading` on each nav link `<span>` / `<a>` / `<p>`. Without it, links render in Inter (body font), looking out of place.

---

## §3 Tailwind port — quick audit checklist

When reviewing `tuitionalFrontend\src\components\header.tsx`:

- [ ] Container: `w-[90%] rounded-md bg-white/70 shadow-header ms-[5vw] mt-[2vh] py-[1vh] z-[1000] items-center sticky top-0 md:justify-between lg:justify-evenly`
- [ ] Desktop nav, logo, buttons all hidden below `lg` (`hidden lg:flex`)
- [ ] Hamburger visible below `lg` only (`flex lg:hidden`)
- [ ] Nav link styles: `text-[2.1vh] leading-[1.84vh] font-normal text-black font-heading` (font-heading from leagueSpartan)
- [ ] Contained button: `bg-brand-500 shadow-brand-glow py-[1.5vh] text-[1.5vh] font-bold leading-[1.84vh] tracking-[-0.02em] rounded-[1vh] hidden lg:flex`
- [ ] Outlined button: `text-success border-success py-[1.2vh] px-[1.5vw] text-[1.5vh] font-bold leading-[1.84vh] min-w-fit whitespace-nowrap transition-none hidden lg:flex`
- [ ] Hamburger icon: `text-brand-500 h-[4vh] w-[4vh] me-[1vw] flex lg:hidden`
- [ ] Decorative circles: animation applied at `lg:` only (left), responsive sizes
- [ ] WhatsApp: `fixed bottom-0 right-0 p-10 z-[1000] animate-[rotateAnimation_2s_ease-in-out_infinite]`
- [ ] RTL: every flex container has `rtl:flex-row-reverse`; every `ms-*`/`me-*` is RTL-aware automatically; logos and menu offsets have `isRTL` conditional logic preserved.

---

## §4 Verification

- **375px**: hamburger visible on right, mobile logo on left. No desktop links/buttons visible. WhatsApp button bottom-right (rotating slowly).
- **768px** (iPad Mini): still hamburger — desktop nav must NOT appear here.
- **1024px** (iPad Pro 12.9): still hamburger.
- **1280px** (Laptop S): hamburger hidden, full nav visible. Outlined "AI Digital SAT" green, contained "Book Demo" blue with glow.
- **1920px**: same as 1280, but with more horizontal space — `lg:justify-evenly` spreads items further apart.
- **RTL**: at any width, layout mirrors. The 5vw `marginLeft` becomes `marginRight` automatically via `ms-*`. The MenuRoundedIcon switches to left side.
