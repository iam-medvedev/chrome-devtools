// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';
import sinon from 'sinon';
import { renderElementIntoDOM } from '../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { SnapshotTester } from '../../testing/SnapshotTester.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as Common from '../common/common.js';
import * as Root from '../root/root.js';
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
    url: 'example.com', // inline
    hasSourceURL: false,
    sourceMapURL: undefined,
    length: 10,
    sourceText: 'source text 1',
    executionContextAuxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    buildId: '',
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
    url: 'example.com/script.js',
    hasSourceURL: false,
    sourceMapURL: undefined,
    length: 10,
    sourceText: 'source text 2',
    executionContextAuxData: {
        frameId: 'ABCDE',
        isDefault: true,
        type: 'type',
    },
    buildId: '',
};
const mockResource = {
    url: 'example.com',
    frame: 'ABCDE',
    content: '<html>',
    mimeType: 'text/html',
};
describe('RehydratingSession', () => {
    const sessionId = 1;
    const messageId = 1;
    const target = mockTarget1;
    let mockRehydratingConnection;
    let mockRehydratingSession;
    const executionContextsForTarget1 = [
        mockExecutionContext1,
        mockExecutionContext2,
    ];
    const scriptsForTarget1 = [mockScript1, mockScript2];
    const resourcesForTarget1 = [mockResource];
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
        mockRehydratingSession = new RehydratingSessionForTest(sessionId, target, executionContextsForTarget1, scriptsForTarget1, resourcesForTarget1, mockRehydratingConnection);
        mockRehydratingSession.declareSessionAttachedToTarget();
    });
    it('send attach to target on construction', async function () {
        const attachToTargetMessage = mockRehydratingConnection.messageQueue[0];
        assert.isNotNull(attachToTargetMessage);
        assert.strictEqual(attachToTargetMessage.method, 'Target.attachedToTarget');
        assert.strictEqual(attachToTargetMessage.params.sessionId.toString(), sessionId.toString());
        assert.strictEqual(attachToTargetMessage.params.targetInfo.targetId.toString(), target.targetId.toString());
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
describeWithEnvironment('RehydratingConnection emittance', function () {
    const snapshotTester = new SnapshotTester(this, import.meta);
    before(async () => {
        // Create fake popup opener as rehydrating connection needs it.
        window.opener = {
            postMessage: sinon.stub(),
        };
    });
    after(async () => {
        delete window.opener;
    });
    it('emits the expected CDP data', async function () {
        const contents = await TraceLoader.fixtureContents(this, 'enhanced-paul.json.gz');
        const reveal = sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal').resolves();
        const messageLog = [];
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport((e) => {
            throw new Error(`Connection lost: ${e}`);
        });
        // Impractical to invoke the real devtools frontend, so we fake the 3 CDP handlers that
        // `RehydratingSession.handleFrontendMessageAsFakeCDPAgent` cares about
        let id = 1;
        const fakeDevToolsFrontend = (arg0) => {
            const message = (typeof arg0 === 'string' ? JSON.parse(arg0) : arg0);
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
                conn.sendRawMessage({
                    id: id++,
                    sessionId,
                    method: 'Debugger.getScriptSource',
                    params: { scriptId: scriptParsedParams.scriptId },
                });
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
            data: {
                type: 'REHYDRATING_TRACE_FILE',
                traceJson: JSON.stringify(contents),
            },
            origin: window.location.origin,
            source: window.opener,
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
            if (typeof m === 'object' && m.params?.sourceMapURL && m.params.sourceMapURL.length > 200) {
                m.params.sourceMapURL = m.params.sourceMapURL.slice(0, 200) + '…';
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
        assert.isNull(conn.trace);
    });
});
// A minimal "enhanced trace" whose single primary frame's url is fully controlled.
function makeTrace(frameUrl) {
    return {
        traceEvents: [
            {
                cat: 'disabled-by-default-devtools.timeline',
                name: 'TracingStartedInBrowser',
                ph: 'I',
                pid: 1,
                tid: 1,
                ts: 0,
                args: {
                    data: {
                        frames: [
                            {
                                frame: 'FRAME',
                                isInPrimaryMainFrame: true,
                                isOutermostMainFrame: true,
                                parent: '',
                                processId: 1,
                                url: frameUrl,
                                pid: 1,
                            },
                        ],
                    },
                },
            },
        ],
    };
}
describe('RehydratingConnection postMessage loading', () => {
    setupLocaleHooks();
    let connections = [];
    function createFrameWindow() {
        const frame = document.createElement('iframe');
        renderElementIntoDOM(frame, { allowMultipleChildren: true });
        assert.isNotNull(frame.contentWindow);
        sinon.stub(frame.contentWindow, 'postMessage');
        return frame.contentWindow;
    }
    function createTransport(onConnectionLost = sinon.stub()) {
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport(onConnectionLost);
        connections.push(conn);
        return conn;
    }
    beforeEach(() => {
        connections = [];
        sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal').resolves();
        if (window !== window.top) {
            sinon.stub(window.parent, 'postMessage');
        }
    });
    afterEach(() => {
        for (const conn of connections) {
            void conn.disconnect().catch(() => { });
        }
        delete window.opener;
    });
    it('ignores a trace posted from another origin to a popup window', () => {
        const popupOpener = createFrameWindow();
        window.opener = popupOpener;
        const onConnectionLost = sinon.stub();
        const conn = createTransport(onConnectionLost);
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        const removeListener = sinon.spy(window, 'removeEventListener');
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://evil.example/')) },
            origin: 'https://evil.example',
            source: popupOpener,
        }));
        assert.lengthOf(messages, 0);
        assert.strictEqual(conn.rehydratingConnectionState, 2 /* SDK.RehydratingConnection.RehydratingConnectionState.INITIALIZED */);
        sinon.assert.notCalled(onConnectionLost);
        sinon.assert.neverCalledWith(removeListener, 'message', sinon.match.func);
    });
    it('accepts a same-origin trace posted from the popup opener', () => {
        const popupOpener = createFrameWindow();
        window.opener = popupOpener;
        const onConnectionLost = sinon.stub();
        const conn = createTransport(onConnectionLost);
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        sinon.assert.calledOnceWithExactly(popupOpener.postMessage, { type: 'REHYDRATING_WINDOW_READY' });
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://example.com/legit')) },
            origin: window.location.origin,
            source: popupOpener,
        }));
        sinon.assert.notCalled(onConnectionLost);
        const targetCreated = messages.find(m => m.method === 'Target.targetCreated');
        assert.isOk(targetCreated);
        assert.strictEqual(targetCreated.params.targetInfo.url, 'https://example.com/legit');
    });
    it('ignores a trace whose source is not the host window', () => {
        const siblingWindow = createFrameWindow();
        const onConnectionLost = sinon.stub();
        const conn = createTransport(onConnectionLost);
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://evil.example/')) },
            origin: window.location.origin,
            source: siblingWindow,
        }));
        assert.lengthOf(messages, 0);
        assert.strictEqual(conn.rehydratingConnectionState, 2 /* SDK.RehydratingConnection.RehydratingConnectionState.INITIALIZED */);
        sinon.assert.notCalled(onConnectionLost);
    });
    it('accepts a cross-origin trace from the parent window when embedded in an iframe', () => {
        const onConnectionLost = sinon.stub();
        const conn = createTransport(onConnectionLost);
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        sinon.assert.calledOnceWithExactly(window.parent.postMessage, { type: 'REHYDRATING_IFRAME_READY' }, '*');
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://example.com/embedded')) },
            origin: 'https://embedder.example',
            source: window.parent,
        }));
        sinon.assert.notCalled(onConnectionLost);
        const targetCreated = messages.find(m => m.method === 'Target.targetCreated');
        assert.isOk(targetCreated);
        assert.strictEqual(targetCreated.params.targetInfo.url, 'https://example.com/embedded');
    });
    it('does not drop the listener on an untrusted or unrelated message', () => {
        const popupOpener = createFrameWindow();
        const siblingWindow = createFrameWindow();
        window.opener = popupOpener;
        const conn = createTransport();
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        window.dispatchEvent(new MessageEvent('message', {
            data: 'junk',
            origin: 'https://evil.example',
            source: null,
        }));
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://evil.example/')) },
            origin: 'https://evil.example',
            source: popupOpener,
        }));
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://evil.example/')) },
            origin: window.location.origin,
            source: siblingWindow,
        }));
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'OTHER_MESSAGE' },
            origin: window.location.origin,
            source: popupOpener,
        }));
        window.dispatchEvent(new MessageEvent('message', {
            data: { type: 'REHYDRATING_TRACE_FILE', traceJson: JSON.stringify(makeTrace('https://example.com/legit')) },
            origin: window.location.origin,
            source: popupOpener,
        }));
        const targetCreated = messages.find(m => m.method === 'Target.targetCreated');
        assert.isOk(targetCreated);
        assert.strictEqual(targetCreated.params.targetInfo.url, 'https://example.com/legit');
    });
});
// `trace_app` reads the `?traceURL` query parameter and fetches it. Because the response is replayed
// into the trusted front-end as synthetic CDP events, only trusted origins may be fetched, and fetch
// failures must be handled rather than left as unhandled rejections.
describeWithEnvironment('RehydratingConnection ?traceURL loading', () => {
    // A remote host that is neither same-origin, devtools:, nor loopback.
    const DISALLOWED_URL = 'https://evil.example.com/trace.json';
    // A fully controlled string that would otherwise end up as a synthetic target's url/title.
    const INJECTED_MARKER = 'javascript:INJECTED_MARKER-<img src=x onerror=alert(document.domain)>';
    let queryParamStub;
    let fetchStub;
    beforeEach(() => {
        queryParamStub = sinon.stub(Root.Runtime.Runtime, 'queryParam');
        queryParamStub.callThrough();
        fetchStub = sinon.stub(globalThis, 'fetch');
        sinon.stub(Common.Revealer.RevealerRegistry.prototype, 'reveal').resolves();
    });
    function respondWith(trace) {
        // Served as plain (non-gzipped) JSON; arrayBufferToString handles both.
        const payload = new TextEncoder().encode(JSON.stringify(trace)).buffer;
        fetchStub.resolves({ arrayBuffer: async () => payload });
    }
    it('does not fetch a traceURL from a disallowed origin', () => {
        queryParamStub.withArgs('traceURL').returns(DISALLOWED_URL);
        respondWith(makeTrace(INJECTED_MARKER));
        const onConnectionLost = sinon.stub();
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport(onConnectionLost);
        const messages = [];
        conn.setOnMessage(message => messages.push(message));
        // A disallowed URL is rejected synchronously in the constructor; no fetch is ever scheduled.
        assert.isUndefined(conn.fetchPromiseForTest);
        sinon.assert.notCalled(fetchStub);
        assert.isEmpty(messages.filter(m => m.method === 'Target.targetCreated'));
        sinon.assert.calledOnce(onConnectionLost);
    });
    it('does not fetch a disallowed URL via the legacy loadTimelineFromURL parameter', () => {
        queryParamStub.withArgs('loadTimelineFromURL').returns(encodeURIComponent(DISALLOWED_URL));
        respondWith(makeTrace(INJECTED_MARKER));
        const onConnectionLost = sinon.stub();
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport(onConnectionLost);
        conn.setOnMessage(() => { });
        assert.isUndefined(conn.fetchPromiseForTest);
        sinon.assert.notCalled(fetchStub);
        sinon.assert.calledOnce(onConnectionLost);
    });
    it('loads a trace from an allowed (same-origin) URL', async () => {
        const allowedUrl = new URL('/my-trace.json.gz', window.location.href).href;
        queryParamStub.withArgs('traceURL').returns(allowedUrl);
        respondWith(makeTrace('https://example.com/legit'));
        const onConnectionLost = sinon.stub();
        const messages = [];
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport(onConnectionLost);
        conn.setOnMessage(message => messages.push(message));
        await conn.fetchPromiseForTest;
        sinon.assert.calledOnceWithExactly(fetchStub, allowedUrl);
        sinon.assert.notCalled(onConnectionLost);
        assert.exists(messages.find(m => m.method === 'Target.targetCreated'));
        assert.isNull(conn.trace);
    });
    it('reports an error when the fetch fails instead of throwing', async () => {
        const allowedUrl = new URL('/broken-trace.json', window.location.href).href;
        queryParamStub.withArgs('traceURL').returns(allowedUrl);
        fetchStub.rejects(new TypeError('Failed to fetch'));
        const onConnectionLost = sinon.stub();
        const conn = new SDK.RehydratingConnection.RehydratingConnectionTransport(onConnectionLost);
        conn.setOnMessage(() => { });
        await conn.fetchPromiseForTest;
        sinon.assert.calledOnce(onConnectionLost);
    });
});
describe('isTraceUrlAllowed', () => {
    const { isTraceUrlAllowed } = SDK.RehydratingConnection;
    it('allows same-origin, devtools: and loopback URLs', () => {
        assert.isTrue(isTraceUrlAllowed(new URL('/trace.json', window.location.href).href));
        assert.isTrue(isTraceUrlAllowed('/relative/trace.json.gz'));
        assert.isTrue(isTraceUrlAllowed('devtools://devtools/bundled/trace.json'));
        assert.isTrue(isTraceUrlAllowed('http://localhost:1234/trace.json'));
        assert.isTrue(isTraceUrlAllowed('http://127.0.0.1:8000/trace.json.gz'));
        assert.isTrue(isTraceUrlAllowed('http://[::1]:8000/trace.json'));
    });
    it('rejects arbitrary remote hosts and non-http(s) schemes', () => {
        assert.isFalse(isTraceUrlAllowed('https://evil.example.com/trace.json'));
        // A hostname that merely contains "localhost" must not be treated as loopback.
        assert.isFalse(isTraceUrlAllowed('https://localhost.evil.example.com/trace.json'));
        assert.isFalse(isTraceUrlAllowed('javascript:alert(document.domain)'));
        assert.isFalse(isTraceUrlAllowed('data:application/json,%7B%7D'));
        assert.isFalse(isTraceUrlAllowed('file:///etc/passwd'));
    });
});
//# sourceMappingURL=RehydratingConnection.test.js.map