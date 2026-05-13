# Component — `<BlogAuthorProfile>`

A **port-only** component (no MUI baseline) — renders author info card at the bottom of a blog detail page: circular avatar, name, country/date metadata, star rating, bio.

| Side | Path |
|---|---|
| MUI source | N/A (no MUI counterpart) |
| Tailwind port | `tuitionalFrontend\src\components\blog\author-profile\BlogAuthorProfile.tsx` |
| Arabic variant | N/A |

---

## §1 MUI source — extracted properties

**None.** No matching MUI component. Style fidelity is judged against the broader design system (brand-50 card, league spartan, ink colors).

The closest sibling pattern is the [BlogCard](./blog-card.md) and [AuthorSocial](./author-social.md). Maintain consistency with those.

---

## §2 Tailwind port — bug list

Audited against design-system conventions (no MUI counterpart):

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| BAP1 | 31 | `my-6` | OK — 24px section margin matches the inter-component rhythm | none |
| BAP2 | 32 | `rounded-md bg-brand-50 p-4` | `rounded-[10px]` for full house consistency (10px is the canonical card radius). Otherwise OK. | low |
| BAP3 | 33 | `h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white` (80×80 avatar) | OK | none |
| BAP4 | 37 | Fallback initial uses `text-h2` (36px desktop) — visually huge inside an 80px circle | Reduce to `text-h3` or `text-[2rem]` for safer fit. | low |
| BAP5 | 43 | `font-heading text-h6 text-ink-900` for name | OK — h6 is 16px, appropriate for inline metadata | none |
| BAP6 | 46-54 | Country/date use `text-small text-ink-700` with emoji prefix (Pin, Calendar) | OK | none |
| BAP7 | 56 | `<StarRating>` returns star characters in `text-warning` | OK — `#FFB000` warning amber is the right token | none |
| BAP8 | 58 | `mt-2 font-heading text-small text-ink-800` for bio | OK | none |
| BAP9 | 19 | `text-warning` / `text-ink-300` for stars | Verify `ink-300` is defined in Tailwind config (light grey for empty stars) | low |

---

## §3 Corrected Tailwind classNames

```tsx
const BlogAuthorProfile: React.FC<Props> = ({ data }) => {
  if (!data?.authorName) return null;
  return (
    <div className="my-6">
      <div className="flex flex-col gap-4 rounded-[10px] bg-brand-50 p-4 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white">
          {data.authorImage ? (
            <Image src={data.authorImage} alt={data.authorName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-200 font-heading text-h3 text-white">
              {data.authorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="font-heading text-h6 text-ink-900">{data.authorName}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {data.authorCountry && (
              <span className="font-heading text-small text-ink-700">{data.authorCountry}</span>
            )}
            {data.blogDate && (
              <span className="font-heading text-small text-ink-700">{data.blogDate}</span>
            )}
          </div>
          {data.authorStars ? <StarRating stars={Number(data.authorStars)} /> : null}
          {data.authorAbout && (
            <p className="mt-2 font-heading text-small text-ink-800">{data.authorAbout}</p>
          )}
        </div>
      </div>
    </div>
  );
};
```

## §4 Verification at 4 widths

- **375**: stacked (avatar above text), centered.
- **768**: side-by-side (`sm:flex-row`), avatar left, text right.
- **1280 / 1920**: same as 768.

## §5 RTL notes

When Arabic blog support is enabled, swap emoji prefixes for translated labels, and `sm:flex-row` auto-mirrors via `dir="rtl"`. No RTL-specific classes needed.
