// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.LCPPhases;
const { html } = Lit;
export class LCPPhases extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-lcp-by-phases`;
    internalName = 'lcp-by-phase';
    #overlay = null;
    hasAskAiSupport() {
        return true;
    }
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
                { phase: i18nString(UIStrings.timeToFirstByte), timing: ttfb },
                {
                    phase: i18nString(UIStrings.resourceLoadDelay),
                    timing: loadDelay,
                },
                {
                    phase: i18nString(UIStrings.resourceLoadDuration),
                    timing: loadTime,
                },
                {
                    phase: i18nString(UIStrings.elementRenderDelay),
                    timing: renderDelay,
                },
            ];
            return phaseData;
        }
        // If the lcp is text, we only have ttfb and render delay.
        const phaseData = [
            { phase: i18nString(UIStrings.timeToFirstByte), timing: ttfb },
            {
                phase: i18nString(UIStrings.elementRenderDelay),
                timing: renderDelay,
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
        const lcpMicroseconds = Trace.Types.Timing.Micro(Trace.Helpers.Timing.milliToMicro(lcpTs));
        const overlays = [];
        if (this.model.lcpRequest) {
            overlays.push({ type: 'ENTRY_OUTLINE', entry: this.model.lcpRequest, outlineReason: 'INFO' });
        }
        const sections = [];
        // For text LCP, we should only have ttfb and renderDelay sections.
        if (!phases?.loadDelay && !phases?.loadTime) {
            const renderBegin = Trace.Types.Timing.Micro(lcpMicroseconds - Trace.Helpers.Timing.milliToMicro(phases.renderDelay));
            const renderDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(renderBegin, lcpMicroseconds);
            const mainReqStart = Trace.Types.Timing.Micro(renderBegin - Trace.Helpers.Timing.milliToMicro(phases.ttfb));
            const ttfb = Trace.Helpers.Timing.traceWindowFromMicroSeconds(mainReqStart, renderBegin);
            sections.push({ bounds: ttfb, label: i18nString(UIStrings.timeToFirstByte), showDuration: true }, { bounds: renderDelay, label: i18nString(UIStrings.elementRenderDelay), showDuration: true });
        }
        else if (phases?.loadDelay && phases?.loadTime) {
            const renderBegin = Trace.Types.Timing.Micro(lcpMicroseconds - Trace.Helpers.Timing.milliToMicro(phases.renderDelay));
            const renderDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(renderBegin, lcpMicroseconds);
            const loadBegin = Trace.Types.Timing.Micro(renderBegin - Trace.Helpers.Timing.milliToMicro(phases.loadTime));
            const loadTime = Trace.Helpers.Timing.traceWindowFromMicroSeconds(loadBegin, renderBegin);
            const loadDelayStart = Trace.Types.Timing.Micro(loadBegin - Trace.Helpers.Timing.milliToMicro(phases.loadDelay));
            const loadDelay = Trace.Helpers.Timing.traceWindowFromMicroSeconds(loadDelayStart, loadBegin);
            const mainReqStart = Trace.Types.Timing.Micro(loadDelayStart - Trace.Helpers.Timing.milliToMicro(phases.ttfb));
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
    #renderFieldPhases() {
        if (!this.fieldMetrics) {
            return null;
        }
        const { ttfb, loadDelay, loadDuration, renderDelay } = this.fieldMetrics.lcpPhases;
        if (!ttfb || !loadDelay || !loadDuration || !renderDelay) {
            return null;
        }
        const ttfbMillis = i18n.TimeUtilities.preciseMillisToString(Trace.Helpers.Timing.microToMilli(ttfb.value));
        const loadDelayMillis = i18n.TimeUtilities.preciseMillisToString(Trace.Helpers.Timing.microToMilli(loadDelay.value));
        const loadDurationMillis = i18n.TimeUtilities.preciseMillisToString(Trace.Helpers.Timing.microToMilli(loadDuration.value));
        const renderDelayMillis = i18n.TimeUtilities.preciseMillisToString(Trace.Helpers.Timing.microToMilli(renderDelay.value));
        const rows = [
            { values: [i18nString(UIStrings.timeToFirstByte), ttfbMillis] },
            { values: [i18nString(UIStrings.resourceLoadDelay), loadDelayMillis] },
            { values: [i18nString(UIStrings.resourceLoadDuration), loadDurationMillis] },
            { values: [i18nString(UIStrings.elementRenderDelay), renderDelayMillis] },
        ];
        // clang-format off
        return html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.phase), i18nString(UIStrings.fieldDuration)],
            rows,
        }}>
        </devtools-performance-table>
      </div>
    `;
        // clang-format on
    }
    toggleTemporaryOverlays(overlays, options) {
        super.toggleTemporaryOverlays(overlays, { ...options, updateTraceWindowPercentage: 0 });
    }
    getOverlayOptionsForInitialOverlays() {
        return { updateTraceWindow: true, updateTraceWindowPercentage: 0 };
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const phaseData = this.#getPhaseData();
        if (!phaseData.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.noLcp)}</div>`;
        }
        const rows = phaseData.map(({ phase, timing }) => {
            const section = this.#overlay?.sections.find(section => phase === section.label);
            return {
                values: [phase, i18n.TimeUtilities.preciseMillisToString(timing)],
                overlays: section && [{
                        type: 'TIMESPAN_BREAKDOWN',
                        sections: [section],
                    }],
            };
        });
        // clang-format off
        const sections = [html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
                insight: this,
                headers: [i18nString(UIStrings.phase), i18nString(UIStrings.duration)],
                rows,
            }}>
        </devtools-performance-table>
      </div>`
        ];
        // clang-format on
        const fieldDataSection = this.#renderFieldPhases();
        if (fieldDataSection) {
            sections.push(fieldDataSection);
        }
        return html `${sections}`;
    }
}
customElements.define('devtools-performance-lcp-by-phases', LCPPhases);
//# sourceMappingURL=LCPPhases.js.map