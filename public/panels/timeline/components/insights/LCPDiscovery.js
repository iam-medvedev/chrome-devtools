// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
export const InsightName = 'lcp-discovery';
export function getLCPInsightData(insights, navigationId) {
    if (!insights || !navigationId) {
        return null;
    }
    const insightsByNavigation = insights.get(navigationId);
    if (!insightsByNavigation) {
        return null;
    }
    const lcpInsight = insightsByNavigation.LargestContentfulPaint;
    if (lcpInsight instanceof Error) {
        return null;
    }
    return lcpInsight;
}
function getImageData(insights, navigationId) {
    const lcpInsight = getLCPInsightData(insights, navigationId);
    if (!lcpInsight) {
        return null;
    }
    if (lcpInsight.lcpResource === undefined) {
        return null;
    }
    const shouldIncreasePriorityHint = lcpInsight.shouldIncreasePriorityHint;
    const shouldPreloadImage = lcpInsight.shouldPreloadImage;
    const shouldRemoveLazyLoading = lcpInsight.shouldRemoveLazyLoading;
    const imageLCP = shouldIncreasePriorityHint !== undefined && shouldPreloadImage !== undefined &&
        shouldRemoveLazyLoading !== undefined;
    // Shouldn't render anything if lcp insight is null or lcp is text.
    if (!imageLCP) {
        return null;
    }
    return {
        shouldIncreasePriorityHint,
        shouldPreloadImage,
        shouldRemoveLazyLoading,
        resource: lcpInsight.lcpResource,
    };
}
export class LCPDiscovery extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-lcp-discovery`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = 'LCP request discovery';
    #insights = null;
    #navigationId = null;
    #activeInsight = null;
    #activeCategory = InsightsCategories.ALL;
    set insights(insights) {
        this.#insights = insights;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set navigationId(navigationId) {
        this.#navigationId = navigationId;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set activeInsight(activeInsight) {
        this.#activeInsight = activeInsight;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    set activeCategory(activeCategory) {
        this.#activeCategory = activeCategory;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #sidebarClicked() {
        // deactivate current insight if already selected.
        if (this.#isActive()) {
            this.dispatchEvent(new SidebarInsight.InsightDeactivated());
            return;
        }
        if (!this.#navigationId) {
            // Shouldn't happen, but needed to satisfy TS.
            return;
        }
        this.dispatchEvent(new SidebarInsight.InsightActivated(InsightName, this.#navigationId, 
        // TODO: create the overlay for this insight.
        () => []));
    }
    #adviceIcon(didFail) {
        const icon = didFail ? 'clear' : 'check-circle';
        return LitHtml.html `
      <${IconButton.Icon.Icon.litTagName}
      name=${icon}
      class=${didFail ? 'metric-value-bad' : 'metric-value-good'}
      ></${IconButton.Icon.Icon.litTagName}>
    `;
    }
    #renderDiscovery(imageData) {
        return LitHtml.html `
        <div class="insights"  @click=${() => this.#sidebarClicked()}>
            <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.#insightTitle,
            expanded: this.#isActive(),
        }}>
            <div slot="insight-description" class="insight-description">
                The LCP image should be requested as early as possible.
                <div class="insight-results">
                  <div class="insight-entry">
                      ${this.#adviceIcon(imageData.shouldIncreasePriorityHint)}
                      fetchpriority=high applied
                  </div>
                  <div class="insight-entry">
                      ${this.#adviceIcon(imageData.shouldPreloadImage)}
                      Request is discoverable in initial document
                  </div>
                  <div class="insight-entry">
                      ${this.#adviceIcon(imageData.shouldRemoveLazyLoading)}
                      lazyload not applied
                  </div>
                </div>
            </div>
            <div slot="insight-content" class="insight-content">
                <img class="element-img" data-src=${imageData.resource.args.data.url} src=${imageData.resource.args.data.url}>
                <div class="element-img-details">
                    ${Common.ParsedURL.ParsedURL.extractName(imageData.resource.args.data.url ?? '')}
                    <div class="element-img-details-size">${Platform.NumberUtilities.bytesToString(imageData.resource.args.data.decodedBodyLength ?? 0)}</div>
                </div>
            </div>
            </${SidebarInsight.SidebarInsight}>
        </div>`;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
    }
    #shouldRenderForCateogory() {
        if (this.#activeCategory === InsightsCategories.ALL) {
            return true;
        }
        return this.#activeCategory === InsightsCategories.LCP;
    }
    #isActive() {
        const isActive = this.#activeInsight && this.#activeInsight.name === InsightName &&
            this.#activeInsight.navigationId === this.#navigationId;
        return Boolean(isActive);
    }
    #render() {
        const imageResults = getImageData(this.#insights, this.#navigationId);
        const output = imageResults && this.#shouldRenderForCateogory() ? this.#renderDiscovery(imageResults) : LitHtml.nothing;
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-lcp-discovery', LCPDiscovery);
//# sourceMappingURL=LCPDiscovery.js.map