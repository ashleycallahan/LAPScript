# LAPScript

LAPScript is a Tampermonkey userscript that enhances the Level Access Platform manual evaluation experience by improving findings and screens tables, adding quick actions, and improving image handling.

## Script File

- `https://raw.githubusercontent.com/ashleycallahan/LAPScript/refs/heads/main/LAPScript.js`

## Versioning

- Current script header version: `1.1.14`

If you are not seeing any of the features listed below, it is recommended that you [update](#installation).

## WARNING!

LAPScript is a custom JavaScript file that is intended to improve and enhance the delivered Level Access Platform UI. This script is NOT supported by IT or Product. By installing it you acknowledge that unintended interactions may occur between the script and Platform and that you will [turn this script off](#disabling-the-script) before reporting any issues to IT or Product. Bugs or feature requests that are related to the script can be logged at this GitHub location.

## What It Adds

- Screenshots, descriptions, and clickable URLs in report tables.
!["View description, URL, and screenshot in the report tables"](docs/images/lapscript-screens.png)
- Quick links for opening findings and screens in new tabs.
!["Open internal links in new tabs"](docs/images/lapscript-newtab.png)
- Edit-in-dialog workflow for findings.
!["Edit findings without leaving the screen"](docs/images/lapscript-edit.png)
- Lightbox viewer for finding images.
!["inline images with lightbox"](docs/images/lapscript-lightbox.webp)
- Expand the findings table full-screen.
!["Expand the findings table"](docs/images/lapscript-expand.png)
- Copy customized table content in rich HTML format for spreadsheet workflows.
!["Copy and paste table content into Excel"](docs/images/lapscript-copy.png)
- Quick-access Refresh button to update table data without a full page refresh.
!["Refresh the table data"](docs/images/lapscript-refresh.png)
- Highlight the table rows for better visibility.
!["Highlighting of rows"](docs/images/lapscript-highlight-rows.png)
- View more than 6 columns of data for findings.
!["Choose as many columns as you like"](docs/images/lapscript-columns.png)
- Switch between screens from within the findings screen.
!["Select screen"](docs/images/lapscript-screen-switcher.png)
- Quick-access View Scope link to see all pages in an evaluation.
!["Easily view the evaluation scope"](docs/images/lapscript-scope.png)
- Search manual evaluations by Issue or Task ID.
!["Search by Issue or Task ID"](docs/images/lapscript-search.png)

## Requirements

- A userscript manager such as Tampermonkey.
- Access to a supported Level Access platform domain:
  - `*.essentia11y.com/*`
  - `*.levelaccess.io/*`
  - `*.essentialaccessibility.com/*`
- jQuery is loaded via the userscript `@require` directive.

## Installation

1. Open Tampermonkey and go to Dashboard.
!["Locate the Tampermonkey icon in your bookmarks bar, then navigate down to Dashboard"](docs/images/tamperMonkey-step1.png)
2. Open the Utilities tab.
3. Locate "Import from URL"
!["Navigate to Import from URL"](docs/images/tampermonkey-step2.png)
4. Paste in `https://raw.githubusercontent.com/ashleycallahan/LAPScript/refs/heads/main/LAPScript.js`.
5. Save and enable the script.
6. Open a supported Level Access Platform page.

## Disabling The Script
1. Open a supported Level Access Platform page.
2. Open Tampermonkey from your list of active extensions.
3. Toggle the active script ("Level Access Platform Script") to off.
!["How to toggle LAPScript off"](docs/images/tamperMonkey-off.png)

## Authors

- Original author: Ashley Callahan
