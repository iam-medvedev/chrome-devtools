// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { html, render } from '../../ui/lit/lit.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const { widget } = UI.Widget;
export const DEFAULT_VIEW = (input, _output, target) => {
    const renderSourceLocation = (location) => {
        if (!location) {
            return html `<td class="affected-source-location"></td>`;
        }
        // clang-format off
        return html `
      <td class="affected-source-location">${widget(Components.Linkifier.ScriptLocationLink, {
            target: location.target ?? undefined,
            scriptId: location.scriptId ?? undefined,
            sourceURL: location.url,
            lineNumber: location.lineNumber,
            options: {
                columnNumber: location.columnNumber,
                maxLength: UI.UIUtils.MaxLengthForDisplayedURLsInConsole,
                jslogContext: 'source-location',
            },
        })}</td>
    `;
        // clang-format on
    };
    // clang-format off
    render(html `
    <tr>
      <td class="affected-resource-header">${i18nString(UIStrings.sourceLocation)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.trigger)}</td>
      <td class="affected-resource-header">${i18nString(UIStrings.status)}</td>
    </tr>
    ${input.rows.map(row => html `
      <tr class="affected-resource-directive">
        ${renderSourceLocation(row.sourceLocation)}
        <td title=${row.triggerTitle}>${row.triggerText}</td>
        <td class=${row.isWarning ? 'affected-resource-report-only-status' : 'affected-resource-blocked-status'}>
          ${row.isWarning ? i18nString(UIStrings.warning) : i18nString(UIStrings.blocked)}
        </td>
      </tr>
    `)}
  `, target);
    // clang-format on
};
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected
     * violations in the SharedArrayBuffer affected resources table.
     */
    nViolations: '{n, plural, =1 {# violation} other {# violations}}',
    /**
     * @description Violation status in the Issues panel indicating that a
     * SharedArrayBuffer issue produced a warning.
     */
    warning: 'Warning',
    /**
     * @description Violation status in the Issues panel indicating that a
     * SharedArrayBuffer operation was blocked.
     */
    blocked: 'Blocked',
    /**
     * @description Trigger type in the Issues panel indicating that a
     * SharedArrayBuffer was instantiated.
     */
    instantiation: 'Instantiation',
    /**
     * @description Tooltip in the Issues panel explaining that a
     * SharedArrayBuffer was instantiated in a non-cross-origin-isolated context.
     */
    aSharedarraybufferWas: 'A `SharedArrayBuffer` was instantiated in a context that isn’t cross-origin isolated',
    /**
     * @description Trigger type in the Issues panel indicating that a
     * SharedArrayBuffer was transferred.
     */
    transfer: 'Transfer',
    /**
     * @description Tooltip in the Issues panel explaining that a
     * SharedArrayBuffer was transferred to a non-cross-origin-isolated context.
     */
    sharedarraybufferWasTransferedTo: '`SharedArrayBuffer` was transferred to a context that isn’t cross-origin isolated',
    /**
     * @description Column header in the Issues panel for source locations in the
     * SharedArrayBuffer affected resources table.
     */
    sourceLocation: 'Source location',
    /**
     * @description Column header in the Issues panel for trigger types in the
     * SharedArrayBuffer affected resources table.
     */
    trigger: 'Trigger',
    /**
     * @description Column header in the Issues panel for violation status in the
     * SharedArrayBuffer affected resources table.
     */
    status: 'Status',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedSharedArrayBufferIssueDetailsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedSharedArrayBufferIssueDetailsView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nViolations, { n: count });
    }
    #appendDetails(sabIssues) {
        const rows = [];
        for (const sabIssue of sabIssues) {
            rows.push(this.#createDetailRow(sabIssue));
        }
        this.#view({ rows }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
    #createDetailRow(sabIssue) {
        const sabIssueDetails = sabIssue.details();
        const location = IssuesManager.Issue.toZeroBasedLocation(sabIssueDetails.sourceCodeLocation);
        let sourceLocation;
        if (location) {
            sourceLocation = {
                target: sabIssue.model()?.getTargetIfNotDisposed() || null,
                scriptId: location.scriptId || null,
                url: location.url,
                lineNumber: location.lineNumber,
                columnNumber: location.columnNumber,
            };
        }
        let triggerText;
        let triggerTitle;
        switch (sabIssueDetails.type) {
            case "CreationIssue" /* Protocol.Audits.SharedArrayBufferIssueType.CreationIssue */:
                triggerText = i18nString(UIStrings.instantiation);
                triggerTitle = i18nString(UIStrings.aSharedarraybufferWas);
                break;
            case "TransferIssue" /* Protocol.Audits.SharedArrayBufferIssueType.TransferIssue */:
                triggerText = i18nString(UIStrings.transfer);
                triggerTitle = i18nString(UIStrings.sharedarraybufferWasTransferedTo);
                break;
            default:
                Platform.assertNever(sabIssueDetails.type, `Unhandled issue type: ${sabIssueDetails.type}`);
        }
        return {
            sourceLocation,
            triggerText,
            triggerTitle,
            isWarning: sabIssueDetails.isWarning,
        };
    }
    update() {
        this.requestResolver.clear();
        this.#appendDetails(this.issue.getSharedArrayBufferIssues());
    }
}
//# sourceMappingURL=AffectedSharedArrayBufferIssueDetailsView.js.map