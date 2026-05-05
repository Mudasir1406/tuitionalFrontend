# Component: Container (house primitive)

**File:** [src/components/ui/container.tsx](../../../../src/components/ui/container.tsx)
**AR twin:** none — symmetric layout
**Priority:** P0
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** N/A — file new in migration. `git show 4969d2b:src/components/ui/container.tsx` returns *path exists on disk, but not in '4969d2b'*.
**Migrated commit:** `30e01f6`

## Audit summary

- Replaces MUI `<Container maxWidth="...">`. Pure layout primitive: max-width + horizontal gutters + element-tag swap.
- Size map mirrors MUI `maxWidth` 1:1:
  - `sm` → `max-w-screen-sm` (600px)
  - `md` → `max-w-screen-md` (900px)
  - `lg` → `max-w-screen-lg` (1200px) — default, matches MUI default
  - `xl` → `max-w-screen-xl` (1500px)
  - `2xl` → `max-w-screen-2xl` (2000px)
- 4 callers (pricing client pages + sections). All conformant.
- No typography baked in — children provide their own font/color/size.

## Defects

1. **Stale skill-path comment** ([container.tsx:6](../../../../src/components/ui/container.tsx#L6)): `mui-to-tailwind/Cookbook.md §3` does not exist. Fix applied: replaced with this audit reference.

## Compliance

- **Tokens:** breakpoint screens map to tailwind.config.ts custom screens (sm 600 / md 900 / lg 1200 / xl 1500 / 2xl 2000).
- **Hygiene:** no `style={{}}`, no `sx`, no `@mui/*`. `cn()` used.
- **Responsive:** `px-4 sm:px-6 lg:px-8` gutter cascade (16/24/32px).
- **RTL:** symmetric padding, no logical-property issue.
- **A11y:** `as` prop allows semantic landmark elements (`section`, `main`, `nav`, etc.).

## Approval

- **Approved 2026-05-04** — primitive structurally sound; only stale comment ref updated.
