# Component: Drawer (house primitive)

**File:** [src/components/ui/drawer.tsx](../../../../src/components/ui/drawer.tsx)
**AR twin:** none — RTL handled via logical `insetInlineStart/End` + `rtl:` variants on transforms
**Priority:** P0
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** N/A — file new in migration. `git show 4969d2b:src/components/ui/drawer.tsx` returns *path exists on disk, but not in '4969d2b'*.
**Migrated commit:** `30e01f6`

## Audit summary

- Replaces MUI `<Drawer>`. Built on Headless UI 2.x.
- 1 caller: [src/components/drawer.tsx](../../../../src/components/drawer.tsx) — mobile nav drawer (separate P1 fix slot).
- `side="start"` auto-flips with `dir="rtl"` via logical `insetInlineStart/End` + `rtl:` translate variants (Tailwind 3.x limitation: translate utilities are physical, hence the `rtl:` workaround).
- Chrome: `bg-white shadow-xl`, default width `w-80` (320px). No font baked in — content provides own typography.

## Defects

1. **Stale skill-path comment** ([drawer.tsx:16](../../../../src/components/ui/drawer.tsx#L16)): `mui-to-tailwind/Cookbook.md §8` does not exist. Fix applied: replaced with this audit reference.

## Compliance

- **Tokens:** `shadow-xl` Tailwind default; `bg-white`, `bg-black/50` overlay.
- **Hygiene:** no `style={{}}` (only `positionStyle` for `insetInlineStart/End` — required, no Tailwind utility for logical inset). No `sx`, no `@mui/*`. `cn()` used.
- **Responsive:** `widthClassName` prop allows caller override (e.g., `w-96`).
- **RTL:** logical `insetInlineStart/End` + `rtl:` translate variants — auto-flips.
- **A11y:** Headless UI provides focus trap, ESC, outside click, ARIA.

## Approval

- **Approved 2026-05-04** — primitive structurally sound; only stale comment ref updated.
