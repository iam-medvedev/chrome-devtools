import type * as Types from '../types/types.js';
import type * as Handlers from '../handlers/handlers.js';
export interface Data {
    zeroTime: Types.Timing.MicroSeconds;
    spanTime: Types.Timing.MicroSeconds;
    frames: readonly Frame[];
}
export interface Frame {
    screenshotEvent: Types.TraceEvents.TraceEventSnapshot;
    screenshotAsString: string;
    index: number;
}
export type HandlersWithFilmStrip = Handlers.Types.HandlersWithMeta<{
    Screenshots: typeof Handlers.ModelHandlers.Screenshots;
}>;
export type HandlerDataWithScreenshots = Handlers.Types.EnabledHandlerDataWithMeta<{
    Screenshots: typeof Handlers.ModelHandlers.Screenshots;
}>;
export declare function fromTraceData(traceData: HandlerDataWithScreenshots, customZeroTime?: Types.Timing.MicroSeconds): Data;
export declare function frameClosestToTimestamp(filmStrip: Data, searchTimestamp: Types.Timing.MicroSeconds): Frame | null;
