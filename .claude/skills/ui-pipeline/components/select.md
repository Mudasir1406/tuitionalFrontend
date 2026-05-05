# Component: Select (house primitive)

**File:** [src/components/ui/select.tsx](../../../../src/components/ui/select.tsx)
**AR twin:** none — primitive uses logical `ps-*`/`pe-*` + `start-*`/`end-*` for RTL
**Priority:** P0
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** N/A — file new in migration. `git show 4969d2b:src/components/ui/select.tsx` returns *path exists on disk, but not in '4969d2b'*.
**Migrated commit:** `30e01f6`

## Audit summary

- Replaces MUI `<Select>` + `<MenuItem>`. Built on Headless UI Listbox.
- 2 callers, 8 Select instances total:
  - [pricing/CustomPricingModal.tsx](../../../../src/components/pricing/CustomPricingModal.tsx) — 4 instances (grade/level/subject/curriculum per row)
  - [pricing/ArCustomPricingModal.tsx](../../../../src/components/pricing/ArCustomPricingModal.tsx) — 4 instances (Arabic twin)
- Form-only use case site-wide. Baseline pattern: form selects all used `leagueSpartan.className`.

## Defects

1. **Default font-family was `font-body` (Inter)** — does not match MUI baseline form-select pattern (League Spartan via `leagueSpartan.className`). Fix: flipped primitive default to `font-heading`. Single source of truth; both callers + any future caller benefit. No caller-side sweep needed.
2. **Stale skill-path comment** ([select.tsx:18](../../../../src/components/ui/select.tsx#L18)): `mui-to-tailwind/Cookbook.md §10` does not exist. Fix applied: replaced with this audit reference.

## Compliance

- **Tokens:** `text-form-input`, `shadow-card`, `bg-white`, `bg-brand-50`, `text-brand-700`, `text-ink-900/700/500/400/200/100`, `ring-brand-500`. All token-bound.
- **Hygiene:** no `style={{}}`, no `sx`, no `@mui/*`. `cn()` used.
- **Responsive:** `h-11` (44px hit-target), `max-h-60` listbox.
- **RTL:** logical `ps-*`/`pe-*` + `start-*`/`end-*` — auto-flips. Chevron uses `end-0` (auto-flip).
- **A11y:** Headless UI Listbox provides keyboard nav, type-ahead, ARIA, focus management.
- **Lint:** ✓ `npm run lint` clean post-edit.

## Follow-up fix 2026-05-05 — Focus ring removal

Mirroring the Input primitive fix: `focus-visible:ring-2 focus-visible:ring-brand-500` removed from `ListboxButton`. MUI baseline form selects had no visible focus indicator (rendered as styled buttons from MUI Select but with `outline: none` everywhere in form CSS). Replaced with `outline-none focus:outline-none focus-visible:outline-none`.

A11y deviation noted: focus indicator removed by user request to match baseline.

## Approval

- **Approved 2026-05-04** — primitive structurally sound; default font flipped to `font-heading` to match MUI baseline form-select pattern; stale comment ref updated.
- **Approved 2026-05-05** — focus ring removal to match MUI baseline.
