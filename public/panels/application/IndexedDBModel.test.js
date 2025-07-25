// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { clearMockConnectionResponseHandler, describeWithMockConnection, setMockConnectionResponseHandler, } from '../../testing/MockConnection.js';
import * as Resources from './application.js';
describeWithMockConnection('IndexedDBModel', () => {
    let indexedDBModel;
    let target;
    let indexedDBAgent;
    let manager;
    const testKey = 'test-storage-key/';
    const testStorageBucket = {
        storageKey: testKey,
        name: 'inbox',
    };
    const testStorageBucketInfo = {
        id: '0',
        bucket: testStorageBucket,
        expiration: 0,
        quota: 0,
        persistent: false,
        durability: "strict" /* Protocol.Storage.StorageBucketsDurability.Strict */,
    };
    const testDBId = new Resources.IndexedDBModel.DatabaseId(testStorageBucket, 'test-database');
    beforeEach(async () => {
        target = createTarget();
        indexedDBModel = new Resources.IndexedDBModel.IndexedDBModel(target);
        indexedDBAgent = target.indexedDBAgent();
        manager = target.model(SDK.StorageBucketsModel.StorageBucketsModel);
    });
    describe('StorageKeyAdded', () => {
        it('registers database only when the model is enabled', async () => {
            const databaseAddedSpy = sinon.spy(indexedDBModel, 'dispatchEventToListeners');
            const dbNamePromise = new Promise(resolve => {
                indexedDBModel.addEventListener(Resources.IndexedDBModel.Events.DatabaseAdded, event => {
                    resolve(event.data.databaseId.name);
                });
            });
            setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: ['test-database'] }));
            manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
            assert.isFalse(databaseAddedSpy.calledWithExactly(Resources.IndexedDBModel.Events.DatabaseAdded, { model: indexedDBModel, databaseId: testDBId }));
            indexedDBModel.enable();
            manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
            assert.strictEqual(await dbNamePromise, 'test-database');
        });
        it('starts tracking database', () => {
            const trackIndexedDBSpy = sinon.spy(target.storageAgent(), 'invoke_trackIndexedDBForStorageKey');
            indexedDBModel.enable();
            manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
            sinon.assert.calledOnceWithExactly(trackIndexedDBSpy, { storageKey: testKey });
        });
    });
    describe('StorageKeyRemoved', () => {
        it('stops tracking database', () => {
            const untrackIndexedDBSpy = sinon.spy(target.storageAgent(), 'invoke_untrackIndexedDBForStorageKey');
            indexedDBModel.enable();
            manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
            manager?.storageBucketDeleted({ bucketId: testStorageBucketInfo.id });
            sinon.assert.calledOnceWithExactly(untrackIndexedDBSpy, { storageKey: testKey });
        });
    });
    it('calls protocol method on clearObjectStore', () => {
        const clearObjectStoreSpy = sinon.spy(indexedDBAgent, 'invoke_clearObjectStore');
        indexedDBModel.enable();
        void indexedDBModel.clearObjectStore(testDBId, 'test-store');
        sinon.assert.calledOnceWithExactly(clearObjectStoreSpy, { storageBucket: testStorageBucket, databaseName: 'test-database', objectStoreName: 'test-store' });
    });
    it('calls protocol method on deleteEntries', () => {
        const testKeyRange = { lower: undefined, lowerOpen: false, upper: undefined, upperOpen: true };
        const deleteEntriesSpy = sinon.spy(indexedDBAgent, 'invoke_deleteObjectStoreEntries');
        indexedDBModel.enable();
        void indexedDBModel.deleteEntries(testDBId, 'test-store', testKeyRange);
        sinon.assert.calledOnceWithExactly(deleteEntriesSpy, {
            storageBucket: testStorageBucket,
            databaseName: 'test-database',
            objectStoreName: 'test-store',
            keyRange: testKeyRange,
        });
    });
    it('calls protocol method on refreshDatabaseNames and dispatches event', async () => {
        const requestDBNamesSpy = sinon.spy(indexedDBAgent, 'invoke_requestDatabaseNames');
        const dbRefreshedPromise = new Promise(resolve => {
            indexedDBModel.addEventListener(Resources.IndexedDBModel.Events.DatabaseNamesRefreshed, () => {
                resolve();
            });
        });
        setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: ['test-database'] }));
        indexedDBModel.enable();
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        void indexedDBModel.refreshDatabaseNames();
        sinon.assert.calledWithExactly(requestDBNamesSpy, { storageBucket: testStorageBucket });
        await dbRefreshedPromise;
    });
    it('requests database with storage key on refreshDatabase', async () => {
        const requestDatabaseSpy = sinon.spy(indexedDBAgent, 'invoke_requestDatabase');
        indexedDBModel.enable();
        void indexedDBModel.refreshDatabase(testDBId);
        sinon.assert.calledOnceWithExactly(requestDatabaseSpy, { storageBucket: testStorageBucket, databaseName: 'test-database' });
    });
    it('requests data with storage key on loadObjectStoreData', () => {
        const requestDataSpy = sinon.spy(indexedDBAgent, 'invoke_requestData');
        indexedDBModel.enable();
        indexedDBModel.loadObjectStoreData(testDBId, 'test-store', null, 0, 50, () => { });
        sinon.assert.calledOnceWithExactly(requestDataSpy, {
            storageBucket: testStorageBucket,
            databaseName: 'test-database',
            objectStoreName: 'test-store',
            indexName: '',
            skipCount: 0,
            pageSize: 50,
            keyRange: undefined,
        });
    });
    it('calls protocol method on getMetadata', async () => {
        const getMetadataSpy = sinon.stub(indexedDBAgent, 'invoke_getMetadata')
            .resolves({ entriesCount: 0, keyGeneratorValue: 0, getError: () => undefined });
        indexedDBModel.enable();
        await indexedDBModel.getMetadata(testDBId, new Resources.IndexedDBModel.ObjectStore('test-store', null, false));
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { storageBucket: testStorageBucket, databaseName: 'test-database', objectStoreName: 'test-store' });
    });
    it('dispatches event on indexedDBContentUpdated', () => {
        const dispatcherSpy = sinon.spy(indexedDBModel, 'dispatchEventToListeners');
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        indexedDBModel.indexedDBContentUpdated({ origin: '', storageKey: testKey, bucketId: '0', databaseName: 'test-database', objectStoreName: 'test-store' });
        sinon.assert.calledOnceWithExactly(dispatcherSpy, Resources.IndexedDBModel.Events.IndexedDBContentUpdated, { databaseId: testDBId, objectStoreName: 'test-store', model: indexedDBModel });
    });
    it('requests database names and loads db on indexedDBListUpdated', async () => {
        const requestDBNamesSpy = sinon.spy(indexedDBAgent, 'invoke_requestDatabaseNames');
        const databaseLoadedPromise = new Promise(resolve => {
            indexedDBModel.addEventListener(Resources.IndexedDBModel.Events.DatabaseLoaded, () => {
                resolve();
            });
        });
        setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: ['test-database'] }));
        setMockConnectionResponseHandler('IndexedDB.requestDatabase', () => ({ databaseWithObjectStores: { name: 'test-database', version: '1', objectStores: [] } }));
        indexedDBModel.enable();
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        indexedDBModel.indexedDBListUpdated({ origin: '', storageKey: testKey, bucketId: '0' });
        sinon.assert.calledWithExactly(requestDBNamesSpy, { storageBucket: testStorageBucket });
        await databaseLoadedPromise;
    });
    it('gets databases added for storage key', async () => {
        const dbNames = ['test-database1', 'test-database2'];
        setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: dbNames }));
        indexedDBModel.enable();
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        await indexedDBModel.refreshDatabaseNames();
        const databases = indexedDBModel.databases();
        assert.deepEqual(databases.map(db => db.name), dbNames);
    });
    it('calls protocol method on deleteDatabase', () => {
        const deleteDBSpy = sinon.spy(indexedDBAgent, 'invoke_deleteDatabase');
        setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: ['test-database'] }));
        indexedDBModel.enable();
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        void indexedDBModel.deleteDatabase(testDBId);
        sinon.assert.calledOnceWithExactly(deleteDBSpy, { storageBucket: testStorageBucket, databaseName: 'test-database' });
    });
    it('removes databases for storage key on clearForStorageKey', async () => {
        const dbNames = ['test-database1', 'test-database-2'];
        setMockConnectionResponseHandler('IndexedDB.requestDatabaseNames', () => ({ databaseNames: dbNames }));
        indexedDBModel.enable();
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        await indexedDBModel.refreshDatabaseNames();
        clearMockConnectionResponseHandler('IndexedDB.requestDatabaseNames');
        indexedDBModel.clearForStorageKey(testKey);
        assert.isEmpty(indexedDBModel.databases());
    });
    it('dispatches event with storage key on indexedDBContentUpdated when both storage key and origin are set', () => {
        const dispatcherSpy = sinon.spy(indexedDBModel, 'dispatchEventToListeners');
        manager?.storageBucketCreatedOrUpdated({ bucketInfo: testStorageBucketInfo });
        indexedDBModel.indexedDBContentUpdated({
            origin: 'test-origin',
            storageKey: testKey,
            bucketId: '0',
            databaseName: 'test-database',
            objectStoreName: 'test-store',
        });
        sinon.assert.calledOnceWithExactly(dispatcherSpy, Resources.IndexedDBModel.Events.IndexedDBContentUpdated, { databaseId: testDBId, objectStoreName: 'test-store', model: indexedDBModel });
    });
});
//# sourceMappingURL=IndexedDBModel.test.js.map