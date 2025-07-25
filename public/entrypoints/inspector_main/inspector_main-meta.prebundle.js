// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     * @description Title of the Rendering tool. The rendering tool is a collection of settings that
     * lets the user debug the rendering (i.e. how the website is drawn onto the screen) of the
     * website.
     * https://developer.chrome.com/docs/devtools/evaluate-performance/reference#rendering
     */
    rendering: 'Rendering',
    /**
     * @description Command for showing the 'Rendering' tool
     */
    showRendering: 'Show Rendering',
    /**
     * @description Command Menu search query that points to the Rendering tool. This refers to the
     * process of drawing pixels onto the screen (called painting).
     */
    paint: 'paint',
    /**
     * @description Command Menu search query that points to the Rendering tool. Layout is a phase of
     * rendering a website where the browser calculates where different elements in the website will go
     * on the screen.
     */
    layout: 'layout',
    /**
     * @description Command Menu search query that points to the Rendering tool. 'fps' is an acronym
     * for 'Frames per second'. It is in lowercase here because the search box the user will type this
     * into is case-insensitive. If there is an equivalent acronym/shortening in the target language
     * then a translation would be appropriate, otherwise it can be left in English.
     */
    fps: 'fps',
    /**
     * @description Command Menu search query that points to the Rendering tool.
     * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types. This is something the user
     * might type in to search for the setting to change the CSS media type.
     */
    cssMediaType: 'CSS media type',
    /**
     * @description Command Menu search query that points to the Rendering tool.
     * https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features This is something the
     * user might type in to search for the setting to change the value of various CSS media features.
     */
    cssMediaFeature: 'CSS media feature',
    /**
     * @description Command Menu search query that points to the Rendering tool. Possible search term
     * when the user wants to find settings related to visual impairment e.g. blurry vision, blindness.
     */
    visionDeficiency: 'vision deficiency',
    /**
     * @description Command Menu search query that points to the Rendering tool. Possible search term
     * when the user wants to find settings related to color vision deficiency/color blindness.
     */
    colorVisionDeficiency: 'color vision deficiency',
    /**
     * @description Title of an action that reloads the inspected page.
     */
    reloadPage: 'Reload page',
    /**
     * @description Title of an action that 'hard' reloads the inspected page. A hard reload also
     * clears the browser's cache, forcing it to reload the most recent version of the page.
     */
    hardReloadPage: 'Hard reload page',
    /**
     * @description Title of a setting under the Network category in Settings. All ads on the site will
     * be blocked (the setting is forced on).
     */
    forceAdBlocking: 'Force ad blocking on this site',
    /**
     * @description A command available in the command menu to block all ads on the current site.
     */
    blockAds: 'Block ads on this site',
    /**
     * @description A command available in the command menu to disable ad blocking on the current site.
     */
    showAds: 'Show ads on this site, if allowed',
    /**
     * @description A command available in the command menu to automatically open DevTools when
     * webpages create new popup windows.
     */
    autoOpenDevTools: 'Auto-open DevTools for popups',
    /**
     * @description A command available in the command menu to stop automatically opening DevTools when
     * webpages create new popup windows.
     */
    doNotAutoOpen: 'Do not auto-open DevTools for popups',
    /**
     * @description Title of a setting under the Appearance category in Settings. When the webpage is
     * paused by devtools, an overlay is shown on top of the page to indicate that it is paused. The
     * overlay is a pause/unpause button and some text, which appears on top of the paused page. This
     * setting turns off this overlay.
     */
    disablePaused: 'Disable paused state overlay',
    /**
     * @description Title of an action that toggle
     * "forces CSS prefers-color-scheme" color
     */
    toggleCssPrefersColorSchemeMedia: 'Toggle CSS media feature prefers-color-scheme',
};
const str_ = i18n.i18n.registerUIStrings('entrypoints/inspector_main/inspector_main-meta.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
let loadedInspectorMainModule;
async function loadInspectorMainModule() {
    if (!loadedInspectorMainModule) {
        loadedInspectorMainModule = await import('./inspector_main.js');
    }
    return loadedInspectorMainModule;
}
UI.ViewManager.registerViewExtension({
    location: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */,
    id: 'rendering',
    title: i18nLazyString(UIStrings.rendering),
    commandPrompt: i18nLazyString(UIStrings.showRendering),
    persistence: "closeable" /* UI.ViewManager.ViewPersistence.CLOSEABLE */,
    order: 50,
    async loadView() {
        const InspectorMain = await loadInspectorMainModule();
        return new InspectorMain.RenderingOptions.RenderingOptionsView();
    },
    tags: [
        i18nLazyString(UIStrings.paint),
        i18nLazyString(UIStrings.layout),
        i18nLazyString(UIStrings.fps),
        i18nLazyString(UIStrings.cssMediaType),
        i18nLazyString(UIStrings.cssMediaFeature),
        i18nLazyString(UIStrings.visionDeficiency),
        i18nLazyString(UIStrings.colorVisionDeficiency),
    ],
});
UI.ActionRegistration.registerActionExtension({
    category: "NAVIGATION" /* UI.ActionRegistration.ActionCategory.NAVIGATION */,
    actionId: 'inspector-main.reload',
    async loadActionDelegate() {
        const InspectorMain = await loadInspectorMainModule();
        return new InspectorMain.InspectorMain.ReloadActionDelegate();
    },
    iconClass: "refresh" /* UI.ActionRegistration.IconClass.REFRESH */,
    title: i18nLazyString(UIStrings.reloadPage),
    bindings: [
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'Ctrl+R',
        },
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'F5',
        },
        {
            platform: "mac" /* UI.ActionRegistration.Platforms.MAC */,
            shortcut: 'Meta+R',
        },
    ],
});
UI.ActionRegistration.registerActionExtension({
    category: "NAVIGATION" /* UI.ActionRegistration.ActionCategory.NAVIGATION */,
    actionId: 'inspector-main.hard-reload',
    async loadActionDelegate() {
        const InspectorMain = await loadInspectorMainModule();
        return new InspectorMain.InspectorMain.ReloadActionDelegate();
    },
    title: i18nLazyString(UIStrings.hardReloadPage),
    bindings: [
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'Shift+Ctrl+R',
        },
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'Shift+F5',
        },
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'Ctrl+F5',
        },
        {
            platform: "windows,linux" /* UI.ActionRegistration.Platforms.WINDOWS_LINUX */,
            shortcut: 'Ctrl+Shift+F5',
        },
        {
            platform: "mac" /* UI.ActionRegistration.Platforms.MAC */,
            shortcut: 'Shift+Meta+R',
        },
    ],
});
UI.ActionRegistration.registerActionExtension({
    actionId: 'rendering.toggle-prefers-color-scheme',
    category: "RENDERING" /* UI.ActionRegistration.ActionCategory.RENDERING */,
    title: i18nLazyString(UIStrings.toggleCssPrefersColorSchemeMedia),
    async loadActionDelegate() {
        const InspectorMain = await loadInspectorMainModule();
        return new InspectorMain.RenderingOptions.ReloadActionDelegate();
    },
});
Common.Settings.registerSettingExtension({
    category: "NETWORK" /* Common.Settings.SettingCategory.NETWORK */,
    title: i18nLazyString(UIStrings.forceAdBlocking),
    settingName: 'network.ad-blocking-enabled',
    settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
    storageType: "Session" /* Common.Settings.SettingStorageType.SESSION */,
    defaultValue: false,
    options: [
        {
            value: true,
            title: i18nLazyString(UIStrings.blockAds),
        },
        {
            value: false,
            title: i18nLazyString(UIStrings.showAds),
        },
    ],
});
Common.Settings.registerSettingExtension({
    category: "GLOBAL" /* Common.Settings.SettingCategory.GLOBAL */,
    storageType: "Synced" /* Common.Settings.SettingStorageType.SYNCED */,
    title: i18nLazyString(UIStrings.autoOpenDevTools),
    settingName: 'auto-attach-to-created-pages',
    settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
    order: 2,
    defaultValue: false,
    options: [
        {
            value: true,
            title: i18nLazyString(UIStrings.autoOpenDevTools),
        },
        {
            value: false,
            title: i18nLazyString(UIStrings.doNotAutoOpen),
        },
    ],
});
Common.Settings.registerSettingExtension({
    category: "APPEARANCE" /* Common.Settings.SettingCategory.APPEARANCE */,
    storageType: "Synced" /* Common.Settings.SettingStorageType.SYNCED */,
    title: i18nLazyString(UIStrings.disablePaused),
    settingName: 'disable-paused-state-overlay',
    settingType: "boolean" /* Common.Settings.SettingType.BOOLEAN */,
    defaultValue: false,
});
UI.Toolbar.registerToolbarItem({
    async loadItem() {
        const InspectorMain = await loadInspectorMainModule();
        return InspectorMain.InspectorMain.NodeIndicator.instance();
    },
    order: 2,
    location: "main-toolbar-left" /* UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT */,
});
UI.Toolbar.registerToolbarItem({
    async loadItem() {
        const InspectorMain = await loadInspectorMainModule();
        return InspectorMain.OutermostTargetSelector.OutermostTargetSelector.instance();
    },
    order: 98,
    location: "main-toolbar-right" /* UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_RIGHT */,
});
//# sourceMappingURL=inspector_main-meta.prebundle.js.map