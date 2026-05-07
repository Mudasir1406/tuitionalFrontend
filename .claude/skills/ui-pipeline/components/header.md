# Component: Header

**File:** [src/components/header.tsx](../../../../src/components/header.tsx)
**AR twin:** none — uses `useI18n()` `isRTL` flag for nav-item swap; rest direction-neutral via logical properties
**Priority:** P1 hotspot
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** `4969d2b`
**Migrated commit:** `30e01f6`

## Audit summary

Header was previously approved in earlier session with `shadow-header` token added to [tailwind.config.ts](../../../../tailwind.config.ts) and decorative circles + AppBar shape verified against baseline. Per "Reset to my plan" direction, re-examined under current methodology. Found 3 minor residual drifts.

## Defects fixed

### 1. Left decorative circle missing animation ([header.tsx:54-57](../../../../src/components/header.tsx#L54))

- **Before:** static circle, no animation.
- **After:** added `lg:animate-[bounceAndForword_4s_linear_infinite_alternate]` (lg-only per baseline `leftCircle.animation: { lg: ... }`).
- **Why:** baseline `styles.leftCircle.animation.lg = "bounceAndForward 4s linear infinite alternate"`. `bounceAndForword` (misspelled) is the canonical keyframe name in [globals.css:354](../../../../src/app/globals.css#L354) — preserved per RULES.md legacy-misspelling rule.
- Right circle has its animation **commented out in baseline** (`// animation: rightCircleAnimation 6s ...`) — kept current behavior (no animation) ✓.

### 2. Desktop logo width drift ([header.tsx:74](../../../../src/components/header.tsx#L74))

- **Before:** `w-[200px]`.
- **After:** `w-[203px]`.
- **Why:** baseline `image.width: 203` (also matches mobile logo). Single-source pixel match.

### 3. WhatsApp floater icon color ([header.tsx:140](../../../../src/components/header.tsx#L140))

- **Before:** `https://img.icons8.com/?size=100&id=DUEq8l5qTqBE&format=png&color=000000` (black PNG).
- **After:** `https://img.icons8.com/fluency/100/whatsapp.png` (WhatsApp green per brand identity).
- **Why:** baseline rendered colored WhatsApp icon (per user-supplied screenshot showing green floater).

### 4. AI Digital SAT button removed ([header.tsx:106-121](../../../../src/components/header.tsx#L106))

- **Before:** outlined `AI Digital SAT` button visible alongside `Book Demo Classes`.
- **After:** removed; only `Book Demo Classes` + `RouteLanguageSwitcher` in actions cluster.
- **Why:** MUI baseline had the outlined button **commented out** (`{/* <Button variant="outlined" sx={styles.outlinedBtn}> */}`). Tailwind migration uncommented it incorrectly. Production tuitionaledu.com renders without it — per user-supplied screenshot 2026-05-07.

## Preserved as-is (already correct)

- AppBar chrome: `sticky top-0 z-[1000] mx-[5vw] mt-[2vh] w-[90%] rounded-md bg-white/70 shadow-header` matches baseline.
- Min-height `min-h-[72px] sm:min-h-20` (matches baseline Toolbar 56/64 + AppBar paddingY 2vh ≈ 72/80px verified in earlier session).
- Nav typography: `text-[2.1vh] font-normal leading-[1.84vh]` matches baseline `styles.typography`.
- Book Demo contained button: `rounded-[10px] py-[1.5vh] text-[1.5vh] font-bold leading-[1.84vh] tracking-[-0.02em] shadow-brand-glow` matches baseline `styles.containedBtn`.
- WhatsApp position `right-0 bottom-0 fixed` (locked LTR per baseline; doesn't flip in RTL).
- WhatsApp animation: `animate-[rotateAnimation_2s_ease-in-out_infinite]` matches baseline `styles.whatsapp.animation`.
- Hero gradient strip: `bg-hero-fade` named token. Final spec (2026-05-07): `linear-gradient(to bottom, #DBF1FF, #EDF8FF)` — top-of-header blue to bottom-of-header whitish. Strip height shrunk from `10/10/20/30vh` to `90px / sm:100px / lg:110px` so gradient is confined to header band. Section directly below header (`with_form` in [grade-subject-level-v2.tsx:36](../../../../src/components/grade-subject-level/grade-subject-level-v2.tsx#L36)) updated to solid `bg-[#F5FBFF]` so the strip→section transition is imperceptible (`#EDF8FF` → `#F5FBFF` Δ ≈ 8/3/0 RGB). Earlier iterations: `#D7F0FF → rgba(255,255,255,0.7)` (whitish bottom) caused visible seam against `#D7F0FF` with_form; an interim alpha-only fade was rejected because user-spec required exact stop colors.

## Compliance

- **Tokens:** brand-500, success (#51B893), white/70, hero-fade, header shadow, brand-glow shadow.
- **Hygiene:** no `style={{}}`, no `sx`, no `@mui/*`. `cn()` used.
- **Responsive:** mobile-first cascade (default mobile / sm 600 / md 900 / lg 1200). Decorative circles + nav + buttons scale per breakpoint.
- **RTL:** logical `start-*`, `end-*`, `me-*`, `ms-*` everywhere except WhatsApp floater (intentionally physical `right-0` per baseline locked behavior).
- **A11y:** decorative circles `aria-hidden`. Mobile menu button has `aria-label="Open menu"`. Logo has alt text (Arabic-aware).
- **Lint:** ✓ `npm run lint` clean.

## Approval

- **Approved 2026-05-05** — left circle animation restored, desktop logo width corrected, WhatsApp icon switched to colored fluency variant.
- **Updated 2026-05-07** — AI Digital SAT button removed to match MUI baseline (commented out in pre-migration source) and current production render.
- **Updated 2026-05-07** — `hero-fade` token finalized to `linear-gradient(to bottom, #DBF1FF, #EDF8FF)` with strip height shrunk to header band (`90/100/110px`). `with_form` section bg switched to `#F5FBFF` per user color spec. Resolves visible seam below header strip.
