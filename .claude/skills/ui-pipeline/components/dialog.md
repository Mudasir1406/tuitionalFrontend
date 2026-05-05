# Component: Dialog (house primitive)

**File:** [src/components/ui/dialog.tsx](../../../../src/components/ui/dialog.tsx)
**AR twin:** none — primitive direction-neutral
**Priority:** P0
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** N/A — file new in migration. `git show 4969d2b:src/components/ui/dialog.tsx` returns *path exists on disk, but not in '4969d2b'*.
**Migrated commit:** `30e01f6`

## Audit summary

- **Replaces:** MUI `<Dialog>` + `<DialogContent>`. Baseline form-dialouge / tutor-modal / pricing modals used MUI Dialog with `MuiPaper-root` set transparent + boxShadow:none, then rendered their own card chrome inside. Other modals used default MUI Dialog chrome.
- **Built on:** Headless UI 2.x → focus trap, Escape, outside click, scroll lock, ARIA — all free.
- **6 callers** site-wide. 4 pass `title` (primitive renders header bar with `font-heading text-h4 text-ink-900` + close button); 2 pass `hideCloseButton` for custom inner header.

| Caller | Mode |
|---|---|
| [home/form-dialouge.tsx:268](../../../../src/components/home/form-dialouge.tsx#L268) | `hideCloseButton size="xl"` |
| [home/tutor-modal.tsx:39](../../../../src/components/home/tutor-modal.tsx#L39) | `hideCloseButton size="lg"` |
| [pricing/SimplePackageModal.tsx:72](../../../../src/components/pricing/SimplePackageModal.tsx#L72) | `title="Build Your Custom Package" size="md"` |
| [pricing/CustomPricingModal.tsx:272](../../../../src/components/pricing/CustomPricingModal.tsx#L272) | `title="Custom Package Builder" size="xl"` |
| [pricing/ArCustomPricingModal.tsx:243](../../../../src/components/pricing/ArCustomPricingModal.tsx#L243) | Arabic title `size="xl"` |
| [grade-subject-level/form/formV2Dialog.tsx:143](../../../../src/components/grade-subject-level/form/formV2Dialog.tsx#L143) | `title="Get Started Today!" size="lg"` |

## Defects

1. **Stale skill-path comment** ([dialog.tsx:19](../../../../src/components/ui/dialog.tsx#L19)): `mui-to-tailwind/Cookbook.md §9` does not exist. Fix applied: replaced with reference to this audit file.
2. (Cosmetic) `rounded-lg` (16px) vs MUI default 8px — preserved current value because baseline form-dialouge had transparent paper anyway; the four `title=` callers use it for visible chrome and 16px is acceptable site-wide.
3. (No-op) `shadow-xl` Tailwind default vs MUI elevation 24 — visually similar; preserved.

## Compliance

- **Tokens:** `text-h4`, `text-ink-900`, `font-heading` on title; `text-ink-700`, `bg-ink-100`, `ring-brand-500` on close button. All token-bound.
- **Hygiene:** no `style={{}}`, no `sx`, no `@mui/*`. `cn()` used.
- **Responsive:** `p-4 sm:p-6` body padding cascade. `max-w-{sm,md,2xl,4xl}` size mapping.
- **RTL:** logical properties in body padding; flex-justify auto-flips.
- **A11y:** Headless UI provides focus trap, ESC, outside click, ARIA.
- **Lint:** ✓ unchanged post-comment edit.

## Approval

- **Approved 2026-05-04** — primitive structurally sound; only stale comment ref updated.
