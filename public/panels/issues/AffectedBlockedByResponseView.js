// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/components/request_link_icon/request_link_icon.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView, renderFrameCell } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected network
     * requests.
     */
    nRequests: '{n, plural, =1 {# request} other {# requests}}',
    /**
     * @description Column header in the Issues panel for network requests in the
     * blocked-by-response affected resources table.
     */
    requestC: 'Request',
    /**
     * @description Column header in the Issues panel for parent frames in the
     * blocked-by-response affected resources table.
     */
    parentFrame: 'Parent frame',
    /**
     * @description Column header in the Issues panel for blocked resources in the
     * blocked-by-response affected resources table.
     */
    blockedResource: 'Blocked resource',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedBlockedByResponseView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <tr>
      <td class="affected-resource-header">${i18nString(UIStrings.requestC)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.parentFrame)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.blockedResource)}</td>
    </tr>
    ${input.rows.map(row => html `
      <tr class="affected-resource-row">
        <td class="affected-resource-cell">
          <devtools-request-link-icon .data=${{
        affectedRequest: row.request,
        requestResolver: input.requestResolver,
        displayURL: true,
        additionalOnClickAction: input.onRequestClick,
    }}></devtools-request-link-icon>
        </td>
        ${renderFrameCell(row.parentFrame)}
        ${renderFrameCell(row.blockedFrame)}
      </tr>
    `)}
  `, target);
    // clang-format on
};
export class AffectedBlockedByResponseView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    #appendDetails(details) {
        const rows = [];
        for (const detail of details) {
            rows.push(this.#createDetailRow(detail));
        }
        this.#view({
            rows,
            requestResolver: this.requestResolver,
            onRequestClick: () => {
                Host.userMetrics.issuesPanelResourceOpened("CrossOriginEmbedderPolicy" /* IssuesManager.Issue.IssueCategory.CROSS_ORIGIN_EMBEDDER_POLICY */, "Request" /* AffectedItem.REQUEST */);
            },
        }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nRequests, { n: count });
    }
    #createDetailRow(details) {
        const issueCategory = this.issue.getCategory();
        return {
            request: details.request,
            parentFrame: details.parentFrame ? this.createFrameCellData(details.parentFrame.frameId, issueCategory) :
                undefined,
            blockedFrame: details.blockedFrame ? this.createFrameCellData(details.blockedFrame.frameId, issueCategory) :
                undefined,
        };
    }
    update() {
        this.requestResolver.clear();
        this.#appendDetails(this.issue.getBlockedByResponseDetails());
    }
}
//# sourceMappingURL=AffectedBlockedByResponseView.js.map