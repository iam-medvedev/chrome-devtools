// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const UIStrings = {
    /**
     * @description Text status indicating that there isn't long chaining critical network requests.
     */
    noLongCriticalNetworkTree: 'No rendering tasks impacted by long critical network tree',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/LongCriticalNetworkTree.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
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