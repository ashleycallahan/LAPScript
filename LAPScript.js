// ==UserScript==
// @name         Level Access Platform Script
// @namespace    http://tampermonkey.net/
// @version      1.1.0
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
app-manual-eval-findings-table table a[routerlink] {
    white-space: nowrap;
}
app-manual-eval-findings-table table a[routerlink] svg {
    display: none;
}
a.review-mode-new-tab-link-added svg {
    margin-top: -3px;
}
.review-mode-btn {
    margin: 0 0 0 15px;
}
.review-mode-btn svg {
    height: 16px;
    margin-top: -3px;
    width: 16px;
}
app-issue-table-column-selector .my-auto {
    display: none;
}
.review-mode-findings-excel app-manual-eval-findings-table caption,
.review-mode-findings-excel app-manual-eval-findings-table th svg,
.review-mode-findings-excel app-manual-eval-findings-table a[routerlink] svg,
.review-mode-findings-excel app-manual-eval-findings-table th:first-child,
.review-mode-findings-excel app-manual-eval-findings-table td:first-child,
.review-mode-findings-excel app-manual-eval-findings-table .review-mode-new-tab-link-added {
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
    `);
})();
(function() {
    'use strict';
    const $ = window.jQuery;

    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            watchPage();
            var contentType = this.getResponseHeader('Content-Type');
            var jsonResponse;
            if (contentType && contentType.indexOf('application/json') !== -1) {
                jsonResponse = JSON.parse(this.responseText);
                var i;
                if (typeof jsonResponse.findings === 'object' && jsonResponse.findings.length > 0) {
                    if (typeof window.findings === 'undefined') {
                        window.findings = [];
                    }
                    for (i = 0; i <= jsonResponse.findings.length; i++) {
                        window.findings.push({
                            issueId: jsonResponse.findings[i].issueId,
                            attachments: jsonResponse.findings[i].attachment,
                        });
                    }
                }
                if (typeof jsonResponse.scope === 'object' && typeof jsonResponse.scope.pages === 'object' && jsonResponse.scope.pages.length > 0) {
                    if (typeof window.screens === 'undefined') {
                        window.screens = jsonResponse.scope.pages;
                    }
                }
            }
        });
        originalOpen.apply(this, arguments);
    };

    function watchPage() {
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {

                // FINDINGS
                if ($('app-manual-eval-findings-table').find('a[routerlink]').length > 0) {
                    //observer.disconnect();
                    if ($(mutation.target).hasClass('attachments-container') === false) {
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
            }
        };
        const observer = new MutationObserver(callback);
        const targetNode = document.querySelectorAll('app-manual-eval-findings-table, app-manual-evaluation-report')[0];
        const config = {
            attributes: false,
            childList: true,
            subtree: true
        };
        observer.observe(targetNode, config);
    }
    window.addScreenImg = function() {
        $('app-manual-evaluation-screens-evaluated a[routerlink]').each(function() {
            if ($(this).parent().find('.review-mode-new-tab-link-added').length === 0) {
                $(this).parent().append('<a href="' + $(this).attr('href') + '" target="_blank" class="review-mode-new-tab-link-added" style="margin:0 -26px 0 10px"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open ' + $(this).text().trim() + ' in a new tab" style="width:16px;height:16px"><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
            }
        });
        for (var i = 0; i < window.screens.length; i++) {
            if (typeof window.screens[i].page !== 'undefined' && typeof window.screens[i].page.name !== 'undefined') {
                var pageLink = $('app-manual-evaluation-screens-evaluated a[routerlink]:contains(' + window.screens[i].page.name + ')').first();
                if (pageLink.length > 0 && $(pageLink).parent().find('.review-mode-added').length === 0 && typeof window.screens[i].page.screenshot.src !== 'undefined') {
                    $(pageLink).addClass('review-mode-added');
                    window.getScreenImg(pageLink, window.screens[i].page.screenshot.src);
                };
            }
        }
    }
    window.getScreenImg = function(pageLink, url) {
        var token = JSON.parse(localStorage.getItem('Level Access Platform')).accessToken;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/v1/secure-download/' + url, true);
        xhr.responseType = 'blob';
        if (typeof token !== 'undefined') {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        xhr.onload = function() {
            if (this.status === 200) {
                var blob = this.response;
                var blobURL = URL.createObjectURL(blob);
                $(pageLink).parent().append('<a href="' + blobURL + '" target="_blank" style="display:block;margin:10px 0 0 0;" class="review-mode-added"><img src="' + blobURL + '" style="min-width:200px;max-width:200px;max-height:200px;" alt="Thumbnail for screen: ' + $(pageLink).text().trim() + '"></a>');
            } else {}
        }
        xhr.onerror = function() {};
        xhr.send();
    }
    window.replaceAttachments = function() {
        var filterByScreen = $('app-filter-keyword label:contains("Screen")').next('input');
        if (filterByScreen.length > 0 && filterByScreen.val() !== '') {
            if ($('app-manual-eval-findings-table').find('h3.review-mode-screen-name-added').length === 0) {
                $('app-manual-eval-findings-table').prepend('<h3 class="review-mode-screen-name-added">Page: ' + $('app-filter-keyword label:contains("Screen")').next('input').val() + '</h3>');
            }
        }
        else {
            $('app-manual-eval-findings-table').find('h3.review-mode-screen-name-added').remove();
        }
        $('app-manual-eval-findings-table a[routerlink]').each(function() {
            if ($(this).parent().find('.review-mode-new-tab-link-added').length === 0) {
                $(this).parent().append('<a href="' + $(this).attr('href') + '" target="_blank" class="review-mode-new-tab-link-added" style="margin:0 -26px 0 10px"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" role="img" aria-label="Open ' + $(this).text().trim() + ' in a new tab" style="width:16px;height:16px"><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
            }
        });
        if ($('[id="review-mode-copy-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-copy-table" class="review-mode-btn btn btn-outline-primary fw-bold"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><path d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"/></svg> Copy Table</button>');
        }
        if ($('[id="review-mode-toggle-table"]').length === 0) {
            $('[id="export-findings-button"]').after('<button id="review-mode-toggle-table" class="review-mode-btn btn btn-outline-primary fw-bold review-mode-toggle-table-expand"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 640 640" aria-hidden="true"><path d="M264 96L120 96C106.7 96 96 106.7 96 120L96 264C96 273.7 101.8 282.5 110.8 286.2C119.8 289.9 130.1 287.8 137 281L177 241L256 320L177 399L137 359C130.1 352.1 119.8 350.1 110.8 353.8C101.8 357.5 96 366.3 96 376L96 520C96 533.3 106.7 544 120 544L264 544C273.7 544 282.5 538.2 286.2 529.2C289.9 520.2 287.9 509.9 281 503L241 463L320 384L399 463L359 503C352.1 509.9 350.1 520.2 353.8 529.2C357.5 538.2 366.3 544 376 544L520 544C533.3 544 544 533.3 544 520L544 376C544 366.3 538.2 357.5 529.2 353.8C520.2 350.1 509.9 352.1 503 359L463 399L384 320L463 241L503 281C509.9 287.9 520.2 289.9 529.2 286.2C538.2 282.5 544 273.7 544 264L544 120C544 106.7 533.3 96 520 96L376 96C366.3 96 357.5 101.8 353.8 110.8C350.1 119.8 352.2 130.1 359 137L399 177L320 256L241 177L281 137C287.9 130.1 289.9 119.8 286.2 110.8C282.5 101.8 273.7 96 264 96z"/></svg> Expand Table</button>');
        }
        $('app-issue-table-column-selector input[type="checkbox"][disabled]').removeAttr('disabled');
        for (var i = 0; i <= window.findings.length; i++) {
            var finding = $('app-manual-eval-findings-table a[routerlink="./' + window.findings[i].issueId + '/view"]').first();
            var findingRow = finding.closest('tr');
            var attachments = findingRow.find('.attachments-container').first();
            if (window.findings[i].attachments.length > 0) {
                attachments.html('<a class="review-mode-replaced" href="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" target="_blank" style="display:block"><img src="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" alt="' + window.findings[i].attachments[0].altText + '" style="min-width:200px;max-width:200px;max-height:200px;" /></a>');
            }
        }
    }
    window.copyTable = function() {
        $('body').addClass('review-mode-findings-excel');
        var element = document.querySelectorAll('app-manual-eval-findings-table table')[0];
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        selection.removeAllRanges();
        $('body').removeClass('review-mode-findings-excel');
    }
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
    $(document).on('click', '[id="review-mode-copy-table"]', function() {
       window.copyTable();
    });

})();
