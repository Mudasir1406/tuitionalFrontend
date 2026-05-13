# Component — `<ArGetInTouch>` (Arabic variant of `<GetInTouch>`)

Arabic-language version of the contact form (image-left, form-right) on `/ar/contact`. In the MUI baseline this is a separate file; in the Tailwind port the same `<GetInTouch>` component handles both languages via the `isRTL` flag (see [get-in-touch.md](./get-in-touch.md)).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\get-in-touch\ArGetInTouch.tsx` + shared `GetInTouch.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\contact\get-in-touch\GetInTouch.tsx` (unified — no separate AR file) |
| EN counterpart | [get-in-touch.md](./get-in-touch.md) |

---

## §1 MUI source — extracted properties

### Layout tree

Identical to EN (same `.module.css` is shared between `GetInTouch.tsx` and `ArGetInTouch.tsx`):

```
<Box .container dir="rtl">  (gradient bg, padding-top responsive)
└── .mainDiv
    ├── .imageDiv (girl-using-laptop image, rounded 20px)
    └── .formDiv
        └── form .contactForm (glass bg, rounded 20px)
            ├── .headingDiv
            │   ├── <h2> "تواصل معنا" + .lines image (positioned top: -24px, RIGHT: -6% — was LEFT in EN, but here right-anchored due to RTL)
            │   └── <p variant="body2"> "نحن نتطلع لسماع رأيك!"
            ├── <Grid container columnSpacing={2} rowSpacing={1}>
            │   ├── <Grid item lg={6}> First Name (الاسم الأول)
            │   ├── <Grid item lg={6}> Last Name (الاسم الأخير)
            │   ├── <Grid item lg={6}> Email (البريد الإلكتروني)
            │   └── <Grid item lg={6}> Phone (رقم الهاتف) — PhoneInput
            ├── label "الرسالة" (.label + .marginTop4)
            ├── <TextField multiline rows={4}> placeholder "اكتب رسالتك هنا ..."
            └── <Button .containedButton> "إرسال الرسالة"
```

### Dimensions & spacing

Identical to EN — sourced from the shared `GetInTouch.module.css`. See [get-in-touch.md §1 Dimensions table](./get-in-touch.md) for the full set.

### Typography

Identical to EN: heading `variant="h2"` (22 / 28 / 36 px), labels `variant="body2"` (14px), errors `variant="caption"` (14px), button MUI default (15 / 16 px), subtitle `variant="body2"` (14px).

The only AR-specific override:

| Element | AR-specific change |
|---|---|
| `.lines` decorative image | `position: "absolute", top: "-24px", right: "-6%"` (EN uses `left` instead of `right` — physical mirroring) |

**Font**: AR file applies `leagueSpartan.className` (same as EN). For Arabic glyphs the Tailwind port substitutes `font-arabic` via `isRTL ? "font-arabic" : "font-heading"`.

### Colors

Identical to EN. No AR-specific color overrides.

### Animations / interactions

None.

### MUI breakpoint set

Identical to EN — the `.module.css` uses non-MUI breakpoints (`max-width: 992px / 768px / 480px`). See [get-in-touch.md §1 MUI breakpoint set](./get-in-touch.md).

---

## §2 Tailwind port — bug list

The Tailwind side merges EN + AR into a single `GetInTouch.tsx`. The list below catches:
- AR-specific drift,
- And the entire EN bug list (B1-B24 in [get-in-touch.md §2](./get-in-touch.md)) which applies to both languages because the component is unified.

### AR-specific drift

| # | Line | Current Tailwind | Expected for AR | Severity |
|---|---|---|---|---|
| BAR-1 | 256-260 | `.lines` image: `absolute -top-4 -right-6 ... sm:-top-5 sm:-right-7` | Under `dir="rtl"`, **physical `right` does NOT flip automatically** — you'd want `left` to mirror MUI AR's effective rendering (lines positioned on the **right** of the heading text in AR mode). **However**, MUI AR explicitly sets `right: "-6%"` (the same anchor as EN's `left`-anchored CSS-module rule). So in MUI AR, the lines render on the right of the text. In the Tailwind port, `-right-6` (which doesn't auto-flip) **also** renders on the right — so EN port renders lines on the right, AR port also renders lines on the right. **This matches MUI AR** (lines on right in AR) but **diverges from MUI EN** (lines on left in EN — see [get-in-touch.md](./get-in-touch.md) B11 / lines image discussion). | minor (port may need RTL-aware anchor) |
| BAR-2 | 22 | `<form>` doesn't set `dir="rtl"` explicitly | OK — `dir="rtl"` is set globally on `<html>` by the Next.js layout. ✓ | — |
| BAR-3 | 346 | `defaultCountry={isRTL ? "AE" : "SA"}` | ✓ Correct AR default (UAE flag for AR users; Saudi for non-AR). Matches MUI AR `defaultCountry="AE"`. | — |
| BAR-4 | 250, 263 etc. | All copy comes from `t()` i18n bundle | Verify the i18n bundle has AR strings. Keys used: `contact.get_in_touch.heading_lead`, `heading_accent`, `subtitle_line_1`, `subtitle_line_2`, `label_first_name`, `label_last_name`, `label_email`, `label_phone`, `label_message`, `placeholder_*`, `submit`, `toasts.success`, `toasts.failed`, `errors.*`, `alt_image`. Out of scope for this spec — assume i18n is wired. | — |
| BAR-5 | 351 | `<PhoneInput className="...ps-[10px]...">` | ✓ Uses logical `ps-*` (padding-inline-start) — auto-mirrors. Matches MUI `.phoneInput { padding-left: 10px }` under RTL. | — |

### Shared bugs (apply to AR too via the unified port)

All 24 bugs from [get-in-touch.md §2 Tailwind port — bug list](./get-in-touch.md) (B1-B24) apply equally to the AR rendering. Re-fixing any of them benefits both languages.

The most AR-relevant of those:
- **B14** (Grid breakpoint inversion) — wrong `sm:grid-cols-2` makes Arabic inputs cramped on iPad too.
- **B9** (heading mb 46px) — same compression bug in AR.
- **B16 / B20** (input radius 5px not 10px) — AR inputs look puffy.
- **B19** (error `ms-[6px] mt-[6px]`) — the use of `ms-*` (margin-inline-start) **correctly** auto-mirrors to `margin-right: 6px` under RTL, matching the visual position of MUI AR's `.error { margin-left: 6px }` flipping to right under `dir="rtl"`.

---

## §3 Corrected Tailwind classNames

No new AR-only corrections. Apply [get-in-touch.md §3](./get-in-touch.md) corrections (B1-B24) — fixes propagate to both EN and AR.

Optional AR-only refinement for B1 (lines image anchor): if the user reports the decorative lines image is in the wrong place in AR mode, swap the absolute anchor to RTL-aware:

```tsx
// Current (renders on right in both EN and AR — wrong for EN):
<Image className="absolute -top-4 -right-6 ... sm:-top-5 sm:-right-7" ... />

// RTL-aware (left in EN, right in AR via -end-*):
<Image className="absolute -top-4 -end-6 ... sm:-top-5 sm:-end-7" ... />
```

(`-end-6` = `-right-6` in LTR, `-left-6` in RTL.) Only apply if visually directed.

---

## §4 Verification at 4 widths

Test at `/ar/contact`.

| Width | Expected behavior |
|---|---|
| **375px** | Image stacks above form. Form padding (after fix): 20px all sides. Heading "تواصل معنا" at 22px in Noto Sans Arabic, mb-46px. Inputs full-width, rounded-5px, shadow-card. Phone input rounded-10px. Errors `ms-[6px]` → margin-right 6px under RTL. Outer mx-4. |
| **768px** | Still stacked column (MUI 992px breakpoint > 768). Form padding 40px (between md=900 and the 768px CSS-module rule — exactly which rule wins depends on the boundary; in the Tailwind port we approximated). Heading 28px. |
| **1280px** | Image-left / form-right (no flip under RTL — the natural reading order in Arabic is right-to-left, but flex `lg:flex-row` doesn't auto-mirror flex direction; the form stays on the right physically. To explicitly mirror to image-right / form-left under RTL, add `rtl:flex-row-reverse`. **Verify against MUI AR baseline** — if MUI AR rendered image-right / form-left, the port needs `rtl:flex-row-reverse` added. Currently the port likely renders identically to EN at lg+ — a possible drift.) |
| **1920px** | Same as 1280. |

**Possible drift at lg+**: MUI AR has the same `.mainDiv { display: flex }` rule as EN, with no `flex-direction` override under `[dir="rtl"]` in the CSS module. So MUI AR also renders image-left / form-right at lg (despite the RTL document). The Tailwind port matches this. ✓ No drift expected.

---

## §5 RTL notes

- **Logical properties already used correctly**: `ms-[6px]` (errors), `ps-[10px]` (phone input padding) — both auto-mirror under `dir="rtl"`.
- **Physical properties used (potential drift)**: `-right-6` on the decorative lines image. Under RTL it does NOT auto-flip. Matches MUI AR's explicit `right: "-6%"` for that image — so the position is correct under AR. But under EN the position is **wrong** (MUI EN uses `left` for the lines image). See [get-in-touch.md §2 B11](./get-in-touch.md).
- **Flex direction**: `lg:flex-row` does not auto-mirror. MUI AR keeps image-left under RTL (no flex-direction override in the CSS module), so the port's behavior matches. If the user wants explicit RTL flip (image-right under AR), add `rtl:lg:flex-row-reverse` — but this would **diverge from MUI AR**.
- **Grid**: `lg:grid-cols-2` for the form fields is direction-agnostic; the field order in the DOM determines which cell each field occupies. Under RTL, the first-named cell appears on the right.
- **Font**: `isRTL ? "font-arabic" : "font-heading"` substitutes Noto Sans Arabic / Cairo for Latin glyphs. MUI AR source incorrectly uses `leagueSpartan.className` even for Arabic — the Tailwind port fixes this.
- **Phone country default**: `isRTL ? "AE" : "SA"` matches MUI AR's `defaultCountry="AE"`.

---

## §6 Things to leave alone

- The single bilingual component — keep merged.
- The shared error i18n keys (`contact.get_in_touch.errors.*`) — both EN and AR strings live in the same i18n bundle.
- The `defaultCountry={isRTL ? "AE" : "SA"}` switch — keep.
- The `dynamic(() => import("react-phone-number-input"), { ssr: false })` — keep.
- The `cn()` helper — keep.

---

## §7 Diff from EN

Meaningful differences when comparing MUI AR source to MUI EN source:
1. `<Box dir="rtl">` on the outer container.
2. Arabic translated strings throughout.
3. Lines decorative image positioned with `right: "-6%"` (instead of `left`).
4. PhoneInput `defaultCountry="AE"` (instead of "SA").
5. Toast / error strings hardcoded in Arabic (in MUI; in the Tailwind port these come from `t()`).
6. AR file has slightly different state-reset behavior (`sheetName` reset to "Contact") — minor and out of scope.

All differences 1-5 are captured by the unified Tailwind component via `isRTL` + i18n. No separate AR component file is required.
