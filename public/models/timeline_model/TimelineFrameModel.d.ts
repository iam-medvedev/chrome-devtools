import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as TraceEngine from '../trace/trace.js';
import { TracingLayerTree } from './TracingLayerTree.js';
export declare class TimelineFrameModel {
    private readonly categoryMapper;
    private frames;
    private frameById;
    private beginFrameQueue;
    private minimumRecordTime;
    private lastFrame;
    private mainFrameCommitted;
    private mainFrameRequested;
    private lastLayerTree;
    private framePendingActivation;
    private currentTaskTimeByCategory;
    private target;
    private framePendingCommit?;
    private lastBeginFrame?;
    private lastNeedsBeginFrame?;
    private lastTaskBeginTime?;
    private layerTreeId?;
    private currentProcessMainThread?;
    constructor(categoryMapper: (arg0: TraceEngine.Legacy.Event) => string);
    getFrames(): TimelineFrame[];
    getFramesWithinWindow(startTime: number, endTime: number): TimelineFrame[];
    hasRasterTile(rasterTask: TraceEngine.Legacy.Event): boolean;
    rasterTilePromise(rasterTask: TraceEngine.Legacy.Event): Promise<{
        rect: Protocol.DOM.Rect;
        snapshot: SDK.PaintProfiler.PaintProfilerSnapshot;
    } | null>;
    reset(): void;
    handleBeginFrame(startTime: number, seqId: number): void;
    handleDroppedFrame(startTime: number, seqId: number, isPartial: boolean): void;
    handleDrawFrame(startTime: number, seqId: number): void;
    handleActivateLayerTree(): void;
    handleRequestMainThreadFrame(): void;
    handleCommit(): void;
    handleLayerTreeSnapshot(layerTree: TracingFrameLayerTree): void;
    handleNeedFrameChanged(startTime: number, needsBeginFrame: boolean): void;
    private startFrame;
    private flushFrame;
    private commitPendingFrame;
    addTraceEvents(target: SDK.Target.Target | null, events: TraceEngine.Legacy.Event[], threadData: {
        thread: TraceEngine.Legacy.Thread;
        time: number;
    }[]): void;
    private addTraceEvent;
    private processCompositorEvents;
    private addMainThreadTraceEvent;
    private addTimeForCategory;
    private static readonly mainFrameMarkers;
}
export declare class TracingFrameLayerTree {
    private readonly target;
    private readonly snapshot;
    private paintsInternal;
    constructor(target: SDK.Target.Target, snapshot: TraceEngine.Legacy.ObjectSnapshot);
    layerTreePromise(): Promise<TracingLayerTree | null>;
    paints(): LayerPaintEvent[];
    setPaints(paints: LayerPaintEvent[]): void;
}
export declare class TimelineFrame {
    startTime: number;
    startTimeOffset: number;
    endTime: number;
    duration: number;
    idle: boolean;
    dropped: boolean;
    isPartial: boolean;
    layerTree: TracingFrameLayerTree | null;
    paints: LayerPaintEvent[];
    mainFrameId: number | undefined;
    seqId: number;
    constructor(seqId: number, startTime: number, startTimeOffset: number);
    setEndTime(endTime: number): void;
    setLayerTree(layerTree: TracingFrameLayerTree | null): void;
}
export declare class LayerPaintEvent {
    private readonly eventInternal;
    private readonly target;
    constructor(event: TraceEngine.Legacy.Event, target: SDK.Target.Target | null);
    layerId(): string;
    event(): TraceEngine.Legacy.Event;
    picturePromise(): Promise<{
        rect: Array<number>;
        serializedPicture: string;
    } | null>;
    snapshotPromise(): Promise<{
        rect: Array<number>;
        snapshot: SDK.PaintProfiler.PaintProfilerSnapshot;
    } | null>;
}
export declare class PendingFrame {
    timeByCategory: {
        [x: string]: number;
    };
    paints: LayerPaintEvent[];
    mainFrameId: number | undefined;
    triggerTime: number;
    constructor(triggerTime: number, timeByCategory: {
        [x: string]: number;
    });
}
declare class BeginFrameInfo {
    seqId: number;
    startTime: number;
    isDropped: boolean;
    isPartial: boolean;
    constructor(seqId: number, startTime: number, isDropped: boolean, isPartial: boolean);
}
export declare class TimelineFrameBeginFrameQueue {
    private queueFrames;
    private mapFrames;
    constructor();
    addFrameIfNotExists(seqId: number, startTime: number, isDropped: boolean, isPartial: boolean): void;
    setDropped(seqId: number, isDropped: boolean): void;
    setPartial(seqId: number, isPartial: boolean): void;
    processPendingBeginFramesOnDrawFrame(seqId: number): BeginFrameInfo[];
}
export {};
