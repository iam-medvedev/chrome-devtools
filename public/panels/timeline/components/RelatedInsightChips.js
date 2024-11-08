// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import styles from './relatedInsightChips.css.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     *@description prefix shown next to related insight chips
     */
    insightKeyword: 'Insight',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/RelatedInsightChips.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class RelatedInsightChips extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #data = { eventToRelatedInsightsMap: new Map(), activeEvent: null };
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [styles];
        this.#render();
    }
    set activeEvent(event) {
        if (event === this.#data.activeEvent) {
            return;
        }
        this.#data.activeEvent = event;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set eventToRelatedInsightsMap(map) {
        this.#data.eventToRelatedInsightsMap = map;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #insightClick(insight) {
        return (event) => {
            event.preventDefault();
            insight.activateInsight();
        };
    }
    #render() {
        const { activeEvent, eventToRelatedInsightsMap } = this.#data;
        const relatedInsights = activeEvent ? eventToRelatedInsightsMap.get(activeEvent) ?? [] : [];
        if (!activeEvent || eventToRelatedInsightsMap.size === 0 || relatedInsights.length === 0) {
            LitHtml.render(html ``, this.#shadow, { host: this });
            return;
        }
        const insightChips = relatedInsights.map(insight => {
            // clang-format off
            return html `
      <li class="insight-chip">
        <button type="button" @click=${this.#insightClick(insight)}>
          <span class="keyword">${i18nString(UIStrings.insightKeyword)}</span>
          <span class="insight-label">${insight.insightLabel}</span>
        </button>
      </li>
      `;
            // clang-format on
        });
        // clang-format off
        LitHtml.render(html `<ul>${insightChips}</ul>`, this.#shadow, { host: this });
        // clang-format on
    }
}
customElements.define('devtools-related-insight-chips', RelatedInsightChips);
//# sourceMappingURL=RelatedInsightChips.js.map