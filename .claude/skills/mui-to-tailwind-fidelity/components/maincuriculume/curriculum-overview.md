# Component — `CurriculumOverview` (maincuriculume)

3-card grid showing British / American / Australian curriculum overviews, each with a toggle list of exam boards (CIE, Pearson Edexcel, AP, GED, IB, etc.). **Not ported** in Tailwind.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\curriculum-overview.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box
└── Typography.overview  ("Curriculum Overview")

Box  (margin "0 6vh 12vh 6vh")
└── Grid container spacing={2}        (16px gap both axes)
    └── Grid item xs=12 sm=4 md=4 lg=4    × 3
        └── Box.card  (color bg, p 16px, radius 2vh, h 40vh, shadow)
            ├── Box
            │   ├── Typography.title  (curriculum name)
            │   └── Typography.desc   (lorem ipsum)
            └── Grid container spacing={1}    (8px gap)
                └── Grid item xs=6   × N (boards)
                    └── Box.boardChip  (click → toggle)
                        ├── CircleIcon
                        └── Typography.boardTitle
```

### Dimensions & spacing

| Element | Property | xs | sm/md/lg |
|---|---|---|---|
| outer wrapper | margin | — | `0 6vh 12vh 6vh` |
| Grid container | spacing | 16px | 16px |
| Grid item (card) | columns | 12/12 (1 col) | 4/12 (3 cols) at **sm+** |
| card | padding | 16px | 16px |
| card | borderRadius | 2vh | 2vh |
| card | height | 40vh | 40vh |
| Grid (boards) | spacing | 8px | 8px |
| Grid item (board) | columns | 6/12 (2 cols) | 6/12 (2 cols) |
| board chip | padding | 2vh | 2vh |
| board chip | borderRadius | 6vh | 6vh |
| board chip | margin | `3vh 0 0 0` | `3vh 0 0 0` |
| board chip | border | `1px solid #CDCDCD` | same |

### Typography

| Element | lg fontSize | lineHeight | weight | color |
|---|---|---|---|---|
| overview | 6vh | 6vh | 600 | inherit |
| title (card) | 4vh | — | 600 | `#2D2D2D` |
| desc (card) | 2vh | — | 400 | `#2D2D2D` |
| boardTitle | 2vh | — | 500 | inherit |
| CircleIcon | 1rem | — | — | white when selected, `#38B6FF` otherwise |

Note: only `lg` font-size is set in `sx` — no xs/sm/md fallback in source. Browser inherits MUI defaults below lg.

### Colors

| Curriculum | bg color |
|---|---|
| British | `#F1FAFF` |
| American | `#DBF2FF` |
| Australian | `#ADE2FF` |

Board chip:
- Unselected: bg `transparent`, color `#2D2D2D`, border `1px solid #CDCDCD`
- Selected: bg `#38B6FF`, color `#FFF`, border same
- Card shadow: `0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px - 3px 8px 0px rgba(56, 182, 255, 0.20)` (typo with space — preserve as `0px -3px 8px ...`)

### Animations / interactions

- `cursor: pointer` on board chips.
- `onClick` toggles `isSelected` (multi-select per curriculum).

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div>
  <p className="text-center font-semibold lg:text-[6vh] lg:leading-[6vh] mb-8">
    Curriculum Overview
  </p>
</div>

<div className="mx-[6vh] mb-[12vh]">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {curriculums.map((curriculum, ci) => (
      <div
        key={ci}
        className="h-[40vh] rounded-[2vh] p-4
                   shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)]"
        style={{ backgroundColor: curriculum.color }}
      >
        <div>
          <p className="font-semibold text-ink-900 mb-[1vh] lg:text-[4vh]">{curriculum.title}</p>
          <p className="font-normal text-ink-900 lg:text-[2vh]">{curriculum.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {curriculum.boards.map((board, bi) => (
            <button
              key={bi}
              type="button"
              onClick={() => toggleBoardSelection(ci, bi)}
              className={`mt-[3vh] flex items-center rounded-[6vh] border border-[#CDCDCD]
                          p-[2vh] text-center
                          ${board.isSelected ? "bg-brand-500 text-white" : "bg-transparent text-ink-900"}`}
            >
              <CircleIcon className={`text-base me-2 ${board.isSelected ? "text-white" : "text-brand-500"}`} />
              <span className="font-medium lg:text-[2vh]">{board.title}</span>
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
```

Note: MUI source used `sm={4}` so the 3-col split kicks in **at sm (600px)**. Use `sm:grid-cols-3` (NOT `lg:grid-cols-3`).

## §4 Verification at 4 widths
- 375: 1 col stack of cards, 40vh each, boards in 2-col grid inside.
- 768: 3 cols at sm+ — cards become narrow (≈ 240px each). Verify `40vh` height doesn't overflow content.
- 1280: 3 cols comfortable.
- 1920: 3 cols, generous side margins (6vh ≈ 64px each).

## §5 RTL notes
- `margin: "0 6vh 12vh 6vh"` symmetric horizontally — safe.
- Board chip layout `flex items-center` + `CircleIcon marginRight: "8px"` → use logical `me-2` so AR flips icon to right.
- "Curriculum Overview" + curriculum titles likely need AR translations when porting; currently English-only.
