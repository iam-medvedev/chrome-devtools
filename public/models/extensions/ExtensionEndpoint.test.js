// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import sinon from 'sinon';
import * as Platform from '../../core/platform/platform.js';
import * as Bindings from '../bindings/bindings.js';
import * as Extensions from './extensions.js';
const { urlString } = Platform.DevToolsPath;
function receiveRequest(port) {
    return new Promise(resolve => {
        port.addEventListener('message', (event) => resolve(event.data), { once: true });
        port.start();
    });
}
class TestExtensionEndpoint extends Extensions.ExtensionEndpoint.ExtensionEndpoint {
    handleEvent(_event) {
        // No-op: this test exercises request/response behavior.
    }
}
describe('ExtensionEndpoint', () => {
    let endpoint;
    let extensionPort;
    beforeEach(() => {
        const channel = new MessageChannel();
        endpoint = new TestExtensionEndpoint(channel.port1);
        extensionPort = channel.port2;
    });
    it('rejects malformed response payloads for typed requests', async () => {
        const requestReceived = receiveRequest(extensionPort);
        const responsePromise = endpoint.sendRequest('listVariablesInScope', { rawLocation: {} }, value => Array.isArray(value));
        const request = await requestReceived;
        assert.strictEqual(request.method, 'listVariablesInScope');
        const malformedPayload = { scope: 'LOCAL', name: 'v', nestedName: ['__proto__', 'polluted'] };
        extensionPort.postMessage({ requestId: request.requestId, result: malformedPayload, error: null });
        let didReject = false;
        try {
            await responsePromise;
        }
        catch {
            didReject = true;
        }
        assert.isTrue(didReject, 'Expected malformed response payload to be rejected');
    });
    it('resolves typed requests when validation succeeds', async () => {
        const requestReceived = receiveRequest(extensionPort);
        const payload = [{ scope: 'LOCAL', name: 'v', type: 'i32' }];
        const responsePromise = endpoint.sendRequest('listVariablesInScope', { rawLocation: {} }, value => Array.isArray(value));
        const request = await requestReceived;
        extensionPort.postMessage({ requestId: request.requestId, result: payload, error: null });
        const response = await responsePromise;
        assert.deepEqual(response, payload);
    });
});
describe('LanguageExtensionEndpoint', () => {
    it('rejects malformed listVariablesInScope responses in LanguageExtensionEndpoint', async () => {
        const channel = new MessageChannel();
        const pluginManager = sinon.createStubInstance(Bindings.DebuggerLanguagePlugins.DebuggerLanguagePluginManager);
        const languageEndpoint = new Extensions.LanguageExtensionEndpoint.LanguageExtensionEndpoint(true, '', 'test-plugin', { language: 'lang', symbol_types: ["SourceMap" /* Protocol.Debugger.DebugSymbolsType.SourceMap */] }, channel.port1, pluginManager);
        const requestReceived = receiveRequest(channel.port2);
        const responsePromise = languageEndpoint.listVariablesInScope({});
        const request = await requestReceived;
        assert.strictEqual(request.method, "listVariablesInScope" /* Extensions.ExtensionAPI.PrivateAPI.LanguageExtensionPluginCommands.ListVariablesInScope */);
        const malformedPayload = {
            scope: 'LOCAL',
            name: 'attacker-shaped-object',
            nestedName: ['__proto__', 'polluted'],
        };
        channel.port2.postMessage({ requestId: request.requestId, result: malformedPayload, error: null });
        let didReject = false;
        try {
            await responsePromise;
        }
        catch {
            didReject = true;
        }
        assert.isTrue(didReject, 'Expected malformed listVariablesInScope payload to be rejected');
    });
});
describe('RecorderExtensionEndpoint', () => {
    it('rejects malformed stringify responses', async () => {
        const channel = new MessageChannel();
        const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
        const endpoint = new Extensions.RecorderExtensionEndpoint.RecorderExtensionEndpoint('test-plugin', channel.port1, ['export'], urlString `chrome-extension://test`, pluginManager, 'application/json');
        const requestReceived = receiveRequest(channel.port2);
        const responsePromise = endpoint.stringify({ title: 'demo' });
        const request = await requestReceived;
        assert.strictEqual(request.method, "stringify" /* Extensions.ExtensionAPI.PrivateAPI.RecorderExtensionPluginCommands.Stringify */);
        channel.port2.postMessage({ requestId: request.requestId, result: { not: 'a string' }, error: null });
        let didReject = false;
        try {
            await responsePromise;
        }
        catch {
            didReject = true;
        }
        assert.isTrue(didReject, 'Expected malformed stringify payload to be rejected');
    });
    it('rejects malformed replay responses', async () => {
        const channel = new MessageChannel();
        const pluginManager = Extensions.RecorderPluginManager.RecorderPluginManager.instance();
        const endpoint = new Extensions.RecorderExtensionEndpoint.RecorderExtensionEndpoint('test-plugin', channel.port1, ['replay'], urlString `chrome-extension://test`, pluginManager, 'application/json');
        const requestReceived = receiveRequest(channel.port2);
        const responsePromise = endpoint.replay({ title: 'demo' });
        const request = await requestReceived;
        assert.strictEqual(request.method, "replay" /* Extensions.ExtensionAPI.PrivateAPI.RecorderExtensionPluginCommands.Replay */);
        channel.port2.postMessage({ requestId: request.requestId, result: 'not-void', error: null });
        let didReject = false;
        try {
            await responsePromise;
        }
        catch {
            didReject = true;
        }
        assert.isTrue(didReject, 'Expected malformed replay payload to be rejected');
    });
});
//# sourceMappingURL=ExtensionEndpoint.test.js.map