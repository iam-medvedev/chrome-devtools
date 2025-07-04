// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     *@description Text for throttling the network
     */
    throttling: 'Throttling',
    /**
     *@description Command for showing the Mobile Throttling tool.
     */
    showThrottling: 'Show Throttling',
    /**
     *@description Title of an action in the network conditions tool to network offline
     */
    goOffline: 'Go offline',
    /**
     *@description A tag of Mobile related settings that can be searched in the command menu
     */
    device: 'device',
    /**
     *@description A tag of Network related actions that can be searched in the command menu
     */
    throttlingTag: 'throttling',
    /**
     * @description Title of an action in the network conditions tool to simulate an environment with a
     * slow 3G connection, i.e. for a low end mobile device.
     */
    enableSlowGThrottling: 'Enable slow `3G` throttling',
    /**
     * @description Title of an action in the network conditions tool to simulate an environment with a
     * medium-speed 3G connection, i.e. for a mid-tier mobile device.
     */
    enableFastGThrottling: 'Enable fast `3G` throttling',
    /**
     *@description Title of an action in the network conditions tool to network online
     */
    goOnline: 'Go online',
};
const str_ = i18n.i18n.registerUIStrings('panels/mobile_throttling/mobile_throttling-meta.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
let loadedMobileThrottlingModule;
async function loadMobileThrottlingModule() {
    if (!loadedMobileThrottlingModule) {
        loadedMobileThrottlingModule = await import('./mobile_throttling.js');
    }
    return loadedMobileThrottlingModule;
}
UI.ViewManager.registerViewExtension({
    location: "settings-view" /* UI.ViewManager.ViewLocationValues.SETTINGS_VIEW */,
    id: 'throttling-conditions',
    title: i18nLazyString(UIStrings.throttling),
    commandPrompt: i18nLazyString(UIStrings.showThrottling),
    order: 35,
    async loadView() {
        const MobileThrottling = await loadMobileThrottlingModule();
        return new MobileThrottling.ThrottlingSettingsTab.ThrottlingSettingsTab();
    },
    settings: [
        'custom-network-conditions',
        'calibrated-cpu-throttling',
    ],
    iconName: 'performance',
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'network-conditions.network-offline',
    category: "NETWORK" /* UI.ActionRegistration.ActionCategory.NETWORK */,
    title: i18nLazyString(UIStrings.goOffline),
    async loadActionDelegate() {
        const MobileThrottling = await loadMobileThrottlingModule();
        return new MobileThrottling.ThrottlingManager.ActionDelegate();
    },
    tags: [
        i18nLazyString(UIStrings.device),
        i18nLazyString(UIStrings.throttlingTag),
    ],
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'network-conditions.network-low-end-mobile',
    category: "NETWORK" /* UI.ActionRegistration.ActionCategory.NETWORK */,
    title: i18nLazyString(UIStrings.enableSlowGThrottling),
    async loadActionDelegate() {
        const MobileThrottling = await loadMobileThrottlingModule();
        return new MobileThrottling.ThrottlingManager.ActionDelegate();
    },
    tags: [
        i18nLazyString(UIStrings.device),
        i18nLazyString(UIStrings.throttlingTag),
    ],
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'network-conditions.network-mid-tier-mobile',
    category: "NETWORK" /* UI.ActionRegistration.ActionCategory.NETWORK */,
    title: i18nLazyString(UIStrings.enableFastGThrottling),
    async loadActionDelegate() {
        const MobileThrottling = await loadMobileThrottlingModule();
        return new MobileThrottling.ThrottlingManager.ActionDelegate();
    },
    tags: [
        i18nLazyString(UIStrings.device),
        i18nLazyString(UIStrings.throttlingTag),
    ],
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'network-conditions.network-online',
    category: "NETWORK" /* UI.ActionRegistration.ActionCategory.NETWORK */,
    title: i18nLazyString(UIStrings.goOnline),
    async loadActionDelegate() {
        const MobileThrottling = await loadMobileThrottlingModule();
        return new MobileThrottling.ThrottlingManager.ActionDelegate();
    },
    tags: [
        i18nLazyString(UIStrings.device),
        i18nLazyString(UIStrings.throttlingTag),
    ],
});
Common.Settings.registerSettingExtension({
    storageType: "Synced" /* Common.Settings.SettingStorageType.SYNCED */,
    settingName: 'custom-network-conditions',
    settingType: "array" /* Common.Settings.SettingType.ARRAY */,
    defaultValue: [],
});
//# sourceMappingURL=mobile_throttling-meta.prebundle.js.map