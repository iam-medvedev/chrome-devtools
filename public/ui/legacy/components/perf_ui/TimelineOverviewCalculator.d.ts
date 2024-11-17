import * as Trace from '../../../../models/trace/trace.js';
import type { Calculator } from './TimelineGrid.js';
export declare class TimelineOverviewCalculator implements Calculator {
    #private;
    private navStartTimes?;
    /**
     * Given a timestamp, returns its x position in the minimap.
     *
     * @param time
     * @returns position in pixel
     */
    computePosition(time: Trace.Types.Timing.MilliSeconds): number;
    positionToTime(position: number): Trace.Types.Timing.MilliSeconds;
    setBounds(minimumBoundary: Trace.Types.Timing.MilliSeconds, maximumBoundary: Trace.Types.Timing.MilliSeconds): void;
    setNavStartTimes(navStartTimes: readonly Trace.Types.Events.NavigationStart[]): void;
    setDisplayWidth(clientWidth: number): void;
    reset(): void;
    formatValue(time: Trace.Types.Timing.MilliSeconds, precision?: number): string;
    maximumBoundary(): Trace.Types.Timing.MilliSeconds;
    minimumBoundary(): Trace.Types.Timing.MilliSeconds;
    zeroTime(): Trace.Types.Timing.MilliSeconds;
    /**
     * This function returns the time different between min time and max time of current minimap.
     *
     * @returns the time range in milliseconds
     */
    boundarySpan(): Trace.Types.Timing.MilliSeconds;
}
