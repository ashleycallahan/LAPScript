# LAPScript

LAPScript is a Tampermonkey userscript that enhances the Level Access Platform manual evaluation experience by improving findings and screens tables, adding quick actions, and improving image handling.

## Script File

- `https://raw.githubusercontent.com/ashleycallahan/LAPScript/refs/heads/main/LAPScript.js`

## What It Adds

- Table enhancements for findings and screens views.
- Inline screenshot/attachment previews in report tables.
!["View description, URL, and screenshot on the screens tab"](lapscript-screens.png)
- Quick links for opening items in new tabs.
- Edit-in-dialog workflow for findings.
!["Edit findings without leaving the screen"](lapscript-edit.png)
- Lightbox viewer for finding images.
!["inline images with lightbox"](lapscript-lightbox.webp)
- Copy table content in rich HTML format for spreadsheet workflows.
- Extra controls such as Refresh, Copy Table, Highlight Rows, and Expand/Collapse Table.
!["Highlighting of rows"](lapscript-highlight-rows.png)
- Search manual evaluations by Finding or Task ID.
!["Search by Finding or Task ID"](lapscript-search.png)

## Requirements

- A userscript manager such as Tampermonkey.
- Access to a supported Level Access platform domain:
  - `*.essentia11y.com/*`
  - `*.levelaccess.io/*`
  - `*.essentialaccessibility.com/*`
- jQuery is loaded via the userscript `@require` directive.

## Installation

1. Open Tampermonkey and go to Dashboard.
!["Locate the tampermonkey icon in your bookmarks bar, then navigate down to Dashboard"](tamperMonkey-step1.png)
2. Open the Utilities tab.
3. Locate "Import from URL"
!["Navigate to Import from URL"](tampermonkey-step2.png)
4. Paste in `https://raw.githubusercontent.com/ashleycallahan/LAPScript/refs/heads/main/LAPScript.js`.
5. Save and enable the script.
6. Open a supported Level Access platform page.

## Versioning

- Current script header version: `1.1.7`

## Authors

- Original author: Ashley Callahan
