// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './NodeLink.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { html } = LitHtml;
export class Viewport extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-viewport`;
    internalName = 'viewport';
    createOverlays() {
        // TODO(b/351757418): create overlay for synthetic input delay events
        return [];
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.INP ?? null;
    }
    renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const backendNodeId = this.model.viewportEvent?.args.data.node_id;
        // clang-format off
        return html `
      <div>
        ${backendNodeId !== undefined ? html `<devtools-performance-node-link
          .data=${{
            backendNodeId,
            options: { tooltip: this.model.viewportEvent?.args.data.content },
        }}>
        </devtools-performance-node-link>` : LitHtml.nothing}
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-viewport', Viewport);
//# sourceMappingURL=Viewport.js.map