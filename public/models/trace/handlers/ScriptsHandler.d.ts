import type * as SDK from '../../../core/sdk/sdk.js';
import type * as Protocol from '../../../generated/protocol.js';
import * as Types from '../types/types.js';
export interface ScriptsData {
    /** Note: this is only populated when the "Enhanced Traces" feature is enabled. */
    scripts: Map<Protocol.Runtime.ScriptId, Script>;
}
export interface Script {
    scriptId: Protocol.Runtime.ScriptId;
    frame: string;
    ts: Types.Timing.Micro;
    url?: string;
    content?: string;
    sourceMapUrl?: string;
    sourceMap?: SDK.SourceMap.SourceMap;
}
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(options: Types.Configuration.ParseOptions): Promise<void>;
export declare function data(): ScriptsData;
