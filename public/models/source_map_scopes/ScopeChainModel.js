// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
/**
 * This class is responsible for resolving / updating the scope chain for a specific {@link SDK.DebuggerModel.CallFrame}
 * instance.
 *
 * There are several sources that can influence the scope view:
 *   - Debugger plugins can provide the whole scope info (e.g. from DWARF)
 *   - Source Maps can provide OR augment scope info
 *
 * Source maps can be enabled/disabled dynamically and debugger plugins can attach debug info after the fact.
 *
 * This class tracks all that and sends events with the latest scope chain for a specific call frame.
 */
export class ScopeChainModel extends Common.ObjectWrapper.ObjectWrapper {
    #callFrame;
    /** We use the `Throttler` here to make sure that `#boundUpdate` is not run multiple times simultanously */
    #throttler = new Common.Throttler.Throttler(5);
    #boundUpdate = this.#update.bind(this);
    constructor(callFrame) {
        super();
        this.#callFrame = callFrame;
        this.#callFrame.debuggerModel.addEventListener(SDK.DebuggerModel.Events.DebugInfoAttached, this.#debugInfoAttached, this);
        this.#callFrame.debuggerModel.sourceMapManager().addEventListener(SDK.SourceMapManager.Events.SourceMapAttached, this.#sourceMapAttached, this);
        void this.#throttler.schedule(this.#boundUpdate);
    }
    dispose() {
        this.#callFrame.debuggerModel.removeEventListener(SDK.DebuggerModel.Events.DebugInfoAttached, this.#debugInfoAttached, this);
        this.#callFrame.debuggerModel.sourceMapManager().removeEventListener(SDK.SourceMapManager.Events.SourceMapAttached, this.#sourceMapAttached, this);
    }
    async #update() {
        // TODO(crbug.com/40277685): Actually resolve the scope info and send it along with the event.
        this.dispatchEventToListeners("ScopeChainUpdated" /* Events.ScopeChainUpdated */, new ScopeChain(this.#callFrame));
    }
    #debugInfoAttached(event) {
        if (event.data === this.#callFrame.script) {
            void this.#throttler.schedule(this.#boundUpdate);
        }
    }
    #sourceMapAttached(event) {
        if (event.data.client === this.#callFrame.script) {
            void this.#throttler.schedule(this.#boundUpdate);
        }
    }
}
/**
 * Placeholder event payload.
 *
 * TODO(crbug.com/40277685): Send an actual scope chain.
 */
export class ScopeChain {
    callFrame;
    constructor(callFrame) {
        this.callFrame = callFrame;
    }
}
//# sourceMappingURL=ScopeChainModel.js.map