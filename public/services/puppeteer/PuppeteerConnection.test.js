// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import * as PuppeteerService from './puppeteer.js';
class MockConnection {
    send(_method, _params, _sessionId) {
        return Promise.resolve({
            error: {
                message: 'Something went wrong',
                code: -32000,
                data: 'Some data',
            },
        });
    }
    observe(_observer) {
    }
    unobserve(_observer) {
    }
}
describe('PuppeteerConnectionAdapter', () => {
    it('throws ProtocolError on CDP error', async () => {
        const connection = new MockConnection();
        const adapter = new PuppeteerService.PuppeteerConnection.PuppeteerConnectionAdapter(connection, 'test-session-id');
        try {
            await adapter._rawSend('some-callbacks', 'Some.method', {});
            assert.fail('Expected _rawSend to throw');
        }
        catch (err) {
            const error = err;
            assert.strictEqual(error.name, 'ProtocolError');
            assert.strictEqual(error.message, 'Something went wrong');
            assert.strictEqual(error.code, -32000);
            assert.strictEqual(error.data, 'Some data');
        }
    });
    it('rejects page input commands after blockPageInput() and sends other commands', async () => {
        const connection = new MockConnection();
        const sent = [];
        connection.send = ((method) => {
            sent.push(method);
            return Promise.resolve({ result: {} });
        });
        const adapter = new PuppeteerService.PuppeteerConnection.PuppeteerConnectionAdapter(connection, 'test-session-id');
        await adapter._rawSend('some-callbacks', 'Input.dispatchMouseEvent', {});
        const error = new Error('Navigation is not allowed');
        adapter.blockPageInput(error);
        const blockedMethods = [
            'Input.dispatchMouseEvent',
            'Input.insertText',
            'Runtime.evaluate',
            'Runtime.getProperties',
            'DOM.scrollIntoViewIfNeeded',
            'Page.navigate',
        ];
        for (const method of blockedMethods) {
            const result = await adapter._rawSend('some-callbacks', method, {}).then(() => null, (err) => err);
            assert.strictEqual(result, error, `${method} must be rejected`);
        }
        await adapter._rawSend('some-callbacks', 'Fetch.disable', {});
        await adapter._rawSend('some-callbacks', 'Runtime.disable', {});
        assert.deepEqual(sent, ['Input.dispatchMouseEvent', 'Fetch.disable', 'Runtime.disable']);
    });
});
//# sourceMappingURL=PuppeteerConnection.test.js.map