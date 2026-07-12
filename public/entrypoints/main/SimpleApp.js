// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
export class SimpleApp {
    presentUI(document) {
        const rootView = new UI.RootView.RootView();
        UI.InspectorView.InspectorView.instance().show(rootView.element);
        rootView.attachToDocument(document);
        rootView.focus();
    }
}
export class SimpleAppProvider {
    createApp() {
        return new SimpleApp();
    }
}
//# sourceMappingURL=SimpleApp.js.map