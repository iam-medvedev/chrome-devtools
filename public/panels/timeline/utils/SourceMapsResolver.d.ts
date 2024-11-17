import type * as Platform from '../../../core/platform/platform.js';
import * as SDK from '../../../core/sdk/sdk.js';
import type * as Protocol from '../../../generated/protocol.js';
import * as Trace from '../../../models/trace/trace.js';
import * as Workspace from '../../../models/workspace/workspace.js';
type ResolvedCodeLocationData = {
    name: string | null;
    devtoolsLocation: Workspace.UISourceCode.UILocation | null;
    script: SDK.Script.Script | null;
};
export declare class SourceMappingsUpdated extends Event {
    static readonly eventName = "sourcemappingsupdated";
    constructor();
}
export declare const resolvedCodeLocationDataNames: Map<Trace.Types.Events.ProcessID, Map<Trace.Types.Events.ThreadID, Map<string, ResolvedCodeLocationData | null>>>;
export declare class SourceMapsResolver extends EventTarget {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    static clearResolvedNodeNames(): void;
    static keyForCodeLocation(callFrame: Protocol.Runtime.CallFrame): string;
    /**
     * For trace events containing a call frame / source location
     * (f.e. a stack trace), attempts to obtain the resolved source
     * location based on the those that have been resolved so far from
     * listened source maps.
     *
     * Note that a single deployed URL can map to multiple authored URLs
     * (f.e. if an app is bundled). Thus, beyond a URL we can use code
     * location data like line and column numbers to obtain the specific
     * authored code according to the source mappings.
     *
     * TODO(andoli): This can return incorrect scripts if the target page has been reloaded since the trace.
     */
    static resolvedCodeLocationForEntry(entry: Trace.Types.Events.Event): ResolvedCodeLocationData | null;
    static resolvedURLForEntry(parsedTrace: Trace.Handlers.Types.ParsedTrace, entry: Trace.Types.Events.Event): Platform.DevToolsPath.UrlString | null;
    static storeResolvedNodeDataForEntry(pid: Trace.Types.Events.ProcessID, tid: Trace.Types.Events.ThreadID, callFrame: Protocol.Runtime.CallFrame, resolvedCodeLocationData: ResolvedCodeLocationData): void;
    install(): Promise<void>;
    /**
     * Removes the event listeners and stops tracking newly added sourcemaps.
     * Should be called before destroying an instance of this class to avoid leaks
     * with listeners.
     */
    uninstall(): void;
}
export {};
