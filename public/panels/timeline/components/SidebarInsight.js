// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import sidebarInsightStyles from './sidebarInsight.css.js';
export function getLCPInsightData(insights) {
    if (!insights) {
        return [];
    }
    // For now, use the first navigation of the trace.
    const firstNav = insights.values().next().value;
    if (!firstNav) {
        return [];
    }
    const lcpInsight = firstNav.LargestContentfulPaint;
    if (lcpInsight instanceof Error) {
        return [];
    }
    const timing = lcpInsight.lcpMs;
    const phases = lcpInsight.phases;
    if (!timing || !phases) {
        return [];
    }
    const { ttfb, loadDelay, loadTime, renderDelay } = phases;
    if (loadDelay && loadTime) {
        const phaseData = [
            { phase: 'Time to first byte', timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
            { phase: 'Resource load delay', timing: loadDelay, percent: `${(100 * loadDelay / timing).toFixed(0)}%` },
            { phase: 'Resource load duration', timing: loadTime, percent: `${(100 * loadTime / timing).toFixed(0)}%` },
            { phase: 'Resource render delay', timing: renderDelay, percent: `${(100 * renderDelay / timing).toFixed(0)}%` },
        ];
        return phaseData;
    }
    // If the lcp is text, we only have ttfb and render delay.
    const phaseData = [
        { phase: 'Time to first byte', timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
        { phase: 'Resource render delay', timing: renderDelay, percent: `${(100 * renderDelay / timing).toFixed(0)}%` },
    ];
    return phaseData;
}
export function renderLCPPhases(phaseData, insightExpanded) {
    const lcpTitle = 'LCP by Phase';
    const showLCPPhases = phaseData ? phaseData.length > 0 : false;
    // clang-format off
    if (insightExpanded) {
        return LitHtml.html `${showLCPPhases ? LitHtml.html `
      <${SidebarInsight.litTagName} .data=${{
            title: lcpTitle,
            expanded: insightExpanded,
        }}>
        <div slot="insight-description" class="insight-description">
          Each
          <x-link class="link" href="https://web.dev/articles/optimize-lcp#lcp-breakdown">phase has specific recommendations to improve.</x-link>
          In an ideal load, the two delay phases should be quite short.
        </div>
        <div slot="insight-content" class="table-container">
          <dl>
            <dt class="dl-title">Phase</dt>
            <dd class="dl-title">% of LCP</dd>
            ${phaseData?.map(phase => LitHtml.html `
              <dt>${phase.phase}</dt>
              <dd class="dl-value">${phase.percent}</dd>
            `)}
          </dl>
        </div>
      </${SidebarInsight}>` : LitHtml.nothing}`;
    }
    return LitHtml.html `
    <${SidebarInsight.litTagName} .data=${{
        title: lcpTitle,
        expanded: insightExpanded,
    }}>
      </${SidebarInsight}>`;
    // clang-format on
}
export class SidebarInsight extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-performance-sidebar-insight`;
    #shadow = this.attachShadow({ mode: 'open' });
    #boundRender = this.#render.bind(this);
    #insightTitle = '';
    #expanded = false;
    set data(data) {
        this.#insightTitle = data.title;
        this.#expanded = data.expanded;
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [sidebarInsightStyles];
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#boundRender);
    }
    #render() {
        let output;
        if (!this.#expanded) {
            output = LitHtml.html `
        <div class="insight closed">
            <h3 class="insight-title">${this.#insightTitle}</h3>
        </div>`;
        }
        else {
            output = LitHtml.html `
        <div class="insight">
            <h3 class="insight-title">${this.#insightTitle}</h3>
            <slot name="insight-description"></slot>
            <slot name="insight-content"></slot>
        </div>`;
        }
        LitHtml.render(output, this.#shadow, { host: this });
    }
}
customElements.define('devtools-performance-sidebar-insight', SidebarInsight);
//# sourceMappingURL=SidebarInsight.js.map