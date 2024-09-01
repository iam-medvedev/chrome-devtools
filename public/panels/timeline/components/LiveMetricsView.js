// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
import * as EmulationModel from '../../../models/emulation/emulation.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as Settings from '../../../ui/components/settings/settings.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as MobileThrottling from '../../mobile_throttling/mobile_throttling.js';
import { CPUThrottlingSelector } from './CPUThrottlingSelector.js';
import { FieldSettingsDialog } from './FieldSettingsDialog.js';
import liveMetricsViewStyles from './liveMetricsView.css.js';
import { MetricCard } from './MetricCard.js';
import metricValueStyles from './metricValueStyles.css.js';
import { NetworkThrottlingSelector } from './NetworkThrottlingSelector.js';
import { INP_THRESHOLDS, renderMetricValue } from './Utils.js';
const { html, nothing, Directives } = LitHtml;
const { until } = Directives;
const DEVICE_OPTION_LIST = ['AUTO', ...CrUXManager.DEVICE_SCOPE_LIST];
const RTT_COMPARISON_THRESHOLD = 200;
const RTT_MINIMUM = 60;
const UIStrings = {
    /**
     * @description Title of a view that shows performance metrics from the local environment and field metrics collected from real users in the field.
     */
    localAndFieldMetrics: 'Local and field metrics',
    /**
     * @description Title of a view that shows performance metrics from the local environment.
     */
    localMetrics: 'Local metrics',
    /**
     * @description Title of a section that lists user interactions.
     */
    interactions: 'Interactions',
    /**
     * @description Title of a sidebar section that shows options for the user to take after using the main view.
     */
    nextSteps: 'Next steps',
    /**
     * @description Title of a section that shows options for how real user data in the field should be fetched.
     */
    fieldData: 'Field data',
    /**
     * @description Title of a section that shows recording settings.
     */
    recordingSettings: 'Recording settings',
    /**
     * @description Label for an select box that selects which device type field data be shown for (e.g. desktop/mobile/all devices/etc).
     * @example {Mobile} PH1
     */
    showFieldDataForDevice: 'Show field data for device type: {PH1}',
    /**
     * @description Label for an select box that selects which device type field data be shown for (e.g. desktop/mobile/all devices/etc).
     * @example {Mobile} PH1
     */
    device: 'Device: {PH1}',
    /**
     * @description Label for an option to select all device form factors.
     */
    allDevices: 'All devices',
    /**
     * @description Label for an option to select the desktop form factor.
     */
    desktop: 'Desktop',
    /**
     * @description Label for an option to select the mobile form factor.
     */
    mobile: 'Mobile',
    /**
     * @description Label for an option to select the tablet form factor.
     */
    tablet: 'Tablet',
    /**
     * @description Label for an option to to automatically select the form factor. The automatic selection will be displayed in PH1.
     * @example {Desktop} PH1
     */
    auto: 'Auto ({PH1})',
    /**
     * @description Label for an option that is loading.
     * @example {Desktop} PH1
     */
    loadingOption: '{PH1} - Loading…',
    /**
     * @description Label for an option that does not have enough data and the user should ignore.
     * @example {Desktop} PH1
     */
    needsDataOption: '{PH1} - No data',
    /**
     * @description Label for an option that selects the page's specific URL as opposed to it's entire origin/domain.
     */
    urlOption: 'URL',
    /**
     * @description Label for an option that selects the page's entire origin/domain as opposed to it's specific URL.
     */
    originOption: 'Origin',
    /**
     * @description Label for an option that selects the page's specific URL as opposed to it's entire origin/domain.
     * @example {https://example.com/} PH1
     */
    urlOptionWithKey: 'URL: {PH1}',
    /**
     * @description Label for an option that selects the page's entire origin/domain as opposed to it's specific URL.
     * @example {https://example.com} PH1
     */
    originOptionWithKey: 'Origin: {PH1}',
    /**
     * @description Label for an combo-box that indicates if field data should be taken from the page's URL or it's origin/domain.
     * @example {Origin: https://example.com} PH1
     */
    showFieldDataForPage: 'Show field data for {PH1}',
    /**
     * @description Text block recommendation instructing the user to disable network throttling to best match real user network data.
     */
    tryDisablingThrottling: 'Try disabling network throttling to approximate the network latency measured by real users.',
    /**
     * @description Text block recommendation instructing the user to enable a throttling preset to best match real user network data.
     * @example {Slow 4G} PH1
     */
    tryUsingThrottling: 'Try using {PH1} network throttling to approximate real-user network latencies measured on this page by the Chrome UX Report.',
    /**
     * @description Text block recommendation instructing the user to emulate a mobile device to match most real users.
     */
    mostUsersMobile: 'A majority of users are on mobile. Try simulating a mobile device that matches real users.',
    /**
     * @description Text block recommendation instructing the user to emulate different desktop window sizes to match most real users.
     */
    mostUsersDesktop: 'A majority of users are on desktop. Try simulating a desktop window size that matches real users.',
    /**
     * @description Text block that becomes a link to documentation about how to simulate different mobile and desktop devices.
     */
    learnMoreDevices: 'Learn more about simulating different devices.',
    /**
     * @description Text label for a checkbox that controls if the network cache is disabled.
     */
    disableNetworkCache: 'Disable network cache',
    /**
     * @description Text label for a link to the Largest Contentful Paint (LCP) related page element. This element represents the largest content on the page. "LCP" should not be translated.
     */
    lcpElement: 'LCP Element',
    /**
     * @description Label for a a range of dates that represents the period of time a set of field data is collected from.
     */
    collectionPeriod: 'Collection period:',
    /**
     * @description Text showing a range of dates meant to represent a period of time.
     * @example {Oct 1, 2024} PH1
     * @example {Nov 1, 2024} PH2
     */
    dateRange: '{PH1} - {PH2}',
    /**
     * @description Text block telling the user to see how performance metrics measured on their local computer compare to data collected from real users. PH1 will be a link to more information about the Chrome UX Report and the link text will be untranslated because it is a product name.
     * @example {Chrome UX Report} PH1
     */
    seeHowYourLocalMetricsCompare: 'See how your local metrics compare to real user data in the {PH1}.',
    /**
     * @description Text block explaining that local metrics are collected from the local environment used to load the page being tested. PH1 will be a link with text that will be translated separately.
     * @example {local metrics} PH1
     */
    theLocalMetricsAre: 'The {PH1} are captured from the current page using your network connection and device.',
    /**
     * @description Link text that is inserted in another translated text block that describes performance metrics measured in the developers local environment.
     */
    localMetricsLink: 'local metrics',
    /**
     * @description Text block explaining that field metrics are measured by real users using many different connections and hardware over a 28 period. PH1 will be a link with text that will be translated separately.
     * @example {field data} PH1
     */
    theFieldMetricsAre: 'The {PH1} is measured by real users using many different network connections and devices.',
    /**
     * @description Link text that is inserted in another translated text block that describes performance data measured by real users in the field.
     */
    fieldDataLink: 'field data',
    /**
     * @description Tooltip text explaining that this user interaction was ignored when calculating the Interaction to Next Paint (INP) metric because the interaction delay fell beyond the 98th percentile of interaction delays on this page. "INP" is an acronym and should not be translated.
     */
    interactionExcluded: 'INP is calculated using the 98th percentile of interaction delays, so some interaction delays may be larger than the INP value.',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/components/LiveMetricsView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class LiveMetricsView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
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
    #tooltipContainerEl;
    #interactionsListEl;
    #interactionsListScrolling = false;
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
        const hasNewInteraction = this.#interactions.length < event.data.interactions.length;
        this.#interactions = [...event.data.interactions];
        const renderPromise = ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
        const listEl = this.#interactionsListEl;
        if (!hasNewInteraction || !listEl) {
            return;
        }
        const isAtBottom = Math.abs(listEl.scrollHeight - listEl.clientHeight - listEl.scrollTop) <= 1;
        // We shouldn't scroll to the bottom if the list wasn't already at the bottom.
        // However, if a new item appears while the animation for a previous item is still going,
        // then we should "finish" the scroll by sending another scroll command even if the scroll position
        // the element hasn't scrolled all the way to the bottom yet.
        if (!isAtBottom && !this.#interactionsListScrolling) {
            return;
        }
        void renderPromise.then(() => {
            requestAnimationFrame(() => {
                this.#interactionsListScrolling = true;
                listEl.addEventListener('scrollend', () => {
                    this.#interactionsListScrolling = false;
                }, { once: true });
                listEl.scrollTo({ top: listEl.scrollHeight, behavior: 'smooth' });
            });
        });
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
    #getSelectedFieldResponse() {
        const deviceScope = this.#fieldDeviceOption === 'AUTO' ? this.#getAutoDeviceScope() : this.#fieldDeviceOption;
        return this.#cruxPageResult?.[`${this.#fieldPageScope}-${deviceScope}`];
    }
    #getFieldMetricData(fieldMetric) {
        return this.#getSelectedFieldResponse()?.record.metrics[fieldMetric];
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [liveMetricsViewStyles, metricValueStyles];
        const liveMetrics = LiveMetrics.LiveMetrics.instance();
        liveMetrics.addEventListener("status" /* LiveMetrics.Events.STATUS */, this.#onMetricStatus, this);
        const cruxManager = CrUXManager.CrUXManager.instance();
        cruxManager.addEventListener("field-data-changed" /* CrUXManager.Events.FIELD_DATA_CHANGED */, this.#onFieldDataChanged, this);
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        emulationModel.addEventListener("Updated" /* EmulationModel.DeviceModeModel.Events.UPDATED */, this.#onEmulationChanged, this);
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
        LiveMetrics.LiveMetrics.instance().removeEventListener("status" /* LiveMetrics.Events.STATUS */, this.#onMetricStatus, this);
        const cruxManager = CrUXManager.CrUXManager.instance();
        cruxManager.removeEventListener("field-data-changed" /* CrUXManager.Events.FIELD_DATA_CHANGED */, this.#onFieldDataChanged, this);
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        emulationModel.removeEventListener("Updated" /* EmulationModel.DeviceModeModel.Events.UPDATED */, this.#onEmulationChanged, this);
    }
    #renderLcpCard() {
        const fieldData = this.#getFieldMetricData('largest_contentful_paint');
        const node = this.#lcpValue?.node;
        // clang-format off
        return html `
      <${MetricCard.litTagName} .data=${{
            metric: 'LCP',
            localValue: this.#lcpValue?.value,
            fieldValue: fieldData?.percentiles?.p75,
            histogram: fieldData?.histogram,
            tooltipContainer: this.#tooltipContainerEl,
        }}>
        ${node ? html `
            <div class="related-element-info" slot="extra-info">
              <span class="related-element-label">${i18nString(UIStrings.lcpElement)}</span>
              <span class="related-element-link">${until(Common.Linkifier.Linkifier.linkify(node))}</span>
            </div>
          `
            : nothing}
      </${MetricCard.litTagName}>
    `;
        // clang-format on
    }
    #renderClsCard() {
        const fieldData = this.#getFieldMetricData('cumulative_layout_shift');
        // clang-format off
        return html `
      <${MetricCard.litTagName} .data=${{
            metric: 'CLS',
            localValue: this.#clsValue?.value,
            fieldValue: fieldData?.percentiles?.p75,
            histogram: fieldData?.histogram,
            tooltipContainer: this.#tooltipContainerEl,
        }}>
      </${MetricCard.litTagName}>
    `;
        // clang-format on
    }
    #renderInpCard() {
        const fieldData = this.#getFieldMetricData('interaction_to_next_paint');
        // clang-format off
        return html `
      <${MetricCard.litTagName} .data=${{
            metric: 'INP',
            localValue: this.#inpValue?.value,
            fieldValue: fieldData?.percentiles?.p75,
            histogram: fieldData?.histogram,
            tooltipContainer: this.#tooltipContainerEl,
        }}>
      </${MetricCard.litTagName}>
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
    #getClosestNetworkPreset() {
        const response = this.#getFieldMetricData('round_trip_time');
        if (!response?.percentiles) {
            return null;
        }
        const rtt = Number(response.percentiles.p75);
        if (!Number.isFinite(rtt)) {
            return null;
        }
        if (rtt < RTT_MINIMUM) {
            return SDK.NetworkManager.NoThrottlingConditions;
        }
        let closestPreset = null;
        let smallestDiff = Infinity;
        for (const preset of MobileThrottling.ThrottlingPresets.ThrottlingPresets.networkPresets) {
            const { targetLatency } = preset;
            if (!targetLatency) {
                continue;
            }
            const diff = Math.abs(targetLatency - rtt);
            if (diff > RTT_COMPARISON_THRESHOLD) {
                continue;
            }
            if (smallestDiff < diff) {
                continue;
            }
            closestPreset = preset;
            smallestDiff = diff;
        }
        return closestPreset;
    }
    #getDeviceRec() {
        // `form_factors` metric is only populated if CrUX data is fetched for all devices.
        const fractions = this.#cruxPageResult?.[`${this.#fieldPageScope}-ALL`]?.record.metrics.form_factors?.fractions;
        if (!fractions) {
            return null;
        }
        if (fractions.desktop > 0.5) {
            return i18nString(UIStrings.mostUsersDesktop);
        }
        if (fractions.phone > 0.5) {
            return i18nString(UIStrings.mostUsersMobile);
        }
        return null;
    }
    #renderRecordingSettings() {
        const throttlingRec = this.#getClosestNetworkPreset();
        const deviceRec = this.#getDeviceRec();
        let networkRecEl;
        if (throttlingRec) {
            if (throttlingRec === SDK.NetworkManager.NoThrottlingConditions) {
                networkRecEl = i18nString(UIStrings.tryDisablingThrottling);
            }
            else {
                const title = typeof throttlingRec.title === 'function' ? throttlingRec.title() : throttlingRec.title;
                const recValueEl = document.createElement('span');
                recValueEl.classList.add('throttling-recommendation-value');
                recValueEl.textContent = title;
                networkRecEl = i18n.i18n.getFormatLocalizedString(str_, UIStrings.tryUsingThrottling, { PH1: recValueEl });
            }
        }
        // clang-format off
        return html `
      <h3 class="card-title">${i18nString(UIStrings.recordingSettings)}</h3>
      ${deviceRec ? html `
        <div id="device-recommendation" class="setting-recommendation">
          ${deviceRec}
          <x-link href="https://developer.chrome.com/docs/devtools/device-mode">${i18nString(UIStrings.learnMoreDevices)}</x-link>
        </div>
      ` : nothing}
      ${networkRecEl ? html `<div id="network-recommendation" class="setting-recommendation">${networkRecEl}</div>` : nothing}
      <${CPUThrottlingSelector.litTagName} class="live-metrics-option"></${CPUThrottlingSelector.litTagName}>
      <${NetworkThrottlingSelector.litTagName} class="live-metrics-option"></${NetworkThrottlingSelector.litTagName}>
      <${Settings.SettingCheckbox.SettingCheckbox.litTagName} class="live-metrics-option" .data=${{
            setting: Common.Settings.Settings.instance().moduleSetting('cache-disabled'),
            textOverride: i18nString(UIStrings.disableNetworkCache),
        }}>
      </${Settings.SettingCheckbox.SettingCheckbox.litTagName}>
    `;
        // clang-format on
    }
    #getPageScopeLabel(pageScope) {
        const key = this.#cruxPageResult?.[`${pageScope}-ALL`]?.record.key[pageScope];
        if (key) {
            return pageScope === 'url' ? i18nString(UIStrings.urlOptionWithKey, { PH1: key }) :
                i18nString(UIStrings.originOptionWithKey, { PH1: key });
        }
        const baseLabel = pageScope === 'url' ? i18nString(UIStrings.urlOption) : i18nString(UIStrings.originOption);
        return i18nString(UIStrings.needsDataOption, { PH1: baseLabel });
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
        const buttonTitle = this.#fieldPageScope === 'url' ? urlLabel : originLabel;
        const accessibleTitle = i18nString(UIStrings.showFieldDataForPage, { PH1: buttonTitle });
        // If there is no data at all we should force users to switch pages or reconfigure CrUX.
        const shouldDisable = !this.#cruxPageResult?.['url-ALL'] && !this.#cruxPageResult?.['origin-ALL'];
        return html `
      <${Menus.SelectMenu.SelectMenu.litTagName}
        id="page-scope-select"
        class="live-metrics-option"
        @selectmenuselected=${this.#onPageScopeMenuItemSelected}
        .showDivider=${true}
        .showArrow=${true}
        .sideButton=${false}
        .showSelectedItem=${true}
        .showConnector=${false}
        .buttonTitle=${buttonTitle}
        .disabled=${shouldDisable}
        title=${accessibleTitle}
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
    `;
    }
    #getDeviceScopeDisplayName(deviceScope) {
        switch (deviceScope) {
            case 'ALL':
                return i18nString(UIStrings.allDevices);
            case 'DESKTOP':
                return i18nString(UIStrings.desktop);
            case 'PHONE':
                return i18nString(UIStrings.mobile);
            case 'TABLET':
                return i18nString(UIStrings.tablet);
        }
    }
    #getAutoDeviceScope() {
        const emulationModel = EmulationModel.DeviceModeModel.DeviceModeModel.instance();
        if (emulationModel.isMobile()) {
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
        const baseLabel = deviceOption === 'AUTO' ? i18nString(UIStrings.auto, { PH1: deviceScopeLabel }) : deviceScopeLabel;
        if (!this.#cruxPageResult) {
            return i18nString(UIStrings.loadingOption, { PH1: baseLabel });
        }
        const result = this.#cruxPageResult[`${this.#fieldPageScope}-${deviceScope}`];
        if (!result) {
            return i18nString(UIStrings.needsDataOption, { PH1: baseLabel });
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
        const currentDeviceLabel = this.#getLabelForDeviceOption(this.#fieldDeviceOption);
        // clang-format off
        return html `
      <${Menus.SelectMenu.SelectMenu.litTagName}
        id="device-scope-select"
        class="live-metrics-option"
        @selectmenuselected=${this.#onDeviceOptionMenuItemSelected}
        .showDivider=${true}
        .showArrow=${true}
        .sideButton=${false}
        .showSelectedItem=${true}
        .showConnector=${false}
        .buttonTitle=${i18nString(UIStrings.device, { PH1: currentDeviceLabel })}
        .disabled=${shouldDisable}
        title=${i18nString(UIStrings.showFieldDataForDevice, { PH1: currentDeviceLabel })}
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
    `;
        // clang-format on
    }
    #renderCollectionPeriod() {
        const selectedResponse = this.#getSelectedFieldResponse();
        if (!selectedResponse) {
            return LitHtml.nothing;
        }
        const { firstDate, lastDate } = selectedResponse.record.collectionPeriod;
        const formattedFirstDate = new Date(firstDate.year, 
        // CrUX month is 1-indexed but `Date` month is 0-indexed
        firstDate.month - 1, firstDate.day);
        const formattedLastDate = new Date(lastDate.year, 
        // CrUX month is 1-indexed but `Date` month is 0-indexed
        lastDate.month - 1, lastDate.day);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        const dateEl = document.createElement('span');
        dateEl.classList.add('collection-period-range');
        dateEl.textContent = i18nString(UIStrings.dateRange, {
            PH1: formattedFirstDate.toLocaleDateString(undefined, options),
            PH2: formattedLastDate.toLocaleDateString(undefined, options),
        });
        return html `
      <div class="field-data-message">
        ${i18nString(UIStrings.collectionPeriod)}
        ${dateEl}
      </div>
    `;
    }
    #renderFieldDataMessage() {
        if (CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled) {
            return this.#renderCollectionPeriod();
        }
        const linkEl = UI.XLink.XLink.create('https://developer.chrome.com/docs/crux', i18n.i18n.lockedString('Chrome UX Report'));
        const messageEl = i18n.i18n.getFormatLocalizedString(str_, UIStrings.seeHowYourLocalMetricsCompare, { PH1: linkEl });
        return html `
      <div class="field-data-message">${messageEl}</div>
    `;
    }
    #renderDataDescriptions() {
        const fieldEnabled = CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled;
        const localLink = UI.XLink.XLink.create('https://web.dev/articles/lab-and-field-data-differences#lab_data', i18nString(UIStrings.localMetricsLink));
        const localEl = i18n.i18n.getFormatLocalizedString(str_, UIStrings.theLocalMetricsAre, { PH1: localLink });
        const fieldLink = UI.XLink.XLink.create('https://web.dev/articles/lab-and-field-data-differences#field_data', i18nString(UIStrings.fieldDataLink));
        const fieldEl = i18n.i18n.getFormatLocalizedString(str_, UIStrings.theFieldMetricsAre, { PH1: fieldLink });
        return html `
      <div class="data-descriptions">
        <div>${localEl}</div>
        ${fieldEnabled ? html `<div>${fieldEl}</div>` : nothing}
      </div>
    `;
    }
    #renderInteractionsSection() {
        if (!this.#interactions.length) {
            return LitHtml.nothing;
        }
        // clang-format off
        return html `
      <section class="interactions-section" aria-labelledby="interactions-section-title">
        <h2 id="interactions-section-title" class="section-title">${i18nString(UIStrings.interactions)}</h2>
        <ol class="interactions-list"
          on-render=${ComponentHelpers.Directives.nodeRenderedCallback(node => {
            this.#interactionsListEl = node;
        })}
        >
          ${this.#interactions.map(interaction => {
            const metricValue = renderMetricValue('timeline.landing.interaction-event-timing', interaction.duration, INP_THRESHOLDS, v => i18n.TimeUtilities.millisToString(v), { dim: true });
            const isP98Excluded = this.#inpValue && this.#inpValue.value < interaction.duration;
            return html `
              <li class="interaction">
                <span class="interaction-type">${interaction.interactionType}</span>
                <span class="interaction-node">${interaction.node && until(Common.Linkifier.Linkifier.linkify(interaction.node))}</span>
                ${isP98Excluded ? html `<${IconButton.Icon.Icon.litTagName}
                  class="interaction-info"
                  name="info"
                  title=${i18nString(UIStrings.interactionExcluded)}
                ></${IconButton.Icon.Icon.litTagName}>` : nothing}
                <span class="interaction-duration">${metricValue}</span>
              </li>
            `;
        })}
        </ol>
      </section>
    `;
        // clang-format on
    }
    #render = () => {
        const fieldEnabled = CrUXManager.CrUXManager.instance().getConfigSetting().get().enabled;
        const liveMetricsTitle = fieldEnabled ? i18nString(UIStrings.localAndFieldMetrics) : i18nString(UIStrings.localMetrics);
        // clang-format off
        const output = html `
      <div class="container">
        <div class="live-metrics-view">
          <main class="live-metrics"
          >
            <h2 class="section-title">${liveMetricsTitle}</h2>
            <div class="metric-cards"
              on-render=${ComponentHelpers.Directives.nodeRenderedCallback(node => {
            this.#tooltipContainerEl = node;
        })}
            >
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
            ${this.#renderDataDescriptions()}
            ${this.#renderInteractionsSection()}
          </main>
          <aside class="next-steps" aria-labelledby="next-steps-section-title">
            <h2 id="next-steps-section-title" class="section-title">${i18nString(UIStrings.nextSteps)}</h2>
            <div id="field-setup" class="settings-card">
              <h3 class="card-title">${i18nString(UIStrings.fieldData)}</h3>
              ${this.#renderFieldDataMessage()}
              ${this.#renderPageScopeSetting()}
              ${this.#renderDeviceScopeSetting()}
              <div class="field-setup-buttons">
                <${FieldSettingsDialog.litTagName}></${FieldSettingsDialog.litTagName}>
              </div>
            </div>
            <div id="recording-settings" class="settings-card">
              ${this.#renderRecordingSettings()}
            </div>
            <div id="record" class="record-action-card">
              ${this.#renderRecordAction(this.#toggleRecordAction)}
            </div>
            <div id="record-page-load" class="record-action-card">
              ${this.#renderRecordAction(this.#recordReloadAction)}
            </div>
          </aside>
        </div>
      </div>
    `;
        LitHtml.render(output, this.#shadow, { host: this });
    };
}
customElements.define('devtools-live-metrics-view', LiveMetricsView);
//# sourceMappingURL=LiveMetricsView.js.map