// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { MockCDPConnection } from '../../testing/MockCDPConnection.js';
const { urlString } = Platform.DevToolsPath;
describeWithEnvironment('LighthouseProtocolService', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let Lighthouse;
    let primaryTarget;
    let rootTarget;
    let suspendAllTargets;
    let resumeAllTargets;
    let connection;
    beforeEach(async () => {
        Lighthouse = await import('./lighthouse.js');
        connection = new MockCDPConnection();
        rootTarget = createTarget({ type: SDK.Target.Type.TAB, connection });
        createTarget({ parentTarget: rootTarget, subtype: 'prerender' });
        primaryTarget = createTarget({ parentTarget: rootTarget });
        const targetManager = SDK.TargetManager.TargetManager.instance();
        suspendAllTargets = sinon.stub(targetManager, 'suspendAllTargets').resolves();
        resumeAllTargets = sinon.stub(targetManager, 'resumeAllTargets').resolves();
        SDK.ChildTargetManager.ChildTargetManager.install();
        const childTargetManager = primaryTarget.model(SDK.ChildTargetManager.ChildTargetManager);
        assert.exists(childTargetManager);
        sinon.stub(childTargetManager, 'getParentTargetId').resolves(primaryTarget.targetInfo()?.targetId);
        if (rootTarget !== primaryTarget) {
            const rootChildTargetManager = rootTarget.model(SDK.ChildTargetManager.ChildTargetManager);
            assert.exists(rootChildTargetManager);
            sinon.stub(rootChildTargetManager, 'getParentTargetId').resolves(rootTarget.targetInfo()?.targetId);
        }
    });
    it('suspends all targets', async () => {
        const service = new Lighthouse.LighthouseProtocolService.ProtocolService();
        await service.attach(urlString `https://example.com/page`);
        sinon.assert.calledOnce(suspendAllTargets);
    });
    it('attaches to to the root target', async () => {
        const attachedToTargetStub = sinon.stub().returns({});
        connection.setSuccessHandler('Target.attachToTarget', attachedToTargetStub);
        const service = new Lighthouse.LighthouseProtocolService.ProtocolService();
        await service.attach(urlString `https://example.com/page`);
        sinon.assert.calledOnce(attachedToTargetStub);
        sinon.assert.calledWith(attachedToTargetStub, { targetId: rootTarget.targetInfo()?.targetId, flatten: true });
    });
    it('resumes all targets', async () => {
        const service = new Lighthouse.LighthouseProtocolService.ProtocolService();
        await service.attach(urlString `https://example.com/page`);
        await service.detach();
        sinon.assert.calledOnce(resumeAllTargets);
    });
    it('rejects pending requests when detached', async () => {
        // Mock Worker to avoid starting a real Lighthouse worker.
        const mockWorker = new EventTarget();
        mockWorker.postMessage = sinon.stub();
        mockWorker.terminate = sinon.stub();
        const workerStub = sinon.stub(globalThis, 'Worker').returns(mockWorker);
        try {
            connection.setSuccessHandler('Target.attachToTarget', () => ({ sessionId: 'mock-session-id' }));
            const service = new Lighthouse.LighthouseProtocolService.ProtocolService();
            await service.attach(urlString `https://example.com/page`);
            // Start a request. It will wait for the worker to be ready.
            const requestPromise = service.startTimespan({
                inspectedURL: urlString `https://example.com`,
                categoryIDs: ['performance'],
                flags: { formFactor: 'mobile', mode: 'timespan' },
            });
            // Simulate worker becoming ready.
            mockWorker.dispatchEvent(new MessageEvent('message', { data: 'workerReady' }));
            await service.ensureWorkerExists();
            // Now the request is sent to the worker and waiting for a
            // response.
            // We detach the service before the worker responds.
            await service.detach();
            // The request should be rejected with CancelledError.
            let error;
            try {
                await requestPromise;
            }
            catch (err) {
                error = err;
            }
            assert.exists(error);
            assert.instanceOf(error, Lighthouse.LighthouseProtocolService.CancelledError);
            assert.strictEqual(error.message, 'Lighthouse run cancelled');
        }
        finally {
            workerStub.restore();
        }
    });
    it('auto-accepts same-origin dialogs and blocks cross-origin dialogs', async () => {
        sinon.stub(primaryTarget, 'inspectedURL').returns(urlString `https://example.com/page`);
        const service = new Lighthouse.LighthouseProtocolService.ProtocolService();
        await service.attach(urlString `https://example.com/page`);
        const resourceTreeModel = primaryTarget.model(SDK.ResourceTreeModel.ResourceTreeModel);
        assert.exists(resourceTreeModel);
        const pageAgent = primaryTarget.pageAgent();
        const handleDialogStub = sinon.stub(pageAgent, 'invoke_handleJavaScriptDialog');
        // Same origin
        resourceTreeModel.dispatchEventToListeners(SDK.ResourceTreeModel.Events.JavaScriptDialogOpening, {
            url: urlString `https://example.com/another-page`,
            message: 'test',
            type: 'alert',
            hasBrowserHandler: true,
        });
        sinon.assert.calledOnce(handleDialogStub);
        // Cross origin
        handleDialogStub.resetHistory();
        resourceTreeModel.dispatchEventToListeners(SDK.ResourceTreeModel.Events.JavaScriptDialogOpening, {
            url: urlString `https://attacker.com/page`,
            message: 'test',
            type: 'alert',
            hasBrowserHandler: true,
        });
        sinon.assert.notCalled(handleDialogStub);
    });
    describe('worker protocol proxying', () => {
        const MAIN_SESSION_ID = 'LH_MAIN_SESSION';
        const CHILD_SESSION_ID = 'LH_CHILD_SESSION';
        const OTHER_SESSION_ID = 'OTHER_SESSION';
        let connection;
        let connectionSend;
        let workerPostMessage;
        let mockWorker;
        let workerStub;
        let service;
        function workerSend(payload) {
            mockWorker.dispatchEvent(new MessageEvent('message', {
                data: { action: 'sendProtocolMessage', args: { message: JSON.stringify(payload) } },
            }));
        }
        function attachedToTargetEvent(outerSessionId, innerSessionId) {
            return {
                method: 'Target.attachedToTarget',
                params: {
                    sessionId: innerSessionId,
                    targetInfo: {
                        targetId: 'x',
                        type: 'page',
                        title: '',
                        url: 'http://example.com/',
                        attached: true,
                        canAccessOpener: false,
                    },
                    waitingForDebugger: true,
                },
                sessionId: outerSessionId,
            };
        }
        beforeEach(async () => {
            mockWorker = new EventTarget();
            workerPostMessage = sinon.stub();
            mockWorker.postMessage = workerPostMessage;
            mockWorker.terminate = sinon.stub();
            workerStub = sinon.stub(globalThis, 'Worker').returns(mockWorker);
            const router = rootTarget.router();
            assert.exists(router);
            connection = router.connection;
            connection.setSuccessHandler('Target.attachToTarget', () => ({ sessionId: MAIN_SESSION_ID }));
            service = new Lighthouse.LighthouseProtocolService.ProtocolService();
            await service.attach(urlString `https://example.com/page`);
            connectionSend = sinon.stub(connection, 'send').resolves({ result: {} });
            // Ensure the worker promise is resolved so that send() does not queue.
            const workerReady = service.ensureWorkerExists();
            mockWorker.dispatchEvent(new MessageEvent('message', { data: 'workerReady' }));
            await workerReady;
            workerPostMessage.resetHistory();
        });
        afterEach(() => {
            workerStub.restore();
        });
        it('only relays worker commands targeting sessions created for the run', () => {
            workerSend({ id: 1, method: 'Runtime.enable', sessionId: MAIN_SESSION_ID });
            sinon.assert.calledOnceWithExactly(connectionSend, 'Runtime.enable', undefined, MAIN_SESSION_ID);
            connectionSend.resetHistory();
            workerSend({ id: 2, method: 'Target.setAutoAttach', params: { autoAttach: true } });
            workerSend({ id: 3, method: 'Target.setAutoAttach', params: { autoAttach: true }, sessionId: '' });
            workerSend({ id: 4, method: 'Runtime.enable', sessionId: OTHER_SESSION_ID });
            sinon.assert.notCalled(connectionSend);
        });
        it('relays worker commands targeting auto-attached child sessions', () => {
            service.onEvent(attachedToTargetEvent(MAIN_SESSION_ID, CHILD_SESSION_ID));
            workerSend({ id: 1, method: 'Runtime.enable', sessionId: CHILD_SESSION_ID });
            sinon.assert.calledOnceWithExactly(connectionSend, 'Runtime.enable', undefined, CHILD_SESSION_ID);
            connectionSend.resetHistory();
            service.onEvent({
                method: 'Target.detachedFromTarget',
                params: { sessionId: CHILD_SESSION_ID, targetId: 'x' },
                sessionId: MAIN_SESSION_ID,
            });
            workerSend({ id: 2, method: 'Runtime.enable', sessionId: CHILD_SESSION_ID });
            sinon.assert.notCalled(connectionSend);
        });
        it('does not adopt empty child session ids from attachedToTarget', () => {
            service.onEvent(attachedToTargetEvent(MAIN_SESSION_ID, ''));
            workerSend({ id: 1, method: 'Target.setAutoAttach', sessionId: '' });
            workerSend({ id: 2, method: 'Target.setAutoAttach' });
            sinon.assert.notCalled(connectionSend);
        });
        it('only forwards events from sessions created for the run', async () => {
            service.onEvent({ method: 'Runtime.executionContextsCleared', params: undefined, sessionId: MAIN_SESSION_ID });
            service.onEvent({ method: 'Runtime.executionContextsCleared', params: undefined, sessionId: OTHER_SESSION_ID });
            service.onEvent(attachedToTargetEvent(OTHER_SESSION_ID, CHILD_SESSION_ID));
            await new Promise(resolve => setTimeout(resolve, 0));
            const forwarded = workerPostMessage.getCalls()
                .map(call => call.args[0])
                .filter(message => message.action === 'dispatchProtocolMessage');
            assert.lengthOf(forwarded, 1);
            assert.strictEqual(forwarded[0].args.message.sessionId, MAIN_SESSION_ID);
            // Child session ids introduced by events on unrelated sessions are not adopted.
            workerSend({ id: 1, method: 'Runtime.enable', sessionId: CHILD_SESSION_ID });
            sinon.assert.notCalled(connectionSend);
        });
    });
});
//# sourceMappingURL=LighthouseProtocolService.test.js.map