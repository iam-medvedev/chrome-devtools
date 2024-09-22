import * as Trace from '../../../../models/trace/trace.js';
import { type Calculator } from './TimelineGrid.js';
export declare class TimelineOverviewCalculator implements Calculator {
    #private;
    private workingArea;
    private navStartTimes?;
    computePosition(time: Trace.Types.Timing.MilliSeconds): number;
    positionToTime(position: number): number;
    setBounds(minimumBoundary: Trace.Types.Timing.MilliSeconds, maximumBoundary: Trace.Types.Timing.MilliSeconds): void;
    setNavStartTimes(navStartTimes: readonly Trace.Types.Events.NavigationStart[]): void;
    setDisplayWidth(clientWidth: number): void;
    reset(): void;
    formatValue(value: number, precision?: number): string;
    maximumBoundary(): Trace.Types.Timing.MilliSeconds;
    minimumBoundary(): Trace.Types.Timing.MilliSeconds;
    zeroTime(): Trace.Types.Timing.MilliSeconds;
    boundarySpan(): Trace.Types.Timing.MilliSeconds;
}
