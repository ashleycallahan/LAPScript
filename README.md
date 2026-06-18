# LAPScript

LAPScript is a Tampermonkey userscript that enhances the Level Access Platform manual evaluation experience by improving findings and screens tables, adding quick actions, and improving image handling.

## Script File

- `https://raw.githubusercontent.com/ashleycallahan/LAPScript/refs/heads/main/LAPScript.js`

## What It Adds

- Screenshots, descriptions, and clickable URLs in report tables.
!["View description, URL, and screenshot in the report tables"](lapscript-screens.png)
- Quick links for opening findings and screens in new tabs.
!["Open internal links in new tabs"](lapscript-newtab.png)
- Edit-in-dialog workflow for findings.
!["Edit findings without leaving the screen"](lapscript-edit.png)
- Lightbox viewer for finding images.
!["inline images with lightbox"](lapscript-lightbox.webp)
- Expand the findings table full-screen.
!["Expand the findings table"](lapscript-expand.png)
- Copy customized table content in rich HTML format for spreadsheet workflows.
!["Copy and paste table content into Excel"](lapscript-copy.png)
- Quick-access Refresh button to update table data without a full page refresh.
!["Refresh the table data"](lapscript-refresh.png)
- Highlight the table rows for better visibility.
!["Highlighting of rows"](lapscript-highlight-rows.png)
- View more than 6 columns of data for findings.
!["Choose as many columns as you like"](lapscript-columns.png)
- Switch between screens from within the findings screen.
!["Select screen"](lapscript-screen-switcher.png)
- Search manual evaluations by Issue or Task ID.
!["Search by Issue or Task ID"](lapscript-search.png)

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

- Current script header version: `1.1.8`

## Authors

- Original author: Ashley Callahan
