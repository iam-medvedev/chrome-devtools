import type * as Trace from '../../models/trace/trace.js';
export declare class NodeNamesUpdated extends Event {
    static readonly eventName = "nodenamesupdated";
    constructor();
}
export declare class SourceMapsResolver extends EventTarget {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    static clearResolvedNodeNames(): void;
    static resolvedNodeNameForEntry(entry: Trace.Types.Events.SyntheticProfileCall): string | null;
    static storeResolvedNodeNameForEntry(pid: Trace.Types.Events.ProcessID, tid: Trace.Types.Events.ThreadID, nodeId: number, resolvedFunctionName: string | null): void;
    install(): Promise<void>;
    /**
     * Removes the event listeners and stops tracking newly added sourcemaps.
     * Should be called before destroying an instance of this class to avoid leaks
     * with listeners.
     */
    uninstall(): void;
}
