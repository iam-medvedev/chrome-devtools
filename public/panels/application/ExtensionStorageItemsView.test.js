// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
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
    function createView() {
        const toolbar = new Resources.StorageItemsToolbar.StorageItemsToolbar();
        const viewFunction = createViewFunctionStub(View.ExtensionStorageItemsView, { toolbar });
        const view = new View.ExtensionStorageItemsView(extensionStorage, viewFunction);
        return { view, viewFunction, toolbar };
    }
    it('displays items', async () => {
        assert.exists(extensionStorageModel);
        sinon.stub(extensionStorageModel.agent, 'invoke_getStorageItems')
            .withArgs({ id: TEST_EXTENSION_ID, storageArea: "local" /* Protocol.Extensions.StorageArea.Local */ })
            .resolves({
            data: EXAMPLE_DATA,
            getError: () => undefined,
        });
        const { view, viewFunction } = createView();
        const itemsListener = new ExtensionStorageItemsListener(view.extensionStorageItemsDispatcher);
        await itemsListener.waitForItemsRefreshed();
        assert.deepEqual(viewFunction.input.items, Object.keys(EXAMPLE_DATA).map(key => ({ key, value: EXAMPLE_DATA[key] })));
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
        const { view, viewFunction } = createView();
        const itemsListener = new ExtensionStorageItemsListener(view.extensionStorageItemsDispatcher);
        await itemsListener.waitForItemsRefreshed();
        const expectedResults = [
            { input: '{foo: "bar"}', parsedValue: { foo: 'bar' } },
            { input: 'value', parsedValue: 'value' },
        ];
        for (const { input, parsedValue } of expectedResults) {
            const key = Object.keys(EXAMPLE_DATA)[0];
            viewFunction.input.onEdit(new CustomEvent('edit', {
                detail: {
                    node: { dataset: { key } },
                    columnId: 'value',
                    valueBeforeEditing: EXAMPLE_DATA[key],
                    newText: input
                }
            }));
            await itemsListener.waitForItemsEdited();
            setStorageItems.calledOnceWithExactly({ id: TEST_EXTENSION_ID, storageArea: "local" /* Protocol.Extensions.StorageArea.Local */, values: { [key]: parsedValue } });
            setStorageItems.reset();
        }
        await RenderCoordinator.done();
        view.detach();
    });
});
//# sourceMappingURL=ExtensionStorageItemsView.test.js.map