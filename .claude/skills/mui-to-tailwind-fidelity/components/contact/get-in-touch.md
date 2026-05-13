# Example 01 — Contact `<GetInTouch>` Form

Component: image-left, form-right contact section on `/contact` (and `/ar/contact`).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\get-in-touch\GetInTouch.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\contact\get-in-touch\GetInTouch.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
.container (full-width gradient bg)
└── .mainDiv (max-w 1400px, flex row at ≥992px, mx-12 default)
    ├── .imageDiv (flex 0.45)  →  <Image rounded-[20px] object-cover>
    └── .formDiv (flex 0.55)
        └── form.contactForm (glass bg, rounded-20px, padding 18/48/12/48)
            ├── .headingDiv (mb-46px, centered)
            │   ├── <h2> "Get In <span>Touch</span>" + .lines image
            │   └── <p> "Can't Assess... / Don't Worry!"
            ├── <Grid container columnSpacing={2} rowSpacing={1}>
            │   ├── <Grid item xs=12 sm=12 md=12 lg=6> First Name
            │   ├── <Grid item xs=12 sm=12 md=12 lg=6> Last Name
            │   ├── <Grid item xs=12 sm=12 md=12 lg=6> Email
            │   └── <Grid item xs=12 sm=12 md=12 lg=6> Phone (PhoneInput)
            ├── label "Message" (.label + .marginTop4 = mt-6px)
            ├── <TextField multiline rows={4}>
            └── <Button .containedButton>  // shadow-glow, h-? padding 18px, m-16px y, rounded-10px
```

### Authoritative dimensions (from `.module.css`)

| Element | Property | Default | <992px | <768px | <480px |
|---|---|---|---|---|---|
| `.container` | `padding-top` | 80px | — | 60px | 40px |
| `.container` | `row-gap` | 24px | — | — | — |
| `.container` | `background` | `linear-gradient(to top, rgba(255,255,255,0.7), #d7f0ff)` | — | — | — |
| `.mainDiv` | `max-width` | 1400px | — | — | — |
| `.mainDiv` | `flex-direction` | row | **column** | — | — |
| `.mainDiv` | `margin-x` | 48px | — | — | 16px |
| `.mainDiv` | `margin-bottom` | 100px | — | — | — |
| `.mainDiv` | `column-gap` / `row-gap` | 24px / 24px | — | — | — |
| `.imageDiv` | `flex` | 0.45 | — | — | — |
| `.formDiv` | `flex` | 0.55 → 1 below 768px | — | (flex: 1) | — |
| `.contactForm` | `padding` | 18px 48px 12px 48px | — | **40px all** | **20px all** |
| `.contactForm` | `border-radius` | 20px | — | — | — |
| `.contactForm` | `background` | `rgba(255,255,255,0.7)` | — | — | — |
| `.contactForm` | `box-shadow` | `0px -3px 8px 0px rgba(0,155,245,0.15) inset, 0px 2px 1px 0px rgba(0,0,0,0.05)` | — | — | — |
| `.headingDiv` | `margin-bottom` | 46px | — | — | — |
| `.input` (TextField) | `background` | white | — | — | — |
| `.input` | `margin` | 4px 0 | — | — | — |
| `.input` | `border-radius` | **5px** | — | — | — |
| `.input` | `color` | `rgba(0,0,0,0.77)` | — | — | — |
| `.input` | `box-shadow` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | — | — | — |
| `.phoneInput` | `height` | 5.5vh | — | — | — |
| `.phoneInput` | `font-size` | 2.3vh | — | — | — |
| `.phoneInput` | `padding-left` | 10px | — | — | — |
| `.phoneInput` | `border-radius` | 10px | — | — | — |
| `.containedButton` | `padding` | 18px | — | 15px | 12px |
| `.containedButton` | `margin` | 16px 0 | — | — | — |
| `.containedButton` | `border-radius` | 10px | — | — | — |
| `.containedButton` | `background` | `#38b6ff` (no hover change) | — | — | — |
| `.containedButton` | `box-shadow` | `1px 15px 34px 0px rgba(56,182,255,0.4)` | — | — | — |
| `.containedButton` | `width` | 100% | — | — | — |
| `.error` | `color` | red | — | — | — |
| `.error` | `margin-top` / `margin-left` | 6px / 6px | — | — | — |
| `.lines` (decorative image) | `width` / `height` | 24px / 24px | — | — | — |

### MUI typography variants used

| Element | Variant | Mobile / Tablet / Desktop final size |
|---|---|---|
| "Get In Touch" `<h2>` | `variant="h2"` | 1.375rem / 1.75rem / 2.25rem |
| Subtitle `"Can't Assess..."` | `variant="body2"` | 14px (no responsive override) |
| Field labels ("First Name", "Last Name", …) | `variant="body2"` | 14px |
| Error messages | `variant="caption"` | 14px (this MUI theme maps caption to small) |
| Button label "Get In Touch" | MUI `<Button>` default | 15px mobile, 16px desktop |

### MUI breakpoint set

The `.module.css` uses **non-MUI** breakpoints (`max-width: 992px / 768px / 480px`). Standard MUI breakpoints are `sm=600, md=900, lg=1200`. So this component mixes two breakpoint systems — translate carefully (§3 below).

---

## §2 What the current Tailwind port gets wrong

Read `tuitionalFrontend\src\components\contact\get-in-touch\GetInTouch.tsx` and compare each line against §1. Bugs found:

| # | Line(s) | Current Tailwind | Should be (per MUI) |
|---|---|---|---|
| B1 | 218 | `pt-10 sm:pt-14 lg:pt-16` (40/56/64) | `pt-[40px] sm:pt-[60px] lg:pt-[80px]` |
| B2 | 218 | `gap-6` (24px) — OK | ✓ Keep |
| B3 | 221 | `mx-4 sm:mx-6 lg:mx-12` (16/24/48) | `mx-4 sm:mx-12` (16/48 — MUI has no 24px intermediate) |
| B4 | 221 | `mb-16 sm:mb-20` (64/80) | `mb-[100px]` (single value — MUI has no responsive override) |
| B5 | 221 | `gap-6 ... lg:gap-8` (24/32) | `gap-6` only (24px — MUI keeps 24px at all sizes) |
| B6 | 221 | `flex-col ... lg:flex-row` | Acceptable (MUI breakpoint is 992, Tailwind lg=1200 is closest. Documented drift: layout stays column 200px longer in the port. Live with it unless QA flags.) |
| B7 | 240 | `gap-5 ... sm:gap-6` (20/24) on form | `flex flex-col` only — MUI gives no explicit child gap inside .contactForm. Children are separated by individual `margin`s and the Grid wrapper. **Remove `gap-5 sm:gap-6`.** |
| B8 | 240 | `p-6 sm:p-8 lg:p-10` (24/32/40) | `p-5 sm:p-10 md:pt-[18px] md:px-12 md:pb-3` (20/40 at base+sm, then 18/48/12 at md+. MUI's 768 boundary maps to Tailwind `md`=900 — close enough.) |
| B9 | 244 | `mb-1 sm:mb-2` (4/8) on .headingDiv | `mb-[46px]` (MUI mandates 46px. The 4/8 in current port is a major typographic gap.) |
| B10 | 247 | `text-h2-mobile sm:text-h2-tablet lg:text-h2` | ✓ Keep — correct typography triplet |
| B11 | 252 | `font-bold text-success` for accent span | ✓ Keep — matches `sx={{ color: "rgba(81, 184, 147, 1)", fontWeight: 700, marginLeft: 1 }}`. **Note**: MUI also set `marginLeft: 1` (8px). Current span uses inline-flex parent `gap-1` (4px). Should be `gap-2` (8px) on the parent `<h2>` per [token-mapping.md §4](../01-token-mapping.md). |
| B12 | 259 | `h-5 w-5 sm:h-6 sm:w-6` (20/24) for `.lines` image | `h-6 w-6` (24px — MUI is fixed 24, no responsive shrink) |
| B13 | 262 | `text-small leading-relaxed` for subtitle | Acceptable. MUI uses `variant="body2"` = 14px = `text-small`. ✓ |
| B14 | 273 | `grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2` | **`grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2`** — two bugs to fix:<br>(a) Break to 2 cols at `lg` (1200), not `sm` (600). MUI: `lg={6} md={12} sm={12} xs={12}`.<br>(b) Row gap is 8px (`rowSpacing={1}`), not 20px. |
| B15 | 274 | `gap-1.5` (6px) between label and input | Acceptable. MUI uses `margin: 4px 0` on `.input` itself, so total label↔input spacing ≈ 4px. Current 6px is 2px over. Worth tightening to `gap-1` (4px) but visually minor. |
| B16 | 281-288 | input `h-11 min-h-[44px] ... rounded-md` (10px radius) | `h-11 min-h-[44px] ... rounded-[5px]` — MUI `.input` border-radius is **5px**, not 10. |
| B17 | 351 | `<PhoneInput className="h-11 ... rounded-md ...">` (10px radius) | `<PhoneInput className="h-11 ... rounded-[10px] ps-[10px] text-[2.3vh] leading-[3.5vh] ...">` — MUI `.phoneInput` has explicit `font-size: 2.3vh`, `line-height: 3.5vh`, `border-radius: 10px`, `padding-left: 10px`. |
| B18 | 354 | `mt-1.5` (6px) for phone error | ✓ Matches MUI `.error { margin-top: 6px }` |
| B19 | 290-292 | error `<p className="text-small text-danger">` | Should add `mt-[6px] ms-[6px]` to match MUI `.error { margin-top: 6px; margin-left: 6px }`. (`ms-*` is RTL-aware for `margin-left/right`.) |
| B20 | 376-379 | textarea `min-h-[120px] ... rounded-md` (10px) | `min-h-[120px] ... rounded-[5px]` — same `.input` class in MUI, 5px radius |
| B21 | 388-393 | Button `mt-1 h-12 sm:h-[52px]` rounded-md | `my-4 h-12 sm:h-[52px] rounded-[10px]` — MUI margin is `16px 0` (i.e. my-4), not mt-1. Radius is 10px. |
| B22 | 392 | Button shadow `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` | ✓ Matches |
| B23 | 392 | Button `!text-white` | ✓ Matches |
| B24 | (missing) | No `bg-brand-500` on button | Add `bg-brand-500 hover:bg-brand-500` — MUI explicitly disables hover color change. |

---

## §3 The corrected Tailwind component

Apply edits B1–B24. The corrected `GetInTouch.tsx` body (JSX only, omitting handlers — those don't change):

```tsx
return (
  <div className="relative flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-white/70 to-brand-50 pt-[40px] sm:pt-[60px] lg:pt-[80px]">
    <div className="absolute inset-0 -z-[2] h-full w-full" />

    <div className="mx-4 mb-[100px] flex w-full max-w-[1400px] flex-col items-stretch justify-center gap-6 sm:mx-12 lg:flex-row">
      <div className="flex items-stretch justify-center lg:flex-[0.45]">
        <Image
          src={girlLaptop.src}
          width={girlLaptop.width}
          height={girlLaptop.height}
          alt={t("contact.get_in_touch.alt_image")}
          loading="lazy"
          quality={80}
          placeholder="blur"
          blurDataURL="..."
          className="h-full max-h-[520px] w-full rounded-[20px] object-cover sm:max-h-[640px] lg:max-h-none"
        />
      </div>

      <div className="flex items-stretch justify-center lg:flex-[0.55]">
        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative flex w-full flex-col rounded-[20px] bg-white/70",
            "p-5 sm:p-10 md:px-12 md:pb-3 md:pt-[18px]",
            "shadow-[0px_-3px_8px_0px_rgba(0,155,245,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]",
          )}
        >
          <div className="relative mb-[46px] flex flex-col items-center justify-center gap-2 text-center">
            <h2 className="relative inline-flex items-center justify-center gap-2 font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2">
              {t("contact.get_in_touch.heading_lead")}
              {headingAccent && (
                <span className="font-bold text-success">{headingAccent}</span>
              )}
              <Image
                src={lines}
                alt=""
                className="absolute -top-4 -right-6 h-6 w-6 object-contain sm:-top-5 sm:-right-7"
              />
            </h2>
            <p className="text-center font-body text-small leading-relaxed">
              {t("contact.get_in_touch.subtitle_line_1")}
              {subtitleLine2 && (<><br />{subtitleLine2}</>)}
            </p>
          </div>

          <div className="z-[1] grid w-full grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2">
            {/* Each field block: */}
            <div className="flex flex-col gap-1">
              <label htmlFor="FirstName" className="font-body text-form-label text-ink-700">
                {t("contact.get_in_touch.label_first_name")}
              </label>
              <input
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={(e) => handleChange("FirstName", e.target.value)}
                placeholder={t("contact.get_in_touch.placeholder_first_name")}
                className={cn(
                  leagueSpartan.className,
                  "h-11 min-h-[44px] w-full rounded-[5px] bg-white px-4 font-body text-form-input text-ink-800 shadow-card",
                  "placeholder:text-ink-400 outline-none focus:outline-none focus-visible:outline-none",
                )}
              />
              {errors.FirstName && (
                <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                  {errors.FirstName}
                </p>
              )}
            </div>
            {/* …LastName, Email follow the same pattern… */}

            {/* Phone field with PhoneInput: */}
            <div>
              <label className="mb-1 block font-body text-form-label text-ink-700">
                {t("contact.get_in_touch.label_phone")}
              </label>
              <PhoneInput
                defaultCountry={isRTL ? "AE" : "SA"}
                value={formData?.PhoneNumber || ""}
                onChange={(e) => handleChange("PhoneNumber", String(e))}
                inputComponent={CustomInput}
                placeholder={t("contact.get_in_touch.placeholder_phone")}
                className="relative z-[2] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-[2.3vh] leading-[3.5vh] text-ink-800 shadow-card outline-none"
              />
              {errors.PhoneNumber && (
                <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                  {errors.PhoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Message field (full-width, label + textarea) */}
          <div className="mt-[6px] flex w-full flex-col gap-1">
            <label htmlFor="Message" className="font-body text-form-label text-ink-700">
              {t("contact.get_in_touch.label_message")}
            </label>
            <textarea
              id="Message"
              name="Message"
              rows={4}
              value={formData.Message}
              onChange={(e) => handleChange("Message", e.target.value)}
              placeholder={t("contact.get_in_touch.placeholder_message")}
              className={cn(
                leagueSpartan.className,
                "min-h-[120px] w-full resize-y rounded-[5px] bg-white px-4 py-3 font-body text-form-input text-ink-800 shadow-card",
                "placeholder:text-ink-400 outline-none focus:outline-none focus-visible:outline-none",
              )}
            />
            {errors.Message && (
              <p className="ms-[6px] mt-[6px] font-body text-small text-danger">
                {errors.Message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "my-4 h-12 w-full rounded-[10px] bg-brand-500 font-heading text-button !text-white",
              "shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] hover:bg-brand-500 sm:h-[52px]",
            )}
          >
            {loading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-label="loading" />
            ) : (
              t("contact.get_in_touch.submit")
            )}
          </Button>
        </form>
      </div>
    </div>
  </div>
);
```

---

## §4 Per-bug rationale (why each correction matters)

- **B14 (Grid breakpoint)** is the single most impactful fix. On a 768px iPad Mini, the current `sm:grid-cols-2` makes 4 form fields share half-width slots → each is ~340px wide minus paddings, cramping placeholders. MUI keeps them full-width up to 1199px so each input is ~700px wide on the same iPad — that's the visible "spacing is off" complaint.
- **B9 (heading margin-bottom)** is the second most impactful. MUI's `mb-46px` is intentional breathing space between the title and the form. Current `mb-1 sm:mb-2` (4-8px) compresses the title onto the form, breaking the visual hierarchy.
- **B16 / B20 (input border-radius)** is small but compounds. MUI inputs have `rounded-[5px]` (subtle), Tailwind ported as `rounded-md` (10px, more pillowy). Across 5 fields the form looks "softer" than MUI.
- **B8 (form padding)** affects the form's visual weight. The MUI 18/48/12/48 default gives the form a top-heavy, wide-margin look; the Tailwind 24/32/40 makes it boxier.

---

## §5 Verification

After applying the fix, run the [Phase 4 verification](../03-responsiveness.md):

- At **375px** (iPhone SE): form should be one column, 16px outer margin, 20px form padding, 100px bottom margin. h2 at 1.375rem.
- At **768px** (iPad Mini): still one column form (MUI keeps 1-col until 1200), 48px outer margin, 40px form padding (md not reached yet — wait, 768 < 900). At md (≥900): form padding shrinks to `18px / 48px / 12px / 48px`. h2 at 1.75rem.
- At **1280px** (Laptop S): two-column form layout, image+form side-by-side at flex 0.45 / 0.55. h2 at 2.25rem.
- At **1920px** (Desktop): same as 1280, mainDiv stays at max-w 1400 with mx-auto, image+form layout unchanged.

If at any width the form fields are cramped, the heading hugs the form, or the inputs look puffy — the fix isn't complete.

---

## §6 Things to leave alone

- The form submission logic (`handleSubmit`, `handleChange`, `useEffect`, geo-detection) — unchanged.
- The `t()` translation keys — keep current keys (they came from the Tailwind port's i18n setup, which is correct for that side).
- `dynamic(() => import("react-phone-number-input"), { ssr: false })` — keep as-is.
- The use of `cn()` — preserve the project convention.
