// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as CommentManager from './comment_manager.js';
describe('CD4ABridge', () => {
    let commentManager;
    beforeEach(() => {
        commentManager = new CommentManager.CommentManager.CommentManager();
    });
    it('formats comment threads with anchor text, DOM node selector, and editor info', () => {
        const mockNode = {
            backendNodeId: () => 10,
            simpleSelector: () => 'div.card#main',
        };
        const mockDomModel = {
            idToDOMNode: new Map([[1, mockNode]]),
        };
        const mockTarget = {
            model: sinon.stub().withArgs(SDK.DOMModel.DOMModel).returns(mockDomModel),
        };
        const mockTargetManager = {
            targetById: sinon.stub().withArgs('target-1').returns(mockTarget),
            primaryPageTarget: () => null,
        };
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, mockTargetManager);
        const thread = commentManager.createCommentThread({
            vePath: 'Panel: elements > Pane: styles',
            textSignature: 'color: red',
            networkRequestId: 'req-1',
            node: {
                backendNodeId: 10,
                targetId: 'target-1',
            },
            editor: {
                filePath: 'index.html',
                lineNumber: 42,
            },
        }, 'Need color contrast fix', 'DEVELOPER');
        thread.save();
        // Saved (ACTIVE) threads are not exposed over the bridge until sent to agent
        assert.isEmpty(bridge.getCommentThreads());
        thread.sendToAgent();
        const threads = bridge.getCommentThreads();
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads[0].id, thread.id);
        assert.strictEqual(threads[0].text, 'Need color contrast fix\n\n- DevTools VEPath: Panel: elements > Pane: styles\n- DevTools element: color: red\n- DOM node selector: div.card#main\n- Editor: index.html:42');
        assert.strictEqual(threads[0].networkRequestId, 'req-1');
        assert.deepEqual(threads[0].node, {
            backendNodeId: 10,
            targetId: 'target-1',
        });
        assert.isUndefined(threads[0].editor);
        assert.isUndefined(threads[0].backendNodeId);
        // Second retrieval returns empty array as unsent comments were taken
        const threadsAfter = bridge.getCommentThreads();
        assert.lengthOf(threadsAfter, 0);
    });
    it('formats editor without filePath and handles missing DOM node gracefully', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        const thread = commentManager.createCommentThread({
            vePath: 'Panel: sources',
            textSignature: 'const x = 1;',
            node: {
                backendNodeId: 99,
                targetId: 'target-1',
            },
            editor: {
                lineNumber: 15,
            },
        }, 'Check variable');
        thread.sendToAgent();
        const threads = bridge.getCommentThreads();
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads[0].text, 'Check variable\n\n- DevTools VEPath: Panel: sources\n- DevTools element: const x = 1;\n- Editor: line 15');
        assert.deepEqual(threads[0].node, {
            backendNodeId: 99,
            targetId: 'target-1',
        });
    });
    it('does not format comment with unrelated node when target is missing', () => {
        const mockPrimaryNode = {
            backendNodeId: () => 10,
            simpleSelector: () => 'div.unrelated',
        };
        const mockPrimaryDomModel = {
            idToDOMNode: new Map([[10, mockPrimaryNode]]),
        };
        const mockPrimaryTarget = {
            model: sinon.stub().withArgs(SDK.DOMModel.DOMModel).returns(mockPrimaryDomModel),
        };
        const mockTargetManager = {
            targetById: sinon.stub().withArgs('destroyed-target').returns(null),
            primaryPageTarget: () => mockPrimaryTarget,
        };
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, mockTargetManager);
        const thread = commentManager.createCommentThread({
            vePath: 'Panel: elements',
            textSignature: 'color: red',
            node: {
                backendNodeId: 10,
                targetId: 'destroyed-target',
            },
        }, 'Missing target comment', 'DEVELOPER');
        thread.sendToAgent();
        const threads = bridge.getCommentThreads();
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads[0].text, 'Missing target comment\n\n- DevTools VEPath: Panel: elements\n- DevTools element: color: red');
    });
    it('only takes the first comment text', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        const thread = commentManager.createCommentThread({
            vePath: 'Panel: elements',
            textSignature: 'h1',
        }, 'First comment');
        thread.comments.push({
            author: 'DEVELOPER',
            text: 'Second comment',
            timestamp: Date.now(),
        });
        thread.sendToAgent();
        const threads = bridge.getCommentThreads();
        assert.lengthOf(threads, 1);
        assert.strictEqual(threads[0].text, 'First comment\n\n- DevTools VEPath: Panel: elements\n- DevTools element: h1');
    });
    it('formats recorded change threads using their comment text', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        const changeOnlyThread = commentManager.createCommentThread({
            vePath: 'Panel: elements > Tree: elements > TreeItem',
            textSignature: '',
        }, 'Changed attribute "class" from "old" to "new"', 'DEVELOPER', true);
        changeOnlyThread.sendToAgent();
        const commentAndElementThread = commentManager.createCommentThread({
            vePath: 'Panel: elements > Tree: elements > TreeItem',
            textSignature: 'button.cta',
        }, 'Changed text from "Submit" to "Send"', 'DEVELOPER', true);
        commentAndElementThread.sendToAgent();
        const threads = bridge.getCommentThreads();
        assert.lengthOf(threads, 2);
        assert.strictEqual(threads[0].text, 'Changed attribute "class" from "old" to "new"\n\n- DevTools VEPath: Panel: elements > Tree: elements > TreeItem');
        assert.strictEqual(threads[1].text, 'Changed text from "Submit" to "Send"\n\n- DevTools VEPath: Panel: elements > Tree: elements > TreeItem\n- DevTools element: button.cta');
    });
    it('delegates resolve to CommentManager and dispatches events', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        const thread = commentManager.createCommentThread({
            vePath: 'Panel: elements',
            textSignature: 'h1',
        }, 'Fix heading');
        let eventFired = false;
        bridge.addEventListener("CommentThreadsChanged" /* CommentManager.CD4ABridge.Events.COMMENT_THREADS_CHANGED */, () => {
            eventFired = true;
        });
        const success = bridge.resolveCommentThread(thread.id, 'Fixed heading');
        assert.isTrue(success);
        assert.isTrue(eventFired);
        const updated = commentManager.getCommentThread(thread.id);
        assert.strictEqual(updated?.status, 'RESOLVED');
        assert.lengthOf(updated?.comments || [], 2);
        assert.strictEqual(updated?.comments[1].author, 'AGENT');
        assert.strictEqual(updated?.comments[1].text, 'Fixed heading');
    });
    it('removes listeners on dispose', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        let eventFired = false;
        bridge.addEventListener("CommentThreadsChanged" /* CommentManager.CD4ABridge.Events.COMMENT_THREADS_CHANGED */, () => {
            eventFired = true;
        });
        bridge.dispose();
        commentManager.createCommentThread({
            vePath: 'Panel: elements',
            textSignature: 'h1',
        }, 'Fix heading');
        assert.isFalse(eventFired);
    });
    it('delegates setAgentAttached to CommentManager', () => {
        const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager);
        assert.isFalse(commentManager.isAgentAttached());
        bridge.setAgentAttached(true);
        assert.isTrue(commentManager.isAgentAttached());
        bridge.setAgentAttached(false);
        assert.isFalse(commentManager.isAgentAttached());
    });
    describe('reveal', () => {
        let mockHost;
        let showPanelSpy;
        beforeEach(() => {
            showPanelSpy = sinon.spy();
            const hostEvents = new Common.ObjectWrapper.ObjectWrapper();
            hostEvents.addEventListener(Host.InspectorFrontendHostAPI.Events.ShowPanel, event => {
                showPanelSpy(event.data);
            });
            mockHost = {
                events: hostEvents,
            };
        });
        afterEach(() => {
            sinon.restore();
            Common.Revealer.RevealerRegistry.removeInstance();
        });
        it('shows panel for any given panel name', async () => {
            const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, undefined, undefined, mockHost);
            await bridge.reveal('custom_panel');
            assert.isTrue(showPanelSpy.calledOnceWith('custom_panel'));
        });
        it('reveals network request in addition to panel reveal', async () => {
            const mockRequest = { requestId: () => 'req-1' };
            const mockNetworkLog = {
                requestsForId: (id) => id === 'req-1' ? [mockRequest] : [],
            };
            const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.instance(), 'reveal').resolves();
            const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, undefined, mockNetworkLog, mockHost);
            await bridge.reveal('network', { networkRequestId: 'req-1' });
            assert.isTrue(showPanelSpy.calledOnceWith('network'));
            assert.isTrue(revealStub.calledOnceWith(mockRequest));
        });
        it('reveals DOM node in addition to panel reveal', async () => {
            const mockNode = {};
            const mockDomModel = {
                pushNodesByBackendIdsToFrontend: sinon.stub().resolves(new Map([[10, mockNode]])),
            };
            const mockTarget = {
                model: sinon.stub().withArgs(SDK.DOMModel.DOMModel).returns(mockDomModel),
            };
            const mockTargetManager = {
                targetById: sinon.stub().withArgs('target-1').returns(mockTarget),
                primaryPageTarget: () => null,
            };
            const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.instance(), 'reveal').resolves();
            const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, mockTargetManager, undefined, mockHost);
            await bridge.reveal('elements', { node: { backendNodeId: 10, targetId: 'target-1' } });
            assert.isTrue(showPanelSpy.calledOnceWith('elements'));
            assert.isTrue(revealStub.calledOnceWith(mockNode));
        });
        it('does not reveal unrelated DOM node from primary page target when node target is missing', async () => {
            const mockNode = {};
            const mockDomModel = {
                pushNodesByBackendIdsToFrontend: sinon.stub().resolves(new Map([[10, mockNode]])),
            };
            const mockPrimaryTarget = {
                model: sinon.stub().withArgs(SDK.DOMModel.DOMModel).returns(mockDomModel),
            };
            const mockTargetManager = {
                targetById: sinon.stub().withArgs('destroyed-target').returns(null),
                primaryPageTarget: () => mockPrimaryTarget,
            };
            const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.instance(), 'reveal').resolves();
            const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, mockTargetManager, undefined, mockHost);
            await bridge.reveal('elements', { node: { backendNodeId: 10, targetId: 'destroyed-target' } });
            assert.isTrue(showPanelSpy.calledOnceWith('elements'));
            sinon.assert.notCalled(revealStub);
            sinon.assert.notCalled(mockDomModel.pushNodesByBackendIdsToFrontend);
        });
        it('reveals both network request and DOM node if both are present in target', async () => {
            const mockRequest = { requestId: () => 'req-1' };
            const mockNetworkLog = {
                requestsForId: (id) => id === 'req-1' ? [mockRequest] : [],
            };
            const mockNode = {};
            const mockDomModel = {
                pushNodesByBackendIdsToFrontend: sinon.stub().resolves(new Map([[10, mockNode]])),
            };
            const mockPrimaryTarget = {
                model: sinon.stub().withArgs(SDK.DOMModel.DOMModel).returns(mockDomModel),
            };
            const mockTargetManager = {
                targetById: sinon.stub().withArgs('target-1').returns(mockPrimaryTarget),
                primaryPageTarget: () => mockPrimaryTarget,
            };
            const revealStub = sinon.stub(Common.Revealer.RevealerRegistry.instance(), 'reveal').resolves();
            const bridge = new CommentManager.CD4ABridge.CD4ABridge(commentManager, mockTargetManager, mockNetworkLog, mockHost);
            await bridge.reveal('summary_panel', {
                networkRequestId: 'req-1',
                node: { backendNodeId: 10, targetId: 'target-1' },
            });
            assert.isTrue(showPanelSpy.calledOnceWith('summary_panel'));
            sinon.assert.callCount(revealStub, 2);
            sinon.assert.calledWith(revealStub.firstCall, mockRequest);
            sinon.assert.calledWith(revealStub.secondCall, mockNode);
        });
    });
});
//# sourceMappingURL=CD4ABridge.test.js.map