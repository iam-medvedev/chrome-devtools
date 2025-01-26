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
    computePosition(time: Trace.Types.Timing.Milli): number;
    positionToTime(position: number): Trace.Types.Timing.Milli;
    setBounds(minimumBoundary: Trace.Types.Timing.Milli, maximumBoundary: Trace.Types.Timing.Milli): void;
    setNavStartTimes(navStartTimes: readonly Trace.Types.Events.NavigationStart[]): void;
    setDisplayWidth(clientWidth: number): void;
    reset(): void;
    formatValue(time: Trace.Types.Timing.Milli, precision?: number): string;
    maximumBoundary(): Trace.Types.Timing.Milli;
    minimumBoundary(): Trace.Types.Timing.Milli;
    zeroTime(): Trace.Types.Timing.Milli;
    /**
     * This function returns the time different between min time and max time of current minimap.
     *
     * @returns the time range in milliseconds
     */
    boundarySpan(): Trace.Types.Timing.Milli;
}
