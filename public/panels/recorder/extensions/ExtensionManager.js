// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Extensions from '../../../models/extensions/extensions.js';
import * as PanelCommon from '../../common/common.js';
let instance = null;
export class ExtensionManager extends Common.ObjectWrapper.ObjectWrapper {
    static instance() {
        if (!instance) {
            instance = new ExtensionManager();
        }
        return instance;
    }
    #views = new Map();
    constructor() {
        super();
        this.attach();
    }
    attach() {
        const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
        pluginManager.addEventListener("pluginAdded" /* Extensions.RecorderPluginManager.Events.PLUGIN_ADDED */, this.#handlePlugin);
        pluginManager.addEventListener("pluginRemoved" /* Extensions.RecorderPluginManager.Events.PLUGIN_REMOVED */, this.#handlePlugin);
        pluginManager.addEventListener("viewRegistered" /* Extensions.RecorderPluginManager.Events.VIEW_REGISTERED */, this.#handleView);
        for (const descriptor of pluginManager.views()) {
            this.#handleView({ data: descriptor });
        }
    }
    detach() {
        const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
        pluginManager.removeEventListener("pluginAdded" /* Extensions.RecorderPluginManager.Events.PLUGIN_ADDED */, this.#handlePlugin);
        pluginManager.removeEventListener("pluginRemoved" /* Extensions.RecorderPluginManager.Events.PLUGIN_REMOVED */, this.#handlePlugin);
        pluginManager.removeEventListener("viewRegistered" /* Extensions.RecorderPluginManager.Events.VIEW_REGISTERED */, this.#handleView);
        this.#views.clear();
    }
    extensions() {
        return Extensions.RecorderPluginManager.RecorderPluginManager.instance().plugins();
    }
    getView(descriptorId) {
        const view = this.#views.get(descriptorId);
        if (!view) {
            throw new Error('View not found');
        }
        return view;
    }
    #handlePlugin = () => {
        this.dispatchEventToListeners("extensionsUpdated" /* Events.EXTENSIONS_UPDATED */, this.extensions());
    };
    #handleView = (event) => {
        const descriptor = event.data;
        if (!this.#views.has(descriptor.id)) {
            this.#views.set(descriptor.id, new PanelCommon.ExtensionIframe.ExtensionIframe(descriptor));
        }
    };
}
//# sourceMappingURL=ExtensionManager.js.map