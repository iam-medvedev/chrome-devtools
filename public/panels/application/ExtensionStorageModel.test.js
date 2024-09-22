// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Resources from './application.js';
class ExtensionStorageListener {
    #model;
    #storagesWatched;
    constructor(model) {
        this.#model = model;
        this.#storagesWatched = new Array();
        this.#model.addEventListener("ExtensionStorageAdded" /* Resources.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */, this.#extensionStorageAdded, this);
        this.#model.addEventListener("ExtensionStorageRemoved" /* Resources.ExtensionStorageModel.Events.EXTENSION_STORAGE_REMOVED */, this.#extensionStorageRemoved, this);
    }
    dispose() {
        this.#model.removeEventListener("ExtensionStorageAdded" /* Resources.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */, this.#extensionStorageAdded, this);
        this.#model.removeEventListener("ExtensionStorageRemoved" /* Resources.ExtensionStorageModel.Events.EXTENSION_STORAGE_REMOVED */, this.#extensionStorageRemoved, this);
    }
    #extensionStorageAdded(event) {
        const storage = event.data;
        this.#storagesWatched.push(storage);
    }
    #extensionStorageRemoved(event) {
        const storage = event.data;
        const index = this.#storagesWatched.indexOf(storage);
        if (index === -1) {
            return;
        }
        this.#storagesWatched = this.#storagesWatched.splice(index, 1);
    }
    async waitForStoragesAdded(expectedCount) {
        while (this.#storagesWatched.length < expectedCount) {
            await this.#model.once("ExtensionStorageAdded" /* Resources.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */);
        }
    }
}
describeWithMockConnection('ExtensionStorageModel', () => {
    let extensionStorageModel;
    let extensionStorage;
    let target;
    let listener;
    const initId = 'extensionid';
    const initName = 'Test Extension';
    const initStorageArea = "local" /* Protocol.Extensions.StorageArea.Local */;
    beforeEach(() => {
        target = createTarget();
        extensionStorageModel = new Resources.ExtensionStorageModel.ExtensionStorageModel(target);
        extensionStorage =
            new Resources.ExtensionStorageModel.ExtensionStorage(extensionStorageModel, initId, initName, initStorageArea);
        listener = new ExtensionStorageListener(extensionStorageModel);
    });
    const createMockExecutionContext = (id, origin) => {
        return {
            id: id,
            uniqueId: '',
            origin: origin,
            name: 'Test Extension',
        };
    };
    it('ExtensionStorage is instantiated correctly', () => {
        assert.strictEqual(extensionStorage.extensionId, initId);
        assert.strictEqual(extensionStorage.name, initName);
        assert.strictEqual(extensionStorage.storageArea, initStorageArea);
    });
    const STORAGE_AREAS = [
        "session" /* Protocol.Extensions.StorageArea.Session */,
        "local" /* Protocol.Extensions.StorageArea.Local */,
        "sync" /* Protocol.Extensions.StorageArea.Sync */,
        "managed" /* Protocol.Extensions.StorageArea.Managed */,
    ];
    const ENTRIES = {
        foo: 'bar',
    };
    it('invokes storageAgent', async () => {
        const getSpy = sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems').resolves({
            data: ENTRIES,
            getError: () => undefined,
        });
        const setSpy = sinon.stub(extensionStorageModel.agent, 'invoke_setStorageItems').resolves({
            getError: () => undefined,
        });
        const removeSpy = sinon.stub(extensionStorageModel.agent, 'invoke_removeStorageItems').resolves({
            getError: () => undefined,
        });
        const clearSpy = sinon.stub(extensionStorageModel.agent, 'invoke_clearStorageItems').resolves({
            getError: () => undefined,
        });
        const data = await extensionStorage.getItems();
        assert.isTrue(getSpy.calledOnceWithExactly({ id: initId, storageArea: initStorageArea }));
        assert.deepEqual(data, ENTRIES);
        await extensionStorage.setItem('foo', 'baz');
        assert.isTrue(setSpy.calledOnceWithExactly({ id: initId, storageArea: initStorageArea, values: { foo: 'baz' } }));
        await extensionStorage.removeItem('foo');
        assert.isTrue(removeSpy.calledOnceWithExactly({ id: initId, storageArea: initStorageArea, keys: ['foo'] }));
        await extensionStorage.clear();
        assert.isTrue(clearSpy.calledOnceWithExactly({ id: initId, storageArea: initStorageArea }));
    });
    it('adds/removes ExtensionStorage on Runtime events', async () => {
        extensionStorageModel.enable();
        assert.isEmpty(extensionStorageModel.storages());
        const runtime = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtime);
        // Each extension adds four associated storage areas.
        const addedPromise = listener.waitForStoragesAdded(4);
        const mockExecutionContext = createMockExecutionContext(1, `chrome-extension://${initId}/sw.js`);
        runtime.executionContextCreated(mockExecutionContext);
        await addedPromise;
        STORAGE_AREAS.forEach(area => assert.exists(extensionStorageModel.storageForIdAndArea(initId, area)));
        runtime.executionContextDestroyed(mockExecutionContext.id);
        assert.isEmpty(extensionStorageModel.storages());
    });
    it('does not add ExtensionStorage if origin invalid', async () => {
        extensionStorageModel.enable();
        assert.isEmpty(extensionStorageModel.storages());
        const runtime = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtime);
        // The scheme is not valid (not chrome-extension://) so no storage should be added.
        const mockExecutionContext = createMockExecutionContext(1, 'https://example.com');
        runtime.executionContextCreated(mockExecutionContext);
        assert.isEmpty(extensionStorageModel.storages());
    });
    it('does not add ExtensionStorage if origin already added', async () => {
        extensionStorageModel.enable();
        assert.isEmpty(extensionStorageModel.storages());
        // Each extension adds four associated storage areas.
        const addedPromise = listener.waitForStoragesAdded(4);
        const runtime = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtime);
        const mockExecutionContext = createMockExecutionContext(1, `chrome-extension://${initId}/sw.js`);
        runtime.executionContextCreated(mockExecutionContext);
        await addedPromise;
        STORAGE_AREAS.forEach(area => assert.exists(extensionStorageModel.storageForIdAndArea(initId, area)));
        assert.strictEqual(4, extensionStorageModel.storages().length);
        runtime.executionContextCreated(mockExecutionContext);
        assert.strictEqual(4, extensionStorageModel.storages().length);
    });
    it('removes ExtensionStorage when last ExecutionContext is removed', async () => {
        extensionStorageModel.enable();
        assert.isEmpty(extensionStorageModel.storages());
        // Each extension adds four associated storage areas.
        const addedPromise = listener.waitForStoragesAdded(4);
        const runtime = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtime);
        const mockExecutionContext1 = createMockExecutionContext(1, `chrome-extension://${initId}/sw.js`);
        const mockExecutionContext2 = createMockExecutionContext(2, `chrome-extension://${initId}/another.js`);
        runtime.executionContextCreated(mockExecutionContext1);
        runtime.executionContextCreated(mockExecutionContext2);
        await addedPromise;
        STORAGE_AREAS.forEach(area => assert.exists(extensionStorageModel.storageForIdAndArea(initId, area)));
        assert.strictEqual(4, extensionStorageModel.storages().length);
        // If a single execution context is destroyed but another remains,
        // ExtensionStorage should not be removed.
        runtime.executionContextDestroyed(mockExecutionContext1.id);
        assert.strictEqual(4, extensionStorageModel.storages().length);
        runtime.executionContextDestroyed(mockExecutionContext2.id);
        assert.strictEqual(0, extensionStorageModel.storages().length);
    });
});
//# sourceMappingURL=ExtensionStorageModel.test.js.map