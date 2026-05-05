# UI Regression Fix — Component Tracking

**Plan:** [/Users/ammarabid/.claude/plans/hey-so-i-want-goofy-harp.md](C:/Users/ammarabid/.claude/plans/hey-so-i-want-goofy-harp.md)
**MUI baseline commit:** `4969d2b` (2026-03-25) — source of truth for `sx` values, hex codes, theme tokens
**Migration commit:** `30e01f6` (2026-03-25) — first commit of Tailwind state to compare against
**Live MUI deploy (visual ref):** https://tuitionaledu.com/

> **Reset 2026-05-04** — prior tier-based + 1:1-port tracking discarded per user direction. Re-examining Header/Button/PopUpButton/Footer with new methodology. Prior work recoverable from git history.

---

## Methodology (per [plan](C:/Users/ammarabid/.claude/plans/hey-so-i-want-goofy-harp.md))

For every component:

1. Read current Tailwind file + AR twin (if exists).
2. Capture MUI ground truth from BOTH:
   - `git show 4969d2b:<path>` — source code (exact `sx` values, theme tokens)
   - WebFetch corresponding section of https://tuitionaledu.com/... — rendered styling (computed colors/spacing/shadows)
3. Author per-component checklist file at [.claude/skills/ui-pipeline/components/<name>.md](.claude/skills/ui-pipeline/components/) using [.claude/skills/ui-pipeline/component-checklist.template.md](.claude/skills/ui-pipeline/component-checklist.template.md).
4. Render current Tailwind locally at 360 / 768 / 1200 / 1500 EN+AR.
5. Identify defects vs. MUI ground truth: tokens, spacing, shadows, radii, typography, responsive cascade, RTL, hover/focus, motion, a11y.
6. Fix — Tailwind utilities only, `cn()` for conditionals, logical properties for direction. No `style={{}}` (animations only, with comment), no `sx`, no `@mui/*`.
7. Re-render, compare to MUI ground truth.
8. Run QA-00..QA-16 from [.claude/skills/ui-pipeline/QA.md](.claude/skills/ui-pipeline/QA.md).
9. `npm run lint && npm run build` clean.
10. Present diff + completed checklist to user. **STOP. Await approval.** On ✓: mark line below, move on.

---

## Legend

| Symbol | Meaning |
|---|---|
| P0 | Primitive — fix first (everything inherits) |
| P1 | Migration hotspot — high regression probability (5+ recent edits) |
| P2 | Token / responsive debt sweep (post-pilot) |
| P3 | Long-tail component walk (post-pilot) |
| ☐ | todo |
| ▣ | in-progress |
| ◆ | QA |
| ⊕ | awaiting-approval |
| ✓ | done (approved) |

---

## Pilot scope: P0 + P1 (15 components)

### P0 — House primitives (6)

- ✓ [src/components/ui/button.tsx](src/components/ui/button.tsx) → checklist [components/button.md](.claude/skills/ui-pipeline/components/button.md) — primitive structurally OK; font sweep added `font-heading` to 21 Button instances across 19 callers (mirrors MUI baseline `leagueSpartan.className` pattern); 5 form Submit buttons additionally got `leading-[18.4px]`. Approved 2026-05-04.
- ✓ [src/components/ui/input.tsx](src/components/ui/input.tsx) → checklist [components/input.md](.claude/skills/ui-pipeline/components/input.md) — only `Textarea` export used by callers (`Input` export unused). Sweep added `font-heading` to 9 caller `inputCls` constants + 4 inline class strings in GetInTouch. Primitive comment ref unstaled. Lint clean. Approved 2026-05-04.
- ✓ [src/components/ui/dialog.tsx](src/components/ui/dialog.tsx) → checklist [components/dialog.md](.claude/skills/ui-pipeline/components/dialog.md) — primitive structurally sound (Headless UI based, font-heading title, 6 callers all conformant). Only stale comment ref fixed. Approved 2026-05-04.
- ✓ [src/components/ui/drawer.tsx](src/components/ui/drawer.tsx) → checklist [components/drawer.md](.claude/skills/ui-pipeline/components/drawer.md) — primitive structurally sound (Headless UI based, RTL via logical inset + rtl: variants, 1 caller). Only stale comment ref fixed. Approved 2026-05-04.
- ✓ [src/components/ui/select.tsx](src/components/ui/select.tsx) → checklist [components/select.md](.claude/skills/ui-pipeline/components/select.md) — primitive default font flipped `font-body` → `font-heading` (8 Select instances across 2 callers benefit, all baseline form-selects used League Spartan). Stale comment ref fixed. Lint clean. Approved 2026-05-04.
- ✓ [src/components/ui/container.tsx](src/components/ui/container.tsx) → checklist [components/container.md](.claude/skills/ui-pipeline/components/container.md) — pure layout primitive (width + gutters); size map mirrors MUI maxWidth 1:1. 4 callers conformant. Only stale comment ref fixed. Approved 2026-05-04.

### P1 — Migration hotspots (9)

- ✓ [src/components/footer.tsx](src/components/footer.tsx) → checklist [components/footer.md](.claude/skills/ui-pipeline/components/footer.md) — fixed admission_text + phoneText typography (theme variant tokens vs library defaults), copyright uppercase + lh/ls, social icons fluency colored, socialBox lg margin. Approved 2026-05-05.
- ✓ [src/components/footerV2.tsx](src/components/footerV2.tsx) → mirrors footer.md fixes — social icons colored + copyright uppercase. Other v2-specific styling preserved (credibility badges, contact info column). Approved 2026-05-05.
- ✓ [src/components/header.tsx](src/components/header.tsx) → checklist [components/header.md](.claude/skills/ui-pipeline/components/header.md) — re-examined; 3 residual drifts fixed: left-circle lg-only `bounceAndForword` animation restored, desktop logo width 200→203px, WhatsApp icon switched to colored fluency. Approved 2026-05-05.
- ✓ [src/components/drawer.tsx](src/components/drawer.tsx) → checklist [components/drawer-mobile.md](.claude/skills/ui-pipeline/components/drawer-mobile.md) — restored AI Digital SAT outlined button (was missing); logo sized 144×34; Book Demo gained font-heading + tracking + shadow-brand-glow; header padding split→py-[50px]; nav links gained font-heading+text-start. Approved 2026-05-05.
- ✓ [src/components/home/our-client.tsx](src/components/home/our-client.tsx) — Read More buttons (mobile + desktop) gained `font-heading + leading-[18.4px] + tracking-[-0.02em]` (baseline buttonMobile/button styles). Heading + description + stats + review cards already conformant. Approved 2026-05-05.
- ✓ [src/components/home/get-started.tsx](src/components/home/get-started.tsx) — replaced PopUpButton inline `style={{}}` (8 props) with Tailwind className per RULES.md (shadow, bg-brand-500, w-[249px], p-[18px], tracking-[-0.02em], rounded-[10px], mb-9, text-button tokens). Heading + box content already conformant. Approved 2026-05-05.
- ✓ [src/components/grade-subject-level/hero.tsx](src/components/grade-subject-level/hero.tsx) — description size `text-body-mobile sm:text-body` → `text-small` to match baseline `Typography variant="body2"` (theme body2 = 0.875rem/lh 1.5). Heading (h1 theme), stats (caption→text-small), Trustpilot (subtitle2→text-stat-label uppercase) already conformant. Approved 2026-05-05.
- ✓ [src/components/route-language-switcher.tsx](src/components/route-language-switcher.tsx) — radius 10→8px (rounded-md→rounded), added baseline metrics (font-bold, font-heading, text-[1.5vh], leading-[1.84vh], px-[1.5vw], py-[1.2vh], h-auto, transition-none, min-w-fit). FullWidth (drawer) override gets text-[1.1rem]. Container mx-2 added for mobile. Approved 2026-05-05.
- ✓ [src/components/image-card/ImageCard.tsx](src/components/image-card/ImageCard.tsx) — heading text-h3 → subtitle1 theme tokens (1.75/2.25/3rem mobile/tablet/desktop, 700, lh 1); success rate added uppercase+lh 1.4+ls 0.05em (subtitle2 theme); PopUpButton inline `style={{}}` converted to Tailwind className per RULES.md. Approved 2026-05-05.

> **Pilot review gate** — when all 15 above are ✓, present aggregate diff + defect-pattern summary. User decides whether to proceed to P2/P3.

---

## Foundation file edits log (audit trail)

> Every edit to `tailwind.config.ts`, `globals.css`, or any other foundation file is recorded here with: file, what was added/changed, why (which component required it), and the MUI baseline value being preserved.

### Pre-existing tokens (carried over from prior sessions, kept because they're verifiably correct against MUI baseline)

- `tailwind.config.ts` → `theme.extend.boxShadow.header` = `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` (added for Header).
- `tailwind.config.ts` → `theme.extend.boxShadow["footer-card"]` = `5px -5px 8px 0 rgba(0,0,0,0.15) inset, -6px 2px 8px 0 rgba(0,0,0,0.15) inset, 0 4px 4px 0 rgba(0,0,0,0.25)` (added for Footer).
- `tailwind.config.ts` → `theme.extend.boxShadow["cta-white"]` = `1px 15px 34px 0px rgba(0,0,0,0.2)` (added for Footer Enroll-Now CTA).
- `tailwind.config.ts` → `theme.extend.backgroundImage["footer-fade"]` = `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)` (added for Footer outer surface).
- `tailwind.config.ts` → `theme.extend.boxShadow["brand-glow"]` = `0.1vh 1.5vh 3.4vh rgba(56,182,255,0.4)` (carried over).
- `tailwind.config.ts` → `theme.extend.backgroundImage["hero-fade"]` = `linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))` (carried over).

These tokens stay; their values match MUI baseline exactly. New components reuse them. Re-examination of Header/Footer below validates each token still maps to the correct MUI source value.

### New foundation edits during this campaign

<!-- Append: ### YYYY-MM-DD — <component> -->

---

## Per-component results

> Filled in as each component is approved. Each entry links to its detail file under [.claude/skills/ui-pipeline/components/<name>.md](.claude/skills/ui-pipeline/components/).

<!-- Format:
### <component-name>
- **Detail:** [.claude/skills/ui-pipeline/components/<name>.md](.claude/skills/ui-pipeline/components/<name>.md)
- **Foundation edits:** <list or "none">
- **Skill file updates:** <list or "none">
- **Approved:** YYYY-MM-DD
-->
