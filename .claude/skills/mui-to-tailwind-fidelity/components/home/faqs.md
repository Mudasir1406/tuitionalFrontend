# Component — `<Faqs>`

Home-page "Frequently Asked Questions" section: a centered heading with a decorative `linesInvert` icon to its left, followed by a vertical list of accordion `<Questions>` items.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\faqs.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\faqs.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-faqs.tsx` (locale handled via `Faqs` `locale` prop in Tailwind) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.contanier}>                       (sic — typo preserved)
├── <Box sx={styles.headingContanier}>
│   └── <Typography component="h2" variant="h2" sx={styles.heading}>
│         Frequently Asked Questions
│         ::before → lines-invert image (or linesMobile at xs)
└── faqs.map → <Questions question answer />
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.contanier` (root) | `marginBottom` | 20px | 20px | 20px |
| `.contanier` | `position` | relative | relative | relative |
| `.contanier` | `display` | (typo: `dispaly` → ineffective) | (same) | (same) |
| `.contanier` | `alignItems` / `justifyContent` | center / center | same | same |
| `.headingContanier` | `display` | flex | flex | flex |
| `.headingContanier` | `flexDirection` | column | column | column |
| `.headingContanier` | `alignItems` | center | center | center |
| `.headingContanier` | `width` | 100% | 100% | 100% |
| `.headingContanier` | `background` | transparent | transparent | transparent |
| `.heading` | `marginBottom` | 20px | 20px | 20px |
| `.heading` | `display` | flex | flex | flex |
| `.heading` | `position` | relative | relative | relative |
| `.heading` | `textAlign` | center | center | center |
| `.heading` | `alignItems` / `justifyContent` | center / center | same | same |
| `.heading` | `color` | `#000000` | same | same |
| `.heading::before` | `height` × `width` | 19px × 20px | 35px × 43px | 35px × 43px |
| `.heading::before` | `top` | -20px | -35px | -35px |
| `.heading::before` | `left` | -6% | -6% | -6% |
| `.heading::before` | `backgroundImage` | linesMobile | linesInvert | linesInvert |
| `.heading::before` | `backgroundRepeat` | no-repeat | same | same |
| `.heading::before` | `position` / `content` | absolute / `''` | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading `<Typography variant="h2">` | h2 | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000000` | League Spartan |

### Colors

- `#000000` → `text-black`
- background → transparent → no Tailwind class

### Animations / interactions

- None on root. Accordion animations live inside `<Questions>` (separate file/spec).

---

## §2 Tailwind port — bug list

| # | Line | Current className | Expected | Severity |
|---|---|---|---|---|
| B1 | 20 | `<div className="relative mb-5 flex flex-col items-center justify-center">` | matches MUI `marginBottom: 20px` (`mb-5` = 20px) ✓. The `flex flex-col items-center justify-center` on the outer container is invented (MUI has typo `dispaly` so the flex-properties never apply). Acceptable — visually identical. | low |
| B2 | 21 | `<div className="flex w-full flex-col items-center bg-transparent">` | matches `.headingContanier` ✓ | — |
| B3 | 22 | h2: `relative mb-5 flex items-center justify-center text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-black` | matches MUI heading (mb-20px, center, h2 triplet, black) ✓ | — |
| B4 | 23-28 | linesMobile icon: `absolute -left-[6%] -top-5 h-[19px] w-5 object-contain sm:hidden` | MUI ::before xs: `top: -20`, `left: -6%`, height 19px, width 20px. ✓ matches | — |
| B5 | 29-34 | linesInvert icon: `absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block` | MUI ::before sm/md/lg: `top: -35`, `left: -6%`, 35×43. ✓ matches | — |
| B6 | 38 | `<div className="w-full">` wrapping faqs map | MUI maps faqs as direct children of `.contanier` (no wrapper div). Adding `w-full` wrapper is harmless but unnecessary. Acceptable. | low |
| B7 | 22 | `font-heading` applied | MUI uses `leagueSpartan.className`. ✓ matches (font-heading resolves to League Spartan in Tailwind config) | — |

**Net assessment**: this port is largely correct. No high-severity fixes needed.

### B8 — Accordion animation (MUI parity)

MUI `<Accordion>` smoothly slides the panel open/closed. Conditional `{open && <DisclosurePanel>}` rendering snaps without transition. Render `DisclosurePanel` always (use `static`) and animate with the CSS grid-rows trick + Headless UI `data-[open]`:

```tsx
<DisclosurePanel
  static
  className="grid grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-300 ease-in-out data-[open]:grid-rows-[1fr] data-[open]:opacity-100 opacity-0"
>
  <div className="overflow-hidden">
    <hr className="mx-auto mt-2 w-[95%] border-ink-200" />
    <div className="my-5 ms-[1.5%] me-[1.5%] font-heading text-small text-black">
      {answer}
    </div>
  </div>
</DisclosurePanel>
```

Pattern reusable for any Headless UI `Disclosure`/`Transition` panel where MUI used `<Accordion>`.

### B9 — Mobile horizontal padding (page-level)

`<Faqs>` page wrapper in `app/page.tsx` was `mx-auto lg:max-w-[1450px]` — no horizontal padding below `lg`. MUI `<Container>` default = 16px (xs) / 24px (sm+). Add `px-4 sm:px-6 lg:px-0`. Same fix applies to any inline `<Container>` substitute in the Tailwind port.

---

## §3 Corrected Tailwind classNames

The port is correct as-is. The only minor cleanup would be to drop the unnecessary outer wrapper. Current JSX is acceptable.

```tsx
// Current is correct. Optional cleanup:
<div className="relative mb-5">
  <div className="flex w-full flex-col items-center bg-transparent">
    <h2 className="relative mb-5 flex items-center justify-center text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-black">
      <Image src={linesMobile} alt="" aria-hidden="true"
        className="absolute -left-[6%] -top-5 h-[19px] w-5 object-contain sm:hidden" />
      <Image src={linesInvert} alt="" aria-hidden="true"
        className="absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block" />
      {t.heading}
    </h2>
  </div>
  {faqs?.map((item, index) => (
    <Questions key={index} question={item.question} answer={item.answer} />
  ))}
</div>
```

## §4 Verification at 4 widths

- **375**: heading 22px, mb-20px. linesMobile icon 19×20 at -6%/-20px (top-left). Questions list below.
- **768**: heading 28px. linesInvert icon 35×43 at -6%/-35px. Questions list.
- **1280**: heading 36px. linesInvert icon unchanged. Questions list.
- **1920**: same as 1280.

## §5 RTL notes

- AR variant uses `direction: "rtl"` on root + heading text reads right-to-left.
- The `::before` icon's `left: -6%` flips visually to right side via `dir="rtl"` only if authored as `start-[-6%]`. Currently the Tailwind port uses `-left-[6%]` (LTR-physical), which will NOT mirror under `dir="rtl"`. To make it RTL-correct, change `absolute -left-[6%]` → `absolute start-[-6%]` (Tailwind v3 has `start-*` / `end-*` only via plugin or arbitrary `inset-inline-start`). If `start-*` is unavailable, use the directional class via `ltr:-left-[6%] rtl:-right-[6%]`.
- AR variant heading: `textAlign: "right"` — in the port, `text-center` on the heading takes precedence and matches MUI behavior visually since the heading is also `justify-center`.
