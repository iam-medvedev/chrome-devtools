// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import * as Common from '../../core/common/common.js';
import * as DevToolsState from './devtools_state.js';
class FakeProvider extends Common.ObjectWrapper.ObjectWrapper {
    currentStates = [];
    resetCalls = [];
    disposeCalls = 0;
    allStates() {
        return this.currentStates;
    }
    reset(kind) {
        this.resetCalls.push(kind);
    }
    dispose() {
        this.disposeCalls++;
    }
}
describe('StateManager', () => {
    it('forwards state changes from all providers', () => {
        const first = new FakeProvider();
        const second = new FakeProvider();
        const manager = new DevToolsState.StateManager.StateManager([first, second]);
        const listener = sinon.spy();
        manager.addEventListener("StateChanged" /* DevToolsState.State.Events.STATE_CHANGED */, listener);
        first.dispatchEventToListeners("StateChanged" /* DevToolsState.State.Events.STATE_CHANGED */, {
            kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */,
            value: true,
            isDefault: false,
        });
        second.dispatchEventToListeners("StateChanged" /* DevToolsState.State.Events.STATE_CHANGED */, {
            kind: "java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */,
            value: false,
            isDefault: true,
        });
        sinon.assert.calledTwice(listener);
        assert.deepEqual(listener.firstCall.args[0].data, {
            kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */,
            value: true,
            isDefault: false,
        });
        assert.deepEqual(listener.secondCall.args[0].data, {
            kind: "java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */,
            value: false,
            isDefault: true,
        });
    });
    it('returns allStates, nonDefaultStates, and state(kind) across providers', () => {
        const first = new FakeProvider();
        const second = new FakeProvider();
        first.currentStates = [
            { kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */, value: true, isDefault: false },
        ];
        second.currentStates = [
            { kind: "java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */, value: false, isDefault: true },
        ];
        const manager = new DevToolsState.StateManager.StateManager([first, second]);
        assert.deepEqual(manager.allStates(), [
            { kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */, value: true, isDefault: false },
            { kind: "java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */, value: false, isDefault: true },
        ]);
        assert.deepEqual(manager.nonDefaultStates(), [
            { kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */, value: true, isDefault: false },
        ]);
        assert.deepEqual(manager.state("java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */), {
            kind: "java-script-disabled" /* DevToolsState.State.StateKind.JAVASCRIPT_DISABLED */,
            value: false,
            isDefault: true,
        });
    });
    it('returns null from state(kind) when no provider owns the kind', () => {
        const manager = new DevToolsState.StateManager.StateManager([new FakeProvider()]);
        assert.isNull(manager.state("cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */));
    });
    it('delegates reset to all providers', () => {
        const first = new FakeProvider();
        const second = new FakeProvider();
        const manager = new DevToolsState.StateManager.StateManager([first, second]);
        manager.reset("cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */);
        assert.deepEqual(first.resetCalls, ["cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */]);
        assert.deepEqual(second.resetCalls, ["cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */]);
    });
    it('disposes all providers on dispose', () => {
        const first = new FakeProvider();
        const second = new FakeProvider();
        const manager = new DevToolsState.StateManager.StateManager([first, second]);
        manager.dispose();
        assert.strictEqual(first.disposeCalls, 1);
        assert.strictEqual(second.disposeCalls, 1);
    });
    it('stops forwarding events after dispose', () => {
        const first = new FakeProvider();
        const manager = new DevToolsState.StateManager.StateManager([first]);
        const listener = sinon.spy();
        manager.addEventListener("StateChanged" /* DevToolsState.State.Events.STATE_CHANGED */, listener);
        manager.dispose();
        first.dispatchEventToListeners("StateChanged" /* DevToolsState.State.Events.STATE_CHANGED */, {
            kind: "cache-disabled" /* DevToolsState.State.StateKind.CACHE_DISABLED */,
            value: true,
            isDefault: false,
        });
        sinon.assert.notCalled(listener);
    });
});
//# sourceMappingURL=StateManager.test.js.map