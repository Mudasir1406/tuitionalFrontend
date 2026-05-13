# Component — `SectionsBoxV2`

Identical to `SectionsBox` but uses `PopUpButtonV2` (newer dialog). Styles are 100% the same.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\sectionsboxV2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\sectionsboxV2.tsx` |

## §1 MUI source

Identical to `sectionsbox.tsx` — see [sectionsbox.md](./sectionsbox.md) §1.

Only differences:
- Imports `PopUpButtonV2` instead of `PopUpButton`.
- Button hover scale matches (1.05, 0.5s ease-in-out).

## §2 Tailwind port — bug list

Tailwind port at v2 **already includes** the hover scale animation (`hover:scale-[1.03] hover:shadow-[1px_8px_32px_0px_#38B6FFD9]` on line 12) — this is **better than v1's port** which omits hover.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 6 | `text-h6 font-bold` for inner text | MUI is `subtitle2` → `text-stat-label uppercase` 14px | Med — same bug as v1 |
| B2 | 6 | `lg:text-[3vh]` | MUI uses 14px at all breakpoints | Med |
| B3 | 12 | `hover:scale-[1.03]` | MUI: `transform: scale(1.05)` | Low — 1.03 vs 1.05 minor |
| B4 | 12 | `hover:shadow-[1px_8px_32px_0px_#38B6FFD9]` | MUI keeps `1px 4px 24px 0px #38B6FFB2` (same as base) | Low — port adds a larger hover shadow not in MUI |
| B5 | 12 | rest of button dims | matches | OK |

## §3 Corrected Tailwind classNames

Same fix as `sectionsbox.md`:

```tsx
<span className="text-start font-heading text-stat-label uppercase text-ink-900">
  Join Live Interactive Online Classes with Our Certified Tutors!
</span>
<PopUpButtonV2
  text="Book a Demo"
  href="popup"
  className="w-1/2 rounded-[10px] bg-brand-500 py-[1vh] text-white shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-brand-500 sm:w-1/5 lg:py-[10px]"
/>
```

## §4 Verification & §5 RTL notes

Same as `sectionsbox.md`.
