// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import './Table.js';
import '../../../../ui/components/linkifier/linkifier.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import * as Platform from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
const { UIStrings, i18nString } = Trace.Insights.Models.SlowCSSSelector;
const { html } = Lit;
export class SlowCSSSelector extends BaseInsightComponent {
    static litTagName = Lit.StaticHtml.literal `devtools-performance-slow-css-selector`;
    internalName = 'slow-css-selector';
    #selectorLocations = new Map();
    createOverlays() {
        return [];
    }
    async toSourceFileLocation(cssModel, selector) {
        if (!cssModel) {
            return undefined;
        }
        const styleSheetHeader = cssModel.styleSheetHeaderForId(selector.style_sheet_id);
        if (!styleSheetHeader || !styleSheetHeader.resourceURL()) {
            return undefined;
        }
        // get the locations from cache if available
        const key = JSON.stringify({ selectorText: selector.selector, styleSheetId: selector.style_sheet_id });
        let ranges = this.#selectorLocations.get(key);
        if (!ranges) {
            const result = await cssModel.agent.invoke_getLocationForSelector({ selectorText: selector.selector, styleSheetId: selector.style_sheet_id });
            if (result.getError() || !result.ranges) {
                return undefined;
            }
            ranges = result.ranges;
            this.#selectorLocations.set(key, ranges);
        }
        const locations = ranges.map((range, itemIndex) => {
            return {
                url: styleSheetHeader.resourceURL(),
                lineNumber: range.startLine,
                columnNumber: range.startColumn,
                linkText: `[${itemIndex + 1}]`,
                title: `${styleSheetHeader.id} line ${range.startLine + 1}:${range.startColumn + 1}`,
            };
        });
        return locations;
    }
    async getSelectorLinks(cssModel, selector) {
        if (!cssModel) {
            return Lit.nothing;
        }
        if (!selector.style_sheet_id) {
            return Lit.nothing;
        }
        const locations = await this.toSourceFileLocation(cssModel, selector);
        if (!locations) {
            return Lit.nothing;
        }
        const links = html `
    ${locations.map((location, itemIndex) => {
            const divider = itemIndex !== locations.length - 1 ? ', ' : '';
            return html `<devtools-linkifier .data=${location}></devtools-linkifier>${divider}`;
        })}`;
        return links;
    }
    renderContent() {
        if (!this.model) {
            return Lit.nothing;
        }
        const target = SDK.TargetManager.TargetManager.instance().primaryPageTarget();
        const cssModel = target?.model(SDK.CSSModel.CSSModel);
        const time = (us) => i18n.TimeUtilities.millisToString(Platform.Timing.microSecondsToMilliSeconds(us));
        if (!this.model.topMatchAttempts.length && !this.model.topElapsedMs.length) {
            return html `<div class="insight-section">${i18nString(UIStrings.enableSelectorData)}</div>`;
        }
        // clang-format off
        const sections = [html `
      <div class="insight-section">
        <devtools-performance-table
          .data=${{
                insight: this,
                headers: [i18nString(UIStrings.total), ''],
                rows: [
                    { values: [i18nString(UIStrings.elapsed), i18n.TimeUtilities.millisToString(this.model.totalElapsedMs)] },
                    { values: [i18nString(UIStrings.matchAttempts), this.model.totalMatchAttempts] },
                    { values: [i18nString(UIStrings.matchCount), this.model.totalMatchCount] },
                ],
            }}>
        </devtools-performance-table>
      </div>
    `];
        // clang-format on
        if (this.model.topElapsedMs.length) {
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.elapsed)],
                rows: this.model.topElapsedMs.map(selector => {
                    return {
                        values: [
                            html `${selector.selector} ${Lit.Directives.until(this.getSelectorLinks(cssModel, selector))}`,
                            time(Trace.Types.Timing.Micro(selector['elapsed (us)']))
                        ],
                    };
                }),
            }}>
          </devtools-performance-table>
        </div>
      `);
            // clang-format on
        }
        if (this.model.topMatchAttempts.length) {
            // clang-format off
            sections.push(html `
        <div class="insight-section">
          <devtools-performance-table
            .data=${{
                insight: this,
                headers: [i18nString(UIStrings.topSelectors), i18nString(UIStrings.matchAttempts)],
                rows: this.model.topMatchAttempts.map(selector => {
                    return {
                        values: [
                            html `${selector.selector} ${Lit.Directives.until(this.getSelectorLinks(cssModel, selector))}`,
                            selector['match_attempts']
                        ],
                    };
                }),
            }}>
          </devtools-performance-table>
        </div>
      `);
            // clang-format on
        }
        return html `${sections}`;
    }
}
customElements.define('devtools-performance-slow-css-selector', SlowCSSSelector);
//# sourceMappingURL=SlowCSSSelector.js.map