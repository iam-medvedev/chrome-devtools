// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as UI from '../../ui/legacy/legacy.js';
const UIStrings = {
    /**
     * @description The title of the action for showing Freestyler panel.
     */
    showFreestyler: 'Show Freestyler',
    /**
     * @description The title of the Freestyler panel.
     */
    freestyler: 'Freestyler',
};
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/freestyler-meta.ts', UIStrings);
const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
let loadedFreestylerModule;
async function loadFreestylerModule() {
    if (!loadedFreestylerModule) {
        loadedFreestylerModule = await import('./freestyler.js');
    }
    return loadedFreestylerModule;
}
function isFeatureAvailable() {
    return Root.Runtime.Runtime.queryParam('freestyler_dogfood') === 'true';
}
UI.ViewManager.registerViewExtension({
    location: "drawer-view" /* UI.ViewManager.ViewLocationValues.DRAWER_VIEW */,
    id: 'freestyler',
    commandPrompt: i18nLazyString(UIStrings.showFreestyler),
    title: i18nLazyString(UIStrings.freestyler),
    order: 10,
    persistence: "closeable" /* UI.ViewManager.ViewPersistence.CLOSEABLE */,
    hasToolbar: false,
    condition: isFeatureAvailable,
    async loadView() {
        const Freestyler = await loadFreestylerModule();
        return Freestyler.FreestylerPanel.instance();
    },
});
//# sourceMappingURL=freestyler-meta.js.map