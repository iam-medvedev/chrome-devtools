import * as Types from '../types/types.js';
import { type AuctionWorkletsData } from './AuctionWorkletsHandler.js';
import { type LayerTreeData } from './LayerTreeHandler.js';
import { type MetaHandlerData } from './MetaHandler.js';
import { type RendererHandlerData } from './RendererHandler.js';
import { type HandlerName } from './types.js';
export declare function reset(): void;
export declare function initialize(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export interface FramesData {
    frames: readonly TimelineFrame[];
    framesById: Readonly<Record<number, TimelineFrame | undefined>>;
}
export declare function data(): FramesData;
export declare function deps(): HandlerName[];
export declare class TimelineFrameModel {
    #private;
    constructor(allEvents: readonly Types.Events.Event[], rendererData: RendererHandlerData, auctionWorkletsData: AuctionWorkletsData, metaData: MetaHandlerData, layerTreeData: LayerTreeData);
    framesById(): Readonly<Record<number, TimelineFrame | undefined>>;
    frames(): TimelineFrame[];
}
export declare class TimelineFrame implements Types.Events.LegacyTimelineFrame {
    cat: string;
    name: string;
    ph: Types.Events.Phase;
    ts: Types.Timing.MicroSeconds;
    pid: Types.Events.ProcessID;
    tid: Types.Events.ThreadID;
    index: number;
    startTime: Types.Timing.MicroSeconds;
    startTimeOffset: Types.Timing.MicroSeconds;
    endTime: Types.Timing.MicroSeconds;
    duration: Types.Timing.MicroSeconds;
    idle: boolean;
    dropped: boolean;
    isPartial: boolean;
    layerTree: Types.Events.LegacyFrameLayerTreeData | null;
    paints: LayerPaintEvent[];
    mainFrameId: number | undefined;
    readonly seqId: number;
    constructor(seqId: number, startTime: Types.Timing.MicroSeconds, startTimeOffset: Types.Timing.MicroSeconds);
    setIndex(i: number): void;
    setEndTime(endTime: Types.Timing.MicroSeconds): void;
    setLayerTree(layerTree: Types.Events.LegacyFrameLayerTreeData | null): void;
    /**
     * Fake the `dur` field to meet the expected value given that we pretend
     * these TimelineFrame classes are trace events across the codebase.
     */
    get dur(): Types.Timing.MicroSeconds;
}
export declare class LayerPaintEvent implements Types.Events.LegacyLayerPaintEvent {
    #private;
    constructor(event: Types.Events.Paint, snapshot: Types.Events.DisplayItemListSnapshot);
    layerId(): number;
    event(): Types.Events.Paint;
    picture(): Types.Events.LegacyLayerPaintEventPicture | null;
}
export declare class PendingFrame {
    paints: LayerPaintEvent[];
    mainFrameId: number | undefined;
    triggerTime: number;
    constructor(triggerTime: number);
}
declare class BeginFrameInfo {
    seqId: number;
    startTime: Types.Timing.MicroSeconds;
    isDropped: boolean;
    isPartial: boolean;
    constructor(seqId: number, startTime: Types.Timing.MicroSeconds, isDropped: boolean, isPartial: boolean);
}
export declare class TimelineFrameBeginFrameQueue {
    private queueFrames;
    private mapFrames;
    addFrameIfNotExists(seqId: number, startTime: Types.Timing.MicroSeconds, isDropped: boolean, isPartial: boolean): void;
    setDropped(seqId: number, isDropped: boolean): void;
    setPartial(seqId: number, isPartial: boolean): void;
    processPendingBeginFramesOnDrawFrame(seqId: number): BeginFrameInfo[];
}
export declare function framesWithinWindow(frames: readonly TimelineFrame[], startTime: Types.Timing.MicroSeconds, endTime: Types.Timing.MicroSeconds): TimelineFrame[];
export {};
