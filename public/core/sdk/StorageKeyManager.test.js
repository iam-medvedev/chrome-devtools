// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import * as Platform from '../platform/platform.js';
import * as SDK from './sdk.js';
const { urlString } = Platform.DevToolsPath;
describeWithMockConnection('StorageKeyManager', () => {
    let manager;
    beforeEach(() => {
        const target = createTarget();
        manager = new SDK.StorageKeyManager.StorageKeyManager(target);
    });
    it('updates storage keys and emits events correctly', () => {
        let eventFired = false;
        const keys = ['storagekey1', 'storagekey2'];
        assert.isEmpty(manager.storageKeys());
        manager.addEventListener("StorageKeyAdded" /* SDK.StorageKeyManager.Events.STORAGE_KEY_ADDED */, () => {
            eventFired = true;
        });
        manager.updateStorageKeys(new Set(keys));
        assert.isTrue(eventFired);
        assert.deepEqual(manager.storageKeys(), keys);
        eventFired = false;
        manager.addEventListener("StorageKeyRemoved" /* SDK.StorageKeyManager.Events.STORAGE_KEY_REMOVED */, () => {
            eventFired = true;
        });
        manager.updateStorageKeys(new Set());
        assert.isTrue(eventFired);
        assert.isEmpty(manager.storageKeys());
    });
    it('updates main storage key and emits event correctly', () => {
        const mainKey = 'storagekey1';
        let eventFired = false;
        assert.isEmpty(manager.mainStorageKey());
        manager.addEventListener("MainStorageKeyChanged" /* SDK.StorageKeyManager.Events.MAIN_STORAGE_KEY_CHANGED */, () => {
            eventFired = true;
        });
        manager.setMainStorageKey(mainKey);
        assert.isTrue(eventFired);
        assert.strictEqual(manager.mainStorageKey(), mainKey);
    });
});
describe('parseStorageKey', () => {
    it('parses first-party key', () => {
        const storageKey = SDK.StorageKeyManager.parseStorageKey('https://example.com/');
        assert.deepEqual(storageKey.origin, urlString `https://example.com`);
        assert.deepEqual([...storageKey.components], []);
    });
    it('parses ancestor chain bit', () => {
        const storageKey = SDK.StorageKeyManager.parseStorageKey('https://example.com/^31');
        assert.strictEqual(storageKey.origin, 'https://example.com');
        assert.deepEqual([...storageKey.components], [["3" /* SDK.StorageKeyManager.StorageKeyComponent.ANCESTOR_CHAIN_BIT */, '1']]);
    });
    it('parses top-level site', () => {
        const storageKey = SDK.StorageKeyManager.parseStorageKey('https://test.example/^0https://example.com');
        assert.strictEqual(storageKey.origin, 'https://test.example');
        assert.deepEqual([...storageKey.components], [["0" /* SDK.StorageKeyManager.StorageKeyComponent.TOP_LEVEL_SITE */, 'https://example.com']]);
    });
    it('parses opaque top-level site', () => {
        const storageKey = SDK.StorageKeyManager.parseStorageKey('https://sub.example.com/^43735928559^5110521^6https://sub.notexample.com');
        assert.strictEqual(storageKey.origin, 'https://sub.example.com');
        assert.deepEqual([...storageKey.components], [
            ["4" /* SDK.StorageKeyManager.StorageKeyComponent.TOP_LEVEL_SITE_OPAQUE_NONCE_HIGH */, '3735928559'],
            ["5" /* SDK.StorageKeyManager.StorageKeyComponent.TOP_LEVEL_SITE_OPAQUE_NONCE_LOW */, '110521'],
            ["6" /* SDK.StorageKeyManager.StorageKeyComponent.TOP_LEVEL_SITE_OPAQUE_NONCE_PRECURSOR */, 'https://sub.notexample.com'],
        ]);
    });
    it('parses nonce', () => {
        const storageKey = SDK.StorageKeyManager.parseStorageKey('https://example.com/^112345^267890');
        assert.strictEqual(storageKey.origin, 'https://example.com');
        assert.deepEqual([...storageKey.components], [
            ["1" /* SDK.StorageKeyManager.StorageKeyComponent.NONCE_HIGH */, '12345'],
            ["2" /* SDK.StorageKeyManager.StorageKeyComponent.NONCE_LOW */, '67890'],
        ]);
    });
});
//# sourceMappingURL=StorageKeyManager.test.js.map