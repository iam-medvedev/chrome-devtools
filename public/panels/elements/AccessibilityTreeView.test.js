// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import { assertScreenshot, renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment, stubNoopSettings } from '../../testing/EnvironmentHelpers.js';
import * as TreeOutline from '../../ui/components/tree_outline/tree_outline.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Elements from './elements.js';
const MAIN_FRAME_ID = 'MAIN_FRAME_ID';
describeWithEnvironment('AccessibilityTreeView', () => {
    let target;
    let treeComponent;
    beforeEach(() => {
        stubNoopSettings();
        target = createTarget();
        treeComponent = new TreeOutline.TreeOutline.TreeOutline();
    });
    const updatesUiOnEvent = (inScope) => async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(inScope ? target : null);
        const view = new Elements.AccessibilityTreeView.AccessibilityTreeView(treeComponent);
        renderElementIntoDOM(view);
        const model = target.model(SDK.AccessibilityModel.AccessibilityModel);
        assert.exists(model);
        const treeComponentDataSet = sinon.spy(treeComponent, 'data', ['set']);
        sinon.stub(SDK.FrameManager.FrameManager.instance(), 'getOutermostFrame').returns({
            id: MAIN_FRAME_ID,
        });
        const rootPayload = {
            nodeId: 'root-id',
            ignored: false,
            role: { type: 'role', value: 'document' },
            name: { type: 'computedString', value: 'Root Node' },
            frameId: MAIN_FRAME_ID,
        };
        model.loadComplete({ root: rootPayload });
        await new Promise(resolve => queueMicrotask(resolve));
        assert.strictEqual(treeComponentDataSet.set.called, inScope);
        view.detach();
    };
    it('updates UI on in scope update event', updatesUiOnEvent(true));
    it('does not update UI on out of scope update event', updatesUiOnEvent(false));
    describe('copying nodes', function () {
        it('copies selected node on context menu copy action', async () => {
            const view = new Elements.AccessibilityTreeView.AccessibilityTreeView(treeComponent);
            renderElementIntoDOM(view);
            const axNode = {
                id: () => '1',
                getFrameId: () => 'frame1',
                role: () => ({ value: 'heading' }),
                name: () => ({ value: 'Title' }),
                properties: () => [],
                ignored: () => false,
                isDOMNode: () => false,
                accessibilityModel: () => ({
                    requestAXChildren: async () => [],
                }),
                getChildren: SDK.AccessibilityModel.AccessibilityNode.prototype.getChildren,
                axNodeToText: SDK.AccessibilityModel.AccessibilityNode.prototype.axNodeToText,
            };
            treeComponent.dispatchEvent(new TreeOutline.TreeOutline.ItemSelectedEvent({
                treeNodeData: axNode,
                id: '1',
            }));
            const event = new MouseEvent('contextmenu', { bubbles: true });
            const customEvent = new TreeOutline.TreeOutline.ItemContextMenuEvent({ treeNodeData: axNode, id: '1' }, event);
            const showStub = sinon.stub(UI.ContextMenu.ContextMenu.prototype, 'show').resolves();
            treeComponent.dispatchEvent(customEvent);
            sinon.assert.called(showStub);
            view.detach();
        });
        it('copies selected node on copy event', async () => {
            const view = new Elements.AccessibilityTreeView.AccessibilityTreeView(treeComponent);
            renderElementIntoDOM(view);
            const axNode = {
                id: () => '1',
                getFrameId: () => 'frame1',
                role: () => ({ value: 'heading' }),
                name: () => ({ value: 'Title' }),
                properties: () => [],
                ignored: () => false,
                isDOMNode: () => false,
                accessibilityModel: () => ({
                    requestAXChildren: async () => [],
                }),
                getChildren: SDK.AccessibilityModel.AccessibilityNode.prototype.getChildren,
                axNodeToText: SDK.AccessibilityModel.AccessibilityNode.prototype.axNodeToText,
            };
            treeComponent.dispatchEvent(new TreeOutline.TreeOutline.ItemSelectedEvent({
                treeNodeData: axNode,
                id: '1',
            }));
            const copyStub = sinon.stub(Host.InspectorFrontendHost.InspectorFrontendHostInstance, 'copyText');
            const event = new Event('copy', { bubbles: true });
            view.contentElement.dispatchEvent(event);
            await new Promise(resolve => setTimeout(resolve, 50));
            sinon.assert.calledWith(copyStub, 'heading "Title"\n');
            copyStub.restore();
            view.detach();
        });
    });
    it('renders the accessibility tree screenshot', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const view = new Elements.AccessibilityTreeView.AccessibilityTreeView(treeComponent);
        const refreshSpy = sinon.spy(view, 'refreshAccessibilityTree');
        const model = target.model(SDK.AccessibilityModel.AccessibilityModel);
        assert.exists(model);
        sinon.stub(SDK.FrameManager.FrameManager.instance(), 'getOutermostFrame').returns({
            id: MAIN_FRAME_ID,
        });
        const rootPayload = {
            nodeId: 'root-id',
            ignored: false,
            role: { type: 'role', value: 'document' },
            name: { type: 'computedString', value: 'Root Node' },
            childIds: ['child-id'],
            frameId: MAIN_FRAME_ID,
        };
        const childPayload = {
            nodeId: 'child-id',
            ignored: false,
            role: { type: 'role', value: 'button' },
            name: { type: 'computedString', value: 'Child Node' },
            parentId: 'root-id',
        };
        sinon.stub(model.agent, 'invoke_getChildAXNodes').resolves({
            nodes: [childPayload],
            getError: () => undefined,
        });
        model.loadComplete({ root: rootPayload });
        renderElementIntoDOM(view, { includeCommonStyles: true });
        assert.exists(refreshSpy.firstCall);
        await refreshSpy.firstCall.returnValue;
        view.element.style.width = '300px';
        view.element.style.height = '100px';
        await assertScreenshot('elements/accessibility_tree_view.png');
        view.detach();
    });
});
//# sourceMappingURL=AccessibilityTreeView.test.js.map