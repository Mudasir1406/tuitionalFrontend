# Component — `ArServerFooter`

Server-component shell that fetches the **Arabic** footer dataset (`getFooterData('ar')`). In the MUI baseline, it renders a **dedicated `<ArFooter />`** with mirrored circle positions and Arabic copy. In the Tailwind port, it falls back to the same `<Footer />` wrapped in `<div dir="rtl">`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\ar-server-footer.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\ar-server-footer.tsx` |
| Related | `ar-footer.tsx` (MUI only — see `ar-footer.md`) |

---

## §1 MUI source — extracted properties

```
import ArFooter from "./ar-footer";

const ArServerFooter: React.FC = async () => {
  const footerData = await getFooterData('ar');
  return <ArFooter footerData={footerData} />;
};
```

Pure pass-through wrapper. **Key**: the MUI version renders `<ArFooter />`, **NOT** `<Footer />`. `ArFooter` has different style values (RTL-mirrored circles, RTL margin properties on `admissionText` / `social`).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| ASF1 | ar-server-footer.tsx:3 | `import Footer from "./footer";` | MUI imports `ArFooter from "./ar-footer"`. Port does **not** have an `ar-footer.tsx` file at all. | high (architecture drift) |
| ASF2 | ar-server-footer.tsx:9 | Wraps `<Footer />` in `<div dir="rtl">` | The wrapping `<div dir="rtl">` triggers `stylis-plugin-rtl` / Tailwind logical-property flipping, which gets most RTL right BUT: MUI's `ar-footer.tsx` had explicit overrides (e.g. `rightCircle { left: 60 }` instead of `right: 60`, `social { marginLeft: 20 }` instead of `marginRight: 20`). Some of these aren't auto-mirrored if authored as inline `left/right` instead of logical `start/end`. | medium |
| ASF3 | ar-server-footer.tsx | No `ar-footer.tsx` file in port | If the port wants to keep ArServerFooter aligned with the MUI baseline, recreate `ar-footer.tsx` with the AR-specific styles (RTL-flipped circles, AR copy, AR alt-text). Otherwise audit `footer.tsx` to ensure every property uses logical `start`/`end` (paddingLeft → `ps`, marginRight → `me`, etc.) so the `dir="rtl"` div is sufficient. | medium |

---

## §3 Corrected Tailwind classNames

N/A directly — fix routes through one of:
1. Create `ar-footer.tsx` mirroring MUI's `ar-footer.tsx` → import it here. Use `components/shared/ar-footer.md` as guide.
2. Confirm `footer.tsx` uses logical properties everywhere (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`) and keep the `<div dir="rtl">` wrapper.

## §4 Verification at 4 widths

Test at 375 / 768 / 1280 / 1920 with `dir="rtl"`:
- Decorative right circle should appear on the **left** (mirrored)
- Decorative bottom-left circle should appear on the **bottom-right**
- Social icon row should have `marginLeft` (not `marginRight`) between icons
- Admission text should have `marginRight: 10px` from the plan-icon disc

## §5 RTL notes

Critical mirror points (from MUI `ar-footer.tsx`):
- `rightCircle.left: 60` (not `right`)
- `leftCircle.right: -230` (not `left`)
- `social.marginLeft: 20px` (not `marginRight`)
- `admissionText.marginRight: 10px` (not `marginLeft`)

If using `<div dir="rtl">` over the LTR Footer, ensure all four are written as logical pairs (`start`/`end`) in `footer.tsx` so they flip automatically.
