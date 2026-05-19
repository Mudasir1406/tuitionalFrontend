# Component — `FormV2` (PPC variant of the lead form)

A trimmed version of `Form` used by V2 / PPC landing pages: drops the Curriculum dropdown, simpler placeholders (`Name`, `Email`, `Grade`, `Subject`, `Message`). Same `.main` / `.input` / `.containedButton` CSS module — only the field list and `sheetName` ("PPC Leads") differ.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\form\formV2.tsx` (shares `style.module.css`) |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\form\formV2.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main                                            (16px radius, 24px pad, #d7f0ff bg, shadow)
  form
    Typography subtitle1 h5 .title                   "Avail A 10% Discount If You Sign Up Today!"
    div .inputDiv (column-gap 24px)
      div .inputInner > Input placeholder="Name"
      div .inputInner > Input placeholder="Email"
    div .inputDiv
      div .div > PhoneInput .phoneInput
      div .div > DropDown Grade marginTop=1.5vh
    div .inputDiv
      div .div > DropDown Subject marginTop=1.5vh multiple
    div
      TextField multiline rows=4 .textArea .textField placeholder="Message"
    Button .containedButton                          "Submit Now" / CircularProgress 20px
```

Only differences vs `form.tsx`:
- **No Curriculum row** (Form has 3 `inputDiv` rows; FormV2 has 3 rows but the third holds only Subject, full-width within its flex)
- Placeholders shortened ("Name" not "Enter name here ...")
- `sheetName: "PPC Leads"`, posts to `sendFormV2` + `addFormDatav2("lead-ppc", ...)`

### Dimensions, typography, colors, animations
Identical to `form.md` §1 — all values come from the same `style.module.css`. See [form.md](./form.md).

### Subtle difference in MUI flex math

The third `.inputDiv` contains only the Subject `.div` (flex:1), so Subject occupies 100% width (not 50%). This is intentional — Subject is the "wide" dropdown for multi-select.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 136 | `rounded-[10px] bg-[#D7F0FF] p-5` | MUI `.main { border-radius: 16px; padding: 24px; background-color: #d7f0ff; box-shadow: rgba(99,99,99,0.2) 0px 2px 8px 0px }`. Port has 10px not 16px, p-5 (=20px) not p-6 (=24px), **missing the shadow entirely**. | **High** — wrong corners, wrong padding, no shadow |
| B2 | 138 | `text-h5 text-ink-900` (no font-bold) | MUI `subtitle1` → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-bold` (1.75/2.25/3rem, 700). Port uses `text-h5` (1.125rem on desktop). | **High** — title is tiny |
| B3 | 138 | `mb-4` (16px) | MUI `1.5vh` | **Med** — should be `mb-[1.5vh]` |
| B4 | 141 | `grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2` | MUI form is always 2-col flex with `column-gap:24px` regardless of breakpoint, and Subject row spans full-width. Port collapses to 1 col on mobile + small/medium. **Use `gap-x-6` only, NO `gap-y-*`** — each field already carries `mt-[1.5vh]` (Input/DropDown/PhoneInput), so a row-gap doubles vertical spacing. | **High** — mobile layout differs |
| B5 | 141 | (no `lg:col-span-2` on Subject cell) | Subject in MUI occupies its full `.inputDiv` (third row, alone) so visually full-width. Port treats Subject as one of 6 equal cells, breaking the layout. | **High** — Subject should span both cols |
| B6 | 160 | PhoneInput `my-1 h-[5.5vh] min-h-[44px] rounded-md ps-[10px] text-ink-800 shadow-card` | MUI: `mt-[1.5vh] h-[5.5vh] min-h-[50px] rounded-md ps-[10px] text-[2.3vh] font-normal leading-[3.5vh] shadow-card`. Port missing font-size, line-height, font-weight, and uses `my-1` not `mt-[1.5vh]`. | **Med** |
| B7 | 132 (inputCls) | `my-1 rounded-md bg-white font-heading text-ink-800 shadow-card` | MUI `.input { font-size: 2.3vh; border-radius: 8px; box-shadow card }`. Port uses `rounded-md` (10px) not `rounded` (8px); missing `text-[2.3vh]`. | **Med** |
| B8 | 189-190 | Button `my-4 w-full rounded-md py-[18px] font-heading text-button leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` | MUI: `padding: 12px; margin-top: 16px; border-radius: 10px; width:100%; line-height: 18.4px`. Port has `py-[18px]` not `p-3`, and `my-4` adds extra bottom margin. | **High** — button taller + extra bottom space |
| B9 | 183 | `mt-2` textarea wrapper | MUI textarea has `margin-top: 12px` (from `.textField`). Port `mt-2`=8px. | **Low** — `mt-3` (12px) is closer |
| B11 | textarea className | (no border-killer class) | MUI `.textArea { border: none !important }`. The house `Textarea` component renders a raw `<textarea>` — browser UA stylesheet draws a 1px solid border by default. Must add `border-0 focus:ring-0` to className. | **Med** — visible border around message box |
| B10 | 133 | `errCls = ms-1 mt-1` | MUI `.error { margin-top: 6px; margin-left: 6px }` | **Low** |

## §3 Corrected Tailwind classNames

```tsx
<div className="rounded-2xl bg-brand-50 p-6 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]">
  <form onSubmit={handleSubmit}>
    <h5 className="mb-[1.5vh] text-center font-heading text-stat-number-mobile font-bold text-ink-900 sm:text-stat-number-tablet lg:text-stat-number">
      Avail A 10% Discount If You Sign Up Today!
    </h5>

    <div className="grid grid-cols-2 gap-x-6">  {/* NO gap-y — fields carry mt-[1.5vh] */}
      <div>{/* Name */}</div>
      <div>{/* Email */}</div>
      <div>{/* Phone */}</div>
      <div>{/* Grade */}</div>
      <div className="col-span-2">{/* Subject — full-width */}</div>
    </div>

    <div className="mt-3">
      <Textarea ... className="rounded-[5px] border-0 bg-white font-heading text-[2.3vh] text-ink-800 shadow-card focus:ring-0" />
    </div>

    <Button type="submit" disabled={loading}
      className="mt-4 w-full rounded-md p-3 font-heading leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]">
      ...
    </Button>
  </form>
</div>

const inputCls = "mt-[1.5vh] rounded bg-white font-heading text-[2.3vh] text-ink-800 shadow-card";
const errCls = "ms-[6px] mt-[6px] font-body text-small text-danger";
```

## §4 Verification at 4 widths

- **375**: Title 28px (stat-number-mobile), 2-col grid w/ Subject row spanning, p-6, shadow card.
- **768**: Title 36px, same 2-col layout.
- **1280**: Title 48px, form inside right column of parent page grid.
- **1920**: same as lg.

## §5 RTL notes

Same as `form.md` §5 — error gets `margin-right` instead of `margin-left` via `.rtl` class. Tailwind `ms-`/`me-` and `ps-`/`pe-` handle this automatically. Title stays center-aligned in RTL.
