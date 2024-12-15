// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/icon_button/icon_button.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const UIStrings = {
    /**
     * @description Text status indicating that browser operations to re-render the page were not impacted by the size of the DOM. "DOM" is an acronym and should not be translated.
     */
    noLargeRenderTasks: 'No rendering tasks impacted by DOM size',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/DOMSize.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { html } = LitHtml;
export class DOMSize extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-dom-size`;
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
    renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        if (!this.model.largeStyleRecalcs.length && !this.model.largeLayoutUpdates.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noLargeRenderTasks)}</div>`;
        }
        return LitHtml.nothing;
    }
}
customElements.define('devtools-performance-dom-size', DOMSize);
//# sourceMappingURL=DOMSize.js.map