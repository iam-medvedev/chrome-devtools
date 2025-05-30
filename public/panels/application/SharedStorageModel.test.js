// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { getInitializedResourceTreeModel, getMainFrame, MAIN_FRAME_ID, navigate, } from '../../testing/ResourceTreeHelpers.js';
import * as Resources from './application.js';
class SharedStorageListener {
    #model;
    #storagesWatched;
    #accessEvents;
    #changeEvents;
    constructor(model) {
        this.#model = model;
        this.#storagesWatched = [];
        this.#accessEvents = [];
        this.#changeEvents = new Map();
        this.#model.addEventListener("SharedStorageAdded" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_ADDED */, this.#sharedStorageAdded, this);
        this.#model.addEventListener("SharedStorageRemoved" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_REMOVED */, this.#sharedStorageRemoved, this);
        this.#model.addEventListener("SharedStorageAccess" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_ACCESS */, this.#sharedStorageAccess, this);
    }
    dispose() {
        this.#model.removeEventListener("SharedStorageAdded" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_ADDED */, this.#sharedStorageAdded, this);
        this.#model.removeEventListener("SharedStorageRemoved" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_REMOVED */, this.#sharedStorageRemoved, this);
        this.#model.removeEventListener("SharedStorageAccess" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_ACCESS */, this.#sharedStorageAccess, this);
        for (const storage of this.#storagesWatched) {
            storage.removeEventListener("SharedStorageChanged" /* Resources.SharedStorageModel.SharedStorageForOrigin.Events.SHARED_STORAGE_CHANGED */, this.#sharedStorageChanged.bind(this, storage), this);
        }
    }
    get accessEvents() {
        return this.#accessEvents;
    }
    changeEventsForStorage(storage) {
        return this.#changeEvents.get(storage) || null;
    }
    changeEventsEmpty() {
        return this.#changeEvents.size === 0;
    }
    #sharedStorageAdded(event) {
        const storage = (event.data);
        this.#storagesWatched.push(storage);
        storage.addEventListener("SharedStorageChanged" /* Resources.SharedStorageModel.SharedStorageForOrigin.Events.SHARED_STORAGE_CHANGED */, this.#sharedStorageChanged.bind(this, storage), this);
    }
    #sharedStorageRemoved(event) {
        const storage = (event.data);
        storage.removeEventListener("SharedStorageChanged" /* Resources.SharedStorageModel.SharedStorageForOrigin.Events.SHARED_STORAGE_CHANGED */, this.#sharedStorageChanged.bind(this, storage), this);
        const index = this.#storagesWatched.indexOf(storage);
        if (index === -1) {
            return;
        }
        this.#storagesWatched = this.#storagesWatched.splice(index, 1);
    }
    #sharedStorageAccess(event) {
        this.#accessEvents.push(event.data);
    }
    #sharedStorageChanged(storage, event) {
        if (!this.#changeEvents.has(storage)) {
            this.#changeEvents.set(storage, []);
        }
        this.#changeEvents.get(storage)?.push(event.data);
    }
    async waitForStoragesAdded(expectedCount) {
        while (this.#storagesWatched.length < expectedCount) {
            await this.#model.once("SharedStorageAdded" /* Resources.SharedStorageModel.Events.SHARED_STORAGE_ADDED */);
        }
    }
}
describeWithMockConnection('SharedStorageModel', () => {
    let sharedStorageModel;
    let target;
    let listener;
    const TEST_ORIGIN_A = 'http://a.test';
    const TEST_SITE_A = TEST_ORIGIN_A;
    const TEST_ORIGIN_B = 'http://b.test';
    const TEST_SITE_B = TEST_ORIGIN_B;
    const TEST_ORIGIN_C = 'http://c.test';
    const TEST_SITE_C = TEST_ORIGIN_C;
    const METADATA = {
        creationTime: 100,
        length: 3,
        remainingBudget: 2.5,
        bytesUsed: 30,
    };
    const ENTRIES = [
        {
            key: 'key1',
            value: 'a',
        },
        {
            key: 'key2',
            value: 'b',
        },
        {
            key: 'key3',
            value: 'c',
        },
    ];
    const EVENTS = [
        {
            accessTime: 0,
            method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0', value: 'value0' },
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 10,
            method: "get" /* Protocol.Storage.SharedStorageAccessMethod.Get */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0' },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 15,
            method: "length" /* Protocol.Storage.SharedStorageAccessMethod.Length */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 20,
            method: "clear" /* Protocol.Storage.SharedStorageAccessMethod.Clear */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_B,
            ownerSite: TEST_SITE_B,
            params: {},
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 100,
            method: "set" /* Protocol.Storage.SharedStorageAccessMethod.Set */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: { key: 'key0', value: 'value1', ignoreIfPresent: true },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 150,
            method: "remainingBudget" /* Protocol.Storage.SharedStorageAccessMethod.RemainingBudget */,
            mainFrameId: MAIN_FRAME_ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
    ];
    beforeEach(async () => {
        target = createTarget();
        await getInitializedResourceTreeModel(target);
        sharedStorageModel = target.model(Resources.SharedStorageModel.SharedStorageModel);
        listener = new SharedStorageListener(sharedStorageModel);
    });
    it('invokes storageAgent via SharedStorageForOrigin', async () => {
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata').resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries').resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const clearSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_clearSharedStorageEntries').resolves({
            getError: () => undefined,
        });
        const sharedStorage = new Resources.SharedStorageModel.SharedStorageForOrigin(sharedStorageModel, TEST_ORIGIN_A);
        assert.strictEqual(sharedStorage.securityOrigin, TEST_ORIGIN_A);
        const metadata = await sharedStorage.getMetadata();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN_A });
        assert.deepEqual(METADATA, metadata);
        const entries = await sharedStorage.getEntries();
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN_A });
        assert.deepEqual(ENTRIES, entries);
        await sharedStorage.setEntry('new-key1', 'new-value1', true);
        sinon.assert.calledOnceWithExactly(setEntrySpy, { ownerOrigin: TEST_ORIGIN_A, key: 'new-key1', value: 'new-value1', ignoreIfPresent: true });
        await sharedStorage.deleteEntry('new-key1');
        sinon.assert.calledOnceWithExactly(deleteEntrySpy, { ownerOrigin: TEST_ORIGIN_A, key: 'new-key1' });
        await sharedStorage.clear();
        sinon.assert.calledOnceWithExactly(clearSpy, { ownerOrigin: TEST_ORIGIN_A });
    });
    it('adds/removes SharedStorageForOrigin on SecurityOrigin events', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        assert.isEmpty(sharedStorageModel.storages());
        const manager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(manager);
        const addedPromise = listener.waitForStoragesAdded(1);
        manager.dispatchEventToListeners(SDK.SecurityOriginManager.Events.SecurityOriginAdded, TEST_ORIGIN_A);
        await addedPromise;
        assert.exists(sharedStorageModel.storageForOrigin(TEST_ORIGIN_A));
        manager.dispatchEventToListeners(SDK.SecurityOriginManager.Events.SecurityOriginRemoved, TEST_ORIGIN_A);
        assert.isEmpty(sharedStorageModel.storages());
    });
    it('does not add SharedStorageForOrigin if origin invalid', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        assert.isEmpty(sharedStorageModel.storages());
        const manager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(manager);
        manager.dispatchEventToListeners(SDK.SecurityOriginManager.Events.SecurityOriginAdded, 'invalid');
        assert.isEmpty(sharedStorageModel.storages());
    });
    it('does not add SharedStorageForOrigin if origin already added', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        assert.isEmpty(sharedStorageModel.storages());
        const addedPromise = listener.waitForStoragesAdded(1);
        navigate(getMainFrame(target), { url: TEST_ORIGIN_A });
        await addedPromise;
        assert.exists(sharedStorageModel.storageForOrigin(TEST_ORIGIN_A));
        assert.strictEqual(1, sharedStorageModel.numStoragesForTesting());
        navigate(getMainFrame(target), { url: TEST_ORIGIN_A });
        assert.strictEqual(1, sharedStorageModel.numStoragesForTesting());
    });
    it('adds/removes SecurityOrigins when model is enabled/disabled', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        const manager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(manager);
        const originSet = new Set([TEST_ORIGIN_A, TEST_ORIGIN_B, TEST_ORIGIN_C]);
        manager.updateSecurityOrigins(originSet);
        assert.lengthOf(manager.securityOrigins(), 3);
        const addedPromise = listener.waitForStoragesAdded(3);
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        await addedPromise;
        assert.strictEqual(3, sharedStorageModel.numStoragesForTesting());
        assert.exists(sharedStorageModel.storageForOrigin(TEST_ORIGIN_A));
        assert.exists(sharedStorageModel.storageForOrigin(TEST_ORIGIN_B));
        assert.exists(sharedStorageModel.storageForOrigin(TEST_ORIGIN_C));
        sharedStorageModel.disable();
        assert.isEmpty(sharedStorageModel.storages());
    });
    it('dispatches SharedStorageAccess events to listeners', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        const manager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(manager);
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        for (const event of EVENTS) {
            sharedStorageModel.sharedStorageAccessed(event);
        }
        assert.deepEqual(EVENTS, listener.accessEvents);
    });
    it('dispatches SharedStorageChanged events to listeners', async () => {
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        const manager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(manager);
        await sharedStorageModel.enable();
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        // For change events whose origins aren't yet in the model, the origin is added
        // to the model, with the `SharedStorageAdded` event being subsequently dispatched
        // instead of the `SharedStorageChanged` event.
        const addedPromise = listener.waitForStoragesAdded(3);
        for (const event of EVENTS) {
            sharedStorageModel.sharedStorageAccessed(event);
        }
        await addedPromise;
        assert.strictEqual(4, sharedStorageModel.numStoragesForTesting());
        assert.deepEqual(EVENTS, listener.accessEvents);
        assert.isTrue(listener.changeEventsEmpty());
        // All events will be dispatched as `SharedStorageAccess` events, but only change
        // events for existing origins will be forwarded as `SharedStorageChanged` events.
        for (const event of EVENTS) {
            sharedStorageModel.sharedStorageAccessed(event);
        }
        assert.deepEqual(EVENTS.concat(EVENTS), listener.accessEvents);
        const storageA = sharedStorageModel.storageForOrigin(TEST_ORIGIN_A);
        assert.exists(storageA);
        assert.deepEqual(listener.changeEventsForStorage(storageA), [
            {
                accessTime: 0,
                method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
                mainFrameId: MAIN_FRAME_ID,
                ownerSite: TEST_SITE_A,
                params: { key: 'key0', value: 'value0' },
                scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
            },
        ]);
        const storageB = sharedStorageModel.storageForOrigin(TEST_ORIGIN_B);
        assert.exists(storageB);
        assert.deepEqual(listener.changeEventsForStorage(storageB), [
            {
                accessTime: 20,
                method: "clear" /* Protocol.Storage.SharedStorageAccessMethod.Clear */,
                mainFrameId: MAIN_FRAME_ID,
                ownerSite: TEST_SITE_B,
                params: {},
                scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
            },
        ]);
        const storageC = sharedStorageModel.storageForOrigin(TEST_ORIGIN_C);
        assert.exists(storageC);
        assert.deepEqual(listener.changeEventsForStorage(storageC), [
            {
                accessTime: 100,
                method: "set" /* Protocol.Storage.SharedStorageAccessMethod.Set */,
                mainFrameId: MAIN_FRAME_ID,
                ownerSite: TEST_SITE_C,
                params: { key: 'key0', value: 'value1', ignoreIfPresent: true },
                scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
            },
        ]);
    });
});
//# sourceMappingURL=SharedStorageModel.test.js.map