# Component — `PopUpButtonV2`

V2 variant of `PopUpButton`. Identical API but opens **`FormV2Dialog`** (the grade-subject-level form) instead of the generic home form. Used by `FooterV2` and the `/a-level`/`/gcse`/`/igcse` landing pages.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pop-up-buttonV2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\pop-up-buttonV2.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Button sx={sx} className={leagueSpartan.className} href={…} onClick={handleClick}>
    {text}
  </Button>
  {open && <FormV2Dialog open handleClose values />}
</>
```

### Dimensions / spacing / typography
- All caller-provided via `sx`. No intrinsic style.
- Notable diff from `PopUpButton`: **no `usePathname` / Arabic branching** — always opens `FormV2Dialog` (the V2 form has its own AR support or isn't language-split).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| PV1 | pop-up-buttonV2.tsx:9-14 | API: `className`, `style` (no `sx`) | Same translation as `PopUpButton` — necessary. | none |
| PV2 | pop-up-buttonV2.tsx:36-51 | If `href === "popup"` → `<button>`; else `<a>` | Same as MUI. | none |
| PV3 | pop-up-buttonV2.tsx:33-34 | `baseClasses` identical to `PopUpButton` | Acceptable. | none |
| PV4 | pop-up-buttonV2.tsx | Drops `mounted` state used in `PopUpButton` | MUI source doesn't use `mounted` either — diff with port `pop-up-button.tsx` (which has `mounted` for SSR safety) and decide which version's pattern is canonical. The V2 MUI version omits it, the port follows MUI. OK. | none |

Overall: this is a clean translation. No critical bugs.

---

## §3 Corrected Tailwind classNames

The port is correct. The only consideration is to ensure callers pass the right `className` shapes. Example from `FooterV2`:

```tsx
<PopUpButtonV2
  text="Book a Free Trial"
  href="popup"
  className="block w-full rounded-[10px] bg-white px-[25px] py-[1.5vh] text-center leading-[23px] tracking-[-0.02em] text-[#009BF5] shadow-cta-white hover:bg-white md:w-auto md:px-[22px] md:py-[2vh] lg:px-[25px] lg:py-[2vh]"
/>
```

## §4 Verification at 4 widths

N/A — same as `PopUpButton`, verify at call-sites.

## §5 RTL notes

No RTL branching in either MUI or port. If the V2 form ever gains an AR variant, mirror the `PopUpButton` pattern: `usePathname` + `pathname.startsWith('/ar')` + dynamic AR form import.
