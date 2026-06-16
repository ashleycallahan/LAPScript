// ==UserScript==
// @name         Level Access Platform Script
// @namespace    http://tampermonkey.net/
// @version      1.1.7
// @description  Level Access Platform Script
// @author       Ashley Callahan
// @match        *.essentia11y.com/*
// @match        *.levelaccess.io/*
// @match        *.essentialaccessibility.com/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-4.0.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
.review-mode-findings-expanded app-issues {
    background: #fff;
    height: 100%;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}
.review-mode-findings-expanded app-manual-eval-findings-table .table-responsive {
    overflow: visible;
}
.review-mode-findings-expanded app-manual-eval-findings-table thead {
    position: sticky;
    top: 0;
    z-index: 1;
}
.review-mode-table-enhanced app-manual-eval-findings-table table tbody > tr:nth-child(even) {
    background: #f7f7fb;
}
app-manual-eval-findings-table th,
app-manual-eval-findings-table th button {
    font-size: 14px !important;
}
app-manual-eval-findings-table th {
    max-width: none !important;
    min-width: 150px;
    white-space: nowrap;
    width: auto !important;
}
th.review-mode-th-added {
    text-align: left;
    vertical-align: bottom !important;
}
app-manual-eval-findings-table th button {
    user-select: text !important;
}
app-manual-eval-findings-table th:first-child {
    min-width: auto;
}
app-manual-eval-findings-table th button[aria-label*="Actual Result"],
app-manual-eval-findings-table th button[aria-label*="Recommendation"],
app-manual-eval-findings-table th button[aria-label*="Steps to reproduce"] {
    width: 250px;
}
app-manual-eval-findings-table table td {
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    max-width: none !important;
    overflow: visible !important;
    text-overflow: initial !important;
    white-space: normal !important;
    width: auto !important;
}
.review-mode-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 15px 15px;
}
.review-mode-btn[aria-pressed="true"] {
    background: #e5e6f0 !important;
    border-color: #000 !important;
}
.review-mode-btn svg {
    height: 16px;
    margin-top: -3px;
    width: 16px;
}
.review-mode-added-image a {
    border: 2px solid;
    display: inline-block;
    position: relative;
}
.review-mode-added-description,
.review-mode-added-url {
    color: #000;
    width: 250px;
}
.review-mode-replaced {
    border: 2px solid;
    display: inline-block;
    position: relative;
}
.review-mode-added-image img,
.review-mode-replaced img {
    max-height: 200px;
    object-fit: contain;
    width: 200px;
}
.review-mode-added-image svg,
.review-mode-replaced svg {
    background: currentColor;
    border-radius: 5px;
    bottom: 5px;
    fill: #ffffff;
    height: 28px;
    padding: 5px;
    position: absolute;
    right: 5px;
    width: 28px;
}
app-admin-manual-audits table table-cell-text > span,
app-manual-evaluation-screens-evaluated table table-cell-link > div,
app-manual-eval-findings-table table table-cell-link > div {
    display: flex;
}
app-manual-eval-findings-table table a[routerlink] {
    white-space: nowrap;
}
app-manual-eval-findings-table table a[routerlink] svg {
    display: none;
}
.review-mode-link-added {
    margin: 0 0 0 5px;
}
.review-mode-link-lightbox svg,
.review-mode-link-added svg {
    height: 18px;
    margin-top: -3px;
    width: 18px;
}
.review-mode-link-lightbox {
    display: block;
    margin-top: 5px;
}
.review-mode-link-lightbox svg {
    margin-right: 5px;
}
app-issue-table-column-selector .my-auto {
    display: none;
}
.review-mode-findings-excel app-manual-eval-findings-table caption,
.review-mode-findings-excel app-manual-eval-findings-table th svg,
.review-mode-findings-excel app-manual-eval-findings-table a[routerlink] svg,
.review-mode-findings-excel app-manual-eval-findings-table th:first-child,
.review-mode-findings-excel app-manual-eval-findings-table td:first-child,
.review-mode-findings-excel app-manual-eval-findings-table .review-mode-link-added {
    display: none;
}
.review-mode-findings-excel app-manual-eval-findings-table thead,
.review-mode-findings-excel app-manual-eval-findings-table tbody,
.review-mode-findings-excel app-manual-eval-findings-table tr,
.review-mode-findings-excel app-manual-eval-findings-table th,
.review-mode-findings-excel app-manual-eval-findings-table td,
.review-mode-findings-excel app-manual-eval-findings-table button {
    background: none !important;
    border: none !important;
}
select.review-mode-screen-select {
    display: block;
    height: auto;
    padding: .5rem .75rem;
    width: 100%;
}
dialog.review-mode-lightbox,
dialog.review-mode-dialog {
    border: 4px solid #d8d9e7;
    height: 80%;
    left: 0;
    overflow: visible;
    padding: 0;
    position: fixed;
    top: 0;
    width: 80%;
    z-index: 999;
}
dialog.review-mode-dialog h1 {
    background: #e5e6f0;
    font-size: 18px;
    margin: 0;
    padding: 8px 15px;
}
dialog.review-mode-dialog h1 svg {
    height: 18px;
    margin: -3px 5px 0 0;
    width: 18px;
}
.review-mode-lightbox-close,
.review-mode-dialog-close {
    background: #d8d9e7;
    border: none;
    border-radius: 100%;
    color: #fff;
    height: 32px;
    padding: 0;
    position: absolute;
    right: -16px;
    top: -16px;
    width: 32px;
    z-index: 9999;
}
.review-mode-lightbox-close svg,
.review-mode-dialog-close svg {
    height: 32px;
    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    width: 32px;
}
dialog.review-mode-dialog iframe {
    border: none;
    height: calc(100% - 52px);
    width: 100%;
}
dialog.review-mode-lightbox a {
    border: 2px solid;
    display: inline-block;
}
dialog.review-mode-lightbox a[aria-current="true"] {
    border-color: #000;
}
dialog.review-mode-lightbox .full {
    height: 100%;
    text-align: center;
}
dialog.review-mode-lightbox .full.reduce-height {
    height: 85%;
    margin: 15px 15px 0 15px;
}
dialog.review-mode-lightbox .full a {
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
}
dialog.review-mode-lightbox .full img {
    height: 100%;
    object-fit: contain;
    width: 100%;
}
dialog.review-mode-lightbox .full svg {
    background: currentColor;
    border-radius: 5px;
    bottom: 10px;
    fill: #ffffff;
    height: 30px;
    padding: 5px;
    position: absolute;
    right: 10px;
    width: 30px;
}
dialog.review-mode-lightbox .thumbnails {
    display: flex;
    gap: 15px 15px;
    list-style: none;
    margin: 15px 15px 0 15px;
    padding: 0;
}
dialog.review-mode-lightbox .thumbnails img {
    height: 50px;
    width: 50px;
}
.review-mode-search.ds-search-widget {
    max-height: 300px;
    margin: 15px 0 -15px 0;
    overflow-y: auto;
}
app-manual-evaluation > .row,
app-manual-evaluation > .card > .card-header,
app-manual-evaluation > .card > .card-body {
    margin-top: 0 !important;
    padding-top: 0 !important;
}
app-manual-evaluation .evaluation-metadata {
    width: auto !important;
}
    `);
})();
(function() {
    'use strict';
    const $ = window.jQuery;

    let count = 0;
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function(event) {
            watchPage();
            const contentType = this.getResponseHeader('Content-Type');
            const url = event.target.responseURL;
            let jsonResponse;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                jsonResponse = JSON.parse(this.responseText);
                if (typeof jsonResponse.items === 'object' && jsonResponse.items.length > 0) {
                    window.digitalProperties = jsonResponse.items;
                    if (window.getAllPropertiesDone) {
                        window.getAllManualAudits();
                    }
                }
                if (typeof jsonResponse.manualAudits === 'object' && jsonResponse.manualAudits.length > 0) {
                    window.manualAudits = jsonResponse.manualAudits;
                    if (window.getAllManualAuditsDone) {
                        window.getAllFindings();
                    }
                }
                if (typeof jsonResponse.findings === 'object' && jsonResponse.findings.length > 0) {
                    if (typeof window.findings === 'undefined') {
                        window.findings = [];
                    }
                    let auditId = '';
                    let digitalProperty = '';
                    let workspace = '';
                    let propertyKey = '';
                    if (typeof window.digitalProperties !== 'undefined' && url.indexOf('/manual-evaluations/') !== -1 && url.indexOf('/workspaces/') !== -1 && url.indexOf('/digital-property/') !== -1 && url.indexOf('/manual-results') !== -1) {
                        workspace = url.split('/workspaces/')[1].split('/digital-property/')[0];
                        digitalProperty = url.split('/digital-property/')[1].split('/manual-evaluations/')[0];
                        auditId = url.split('/manual-evaluations/')[1].split('/manual-results')[0];
                        for (let i = 0; i < window.digitalProperties.length; i++) {
                            if (window.digitalProperties[i]._id === digitalProperty) {
                                propertyKey = window.digitalProperties[i].propertyKey;
                            }
                        }
                    }
                    for (let i = 0; i < jsonResponse.findings.length; i++) {
                        window.findings.push({
                            issueId: jsonResponse.findings[i].issueId,
                            attachments: jsonResponse.findings[i].attachment,
                            summary: jsonResponse.findings[i].summary,
                            task: jsonResponse.findings[i].task,
                            workspace: workspace,
                            digitalProperty: digitalProperty,
                            auditId: auditId,
                            propertyKey: propertyKey,
                        });
                    }
                    if (window.getNextFindingDone) {
                        window.searchFindings();
                    }
                }
                if (typeof jsonResponse.scope === 'object' && typeof jsonResponse.scope.pages === 'object' && jsonResponse.scope.pages.length > 0) {
                    if (typeof window.screens === 'undefined') {
                        window.screens = jsonResponse.scope.pages;
                    }
                    if (url.indexOf('/manual-evaluations/') !== -1 && url.indexOf('/workspaces/') !== -1 && url.indexOf('/digital-property/') !== -1) {
                        window.screens.workspace = url.split('/workspaces/')[1].split('/digital-property/')[0];
                        window.screens.digitalProperty = url.split('/digital-property/')[1].split('/manual-evaluations/')[0];
                        window.screens.auditId = url.split('/manual-evaluations/')[1];
                    }
                }
            }
        });
        originalOpen.apply(this, arguments);
    };

    function watchPage() {
        const callback = (mutationList, observer) => {
            // FINDINGS
            if ($('app-manual-eval-findings-table').find('table a[routerlink]').length > 0) {
                //observer.disconnect();
                if ($('.review-mode-replaced').length === 0) {
                    window.replaceAttachments();
                }
            }

            // SCREENS
            if ($('app-manual-evaluation-report').find('table a[routerlink]').length > 0) {
                //observer.disconnect();
                if ($('.review-mode-added').length === 0) {
                    window.addScreenImg();
                }
            }

            // MANUAL AUDITS
            if ($('app-admin-manual-audits').find('table-cell-text').length > 0) {
                //observer.disconnect();
                if ($('.review-mode-added-link-parent').length === 0) {
                    window.updateManualAudits();
                }
            }

            // SCOPE
            if ($('app-manual-eval-pages-table').find('table-cell-text').length > 0) {
                //observer.disconnect();
                if ($('.review-mode-added').length === 0) {
                    window.addScreenImg();
                }
            }
            let renameBtn = $('app-manual-evaluation > .card > .card-body button:contains("Rename")');
            if (renameBtn.length > 0 && $('.review-mode-view-scope').length === 0) {
                renameBtn.after('<a href="/admin/manual-audit/' + window.screens.auditId + '/edit' + window.location.search + '&workspaceId=' + window.screens.workspace + '&digitalPropertyId=' + window.screens.digitalProperty + '" target="_blank" class="review-mode-view-scope review-mode-btn btn btn-link no-padding margin-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true" fill="currentColor"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z"/></svg> View Scope</button>');
            }

        };
        const observer = new MutationObserver(callback);
        const targetNode = document.querySelectorAll('app-manual-eval-findings-table, app-manual-evaluation-report, app-admin-manual-audits, app-manual-eval-pages-table, app-evaluation-conformance')[0];
        const config = {
            attributes: false,
            childList: true,
            subtree: true
        };
        if (targetNode instanceof Node) {
            observer.observe(targetNode, config);
        }
    }
    window.updateManualAudits = function() {
        for (let i = 0; i < window.manualAudits.length; i++) {
            let thisAudit = $('app-admin-manual-audits table span:contains(' + window.manualAudits[i].title + ')');
            if (thisAudit.find('.review-mode-added').length === 0) {
                thisAudit.closest('table-cell-text').addClass('review-mode-added-link-parent');
                thisAudit.html('<a href="/manual-evaluations/' + window.manualAudits[i]._id + '/conformance" class="review-mode-added-link">' + thisAudit.text().trim() + '</a><a href="/manual-evaluations/' + window.manualAudits[i]._id + '/conformance" target="_blank" class="review-mode-link-added review-mode-new-tab-link"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open ' + thisAudit.text().trim() + ' in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
            }
        }
        if ($('.review-mode-search').length === 0) {
            $('h1').closest('.card-header').after('<div class="review-mode-search ds-search-widget"><label for="review-mode-search-issueid" class="ds-search-bar-label ds-search-widget label">Search by Issue or Task ID</label><div class="ds-search-bar"><ds-icon class="ds-search-bar-icon"><!----><fa-icon class="ng-fa-icon ds-icon fa-1x"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"></path></svg></fa-icon><!----><!----></ds-icon><input type="search" id="review-mode-search-issueid"><button id="review-mode-search">Search</button></div><div aria-live="polite" aria-atomic="true"></div></div>');
        }
    }
    $(document).on('click', '[id="review-mode-search"]', function() {
        let searchText = $('[id="review-mode-search-issueid"]')[0].value;
        let issueId = searchText;
        let propertyKey = '';
        if (searchText.trim() !== '') {
            if (searchText.indexOf('–') !== -1) {
                issueId = searchText.split('–')[1];
                propertyKey = searchText.split('–')[0];
            }
            if (searchText.indexOf('-') !== -1) {
                issueId = searchText.split('-')[1];
                propertyKey = searchText.split('-')[0];
            }
            $('.review-mode-search').find('.results-list').remove();
            $('.review-mode-search [aria-live]').html('Searching...');
            window.searchPropertyKey = propertyKey;
            window.searchTerm = issueId;
            window.getAllProperties();
        }
    });
    window.getAllProperties = function() {
        if (typeof window.getAllPropertiesDone === 'undefined') {
            window.getAllPropertiesDone = true;
            let token = JSON.parse(localStorage.getItem('Level Access Platform')).accessToken;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/v1/user/digital-properties', true);
            xhr.responseType = 'text';
            if (typeof token !== 'undefined') {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            xhr.onerror = function() {};
            xhr.send();
        }
        else {
            window.searchFindings();
        }
    }
    window.getAllManualAudits = function() {
        if (typeof window.getAllManualAuditsDone === 'undefined') {
            window.getAllManualAuditsDone = true;
            let token = JSON.parse(localStorage.getItem('Level Access Platform')).accessToken;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/v1/admin/manual-audit?limit=200', true);
            xhr.responseType = 'text';
            if (typeof token !== 'undefined') {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            xhr.onerror = function() {};
            xhr.send();
        }
    }
    window.getAllFindings = function() {
        if (typeof window.manualAudits !== 'undefined' && typeof window.getAllFindingsDone === 'undefined') {
            window.getAllFindingsDone = true;
            for (let i = 0; i < window.manualAudits.length; i++) {
                window.getNextFinding(i);
            }
        }
    }
    window.getNextFinding = function(i) {
        let token = JSON.parse(localStorage.getItem('Level Access Platform')).accessToken;
        const xhr = new XMLHttpRequest();
        let thisAudit = window.manualAudits[i];
        let thisAuditId = thisAudit._id;
        if (i === (window.manualAudits.length - 1)) {
            window.getNextFindingDone = true;
        }
        if (typeof thisAuditId !== 'undefined' && (typeof thisAudit.workspace !== 'undefined' && typeof thisAudit.workspace._id !== 'undefined') && (typeof thisAudit.digitalProperty !== 'undefined' && typeof thisAudit.digitalProperty._id !== 'undefined')) {
            xhr.open('GET', '/api/v1/workspaces/' + thisAudit.workspace._id + '/digital-property/' + thisAudit.digitalProperty._id + '/manual-evaluations/' + thisAuditId + '/manual-results', true);
            xhr.responseType = 'text';
            if (typeof token !== 'undefined') {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            }
            xhr.onerror = function() {};
            xhr.send();
        }
    }
    window.searchFindings = function() {
        if (typeof window.findings !== 'undefined') {
            let searchTerm;
            let searchMatch;
            for (let i = 0; i < window.findings.length; i++) {
                if (typeof window.findings[i].issueId !== 'undefined' && typeof window.findings[i].summary !== 'undefined') {
                    let issueId = window.findings[i].issueId;
                    searchTerm = window.searchTerm;
                    if (window.searchPropertyKey !== '') {
                        issueId = window.findings[i].propertyKey + '-' + window.findings[i].issueId;
                        searchTerm = window.searchPropertyKey + '-' + window.searchTerm;
                        searchMatch = (issueId === searchTerm);
                    }
                    else {
                        searchMatch = (issueId.indexOf(searchTerm) > -1);
                    }
                    if (searchMatch) {
                        let auditId = window.findings[i].auditId;
                        let digitalProperty = window.findings[i].digitalProperty;
                        let workspace = window.findings[i].workspace;
                        let href = '/manual-evaluations/' + auditId + '/results/' + window.findings[i].issueId + '/view?linkedPropertyData=' + digitalProperty + '%7C' + workspace;
                        if ($('.review-mode-search .results-list').length === 0) {
                            $('.review-mode-search').append('<ul class="results-list"></ul>');
                        }
                        if ($('.review-mode-search .results-list a[href="' + href + '"]').length === 0) {
                            $('.review-mode-search .results-list').append('<li><a href="' + href + '" target="_blank">' + window.findings[i].propertyKey + '-' + window.findings[i].issueId + ' – ' + window.findings[i].summary + '</a> [Finding]</li>');
                        }
                    }
                }
                let taskId = '';
                try {
                    taskId = window.findings[i].task.taskProjectId;
                } catch(err) {}
                if (window.searchPropertyKey !== '') {
                    searchTerm = window.searchPropertyKey + '-' + window.searchTerm;
                    searchMatch = (taskId === searchTerm);
                }
                else {
                    searchMatch = (taskId.indexOf(searchTerm) > -1);
                }
                if (taskId !== '' && typeof window.findings[i].summary !== 'undefined') {
                    if (searchMatch) {
                        let digitalProperty = window.findings[i].digitalProperty;
                        let workspace = window.findings[i].workspace;
                        let href = '/projects/' + window.findings[i].task.projectId + '/tasks/' + window.findings[i].task._id + '?linkedPropertyData=' + digitalProperty + '%7C' + workspace;
                        if ($('.review-mode-search .results-list').length === 0) {
                            $('.review-mode-search').append('<ul class="results-list"></ul>');
                        }
                        if ($('.review-mode-search .results-list a[href="' + href + '"]').length === 0) {
                            $('.review-mode-search .results-list').append('<li><a href="' + href + '" target="_blank">' + taskId + ' – ' + window.findings[i].summary + '</a> [Task]</li>');
                        }
                    }
                }
            }
            let numResults = $('.review-mode-search .results-list li').length;
            $('.review-mode-search [aria-live]').html(numResults + ' results found');
        }
    }
    window.addScreenImg = function() {
        $('app-manual-evaluation-screens-evaluated a[routerlink]').each(function() {
            if ($(this).parent().find('.review-mode-link-added').length === 0) {
                $(this).parent().append('<a href="' + $(this).attr('href') + '" target="_blank" class="review-mode-link-added"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open ' + $(this).text().trim() + ' in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
            }
        });
        for (let i = 0; i < window.screens.length; i++) {
            if (typeof window.screens[i].page !== 'undefined' && typeof window.screens[i].page.name !== 'undefined') {
                let pageLink = $('app-manual-evaluation-screens-evaluated a[routerlink]:contains(' + window.screens[i].page.name + '), app-manual-eval-pages-table table-cell-text:contains(' + window.screens[i].page.name + ')').first();
                if (pageLink.length > 0 && $(pageLink).parent().find('.review-mode-added').length === 0) {
                    $(pageLink).addClass('review-mode-added');
                    if (typeof window.screens[i].page.screenshot.src !== 'undefined') {
                        if ($(pageLink).closest('table').find('thead th:contains("Screenshot")').length === 0) {
                            $(pageLink).closest('table').find('thead th:first-child').after('<th scope="col" class="review-mode-th-added">Screenshot</th>');
                        }
                        $(pageLink).closest('table').find('tbody tr').filter(function() {
                            return ($(this).find('.review-mode-added-image').length === 0);
                        }).find('td:first-child').after('<td><div class="review-mode-added-image"></div></td>');
                        window.getScreenImg(pageLink, window.screens[i].page.screenshot.src);
                    }
                    if (typeof window.screens[i].page.url !== 'undefined') {
                        if ($(pageLink).closest('table').find('thead th:contains("URL")').length === 0) {
                            $(pageLink).closest('table').find('thead th:first-child').after('<th scope="col" class="review-mode-th-added">URL</th>');
                            $(pageLink).closest('table').find('tbody tr').filter(function() {
                                return ($(this).find('.review-mode-added-url').length === 0);
                            }).find('td:first-child').after('<td><div class="review-mode-added-url"></div></td>');
                        }
                        else {
                            $(pageLink).closest('table').find('table-cell-text:contains("http")').addClass('review-mode-added-url');
                        }
                        $(pageLink).closest('tr').find('.review-mode-added-url').html('<a href="' + window.screens[i].page.url + '" target="_blank">' + window.screens[i].page.url + '</a>');
                    }
                    if (typeof window.screens[i].page.description !== 'undefined' && window.screens[i].page.description.trim() !== '') {
                        if ($(pageLink).closest('table').find('thead th:contains("Description")').length === 0) {
                            $(pageLink).closest('table').find('thead th:first-child').after('<th scope="col" class="review-mode-th-added">Description</th>');
                        }
                        $(pageLink).closest('table').find('tbody tr').filter(function() {
                            return ($(this).find('.review-mode-added-description').length === 0);
                        }).find('td:first-child').after('<td><div class="review-mode-added-description"></div></td>');
                        $(pageLink).closest('tr').find('.review-mode-added-description').html(window.screens[i].page.description);
                    }
                }
            }
        }
    }
    window.getScreenImg = function(pageLink, url) {
        let token = JSON.parse(localStorage.getItem('Level Access Platform')).accessToken;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/v1/secure-download/' + url, true);
        xhr.responseType = 'blob';
        if (typeof token !== 'undefined') {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        xhr.onload = function() {
            if (this.status === 200) {
                const blob = this.response;
                const blobURL = URL.createObjectURL(blob);
                $(pageLink).closest('tr').find('.review-mode-added-image').html('<a href="' + blobURL + '" target="_blank"><img src="' + blobURL + '" alt="Thumbnail for screen: ' + $(pageLink).text().trim() + '"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"></path></svg></a>');
            } else {}
        }
        xhr.onerror = function() {};
        xhr.send();
    }
    window.replaceAttachments = function() {
        const filterByScreenLabel = $('app-filter-keyword label:contains("Screen")');
        const filterByScreen = filterByScreenLabel.parent().find('input');
        let filterByScreenVal = '';
        if (filterByScreen.length > 0) {
            filterByScreenVal = filterByScreen.val();
        }
        if (filterByScreen.length === 0 && window.location.search.indexOf('screen=') !== -1) {
            filterByScreenVal = decodeURI(window.location.search.split('screen=')[1].split('&')[0]);
        }
        if (filterByScreenVal !== '') {
            if ($('h3.review-mode-screen-name-added').length === 0) {
                $('app-manual-eval-findings-table').before('<h3 class="review-mode-screen-name-added"></h3>');
            }
            $('h3.review-mode-screen-name-added').html(filterByScreenVal);
        }
        else {
            $('h3.review-mode-screen-name-added').remove();
        }
        $('app-manual-eval-findings-table a[routerlink]').each(function() {
            if ($(this).parent().find('.review-mode-link-added').length === 0) {
                $(this).parent().append('<a href="' + $(this).attr('href') + '" target="_blank" class="review-mode-link-added review-mode-new-tab-link"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open ' + $(this).text().trim() + ' in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
                $(this).parent().append('<a href="#" data-href="' + $(this).attr('href').replace('/view?', '/edit?') + '" class="review-mode-link-added review-mode-edit-link"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Edit ' + $(this).text().trim() + '"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg></a>');
            }
        });
        if ($('[id="review-mode-enhance-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-enhance-table" class="review-mode-btn btn btn-outline-primary fw-bold" aria-pressed="false"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M347 379L505.4 163.9L476.1 134.6L261 293L347 379zM160 384L160 384L160 312.3C160 297 167.2 282.7 179.5 273.7L452.6 72.4C460 66.9 469 64 478.2 64C489.6 64 500.5 68.5 508.6 76.6L563.4 131.4C571.5 139.5 576 150.4 576 161.9C576 171.1 573.1 180.1 567.6 187.5L366.4 460.5C357.4 472.8 343 480 327.8 480L256.1 480L230.7 505.4C218.2 517.9 197.9 517.9 185.4 505.4L134.7 454.7C122.2 442.2 122.2 421.9 134.7 409.4L160 384zM39 530.3L90.7 478.6L161.3 549.2L141.6 568.9C137.1 573.4 131 575.9 124.6 575.9L56 576C42.7 576 32 565.3 32 552L32 547.3C32 540.9 34.5 534.8 39 530.3z"/></svg> Highlight Rows</button>');
        }
        if ($('[id="review-mode-refresh-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-refresh-table" class="review-mode-btn btn btn-outline-primary fw-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z"/></svg> Refresh Table</button>');
        }
        if ($('[id="review-mode-copy-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-copy-table" class="review-mode-btn btn btn-outline-primary fw-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"/></svg> Copy Table</button>');
        }
        if ($('[id="review-mode-toggle-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-toggle-table" class="review-mode-btn btn btn-outline-primary fw-bold review-mode-toggle-table-expand"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M264 96L120 96C106.7 96 96 106.7 96 120L96 264C96 273.7 101.8 282.5 110.8 286.2C119.8 289.9 130.1 287.8 137 281L177 241L256 320L177 399L137 359C130.1 352.1 119.8 350.1 110.8 353.8C101.8 357.5 96 366.3 96 376L96 520C96 533.3 106.7 544 120 544L264 544C273.7 544 282.5 538.2 286.2 529.2C289.9 520.2 287.9 509.9 281 503L241 463L320 384L399 463L359 503C352.1 509.9 350.1 520.2 353.8 529.2C357.5 538.2 366.3 544 376 544L520 544C533.3 544 544 533.3 544 520L544 376C544 366.3 538.2 357.5 529.2 353.8C520.2 350.1 509.9 352.1 503 359L463 399L384 320L463 241L503 281C509.9 287.9 520.2 289.9 529.2 286.2C538.2 282.5 544 273.7 544 264L544 120C544 106.7 533.3 96 520 96L376 96C366.3 96 357.5 101.8 353.8 110.8C350.1 119.8 352.2 130.1 359 137L399 177L320 256L241 177L281 137C287.9 130.1 289.9 119.8 286.2 110.8C282.5 101.8 273.7 96 264 96z"/></svg> Expand Table</button>');
        }
        if ($('[id="export-findings-button"]').next('[id="review-mode-toggle-table"]').length === 0) {
            $('[id="export-findings-button"]').insertBefore($('[id="review-mode-toggle-table"]'));
        }
        $('[id="export-findings-button"]').parent().addClass('review-mode-btns');
        $('app-issue-table-column-selector input[type="checkbox"][disabled]').removeAttr('disabled');
        for (let i = 0; i <= window.findings.length; i++) {
            if (typeof window.findings[i] !== 'undefined') {
                let finding = $('app-manual-eval-findings-table a[routerlink="./' + window.findings[i].issueId + '/view"]').first();
                let findingRow = finding.closest('tr');
                let attachments = findingRow.find('.attachments-container').first();
                if (window.findings[i].attachments.length > 0) {
                    attachments.html('<a class="review-mode-replaced" href="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" target="_blank"><img src="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" alt="' + window.findings[i].attachments[0].altText + '" /><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
                    const imgLbl = (window.findings[i].attachments.length >= 2) ? "images" : "image";
                    attachments.append('<a href="#" data-finding="' + i + '" class="review-mode-link-lightbox"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 160C128 124.7 156.7 96 192 96L512 96C547.3 96 576 124.7 576 160L576 416C576 451.3 547.3 480 512 480L192 480C156.7 480 128 451.3 128 416L128 160zM56 192C69.3 192 80 202.7 80 216L80 512C80 520.8 87.2 528 96 528L456 528C469.3 528 480 538.7 480 552C480 565.3 469.3 576 456 576L96 576C60.7 576 32 547.3 32 512L32 216C32 202.7 42.7 192 56 192zM224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160C206.3 160 192 174.3 192 192C192 209.7 206.3 224 224 224zM420.5 235.5C416.1 228.4 408.4 224 400 224C391.6 224 383.9 228.4 379.5 235.5L323.2 327.6L298.7 297C294.1 291.3 287.3 288 280 288C272.7 288 265.8 291.3 261.3 297L197.3 377C191.5 384.2 190.4 394.1 194.4 402.4C198.4 410.7 206.8 416 216 416L488 416C496.7 416 504.7 411.3 508.9 403.7C513.1 396.1 513 386.9 508.4 379.4L420.4 235.4z"/></svg>View ' + imgLbl + '</a>');
                    if (window.findings[i].attachments.length > 1) {
                        attachments.find('.review-mode-link-lightbox').append(' (+' + (window.findings[i].attachments.length - 1) + ' more)');
                    }
                }
            }
        }
        if (typeof window.screens !== 'undefined') {
            if (filterByScreen.length > 0) {
                if (filterByScreen.parent().find('.review-mode-screen-select').length === 0) {
                    filterByScreenLabel.after('<select class="w-100 form-select ng-pristine ng-valid ng-touched review-mode-screen-select" aria-label="Screen"><option value="">-- Select an option --</option></select>');
                }
                for (let i = 0; i < window.screens.length; i++) {
                    if (typeof window.screens[i].page !== 'undefined' && $('.review-mode-screen-select').find('option:contains(' + window.screens[i].page.name + ')').length === 0) {
                        $('.review-mode-screen-select').append('<option>' + window.screens[i].page.name + '</option>');
                        if (filterByScreenVal === window.screens[i].page.name) {
                            $('.review-mode-screen-select option:last-child').prop('selected', true);
                        }
                    }
                }
                if ($('.review-mode-screen-select option').length > 1) {
                    $('.review-mode-screen-select').show();
                    filterByScreen.hide();
                }
                else {
                    $('.review-mode-screen-select').hide();
                    filterByScreen.show();
                }
            }
        }
    }
    window.copyTable = async function() {
        let element = $('app-manual-eval-findings-table table').clone();
        $(element).addClass('review-mode-findings-excel').find('caption, th svg, a[routerlink] svg, th:first-child, td:first-child, .review-mode-link-added, .review-mode-link-lightbox').remove();
        $(element).find('.attachments-container .review-mode-replaced').each(function() {
            $(this).find('svg').remove();
            $(this).find('img').css('height', '100px').css('width', '100px').attr('width', '100').attr('height', '100');
            $(this).find('img').unwrap();
        });
        $(element).find('table-cell-text').each(function() {
            $(this).find('span').html($(this).find('span').text().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\r\n|\n|\r)/g, '<br style="mso-data-placement:same-cell;">'));
        });
        const htmlBlob = new Blob([element[0].outerHTML], { type: "text/html" });
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    "text/html": htmlBlob
                })
            ]);
        } catch (err) {
            console.error("Rich copy failed: ", err);
        }
    }
    window.reviewModeOpenLightbox = function(findingIndex) {
        $('body').append('<dialog class="review-mode-lightbox"><button class="review-mode-lightbox-close" aria-label="Close dialog"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg></button></dialog>');
        $('dialog.review-mode-lightbox')[0].showModal();
        for (let i = 0; i < window.findings[findingIndex].attachments.length; i++) {
            let thisImage = '<a href="/api/v1/resources/' + window.findings[findingIndex].attachments[i].downloadToken + '/' + window.findings[findingIndex].attachments[i]._id + '" target="_blank"><img src="/api/v1/resources/' + window.findings[findingIndex].attachments[i].downloadToken + '/' + window.findings[findingIndex].attachments[i]._id + '" alt="' + window.findings[findingIndex].attachments[i].altText + '" /></a>';
            if (i === 0) {
                if ($('.review-mode-lightbox').find('.full').length === 0) {
                    $('.review-mode-lightbox').append('<div class="full"></div>');
                }
                if ($('.review-mode-lightbox .full a').length === 0) {
                    $('.review-mode-lightbox .full').append(thisImage);
                    $('.review-mode-lightbox .full a').append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg>');
                }
            }
            if (window.findings[findingIndex].attachments.length > 1) {
                $('.review-mode-lightbox .full').addClass('reduce-height');
                if ($('.review-mode-lightbox').find('.thumbnails').length === 0) {
                    $('.review-mode-lightbox').append('<ul class="thumbnails"></ul>');
                }
                if ($('.review-mode-lightbox .thumbnails li.thumbnail-' + i).length === 0) {
                    $('.review-mode-lightbox .thumbnails').append('<li class="thumbnail-' + i + '">' + thisImage + '</li>');
                    $('.review-mode-lightbox .thumbnails li:last-child a').attr('aria-label', 'Enlarge image ' + (i + 1));
                }
                if (i === 0) {
                    $('.review-mode-lightbox .thumbnails li:last-child a').attr('aria-current', 'true');
                }
            }
        }
    }
    window.reviewModeCloseLightbox = function() {
        $('dialog.review-mode-lightbox')[0].close();
        $('dialog.review-mode-lightbox').remove();
    }
    window.reviewModeOpenDialog = function(url) {
        const label = $('.review-mode-edit-link[data-href="' + url + '"]').parent().find('a[routerlink]').text().trim();
        $('body').append('<dialog class="review-mode-dialog" aria-label="Edit ' + label + '"><button class="review-mode-dialog-close" aria-label="Close dialog"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/></svg></button><h1><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg> Edit ' + label + '</h1><iframe src="' + url + '" aria-label="' + label + '"></iframe></dialog>');
        $('dialog.review-mode-dialog')[0].showModal();
        const iframe = $('dialog.review-mode-dialog iframe')[0];
        const customCSS = `
          compound-navbar, vertical-navigation-panel, app-manual-evaluation ds-breadcrumb, app-view-task ds-breadcrumb, *:has(~ app-route-wrapper) { display: none !important; }
          app-manual-evaluation > div { margin-top: 0px !important; }
          app-manual-evaluation .full-width.card .card-body { padding-top: 0 !important; }
        `;
        iframe.addEventListener('load', () => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const styleElement = iframeDoc.createElement('style');
            styleElement.textContent = customCSS;
            iframeDoc.head.appendChild(styleElement);
        });
    }
    window.reviewModeCloseDialog = function() {
        $('dialog.review-mode-dialog')[0].close();
        $('dialog.review-mode-dialog').remove();
        $('app-accordion-filter button:contains("Apply filters")').click();
    }
    $(document).on('click', '[id="review-mode-enhance-table"]', function() {
        if ($(this).attr('aria-pressed') === 'false') {
            $(this).attr('aria-pressed', 'true');
            $('body').addClass('review-mode-table-enhanced');
        }
        else {
            $(this).attr('aria-pressed', 'false');
            $('body').removeClass('review-mode-table-enhanced');
        }
    });
    $(document).on('click', '[id="review-mode-toggle-table"]', function() {
        if ($(this).hasClass('review-mode-toggle-table-expand')) {
            $('body').addClass('review-mode-findings-expanded');
            $(this).removeClass('review-mode-toggle-table-expand').addClass('review-mode-toggle-table-collapse');
            $(this).html('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><path d="M520 288L376 288C362.7 288 352 277.3 352 264L352 120C352 110.3 357.8 101.5 366.8 97.8C375.8 94.1 386.1 96.2 393 103L433 143L506.4 69.6C510 66 514.9 64 520 64C525.1 64 530 66 533.7 69.7L570.4 106.4C574 110 576 114.9 576 120C576 125.1 574 130 570.3 133.7L497 207L537 247C543.9 253.9 545.9 264.2 542.2 273.2C538.5 282.2 529.7 288 520 288zM520 352C529.7 352 538.5 357.8 542.2 366.8C545.9 375.8 543.9 386.1 537 393L497 433L570.4 506.4C574 510 576.1 514.9 576.1 520.1C576.1 525.3 574.1 530.1 570.4 533.8L533.7 570.5C530 574 525.1 576 520 576C514.9 576 510 574 506.3 570.3L433 497L393 537C386.1 543.9 375.8 545.9 366.8 542.2C357.8 538.5 352 529.7 352 520L352 376C352 362.7 362.7 352 376 352L520 352zM264 352C277.3 352 288 362.7 288 376L288 520C288 529.7 282.2 538.5 273.2 542.2C264.2 545.9 253.9 543.9 247 537L207 497L133.6 570.4C130 574 125.1 576 120 576C114.9 576 110 574 106.3 570.3L69.7 533.7C66 530 64 525.1 64 520C64 514.9 66 510 69.7 506.3L143 433L103 393C96.1 386.1 94.1 375.8 97.8 366.8C101.5 357.8 110.3 352 120 352L264 352zM120 288C110.3 288 101.5 282.2 97.8 273.2C94.1 264.2 96.2 253.9 103 247L143 207L69.7 133.7C66 130 64 125.1 64 120C64 114.9 66 110 69.7 106.3L106.3 69.7C110 66 114.9 64 120 64C125.1 64 130 66 133.7 69.7L207 143L247 103C253.9 96.1 264.2 94.1 273.2 97.8C282.2 101.5 288 110.3 288 120L288 264C288 277.3 277.3 288 264 288L120 288z"/></svg> Collapse Table');
        }
        else {
            $('body').removeClass('review-mode-findings-expanded');
            $(this).addClass('review-mode-toggle-table-expand').removeClass('review-mode-toggle-table-collapse');
            $(this).html('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><path d="M264 96L120 96C106.7 96 96 106.7 96 120L96 264C96 273.7 101.8 282.5 110.8 286.2C119.8 289.9 130.1 287.8 137 281L177 241L256 320L177 399L137 359C130.1 352.1 119.8 350.1 110.8 353.8C101.8 357.5 96 366.3 96 376L96 520C96 533.3 106.7 544 120 544L264 544C273.7 544 282.5 538.2 286.2 529.2C289.9 520.2 287.9 509.9 281 503L241 463L320 384L399 463L359 503C352.1 509.9 350.1 520.2 353.8 529.2C357.5 538.2 366.3 544 376 544L520 544C533.3 544 544 533.3 544 520L544 376C544 366.3 538.2 357.5 529.2 353.8C520.2 350.1 509.9 352.1 503 359L463 399L384 320L463 241L503 281C509.9 287.9 520.2 289.9 529.2 286.2C538.2 282.5 544 273.7 544 264L544 120C544 106.7 533.3 96 520 96L376 96C366.3 96 357.5 101.8 353.8 110.8C350.1 119.8 352.2 130.1 359 137L399 177L320 256L241 177L281 137C287.9 130.1 289.9 119.8 286.2 110.8C282.5 101.8 273.7 96 264 96z"/></svg> Expand Table');
        }
    });
    $(document).on('click', 'app-issue-table-column-selector input[type="checkbox"]', function() {
        setTimeout(function() {
            $('app-issue-table-column-selector input[type="checkbox"][disabled]').removeAttr('disabled');
        }, 100);
    });
    $(document).on('change', '.review-mode-screen-select', function() {
        $(this).parent().find('input').val($(this).val());
        const inputEvent = new Event('input', { bubbles: true });
        $(this).parent().find('input')[0].dispatchEvent(inputEvent);
    });
    $(document).on('click', '[id="review-mode-copy-table"]', function() {
       window.copyTable();
    });
    $(document).on('click', '[id="review-mode-refresh-table"]', function() {
       $('app-accordion-filter button:contains("Apply filters")').click();
    });
    $(document).on('click', '.review-mode-edit-link', function(event) {
        event.preventDefault();
        window.reviewModeOpenDialog($(this).attr('data-href'));
    });
    $(document).on('click', '.review-mode-dialog-close', function() {
        window.reviewModeCloseDialog();
    });
    $(document).on('click', '.review-mode-link-lightbox', function(event) {
        event.preventDefault();
        window.reviewModeOpenLightbox($(this).attr('data-finding'));
    });
    $(document).on('click', '.review-mode-lightbox-close', function() {
        window.reviewModeCloseLightbox();
    });
    $(document).on('click', '.review-mode-lightbox .thumbnails a', function(event) {
        event.preventDefault();
        $(this).attr('aria-current', 'true');
        $(this).parent('li').siblings('li').find('a').removeAttr('aria-current');
        $(this).closest('dialog').find('.full').html($(this).parent('li').html());
        $(this).closest('dialog').find('.full a').removeAttr('aria-label aria-current');
        $(this).closest('dialog').find('.full a').append('<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg>');
    });

})();
