import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
import type * as Protocol from '../../generated/protocol.js';
import * as TraceEngine from '../../models/trace/trace.js';
import { type Client } from './TimelineController.js';
/**
 * This class handles loading traces from file and URL, and from the Lighthouse panel
 * It also handles loading cpuprofiles from file, url and console.profileEnd()
 *
 * Meanwhile, the normal trace recording flow bypasses TimelineLoader entirely,
 * as it's handled from TracingManager => TimelineController.
 */
export declare class TimelineLoader implements Common.StringOutputStream.OutputStream {
    #private;
    private client;
    private tracingModel;
    private canceledCallback;
    private buffer;
    private firstRawChunk;
    private totalSize;
    private filter;
    constructor(client: Client, title?: string);
    static loadFromFile(file: File, client: Client): Promise<TimelineLoader>;
    static loadFromEvents(events: TraceEngine.TracingManager.EventPayload[], client: Client): TimelineLoader;
    static loadFromCpuProfile(profile: Protocol.Profiler.Profile | null, client: Client, title?: string): TimelineLoader;
    static loadFromURL(url: Platform.DevToolsPath.UrlString, client: Client): Promise<TimelineLoader>;
    addEvents(events: TraceEngine.TracingManager.EventPayload[]): Promise<void>;
    cancel(): Promise<void>;
    /**
     * As TimelineLoader implements `Common.StringOutputStream.OutputStream`, `write()` is called when a
     * Common.StringOutputStream.StringOutputStream instance has decoded a chunk. This path is only used
     * by `loadFromURL()`; it's NOT used by `loadFromEvents` or `loadFromFile`.
     */
    write(chunk: string, endOfFile: boolean): Promise<void>;
    private reportErrorAndCancelLoading;
    close(): Promise<void>;
    private isCpuProfile;
    private finalizeTrace;
    traceFinalizedForTest(): Promise<void>;
    private parseCPUProfileFormat;
}
