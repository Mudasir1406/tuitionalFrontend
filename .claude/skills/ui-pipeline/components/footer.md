# Component: Footer + footerV2

**Files:**
- [src/components/footer.tsx](../../../../src/components/footer.tsx) — primary footer
- [src/components/footerV2.tsx](../../../../src/components/footerV2.tsx) — V2 variant (credibility badges + contact info layout)

**AR twin:** none (uses `useI18n()` for direction-neutral content; AR routes render same files with different translations)
**Priority:** P1 hotspot
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** `4969d2b`
**Migrated commit:** `30e01f6`
**User-supplied screenshot reference:** primary footer at desktop width (≥1200px)

## Audit summary

User flagged footer not matching MUI baseline. Provided screenshot of original MUI rendering. Audit revealed multiple typography drifts where current Tailwind used **MUI library default values** for `Typography variant="..."` instead of the **theme.ts overrides** that were in baseline (`src/app/assets/css/theme.ts` + `typographyTokens.ts`).

Post-baseline content addition (commit `7932737` — email/phone contact info in left column) was preserved as feature, not regression.

## Defects fixed

### 1. Admission text typography ([footer.tsx:58](../../../../src/components/footer.tsx#L58))
- **Before:** `text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]` (MUI library default `h2`, IGNORED theme override)
- **After:** `text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem] font-bold leading-[1] tracking-[0.00833em]`
- **Why:** baseline used `Typography variant="subtitle1"`. Theme override = statNumber tokens: 1.75rem mobile / 2.25rem tablet / 3rem desktop, weight 700, lh 1, ls default 0.00833em.

### 2. Phone text typography ([footer.tsx:71](../../../../src/components/footer.tsx#L71))
- **Before:** `text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]` (same wrong as #1)
- **After:** `text-[1.375rem] sm:text-[1.75rem] lg:text-[2.25rem] font-bold leading-[1.25] tracking-[-0.01em]`
- **Why:** baseline used `Typography variant="h2"`. Theme override = h2 tokens: 1.375 / 1.75 / 2.25rem, weight 700, lh 1.25, ls -0.01em.

### 3. Copyright typography ([footer.tsx:305](../../../../src/components/footer.tsx#L305))
- **Before:** `text-sm font-medium leading-[1.57] tracking-[0.00714em]` (MUI library default subtitle2)
- **After:** `text-sm font-medium uppercase leading-[1.4] tracking-[0.05em]`
- **Why:** baseline used `Typography variant="subtitle2"`. Theme override = statLabel tokens: lh 1.4, ls 0.05em, **textTransform uppercase**. Translation `"All Rights Reserved ©2025 Tuitional"` → renders `"ALL RIGHTS RESERVED ©2025 TUITIONAL"` per screenshot.

### 4. Social icons ([footer.tsx:118-151](../../../../src/components/footer.tsx#L118), [footerV2.tsx:108-135](../../../../src/components/footerV2.tsx#L108))
- **Before:** `https://img.icons8.com/?size=40&id=...&color=000000` (40×40, black)
- **After:** `https://img.icons8.com/fluency/48/{facebook-new,instagram-new,linkedin}.png` (48×48 in primary footer, 36×36 in V2 — preserves V2's intentional smaller badge size)
- **Why:** screenshot shows colored brand icons (FB blue, IG gradient, LI blue). icons8 fluency style provides those.

### 5. socialBox top margin ([footer.tsx:115](../../../../src/components/footer.tsx#L115))
- **Before:** `mt-10 lg:mt-5` (40px / 20px)
- **After:** `mt-10 lg:mt-[70px]` (40px / 70px)
- **Why:** baseline `socialBox.marginTop: { xs: "40px", lg: "70px" }`.

### 6. footerV2 copyright ([footerV2.tsx:208](../../../../src/components/footerV2.tsx#L208))
- Same fix as #3: added `uppercase` + corrected lh/ls to subtitle2 theme tokens.

## Preserved as-is (no regression)

- Section headings ("Curriculums", "Subjects", "Get Help", "About Us") — current `text-sm font-bold capitalize` already matches screenshot rendering. Theme.ts has subtitle2 textTransform uppercase, BUT screenshot shows headings in mixed case while copyright is uppercase. Inferred: original styles.heading sx had textTransform reset (or theme uppercase override post-dates the screenshot rendering). Trusted the screenshot. Kept `capitalize` (handles "About us" → "About Us").
- Description ([footer.tsx:108](../../../../src/components/footer.tsx#L108)) — kept current lh 1.43 (matches screenshot visual; theme.ts override of body2 lh to 1.5 is a post-baseline tweak that hasn't manifested visibly).
- About-us links ([footer.tsx:258](../../../../src/components/footer.tsx#L258)) — already responsive lh 35/40/40/45px per baseline. No change.
- Email/phone contact info ([footer.tsx:154-191](../../../../src/components/footer.tsx#L154)) — added in commit `7932737` after baseline. Feature, not regression.
- Decorative circles position — physical (`right-[60px]`, `-left-[230px]`) per baseline, no RTL flip. ✓
- Outer surface gradient `bg-footer-fade`, card shadow `shadow-footer-card`, CTA glow `shadow-cta-white` — all named tokens in [tailwind.config.ts](../../../../tailwind.config.ts), match baseline values. ✓

## Compliance

- **Tokens:** brand-500, ink-900, white, named gradients/shadows. No `text-[#…]`.
- **Hygiene:** no `style={{}}` for typography (only on Image objectFit + alignSelf). No `sx`. No `@mui/*`. `cn()` not needed (single className strings).
- **Responsive:** mobile-first cascade (default → sm: → md: → lg:). Verified at 360 / 600 / 900 / 1200 / 1500 breakpoints.
- **RTL:** logical `me-*`, `ms-*`, `pe-*`, `ps-*` for icon margins. Decorative circles intentionally physical (per baseline behavior).
- **Lint:** ✓ `npm run lint` clean.

## Approval

- **Approved 2026-05-05** — typography matched to MUI baseline theme variants; social icons changed to fluency colored; copyright uppercased to match screenshot; socialBox lg margin corrected; footerV2 mirrored.
