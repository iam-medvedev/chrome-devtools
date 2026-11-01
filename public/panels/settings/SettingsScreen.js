// Copyright 2013 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as UIHelpers from '../../ui/helpers/helpers.js';
import * as SettingsUI from '../../ui/legacy/components/settings_ui/settings_ui.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
import * as SettingUIRegistration from '../../ui/settings/settings.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { PanelUtils } from '../utils/utils.js';
import * as PanelComponents from './components/components.js';
import settingsScreenStyles from './settingsScreen.css.js';
const { html, nothing, render, Directives: { ref, repeat } } = Lit;
const { widget, widgetRef } = UI.Widget;
const UIStrings = {
    /**
     * @description Name of the Settings view.
     */
    settings: 'Settings',
    /**
     * @description Text for keyboard shortcuts.
     */
    shortcuts: 'Shortcuts',
    /**
     * @description Text of button in Settings screen of the Settings.
     */
    restoreDefaultsAndReload: 'Restore defaults and reload',
    /**
     * @description Card header in Experiments settings tab that lists all available stable experiments that can be turned on or off.
     */
    experiments: 'Experiments',
    /**
     * @description Number of experiments from the filtered list of experiments.
     */
    experimentsFound: '{n, plural, =1 {# experiment found} other {# experiments found}}',
    /**
     * @description Message shown in the experiments tab to warn users about any possible unstable features.
     */
    theseExperimentsCouldBeUnstable: 'Warning: These experiments could be unstable or unreliable',
    /**
     * @description Message to display if a setting change requires a reload of DevTools.
     */
    settingsChangedReloadDevTools: 'Settings changed. To apply, reload DevTools.',
    /**
     * @description Message to display if a setting change requires a restart of Chrome.
     */
    settingsChangedRestartChrome: 'Settings changed. To apply, restart Chrome.',
    /**
     * @description Warning text shown when the user has entered text to filter the
     * list of experiments, but no experiments match the filter.
     */
    noResults: 'No experiments match the filter',
    /**
     * @description Text that is usually a hyperlink to more documentation.
     */
    learnMore: 'Learn more',
    /**
     * @description Text that is usually a hyperlink to a feedback form.
     */
    sendFeedback: 'Send feedback',
    /**
     * @description Placeholder text in search bar.
     */
    searchExperiments: 'Search experiments',
};
const str_ = i18n.i18n.registerUIStrings('panels/settings/SettingsScreen.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
let settingsScreenInstance;
export const SETTINGS_SCREEN_DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
        <devtools-tabbed-pane
          vertical
          ?focus-header=${input.focusTabHeader}
          selected-tab=${input.selectedTabId}
          @tabinvoked=${(event) => input.onTabInvoked(event.detail)}>
          <div slot="left" class="settings-window-label-element">
            <div class="settings-window-title" role="heading" aria-level="1">
              ${i18nString(UIStrings.settings)}
            </div>
          </div>
          ${repeat(input.views, view => view.viewId(), view => {
        const iconName = view.iconName();
        return html `
              <devtools-widget
                id=${view.viewId()}
                label=${view.title()}
                ${widget(UI.ViewManager.ContainerWidget, { view })}>
              </devtools-widget>
              ${iconName
            ? html `<devtools-icon slot="icon-${view.viewId()}" name=${iconName}></devtools-icon>`
            : nothing}
            `;
    })}
        </devtools-tabbed-pane>
      `, target, { container: { classes: ['settings-window-main', 'vbox'] } });
    // clang-format on
};
export class SettingsScreen extends UI.Widget.VBox {
    keybindsTab;
    reportTabOnReveal;
    #view;
    #views = [];
    #onTabInvokedBound = this.tabInvoked.bind(this);
    #selectedTabId = 'preferences';
    #focusTabHeader = false;
    constructor(view = SETTINGS_SCREEN_DEFAULT_VIEW) {
        super({ useShadowDom: true });
        this.#view = view;
        this.registerRequiredCSS(settingsScreenStyles);
        this.appendApplicableItems("settings-view" /* UI.ViewManager.ViewLocationValues.SETTINGS_VIEW */);
        const keyBindsView = this.#views.find(v => v.viewId() === 'keybinds');
        if (keyBindsView) {
            void keyBindsView.widget().then(widget => {
                this.keybindsTab = widget;
            });
        }
        this.reportTabOnReveal = false;
    }
    wasShown() {
        super.wasShown();
        this.performUpdate();
    }
    performUpdate() {
        this.#view({
            views: this.#views,
            selectedTabId: this.#selectedTabId,
            focusTabHeader: this.#focusTabHeader,
            onTabInvoked: this.#onTabInvokedBound,
        }, undefined, this.contentElement);
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!settingsScreenInstance || forceNew) {
            settingsScreenInstance = new SettingsScreen();
        }
        return settingsScreenInstance;
    }
    static removeInstanceForTesting() {
        settingsScreenInstance = undefined;
    }
    static revealSettingsScreen() {
        const settingsScreen = SettingsScreen.instance();
        if (settingsScreen.isShowing()) {
            return settingsScreen;
        }
        settingsScreen.reportTabOnReveal = true;
        const dialog = new UI.Dialog.Dialog('settings');
        dialog.setAriaLabel(i18nString(UIStrings.settings));
        dialog.contentElement.removeAttribute('aria-modal');
        dialog.contentElement.tabIndex = -1;
        dialog.addCloseButton();
        dialog.setOutsideClickCallback(() => { });
        dialog.setPointerEventsBehavior("PierceGlassPane" /* UI.GlassPane.PointerEventsBehavior.PIERCE_GLASS_PANE */);
        dialog.setOutsideTabIndexBehavior("PreserveMainViewTabIndex" /* UI.Dialog.OutsideTabIndexBehavior.PRESERVE_MAIN_VIEW_TAB_INDEX */);
        settingsScreen.show(dialog.contentElement);
        dialog.setEscapeKeyCallback(settingsScreen.onEscapeKeyPressed.bind(settingsScreen));
        dialog.setMarginBehavior("NoMargin" /* UI.GlassPane.MarginBehavior.NO_MARGIN */);
        dialog.show();
        dialog.contentElement.focus();
        return settingsScreen;
    }
    static async showSettingsScreen(options = {}) {
        const { name, focusTabHeader } = options;
        const settingsScreen = SettingsScreen.revealSettingsScreen();
        await settingsScreen.selectTab(name || 'preferences', Boolean(focusTabHeader));
    }
    resolveLocation(_locationName) {
        return this;
    }
    appendApplicableItems(locationName) {
        for (const view of UI.ViewManager.ViewManager.instance().viewsForLocation(locationName)) {
            if (!view.isTransient()) {
                this.appendView(view);
            }
        }
    }
    appendView(view, insertBefore) {
        if (this.#views.includes(view)) {
            return;
        }
        const index = insertBefore ? this.#views.indexOf(insertBefore) : -1;
        if (index !== -1) {
            this.#views.splice(index, 0, view);
        }
        else {
            this.#views.push(view);
        }
        this.requestUpdate();
    }
    async showView(view, insertBefore, userGesture, omitFocus, shouldSelectTab = true) {
        this.appendView(view, insertBefore);
        if (shouldSelectTab) {
            const prevTabId = this.#selectedTabId;
            this.#selectedTabId = view.viewId();
            this.#focusTabHeader = false;
            if (userGesture && (this.reportTabOnReveal || prevTabId !== view.viewId())) {
                this.reportTabOnReveal = false;
                this.reportSettingsPanelShown(view.viewId());
            }
        }
        this.performUpdate();
        await view.widget();
        if (!omitFocus) {
            this.focus();
        }
    }
    removeView(view) {
        const index = this.#views.indexOf(view);
        if (index !== -1) {
            this.#views.splice(index, 1);
            if (this.#selectedTabId === view.viewId()) {
                this.#selectedTabId = this.#views[0]?.viewId() ?? 'preferences';
            }
            this.requestUpdate();
        }
    }
    isViewVisible(view) {
        return this.isShowing() && this.#selectedTabId === view.viewId();
    }
    widget() {
        return this;
    }
    reveal() {
        SettingsScreen.revealSettingsScreen();
    }
    async selectTab(name, focusTabHeader = false) {
        const prevTabId = this.#selectedTabId;
        this.#selectedTabId = name;
        this.#focusTabHeader = focusTabHeader;
        if (this.reportTabOnReveal || prevTabId !== name) {
            this.reportTabOnReveal = false;
            this.reportSettingsPanelShown(name);
        }
        this.performUpdate();
        const view = this.#views.find(v => v.viewId() === name);
        if (view) {
            await view.widget();
        }
        this.focus();
        if (this.#focusTabHeader) {
            this.#focusTabHeader = false;
            this.requestUpdate();
        }
    }
    tabInvoked(eventData) {
        if (this.#selectedTabId !== eventData.tabId) {
            this.#selectedTabId = eventData.tabId;
            this.requestUpdate();
        }
        if (!eventData.isUserGesture) {
            return;
        }
        if (this.#focusTabHeader) {
            this.#focusTabHeader = false;
            this.requestUpdate();
        }
        const prevTabId = eventData.prevTabId;
        const tabId = eventData.tabId;
        if (!this.reportTabOnReveal && prevTabId && prevTabId === tabId) {
            return;
        }
        this.reportTabOnReveal = false;
        this.reportSettingsPanelShown(tabId);
    }
    reportSettingsPanelShown(tabId) {
        if (tabId === i18nString(UIStrings.shortcuts)) {
            UI.UIUserMetrics.UIUserMetrics.instance().settingsPanelShown('shortcuts');
            return;
        }
        UI.UIUserMetrics.UIUserMetrics.instance().settingsPanelShown(tabId);
    }
    onEscapeKeyPressed(event) {
        if (this.#selectedTabId === 'keybinds' && this.keybindsTab) {
            this.keybindsTab.onEscapeKeyPressed(event);
        }
    }
}
export const GENERIC_SETTINGS_TAB_DEFAULT_VIEW = (input, output, target) => {
    const settingToControl = new Map();
    let syncSection;
    output.highlightSetting = (setting) => {
        const element = settingToControl.get(setting);
        if (element) {
            PanelUtils.highlightElement(element);
        }
        else if (setting.name === 'receive-gdp-badges') {
            void syncSection?.highlightReceiveBadgesSetting();
        }
    };
    // clang-format off
    render(html `
        <div class="settings-card-container-wrapper">
          <div class="settings-multicolumn-card-container">
            ${input.sections.map(section => html `
              <devtools-card heading=${section.heading}>
                ${section.category === "ACCOUNT" /* Common.Settings.SettingCategory.ACCOUNT */
        ? html `<devtools-widget
                        ${widget(PanelComponents.SyncSection.SyncSection, { syncInfo: input.syncInfo })}
                        ${widgetRef(PanelComponents.SyncSection.SyncSection, w => { syncSection = w; })}>
                      </devtools-widget>`
        : html `
                      <div ${ref(el => {
            if (!el) {
                return;
            }
            let childIndex = 0;
            for (const setting of section.settings) {
                if (setting.type() !== "boolean" /* Common.Settings.SettingType.BOOLEAN */ &&
                    setting.type() !== "enum" /* Common.Settings.SettingType.ENUM */) {
                    continue;
                }
                const child = el.children[childIndex++];
                if (child instanceof HTMLElement) {
                    settingToControl.set(setting, child);
                }
            }
        })}>
                        ${section.settings.map(setting => SettingsUI.SettingsUI.renderControlForSetting(setting))}
                        ${section.category === "EXTENSIONS" /* Common.Settings.SettingCategory.EXTENSIONS */
            ? Components.Linkifier.LinkHandlerSettingUI.instance().settingElement()
            : nothing}
                      </div>
                    `}
              </devtools-card>
            `)}
            <devtools-button
              .variant=${"outlined" /* Buttons.Button.Variant.OUTLINED */}
              .jslogContext=${'settings.restore-defaults-and-reload'}
              @click=${input.onRestoreDefaults}>
              ${i18nString(UIStrings.restoreDefaultsAndReload)}
            </devtools-button>
          </div>
        </div>
      `, target, {
        container: {
            classes: ['settings-tab-container'],
            attributes: {
                id: 'preferences-tab-content',
                jslog: `${VisualLogging.pane('preferences')}`,
            },
        },
    });
    // clang-format on
};
export class GenericSettingsTab extends UI.Widget.VBox {
    #sections = [];
    #view;
    #viewOutput = {};
    #syncInfo = { isSyncActive: false };
    #updateSyncSectionTimerId = -1;
    #syncSectionUpdatePromise = null;
    constructor(element, view = GENERIC_SETTINGS_TAB_DEFAULT_VIEW) {
        super(element);
        this.#view = view;
        // AI, GRID, MOBILE, EMULATION, and RENDERING are intentionally excluded from this list.
        // AI settings are displayed in their own tab.
        const explicitSectionOrder = [
            "" /* Common.Settings.SettingCategory.NONE */,
            "APPEARANCE" /* Common.Settings.SettingCategory.APPEARANCE */,
            "SOURCES" /* Common.Settings.SettingCategory.SOURCES */,
            "ELEMENTS" /* Common.Settings.SettingCategory.ELEMENTS */,
            "NETWORK" /* Common.Settings.SettingCategory.NETWORK */,
            "PERFORMANCE" /* Common.Settings.SettingCategory.PERFORMANCE */,
            "MEMORY" /* Common.Settings.SettingCategory.MEMORY */,
            "CONSOLE" /* Common.Settings.SettingCategory.CONSOLE */,
            "EXTENSIONS" /* Common.Settings.SettingCategory.EXTENSIONS */,
            "PERSISTENCE" /* Common.Settings.SettingCategory.PERSISTENCE */,
            "DEBUGGER" /* Common.Settings.SettingCategory.DEBUGGER */,
            "GLOBAL" /* Common.Settings.SettingCategory.GLOBAL */,
            "ACCOUNT" /* Common.Settings.SettingCategory.ACCOUNT */,
        ];
        // Some settings define their initial ordering.
        const preRegisteredSettings = Array.from(SettingUIRegistration.SettingUIRegistration.getRegisteredSettings())
            .sort((firstSetting, secondSetting) => {
            const firstOrder = firstSetting.uiDescriptor.order;
            const secondOrder = secondSetting.uiDescriptor.order;
            if (firstOrder !== undefined && secondOrder !== undefined) {
                return (firstOrder - secondOrder);
            }
            if (firstOrder) {
                return -1;
            }
            if (secondOrder) {
                return 1;
            }
            return 0;
        });
        for (const sectionCategory of explicitSectionOrder) {
            const settingsForSection = preRegisteredSettings.filter(setting => setting.uiDescriptor.category === sectionCategory && GenericSettingsTab.isSettingVisible(setting));
            this.createSectionElement(sectionCategory, settingsForSection);
        }
        this.requestUpdate();
    }
    #restoreAndReload() {
        Common.Settings.Settings.instance().clearAll();
        Components.Reload.reload();
    }
    performUpdate() {
        this.#view({
            sections: this.#sections,
            syncInfo: this.#syncInfo,
            onRestoreDefaults: this.#restoreAndReload.bind(this),
        }, this.#viewOutput, this.contentElement);
    }
    static isSettingVisible(setting) {
        return Boolean(setting.uiDescriptor.title?.()) && Boolean(setting.uiDescriptor.category);
    }
    wasShown() {
        UI.Context.Context.instance().setFlavor(GenericSettingsTab, this);
        super.wasShown();
        this.performUpdate();
        this.updateSyncSection();
    }
    willHide() {
        if (this.#updateSyncSectionTimerId > 0) {
            window.clearTimeout(this.#updateSyncSectionTimerId);
            this.#updateSyncSectionTimerId = -1;
        }
        super.willHide();
        UI.Context.Context.instance().setFlavor(GenericSettingsTab, null);
    }
    updateSyncSection() {
        if (this.#updateSyncSectionTimerId > 0) {
            window.clearTimeout(this.#updateSyncSectionTimerId);
            this.#updateSyncSectionTimerId = -1;
        }
        this.#syncSectionUpdatePromise =
            new Promise(resolve => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve))
                .then(syncInfo => {
                this.#syncInfo = syncInfo;
                this.requestUpdate();
                if (!syncInfo.isSyncActive || !syncInfo.arePreferencesSynced) {
                    this.#updateSyncSectionTimerId = window.setTimeout(this.updateSyncSection.bind(this), 500);
                }
            });
    }
    createSectionElement(category, settings) {
        // Always create the EXTENSIONS section and append the link handling control.
        if (category !== "EXTENSIONS" /* Common.Settings.SettingCategory.EXTENSIONS */ && settings.length === 0) {
            return;
        }
        this.#sections.push({
            category,
            heading: Common.Settings.getLocalizedSettingsCategory(category),
            settings: settings.map(settingRegistration => Common.Settings.Settings.instance().resolve(settingRegistration.descriptor)),
        });
    }
    highlightObject(setting) {
        if (setting instanceof Common.Settings.Setting) {
            if (setting.name === 'receive-gdp-badges') {
                void this.#syncSectionUpdatePromise?.then(() => {
                    this.#viewOutput.highlightSetting?.(setting);
                });
            }
            else {
                this.#viewOutput.highlightSetting?.(setting);
            }
        }
    }
}
export const EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW = (input, output, target) => {
    // clang-format off
    render(html `
        <div class="settings-card-container-wrapper">
          <div class="settings-card-container">
            <div class="experiments-filter">
              <devtools-toolbar>
                <devtools-toolbar-input
                  autofocus
                  type="filter"
                  placeholder=${i18nString(UIStrings.searchExperiments)}
                  style="flex-grow:1"
                  .value=${input.filterText}
                  @change=${(e) => input.onFilterChanged(e.detail)}>
                </devtools-toolbar-input>
              </devtools-toolbar>
            </div>
            <devtools-card heading=${i18nString(UIStrings.experiments)}>
              ${input.experiments.length ? html `
                <div class="experiments-warning-subsection">
                  <devtools-icon name="warning"></devtools-icon>
                  <span>${i18nString(UIStrings.theseExperimentsCouldBeUnstable)}</span>
                </div>
                <div class="settings-experiments-block">
                  ${repeat(input.experiments, experiment => experiment.name, experiment => html `
                    <p class="settings-experiment" ${ref(el => {
        if (el) {
            output.setExperimentElement(experiment, el);
        }
    })}>
                      <devtools-checkbox
                        class="experiment-label"
                        name=${experiment.name}
                        title=${experiment.title}
                        .checked=${experiment.isEnabled()}
                        .jslogContext=${experiment.name}
                        @click=${(e) => {
        const checkbox = e.currentTarget;
        input.onExperimentToggled(experiment, checkbox.checked);
    }}>
                        ${experiment.title}
                      </devtools-checkbox>
                      ${experiment.docLink ? html `
                        <devtools-button
                          class="link-icon"
                          title=${i18nString(UIStrings.learnMore)}
                          .iconName=${'help'}
                          .variant=${"icon" /* Buttons.Button.Variant.ICON */}
                          .size=${"SMALL" /* Buttons.Button.Size.SMALL */}
                          .jslogContext=${`${experiment.name}-documentation`}
                          @click=${() => {
        if (experiment.docLink) {
            input.onOpenDocumentation(experiment.docLink);
        }
    }}>
                        </devtools-button>
                      ` : Lit.nothing}
                      ${experiment.feedbackLink ? html `
                        <devtools-link
                          class="feedback-link"
                          href=${experiment.feedbackLink}
                          jslogcontext=${`${experiment.name}-feedback`}>
                          ${i18nString(UIStrings.sendFeedback)}
                        </devtools-link>
                      ` : Lit.nothing}
                    </p>
                  `)}
                </div>
              ` : html `
                <span>${i18nString(UIStrings.noResults)}</span>
              `}
            </devtools-card>
          </div>
        </div>
      `, target, {
        container: {
            classes: ['settings-tab-container'],
            attributes: {
                id: 'experiments-tab-content',
                jslog: `${VisualLogging.pane('experiments')}`,
            },
        },
    });
    // clang-format on
};
export class ExperimentsSettingsTab extends UI.Widget.Widget {
    #experimentToControl = new Map();
    #view;
    #viewOutput = {
        setExperimentElement: (experiment, element) => {
            this.#experimentToControl.set(experiment, element);
        },
    };
    #filterText = '';
    constructor(element, view = EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW) {
        super(element);
        this.#view = view;
    }
    #filterExperiments(filterText) {
        const experiments = Root.Runtime.experiments.allConfigurableExperiments().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        return experiments.filter(e => e.title.toLowerCase().includes(filterText));
    }
    #onFilterChanged(filterText) {
        this.#filterText = filterText.toLowerCase();
        if (this.#filterText) {
            const filteredExperiments = this.#filterExperiments(this.#filterText);
            if (filteredExperiments.length) {
                UI.ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.experimentsFound, { n: filteredExperiments.length }));
            }
            else {
                UI.ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.noResults));
            }
        }
        this.requestUpdate();
    }
    #onExperimentToggled(experiment, enabled) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.setChromeFlag(experiment.aboutFlag, enabled);
        experiment.setEnabled(enabled);
        Host.userMetrics.experimentChanged(experiment.name, experiment.isEnabled());
        if (experiment.requiresChromeRestart) {
            UI.InspectorView.InspectorView.instance().displayChromeRestartRequiredWarning(i18nString(UIStrings.settingsChangedRestartChrome));
        }
        else {
            UI.InspectorView.InspectorView.instance().displayReloadRequiredWarning(i18nString(UIStrings.settingsChangedReloadDevTools));
        }
        this.requestUpdate();
    }
    performUpdate() {
        const filteredExperiments = this.#filterExperiments(this.#filterText);
        this.#experimentToControl.clear();
        this.#view({
            filterText: this.#filterText,
            experiments: filteredExperiments,
            onFilterChanged: this.#onFilterChanged.bind(this),
            onExperimentToggled: this.#onExperimentToggled.bind(this),
            onOpenDocumentation: (url) => UIHelpers.openInNewTab(url),
        }, this.#viewOutput, this.contentElement);
    }
    highlightObject(experiment) {
        if (experiment instanceof Root.Runtime.Experiment) {
            const element = this.#experimentToControl.get(experiment);
            if (element) {
                PanelUtils.highlightElement(element);
            }
        }
    }
    wasShown() {
        UI.Context.Context.instance().setFlavor(ExperimentsSettingsTab, this);
        super.wasShown();
        this.requestUpdate();
    }
    willHide() {
        super.willHide();
        UI.Context.Context.instance().setFlavor(ExperimentsSettingsTab, null);
    }
}
export class ActionDelegate {
    handleAction(_context, actionId) {
        switch (actionId) {
            case 'settings.show':
                void SettingsScreen.showSettingsScreen({ focusTabHeader: true });
                return true;
            case 'settings.documentation':
                UIHelpers.openInNewTab('https://developer.chrome.com/docs/devtools/');
                return true;
            case 'settings.shortcuts':
                void SettingsScreen.showSettingsScreen({ name: 'keybinds', focusTabHeader: true });
                return true;
        }
        return false;
    }
}
export class Revealer {
    async reveal(object) {
        const context = UI.Context.Context.instance();
        if (object instanceof Root.Runtime.Experiment) {
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
            await SettingsScreen.showSettingsScreen({ name: 'experiments' });
            const experimentsSettingsTab = context.flavor(ExperimentsSettingsTab);
            if (experimentsSettingsTab !== null) {
                experimentsSettingsTab.highlightObject(object);
            }
            return;
        }
        for (const settingRegistration of SettingUIRegistration.SettingUIRegistration.getRegisteredSettings()) {
            if (!GenericSettingsTab.isSettingVisible(settingRegistration)) {
                continue;
            }
            if (settingRegistration.descriptor.name === object.name) {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
                await SettingsScreen.showSettingsScreen();
                const genericSettingsTab = context.flavor(GenericSettingsTab);
                if (genericSettingsTab !== null) {
                    genericSettingsTab.highlightObject(object);
                }
                return;
            }
        }
        // Reveal settings views
        for (const view of UI.ViewManager.ViewManager.instance().getRegisteredViewExtensions()) {
            const id = view.viewId();
            const location = view.location();
            if (location !== "settings-view" /* UI.ViewManager.ViewLocationValues.SETTINGS_VIEW */) {
                continue;
            }
            const settings = view.settings();
            if (settings && settings.indexOf(object.name) !== -1) {
                Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
                await SettingsScreen.showSettingsScreen({ name: id });
                const widget = await view.widget();
                if ('highlightObject' in widget && typeof widget.highlightObject === 'function') {
                    widget.highlightObject(object);
                }
                return;
            }
        }
    }
}
//# sourceMappingURL=SettingsScreen.js.map