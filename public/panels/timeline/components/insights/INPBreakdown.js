// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.INPBreakdown;
const { html } = Lit;
export class INPBreakdown extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-inp-breakdown`;
    internalName = 'inp';
    hasAskAiSupport() {
        return this.model?.longestInteractionEvent !== undefined;
    }
    createOverlays() {
        if (!this.model) {
            return [];
        }
        const event = this.model.longestInteractionEvent;
        if (!event) {
            return [];
        }
        return this.#createOverlaysForSbupart(event);
    }
    // If `subpart` is -1, then all subparts are included. Otherwise it's just that index.
    #createOverlaysForSbupart(event, subpartIndex = -1) {
        const p1 = Trace.Helpers.Timing.traceWindowFromMicroSeconds(event.ts, (event.ts + event.inputDelay));
        const p2 = Trace.Helpers.Timing.traceWindowFromMicroSeconds(p1.max, (p1.max + event.mainThreadHandling));
        const p3 = Trace.Helpers.Timing.traceWindowFromMicroSeconds(p2.max, (p2.max + event.presentationDelay));
        let sections = [
            { bounds: p1, label: i18nString(UIStrings.inputDelay), showDuration: true },
            { bounds: p2, label: i18nString(UIStrings.processingDuration), showDuration: true },
            { bounds: p3, label: i18nString(UIStrings.presentationDelay), showDuration: true },
        ];
        if (subpartIndex !== -1) {
            sections = [sections[subpartIndex]];
        }
        return [
            {
                type: 'TIMESPAN_BREAKDOWN',
                sections,
                renderLocation: 'BELOW_EVENT',
                entry: event,
            },
        ];
    }
    renderContent() {
        const event = this.model?.longestInteractionEvent;
        if (!event) {
            return html `<div class="insight-section">${i18nString(UIStrings.noInteractions)}</div>`;
        }
        const time = (us) => i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(us));
        // clang-format off
        return html `
      <div class="insight-section">
        ${html `<devtools-performance-table
          .data=${{
            insight: this,
            headers: [i18nString(UIStrings.subpart), i18nString(UIStrings.duration)],
            rows: [
                {
                    values: [i18nString(UIStrings.inputDelay), time(event.inputDelay)],
                    overlays: this.#createOverlaysForSbupart(event, 0),
                },
                {
                    values: [i18nString(UIStrings.processingDuration), time(event.mainThreadHandling)],
                    overlays: this.#createOverlaysForSbupart(event, 1),
                },
                {
                    values: [i18nString(UIStrings.presentationDelay), time(event.presentationDelay)],
                    overlays: this.#createOverlaysForSbupart(event, 2),
                },
            ],
        }}>
        </devtools-performance-table>`}
      </div>`;
        // clang-format on
    }
}
customElements.define('devtools-performance-inp-breakdown', INPBreakdown);
//# sourceMappingURL=INPBreakdown.js.map