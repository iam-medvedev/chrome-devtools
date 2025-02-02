import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
import type * as Protocol from '../../generated/protocol.js';
import * as Trace from '../../models/trace/trace.js';
import type { Client } from './TimelineController.js';
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
    private canceledCallback;
    private buffer;
    private firstRawChunk;
    private totalSize;
    private filter;
    constructor(client: Client);
    static loadFromFile(file: File, client: Client): Promise<TimelineLoader>;
    static loadFromEvents(events: Trace.Types.Events.Event[], client: Client): TimelineLoader;
    static loadFromCpuProfile(profile: Protocol.Profiler.Profile, client: Client): TimelineLoader;
    static loadFromURL(url: Platform.DevToolsPath.UrlString, client: Client): Promise<TimelineLoader>;
    addEvents(events: readonly Trace.Types.Events.Event[]): Promise<void>;
    cancel(): Promise<void>;
    /**
     * As TimelineLoader implements `Common.StringOutputStream.OutputStream`, `write()` is called when a
     * Common.StringOutputStream.StringOutputStream instance has decoded a chunk. This path is only used
     * by `loadFromFile()`; it's NOT used by `loadFromEvents` or `loadFromURL`.
     */
    write(chunk: string, endOfFile: boolean): Promise<void>;
    private reportErrorAndCancelLoading;
    close(): Promise<void>;
    private finalizeTrace;
    traceFinalizedForTest(): Promise<void>;
}
