# Page — `/privacy-policy`

Static legal page. Single-file client component (`"use client"`) that injects its own inline `<style>` block and renders an Arial-fonted, white-card, max-w-800px text body. Translation keys come from `useI18n()`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\privacy-policy\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\privacy-policy\page.tsx` |
| Arabic variant | `/ar/privacy-policy` — same component, different translations. |

## §1 Structure

The page does NOT use the global Header/Footer. It uses `<HtmlWrapper className={leagueSpartan.variable}>` (custom html/body wrapper for embedded layouts), sets `direction: rtl` for AR via inline style on `<body>`, and injects this inline stylesheet:

```css
body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
.container { max-width: 800px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
h1, h2 { color: #2c3e50; }
a { color: #3498db; text-decoration: none; }
a:hover { text-decoration: underline; }
```

Then renders the policy body as plain HTML using `<h1> / <h2> / <h3> / <p> / <ul> / <li>` with `t("privacy.*")` translation keys.

## §2 Page-level layout rhythm

Layout is governed entirely by the inline stylesheet:
- `.container`: `max-width: 800px; margin: 20px auto; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)`.
- `<body>`: `font-family: Arial, sans-serif` (overrides League Spartan despite the className) and `#f4f4f4` page background.

## §3 Tailwind port note

This page intentionally uses **inline CSS rather than Tailwind utilities** — it's meant to be embedded standalone (e.g. as a privacy iframe target). Do NOT rewrite it to Tailwind classes; preserve the inline `<style dangerouslySetInnerHTML>` block verbatim in the port. The `HtmlWrapper` + `useI18n` + `leagueSpartan.variable` imports must be present.

## §4 Components used

- `<HtmlWrapper>` — `tuitionalFrontend-mui-baseline\src\components\html-wrapper.tsx`
- `useI18n` — `tuitionalFrontend-mui-baseline\src\context\language-context.tsx`

## §5 SEO / metadata

Title and meta description are set inline via `<head><title>{t("privacy.title")}</title><meta name="description" content={t("privacy.description")} /></head>` — not via Next.js `metadata` export (because it's a `"use client"` component). RTL toggle via `<body style={{ direction: isRTL ? "rtl" : "ltr" }}>`. No JSON-LD.
