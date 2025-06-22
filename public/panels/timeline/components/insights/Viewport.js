// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './NodeLink.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.Viewport;
const { html } = Lit;
export class Viewport extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-viewport`;
    internalName = 'viewport';
    createOverlays() {
        if (!this.model || !this.model.longPointerInteractions) {
            return [];
        }
        return this.model.longPointerInteractions.map(interaction => {
            const delay = Math.min(interaction.inputDelay, 300 * 1000);
            const bounds = Trace.Helpers.Timing.traceWindowFromMicroSeconds(Trace.Types.Timing.Micro(interaction.ts), Trace.Types.Timing.Micro(interaction.ts + delay));
            return {
                type: 'TIMESPAN_BREAKDOWN',
                entry: interaction,
                sections: [{ bounds, label: i18nString(UIStrings.mobileTapDelayLabel), showDuration: true }],
                renderLocation: 'ABOVE_EVENT',
            };
        });
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.INP ?? null;
    }
    renderContent() {
        if (!this.model || !this.model.viewportEvent) {
            return Lit.nothing;
        }
        const backendNodeId = this.model.viewportEvent.args.data.node_id;
        if (backendNodeId === undefined) {
            return Lit.nothing;
        }
        // clang-format off
        return html `
      <div>
        <devtools-performance-node-link
          .data=${{
            backendNodeId,
            frame: this.model.viewportEvent.args.data.frame ?? '',
            options: { tooltip: this.model.viewportEvent.args.data.content },
            fallbackHtmlSnippet: `<meta name=viewport content="${this.model.viewportEvent.args.data.content}">`,
        }}>
        </devtools-performance-node-link>
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-viewport', Viewport);
//# sourceMappingURL=Viewport.js.map