// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/data_grid/data_grid.js';
import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/legacy/legacy.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Root from '../../../core/root/root.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import reportingApiGridStyles from './reportingApiGrid.css.js';
const UIStrings = {
    /**
     *@description Placeholder text when there are no Reporting API reports.
     *(https://developers.google.com/web/updates/2018/09/reportingapi#sending)
     */
    noReportsToDisplay: 'No reports to display',
    /**
     *@description Column header for a table displaying Reporting API reports.
     *Status is one of 'Queued', 'Pending', 'MarkedForRemoval' or 'Success'.
     */
    status: 'Status',
    /**
     *@description Column header for a table displaying Reporting API reports.
     *Destination is the name of the endpoint the report is being sent to.
     */
    destination: 'Destination',
    /**
     *@description Column header for a table displaying Reporting API reports.
     *The column contains the timestamp of when a report was generated.
     */
    generatedAt: 'Generated at',
};
const str_ = i18n.i18n.registerUIStrings('panels/application/components/ReportsGrid.ts', UIStrings);
export const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const { render, html } = LitHtml;
export class ReportsGridStatusHeader extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [reportingApiGridStyles];
        this.#render();
    }
    #render() {
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      ${i18nString(UIStrings.status)}
      <x-link href="https://web.dev/reporting-api/#report-status"
      jslog=${VisualLogging.link('report-status').track({ click: true })}>
        <devtools-icon class="inline-icon" .data=${{
            iconName: 'help',
            color: 'var(--icon-link)',
            width: '16px',
            height: '16px',
        }}></devtools-icon>
      </x-link>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
export class ReportsGrid extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #reports = [];
    #protocolMonitorExperimentEnabled = false;
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [reportingApiGridStyles];
        this.#protocolMonitorExperimentEnabled = Root.Runtime.experiments.isEnabled('protocol-monitor');
        this.#render();
    }
    set data(data) {
        this.#reports = data.reports;
        this.#render();
    }
    #render() {
        const reportsGridData = {
            columns: [
                {
                    id: 'url',
                    title: i18n.i18n.lockedString('URL'),
                    widthWeighting: 30,
                    hideable: false,
                    visible: true,
                },
                {
                    id: 'type',
                    title: i18n.i18n.lockedString('Type'),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                },
                {
                    id: 'status',
                    title: i18nString(UIStrings.status),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                    titleElement: html `
          <devtools-resources-reports-grid-status-header></devtools-resources-reports-grid-status-header>
          `,
                },
                {
                    id: 'destination',
                    title: i18nString(UIStrings.destination),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                },
                {
                    id: 'timestamp',
                    title: i18nString(UIStrings.generatedAt),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                },
                {
                    id: 'body',
                    title: i18n.i18n.lockedString('Body'),
                    widthWeighting: 20,
                    hideable: false,
                    visible: true,
                },
            ],
            rows: this.#buildReportRows(),
        };
        if (this.#protocolMonitorExperimentEnabled) {
            reportsGridData.columns.unshift({ id: 'id', title: 'ID', widthWeighting: 30, hideable: false, visible: true });
        }
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        render(html `
      <div class="reporting-container" jslog=${VisualLogging.section('reports')}>
        <div class="reporting-header">${i18n.i18n.lockedString('Reports')}</div>
        ${this.#reports.length > 0 ? html `
          <devtools-data-grid-controller .data=${reportsGridData}>
          </devtools-data-grid-controller>
        ` : html `
          <div class="reporting-placeholder">
            <div>${i18nString(UIStrings.noReportsToDisplay)}</div>
          </div>
        `}
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
    #buildReportRows() {
        return this.#reports.map(report => ({
            cells: [
                { columnId: 'id', value: report.id },
                { columnId: 'url', value: report.initiatorUrl },
                { columnId: 'type', value: report.type },
                { columnId: 'status', value: report.status },
                { columnId: 'destination', value: report.destination },
                { columnId: 'timestamp', value: new Date(report.timestamp * 1000).toLocaleString() },
                { columnId: 'body', value: JSON.stringify(report.body) },
            ],
        }));
    }
}
customElements.define('devtools-resources-reports-grid-status-header', ReportsGridStatusHeader);
customElements.define('devtools-resources-reports-grid', ReportsGrid);
//# sourceMappingURL=ReportsGrid.js.map