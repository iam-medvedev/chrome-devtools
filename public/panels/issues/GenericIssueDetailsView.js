// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import { html, nothing, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView, renderElementCell, renderFrameCell, } from './AffectedResourcesView.js';
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected resources
     * in the generic issue affected resources table.
     */
    nResources: '{n, plural, =1 {# resource} other {# resources}}',
    /**
     * @description Column header in the Issues panel for frames in the generic
     * issue affected resources table.
     */
    frameId: 'Frame',
    /**
     * @description Link text in the Issues panel for the violating DOM node in
     * the generic issue affected resources table.
     */
    violatingNode: 'Violating node',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/GenericIssueDetailsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    ${input.showFrameHeader ? html `
      <tr>
        <td class="affected-resource-header">${i18nString(UIStrings.frameId)}</td>
      </tr>
    ` : nothing}
    ${input.rows.map(row => html `
      <tr class="affected-resource-directive">
        ${row.frame ? renderFrameCell(row.frame) : nothing}
        ${row.element ? renderElementCell(row.element) : nothing}
      </tr>
    `)}
  `, target);
    // clang-format on
};
export class GenericIssueDetailsView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nResources, { n: count });
    }
    #appendDetails(genericIssues) {
        const sampleIssueDetails = genericIssues.values().next().value?.details();
        const showFrameHeader = Boolean(sampleIssueDetails?.frameId);
        // Only some `GenericIssueDetails` have information for the 'affected
        // resources' view. We'll count them and only call `#createDetailRow` for
        // those. `updateAffectedResourceCount` will hide the section if the
        // count is zero.
        const rows = [];
        for (const genericIssue of genericIssues) {
            const hasAffectedResource = genericIssue.details().frameId || genericIssue.details().violatingNodeId;
            if (hasAffectedResource) {
                rows.push(this.#createDetailRow(genericIssue));
            }
        }
        this.#view({ showFrameHeader, rows }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
    #createDetailRow(genericIssue) {
        const details = genericIssue.details();
        const category = genericIssue.getCategory();
        const frame = details.frameId ? this.createFrameCellData(details.frameId, category) : undefined;
        let element;
        if (details.violatingNodeId) {
            element = this.createElementCellData({
                backendNodeId: details.violatingNodeId,
                nodeName: this.#violatingNodeIdName(details.errorType),
                target: genericIssue.model()?.target() ?? null,
            }, category);
        }
        return { frame, element };
    }
    #violatingNodeIdName(errorType) {
        switch (errorType) {
            case "FormLabelForNameError" /* Protocol.Audits.GenericIssueErrorType.FormLabelForNameError */:
                // Since the error is referencing the <label> tag, this string doesn't
                // need to be translated.
                return i18n.i18n.lockedString('Label');
            default:
                return i18nString(UIStrings.violatingNode);
        }
    }
    clear() {
        this.requestResolver.clear();
        this.#view({ showFrameHeader: false, rows: [] }, undefined, this.affectedResources);
    }
    update() {
        this.requestResolver.clear();
        const issues = this.issue.getGenericIssues();
        if (issues.size > 0) {
            this.#appendDetails(issues);
        }
        else {
            this.#view({ showFrameHeader: false, rows: [] }, undefined, this.affectedResources);
            this.updateAffectedResourceCount(0);
        }
    }
}
//# sourceMappingURL=GenericIssueDetailsView.js.map