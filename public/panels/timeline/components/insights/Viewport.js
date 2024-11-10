// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './NodeLink.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent, shouldRenderForCategory } from './Helpers.js';
import { Category } from './types.js';
const { html } = LitHtml;
export class Viewport extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-viewport`;
    insightCategory = Category.INP;
    internalName = 'viewport';
    createOverlays() {
        // TODO(b/351757418): create overlay for synthetic input delay events
        return [];
    }
    #render(insight) {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const backendNodeId = insight.viewportEvent?.args.data.node_id;
        // clang-format off
        return html `
        <div class="insights">
            <devtools-performance-sidebar-insight .data=${{
            title: this.model.title,
            description: this.model.description,
            expanded: this.isActive(),
            internalName: this.internalName,
            estimatedSavingsTime: insight.metricSavings?.INP,
        }}
            @insighttoggleclick=${this.onSidebarClick}>
              ${backendNodeId !== undefined ? html `<devtools-performance-node-link
                .data=${{
            backendNodeId,
            options: { tooltip: insight.viewportEvent?.args.data.content },
        }}>
              </devtools-performance-node-link>` : LitHtml.nothing}
            </devtools-performance-sidebar-insight>
        </div>`;
        // clang-format on
    }
    render() {
        const model = this.model;
        const shouldShow = model && model.mobileOptimized === false;
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = shouldShow && matchesCategory ? this.#render(model) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-viewport', Viewport);
//# sourceMappingURL=Viewport.js.map