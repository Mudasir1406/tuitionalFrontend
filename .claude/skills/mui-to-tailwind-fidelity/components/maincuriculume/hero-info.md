# Component — `HeroInfo` (maincuriculume)

Empty placeholder Box that reserves vertical space below the hero on the standalone `/maincuriculume` curriculum page. Renders nothing inside — likely meant for a hero illustration that was never added. **Not ported** in Tailwind.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\hero-info.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box.container  (width 100%, position: relative, height + marginTop responsive)
```

### Dimensions & spacing

| Property | xs | sm | md | lg |
|---|---|---|---|---|
| width | 100% | 100% | 100% | 100% |
| height | 30vh | 30vh | 60vh | 80vh |
| marginTop | 2.5vh | 0vh | 1.5vh | 1vh |
| position | relative | relative | relative | relative |

### Typography

None — empty container.

### Colors

None.

### Animations / interactions

None.

## §2 Tailwind port — bug list

No Tailwind port exists. Note: a similarly-named `grade-subject-level/hero-info.tsx` exists in both repos, but it is a different component (renders an `<Image>` for the per-page hero illustration with very similar dimensions). Do not conflate.

## §3 Corrected Tailwind classNames

```tsx
<div className="relative w-full mt-[2.5vh] h-[30vh]
                 sm:mt-0       sm:h-[30vh]
                 md:mt-[1.5vh] md:h-[60vh]
                 lg:mt-[1vh]   lg:h-[80vh]" />
```

## §4 Verification at 4 widths
- 375: 30vh tall, mt 2.5vh, empty.
- 768: 30vh tall, mt 0.
- 1280: 60vh tall, mt 1.5vh.
- 1920: 80vh tall, mt 1vh.

## §5 RTL notes
None — empty container, no directional properties.
