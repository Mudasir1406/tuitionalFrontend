# Component — `FooterWrapper`

Client-side data-fetching shell around `<Footer />`. Subscribes to `useI18n().locale`, calls `getFooterData(locale)`, and either renders the footer with data or `null` while loading. Provides a default empty `FooterData` on fetch failure to prevent crashes.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\footer-wrapper.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\footer-wrapper.tsx` |

---

## §1 MUI source — extracted properties

No JSX styling whatsoever — wraps `<Footer footerData={...} />` after a `useEffect` data fetch.

```
"use client";
useEffect(fetch on locale change) → setState → render <Footer footerData={...} />
```

### Dimensions / Typography / Colors / Animations
None — this is a logic-only shell. All visual behavior is delegated to `<Footer />`.

---

## §2 Tailwind port — bug list

The two files are byte-for-byte identical (verified). **No delta. No bug list.**

The only behavior to verify is the underlying `<Footer />` (see `components/shared/footer.md`).

---

## §3 Corrected Tailwind classNames

N/A — wrapper has no styling surface.

## §4 Verification at 4 widths

N/A — falls through to `<Footer />`.

## §5 RTL notes

N/A — the wrapper passes `locale` through to `getFooterData`; the rendered `<Footer />` reads `useI18n()` directly.
