// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import { html, render } from '../../ui/lit/lit.js';
import * as PanelsCommon from '../common/common.js';
import { AffectedElementsView } from './AffectedElementsView.js';
export const DEFAULT_VIEW = (input, _output, target) => {
    const renderElementCell = (row) => {
        if (!row.target) {
            return html `<td>${row.nodeName || i18nString(UIStrings.unavailable)}</td>`;
        }
        const deferredDOMNode = new SDK.DOMModel.DeferredDOMNode(row.target, row.backendNodeId);
        // clang-format off
        return html `
      <td class="affected-resource-element devtools-link">
        ${PanelsCommon.DOMLinkifier.Linkifier.instance().linkify(deferredDOMNode, { textContent: row.nodeName || undefined, onClick: row.onElementClick })}
      </td>
    `;
        // clang-format on
    };
    // clang-format off
    render(html `
    ${input.rows.map(row => html `
      <tr class="affected-resource-select-element-descendant">
        ${renderElementCell(row)}
      </tr>
    `)}
  `, target);
    // clang-format on
};
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected
     * descendant nodes.
     */
    nDescendants: '{n, plural, =1 {# descendant} other {# descendants}}',
    /**
     * @description Link text in the Issues panel for a disallowed descendant
     * node.
     */
    disallowedNode: 'Disallowed descendant',
    /**
     * @description Fallback text in the Issues panel when an HTML element is
     * unavailable in the affected resources table.
     */
    unavailable: 'Unavailable',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedDescendantsWithinSelectElementView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedDescendantsWithinSelectElementView extends AffectedElementsView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    update() {
        this.requestResolver.clear();
        this.#appendDisallowedSelectDescendants(this.issue.getElementAccessibilityIssues());
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nDescendants, { n: count });
    }
    #createDisallowedSelectDescendantRow(issue) {
        const details = issue.details();
        const target = issue.model()?.target() || null;
        const category = issue.getCategory();
        return {
            nodeName: i18nString(UIStrings.disallowedNode),
            backendNodeId: details.nodeId,
            target,
            onElementClick: () => {
                Host.userMetrics.issuesPanelResourceOpened(category, "Element" /* AffectedItem.ELEMENT */);
            },
        };
    }
    #appendDisallowedSelectDescendants(issues) {
        const rows = Array.from(issues, issue => this.#createDisallowedSelectDescendantRow(issue));
        this.#view({ rows }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
}
//# sourceMappingURL=AffectedDescendantsWithinSelectElementView.js.map