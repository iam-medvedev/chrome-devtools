// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
export class ExtensionStorage extends Common.ObjectWrapper.ObjectWrapper {
    #model;
    #extensionIdInternal;
    #nameInternal;
    #storageAreaInternal;
    constructor(model, extensionId, name, storageArea) {
        super();
        this.#model = model;
        this.#extensionIdInternal = extensionId;
        this.#nameInternal = name;
        this.#storageAreaInternal = storageArea;
    }
    get extensionId() {
        return this.#extensionIdInternal;
    }
    get name() {
        return this.#nameInternal;
    }
    get storageArea() {
        return this.#storageAreaInternal;
    }
    async getItems() {
        const response = await this.#model.agent.invoke_getStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal });
        if (response.getError()) {
            throw new Error(response.getError());
        }
        return response.data;
    }
    async setItem(key, value) {
        const response = await this.#model.agent.invoke_setStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal, values: { [key]: value } });
        if (response.getError()) {
            throw new Error(response.getError());
        }
    }
    async removeItem(key) {
        const response = await this.#model.agent.invoke_removeStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal, keys: [key] });
        if (response.getError()) {
            throw new Error(response.getError());
        }
    }
    async clear() {
        const response = await this.#model.agent.invoke_clearStorageItems({ id: this.#extensionIdInternal, storageArea: this.#storageAreaInternal });
        if (response.getError()) {
            throw new Error(response.getError());
        }
    }
}
export class ExtensionStorageModel extends SDK.SDKModel.SDKModel {
    #runtimeModelInternal;
    #storagesInternal;
    agent;
    #enabled;
    constructor(target) {
        super(target);
        this.#runtimeModelInternal = target.model(SDK.RuntimeModel.RuntimeModel);
        this.#storagesInternal = new Map();
        this.agent = target.extensionsAgent();
    }
    enable() {
        if (this.#enabled) {
            return;
        }
        if (this.#runtimeModelInternal) {
            this.#runtimeModelInternal.addEventListener(SDK.RuntimeModel.Events.ExecutionContextCreated, this.#onExecutionContextCreated, this);
            this.#runtimeModelInternal.addEventListener(SDK.RuntimeModel.Events.ExecutionContextDestroyed, this.#onExecutionContextDestroyed, this);
            this.#runtimeModelInternal.executionContexts().forEach(this.#executionContextCreated, this);
        }
        this.#enabled = true;
    }
    #addExtension(id, name) {
        for (const storageArea of ["session" /* Protocol.Extensions.StorageArea.Session */, "local" /* Protocol.Extensions.StorageArea.Local */,
            "sync" /* Protocol.Extensions.StorageArea.Sync */, "managed" /* Protocol.Extensions.StorageArea.Managed */]) {
            const storages = this.#storagesInternal.get(id);
            const storage = new ExtensionStorage(this, id, name, storageArea);
            if (!storages) {
                this.#storagesInternal.set(id, new Map([[storageArea, storage]]));
            }
            else {
                console.assert(!storages.get(storageArea));
                storages.set(storageArea, storage);
            }
            this.dispatchEventToListeners("ExtensionStorageAdded" /* Events.EXTENSION_STORAGE_ADDED */, storage);
        }
    }
    #removeExtension(id) {
        const storages = this.#storagesInternal.get(id);
        if (!storages) {
            return;
        }
        for (const [key, storage] of storages) {
            this.dispatchEventToListeners("ExtensionStorageRemoved" /* Events.EXTENSION_STORAGE_REMOVED */, storage);
            storages.delete(key);
        }
        this.#storagesInternal.delete(id);
    }
    #executionContextCreated(context) {
        const extensionId = this.#extensionIdForContext(context);
        if (extensionId) {
            this.#addExtension(extensionId, context.name);
        }
    }
    #onExecutionContextCreated(event) {
        this.#executionContextCreated(event.data);
    }
    #extensionIdForContext(context) {
        const url = Common.ParsedURL.ParsedURL.fromString(context.origin);
        return url && url.scheme === 'chrome-extension' ? url.host : undefined;
    }
    #executionContextDestroyed(context) {
        const extensionId = this.#extensionIdForContext(context);
        if (extensionId) {
            // Ignore event if there is still another context for this extension.
            if (this.#runtimeModelInternal?.executionContexts().some(c => this.#extensionIdForContext(c) === extensionId)) {
                return;
            }
            this.#removeExtension(extensionId);
        }
    }
    #onExecutionContextDestroyed(event) {
        this.#executionContextDestroyed(event.data);
    }
    storageForIdAndArea(id, storageArea) {
        return this.#storagesInternal.get(id)?.get(storageArea);
    }
    storages() {
        const result = [];
        for (const storages of this.#storagesInternal.values()) {
            result.push(...storages.values());
        }
        return result;
    }
}
SDK.SDKModel.SDKModel.register(ExtensionStorageModel, { capabilities: 4 /* SDK.Target.Capability.JS */, autostart: false });
//# sourceMappingURL=ExtensionStorageModel.js.map