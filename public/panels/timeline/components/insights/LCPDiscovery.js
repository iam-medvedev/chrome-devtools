// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../../core/common/common.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as TraceEngine from '../../../../models/trace/trace.js';
import * as IconButton from '../../../../ui/components/icon_button/icon_button.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsight, shouldRenderForCategory } from './Helpers.js';
import discoveryStyles from './lcpDiscovery.css.js';
import * as SidebarInsight from './SidebarInsight.js';
import { InsightsCategories } from './types.js';
const UIStrings = {
    /**
     * @description Text to tell the user how long after the earliest discovery time their LCP element loaded.
     * @example {401ms} PH1
     */
    lcpLoadDelay: 'LCP image loaded {PH1} after earliest start point.',
    /**
     * @description Text to tell the user that a fetchpriority property value of "high" is applied to the LCP request.
     */
    fetchPriorityApplied: 'fetchpriority=high applied',
    /**
     * @description Text to tell the user that the LCP request is discoverable in the initial document.
     */
    requestDiscoverable: 'Request is discoverable in initial document',
    /**
     * @description Text to tell the user that the LCP request does not have the lazy load property applied.
     */
    lazyLoadNotApplied: 'lazy load not applied',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/LCPDiscovery.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
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
export class LCPDiscovery extends BaseInsight {
    static litTagName = LitHtml.literal `devtools-performance-lcp-discovery`;
    insightCategory = InsightsCategories.LCP;
    internalName = 'lcp-discovery';
    userVisibleTitle = 'LCP request discovery';
    connectedCallback() {
        super.connectedCallback();
        this.shadow.adoptedStyleSheets.push(discoveryStyles);
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
    createOverlays() {
        const imageResults = getImageData(this.data.insights, this.data.navigationId);
        if (!imageResults || !imageResults.discoveryDelay) {
            return [];
        }
        const delay = TraceEngine.Helpers.Timing.traceWindowFromMicroSeconds(TraceEngine.Types.Timing.MicroSeconds(imageResults.resource.ts - imageResults.discoveryDelay), imageResults.resource.ts);
        const delayMs = TraceEngine.Helpers.Timing.microSecondsToMilliseconds(delay.range);
        return [
            {
                type: 'ENTRY_OUTLINE',
                entry: imageResults.resource,
                outlineReason: 'ERROR',
            },
            {
                type: 'CANDY_STRIPED_TIME_RANGE',
                bounds: delay,
                entry: imageResults.resource,
            },
            {
                type: 'TIMESPAN_BREAKDOWN',
                sections: [{
                        bounds: delay,
                        label: i18nString(UIStrings.lcpLoadDelay, { PH1: i18n.TimeUtilities.preciseMillisToString(delayMs, 2) }),
                    }],
                entry: imageResults.resource,
            },
        ];
    }
    #renderDiscovery(imageData) {
        // clang-format off
        return LitHtml.html `
        <div class="insights">
          <${SidebarInsight.SidebarInsight.litTagName} .data=${{
            title: this.userVisibleTitle,
            expanded: this.isActive(),
        }}
          @insighttoggleclick=${this.onSidebarClick}
        >
          <div slot="insight-description" class="insight-description">
          ${imageData.discoveryDelay ? LitHtml.html `<p class="discovery-delay">${this.#renderDiscoveryDelay(imageData.discoveryDelay)}</p>` : LitHtml.nothing}
            <ul class="insight-results discovery-icon-results">
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldIncreasePriorityHint)}
                <span>${i18nString(UIStrings.fetchPriorityApplied)}</span>
              </li>
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldPreloadImage)}
                <span>${i18nString(UIStrings.requestDiscoverable)}</span>
              </li>
              <li class="insight-entry">
                ${this.#adviceIcon(imageData.shouldRemoveLazyLoading)}
                <span>${i18nString(UIStrings.lazyLoadNotApplied)}</span>
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
    render() {
        const imageResults = getImageData(this.data.insights, this.data.navigationId);
        const matchesCategory = shouldRenderForCategory({
            activeCategory: this.data.activeCategory,
            insightCategory: this.insightCategory,
        });
        const output = imageResults && matchesCategory ? this.#renderDiscovery(imageResults) : LitHtml.nothing;
        LitHtml.render(output, this.shadow, { host: this });
    }
}
customElements.define('devtools-performance-lcp-discovery', LCPDiscovery);
//# sourceMappingURL=LCPDiscovery.js.map