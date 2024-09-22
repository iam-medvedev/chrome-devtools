import * as Trace from '../../models/trace/trace.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
export declare abstract class TimelineEventOverview extends PerfUI.TimelineOverviewPane.TimelineOverviewBase {
    constructor(id: string, title: string | null);
    renderBar(begin: number, end: number, position: number, height: number, color: string): void;
}
export declare class TimelineEventOverviewNetwork extends TimelineEventOverview {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    update(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
}
export declare class TimelineEventOverviewCPUActivity extends TimelineEventOverview {
    #private;
    private backgroundCanvas;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    resetCanvas(): void;
    update(): void;
}
export declare class TimelineEventOverviewResponsiveness extends TimelineEventOverview {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    update(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
}
export declare class TimelineFilmStripOverview extends TimelineEventOverview {
    #private;
    private frameToImagePromise;
    private lastFrame;
    private lastElement;
    private drawGeneration?;
    private emptyImage?;
    constructor(filmStrip: Trace.Extras.FilmStrip.Data);
    update(customStartTime?: Trace.Types.Timing.MilliSeconds, customEndTime?: Trace.Types.Timing.MilliSeconds): void;
    private imageByFrame;
    private drawFrames;
    overviewInfoPromise(x: number): Promise<Element | null>;
    reset(): void;
    static readonly Padding = 2;
}
export declare class TimelineEventOverviewMemory extends TimelineEventOverview {
    #private;
    private heapSizeLabel;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    resetHeapSizeLabels(): void;
    update(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
}
export declare class Quantizer {
    private lastTime;
    private quantDuration;
    private readonly callback;
    private counters;
    private remainder;
    constructor(startTime: number, quantDuration: number, callback: (arg0: Array<number>) => void);
    appendInterval(time: number, group: number): void;
}
