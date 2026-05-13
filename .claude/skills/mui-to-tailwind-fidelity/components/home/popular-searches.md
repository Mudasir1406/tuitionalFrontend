# Component — `<PopularSearches>`

A "Popular Searches" widget showing a heading + a horizontal row of pill-shaped search tags. Each tag has two halves: a left half showing either "Premium" + diamond icon (for premium) or the keyword (for normal), and a right half showing the type label. Premium tags get a green `#51B893` bg; normal tags get a light green `#ECF9F3` bg.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\popular-searches.tsx` |
| Tailwind port | **NOT PORTED** — there is no `popular-searches.tsx` in the Tailwind project. |
| Arabic variant | (no `ar-popular-searches.tsx` in either repo) |

> ⚠️ The Tailwind port does not yet include this component. If it needs to be added later, follow the spec below — it is unused in the current Tailwind home page.

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box>
├── <Typography sx={styles.heading}>"Popular Searches"
└── <Box sx={styles.tabsContanier}>            flex row, wrap, gap 10px, padding 5px
    └── searches.map → <Tabs isPremium type keyword />

<Tabs>:
<Box sx={{ display: flex, flexDirection: row, bg: isPremium ? "#51B893" : "#ECF9F3", padding: 5px, borderRadius: 5px, alignItems: center, marginRight: 15px }}>
├── {isPremium && <Image src={diamond} w/h auto />}
├── {isPremium 
│     ? <Typography sx={[styles.premium, { color: "white" }]}>Premium
│     : <Typography sx={styles.search}>{keyword}}
└── <Box sx={{ bg: isPremium ? "#ECF9F3" : "white", borderRadius: 5px, paddingX: 26px, paddingY: 6px }}>
    └── <Typography sx={styles.type}>{type}
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.heading` | `fontSize` | 20px | 20px | 18px (lg) |
| `.heading` | `fontWeight` / `lineHeight` | 700 / 34px | same | same |
| `.heading` | `marginTop` | 5vh | 5vh | 5vh |
| `.heading` | `marginBottom` | 10px | 10px (sm) / 0 (md) | 0 |
| `.heading` | `marginRight` | 10px | 10px (sm) / 0 (md) | 0 |
| `.heading` | `color` | `#000000` | same | same |
| `.tabsContanier` | `display` / `flexDirection` | flex / row | same | same |
| `.tabsContanier` | `padding` / `flexWrap` / `gap` | 5px / wrap / 10px | same | same |
| `<Tabs>` outer Box | `padding` / `borderRadius` | 5px / 5px | same | same |
| `<Tabs>` outer Box | `marginRight` | 15px | 15px | 15px |
| `<Tabs>` inner Box (type) | `paddingX` / `paddingY` | 26px / 6px | same | same |
| `<Tabs>` inner Box | `borderRadius` | 5px | 5px | 5px |
| `.search` (keyword text) | `marginRight` / `marginLeft` | 20px / 7px | same | same |
| `.premium` (premium label) | `marginRight` / `marginLeft` | 20px / 7px | same | same |

### Typography

| Element | Source | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading "Popular Searches" | inline | 20px | 20px | 18px | 700 | `#000000` | League Spartan |
| Keyword text (`.search`) | inline | 14px | 14px | 14px | 400 | (inherit black) | League Spartan |
| Premium label (`.premium`) | inline | 16px | 16px | 16px | 600 | white | League Spartan |
| Type label (`.type`) | inline | 14px | 14px | 14px | 400 | (inherit black) | League Spartan |

### Colors

- `#000000` → `text-black`
- `#51B893` (premium bg) → `bg-success` (token from skill 01 §5)
- `#ECF9F3` (light-green bg) → arbitrary `bg-[#ECF9F3]` (no token)
- `white` → `bg-white`

### Animations / interactions

- None.

---

## §2 Tailwind port — bug list

**Not applicable** — no file exists. If/when ported, use the suggested implementation in §3.

---

## §3 Corrected Tailwind classNames (suggested port)

```tsx
import Image from "next/image";
import diamond from "../../../public/assets/images/static/diamond 1.png";
import {
  Searches_Type,
  getSearches,
} from "../../services/faqs/searches/searches";

const PopularSearches: React.FC = async () => {
  const searches: Searches_Type[] = await getSearches();
  return (
    <div>
      <h3 className="mt-[5vh] mb-[10px] me-[10px] font-heading text-[20px] font-bold leading-[34px] text-black md:mb-0 md:me-0 lg:text-[18px]">
        Popular Searches
      </h3>
      <div className="flex flex-row flex-wrap gap-[10px] p-[5px]">
        {searches?.map((item, index) => (
          <Tabs {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

interface TabsProps {
  isPremium: boolean;
  type: string;
  keyword: string;
}

const Tabs: React.FC<TabsProps> = ({ isPremium, type, keyword }) => (
  <div
    className={cn(
      "me-[15px] flex flex-row items-center rounded-[5px] p-[5px]",
      isPremium ? "bg-success" : "bg-[#ECF9F3]",
    )}
  >
    {isPremium && (
      <Image
        src={diamond.src}
        width={diamond.width}
        height={diamond.height}
        alt=""
      />
    )}
    {isPremium ? (
      <span className="ms-[7px] me-[20px] font-heading text-[16px] font-semibold leading-[14px] text-white">
        Premium
      </span>
    ) : (
      <span className="ms-[7px] me-[20px] font-heading text-[14px] font-normal leading-[14px]">
        {keyword}
      </span>
    )}
    <div
      className={cn(
        "rounded-[5px] px-[26px] py-[6px]",
        isPremium ? "bg-[#ECF9F3]" : "bg-white",
      )}
    >
      <span className="font-heading text-[14px] font-normal leading-[13px]">
        {type}
      </span>
    </div>
  </div>
);
```

## §4 Verification at 4 widths

- **375**: heading 20px black at top, me-10px, mb-10px. Below: flex-wrap row of pills, each pill: p-5px, rounded-5px, me-15px. Premium pill (green bg) has diamond icon + "Premium" white text + inner light-green box with type. Normal pill (light-green bg) has keyword + inner white box with type.
- **768**: heading 20px, mb-0 / me-0 from md. Same pill layout.
- **1280**: heading **18px** (lg shrinks the heading per MUI). Pills unchanged.
- **1920**: same as 1280.

## §5 RTL notes

- MUI uses physical `marginRight: 15px` on each tab and `marginRight: 20px` + `marginLeft: 7px` on the inner text. Under `dir="rtl"`, these should mirror — replace with logical `me-[15px]` / `me-[20px] ms-[7px]` (already done in the suggested port).
- No directional decorations.
- AR variant: not provided in the MUI baseline; if needed, use the EN port with translated `heading`, `type`, and `keyword` strings.
