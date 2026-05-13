# Component — `FooterLinks`

Renders the first ten of a string-array (subjects or get-help labels) as vertical `<Link>`s in the footer. Each text item is wrapped in a `Typography variant="body2"` with responsive `line-height` per breakpoint.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\footerLinks\FooterLinks.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\footerLinks\FooterLinks.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
React.Fragment
└── footerData.slice(0,10).map →
    <Link href={finalHref}>
      <Typography sx={styles.text} variant="body2" className={leagueSpartan.className}>
        {item}
      </Typography>
    </Link>
```

Each item is independently positioned by its parent footer container — `FooterLinks` itself contributes no wrapper.

### Dimensions & spacing — from `styles.text` (sx object)

| Property | xs | sm | md | lg |
|---|---|---|---|---|
| cursor | pointer | pointer | pointer | pointer |
| lineHeight | 35px | 40px | 40px | 45px |
| color | black | black | black | black |

There is no `marginY` / `marginBottom` / `padding` — line-height alone separates rows.

### Typography

| Property | Value |
|---|---|
| MUI variant | `body2` → 14px (`text-small`) per 01-token-mapping §1 |
| font-family | League Spartan (via `leagueSpartan.className`) |
| color | black |
| line-height | 35 / 40 / 40 / 45 px (xs / sm / md / lg) |

### Colors

| Element | Color |
|---|---|
| text | black |
| (no bg, no border, no shadow) | — |

### Animations / interactions

- `cursor: pointer` only — no hover styling. The wrapping `<Link>` provides keyboard / mouse activation; no `onMouseEnter` / underline-on-hover.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 38 | `text-body` (16px) | MUI `variant="body2"` = 14px → `text-small` | **HIGH — 2px larger than MUI** |
| 2 | 38 | `text-black` | matches MUI `color: "black"` | ✓ |
| 3 | 38 | `cursor-pointer` | matches | ✓ |
| 4 | 38 | `leading-[35px] sm:leading-[40px] md:leading-[40px] lg:leading-[45px]` | matches MUI breakpoint object xs/sm/md/lg = 35/40/40/45 px line-heights | ✓ |
| 5 | 38 | `font-heading` | MUI passes `leagueSpartan.className` which sets the `--font-league-spartan` family — `font-heading` resolves to the same family in `tailwind.config.ts`. ✓ | ✓ |
| 6 | (no wrapping container) | matches MUI — `FooterLinks` returns a `<>` fragment, individual `<Link>` rows | ✓ | ✓ |

### Summary

**1 bug**: #1 — `text-body` should be `text-small` to match MUI `variant="body2"`. Everything else is correct.

## §3 Corrected Tailwind classNames

```tsx
<p className={cn(leagueSpartan.className,
  "cursor-pointer text-black",
  // was text-body (16px) → text-small (14px) to match MUI variant="body2"
  "font-heading text-small",
  // line-heights match MUI sx { xs: 35, sm: 40, md: 40, lg: 45 }
  "leading-[35px] sm:leading-[40px] md:leading-[40px] lg:leading-[45px]"
)}>
  {item}
</p>
```

## §4 Verification at 4 widths

- 375 (xs band): text 14px, line-height 35px → each row 35px tall.
- 768 (≥sm, <md = 900): text 14px, line-height 40px.
- 1280 (≥lg = 1200): text 14px, line-height 45px.
- 1920: same as 1280.

All four widths use the same 14px font; only line-height steps.

## §5 RTL notes

- No directional margin/padding on the Typography → no flip needed.
- Each row is a single `<p>` inside `<Link>`. Under `dir="rtl"`, the text aligns to the right by default (browser bidi rendering with no explicit `text-align`).
- The parent footer column container is responsible for any column alignment (`items-start` vs `items-end`); `FooterLinks` does not assert that.
- Locale-prefixing logic for href (`/ar` prefix) is unchanged in the port — strings are EN/AR pre-translated by the caller; this component just renders whatever string it receives.
