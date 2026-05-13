# Component — `<TagsAndSocial>`

Bottom-of-article row: list of tag chips on the left, social share icons on the right. Stacks vertically below 768px.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\tags-social\TagsAndSocial.tsx` + `TagsAndSocial.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\tags-social\TagsAndSocial.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-tags-social\Ar-TagsAndSocial.tsx` (RTL: positions swap) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.tagsAndSocial (flex row, justify-between, items-center)
├── .tags (flex 0.6)
│   ├── <Typography variant="subtitle2"> "Tags"
│   └── .allTags (flex-wrap, mt-12px)
│       └── Tag × N
└── .socialDiv (flex 0.3, row, gap-8)
    └── 4× .socialIcon (32×32, object-cover)
```

### Dimensions & spacing

| Element | Property | <576px | 576-767px | ≥768px |
|---|---|---|---|---|
| `.tagsAndSocial` | flex-direction | column | column | row |
| `.tagsAndSocial` | row-gap (576-767 only) | — | `16px` | — |
| `.tags` | flex | 1 (stretched) | 1 | 0.6 |
| `.tags` | align-items (mobile) | center | center | — |
| `.allTags` | margin-top | `12px` | `12px` | `12px` |
| `.socialDiv` | flex | 1 | 1 | 0.3 |
| `.socialDiv` | column-gap | `8px` | `8px` | `8px` |
| `.socialIcon` | size | `32 × 32px` | same | same |

### Typography

| Element | Variant | Size | Weight | Color | Font |
|---|---|---|---|---|---|
| "Tags" | `subtitle2` | 14px (stat-label sizing) | (default) | inherits | League Spartan |

### Colors

No specific colors; relies on `<Tag>` component styling.

### Animations / interactions

- Icons `cursor: pointer`. No transition. Click → external share URL.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| TS1 | 31 | `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between` | OK — switches to row at sm=600 (Tailwind), MUI switches at 768. ~168px earlier. Use `md:flex-row md:items-center md:justify-between` for closer match. | low |
| TS2 | (missing) | (no `flex` ratios on children) | MUI sets `.tags { flex: 0.6 }` and `.socialDiv { flex: 0.3 }`. Add `md:flex-[0.6]` and `md:flex-[0.3]` on respective children. | med |
| TS3 | 33 | `font-heading text-stat-label uppercase text-ink-700` for "Tags" | MUI uses `variant="subtitle2"` which is 14px stat-label sizing **without uppercase** (only `categoryTag` is uppercase). Drop `uppercase`. | med |
| TS4 | 33 | `text-ink-700` | MUI doesn't specify a color for the "Tags" label — inherits parent. Use `text-ink-900` for parity. | low |
| TS5 | 36 | `mt-2` (8px) | MUI `.allTags { margin-top: 12px }`. Use `mt-3` (12px). | low |
| TS6 | 47 | `flex gap-3` social icons | MUI `column-gap: 8px`. Use `gap-2` (8px). | low |
| TS7 | 49 | `h-8 w-8 object-contain` | MUI `.socialIcon` uses `object-fit: cover`. Use `object-cover` (current is `object-contain`). | med |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div className="flex flex-col items-center sm:items-stretch md:flex-[0.6]">
    <p className="font-heading text-stat-label text-ink-900">
      {isArabic ? "العلامات" : "Tags"}
    </p>
    <div className="mt-3 flex flex-wrap gap-2">
      {tags?.map((tag: any, i) => (
        <Tag
          label={isArabic ? tag.name.ar : tag.name.en}
          key={i}
          link={`${tagsBase}/${tag?.id}`}
        />
      ))}
    </div>
  </div>
  {showSocial && (
    <div className="flex justify-center gap-2 md:flex-[0.3]">
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
  )}
</div>
```

## §4 Verification at 4 widths

- **375**: stacked column, tags centered, social row below.
- **768**: still stacked (Tailwind `md=900`); MUI would already be row at 768 — drift accepted.
- **1280**: row layout with 0.6/0.3 flex ratios (or wider — the remaining 0.1 is gap).
- **1920**: same as 1280, more whitespace.

## §5 RTL notes

`Ar-TagsAndSocial.module.css` is identical apart from flex-direction nuances at mobile (no real difference). When isArabic, tag wrap can stay LTR-flowing (tags are language-neutral). Social icon order is preserved.
