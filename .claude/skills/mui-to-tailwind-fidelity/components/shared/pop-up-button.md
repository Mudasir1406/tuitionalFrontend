# Component — `PopUpButton`

Generic "open the lead-capture FormDialog OR navigate to a URL" button. If `href === "popup"`, opens a modal `FormDialog` (EN or AR variant chosen by pathname); otherwise behaves as a regular link.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\pop-up-button.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\pop-up-button.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Button
    sx={sx prop}                       <-- caller-provided MUI sx object
    className={leagueSpartan.className}
    href={href !== "popup" ? href : undefined}
    onClick={handleClick}
  >
    {text}
  </Button>
  {open && mounted && (isArabic ? <ArFormDialog/> : <FormDialog/>)}
</>
```

### Dimensions / spacing
- **All styling is passed in via the `sx` prop from the parent caller.** This component has no intrinsic styles. Each caller (Footer, GetInTouch, etc.) provides its own button shape.

### Typography
- Same — typography is `leagueSpartan.className` + whatever the `sx` prop defines.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| PB1 | pop-up-button.tsx:14-19 | API surface: takes `className?: string; style?: React.CSSProperties` (no `sx`) | MUI accepts `SxProps<Theme>`. The port replaces with `className` + `style` — necessary translation, but breaks any caller still passing `sx`. Verify all 30+ call sites updated. | high |
| PB2 | pop-up-button.tsx:46-71 | Branches: if `href === "popup"` → `<button>`; else `<a href>` | MUI uses `<Button href=…>` polymorphism. Port renders `<button>` vs `<a>` separately — semantically clearer, no bug. | none |
| PB3 | pop-up-button.tsx:43-44 | `baseClasses = "inline-flex cursor-pointer items-center justify-center text-center normal-case no-underline outline-none"` | MUI Button defaults give similar behavior. Port's `baseClasses` are reasonable. | none |
| PB4 | pop-up-button.tsx:50-60 | Drops the `isArabic`-conditional `ArFormDialog` rendering — always uses `FormDialog` | MUI source picks `ArFormDialog` when `pathname.startsWith('/ar')`. **Port loses Arabic dialog support.** | high |
| PB5 | pop-up-button.tsx | Drops `usePathname` import (was used only for Arabic detection) | Restoring AR support requires re-adding `usePathname` + the `ArFormDialog` dynamic import + the pathname check. | high |

---

## §3 Corrected Tailwind classNames

```tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { leagueSpartan } from "@/app/fonts";
import { cn } from "@/utils/cn";
import { FormType } from "./home/form-dialouge";

const FormDialog = dynamic(() => import("./home/form-dialouge"), { ssr: false });
const ArFormDialog = dynamic(() => import("./home/ar-form-dialouge"), { ssr: false });

type IProps = {
  href: string;
  text: string;
  className?: string;
  style?: React.CSSProperties;
  values?: FormType;
};

const PopUpButton: React.FC<IProps> = ({ href, text, className, style, values }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  useEffect(() => { setMounted(true); }, []);

  const base = "inline-flex cursor-pointer items-center justify-center text-center normal-case no-underline outline-none";

  if (href === "popup") {
    return (
      <>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setOpen(true); }}
          className={cn(base, leagueSpartan.className, className)}
          style={style}
        >
          {text}
        </button>
        {open && mounted && (
          isArabic
            ? <ArFormDialog open={open} handleClose={() => setOpen(false)} values={values} />
            : <FormDialog   open={open} handleClose={() => setOpen(false)} values={values} />
        )}
      </>
    );
  }

  return (
    <a href={href} className={cn(base, leagueSpartan.className, className)} style={style}>
      {text}
    </a>
  );
};

export default PopUpButton;
```

## §4 Verification at 4 widths

N/A — this is a slot component. Verify at the **call-site** widths (e.g. Footer banner CTA, GetInTouch submit). The buttons inherit dimensions from the caller's `className`.

## §5 RTL notes

- Critical fix: detect `isArabic = pathname.startsWith('/ar')` and render `ArFormDialog`.
- Button styling is direction-agnostic (text-centered).
