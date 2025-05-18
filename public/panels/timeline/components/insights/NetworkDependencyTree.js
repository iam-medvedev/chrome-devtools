// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import './NodeLink.js';
import '../../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { md } from '../../utils/Helpers.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
import networkDependencyTreeInsightStyles from './networkDependencyTreeInsight.css.js';
const { UIStrings, i18nString } = Trace.Insights.Models.NetworkDependencyTree;
const { html } = Lit;
export class NetworkDependencyTree extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-long-critical-network-tree`;
    internalName = 'long-critical-network-tree';
    #relatedRequests = null;
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const overlays = [];
        getAllOverlays(this.model.rootNodes, overlays);
        return overlays;
    }
    #createOverlayForChain(requests) {
        const overlays = [];
        requests.forEach(entry => overlays.push({
            type: 'ENTRY_OUTLINE',
            entry,
            outlineReason: 'ERROR',
        }));
        return overlays;
    }
    #renderNetworkTreeRow(node) {
        const requestStyles = Lit.Directives.styleMap({
            display: 'flex',
            '--override-timeline-link-text-color': node.isLongest ? 'var(--sys-color-error)' : '',
            color: node.isLongest ? 'var(--sys-color-error)' : '',
            backgroundColor: this.#relatedRequests?.has(node.request) ? 'var(--sys-color-state-hover-on-subtle)' : '',
        });
        const urlStyles = Lit.Directives.styleMap({
            flex: 'auto',
        });
        // clang-format off
        return html `
      <div style=${requestStyles}>
        <span style=${urlStyles}>${eventRef(node.request)}</span>
        <span>
          ${i18n.TimeUtilities.formatMicroSecondsTime(Trace.Types.Timing.Micro(node.timeFromInitialRequest))}
        </span>
      </div>
    `;
        // clang-format on
    }
    #mapNetworkDependencyToRow(node) {
        return {
            values: [this.#renderNetworkTreeRow(node)],
            overlays: this.#createOverlayForChain(node.relatedRequests),
            subRows: node.children.map(child => this.#mapNetworkDependencyToRow(child)),
        };
    }
    #renderNetworkDependencyTree(nodes) {
        if (nodes.length === 0) {
            return null;
        }
        const rows = [{
                // Add one empty row so the main document request can also has a left border
                values: [],
                subRows: nodes.map(node => this.#mapNetworkDependencyToRow(node))
            }];
        // clang-format off
        return html `
      <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.columnRequest), i18nString(UIStrings.columnTime)],
            rows,
        }}>
      </devtools-performance-table>
    `;
        // clang-format on
    }
    #renderNetworkTreeSection() {
        if (!this.model) {
            return Lit.nothing;
        }
        if (!this.model.rootNodes.length) {
            // clang-format off
            return html `
        <style>${networkDependencyTreeInsightStyles}</style>
        <div class="insight-section">${i18nString(UIStrings.noNetworkDependencyTree)}</div>
      `;
            // clang-format on
        }
        // clang-format off
        return html `
      <style>${networkDependencyTreeInsightStyles}</style>
      <div class="insight-section">
        <div class="max-time">
          ${i18nString(UIStrings.maxCriticalPathLatency)}
          <br>
          <span class='longest'> ${i18n.TimeUtilities.formatMicroSecondsTime((this.model.maxTime))}</span>
        </div>
      </div>
      <div class="insight-section">
        ${this.#renderNetworkDependencyTree(this.model.rootNodes)}
      </div>
    `;
        // clang-format on
    }
    #renderPreconnectOriginsTable() {
        if (!this.model) {
            return Lit.nothing;
        }
        const preconnectOriginsTableTitle = html `
      <style>${networkDependencyTreeInsightStyles}</style>
      <div class='section-title'>${i18nString(UIStrings.preconnectOriginsTableTitle)}</div>
      <div class="insight-description">${md(i18nString(UIStrings.preconnectOriginsTableDescription))}</div>
    `;
        if (!this.model.preconnectOrigins.length) {
            // clang-format off
            return html `
        <div class="insight-section">
          ${preconnectOriginsTableTitle}
          ${i18nString(UIStrings.noPreconnectOrigins)}
        </div>
      `;
            // clang-format on
        }
        const rows = this.model.preconnectOrigins.map(preconnectOrigin => {
            // clang-format off
            const nodeEl = html `
        <devtools-performance-node-link
          .data=${{
                backendNodeId: preconnectOrigin.node_id,
                frame: preconnectOrigin.frame,
                fallbackHtmlSnippet: `<link rel="preconnect" href="${preconnectOrigin.url}">`,
            }}>
        </devtools-performance-node-link>`;
            // clang-format on
            return {
                values: [preconnectOrigin.url, nodeEl],
                subRows: preconnectOrigin.unused ? [{
                        values: [md(i18nString(UIStrings.unusedWarning))],
                    }] :
                    undefined,
            };
        });
        // clang-format off
        return html `
      <div class="insight-section">
        ${preconnectOriginsTableTitle}
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.columnOrigin), i18nString(UIStrings.columnSource)],
            rows,
        }}>
        </devtools-performance-table>
      </div>
    `;
        // clang-format on
    }
    #renderEstSavingTable() {
        if (!this.model) {
            return Lit.nothing;
        }
        const estSavingTableTitle = html `
      <style>${networkDependencyTreeInsightStyles}</style>
      <div class='section-title'>${i18nString(UIStrings.estSavingTableTitle)}</div>
      <div class="insight-description">${md(i18nString(UIStrings.estSavingTableDescription))}</div>
    `;
        if (!this.model.preconnectCandidates.length) {
            // clang-format off
            return html `
        <div class="insight-section">
          ${estSavingTableTitle}
          ${i18nString(UIStrings.noPreconnectCandidates)}
        </div>
      `;
            // clang-format on
        }
        const rows = this.model.preconnectCandidates.map(candidate => ({
            values: [candidate.origin, i18n.TimeUtilities.millisToString(candidate.wastedMs)],
        }));
        // clang-format off
        return html `
      <div class="insight-section">
        ${estSavingTableTitle}
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.columnOrigin), i18nString(UIStrings.columnWastedMs)],
            rows,
        }}>
        </devtools-performance-table>
      </div>
    `;
        // clang-format on
    }
    renderContent() {
        return html `
      ${this.#renderNetworkTreeSection()}
      ${this.#renderPreconnectOriginsTable()}
      ${this.#renderEstSavingTable()}
    `;
    }
}
function getAllOverlays(nodes, overlays) {
    nodes.forEach(node => {
        overlays.push({
            type: 'ENTRY_OUTLINE',
            entry: node.request,
            outlineReason: 'ERROR',
        });
        getAllOverlays(node.children, overlays);
    });
}
customElements.define('devtools-performance-long-critical-network-tree', NetworkDependencyTree);
//# sourceMappingURL=NetworkDependencyTree.js.map