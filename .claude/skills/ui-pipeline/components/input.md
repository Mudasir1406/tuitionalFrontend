# Component: Input + Textarea (house primitive)

**File:** [src/components/ui/input.tsx](../../../../src/components/ui/input.tsx)
**AR twin:** none — primitive direction-neutral
**Priority:** P0
**Status:** ✓ done
**Live MUI ref URL(s):** https://tuitionaledu.com/online/english-language-tutors-in-beirut (form region)
**Last MUI commit (pre-migration ref):** N/A — file new in migration commit `30e01f6`. `git show 4969d2b:src/components/ui/input.tsx` returns *path exists on disk, but not in '4969d2b'*.
**Migrated commit:** `30e01f6`

## A. Pre-fix audit

- File new in migration. Replaces MUI `<TextField>` (used directly in baseline forms) and the legacy `<CustomInput>` wrapper.
- 9 callers, all import only the `Textarea` export. The `Input` export is currently unused (text inputs in forms still use the legacy `src/components/input/Input.tsx` and `src/components/custom-input/custom-input.tsx`).
- MUI baseline pattern for form fields: `leagueSpartan.className` applied to inputs site-wide (form, ar-form, custom-input, etc.) — League Spartan font, NOT Inter.
- Site form CSS (`form/style.module.css`): `.input { border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); font-size: 2.3vh }`.
- Site form CSS varies per surface: `Input.module.css` container = 8px radius (inner input = 4px); `apply-now` and `get-in-touch` use `rounded-[5px]`. **No single canonical radius** across baseline — preserved per-form.

## Defects identified

1. **Caller-level `inputCls` constants render in Inter (`font-body` default), not League Spartan.** MUI baseline applied `leagueSpartan.className` per-input. Migration dropped the className.
2. **Stale skill-path comment** ([src/components/ui/input.tsx:6](../../../../src/components/ui/input.tsx#L6)): `mui-to-tailwind/Cookbook.md §11` does not exist. Actual skill is `ui-pipeline/`.
3. (Deferred) Per-form radius variance preserved. No primitive-level radius change — would override all 9 callers and break some intentional per-form drift.
4. (Deferred) PhoneInput container classes in same forms also drift. Tackled when `react-phone-number-input` styling is processed (separate slot).

## Fix applied

### Caller sweep — `font-heading` added to every `inputCls` constant + every inline input class

| File | Constant or inline | Edit |
|---|---|---|
| [src/components/home/form-dialouge.tsx:264](../../../../src/components/home/form-dialouge.tsx#L264) | `inputCls` | `+font-heading` |
| [src/components/home/contact-us.tsx:193](../../../../src/components/home/contact-us.tsx#L193) | `inputCls` | `+font-heading` |
| [src/components/grade-subject-level/form/form.tsx:136](../../../../src/components/grade-subject-level/form/form.tsx#L136) | `inputCls` | `+font-heading` |
| [src/components/grade-subject-level/form/ar-form.tsx:130](../../../../src/components/grade-subject-level/form/ar-form.tsx#L130) | `inputCls` | `+font-heading` |
| [src/components/grade-subject-level/form/formV2.tsx:132](../../../../src/components/grade-subject-level/form/formV2.tsx#L132) | `inputCls` | `+font-heading` |
| [src/components/grade-subject-level/form/formV2Dialog.tsx:139](../../../../src/components/grade-subject-level/form/formV2Dialog.tsx#L139) | `inputCls` | `+font-heading` |
| [src/components/careers/apply-now.tsx:202](../../../../src/components/careers/apply-now.tsx#L202) | `inputCls` (rounded-[5px]) | `+font-heading` |
| [src/components/blog/left-section/BlogSidebarForm.tsx:137](../../../../src/components/blog/left-section/BlogSidebarForm.tsx#L137) | `inputCls` (h-9 w-full) | `+font-heading` |
| [src/components/contact/get-in-touch/GetInTouch.tsx](../../../../src/components/contact/get-in-touch/GetInTouch.tsx) | 4 inline class strings | `+font-heading` (replace_all) |

### Primitive comment fix

[src/components/ui/input.tsx:6](../../../../src/components/ui/input.tsx#L6) — replaced stale `mui-to-tailwind/Cookbook.md §11` reference with `.claude/skills/ui-pipeline/components/input.md`.

## B–G. Compliance

- **Tokens:** all caller fields keep their existing tokens (`shadow-card`, brand-50 bg, ink-800/900 text, form-input/form-label sizes). No `text-[#…]`.
- **Hygiene:** no `style={{}}`, no `sx`, no `@mui/*`. `cn()` used in primitive.
- **Responsive:** `h-11` (44px hit-target) maintained in primitive; mobile font-size locked at 1rem in `text-form-input` token (prevents iOS zoom).
- **RTL:** primitive direction-neutral. `ar-form.tsx` uses logical properties.
- **Behavior:** focus-visible:ring-brand-500, error → ring-2 ring-danger, helper text via aria-describedby.
- **Lint:** ✓ `npm run lint` clean post-edit.
- **Build:** unchanged (no structural change).

### Deviations from MUI baseline (and reason)

- **Per-form radius preserved as-is** (some 5px, some 8px, some 10px). Baseline had this drift; preserving it.
- **`Input` primitive export still unused** by callers — kept for API completeness; no callers to migrate.

## Follow-up fix 2026-05-05 — Focus ring removal

User reported click on input shows blue focus border that didn't exist in MUI. Root cause: primitive had `focus-visible:ring-2 focus-visible:ring-brand-500` on both `Input` and `Textarea`. Per spec, `<input>` and `<textarea>` trigger `:focus-visible` on click (not just keyboard), so the ring rendered on every click.

MUI baseline behavior (verified):
- `src/components/input/Input.module.css`: `.input { outline: none } .input:focus { border-color: transparent }`
- `src/components/textArea/TextArea.module.css`: `.textArea { outline: none } .textArea:focus { border-color: transparent }`
- `src/components/grade-subject-level/form/style.module.css`: same pattern
- Theme `MuiInputBase` override has no border or outline rules — defers to caller CSS, which suppressed all focus indicators.

Fix: replaced `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500` with `outline-none focus:outline-none focus-visible:outline-none` on both `Input` and `Textarea`. Error state ring (`error && "ring-2 ring-danger"`) preserved — independent of focus.

A11y deviation noted: focus indicator removed by user request to match baseline. Keyboard users lose visible focus on form inputs. Acceptable per "match MUI exactly" mandate.

## I. Approval

- **Approved 2026-05-04** — initial font sweep + comment ref.
- **Approved 2026-05-05** — focus ring removal to match MUI baseline.
