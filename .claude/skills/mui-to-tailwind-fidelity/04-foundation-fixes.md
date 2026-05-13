# 04 — Foundation File Fixes

Some MUI behaviors live below the per-component layer — in `globals.css` or `tailwind.config.ts`. Trying to fix them by adding classes to each component is wasted effort: do them once at the foundation.

This file is the audit of what's required at the foundation, what's already in place, and what still needs to change.

---

## §1 Current state of `src/app/globals.css` (Tailwind side)

**Audited against `tuitionalFrontend-mui-baseline\src\app\globals.css`** — the lines that matter for typography/spacing rhythm.

| MUI behavior | Status in Tailwind side | Action |
|---|---|---|
| `html { font-size: 16px }` base | ✓ Present (line 433-436 in globals.css) | None |
| `html { font-size: 15px }` at `max-width: 599px` | ✓ Present (line 600-603) | None — leave as-is |
| Inputs forced to 16px on mobile (iOS zoom guard) | ✓ Present (line 622-627) | None |
| `body { line-height: 1.7 }` via `--lh-body` | ✓ Present (line 438-444) | None |
| `h1-h3 font-weight: 700` + `h4-h6 font-weight: 600` | ✓ Present (line 447-465) | None |
| `h1-h6` desktop sizes (3rem / 2.25rem / 1.5rem / 1.25rem / 1.125rem / 1rem) | ✓ Present (line 467-501) | None |
| `h1-h5` tablet override at `max-width: 1199px` | ✓ Present (line 581-597) | None |
| `h1-h4` mobile override at `max-width: 599px` | ✓ Present (line 605-616) | None |
| `p { margin: 0 0 1.25rem }` | ✓ Present (line 504-507) | None |
| `small { font-size: 0.875rem; line-height: 1.5 }` | ✓ Present (line 514-518) | None |
| `a { text-decoration: none }` | ✓ Present (line 527-531) | None |
| Reduced motion media query | ✓ Present (line 88-97) | None |
| RTL font-family override | ✓ Present (line 60-69) | None |
| Focus-ring suppression on inputs (`@tailwindcss/forms` override) | ✓ Present (line 18-28) — this is a Tailwind-only addition, not in MUI baseline; correct as-is | None |

**Verdict**: the typography foundation is already in good shape. Most fidelity bugs are at the per-component layer, not in globals.css.

---

## §2 Foundation gaps that DO require fixes

### Gap A: `xl` breakpoint divergence (Tailwind 1500 vs MUI 1536)

**Issue.** `tailwind.config.ts` sets `xl: "1500px"` but MUI uses `xl: 1536`. Any component that ports MUI's `xl` to Tailwind's `xl:` is off by 36px in the 1500–1535 band.

**Audit before fixing.** Run `grep -rn "xl:" src/components src/app/**/page.tsx` to count current `xl:` usage. The Explore agent reported only 12 occurrences project-wide, so the blast radius is small.

**Fix (optional — only do this if `xl:` divergence is observed on the device matrix).**

Edit `tailwind.config.ts`:

```ts
screens: {
  sm: "600px",
  md: "900px",
  lg: "1200px",
  xl: "1536px",      // was: "1500px" — aligns with MUI default xl
  "2xl": "2000px",
},
```

Then re-verify each of the 12 sites that used `xl:` — they may have been calibrated against the 1500 number.

**Recommendation**: defer this fix. Most laptop displays sit at 1280, 1440, 1680, or 1920 — the 1500-1535 band is rare. Only fix if QA flags a visible bug.

### Gap B: MUI animation keyframes that aren't surfaced through Tailwind config

`globals.css` (Tailwind side) defines `pulse`, `leftCircleAnimation`, `rightCircleAnimation`, `bounce`, `bounceOnce`, `delayAndBounce`, `filterAnimation`, `rotateAnimation`, `swing`, `bounceAndForword`, `slide`. But `tailwind.config.ts` only exposes `pulse`, `left-circle`, `right-circle` as Tailwind `animate-*` classes (with hyphenated names).

**Current outcome.** Components needing `bounce`, `swing`, etc. fall back to inline `style={{ animation: "bounceOnce 0.5s ease-in-out infinite" }}` (works, but un-Tailwindy) or use `animate-[bounce_2s_ease-in-out_infinite]` arbitrary syntax referencing the camelCase keyframe.

**Fix (only when a component actually needs one of these animations).**

For a one-off use, use the arbitrary syntax:

```tsx
className="animate-[bounce_2s_ease-in-out_infinite]"
```

For a recurring use (e.g. `swing` on multiple components), promote it to `tailwind.config.ts`:

```ts
keyframes: {
  // existing pulse, left-circle, right-circle...
  swing: {
    "0%":   { transform: "rotate(-10deg)" },
    "50%":  { transform: "rotate(10deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
},
animation: {
  // existing...
  swing: "swing 1s ease-in-out infinite",
},
```

Then use `animate-swing`. **Don't add animations you don't currently need.**

### Gap C: Legacy class-based image sizing (`.girl`, `.girlGrid`, `.girlContact`)

`globals.css` lines 106-237 define complex media-query-driven sizes for `.girl`, `.girlGrid`, `.girlContact` classes. These are legacy — they target the hero illustration on the contact page and were ported as-is.

**Status.** These rules exist in both Tailwind and MUI globals.css. They use plain pixels at custom breakpoints (400, 800, 900, 1000, 1200, 1350, 1500, 1650, 2000).

**Recommendation**: leave them. Do not migrate to Tailwind utility classes — the breakpoint set is custom and component-coupled. If a contact/home hero illustration looks wrong, debug here first.

---

## §3 `tailwind.config.ts` — confirmed already correct

Re-confirming what `tuitionalFrontend\tailwind.config.ts` already has and doesn't need to change:

| Section | Current state | Required state | Status |
|---|---|---|---|
| `screens.sm` | `600px` | `600px` (MUI default) | ✓ |
| `screens.md` | `900px` | `900px` (MUI default) | ✓ |
| `screens.lg` | `1200px` | `1200px` (MUI default) | ✓ |
| `screens.xl` | `1500px` | `1536px` (MUI default) | ⚠ off by 36px (Gap A above) |
| `colors.brand.50` | `#D7F0FF` | `#D7F0FF` | ✓ |
| `colors.brand.500` | `#38B6FF` | `#38b6ff` | ✓ (case-insensitive match) |
| `colors.success` | `#51B893` | `#51B893` / `rgba(81, 184, 147, 1)` | ✓ |
| `colors.warning` | `#FFB000` | `#FFB000` | ✓ |
| `colors.danger` | `#B70000` | `#B70000` | ✓ |
| `fontFamily.heading` | `var(--font-league-spartan)` | League Spartan | ✓ |
| `fontFamily.body` | `var(--font-inter)` | Inter | ✓ |
| `fontFamily.arabic` | `var(--font-noto-arabic)` | Noto Sans Arabic | ✓ |
| `fontSize.h1` / `h2` / `h3` / `h4` / `h5` / `h6` | desktop sizes | matches `typographyTokens.ts` | ✓ |
| `fontSize.h1-tablet` etc. | tablet sizes | matches `typographyTokens.ts` | ✓ |
| `fontSize.h1-mobile` etc. | mobile sizes | matches `typographyTokens.ts` | ✓ |
| `fontSize.body` / `body-mobile` / `small` | matches MUI body1/body2/small | ✓ |
| `fontSize.button` / `button-mobile` / `nav` / `form-label` / `form-input` | matches MUI tokens | ✓ |
| `fontSize.stat-number` / `stat-number-tablet` / `stat-number-mobile` / `stat-label` / `category-tag` / `caption` | matches MUI tokens | ✓ |
| `borderRadius` scale (sm/DEFAULT/md/lg/xl/full) | sane values | matches MUI inline usage | ✓ |
| `boxShadow.card` / `brand-glow` / `benefit-box` / `header` / `footer-card` / `cta-white` | matches MUI inline strings | ✓ |
| `backgroundImage.hero-fade` / `footer-fade` / `benefit-fade` | matches MUI inline gradients | ✓ |

**Verdict**: tailwind.config.ts is correct except for `screens.xl` (optional fix). Don't waste cycles on it unless a real bug surfaces.

---

## §4 Hard rules for editing foundation files

1. **Never** add a token that isn't already in MUI. The Tailwind config is a 1:1 mirror, not an expansion.
2. **Never** rename an existing token (e.g. `text-h1` → `text-heading-1`). Components reference the current names; renames break imports silently in CSS strings.
3. **Never** delete a token without grepping for usage first: `grep -rn "text-h1-tablet\|h1-tablet" src/`.
4. When you add a token (rare), it must trace to a specific line in `typographyTokens.ts` or `theme.ts` from the MUI baseline. Cite the source line in the commit message.
5. Foundation changes ship as their own PR — never bundled with a component fix. They're high-blast-radius and reviewers need to see them isolated.

---

## §5 Foundation file inventory (for reference)

| Tailwind side | MUI baseline counterpart | Edit allowed? |
|---|---|---|
| `tuitionalFrontend\tailwind.config.ts` | `tuitionalFrontend-mui-baseline\src\app\assets\css\theme.ts` (NOT a Tailwind config — design-system mirror only) | Yes, with §4 rules |
| `tuitionalFrontend\src\app\globals.css` | `tuitionalFrontend-mui-baseline\src\app\globals.css` | Yes, with §4 rules |
| `tuitionalFrontend\src\app\fonts.ts` | `tuitionalFrontend-mui-baseline\src\app\fonts.ts` | Match 1:1 — same font imports, same `variable` settings. Don't add a new font. |
| `tuitionalFrontend\src\app\layout.tsx` | `tuitionalFrontend-mui-baseline\src\app\layout.tsx` | Foundation — wraps everything in providers. Don't add a second `ThemeProvider` or `LanguageProvider`. |
