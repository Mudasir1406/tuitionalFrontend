# Component — `FoundPage` (404 fallback)

Centered "Page Not Found" message with the brand logo on top and the global `<Footer />` at the bottom.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\found-page.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\found-page.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
<>
  Box
    Box padding="3vh 9vh"
      Image Logo
    Typography sx={fontSize 9vh, flex center, color #38B6FF, h 85vh, fontWeight 600}  "Page Not Found"
  Footer
</>
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| logo container | padding | 3vh 9vh (= py 3vh, px 9vh) |
| message | fontSize | 9vh |
| message | font-weight | 600 |
| message | color | `#38B6FF` |
| message | height | 85vh |
| message | display | flex justify-center items-center |

### Typography

- Font: League Spartan via `leagueSpartan.className`.
- Size: 9vh (responsive but viewport-pinned).
- Weight: 600.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 9 | `px-[9vh] py-[3vh]` ✓ | matches `padding: 3vh 9vh` | OK |
| B2 | 12 | `flex h-[85vh] items-center justify-center text-[9vh] font-semibold text-brand-500 font-heading` ✓ | matches MUI: h 85vh ✓, text-[9vh] ✓, font-semibold (=600) ✓, text-brand-500 (=#38B6FF) ✓, font-heading (=League Spartan) ✓ | OK |

## §3 Corrected Tailwind classNames

Port is correct. No changes needed.

```tsx
<>
  <div>
    <div className="px-[9vh] py-[3vh]">
      <Image src={Logo} alt="" />
    </div>
    <p className="flex h-[85vh] items-center justify-center font-heading text-[9vh] font-semibold text-brand-500">
      Page Not Found
    </p>
  </div>
  <Footer />
</>
```

## §4 Verification at 4 widths

- **375**: logo at top with px 9vh (≈60px on 667-tall viewport); message takes h-85vh with fontSize 9vh.
- **768**: same proportional sizing.
- **1280**: same.
- **1920**: same.

NOTE: `9vh` font-size at common desktop heights (900-1080) renders 81-97px text — intentionally massive.

## §5 RTL notes

- All content centered → direction-agnostic.
- Logo not directional.
- No `text-left/right` to flip.
