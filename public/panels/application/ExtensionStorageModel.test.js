// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Resources from './application.js';
const { urlString } = Platform.DevToolsPath;
class ExtensionStorageListener {
    #model;
    #storagesWatched;
    constructor(model) {
        this.#model = model;
        this.#storagesWatched = [];
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
            origin: urlString `${origin}`,
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
        sinon.assert.calledOnceWithExactly(getSpy, { id: initId, storageArea: initStorageArea });
        assert.deepEqual(data, ENTRIES);
        await extensionStorage.setItem('foo', 'baz');
        sinon.assert.calledOnceWithExactly(setSpy, { id: initId, storageArea: initStorageArea, values: { foo: 'baz' } });
        await extensionStorage.removeItem('foo');
        sinon.assert.calledOnceWithExactly(removeSpy, { id: initId, storageArea: initStorageArea, keys: ['foo'] });
        await extensionStorage.clear();
        sinon.assert.calledOnceWithExactly(clearSpy, { id: initId, storageArea: initStorageArea });
    });
    it('adds/removes ExtensionStorage on Runtime events', async () => {
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems').resolves({
            data: {},
            getError: () => undefined,
        });
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
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems').resolves({
            data: {},
            getError: () => undefined,
        });
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
        assert.lengthOf(extensionStorageModel.storages(), 4);
        runtime.executionContextCreated(mockExecutionContext);
        assert.lengthOf(extensionStorageModel.storages(), 4);
    });
    it('removes ExtensionStorage when last ExecutionContext is removed', async () => {
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems').resolves({
            data: {},
            getError: () => undefined,
        });
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
        assert.lengthOf(extensionStorageModel.storages(), 4);
        // If a single execution context is destroyed but another remains,
        // ExtensionStorage should not be removed.
        runtime.executionContextDestroyed(mockExecutionContext1.id);
        assert.lengthOf(extensionStorageModel.storages(), 4);
        runtime.executionContextDestroyed(mockExecutionContext2.id);
        assert.lengthOf(extensionStorageModel.storages(), 0);
    });
    it('matches service worker target on same origin', () => {
        assert.isTrue(extensionStorage.matchesTarget(createTarget({ type: SDK.Target.Type.ServiceWorker, url: `chrome-extension://${initId}/sw.js` })));
    });
    it('matches tab target on same origin', () => {
        assert.isTrue(extensionStorage.matchesTarget(createTarget({ type: SDK.Target.Type.TAB, url: `chrome-extension://${initId}/sw.js` })));
    });
    it('does not match service worker target on different origin', () => {
        assert.isFalse(extensionStorage.matchesTarget(createTarget({ type: SDK.Target.Type.ServiceWorker, url: 'chrome-extension://other-id/sw.js' })));
    });
});
//# sourceMappingURL=ExtensionStorageModel.test.js.map