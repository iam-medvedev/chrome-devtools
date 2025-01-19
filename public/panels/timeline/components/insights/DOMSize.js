// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const UIStrings = {
    /**
     * @description Header for a column containing the names of statistics as opposed to the actual statistic values.
     */
    statistic: 'Statistic',
    /**
     * @description Header for a column containing the value of a statistic.
     */
    value: 'Value',
    /**
     * @description Header for a column containing the page element related to a statistc.
     */
    element: 'Element',
    /**
     * @description Label for a value representing the total number of elements on the page.
     */
    totalElements: 'Total elements',
    /**
     * @description Label for a value representing the maximum depth of the Document Object Model (DOM). "DOM" is a acronym and should not be translated.
     */
    maxDOMDepth: 'DOM depth',
    /**
     * @description Label for a value representing the maximum number of child elements of any parent element on the page.
     */
    maxChildren: 'Most children',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/DOMSize.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { html } = LitHtml;
export class DOMSize extends BaseInsightComponent {
    static litTagName = LitHtml.StaticHtml.literal `devtools-performance-dom-size`;
    internalName = 'dom-size';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const entries = [...this.model.largeStyleRecalcs, ...this.model.largeLayoutUpdates];
        return entries.map(entry => ({
            type: 'ENTRY_OUTLINE',
            entry,
            outlineReason: 'ERROR',
        }));
    }
    #renderNodeTable(domStatsData) {
        const rows = [];
        if (domStatsData.maxDepth) {
            const { nodeId, nodeName } = domStatsData.maxDepth;
            rows.push({ values: [i18nString(UIStrings.maxDOMDepth), this.renderNode(nodeId, nodeName)] });
        }
        if (domStatsData.maxChildren) {
            const { nodeId, nodeName } = domStatsData.maxChildren;
            rows.push({ values: [i18nString(UIStrings.maxChildren), this.renderNode(nodeId, nodeName)] });
        }
        if (!rows.length) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `<div class="insight-section">
      <devtools-performance-table
        .data=${{
            insight: this,
            headers: [i18nString(UIStrings.statistic), i18nString(UIStrings.element)],
            rows,
        }}>
      </devtools-performance-table>
    </div>`;
        // clang-format on
    }
    renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const domStatsData = this.model.maxDOMStats?.args.data;
        if (!domStatsData) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `<div class="insight-section">
      <devtools-performance-table
        .data=${{
            insight: this,
            headers: [i18nString(UIStrings.statistic), i18nString(UIStrings.value)],
            rows: [
                { values: [i18nString(UIStrings.totalElements), domStatsData.totalElements] },
                { values: [i18nString(UIStrings.maxDOMDepth), domStatsData.maxDepth?.depth ?? 0] },
                { values: [i18nString(UIStrings.maxChildren), domStatsData.maxChildren?.numChildren ?? 0] },
            ],
        }}>
      </devtools-performance-table>
    </div>
    ${this.#renderNodeTable(domStatsData)}
    `;
        // clang-format on
    }
}
customElements.define('devtools-performance-dom-size', DOMSize);
//# sourceMappingURL=DOMSize.js.map