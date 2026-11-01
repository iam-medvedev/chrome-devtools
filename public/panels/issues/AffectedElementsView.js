// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives, html, render } from '../../ui/lit/lit.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import * as PanelsCommon from '../common/common.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
const { ifDefined } = Directives;
const { widget } = UI.Widget;
export const DEFAULT_VIEW = (input, _output, target) => {
    const renderElementCell = (row) => {
        const { deferredNode } = row;
        if (!deferredNode) {
            return html `<td>${row.nodeName || i18nString(UIStrings.unavailable)}</td>`;
        }
        // clang-format off
        return html `
      <td class="affected-resource-element devtools-link">${widget(PanelsCommon.DOMLinkifier.DeferredDOMNodeLink, {
            deferredNode,
            options: { textContent: row.nodeName || undefined, onClick: row.onElementClick },
        })}</td>
    `;
        // clang-format on
    };
    // clang-format off
    render(html `
    ${input.rows.map(row => html `
      <tr jslog=${VisualLogging.tableRow('affected-element')}
          data-backend-node-id=${ifDefined(row.backendNodeId ? String(row.backendNodeId) : undefined)}
          data-target-id=${ifDefined(row.backendNodeId ? row.targetId : undefined)}>
        ${renderElementCell(row)}
      </tr>
    `)}
  `, target);
    // clang-format on
};
const UIStrings = {
    /**
     * @description Label in the Issues panel for the number of affected elements.
     */
    nElements: '{n, plural, =1 {# element} other {# elements}}',
    /**
     * @description Fallback text in the Issues panel when an HTML element is unavailable in the affected resources table.
     */
    unavailable: 'Unavailable',
};
const str_ = i18n.i18n.registerUIStrings('panels/issues/AffectedElementsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class AffectedElementsView extends AffectedResourcesView {
    #view;
    constructor(parent, issue, jslogContext, view = DEFAULT_VIEW) {
        super(parent, issue, jslogContext);
        this.#view = view;
    }
    #appendAffectedElements(affectedElements) {
        const rows = Array.from(affectedElements, element => this.#createAffectedElementRow(element));
        this.#view({ rows }, undefined, this.affectedResources);
        this.updateAffectedResourceCount(rows.length);
    }
    getResourceNameWithCount(count) {
        return i18nString(UIStrings.nElements, { n: count });
    }
    #createAffectedElementRow(element) {
        const issueCategory = this.issue.getCategory();
        const { target, backendNodeId } = element;
        return {
            nodeName: element.nodeName,
            backendNodeId,
            deferredNode: target ? new SDK.DOMModel.DeferredDOMNode(target, backendNodeId) : undefined,
            targetId: target?.id(),
            onElementClick: () => {
                Host.userMetrics.issuesPanelResourceOpened(issueCategory, "Element" /* AffectedItem.ELEMENT */);
            },
        };
    }
    update() {
        this.requestResolver.clear();
        this.#appendAffectedElements(this.issue.elements());
    }
}
//# sourceMappingURL=AffectedElementsView.js.map