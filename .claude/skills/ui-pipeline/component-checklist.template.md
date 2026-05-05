# Component Checklist Template

Copy this file to `.claude/skills/ui-pipeline/components/<component-name>.md` when starting work on a component. Fill in metadata, work the checklist top-to-bottom, present diff + completed checklist to user for approval before moving on.

Cross-references:
- Tokens: [Design.md](../Design.md) §1–4 + [tailwind.config.ts](../../../../tailwind.config.ts)
- Hygiene: [RULES.md](../RULES.md) §RULE-19 + [UI.md](../UI.md) §15
- Gates: [QA.md](../QA.md) QA-00..QA-16

---

# Component: <name>

**File:** [<path>](<path>)
**AR twin:** [<path>](<path>) — or `none`
**Priority:** P0 | P1 | P2 | P3
**Status:** todo | in-progress | qa | awaiting-approval | done
**Live MUI ref URL(s):** `<https://tuitionaledu.com/...>` — section anchor / selector
**Last MUI commit (pre-migration ref):** `<sha>`
**Migrated commit:** `<sha>`

## A. Pre-fix audit

- [ ] Live MUI rendering captured (URL + computed-style notes for key elements: container, headings, body, buttons, cards, shadows)
- [ ] Pre-migration intent captured (`git show <sha>:<file>` excerpt or screenshot)
- [ ] Defect list enumerated (tokens, spacing, shadows, radii, typography, responsive, RTL, motion, a11y)
- [ ] Reusable house-primitive opportunities identified ([src/components/ui/](../../../../src/components/ui/))

## B. Tokens (Design.md §1–4 + tailwind.config.ts)

- [ ] All colors use `brand-*` / `ink-*` / `success` / `warning` / `danger` (no `text-[#…]`, `bg-[#…]`, `border-[#…]`)
- [ ] All typography uses `text-h1..h6`, `text-body`, `text-button`, `text-small`, `text-nav`, `text-form-*`, `text-stat-*`, `text-category-tag` (no arbitrary `text-[Npx]`)
- [ ] Border radius uses `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` (no `rounded-[Npx]` unless legacy carry-over with comment)
- [ ] Shadows use `shadow-card`, `shadow-brand-glow`, `shadow-header`, `shadow-footer-card`, `shadow-cta-white`
- [ ] Spacing on Tailwind 4-px scale (no `gap-[Npx]`, `p-[Npx]`, `m-[Npx]` unless documented exception)

## C. Tailwind hygiene (RULE-19 + UI.md §15)

- [ ] No `style={{}}` (or justified — animation/transform only, with inline comment)
- [ ] No `sx=` prop
- [ ] No `@mui/*` / `@emotion/*` import (verify with grep)
- [ ] `cn()` used for every conditional class (no string concat in className)
- [ ] No `!important` in classes
- [ ] No new `.module.css` file
- [ ] Icons from `lucide-react` only
- [ ] Interactive primitives use `@headlessui/react`

## D. Responsive (QA-09)

- [ ] Renders without horizontal scroll at 320, 600, 900, 1200, 1500, 1920
- [ ] Mobile-first cascade (default → sm: → md: → lg: → xl: → 2xl:)
- [ ] Form inputs ≥16px font-size on mobile (prevents iOS zoom)
- [ ] Hit targets ≥ 44×44px on mobile
- [ ] Images use `next/image` with explicit width/height + descriptive alt

## E. RTL & i18n (QA-04 + QA-05)

- [ ] Logical properties used (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`)
- [ ] No `flex-row-reverse` driven by `isRTL`
- [ ] No `style={{ direction: ... }}`
- [ ] AR twin updated lockstep (or N/A documented)
- [ ] Any new user-facing string lives in BOTH `src/locales/en.json` and `src/locales/ar.json`
- [ ] `t()` invoked as function `t("key.path")`, never `t.key`

## F. Behavior

- [ ] Hover state matches live MUI ref
- [ ] Focus visible + keyboard reachable
- [ ] Loading states use Tailwind `animate-*`
- [ ] Errors via `toast.error()`, success via `toast.success()` (no `alert()`/`window.confirm()`)
- [ ] Reduced-motion respected (`@media (prefers-reduced-motion: reduce)` — confirm globals.css rule still applies)

## G. Build & static checks

- [ ] `npm run lint` — 0 errors
- [ ] `npm run build` — success
- [ ] No new console errors / warnings in dev
- [ ] No bundle-size regression (eyeball `.next/server/` output if material change)

## H. Visual diff

- [ ] Local screenshot at 360 EN
- [ ] Local screenshot at 768 EN
- [ ] Local screenshot at 1200 EN
- [ ] Local screenshot at 1500 EN
- [ ] AR matrix (360 / 768 / 1200 / 1500) — if AR twin or RTL-affected
- [ ] Diff vs. live MUI ref noted; intentional drift documented below

### Deviations from live MUI ref (and reason)

<!-- One bullet per intentional drift, or "none" -->
- 

## I. Approval

- [ ] User reviewed diff
- [ ] User approved on `<YYYY-MM-DD>`
- [ ] `tasks.md` line updated to ✓
