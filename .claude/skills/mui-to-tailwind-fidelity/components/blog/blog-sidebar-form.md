# Component — `<BlogSidebarForm>`

A **port-only** component — has no MUI baseline counterpart. It replaces the MUI sidebar's Category/Tag accordions with a full lead-capture form (name, email, phone, grade, curriculum, subject, message). Used by `LeftSection.tsx` in the Tailwind port.

| Side | Path |
|---|---|
| MUI source | N/A (no MUI counterpart — see §1) |
| Tailwind port | `tuitionalFrontend\src\components\blog\left-section\BlogSidebarForm.tsx` |
| Arabic variant | N/A |

---

## §1 MUI source — extracted properties

**None.** This component is a Tailwind-only invention. The closest MUI parallels are the lead forms in `src/components/contact/*` and `src/components/home/form-dialouge.tsx`.

Reference for visual fidelity: the [contact GetInTouch form](../contact/) and the home page lead drawer use this same shape — `bg-brand-50` card, stacked inputs `h-9` with `shadow-card`, primary `Button` at the bottom.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| BSF1 | 137 | `inputCls = "h-9 ... px-3"` (36px tall) | MUI house input is `h-[5.5vh] min-h-[50px]` for short viewports and uses `text-form-input` (16px). Compare with [GetInTouch](../contact/) — currently shorter than canonical. | med |
| BSF2 | 141 | `flex flex-col gap-2 rounded-md bg-brand-50 p-4 shadow-card` | Acceptable, matches form-card pattern. Container radius could be `rounded-[10px]` for full house consistency. | low |
| BSF3 | 142 | `<h3 className="font-heading text-h6 text-ink-900">Get Started</h3>` | Heading lacks the bilingual `t.getStarted` translation pattern used elsewhere in the codebase. If MUI didn't have this section, English-only is fine — but ensure bilingual via `useI18n()` once Arabic blog support is enabled. | low |
| BSF4 | 169 | PhoneInput `h-9 ... shadow-card` | Same as BSF1 — bump to `h-[5.5vh] min-h-[50px]` | med |
| BSF5 | 207-213 | `<Textarea rows={3}>` no font-heading | Add `font-heading text-form-input` for consistency | low |
| BSF6 | 216-222 | Button `w-full` with submission spinner | OK | none |
| BSF7 | (whole) | All form labels/placeholders hardcoded in English | Bilingual: route placeholders through `useI18n()` like `placeholder={t.enterNameHere}` — currently doesn't gate on locale | med (consistency) |

---

## §3 Corrected Tailwind classNames

```tsx
const inputCls =
  "h-[5.5vh] min-h-[50px] w-full rounded-[10px] bg-white px-3 font-heading text-form-input text-ink-900 shadow-card";
const errCls = "ms-1 mt-1 font-body text-small text-danger";

return (
  <div className="flex flex-col gap-2 rounded-[10px] bg-brand-50 p-4 shadow-card">
    <h3 className="font-heading text-h6 text-ink-900">
      {locale === "ar" ? "ابدأ" : "Get Started"}
    </h3>
    {/* ...inputs use inputCls above... */}
    <PhoneInput
      defaultCountry="SA"
      value={formData.PhoneNumber || ""}
      onChange={(e) => handleChange("PhoneNumber", String(e))}
      inputComponent={CustomInput}
      placeholder={locale === "ar" ? "أدخل رقم الهاتف ..." : "Enter phone number ..."}
      className="h-[5.5vh] min-h-[50px] w-full rounded-[10px] bg-white ps-2 shadow-card"
    />
    <Textarea
      name="Message"
      rows={3}
      value={formData.Message}
      onChange={(e) => handleChange("Message", e.target.value)}
      placeholder={locale === "ar" ? "أدخل رسالتك هنا..." : "Enter your message here..."}
      className="font-heading text-form-input"
    />
    <Button onClick={onSubmit} variant="primary" className="w-full">
      {loading ? <Spinner /> : locale === "ar" ? "إرسال" : "Submit Now"}
    </Button>
  </div>
);
```

## §4 Verification at 4 widths

- **375 / 768**: Form spans full width of its parent container; inputs 5.5vh tall (≥50px floor for short viewports).
- **1280 / 1920**: Form constrained to sidebar column (20% of page width); inputs scale proportionally.

## §5 RTL notes

When locale=`ar`, swap `ps-*` (padding-inline-start) and `ms-*` (margin-inline-start) — Tailwind logical properties handle most mirroring automatically. PhoneInput component will still render the country flag on the left visually; verify with the Arabic blog page once enabled.

Form is only displayed when MUI baseline shows accordions — see [left-section.md](./left-section.md) §LS3 for product-level call on whether this divergence is intentional.
