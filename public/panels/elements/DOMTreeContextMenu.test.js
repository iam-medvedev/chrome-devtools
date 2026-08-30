// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Elements from './elements.js';
describeWithEnvironment('DOMTreeContextMenu', () => {
    let target;
    let domModel;
    beforeEach(() => {
        const actionRegistry = UI.ActionRegistry.ActionRegistry.instance({ forceNew: true });
        UI.ShortcutRegistry.ShortcutRegistry.instance({ forceNew: true, actionRegistry });
        target = createTarget();
        domModel = target.model(SDK.DOMModel.DOMModel);
    });
    function createTestNode() {
        const node = new SDK.DOMModel.DOMNode(domModel);
        sinon.stub(node, 'nodeType').returns(Node.ELEMENT_NODE);
        sinon.stub(node, 'nodeNameInCorrectCase').returns('div');
        sinon.stub(node, 'nodeName').returns('DIV');
        sinon.stub(node, 'id').value(1);
        return node;
    }
    function createContextMenuEvent() {
        const element = document.createElement('div');
        const event = new MouseEvent('contextmenu');
        Object.defineProperty(event, 'target', { value: element });
        return event;
    }
    function getFlatLabels(items) {
        const labels = [];
        if (!items) {
            return labels;
        }
        for (const item of items) {
            if (item.label) {
                labels.push(item.label);
            }
            if (item.subItems) {
                labels.push(...getFlatLabels(item.subItems));
            }
        }
        return labels;
    }
    function findItem(items, label) {
        if (!items) {
            return undefined;
        }
        for (const item of items) {
            if (item.label === label) {
                return item;
            }
            if (item.subItems) {
                const found = findItem(item.subItems, label);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    }
    for (const viewName of ['DECLARATIVE_VIEW', 'DEFAULT_VIEW']) {
        const getView = () => viewName === 'DECLARATIVE_VIEW' ? Elements.ElementsTreeOutline.DECLARATIVE_VIEW :
            Elements.ElementsTreeOutline.DEFAULT_VIEW;
        describe(viewName, () => {
            it('populates context menu with standard actions for element nodes', async () => {
                const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, getView());
                try {
                    const node = createTestNode();
                    const event = createContextMenuEvent();
                    const contextMenu = await domTree.showContextMenu(node, event);
                    assert.exists(contextMenu);
                    const descriptor = contextMenu.buildDescriptor();
                    const labels = getFlatLabels(descriptor.subItems);
                    assert.include(labels, 'Cut');
                    assert.include(labels, 'Copy');
                    assert.include(labels, 'Hide element');
                    assert.include(labels, 'Delete element');
                    assert.include(labels, 'Scroll into view');
                    assert.include(labels, 'Focus');
                }
                finally {
                    domTree.detach();
                }
            });
            it('does not show context menu when enableContextMenu is false', async () => {
                const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, getView());
                try {
                    domTree.enableContextMenu = false;
                    const node = createTestNode();
                    const event = createContextMenuEvent();
                    const contextMenu = await domTree.showContextMenu(node, event);
                    assert.isUndefined(contextMenu);
                }
                finally {
                    domTree.detach();
                }
            });
            it('triggers performCopyOrCut, toggleHideElement, and removeNode from context menu actions', async () => {
                const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, getView());
                try {
                    const node = createTestNode();
                    const copyOrCutSpy = sinon.spy(domTree, 'performCopyOrCut');
                    const hideSpy = sinon.spy(domTree, 'toggleHideElement');
                    const removeSpy = sinon.spy(domTree, 'removeNode');
                    const event = createContextMenuEvent();
                    const contextMenu = await domTree.showContextMenu(node, event);
                    assert.exists(contextMenu);
                    const descriptor = contextMenu.buildDescriptor();
                    // Trigger cut
                    const cutItem = findItem(descriptor.subItems, 'Cut');
                    assert.exists(cutItem);
                    assert.exists(cutItem.id);
                    contextMenu.invokeHandler(cutItem.id);
                    sinon.assert.calledWith(copyOrCutSpy, true, node);
                    // Trigger hide
                    const hideItem = findItem(descriptor.subItems, 'Hide element');
                    assert.exists(hideItem);
                    assert.exists(hideItem.id);
                    contextMenu.invokeHandler(hideItem.id);
                    sinon.assert.calledWith(hideSpy, node);
                    // Trigger delete
                    const deleteItem = findItem(descriptor.subItems, 'Delete element');
                    assert.exists(deleteItem);
                    assert.exists(deleteItem.id);
                    contextMenu.invokeHandler(deleteItem.id);
                    sinon.assert.calledWith(removeSpy, node);
                }
                finally {
                    domTree.detach();
                }
            });
            it('triggers expandRecursively and collapseChildren on DOMTreeWidget', async () => {
                const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, getView());
                try {
                    const node = createTestNode();
                    const expandSpy = sinon.spy(domTree, 'expandRecursively');
                    const collapseSpy = sinon.spy(domTree, 'collapseChildren');
                    const event = createContextMenuEvent();
                    const contextMenu = await domTree.showContextMenu(node, event);
                    assert.exists(contextMenu);
                    const descriptor = contextMenu.buildDescriptor();
                    const expandItem = findItem(descriptor.subItems, 'Expand recursively');
                    assert.exists(expandItem);
                    assert.exists(expandItem.id);
                    contextMenu.invokeHandler(expandItem.id);
                    sinon.assert.calledWith(expandSpy, node);
                    const collapseItem = findItem(descriptor.subItems, 'Collapse children');
                    assert.exists(collapseItem);
                    assert.exists(collapseItem.id);
                    contextMenu.invokeHandler(collapseItem.id);
                    sinon.assert.calledWith(collapseSpy, node);
                }
                finally {
                    domTree.detach();
                }
            });
            it('redirects addAttribute to start tag widget when invoked on closing tag', async () => {
                const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, getView());
                try {
                    const node = createTestNode();
                    const startTagWidget = {
                        isClosingTag: false,
                        addNewAttribute: sinon.spy(),
                    };
                    const closingTagWidget = {
                        isClosingTag: true,
                        findStartTagWidget: () => startTagWidget,
                        addNewAttribute: sinon.spy(),
                    };
                    const event = createContextMenuEvent();
                    const contextMenu = await domTree.showContextMenu(node, event, closingTagWidget);
                    assert.exists(contextMenu);
                    const descriptor = contextMenu.buildDescriptor();
                    const addItem = findItem(descriptor.subItems, 'Add attribute');
                    assert.exists(addItem);
                    assert.exists(addItem.id);
                    contextMenu.invokeHandler(addItem.id);
                    sinon.assert.calledOnce(startTagWidget.addNewAttribute);
                    sinon.assert.notCalled(closingTagWidget.addNewAttribute);
                }
                finally {
                    domTree.detach();
                }
            });
        });
    }
    it('declarative expandRecursively calls getSubtree on the node', async () => {
        const domTree = new Elements.ElementsTreeOutline.DOMTreeWidget(undefined, Elements.ElementsTreeOutline.DECLARATIVE_VIEW);
        try {
            const node = createTestNode();
            const getSubtreeStub = sinon.stub(node, 'getSubtree').resolves(null);
            await domTree.expandRecursively(node);
            sinon.assert.calledWith(getSubtreeStub, 100, true);
        }
        finally {
            domTree.detach();
        }
    });
});
//# sourceMappingURL=DOMTreeContextMenu.test.js.map