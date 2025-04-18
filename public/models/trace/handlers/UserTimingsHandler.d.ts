import * as Types from '../types/types.js';
export interface UserTimingsData {
    /**
     * Events triggered with the performance.measure() API.
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure
     */
    performanceMeasures: readonly Types.Events.SyntheticUserTimingPair[];
    /**
     * Events triggered with the performance.mark() API.
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
     */
    performanceMarks: readonly Types.Events.PerformanceMark[];
    /**
     * Events triggered with the console.time(), console.timeEnd() and
     * console.timeLog() API.
     * https://developer.mozilla.org/en-US/docs/Web/API/console/time
     */
    consoleTimings: readonly Types.Events.SyntheticConsoleTimingPair[];
    /**
     * Events triggered with the console.timeStamp() API
     * https://developer.mozilla.org/en-US/docs/Web/API/console/timeStamp
     */
    timestampEvents: readonly Types.Events.ConsoleTimeStamp[];
    /**
     * Events triggered to trace the call to performance.measure itself,
     * cached by trace_id.
     */
    measureTraceByTraceId: Map<number, Types.Events.UserTimingMeasure>;
}
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export declare function data(): UserTimingsData;
