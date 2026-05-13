# Component — `HtmlWrapper`

Client-side `<html>` attribute toggler. Reads `useI18n().locale` + `isRTL`, then sets `document.documentElement.dir` and `lang` on mount and on locale change. No UI rendering — returns `{children}` as-is.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\html-wrapper.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\html-wrapper.tsx` |

---

## §1 MUI source — extracted properties

```
"use client";
useEffect(() => { setMounted(true) }, []);
useEffect(() => {
  if (mounted && typeof window !== 'undefined') {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);
  }
}, [locale, isRTL, mounted]);
return <>{children}</>;
```

No JSX styling. Logic-only component.

---

## §2 Tailwind port — bug list

The two files are byte-for-byte identical. **No delta. No bug list.**

---

## §3 Corrected Tailwind classNames

N/A — no UI surface.

## §4 Verification at 4 widths

N/A — invisible component.

## §5 RTL notes

This component **is** the RTL switcher: it's what flips `<html dir="rtl">` globally so the rest of the app (Tailwind logical properties, `stylis-plugin-rtl` in MUI baseline) mirrors content. Don't remove it.
