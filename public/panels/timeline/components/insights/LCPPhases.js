// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { html } = LitHtml;
const UIStrings = {
    /**
     *@description Time to first byte title for the Largest Contentful Paint's phases timespan breakdown.
     */
    timeToFirstByte: 'Time to first byte',
    /**
     *@description Resource load delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    resourceLoadDelay: 'Resource load delay',
    /**
     *@description Resource load duration title for the Largest Contentful Paint phases timespan breakdown.
     */
    resourceLoadDuration: 'Resource load duration',
    /**
     *@description Element render delay title for the Largest Contentful Paint phases timespan breakdown.
     */
    elementRenderDelay: 'Element render delay',
    /**
     *@description Label used for the phase/component/stage/section of a larger duration.
     */
    phase: 'Phase',
    /**
     *@description Label used for the percentage a single phase/component/stage/section takes up of a larger duration.
     */
    percentLCP: '% of LCP',
    /**
     * @description Text status indicating that the the Largest Contentful Paint (LCP) metric timing was not found. "LCP" is an acronym and should not be translated.
     */
    noLcp: 'No LCP detected',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/insights/LCPPhases.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class LCPPhases extends BaseInsightComponent {
    static litTagName = LitHtml.literal `devtools-performance-lcp-by-phases`;
    internalName = 'lcp-by-phase';
    #overlay = null;
    #getPhaseData() {
        if (!this.model) {
            return [];
        }
        const timing = this.model.lcpMs;
        const phases = this.model.phases;
        if (!timing || !phases) {
            return [];
        }
        const { ttfb, loadDelay, loadTime, renderDelay } = phases;
        if (loadDelay && loadTime) {
            const phaseData = [
                { phase: i18nString(UIStrings.timeToFirstByte), timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
                {
                    phase: i18nString(UIStrings.resourceLoadDelay),
                    timing: loadDelay,
                    percent: `${(100 * loadDelay / timing).toFixed(0)}%`,
                },
                {
                    phase: i18nString(UIStrings.resourceLoadDuration),
                    timing: loadTime,
                    percent: `${(100 * loadTime / timing).toFixed(0)}%`,
                },
                {
                    phase: i18nString(UIStrings.elementRenderDelay),
                    timing: renderDelay,
                    percent: `${(100 * renderDelay / timing).toFixed(0)}%`,
                },
            ];
            return phaseData;
        }
        // If the lcp is text, we only have ttfb and render delay.
        const phaseData = [
            { phase: i18nString(UIStrings.timeToFirstByte), timing: ttfb, percent: `${(100 * ttfb / timing).toFixed(0)}%` },
            {
                phase: i18nString(UIStrings.elementRenderDelay),
                timing: renderDelay,
                percent: `${(100 * renderDelay / timing).toFixed(0)}%`,
            },
        ];
        return phaseData;
    }
    createOverlays() {
        this.#overlay = null;
        if (!this.model) {
            return [];
        }
        const phases = this.model.phases;
        const lcpTs = this.model.lcpTs;
        if (!phases || !lcpTs) {
            return [];
        }
        const lcpMicroseconds = Trace.Types.Timing.MicroSeconds(Trace.Helpers.Timing.millisecondsToMicroseconds(lcpTs));
        const overlays = [];
        if (this.model.lcpRequest) {
            overlays.push({ type: 'ENTRY_OUTLINE', entry: this.model.lcpRequest, outlineReason: 'INFO' });
        }
        const sections = [];
        // For text LCP, we should only have ttfb and renderDelay sections.
        if (!phases?.loadDelay && !phases?.loadTime) {
            const renderBegin = Trace.Types.Timing.MicroSeconds(lcpMicroseconds - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.renderDelay));
            const renderDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(renderBegin, lcpMicroseconds);
            const mainReqStart = Trace.Types.Timing.MicroSeconds(renderBegin - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.ttfb));
            const ttfb = Trace.Helpers.Timing.traceWindowFromMicroSeconds(mainReqStart, renderBegin);
            sections.push({ bounds: ttfb, label: i18nString(UIStrings.timeToFirstByte), showDuration: true }, { bounds: renderDelay, label: i18nString(UIStrings.elementRenderDelay), showDuration: true });
        }
        else if (phases?.loadDelay && phases?.loadTime) {
            const renderBegin = Trace.Types.Timing.MicroSeconds(lcpMicroseconds - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.renderDelay));
            const renderDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(renderBegin, lcpMicroseconds);
            const loadBegin = Trace.Types.Timing.MicroSeconds(renderBegin - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.loadTime));
            const loadTime = Trace.Helpers.Timing.traceWindowFromMicroSeconds(loadBegin, renderBegin);
            const loadDelayStart = Trace.Types.Timing.MicroSeconds(loadBegin - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.loadDelay));
            const loadDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(loadDelayStart, loadBegin);
            const mainReqStart = Trace.Types.Timing.MicroSeconds(loadDelayStart - Trace.Helpers.Timing.millisecondsToMicroseconds(phases.ttfb));
            const ttfb = Trace.Helpers.Timing.traceWindowFromMicroSeconds(mainReqStart, loadDelayStart);
            sections.push({ bounds: ttfb, label: i18nString(UIStrings.timeToFirstByte), showDuration: true }, { bounds: loadDelay, label: i18nString(UIStrings.resourceLoadDelay), showDuration: true }, { bounds: loadTime, label: i18nString(UIStrings.resourceLoadDuration), showDuration: true }, { bounds: renderDelay, label: i18nString(UIStrings.elementRenderDelay), showDuration: true });
        }
        this.#overlay = {
            type: 'TIMESPAN_BREAKDOWN',
            sections,
        };
        overlays.push(this.#overlay);
        return overlays;
    }
    renderContent() {
        if (!this.model) {
            return LitHtml.nothing;
        }
        const phaseData = this.#getPhaseData();
        if (!phaseData.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noLcp)}</div>`;
        }
        const rows = phaseData.map(({ phase, percent }) => {
            const section = this.#overlay?.sections.find(section => phase === section.label);
            return {
                values: [phase, percent],
                overlays: section && [{
                        type: 'TIMESPAN_BREAKDOWN',
                        sections: [section],
                    }],
            };
        });
        // clang-format off
        return html `
      <div class="insight-section">
        ${html `<devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.phase), i18nString(UIStrings.percentLCP)],
            rows,
        }}>
        </devtools-performance-table>`}
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-lcp-by-phases', LCPPhases);
//# sourceMappingURL=LCPPhases.js.map