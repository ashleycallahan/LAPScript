// ==UserScript==
// @name         Level Access Platform Script
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Level Access Platform Script
// @author       Ashley Callahan
// @match        *.essentia11y.com/*
// @match        *.levelaccess.io/*
// @match        *.essentialaccessibility.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-4.0.0.min.js
// ==/UserScript==

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
                if ($('app-manual-eval-findings-table').find('[routerlink]').length > 0) {
                    //observer.disconnect();
                    if ($(mutation.target).hasClass('attachments-container') === false) {
                        window.replaceAttachments();
                    }
                }

                // SCREENS
                if ($('app-manual-evaluation-report').find('table [routerlink]').length > 0) {
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
        for (var i = 0; i < window.screens.length; i++) {
            if (typeof window.screens[i].page !== 'undefined' && typeof window.screens[i].page.name !== 'undefined') {
                var pageLink = $('app-manual-evaluation-screens-evaluated a[routerlink]:contains(' + window.screens[i].page.name + ')').first();
                if (pageLink.length > 0 && pageLink.next('.review-mode-new-tab-link-added').length === 0) {
                    pageLink.parent().append('<a href="' + pageLink.attr('href') + '" target="_blank" class="review-mode-new-tab-link-added" style="margin:0 -26px 0 10px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab" style="width:16px;height:16px"><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
                }
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
                $(pageLink).parent().append('<a href="' + blobURL + '" target="_blank" style="display:block;margin:10px 0 0 0;" class="review-mode-added"><img src="' + blobURL + '" style="max-width:200px" alt="Thumbnail for screen: ' + $(pageLink).text().trim() + '"></a>');
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
        for (var i = 0; i <= window.findings.length; i++) {
            var finding = $('app-manual-eval-findings-table [routerlink="./' + window.findings[i].issueId + '/view"]').first();
            if (finding.next('.review-mode-new-tab-link-added').length === 0) {
                finding.after('<a href="' + finding.attr('href') + '" target="_blank" class="review-mode-new-tab-link-added" style="margin:0 -26px 0 10px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="Open in a new tab" style="width:16px;height:16px"><path d="M354.4 83.8C359.4 71.8 371.1 64 384 64L544 64C561.7 64 576 78.3 576 96L576 256C576 268.9 568.2 280.6 556.2 285.6C544.2 290.6 530.5 287.8 521.3 278.7L464 221.3L310.6 374.6C298.1 387.1 277.8 387.1 265.3 374.6C252.8 362.1 252.8 341.8 265.3 329.3L418.7 176L361.4 118.6C352.2 109.4 349.5 95.7 354.5 83.7zM64 240C64 195.8 99.8 160 144 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L144 224C135.2 224 128 231.2 128 240L128 496C128 504.8 135.2 512 144 512L400 512C408.8 512 416 504.8 416 496L416 416C416 398.3 430.3 384 448 384C465.7 384 480 398.3 480 416L480 496C480 540.2 444.2 576 400 576L144 576C99.8 576 64 540.2 64 496L64 240z"/></svg></a>');
            }
            var findingRow = finding.closest('tr');
            var attachments = findingRow.find('.attachments-container').first();
            if (window.findings[i].attachments.length > 0) {
                attachments.html('<a class="review-mode-replaced" href="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" target="_blank" style="display:block"><img src="/api/v1/resources/' + window.findings[i].attachments[0].downloadToken + '/' + window.findings[i].attachments[0]._id + '" alt="' + window.findings[i].attachments[0].altText + '" style="height:auto;max-width:200px" /></a>');
            }
        }
    }

})();
