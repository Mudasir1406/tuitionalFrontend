# Component Audit Files

One file per UI component fixed during the post-MUI Tailwind regression-fix campaign. Each file is the persistent record for that component: audit findings, defect list, before/after notes, QA results, approval signature.

## How to use

1. Pick the next component from [tasks.md](../../../../tasks.md).
2. Copy [../component-checklist.template.md](../component-checklist.template.md) to `<component-name>.md` in this folder.
3. Fill in metadata (file path, AR twin, priority, live MUI ref URL).
4. Work the checklist top-to-bottom (sections A → I).
5. Save the completed file when the user approves.
6. Update the matching line in [tasks.md](../../../../tasks.md) to ✓.

## Naming

Use kebab-case matching the component file basename without extension:
- `src/components/ui/button.tsx` → `button.md`
- `src/components/home/our-client.tsx` → `our-client.md`
- `src/components/grade-subject-level/hero.tsx` → `gsl-hero.md` (prefix when basename collides)

## Index

<!-- Append one line per completed component as: -->
<!-- - [<name>](<name>.md) — <one-line summary> — approved <YYYY-MM-DD> -->
