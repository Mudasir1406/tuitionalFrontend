# Component — `renderWithLineBreaks` (utility, not a component)

Pure utility function. Splits a string on `<br>` / `<br/>` / `<br />` tags (case-insensitive) and re-renders the parts interleaved with React `<br />` elements.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\line-break-text.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\line-break-text.tsx` |

---

## §1 MUI source — extracted properties

```ts
export function renderWithLineBreaks(text: string) {
  return text?.split(/<br\s*\/?>/i).map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < text.split(/<br\s*\/?>/i).length - 1 && <br />}
    </React.Fragment>
  ));
}
```

No JSX styling, no MUI components.

---

## §2 Tailwind port — bug list

Byte-for-byte identical. **No delta. No bug list.**

## §3 Corrected Tailwind classNames

N/A — pure logic utility.

## §4 Verification at 4 widths

N/A — output is parent-styled, depends on caller's wrapper.

## §5 RTL notes

`<br />` tags are direction-agnostic. The split regex is case-insensitive (`/i` flag) and matches any whitespace before the slash — robust for CMS HTML.
