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
export declare class ScopeChainModel extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    constructor(callFrame: SDK.DebuggerModel.CallFrame);
    dispose(): void;
}
export declare const enum Events {
    ScopeChainUpdated = "ScopeChainUpdated"
}
export type EventTypes = {
    [Events.ScopeChainUpdated]: ScopeChain;
};
/**
 * Placeholder event payload.
 *
 * TODO(crbug.com/40277685): Send an actual scope chain.
 */
export declare class ScopeChain {
    readonly callFrame: SDK.DebuggerModel.CallFrame;
    constructor(callFrame: SDK.DebuggerModel.CallFrame);
}
