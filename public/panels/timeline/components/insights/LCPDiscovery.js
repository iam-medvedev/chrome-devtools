// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as TraceEngine from '../../../../models/trace/trace.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import discoveryStyles from './lcpDiscovery.css.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
export const InsightName = 'lcp-discovery';
const UIStrings = {
    /**
     * @description Text to tell the user how long after the earliest discovery time their LCP element loaded.
     * @example {401ms} PH1
     */
    lcpLoadDelay: 'LCP image loaded {PH1} after earliest start point.',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/LCPDiscovery.ts', UIStrings);
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
    const data = {
        shouldIncreasePriorityHint,
        shouldPreloadImage,
        shouldRemoveLazyLoading,
        resource: lcpInsight.lcpResource,
        discoveryDelay: null,
    };
    if (lcpInsight.earliestDiscoveryTimeTs && lcpInsight.lcpResource) {
        const discoveryDelay = lcpInsight.lcpResource.ts - lcpInsight.earliestDiscoveryTimeTs;
        data.discoveryDelay = TraceEngine.Types.Timing.MicroSeconds(discoveryDelay);
    }
    return data;
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
    #renderDiscoveryDelay(delay) {
        const timeWrapper = document.createElement('span');
        timeWrapper.classList.add('discovery-time-ms');
        timeWrapper.innerText = i18n.TimeUtilities.formatMicroSecondsTime(delay);
        return i18n.i18n.getFormatLocalizedString(str_, UIStrings.lcpLoadDelay, { PH1: timeWrapper });
    }
    #renderDiscovery(imageData) {
        // clang-format off
        return LitHtml.html `
        <div class="insights">
          <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.#insightTitle,
            expanded: this.#isActive(),
        }}
          @insighttoggleclick=${this.#sidebarClicked}
        >
          <div slot="insight-description" class="insight-description">
          ${imageData.discoveryDelay ? LitHtml.html `<p class="discovery-delay">${this.#renderDiscoveryDelay(imageData.discoveryDelay)}</p>` : LitHtml.nothing}
            <ul class="insight-results discovery-icon-results">
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldIncreasePriorityHint)}
                <span>fetchpriority=high applied</span>
              </li>
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldPreloadImage)}
                <span>Request is discoverable in initial document</span>
              </li>
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldRemoveLazyLoading)}
                <span>lazyload not applied</span>
              </li>
            </ul>
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
        // clang-format on
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles, discoveryStyles];
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