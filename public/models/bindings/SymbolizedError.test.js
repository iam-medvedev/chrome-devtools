// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import { setupRuntimeHooks } from '../../testing/RuntimeHelpers.js';
import { setupSettingsHooks } from '../../testing/SettingsHelpers.js';
import { TestUniverse } from '../../testing/TestUniverse.js';
describe('SymbolizedError', () => {
    setupRuntimeHooks();
    setupSettingsHooks();
    let universe;
    beforeEach(() => {
        universe = new TestUniverse();
    });
    it('can create a SymbolizedError from a RemoteObject', async () => {
        const target = universe.createTarget({});
        const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
        assert.exists(runtimeModel);
        const errorStack = 'Error: some error\n    at http://example.com/script.js:1:1';
        const causeStack = 'Error: cause error\n    at http://example.com/script.js:2:2';
        const causeRemoteObject = {
            subtype: 'error',
            description: causeStack,
            runtimeModel: () => runtimeModel,
            getAllProperties: async () => ({ properties: [], internalProperties: [] }),
        };
        const errorRemoteObject = {
            subtype: 'error',
            description: errorStack,
            runtimeModel: () => runtimeModel,
            objectId: '1',
            getAllProperties: async () => ({
                properties: [{ name: 'cause', value: causeRemoteObject }],
                internalProperties: [],
            }),
        };
        const symbolizedError = await universe.debuggerWorkspaceBinding.createSymbolizedError(errorRemoteObject);
        assert.exists(symbolizedError);
        assert.strictEqual(symbolizedError.remoteError.errorStack, errorStack);
        assert.strictEqual(symbolizedError.stackTrace.syncFragment.frames[0].url, 'http://example.com/script.js');
        assert.exists(symbolizedError.cause);
        assert.strictEqual(symbolizedError.cause.remoteError.errorStack, causeStack);
        assert.strictEqual(symbolizedError.cause.stackTrace.syncFragment.frames[0].url, 'http://example.com/script.js');
        assert.strictEqual(symbolizedError.cause.stackTrace.syncFragment.frames[0].line, 1); // 0-based in frames
    });
});
//# sourceMappingURL=SymbolizedError.test.js.map