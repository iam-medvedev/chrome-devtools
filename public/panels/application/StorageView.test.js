// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const { assert } = chai;
import { assertElement, dispatchFocusOutEvent } from '../../../test/unittests/front_end/helpers/DOMHelpers.js';
import { createTarget } from '../../../test/unittests/front_end/helpers/EnvironmentHelpers.js';
import { describeWithMockConnection, dispatchEvent } from '../../../test/unittests/front_end/helpers/MockConnection.js';
import { assertNotNullOrUndefined } from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Coordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Resources from './application.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithMockConnection('StorageView', () => {
    const tests = (targetFactory) => {
        const testKey = 'test-storage-key';
        const testOrigin = 'test-origin';
        let target;
        let domStorageModel;
        let storageKeyManager;
        beforeEach(() => {
            target = targetFactory();
            domStorageModel = target.model(Resources.DOMStorageModel.DOMStorageModel);
            domStorageModel?.enable();
            storageKeyManager = target.model(SDK.StorageKeyManager.StorageKeyManager);
        });
        it('emits correct events on clear', () => {
            const testId = { storageKey: testKey, isLocalStorage: true };
            assertNotNullOrUndefined(domStorageModel);
            assert.isEmpty(domStorageModel.storages());
            assertNotNullOrUndefined(storageKeyManager);
            storageKeyManager.dispatchEventToListeners("StorageKeyAdded" /* SDK.StorageKeyManager.Events.StorageKeyAdded */, testKey);
            assertNotNullOrUndefined(domStorageModel.storageForId(testId));
            const dispatcherSpy = sinon.spy(domStorageModel, 'dispatchEventToListeners');
            const spyClearDataForStorageKey = sinon.stub(target.storageAgent(), 'invoke_clearDataForStorageKey');
            Resources.StorageView.StorageView.clear(target, testKey, null, ["all" /* Protocol.Storage.StorageType.All */], false);
            // must be called 4 times, twice with DOMStorageRemoved for local and non-local storage and twice with DOMStorageAdded
            assert.isTrue(spyClearDataForStorageKey.calledOnce);
            assert.strictEqual(dispatcherSpy.callCount, 4);
            sinon.assert.calledWith(dispatcherSpy, "DOMStorageRemoved" /* Resources.DOMStorageModel.Events.DOMStorageRemoved */);
            sinon.assert.calledWith(dispatcherSpy, "DOMStorageAdded" /* Resources.DOMStorageModel.Events.DOMStorageAdded */);
        });
        it('changes subtitle on MainStorageKeyChanged event', () => {
            assertNotNullOrUndefined(domStorageModel);
            assertNotNullOrUndefined(storageKeyManager);
            const view = new Resources.StorageView.StorageView();
            storageKeyManager.dispatchEventToListeners("MainStorageKeyChanged" /* SDK.StorageKeyManager.Events.MainStorageKeyChanged */, { mainStorageKey: testKey });
            const subtitle = view.element.shadowRoot?.querySelector('div.flex-auto')?.shadowRoot?.querySelector('div.report-subtitle');
            assert.strictEqual(subtitle?.textContent, testKey);
        });
        it('shows a warning message when entering a too big custom quota', async () => {
            assertNotNullOrUndefined(domStorageModel);
            assertNotNullOrUndefined(storageKeyManager);
            const securityOriginManager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
            assertNotNullOrUndefined(securityOriginManager);
            sinon.stub(securityOriginManager, 'mainSecurityOrigin').returns(testOrigin);
            const view = new Resources.StorageView.StorageView();
            const container = view.element.shadowRoot?.querySelector('.clear-storage-header') || null;
            assertElement(container, HTMLDivElement);
            const customQuotaCheckbox = container.shadowRoot.querySelector('.quota-override-row span').shadowRoot.querySelector('[title="Simulate custom storage quota"]');
            assertElement(customQuotaCheckbox, HTMLInputElement);
            customQuotaCheckbox.checked = true;
            const errorDiv = container.shadowRoot.querySelector('.quota-override-error');
            assertElement(errorDiv, HTMLDivElement);
            assert.strictEqual(errorDiv.textContent, '');
            const editor = container.shadowRoot.querySelector('.quota-override-notification-editor');
            assertElement(editor, HTMLInputElement);
            editor.value = '9999999999999';
            dispatchFocusOutEvent(editor);
            await coordinator.done();
            assert.strictEqual(errorDiv.textContent, 'Number must be smaller than 9,000,000,000,000');
        });
        it('also clears cookies on clear', () => {
            const cookieModel = target.model(SDK.CookieModel.CookieModel);
            const clearByOriginSpy = sinon.spy(target.storageAgent(), 'invoke_clearDataForOrigin');
            const cookieClearSpy = sinon.spy(cookieModel, 'clear');
            Resources.StorageView.StorageView.clear(target, testKey, testOrigin, ["all" /* Protocol.Storage.StorageType.All */], false);
            assert.isTrue(clearByOriginSpy.calledOnceWithExactly({ origin: testOrigin, storageTypes: 'cookies' }));
            assert.isTrue(cookieClearSpy.calledOnceWithExactly(undefined, testOrigin));
        });
        it('also clears WebSQL on clear', async () => {
            const databaseModel = target.model(Resources.DatabaseModel.DatabaseModel);
            assertNotNullOrUndefined(databaseModel);
            const databaseRemoved = new Promise(resolve => {
                databaseModel.addEventListener("DatabasesRemoved" /* Resources.DatabaseModel.Events.DatabasesRemoved */, resolve);
            });
            const testDatabase = new Resources.DatabaseModel.Database(databaseModel, 'test-id', 'test-domain', 'test-name', '1');
            databaseModel.enable();
            databaseModel.addDatabase(testDatabase);
            assert.deepEqual(databaseModel.databases()[0], testDatabase);
            Resources.StorageView.StorageView.clear(target, testKey, '', ["all" /* Protocol.Storage.StorageType.All */], false);
            await databaseRemoved;
            assert.isEmpty(databaseModel.databases());
        });
        it('clears e.g. WebSQL on clear site data', async () => {
            const FRAME = {
                id: 'main',
                loaderId: 'test',
                url: 'http://example.com',
                securityOrigin: 'http://example.com',
                mimeType: 'text/html',
            };
            const databaseModel = target.model(Resources.DatabaseModel.DatabaseModel);
            assertNotNullOrUndefined(databaseModel);
            const databaseRemoved = databaseModel.once("DatabasesRemoved" /* Resources.DatabaseModel.Events.DatabasesRemoved */);
            const testDatabase = new Resources.DatabaseModel.Database(databaseModel, 'test-id', 'test-domain', 'test-name', '1');
            databaseModel.enable();
            databaseModel.addDatabase(testDatabase);
            assert.deepEqual(databaseModel.databases()[0], testDatabase);
            sinon.stub(target.storageAgent(), 'invoke_getStorageKeyForFrame')
                .resolves({ storageKey: testKey, getError: () => undefined });
            dispatchEvent(target, 'Page.frameNavigated', { frame: FRAME });
            const actionDelegate = new Resources.StorageView.ActionDelegate();
            actionDelegate.handleAction("RESOURCES" /* UI.ActionRegistration.ActionCategory.RESOURCES */, 'resources.clear');
            await databaseRemoved;
            assert.isEmpty(databaseModel.databases());
        });
        it('clears cache on clear', async () => {
            const cacheStorageModel = target.model(SDK.ServiceWorkerCacheModel.ServiceWorkerCacheModel);
            assertNotNullOrUndefined(cacheStorageModel);
            const storageBucketModel = target.model(SDK.StorageBucketsModel.StorageBucketsModel);
            assertNotNullOrUndefined(storageBucketModel);
            const testStorageBucket = {
                storageKey: testKey,
                name: 'inbox',
            };
            const testStorageBucketInfo = {
                bucket: testStorageBucket,
                id: '0',
                expiration: 0,
                quota: 0,
                persistent: false,
                durability: "strict" /* Protocol.Storage.StorageBucketsDurability.Strict */,
            };
            let caches = [
                {
                    cacheId: 'id1',
                    securityOrigin: '',
                    storageKey: testStorageBucket.storageKey,
                    storageBucket: testStorageBucket,
                    cacheName: 'test-cache-1',
                },
                {
                    cacheId: 'id2',
                    securityOrigin: '',
                    storageKey: testStorageBucket.storageKey,
                    storageBucket: testStorageBucket,
                    cacheName: 'test-cache-2',
                },
            ];
            sinon.stub(target.cacheStorageAgent(), 'invoke_requestCacheNames').resolves({ caches, getError: () => undefined });
            cacheStorageModel.enable();
            const cacheAddedPromise = new Promise(resolve => {
                cacheStorageModel.addEventListener("CacheAdded" /* SDK.ServiceWorkerCacheModel.Events.CacheAdded */, () => {
                    resolve();
                });
            });
            storageBucketModel?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
            await cacheAddedPromise;
            caches = [];
            Resources.StorageView.StorageView.clear(target, testKey, '', ["cache_storage" /* Protocol.Storage.StorageType.Cache_storage */], false);
            assert.isEmpty(cacheStorageModel.caches());
        });
    };
    describe('without tab target', () => tests(createTarget));
    describe('with tab target', () => tests(() => {
        const tabTarget = createTarget({ type: SDK.Target.Type.Tab });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        return createTarget({ parentTarget: tabTarget });
    }));
});
//# sourceMappingURL=StorageView.test.js.map