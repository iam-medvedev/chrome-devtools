// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection, setMockConnectionResponseHandler, } from '../../testing/MockConnection.js';
import { createViewFunctionStub } from '../../testing/ViewFunctionHelpers.js';
import * as ObjectUI from '../../ui/legacy/components/object_ui/object_ui.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Elements from './elements.js';
const NODE_ID = 1;
describeWithMockConnection('PropertiesWidget', () => {
    let target;
    beforeEach(() => {
        stubNoopSettings();
        target = createTarget();
        setMockConnectionResponseHandler('DOM.getDocument', () => ({ root: { nodeId: NODE_ID } }));
        setMockConnectionResponseHandler('DOM.getNodesForSubtreeByStyle', () => ({ nodeIds: [] }));
    });
    const updatesUiOnEvent = (event, inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        const node = new SDK.DOMModel.DOMNode(model);
        sinon.stub(node, 'resolveToObject')
            .withArgs('properties-sidebar-pane')
            .resolves(SDK.RemoteObject.RemoteObject.fromLocalObject({}));
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
        const view = new Elements.PropertiesWidget.PropertiesWidget();
        renderElementIntoDOM(view);
        await view.updateComplete;
        const populateWithProperties = sinon.spy(ObjectUI.ObjectPropertiesSection.ObjectPropertyTreeElement, 'populateWithProperties');
        model.dispatchEventToListeners(event, ...[node]);
        await view.updateComplete;
        assert.strictEqual(populateWithProperties.called, inScope);
    };
    it('updates UI on in scope attribute modified event', updatesUiOnEvent(SDK.DOMModel.Events.AttrModified, true));
    it('does not update UI on out of scope attribute modified event', updatesUiOnEvent(SDK.DOMModel.Events.AttrModified, false));
    it('updates UI on in scope attribute removed event', updatesUiOnEvent(SDK.DOMModel.Events.AttrRemoved, true));
    it('does not update UI on out of scope attribute removed event', updatesUiOnEvent(SDK.DOMModel.Events.AttrModified, false));
    it('updates UI on in scope charachter data modified event', updatesUiOnEvent(SDK.DOMModel.Events.CharacterDataModified, true));
    it('does not update UI on out of scope charachter data modified event', updatesUiOnEvent(SDK.DOMModel.Events.CharacterDataModified, false));
    it('updates UI on in scope child node count updated event', updatesUiOnEvent(SDK.DOMModel.Events.ChildNodeCountUpdated, true));
    it('does not update UI on out of scope child node count updated event', updatesUiOnEvent(SDK.DOMModel.Events.ChildNodeCountUpdated, false));
    it('invokes a getter when clicking on the invoke button', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtimeModel);
        const node = new SDK.DOMModel.DOMNode(model);
        const object = runtimeModel.createRemoteObject({
            type: "object" /* Protocol.Runtime.RemoteObjectType.Object */,
            subtype: "null" /* Protocol.Runtime.RemoteObjectSubtype.Null */,
            objectId: '1',
        });
        setMockConnectionResponseHandler('Runtime.getProperties', () => ({
            result: [
                {
                    name: 'myGetter',
                    isOwn: true,
                    enumerable: true,
                    configurable: true,
                    get: {
                        type: "function" /* Protocol.Runtime.RemoteObjectType.Function */,
                        objectId: '2',
                        className: 'Function',
                        description: 'get myGetter()',
                    },
                },
            ],
        }));
        const callFunctionOn = sinon.stub().resolves({
            result: {
                type: "object" /* Protocol.Runtime.RemoteObjectType.Object */,
                subtype: "null" /* Protocol.Runtime.RemoteObjectSubtype.Null */,
                value: null,
            },
        });
        setMockConnectionResponseHandler('Runtime.callFunctionOn', callFunctionOn);
        sinon.stub(node, 'resolveToObject').withArgs('properties-sidebar-pane').resolves(object);
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
        const viewFunction = createViewFunctionStub(Elements.PropertiesWidget.PropertiesWidget);
        const view = new Elements.PropertiesWidget.PropertiesWidget(viewFunction);
        renderElementIntoDOM(view);
        await viewFunction.nextInput;
        // Wait for the property widgets to update
        await UI.Widget.Widget.allUpdatesComplete;
        const { treeOutline } = viewFunction.input;
        const treeShadowRoot = treeOutline.element.shadowRoot;
        assert.exists(treeShadowRoot);
        const invokeButton = treeShadowRoot.querySelector('.object-value-calculate-value-button');
        assert.exists(invokeButton);
        invokeButton.click();
        sinon.assert.calledWith(callFunctionOn, sinon.match({
            objectId: '1',
            arguments: sinon.match([{ objectId: '2' }]),
        }));
    });
    describe('regex filter toggle', () => {
        it('passes isRegex=false to the view by default', async () => {
            SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
            const model = target.model(SDK.DOMModel.DOMModel);
            assert.exists(model);
            const node = new SDK.DOMModel.DOMNode(model);
            sinon.stub(node, 'resolveToObject')
                .withArgs('properties-sidebar-pane')
                .resolves(SDK.RemoteObject.RemoteObject.fromLocalObject({}));
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            const viewFunction = createViewFunctionStub(Elements.PropertiesWidget.PropertiesWidget);
            const view = new Elements.PropertiesWidget.PropertiesWidget(viewFunction);
            renderElementIntoDOM(view);
            await viewFunction.nextInput;
            await UI.Widget.Widget.allUpdatesComplete;
            assert.isFalse(viewFunction.input.isRegex);
        });
        it('toggles isRegex when onRegexToggled is called', async () => {
            SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
            const model = target.model(SDK.DOMModel.DOMModel);
            assert.exists(model);
            const node = new SDK.DOMModel.DOMNode(model);
            sinon.stub(node, 'resolveToObject')
                .withArgs('properties-sidebar-pane')
                .resolves(SDK.RemoteObject.RemoteObject.fromLocalObject({}));
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            const viewFunction = createViewFunctionStub(Elements.PropertiesWidget.PropertiesWidget);
            const view = new Elements.PropertiesWidget.PropertiesWidget(viewFunction);
            renderElementIntoDOM(view);
            await viewFunction.nextInput;
            await UI.Widget.Widget.allUpdatesComplete;
            assert.isFalse(viewFunction.input.isRegex);
            viewFunction.input.onRegexToggled();
            await viewFunction.nextInput;
            assert.isTrue(viewFunction.input.isRegex);
            viewFunction.input.onRegexToggled();
            await viewFunction.nextInput;
            assert.isFalse(viewFunction.input.isRegex);
        });
    });
    it('correctly filters properties and shows the "No matching property" message', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        const node = new SDK.DOMModel.DOMNode(model);
        const object = SDK.RemoteObject.RemoteObject.fromLocalObject({
            firstProperty: 'firstValue',
            secondProperty: 'secondValue',
        });
        sinon.stub(node, 'resolveToObject').withArgs('properties-sidebar-pane').resolves(object);
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
        const viewFunction = createViewFunctionStub(Elements.PropertiesWidget.PropertiesWidget);
        const view = new Elements.PropertiesWidget.PropertiesWidget(viewFunction);
        renderElementIntoDOM(view);
        await viewFunction.nextInput;
        // Wait for the property widgets to update
        await UI.Widget.Widget.allUpdatesComplete;
        // a) No filter
        assert.isFalse(viewFunction.input.allChildrenFiltered, 'allChildrenFiltered should be false without a filter');
        assert.isFalse(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'firstProperty')?.isFiltered, 'firstProperty should not be filtered');
        assert.isFalse(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'secondProperty')?.isFiltered, 'secondProperty should not be filtered');
        // b) Partial filter match
        viewFunction.input.onFilterChanged(new CustomEvent('filter', { detail: 'first' }));
        await viewFunction.nextInput;
        await UI.Widget.Widget.allUpdatesComplete;
        assert.isFalse(viewFunction.input.allChildrenFiltered, 'allChildrenFiltered should be false with a partial match');
        assert.isFalse(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'firstProperty')?.isFiltered, 'firstProperty should not be filtered');
        assert.isTrue(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'secondProperty')?.isFiltered, 'secondProperty should be filtered');
        // c) No filter match
        viewFunction.input.onFilterChanged(new CustomEvent('filter', { detail: 'third' }));
        await viewFunction.nextInput;
        await UI.Widget.Widget.allUpdatesComplete;
        assert.isTrue(viewFunction.input.allChildrenFiltered, 'allChildrenFiltered should be true with no matches');
        assert.isTrue(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'firstProperty')?.isFiltered, 'firstProperty should be filtered');
        assert.isTrue(viewFunction.input.objectTree?.children?.properties?.find(p => p.name === 'secondProperty')?.isFiltered, 'secondProperty should be filtered');
    });
});
describeWithEnvironment('PropertiesWidget DEFAULT_VIEW', () => {
    beforeEach(() => {
        stubNoopSettings();
    });
    async function setUpView(filter) {
        const container = document.createElement('div');
        renderElementIntoDOM(container, { includeCommonStyles: true });
        const object = SDK.RemoteObject.RemoteObject.fromLocalObject({
            firstProperty: 'firstValue',
            secondProperty: 'secondValue',
        });
        const objectTree = new ObjectUI.ObjectPropertiesSection.ObjectTree(object, 1 /* ObjectUI.ObjectPropertiesSection.ObjectPropertiesMode.OWN_AND_INTERNAL_AND_INHERITED */);
        const viewFunction = createViewFunctionStub(Elements.PropertiesWidget.PropertiesWidget);
        new Elements.PropertiesWidget.PropertiesWidget(viewFunction);
        const { treeOutline } = await viewFunction.nextInput;
        if (filter) {
            objectTree.setFilter({ includeNullOrUndefinedValues: false, regex: new RegExp(filter, 'i') });
        }
        ObjectUI.ObjectPropertiesSection.ObjectPropertyTreeElement.populateWithProperties(treeOutline.rootElement(), await objectTree.populateChildrenIfNeeded(), true, true);
        return { container, treeOutline, objectTree };
    }
    it('renders the view without filter', async () => {
        const { container, treeOutline, objectTree } = await setUpView();
        Elements.PropertiesWidget.DEFAULT_VIEW({
            onFilterChanged: () => { },
            treeOutline,
            objectTree,
            allChildrenFiltered: false,
            onRegexToggled: function () {
                throw new Error('Function not implemented.');
            },
            isRegex: false
        }, {}, container);
        await assertScreenshot('elements/properties_widget_no_filter.png');
    });
    it('renders the view with a partial filter match', async () => {
        const { container, treeOutline, objectTree } = await setUpView('first');
        Elements.PropertiesWidget.DEFAULT_VIEW({
            onFilterChanged: () => { },
            treeOutline,
            objectTree,
            allChildrenFiltered: false,
            onRegexToggled: function () {
                throw new Error('Function not implemented.');
            },
            isRegex: false
        }, {}, container);
        await assertScreenshot('elements/properties_widget_partial_filter.png');
    });
    it('renders the view with no filter matches', async () => {
        const { container, treeOutline, objectTree } = await setUpView('third');
        Elements.PropertiesWidget.DEFAULT_VIEW({
            onFilterChanged: () => { },
            treeOutline,
            objectTree,
            allChildrenFiltered: true,
            onRegexToggled: function () {
                throw new Error('Function not implemented.');
            },
            isRegex: false
        }, {}, container);
        await assertScreenshot('elements/properties_widget_no_matches.png');
    });
});
//# sourceMappingURL=PropertiesWidget.test.js.map