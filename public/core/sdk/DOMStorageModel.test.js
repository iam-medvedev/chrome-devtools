// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { setupRuntimeHooks } from '../../testing/RuntimeHelpers.js';
import { setupSettingsHooks } from '../../testing/SettingsHelpers.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as SDK from './sdk.js';
describe('DOMStorageModel', () => {
    setupLocaleHooks();
    setupSettingsHooks();
    setupRuntimeHooks();
    let universe;
    beforeEach(() => {
        universe = new TestUniverse();
    });
    let domStorageModel;
    let domStorage;
    let target;
    const initKey = 'storageKey1';
    beforeEach(() => {
        target = universe.createTarget();
        domStorageModel = new SDK.DOMStorageModel.DOMStorageModel(target);
        domStorage = new SDK.DOMStorageModel.DOMStorage(domStorageModel, initKey, true);
    });
    it('DOMStorage is instantiated correctly', () => {
        assert.strictEqual(domStorage.storageKey, initKey);
        assert.deepEqual(domStorage.id, { storageKey: initKey, isLocalStorage: true });
    });
    it('StorageKey events trigger addition/removal of DOMStorage', () => {
        const testKey = 'storageKey';
        const testId = { storageKey: testKey, isLocalStorage: true };
        domStorageModel.enable();
        const manager = target.model(SDK.StorageKeyManager.StorageKeyManager);
        assert.exists(manager);
        assert.isEmpty(domStorageModel.storages());
        manager.dispatchEventToListeners("StorageKeyAdded" /* SDK.StorageKeyManager.Events.STORAGE_KEY_ADDED */, testKey);
        assert.exists(domStorageModel.storageForId(testId));
        assert.exists(domStorageModel.storageForId(testId));
        manager.dispatchEventToListeners("StorageKeyRemoved" /* SDK.StorageKeyManager.Events.STORAGE_KEY_REMOVED */, testKey);
        assert.isUndefined(domStorageModel.storageForId(testId));
    });
});
//# sourceMappingURL=DOMStorageModel.test.js.map