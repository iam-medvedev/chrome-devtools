// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
let loadedScreencastModule;
async function loadScreencastModule() {
    if (!loadedScreencastModule) {
        loadedScreencastModule = await import('./screencast.js');
    }
    return loadedScreencastModule;
}
UI.Toolbar.registerToolbarItem({
    async loadItem() {
        const Screencast = await loadScreencastModule();
        return Screencast.ScreencastApp.ToolbarButtonProvider.instance();
    },
    order: 1,
    location: "main-toolbar-left" /* UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT */,
});
Common.AppProvider.registerAppProvider({
    async loadAppProvider() {
        const Screencast = await loadScreencastModule();
        return Screencast.ScreencastApp.ScreencastAppProvider.instance();
    },
    order: 1,
});
UI.ContextMenu.registerItem({
    location: "mainMenu" /* UI.ContextMenu.ItemLocation.MAIN_MENU */,
    order: 10,
    actionId: 'components.request-app-banner',
});
//# sourceMappingURL=screencast-meta.prebundle.js.map