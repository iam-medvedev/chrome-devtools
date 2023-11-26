// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../../core/i18n/i18n.js';
import { assertNotNullOrUndefined } from '../../../../core/platform/platform.js';
import * as DataGrid from '../../../../ui/components/data_grid/data_grid.js';
import * as ComponentHelpers from '../../../../ui/components/helpers/helpers.js';
import * as LegacyWrapper from '../../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import preloadingGridStyles from './preloadingGrid.css.js';
const UIStrings = {
    /**
     *@description The name of the HTTP request header.
     */
    headerName: 'Header name',
    /**
     *@description The value of the HTTP request header in initial navigation.
     */
    initialNavigationValue: 'Value in initial navigation',
    /**
     *@description The value of the HTTP request header in activation navigation.
     */
    activationNavigationValue: 'Value in activation navigation',
    /**
     *@description The string to indicate the value of the header is missing.
     */
    missing: '(missing)',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/preloading/components/PreloadingMismatchedHeadersGrid.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html } = LitHtml;
export class PreloadingMismatchedHeadersGrid extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    static litTagName = LitHtml.literal `devtools-resources-preloading-mismatched-headers-grid`;
    #shadow = this.attachShadow({ mode: 'open' });
    #data = null;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [preloadingGridStyles];
        this.#render();
    }
    set data(data) {
        if (data.mismatchedHeaders === null) {
            return;
        }
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
                    id: 'headerName',
                    title: i18nString(UIStrings.headerName),
                    widthWeighting: 30,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'initialValue',
                    title: i18nString(UIStrings.initialNavigationValue),
                    widthWeighting: 30,
                    hideable: false,
                    visible: true,
                    sortable: true,
                },
                {
                    id: 'activationValue',
                    title: i18nString(UIStrings.activationNavigationValue),
                    widthWeighting: 30,
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
          <${DataGrid.DataGridController.DataGridController.litTagName} .data=${reportsGridData}>
          </${DataGrid.DataGridController.DataGridController.litTagName}>
        </div>
      `, this.#shadow, { host: this });
        // clang-format on
    }
    #buildReportRows() {
        assertNotNullOrUndefined(this.#data);
        assertNotNullOrUndefined(this.#data.mismatchedHeaders);
        return this.#data.mismatchedHeaders.map(mismatchedHeaders => ({
            cells: [
                {
                    columnId: 'headerName',
                    value: mismatchedHeaders.headerName,
                },
                {
                    columnId: 'initialValue',
                    value: mismatchedHeaders.initialValue ?? i18nString(UIStrings.missing),
                },
                {
                    columnId: 'activationValue',
                    value: mismatchedHeaders.activationValue ?? i18nString(UIStrings.missing),
                },
            ],
        }));
    }
}
ComponentHelpers.CustomElements.defineComponent('devtools-resources-preloading-mismatched-headers-grid', PreloadingMismatchedHeadersGrid);
//# sourceMappingURL=PreloadingMismatchedHeadersGrid.js.map