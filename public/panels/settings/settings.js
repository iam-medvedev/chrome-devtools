var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/settings/SettingsScreen.ts
var SettingsScreen_exports = {};
__export(SettingsScreen_exports, {
  ActionDelegate: () => ActionDelegate,
  EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW: () => EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW,
  ExperimentsSettingsTab: () => ExperimentsSettingsTab,
  GENERIC_SETTINGS_TAB_DEFAULT_VIEW: () => GENERIC_SETTINGS_TAB_DEFAULT_VIEW,
  GenericSettingsTab: () => GenericSettingsTab,
  Revealer: () => Revealer,
  SETTINGS_SCREEN_DEFAULT_VIEW: () => SETTINGS_SCREEN_DEFAULT_VIEW,
  SettingsScreen: () => SettingsScreen
});
import "../../ui/kit/kit.js";
import * as Common from "../../core/common/common.js";
import * as Host from "../../core/host/host.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as Root from "../../core/root/root.js";
import * as Buttons from "../../ui/components/buttons/buttons.js";
import * as UIHelpers from "../../ui/helpers/helpers.js";
import * as SettingsUI from "../../ui/legacy/components/settings_ui/settings_ui.js";
import * as Components from "../../ui/legacy/components/utils/utils.js";
import * as UI from "../../ui/legacy/legacy.js";
import * as Lit from "../../ui/lit/lit.js";
import * as SettingUIRegistration from "../../ui/settings/settings.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";
import { PanelUtils } from "../utils/utils.js";
import * as PanelComponents from "./components/components.js";

// gen/front_end/panels/settings/settingsScreen.css.js
var settingsScreen_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.settings-window-main {
  color: var(--sys-color-on-surface);
  background-color: var(--sys-color-cdt-base-container);
}

.settings-experiments-block {
  padding: 0 var(--sys-size-6) var(--sys-size-5) var(--sys-size-4);
}

fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

label {
  padding-right: var(--sys-size-5);
}

.experiments-filter {
  width: 100%;
  padding: 0 var(--sys-size-9) 0 var(--sys-size-8);
  max-width: var(--sys-size-35);

  > devtools-toolbar {
    min-width: var(--sys-size-31);
  }
}

.settings-select {
  align-items: center;
  display: grid;
  row-gap: var(--sys-size-3);
  margin: var(--sys-size-4) 0;
}

div:has(.settings-select) + div:has(.settings-select) {
  padding-top: var(--sys-size-5);
}

.settings-window-label-element {
  flex: none;
}

.settings-window-title {
  display: flex;
  align-items: center;
  font-size: var(--sys-size-9);
  color: var(--sys-color-on-surface);
  margin: var(--sys-size-8) var(--sys-size-7);

  &::before {
    content: "";
    width: var(--sys-size-9);
    height: var(--sys-size-9);
    margin-right: var(--sys-size-6);
    background-image: var(--image-file-devtools);
  }
}

.settings-card-container-wrapper {
  scrollbar-gutter: stable;
  padding: var(--sys-size-8) 0;
  overflow: auto;
  position: absolute;
  inset: var(--sys-size-8) 0 0;
  container-type: inline-size;
  container-name: settings-content;
}

.settings-card-container,
.settings-multicolumn-card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sys-size-9);

  > devtools-button {
    max-width: var(--sys-size-35);
    width: calc(100% - var(--sys-size-5));
    margin-left: var(--sys-size-5);
  }
}

/* In multi-column mode, we adopt single-column styles unless
   enough space is available to actually show two columns (at 850px) */
@container settings-content (min-width: 850px) {
  .settings-multicolumn-card-container {
    display: block;
    column-width: var(--sys-size-32);
    column-gap: var(--sys-size-11);
    margin: 0 var(--sys-size-9);

    > * + * {
      margin-top: var(--sys-size-8);
    }

    > devtools-button {
      align-self: start;
    }
  }
}

.settings-card-container-wrapper select {
  margin-left: 10px;
  width: var(--sys-size-28);
}

.settings-card-container-wrapper setting-checkbox { /* stylelint-disable-line selector-type-no-unknown */
  min-height: var(--sys-size-13);
  position: relative;
  left: calc(var(--sys-size-4) * -1);
}

.settings-experiment {
  margin: 0;
  min-height: var(--sys-size-13);
  display: grid;
  grid-template-columns: auto min-content auto 1fr;

  & .devtools-link {
    display: flex !important; /* stylelint-disable-line declaration-no-important */
    align-items: center;
  }
}

devtools-button.link-icon {
  cursor: pointer;
}

.experiment-label {
  margin: var(--sys-size-3) var(--sys-size-2) var(--sys-size-3) 0;
  white-space: normal;
}

.settings-experiment .feedback-link {
  color: var(--sys-color-primary);
  text-decoration-line: underline;
  margin-left: var(--sys-size-3);
}

.experiments-warning-subsection {
  display: flex;
  align-items: center;

  > devtools-icon {
    color: var(--sys-color-orange-bright);
    margin-right: var(--sys-size-4);
  }
}

@media (forced-colors: active) {
  .settings-window-title {
    color: canvastext;
  }
}

/*# sourceURL=${import.meta.resolve("./settingsScreen.css")} */`;

// ../../front_end/panels/settings/SettingsScreen.ts
var { html, nothing: nothing2, render, Directives: { ref, repeat } } = Lit;
var { widget, widgetRef } = UI.Widget;
var UIStrings = {
  /**
   * @description Name of the Settings view.
   */
  settings: "Settings",
  /**
   * @description Text for keyboard shortcuts.
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text of button in Settings screen of the Settings.
   */
  restoreDefaultsAndReload: "Restore defaults and reload",
  /**
   * @description Card header in Experiments settings tab that lists all available stable experiments that can be turned on or off.
   */
  experiments: "Experiments",
  /**
   * @description Number of experiments from the filtered list of experiments.
   */
  experimentsFound: "{n, plural, =1 {# experiment found} other {# experiments found}}",
  /**
   * @description Message shown in the experiments tab to warn users about any possible unstable features.
   */
  theseExperimentsCouldBeUnstable: "Warning: These experiments could be unstable or unreliable",
  /**
   * @description Message to display if a setting change requires a reload of DevTools.
   */
  settingsChangedReloadDevTools: "Settings changed. To apply, reload DevTools.",
  /**
   * @description Message to display if a setting change requires a restart of Chrome.
   */
  settingsChangedRestartChrome: "Settings changed. To apply, restart Chrome.",
  /**
   * @description Warning text shown when the user has entered text to filter the
   * list of experiments, but no experiments match the filter.
   */
  noResults: "No experiments match the filter",
  /**
   * @description Text that is usually a hyperlink to more documentation.
   */
  learnMore: "Learn more",
  /**
   * @description Text that is usually a hyperlink to a feedback form.
   */
  sendFeedback: "Send feedback",
  /**
   * @description Placeholder text in search bar.
   */
  searchExperiments: "Search experiments"
};
var str_ = i18n.i18n.registerUIStrings("panels/settings/SettingsScreen.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var settingsScreenInstance;
var SETTINGS_SCREEN_DEFAULT_VIEW = (input, _output, target) => {
  render(
    html`
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
          ${repeat(input.views, (view) => view.viewId(), (view) => {
      const iconName = view.iconName();
      return html`
              <devtools-widget
                id=${view.viewId()}
                label=${view.title()}
                ${widget(UI.ViewManager.ContainerWidget, { view })}>
              </devtools-widget>
              ${iconName ? html`<devtools-icon slot="icon-${view.viewId()}" name=${iconName}></devtools-icon>` : nothing2}
            `;
    })}
        </devtools-tabbed-pane>
      `,
    target,
    { container: { classes: ["settings-window-main", "vbox"] } }
  );
};
var SettingsScreen = class _SettingsScreen extends UI.Widget.VBox {
  keybindsTab;
  reportTabOnReveal;
  #view;
  #views = [];
  #onTabInvokedBound = this.tabInvoked.bind(this);
  #selectedTabId = "preferences";
  #focusTabHeader = false;
  constructor(view = SETTINGS_SCREEN_DEFAULT_VIEW) {
    super({ useShadowDom: true });
    this.#view = view;
    this.registerRequiredCSS(settingsScreen_css_default);
    this.appendApplicableItems(UI.ViewManager.ViewLocationValues.SETTINGS_VIEW);
    const keyBindsView = this.#views.find((v) => v.viewId() === "keybinds");
    if (keyBindsView) {
      void keyBindsView.widget().then((widget3) => {
        this.keybindsTab = widget3;
      });
    }
    this.reportTabOnReveal = false;
  }
  wasShown() {
    super.wasShown();
    this.performUpdate();
  }
  performUpdate() {
    this.#view(
      {
        views: this.#views,
        selectedTabId: this.#selectedTabId,
        focusTabHeader: this.#focusTabHeader,
        onTabInvoked: this.#onTabInvokedBound
      },
      void 0,
      this.contentElement
    );
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!settingsScreenInstance || forceNew) {
      settingsScreenInstance = new _SettingsScreen();
    }
    return settingsScreenInstance;
  }
  static removeInstanceForTesting() {
    settingsScreenInstance = void 0;
  }
  static revealSettingsScreen() {
    const settingsScreen = _SettingsScreen.instance();
    if (settingsScreen.isShowing()) {
      return settingsScreen;
    }
    settingsScreen.reportTabOnReveal = true;
    const dialog = new UI.Dialog.Dialog("settings");
    dialog.setAriaLabel(i18nString(UIStrings.settings));
    dialog.contentElement.removeAttribute("aria-modal");
    dialog.contentElement.tabIndex = -1;
    dialog.addCloseButton();
    dialog.setOutsideClickCallback(() => {
    });
    dialog.setPointerEventsBehavior(UI.GlassPane.PointerEventsBehavior.PIERCE_GLASS_PANE);
    dialog.setOutsideTabIndexBehavior(UI.Dialog.OutsideTabIndexBehavior.PRESERVE_MAIN_VIEW_TAB_INDEX);
    settingsScreen.show(dialog.contentElement);
    dialog.setEscapeKeyCallback(settingsScreen.onEscapeKeyPressed.bind(settingsScreen));
    dialog.setMarginBehavior(UI.GlassPane.MarginBehavior.NO_MARGIN);
    dialog.show();
    dialog.contentElement.focus();
    return settingsScreen;
  }
  static async showSettingsScreen(options = {}) {
    const { name, focusTabHeader } = options;
    const settingsScreen = _SettingsScreen.revealSettingsScreen();
    await settingsScreen.selectTab(name || "preferences", Boolean(focusTabHeader));
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
    } else {
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
        this.#selectedTabId = this.#views[0]?.viewId() ?? "preferences";
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
    _SettingsScreen.revealSettingsScreen();
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
    const view = this.#views.find((v) => v.viewId() === name);
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
      UI.UIUserMetrics.UIUserMetrics.instance().settingsPanelShown("shortcuts");
      return;
    }
    UI.UIUserMetrics.UIUserMetrics.instance().settingsPanelShown(tabId);
  }
  onEscapeKeyPressed(event) {
    if (this.#selectedTabId === "keybinds" && this.keybindsTab) {
      this.keybindsTab.onEscapeKeyPressed(event);
    }
  }
};
var GENERIC_SETTINGS_TAB_DEFAULT_VIEW = (input, output, target) => {
  const settingToControl = /* @__PURE__ */ new Map();
  let syncSection;
  output.highlightSetting = (setting) => {
    const element = settingToControl.get(setting);
    if (element) {
      PanelUtils.highlightElement(element);
    } else if (setting.name === "receive-gdp-badges") {
      void syncSection?.highlightReceiveBadgesSetting();
    }
  };
  render(
    html`
        <div class="settings-card-container-wrapper">
          <div class="settings-multicolumn-card-container">
            ${input.sections.map((section2) => html`
              <devtools-card heading=${section2.heading}>
                ${section2.category === Common.Settings.SettingCategory.ACCOUNT ? html`<devtools-widget
                        ${widget(PanelComponents.SyncSection.SyncSection, { syncInfo: input.syncInfo })}
                        ${widgetRef(PanelComponents.SyncSection.SyncSection, (w) => {
      syncSection = w;
    })}>
                      </devtools-widget>` : html`
                      <div ${ref((el) => {
      if (!el) {
        return;
      }
      let childIndex = 0;
      for (const setting of section2.settings) {
        if (setting.type() !== Common.Settings.SettingType.BOOLEAN && setting.type() !== Common.Settings.SettingType.ENUM) {
          continue;
        }
        const child = el.children[childIndex++];
        if (child instanceof HTMLElement) {
          settingToControl.set(setting, child);
        }
      }
    })}>
                        ${section2.settings.map((setting) => SettingsUI.SettingsUI.renderControlForSetting(setting))}
                        ${section2.category === Common.Settings.SettingCategory.EXTENSIONS ? Components.Linkifier.LinkHandlerSettingUI.instance().settingElement() : nothing2}
                      </div>
                    `}
              </devtools-card>
            `)}
            <devtools-button
              .variant=${Buttons.Button.Variant.OUTLINED}
              .jslogContext=${"settings.restore-defaults-and-reload"}
              @click=${input.onRestoreDefaults}>
              ${i18nString(UIStrings.restoreDefaultsAndReload)}
            </devtools-button>
          </div>
        </div>
      `,
    target,
    {
      container: {
        classes: ["settings-tab-container"],
        attributes: {
          id: "preferences-tab-content",
          jslog: `${VisualLogging.pane("preferences")}`
        }
      }
    }
  );
};
var GenericSettingsTab = class _GenericSettingsTab extends UI.Widget.VBox {
  #sections = [];
  #view;
  #viewOutput = {};
  #syncInfo = { isSyncActive: false };
  #updateSyncSectionTimerId = -1;
  #syncSectionUpdatePromise = null;
  constructor(element, view = GENERIC_SETTINGS_TAB_DEFAULT_VIEW) {
    super(element);
    this.#view = view;
    const explicitSectionOrder = [
      Common.Settings.SettingCategory.NONE,
      Common.Settings.SettingCategory.APPEARANCE,
      Common.Settings.SettingCategory.SOURCES,
      Common.Settings.SettingCategory.ELEMENTS,
      Common.Settings.SettingCategory.NETWORK,
      Common.Settings.SettingCategory.PERFORMANCE,
      Common.Settings.SettingCategory.MEMORY,
      Common.Settings.SettingCategory.CONSOLE,
      Common.Settings.SettingCategory.EXTENSIONS,
      Common.Settings.SettingCategory.PERSISTENCE,
      Common.Settings.SettingCategory.DEBUGGER,
      Common.Settings.SettingCategory.GLOBAL,
      Common.Settings.SettingCategory.ACCOUNT
    ];
    const preRegisteredSettings = Array.from(SettingUIRegistration.SettingUIRegistration.getRegisteredSettings()).sort(
      (firstSetting, secondSetting) => {
        const firstOrder = firstSetting.uiDescriptor.order;
        const secondOrder = secondSetting.uiDescriptor.order;
        if (firstOrder !== void 0 && secondOrder !== void 0) {
          return firstOrder - secondOrder;
        }
        if (firstOrder) {
          return -1;
        }
        if (secondOrder) {
          return 1;
        }
        return 0;
      }
    );
    for (const sectionCategory of explicitSectionOrder) {
      const settingsForSection = preRegisteredSettings.filter(
        (setting) => setting.uiDescriptor.category === sectionCategory && _GenericSettingsTab.isSettingVisible(setting)
      );
      this.createSectionElement(sectionCategory, settingsForSection);
    }
    this.requestUpdate();
  }
  #restoreAndReload() {
    Common.Settings.Settings.instance().clearAll();
    Components.Reload.reload();
  }
  performUpdate() {
    this.#view(
      {
        sections: this.#sections,
        syncInfo: this.#syncInfo,
        onRestoreDefaults: this.#restoreAndReload.bind(this)
      },
      this.#viewOutput,
      this.contentElement
    );
  }
  static isSettingVisible(setting) {
    return Boolean(setting.uiDescriptor.title?.()) && Boolean(setting.uiDescriptor.category);
  }
  wasShown() {
    UI.Context.Context.instance().setFlavor(_GenericSettingsTab, this);
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
    UI.Context.Context.instance().setFlavor(_GenericSettingsTab, null);
  }
  updateSyncSection() {
    if (this.#updateSyncSectionTimerId > 0) {
      window.clearTimeout(this.#updateSyncSectionTimerId);
      this.#updateSyncSectionTimerId = -1;
    }
    this.#syncSectionUpdatePromise = new Promise(
      (resolve) => Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation(resolve)
    ).then((syncInfo) => {
      this.#syncInfo = syncInfo;
      this.requestUpdate();
      if (!syncInfo.isSyncActive || !syncInfo.arePreferencesSynced) {
        this.#updateSyncSectionTimerId = window.setTimeout(this.updateSyncSection.bind(this), 500);
      }
    });
  }
  createSectionElement(category, settings) {
    if (category !== Common.Settings.SettingCategory.EXTENSIONS && settings.length === 0) {
      return;
    }
    this.#sections.push({
      category,
      heading: Common.Settings.getLocalizedSettingsCategory(category),
      settings: settings.map((settingRegistration) => Common.Settings.Settings.instance().resolve(settingRegistration.descriptor))
    });
  }
  highlightObject(setting) {
    if (setting instanceof Common.Settings.Setting) {
      if (setting.name === "receive-gdp-badges") {
        void this.#syncSectionUpdatePromise?.then(() => {
          this.#viewOutput.highlightSetting?.(setting);
        });
      } else {
        this.#viewOutput.highlightSetting?.(setting);
      }
    }
  }
};
var EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW = (input, output, target) => {
  render(
    html`
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
              ${input.experiments.length ? html`
                <div class="experiments-warning-subsection">
                  <devtools-icon name="warning"></devtools-icon>
                  <span>${i18nString(UIStrings.theseExperimentsCouldBeUnstable)}</span>
                </div>
                <div class="settings-experiments-block">
                  ${repeat(input.experiments, (experiment) => experiment.name, (experiment) => html`
                    <p class="settings-experiment" ${ref((el) => {
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
                      ${experiment.docLink ? html`
                        <devtools-button
                          class="link-icon"
                          title=${i18nString(UIStrings.learnMore)}
                          .iconName=${"help"}
                          .variant=${Buttons.Button.Variant.ICON}
                          .size=${Buttons.Button.Size.SMALL}
                          .jslogContext=${`${experiment.name}-documentation`}
                          @click=${() => {
      if (experiment.docLink) {
        input.onOpenDocumentation(experiment.docLink);
      }
    }}>
                        </devtools-button>
                      ` : Lit.nothing}
                      ${experiment.feedbackLink ? html`
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
              ` : html`
                <span>${i18nString(UIStrings.noResults)}</span>
              `}
            </devtools-card>
          </div>
        </div>
      `,
    target,
    {
      container: {
        classes: ["settings-tab-container"],
        attributes: {
          id: "experiments-tab-content",
          jslog: `${VisualLogging.pane("experiments")}`
        }
      }
    }
  );
};
var ExperimentsSettingsTab = class _ExperimentsSettingsTab extends UI.Widget.Widget {
  #experimentToControl = /* @__PURE__ */ new Map();
  #view;
  #viewOutput = {
    setExperimentElement: (experiment, element) => {
      this.#experimentToControl.set(experiment, element);
    }
  };
  #filterText = "";
  constructor(element, view = EXPERIMENTS_SETTINGS_TAB_DEFAULT_VIEW) {
    super(element);
    this.#view = view;
  }
  #filterExperiments(filterText) {
    const experiments = Root.Runtime.experiments.allConfigurableExperiments().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    return experiments.filter((e) => e.title.toLowerCase().includes(filterText));
  }
  #onFilterChanged(filterText) {
    this.#filterText = filterText.toLowerCase();
    if (this.#filterText) {
      const filteredExperiments = this.#filterExperiments(this.#filterText);
      if (filteredExperiments.length) {
        UI.ARIAUtils.LiveAnnouncer.alert(i18nString(UIStrings.experimentsFound, { n: filteredExperiments.length }));
      } else {
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
      UI.InspectorView.InspectorView.instance().displayChromeRestartRequiredWarning(
        i18nString(UIStrings.settingsChangedRestartChrome)
      );
    } else {
      UI.InspectorView.InspectorView.instance().displayReloadRequiredWarning(
        i18nString(UIStrings.settingsChangedReloadDevTools)
      );
    }
    this.requestUpdate();
  }
  performUpdate() {
    const filteredExperiments = this.#filterExperiments(this.#filterText);
    this.#experimentToControl.clear();
    this.#view(
      {
        filterText: this.#filterText,
        experiments: filteredExperiments,
        onFilterChanged: this.#onFilterChanged.bind(this),
        onExperimentToggled: this.#onExperimentToggled.bind(this),
        onOpenDocumentation: (url) => UIHelpers.openInNewTab(url)
      },
      this.#viewOutput,
      this.contentElement
    );
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
    UI.Context.Context.instance().setFlavor(_ExperimentsSettingsTab, this);
    super.wasShown();
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    UI.Context.Context.instance().setFlavor(_ExperimentsSettingsTab, null);
  }
};
var ActionDelegate = class {
  handleAction(_context, actionId) {
    switch (actionId) {
      case "settings.show":
        void SettingsScreen.showSettingsScreen({ focusTabHeader: true });
        return true;
      case "settings.documentation":
        UIHelpers.openInNewTab("https://developer.chrome.com/docs/devtools/");
        return true;
      case "settings.shortcuts":
        void SettingsScreen.showSettingsScreen({ name: "keybinds", focusTabHeader: true });
        return true;
    }
    return false;
  }
};
var Revealer = class {
  async reveal(object) {
    const context = UI.Context.Context.instance();
    if (object instanceof Root.Runtime.Experiment) {
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
      await SettingsScreen.showSettingsScreen({ name: "experiments" });
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
    for (const view of UI.ViewManager.ViewManager.instance().getRegisteredViewExtensions()) {
      const id = view.viewId();
      const location = view.location();
      if (location !== UI.ViewManager.ViewLocationValues.SETTINGS_VIEW) {
        continue;
      }
      const settings = view.settings();
      if (settings && settings.indexOf(object.name) !== -1) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        await SettingsScreen.showSettingsScreen({ name: id });
        const widget3 = await view.widget();
        if ("highlightObject" in widget3 && typeof widget3.highlightObject === "function") {
          widget3.highlightObject(object);
        }
        return;
      }
    }
  }
};

// ../../front_end/panels/settings/AISettingsTab.ts
var AISettingsTab_exports = {};
__export(AISettingsTab_exports, {
  AISettingsTab: () => AISettingsTab,
  AI_SETTINGS_TAB_DEFAULT_VIEW: () => AI_SETTINGS_TAB_DEFAULT_VIEW
});
import "../../ui/kit/kit.js";
import * as Common2 from "../../core/common/common.js";
import * as Host2 from "../../core/host/host.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as Platform2 from "../../core/platform/platform.js";
import * as Root2 from "../../core/root/root.js";
import * as AiAssistanceModel from "../../models/ai_assistance/ai_assistance.js";
import * as Buttons2 from "../../ui/components/buttons/buttons.js";
import * as Input from "../../ui/components/input/input.js";
import * as Switch from "../../ui/components/switch/switch.js";
import * as uiI18n from "../../ui/i18n/i18n.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import * as Lit2 from "../../ui/lit/lit.js";
import * as VisualLogging2 from "../../ui/visual_logging/visual_logging.js";
import { PanelUtils as PanelUtils2 } from "../utils/utils.js";

// gen/front_end/panels/settings/aiSettingsTab.css.js
var aiSettingsTab_css_default = `/*
 * Copyright 2024 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *){
  .ai-settings-container {
    container-type: inline-size;
    container-name: ai-settings;

    @container ai-settings (min-width: 480px) {
      .settings-container-wrapper {
        align-items: center;
      }
    }
  }

  * {
    box-sizing: border-box;
    min-height: auto;
  }

  .shared-disclaimer {
    background: linear-gradient(135deg, var(--sys-color-gradient-primary), var(--sys-color-gradient-tertiary));
    border-radius: var(--sys-size-5);
    padding: var(--sys-size-9) var(--sys-size-11);
    max-width: var(--sys-size-35);
    min-width: var(--sys-size-28);

    h2 {
      font: var(--sys-typescale-headline5);
      margin: 0 0 var(--sys-size-6);
    }
  }

  .disclaimer-list-header {
    font: var(--sys-typescale-body5-medium);
    margin: 0;
  }

  .disclaimer-list {
    padding: var(--sys-size-6) 0 0;
    display: grid;
    grid-template-columns: var(--sys-size-12) auto;
    gap: var(--sys-size-6) 0;
    line-height: var(--sys-typescale-body5-line-height);
  }

  .settings-container {
    display: grid;
    grid-template-columns: 1fr auto auto;
    border-radius: var(--sys-size-5);
    box-shadow: var(--sys-elevation-level2);
    margin: var(--sys-size-11) 0 var(--sys-size-4);
    line-height: var(--sys-typescale-body5-line-height);
    min-width: var(--sys-size-28);
    max-width: var(--sys-size-35);
    background-color: var(--app-color-card-background);
  }

  .accordion-header {
    display: grid;
    grid-template-columns: auto 1fr auto;

    &:hover {
      background-color: var(--sys-color-state-hover-on-subtle);
    }
  }

  .icon-container,
  .dropdown {
    padding: 0 var(--sys-size-8);
  }

  .toggle-container {
    padding: 0 var(--sys-size-8) 0 var(--sys-size-9);

    &:hover {
      background-color: var(--sys-color-state-hover-on-subtle);
    }
  }

  .expansion-grid {
    padding: var(--sys-size-4) var(--sys-size-8) var(--sys-size-6);
    display: grid;
    grid-template-columns: var(--sys-size-9) auto;
    gap: var(--sys-size-6) var(--sys-size-8);
    line-height: var(--sys-typescale-body5-line-height);
    color: var(--sys-color-on-surface-subtle);
  }

  .expansion-grid-whole-row {
    grid-column: span 2;
    font-weight: var(--ref-typeface-weight-medium);
    color: var(--sys-color-on-surface);
    padding-top: var(--sys-size-4);
    margin: 0;
    font-size: inherit;
  }

  .setting-description {
    color: var(--sys-color-on-surface-subtle);
  }

  .centered {
    display: grid;
    place-content: center;
  }

  .setting-card {
    padding: var(--sys-size-6) 0;

    h2 {
      margin: 0;
      font: inherit;
    }
  }

  .divider {
    margin: var(--sys-size-5) 0;
    border-left: var(--sys-size-1) solid var(--sys-color-divider);
  }

  .accordion-header ~ .accordion-header,
  .divider ~ .divider,
  .toggle-container ~ .toggle-container {
    border-top: var(--sys-size-1) solid var(--sys-color-divider);
  }

  .whole-row {
    grid-column: span 5;
    overflow: hidden;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--sys-motion-duration-short4) ease-in;
  }

  .whole-row.open {
    grid-template-rows: 1fr;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .link,
  .devtools-link {
    color: var(--sys-color-primary);
    text-decoration: underline;
    cursor: pointer;
    outline-offset: var(--sys-size-2);
    padding: 0;
    font-weight: var(--ref-typeface-weight-regular);
  }

  .padded {
    padding: var(--sys-size-2) 0;
  }

  .settings-container-wrapper {
    position: absolute;
    inset: var(--sys-size-8) 0 0;
    overflow: auto;
    padding: var(--sys-size-3) var(--sys-size-6) var(--sys-size-6);
    display: flex;
    flex-direction: column;
  }

  header {
    font-size: var(--sys-typescale-headline3-size);
    font-weight: var(--ref-typeface-weight-regular);
  }

  .disabled-explainer {
    background-color: var(--sys-color-surface-yellow);
    border-radius: var(--sys-shape-corner-medium-small);
    margin-top: var(--sys-size-11);
    padding: var(--sys-size-6) var(--sys-size-11) var(--sys-size-8);
    width: 100%;
    max-width: var(--sys-size-35);
    min-width: var(--sys-size-28);
    color: var(--sys-color-yellow);
  }

  .disabled-explainer-row {
    display: flex;
    gap: var(--sys-size-6);
    margin-top: var(--sys-size-4);
  }

  .allowed-tools-section {
    margin-top: var(--sys-size-11);
    min-width: var(--sys-size-28);
    max-width: var(--sys-size-35);
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--sys-size-5);
  }

  .allowed-tools-title {
    font: var(--sys-typescale-headline5);
    color: var(--sys-color-on-surface);
    margin: 0;
  }

  .allowed-tools-card {
    border-radius: var(--sys-size-5);
    box-shadow: var(--sys-elevation-level2);
    background-color: var(--app-color-card-background);
    overflow: hidden;
    width: 100%;
    padding-bottom: var(--sys-size-6);
  }

  .allowed-tools-description {
    padding: var(--sys-size-6) var(--sys-size-7);
    border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
    font: var(--sys-typescale-body5-regular);
    line-height: var(--sys-typescale-body5-line-height);
    color: var(--sys-color-on-surface);
  }

  .allowed-tool-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--sys-size-6);
    padding: var(--sys-size-4) var(--sys-size-7);
    min-height: var(--sys-size-12);
    font: var(--sys-typescale-body5-regular);
    color: var(--sys-color-on-surface);
  }

  .allowed-tool-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/*# sourceURL=${import.meta.resolve("./aiSettingsTab.css")} */`;

// ../../front_end/panels/settings/AISettingsTab.ts
var { html: html2, nothing: nothing3, render: render2, Directives: { ifDefined, classMap, ref: ref2 } } = Lit2;
var UIStrings2 = {
  /**
   * @description Header text for a list of things to consider in the context of generative AI features.
   */
  boostYourProductivity: "Boost your productivity with AI",
  /**
   * @description Text announcing a list of facts to consider when using a generative AI feature.
   */
  thingsToConsider: "Things to consider",
  /**
   * @description Text describing a fact to consider when using AI features.
   */
  experimentalFeatures: "These features use generative AI and may provide inaccurate or offensive information that doesn\u2019t represent Google\u2019s views",
  /**
   * @description Text describing a fact to consider when using AI features.
   */
  sendsDataToGoogle: "These features send relevant data to Google. Google collects this data and feedback to improve its products and services with the help of human reviewers. Avoid sharing sensitive or personal information.",
  /**
   * @description Text describing a fact to consider when using AI features.
   */
  sendsDataToGoogleNoLogging: "Your content won\u2019t be used by human reviewers to improve AI. Your organization may change these settings at any time.",
  /**
   * @description Text describing a fact to consider when using AI features.
   */
  dataCollection: "Depending on your region, Google may refrain from data collection",
  /**
   * @description Text describing a fact to consider when using AI features.
   */
  dataCollectionNoLogging: "Depending on your Google account management and/or region, Google may refrain from data collection",
  /**
   * @description Text describing the Console insights feature.
   */
  helpUnderstandConsole: "Helps you understand and fix console warnings and errors",
  /**
   * @description Text describing the auto annotations feature.
   */
  aIAnnotationsFeatureDescription: "Automatically generate titles for performance trace annotations",
  /**
   * @description Text explaining that the AI feature helps annotate a performance trace with auto-generated labels.
   */
  helpAnnotatePerformance: "Helps you annotate your performance trace with auto-generated labels",
  /**
   * @description Label for a button to expand an accordion.
   */
  showMore: "Show more",
  /**
   * @description Label for a button to collapse an accordion.
   */
  showLess: "Show less",
  /**
   * @description Accessible label for a button to expand an accordion for a specific setting.
   * @example {Code suggestions} PH1
   */
  showMoreOfSetting: "Show more of {PH1}",
  /**
   * @description Accessible label for a button to collapse an accordion for a specific setting.
   * @example {Code suggestions} PH1
   */
  showLessOfSetting: "Show less of {PH1}",
  /**
   * @description Header for a list of feature attributes. 'When on, you'll be able to …'.
   */
  whenOn: "When on",
  /**
   * @description Description of the Console insights feature.
   */
  explainConsole: "Get explanations for console warnings and errors",
  /**
   * @description Description of the Console insights feature ('these issues' refers to Console warnings and errors).
   */
  receiveSuggestions: "Receive suggestions and code samples to address these issues",
  /**
   * @description Explainer for which data is being sent by the Console insights feature.
   */
  consoleInsightsSendsData: "To generate explanations, the console message, associated stack trace, related source code, and the associated network headers are sent to Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent by the Console insights feature without logging.
   */
  consoleInsightsSendsDataNoLogging: "To generate explanations, the console message, associated stack trace, related source code, and the associated network headers are sent to Google. This data won\u2019t be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Reference to the terms of service and privacy notice.
   * @example {Google Terms of Service} PH1
   * @example {Privacy Notice} PH2
   */
  termsOfServicePrivacyNotice: "Use of these features is subject to the {PH1} and {PH2}",
  /**
   * @description Text describing the AI assistance feature.
   */
  aiAssistanceDescription: "Get context-aware help on the inspected page",
  /**
   * @description First item in the description of the AI assistance feature.
   */
  aiAssistanceWhenOnItem1: "Debug styling, network, performance, source code, accessibility and storage issues with DevTools AI assistance",
  /**
   * @description Second item in the description of the AI assistance feature.
   */
  aiAssistanceWhenOnItem2: "Follow the agent\u2019s reasoning step-by-step and quickly jump to the relevant source data",
  /**
   * @description Explainer for which data is being sent by the AI assistance feature.
   */
  aiAssistanceThingsToConsider: "To generate explanations, chat messages, data accessible for this site via DevTools panels and Web APIs, and items you select such as network requests, files, and performance traces are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won\u2019t always get it right.",
  /**
   * @description Explainer for which data is being sent by the AI assistance feature when logging is disabled.
   */
  aiAssistanceThingsToConsiderNoLogging: "To generate explanations, chat messages, data accessible for this site via DevTools panels and Web APIs, and items you select such as network requests, files, and performance traces are sent to Google. The content you submit and that is generated by this feature won\u2019t be used to improve Google\u2019s AI models. This is an experimental AI feature and won\u2019t always get it right.",
  /**
   * @description Text describing the code suggestions feature.
   */
  helpUnderstandCodeSuggestions: "Write code faster with AI-powered suggestions",
  /**
   * @description Text which is a hyperlink to more documentation.
   */
  learnMore: "Learn more",
  /**
   * @description Explainer for which data is being sent by the AI-generated annotations feature.
   */
  generatedAiAnnotationsSendData: "To generate annotation suggestions, your performance trace is sent to Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent by the AI-generated annotations feature without logging.
   */
  generatedAiAnnotationsSendDataNoLogging: "To generate annotation suggestions, your performance trace is sent to Google. This data won\u2019t be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Description of the code suggestions feature.
   */
  asYouTypeCodeSuggestions: "As you type in the Console or Sources panel, you\u2019ll get code suggestions. Press Tab to accept one.",
  /**
   * @description First item in the description of the code suggestions feature.
   */
  asYouTypeRelevantDataIsBeingSentToGoogle: "As you type, relevant data is being sent to Google to generate code suggestions. Press Tab to accept.",
  /**
   * @description Second item in the description of the code suggestions feature.
   */
  describeCodeInComment: "In Console or Sources, describe the code you need in a comment, then press Ctrl+I to generate it",
  /**
   * @description Second item in the description of the code suggestions feature for macOS.
   */
  describeCodeInCommentForMacOs: "In Console or Sources, describe the code you need in a comment, then press Cmd+I to generate it",
  /**
   * @description Explainer for which data is being sent for the code suggestions feature.
   */
  codeSuggestionsSendData: "To generate code suggestions, your console input, the history of your current console session, the currently inspected CSS, and the contents of the currently open file are shared with Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent for the code suggestions feature without logging.
   */
  codeSuggestionsSendDataNoLogging: "To generate code suggestions, your console input, the history of your current console session, the currently inspected CSS, and the contents of the currently open file are shared with Google. This data won\u2019t be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Label for a link to the terms of service.
   */
  termsOfService: "Google Terms of Service",
  /**
   * @description Label for a link to the privacy notice.
   */
  privacyNotice: "Google Privacy Policy",
  /**
   * @description Label for a toggle to enable the Console insights feature.
   */
  enableConsoleInsights: "Enable `Console insights`",
  /**
   * @description Label for a toggle to enable the AI assistance feature.
   */
  enableAiAssistance: "Enable AI assistance",
  /**
   * @description Label for a toggle to enable the AI annotation feature.
   */
  enableAiSuggestedAnnotations: "Enable AI suggestions for performance panel annotations",
  /**
   * @description Label for a toggle to enable the AI code suggestions feature.
   */
  enableAiCodeSuggestions: "Enable AI code suggestions",
  /**
   * @description Message shown to the user if the age check isn't successful.
   */
  ageRestricted: "This feature is only available to users 18 years or older",
  /**
   * @description The error message when the user isn't logged in to Chrome.
   */
  notLoggedIn: "This feature is only available when you sign in to Chrome with your Google account",
  /**
   * @description Message shown when the user is offline.
   */
  offline: "This feature is only available with an active internet connection",
  /**
   * @description Text informing the user that AI assistance isn't available in Incognito mode or Guest mode.
   */
  notAvailableInIncognitoMode: "AI assistance isn\u2019t available in Incognito mode or Guest mode",
  /**
   * @description Message shown to the user if the DevTools locale is not
   * supported.
   */
  wrongLocale: "To use this feature, set your language preference to English in DevTools settings",
  /**
   * @description Message shown to the user if the user's region is not
   * supported.
   */
  geoRestricted: "This feature is unavailable in your region",
  /**
   * @description Message shown to the user if the enterprise policy does
   * not allow this feature.
   */
  policyRestricted: "This setting is managed by your administrator"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/settings/AISettingsTab.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var UIStringsNotTranslate = {
  /**
   * @description Header of the list of AI tools allowed to run without asking user permission.
   */
  allowedTools: "Allowed tools",
  /**
   * @description Explains the list of AI tools allowed to run without asking user permission.
   */
  allowedToolsDescription: "Tools in this list can be run by the AI agent without asking. Remove them if you want to be asked for permission every time.",
  /**
   * @description Title of a button that removes an AI tool from the list of allowed tools.
   */
  removeAllowedTool: "Remove from allowed tools",
  /**
   * @description Text shown in the list of allowed AI tools when the list is empty.
   */
  noAllowedTools: "No tools allowed yet"
};
var lockedString = i18n3.i18n.lockedString;
var AI_SETTINGS_TAB_DEFAULT_VIEW = (input, output, target) => {
  const disabledReasonsExplainer = input.disabledReasons.length ? html2`
    <div class="disabled-explainer">
      ${input.disabledReasons.map((reason) => html2`
        <div class="disabled-explainer-row">
          <devtools-icon name="warning" class="medium" style="color: var(--icon-warning);">
          </devtools-icon>
          ${reason}
        </div>
      `)}
    </div>
  ` : nothing3;
  const sharedDisclaimer = html2`
    <div class="shared-disclaimer">
      <h2>${i18nString2(UIStrings2.boostYourProductivity)}</h2>
      <h3 class="disclaimer-list-header">${i18nString2(UIStrings2.thingsToConsider)}</h3>
      <div class="disclaimer-list">
        ${input.sharedDisclaimerBulletPoints.map(
    (item2) => html2`<div><devtools-icon .name=${item2.icon} class="medium"></devtools-icon>
              </div><div>${item2.text}</div>`
  )}
      </div>
    </div>
  `;
  const renderSettingItem = (settingItem) => {
    return html2`
      <div>
        <devtools-icon class="extra-large" .name=${settingItem.iconName}>
        </devtools-icon>
      </div>
      <div class="padded">${settingItem.text}</div>
    `;
  };
  const isDisabled = input.disabledReasons.length > 0;
  const disabledReasonsJoined = input.disabledReasons.join("\n") || void 0;
  const settings = Array.from(input.settingToParams.entries()).map(([settingName, settingData]) => {
    const isChecked = settingData.setting ? Boolean(settingData.setting.get()) : false;
    const detailsClasses = {
      "whole-row": true,
      open: settingData.settingExpandState.isSettingExpanded
    };
    const tabindex = settingData.settingExpandState.isSettingExpanded ? "0" : "-1";
    const isSettingDisabled = isDisabled || Boolean(settingData.disabledReasons?.length) || settingData.setting instanceof AiAssistanceModel.AiSetting.AiSetting && settingData.setting.disabled;
    return html2`
      <div class="accordion-header" @click=${input.expandSetting.bind(void 0, settingName)}>
        <div class="icon-container centered">
          <devtools-icon name=${settingData.iconName}></devtools-icon>
        </div>
        <div class="setting-card">
          <h2>${settingData.settingName}</h2>
          <div class="setting-description">${settingData.settingDescription}</div>
        </div>
        <div class="dropdown centered">
          <devtools-button
            .data=${{
      title: settingData.settingExpandState.isSettingExpanded ? i18nString2(UIStrings2.showLess) : i18nString2(UIStrings2.showMore),
      accessibleLabel: settingData.settingExpandState.isSettingExpanded ? i18nString2(UIStrings2.showLessOfSetting, { PH1: settingData.settingName }) : i18nString2(UIStrings2.showMoreOfSetting, { PH1: settingData.settingName }),
      size: Buttons2.Button.Size.SMALL,
      iconName: settingData.settingExpandState.isSettingExpanded ? "chevron-up" : "chevron-down",
      variant: Buttons2.Button.Variant.ICON,
      jslogContext: settingData.settingExpandState.expandSettingJSLogContext
    }}
          ></devtools-button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="toggle-container centered"
        title=${ifDefined(disabledReasonsJoined)}
        @click=${settingData.setting ? input.toggleSetting.bind(void 0, settingName) : nothing3}
      >
        <devtools-switch
          .checked=${isChecked && !isSettingDisabled}
          .jslogContext=${settingName}
          .disabled=${isSettingDisabled || !settingData.setting}
          .label=${disabledReasonsJoined || settingData.enableSettingText}
          data-testid=${settingData.enableSettingText}
          @switchchange=${settingData.setting ? input.toggleSetting.bind(void 0, settingName) : nothing3}
        ></devtools-switch>
      </div>
      <div class=${classMap(detailsClasses)}>
        <div class="overflow-hidden">
          <div class="expansion-grid">
            <h3 class="expansion-grid-whole-row">${i18nString2(UIStrings2.whenOn)}</h3>
            ${settingData.settingItems.map((item2) => renderSettingItem(item2))}
            <h3 class="expansion-grid-whole-row">${i18nString2(UIStrings2.thingsToConsider)}</h3>
            ${settingData.toConsiderSettingItems.map((item2) => renderSettingItem(item2))}
            <div class="expansion-grid-whole-row">
              <devtools-link
                href=${settingData.learnMoreLink.url}
                class="link"
                tabindex=${tabindex}
                .jslogContext=${settingData.learnMoreLink.linkJSLogContext}
              >${i18nString2(UIStrings2.learnMore)}</devtools-link>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  const renderAllowedTool = (tool) => html2`
    <div class="allowed-tool-row" data-tool-name=${tool.toolName}>
      <span class="allowed-tool-name">${tool.displayName}</span>
      <devtools-button
        .data=${{
    variant: Buttons2.Button.Variant.ICON,
    size: Buttons2.Button.Size.SMALL,
    iconName: "bin",
    title: lockedString(UIStringsNotTranslate.removeAllowedTool),
    accessibleLabel: lockedString(`Remove ${tool.displayName} from allowed tools`),
    jslogContext: "ai-remove-allowed-tool"
  }}
        @click=${() => input.removeAllowedTool(tool.toolName)}
      ></devtools-button>
    </div>
  `;
  const allowedTools = input.isNaturalLanguageInterfaceEnabled ? html2`
    <div class="allowed-tools-section" jslog=${VisualLogging2.section("ai-allowed-tools")}
      ${ref2((el) => {
    output.highlightAllowedTools = el ? () => PanelUtils2.highlightElement(el) : void 0;
  })}>
      <h2 class="allowed-tools-title">${lockedString(UIStringsNotTranslate.allowedTools)}</h2>
      <div class="allowed-tools-card">
        <div class="allowed-tools-description">${lockedString(UIStringsNotTranslate.allowedToolsDescription)}</div>
        ${input.allowedTools.length ? input.allowedTools.map(renderAllowedTool) : html2`
          <div class="allowed-tool-row">
            <span>${lockedString(UIStringsNotTranslate.noAllowedTools)}</span>
          </div>
        `}
      </div>
    </div>
  ` : nothing3;
  render2(html2`
    <style>${Input.checkboxStyles}</style>
    <style>${aiSettingsTab_css_default}</style>
    <div class="ai-settings-container">
    <div class="settings-container-wrapper" jslog=${VisualLogging2.pane("chrome-ai")}>
      ${sharedDisclaimer}
      ${input.settingToParams.size ? html2`
        ${disabledReasonsExplainer}
        <div class="settings-container">
          ${settings}
        </div>
      ` : nothing3}
      ${allowedTools}
    </div></div>
  `, target);
};
var AISettingsTab = class extends UI2.Widget.VBox {
  #view;
  #viewOutput = {};
  #consoleInsightsSetting;
  #aiAnnotationsSetting;
  #aiAssistanceSetting;
  #aiCodeCompletionSetting;
  #aidaAvailability = Host2.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL;
  #boundOnAidaAvailabilityChange;
  // Setting to parameters needed to display it in the UI.
  // To display a a setting, it needs to be added to this map.
  #settingToParams = /* @__PURE__ */ new Map();
  #alwaysAllowedTools = new AiAssistanceModel.AlwaysAllowedTools.AlwaysAllowedTools(Common2.Settings.Settings.instance());
  constructor(view) {
    super();
    this.#consoleInsightsSetting = new AiAssistanceModel.AiSetting.AiSetting(
      AiAssistanceModel.AiUtils.consoleInsightsEnabledSettingDescriptor,
      Host2.AidaClient.HostConfigTracker.instance(),
      Common2.Settings.Settings.instance()
    );
    this.#aiAssistanceSetting = new AiAssistanceModel.AiSetting.AiSetting(
      AiAssistanceModel.AiUtils.aiAssistanceEnabledSettingDescriptor,
      Host2.AidaClient.HostConfigTracker.instance(),
      Common2.Settings.Settings.instance()
    );
    if (Root2.Runtime.hostConfig.devToolsAiGeneratedTimelineLabels?.enabled) {
      this.#aiAnnotationsSetting = Common2.Settings.Settings.instance().createSetting("ai-annotations-enabled", false);
    }
    if (Root2.Runtime.hostConfig.devToolsAiCodeCompletion?.enabled) {
      this.#aiCodeCompletionSetting = Common2.Settings.Settings.instance().createSetting("ai-code-completion-enabled", false);
    }
    this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
    this.#initSettings();
    this.#view = view ?? AI_SETTINGS_TAB_DEFAULT_VIEW;
  }
  #mapSettingDisabledReasons(reasons) {
    const mappedReasons = [];
    for (const reason of reasons) {
      switch (reason) {
        case AiAssistanceModel.AiUtils.DisabledReason.GEO_RESTRICTED:
          mappedReasons.push(i18nString2(UIStrings2.geoRestricted));
          break;
        case AiAssistanceModel.AiUtils.DisabledReason.POLICY_RESTRICTED:
          mappedReasons.push(i18nString2(UIStrings2.policyRestricted));
          break;
        case AiAssistanceModel.AiUtils.DisabledReason.WRONG_LOCALE:
          mappedReasons.push(i18nString2(UIStrings2.wrongLocale));
          break;
        case AiAssistanceModel.AiUtils.DisabledReason.NOT_SUPPORTED:
          break;
      }
    }
    return mappedReasons;
  }
  #getDisabledReasons() {
    const preconditions = AiAssistanceModel.AiUtils.getDisabledReasons(this.#aidaAvailability);
    const mappedReasons = [];
    for (const precondition of preconditions) {
      switch (precondition) {
        case AiAssistanceModel.AiUtils.FrontendAccessPrecondition.IS_OFF_THE_RECORD:
          mappedReasons.push(i18nString2(UIStrings2.notAvailableInIncognitoMode));
          break;
        case Host2.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL:
        case Host2.AidaClient.AidaAccessPreconditions.SYNC_IS_PAUSED:
          mappedReasons.push(i18nString2(UIStrings2.notLoggedIn));
          break;
        case Host2.AidaClient.AidaAccessPreconditions.NO_INTERNET:
          mappedReasons.push(i18nString2(UIStrings2.offline));
          break;
        case AiAssistanceModel.AiUtils.FrontendAccessPrecondition.AGE_RESTRICTED:
          mappedReasons.push(i18nString2(UIStrings2.ageRestricted));
          break;
        default:
          Platform2.assertNever(precondition, `Unknown precondition: ${precondition}`);
      }
    }
    const settingDisabledReasons = Array.from(/* @__PURE__ */ new Set([
      ...this.#mapSettingDisabledReasons(this.#consoleInsightsSetting.disabledReasons),
      ...this.#mapSettingDisabledReasons(this.#aiAssistanceSetting.disabledReasons)
    ]));
    return [...mappedReasons, ...settingDisabledReasons];
  }
  performUpdate() {
    const viewInput = {
      disabledReasons: this.#getDisabledReasons(),
      sharedDisclaimerBulletPoints: this.#getSharedDisclaimerBulletPoints(),
      settingToParams: this.#settingToParams,
      isNaturalLanguageInterfaceEnabled: AiAssistanceModel.AiUtils.isNaturalLanguageInterfaceEnabled(),
      allowedTools: this.#getAllowedTools(),
      expandSetting: this.#expandSetting.bind(this),
      toggleSetting: this.#toggleSetting.bind(this),
      removeAllowedTool: this.#removeAllowedTool.bind(this)
    };
    this.#view(viewInput, this.#viewOutput, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    Host2.AidaClient.HostConfigTracker.instance().addEventListener(
      Host2.AidaClient.Events.AIDA_AVAILABILITY_CHANGED,
      this.#boundOnAidaAvailabilityChange
    );
    this.#alwaysAllowedTools.addEventListener(
      AiAssistanceModel.AlwaysAllowedTools.Events.TOOLS_CHANGED,
      this.requestUpdate,
      this
    );
    const initialAvailability = Host2.AidaClient.HostConfigTracker.instance().aidaAvailability;
    if (initialAvailability !== void 0) {
      this.#updateAidaAvailability(initialAvailability);
    }
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    Host2.AidaClient.HostConfigTracker.instance().removeEventListener(
      Host2.AidaClient.Events.AIDA_AVAILABILITY_CHANGED,
      this.#boundOnAidaAvailabilityChange
    );
    this.#alwaysAllowedTools.removeEventListener(
      AiAssistanceModel.AlwaysAllowedTools.Events.TOOLS_CHANGED,
      this.requestUpdate,
      this
    );
  }
  #getAllowedTools() {
    return this.#alwaysAllowedTools.list().map((tn) => {
      const tool = AiAssistanceModel.ToolRegistry.ToolRegistry.get(tn);
      return { toolName: tn, displayName: tool?.displayName ?? tn };
    }).sort((a, b) => a.displayName.localeCompare(b.displayName));
  }
  #removeAllowedTool(name) {
    this.#alwaysAllowedTools.remove(name);
    void VisualLogging2.logFunctionCall("ai-permission-revoked", Platform2.StringUtilities.toKebabCase(name));
  }
  /**
   * Called by `SettingsScreen.Revealer` after this tab is shown via `Common.Revealer.reveal(setting)`.
   */
  highlightObject(object) {
    if (!(object instanceof Common2.Settings.Setting) || object.name !== AiAssistanceModel.AlwaysAllowedTools.alwaysAllowedToolsSettingDescriptor.name) {
      return;
    }
    void this.updateComplete.then(() => this.#viewOutput.highlightAllowedTools?.());
  }
  // Define all parameter needed to render a setting
  #initSettings() {
    const noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    if (!this.#consoleInsightsSetting.unavailable) {
      const consoleInsightsData = {
        settingName: i18n3.i18n.lockedString("Console Insights"),
        setting: this.#consoleInsightsSetting,
        disabledReasons: this.#mapSettingDisabledReasons(this.#consoleInsightsSetting.disabledReasons),
        iconName: "lightbulb-spark",
        settingDescription: i18nString2(UIStrings2.helpUnderstandConsole),
        enableSettingText: i18nString2(UIStrings2.enableConsoleInsights),
        settingItems: [
          { iconName: "lightbulb", text: i18nString2(UIStrings2.explainConsole) },
          { iconName: "code", text: i18nString2(UIStrings2.receiveSuggestions) }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString2(UIStrings2.consoleInsightsSendsDataNoLogging) : i18nString2(UIStrings2.consoleInsightsSendsData)
        }],
        learnMoreLink: {
          url: "https://developer.chrome.com/docs/devtools/console/understand-messages",
          linkJSLogContext: "learn-more.console-insights"
        },
        settingExpandState: {
          isSettingExpanded: false,
          expandSettingJSLogContext: "console-insights.accordion"
        }
      };
      this.#settingToParams.set("console-insights-enabled", consoleInsightsData);
    }
    if (!this.#aiAssistanceSetting.unavailable) {
      const aiAssistanceData = {
        settingName: i18n3.i18n.lockedString(AiAssistanceModel.AiUtils.isGeminiBranding() ? "Gemini in Chrome DevTools" : "AI assistance"),
        setting: this.#aiAssistanceSetting,
        disabledReasons: this.#mapSettingDisabledReasons(this.#aiAssistanceSetting.disabledReasons),
        iconName: AiAssistanceModel.AiUtils.getIconName(),
        settingDescription: this.#getAiAssistanceSettingDescription(),
        enableSettingText: i18nString2(UIStrings2.enableAiAssistance),
        settingItems: [
          { iconName: "info", text: this.#getAiAssistanceSettingInfo() },
          {
            iconName: "pen-spark",
            text: i18nString2(UIStrings2.aiAssistanceWhenOnItem2)
          }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString2(UIStrings2.aiAssistanceThingsToConsiderNoLogging) : i18nString2(UIStrings2.aiAssistanceThingsToConsider)
        }],
        learnMoreLink: {
          url: "https://developer.chrome.com/docs/devtools/ai-assistance",
          linkJSLogContext: "learn-more.ai-assistance"
        },
        settingExpandState: {
          isSettingExpanded: false,
          expandSettingJSLogContext: "freestyler.accordion"
        }
      };
      this.#settingToParams.set("ai-assistance-enabled", aiAssistanceData);
    }
    if (this.#aiAnnotationsSetting) {
      const aiAnnotationsData = {
        settingName: i18n3.i18n.lockedString("Auto annotations"),
        setting: this.#aiAnnotationsSetting,
        iconName: "pen-spark",
        settingDescription: i18nString2(UIStrings2.aIAnnotationsFeatureDescription),
        enableSettingText: i18nString2(UIStrings2.enableAiSuggestedAnnotations),
        settingItems: [
          { iconName: "label-auto", text: i18nString2(UIStrings2.helpAnnotatePerformance) }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString2(UIStrings2.generatedAiAnnotationsSendDataNoLogging) : i18nString2(UIStrings2.generatedAiAnnotationsSendData)
        }],
        learnMoreLink: {
          url: "https://developer.chrome.com/docs/devtools/performance/annotations#auto-annotations",
          linkJSLogContext: "learn-more.auto-annotations"
        },
        settingExpandState: {
          isSettingExpanded: false,
          expandSettingJSLogContext: "auto-annotations.accordion"
        }
      };
      this.#settingToParams.set("ai-annotations-enabled", aiAnnotationsData);
    }
    if (this.#aiCodeCompletionSetting) {
      const settingItems = Root2.Runtime.hostConfig.devToolsAiCodeGeneration?.enabled ? [
        { iconName: "code", text: i18nString2(UIStrings2.asYouTypeRelevantDataIsBeingSentToGoogle) },
        {
          iconName: "text-analysis",
          text: Host2.Platform.isMac() ? i18nString2(UIStrings2.describeCodeInCommentForMacOs) : i18nString2(UIStrings2.describeCodeInComment)
        }
      ] : [{ iconName: "code", text: i18nString2(UIStrings2.asYouTypeCodeSuggestions) }];
      const aiCodeCompletionData = {
        settingName: i18n3.i18n.lockedString("Code suggestions"),
        setting: this.#aiCodeCompletionSetting,
        iconName: "text-analysis",
        settingDescription: i18nString2(UIStrings2.helpUnderstandCodeSuggestions),
        enableSettingText: i18nString2(UIStrings2.enableAiCodeSuggestions),
        settingItems,
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString2(UIStrings2.codeSuggestionsSendDataNoLogging) : i18nString2(UIStrings2.codeSuggestionsSendData)
        }],
        learnMoreLink: {
          url: " https://developers.chrome.com/docs/devtools/ai-assistance/code-completion",
          linkJSLogContext: "learn-more.code-completion"
        },
        settingExpandState: {
          isSettingExpanded: false,
          expandSettingJSLogContext: "code-completion.accordion"
        }
      };
      this.#settingToParams.set("ai-code-completion-enabled", aiCodeCompletionData);
    }
  }
  #updateAidaAvailability(aidaAvailability) {
    if (aidaAvailability !== this.#aidaAvailability) {
      this.#aidaAvailability = aidaAvailability;
      this.requestUpdate();
    }
  }
  #onAidaAvailabilityChange(ev) {
    this.#updateAidaAvailability(ev.data);
  }
  #getAiAssistanceSettingDescription() {
    return i18nString2(UIStrings2.aiAssistanceDescription);
  }
  #getAiAssistanceSettingInfo() {
    return i18nString2(UIStrings2.aiAssistanceWhenOnItem1);
  }
  #expandSetting(settingName) {
    const settingData = this.#settingToParams.get(settingName);
    if (!settingData) {
      return;
    }
    settingData.settingExpandState.isSettingExpanded = !settingData.settingExpandState.isSettingExpanded;
    this.requestUpdate();
  }
  #toggleSetting(settingName, ev) {
    if (ev.target instanceof Switch.Switch.Switch && ev.type !== Switch.Switch.SwitchChangeEvent.eventName) {
      return;
    }
    const settingData = this.#settingToParams.get(settingName);
    if (!settingData || !settingData.setting) {
      return;
    }
    const setting = settingData.setting;
    const oldSettingValue = setting.get();
    setting.set(!oldSettingValue);
    if (!oldSettingValue && !settingData.settingExpandState.isSettingExpanded) {
      settingData.settingExpandState.isSettingExpanded = true;
    }
    if (settingName === "console-insights-enabled") {
      if (oldSettingValue) {
        Common2.Settings.Settings.instance().createLocalSetting("console-insights-onboarding-finished", false).set(false);
      } else {
        Common2.Settings.Settings.instance().createSetting("console-insights-skip-reminder", true, Common2.Settings.SettingStorageType.SESSION).set(true);
      }
    } else if (settingName === "ai-assistance-enabled") {
      if (!setting.get()) {
        void AiAssistanceModel.AiHistoryStorage.AiHistoryStorage.instance().deleteAll();
      }
      if (setting.get()) {
        Common2.Settings.Settings.instance().resolve(AiAssistanceModel.AiUtils.aiAssistanceV2OptInChangeDialogSeenSettingDescriptor).set(true);
      }
    }
    this.requestUpdate();
  }
  #getSharedDisclaimerBulletPoints() {
    const tosLink = html2`<devtools-link href="https://policies.google.com/terms" .jslogContext=${"terms-of-service"}>${i18nString2(UIStrings2.termsOfService)}</devtools-link>`;
    const privacyNoticeLink = html2`<devtools-link href="https://policies.google.com/privacy" .jslogContext=${"privacy-notice"}>${i18nString2(UIStrings2.privacyNotice)}</devtools-link>`;
    const noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    return [
      { icon: "psychiatry", text: i18nString2(UIStrings2.experimentalFeatures) },
      {
        icon: "google",
        text: noLogging ? i18nString2(UIStrings2.sendsDataToGoogleNoLogging) : i18nString2(UIStrings2.sendsDataToGoogle)
      },
      {
        icon: "corporate-fare",
        text: noLogging ? i18nString2(UIStrings2.dataCollectionNoLogging) : i18nString2(UIStrings2.dataCollection)
      },
      {
        icon: "policy",
        text: uiI18n.getFormatLocalizedStringTemplate(str_2, UIStrings2.termsOfServicePrivacyNotice, {
          PH1: tosLink,
          PH2: privacyNoticeLink
        })
      }
    ];
  }
};

// ../../front_end/panels/settings/BackendLinkingSettingsTab.ts
var BackendLinkingSettingsTab_exports = {};
__export(BackendLinkingSettingsTab_exports, {
  BackendLinkingSettingsTab: () => BackendLinkingSettingsTab,
  DEFAULT_VIEW: () => DEFAULT_VIEW
});
import "../../ui/legacy/components/data_grid/data_grid.js";
import * as Common3 from "../../core/common/common.js";
import * as i18n5 from "../../core/i18n/i18n.js";
import * as UI3 from "../../ui/legacy/legacy.js";
import { Directives, html as html3, nothing as nothing4, render as render3 } from "../../ui/lit/lit.js";
import * as VisualLogging3 from "../../ui/visual_logging/visual_logging.js";
import * as NetworkForward from "../network/forward/forward.js";

// gen/front_end/panels/settings/backendLinkingSettingsTab.css.js
var backendLinkingSettingsTab_css_default = `/*
 * Copyright 2026 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .settings-card-container {
    align-items: stretch;
    padding: 0 var(--sys-size-8);
  }

  devtools-card {
    max-width: 100%;
  }

  .description-text {
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body-medium-size);
    line-height: var(--sys-typescale-body-medium-line-height);
    margin: 0 0 var(--sys-size-5);
  }

  .intro-section {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--sys-size-2) var(--sys-size-6);
    align-items: baseline;
    font-size: var(--sys-typescale-body-small-size);
    line-height: var(--sys-typescale-body-medium-line-height);
    margin: 0;

    dd {
      margin: 0;
    }

    .column-header {
      font-size: var(--sys-typescale-label-small-size);
      font-weight: var(--ref-typeface-weight-medium);
      border-bottom: 1px solid var(--sys-color-neutral-outline);
      padding-bottom: var(--sys-size-2);
      margin-bottom: var(--sys-size-3);
    }

    .placeholder,
    .source-header {
      font-family: var(--monospace-font-family);
    }

    .placeholder {
      color: var(--sys-color-primary);
    }

    .placeholder-description {
      grid-column: 1 / -1;
      color: var(--sys-color-on-surface-subtle);
      margin-bottom: var(--sys-size-6);
    }
  }

  .warning-icon {
    margin-right: var(--sys-size-3);
    vertical-align: text-bottom;
  }

  td.editing .warning-icon {
    display: none;
  }

  .warning-footer {
    display: flex;
    align-items: center;
    gap: var(--sys-size-3);
    color: var(--sys-color-on-surface-subtle);
    font-size: var(--sys-typescale-body-small-size);
    line-height: var(--sys-typescale-body-medium-line-height);
  }
}

/*# sourceURL=${import.meta.resolve("./backendLinkingSettingsTab.css")} */`;

// ../../front_end/panels/settings/BackendLinkingSettingsTab.ts
var { ifDefined: ifDefined2 } = Directives;
var UIStrings3 = {
  /**
   * @description Title for the backend linking settings tab card in DevTools Settings.
   */
  rulesSectionHeading: "Backend linking rules",
  /**
   * @description Title for the backend linking settings tab card in DevTools Settings.
   */
  placeholderDocHeading: "Available placeholders",
  /**
   * @description Description explaining what backend linking rules do.
   */
  description: "Configure links to external backend debugging, APM, or tracing tools for matching network requests. Use placeholders to insert correlation IDs extracted from request and response headers.",
  /**
   * @description Header column title in the backend linking rules table for the URL pattern.
   */
  urlPatternColumn: "URL pattern",
  /**
   * @description Header column title in the backend linking rules table for the target URL template.
   */
  targetUrlTemplateColumn: "Target URL template",
  /**
   * @description Header column title in the backend linking rules table for the label.
   */
  labelColumn: "Label",
  /**
   * @description Header column title in the placeholder reference table.
   */
  placeholderColumn: "Placeholder",
  /**
   * @description Header source column title in the placeholder reference table.
   */
  headerColumn: "Referenced header / property",
  /**
   * @description Description of the devtoolsDebugId placeholder. The placeholder values will always be `desc`, `devtools-debug-id`, and `Server-Timing`.
   */
  devtoolsDebugIdDescription: "Value of the `desc` parameter in the `devtools-debug-id` `Server-Timing` entry",
  /**
   * @description Description of the requestId placeholder. The placeholder value will always be `X-Request-ID`.
   */
  requestIdDescription: "Value of the `X-Request-ID` response header",
  /**
   * @description Description of the correlationId placeholder. The placeholder values will always be `X-Correlation-ID` and `Correlation-ID`.
   */
  correlationIdDescription: "Value of the `X-Correlation-ID` or `Correlation-ID` response header",
  /**
   * @description Description of the traceId placeholder. The placeholder values will always be `trace-id`, `Server-Timing`, and `traceparent`.
   */
  traceIdDescription: "16-byte hex trace ID from the `trace-id` response header or `Server-Timing` `traceparent` entry",
  /**
   * @description Description of the spanId placeholder. The placeholder values will always be `Server-Timing` and `traceparent`.
   */
  spanIdDescription: "8-byte hex parent span ID from the `Server-Timing` `traceparent` entry",
  /**
   * @description Error message in the backend linking settings tab when the URL pattern is empty.
   */
  urlPatternCannotBeEmpty: "URL pattern can\u2019t be empty",
  /**
   * @description Error message in the backend linking settings tab when the URL pattern is invalid.
   */
  invalidUrlPattern: "URL pattern must be a valid URL pattern",
  /**
   * @description Error message in the backend linking settings tab when the target URL template is empty.
   */
  targetUrlTemplateCannotBeEmpty: "Target URL template can\u2019t be empty",
  /**
   * @description Error message in the backend linking settings tab when the target URL template does not contain a
   * placeholder.
   */
  templateRequiresPlaceholder: "Target URL template must contain at least one placeholder",
  /**
   * @description Error message in the backend linking settings tab when the label is empty.
   */
  labelCannotBeEmpty: "Label can\u2019t be empty",
  /**
   * @description Warning message displayed below the backend linking rules table when one or more rules are invalid.
   */
  invalidRulesWarning: "Invalid rules won\u2019t be applied or saved"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/settings/BackendLinkingSettingsTab.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
function validPattern(urlPattern) {
  try {
    new URLPattern(urlPattern);
    return true;
  } catch {
    return false;
  }
}
function hasPlaceholder(targetUrlTemplate) {
  return NetworkForward.BackendLinking.BACKEND_LINKING_PLACEHOLDERS.some((placeholder) => targetUrlTemplate.includes(placeholder));
}
function isRuleValid(rule) {
  return Boolean(rule.urlPattern) && validPattern(rule.urlPattern) && Boolean(rule.targetUrlTemplate) && hasPlaceholder(rule.targetUrlTemplate) && Boolean(rule.label);
}
var DEFAULT_VIEW = (input, output, target) => {
  const onCreate = (event) => {
    const data = event.detail;
    const urlPattern = data.urlPattern?.trim();
    const targetUrlTemplate = data.targetUrlTemplate?.trim();
    const label = data.label?.trim();
    if (!urlPattern && !targetUrlTemplate && !label) {
      return;
    }
    input.onAddRule({
      urlPattern: urlPattern ?? "",
      targetUrlTemplate: targetUrlTemplate ?? "",
      label: label ?? ""
    });
  };
  const onEdit = (rule, event) => {
    const { columnId, newText } = event.detail;
    const newRule = { ...rule };
    if (columnId === "urlPattern") {
      newRule.urlPattern = newText.trim();
    } else if (columnId === "targetUrlTemplate") {
      newRule.targetUrlTemplate = newText.trim();
    } else if (columnId === "label") {
      newRule.label = newText.trim();
    }
    input.onUpdateRule(rule, newRule);
  };
  render3(
    html3`
     <style>${backendLinkingSettingsTab_css_default}</style>
      <style>${UI3.inspectorCommonStyles}</style>
      <div class="settings-card-container-wrapper" jslog=${VisualLogging3.pane("backend-linking")}>
        <div class="settings-card-container">
          <devtools-card heading=${i18nString3(UIStrings3.rulesSectionHeading)}>
            <p class="description-text">${i18nString3(UIStrings3.description)}</p>
            <devtools-data-grid
              name=${i18nString3(UIStrings3.rulesSectionHeading)}
              striped
              inline
              deletable
              @delete=${() => {
    }}
              @create=${onCreate}>
              <table>
                <style>${backendLinkingSettingsTab_css_default}</style>
                <thead>
                  <tr>
                    <th id="urlPattern" editable>${i18nString3(UIStrings3.urlPatternColumn)}</th>
                    <th id="targetUrlTemplate" editable>${i18nString3(UIStrings3.targetUrlTemplateColumn)}</th>
                    <th id="label" editable>${i18nString3(UIStrings3.labelColumn)}</th>
                  </tr>
                </thead>
                <tbody>
                  ${input.rules.map((rule) => {
      return html3`
                    <tr @edit=${(event) => onEdit(rule, event)}
                        @delete=${() => input.onDeleteRule(rule)}>
                      <td title=${ifDefined2(
        !rule.urlPattern ? i18nString3(UIStrings3.urlPatternCannotBeEmpty) : !validPattern(rule.urlPattern) ? i18nString3(UIStrings3.invalidUrlPattern) : void 0
      )}>
                        <devtools-icon name="warning-filled" class="small warning-icon"
                          ?hidden=${Boolean(rule.urlPattern) && validPattern(rule.urlPattern)}></devtools-icon>
                        ${rule.urlPattern}
                      </td>
                      <td title=${ifDefined2(
        !rule.targetUrlTemplate ? i18nString3(UIStrings3.targetUrlTemplateCannotBeEmpty) : !hasPlaceholder(rule.targetUrlTemplate) ? i18nString3(UIStrings3.templateRequiresPlaceholder) : void 0
      )}>
                        <devtools-icon name="warning-filled" class="small warning-icon"
                          ?hidden=${Boolean(rule.targetUrlTemplate) && hasPlaceholder(rule.targetUrlTemplate)}></devtools-icon>
                        ${rule.targetUrlTemplate}
                      </td>
                      <td title=${ifDefined2(!rule.label ? i18nString3(UIStrings3.labelCannotBeEmpty) : void 0)}>
                        <devtools-icon name="warning-filled" class="small warning-icon"
                          ?hidden=${Boolean(rule.label)}></devtools-icon>
                        ${rule.label}
                      </td>
                    </tr>
                  `;
    })}
                  <tr placeholder></tr>
                </tbody>
              </table>
            </devtools-data-grid>
            ${input.rules.some((rule) => !isRuleValid(rule)) ? html3`
              <div class="warning-footer">
                <devtools-icon name="warning-filled" class="small"></devtools-icon>
                <span>${i18nString3(UIStrings3.invalidRulesWarning)}</span>
              </div>
            ` : nothing4}
          </devtools-card>
          <devtools-card heading=${i18nString3(UIStrings3.placeholderDocHeading)}>
            <dl class="intro-section">
              <div class="column-header">${i18nString3(UIStrings3.placeholderColumn)}</div>
              <div class="column-header">${i18nString3(UIStrings3.headerColumn)}</div>
              <dt class="placeholder">${"${devtoolsDebugId}"}</dt>
              <dd class="source-header">Server-Timing: devtools-debug-id</dd>
              <dd class="placeholder-description">${i18nString3(UIStrings3.devtoolsDebugIdDescription)}</dd>
              <dt class="placeholder">${"${requestId}"}</dt>
              <dd class="source-header">X-Request-ID</dd>
              <dd class="placeholder-description">${i18nString3(UIStrings3.requestIdDescription)}</dd>
              <dt class="placeholder">${"${correlationId}"}</dt>
              <dd class="source-header">X-Correlation-ID / Correlation-ID</dd>
              <dd class="placeholder-description">${i18nString3(UIStrings3.correlationIdDescription)}</dd>
              <dt class="placeholder">${"${traceId}"}</dt>
              <dd class="source-header">trace-id / Server-Timing: traceparent</dd>
              <dd class="placeholder-description">${i18nString3(UIStrings3.traceIdDescription)}</dd>
              <dt class="placeholder">${"${spanId}"}</dt>
              <dd class="source-header">Server-Timing: traceparent</dd>
              <dd class="placeholder-description">${i18nString3(UIStrings3.spanIdDescription)}</dd>
            </dl>
          </devtools-card>
        </div>
      </div>`,
    // clang-format on
    target
  );
};
var BackendLinkingSettingsTab = class extends UI3.Widget.VBox {
  #view;
  #rulesSetting;
  #rules = [];
  #isSaving = false;
  constructor(target, view = DEFAULT_VIEW) {
    super(target);
    this.#view = view;
    const res = Common3.Settings.Settings.instance().maybeResolve(
      NetworkForward.BackendLinking.backendLinkingRulesSettingDescriptor
    );
    if (!("setting" in res)) {
      throw new Error("Backend linking setting is not available");
    }
    this.#rulesSetting = res.setting;
  }
  wasShown() {
    super.wasShown();
    this.#rules = [...this.#rulesSetting.get()];
    this.#rulesSetting.addChangeListener(this.#onRulesSettingChanged, this);
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    this.#rulesSetting.removeChangeListener(this.#onRulesSettingChanged, this);
  }
  #onRulesSettingChanged() {
    if (this.#isSaving) {
      return;
    }
    this.#rules = [...this.#rulesSetting.get()];
    this.requestUpdate();
  }
  #saveRules() {
    this.#isSaving = true;
    try {
      this.#rulesSetting.set(this.#rules.filter(isRuleValid));
    } finally {
      this.#isSaving = false;
    }
    this.requestUpdate();
  }
  performUpdate() {
    const input = {
      rules: [...this.#rules],
      onAddRule: (rule) => {
        this.#rules.push(rule);
        this.#saveRules();
      },
      onUpdateRule: (oldRule, newRule) => {
        const index = this.#rules.indexOf(oldRule);
        if (index !== -1) {
          this.#rules[index] = newRule;
          this.#saveRules();
        }
      },
      onDeleteRule: (rule) => {
        const index = this.#rules.indexOf(rule);
        if (index !== -1) {
          this.#rules.splice(index, 1);
          this.#saveRules();
        }
      }
    };
    this.#view(input, void 0, this.contentElement);
  }
};

// ../../front_end/panels/settings/EditFileSystemView.ts
var EditFileSystemView_exports = {};
__export(EditFileSystemView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  EditFileSystemView: () => EditFileSystemView
});
import "../../ui/components/lists/lists.js";
import * as i18n7 from "../../core/i18n/i18n.js";
import * as Platform3 from "../../core/platform/platform.js";
import * as Buttons3 from "../../ui/components/buttons/buttons.js";
import * as UI4 from "../../ui/legacy/legacy.js";
import { Directives as Directives2, html as html4, nothing as nothing5, render as render4 } from "../../ui/lit/lit.js";

// gen/front_end/panels/settings/editFileSystemView.css.js
var editFileSystemView_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .excluded-folder-header {
    display: flex;
    flex-direction: column;
    min-height: var(--sys-size-16);
    padding: var(--sys-size-4) var(--sys-size-6);
    gap: var(--sys-size-4);

    & > .excluded-folder-url {
      color: var(--sys-color-on-surface-subtle);
      overflow-wrap: break-word;
    }
  }

  .excluded-folder-row {
    display: flex;
    align-items: center;
    flex: auto;
    min-width: 0;
    padding: var(--sys-size-2) var(--sys-size-4);

    &:has(devtools-prompt[editing]) {
      align-self: stretch;
      background-color: var(--app-color-card-background, var(--sys-color-cdt-base-container));
    }
  }

  .excluded-folder-path {
    flex: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    --devtools-text-prompt-min-width: 6em;
  }

  devtools-prompt.excluded-folder-path {
    cursor: text;
  }

  devtools-prompt.excluded-folder-path[editing] {
    overflow: visible;
  }

  .add-subfolder-button {
    align-self: flex-start;
  }
}

/*# sourceURL=${import.meta.resolve("./editFileSystemView.css")} */`;

// ../../front_end/panels/settings/EditFileSystemView.ts
var { ifDefined: ifDefined3, repeat: repeat2 } = Directives2;
var UIStrings4 = {
  /**
   * @description Text in edit file system view of the Workspace settings in Settings to indicate that the following string is a folder URL.
   */
  url: "URL",
  /**
   * @description Text in edit file system view of the Workspace settings in Settings.
   */
  excludedFolders: "Excluded sub-folders",
  /**
   * @description Error message when a file system path is an empty string.
   */
  enterAPath: "Enter a path",
  /**
   * @description Error message when a file system path is identical to an existing path.
   */
  enterAUniquePath: "Enter a unique path",
  /**
   * @description Text for the button to add a new excluded sub-folder.
   */
  addSubfolder: "Add sub-folder",
  /**
   * @description Accessible label for the excluded sub-folder path input in Workspace settings.
   */
  folderPath: "Folder path"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/settings/EditFileSystemView.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var NEW_ITEM_KEY = /* @__PURE__ */ Symbol("new-excluded-folder");
function renderExcludedFolderRow(folder, index, input) {
  const editing = input.editingIndex === index;
  const onPromptActivate = (event) => {
    if (editing) {
      return;
    }
    input.onEdit(index);
    event.consume(true);
  };
  return html4`
    <div
      class="excluded-folder-row"
      ?editable=${!editing}
      ?deletable=${!editing}>
      <devtools-prompt
        class="excluded-folder-path"
        render-as-block
        title=${ifDefined3(folder || void 0)}
        aria-label=${ifDefined3(editing ? i18nString4(UIStrings4.folderPath) : void 0)}
        value=${folder}
        ?editing=${editing}
        .validator=${(value) => input.validateFolder(index, value)}
        @click=${onPromptActivate}
        @commit=${(event) => input.onCommit(index, event.detail)}
        @cancel=${input.onCancel}>
        ${folder}
      </devtools-prompt>
    </div>
  `;
}
var DEFAULT_VIEW2 = (input, _output, target) => {
  const isAdding = input.editingIndex === input.excludedFolders.length;
  const items = isAdding ? [...input.excludedFolders, ""] : input.excludedFolders;
  render4(html4`
    <style>${editFileSystemView_css_default}</style>
    <div class="excluded-folder-header">
      <span>${i18nString4(UIStrings4.url)}</span>
      <span class="excluded-folder-url">${input.fileSystemPath}</span>
      <div class="excluded-folders-title">${i18nString4(UIStrings4.excludedFolders)}</div>
      ${items.length > 0 ? html4`
        <devtools-list
          ?disable-li-focus=${input.editingIndex !== null}
          @edit=${(e) => input.onEdit(e.detail.index)}
          @delete=${(e) => input.onDelete(e.detail.index)}>
          ${repeat2(
    items,
    (folder, index) => index === input.excludedFolders.length ? NEW_ITEM_KEY : folder,
    (folder, index) => renderExcludedFolderRow(folder, index, input)
  )}
        </devtools-list>
      ` : nothing5}
      <devtools-button
        class="add-subfolder-button"
        .variant=${Buttons3.Button.Variant.OUTLINED}
        .jslogContext=${"settings.add-excluded-folder"}
        @click=${input.onAdd}>
        ${i18nString4(UIStrings4.addSubfolder)}
      </devtools-button>
    </div>
  `, target);
};
var EditFileSystemView = class _EditFileSystemView extends UI4.Widget.VBox {
  #fileSystem;
  #excludedFolders = [];
  #editingIndex = null;
  #view;
  constructor(element, view = DEFAULT_VIEW2) {
    super(element);
    this.#view = view;
  }
  set fileSystem(fileSystem) {
    if (this.#fileSystem === fileSystem) {
      return;
    }
    this.#fileSystem = fileSystem;
    this.#editingIndex = null;
    this.#resyncExcludedFolders();
    this.requestUpdate();
  }
  wasShown() {
    super.wasShown();
    this.#editingIndex = null;
    this.#resyncExcludedFolders();
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    this.#editingIndex = null;
  }
  #resyncExcludedFolders() {
    this.#excludedFolders = this.#fileSystem?.excludedFolders().values().toArray() ?? [];
  }
  performUpdate() {
    const input = {
      fileSystemPath: this.#fileSystem?.path() ?? Platform3.DevToolsPath.urlString``,
      excludedFolders: [...this.#excludedFolders],
      editingIndex: this.#editingIndex,
      onAdd: this.#onAdd.bind(this),
      onEdit: this.#onEdit.bind(this),
      onDelete: this.#onDelete.bind(this),
      onCommit: this.#onCommit.bind(this),
      onCancel: this.#onCancel.bind(this),
      validateFolder: this.#validateFolder.bind(this)
    };
    this.#view(input, void 0, this.contentElement);
  }
  #onAdd() {
    if (this.#editingIndex === this.#excludedFolders.length) {
      return;
    }
    this.#editingIndex = this.#excludedFolders.length;
    this.requestUpdate();
  }
  #onEdit(index) {
    if (index < 0 || index >= this.#excludedFolders.length) {
      return;
    }
    this.#editingIndex = index;
    this.requestUpdate();
  }
  #onCancel() {
    if (!this.isShowing() || this.#editingIndex === null) {
      return;
    }
    this.#editingIndex = null;
    this.requestUpdate();
  }
  #onCommit(index, rawValue) {
    if (!this.isShowing() || this.#editingIndex === null) {
      return;
    }
    const isNew = index === this.#excludedFolders.length;
    if (!isNew && (index < 0 || index >= this.#excludedFolders.length)) {
      return;
    }
    if (this.#validateFolder(index, rawValue) !== null) {
      return;
    }
    const path = _EditFileSystemView.#normalizePrefix(rawValue.trim());
    if (isNew) {
      this.#excludedFolders.push(path);
      this.#fileSystem?.addExcludedFolder(path);
    } else if (this.#excludedFolders[index] !== path) {
      this.#fileSystem?.removeExcludedFolder(this.#excludedFolders[index]);
      this.#excludedFolders[index] = path;
      this.#fileSystem?.addExcludedFolder(path);
    }
    this.#editingIndex = null;
    this.requestUpdate();
  }
  #onDelete(index) {
    if (index < 0 || index >= this.#excludedFolders.length) {
      return;
    }
    this.#fileSystem?.removeExcludedFolder(this.#excludedFolders[index]);
    this.#excludedFolders.splice(index, 1);
    if (this.#editingIndex !== null) {
      if (this.#editingIndex === index) {
        this.#editingIndex = null;
      } else if (this.#editingIndex > index) {
        this.#editingIndex--;
      }
    }
    this.requestUpdate();
  }
  #validateFolder(index, rawInput) {
    const path = _EditFileSystemView.#normalizePrefix(rawInput.trim());
    if (!path) {
      return i18nString4(UIStrings4.enterAPath);
    }
    const isDuplicate = this.#excludedFolders.some((p, i) => i !== index && p === path);
    if (isDuplicate) {
      return i18nString4(UIStrings4.enterAUniquePath);
    }
    return null;
  }
  static #normalizePrefix(prefix) {
    if (!prefix) {
      return "";
    }
    return prefix + (prefix[prefix.length - 1] === "/" ? "" : "/");
  }
};

// ../../front_end/panels/settings/FrameworkIgnoreListSettingsTab.ts
var FrameworkIgnoreListSettingsTab_exports = {};
__export(FrameworkIgnoreListSettingsTab_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW3,
  FrameworkIgnoreListSettingsTab: () => FrameworkIgnoreListSettingsTab
});
import "../../ui/components/lists/lists.js";
import "../../ui/kit/kit.js";
import * as Common4 from "../../core/common/common.js";
import * as i18n9 from "../../core/i18n/i18n.js";
import * as Platform4 from "../../core/platform/platform.js";
import * as Workspace from "../../models/workspace/workspace.js";
import * as Buttons4 from "../../ui/components/buttons/buttons.js";
import * as UIHelpers2 from "../../ui/helpers/helpers.js";
import * as UI5 from "../../ui/legacy/legacy.js";
import { Directives as Directives3, html as html5, nothing as nothing6, render as render5 } from "../../ui/lit/lit.js";
import * as VisualLogging4 from "../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/frameworkIgnoreListSettingsTab.css.js
var frameworkIgnoreListSettingsTab_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.ignore-list-option {
  flex: none;
  display: flex;
  align-items: center;
  height: var(--sys-size-13);
}

.ignore-list-option devtools-button {
  cursor: pointer;
  position: relative;
  top: var(--sys-size-2);
  margin-left: var(--sys-size-2);
}

.add-button {
  padding: var(--sys-size-5) var(--sys-size-6);
  align-self: flex-start;
  flex: none;
}

.ignore-list {
  flex: 0 1 auto;
}

.enable-ignore-listing,
.ignore-list-item,
.general-exclusion-group {
  padding-left: var(--sys-size-4);
}

.custom-exclusion-group {
  padding-left: 0;
  padding-right: 0;
}

.ignore-list-item {
  height: var(--sys-size-13);
  display: flex;
  align-items: center;
  position: relative;
  flex: auto 1 1;
}

.ignore-list-pattern {
  flex: auto;
}

.ignore-list-item > devtools-checkbox {
  width: 100%;
}

.ignore-list-item .ignore-list-pattern {
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  color: var(--sys-color-on-surface);
  overflow: hidden;
}

.ignore-list-edit-row {
  flex: none;
  display: flex;
  flex-direction: row;
  margin: var(--sys-size-4) 5px;
  align-items: center;
}

.ignore-list-edit-row input,
.ignore-list-edit-row select {
  width: 100%;
  text-align: inherit;
}

.editor-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: none;
  background: var(--sys-color-surface1);
  border-radius: 10px;
  overflow: hidden;
}

.editor-content {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.editor-content input {
  margin-right: 10px;
}

.editor-content input.error-input {
  background-color: var(--sys-color-cdt-base-container);
}

.editor-buttons {
  flex: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  gap: var(--sys-size-6);
}

.list-widget-input-validation-error {
  color: var(--sys-color-error);
  margin: 0 5px;
}

.editor-container ~ .add-button {
  display: none;
}

.devtools-link:has(devtools-icon) {
  margin-left: var(--sys-size-4);
}

/*# sourceURL=${import.meta.resolve("./frameworkIgnoreListSettingsTab.css")} */`;

// ../../front_end/panels/settings/FrameworkIgnoreListSettingsTab.ts
var { bindToSetting } = UI5.UIUtils;
var UIStrings5 = {
  /**
   * @description Header text content in Framework Ignore List settings tab of the Settings for enabling or disabling ignore listing.
   */
  frameworkIgnoreList: "Ignore listing",
  /**
   * @description Checkbox label in Framework Ignore List settings tab of the Settings.
   */
  ignoreListingDescription: "When enabled, the debugger will skip over ignore-listed scripts and will ignore exceptions that only affect them and the Performance panel will collapse matching flamechart items",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  ignoreListContentScripts: "Content scripts injected by extensions",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  ignoreListAnonymousScripts: "Anonymous scripts from eval or console",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  automaticallyIgnoreListKnownThirdPartyScripts: "Known third-party scripts from source maps",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  ignoreListing: "Ignore listing",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  enableIgnoreListingTooltip: "Uncheck to disable all ignore listing",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  generalExclusionRules: "General exclusion rules",
  /**
   * @description Text in Framework Ignore List settings tab of the Settings.
   */
  customExclusionRules: "Custom exclusion rules",
  /**
   * @description Text of the add pattern button in Framework Ignore List settings tab of the Settings.
   */
  addPattern: "Add regex rule",
  /**
   * @description ARIA accessible name in Framework Ignore List settings tab of the Settings.
   */
  addFilenamePattern: "Add a regular expression rule for the script\u2019s URL",
  /**
   * @description Pattern title in Framework Ignore List settings tab of the Settings.
   * @example {ad.*?} PH1
   */
  ignoreScriptsWhoseNamesMatchS: "Ignore scripts whose names match ''{PH1}''",
  /**
   * @description ARIA accessible name in Framework Ignore List settings tab of the Settings. It labels the input
   * field used to add new or edit existing regular expressions that match file names to ignore in the debugger.
   */
  pattern: "Add a regular expression rule for the script\u2019s URL",
  /**
   * @description Error message in Framework Ignore List settings tab that declares the pattern must not be empty.
   */
  patternCannotBeEmpty: "Rule can\u2019t be empty",
  /**
   * @description Error message in Framework Ignore List settings tab that declares the pattern already exists.
   */
  patternAlreadyExists: "Rule already exists",
  /**
   * @description Error message in Framework Ignore List settings tab that declares the pattern must be a valid regular expression.
   */
  patternMustBeAValidRegular: "Rule must be a valid regular expression",
  /**
   * @description Text that is usually a hyperlink to more documentation.
   */
  learnMore: "Learn more",
  /**
   * @description Button text to save changes when editing an item in Framework Ignore List settings tab.
   */
  save: "Save",
  /**
   * @description Button text to add a new item in Framework Ignore List settings tab.
   */
  add: "Add",
  /**
   * @description Button text to cancel editing an item in Framework Ignore List settings tab.
   */
  cancel: "Cancel"
};
var str_5 = i18n9.i18n.registerUIStrings("panels/settings/FrameworkIgnoreListSettingsTab.ts", UIStrings5);
var i18nString5 = i18n9.i18n.getLocalizedString.bind(void 0, str_5);
function renderRuleItem(item2, index, enabled, onTogglePattern) {
  const helpText = i18nString5(UIStrings5.ignoreScriptsWhoseNamesMatchS, { PH1: item2.pattern });
  return html5`
    <div class="ignore-list-item">
      <devtools-checkbox
          .checked=${!item2.disabled}
          .disabled=${!enabled}
          title=${helpText}
          aria-label=${helpText}
          jslogcontext="settings.ignore-list-pattern"
          @change=${(e) => onTogglePattern(index, e.target.checked)}>
        ${item2.pattern}
      </devtools-checkbox>
    </div>
  `;
}
function renderEditor(input) {
  const isNew = input.editingIndex === input.patterns.length;
  const isInvalid = input.showValidationError && input.validationError !== null;
  return html5`
    <div
        class="editor-container"
        jslog=${VisualLogging4.pane("editor").track({ resize: true })}
        @keydown=${(e) => {
    if (Platform4.KeyboardUtilities.isEscKey(e)) {
      e.consume(true);
      input.onCancelEdit();
    }
  }}>
      <div
          class="editor-content"
          @keydown=${(e) => {
    if (e.key === "Enter" && !e.isComposing) {
      e.consume(true);
      input.onCommitEdit();
    }
  }}>
        <div class="ignore-list-edit-row">
          <div class="ignore-list-pattern">${i18nString5(UIStrings5.pattern)}</div>
        </div>
        <div class="ignore-list-edit-row">
          <div class="ignore-list-pattern">
            <input
                class=${Directives3.classMap({
    "harmony-input": true,
    "error-input": isInvalid
  })}
                type="text"
                autofocus
                placeholder="/framework\\.js$"
                aria-label=${i18nString5(UIStrings5.pattern)}
                aria-invalid=${isInvalid ? "true" : "false"}
                .value=${Directives3.live(input.editingValue)}
                jslog=${VisualLogging4.textField().track({ change: true, keydown: "Enter" }).context("pattern")}
                @input=${(e) => input.onEditorInput(e.target.value)}>
          </div>
        </div>
      </div>
      <div class="editor-buttons">
        <devtools-button
            .variant=${Buttons4.Button.Variant.OUTLINED}
            .jslogContext=${"cancel"}
            jslog=${VisualLogging4.action("cancel").track({ click: true })}
            @click=${input.onCancelEdit}>
          ${i18nString5(UIStrings5.cancel)}
        </devtools-button>
        <devtools-button
            .variant=${Buttons4.Button.Variant.PRIMARY}
            .jslogContext=${"commit"}
            .disabled=${input.validationError !== null}
            @click=${input.onCommitEdit}>
          ${isNew ? i18nString5(UIStrings5.add) : i18nString5(UIStrings5.save)}
        </devtools-button>
      </div>
      <div class="list-widget-input-validation-error" role="alert" aria-live="polite">
        ${isInvalid && input.validationError ? input.validationError : nothing6}
      </div>
    </div>
  `;
}
var DEFAULT_VIEW3 = (input, _output, target) => {
  const editingIndex = input.editingIndex;
  const patternsBefore = editingIndex !== null ? input.patterns.slice(0, editingIndex) : input.patterns;
  const patternsAfter = editingIndex !== null ? input.patterns.slice(editingIndex + 1) : [];
  render5(html5`
    <style>${frameworkIgnoreListSettingsTab_css_default}</style>
    <style>${settingsScreen_css_default}</style>
    <div class="settings-card-container-wrapper">
      <div class="settings-card-container ignore-list-settings">
        <devtools-card .heading=${i18nString5(UIStrings5.frameworkIgnoreList)}>
          <span>${i18nString5(UIStrings5.ignoreListingDescription)}</span>
          <div class="enable-ignore-listing" title=${i18nString5(UIStrings5.enableIgnoreListingTooltip)}>
            <devtools-checkbox
                name=${i18nString5(UIStrings5.ignoreListing)}
                title=${i18nString5(UIStrings5.ignoreListing)}
                ${bindToSetting(input.enabledSetting)}>
              ${i18nString5(UIStrings5.ignoreListing)}
            </devtools-checkbox>
          </div>
        </devtools-card>
        <devtools-card class="ignore-list-options" .heading=${i18nString5(UIStrings5.generalExclusionRules)}>
          <div class="ignore-list-option-group general-exclusion-group" role="group">
            <div class="ignore-list-option">
              <devtools-checkbox
                  name=${i18nString5(UIStrings5.ignoreListContentScripts)}
                  title=${i18nString5(UIStrings5.ignoreListContentScripts)}
                  ?disabled=${!input.enabled}
                  ${bindToSetting(input.skipContentScriptsSetting)}>
                ${i18nString5(UIStrings5.ignoreListContentScripts)}
              </devtools-checkbox>
            </div>
            <div class="ignore-list-option">
              <devtools-checkbox
                  name=${i18nString5(UIStrings5.automaticallyIgnoreListKnownThirdPartyScripts)}
                  title=${i18nString5(UIStrings5.automaticallyIgnoreListKnownThirdPartyScripts)}
                  ?disabled=${!input.enabled}
                  ${bindToSetting(input.automaticallyIgnoreListSetting)}>
                ${i18nString5(UIStrings5.automaticallyIgnoreListKnownThirdPartyScripts)}
              </devtools-checkbox>
              <devtools-button
                  .iconName=${"help"}
                  .variant=${Buttons4.Button.Variant.ICON}
                  .size=${Buttons4.Button.Size.SMALL}
                  .jslogContext=${"learn-more"}
                  .title=${i18nString5(UIStrings5.learnMore)}
                  .disabled=${!input.enabled}
                  @click=${input.onLearnMoreClick}>
              </devtools-button>
            </div>
            <div class="ignore-list-option">
              <devtools-checkbox
                  name=${i18nString5(UIStrings5.ignoreListAnonymousScripts)}
                  title=${i18nString5(UIStrings5.ignoreListAnonymousScripts)}
                  ?disabled=${!input.enabled}
                  ${bindToSetting(input.skipAnonymousScriptsSetting)}>
                ${i18nString5(UIStrings5.ignoreListAnonymousScripts)}
              </devtools-checkbox>
            </div>
          </div>
        </devtools-card>
        <devtools-card class="ignore-list-options" .heading=${i18nString5(UIStrings5.customExclusionRules)}>
          <div class="ignore-list-option-group custom-exclusion-group" role="group">
            ${patternsBefore.length > 0 ? html5`
              <devtools-list
                  class="ignore-list"
                  .editable=${input.enabled}
                  .deletable=${input.enabled}
                  @edit=${(e) => input.onBeginEdit(e.detail.index)}
                  @delete=${(e) => input.onRemovePattern(e.detail.index)}>
                ${Directives3.repeat(
    patternsBefore,
    (item2) => item2.pattern,
    (item2, index) => renderRuleItem(item2, index, input.enabled, input.onTogglePattern)
  )}
              </devtools-list>
            ` : nothing6}
            ${editingIndex !== null ? renderEditor(input) : nothing6}
            ${editingIndex !== null && patternsAfter.length > 0 ? html5`
              <devtools-list
                  class="ignore-list"
                  .editable=${input.enabled}
                  .deletable=${input.enabled}
                  @edit=${(e) => input.onBeginEdit(editingIndex + 1 + e.detail.index)}
                  @delete=${(e) => input.onRemovePattern(editingIndex + 1 + e.detail.index)}>
                ${Directives3.repeat(
    patternsAfter,
    (item2) => item2.pattern,
    (item2, index) => renderRuleItem(item2, editingIndex + 1 + index, input.enabled, input.onTogglePattern)
  )}
              </devtools-list>
            ` : nothing6}
            <devtools-button
                class="add-button"
                .variant=${Buttons4.Button.Variant.OUTLINED}
                .jslogContext=${"settings.add-ignore-list-pattern"}
                aria-label=${i18nString5(UIStrings5.addFilenamePattern)}
                .disabled=${!input.enabled}
                @click=${input.onAddPatternClick}>
              ${i18nString5(UIStrings5.addPattern)}
            </devtools-button>
          </div>
        </devtools-card>
      </div>
    </div>
  `, target, { container: { attributes: { jslog: `${VisualLogging4.pane("blackbox")}` } } });
};
var FrameworkIgnoreListSettingsTab = class extends UI5.Widget.VBox {
  setting;
  enabledSetting;
  skipContentScriptsSetting;
  automaticallyIgnoreListSetting;
  skipAnonymousScriptsSetting;
  #view;
  #editingIndex = null;
  #editingValue = "";
  #showValidationError = false;
  constructor(view = DEFAULT_VIEW3) {
    super({
      useShadowDom: true
    });
    this.#view = view;
    const settings = Common4.Settings.Settings.instance();
    this.enabledSetting = settings.resolve(Workspace.IgnoreListManager.enableIgnoreListingSettingDescriptor);
    this.skipContentScriptsSetting = settings.resolve(Workspace.IgnoreListManager.skipContentScriptsSettingDescriptor);
    this.automaticallyIgnoreListSetting = settings.resolve(Workspace.IgnoreListManager.automaticallyIgnoreListKnownThirdPartyScriptsSettingDescriptor);
    this.skipAnonymousScriptsSetting = settings.resolve(Workspace.IgnoreListManager.skipAnonymousScriptsSettingDescriptor);
    this.setting = settings.resolve(Workspace.IgnoreListManager.skipStackFramesPatternSettingDescriptor);
    this.setting.addChangeListener(this.#settingUpdated, this);
    this.enabledSetting.addChangeListener(this.#settingUpdated, this);
    this.performUpdate();
  }
  performUpdate() {
    const patterns = this.setting.getAsArray();
    const validationError = this.#editingIndex !== null ? this.#validatePattern(this.#editingValue, this.#editingIndex) : null;
    this.#view(
      {
        enabledSetting: this.enabledSetting,
        skipContentScriptsSetting: this.skipContentScriptsSetting,
        automaticallyIgnoreListSetting: this.automaticallyIgnoreListSetting,
        skipAnonymousScriptsSetting: this.skipAnonymousScriptsSetting,
        enabled: this.enabledSetting.get(),
        patterns,
        editingIndex: this.#editingIndex,
        editingValue: this.#editingValue,
        validationError,
        showValidationError: this.#showValidationError,
        onLearnMoreClick: () => {
          UIHelpers2.openInNewTab("https://developer.chrome.com/docs/devtools/settings/ignore-list/#skip-third-party");
        },
        onAddPatternClick: this.#addButtonClicked.bind(this),
        onTogglePattern: this.#togglePattern.bind(this),
        onBeginEdit: this.#beginEdit.bind(this),
        onRemovePattern: this.#removePattern.bind(this),
        onEditorInput: this.#onEditorInput.bind(this),
        onCommitEdit: this.#commitEdit.bind(this),
        onCancelEdit: this.#cancelEdit.bind(this)
      },
      void 0,
      this.contentElement
    );
  }
  wasShown() {
    super.wasShown();
    this.#cancelEdit();
  }
  #settingUpdated() {
    this.#editingIndex = null;
    this.#editingValue = "";
    this.#showValidationError = false;
    this.performUpdate();
  }
  #addButtonClicked() {
    this.#editingIndex = this.setting.getAsArray().length;
    this.#editingValue = "";
    this.#showValidationError = false;
    this.performUpdate();
  }
  #beginEdit(index) {
    const patterns = this.setting.getAsArray();
    if (index < 0 || index >= patterns.length) {
      return;
    }
    this.#editingIndex = index;
    this.#editingValue = patterns[index].pattern;
    this.#showValidationError = false;
    this.performUpdate();
  }
  #onEditorInput(value) {
    this.#editingValue = value;
    this.#showValidationError = true;
    this.performUpdate();
  }
  #cancelEdit() {
    this.#editingIndex = null;
    this.#editingValue = "";
    this.#showValidationError = false;
    this.performUpdate();
  }
  #commitEdit() {
    if (this.#editingIndex === null) {
      return;
    }
    const validationError = this.#validatePattern(this.#editingValue, this.#editingIndex);
    if (validationError !== null) {
      this.#showValidationError = true;
      this.performUpdate();
      return;
    }
    const pattern = this.#editingValue.trim();
    const list = this.setting.getAsArray();
    if (this.#editingIndex === list.length) {
      list.push({ pattern, disabled: false });
    } else if (list[this.#editingIndex]) {
      list[this.#editingIndex].pattern = pattern;
    }
    this.#editingIndex = null;
    this.#editingValue = "";
    this.#showValidationError = false;
    this.setting.setAsArray(list);
  }
  #togglePattern(index, checked) {
    const patterns = this.setting.getAsArray();
    const item2 = patterns[index];
    if (!item2) {
      return;
    }
    const disabled = !checked;
    if (item2.disabled !== disabled) {
      item2.disabled = disabled;
      item2.disabledForUrl = void 0;
      this.setting.setAsArray(patterns);
    }
  }
  #removePattern(index) {
    const patterns = this.setting.getAsArray();
    patterns.splice(index, 1);
    this.setting.setAsArray(patterns);
  }
  #validatePattern(value, index) {
    const pattern = value.trim();
    const patterns = this.setting.getAsArray();
    if (!pattern.length) {
      return i18nString5(UIStrings5.patternCannotBeEmpty);
    }
    for (let i = 0; i < patterns.length; ++i) {
      if (i !== index && patterns[i].pattern === pattern) {
        return i18nString5(UIStrings5.patternAlreadyExists);
      }
    }
    let regex;
    try {
      regex = new RegExp(pattern);
    } catch {
    }
    if (!regex) {
      return i18nString5(UIStrings5.patternMustBeAValidRegular);
    }
    return null;
  }
};

// ../../front_end/panels/settings/KeybindsSettingsTab.ts
var KeybindsSettingsTab_exports = {};
__export(KeybindsSettingsTab_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW4,
  KeybindsSettingsTab: () => KeybindsSettingsTab
});
import "../../ui/kit/kit.js";
import * as Common5 from "../../core/common/common.js";
import * as Host3 from "../../core/host/host.js";
import * as i18n11 from "../../core/i18n/i18n.js";
import * as Platform6 from "../../core/platform/platform.js";
import * as Buttons5 from "../../ui/components/buttons/buttons.js";
import * as SettingsUI3 from "../../ui/legacy/components/settings_ui/settings_ui.js";
import * as UI6 from "../../ui/legacy/legacy.js";
import * as Lit3 from "../../ui/lit/lit.js";
import * as Settings6 from "../../ui/settings/settings.js";
import * as VisualLogging5 from "../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/keybindsSettingsTab.css.js
var keybindsSettingsTab_css_default = `/*
 * Copyright 2020 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.shortcut-list {
  padding-left: 0;
  padding-right: 0;
}

.keybinds-key {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--sys-size-11);
  min-width: var(--sys-size-11);
  font: var(--sys-typescale-body5-medium);
  white-space: nowrap;
  border-radius: var(--sys-shape-corner-small);
  background: var(--sys-color-tonal-container);
  padding: 0 var(--sys-size-4);
}

.keybinds-list-item {
  margin: 0 var(--sys-size-6);
  padding: var(--sys-size-4) 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 30px 2fr 30px 30px;
  border-top: var(--sys-size-1) solid var(--app-color-card-divider);
}

.keybinds-list-item:focus-visible {
  background-color: var(--sys-color-tonal-container);
}

.keybinds-list-item-wrapper:has(.keybinds-list-item.keybinds-editing) {
  background-color: var(--sys-color-neutral-container);
}

.keybinds-list-text.keybinds-action-name {
  grid-row: 1 / 1;
}

.keybinds-shortcut,
.keybinds-info {
  grid-row: auto;
  grid-column: 3 / span 1;
}

.keybinds-error {
  color: var(--sys-color-error);
}

.keybinds-shortcut {
  gap: var(--sys-size-4);
}

.keybinds-list-item.keybinds-editing .keybinds-shortcut {
  display: flex;
}

.keybinds-modified {
  grid-column: 2 / span 1;
  margin-top: var(--sys-size-3);
}

.keybinds-list-item button[disabled] {
  opacity: 40%;
}

.keybinds-cancel-button {
  grid-column: -1 / span 1;
}

.keybinds-edit-button {
  display: none;
  grid-row: 1 / span 1;
  grid-column: 5 / span 1;
}

.keybinds-list-item:not(.keybinds-editing):hover .keybinds-edit-button,
.keybinds-list-item-wrapper:focus-within > .keybinds-list-item:not(.keybinds-editing) .keybinds-edit-button {
  display: inline-block;
}

.keybinds-list-text {
  min-height: var(--sys-size-12);
  display: flex;
  align-items: center;
  user-select: none;
  color: var(--sys-color-on-surface);
  text-align: start;
  position: relative;
  margin-right: 0;
}

.keybinds-category-header {
  display: flex;
  align-items: center;
  font: var(--sys-typescale-body4-bold);
  height: var(--sys-size-13);
  padding: var(--sys-size-4) var(--sys-size-7);
  white-space: nowrap;

  + .keybinds-list-item-wrapper > .keybinds-list-item {
    border-top: unset;
  }
}

.keybinds-list-item-wrapper:has(.keybinds-list-item:hover),
.keybinds-list-item-wrapper:has(
  .keybinds-list-item:not(.keybinds-editing)):focus-within {
  background: var(--sys-color-state-hover-on-subtle);
}

.keybinds-set-select label p {
  display: inline;
  color: var(--sys-color-on-surface);
}

button.text-button {
  width: fit-content;
  align-self: flex-end;
}

.keybinds-list-text input {
  margin: 0 var(--sys-size-2);
}

.keybinds-set-select {
  margin: 0;
  padding: var(--sys-size-5) var(--sys-size-7);

  & .settings-select {
    display: flex;
    justify-content: space-between;

    & label {
      padding: 0;
    }
  }
}

.keybinds-list-text:has(.keybinds-delete-button) {
  grid-column: 3 / -1;
}

.keybinds-delete-button {
  flex-shrink: 0;
}

.docs-link.devtools-link {
  align-self: flex-start;
  min-height: 2em;
  line-height: 2em;
  margin-bottom: var(--sys-size-3);
}

.keybinds-footer {
  padding: var(--sys-size-5) var(--sys-size-7);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: fit-content;
  margin-top: 10px;
}

@media (forced-colors: active) {
  .keybinds-list-item.keybinds-editing .keybinds-shortcut {
    & devtools-button {
      --sys-color-primary: buttonFace;
    }
  }

  .keybinds-list-text input {
    color: buttonText;
  }

  /* Keyboard focus / hover on wrapper element (shortcut items) */
  .keybinds-list-item-wrapper {
    &:has(.keybinds-list-item:hover),
    &:has(.keybinds-list-item:not(.keybinds-editing)):focus-within,
    &:focus,
    &:focus-visible {
      background-color: Highlight;
      forced-color-adjust: none;

      --icon-default: HighlightText;

      & .keybinds-list-text,
      & .keybinds-action-name {
        color: HighlightText;
      }

      & .keybinds-key {
        background: HighlightText;
        color: Highlight;
      }
    }
  }

  /* Editing state */
  .keybinds-list-item-wrapper:has(.keybinds-list-item.keybinds-editing) {
    background-color: Highlight;
    forced-color-adjust: none;

    --icon-default: HighlightText;

    & .keybinds-list-text {
      color: HighlightText;
    }

    & .keybinds-error {
    color: highlightText;
    }
  }
}

/*# sourceURL=${import.meta.resolve("./keybindsSettingsTab.css")} */`;

// ../../front_end/panels/settings/KeybindsSettingsTab.ts
var { html: html6, nothing: nothing7, render: render6, Directives: { classMap: classMap2, repeat: repeat3 } } = Lit3;
var UIStrings6 = {
  /**
   * @description Text for keyboard shortcuts.
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text appearing before a select control offering users their choice of keyboard shortcut presets.
   */
  matchShortcutsFromPreset: "Shortcut preset",
  /**
   * @description Screen reader label for list of keyboard shortcuts in Settings.
   */
  keyboardShortcutsList: "Keyboard shortcuts list",
  /**
   * @description Screen reader label for an icon denoting a shortcut that has been changed from its default.
   */
  shortcutModified: "Shortcut modified",
  /**
   * @description Screen reader label for an empty shortcut cell in custom shortcuts settings tab.
   */
  noShortcutForAction: "No shortcut for action",
  /**
   * @description Link text in the settings tab to add another shortcut for an action.
   */
  addAShortcut: "Add a shortcut",
  /**
   * @description Placeholder text in the settings tab when adding a new shortcut, explaining that keystrokes are going to be recorded.
   */
  recordingKeys: "Recording keys",
  /**
   * @description Label for a button in the settings tab that confirms changes to a keyboard shortcut.
   */
  confirmChanges: "Confirm changes",
  /**
   * @description Label for a button in the settings tab that discards changes to the shortcut being edited.
   */
  discardChanges: "Discard changes",
  /**
   * @description Label for a button in the settings tab that removes a keyboard shortcut.
   */
  removeShortcut: "Remove shortcut",
  /**
   * @description Label for a button in the settings tab that edits a keyboard shortcut.
   */
  editShortcut: "Edit shortcut",
  /**
   * @description Message shown in Settings when the user inputs a modifier-only shortcut such as Ctrl+Shift.
   */
  shortcutsCannotContainOnly: "Shortcuts can\u2019t contain only modifier keys",
  /**
   * @description Message shown in shortcuts settings when the user inputs a shortcut that is already in use.
   * @example {Performance} PH1
   * @example {Start/stop recording} PH2
   */
  thisShortcutIsInUseByS: "This shortcut is in use by {PH1}: {PH2}",
  /**
   * @description Message shown in Settings when restoring default shortcuts.
   */
  RestoreDefaultShortcuts: "Restore default shortcuts",
  /**
   * @description Message shown in Settings to show the full list of keyboard shortcuts.
   */
  FullListOfDevtoolsKeyboard: "Full list of DevTools keyboard shortcuts and gestures",
  /**
   * @description Label for a button in the shortcut editor that resets all shortcuts for the current action.
   */
  ResetShortcutsForAction: "Reset shortcuts for action",
  /**
   * @description Screen reader announcement for shortcut removed.
   * @example {Start/stop recording} PH1
   */
  shortcutRemoved: "{PH1} Shortcut removed",
  /**
   * @description Screen reader announcement for shortcut restored to default.
   */
  shortcutChangesRestored: "Changes to shortcut restored to default",
  /**
   * @description Screen reader announcement for applied shortcut changes.
   */
  shortcutChangesApplied: "Changes to shortcut applied",
  /**
   * @description Screen reader announcement for discarded shortcut changes.
   */
  shortcutChangesDiscarded: "Changes to shortcut discarded"
};
var str_6 = i18n11.i18n.registerUIStrings("panels/settings/KeybindsSettingsTab.ts", UIStrings6);
var i18nString6 = i18n11.i18n.getLocalizedString.bind(void 0, str_6);
function renderActionRow(item2, input) {
  const renderEditButton = () => html6`
    <devtools-button
      class="keybinds-edit-button"
      title=${i18nString6(UIStrings6.editShortcut)}
      aria-label=${i18nString6(UIStrings6.editShortcut)}
      .iconName=${"edit"}
      .variant=${Buttons5.Button.Variant.ICON}
      .jslogContext=${"edit"}
      @click=${() => input.onStartEditing(item2.action)}>
    </devtools-button>
  `;
  return html6`
    <div
      class="keybinds-list-item-wrapper"
      @focusin=${() => input.onActionFocused(item2.action)}>
      <div
        class=${classMap2({
    "keybinds-list-item": true,
    "keybinds-editing": item2.isEditing
  })}
        role="listitem"
        aria-level="2"
        tabindex=${item2.tabIndex}
        ?autofocus=${item2.isAutofocus}
        jslog=${VisualLogging5.item().context(item2.actionId).track({ keydown: "Escape", resize: true })}
        @keydown=${item2.isEditing ? input.onEditingRowKeyDown : nothing7}>
        <div class="keybinds-action-name keybinds-list-text">${item2.actionTitle}</div>
        ${repeat3(item2.rows, (row) => row.shortcut, (row, index) => html6`
          ${row.isModified ? html6`
            <devtools-icon
              class="keybinds-modified"
              name="keyboard-pen"
              aria-label=${i18nString6(UIStrings6.shortcutModified)}>
            </devtools-icon>
          ` : nothing7}
          <div class="keybinds-shortcut keybinds-list-text">
            ${item2.isEditing ? html6`
              <input
                class=${classMap2({
    "harmony-input": true,
    "error-input": row.isInvalid
  })}
                jslog=${VisualLogging5.textField().track({ change: true })}
                placeholder=${i18nString6(UIStrings6.recordingKeys)}
                .spellcheck=${false}
                maxlength="0"
                ?autofocus=${row.isAutofocus}
                aria-invalid=${row.isInvalid ? "true" : "false"}
                .value=${row.value}
                @keydown=${(event) => input.onShortcutInputKeyDown(row.shortcut, event)}
                @focus=${() => input.onShortcutInputFocus(row.shortcut)}
                @blur=${input.onShortcutInputBlur}
              />
              <devtools-button
                class="keybinds-delete-button"
                title=${i18nString6(UIStrings6.removeShortcut)}
                aria-label=${i18nString6(UIStrings6.removeShortcut)}
                .iconName=${"bin"}
                .variant=${Buttons5.Button.Variant.ICON}
                .jslogContext=${"delete"}
                @click=${() => input.onDeleteShortcut(row.shortcut)}>
              </devtools-button>
            ` : html6`
              ${row.keys.map((key) => html6`
                <div class="keybinds-key"><span>${key}</span></div>
              `)}
            `}
          </div>
          ${!item2.isEditing && index === 0 ? renderEditButton() : nothing7}
        `)}
        ${item2.hasEmptyInfo ? html6`
          ${item2.hasDefaultShortcutWhenEmpty ? html6`
            <devtools-icon
              class="keybinds-modified"
              name="keyboard-pen"
              aria-label=${i18nString6(UIStrings6.shortcutModified)}>
            </devtools-icon>
          ` : nothing7}
          ${!item2.isEditing ? html6`
            <div
              class="keybinds-shortcut keybinds-list-text"
              aria-label=${i18nString6(UIStrings6.noShortcutForAction)}>
            </div>
            ${renderEditButton()}
          ` : nothing7}
        ` : nothing7}
        ${item2.isEditing ? html6`
          <div class="keybinds-shortcut">
            <devtools-button
              .variant=${Buttons5.Button.Variant.OUTLINED}
              .jslogContext=${"add-shortcut"}
              ?autofocus=${item2.rows.length === 0}
              @click=${input.onAddShortcut}>
              ${i18nString6(UIStrings6.addAShortcut)}
            </devtools-button>
          </div>
          <div
            class=${classMap2({
    "keybinds-info": true,
    "keybinds-error": true,
    hidden: !item2.errorMessage
  })}
            role="alert"
            aria-live="polite">
            ${item2.errorMessage ?? ""}
          </div>
          <devtools-button
            title=${i18nString6(UIStrings6.ResetShortcutsForAction)}
            aria-label=${i18nString6(UIStrings6.ResetShortcutsForAction)}
            .iconName=${"undo"}
            .variant=${Buttons5.Button.Variant.ICON}
            .jslogContext=${"undo"}
            @click=${input.onResetShortcutsToDefaults}>
          </devtools-button>
          <devtools-button
            class="keybinds-confirm-button"
            title=${i18nString6(UIStrings6.confirmChanges)}
            aria-label=${i18nString6(UIStrings6.confirmChanges)}
            .iconName=${"checkmark"}
            .variant=${Buttons5.Button.Variant.ICON}
            .jslogContext=${"confirm"}
            .disabled=${item2.isConfirmDisabled}
            @click=${input.onConfirmChanges}>
          </devtools-button>
          <devtools-button
            class="keybinds-cancel-button"
            title=${i18nString6(UIStrings6.discardChanges)}
            aria-label=${i18nString6(UIStrings6.discardChanges)}
            .iconName=${"cross"}
            .variant=${Buttons5.Button.Variant.ICON}
            .jslogContext=${"cancel"}
            @click=${input.onDiscardChanges}>
          </devtools-button>
        ` : nothing7}
      </div>
    </div>
  `;
}
var DEFAULT_VIEW4 = (input, _output, target) => {
  render6(
    html6`
        <style>${keybindsSettingsTab_css_default}</style>
        <style>${settingsScreen_css_default}</style>
        <div class="settings-card-container-wrapper">
          <div class="settings-card-container">
            <devtools-card heading=${i18nString6(UIStrings6.shortcuts)}>
              <div class="keybinds-set-select">
                ${SettingsUI3.SettingsUI.renderControlForSetting(
      input.keybindsSetSetting,
      i18nString6(UIStrings6.matchShortcutsFromPreset)
    )}
              </div>
              <div
                class="shortcut-list"
                role="list"
                aria-label=${i18nString6(UIStrings6.keyboardShortcutsList)}
                @keydown=${input.onListKeyDown}>
                ${repeat3(
      input.items,
      (item2) => typeof item2 === "string" ? item2 : item2.actionId,
      (item2) => {
        if (typeof item2 === "string") {
          return html6`
                          <div
                            class="keybinds-category-header"
                            role="listitem"
                            aria-level="1"
                            tabindex="-1">
                            ${UI6.ActionRegistration.getLocalizedActionCategory(item2)}
                          </div>
                        `;
        }
        return renderActionRow(item2, input);
      }
    )}
              </div>
              <div class="keybinds-footer">
                <devtools-link
                  class="docs-link"
                  href="https://developer.chrome.com/docs/devtools/shortcuts/"
                  jslogcontext="learn-more">
                  ${i18nString6(UIStrings6.FullListOfDevtoolsKeyboard)}
                </devtools-link>
                <devtools-button
                  .variant=${Buttons5.Button.Variant.OUTLINED}
                  .jslogContext=${"restore-default-shortcuts"}
                  @click=${input.onRestoreDefaultShortcuts}>
                  ${i18nString6(UIStrings6.RestoreDefaultShortcuts)}
                </devtools-button>
              </div>
            </devtools-card>
          </div>
        </div>
      `,
    target,
    {
      container: {
        classes: ["flex-auto"],
        attributes: {
          jslog: `${VisualLogging5.pane("keybinds")}`
        }
      }
    }
  );
};
var KeybindsSettingsTab = class extends UI6.Widget.VBox {
  #items;
  #actions;
  #selectedItem = null;
  #editingItem = null;
  #editingShortcuts = [];
  #editedShortcuts = /* @__PURE__ */ new Map();
  #focusedShortcut = null;
  #validated = false;
  #secondKeyTimeout = null;
  #keybindsSetSetting;
  #userShortcutsSetting;
  #view;
  constructor(view = DEFAULT_VIEW4) {
    super({ useShadowDom: "pure" });
    this.#view = view;
    this.#keybindsSetSetting = Common5.Settings.Settings.instance().resolve(Settings6.MainSettings.activeKeybindSetSettingDescriptor);
    this.#userShortcutsSetting = Common5.Settings.Settings.instance().resolve(Settings6.MainSettings.userShortcutsSettingDescriptor);
    this.#keybindsSetSetting.addChangeListener(this.update, this);
    this.#items = this.#createListItems();
    this.#actions = this.#items.filter((item2) => item2 instanceof UI6.ActionRegistration.Action);
    this.#selectedItem = this.#actions[0] ?? null;
    this.requestUpdate();
  }
  wasShown() {
    super.wasShown();
    this.performUpdate();
  }
  #onRestoreDefaultShortcuts() {
    this.#userShortcutsSetting.set([]);
    this.#keybindsSetSetting.set(UI6.ShortcutRegistry.DefaultShortcutSetting);
  }
  #buildActionRowViewData(item2) {
    const isEditing = item2 === this.#editingItem;
    const isSelected = item2 === this.#selectedItem;
    const isAutofocus = isSelected && !this.#editingItem;
    const tabIndex = isSelected && !isEditing ? 0 : -1;
    const shortcuts = isEditing ? this.#editingShortcuts : UI6.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(item2.id());
    const separator = Host3.Platform.isMac() ? "\u2004" : "\u200A+\u200A";
    let errorMessage = null;
    let isConfirmDisabled = false;
    const rows = [];
    for (const shortcut of shortcuts) {
      if (isEditing && this.#editedShortcuts.has(shortcut) && !this.#editedShortcuts.get(shortcut)) {
        continue;
      }
      const isModified = shortcut.type !== UI6.KeyboardShortcut.Type.UNSET_SHORTCUT && !shortcut.isDefault();
      const userDescriptors = isEditing ? this.#editedShortcuts.get(shortcut) : void 0;
      const value = userDescriptors ? this.#shortcutInputTextForDescriptors(userDescriptors) : shortcut.title();
      const keys = shortcut.descriptors.flatMap((descriptor) => descriptor.name.split(separator));
      let isInvalid = false;
      if (isEditing && this.#validated && userDescriptors) {
        if (userDescriptors.some((descriptor) => UI6.KeyboardShortcut.KeyboardShortcut.isModifier(descriptor.key))) {
          isConfirmDisabled = true;
          isInvalid = true;
          errorMessage = i18nString6(UIStrings6.shortcutsCannotContainOnly);
        } else {
          const conflicts = UI6.ShortcutRegistry.ShortcutRegistry.instance().actionsForDescriptors(userDescriptors).filter((actionId) => actionId !== item2.id());
          if (conflicts.length) {
            isConfirmDisabled = true;
            isInvalid = true;
            if (UI6.ActionRegistry.ActionRegistry.instance().hasAction(conflicts[0])) {
              const action3 = UI6.ActionRegistry.ActionRegistry.instance().getAction(conflicts[0]);
              errorMessage = i18nString6(UIStrings6.thisShortcutIsInUseByS, { PH1: action3.category(), PH2: action3.title() });
            }
          }
        }
      }
      rows.push({
        shortcut,
        isModified,
        value,
        keys,
        isInvalid,
        isAutofocus: false
      });
    }
    if (isEditing && rows.length > 0) {
      const autofocusRow = rows.find((row) => row.shortcut === this.#focusedShortcut) ?? rows[0];
      autofocusRow.isAutofocus = true;
    }
    return {
      action: item2,
      actionId: item2.id(),
      actionTitle: item2.title(),
      isEditing,
      isAutofocus,
      tabIndex,
      hasEmptyInfo: shortcuts.length === 0,
      hasDefaultShortcutWhenEmpty: shortcuts.length === 0 && UI6.ShortcutRegistry.ShortcutRegistry.instance().actionHasDefaultShortcut(item2.id()),
      rows,
      errorMessage,
      isConfirmDisabled
    };
  }
  performUpdate() {
    const viewItems = this.#items.map((item2) => typeof item2 === "string" ? item2 : this.#buildActionRowViewData(item2));
    this.#view(
      {
        keybindsSetSetting: this.#keybindsSetSetting,
        items: viewItems,
        onRestoreDefaultShortcuts: this.#onRestoreDefaultShortcuts.bind(this),
        onListKeyDown: this.#onListKeyDown.bind(this),
        onActionFocused: this.#onActionFocused.bind(this),
        onStartEditing: this.startEditing.bind(this),
        onAddShortcut: this.#addShortcut.bind(this),
        onResetShortcutsToDefaults: this.#resetShortcutsToDefaults.bind(this),
        onConfirmChanges: this.#onConfirmChanges.bind(this),
        onDiscardChanges: this.#onDiscardChanges.bind(this),
        onEditingRowKeyDown: this.#onEditingRowKeyDown.bind(this),
        onShortcutInputKeyDown: this.#onShortcutInputKeyDown.bind(this),
        onShortcutInputFocus: this.#onShortcutInputFocus.bind(this),
        onShortcutInputBlur: this.#onShortcutInputBlur.bind(this),
        onDeleteShortcut: this.#onDeleteShortcut.bind(this)
      },
      void 0,
      this.contentElement
    );
  }
  #onActionFocused(action3) {
    if (this.#selectedItem === action3) {
      return;
    }
    this.#selectedItem = action3;
    this.performUpdate();
  }
  #onListKeyDown(event) {
    if (this.#editingItem || this.#actions.length === 0) {
      return;
    }
    const currentIndex = this.#selectedItem ? this.#actions.indexOf(this.#selectedItem) : -1;
    let nextIndex = -1;
    switch (event.key) {
      case "ArrowDown":
      case "PageDown":
        nextIndex = currentIndex < this.#actions.length - 1 ? currentIndex + 1 : this.#actions.length - 1;
        break;
      case "ArrowUp":
      case "PageUp":
        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = this.#actions.length - 1;
        break;
      default:
        return;
    }
    event.consume(true);
    const nextAction = this.#actions[nextIndex];
    if (nextAction) {
      this.#selectedItem = nextAction;
      this.performUpdate();
      this.focus();
    }
  }
  commitChanges(item2, editedShortcuts) {
    for (const [originalShortcut, newDescriptors] of editedShortcuts) {
      if (originalShortcut.type !== UI6.KeyboardShortcut.Type.UNSET_SHORTCUT) {
        UI6.ShortcutRegistry.ShortcutRegistry.instance().removeShortcut(originalShortcut);
        if (!newDescriptors) {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.ShortcutRemoved);
        }
      }
      if (newDescriptors) {
        UI6.ShortcutRegistry.ShortcutRegistry.instance().registerUserShortcut(
          originalShortcut.changeKeys(newDescriptors).changeType(UI6.KeyboardShortcut.Type.USER_SHORTCUT)
        );
        if (originalShortcut.type === UI6.KeyboardShortcut.Type.UNSET_SHORTCUT) {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.UserShortcutAdded);
        } else {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.ShortcutModified);
        }
      }
    }
    this.stopEditing(item2);
  }
  startEditing(action3) {
    this.#selectedItem = action3;
    if (this.#editingItem) {
      this.stopEditing(this.#editingItem);
    }
    UI6.UIUtils.markBeingEdited(this.element, true);
    this.#editingItem = action3;
    this.#editedShortcuts.clear();
    this.#focusedShortcut = null;
    this.#validated = false;
    this.#editingShortcuts = UI6.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(action3.id());
    this.performUpdate();
    this.focus();
  }
  stopEditing(_action) {
    if (this.#secondKeyTimeout !== null) {
      clearTimeout(this.#secondKeyTimeout);
      this.#secondKeyTimeout = null;
    }
    UI6.UIUtils.markBeingEdited(this.element, false);
    this.#editingItem = null;
    this.#editingShortcuts = [];
    this.#editedShortcuts.clear();
    this.#focusedShortcut = null;
    this.#validated = false;
    this.performUpdate();
    this.focus();
  }
  #onConfirmChanges() {
    if (!this.#editingItem) {
      return;
    }
    const item2 = this.#editingItem;
    this.commitChanges(item2, this.#editedShortcuts);
    UI6.ARIAUtils.LiveAnnouncer.alert(i18nString6(UIStrings6.shortcutChangesApplied, { PH1: item2.title() }));
  }
  #onDiscardChanges() {
    if (!this.#editingItem) {
      return;
    }
    this.stopEditing(this.#editingItem);
    UI6.ARIAUtils.LiveAnnouncer.alert(i18nString6(UIStrings6.shortcutChangesDiscarded));
  }
  #onEditingRowKeyDown(event) {
    if (this.#editingItem && Platform6.KeyboardUtilities.isEscKey(event)) {
      this.stopEditing(this.#editingItem);
      event.consume(true);
    }
  }
  #onShortcutInputFocus(shortcut) {
    this.#focusedShortcut = shortcut;
  }
  #onShortcutInputBlur() {
    this.#focusedShortcut = null;
    if (this.#secondKeyTimeout !== null) {
      clearTimeout(this.#secondKeyTimeout);
      this.#secondKeyTimeout = null;
    }
  }
  #onDeleteShortcut(shortcut) {
    if (!this.#editingItem) {
      return;
    }
    const index = this.#editingShortcuts.indexOf(shortcut);
    if (!shortcut.isDefault() && index !== -1) {
      this.#editingShortcuts.splice(index, 1);
    }
    this.#editedShortcuts.set(shortcut, null);
    this.#focusedShortcut = null;
    this.#validated = true;
    this.performUpdate();
    this.focus();
    UI6.ARIAUtils.LiveAnnouncer.alert(i18nString6(UIStrings6.shortcutRemoved, { PH1: this.#editingItem.title() }));
  }
  #addShortcut() {
    if (!this.#editingItem) {
      return;
    }
    const shortcut = new UI6.KeyboardShortcut.KeyboardShortcut([], this.#editingItem.id(), UI6.KeyboardShortcut.Type.UNSET_SHORTCUT);
    this.#editingShortcuts.push(shortcut);
    this.#focusedShortcut = shortcut;
    this.performUpdate();
    this.focus();
  }
  #onShortcutInputKeyDown(shortcut, event) {
    if (event.key !== "Tab") {
      const eventDescriptor = this.#descriptorForEvent(event);
      const userDescriptors = this.#editedShortcuts.get(shortcut) || [];
      this.#editedShortcuts.set(shortcut, userDescriptors);
      const isLastKeyOfShortcut = userDescriptors.length === 2 && UI6.KeyboardShortcut.KeyboardShortcut.isModifier(userDescriptors[1].key);
      const shouldClearOldShortcut = userDescriptors.length === 2 && !isLastKeyOfShortcut;
      if (shouldClearOldShortcut) {
        userDescriptors.splice(0, 2);
      }
      if (this.#secondKeyTimeout) {
        clearTimeout(this.#secondKeyTimeout);
        this.#secondKeyTimeout = null;
        userDescriptors.push(eventDescriptor);
      } else if (isLastKeyOfShortcut) {
        userDescriptors[1] = eventDescriptor;
      } else if (!UI6.KeyboardShortcut.KeyboardShortcut.isModifier(eventDescriptor.key)) {
        userDescriptors[0] = eventDescriptor;
        this.#secondKeyTimeout = window.setTimeout(() => {
          this.#secondKeyTimeout = null;
        }, UI6.ShortcutRegistry.KeyTimeout);
      } else {
        userDescriptors[0] = eventDescriptor;
      }
      this.#validated = true;
      this.performUpdate();
      event.consume(true);
    }
  }
  #descriptorForEvent(event) {
    const userKey = UI6.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(event);
    const codeAndModifiers = UI6.KeyboardShortcut.KeyboardShortcut.keyCodeAndModifiersFromKey(userKey);
    let key = UI6.KeyboardShortcut.Keys[event.key] || UI6.KeyboardShortcut.KeyBindings[event.key];
    if (!key && !/^[a-z]$/i.test(event.key)) {
      const keyCode = event.code;
      key = UI6.KeyboardShortcut.Keys[keyCode] || UI6.KeyboardShortcut.KeyBindings[keyCode];
      if (keyCode.startsWith("Digit")) {
        key = keyCode.slice(5);
      } else if (keyCode.startsWith("Key")) {
        key = keyCode.slice(3);
      }
    }
    return UI6.KeyboardShortcut.KeyboardShortcut.makeDescriptor(key || event.key, codeAndModifiers.modifiers);
  }
  #shortcutInputTextForDescriptors(descriptors) {
    return descriptors.map((descriptor) => descriptor.name).join(" ");
  }
  #resetShortcutsToDefaults() {
    if (!this.#editingItem) {
      return;
    }
    this.#editedShortcuts.clear();
    for (const shortcut of this.#editingShortcuts) {
      if (shortcut.type === UI6.KeyboardShortcut.Type.UNSET_SHORTCUT) {
        const index = this.#editingShortcuts.indexOf(shortcut);
        this.#editingShortcuts.splice(index, 1);
      } else if (shortcut.type === UI6.KeyboardShortcut.Type.USER_SHORTCUT) {
        this.#editedShortcuts.set(shortcut, null);
      }
    }
    const disabledDefaults = UI6.ShortcutRegistry.ShortcutRegistry.instance().disabledDefaultsForAction(this.#editingItem.id());
    disabledDefaults.forEach((shortcut) => {
      if (this.#editingShortcuts.includes(shortcut)) {
        return;
      }
      this.#editingShortcuts.push(shortcut);
      this.#editedShortcuts.set(shortcut, shortcut.descriptors);
    });
    this.#focusedShortcut = null;
    this.#validated = false;
    this.performUpdate();
    this.focus();
    UI6.ARIAUtils.LiveAnnouncer.alert(i18nString6(UIStrings6.shortcutChangesRestored, { PH1: this.#editingItem.title() }));
  }
  #createListItems() {
    const actions = UI6.ActionRegistry.ActionRegistry.instance().actions().filter((action3) => action3.configurableBindings()).sort((actionA, actionB) => {
      if (actionA.category() < actionB.category()) {
        return -1;
      }
      if (actionA.category() > actionB.category()) {
        return 1;
      }
      if (actionA.id() < actionB.id()) {
        return -1;
      }
      if (actionA.id() > actionB.id()) {
        return 1;
      }
      return 0;
    });
    const items = [];
    let currentCategory;
    actions.forEach((action3) => {
      if (currentCategory !== action3.category()) {
        items.push(action3.category());
      }
      items.push(action3);
      currentCategory = action3.category();
    });
    return items;
  }
  onEscapeKeyPressed(event) {
    if (this.#editingItem && this.#focusedShortcut && UI6.DOMUtilities.deepActiveElement(document)?.nodeName === "INPUT") {
      this.#onShortcutInputKeyDown(this.#focusedShortcut, event);
    }
  }
  update() {
    if (this.#editingItem) {
      this.stopEditing(this.#editingItem);
    }
    if (!this.#selectedItem && this.#actions.length > 0) {
      this.#selectedItem = this.#actions[0];
    }
    this.performUpdate();
  }
  willHide() {
    super.willHide();
    if (this.#editingItem) {
      this.stopEditing(this.#editingItem);
    }
  }
};

// ../../front_end/panels/settings/WorkspaceSettingsTab.ts
var WorkspaceSettingsTab_exports = {};
__export(WorkspaceSettingsTab_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW5,
  WorkspaceSettingsTab: () => WorkspaceSettingsTab
});
import "../../ui/legacy/legacy.js";
import "../../ui/components/buttons/buttons.js";
import "../../ui/kit/kit.js";
import * as Common6 from "../../core/common/common.js";
import * as i18n13 from "../../core/i18n/i18n.js";
import * as Persistence from "../../models/persistence/persistence.js";
import * as Buttons6 from "../../ui/components/buttons/buttons.js";
import * as UI7 from "../../ui/legacy/legacy.js";
import { html as html7, render as render7 } from "../../ui/lit/lit.js";
import * as VisualLogging6 from "../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/workspaceSettingsTab.css.js
var workspaceSettingsTab_css_default = `/*
 * Copyright 2017 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

@scope to (devtools-widget > *) {
  .mappings-info,
  .folder-exclude-pattern {
    height: var(--settings-single-item-height);
  }

  .mapping-view-container {
    padding-left: 0;
    padding-right: 0;
  }

  .folder-exclude-pattern {
    display: flex;
    align-items: center;

    & > input {
      flex: 1;
    }
  }

  label {
    padding-bottom: 0;
  }

  .mappings-info {
    border: none;
  }

  .add-button-container {
    max-width: var(--sys-size-35);
    margin-left: var(--sys-size-8);
    width: 100%;

    & .add-folder {
      min-width: var(--sys-size-31);
      max-width: var(--sys-size-35);
    }
  }
}

/*# sourceURL=${import.meta.resolve("./workspaceSettingsTab.css")} */`;

// ../../front_end/panels/settings/WorkspaceSettingsTab.ts
var UIStrings7 = {
  /**
   * @description Text of a DOM element in Workspace settings tab of the Workspace settings in Settings.
   */
  workspace: "Workspace",
  /**
   * @description Text of a DOM element in Workspace settings tab of the Workspace settings in Settings.
   */
  mappingsAreInferredAutomatically: "Mappings are inferred automatically",
  /**
   * @description Text of the add button in Workspace settings tab of the Workspace settings in Settings.
   */
  addFolder: "Add folder",
  /**
   * @description Label element text content in Workspace settings tab of the Workspace settings in Settings.
   */
  folderExcludePattern: "Exclude from workspace",
  /**
   * @description Label for an item to remove something.
   */
  remove: "Remove"
};
var str_7 = i18n13.i18n.registerUIStrings("panels/settings/WorkspaceSettingsTab.ts", UIStrings7);
var i18nString7 = i18n13.i18n.getLocalizedString.bind(void 0, str_7);
var { widget: widget2 } = UI7.Widget;
var DEFAULT_VIEW5 = (input, _output, target) => {
  render7(
    html7`
    <style>${workspaceSettingsTab_css_default}</style>
    <div class="settings-card-container-wrapper" jslog=${VisualLogging6.pane("workspace")}>
      <div class="settings-card-container">
        <devtools-card heading=${i18nString7(UIStrings7.workspace)}>
          <div class="folder-exclude-pattern">
            <label for="workspace-setting-folder-exclude-pattern">${i18nString7(UIStrings7.folderExcludePattern)}</label>
            <input
              class="harmony-input"
              jslog=${VisualLogging6.textField().track({ keydown: "Enter", change: true }).context(input.excludePatternSetting.name)}
              ${UI7.UIUtils.bindToSetting(input.excludePatternSetting, { jslog: false })}
              id="workspace-setting-folder-exclude-pattern">
          </div>
          <div class="mappings-info">${i18nString7(UIStrings7.mappingsAreInferredAutomatically)}</div>
        </devtools-card>
        ${input.fileSystems.map((fileSystem) => html7`
          <devtools-card heading=${fileSystem.displayName}>
            <devtools-icon name="folder" slot="heading-prefix"></devtools-icon>
            <div class="mapping-view-container">
              ${widget2(EditFileSystemView, { fileSystem: fileSystem.fileSystem })}
            </div>
            <devtools-button
              slot="heading-suffix"
              .variant=${Buttons6.Button.Variant.OUTLINED}
              jslog=${VisualLogging6.action().track({ click: true }).context("settings.remove-file-system")}
              @click=${input.onRemoveClicked.bind(null, fileSystem.fileSystem)}>${i18nString7(UIStrings7.remove)}</devtools-button>
          </devtools-card>
        `)}
        <div class="add-button-container">
          <devtools-button
            class="add-folder"
            .variant=${Buttons6.Button.Variant.OUTLINED}
            jslog=${VisualLogging6.action().track({ click: true }).context("sources.add-folder-to-workspace")}
            @click=${input.onAddClicked}>${i18nString7(UIStrings7.addFolder)}</devtools-button>
        </div>
      </div>
    </div>`,
    target
  );
};
var WorkspaceSettingsTab = class _WorkspaceSettingsTab extends UI7.Widget.VBox {
  #view;
  #eventListeners = [];
  constructor(view = DEFAULT_VIEW5) {
    super();
    this.#view = view;
  }
  wasShown() {
    super.wasShown();
    this.#eventListeners = [
      Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().addEventListener(
        Persistence.IsolatedFileSystemManager.Events.FileSystemAdded,
        this.requestUpdate.bind(this)
      ),
      Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().addEventListener(
        Persistence.IsolatedFileSystemManager.Events.FileSystemRemoved,
        this.requestUpdate.bind(this)
      )
    ];
    this.requestUpdate();
  }
  willHide() {
    super.willHide();
    Common6.EventTarget.removeEventListeners(this.#eventListeners);
    this.#eventListeners = [];
  }
  performUpdate() {
    const input = {
      excludePatternSetting: Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().workspaceFolderExcludePatternSetting(),
      onAddClicked: () => Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().addFileSystem(),
      onRemoveClicked: (fs) => Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().removeFileSystem(fs),
      fileSystems: Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().fileSystems().filter((fileSystem) => {
        const networkPersistenceProject = Persistence.NetworkPersistenceManager.NetworkPersistenceManager.instance().project();
        return fileSystem instanceof Persistence.IsolatedFileSystem.IsolatedFileSystem && (!networkPersistenceProject || Persistence.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().fileSystem(
          networkPersistenceProject.fileSystemPath()
        ) !== fileSystem);
      }).map((fileSystem) => {
        const displayName = _WorkspaceSettingsTab.#getFilename(fileSystem);
        return {
          displayName,
          fileSystem
        };
      }).sort((fs1, fs2) => fs1.displayName.localeCompare(fs2.displayName))
    };
    this.#view(input, void 0, this.contentElement);
  }
  static #getFilename(fileSystem) {
    const fileSystemPath = fileSystem.path();
    const lastIndexOfSlash = fileSystemPath.lastIndexOf("/");
    const lastPathComponent = fileSystemPath.substring(lastIndexOfSlash + 1);
    return decodeURIComponent(lastPathComponent);
  }
};
export {
  AISettingsTab_exports as AISettingsTab,
  BackendLinkingSettingsTab_exports as BackendLinkingSettingsTab,
  EditFileSystemView_exports as EditFileSystemView,
  FrameworkIgnoreListSettingsTab_exports as FrameworkIgnoreListSettingsTab,
  KeybindsSettingsTab_exports as KeybindsSettingsTab,
  SettingsScreen_exports as SettingsScreen,
  WorkspaceSettingsTab_exports as WorkspaceSettingsTab
};
//# sourceMappingURL=settings.js.map
