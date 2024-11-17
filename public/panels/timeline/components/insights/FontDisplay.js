// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { eventRef } from './EventRef.js';
const { html } = LitHtml;
const UIStrings = {
    /** Column for a font loaded by the page to render text. */
    fontColumn: 'Font',
    /** Column for the amount of time wasted. */
    wastedTimeColumn: 'Wasted time',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/FontDisplay.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class FontDisplay extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-font-display`;
    internalName = 'font-display';
    #overlayForRequest = new Map();
    createOverlays() {
        this.#overlayForRequest.clear();
        if (!this.model) {
            return [];
        }
        for (const font of this.model.fonts) {
            this.#overlayForRequest.set(font.request, {
                type: 'ENTRY_OUTLINE',
                entry: font.request,
                outlineReason: font.wastedTime ? 'ERROR' : 'INFO',
            });
        }
        return [...this.#overlayForRequest.values()];
    }
    getEstimatedSavingsTime() {
        return this.model?.metricSavings?.FCP ?? null;
    }
    #renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `
      <div class="insight-section">
        ${html `<devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.fontColumn), 'font-display', i18nString(UIStrings.wastedTimeColumn)],
            rows: this.model.fonts.map(font => ({
                values: [
                    // TODO(crbug.com/369422196): the font name would be nicer here.
                    eventRef(font.request),
                    font.display,
                    i18n.TimeUtilities.millisToString(font.wastedTime),
                ],
                overlays: [this.#overlayForRequest.get(font.request)],
            })),
        }}>
        </devtools-performance-table>`}
      </div>`;
        // clang-format on
    }
    render() {
        const shouldShow = this.model?.fonts.find(font => font.wastedTime);
        const output = shouldShow ? this.#renderContent() : LitHtml.nothing;
        this.renderWithContent(output);
    }
}
customElements.define('devtools-performance-font-display', FontDisplay);
//# sourceMappingURL=FontDisplay.js.map