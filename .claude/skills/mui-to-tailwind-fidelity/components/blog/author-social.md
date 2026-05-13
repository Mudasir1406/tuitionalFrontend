# Component — `<AuthorSocial>`

A **port-only** component (no MUI baseline). Combines "Written by" author line and a "Share this article" social row in a single brand-50 card.

| Side | Path |
|---|---|
| MUI source | N/A |
| Tailwind port | `tuitionalFrontend\src\components\blog\author-social\AuthorSocial.tsx` |
| Arabic variant | Built-in `isArabic` detection from `usePathname()` (no separate file) |

---

## §1 MUI source — extracted properties

**None.** Closest sibling: `<TagsAndSocial>` (which itself is the "tags + social" composition). This component combines author info with social — a slight repackaging.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| AS1 | 32 | `rounded-md` | `rounded-[10px]` for design-system consistency | low |
| AS2 | 32 | `flex flex-col gap-4 rounded-md bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between` | OK pattern — matches BlogAuthorProfile shape | none |
| AS3 | 34 | `font-heading text-h5 text-ink-900` for "Written by {name}" | h5 is 16-18px responsive. OK but consider `text-h6` (16px flat) to match the "Tags" / "Share" label hierarchy in the parallel TagsAndSocial component | low |
| AS4 | 38 | `font-heading text-small text-ink-700` for bio | OK | none |
| AS5 | 42 | `font-heading text-stat-label uppercase text-ink-700` for "Share this article" | OK — stat-label is the canonical small uppercase label style | none |
| AS6 | 45 | `mt-2 flex gap-3` | TagsAndSocial uses `gap-2` (8px) for social row. Change to `gap-2` for consistency | low |
| AS7 | 47-58 | Social images `h-8 w-8 object-contain` | TagsAndSocial baseline (MUI) uses `object-cover` and 32×32 — match with `object-cover` | low |

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="flex flex-col gap-4 rounded-[10px] bg-brand-50 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="font-heading text-h6 text-ink-900">
        {writtenBy} {authorName}
      </p>
      {authorBio && (
        <p className="mt-1 font-heading text-small text-ink-700">{authorBio}</p>
      )}
    </div>
    <div>
      <p className="font-heading text-stat-label uppercase text-ink-700">
        {shareTitle}
      </p>
      <div className="mt-2 flex gap-2">
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
          <Image className="h-8 w-8 cursor-pointer object-cover" src={facebook} alt="facebook" />
        </a>
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
          <Image className="h-8 w-8 cursor-pointer object-cover" src={twitter} alt="twitter" />
        </a>
        <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
          <Image className="h-8 w-8 cursor-pointer object-cover" src={whatsapp} alt="whatsapp" />
        </a>
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
          <Image className="h-8 w-8 cursor-pointer object-cover" src={linkedin} alt="linkedin" />
        </a>
      </div>
    </div>
  </div>
);
```

## §4 Verification at 4 widths

- **375**: stacked (author info above, social row below).
- **768+**: side-by-side, `justify-between` pushes social to the right.
- **1280 / 1920**: same as 768.

## §5 RTL notes

Component already handles RTL via `isArabic` boolean from `usePathname()` — substitutes "Written by"→"كتبه" and "Share this article"→"شارك هذا المقال". The `sm:flex-row` auto-mirrors when `dir="rtl"` is on `<html>`.
