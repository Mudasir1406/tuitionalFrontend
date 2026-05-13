# Component — `ServerFooter`

Server-component shell around `<Footer />`. Calls `getFooterData("en")` server-side and passes the result down. Hydrates the EN footer without a client-side fetch.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\server-footer.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\server-footer.tsx` |
| Related | `ar-server-footer.tsx` (Arabic variant — see `ar-server-footer.md`), `footer-wrapper.tsx` (client variant) |

---

## §1 MUI source — extracted properties

```
const ServerFooter: React.FC = async () => {
  const footerData = await getFooterData('en');
  return <Footer footerData={footerData} />;
};
```

Pure server-component pass-through. No JSX styling.

---

## §2 Tailwind port — bug list

Files are byte-for-byte identical. **No delta. No bug list.**

All visual behavior is in `<Footer />` — see `components/shared/footer.md`.

## §3 Corrected Tailwind classNames

N/A.

## §4 Verification at 4 widths

N/A — passes through.

## §5 RTL notes

This component fetches the EN footer dataset. RTL is handled by `<ArServerFooter />` instead (see `ar-server-footer.md`). Both render the same `<Footer />` component; the only difference is the locale-keyed dataset.
