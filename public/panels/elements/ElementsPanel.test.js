// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as ComputedStyle from '../../models/computed_style/computed_style.js';
import { raf, renderElementIntoDOM, setTestUniverseForWidgets } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment, updateHostConfig, } from '../../testing/EnvironmentHelpers.js';
import { expectCall, expectCalled } from '../../testing/ExpectStubCall.js';
import { MockCDPConnection } from '../../testing/MockCDPConnection.js';
import { dispatchEvent } from '../../testing/MockConnection.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as SettingsUI from '../../ui/settings/settings.js';
import * as Elements from './elements.js';
describeWithEnvironment('ElementsPanel', () => {
    let target;
    let connection;
    let universe;
    beforeEach(() => {
        universe = new TestUniverse();
        setTestUniverseForWidgets(universe);
        sinon.stub(Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding, 'instance')
            .returns(universe.debuggerWorkspaceBinding);
        sinon.stub(Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding, 'instance').returns(universe.cssWorkspaceBinding);
        connection = new MockCDPConnection();
        target = createTarget({ connection });
        connection.setSuccessHandler('DOM.requestChildNodes', () => ({}));
        connection.setSuccessHandler('DOM.getDocument', () => ({
            root: {
                nodeId: 1,
                backendNodeId: 2,
                nodeType: Node.DOCUMENT_NODE,
                nodeName: '#document',
                childNodeCount: 1,
                children: [{
                        nodeId: 4,
                        parentId: 1,
                        backendNodeId: 5,
                        nodeType: Node.ELEMENT_NODE,
                        nodeName: 'HTML',
                        childNodeCount: 1,
                        children: [{
                                nodeId: 6,
                                parentId: 4,
                                backendNodeId: 7,
                                nodeType: Node.ELEMENT_NODE,
                                nodeName: 'BODY',
                                childNodeCount: 1,
                            }],
                    }],
            },
        }));
        connection.setSuccessHandler('DOM.copyTo', () => {
            dispatchEvent(target, 'DOM.childNodeInserted', {
                parentNodeId: 4,
                previousNodeId: 6,
                node: {
                    nodeId: 7,
                    parentId: 4,
                    backendNodeId: 8,
                    nodeType: Node.ELEMENT_NODE,
                    nodeName: 'BODY',
                    childNodeCount: 1,
                },
            });
            return { nodeId: 7 };
        });
    });
    afterEach(() => {
        UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
    });
    // Causes unit test execution to abort
    it('expands the tree even when target added later', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        await model.requestDocument();
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        renderElementIntoDOM(panel);
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const domTree = panel.getDOMTreeWidgetForTesting();
        assert.exists(domTree);
        const selectedNode = domTree.selectedDOMNode();
        assert.exists(selectedNode);
        assert.isTrue(domTree.isNodeExpanded(selectedNode));
        panel.detach();
    });
    // Causes unit test execution to abort
    it('restores the focused node after reload when it becomes available later', async () => {
        const clock = sinon.useFakeTimers();
        try {
            let includeDivInDocument = true;
            const documentResponse = (includeDiv) => ({
                root: {
                    nodeId: 1,
                    backendNodeId: 2,
                    nodeType: Node.DOCUMENT_NODE,
                    nodeName: '#document',
                    childNodeCount: 1,
                    children: [{
                            nodeId: 4,
                            parentId: 1,
                            backendNodeId: 5,
                            nodeType: Node.ELEMENT_NODE,
                            nodeName: 'HTML',
                            childNodeCount: 1,
                            children: [{
                                    nodeId: 6,
                                    parentId: 4,
                                    backendNodeId: 7,
                                    nodeType: Node.ELEMENT_NODE,
                                    nodeName: 'BODY',
                                    childNodeCount: includeDiv ? 1 : 0,
                                    children: includeDiv ? [{
                                            nodeId: 8,
                                            parentId: 6,
                                            backendNodeId: 9,
                                            nodeType: Node.ELEMENT_NODE,
                                            nodeName: 'DIV',
                                            childNodeCount: 0,
                                            attributes: ['id', 'target'],
                                        }] :
                                        [],
                                }],
                        }],
                },
            });
            connection.setHandler('DOM.getDocument', null);
            connection.setSuccessHandler('DOM.getDocument', () => documentResponse(includeDivInDocument));
            connection.setSuccessHandler('DOM.pushNodeByPathToFrontend', () => ({
                nodeId: 8,
            }));
            SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
            const model = target.model(SDK.DOMModel.DOMModel);
            assert.exists(model);
            const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
            panel.markAsRoot();
            renderElementIntoDOM(panel);
            await model.requestDocument();
            const inspectedDocument = model.existingDocument();
            assert.exists(inspectedDocument);
            const body = inspectedDocument.body;
            assert.exists(body);
            const bodyChildren = body.children();
            assert.exists(bodyChildren);
            const div = bodyChildren[0];
            assert.exists(div);
            panel.selectDOMNode(div, true);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'DIV');
            // Simulate a reload where the selected node appears later.
            includeDivInDocument = false;
            dispatchEvent(target, 'DOM.documentUpdated');
            // Wait for the new document to arrive.
            await model.requestDocument();
            await clock.tickAsync(0);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'BODY');
            // Insert the node later and let the retry logic pick it up.
            await clock.tickAsync(300);
            dispatchEvent(target, 'DOM.childNodeInserted', {
                parentNodeId: 6,
                previousNodeId: 0,
                node: {
                    nodeId: 8,
                    parentId: 6,
                    backendNodeId: 9,
                    nodeType: Node.ELEMENT_NODE,
                    nodeName: 'DIV',
                    childNodeCount: 0,
                    attributes: ['id', 'target'],
                },
            });
            await clock.tickAsync(600);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'DIV');
            panel.detach();
            // Ensure all pending tasks triggered via the fake timers have a chance to
            // complete before the test ends.
            await clock.runAllAsync();
        }
        finally {
            clock.restore();
        }
    });
    it('searches in in scope models', () => {
        const anotherTarget = createTarget({ connection });
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const inScopeModel = target.model(SDK.DOMModel.DOMModel);
        assert.exists(inScopeModel);
        const inScopeSearch = sinon.spy(inScopeModel, 'performSearch');
        const outOfScopeModel = anotherTarget.model(SDK.DOMModel.DOMModel);
        assert.exists(outOfScopeModel);
        const outOfScopeSearch = sinon.spy(outOfScopeModel, 'performSearch');
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.performSearch({ query: 'foo' }, false);
        sinon.assert.called(inScopeSearch);
        sinon.assert.notCalled(outOfScopeSearch);
        anotherTarget.dispose('test');
    });
    it('hides DOM node highlight on search canceled and when navigating search results', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const domModel = target.model(SDK.DOMModel.DOMModel);
        const node1 = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        const node2 = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        sinon.stub(domModel, 'performSearch').resolves(2);
        const searchResultStub = sinon.stub(domModel, 'searchResult');
        searchResultStub.withArgs(0).resolves(node1);
        searchResultStub.withArgs(1).resolves(node2);
        const hideStub = sinon.stub(SDK.OverlayModel.OverlayModel, 'hideDOMNodeHighlight');
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.performSearch({ query: 'div' }, true);
        await new Promise(resolve => setTimeout(resolve, 0));
        sinon.assert.calledOnce(node1.scrollIntoView);
        hideStub.resetHistory();
        panel.jumpToNextSearchResult();
        sinon.assert.calledWith(hideStub, SDK.TargetManager.TargetManager.instance());
        await new Promise(resolve => setTimeout(resolve, 0));
        sinon.assert.calledOnce(node2.scrollIntoView);
        hideStub.resetHistory();
        panel.onSearchCanceled();
        sinon.assert.calledWith(hideStub, SDK.TargetManager.TargetManager.instance());
        hideStub.restore();
    });
    // Causes unit test execution to abort
    it('deleting a node unhides it if it was hidden', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        await model.requestDocument();
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const domTree = panel.getDOMTreeWidgetForTesting();
        assert.exists(domTree);
        const selectedNode = domTree.selectedDOMNode();
        assert.exists(selectedNode);
        assert.isTrue(domTree.isNodeExpanded(selectedNode));
        assert.strictEqual(selectedNode.nodeName(), 'BODY');
        assert.isFalse(domTree.isToggledToHidden(selectedNode));
        const mockResolveToObject = sinon.mock().twice().returns({ callFunction: () => { }, release: () => { } });
        selectedNode.resolveToObject = mockResolveToObject;
        await domTree.toggleHideElement(selectedNode);
        assert.isTrue(domTree.isToggledToHidden(selectedNode));
        await domTree.removeNode(selectedNode);
        assert.isFalse(domTree.isToggledToHidden(selectedNode));
        panel.detach();
    });
    // Causes unit test execution to abort
    it('duplicating a hidden node results in a hidden copy', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        await model.requestDocument();
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const domTree = panel.getDOMTreeWidgetForTesting();
        assert.exists(domTree);
        const selectedNode = domTree.selectedDOMNode();
        assert.exists(selectedNode);
        assert.isTrue(domTree.isNodeExpanded(selectedNode));
        assert.strictEqual(selectedNode.nodeName(), 'BODY');
        assert.isFalse(domTree.isToggledToHidden(selectedNode));
        const mockResolveToObject = sinon.mock().twice().returns({ callFunction: () => { }, release: () => { } });
        selectedNode.resolveToObject = mockResolveToObject;
        // Mock out a few things in the UI that's not necessary for this test.
        const animateOnDOMUpdate = sinon.mock().atLeast(1).returns(undefined);
        Elements.ElementsTreeElement.ElementsTreeElement.animateOnDOMUpdate = animateOnDOMUpdate;
        const stylesSidebarPaneUpdate = sinon.mock().atLeast(1).returns(undefined);
        panel.stylesWidget.performUpdate = stylesSidebarPaneUpdate;
        await domTree.toggleHideElement(selectedNode);
        assert.isTrue(domTree.isToggledToHidden(selectedNode));
        domTree.duplicateNode(selectedNode);
        await raf();
        const copiedNode = selectedNode.nextSibling;
        assert.exists(copiedNode);
        assert.strictEqual(copiedNode.nodeName(), 'BODY');
        assert.isTrue(copiedNode !== null && domTree.isToggledToHidden(copiedNode));
        domTree.runPendingUpdates();
        panel.detach();
    });
    it('updates elements tree after bfcache navigation', async () => {
        SDK.TargetManager.TargetManager.instance().setScopeTarget(null);
        const model = target.model(SDK.DOMModel.DOMModel);
        assert.exists(model);
        const page1Document = {
            root: {
                nodeId: 1,
                backendNodeId: 2,
                nodeType: Node.DOCUMENT_NODE,
                nodeName: '#document',
                childNodeCount: 1,
                children: [{
                        nodeId: 4,
                        parentId: 1,
                        backendNodeId: 5,
                        nodeType: Node.ELEMENT_NODE,
                        nodeName: 'HTML',
                        childNodeCount: 1,
                        children: [{
                                nodeId: 6,
                                parentId: 4,
                                backendNodeId: 7,
                                nodeType: Node.ELEMENT_NODE,
                                nodeName: 'BODY',
                                childNodeCount: 1,
                                children: [{
                                        nodeId: 8,
                                        parentId: 6,
                                        backendNodeId: 9,
                                        nodeType: Node.ELEMENT_NODE,
                                        nodeName: 'DIV',
                                        childNodeCount: 0,
                                        attributes: ['id', 'page1'],
                                    }],
                            }],
                    }],
            },
        };
        const page2Document = {
            root: {
                nodeId: 11,
                backendNodeId: 12,
                nodeType: Node.DOCUMENT_NODE,
                nodeName: '#document',
                childNodeCount: 1,
                children: [{
                        nodeId: 14,
                        parentId: 11,
                        backendNodeId: 15,
                        nodeType: Node.ELEMENT_NODE,
                        nodeName: 'HTML',
                        childNodeCount: 1,
                        children: [{
                                nodeId: 16,
                                parentId: 14,
                                backendNodeId: 17,
                                nodeType: Node.ELEMENT_NODE,
                                nodeName: 'BODY',
                                childNodeCount: 1,
                                children: [{
                                        nodeId: 18,
                                        parentId: 16,
                                        backendNodeId: 19,
                                        nodeType: Node.ELEMENT_NODE,
                                        nodeName: 'DIV',
                                        childNodeCount: 0,
                                        attributes: ['id', 'page2'],
                                    }],
                            }],
                    }],
            },
        };
        let currentDocument = page1Document;
        connection.setHandler('DOM.getDocument', null);
        connection.setSuccessHandler('DOM.getDocument', () => currentDocument);
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        await model.requestDocument();
        const domTree = panel.getDOMTreeWidgetForTesting();
        assert.exists(domTree);
        // Verify Page 1 is loaded
        assert.strictEqual(domTree.rootDOMNode?.nodeName(), '#document');
        const doc1 = domTree.rootDOMNode;
        const body = doc1?.body;
        assert.exists(body);
        const children1 = body.children();
        assert.exists(children1);
        assert.strictEqual(children1[0].getAttribute('id'), 'page1');
        // Simulate navigation to Page 2
        currentDocument = page2Document;
        dispatchEvent(target, 'DOM.documentUpdated');
        await model.requestDocument();
        // Verify Page 2 is loaded
        const doc2 = domTree.rootDOMNode;
        assert.exists(doc2?.body);
        const children2 = doc2.body.children();
        assert.exists(children2);
        assert.strictEqual(children2[0].getAttribute('id'), 'page2');
        // Simulate BFCache navigation back to Page 1
        currentDocument = page1Document;
        dispatchEvent(target, 'DOM.documentUpdated');
        await model.requestDocument();
        // Verify Page 1 is restored
        const doc3 = domTree.rootDOMNode;
        assert.exists(doc3?.body);
        const children3 = doc3.body.children();
        assert.exists(children3);
        assert.strictEqual(children3[0].getAttribute('id'), 'page1');
        panel.detach();
    });
    describe('tracking and updating Computed styles', () => {
        const StylesSidebarPane = Elements.StylesSidebarPane.StylesSidebarPane;
        const ComputedStyleModel = ComputedStyle.ComputedStyleModel.ComputedStyleModel;
        const ComputedStyleWidget = Elements.ComputedStyleWidget.ComputedStyleWidget;
        let computedStyleNodeSpy;
        let computedStyleFetchStylesSpy;
        let computedStyleFetchCascadeSpy;
        let panel;
        let node;
        let cssModel;
        let computedStylesShowingStub;
        beforeEach(() => {
            computedStylesShowingStub = sinon.stub(ComputedStyleWidget.prototype, 'isShowing');
            computedStyleFetchStylesSpy = sinon.stub(ComputedStyleModel.prototype, 'fetchComputedStyle').resolves(null);
            computedStyleFetchCascadeSpy = sinon.stub(ComputedStyleModel.prototype, 'fetchMatchedCascade').resolves(null);
            Common.Debouncer.enableTestOverride();
            const viewManager = UI.ViewManager.ViewManager.instance({ forceNew: true });
            sinon.stub(viewManager, 'showView');
            panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
            computedStyleNodeSpy = sinon.spy(panel.stylesWidget.computedStyleModel(), 'node', ['get', 'set']);
            cssModel = sinon.createStubInstance(SDK.CSSModel.CSSModel, {
                target: sinon.createStubInstance(SDK.Target.Target, {
                    model: null,
                }),
            });
            const domModel = sinon.createStubInstance(SDK.DOMModel.DOMModel, {
                cssModel,
            });
            node = sinon.createStubInstance(SDK.DOMModel.DOMNode, {
                domModel,
            });
            node.id = 1;
        });
        afterEach(() => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, null);
            UI.Context.Context.instance().setFlavor(StylesSidebarPane, null);
            Common.Debouncer.disableTestOverride();
            panel.detach();
        });
        it('updates the model when the selected DOM node changes', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            sinon.assert.calledOnceWithExactly(computedStyleNodeSpy.set, node);
        });
        it('fetches the styles from the computed style model when the dom node changes', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            await expectCalled(computedStyleFetchStylesSpy);
            await expectCalled(computedStyleFetchCascadeSpy);
        });
        it('enables tracking when the ComputedStyleWidget is shown', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            computedStylesShowingStub.callsFake(() => true);
            panel.selectAndShowSidebarTab("computed" /* Elements.ElementsPanel.SidebarPaneTabId.COMPUTED */);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, node.id);
        });
        it('stops tracking when the ComputedStyleWidget is removed', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            computedStylesShowingStub.callsFake(() => true);
            panel.selectAndShowSidebarTab("computed" /* Elements.ElementsPanel.SidebarPaneTabId.COMPUTED */);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, node.id);
            cssModel.trackComputedStyleUpdatesForNode.resetHistory();
            computedStylesShowingStub.callsFake(() => false);
            panel.selectAndShowSidebarTab("styles" /* Elements.ElementsPanel.SidebarPaneTabId.STYLES */);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, undefined);
        });
        it('enables tracking with a StylesSidebarPane and the DevToolsAnimationStylesInStylesTab experiment is enabled', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            updateHostConfig({
                devToolsAnimationStylesInStylesTab: {
                    enabled: true,
                },
            });
            const stylesSidebarPane = sinon.createStubInstance(StylesSidebarPane);
            UI.Context.Context.instance().setFlavor(StylesSidebarPane, stylesSidebarPane);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, node.id);
        });
        it('stops tracking when the StylesSidebarPane is removed', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            updateHostConfig({
                devToolsAnimationStylesInStylesTab: {
                    enabled: true,
                },
            });
            const stylesSidebarPane = sinon.createStubInstance(StylesSidebarPane);
            UI.Context.Context.instance().setFlavor(StylesSidebarPane, stylesSidebarPane);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, node.id);
            cssModel.trackComputedStyleUpdatesForNode.resetHistory();
            UI.Context.Context.instance().setFlavor(StylesSidebarPane, null);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, undefined);
        });
        it('does not enabled tracking with a StylesSidebarPane but the DevToolsAnimationStylesInStylesTab experiment is disabled', async () => {
            UI.Context.Context.instance().setFlavor(SDK.DOMModel.DOMNode, node);
            updateHostConfig({
                devToolsAnimationStylesInStylesTab: {
                    enabled: false,
                },
            });
            const stylesSidebarPane = sinon.createStubInstance(StylesSidebarPane);
            UI.Context.Context.instance().setFlavor(StylesSidebarPane, stylesSidebarPane);
            await expectCall(cssModel.trackComputedStyleUpdatesForNode);
            sinon.assert.calledOnceWithExactly(cssModel.trackComputedStyleUpdatesForNode, undefined);
        });
    });
    function makeElementNode(nodeId, nodeName, extra = {}) {
        return {
            nodeId: nodeId,
            parentId: 6,
            backendNodeId: (nodeId + 100),
            nodeType: Node.ELEMENT_NODE,
            nodeName,
            childNodeCount: extra.children?.length ?? 0,
            ...extra,
        };
    }
    function createDocumentResponse(bodyChildren, frameId) {
        return {
            root: {
                nodeId: 1,
                backendNodeId: 2,
                nodeType: Node.DOCUMENT_NODE,
                nodeName: '#document',
                frameId,
                childNodeCount: 1,
                children: [makeElementNode(4, 'HTML', {
                        parentId: 1,
                        children: [makeElementNode(6, 'BODY', { parentId: 4, children: bodyChildren })],
                    })],
            },
        };
    }
    it('restores selected node path when node resolves asynchronously after document update', async () => {
        const clock = sinon.useFakeTimers();
        try {
            let nodeResolved = true;
            const requestedPaths = [];
            const asyncSpanNode = makeElementNode(9, 'SPAN', { attributes: ['id', 'async-node'] });
            connection.setHandler('DOM.getDocument', null);
            connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse(nodeResolved ? [asyncSpanNode] : []));
            connection.setSuccessHandler('DOM.pushNodeByPathToFrontend', params => {
                requestedPaths.push(params.path);
                return { nodeId: (nodeResolved ? 9 : 0) };
            });
            SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
            const model = target.model(SDK.DOMModel.DOMModel);
            const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
            panel.markAsRoot();
            renderElementIntoDOM(panel);
            await model.requestDocument();
            const span = model.existingDocument().body.children()[0];
            panel.selectDOMNode(span, true);
            assert.strictEqual(panel.selectedDOMNode(), span);
            // Simulate document update where the node is not yet present on the first restoration check.
            nodeResolved = false;
            dispatchEvent(target, 'DOM.documentUpdated');
            await model.requestDocument();
            await clock.tickAsync(0);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'BODY');
            // Resolve the node asynchronously before the retry timer fires.
            nodeResolved = true;
            dispatchEvent(target, 'DOM.childNodeInserted', {
                parentNodeId: 6,
                previousNodeId: 0,
                node: asyncSpanNode,
            });
            await clock.tickAsync(300);
            assert.strictEqual(panel.selectedDOMNode()?.getAttribute('id'), 'async-node');
            assert.include(requestedPaths, '0,HTML,0,BODY,0,SPAN');
            panel.detach();
            await clock.runAllAsync();
        }
        finally {
            clock.restore();
        }
    });
    it('selects parent element when revealing a whitespace-only text node', async () => {
        connection.setHandler('DOM.getDocument', null);
        connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse([
            makeElementNode(8, 'DIV', {
                children: [makeElementNode(10, '#text', {
                        parentId: 8,
                        nodeType: Node.TEXT_NODE,
                        nodeValue: '   \n   ',
                    })],
            }),
        ]));
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const model = target.model(SDK.DOMModel.DOMModel);
        await model.requestDocument();
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        const parentDiv = model.nodeForId(8);
        const whitespaceTextNode = model.nodeForId(10);
        await panel.revealAndSelectNode(whitespaceTextNode, { showPanel: false, highlightInOverlay: false });
        assert.strictEqual(panel.selectedDOMNode(), parentDiv);
        panel.detach();
    });
    it('updates execution context flavor to match the selected DOMNode frame', async () => {
        const mainFrameId = 'main-frame';
        const childFrameId = 'child-frame';
        for (const [id, frameId] of [[101, mainFrameId], [102, childFrameId]]) {
            dispatchEvent(target, 'Runtime.executionContextCreated', {
                context: {
                    id: id,
                    origin: 'http://example.com',
                    name: String(frameId),
                    uniqueId: `ctx-${id}`,
                    auxData: { frameId, isDefault: true },
                },
            });
        }
        connection.setHandler('DOM.getDocument', null);
        connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse([makeElementNode(8, 'DIV', { frameId: childFrameId })], mainFrameId));
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        const model = target.model(SDK.DOMModel.DOMModel);
        await model.requestDocument();
        const mainNode = model.nodeForId(6);
        const childNode = model.nodeForId(8);
        sinon.stub(mainNode, 'frameId').returns(mainFrameId);
        sinon.stub(childNode, 'frameId').returns(childFrameId);
        panel.selectDOMNode(mainNode, true);
        assert.strictEqual(UI.Context.Context.instance().flavor(SDK.RuntimeModel.ExecutionContext)?.frameId, mainFrameId);
        panel.selectDOMNode(childNode, true);
        assert.strictEqual(UI.Context.Context.instance().flavor(SDK.RuntimeModel.ExecutionContext)?.frameId, childFrameId);
        panel.detach();
    });
    it('maps iframe owner elements to the parent frame context and content documents to the child frame context', async () => {
        // Mirrors legacy elements/selected-element-changes-execution-context, without stubbing frameId().
        const mainFrameId = 'main-frame';
        const childFrameId = 'child-frame';
        for (const [id, frameId] of [[101, mainFrameId], [102, childFrameId]]) {
            dispatchEvent(target, 'Runtime.executionContextCreated', {
                context: {
                    id: id,
                    origin: 'http://example.com',
                    name: String(frameId),
                    uniqueId: `ctx-${id}`,
                    auxData: { frameId, isDefault: true },
                },
            });
        }
        const contentDocument = {
            nodeId: 20,
            backendNodeId: 120,
            nodeType: Node.DOCUMENT_NODE,
            nodeName: '#document',
            childNodeCount: 1,
            children: [makeElementNode(21, 'HTML', {
                    parentId: 20,
                    children: [makeElementNode(22, 'HEAD', { parentId: 21, attributes: ['id', 'head'] })],
                })],
        };
        connection.setHandler('DOM.getDocument', null);
        connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse([
            makeElementNode(8, 'IFRAME', { attributes: ['id', 'iframe-per-se'], frameId: childFrameId, contentDocument }),
            makeElementNode(9, 'DIV', { attributes: ['id', 'element'] }),
        ], mainFrameId));
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        const model = target.model(SDK.DOMModel.DOMModel);
        await model.requestDocument();
        const iframeNode = model.nodeForId(8);
        const mainDiv = model.nodeForId(9);
        const iframeDocument = iframeNode.contentDocument();
        const iframeHead = model.nodeForId(22);
        assert.strictEqual(iframeDocument.id, 20);
        const selectAndGetContextFrameId = (node) => {
            panel.selectDOMNode(node, true);
            const context = UI.Context.Context.instance().flavor(SDK.RuntimeModel.ExecutionContext);
            assert.exists(context);
            // The selected context always matches the selected node's frame.
            assert.strictEqual(context.frameId, node.frameId());
            return context.frameId;
        };
        assert.strictEqual(selectAndGetContextFrameId(iframeHead), childFrameId);
        assert.strictEqual(selectAndGetContextFrameId(mainDiv), mainFrameId);
        // The <iframe> owner element itself lives in the main frame...
        assert.strictEqual(selectAndGetContextFrameId(iframeNode), mainFrameId);
        // ...while its content document belongs to the child frame.
        assert.strictEqual(selectAndGetContextFrameId(iframeDocument), childFrameId);
        panel.detach();
    });
    it('selects body after all restoration retries fail and restores the node on a later document update', async () => {
        // Mirrors legacy elements/elements-panel-restore-selection-when-node-comes-later.
        const clock = sinon.useFakeTimers();
        try {
            let nodeInDOM = true;
            const requestedPaths = [];
            const spanNode = makeElementNode(9, 'SPAN', { attributes: ['id', 'inspected'] });
            connection.setHandler('DOM.getDocument', null);
            connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse(nodeInDOM ? [spanNode] : []));
            connection.setSuccessHandler('DOM.pushNodeByPathToFrontend', params => {
                requestedPaths.push(params.path);
                return { nodeId: (nodeInDOM ? 9 : 0) };
            });
            SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
            const model = target.model(SDK.DOMModel.DOMModel);
            const panel = Elements.ElementsPanel.ElementsPanel.instance({ forceNew: true });
            panel.markAsRoot();
            renderElementIntoDOM(panel);
            await model.requestDocument();
            panel.selectDOMNode(model.existingDocument().body.children()[0], true);
            assert.strictEqual(panel.selectedDOMNode()?.getAttribute('id'), 'inspected');
            // First reload: the node never shows up, so every retry fails.
            nodeInDOM = false;
            dispatchEvent(target, 'DOM.documentUpdated');
            await model.requestDocument();
            await clock.tickAsync(0);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'BODY');
            await clock.tickAsync(5000);
            assert.strictEqual(panel.selectedDOMNode()?.nodeName(), 'BODY');
            assert.deepEqual(requestedPaths, Array(5).fill('0,HTML,0,BODY,0,SPAN'));
            // Second reload: the node is present and gets restored.
            requestedPaths.length = 0;
            nodeInDOM = true;
            dispatchEvent(target, 'DOM.documentUpdated');
            await model.requestDocument();
            await clock.tickAsync(0);
            assert.strictEqual(panel.selectedDOMNode()?.getAttribute('id'), 'inspected');
            assert.deepEqual(requestedPaths, ['0,HTML,0,BODY,0,SPAN']);
            panel.detach();
            await clock.runAllAsync();
        }
        finally {
            clock.restore();
        }
    });
    it('reveals host or user-agent shadow node depending on show-ua-shadow-dom setting', async () => {
        connection.setHandler('DOM.getDocument', null);
        connection.setSuccessHandler('DOM.getDocument', () => createDocumentResponse([
            makeElementNode(8, 'INPUT', {
                shadowRoots: [makeElementNode(10, '#document-fragment', {
                        parentId: 8,
                        nodeType: Node.DOCUMENT_FRAGMENT_NODE,
                        shadowRootType: 'user-agent',
                        children: [makeElementNode(12, 'DIV', { parentId: 10, attributes: ['id', 'ua-inner'] })],
                    })],
            }),
        ]));
        SDK.TargetManager.TargetManager.instance().setScopeTarget(target);
        const panel = new Elements.ElementsPanel.ElementsPanel(SDK.TargetManager.TargetManager.instance(), universe.settings);
        panel.markAsRoot();
        renderElementIntoDOM(panel);
        const model = target.model(SDK.DOMModel.DOMModel);
        await model.requestDocument();
        const hostInput = model.nodeForId(8);
        const uaShadowRoot = hostInput.shadowRoots()[0];
        const uaInnerDiv = uaShadowRoot.children()[0];
        sinon.stub(uaInnerDiv, 'ancestorUserAgentShadowRoot').returns(uaShadowRoot);
        const showUASetting = universe.settings.resolve(SettingsUI.ElementsSettings.showUAShadowDOMSettingDescriptor);
        const selectStub = sinon.stub(panel, 'selectDOMNode');
        showUASetting.set(false);
        selectStub.resetHistory();
        await panel.revealAndSelectNode(uaInnerDiv, { showPanel: false, highlightInOverlay: false });
        assert.strictEqual(selectStub.lastCall.args[0].id, hostInput.id);
        showUASetting.set(true);
        selectStub.resetHistory();
        await panel.revealAndSelectNode(uaInnerDiv, { showPanel: false, highlightInOverlay: false });
        assert.strictEqual(selectStub.lastCall.args[0].id, uaInnerDiv.id);
        panel.detach();
    });
});
//# sourceMappingURL=ElementsPanel.test.js.map