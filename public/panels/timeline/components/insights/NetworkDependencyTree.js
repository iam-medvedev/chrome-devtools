// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import * as Utils from '../../utils/utils.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import networkDependencyTreeInsightRaw from './networkDependencyTreeInsight.css.js';
const { UIStrings, i18nString } = Trace.Insights.Models.NetworkDependencyTree;
const { html } = Lit;
// TODO(crbug.com/391381439): Fully migrate off of constructed style sheets.
const networkDependencyTreeInsightComponentStyles = new CSSStyleSheet();
networkDependencyTreeInsightComponentStyles.replaceSync(networkDependencyTreeInsightRaw.cssContent);
export class NetworkDependencyTree extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-long-critical-network-tree`;
    internalName = 'long-critical-network-tree';
    connectedCallback() {
        super.connectedCallback();
        this.shadow.adoptedStyleSheets.push(networkDependencyTreeInsightComponentStyles);
    }
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const overlays = [];
        getAllOverlays(this.model.rootNodes, overlays);
        return overlays;
    }
    renderTree(nodes) {
        if (nodes.length === 0) {
            return null;
        }
        // clang-format off
        return html `
      <ul>
        ${nodes.map(({ request, timeFromInitialRequest, children }) => {
            const hasChildren = children.length > 0;
            return html `
            <li>
              <div class="request">
                <span class="url">${Utils.Helpers.shortenUrl(new URL(request.args.data.url))}</span>
                ${
            // If this is the last request, show the chain time
            hasChildren ? Lit.nothing : html `
                    <span class="chain-time">
                      ${i18n.TimeUtilities.formatMicroSecondsTime(Trace.Types.Timing.Micro(timeFromInitialRequest))}
                    </span>
                `}
              </div>
            </li>
            ${hasChildren ? html `${this.renderTree(children)}` : Lit.nothing}
          `;
        })}
      </ul>`;
        // clang-format on
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        if (!this.model.rootNodes.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noNetworkDependencyTree)}</div>`;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        <div class="max-time">
          ${i18nString(UIStrings.maxCriticalPathLatency)}
          <br>
          ${i18n.TimeUtilities.formatMicroSecondsTime((this.model.maxTime))}
        </div>

        <!-- a divider is added here, through |tree-view| element's border-top -->
        <div class="tree-view">${this.renderTree(this.model.rootNodes)} </div>
      </div>
    `;
        // clang-format on
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