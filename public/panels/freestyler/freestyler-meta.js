// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
/*
  * TODO(nvitkov): b/346933425
  * Temporary string that should not be translated
  * as they may change often during development.
  */
const UIStringsTemp = {
    /**
     * @description The title of the action for showing Ai Assistant panel.
     */
    showAiAssistant: 'Show  AI Assistant',
    /**
     * @description The title of the AI Assistant panel.
     */
    aiAssistant: 'AI Assistant',
    /**
     * @description The setting title to enable the freestyler via
     * the settings tab.
     */
    enableFreestyler: 'Enable Freestyler',
    /**
     *@description Text of a tooltip to redirect to the AI assistant panel with
     *the current element as context
     */
    askAiAssistant: 'Ask AI Assistant',
    /**
     * @description Message shown to the user if the DevTools locale is not
     * supported.
     */
    wrongLocale: 'To use this feature, update your Language preference in DevTools Settings to English.',
    /**
     * @description Message shown to the user if the age check is not successful.
     */
    ageRestricted: 'This feature is only available to users who are 18 years of age or older.',
    /**
     * @description Message shown to the user if the user's region is not
     * supported.
     */
    geoRestricted: 'This feature is unavailable in your region.',
    /**
     * @description Message shown to the user if the enterprise policy does
     * not allow this feature.
     */
    policyRestricted: 'Your organization turned off this feature. Contact your administrators for more information.',
};
// TODO(nvitkov): b/346933425
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/freestyler-meta.ts', UIStrings);
// const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nLazyString = i18n.i18n.lockedLazyString;
const i18nString = i18n.i18n.lockedString;
const setting = 'freestyler-enabled';
function isLocaleRestricted() {
    const devtoolsLocale = i18n.DevToolsLocale.DevToolsLocale.instance();
    return !devtoolsLocale.locale.startsWith('en-');
}
function isAgeRestricted(config) {
    return config?.devToolsFreestylerDogfood?.blockedByAge === true;
}
function isGeoRestricted(config) {
    return config?.devToolsFreestylerDogfood?.blockedByGeo === true;
}
function isPolicyRestricted(config) {
    return config?.devToolsFreestylerDogfood?.blockedByEnterprisePolicy === true;
}
let loadedFreestylerModule;
async function loadFreestylerModule() {
    if (!loadedFreestylerModule) {
        loadedFreestylerModule = await import('./freestyler.js');
    }
    return loadedFreestylerModule;
}
function isFeatureAvailable(config) {
    return config?.devToolsFreestylerDogfood?.enabled === true;
}
UI.ViewManager.registerViewExtension({
    location: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */,
    id: 'freestyler',
    commandPrompt: i18nLazyString(UIStringsTemp.showAiAssistant),
    title: i18nLazyString(UIStringsTemp.aiAssistant),
    order: 10,
    persistence: "closeable" /* UI.ViewManager.ViewPersistence.CLOSEABLE */,
    hasToolbar: false,
    condition: config => isFeatureAvailable(config) && Common.Settings.Settings.instance().moduleSetting(setting).get(),
    async loadView() {
        const Freestyler = await loadFreestylerModule();
        return Freestyler.FreestylerPanel.instance();
    },
});
Common.Settings.registerSettingExtension({
    category: "GLOBAL" /* Common.Settings.SettingCategory.GLOBAL */,
    settingName: setting,
    settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
    title: i18nLazyString(UIStringsTemp.enableFreestyler),
    defaultValue: isFeatureAvailable,
    reloadRequired: true,
    condition: isFeatureAvailable,
    disabledCondition: config => {
        if (isLocaleRestricted()) {
            return { disabled: true, reason: i18nString(UIStringsTemp.wrongLocale) };
        }
        if (isAgeRestricted(config)) {
            return { disabled: true, reason: i18nString(UIStringsTemp.ageRestricted) };
        }
        if (isGeoRestricted(config)) {
            return { disabled: true, reason: i18nString(UIStringsTemp.geoRestricted) };
        }
        if (isPolicyRestricted(config)) {
            return { disabled: true, reason: i18nString(UIStringsTemp.policyRestricted) };
        }
        return { disabled: false };
    },
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'freestyler.element-panel-context',
    contextTypes() {
        return [];
    },
    setting,
    category: "GLOBAL" /* UI.ActionRegistration.ActionCategory.GLOBAL */,
    title: i18nLazyString(UIStringsTemp.askAiAssistant),
    async loadActionDelegate() {
        const Freestyler = await loadFreestylerModule();
        return new Freestyler.ActionDelegate();
    },
    condition: isFeatureAvailable,
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'freestyler.style-tab-context',
    contextTypes() {
        return [];
    },
    setting,
    category: "GLOBAL" /* UI.ActionRegistration.ActionCategory.GLOBAL */,
    title: i18nLazyString(UIStringsTemp.askAiAssistant),
    iconClass: "spark" /* UI.ActionRegistration.IconClass.SPARK */,
    async loadActionDelegate() {
        const Freestyler = await loadFreestylerModule();
        return new Freestyler.ActionDelegate();
    },
    condition: isFeatureAvailable,
});
//# sourceMappingURL=freestyler-meta.js.map