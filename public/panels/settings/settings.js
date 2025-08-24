var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/settings/SettingsScreen.js
var SettingsScreen_exports = {};
__export(SettingsScreen_exports, {
  ActionDelegate: () => ActionDelegate,
  ExperimentsSettingsTab: () => ExperimentsSettingsTab,
  GenericSettingsTab: () => GenericSettingsTab,
  Revealer: () => Revealer,
  SettingsScreen: () => SettingsScreen
});
import "./../../ui/components/cards/cards.js";
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Root from "./../../core/root/root.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as IconButton from "./../../ui/components/icon_button/icon_button.js";
import * as Components from "./../../ui/legacy/components/utils/utils.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
import { PanelUtils } from "./../utils/utils.js";
import * as PanelComponents from "./components/components.js";

// gen/front_end/panels/settings/settingsScreen.css.js
var settingsScreen_css_default = `/*
 * Copyright (c) 2015 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.settings-window-main {
  color: var(--sys-color-on-surface);
  background-color: var(--sys-color-cdt-base-container);
}

.settings-content {
  overflow: hidden auto;
  margin: 8px 8px 8px 0;
  padding: 0 4px;
  flex: auto;
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
  padding-right: 8px;
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

.settings-experiment-unstable {
  color: var(--sys-color-token-subtle);
}

.settings-experiment .feedback-link {
  color: var(--sys-color-primary);
  text-decoration-line: underline;
  margin-left: 4px;
}

.tabbed-pane-content slot::slotted(.widget) {
  /* '!important' in order to overwrite the slotted widget's 'overflow-auto' class.
  This prevents the focus-ring of selectable elements from being cut off. */
  overflow: visible !important; /* stylelint-disable-line declaration-no-important */
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

  .tabbed-pane-header-tab {
    background: ButtonFace;
  }

  .tabbed-pane-header-tab-title {
    color: canvastext;
  }
}

@media (forced-colors: active) and (prefers-color-scheme: dark) {
  .tabbed-pane-header-tab.selected {
    background: ButtonFace;
  }

  .tabbed-pane-header-tab.selected .tabbed-pane-header-tab-title {
    color: HighlightText;
  }
}

/*# sourceURL=${import.meta.resolve("./settingsScreen.css")} */`;

// gen/front_end/panels/settings/SettingsScreen.js
var UIStrings = {
  /**
   * @description Card header in Experiments settings tab that list all available unstable experiments that can be turned on or off.
   */
  unstableExperiments: "Unstable experiments",
  /**
   * @description Name of the Settings view
   */
  settings: "Settings",
  /**
   * @description Text for keyboard shortcuts
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text of button in Settings Screen of the Settings
   */
  restoreDefaultsAndReload: "Restore defaults and reload",
  /**
   * @description Card header in Experiments settings tab that list all available stable experiments that can be turned on or off.
   */
  experiments: "Experiments",
  /**
   * @description Message shown in the experiments panel to warn users about any possible unstable features.
   */
  theseExperimentsCouldBeUnstable: "Warning: These experiments could be unstable or unreliable.",
  /**
   * @description Message text content in Settings Screen of the Settings
   */
  theseExperimentsAreParticularly: "Warning: These experiments are particularly unstable. Enable at your own risk.",
  /**
   * @description Message to display if a setting change requires a reload of DevTools
   */
  oneOrMoreSettingsHaveChanged: "One or more settings have changed which requires a reload to take effect",
  /**
   * @description Warning text shown when the user has entered text to filter the
   * list of experiments, but no experiments match the filter.
   */
  noResults: "No experiments match the filter",
  /**
   * @description Text that is usually a hyperlink to more documentation
   */
  learnMore: "Learn more",
  /**
   * @description Text that is usually a hyperlink to a feedback form
   */
  sendFeedback: "Send feedback",
  /**
   * @description Placeholder text in search bar
   */
  searchExperiments: "Search experiments"
};
var str_ = i18n.i18n.registerUIStrings("panels/settings/SettingsScreen.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var settingsScreenInstance;
function createSettingsCard(heading, ...content) {
  const card = document.createElement("devtools-card");
  card.heading = heading;
  card.append(...content);
  return card;
}
var SettingsScreen = class _SettingsScreen extends UI.Widget.VBox {
  tabbedLocation;
  keybindsTab;
  reportTabOnReveal;
  constructor() {
    super({ useShadowDom: true });
    this.registerRequiredCSS(settingsScreen_css_default);
    this.contentElement.classList.add("settings-window-main");
    this.contentElement.classList.add("vbox");
    const settingsLabelElement = document.createElement("div");
    settingsLabelElement.classList.add("settings-window-label-element");
    const settingsTitleElement = UI.UIUtils.createShadowRootWithCoreStyles(settingsLabelElement, { cssFile: settingsScreen_css_default }).createChild("div", "settings-window-title");
    UI.ARIAUtils.markAsHeading(settingsTitleElement, 1);
    settingsTitleElement.textContent = i18nString(UIStrings.settings);
    this.tabbedLocation = UI.ViewManager.ViewManager.instance().createTabbedLocation(() => _SettingsScreen.revealSettingsScreen(), "settings-view");
    const tabbedPane = this.tabbedLocation.tabbedPane();
    tabbedPane.registerRequiredCSS(settingsScreen_css_default);
    tabbedPane.headerElement().prepend(settingsLabelElement);
    tabbedPane.setShrinkableTabs(false);
    tabbedPane.makeVerticalTabLayout();
    const keyBindsView = UI.ViewManager.ViewManager.instance().view("keybinds");
    if (keyBindsView) {
      void keyBindsView.widget().then((widget) => {
        this.keybindsTab = widget;
      });
    }
    tabbedPane.show(this.contentElement);
    tabbedPane.selectTab("preferences");
    tabbedPane.addEventListener(UI.TabbedPane.Events.TabInvoked, this.tabInvoked, this);
    this.reportTabOnReveal = false;
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!settingsScreenInstance || forceNew) {
      settingsScreenInstance = new _SettingsScreen();
    }
    return settingsScreenInstance;
  }
  static revealSettingsScreen() {
    const settingsScreen = _SettingsScreen.instance();
    if (settingsScreen.isShowing()) {
      return settingsScreen;
    }
    settingsScreen.reportTabOnReveal = true;
    const dialog = new UI.Dialog.Dialog("settings");
    dialog.contentElement.removeAttribute("aria-modal");
    dialog.contentElement.tabIndex = -1;
    dialog.addCloseButton();
    dialog.setOutsideClickCallback(() => {
    });
    dialog.setPointerEventsBehavior(
      "PierceGlassPane"
      /* UI.GlassPane.PointerEventsBehavior.PIERCE_GLASS_PANE */
    );
    dialog.setOutsideTabIndexBehavior(
      "PreserveMainViewTabIndex"
      /* UI.Dialog.OutsideTabIndexBehavior.PRESERVE_MAIN_VIEW_TAB_INDEX */
    );
    settingsScreen.show(dialog.contentElement);
    dialog.setEscapeKeyCallback(settingsScreen.onEscapeKeyPressed.bind(settingsScreen));
    dialog.setMarginBehavior(
      "NoMargin"
      /* UI.GlassPane.MarginBehavior.NO_MARGIN */
    );
    dialog.show();
    dialog.contentElement.focus();
    return settingsScreen;
  }
  static async showSettingsScreen(options = { name: void 0, focusTabHeader: void 0 }) {
    const { name, focusTabHeader } = options;
    const settingsScreen = _SettingsScreen.revealSettingsScreen();
    settingsScreen.selectTab(name || "preferences");
    const tabbedPane = settingsScreen.tabbedLocation.tabbedPane();
    await tabbedPane.waitForTabElementUpdate();
    if (focusTabHeader) {
      tabbedPane.focusSelectedTabHeader();
    } else {
      tabbedPane.focus();
    }
  }
  resolveLocation(_locationName) {
    return this.tabbedLocation;
  }
  selectTab(name) {
    this.tabbedLocation.tabbedPane().selectTab(
      name,
      /* userGesture */
      true
    );
  }
  tabInvoked(event) {
    const eventData = event.data;
    if (!eventData.isUserGesture) {
      return;
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
      Host.userMetrics.settingsPanelShown("shortcuts");
      return;
    }
    Host.userMetrics.settingsPanelShown(tabId);
  }
  onEscapeKeyPressed(event) {
    if (this.tabbedLocation.tabbedPane().selectedTabId === "keybinds" && this.keybindsTab) {
      this.keybindsTab.onEscapeKeyPressed(event);
    }
  }
};
var GenericSettingsTab = class _GenericSettingsTab extends UI.Widget.VBox {
  syncSection = new PanelComponents.SyncSection.SyncSection();
  settingToControl = /* @__PURE__ */ new Map();
  containerElement;
  #updateSyncSectionTimerId = -1;
  constructor() {
    super({ jslog: `${VisualLogging.pane("preferences")}` });
    this.element.classList.add("settings-tab-container");
    this.element.id = "preferences-tab-content";
    this.containerElement = this.contentElement.createChild("div", "settings-card-container-wrapper").createChild("div");
    this.containerElement.classList.add("settings-multicolumn-card-container");
    const explicitSectionOrder = [
      "",
      "APPEARANCE",
      "SOURCES",
      "ELEMENTS",
      "NETWORK",
      "PERFORMANCE",
      "MEMORY",
      "CONSOLE",
      "EXTENSIONS",
      "PERSISTENCE",
      "DEBUGGER",
      "GLOBAL",
      "ACCOUNT"
    ];
    const preRegisteredSettings = Common.Settings.Settings.instance().getRegisteredSettings().sort((firstSetting, secondSetting) => {
      if (firstSetting.order && secondSetting.order) {
        return firstSetting.order - secondSetting.order;
      }
      if (firstSetting.order) {
        return -1;
      }
      if (secondSetting.order) {
        return 1;
      }
      return 0;
    });
    for (const sectionCategory of explicitSectionOrder) {
      const settingsForSection = preRegisteredSettings.filter((setting) => setting.category === sectionCategory && _GenericSettingsTab.isSettingVisible(setting));
      this.createSectionElement(sectionCategory, settingsForSection);
    }
    const restoreAndReloadButton = UI.UIUtils.createTextButton(i18nString(UIStrings.restoreDefaultsAndReload), restoreAndReload, { jslogContext: "settings.restore-defaults-and-reload" });
    this.containerElement.appendChild(restoreAndReloadButton);
    function restoreAndReload() {
      Common.Settings.Settings.instance().clearAll();
      Components.Reload.reload();
    }
  }
  static isSettingVisible(setting) {
    return Boolean(setting.title?.()) && Boolean(setting.category);
  }
  wasShown() {
    UI.Context.Context.instance().setFlavor(_GenericSettingsTab, this);
    super.wasShown();
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
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.getSyncInformation((syncInfo) => {
      this.syncSection.data = {
        syncInfo,
        syncSetting: Common.Settings.moduleSetting("sync-preferences")
      };
      if (!syncInfo.isSyncActive || !syncInfo.arePreferencesSynced) {
        this.#updateSyncSectionTimerId = window.setTimeout(this.updateSyncSection.bind(this), 500);
      }
    });
  }
  createExtensionSection(settings) {
    const sectionName = "EXTENSIONS";
    const settingUI = Components.Linkifier.LinkHandlerSettingUI.instance();
    const element = settingUI.settingElement();
    if (element) {
      this.createStandardSectionElement(sectionName, settings, element);
    }
  }
  createSectionElement(category, settings) {
    if (category === "EXTENSIONS") {
      this.createExtensionSection(settings);
    } else if (category === "ACCOUNT" && settings.length > 0) {
      const syncCard = createSettingsCard(Common.SettingRegistration.getLocalizedSettingsCategory(
        "ACCOUNT"
        /* Common.SettingRegistration.SettingCategory.ACCOUNT */
      ), this.syncSection);
      this.containerElement.appendChild(syncCard);
    } else if (settings.length > 0) {
      this.createStandardSectionElement(category, settings);
    }
  }
  createStandardSectionElement(category, settings, content) {
    const uiSectionName = Common.Settings.getLocalizedSettingsCategory(category);
    const sectionElement = document.createElement("div");
    for (const settingRegistration of settings) {
      const setting = Common.Settings.Settings.instance().moduleSetting(settingRegistration.settingName);
      const settingControl = UI.SettingsUI.createControlForSetting(setting);
      if (settingControl) {
        this.settingToControl.set(setting, settingControl);
        sectionElement.appendChild(settingControl);
      }
    }
    if (content) {
      sectionElement.appendChild(content);
    }
    const card = createSettingsCard(uiSectionName, sectionElement);
    this.containerElement.appendChild(card);
  }
  highlightObject(setting) {
    if (setting instanceof Common.Settings.Setting) {
      const element = this.settingToControl.get(setting);
      if (element) {
        PanelUtils.highlightElement(element);
      }
    }
  }
};
var ExperimentsSettingsTab = class _ExperimentsSettingsTab extends UI.Widget.VBox {
  #experimentsSection;
  #unstableExperimentsSection;
  experimentToControl = /* @__PURE__ */ new Map();
  containerElement;
  constructor() {
    super({ jslog: `${VisualLogging.pane("experiments")}` });
    this.element.classList.add("settings-tab-container");
    this.element.id = "experiments-tab-content";
    this.containerElement = this.contentElement.createChild("div", "settings-card-container-wrapper").createChild("div");
    this.containerElement.classList.add("settings-card-container");
    const filterSection = this.containerElement.createChild("div");
    filterSection.classList.add("experiments-filter");
    render(html`
        <devtools-toolbar>
          <devtools-toolbar-input type="filter" placeholder=${i18nString(UIStrings.searchExperiments)} style="flex-grow:1" @change=${this.#onFilterChanged.bind(this)}></devtools-toolbar-input>
        </devtools-toolbar>
    `, filterSection);
    this.renderExperiments("");
    const filter = filterSection.querySelector("devtools-toolbar-input");
    this.setDefaultFocusedElement(filter);
  }
  #onFilterChanged(e) {
    this.renderExperiments(e.detail.toLowerCase());
  }
  renderExperiments(filterText) {
    this.experimentToControl.clear();
    if (this.#experimentsSection) {
      this.#experimentsSection.remove();
    }
    if (this.#unstableExperimentsSection) {
      this.#unstableExperimentsSection.remove();
    }
    const experiments = Root.Runtime.experiments.allConfigurableExperiments().sort();
    const unstableExperiments = experiments.filter((e) => e.unstable && e.title.toLowerCase().includes(filterText));
    const stableExperiments = experiments.filter((e) => !e.unstable && e.title.toLowerCase().includes(filterText));
    if (stableExperiments.length) {
      const experimentsBlock = document.createElement("div");
      experimentsBlock.classList.add("settings-experiments-block");
      const warningMessage = i18nString(UIStrings.theseExperimentsCouldBeUnstable);
      const warningSection = this.createExperimentsWarningSubsection(warningMessage);
      for (const experiment of stableExperiments) {
        experimentsBlock.appendChild(this.createExperimentCheckbox(experiment));
      }
      this.#experimentsSection = createSettingsCard(i18nString(UIStrings.experiments), warningSection, experimentsBlock);
      this.containerElement.appendChild(this.#experimentsSection);
    }
    if (unstableExperiments.length) {
      const experimentsBlock = document.createElement("div");
      experimentsBlock.classList.add("settings-experiments-block");
      const warningMessage = i18nString(UIStrings.theseExperimentsAreParticularly);
      for (const experiment of unstableExperiments) {
        experimentsBlock.appendChild(this.createExperimentCheckbox(experiment));
      }
      this.#unstableExperimentsSection = createSettingsCard(i18nString(UIStrings.unstableExperiments), this.createExperimentsWarningSubsection(warningMessage), experimentsBlock);
      this.containerElement.appendChild(this.#unstableExperimentsSection);
    }
    if (!stableExperiments.length && !unstableExperiments.length) {
      const warning = document.createElement("span");
      warning.textContent = i18nString(UIStrings.noResults);
      UI.ARIAUtils.LiveAnnouncer.alert(warning.textContent);
      this.#experimentsSection = createSettingsCard(i18nString(UIStrings.experiments), warning);
      this.containerElement.appendChild(this.#experimentsSection);
    }
  }
  createExperimentsWarningSubsection(warningMessage) {
    const subsection = document.createElement("div");
    subsection.classList.add("experiments-warning-subsection");
    const warningIcon = IconButton.Icon.create("warning");
    subsection.appendChild(warningIcon);
    const warning = subsection.createChild("span");
    warning.textContent = warningMessage;
    return subsection;
  }
  createExperimentCheckbox(experiment) {
    const checkbox = UI.UIUtils.CheckboxLabel.createWithStringLiteral(experiment.title, experiment.isEnabled(), experiment.name);
    checkbox.classList.add("experiment-label");
    checkbox.name = experiment.name;
    function listener() {
      experiment.setEnabled(checkbox.checked);
      Host.userMetrics.experimentChanged(experiment.name, experiment.isEnabled());
      UI.InspectorView.InspectorView.instance().displayReloadRequiredWarning(i18nString(UIStrings.oneOrMoreSettingsHaveChanged));
    }
    checkbox.addEventListener("click", listener, false);
    const p = document.createElement("p");
    this.experimentToControl.set(experiment, p);
    p.classList.add("settings-experiment");
    if (experiment.unstable && !experiment.isEnabled()) {
      p.classList.add("settings-experiment-unstable");
    }
    p.appendChild(checkbox);
    const experimentLink = experiment.docLink;
    if (experimentLink) {
      const linkButton = new Buttons.Button.Button();
      linkButton.data = {
        iconName: "help",
        variant: "icon",
        size: "SMALL",
        jslogContext: `${experiment.name}-documentation`,
        title: i18nString(UIStrings.learnMore)
      };
      linkButton.addEventListener("click", () => UI.UIUtils.openInNewTab(experimentLink));
      linkButton.classList.add("link-icon");
      p.appendChild(linkButton);
    }
    if (experiment.feedbackLink) {
      const link2 = UI.XLink.XLink.create(experiment.feedbackLink, void 0, void 0, void 0, `${experiment.name}-feedback`);
      link2.textContent = i18nString(UIStrings.sendFeedback);
      link2.classList.add("feedback-link");
      p.appendChild(link2);
    }
    return p;
  }
  highlightObject(experiment) {
    if (experiment instanceof Root.Runtime.Experiment) {
      const element = this.experimentToControl.get(experiment);
      if (element) {
        PanelUtils.highlightElement(element);
      }
    }
  }
  wasShown() {
    UI.Context.Context.instance().setFlavor(_ExperimentsSettingsTab, this);
    super.wasShown();
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
        UI.UIUtils.openInNewTab("https://developer.chrome.com/docs/devtools/");
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
    for (const settingRegistration of Common.Settings.Settings.instance().getRegisteredSettings()) {
      if (!GenericSettingsTab.isSettingVisible(settingRegistration)) {
        continue;
      }
      if (settingRegistration.settingName === object.name) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        await SettingsScreen.showSettingsScreen();
        const genericSettingsTab = context.flavor(GenericSettingsTab);
        if (genericSettingsTab !== null) {
          genericSettingsTab.highlightObject(object);
        }
        return;
      }
    }
    for (const view of UI.ViewManager.getRegisteredViewExtensions()) {
      const id = view.viewId();
      const location = view.location();
      if (location !== "settings-view") {
        continue;
      }
      const settings = view.settings();
      if (settings && settings.indexOf(object.name) !== -1) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        await SettingsScreen.showSettingsScreen({ name: id });
        const widget = await view.widget();
        if ("highlightObject" in widget && typeof widget.highlightObject === "function") {
          widget.highlightObject(object);
        }
        return;
      }
    }
  }
};

// gen/front_end/panels/settings/FrameworkIgnoreListSettingsTab.js
var FrameworkIgnoreListSettingsTab_exports = {};
__export(FrameworkIgnoreListSettingsTab_exports, {
  FrameworkIgnoreListSettingsTab: () => FrameworkIgnoreListSettingsTab
});
import "./../../ui/components/cards/cards.js";
import * as Common2 from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as Buttons2 from "./../../ui/components/buttons/buttons.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
import * as VisualLogging2 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/frameworkIgnoreListSettingsTab.css.js
var frameworkIgnoreListSettingsTab_css_default = `/*
 * Copyright 2015 The Chromium Authors. All rights reserved.
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
  margin: 6px 5px;
  align-items: center;
}

.ignore-list-edit-row input,
.ignore-list-edit-row select {
  width: 100%;
  text-align: inherit;
}

.list:has(.ignore-list-empty),
.list:has(.ignore-list-edit-row),
.list:has(.ignore-list-item) {
  border: none;
}

.editor-container:has(.ignore-list-edit-row) {
  background: var(--sys-color-surface1);
  border-radius: 10px;
}

.ignore-list.list-editing ~ .add-button {
  display: none;
}

.devtools-link:has(devtools-icon) {
  margin-left: 6px;
}

/*# sourceURL=${import.meta.resolve("./frameworkIgnoreListSettingsTab.css")} */`;

// gen/front_end/panels/settings/FrameworkIgnoreListSettingsTab.js
var UIStrings2 = {
  /**
   * @description Header text content in Framework Ignore List Settings Tab of the Settings for enabling or disabling ignore listing
   */
  frameworkIgnoreList: "Ignore listing",
  /**
   * @description Checkbox label in Framework Ignore List Settings Tab of the Settings
   */
  ignoreListingDescription: "When enabled, the debugger will skip over ignore-listed scripts and will ignore exceptions that only affect them and the Performance panel will collapse matching flamechart items.",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  ignoreListContentScripts: "Content scripts injected by extensions",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  ignoreListAnonymousScripts: "Anonymous scripts from eval or console",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  automaticallyIgnoreListKnownThirdPartyScripts: "Known third-party scripts from source maps",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  enableIgnoreListing: "Enable ignore listing",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  enableIgnoreListingTooltip: "Uncheck to disable all ignore listing",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  generalExclusionRules: "General exclusion rules",
  /**
   * @description Text in Framework Ignore List Settings Tab of the Settings
   */
  customExclusionRules: "Custom exclusion rules",
  /**
   * @description Text of the add pattern button in Framework Ignore List Settings Tab of the Settings
   */
  addPattern: "Add regex rule",
  /**
   * @description Aria accessible name in Framework Ignore List Settings Tab of the Settings
   */
  addFilenamePattern: "Add a regular expression rule for the script's URL",
  /**
   * @description Pattern title in Framework Ignore List Settings Tab of the Settings
   * @example {ad.*?} PH1
   */
  ignoreScriptsWhoseNamesMatchS: "Ignore scripts whose names match ''{PH1}''",
  /**
   * @description Aria accessible name in Framework Ignore List Settings Tab of the Settings. It labels the input
   * field used to add new or edit existing regular expressions that match file names to ignore in the debugger.
   */
  pattern: "Add a regular expression rule for the script's URL",
  /**
   * @description Error message in Framework Ignore List settings pane that declares pattern must not be empty
   */
  patternCannotBeEmpty: "Rule can't be empty",
  /**
   * @description Error message in Framework Ignore List settings pane that declares pattern already exits
   */
  patternAlreadyExists: "Rule already exists",
  /**
   * @description Error message in Framework Ignore List settings pane that declares pattern must be a valid regular expression
   */
  patternMustBeAValidRegular: "Rule must be a valid regular expression",
  /**
   * @description Text that is usually a hyperlink to more documentation
   */
  learnMore: "Learn more"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/settings/FrameworkIgnoreListSettingsTab.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var FrameworkIgnoreListSettingsTab = class extends UI2.Widget.VBox {
  list;
  setting;
  editor;
  constructor() {
    super({
      jslog: `${VisualLogging2.pane("blackbox")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(frameworkIgnoreListSettingsTab_css_default, settingsScreen_css_default);
    const settingsContent = this.contentElement.createChild("div", "settings-card-container-wrapper").createChild("div");
    settingsContent.classList.add("settings-card-container", "ignore-list-settings");
    const ignoreListingDescription = document.createElement("span");
    ignoreListingDescription.textContent = i18nString2(UIStrings2.ignoreListingDescription);
    const enabledSetting = Common2.Settings.Settings.instance().moduleSetting("enable-ignore-listing");
    const enableIgnoreListing = this.contentElement.createChild("div", "enable-ignore-listing");
    enableIgnoreListing.appendChild(UI2.SettingsUI.createSettingCheckbox(i18nString2(UIStrings2.enableIgnoreListing), enabledSetting));
    UI2.Tooltip.Tooltip.install(enableIgnoreListing, i18nString2(UIStrings2.enableIgnoreListingTooltip));
    const enableIgnoreListingCard = settingsContent.createChild("devtools-card");
    enableIgnoreListingCard.heading = i18nString2(UIStrings2.frameworkIgnoreList);
    enableIgnoreListingCard.append(ignoreListingDescription, enableIgnoreListing);
    const generalExclusionGroup = this.createSettingGroup();
    generalExclusionGroup.classList.add("general-exclusion-group");
    const ignoreListContentScripts = generalExclusionGroup.createChild("div", "ignore-list-option").appendChild(UI2.SettingsUI.createSettingCheckbox(i18nString2(UIStrings2.ignoreListContentScripts), Common2.Settings.Settings.instance().moduleSetting("skip-content-scripts")));
    const automaticallyIgnoreListContainer = generalExclusionGroup.createChild("div", "ignore-list-option");
    const automaticallyIgnoreList = automaticallyIgnoreListContainer.appendChild(UI2.SettingsUI.createSettingCheckbox(i18nString2(UIStrings2.automaticallyIgnoreListKnownThirdPartyScripts), Common2.Settings.Settings.instance().moduleSetting("automatically-ignore-list-known-third-party-scripts")));
    const automaticallyIgnoreLinkButton = new Buttons2.Button.Button();
    automaticallyIgnoreLinkButton.data = {
      iconName: "help",
      variant: "icon",
      size: "SMALL",
      jslogContext: "learn-more",
      title: i18nString2(UIStrings2.learnMore)
    };
    automaticallyIgnoreLinkButton.addEventListener("click", () => UI2.UIUtils.openInNewTab("https://developer.chrome.com/docs/devtools/settings/ignore-list/#skip-third-party"));
    automaticallyIgnoreListContainer.appendChild(automaticallyIgnoreLinkButton);
    const ignoreListAnonymousScripts = generalExclusionGroup.createChild("div", "ignore-list-option").appendChild(UI2.SettingsUI.createSettingCheckbox(i18nString2(UIStrings2.ignoreListAnonymousScripts), Common2.Settings.Settings.instance().moduleSetting("skip-anonymous-scripts")));
    const generalExclusionGroupCard = settingsContent.createChild("devtools-card", "ignore-list-options");
    generalExclusionGroupCard.heading = i18nString2(UIStrings2.generalExclusionRules);
    generalExclusionGroupCard.append(generalExclusionGroup);
    const customExclusionGroup = this.createSettingGroup();
    customExclusionGroup.classList.add("custom-exclusion-group");
    const customExclusionGroupCard = settingsContent.createChild("devtools-card", "ignore-list-options");
    customExclusionGroupCard.heading = i18nString2(UIStrings2.customExclusionRules);
    customExclusionGroupCard.append(customExclusionGroup);
    this.list = new UI2.ListWidget.ListWidget(this);
    this.list.element.classList.add("ignore-list");
    this.list.registerRequiredCSS(frameworkIgnoreListSettingsTab_css_default);
    const placeholder = document.createElement("div");
    placeholder.classList.add("ignore-list-empty");
    this.list.setEmptyPlaceholder(placeholder);
    this.list.show(customExclusionGroup);
    const addPatternButton = UI2.UIUtils.createTextButton(i18nString2(UIStrings2.addPattern), this.addButtonClicked.bind(this), { className: "add-button", jslogContext: "settings.add-ignore-list-pattern" });
    UI2.ARIAUtils.setLabel(addPatternButton, i18nString2(UIStrings2.addFilenamePattern));
    customExclusionGroup.appendChild(addPatternButton);
    this.setting = Common2.Settings.Settings.instance().moduleSetting("skip-stack-frames-pattern");
    this.setting.addChangeListener(this.settingUpdated, this);
    const enabledChanged = () => {
      const enabled = enabledSetting.get();
      ignoreListContentScripts.disabled = !enabled;
      automaticallyIgnoreList.disabled = !enabled;
      automaticallyIgnoreLinkButton.disabled = !enabled;
      ignoreListAnonymousScripts.disabled = !enabled;
      addPatternButton.disabled = !enabled;
      this.settingUpdated();
    };
    enabledSetting.addChangeListener(enabledChanged);
    enabledChanged();
  }
  wasShown() {
    super.wasShown();
    this.settingUpdated();
  }
  settingUpdated() {
    const editable = Common2.Settings.Settings.instance().moduleSetting("enable-ignore-listing").get();
    this.list.clear();
    const patterns = this.setting.getAsArray();
    for (let i = 0; i < patterns.length; ++i) {
      this.list.appendItem(patterns[i], editable);
    }
  }
  addButtonClicked() {
    this.list.addNewItem(this.setting.getAsArray().length, { pattern: "", disabled: false });
  }
  createSettingGroup() {
    const group = document.createElement("div");
    group.classList.add("ignore-list-option-group");
    UI2.ARIAUtils.markAsGroup(group);
    return group;
  }
  renderItem(item2, editable) {
    const element = document.createElement("div");
    const listSetting = this.setting;
    const checkbox = UI2.UIUtils.CheckboxLabel.createWithStringLiteral(item2.pattern, !item2.disabled, "settings.ignore-list-pattern");
    const helpText = i18nString2(UIStrings2.ignoreScriptsWhoseNamesMatchS, { PH1: item2.pattern });
    UI2.Tooltip.Tooltip.install(checkbox, helpText);
    checkbox.ariaLabel = helpText;
    checkbox.addEventListener("change", inputChanged, false);
    checkbox.disabled = !editable;
    element.appendChild(checkbox);
    element.classList.add("ignore-list-item");
    return element;
    function inputChanged() {
      const disabled = !checkbox.checked;
      if (item2.disabled !== disabled) {
        item2.disabled = disabled;
        item2.disabledForUrl = void 0;
        listSetting.setAsArray(listSetting.getAsArray());
      }
    }
  }
  removeItemRequested(_item, index) {
    const patterns = this.setting.getAsArray();
    patterns.splice(index, 1);
    this.setting.setAsArray(patterns);
  }
  commitEdit(item2, editor, isNew) {
    item2.pattern = editor.control("pattern").value.trim();
    const list = this.setting.getAsArray();
    if (isNew) {
      list.push(item2);
    }
    this.setting.setAsArray(list);
  }
  beginEdit(item2) {
    const editor = this.createEditor();
    editor.control("pattern").value = item2.pattern;
    return editor;
  }
  createEditor() {
    if (this.editor) {
      return this.editor;
    }
    const editor = new UI2.ListWidget.Editor();
    this.editor = editor;
    const content = editor.contentElement();
    const titles = content.createChild("div", "ignore-list-edit-row");
    titles.createChild("div", "ignore-list-pattern").textContent = i18nString2(UIStrings2.pattern);
    const fields = content.createChild("div", "ignore-list-edit-row");
    const pattern = editor.createInput("pattern", "text", "/framework\\.js$", patternValidator.bind(this));
    UI2.ARIAUtils.setLabel(pattern, i18nString2(UIStrings2.pattern));
    fields.createChild("div", "ignore-list-pattern").appendChild(pattern);
    return editor;
    function patternValidator(_item, index, input) {
      const pattern2 = input.value.trim();
      const patterns = this.setting.getAsArray();
      if (!pattern2.length) {
        return { valid: false, errorMessage: i18nString2(UIStrings2.patternCannotBeEmpty) };
      }
      for (let i = 0; i < patterns.length; ++i) {
        if (i !== index && patterns[i].pattern === pattern2) {
          return { valid: false, errorMessage: i18nString2(UIStrings2.patternAlreadyExists) };
        }
      }
      let regex;
      try {
        regex = new RegExp(pattern2);
      } catch {
      }
      if (!regex) {
        return { valid: false, errorMessage: i18nString2(UIStrings2.patternMustBeAValidRegular) };
      }
      return { valid: true, errorMessage: void 0 };
    }
  }
};

// gen/front_end/panels/settings/AISettingsTab.js
var AISettingsTab_exports = {};
__export(AISettingsTab_exports, {
  AISettingsTab: () => AISettingsTab
});
import * as Common3 from "./../../core/common/common.js";
import * as Host2 from "./../../core/host/host.js";
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as Root2 from "./../../core/root/root.js";
import * as AiAssistanceModel from "./../../models/ai_assistance/ai_assistance.js";
import * as Buttons3 from "./../../ui/components/buttons/buttons.js";
import * as Input from "./../../ui/components/input/input.js";
import * as LegacyWrapper from "./../../ui/components/legacy_wrapper/legacy_wrapper.js";
import * as Switch from "./../../ui/components/switch/switch.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging3 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/aiSettingsTab.css.js
var aiSettingsTab_css_default = `/*
 * Copyright 2024 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

* {
  box-sizing: border-box;
}

:host {
  container-type: inline-size;
  container-name: ai-settings;
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

@container ai-settings (min-width: 480px) {
  .settings-container-wrapper {
    align-items: center;
  }
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

/*# sourceURL=${import.meta.resolve("./aiSettingsTab.css")} */`;

// gen/front_end/panels/settings/AISettingsTab.js
var { html: html2, Directives: { ifDefined, classMap } } = Lit;
var UIStrings3 = {
  /**
   * @description Header text for for a list of things to consider in the context of generative AI features
   */
  boostYourProductivity: "Boost your productivity with AI",
  /**
   * @description Text announcing a list of facts to consider (when using a GenAI feature)
   */
  thingsToConsider: "Things to consider",
  /**
   * @description Text describing a fact to consider when using AI features
   */
  experimentalFeatures: "These features use generative AI and may provide inaccurate or offensive information that doesn\u2019t represent Google\u2019s views",
  /**
   * @description Text describing a fact to consider when using AI features
   */
  sendsDataToGoogle: "These features send relevant data to Google. Google collects this data and feedback to improve its products and services with the help of human reviewers. Avoid sharing sensitive or personal information.",
  /**
   * @description Text describing a fact to consider when using AI features
   */
  sendsDataToGoogleNoLogging: "Your content will not be used by human reviewers to improve AI. Your organization may change these settings at any time.",
  /**
   * @description Text describing a fact to consider when using AI features
   */
  dataCollection: "Depending on your region, Google may refrain from data collection",
  /**
   * @description Text describing a fact to consider when using AI features
   */
  dataCollectionNoLogging: "Depending on your Google account management and/or region, Google may refrain from data collection",
  /**
   * @description Text describing the 'Console Insights' feature
   */
  helpUnderstandConsole: "Helps you understand and fix console warnings and errors",
  /**
   * @description Text describing the 'Auto Annotations' feature
   */
  aIAnnotationsFeatureDescription: "Automatically generate titles for performance trace annotations",
  /**
   * @description Text explaining AI feature helps annotate a performance trace with auto-generated labels
   */
  helpAnnotatePerformance: "Helps you annotate your performance trace with auto-generated labels",
  /**
   * @description Label for a button to expand an accordion
   */
  showMore: "Show more",
  /**
   * @description Label for a button to collapse an accordion
   */
  showLess: "Show less",
  /**
   * @description Header for a list of feature attributes. 'When (the feature is turned) on, you'll be able to …'
   */
  whenOn: "When on",
  /**
   * @description Description of the console insights feature
   */
  explainConsole: "Get explanations for console warnings and errors",
  /**
   * @description Description of the console insights feature ('these issues' refers to console warnings and errors)
   */
  receiveSuggestions: "Receive suggestions and code samples to address these issues",
  /**
   * @description Explainer for which data is being sent by the console insights feature
   */
  consoleInsightsSendsData: "To generate explanations, the console message, associated stack trace, related source code, and the associated network headers are sent to Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent by the console insights feature
   */
  consoleInsightsSendsDataNoLogging: "To generate explanations, the console message, associated stack trace, related source code, and the associated network headers are sent to Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Reference to the terms of service and privacy notice
   * @example {Google Terms of Service} PH1
   * @example {Privacy Notice} PH2
   */
  termsOfServicePrivacyNotice: "Use of these features is subject to the {PH1} and {PH2}",
  /**
   * @description Text describing the 'AI assistance' feature
   */
  helpUnderstandStyling: "Get help with understanding CSS styles",
  /**
   * @description Text describing the 'AI assistance' feature
   */
  helpUnderstandStylingAndNetworkRequest: "Get help with understanding CSS styles, and network requests",
  /**
   * @description Text describing the 'AI assistance' feature
   */
  helpUnderstandStylingNetworkAndFile: "Get help with understanding CSS styles, network requests, and files",
  /**
   * @description Text describing the 'AI assistance' feature
   */
  helpUnderstandStylingNetworkPerformanceAndFile: "Get help with understanding CSS styles, network requests, performance, and files",
  /**
   * @description Text describing the 'Code suggestions' feature
   */
  helpUnderstandCodeSuggestions: "Get help completing your code",
  /**
   * @description Text which is a hyperlink to more documentation
   */
  learnMore: "Learn more",
  /**
   * @description Description of the AI assistance feature
   */
  explainStyling: "Understand CSS styles with AI-powered insights",
  /**
   * @description Description of the AI assistance feature
   */
  explainStylingAndNetworkRequest: "Understand CSS styles, and network activity with AI-powered insights",
  /**
   * @description Description of the AI assistance feature
   */
  explainStylingNetworkAndFile: "Understand CSS styles, network activity, and file origins with AI-powered insights",
  /**
   * @description Description of the AI assistance feature
   */
  explainStylingNetworkPerformanceAndFile: "Understand CSS styles, network activity, performance bottlenecks, and file origins with AI-powered insights",
  /**
   * @description Description of the AI assistance feature
   */
  receiveStylingSuggestions: "Improve your development workflow with contextual explanations and suggestions",
  /**
   * @description Explainer for which data is being sent by the AI assistance feature
   */
  freestylerSendsData: "To generate explanations, any user query and data the inspected page can access via Web APIs, network requests, files, and performance traces are sent to Google. This data may be seen by human reviewers to improve this feature. Don\u2019t use on pages with personal or sensitive information.",
  /**
   * @description Explainer for which data is being sent by the AI assistance feature
   */
  freestylerSendsDataNoLogging: "To generate explanations, any user query and data the inspected page can access via Web APIs, network requests, files, and performance traces are sent to Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Explainer for which data is being sent by the AI generated annotations feature
   */
  generatedAiAnnotationsSendData: "To generate annotation suggestions, your performance trace is sent to Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent by the AI assistance feature
   */
  generatedAiAnnotationsSendDataNoLogging: "To generate annotation suggestions, your performance trace is sent to Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Description of the 'Code suggestions' feature
   */
  asYouTypeCodeSuggestions: "As you type in the Console or Sources panel, you\u2019ll get code suggestions. Press Tab to accept one.",
  /**
   * @description Explainer for which data is being sent for the 'Code suggestions' feature
   */
  codeSuggestionsSendData: "To generate annotation suggestions, your performance trace is sent to Google. This data may be seen by human reviewers to improve this feature.",
  /**
   * @description Explainer for which data is being sent for the 'Code suggestions' feature when logging is not enabled
   */
  codeSuggestionsSendDataNoLogging: "To generate annotation suggestions, your performance trace is sent to Google. This data will not be used to improve Google\u2019s AI models. Your organization may change these settings at any time.",
  /**
   * @description Label for a link to the terms of service
   */
  termsOfService: "Google Terms of Service",
  /**
   * @description Label for a link to the privacy notice
   */
  privacyNotice: "Google Privacy Policy",
  /**
   * @description Label for a toggle to enable the Console Insights feature
   */
  enableConsoleInsights: "Enable `Console insights`",
  /**
   * @description Label for a toggle to enable the AI assistance feature
   */
  enableAiAssistance: "Enable AI assistance",
  /**
   * @description Label for a toggle to enable the AI assistance feature
   */
  enableAiSuggestedAnnotations: "Enable AI suggestions for performance panel annotations"
};
var str_3 = i18n5.i18n.registerUIStrings("panels/settings/AISettingsTab.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var AISettingsTab = class extends LegacyWrapper.LegacyWrapper.WrappableComponent {
  #shadow = this.attachShadow({ mode: "open" });
  #consoleInsightsSetting;
  #aiAnnotationsSetting;
  #aiAssistanceSetting;
  #aiCodeCompletionSetting;
  #aidaAvailability = "no-account-email";
  #boundOnAidaAvailabilityChange;
  // Setting to parameters needed to display it in the UI.
  // To display a a setting, it needs to be added to this map.
  #settingToParams = /* @__PURE__ */ new Map();
  constructor() {
    super();
    try {
      this.#consoleInsightsSetting = Common3.Settings.Settings.instance().moduleSetting("console-insights-enabled");
    } catch {
      this.#consoleInsightsSetting = void 0;
    }
    try {
      this.#aiAssistanceSetting = Common3.Settings.Settings.instance().moduleSetting("ai-assistance-enabled");
    } catch {
      this.#aiAssistanceSetting = void 0;
    }
    if (Root2.Runtime.hostConfig.devToolsAiGeneratedTimelineLabels?.enabled) {
      this.#aiAnnotationsSetting = Common3.Settings.Settings.instance().createSetting("ai-annotations-enabled", false);
    }
    if (Root2.Runtime.hostConfig.devToolsAiCodeCompletion?.enabled) {
      this.#aiCodeCompletionSetting = Common3.Settings.Settings.instance().createSetting("ai-code-completion-enabled", false);
    }
    this.#boundOnAidaAvailabilityChange = this.#onAidaAvailabilityChange.bind(this);
    this.#initSettings();
  }
  connectedCallback() {
    Host2.AidaClient.HostConfigTracker.instance().addEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
    void this.#onAidaAvailabilityChange();
  }
  disconnectedCallback() {
    Host2.AidaClient.HostConfigTracker.instance().removeEventListener("aidaAvailabilityChanged", this.#boundOnAidaAvailabilityChange);
  }
  // Define all parameter needed to render a setting
  #initSettings() {
    const noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    if (this.#consoleInsightsSetting) {
      const consoleInsightsData = {
        settingName: i18n5.i18n.lockedString("Console Insights"),
        iconName: "lightbulb-spark",
        settingDescription: i18nString3(UIStrings3.helpUnderstandConsole),
        enableSettingText: i18nString3(UIStrings3.enableConsoleInsights),
        settingItems: [
          { iconName: "lightbulb", text: i18nString3(UIStrings3.explainConsole) },
          { iconName: "code", text: i18nString3(UIStrings3.receiveSuggestions) }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString3(UIStrings3.consoleInsightsSendsDataNoLogging) : i18nString3(UIStrings3.consoleInsightsSendsData)
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
      this.#settingToParams.set(this.#consoleInsightsSetting, consoleInsightsData);
    }
    if (this.#aiAssistanceSetting) {
      const aiAssistanceData = {
        settingName: i18n5.i18n.lockedString("AI assistance"),
        iconName: "smart-assistant",
        settingDescription: this.#getAiAssistanceSettingDescription(),
        enableSettingText: i18nString3(UIStrings3.enableAiAssistance),
        settingItems: [
          { iconName: "info", text: this.#getAiAssistanceSettingInfo() },
          { iconName: "pen-spark", text: i18nString3(UIStrings3.receiveStylingSuggestions) }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString3(UIStrings3.freestylerSendsDataNoLogging) : i18nString3(UIStrings3.freestylerSendsData)
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
      this.#settingToParams.set(this.#aiAssistanceSetting, aiAssistanceData);
    }
    if (this.#aiAnnotationsSetting) {
      const aiAnnotationsData = {
        settingName: i18n5.i18n.lockedString("Auto annotations"),
        iconName: "pen-spark",
        settingDescription: i18nString3(UIStrings3.aIAnnotationsFeatureDescription),
        enableSettingText: i18nString3(UIStrings3.enableAiSuggestedAnnotations),
        settingItems: [
          { iconName: "label-auto", text: i18nString3(UIStrings3.helpAnnotatePerformance) }
        ],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString3(UIStrings3.generatedAiAnnotationsSendDataNoLogging) : i18nString3(UIStrings3.generatedAiAnnotationsSendData)
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
      this.#settingToParams.set(this.#aiAnnotationsSetting, aiAnnotationsData);
    }
    if (this.#aiCodeCompletionSetting) {
      const aiCodeCompletionData = {
        settingName: i18n5.i18n.lockedString("Code suggestions"),
        iconName: "text-analysis",
        settingDescription: i18nString3(UIStrings3.helpUnderstandCodeSuggestions),
        enableSettingText: i18nString3(UIStrings3.enableAiSuggestedAnnotations),
        settingItems: [{ iconName: "code", text: i18nString3(UIStrings3.asYouTypeCodeSuggestions) }],
        toConsiderSettingItems: [{
          iconName: "google",
          text: noLogging ? i18nString3(UIStrings3.codeSuggestionsSendDataNoLogging) : i18nString3(UIStrings3.codeSuggestionsSendData)
        }],
        // TODO: Add a relevant link
        learnMoreLink: { url: "", linkJSLogContext: "learn-more.code-completion" },
        settingExpandState: {
          isSettingExpanded: false,
          expandSettingJSLogContext: "code-completion.accordion"
        }
      };
      this.#settingToParams.set(this.#aiCodeCompletionSetting, aiCodeCompletionData);
    }
  }
  async #onAidaAvailabilityChange() {
    const currentAidaAvailability = await Host2.AidaClient.AidaClient.checkAccessPreconditions();
    if (currentAidaAvailability !== this.#aidaAvailability) {
      this.#aidaAvailability = currentAidaAvailability;
      void this.render();
    }
  }
  #getAiAssistanceSettingDescription() {
    const { hostConfig } = Root2.Runtime;
    if (hostConfig.devToolsAiAssistancePerformanceAgent?.enabled) {
      return i18nString3(UIStrings3.helpUnderstandStylingNetworkPerformanceAndFile);
    }
    if (hostConfig.devToolsAiAssistanceFileAgent?.enabled) {
      return i18nString3(UIStrings3.helpUnderstandStylingNetworkAndFile);
    }
    if (hostConfig.devToolsAiAssistanceNetworkAgent?.enabled) {
      return i18nString3(UIStrings3.helpUnderstandStylingAndNetworkRequest);
    }
    return i18nString3(UIStrings3.helpUnderstandStyling);
  }
  #getAiAssistanceSettingInfo() {
    const { hostConfig } = Root2.Runtime;
    if (hostConfig.devToolsAiAssistancePerformanceAgent?.enabled) {
      return i18nString3(UIStrings3.explainStylingNetworkPerformanceAndFile);
    }
    if (hostConfig.devToolsAiAssistanceFileAgent?.enabled) {
      return i18nString3(UIStrings3.explainStylingNetworkAndFile);
    }
    if (hostConfig.devToolsAiAssistanceNetworkAgent?.enabled) {
      return i18nString3(UIStrings3.explainStylingAndNetworkRequest);
    }
    return i18nString3(UIStrings3.explainStyling);
  }
  #expandSetting(setting) {
    const settingData = this.#settingToParams.get(setting);
    if (!settingData) {
      return;
    }
    settingData.settingExpandState.isSettingExpanded = !settingData.settingExpandState.isSettingExpanded;
    void this.render();
  }
  #toggleSetting(setting, ev) {
    if (ev.target instanceof Switch.Switch.Switch && ev.type !== Switch.Switch.SwitchChangeEvent.eventName) {
      return;
    }
    const settingData = this.#settingToParams.get(setting);
    if (!settingData) {
      return;
    }
    const oldSettingValue = setting.get();
    setting.set(!oldSettingValue);
    if (!oldSettingValue && !settingData.settingExpandState.isSettingExpanded) {
      settingData.settingExpandState.isSettingExpanded = true;
    }
    if (setting.name === "console-insights-enabled") {
      if (oldSettingValue) {
        Common3.Settings.Settings.instance().createLocalSetting("console-insights-onboarding-finished", false).set(false);
      } else {
        Common3.Settings.Settings.instance().createSetting(
          "console-insights-skip-reminder",
          true,
          "Session"
          /* Common.Settings.SettingStorageType.SESSION */
        ).set(true);
      }
    } else if (setting.name === "ai-assistance-enabled" && !setting.get()) {
      void AiAssistanceModel.AiHistoryStorage.instance().deleteAll();
    }
    void this.render();
  }
  #renderSharedDisclaimerItem(icon, text) {
    return html2`
      <div>
        <devtools-icon .name=${icon} class="medium">
        </devtools-icon>
      </div>
      <div>${text}</div>
    `;
  }
  #renderSharedDisclaimer() {
    const tosLink = UI3.XLink.XLink.create("https://policies.google.com/terms", i18nString3(UIStrings3.termsOfService), void 0, void 0, "terms-of-service");
    const privacyNoticeLink = UI3.XLink.XLink.create("https://policies.google.com/privacy", i18nString3(UIStrings3.privacyNotice), void 0, void 0, "privacy-notice");
    const noLogging = Root2.Runtime.hostConfig.aidaAvailability?.enterprisePolicyValue === Root2.Runtime.GenAiEnterprisePolicyValue.ALLOW_WITHOUT_LOGGING;
    const bulletPoints = [
      { icon: "psychiatry", text: i18nString3(UIStrings3.experimentalFeatures) },
      {
        icon: "google",
        text: noLogging ? i18nString3(UIStrings3.sendsDataToGoogleNoLogging) : i18nString3(UIStrings3.sendsDataToGoogle)
      },
      {
        icon: "corporate-fare",
        text: noLogging ? i18nString3(UIStrings3.dataCollectionNoLogging) : i18nString3(UIStrings3.dataCollection)
      },
      {
        icon: "policy",
        text: html2`${i18n5.i18n.getFormatLocalizedString(str_3, UIStrings3.termsOfServicePrivacyNotice, {
          PH1: tosLink,
          PH2: privacyNoticeLink
        })}`
      }
    ];
    return html2`
      <div class="shared-disclaimer">
        <h2>${i18nString3(UIStrings3.boostYourProductivity)}</h2>
        <h3 class="disclaimer-list-header">${i18nString3(UIStrings3.thingsToConsider)}</h3>
        <div class="disclaimer-list">
          ${bulletPoints.map((item2) => this.#renderSharedDisclaimerItem(item2.icon, item2.text))}
        </div>
      </div>
    `;
  }
  #renderSettingItem(settingItem) {
    return html2`
      <div>
        <devtools-icon class="extra-large" .name=${settingItem.iconName}>
        </devtools-icon>
      </div>
      <div class="padded">${settingItem.text}</div>
    `;
  }
  #renderSetting(setting) {
    const settingData = this.#settingToParams.get(setting);
    if (!settingData) {
      return Lit.nothing;
    }
    const disabledReasons = AiAssistanceModel.getDisabledReasons(this.#aidaAvailability);
    const isDisabled = disabledReasons.length > 0;
    const disabledReasonsJoined = disabledReasons.join("\n") || void 0;
    const detailsClasses = {
      "whole-row": true,
      open: settingData.settingExpandState.isSettingExpanded
    };
    const tabindex = settingData.settingExpandState.isSettingExpanded ? "0" : "-1";
    return html2`
      <div class="accordion-header" @click=${this.#expandSetting.bind(this, setting)}>
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
      title: settingData.settingExpandState.isSettingExpanded ? i18nString3(UIStrings3.showLess) : i18nString3(UIStrings3.showMore),
      size: "SMALL",
      iconName: settingData.settingExpandState.isSettingExpanded ? "chevron-up" : "chevron-down",
      variant: "icon",
      jslogContext: settingData.settingExpandState.expandSettingJSLogContext
    }}
          ></devtools-button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="toggle-container centered"
        title=${ifDefined(disabledReasonsJoined)}
        @click=${this.#toggleSetting.bind(this, setting)}
      >
        <devtools-switch
          .checked=${Boolean(setting.get()) && !isDisabled}
          .jslogContext=${setting.name || ""}
          .disabled=${isDisabled}
          @switchchange=${this.#toggleSetting.bind(this, setting)}
          aria-label=${disabledReasonsJoined || settingData.enableSettingText}
        ></devtools-switch>
      </div>
      <div class=${classMap(detailsClasses)}>
        <div class="overflow-hidden">
          <div class="expansion-grid">
            <h3 class="expansion-grid-whole-row">${i18nString3(UIStrings3.whenOn)}</h3>
            ${settingData.settingItems.map((item2) => this.#renderSettingItem(item2))}
            <h3 class="expansion-grid-whole-row">${i18nString3(UIStrings3.thingsToConsider)}</h3>
            ${settingData.toConsiderSettingItems.map((item2) => this.#renderSettingItem(item2))}
            <div class="expansion-grid-whole-row">
              <x-link
                href=${settingData.learnMoreLink.url}
                class="link"
                tabindex=${tabindex}
                jslog=${VisualLogging3.link(settingData.learnMoreLink.linkJSLogContext).track({
      click: true
    })}
              >${i18nString3(UIStrings3.learnMore)}</x-link>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  #renderDisabledExplainer(disabledReasons) {
    return html2`
      <div class="disabled-explainer">
        ${disabledReasons.map((reason) => html2`
          <div class="disabled-explainer-row">
            <devtools-icon name="warning" class="medium" style="color: var(--icon-warning);">
            </devtools-icon>
            ${reason}
          </div>
        `)}
      </div>
    `;
  }
  async render() {
    const disabledReasons = AiAssistanceModel.getDisabledReasons(this.#aidaAvailability);
    Lit.render(html2`
      <style>${Input.checkboxStyles}</style>
      <style>${aiSettingsTab_css_default}</style>
      <div class="settings-container-wrapper" jslog=${VisualLogging3.pane("chrome-ai")}>
        ${this.#renderSharedDisclaimer()}
        ${this.#settingToParams.size > 0 ? html2`
          ${disabledReasons.length ? this.#renderDisabledExplainer(disabledReasons) : Lit.nothing}
          <div class="settings-container">
            ${this.#settingToParams.keys().map((setting) => this.#renderSetting(setting))}
          </div>
        ` : Lit.nothing}
      </div>
    `, this.#shadow, { host: this });
  }
};
customElements.define("devtools-settings-ai-settings-tab", AISettingsTab);

// gen/front_end/panels/settings/KeybindsSettingsTab.js
var KeybindsSettingsTab_exports = {};
__export(KeybindsSettingsTab_exports, {
  KeybindsSettingsTab: () => KeybindsSettingsTab,
  ShortcutListItem: () => ShortcutListItem
});
import "./../../ui/components/cards/cards.js";
import * as Common4 from "./../../core/common/common.js";
import * as Host3 from "./../../core/host/host.js";
import * as i18n7 from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as Buttons4 from "./../../ui/components/buttons/buttons.js";
import * as IconButton2 from "./../../ui/components/icon_button/icon_button.js";
import * as UI4 from "./../../ui/legacy/legacy.js";
import * as VisualLogging4 from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/settings/keybindsSettingsTab.css.js
var keybindsSettingsTab_css_default = `/*
 * Copyright 2020 The Chromium Authors. All rights reserved.
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

.keybinds-list-item.keybinds-editing {
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
.keybinds-list-item:not(.keybinds-editing):focus-within .keybinds-edit-button {
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
  margin: 0 2px;
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

.docs-link.devtools-link {
  align-self: flex-start;
  min-height: 2em;
  line-height: 2em;
  margin-bottom: 4px;
}

.keybinds-footer {
  padding: var(--sys-size-5) var(--sys-size-7);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: fit-content;
  margin-top: 10px;
}

/*# sourceURL=${import.meta.resolve("./keybindsSettingsTab.css")} */`;

// gen/front_end/panels/settings/KeybindsSettingsTab.js
var UIStrings4 = {
  /**
   * @description Text for keyboard shortcuts
   */
  shortcuts: "Shortcuts",
  /**
   * @description Text appearing before a select control offering users their choice of keyboard shortcut presets.
   */
  matchShortcutsFromPreset: "Shortcut preset",
  /**
   * @description Screen reader label for list of keyboard shortcuts in settings
   */
  keyboardShortcutsList: "Keyboard shortcuts list",
  /**
   * @description Screen reader label for an icon denoting a shortcut that has been changed from its default
   */
  shortcutModified: "Shortcut modified",
  /**
   * @description Screen reader label for an empty shortcut cell in custom shortcuts settings tab
   */
  noShortcutForAction: "No shortcut for action",
  /**
   * @description Link text in the settings pane to add another shortcut for an action
   */
  addAShortcut: "Add a shortcut",
  /**
   * @description Label for a button in the settings pane that confirms changes to a keyboard shortcut
   */
  confirmChanges: "Confirm changes",
  /**
   * @description Label for a button in the settings pane that discards changes to the shortcut being edited
   */
  discardChanges: "Discard changes",
  /**
   * @description Label for a button in the settings pane that removes a keyboard shortcut.
   */
  removeShortcut: "Remove shortcut",
  /**
   * @description Label for a button in the settings pane that edits a keyboard shortcut
   */
  editShortcut: "Edit shortcut",
  /**
   * @description Message shown in settings when the user inputs a modifier-only shortcut such as Ctrl+Shift.
   */
  shortcutsCannotContainOnly: "Shortcuts cannot contain only modifier keys.",
  /**
   * @description Messages shown in shortcuts settings when the user inputs a shortcut that is already in use.
   * @example {Performance} PH1
   * @example {Start/stop recording} PH2
   */
  thisShortcutIsInUseByS: "This shortcut is in use by {PH1}: {PH2}.",
  /**
   * @description Message shown in settings when to restore default shortcuts.
   */
  RestoreDefaultShortcuts: "Restore default shortcuts",
  /**
   * @description Message shown in settings to show the full list of keyboard shortcuts.
   */
  FullListOfDevtoolsKeyboard: "Full list of DevTools keyboard shortcuts and gestures",
  /**
   * @description Label for a button in the shortcut editor that resets all shortcuts for the current action.
   */
  ResetShortcutsForAction: "Reset shortcuts for action",
  /**
   * @description Screen reader announcement for shortcut removed
   * @example {Start/stop recording} PH1
   */
  shortcutRemoved: "{PH1} Shortcut removed",
  /**
   * @description Screen reader announcement for shortcut restored to default
   */
  shortcutChangesRestored: "Changes to shortcut restored to default",
  /**
   * @description Screen reader announcement for applied short cut changes
   */
  shortcutChangesApplied: "Changes to shortcut applied",
  /**
   * @description Screen reader announcement for discarded short cut changes
   */
  shortcutChangesDiscarded: "Changes to shortcut discarded"
};
var str_4 = i18n7.i18n.registerUIStrings("panels/settings/KeybindsSettingsTab.ts", UIStrings4);
var i18nString4 = i18n7.i18n.getLocalizedString.bind(void 0, str_4);
var KeybindsSettingsTab = class extends UI4.Widget.VBox {
  items;
  list;
  editingItem;
  editingRow;
  constructor() {
    super({
      jslog: `${VisualLogging4.pane("keybinds")}`,
      useShadowDom: true
    });
    this.registerRequiredCSS(keybindsSettingsTab_css_default, settingsScreen_css_default);
    const settingsContent = this.contentElement.createChild("div", "settings-card-container-wrapper").createChild("div");
    settingsContent.classList.add("settings-card-container");
    const keybindsSetSetting = Common4.Settings.Settings.instance().moduleSetting("active-keybind-set");
    const userShortcutsSetting = Common4.Settings.Settings.instance().moduleSetting("user-shortcuts");
    keybindsSetSetting.addChangeListener(this.update, this);
    const keybindsSetSelect = UI4.SettingsUI.createControlForSetting(keybindsSetSetting, i18nString4(UIStrings4.matchShortcutsFromPreset));
    const card = settingsContent.createChild("devtools-card");
    card.heading = i18nString4(UIStrings4.shortcuts);
    if (keybindsSetSelect) {
      keybindsSetSelect.classList.add("keybinds-set-select");
    }
    this.items = new UI4.ListModel.ListModel();
    this.list = new UI4.ListControl.ListControl(this.items, this, UI4.ListControl.ListMode.NonViewport);
    this.list.element.classList.add("shortcut-list");
    this.items.replaceAll(this.createListItems());
    UI4.ARIAUtils.markAsList(this.list.element);
    UI4.ARIAUtils.setLabel(this.list.element, i18nString4(UIStrings4.keyboardShortcutsList));
    const footer = document.createElement("div");
    footer.classList.add("keybinds-footer");
    const docsLink = UI4.XLink.XLink.create("https://developer.chrome.com/docs/devtools/shortcuts/", i18nString4(UIStrings4.FullListOfDevtoolsKeyboard), void 0, void 0, "learn-more");
    docsLink.classList.add("docs-link");
    footer.appendChild(docsLink);
    const restoreDefaultShortcutsButton = UI4.UIUtils.createTextButton(i18nString4(UIStrings4.RestoreDefaultShortcuts), () => {
      userShortcutsSetting.set([]);
      keybindsSetSetting.set(UI4.ShortcutRegistry.DefaultShortcutSetting);
    }, { jslogContext: "restore-default-shortcuts" });
    footer.appendChild(restoreDefaultShortcutsButton);
    this.editingItem = null;
    this.editingRow = null;
    if (keybindsSetSelect) {
      card.append(keybindsSetSelect);
    }
    card.append(this.list.element, footer);
    this.update();
  }
  createElementForItem(item2) {
    const element = document.createElement("div");
    let itemContent;
    if (typeof item2 === "string") {
      itemContent = element;
      itemContent.classList.add("keybinds-category-header");
      itemContent.textContent = UI4.ActionRegistration.getLocalizedActionCategory(item2);
      UI4.ARIAUtils.setLevel(itemContent, 1);
    } else {
      const listItem = new ShortcutListItem(item2, this, item2 === this.editingItem);
      itemContent = listItem.element;
      UI4.ARIAUtils.setLevel(itemContent, 2);
      if (item2 === this.editingItem) {
        this.editingRow = listItem;
      }
      itemContent.classList.add("keybinds-list-item");
      element.classList.add("keybinds-list-item-wrapper");
      element.appendChild(itemContent);
    }
    UI4.ARIAUtils.markAsListitem(itemContent);
    itemContent.tabIndex = item2 === this.list.selectedItem() && item2 !== this.editingItem ? 0 : -1;
    return element;
  }
  commitChanges(item2, editedShortcuts) {
    for (const [originalShortcut, newDescriptors] of editedShortcuts) {
      if (originalShortcut.type !== "UnsetShortcut") {
        UI4.ShortcutRegistry.ShortcutRegistry.instance().removeShortcut(originalShortcut);
        if (!newDescriptors) {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.ShortcutRemoved);
        }
      }
      if (newDescriptors) {
        UI4.ShortcutRegistry.ShortcutRegistry.instance().registerUserShortcut(originalShortcut.changeKeys(newDescriptors).changeType(
          "UserShortcut"
          /* UI.KeyboardShortcut.Type.USER_SHORTCUT */
        ));
        if (originalShortcut.type === "UnsetShortcut") {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.UserShortcutAdded);
        } else {
          Host3.userMetrics.actionTaken(Host3.UserMetrics.Action.ShortcutModified);
        }
      }
    }
    this.stopEditing(item2);
  }
  /**
   * This method will never be called.
   */
  heightForItem(_item) {
    return 0;
  }
  isItemSelectable(_item) {
    return true;
  }
  selectedItemChanged(_from, to, fromElement, toElement) {
    if (fromElement) {
      fromElement.tabIndex = -1;
    }
    if (toElement) {
      if (to === this.editingItem && this.editingRow) {
        this.editingRow.focus();
      } else {
        toElement.tabIndex = 0;
        if (this.list.element.hasFocus()) {
          toElement.focus();
        }
      }
      this.setDefaultFocusedElement(toElement);
    }
  }
  updateSelectedItemARIA(_fromElement, _toElement) {
    return true;
  }
  startEditing(action) {
    this.list.selectItem(action);
    if (this.editingItem) {
      this.stopEditing(this.editingItem);
    }
    UI4.UIUtils.markBeingEdited(this.list.element, true);
    this.editingItem = action;
    this.list.refreshItem(action);
  }
  stopEditing(action) {
    UI4.UIUtils.markBeingEdited(this.list.element, false);
    this.editingItem = null;
    this.editingRow = null;
    this.list.refreshItem(action);
    this.focus();
  }
  createListItems() {
    const actions = UI4.ActionRegistry.ActionRegistry.instance().actions().sort((actionA, actionB) => {
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
    actions.forEach((action) => {
      if (action.id() === "elements.toggle-element-search") {
        return;
      }
      if (currentCategory !== action.category()) {
        items.push(action.category());
      }
      items.push(action);
      currentCategory = action.category();
    });
    return items;
  }
  onEscapeKeyPressed(event) {
    const deepActiveElement = Platform2.DOMUtilities.deepActiveElement(document);
    if (this.editingRow && deepActiveElement && deepActiveElement.nodeName === "INPUT") {
      this.editingRow.onEscapeKeyPressed(event);
    }
  }
  update() {
    if (this.editingItem) {
      this.stopEditing(this.editingItem);
    }
    this.list.refreshAllItems();
    if (!this.list.selectedItem()) {
      this.list.selectItem(this.items.at(0));
    }
  }
  willHide() {
    super.willHide();
    if (this.editingItem) {
      this.stopEditing(this.editingItem);
    }
  }
};
var ShortcutListItem = class {
  isEditing;
  settingsTab;
  item;
  element;
  editedShortcuts;
  shortcutInputs;
  shortcuts;
  elementToFocus;
  confirmButton;
  addShortcutLinkContainer;
  errorMessageElement;
  secondKeyTimeout;
  constructor(item2, settingsTab, isEditing) {
    this.isEditing = Boolean(isEditing);
    this.settingsTab = settingsTab;
    this.item = item2;
    this.element = document.createElement("div");
    this.element.setAttribute("jslog", `${VisualLogging4.item().context(item2.id()).track({ keydown: "Escape" })}`);
    this.editedShortcuts = /* @__PURE__ */ new Map();
    this.shortcutInputs = /* @__PURE__ */ new Map();
    this.shortcuts = UI4.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction(item2.id());
    this.elementToFocus = null;
    this.confirmButton = null;
    this.addShortcutLinkContainer = null;
    this.errorMessageElement = null;
    this.secondKeyTimeout = null;
    this.update();
  }
  focus() {
    if (this.elementToFocus) {
      this.elementToFocus.focus();
    }
  }
  update() {
    this.element.removeChildren();
    this.elementToFocus = null;
    this.shortcutInputs.clear();
    this.element.classList.toggle("keybinds-editing", this.isEditing);
    this.element.createChild("div", "keybinds-action-name keybinds-list-text").textContent = this.item.title();
    this.shortcuts.forEach(this.createShortcutRow, this);
    if (this.shortcuts.length === 0) {
      this.createEmptyInfo();
    }
    if (this.isEditing) {
      this.setupEditor();
    }
  }
  createEmptyInfo() {
    if (UI4.ShortcutRegistry.ShortcutRegistry.instance().actionHasDefaultShortcut(this.item.id())) {
      const icon = IconButton2.Icon.create("keyboard-pen", "keybinds-modified");
      UI4.ARIAUtils.setLabel(icon, i18nString4(UIStrings4.shortcutModified));
      this.element.appendChild(icon);
    }
    if (!this.isEditing) {
      const emptyElement = this.element.createChild("div", "keybinds-shortcut keybinds-list-text");
      UI4.ARIAUtils.setLabel(emptyElement, i18nString4(UIStrings4.noShortcutForAction));
      this.element.appendChild(this.createEditButton());
    }
  }
  setupEditor() {
    this.addShortcutLinkContainer = this.element.createChild("div", "keybinds-shortcut");
    const addShortcutButton = UI4.UIUtils.createTextButton(i18nString4(UIStrings4.addAShortcut), this.addShortcut.bind(this), { jslogContext: "add-shortcut" });
    this.addShortcutLinkContainer.appendChild(addShortcutButton);
    if (!this.elementToFocus) {
      this.elementToFocus = addShortcutButton;
    }
    this.errorMessageElement = this.element.createChild("div", "keybinds-info keybinds-error hidden");
    UI4.ARIAUtils.markAsAlert(this.errorMessageElement);
    this.element.appendChild(this.createIconButton(i18nString4(UIStrings4.ResetShortcutsForAction), "undo", "", "undo", this.resetShortcutsToDefaults.bind(this)));
    this.confirmButton = this.createIconButton(i18nString4(UIStrings4.confirmChanges), "checkmark", "keybinds-confirm-button", "confirm", () => {
      this.settingsTab.commitChanges(this.item, this.editedShortcuts);
      UI4.ARIAUtils.LiveAnnouncer.alert(i18nString4(UIStrings4.shortcutChangesApplied, { PH1: this.item.title() }));
    });
    this.element.appendChild(this.confirmButton);
    this.element.appendChild(this.createIconButton(i18nString4(UIStrings4.discardChanges), "cross", "keybinds-cancel-button", "cancel", () => {
      this.settingsTab.stopEditing(this.item);
      UI4.ARIAUtils.LiveAnnouncer.alert(i18nString4(UIStrings4.shortcutChangesDiscarded));
    }));
    this.element.addEventListener("keydown", (event) => {
      if (Platform2.KeyboardUtilities.isEscKey(event)) {
        this.settingsTab.stopEditing(this.item);
        event.consume(true);
      }
    });
  }
  addShortcut() {
    const shortcut = new UI4.KeyboardShortcut.KeyboardShortcut(
      [],
      this.item.id(),
      "UnsetShortcut"
      /* UI.KeyboardShortcut.Type.UNSET_SHORTCUT */
    );
    this.shortcuts.push(shortcut);
    this.update();
    const shortcutInput = this.shortcutInputs.get(shortcut);
    if (shortcutInput) {
      shortcutInput.focus();
    }
  }
  createShortcutRow(shortcut, index) {
    if (this.editedShortcuts.has(shortcut) && !this.editedShortcuts.get(shortcut)) {
      return;
    }
    let icon;
    if (shortcut.type !== "UnsetShortcut" && !shortcut.isDefault()) {
      icon = IconButton2.Icon.create("keyboard-pen", "keybinds-modified");
      UI4.ARIAUtils.setLabel(icon, i18nString4(UIStrings4.shortcutModified));
      this.element.appendChild(icon);
    }
    const shortcutElement = this.element.createChild("div", "keybinds-shortcut keybinds-list-text");
    if (this.isEditing) {
      const shortcutInput = shortcutElement.createChild("input", "harmony-input");
      shortcutInput.setAttribute("jslog", `${VisualLogging4.textField().track({ change: true })}`);
      shortcutInput.spellcheck = false;
      shortcutInput.maxLength = 0;
      this.shortcutInputs.set(shortcut, shortcutInput);
      if (!this.elementToFocus) {
        this.elementToFocus = shortcutInput;
      }
      shortcutInput.value = shortcut.title();
      const userDescriptors = this.editedShortcuts.get(shortcut);
      if (userDescriptors) {
        shortcutInput.value = this.shortcutInputTextForDescriptors(userDescriptors);
      }
      shortcutInput.addEventListener("keydown", this.onShortcutInputKeyDown.bind(this, shortcut, shortcutInput));
      shortcutInput.addEventListener("blur", () => {
        if (this.secondKeyTimeout !== null) {
          clearTimeout(this.secondKeyTimeout);
          this.secondKeyTimeout = null;
        }
      });
      shortcutElement.appendChild(this.createIconButton(i18nString4(UIStrings4.removeShortcut), "bin", "keybinds-delete-button", "delete", () => {
        const index2 = this.shortcuts.indexOf(shortcut);
        if (!shortcut.isDefault()) {
          this.shortcuts.splice(index2, 1);
        }
        this.editedShortcuts.set(shortcut, null);
        this.update();
        this.focus();
        this.validateInputs();
        UI4.ARIAUtils.LiveAnnouncer.alert(i18nString4(UIStrings4.shortcutRemoved, { PH1: this.item.title() }));
      }));
    } else {
      const separator = Host3.Platform.isMac() ? "\u2004" : "\u200A+\u200A";
      const keys = shortcut.descriptors.flatMap((descriptor) => descriptor.name.split(separator));
      keys.forEach((key) => {
        shortcutElement.createChild("div", "keybinds-key").createChild("span").textContent = key;
      });
      if (index === 0) {
        this.element.appendChild(this.createEditButton());
      }
    }
  }
  createEditButton() {
    return this.createIconButton(i18nString4(UIStrings4.editShortcut), "edit", "keybinds-edit-button", "edit", () => this.settingsTab.startEditing(this.item));
  }
  createIconButton(label, iconName, className, jslogContext, listener) {
    const button = new Buttons4.Button.Button();
    button.data = { variant: "icon", iconName, jslogContext, title: label };
    button.addEventListener("click", listener);
    UI4.ARIAUtils.setLabel(button, label);
    if (className) {
      button.classList.add(className);
    }
    return button;
  }
  onShortcutInputKeyDown(shortcut, shortcutInput, event) {
    if (event.key !== "Tab") {
      const eventDescriptor = this.descriptorForEvent(event);
      const userDescriptors = this.editedShortcuts.get(shortcut) || [];
      this.editedShortcuts.set(shortcut, userDescriptors);
      const isLastKeyOfShortcut = userDescriptors.length === 2 && UI4.KeyboardShortcut.KeyboardShortcut.isModifier(userDescriptors[1].key);
      const shouldClearOldShortcut = userDescriptors.length === 2 && !isLastKeyOfShortcut;
      if (shouldClearOldShortcut) {
        userDescriptors.splice(0, 2);
      }
      if (this.secondKeyTimeout) {
        clearTimeout(this.secondKeyTimeout);
        this.secondKeyTimeout = null;
        userDescriptors.push(eventDescriptor);
      } else if (isLastKeyOfShortcut) {
        userDescriptors[1] = eventDescriptor;
      } else if (!UI4.KeyboardShortcut.KeyboardShortcut.isModifier(eventDescriptor.key)) {
        userDescriptors[0] = eventDescriptor;
        this.secondKeyTimeout = window.setTimeout(() => {
          this.secondKeyTimeout = null;
        }, UI4.ShortcutRegistry.KeyTimeout);
      } else {
        userDescriptors[0] = eventDescriptor;
      }
      shortcutInput.value = this.shortcutInputTextForDescriptors(userDescriptors);
      this.validateInputs();
      event.consume(true);
    }
  }
  descriptorForEvent(event) {
    const userKey = UI4.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(event);
    const codeAndModifiers = UI4.KeyboardShortcut.KeyboardShortcut.keyCodeAndModifiersFromKey(userKey);
    let key = UI4.KeyboardShortcut.Keys[event.key] || UI4.KeyboardShortcut.KeyBindings[event.key];
    if (!key && !/^[a-z]$/i.test(event.key)) {
      const keyCode = event.code;
      key = UI4.KeyboardShortcut.Keys[keyCode] || UI4.KeyboardShortcut.KeyBindings[keyCode];
      if (keyCode.startsWith("Digit")) {
        key = keyCode.slice(5);
      } else if (keyCode.startsWith("Key")) {
        key = keyCode.slice(3);
      }
    }
    return UI4.KeyboardShortcut.KeyboardShortcut.makeDescriptor(key || event.key, codeAndModifiers.modifiers);
  }
  shortcutInputTextForDescriptors(descriptors) {
    return descriptors.map((descriptor) => descriptor.name).join(" ");
  }
  resetShortcutsToDefaults() {
    this.editedShortcuts.clear();
    for (const shortcut of this.shortcuts) {
      if (shortcut.type === "UnsetShortcut") {
        const index = this.shortcuts.indexOf(shortcut);
        this.shortcuts.splice(index, 1);
      } else if (shortcut.type === "UserShortcut") {
        this.editedShortcuts.set(shortcut, null);
      }
    }
    const disabledDefaults = UI4.ShortcutRegistry.ShortcutRegistry.instance().disabledDefaultsForAction(this.item.id());
    disabledDefaults.forEach((shortcut) => {
      if (this.shortcuts.includes(shortcut)) {
        return;
      }
      this.shortcuts.push(shortcut);
      this.editedShortcuts.set(shortcut, shortcut.descriptors);
    });
    this.update();
    this.focus();
    UI4.ARIAUtils.LiveAnnouncer.alert(i18nString4(UIStrings4.shortcutChangesRestored, { PH1: this.item.title() }));
  }
  onEscapeKeyPressed(event) {
    const activeElement = Platform2.DOMUtilities.deepActiveElement(document);
    for (const [shortcut, shortcutInput] of this.shortcutInputs.entries()) {
      if (activeElement === shortcutInput) {
        this.onShortcutInputKeyDown(shortcut, shortcutInput, event);
      }
    }
  }
  validateInputs() {
    const confirmButton = this.confirmButton;
    const errorMessageElement = this.errorMessageElement;
    if (!confirmButton || !errorMessageElement) {
      return;
    }
    confirmButton.disabled = false;
    errorMessageElement.classList.add("hidden");
    this.shortcutInputs.forEach((shortcutInput, shortcut) => {
      const userDescriptors = this.editedShortcuts.get(shortcut);
      if (!userDescriptors) {
        return;
      }
      if (userDescriptors.some((descriptor) => UI4.KeyboardShortcut.KeyboardShortcut.isModifier(descriptor.key))) {
        confirmButton.disabled = true;
        shortcutInput.classList.add("error-input");
        UI4.ARIAUtils.setInvalid(shortcutInput, true);
        errorMessageElement.classList.remove("hidden");
        errorMessageElement.textContent = i18nString4(UIStrings4.shortcutsCannotContainOnly);
        return;
      }
      const conflicts = UI4.ShortcutRegistry.ShortcutRegistry.instance().actionsForDescriptors(userDescriptors).filter((actionId) => actionId !== this.item.id());
      if (conflicts.length) {
        confirmButton.disabled = true;
        shortcutInput.classList.add("error-input");
        UI4.ARIAUtils.setInvalid(shortcutInput, true);
        errorMessageElement.classList.remove("hidden");
        if (!UI4.ActionRegistry.ActionRegistry.instance().hasAction(conflicts[0])) {
          return;
        }
        const action = UI4.ActionRegistry.ActionRegistry.instance().getAction(conflicts[0]);
        const actionTitle = action.title();
        const actionCategory = action.category();
        errorMessageElement.textContent = i18nString4(UIStrings4.thisShortcutIsInUseByS, { PH1: actionCategory, PH2: actionTitle });
        return;
      }
      shortcutInput.classList.remove("error-input");
      UI4.ARIAUtils.setInvalid(shortcutInput, false);
    });
  }
};
export {
  AISettingsTab_exports as AISettingsTab,
  FrameworkIgnoreListSettingsTab_exports as FrameworkIgnoreListSettingsTab,
  KeybindsSettingsTab_exports as KeybindsSettingsTab,
  SettingsScreen_exports as SettingsScreen
};
//# sourceMappingURL=settings.js.map
