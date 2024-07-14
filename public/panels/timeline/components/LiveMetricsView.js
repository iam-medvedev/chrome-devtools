// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
import * as EmulationModel from '../../../models/emulation/emulation.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import { CPUThrottlingSelector } from './CPUThrottlingSelector.js';
import { FieldSettingsDialog } from './FieldSettingsDialog.js';
import liveMetricsViewStyles from './liveMetricsView.css.js';
import { NetworkThrottlingSelector } from './NetworkThrottlingSelector.js';
const { html, nothing, Directives } = LitHtml;
const { until } = Directives;
// TODO: Consolidate our metric rating logic with the trace engine.
const LCP_THRESHOLDS = [2500, 4000];
const CLS_THRESHOLDS = [0.1, 0.25];
const INP_THRESHOLDS = [200, 500];
const DEVICE_OPTION_LIST = ['AUTO', ...CrUXManager.DEVICE_SCOPE_LIST];
export class LiveMetricsView extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-live-metrics-view`;
    #shadow = this.attachShadow({ mode: 'open' });
    #lcpValue;
    #clsValue;
    #inpValue;
    #interactions = [];
    #cruxPageResult;
    #fieldDeviceOption = 'AUTO';
    #fieldPageScope = 'url';
    #toggleRecordAction;
    #recordReloadAction;
    constructor() {
        super();
        this.#toggleRecordAction = UI.ActionRegistry.ActionRegistry.instance().getAction('timeline.toggle-recording');
        this.#recordReloadAction = UI.ActionRegistry.ActionRegistry.instance().getAction('timeline.record-reload');
        this.#render();
    }
    #onMetricStatus(event) {
        this.#lcpValue = event.data.lcp;
        this.#clsValue = event.data.cls;
        this.#inpValue = event.data.inp;
        this.#interactions = event.data.interactions;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #onFieldDataChanged(event) {
        this.#cruxPageResult = event.data;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #onEmulationChanged() {
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    async #refreshFieldDataForCurrentPage() {
        this.#cruxPageResult = await CrUXManager.CrUXManager.instance().getFieldDataForCurrentPage();
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #getFieldMetricData(fieldMetric) {
        const deviceScope = this.#fieldDeviceOption === 'AUTO' ? this.#getAutoDeviceScope() : this.#fieldDeviceOption;
        return this.#cruxPageResult?.[`${this.#fieldPageScope}-${deviceScope}`]?.record.metrics[fieldMetric];
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [liveMetricsViewStyles];
        const liveMetrics = LiveMetrics.LiveMetrics.instance();
        liveMetrics.addEventListener("status" /* LiveMetrics.Events.Status */, this.#onMetricStatus, this);
        const cruxManager = CrUXManager.CrUXManager.instance();
        cruxManager.addEventListener("field-data-changed" /* CrUXManager.Events.FieldDataChanged */, this.#onFieldDataChanged, this);
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        emulationModel.addEventListener("Updated" /* EmulationModel.DeviceModeModel.Events.Updated */, this.#onEmulationChanged, this);
        if (cruxManager.getConfigSetting().get().enabled) {
            void this.#refreshFieldDataForCurrentPage();
        }
        this.#lcpValue = liveMetrics.lcpValue;
        this.#clsValue = liveMetrics.clsValue;
        this.#inpValue = liveMetrics.inpValue;
        this.#interactions = liveMetrics.interactions;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    disconnectedCallback() {
        LiveMetrics.LiveMetrics.instance().removeEventListener("status" /* LiveMetrics.Events.Status */, this.#onMetricStatus, this);
        const cruxManager = CrUXManager.CrUXManager.instance();
        cruxManager.removeEventListener("field-data-changed" /* CrUXManager.Events.FieldDataChanged */, this.#onFieldDataChanged, this);
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        emulationModel.removeEventListener("Updated" /* EmulationModel.DeviceModeModel.Events.Updated */, this.#onEmulationChanged, this);
    }
    #renderMetricValue(value, thresholds, format) {
        if (value === undefined) {
            return html `<span class="metric-value waiting">-<span>`;
        }
        if (typeof value === 'string') {
            value = Number(value);
        }
        const rating = this.#rateMetric(value, thresholds);
        const valueString = format(value);
        return html `
      <span class=${`metric-value ${rating}`}>${valueString}</span>
    `;
    }
    #renderLcpCard() {
        const title = 'Largest Contentful Paint (LCP)';
        const fieldData = this.#getFieldMetricData('largest_contentful_paint');
        return this.#renderMetricCard(title, this.#lcpValue?.value, fieldData?.percentiles.p75, fieldData?.histogram, LCP_THRESHOLDS, v => i18n.TimeUtilities.millisToString(v), this.#lcpValue?.node);
    }
    #renderClsCard() {
        const title = 'Cumulative Layout Shift (CLS)';
        const fieldData = this.#getFieldMetricData('cumulative_layout_shift');
        return this.#renderMetricCard(title, this.#clsValue?.value, fieldData?.percentiles.p75, fieldData?.histogram, CLS_THRESHOLDS, v => v === 0 ? '0' : v.toFixed(2));
    }
    #renderInpCard() {
        const title = 'Interaction to Next Paint (INP)';
        const fieldData = this.#getFieldMetricData('interaction_to_next_paint');
        return this.#renderMetricCard(title, this.#inpValue?.value, fieldData?.percentiles.p75, fieldData?.histogram, INP_THRESHOLDS, v => i18n.TimeUtilities.millisToString(v));
    }
    #densityAsPercent(density) {
        if (density === undefined) {
            density = 0;
        }
        const percent = Math.round(density * 100);
        return `${percent}%`;
    }
    #renderFieldHistogram(histogram, thresholds, format) {
        const goodPercent = this.#densityAsPercent(histogram[0].density);
        const needsImprovementPercent = this.#densityAsPercent(histogram[1].density);
        const poorPercent = this.#densityAsPercent(histogram[2].density);
        return html `
      <div class="field-data-histogram">
        <span class="histogram-label">Good <span class="histogram-range">(&le;${format(thresholds[0])})</span></span>
        <span class="histogram-bar good-bg" style="width: ${goodPercent}"></span>
        <span>${goodPercent}</span>
        <span class="histogram-label">Needs improvement <span class="histogram-range">(${format(thresholds[0])}-${format(thresholds[1])})</span></span>
        <span class="histogram-bar needs-improvement-bg" style="width: ${needsImprovementPercent}"></span>
        <span>${needsImprovementPercent}</span>
        <span class="histogram-label">Poor <span class="histogram-range">(&gt;${format(thresholds[1])})</span></span>
        <span class="histogram-bar poor-bg" style="width: ${poorPercent}"></span>
        <span>${poorPercent}</span>
      </div>
    `;
    }
    #rateMetric(value, thresholds) {
        if (value <= thresholds[0]) {
            return 'good';
        }
        if (value <= thresholds[1]) {
            return 'needs-improvement';
        }
        return 'poor';
    }
    #renderMetricCard(title, localValue, fieldValue, histogram, thresholds, format, node) {
        // clang-format off
        return html `
      <div class="card">
        <div class="card-title">${title}</div>
        <div class="card-metric-values">
          <span class="local-value">${this.#renderMetricValue(localValue, thresholds, format)}</span>
          <span class="field-value">${this.#renderMetricValue(fieldValue, thresholds, format)}</span>
          <span class="metric-value-label">Local</span>
          <span class="metric-value-label">Field 75th Percentile</span>
        </div>
        <hr class="divider">
        ${histogram ? this.#renderFieldHistogram(histogram, thresholds, format) : nothing}
        <div class="metric-card-element">
          ${node ? html `
              <div class="card-section-title">Related node</div>
              <div>${until(Common.Linkifier.Linkifier.linkify(node))}</div>`
            : nothing}
        </div>
      </div>
    `;
        // clang-format on
    }
    #renderRecordAction(action) {
        function onClick() {
            void action.execute();
        }
        // clang-format off
        return html `
      <div class="record-action">
        <${Buttons.Button.Button.litTagName} @click=${onClick} .data=${{
            variant: "text" /* Buttons.Button.Variant.TEXT */,
            size: "REGULAR" /* Buttons.Button.Size.REGULAR */,
            iconName: action.icon(),
            title: action.title(),
            jslogContext: action.id(),
        }}>
          ${action.title()}
        </${Buttons.Button.Button.litTagName}>
        <span class="shortcut-label">${UI.ShortcutRegistry.ShortcutRegistry.instance().shortcutTitleForAction(action.id())}</span>
      </div>
    `;
        // clang-format on
    }
    #renderThrottlingSettings() {
        return html `
      <div class="card-title">Throttling</div>
      <span class="live-metrics-option">CPU: <${CPUThrottlingSelector.litTagName}></${CPUThrottlingSelector.litTagName}></span>
      <span class="live-metrics-option">Network: <${NetworkThrottlingSelector.litTagName}></${NetworkThrottlingSelector.litTagName}></span>
    `;
    }
    #getPageScopeLabel(pageScope) {
        const baseLabel = pageScope === 'url' ? 'URL' : 'Origin';
        const key = this.#cruxPageResult?.[`${pageScope}-ALL`]?.record.key[pageScope];
        if (key) {
            return `${baseLabel} (${key})`;
        }
        return `${baseLabel} - No data`;
    }
    #onPageScopeMenuItemSelected(event) {
        if (event.itemValue === 'url') {
            this.#fieldPageScope = 'url';
        }
        else {
            this.#fieldPageScope = 'origin';
        }
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #renderPageScopeSetting() {
        if (!CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled) {
            return LitHtml.nothing;
        }
        const urlLabel = this.#getPageScopeLabel('url');
        const originLabel = this.#getPageScopeLabel('origin');
        return html `
      <span id="page-scope-select" class="live-metrics-option">
        URL/Origin:
        <${Menus.SelectMenu.SelectMenu.litTagName}
          @selectmenuselected=${this.#onPageScopeMenuItemSelected}
          .showDivider=${true}
          .showArrow=${true}
          .sideButton=${false}
          .showSelectedItem=${true}
          .showConnector=${false}
          .buttonTitle=${this.#fieldPageScope === 'url' ? urlLabel : originLabel}
        >
          <${Menus.Menu.MenuItem.litTagName}
            .value=${'url'}
            .selected=${this.#fieldPageScope === 'url'}
          >
            ${urlLabel}
          </${Menus.Menu.MenuItem.litTagName}>
          <${Menus.Menu.MenuItem.litTagName}
            .value=${'origin'}
            .selected=${this.#fieldPageScope === 'origin'}
          >
            ${originLabel}
          </${Menus.Menu.MenuItem.litTagName}>
        </${Menus.SelectMenu.SelectMenu.litTagName}>
      </span>
    `;
    }
    #getDeviceScopeDisplayName(deviceScope) {
        switch (deviceScope) {
            case 'ALL':
                return 'All devices';
            case 'DESKTOP':
                return 'Desktop';
            case 'PHONE':
                return 'Mobile';
            case 'TABLET':
                return 'Tablet';
        }
    }
    #getAutoDeviceScope() {
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        if (emulationModel.device()?.mobile()) {
            if (this.#cruxPageResult?.[`${this.#fieldPageScope}-PHONE`]) {
                return 'PHONE';
            }
            return 'ALL';
        }
        if (this.#cruxPageResult?.[`${this.#fieldPageScope}-DESKTOP`]) {
            return 'DESKTOP';
        }
        return 'ALL';
    }
    #getLabelForDeviceOption(deviceOption) {
        const deviceScope = deviceOption === 'AUTO' ? this.#getAutoDeviceScope() : deviceOption;
        const deviceScopeLabel = this.#getDeviceScopeDisplayName(deviceScope);
        const baseLabel = deviceOption === 'AUTO' ? `Auto (${deviceScopeLabel})` : deviceScopeLabel;
        if (!this.#cruxPageResult) {
            return `${baseLabel} - Loading…`;
        }
        const result = this.#cruxPageResult[`${this.#fieldPageScope}-${deviceScope}`];
        if (!result) {
            return `${baseLabel} - No data`;
        }
        return baseLabel;
    }
    #onDeviceOptionMenuItemSelected(event) {
        this.#fieldDeviceOption = event.itemValue;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #renderDeviceScopeSetting() {
        if (!CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled) {
            return LitHtml.nothing;
        }
        // If there is no data at all we should force users to try adjusting the page scope
        // before coming back to this option.
        const shouldDisable = !this.#cruxPageResult?.[`${this.#fieldPageScope}-ALL`];
        // clang-format off
        return html `
      <span id="device-scope-select" class="live-metrics-option">
        Device type:
        <${Menus.SelectMenu.SelectMenu.litTagName}
          @selectmenuselected=${this.#onDeviceOptionMenuItemSelected}
          .showDivider=${true}
          .showArrow=${true}
          .sideButton=${false}
          .showSelectedItem=${true}
          .showConnector=${false}
          .buttonTitle=${this.#getLabelForDeviceOption(this.#fieldDeviceOption)}
          .disabled=${shouldDisable}
        >
          ${DEVICE_OPTION_LIST.map(deviceOption => {
            return html `
              <${Menus.Menu.MenuItem.litTagName}
                .value=${deviceOption}
                .selected=${this.#fieldDeviceOption === deviceOption}
              >
                ${this.#getLabelForDeviceOption(deviceOption)}
              </${Menus.Menu.MenuItem.litTagName}>
            `;
        })}
        </${Menus.SelectMenu.SelectMenu.litTagName}>
      </span>
    `;
        // clang-format on
    }
    #render = () => {
        // clang-format off
        const output = html `
      <div class="container">
        <div class="live-metrics-view">
          <div class="live-metrics" slot="main">
            <h3>Local and Field Metrics</h3>
            <div class="metric-cards">
              <div id="lcp">
                ${this.#renderLcpCard()}
              </div>
              <div id="cls">
                ${this.#renderClsCard()}
              </div>
              <div id="inp">
                ${this.#renderInpCard()}
              </div>
            </div>
            <h3>Interactions</h3>
            <ol class="interactions-list">
              ${this.#interactions.map((interaction, index) => html `
                ${index === 0 ? html `<hr class="divider">` : nothing}
                <li class="interaction">
                  <span class="interaction-type">${interaction.interactionType}</span>
                  <span class="interaction-node">${interaction.node && until(Common.Linkifier.Linkifier.linkify(interaction.node))}</span>
                  <span class="interaction-duration">
                    ${this.#renderMetricValue(interaction.duration, INP_THRESHOLDS, v => i18n.TimeUtilities.millisToString(v))}
                  </span>
                </li>
                <hr class="divider">
              `)}
            </ol>
          </div>
          <div class="next-steps" slot="sidebar">
            <h3>Next steps</h3>
            <div id="field-setup" class="card">
              <div class="card-title">Field data</div>
              ${this.#renderPageScopeSetting()}
              ${this.#renderDeviceScopeSetting()}
              <${FieldSettingsDialog.litTagName}></${FieldSettingsDialog.litTagName}>
            </div>
            <div id="throttling" class="card">
              ${this.#renderThrottlingSettings()}
            </div>
            <div id="record" class="card">
              ${this.#renderRecordAction(this.#toggleRecordAction)}
            </div>
            <div id="record-page-load" class="card">
              ${this.#renderRecordAction(this.#recordReloadAction)}
            </div>
          </div>
        </div>
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    };
}
customElements.define('devtools-live-metrics-view', LiveMetricsView);
//# sourceMappingURL=LiveMetricsView.js.map