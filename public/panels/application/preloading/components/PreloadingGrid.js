// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../../ui/components/data_grid/data_grid.js';
import '../../../../ui/components/icon_button/icon_button.js';
import * as Common from '../../../../core/common/common.js';
import * as i18n from '../../../../core/i18n/i18n.js';
import { assertNotNullOrUndefined } from '../../../../core/platform/platform.js';
import * as SDK from '../../../../core/sdk/sdk.js';
import * as LegacyWrapper from '../../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import preloadingGridStyles from './preloadingGrid.css.js';
import * as PreloadingString from './PreloadingString.js';
const UIStrings = {
    /**
     *@description Column header: Action of preloading (prefetch/prerender)
     */
    action: 'Action',
    /**
     *@description Column header: A rule set of preloading
     */
    ruleSet: 'Rule set',
    /**
     *@description Column header: Status of preloading attempt
     */
    status: 'Status',
    /**
     *@description Status: Prerender failed, but prefetch is available
     */
    prefetchFallbackReady: 'Prefetch fallback ready',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/preloading/components/PreloadingGrid.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html } = LitHtml;
// Grid component to show prerendering attempts.
export class PreloadingGrid extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #shadow = this.attachShadow({ mode: 'open' });
    #data = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [preloadingGridStyles];
        this.#render();
    }
    update(data) {
        this.#data = data;
        this.#render();
    }
    #render() {
        if (this.#data === null) {
            return;
        }
        const reportsGridData = {
            columns: [
                {
                    id: 'url',
                    title: i18n.i18n.lockedString('URL'),
                    widthWeighting: 40,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'action',
                    title: i18nString(UIStrings.action),
                    widthWeighting: 15,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'rule-set',
                    title: i18nString(UIStrings.ruleSet),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'status',
                    title: i18nString(UIStrings.status),
                    widthWeighting: 40,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
            ],
            rows: this.#buildReportRows(),
            striped: true,
        };
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      <div class="preloading-container">
        <devtools-data-grid-controller .data=${reportsGridData}></devtools-data-grid-controller>
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
    #buildReportRows() {
        function statusRenderer(statusString, pipeline) {
            function render(color, iconName, message) {
                const styleColor = {
                    color: `var(${color})`,
                };
                let icon;
                if (iconName !== null) {
                    // Disabled until https://crbug.com/1079231 is fixed.
                    // clang-format off
                    icon = html `
            <devtools-icon
              .data=${{
                        iconName,
                        width: '16px',
                        height: '16px',
                        ...styleColor,
                    }}
              style=${LitHtml.Directives.styleMap({
                        'vertical-align': 'sub',
                    })}
            >
            </devtools-icon>
          `;
                    // clang-format on
                }
                // Disabled until https://crbug.com/1079231 is fixed.
                // clang-format off
                return html `
          <div style=${LitHtml.Directives.styleMap(styleColor)}>
            ${icon} ${message}
          </div>
        `;
                // clang-format on
            }
            if (pipeline.getPrerender()?.status === "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */ &&
                (pipeline.getPrefetch()?.status === "Ready" /* SDK.PreloadingModel.PreloadingStatus.READY */ ||
                    pipeline.getPrefetch()?.status === "Success" /* SDK.PreloadingModel.PreloadingStatus.SUCCESS */)) {
                return render('--sys-color-orange-bright', 'warning-filled', i18nString(UIStrings.prefetchFallbackReady));
            }
            if (pipeline.getOriginallyTriggered().status === "Failure" /* SDK.PreloadingModel.PreloadingStatus.FAILURE */) {
                return render('--sys-color-error', 'cross-circle-filled', statusString);
            }
            return render('--sys-color-on-surface', null, statusString);
        }
        assertNotNullOrUndefined(this.#data);
        const pageURL = this.#data.pageURL;
        const securityOrigin = pageURL === '' ? null : (new Common.ParsedURL.ParsedURL(pageURL)).securityOrigin();
        return this.#data.rows.map(row => {
            const attempt = row.pipeline.getOriginallyTriggered();
            return {
                cells: [
                    { columnId: 'id', value: row.id },
                    {
                        columnId: 'url',
                        value: this.#urlShort(row, securityOrigin),
                        title: attempt.key.url,
                    },
                    { columnId: 'action', value: PreloadingString.capitalizedAction(attempt.action) },
                    {
                        columnId: 'rule-set',
                        value: row.ruleSets.length === 0 ? '' : PreloadingString.ruleSetLocationShort(row.ruleSets[0], pageURL),
                    },
                    {
                        columnId: 'status',
                        value: PreloadingString.composedStatus(attempt),
                        renderer: status => statusRenderer(status, row.pipeline),
                    },
                ],
            };
        });
    }
    // Shorten URL if a preloading attempt is same-origin.
    #urlShort(row, securityOrigin) {
        const url = row.pipeline.getOriginallyTriggered().key.url;
        return securityOrigin && url.startsWith(securityOrigin) ? url.slice(securityOrigin.length) : url;
    }
}
customElements.define('devtools-resources-preloading-grid', PreloadingGrid);
//# sourceMappingURL=PreloadingGrid.js.map