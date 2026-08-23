// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable @devtools/no-imperative-dom-api */
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected network requests.
     */
    nRequests: '{n, plural, =1 {# request} other {# requests}}',
    /**
     * @description Column header in the Issues panel for network requests in the blocked-by-response affected resources table.
     */
    requestC: 'Request',
    /**
     * @description Column header in the Issues panel for parent frames in the blocked-by-response affected resources table.
     */
    parentFrame: 'Parent frame',
    /**
     * @description Column header in the Issues panel for blocked resources in the blocked-by-response affected resources table.
     */
    blockedResource: 'Blocked resource',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedBlockedByResponseView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedBlockedByResponseView extends AffectedResourcesView {
    #appendDetails(details) {
        const header = document.createElement('tr');
        this.appendColumnTitle(header, i18nString(UIStrings.requestC));
        this.appendColumnTitle(header, i18nString(UIStrings.parentFrame));
        this.appendColumnTitle(header, i18nString(UIStrings.blockedResource));
        this.affectedResources.appendChild(header);
        let count = 0;
        for (const detail of details) {
            this.#appendDetail(detail);
            count++;
        }
        this.updateAffectedResourceCount(count);
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nRequests, { n: count });
    }
    #appendDetail(details) {
        const element = document.createElement('tr');
        element.classList.add('affected-resource-row');
        const requestCell = this.createRequestCell(details.request, {
            additionalOnClickAction() {
                Host.userMetrics.issuesPanelResourceOpened("CrossOriginEmbedderPolicy" /* IssuesManager.Issue.IssueCategory.CROSS_ORIGIN_EMBEDDER_POLICY */, "Request" /* AffectedItem.REQUEST */);
            },
        });
        element.appendChild(requestCell);
        if (details.parentFrame) {
            const frameUrl = this.createFrameCell(details.parentFrame.frameId, this.issue.getCategory());
            element.appendChild(frameUrl);
        }
        else {
            element.appendChild(document.createElement('td'));
        }
        if (details.blockedFrame) {
            const frameUrl = this.createFrameCell(details.blockedFrame.frameId, this.issue.getCategory());
            element.appendChild(frameUrl);
        }
        else {
            element.appendChild(document.createElement('td'));
        }
        this.affectedResources.appendChild(element);
    }
    update() {
        this.clear();
        this.#appendDetails(this.issue.getBlockedByResponseDetails());
    }
}
//# sourceMappingURL=AffectedBlockedByResponseView.js.map