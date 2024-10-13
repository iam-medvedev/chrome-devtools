// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, } from '../../testing/MockConnection.js';
import * as Coordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as Resources from './application.js';
var View = Resources.ExtensionStorageItemsView;
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
class ExtensionStorageItemsListener {
    #dispatcher;
    #refreshed = false;
    constructor(dispatcher) {
        this.#dispatcher = dispatcher;
        this.#dispatcher.addEventListener("ItemsRefreshed" /* View.ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
    }
    dispose() {
        this.#dispatcher.removeEventListener("ItemsRefreshed" /* View.ExtensionStorageItemsDispatcher.Events.ITEMS_REFRESHED */, this.#itemsRefreshed, this);
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
        await coordinator.done();
        view.detach();
    });
});
//# sourceMappingURL=ExtensionStorageItemsView.test.js.map