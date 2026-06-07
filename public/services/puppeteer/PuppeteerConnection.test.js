// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
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
});
//# sourceMappingURL=PuppeteerConnection.test.js.map