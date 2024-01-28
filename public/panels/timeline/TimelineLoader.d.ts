import * as Common from '../../core/common/common.js';
import type * as Platform from '../../core/platform/platform.js';
import type * as Protocol from '../../generated/protocol.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
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
    private state;
    private buffer;
    private firstRawChunk;
    private firstChunk;
    private loadedBytes;
    private totalSize;
    private readonly jsonTokenizer;
    private filter;
    constructor(client: Client, title?: string);
    static loadFromFile(file: File, client: Client): Promise<TimelineLoader>;
    static loadFromEvents(events: TraceEngine.TracingManager.EventPayload[], client: Client): TimelineLoader;
    static getCpuProfileFilter(): TimelineModel.TimelineModelFilter.TimelineVisibleEventsFilter;
    static loadFromCpuProfile(profile: Protocol.Profiler.Profile | null, client: Client, title?: string): TimelineLoader;
    static loadFromURL(url: Platform.DevToolsPath.UrlString, client: Client): Promise<TimelineLoader>;
    addEvents(events: TraceEngine.TracingManager.EventPayload[]): Promise<void>;
    cancel(): Promise<void>;
    write(chunk: string): Promise<void>;
    private writeBalancedJSON;
    private reportErrorAndCancelLoading;
    private looksLikeAppVersion;
    close(): Promise<void>;
    private isCpuProfile;
    private finalizeTrace;
    traceFinalizedForTest(): Promise<void>;
    private parseCPUProfileFormat;
}
export declare const TransferChunkLengthBytes = 5000000;
export declare const enum State {
    Initial = "Initial",
    LookingForEvents = "LookingForEvents",
    ReadingEvents = "ReadingEvents",
    SkippingTail = "SkippingTail",
    LoadingCPUProfileFromFile = "LoadingCPUProfileFromFile",
    LoadingCPUProfileFromRecording = "LoadingCPUProfileFromRecording"
}
