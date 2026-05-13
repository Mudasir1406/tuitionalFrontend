# Component — `<FormDialogV1>` (`form-dialouge-v1.tsx`)

A variant of `<FormDialog>` with two structural differences: (1) the FirstName/Email row uses generic placeholders ("Name", "Email") rather than full sentences, and (2) the Curriculum dropdown is COMMENTED OUT — only Subject appears in row 3. Otherwise styling is identical to `form-dialouge.tsx`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\form-dialouge-v1.tsx` |
| Tailwind port | **NOT PORTED** — there is no `form-dialouge-v1.tsx` in the Tailwind project. The Tailwind side only has `form-dialouge.tsx`. |
| Arabic variant | (no `ar-form-dialouge-v1.tsx` in either repo) |

> ⚠️ Since the Tailwind port has no corresponding file, this spec documents the MUI source only. If the V1 variant is required in the Tailwind project later, port it as a thin wrapper around `<FormDialog>` (passing different placeholders + hiding the Curriculum dropdown), or as a duplicate file (preserving the `form-dialouge-v1.tsx` filename).

---

## §1 MUI source — extracted properties

### Layout tree

```
<Dialog open keepMounted maxWidth={false} sx={{ MuiPaper-*: transparent + no shadow }}>
└── <DialogContent sx={styles.contanier}>           white card, rounded-30px, inset shadow
    ├── <Box sx={styles.header}>                    flex justify-between, mx-3vh, mt-3vh, mb-2vh
    │   ├── <Typography sx={styles.dialogHeading}>  "Get Started" — 3vh font, 500wt
    │   └── <ClearRoundedIcon onClick={handleClose} w/h: 30px>
    ├── <Divider />
    └── <Box sx={styles.mainDiv}>                   paddingX/Y 2%
        └── <form>
            ├── <Box sx={styles.inputDivTop}>       flex col→row at lg, columnGap 24px, rowGap 12px
            │   ├── <Box sx={styles.inputInner}>    FirstName placeholder "Name"
            │   └── <Box sx={styles.inputInner}>    EmailAddress placeholder "Email"
            ├── <Box sx={styles.inputDiv}>          flex col→row at lg, columnGap 24px
            │   ├── PhoneInput (only renders if formData.EmailAddress)
            │   └── Grade DropDown placeholder "Grade"
            ├── <Box sx={styles.inputDiv}>          Curriculum block COMMENTED OUT; only Subject visible
            │   └── Subject DropDown placeholder "Subjects" multiple
            ├── <TextField multiline rows=5 placeholder="Message">
            └── <Button sx={styles.containedButton}>  Submit Now
```

### Dimensions & spacing — identical to `form-dialouge.tsx`

See [form-dialouge.md §1 Dimensions & spacing](./form-dialouge.md). Every `styles.*` object in v1 is byte-for-byte identical to the parent component.

The only differences from `form-dialouge.tsx`:

| Difference | v1 behavior |
|---|---|
| FirstName input | placeholder = `"Name"` instead of `"Enter name here ..."` |
| Email input | placeholder = `"Email"` instead of `"Enter email here ..."` |
| Phone input | wrapped in `{formData.EmailAddress && ...}` — only renders once email is set |
| Phone input style | margins commented out (`marginTop`, `marginBottom`) — relies on container `columnGap` |
| Grade dropdown | placeholder `"Grade"`, no `marginTop` prop |
| **Curriculum dropdown** | **REMOVED** (the JSX is commented out; only Subject remains in row 3) |
| Subject dropdown | placeholder `"Subjects"`, `marginTop: "1.5vh"` |
| TextField | placeholder `"Message"` instead of `"Enter your message here..."` |
| `handleChange` validator | `key === "message"` (lowercase typo) instead of `"Message"` — won't trigger validation. Minor bug in MUI source. |

### Typography — identical to form-dialouge.tsx

See [form-dialouge.md §1 Typography](./form-dialouge.md).

### Colors — identical to form-dialouge.tsx

### Animations / interactions — none beyond Dialog defaults

---

## §2 Tailwind port — bug list

**Not applicable** — no file exists. If/when the V1 variant is ported:

1. Create `tuitionalFrontend\src\components\home\form-dialouge-v1.tsx` (preserve misspelling).
2. Start from the Tailwind port of `form-dialouge.tsx` and apply the differences listed above.
3. Apply ALL the bug fixes from `form-dialouge.md §2` first — they apply equally here (header margins, body padding, grid breakpoint, input radius/margins, button styling).
4. Hide the Curriculum field entirely (don't validate it on submit).
5. Conditionally render the PhoneInput only if `formData.EmailAddress`.

---

## §3 Corrected Tailwind classNames

Based on `form-dialouge.md §3` corrected output. Two diffs:

```diff
- {/* Row 3: Curriculum + Subject */}
- <div>
-   <TranslatableDropDown name="Curriculum" placeholder={s.placeholder_curriculum} … />
-   {errors.Curriculum && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Curriculum}</p>}
- </div>
  <div>
    <TranslatableDropDown name="Subject" placeholder={s.placeholder_subject} multiple … />
    {errors.Subject && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Subject}</p>}
  </div>
```

```diff
- <PhoneInput defaultCountry="SA" …  className="…" />
+ {formData.EmailAddress && (
+   <PhoneInput defaultCountry={isRTL ? "AE" : "SA"} … className="relative z-[2] mt-[1.5vh] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none" />
+ )}
```

Placeholder strings should be added to the `STRINGS` object as separate keys (`placeholder_name_short = "Name"`, `placeholder_email_short = "Email"`, …) to keep v1 distinct.

## §4 Verification at 4 widths

Same as `form-dialouge.md §4` — only row-3 column count changes from 2 to 1 (Subject alone).

- **375**: full-width dialog. Each field full-width. Row 3 contains only Subject dropdown.
- **768**: same as 375 (md=900 not reached).
- **1280**: dialog 50vw. Grid 2-col for rows 1-2; row 3 contains only Subject occupying 1 of 2 cells, leaving an empty cell on the side — visually awkward. **Design caveat**: V1's removal of Curriculum creates a half-empty row at lg+. Either span Subject across both cols (`lg:col-span-2`) or accept the gap. MUI lets it sit half-empty.
- **1920**: same as 1280.

## §5 RTL notes

Same as `form-dialouge.md §5`. Replace `defaultCountry="SA"` with `defaultCountry={isRTL ? "AE" : "SA"}` if porting.

---

## §6 Open questions / decisions

- **Do we port V1 at all?** Most consumers in the codebase use `<FormDialog>` (not V1). Confirm via repo-wide grep before adding the file: `grep -r "form-dialouge-v1" tuitionalFrontend/src/`. If no consumer references it, skip the port entirely.
- **Validator typo (`"message"` vs `"Message"`)** in MUI is a real bug — fix it during the port (use `"Message"` consistently).
