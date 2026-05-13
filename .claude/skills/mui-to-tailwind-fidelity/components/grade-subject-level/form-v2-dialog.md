# Component — `FormV2Dialog` (modal lead form)

Modal-wrapped version of `FormV2`. Triggered from `Hero` / `GetStartedV2` CTAs. Uses MUI `<Dialog maxWidth="md" fullWidth>` with a sticky title bar (`"Get Started Today!"` + close icon) and the FormV2 body inside `DialogContent`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\form\formV2Dialog.tsx` (shares `style.module.css`) |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\form\formV2Dialog.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Dialog open onClose maxWidth=md fullWidth
  DialogTitle
    Box display=flex justifyContent=space-between alignItems=center
      Typography variant=h6 leagueSpartan        "Get Started Today!"
      IconButton onClick=handleClose             <CloseIcon/>
  DialogContent
    div .main                                    (same as FormV2)
      form
        Typography subtitle1 h5 .title           "Avail A 10% Discount If You Sign Up Today!"
        div .inputDiv (Name + Email)
        div .inputDiv (Phone + Grade)
        div .inputDiv (Subject — alone)
        div (Message textarea)
        Button .containedButton                  Submit / Spinner
```

### Dialog dimensions

| Element | Property | Value |
|---|---|---|
| Dialog | maxWidth | `md` (=900px MUI default) |
| Dialog | fullWidth | true |
| DialogTitle Box | flex | space-between |
| Typography "Get Started Today!" | variant | `h6` (1rem) |
| IconButton | default MUI sizing | 40px × 40px |
| Close icon | MUI `<CloseIcon/>` | 24px |

### Form body
Identical to [form-v2.md](./form-v2.md) §1 (same module CSS, same field set, plus on submit redirects to `/thank-you` after 1.5s).

### Behavior

- Optimistic UX: `toast.success` fires immediately, dialog closes, redirect after 1500ms; Firestore + sheet writes happen in parallel via `Promise.all`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 143 | `<HouseDialog open onClose title="Get Started Today!" size="lg">` | MUI uses `maxWidth="md"` (=900px). `size="lg"` in the house dialog may map to a different breakpoint. Verify the `size` token. | **Med** — verify dialog width matches 900px |
| B2 | 145 | h5 title: `text-h5 text-ink-900` | MUI subtitle1 → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-bold`. Port renders 18px instead of 28-48px. | **High** — title too small |
| B3 | 145 | `mb-4` | MUI `1.5vh` | **Med** |
| B4 | 148 | `grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2` | MUI: always 2-col flex with `column-gap: 24px`, Subject row spans full-width. Port: 1 col on mobile, splits late. | **High** — mobile layout differs |
| B5 | 175 | Subject has `lg:col-span-2` (only at lg+) | MUI Subject is full-width at ALL breakpoints (third `.inputDiv` contains only Subject). Port restricts span to lg. | **High** — col-span should be unconditional |
| B6 | 175 | (no Curriculum row in this version) | matches MUI — FormV2Dialog also drops Curriculum | OK |
| B7 | 165 | PhoneInput same set of bugs as FormV2 B6 | (see form-v2.md) | **Med** |
| B8 | 139 | `inputCls = my-1 rounded-md bg-white font-heading text-ink-800 shadow-card` | (see form-v2.md B7) | **Med** |
| B9 | 188-189 | Button `my-4 w-full rounded-md py-[18px]` | MUI `p:12px, mt:16px, rounded:10px, line-height:18.4px`. `py-[18px]` should be `p-3`; `my-4` adds unwanted bottom margin. | **High** |
| B10 | DialogTitle in HouseDialog | (auto-rendered by HouseDialog) | Verify the house dialog renders `"Get Started Today!"` as `text-h6` (1rem) with League Spartan, and includes a close IconButton on the trailing side. If HouseDialog uses different typography, override or accept the divergence. | **Verify** |
| B11 | 100 | `toast.success` fires before `Promise.all` resolves | matches MUI optimistic UX (intentional) | OK |

## §3 Corrected Tailwind classNames

Same as [form-v2.md](./form-v2.md) §3 — apply identical body fixes inside `<HouseDialog>`. Additionally:

```tsx
<HouseDialog open={open} onClose={handleClose} title="Get Started Today!" size="md">
  {/* size="md" — verify this maps to ~900px in the house Dialog implementation; if it maps to ~700, use the next size up */}
```

If house Dialog's `title` prop doesn't render as h6 (1rem) League Spartan, pass a custom title slot:

```tsx
<HouseDialog
  open={open}
  onClose={handleClose}
  size="md"
  titleSlot={<h6 className="font-heading text-h6 font-semibold">Get Started Today!</h6>}
>
```

## §4 Verification at 4 widths

- **375**: Dialog `fullWidth` MUI = 100% viewport width. House Dialog should match. Title 28px stat-number-mobile.
- **768**: Dialog fits ~768px. Title 36px.
- **1280**: Dialog clamped at `maxWidth="md"` = 900px centered. Title 48px stat-number.
- **1920**: same as lg.

## §5 RTL notes

- MUI `<Dialog>` flips automatically when wrapper sets `dir="rtl"`.
- IconButton stays on the trailing (left in RTL, right in LTR) side because `DialogTitle Box` uses `justifyContent: space-between` — natural flip.
- Tailwind: ensure HouseDialog forwards `dir` and that its close button uses the logical end side (`ms-auto`, not `ml-auto`).
- Form body RTL same as form-v2.md §5.
