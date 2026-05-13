# Component — `Form` (grade-subject-level lead form)

Pale blue glassmorphic lead-capture form used inside the right column of the hero on `grade-subject-level` pages. Six inputs (Name, Email, Phone, Grade, Curriculum, Subject) arranged as a 2-column grid, plus a full-width Message textarea and a Submit button.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\form\form.tsx` + `style.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\form\form.tsx` |
| Arabic variants (MUI only) | `ar-form.tsx`, `ar-form-old.tsx`, `ar-style.module.css` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main
  form (onSubmit)
    Typography variant=subtitle1 h5 .title           "Avail A 10% Discount If You Sign Up Today!"
    div .inputDiv (FirstName + EmailAddress, flex column-gap:24px)
      div .inputInner > Input + (error caption)
      div .inputInner > Input + (error caption)
    div .inputDiv (PhoneInput + Grade dropdown)
      div .div > PhoneInput .phoneInput + (error caption)
      div .div > DropDown marginTop=1.5vh + (error caption)
    div .inputDiv (Curriculum + Subject dropdowns)
      div .div > DropDown marginTop=1.5vh + (error caption)
      div .div > DropDown marginTop=1.5vh multiple + (error caption)
    div
      TextField multiline rows=4 .textArea .textField + (error caption)
    Button variant=contained .containedButton  → "Submit Now" / CircularProgress 20px
```

### Dimensions & spacing (from `style.module.css`)

| Element | Property | Value |
|---|---|---|
| `.main` | borderRadius | **16px** |
| `.main` | padding | **24px** |
| `.main` | background-color | `#d7f0ff` |
| `.main` | box-shadow | `rgba(99,99,99,0.2) 0px 2px 8px 0px` |
| `.title` | text-align | center |
| `.title` | margin-bottom | **1.5vh** |
| `.error` | color | red |
| `.error` | margin-top | 6px |
| `.error` | margin-left | 6px |
| `.inputDiv` | display | flex; column-gap **24px**; flex: 1 |
| `.inputInner` / `.div` | flex | 1 |
| `.input` | font-size | **2.3vh** |
| `.input` | border-radius | **8px** |
| `.input` | box-shadow | `0px 1px 4px 0px rgba(0,0,0,0.08)` |
| `.textArea` | background | white; z-index 2; color `rgba(0,0,0,0.77)` |
| `.textArea` | box-shadow | `0px 1px 4px 0px rgba(0,0,0,0.08)` |
| `.textArea` | border-radius | **5px** |
| `.textArea` | margin-top | **1.5vh** |
| `.textField` | margin-top | 12px (overrides textArea — last class wins, so 12px) |
| `.phoneInput` | height | **5.5vh** |
| `.phoneInput` | padding-left | 10px |
| `.phoneInput` | margin-top | **1.5vh** |
| `.phoneInput` | border-radius | **10px** |
| `.phoneInput` | font-size | 2.3vh; font-weight 400; line-height 3.5vh |
| `.phoneInput` | box-shadow | `0px 1px 4px 0px rgba(0,0,0,0.08)` |
| `.containedButton` | width | 100% |
| `.containedButton` | padding | **12px** |
| `.containedButton` | margin-top | **16px** |
| `.containedButton` | border-radius | **10px** |
| `.containedButton` | line-height | 18.4px |
| `.containedButton` | background-color | `#38b6ff` |
| `.containedButton` | box-shadow | `1px 15px 34px 0px rgba(56,182,255,0.4)` |
| CircularProgress (loading) | width / height | 12px (sx) — `size={20}` prop wins → 20px |

Form is rendered inside a 2-column `<Grid lg={6} md={12}>` parent (see `grade-subject-level.tsx`) so internally MUI does NOT use a 2-column grid — each row is a flex with two children. The Tailwind port collapses this to a `grid grid-cols-1 lg:grid-cols-2` which is semantically different but visually identical at desktop because the form already lives in the right column.

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Title "Avail A 10% Discount…" | `subtitle1` (component=h5) | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | League Spartan |
| Inputs (.input) | n/a | 2.3vh | 2.3vh | 2.3vh | 400 | League Spartan |
| Error message | `caption` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Button "Submit Now" | MUI `Button` default | 0.9375rem | 1rem | 1rem | 700 (Button default 500, but `className` forces leagueSpartan weight) | League Spartan |
| PhoneInput | inline | 2.3vh | 2.3vh | 2.3vh | 400 | inherit (no leagueSpartan applied — uses body) |

### Colors

| MUI hex | Tailwind |
|---|---|
| `#d7f0ff` form bg | `bg-brand-50` |
| `#38b6ff` button | `bg-brand-500` |
| `rgba(0,0,0,0.77)` input text | `text-ink-800` |
| `red` error | `text-danger` (= `#B70000`) |

### Animations / interactions

- Hover on `.containedButton` keeps the same shadow + bg (effectively no hover change).
- Loading: `CircularProgress` size=20 replaces "Submit Now" label.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 140 | `rounded-2xl` (=16px) ✓ + `p-6` (=24px) ✓ + `shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]` ✓ + `bg-[#d7f0ff]` | matches | **OK** |
| B2 | 142 | `text-h3-mobile sm:text-h3-tablet lg:text-h3 font-bold` | MUI `variant=subtitle1` → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` (1.75/2.25/3rem, font-bold). Port substitutes h3 (1.125/1.25/1.5rem). | **High** — title is HALF the size it should be |
| B3 | 142 | `mb-4` (=16px) | MUI `.title { margin-bottom: 1.5vh }` | **Med** — should be `mb-[1.5vh]` |
| B4 | 145 | `gap-x-4 gap-y-2 lg:grid-cols-2` (=16px × 8px) | MUI `.inputDiv { column-gap: 24px }`, rows have implicit gap from each `Input` element's internal margins. Closest is `gap-x-6 gap-y-2`. | **Med** — column gap is too small |
| B5 | 137 | `errCls = ms-1 mt-1` (=4px × 4px) | MUI `.error { margin-top: 6px; margin-left: 6px }` | **Low** — minor offset diff |
| B6 | 137 | `text-danger` ✓ | red ✓ | **OK** |
| B7 | 160-165 | `PhoneInput` `my-1 h-[5.5vh] min-h-[44px] rounded-md ps-[10px] text-ink-800 shadow-card` | MUI `.phoneInput { height: 5.5vh; margin-top: 1.5vh; padding-left: 10px; border-radius: 10px (rounded-md ✓); box-shadow card ✓; font-size: 2.3vh; font-weight: 400; line-height: 3.5vh }`. Port uses `my-1` (=4px×2) instead of `mt-[1.5vh]`; missing `text-[2.3vh] font-normal leading-[3.5vh]`; missing `min-height: 50px` from `font-size: 2.3vh` requirement. | **Med** — phone input slightly off |
| B8 | 187-190 | `mt-2` wrapper + `Textarea` with `inputCls` | MUI `.textArea { margin-top: 1.5vh; box-shadow card; border-radius: 5px } + .textField { margin-top: 12px }` (overrides → 12px). Port uses `mt-2` (=8px). | **Low** — close but not exact |
| B9 | 193-194 | Button: `my-4 w-full rounded-md py-[18px] font-heading text-button leading-[18.4px]` | MUI: `width:100%; padding: 12px; margin-top: 16px; border-radius: 10px; line-height: 18.4px`. Port has `py-[18px]` (=18px vertical) but MUI is `padding: 12px` (=12px all sides). Also `my-4` adds margin-bottom that MUI doesn't have. | **High** — button is taller and has extra bottom margin |
| B10 | 194 | `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` ✓ | matches | **OK** |
| B11 | 136 | input `inputCls = my-1 rounded-md bg-white font-heading text-ink-800 shadow-card` | Compared to MUI `.input { font-size: 2.3vh; border-radius: 8px; box-shadow card }`. `rounded-md` (=10px) vs MUI 8px (`rounded`). Missing `text-[2.3vh]`. | **Med** — font-size in inputs is not pinned |
| B12 | 196 | `<span ... animate-spin border-2>` for loading | MUI uses `CircularProgress size={20}` — visual approximation only; this is acceptable | OK |
| B13 | n/a | Port collapses MUI 3-row × 2-col internal flex into one 6-cell grid. At mobile MUI stacks via `.inputDiv` flex wrap NOT happening — so MUI stays 2-col on mobile too. Port goes `grid-cols-1` on mobile → **single column on mobile.** | MUI form remains 2-column at every breakpoint (no media queries shrink `.inputDiv`). | **High** — mobile layout diverges |

## §3 Corrected Tailwind classNames

```tsx
// Outer
<div className="rounded-2xl bg-brand-50 p-6 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">

// Title (subtitle1 = stat-number tokens)
<h5 className="mb-[1.5vh] text-center font-heading text-stat-number-mobile font-bold text-ink-900 sm:text-stat-number-tablet lg:text-stat-number">
  Avail A 10% Discount If You Sign Up Today!
</h5>

// Grid — MUI never collapses to 1 column. Keep 2 cols at every breakpoint.
<div className="grid grid-cols-2 gap-x-6 gap-y-2">
  {/* 6 input cells: Name, Email, Phone, Grade, Curriculum, Subject */}
</div>

// Phone input
<PhoneInput
  ...
  className="relative z-[2] mt-[1.5vh] h-[5.5vh] min-h-[50px] rounded-md bg-white ps-[10px] font-body text-[2.3vh] font-normal leading-[3.5vh] text-ink-800 shadow-card outline-none"
/>

// Input (override the helper)
const inputCls = "mt-[1.5vh] rounded bg-white font-heading text-[2.3vh] text-ink-800 shadow-card";

// Textarea wrapper
<div className="mt-[1.5vh]">
  <Textarea ... className="rounded-[5px] bg-white font-heading text-[2.3vh] text-ink-800 shadow-card" />
</div>

// Submit button — p-3 = 12px all sides, mt-4 = 16px, no my-4
<Button type="submit" disabled={loading}
  className="mt-4 w-full rounded-md p-3 font-heading leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]">

// Error caption
const errCls = "ms-[6px] mt-[6px] font-body text-small text-danger";
```

## §4 Verification at 4 widths

- **375 (xs)**: Title 28px, form bg `#d7f0ff`, **2-column grid** preserved (MUI uses CSS flex `column-gap:24px` which doesn't wrap), inputs 2.3vh tall, button full-width p-3.
- **768 (sm)**: Title 36px, identical 2-col grid, inputs 2.3vh.
- **1280 (lg)**: Title 48px, form sits in 50% width column of parent grade-subject-level grid.
- **1920**: same as lg.

## §5 RTL notes

- `ar-form.tsx` adds `${styles.rtl}` to outer wrapper which flips `.error` margin-left → margin-right and sets `input/textarea { text-align: right; direction: rtl }`.
- Tailwind side: error class already uses `ms-` (logical start) → flips automatically. PhoneInput `ps-[10px]` flips. No extra work needed beyond confirming `dir="rtl"` is set on a parent.
- Title remains `text-center` in both directions per MUI's `.rtl .title { text-align: center }`.
