// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.LongCriticalNetworkTree;
const { html } = Lit;
export class LongCriticalNetworkTree extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-long-critical-network-tree`;
    internalName = 'long-critical-network-tree';
    createOverlays() {
        if (!this.model) {
            return [];
        }
        return this.model.longChains.flat().map(entry => ({
            type: 'ENTRY_OUTLINE',
            entry,
            outlineReason: 'ERROR',
        }));
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        if (!this.model.longChains.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noLongCriticalNetworkTree)}</div>`;
        }
        return Lit.nothing;
    }
}
customElements.define('devtools-performance-long-critical-network-tree', LongCriticalNetworkTree);
//# sourceMappingURL=LongCriticalNetworkTree.js.map