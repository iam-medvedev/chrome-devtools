// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../../../core/sdk/sdk.js';
import * as UI from '../../../../ui/legacy/legacy.js';
let loadedObjectUIModule;
async function loadObjectUIModule() {
    if (!loadedObjectUIModule) {
        loadedObjectUIModule = await import('./object_ui.js');
    }
    return loadedObjectUIModule;
}
UI.UIUtils.registerRenderer({
    contextTypes() {
        return [SDK.RemoteObject.RemoteObject];
    },
    async loadRenderer() {
        const ObjectUI = await loadObjectUIModule();
        return ObjectUI.ObjectPropertiesSection.Renderer.instance();
    },
});
//# sourceMappingURL=object_ui-meta.prebundle.js.map