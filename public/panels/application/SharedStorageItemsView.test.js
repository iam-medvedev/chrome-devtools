// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { getCleanTextContentFromElements, raf } from '../../testing/DOMHelpers.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Resources from './application.js';
var View = Resources.SharedStorageItemsView;
class SharedStorageItemsListener {
    #dispatcher;
    #cleared = false;
    #filteredCleared = false;
    #refreshed = false;
    #deletedKeys = [];
    #numEditedEvents = 0;
    constructor(dispatcher) {
        this.#dispatcher = dispatcher;
        this.#dispatcher.addEventListener("ItemsCleared" /* View.SharedStorageItemsDispatcher.Events.ITEMS_CLEARED */, this.#itemsCleared, this);
        this.#dispatcher.addEventListener("FilteredItemsCleared" /* View.SharedStorageItemsDispatcher.Events.FILTERED_ITEMS_CLEARED */, this.#filteredItemsCleared, this);
        this.#dispatcher.addEventListener("ItemsRefreshed" /* View.SharedStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
        this.#dispatcher.addEventListener("ItemDeleted" /* View.SharedStorageItemsDispatcher.Events.ITEM_DELETED */, this.#itemDeleted, this);
        this.#dispatcher.addEventListener("ItemEdited" /* View.SharedStorageItemsDispatcher.Events.ITEM_EDITED */, this.#itemEdited, this);
    }
    dispose() {
        this.#dispatcher.removeEventListener("ItemsCleared" /* View.SharedStorageItemsDispatcher.Events.ITEMS_CLEARED */, this.#itemsCleared, this);
        this.#dispatcher.removeEventListener("FilteredItemsCleared" /* View.SharedStorageItemsDispatcher.Events.FILTERED_ITEMS_CLEARED */, this.#filteredItemsCleared, this);
        this.#dispatcher.removeEventListener("ItemsRefreshed" /* View.SharedStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
        this.#dispatcher.removeEventListener("ItemDeleted" /* View.SharedStorageItemsDispatcher.Events.ITEM_DELETED */, this.#itemDeleted, this);
        this.#dispatcher.removeEventListener("ItemEdited" /* View.SharedStorageItemsDispatcher.Events.ITEM_EDITED */, this.#itemEdited, this);
    }
    get deletedKeys() {
        return this.#deletedKeys;
    }
    get numEditedEvents() {
        return this.#numEditedEvents;
    }
    resetRefreshed() {
        this.#refreshed = false;
    }
    #itemsCleared() {
        this.#cleared = true;
    }
    #filteredItemsCleared() {
        this.#filteredCleared = true;
    }
    #itemsRefreshed() {
        this.#refreshed = true;
    }
    #itemDeleted(event) {
        this.#deletedKeys.push(event.data.key);
    }
    #itemEdited() {
        ++this.#numEditedEvents;
    }
    async waitForItemsCleared() {
        if (!this.#cleared) {
            await this.#dispatcher.once("ItemsCleared" /* View.SharedStorageItemsDispatcher.Events.ITEMS_CLEARED */);
        }
        this.#cleared = true;
    }
    async waitForFilteredItemsCleared() {
        if (!this.#filteredCleared) {
            await this.#dispatcher.once("FilteredItemsCleared" /* View.SharedStorageItemsDispatcher.Events.FILTERED_ITEMS_CLEARED */);
        }
        this.#filteredCleared = true;
    }
    async waitForItemsRefreshed() {
        if (!this.#refreshed) {
            await this.#dispatcher.once("ItemsRefreshed" /* View.SharedStorageItemsDispatcher.Events.ITEMS_REFRESHED */);
        }
        this.#refreshed = true;
    }
    async waitForItemsDeletedTotal(total) {
        while (this.#deletedKeys.length < total) {
            await this.#dispatcher.once("ItemDeleted" /* View.SharedStorageItemsDispatcher.Events.ITEM_DELETED */);
        }
    }
    async waitForItemsEditedTotal(total) {
        while (this.#numEditedEvents < total) {
            await this.#dispatcher.once("ItemEdited" /* View.SharedStorageItemsDispatcher.Events.ITEM_EDITED */);
        }
    }
}
describeWithMockConnection('SharedStorageItemsView', function () {
    let target;
    let sharedStorageModel;
    let sharedStorage;
    const TEST_ORIGIN = 'http://a.test';
    const METADATA = {
        creationTime: 100,
        length: 3,
        remainingBudget: 2.5,
        bytesUsed: 30,
    };
    const METADATA_NO_ENTRIES = {
        creationTime: 100,
        length: 0,
        remainingBudget: 2.5,
        bytesUsed: 0,
    };
    const METADATA_2_ENTRIES = {
        creationTime: 100,
        length: 2,
        remainingBudget: 2.5,
        bytesUsed: 20,
    };
    const METADATA_4_ENTRIES = {
        creationTime: 100,
        length: 4,
        remainingBudget: 2.5,
        bytesUsed: 38,
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
    const ENTRIES_1 = [
        {
            key: 'key2',
            value: 'b',
        },
    ];
    const ENTRIES_2 = [
        {
            key: 'key1',
            value: 'a',
        },
        {
            key: 'key3',
            value: 'c',
        },
    ];
    const ENTRIES_KEY_EDITED_1 = [
        {
            key: 'key0',
            value: 'b',
        },
        {
            key: 'key1',
            value: 'a',
        },
        {
            key: 'key3',
            value: 'c',
        },
    ];
    const ENTRIES_KEY_EDITED_2 = [
        {
            key: 'key1',
            value: 'b',
        },
        {
            key: 'key3',
            value: 'c',
        },
    ];
    const ENTRIES_VALUE_EDITED = [
        {
            key: 'key1',
            value: 'a',
        },
        {
            key: 'key2',
            value: 'd',
        },
        {
            key: 'key3',
            value: 'c',
        },
    ];
    const ENTRIES_NEW_KEY = [
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
        {
            key: 'key4',
            value: 'e',
        },
    ];
    beforeEach(() => {
        target = createTarget();
        sharedStorageModel = target.model(Resources.SharedStorageModel.SharedStorageModel);
        assert.exists(sharedStorageModel);
        sharedStorage = new Resources.SharedStorageModel.SharedStorageForOrigin(sharedStorageModel, TEST_ORIGIN);
        assert.strictEqual(sharedStorage.securityOrigin, TEST_ORIGIN);
    });
    async function createView() {
        const toolbar = new Resources.StorageItemsToolbar.StorageItemsToolbar();
        const viewFunction = createViewFunctionStub(View.SharedStorageItemsView, { toolbar });
        const view = await View.SharedStorageItemsView.createView(sharedStorage, viewFunction);
        const itemsListener = new SharedStorageItemsListener(view.sharedStorageItemsDispatcher);
        await RenderCoordinator.done({ waitForWork: true });
        return { view, itemsListener, viewFunction, toolbar };
    }
    it('displays metadata and entries', async () => {
        assert.exists(sharedStorageModel);
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        const { view, viewFunction } = await createView();
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        const metadataView = view.metadataView;
        assert.exists(metadataView);
        assert.isNotNull(metadataView.shadowRoot);
        const keys = getCleanTextContentFromElements(metadataView.shadowRoot, 'devtools-report-key');
        assert.deepEqual(keys, [
            'Origin',
            'Creation Time',
            'Number of Entries',
            'Number of Bytes Used',
            'Entropy Budget for Fenced Frames',
        ]);
        const values = getCleanTextContentFromElements(metadataView.shadowRoot, 'devtools-report-value');
        assert.deepEqual(values, [
            TEST_ORIGIN,
            (new Date(100 * 1e3)).toLocaleString(),
            '3',
            '30',
            '2.5',
        ]);
    });
    it('displays metadata with placeholder message if origin is not using API', async () => {
        assert.exists(sharedStorageModel);
        sinon.stub(sharedStorage, 'getMetadata').resolves(null);
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            entries: [],
            getError: () => undefined,
        });
        const { view, viewFunction } = await createView();
        assert.lengthOf(viewFunction.input.items, 0);
        const metadataView = view.metadataView;
        assert.exists(metadataView);
        assert.isNotNull(metadataView.shadowRoot);
        const keys = getCleanTextContentFromElements(metadataView.shadowRoot, 'devtools-report-key');
        assert.deepEqual(keys, [
            'Origin',
            'Creation Time',
            'Number of Entries',
            'Number of Bytes Used',
            'Entropy Budget for Fenced Frames',
        ]);
        const values = getCleanTextContentFromElements(metadataView.shadowRoot, 'devtools-report-value');
        assert.deepEqual(values, [
            TEST_ORIGIN,
            'Not yet created',
            '0',
            '0',
            '0',
        ]);
    });
    it('has placeholder sidebar when there are no entries', async () => {
        assert.exists(sharedStorageModel);
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            metadata: METADATA_NO_ENTRIES,
            getError: () => undefined,
        });
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            entries: [],
            getError: () => undefined,
        });
        const { viewFunction } = await createView();
        assert.instanceOf(viewFunction.input.preview, UI.EmptyWidget.EmptyWidget);
    });
    function createMockElement(key, value) {
        return { dataset: { key, value } };
    }
    it('updates sidebarWidget upon receiving SelectedNode Event', async () => {
        assert.exists(sharedStorageModel);
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries')
            .withArgs({ ownerOrigin: TEST_ORIGIN })
            .resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        const { viewFunction } = await createView();
        // Select the second row.
        viewFunction.input.onSelect(new CustomEvent('select', { detail: createMockElement('key2', 'b') }));
        await raf();
        assert.instanceOf(viewFunction.input.preview, UI.SearchableView.SearchableView);
    });
    it('refreshes when "Refresh" is clicked', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata').resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries').resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        const { itemsListener, viewFunction, toolbar } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        // Clicking "Refresh" will cause `getMetadata()` and `getEntries()` to be called.
        itemsListener.resetRefreshed();
        const refreshedPromise2 = itemsListener.waitForItemsRefreshed();
        toolbar.dispatchEventToListeners("Refresh" /* Resources.StorageItemsToolbar.StorageItemsToolbar.Events.REFRESH */);
        await refreshedPromise2;
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
    });
    it('clears entries when "Delete All" is clicked', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA_NO_ENTRIES,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: [],
            getError: () => undefined,
        });
        const clearSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_clearSharedStorageEntries').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction, toolbar } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        // Clicking "Delete All" will cause `clear()`, `getMetadata()`, and `getEntries()` to be called.
        const clearedPromise = itemsListener.waitForItemsCleared();
        toolbar.dispatchEventToListeners("DeleteAll" /* Resources.StorageItemsToolbar.StorageItemsToolbar.Events.DELETE_ALL */);
        await clearedPromise;
        sinon.assert.calledOnceWithExactly(clearSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, []);
    });
    it('clears filtered entries when "Delete All" is clicked with a filter set', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(3).resolves({
            metadata: METADATA_2_ENTRIES,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(4).resolves({
            metadata: METADATA_2_ENTRIES,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(2).resolves({
            entries: ENTRIES_2,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(3).resolves({
            entries: ENTRIES_2,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction, toolbar } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        // Adding a filter to the text box will cause `getMetadata()`, and `getEntries()` to be called.
        itemsListener.resetRefreshed();
        const refreshedPromise2 = itemsListener.waitForItemsRefreshed();
        toolbar.filterChanged(new CustomEvent('DONTCARE', { detail: 'b' }));
        await refreshedPromise2;
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        // Only the filtered entries are displayed.
        assert.deepEqual(viewFunction.input.items, ENTRIES_1);
        // Clicking "Delete All" will cause `deleteEntry()`, `getMetadata()`, and `getEntries()` to be called.
        const clearedPromise = itemsListener.waitForFilteredItemsCleared();
        toolbar.dispatchEventToListeners("DeleteAll" /* Resources.StorageItemsToolbar.StorageItemsToolbar.Events.DELETE_ALL */);
        await clearedPromise;
        sinon.assert.calledOnceWithExactly(deleteEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key2' });
        sinon.assert.callCount(getMetadataSpy, 3);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledThrice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        // The filtered entries are cleared.
        assert.deepEqual(viewFunction.input.items, []);
        // Changing the filter in the text box will cause `getMetadata()`, and `getEntries()` to be called.
        itemsListener.resetRefreshed();
        const refreshedPromise3 = itemsListener.waitForItemsRefreshed();
        toolbar.filterChanged(new CustomEvent('DONTCARE', { detail: '' }));
        await refreshedPromise3;
        sinon.assert.callCount(getMetadataSpy, 4);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.callCount(getEntriesSpy, 4);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES_2);
    });
    it('deletes selected entry when "Delete Selected" is clicked', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA_2_ENTRIES,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: [],
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction, toolbar } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        // Select the second row.
        viewFunction.input.onSelect(new CustomEvent('select', { detail: createMockElement('key2', 'b') }));
        // Clicking "Delete Selected" will cause `deleteEntry()`, `getMetadata()`, and `getEntries()` to be called.
        const deletedPromise = itemsListener.waitForItemsDeletedTotal(1);
        toolbar.dispatchEventToListeners("DeleteSelected" /* Resources.StorageItemsToolbar.StorageItemsToolbar.Events.DELETE_SELECTED */);
        await deletedPromise;
        sinon.assert.calledOnceWithExactly(deleteEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key2' });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, []);
        assert.deepEqual(itemsListener.deletedKeys, ['key2']);
    });
    it('edits key of selected entry to a non-preexisting key', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: ENTRIES_2,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(2).resolves({
            entries: ENTRIES_KEY_EDITED_1,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        viewFunction.input.onEdit(new CustomEvent('edit', {
            detail: {
                node: createMockElement('key2', 'b'),
                columnId: 'key',
                valueBeforeEditing: 'key2',
                newText: 'key0',
            },
        }));
        //  Editing a key will cause `deleteEntry()`, `setEntry()`, `getMetadata()`, and `getEntries()` to be called.
        await itemsListener.waitForItemsEditedTotal(1);
        sinon.assert.calledOnceWithExactly(deleteEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key2' });
        sinon.assert.calledOnceWithExactly(setEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key0', value: 'b', ignoreIfPresent: false });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledThrice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES_KEY_EDITED_1);
    });
    it('edits key of selected entry to a preexisting key', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA_2_ENTRIES,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: ENTRIES_2,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(2).resolves({
            entries: ENTRIES_KEY_EDITED_2,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        viewFunction.input.onEdit(new CustomEvent('edit', {
            detail: {
                node: createMockElement('key2', 'b'),
                columnId: 'key',
                valueBeforeEditing: 'key2',
                newText: 'key1',
            },
        }));
        await itemsListener.waitForItemsEditedTotal(1);
        sinon.assert.calledOnceWithExactly(deleteEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key2' });
        sinon.assert.calledOnceWithExactly(setEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key1', value: 'b', ignoreIfPresent: false });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledThrice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES_KEY_EDITED_2);
        // Verify that the preview loads.
        assert.instanceOf(viewFunction.input.preview, UI.SearchableView.SearchableView);
    });
    it('edits value of selected entry to a new value', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: ENTRIES_VALUE_EDITED,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        viewFunction.input.onEdit(new CustomEvent('edit', {
            detail: {
                node: createMockElement('key2', 'b'),
                columnId: 'value',
                valueBeforeEditing: 'b',
                newText: 'd',
            },
        }));
        await itemsListener.waitForItemsEditedTotal(1);
        sinon.assert.notCalled(deleteEntrySpy);
        sinon.assert.calledOnceWithExactly(setEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key2', value: 'd', ignoreIfPresent: false });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES_VALUE_EDITED);
        // Verify that the preview loads.
        assert.instanceOf(viewFunction.input.preview, UI.SearchableView.SearchableView);
    });
    it('adds an entry when the key cell of the empty data row is edited', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata');
        getMetadataSpy.onCall(0).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(1).resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        getMetadataSpy.onCall(2).resolves({
            metadata: METADATA_4_ENTRIES,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries');
        getEntriesSpy.onCall(0).resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        getEntriesSpy.onCall(1).resolves({
            entries: ENTRIES_NEW_KEY,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        viewFunction.input.onCreate(new CustomEvent('edit', {
            detail: {
                key: 'key4',
                value: 'e',
            },
        }));
        await itemsListener.waitForItemsEditedTotal(1);
        sinon.assert.notCalled(deleteEntrySpy);
        sinon.assert.calledOnceWithExactly(setEntrySpy, { ownerOrigin: TEST_ORIGIN, key: 'key4', value: 'e', ignoreIfPresent: false });
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES_NEW_KEY);
        // Verify that the preview loads.
        assert.instanceOf(viewFunction.input.preview, UI.SearchableView.SearchableView);
    });
    it('attempting to edit key of selected entry to an empty key cancels the edit', async () => {
        assert.exists(sharedStorageModel);
        const getMetadataSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageMetadata').resolves({
            metadata: METADATA,
            getError: () => undefined,
        });
        const getEntriesSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_getSharedStorageEntries').resolves({
            entries: ENTRIES,
            getError: () => undefined,
        });
        const deleteEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_deleteSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const setEntrySpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageEntry').resolves({
            getError: () => undefined,
        });
        const { itemsListener, viewFunction } = await createView();
        sinon.assert.calledOnceWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledOnceWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        viewFunction.input.onSelect(new CustomEvent('select', { detail: createMockElement('key2', 'b') }));
        viewFunction.input.onEdit(new CustomEvent('edit', {
            detail: {
                node: createMockElement('key2', 'b'),
                columnId: 'key',
                valueBeforeEditing: 'key2',
                newText: '',
            },
        }));
        await itemsListener.waitForItemsRefreshed();
        sinon.assert.notCalled(deleteEntrySpy);
        sinon.assert.notCalled(setEntrySpy);
        sinon.assert.calledTwice(getMetadataSpy);
        sinon.assert.alwaysCalledWithExactly(getMetadataSpy, { ownerOrigin: TEST_ORIGIN });
        sinon.assert.calledTwice(getEntriesSpy);
        sinon.assert.alwaysCalledWithExactly(getEntriesSpy, { ownerOrigin: TEST_ORIGIN });
        assert.deepEqual(viewFunction.input.items, ENTRIES);
        // Verify that the preview loads.
        assert.instanceOf(viewFunction.input.preview, UI.SearchableView.SearchableView);
    });
});
//# sourceMappingURL=SharedStorageItemsView.test.js.map