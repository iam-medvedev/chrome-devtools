// Copyright 2014 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as UI from '../../ui/legacy/legacy.js';
export class SimpleApp {
    #universe;
    constructor(universe) {
        this.#universe = universe;
    }
    presentUI(document) {
        const rootView = new UI.RootView.RootView(this.#universe);
        UI.InspectorView.InspectorView.instance().show(rootView.element);
        rootView.attachToDocument(document);
        rootView.focus();
    }
}
export class SimpleAppProvider {
    createApp(universe) {
        return new SimpleApp(universe);
    }
}
//# sourceMappingURL=SimpleApp.js.map