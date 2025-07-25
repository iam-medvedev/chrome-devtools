// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, expectConsoleLogs, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, setMockConnectionResponseHandler, } from '../../testing/MockConnection.js';
import { createResource, getMainFrame } from '../../testing/ResourceTreeHelpers.js';
import * as RenderCoordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Application from './application.js';
const { urlString } = Platform.DevToolsPath;
class SharedStorageTreeElementListener {
    #sidebar;
    #originsAdded = [];
    constructor(sidebar) {
        this.#sidebar = sidebar;
        this.#sidebar.sharedStorageTreeElementDispatcher.addEventListener("SharedStorageTreeElementAdded" /* Application.ApplicationPanelSidebar.SharedStorageTreeElementDispatcher.Events.SHARED_STORAGE_TREE_ELEMENT_ADDED */, this.#treeElementAdded, this);
    }
    dispose() {
        this.#sidebar.sharedStorageTreeElementDispatcher.removeEventListener("SharedStorageTreeElementAdded" /* Application.ApplicationPanelSidebar.SharedStorageTreeElementDispatcher.Events.SHARED_STORAGE_TREE_ELEMENT_ADDED */, this.#treeElementAdded, this);
    }
    #treeElementAdded(event) {
        this.#originsAdded.push(event.data.origin);
    }
    async waitForElementsAdded(expectedCount) {
        while (this.#originsAdded.length < expectedCount) {
            await this.#sidebar.sharedStorageTreeElementDispatcher.once("SharedStorageTreeElementAdded" /* Application.ApplicationPanelSidebar.SharedStorageTreeElementDispatcher.Events
                          .SHARED_STORAGE_TREE_ELEMENT_ADDED */);
        }
    }
}
describeWithMockConnection('ApplicationPanelSidebar', () => {
    let target;
    const TEST_ORIGIN_A = 'http://www.example.com/';
    const TEST_SITE_A = 'http://example.com';
    const TEST_ORIGIN_B = 'http://www.example.org/';
    const TEST_ORIGIN_C = 'http://www.example.net/';
    const TEST_SITE_C = 'http://example.net';
    const TEST_EXTENSION_NAME = 'Test Extension';
    const ID = 'main';
    const EVENTS = [
        {
            accessTime: 0,
            method: "append" /* Protocol.Storage.SharedStorageAccessMethod.Append */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0', value: 'value0' },
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 10,
            method: "get" /* Protocol.Storage.SharedStorageAccessMethod.Get */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: { key: 'key0' },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 15,
            method: "length" /* Protocol.Storage.SharedStorageAccessMethod.Length */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_A,
            ownerSite: TEST_SITE_A,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 20,
            method: "clear" /* Protocol.Storage.SharedStorageAccessMethod.Clear */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: {},
            scope: "window" /* Protocol.Storage.SharedStorageAccessScope.Window */,
        },
        {
            accessTime: 100,
            method: "set" /* Protocol.Storage.SharedStorageAccessMethod.Set */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: { key: 'key0', value: 'value1', ignoreIfPresent: true },
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
        {
            accessTime: 150,
            method: "remainingBudget" /* Protocol.Storage.SharedStorageAccessMethod.RemainingBudget */,
            mainFrameId: ID,
            ownerOrigin: TEST_ORIGIN_C,
            ownerSite: TEST_SITE_C,
            params: {},
            scope: "sharedStorageWorklet" /* Protocol.Storage.SharedStorageAccessScope.SharedStorageWorklet */,
        },
    ];
    beforeEach(() => {
        stubNoopSettings();
        SDK.ChildTargetManager.ChildTargetManager.install();
        const tabTarget = createTarget({ type: SDK.Target.Type.TAB });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTarget });
        sinon.stub(UI.ViewManager.ViewManager.instance(), 'showView').resolves(); // Silence console error
        setMockConnectionResponseHandler('Storage.getSharedStorageEntries', () => ({}));
        setMockConnectionResponseHandler('Storage.setSharedStorageTracking', () => ({}));
    });
    // Flaking on multiple bots on CQ.
    it.skip('[crbug.com/40278557] shows cookies for all frames', async () => {
        Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const sidebar = await Application.ResourcesPanel.ResourcesPanel.showAndGetSidebar();
        const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
        assert.exists(resourceTreeModel);
        sinon.stub(resourceTreeModel, 'frames').returns([
            {
                url: 'http://www.example.com/',
                unreachableUrl: () => null,
                resourceTreeModel: () => resourceTreeModel,
            },
            {
                url: 'http://www.example.com/admin/',
                unreachableUrl: () => null,
                resourceTreeModel: () => resourceTreeModel,
            },
            {
                url: 'http://www.example.org/',
                unreachableUrl: () => null,
                resourceTreeModel: () => resourceTreeModel,
            },
        ]);
        resourceTreeModel.dispatchEventToListeners(SDK.ResourceTreeModel.Events.CachedResourcesLoaded, resourceTreeModel);
        assert.strictEqual(sidebar.cookieListTreeElement.childCount(), 2);
        assert.deepEqual(sidebar.cookieListTreeElement.children().map(e => e.title), ['http://www.example.com', 'http://www.example.org']);
    });
    it('shows shared storages and events for origins using shared storage', async () => {
        const securityOriginManager = target.model(SDK.SecurityOriginManager.SecurityOriginManager);
        assert.exists(securityOriginManager);
        sinon.stub(securityOriginManager, 'securityOrigins').returns([
            TEST_ORIGIN_A,
            TEST_ORIGIN_B,
            TEST_ORIGIN_C,
        ]);
        const sharedStorageModel = target.model(Application.SharedStorageModel.SharedStorageModel);
        assert.exists(sharedStorageModel);
        const setTrackingSpy = sinon.stub(sharedStorageModel.storageAgent, 'invoke_setSharedStorageTracking').resolves({
            getError: () => undefined,
        });
        Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const sidebar = await Application.ResourcesPanel.ResourcesPanel.showAndGetSidebar();
        const listener = new SharedStorageTreeElementListener(sidebar);
        const addedPromise = listener.waitForElementsAdded(4);
        const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
        assert.exists(resourceTreeModel);
        resourceTreeModel.dispatchEventToListeners(SDK.ResourceTreeModel.Events.CachedResourcesLoaded, resourceTreeModel);
        await addedPromise;
        sinon.assert.calledOnceWithExactly(setTrackingSpy, { enable: true });
        assert.strictEqual(sidebar.sharedStorageListTreeElement.childCount(), 4);
        assert.deepEqual(sidebar.sharedStorageListTreeElement.children().map(e => e.title), [
            'https://example.com', // frame origin
            TEST_ORIGIN_A,
            TEST_ORIGIN_B,
            TEST_ORIGIN_C,
        ]);
        sidebar.sharedStorageListTreeElement.view.setDefaultIdForTesting(ID);
        for (const event of EVENTS) {
            sharedStorageModel.dispatchEventToListeners("SharedStorageAccess" /* Application.SharedStorageModel.Events.SHARED_STORAGE_ACCESS */, event);
        }
        assert.deepEqual(sidebar.sharedStorageListTreeElement.view.getEventsForTesting(), EVENTS);
    });
    it('shows extension storage based on added models', async () => {
        for (const useTreeView of [false, true]) {
            Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
            const sidebar = await Application.ResourcesPanel.ResourcesPanel.showAndGetSidebar();
            // Cast to any allows overriding private method.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sinon.stub(sidebar, 'useTreeViewForExtensionStorage').returns(useTreeView);
            const extensionStorageModel = target.model(Application.ExtensionStorageModel.ExtensionStorageModel);
            assert.exists(extensionStorageModel);
            const makeFakeExtensionStorage = (storageArea) => new Application.ExtensionStorageModel.ExtensionStorage(extensionStorageModel, '', TEST_EXTENSION_NAME, storageArea);
            const fakeModelLocal = makeFakeExtensionStorage("local" /* Protocol.Extensions.StorageArea.Local */);
            const fakeModelSession = makeFakeExtensionStorage("session" /* Protocol.Extensions.StorageArea.Session */);
            extensionStorageModel.dispatchEventToListeners("ExtensionStorageAdded" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */, fakeModelLocal);
            extensionStorageModel.dispatchEventToListeners("ExtensionStorageAdded" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */, fakeModelSession);
            if (useTreeView) {
                assert.strictEqual(sidebar.extensionStorageListTreeElement.childCount(), 1);
                assert.strictEqual(sidebar.extensionStorageListTreeElement.children()[0].title, TEST_EXTENSION_NAME);
                assert.deepEqual(sidebar.extensionStorageListTreeElement.children()[0].children().map(e => e.title), ['Session', 'Local']);
            }
            else {
                assert.strictEqual(sidebar.extensionStorageListTreeElement.childCount(), 2);
                assert.deepEqual(sidebar.extensionStorageListTreeElement.children().map(e => e.title), ['Session', 'Local']);
            }
            extensionStorageModel.dispatchEventToListeners("ExtensionStorageRemoved" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_REMOVED */, fakeModelLocal);
            extensionStorageModel.dispatchEventToListeners("ExtensionStorageRemoved" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_REMOVED */, fakeModelSession);
            assert.strictEqual(sidebar.extensionStorageListTreeElement.childCount(), 0);
        }
    });
    it('does not add extension storage if already added by another model', async () => {
        Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const sidebar = await Application.ResourcesPanel.ResourcesPanel.showAndGetSidebar();
        // Fakes adding an ExtensionStorage to the ExtensionStorageModel for
        // `target`. Returns a function that can be used to trigger a removal.
        const addFakeExtensionStorage = (target) => {
            const model = target.model(Application.ExtensionStorageModel.ExtensionStorageModel);
            assert.exists(model);
            const extensionStorage = new Application.ExtensionStorageModel.ExtensionStorage(model, '', TEST_EXTENSION_NAME, "local" /* Protocol.Extensions.StorageArea.Local */);
            const stub = sinon.stub(model, 'storageForIdAndArea').returns(extensionStorage);
            model.dispatchEventToListeners("ExtensionStorageAdded" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_ADDED */, extensionStorage);
            return () => {
                stub.restore();
                model.dispatchEventToListeners("ExtensionStorageRemoved" /* Application.ExtensionStorageModel.Events.EXTENSION_STORAGE_REMOVED */, extensionStorage);
            };
        };
        // Add a fake extension storage to the main target. The UI should be updated.
        addFakeExtensionStorage(target);
        assert.strictEqual(sidebar.extensionStorageListTreeElement.children()[0].childCount(), 1);
        // Add a fake extension storage using a non-main target (e.g, an iframe).
        // Make sure we don't add a second entry to the UI.
        const removeFrameStorage = addFakeExtensionStorage(createTarget({ type: SDK.Target.Type.FRAME, parentTarget: target }));
        assert.strictEqual(sidebar.extensionStorageListTreeElement.children()[0].childCount(), 1);
        // Removing the frame also shouldn't do anything, since the main frame
        // still exists.
        removeFrameStorage();
        assert.strictEqual(sidebar.extensionStorageListTreeElement.children()[0].childCount(), 1);
    });
    async function getExpectedCall(expectedCall) {
        Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const sidebar = await Application.ResourcesPanel.ResourcesPanel.showAndGetSidebar();
        const components = expectedCall.split('.');
        assert.lengthOf(components, 2);
        // @ts-expect-error
        const object = sidebar[components[0]];
        assert.exists(object);
        return sinon.spy(object, components[1]);
    }
    const MOCK_EVENT_ITEM = {
        addEventListener: () => { },
        securityOrigin: 'https://example.com',
        databaseId: new Application.IndexedDBModel.DatabaseId({ storageKey: '' }, ''),
        getEntries: () => Promise.resolve([]),
    };
    const testUiUpdate = (event, modelClass, expectedCallString, inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        const expectedCall = await getExpectedCall(expectedCallString);
        const model = target.model(modelClass);
        await RenderCoordinator.done({ waitForWork: true });
        assert.exists(model);
        const data = [{ ...MOCK_EVENT_ITEM, model }];
        model.dispatchEventToListeners(event, ...data);
        await new Promise(resolve => setTimeout(resolve, 0));
        assert.strictEqual(expectedCall.called, inScope);
    };
    it('adds interest group event on in scope event', testUiUpdate("InterestGroupAccess" /* Application.InterestGroupStorageModel.Events.INTEREST_GROUP_ACCESS */, Application.InterestGroupStorageModel.InterestGroupStorageModel, 'interestGroupTreeElement.addEvent', true));
    // Failing on the toolbar button CL together with some AnimationTimeline tests
    it.skip('[crbug.com/354673294] does not add interest group event on out of scope event', testUiUpdate("InterestGroupAccess" /* Application.InterestGroupStorageModel.Events.INTEREST_GROUP_ACCESS */, Application.InterestGroupStorageModel.InterestGroupStorageModel, 'interestGroupTreeElement.addEvent', false));
    it('adds DOM storage on in scope event', testUiUpdate("DOMStorageAdded" /* Application.DOMStorageModel.Events.DOM_STORAGE_ADDED */, Application.DOMStorageModel.DOMStorageModel, 'sessionStorageListTreeElement.appendChild', true));
    // Failing on the toolbar button CL together with some AnimationTimeline tests
    it.skip('[crbug.com/354673294] does not add DOM storage on out of scope event', testUiUpdate("DOMStorageAdded" /* Application.DOMStorageModel.Events.DOM_STORAGE_ADDED */, Application.DOMStorageModel.DOMStorageModel, 'sessionStorageListTreeElement.appendChild', false));
    it('adds indexed DB on in scope event', testUiUpdate(Application.IndexedDBModel.Events.DatabaseAdded, Application.IndexedDBModel.IndexedDBModel, 'indexedDBListTreeElement.appendChild', true));
    // Failing on the toolbar button CL together with some AnimationTimeline tests
    it.skip('[crbug.com/354673294] does not add indexed DB on out of scope event', testUiUpdate(Application.IndexedDBModel.Events.DatabaseAdded, Application.IndexedDBModel.IndexedDBModel, 'indexedDBListTreeElement.appendChild', false));
    it('adds shared storage on in scope event', testUiUpdate("SharedStorageAdded" /* Application.SharedStorageModel.Events.SHARED_STORAGE_ADDED */, Application.SharedStorageModel.SharedStorageModel, 'sharedStorageListTreeElement.appendChild', true));
    // Failing on the toolbar button CL together with some AnimationTimeline tests
    it.skip('[crbug.com/354673294] does not add shared storage on out of scope event', testUiUpdate("SharedStorageAdded" /* Application.SharedStorageModel.Events.SHARED_STORAGE_ADDED */, Application.SharedStorageModel.SharedStorageModel, 'sharedStorageListTreeElement.appendChild', false));
    const MOCK_GETTER_ITEM = {
        ...MOCK_EVENT_ITEM,
        ...MOCK_EVENT_ITEM.databaseId,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testUiUpdateOnScopeChange = (modelClass, getter, expectedCallString) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
        const expectedCall = await getExpectedCall(expectedCallString);
        const model = target.model(modelClass);
        assert.exists(model);
        sinon.stub(model, getter).returns([MOCK_GETTER_ITEM]);
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        await new Promise(resolve => setTimeout(resolve, 0));
        sinon.assert.called(expectedCall);
    };
    it('adds DOM storage element after scope change', testUiUpdateOnScopeChange(Application.DOMStorageModel.DOMStorageModel, 'storages', 'sessionStorageListTreeElement.appendChild'));
    it('adds shared storage after scope change', testUiUpdateOnScopeChange(Application.SharedStorageModel.SharedStorageModel, 'storages', 'sharedStorageListTreeElement.appendChild'));
    it('adds indexed db after scope change', testUiUpdateOnScopeChange(Application.IndexedDBModel.IndexedDBModel, 'databases', 'indexedDBListTreeElement.appendChild'));
    it('uses extension name when available for tree element title', () => {
        const panel = Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const extensionName = 'Test Extension';
        assert.strictEqual(new Application.ApplicationPanelSidebar.ExtensionStorageTreeParentElement(panel, 'id', extensionName).title, extensionName);
    });
    it('uses extension id as fallback for tree element title', () => {
        const panel = Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const extensionId = 'id';
        assert.strictEqual(new Application.ApplicationPanelSidebar.ExtensionStorageTreeParentElement(panel, extensionId, '').title, extensionId);
    });
});
describeWithMockConnection('IDBDatabaseTreeElement', () => {
    beforeEach(() => {
        stubNoopSettings();
    });
    expectConsoleLogs({
        error: ['Error: No LanguageSelector instance exists yet.'],
    });
    it('only becomes selectable after database is updated', () => {
        const target = createTarget();
        const model = target.model(Application.IndexedDBModel.IndexedDBModel);
        assert.exists(model);
        const panel = Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
        const databaseId = new Application.IndexedDBModel.DatabaseId({ storageKey: '' }, '');
        const treeElement = new Application.ApplicationPanelSidebar.IDBDatabaseTreeElement(panel, model, databaseId);
        assert.isFalse(treeElement.selectable);
        treeElement.update(new Application.IndexedDBModel.Database(databaseId, 1), false);
        assert.isTrue(treeElement.selectable);
    });
});
describeWithMockConnection('ResourcesSection', () => {
    const tests = (inScope) => () => {
        let target;
        beforeEach(() => {
            stubNoopSettings();
            SDK.FrameManager.FrameManager.instance({ forceNew: true });
            target = createTarget();
        });
        expectConsoleLogs({
            error: ['Error: No LanguageSelector instance exists yet.'],
        });
        it('adds tree elements for a frame and resource', () => {
            SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
            const panel = Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
            const treeElement = new UI.TreeOutline.TreeElement();
            new Application.ApplicationPanelSidebar.ResourcesSection(panel, treeElement);
            const model = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
            assert.exists(model);
            assert.strictEqual(treeElement.childCount(), 0);
            const frame = getMainFrame(target);
            const url = urlString `http://example.com`;
            assert.strictEqual(treeElement.firstChild()?.childCount() ?? 0, 0);
            createResource(frame, url, 'text/html', '');
            assert.strictEqual(treeElement.firstChild()?.childCount() ?? 0, inScope ? 1 : 0);
        });
        it('picks up existing frames and resource', () => {
            SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
            const panel = Application.ResourcesPanel.ResourcesPanel.instance({ forceNew: true });
            const treeElement = new UI.TreeOutline.TreeElement();
            new Application.ApplicationPanelSidebar.ResourcesSection(panel, treeElement);
            const url = urlString `http://example.com`;
            createResource(getMainFrame(target), url, 'text/html', '');
            assert.strictEqual(treeElement.firstChild()?.childCount() ?? 0, 0);
            assert.strictEqual(treeElement.childCount(), 0);
            SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
            assert.strictEqual(treeElement.childCount(), inScope ? 1 : 0);
            assert.strictEqual(treeElement.firstChild()?.childCount() ?? 0, inScope ? 1 : 0);
        });
    };
    describe('in scope', tests(true));
    describe('out of scope', tests(false));
});
//# sourceMappingURL=ApplicationPanelSidebar.test.js.map