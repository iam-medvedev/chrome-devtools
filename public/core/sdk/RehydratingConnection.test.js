// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { SnapshotTester } from '../../testing/SnapshotTester.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as Common from '../common/common.js';
import * as SDK from './sdk.js';
const mockTarget1 = {
    targetId: 'ABCDE',
    type: 'page',
    isolate: '12345',
    url: 'example.com',
    pid: 12345,
};
const mockExecutionContext1 = {
    id: 1,
    origin: 'example.com',
    v8Context: 'example context 1',
    name: 'example context 1',
    uniqueId: 'example context 1',
    auxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    isolate: '12345',
};
const mockExecutionContext2 = {
    id: 2,
    origin: 'example.com',
    v8Context: 'example context 2',
    name: 'example context 2',
    uniqueId: 'example context 2',
    auxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    isolate: '12345',
};
const mockScript1 = {
    scriptId: '1',
    isolate: '12345',
    pid: 12345,
    executionContextId: 1,
    startLine: 0,
    startColumn: 0,
    endLine: 1,
    endColumn: 10,
    hash: '',
    isModule: false,
    url: 'example.com',
    hasSourceURL: false,
    sourceMapURL: undefined,
    length: 10,
    sourceText: 'source text 1',
    executionContextAuxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    buildId: ''
};
const mockScript2 = {
    scriptId: '2',
    isolate: '12345',
    pid: 12345,
    executionContextId: 2,
    startLine: 0,
    startColumn: 0,
    endLine: 1,
    endColumn: 10,
    hash: '',
    isModule: false,
    url: 'example.com',
    hasSourceURL: false,
    sourceMapURL: undefined,
    length: 10,
    sourceText: 'source text 2',
    executionContextAuxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    buildId: ''
};
describe('RehydratingSession', () => {
    const sessionId = 1;
    const messageId = 1;
    const target = mockTarget1;
    let mockRehydratingConnection;
    let mockRehydratingSession;
    const executionContextsForTarget1 = [mockExecutionContext1, mockExecutionContext2];
    const scriptsForTarget1 = [mockScript1, mockScript2];
    class MockRehydratingConnection {
        messageQueue = [];
        postToFrontend(arg) {
            this.messageQueue.push(arg);
        }
        clearMessageQueue() {
            this.messageQueue = [];
        }
    }
    class RehydratingSessionForTest extends SDK.RehydratingConnection.RehydratingSession {
        sendMessageToFrontend(payload) {
            this.connection?.postToFrontend(payload);
        }
    }
    beforeEach(() => {
        mockRehydratingConnection = new MockRehydratingConnection();
        mockRehydratingSession = new RehydratingSessionForTest(sessionId, target, executionContextsForTarget1, scriptsForTarget1, mockRehydratingConnection);
        mockRehydratingSession.declareSessionAttachedToTarget();
    });
    it('send attach to target on construction', async function () {
        const attachToTargetMessage = mockRehydratingConnection.messageQueue[0];
        assert.isNotNull(attachToTargetMessage);
        assert.strictEqual(attachToTargetMessage.method, 'Target.attachedToTarget');
        assert.strictEqual(attachToTargetMessage.params.sessionId.toString(), sessionId.toString());
        assert.strictEqual(attachToTargetMessage.params.targetInfo.targetId.toString(), target.targetId.toString());
    });
    it('sends script parsed and debugger id while handling debugger enable', async function () {
        mockRehydratingConnection.clearMessageQueue();
        mockRehydratingSession.handleFrontendMessageAsFakeCDPAgent({
            id: messageId,
            method: 'Debugger.enable',
            sessionId,
        });
        assert.lengthOf(mockRehydratingConnection.messageQueue, 3);
        const scriptParsedMessages = mockRehydratingConnection.messageQueue.slice(0, 2);
        const resultMessage = mockRehydratingConnection.messageQueue.slice(2);
        for (const scriptParsedMessage of scriptParsedMessages) {
            assert.strictEqual(scriptParsedMessage.method, 'Debugger.scriptParsed');
            assert.strictEqual(scriptParsedMessage.params.isolate, target.isolate);
        }
        assert.isNotNull(resultMessage[0]);
        assert.strictEqual(resultMessage[0].id, messageId);
        assert.isNotNull(resultMessage[0].result.debuggerId);
    });
    it('sends execution context created while handling runtime enable', async function () {
        mockRehydratingConnection.clearMessageQueue();
        mockRehydratingSession.handleFrontendMessageAsFakeCDPAgent({
            id: messageId,
            method: 'Runtime.enable',
            sessionId,
        });
        assert.lengthOf(mockRehydratingConnection.messageQueue, 3);
        const executionContextCreatedMessages = mockRehydratingConnection.messageQueue.slice(0, 2);
        const resultMessage = mockRehydratingConnection.messageQueue.slice(2);
        for (const executionContextCreatedMessage of executionContextCreatedMessages) {
            assert.strictEqual(executionContextCreatedMessage.method, 'Runtime.executionContextCreated');
            assert.strictEqual(executionContextCreatedMessage.params
                .context.auxData.frameId, target.targetId);
        }
        assert.isNotNull(resultMessage[0]);
        assert.strictEqual(resultMessage[0].id, messageId);
    });
    it('sends script source text while handling get script source', async function () {
        mockRehydratingConnection.clearMessageQueue();
        mockRehydratingSession.handleFrontendMessageAsFakeCDPAgent({
            id: messageId,
            method: 'Debugger.getScriptSource',
            sessionId,
            params: {
                scriptId: mockScript1.scriptId,
            },
        });
        assert.lengthOf(mockRehydratingConnection.messageQueue, 1);
        const scriptSourceTextMessage = mockRehydratingConnection.messageQueue[0];
        assert.isNotNull(scriptSourceTextMessage);
        assert.strictEqual(scriptSourceTextMessage.id, messageId);
        assert.strictEqual(scriptSourceTextMessage.result.scriptSource, mockScript1.sourceText);
    });
});
describeWithEnvironment('RehydratingConnection emittance', () => {
    let snapshotTester;
    before(async () => {
        snapshotTester = new SnapshotTester(import.meta);
        await snapshotTester.load();
        // Create fake popup opener as rehydrating connection needs it.
        window.opener = {
            postMessage: sinon.stub(),
        };
    });
    after(async () => {
        await snapshotTester.finish();
        delete window.opener;
    });
    it('emits the expected CDP data', async function () {
        const contents = await TraceLoader.fixtureContents(this, 'enhanced-paul.json.gz');
        const reveal = sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal').resolves();
        const messageLog = [];
        const conn = new SDK.RehydratingConnection.RehydratingConnection((e) => {
            throw new Error(`Connection lost: ${e}`);
        });
        // Impractical to invoke the real devtools frontend, so we fake the 3 CDP handlers that
        // `RehydratingSession.handleFrontendMessageAsFakeCDPAgent` cares about
        let id = 1;
        const fakeDevToolsFrontend = (arg0) => {
            const message = ((typeof arg0 === 'string') ? JSON.parse(arg0) : arg0);
            messageLog.push('RehydratingConnection says:', message);
            if (message.method === 'Target.attachedToTarget') {
                const attachedParams = message.params;
                const sessionId = attachedParams.sessionId;
                conn.sendRawMessage({ id: id++, sessionId, method: 'Runtime.enable' });
                conn.sendRawMessage({ id: id++, sessionId, method: 'Debugger.enable' });
            }
            if (message.method === 'Debugger.scriptParsed') {
                const scriptParsedParams = message.params;
                const sessionId = message.sessionId;
                conn.sendRawMessage({ id: id++, sessionId, method: 'Debugger.getScriptSource', params: { scriptId: scriptParsedParams.scriptId } });
            }
        };
        conn.setOnMessage(fakeDevToolsFrontend);
        const oldSendRawMessage = conn.sendRawMessage;
        conn.sendRawMessage = (message) => {
            messageLog.push('fakeDevToolsFrontend says:', message);
            oldSendRawMessage.call(conn, message);
        };
        // Kick off the rehydration process
        conn.onReceiveHostWindowPayload({
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(contents) },
        });
        // Poll for rehydration complete
        const poll = async () => {
            const isRehydrated = conn.rehydratingConnectionState === 3 /* SDK.RehydratingConnection.RehydratingConnectionState.REHYDRATED */;
            const messageLogPopulated = messageLog.length > 100; // This trace ends up with 158.
            if (isRehydrated && messageLogPopulated) {
                return;
            }
            await new Promise(res => setTimeout(res, 100));
            void poll();
        };
        await poll();
        /** Elide any script sources in front_end/core/sdk/RehydratingConnection.snapshot.txt **/
        function sanitizeLog(m) {
            if (typeof m === 'object' && m.params?.sourceText) {
                m.params.sourceText = m.params.sourceText.slice(0, 20) + '…';
            }
            // @ts-expect-error
            if (typeof m === 'object' && m.result?.scriptSource) {
                // @ts-expect-error
                m.result.scriptSource = m.result.scriptSource.slice(0, 20) + '…';
            }
            return typeof m === 'string' ? `\n/* ${m} */` : JSON.stringify(m, null, 2);
        }
        const sanitizedLog = messageLog.map(sanitizeLog).join('\n');
        snapshotTester.assert(this, sanitizedLog);
        sinon.assert.calledOnce(reveal);
    });
});
//# sourceMappingURL=RehydratingConnection.test.js.map