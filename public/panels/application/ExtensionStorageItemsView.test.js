// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { dispatchKeyDownEvent, raf } from '../../testing/DOMHelpers.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import { getCellElementFromNodeAndColumnId, selectNodeByKey } from '../../testing/StorageItemsViewHelpers.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as Resources from './application.js';
var View = Resources.ExtensionStorageItemsView;
class ExtensionStorageItemsListener {
    #dispatcher;
    #edited = false;
    #refreshed = false;
    constructor(dispatcher) {
        this.#dispatcher = dispatcher;
        this.#dispatcher.addEventListener("ItemEdited" /* View.ExtensionStorageItemsDispatcher.Events.ITEM_EDITED */, this.#itemsEdited, this);
        this.#dispatcher.addEventListener("ItemsRefreshed" /* View.ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
    }
    dispose() {
        this.#dispatcher.removeEventListener("ItemEdited" /* View.ExtensionStorageItemsDispatcher.Events.ITEM_EDITED */, this.#itemsEdited, this);
        this.#dispatcher.removeEventListener("ItemsRefreshed" /* View.ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
    }
    resetEdited() {
        this.#edited = false;
    }
    #itemsEdited() {
        this.#edited = true;
    }
    async waitForItemsEdited() {
        if (!this.#edited) {
            await this.#dispatcher.once("ItemEdited" /* View.ExtensionStorageItemsDispatcher.Events.ITEM_EDITED */);
        }
        this.#edited = true;
    }
    resetRefreshed() {
        this.#refreshed = false;
    }
    #itemsRefreshed() {
        this.#refreshed = true;
    }
    async waitForItemsRefreshed() {
        if (!this.#refreshed) {
            await this.#dispatcher.once("ItemsRefreshed" /* View.ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */);
        }
        this.#refreshed = true;
    }
}
describeWithMockConnection('ExtensionStorageItemsView', function () {
    let target;
    let extensionStorageModel;
    let extensionStorage;
    const TEST_EXTENSION_ID = 'abc';
    const TEST_EXTENSION_NAME = 'Hello World';
    const EXAMPLE_DATA = { a: 'foo', b: 'bar' };
    beforeEach(() => {
        target = createTarget();
        extensionStorageModel = target.model(Resources.ExtensionStorageModel.ExtensionStorageModel);
        assert.exists(extensionStorageModel);
        extensionStorage = new Resources.ExtensionStorageModel.ExtensionStorage(extensionStorageModel, TEST_EXTENSION_ID, TEST_EXTENSION_NAME, "local" /* Protocol.Extensions.StorageArea.Local */);
    });
    it('displays items', async () => {
        assert.exists(extensionStorageModel);
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems')
            .withArgs({ id: TEST_EXTENSION_ID, storageArea: "local" /* Protocol.Extensions.StorageArea.Local */ })
            .resolves({
            data: EXAMPLE_DATA,
            getError: () => undefined,
        });
        const view = new View.ExtensionStorageItemsView(extensionStorage);
        const itemsListener = new ExtensionStorageItemsListener(view.extensionStorageItemsDispatcher);
        await itemsListener.waitForItemsRefreshed();
        assert.deepEqual(view.getEntriesForTesting(), Object.keys(EXAMPLE_DATA).map(key => ({ key, value: EXAMPLE_DATA[key] })));
        await RenderCoordinator.done();
        view.detach();
    });
    it('correctly parses set values as JSON, with string fallback', async () => {
        assert.exists(extensionStorageModel);
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems')
            .withArgs({ id: TEST_EXTENSION_ID, storageArea: "local" /* Protocol.Extensions.StorageArea.Local */ })
            .resolves({
            data: EXAMPLE_DATA,
            getError: () => undefined,
        });
        const setStorageItems = sinon.stub(extensionStorageModel.agent, 'invoke_setStorageItems').resolves({ getError: () => undefined });
        const view = new View.ExtensionStorageItemsView(extensionStorage);
        const dataGrid = view.dataGridForTesting;
        const itemsListener = new ExtensionStorageItemsListener(view.extensionStorageItemsDispatcher);
        await itemsListener.waitForItemsRefreshed();
        view.markAsRoot();
        view.show(document.body);
        await raf();
        const expectedResults = [
            { input: '{foo: "bar"}', parsedValue: { foo: 'bar' } },
            { input: 'value', parsedValue: 'value' },
        ];
        for (const { input, parsedValue } of expectedResults) {
            const key = Object.keys(EXAMPLE_DATA)[0];
            const node = selectNodeByKey(dataGrid, key);
            assert.exists(node);
            await raf();
            const selectedNode = node;
            dataGrid.startEditingNextEditableColumnOfDataGridNode(selectedNode, 'value', true);
            const cellElement = getCellElementFromNodeAndColumnId(dataGrid, selectedNode, 'value');
            assert.exists(cellElement);
            cellElement.textContent = input;
            dispatchKeyDownEvent(cellElement, { key: 'Enter' });
            await itemsListener.waitForItemsEdited();
            setStorageItems.calledOnceWithExactly({ id: TEST_EXTENSION_ID, storageArea: "local" /* Protocol.Extensions.StorageArea.Local */, values: { [key]: parsedValue } });
            setStorageItems.reset();
        }
        await RenderCoordinator.done();
        view.detach();
    });
});
//# sourceMappingURL=ExtensionStorageItemsView.test.js.map