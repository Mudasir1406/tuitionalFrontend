# Component — `<LeftSection>`

Sidebar of the blog detail page (`/blog/[slug]`). MUI renders a search input + "Search" button + two `<Accordion>` widgets (Category, Tag). The Tailwind port has **diverged structurally** — it renders a `<BlogSidebarForm>` (full lead-capture form) instead of the accordions.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\left-section\left-section.tsx` + `style.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\left-section\left-section.tsx` (+ sibling `BlogSidebarForm.tsx`) |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-left-section\ar-left-section.tsx` (RTL — no layout diff) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<div>
├── <div> (search row)
│   ├── <Input className=styles.input> placeholder "Search Our Blog"
│   └── <Button .containedButton> "Search" — full-width, my-20, mx-auto
└── <div> (accordion list)
    └── Accordion × 2 — { title: "Category", items } and { title: "Tag", items }
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| `.input` | font-size | `2.3vh` | `2.3vh` | `2.3vh` |
| `.input` | border-radius | `3px` | `3px` | `3px` |
| `.input` | shadow | `0px 1px 4px 0px rgba(0,0,0,0.08)` | same | same |
| `.input` | border | `1px solid transparent` (focus transition) | same | same |
| `.containedButton` | width | `100%` | `100%` | `100%` |
| `.containedButton` | padding | `14px` | `14px` | `14px` |
| `.containedButton` | margin | `20px auto` | same | same |
| `.containedButton` | radius | `10px` | `10px` | `10px` |
| `.containedButton` | line-height | `18.4px` | same | same |
| `.containedButton` | bg | `#38b6ff` | same | same |
| `.containedButton` | shadow | `6px 6px 6px 0px rgba(56,182,255,0.1)` | same | same |

### Typography

| Element | Variant | Size | Color | Font |
|---|---|---|---|---|
| Input | (Input) | `2.3vh` | inherits | League Spartan |
| Button "Search" | Button default | 15px / 16px | white | League Spartan |
| Accordion (see [accordion.md](./accordion.md)) | — | — | — | — |

### Colors / shadows / radius

| Hex / Box-shadow | Token |
|---|---|
| `#38b6ff` | `bg-brand-500` |
| `rgba(56,182,255,0.1)` shadow | arbitrary `shadow-[6px_6px_6px_0px_rgba(56,182,255,0.1)]` |
| `0px 1px 4px 0px rgba(0,0,0,0.08)` (input shadow) | `shadow-card` |
| `10px` radius (button) | `rounded-md` |
| `3px` radius (input) | `rounded-[3px]` |

### Animations / interactions

- Button `transition: all 0.5s ease-in-out`, hover `scale(1.02)` + softer brand-glow shadow

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| LS1 | 30-41 | `<div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-card">` with Input + small Button inside | MUI structures search as a separate **stacked** column: input on top (full-width), button below (full-width, `my-20`). NOT side-by-side. | high |
| LS2 | 30 | side-by-side flex with `size="sm"` button | Replace with: stacked Input + full-width primary Button with `rounded-[10px] my-5 py-[14px] w-full` | high |
| LS3 | 42-44 | `<BlogSidebarForm />` instead of two `<Accordion>` widgets | **Structural divergence**. The MUI baseline shows **Category + Tag accordions** in the sidebar; the Tailwind port renders a lead form. Either: (a) restore accordions to match MUI baseline, or (b) document this as intentional product decision (sidebar form is more conversion-oriented). Pending product call — flag for owner approval. | flag |
| LS4 | 36 | `flex-1 border-0 bg-transparent` Input | MUI `.input { font-size: 2.3vh; border-radius: 3px; box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.08); padding: auto 0 }` — full styling with shadow not present in port | high |
| LS5 | 38 | `<Button variant="primary" size="sm">` | MUI `.containedButton` is `width: 100%; padding: 14px; border-radius: 10px; line-height: 18.4px`. Drop `size="sm"`, add `w-full py-[14px] rounded-[10px] my-5 leading-[18.4px]` | med |

---

## §3 Corrected Tailwind classNames (matching MUI baseline)

```tsx
<div>
  <div>
    <Input
      name="search"
      value={search}
      onChange={(_, value) => setSearch(value as string)}
      placeholder="Search Our Blog"
      className="w-full rounded-[3px] border border-transparent px-3 py-2 font-heading text-[2.3vh] shadow-card outline-none transition-colors duration-300 focus:border-brand-500"
    />
    <Button
      onClick={handleSearch}
      variant="primary"
      className="mx-auto my-5 flex w-full items-center justify-center rounded-[10px] bg-brand-500 px-0 py-[14px] font-heading text-button-mobile leading-[18.4px] shadow-[6px_6px_6px_0px_rgba(56,182,255,0.1)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[6px_6px_6px_0px_rgba(56,182,255,0.46)] sm:text-button"
    >
      Search
    </Button>
  </div>
  <div>
    {accordionData.map((d, i) => (
      <Accordion key={i} title={d.title} items={d.items} />
    ))}
  </div>
</div>
```

### If keeping the BlogSidebarForm divergence

Document on the page-level (blog-detail.md) that the sidebar is now a lead form, not category accordions. Search must still appear above it.

---

## §4 Verification at 4 widths

- **375**: sidebar collapses below article (via `BlogSequences` `flex-col-reverse`). Full-width search input + full-width Search button. Accordions stacked.
- **768**: same as 375 (Tailwind `md=900` threshold).
- **1280**: sidebar = `20%` column. Input and button each `100%` of column width.
- **1920**: same.

## §5 RTL notes

`ar-left-section/ar-left-section.module.css` is identical apart from `direction: rtl` on the search row. Input placeholder + button label translate via `useI18n()` — handle via `t.searchOurBlog` / `t.search` keys.
