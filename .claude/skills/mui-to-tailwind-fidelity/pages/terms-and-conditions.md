# Page — `/terms-and-conditions`

Static legal page. Identical structure to `/privacy-policy` — single-file `"use client"` component wrapping `<HtmlWrapper>` with the same inline `<style>` block and `.container` (max-w-800px, Arial, white card).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\terms-and-conditions\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\terms-and-conditions\page.tsx` |
| Arabic variant | `/ar/terms-and-conditions` — same component, different translations. |

## §1 Structure

Same inline stylesheet as `/privacy-policy`:

```css
body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
.container { max-width: 800px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
h1, h2 { color: #2c3e50; }
a { color: #3498db; text-decoration: none; }
a:hover { text-decoration: underline; }
```

Sections rendered: heading + intro, use of services, account responsibilities, prohibited activities, intellectual property, modifications, liability, termination, governing law, changes to terms, contact (email + phone). All via `t("terms.*")` keys.

## §2 Tailwind port note

Same as `/privacy-policy` — preserve inline CSS verbatim. Do NOT translate to Tailwind utilities. The whole point of this page is a self-contained, embeddable legal document.

## §3 Components used

- `<HtmlWrapper>` — `tuitionalFrontend-mui-baseline\src\components\html-wrapper.tsx`
- `useI18n` — `tuitionalFrontend-mui-baseline\src\context\language-context.tsx`

## §4 SEO / metadata

Inline `<head>`: `<title>{t("terms.title")}</title>` + matching meta description (key duplicates the title in MUI source — line 14: `content={t('terms.title')}` — could be a content bug but preserve verbatim). RTL via `<body style={{ direction: isRTL ? "rtl" : "ltr" }}>`. No JSON-LD.
