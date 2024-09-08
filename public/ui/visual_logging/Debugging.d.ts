import { type Loggable } from './Loggable.js';
import { type LoggingConfig } from './LoggingConfig.js';
import { type LoggingState } from './LoggingState.js';
export declare function processForDebugging(loggable: Loggable): void;
type EventType = 'Click' | 'Drag' | 'Hover' | 'Change' | 'KeyDown' | 'Resize';
export declare function processEventForDebugging(event: EventType, state: LoggingState | null, extraInfo?: EventAttributes): void;
export declare function processEventForIntuitiveDebugging(event: EventType, state: LoggingState | null, extraInfo?: EventAttributes): void;
export declare function processEventForTestDebugging(event: EventType, state: LoggingState | null, _extraInfo?: EventAttributes): void;
export declare function processEventForAdHocAnalysisDebugging(event: EventType, state: LoggingState | null, extraInfo?: EventAttributes): void;
export type EventAttributes = {
    context?: string;
    width?: number;
    height?: number;
    mouseButton?: number;
    doubleClick?: boolean;
};
type TestLogEntry = {
    impressions: string[];
} | {
    interaction: string;
};
export declare function processImpressionsForDebugging(states: LoggingState[]): void;
export declare function debugString(config: LoggingConfig): string;
export declare const enum DebugLoggingFormat {
    INTUITIVE = "Intuitive",
    TEST = "Test",
    AD_HOC_ANALYSIS = "AdHocAnalysis"
}
export declare function setVeDebugLoggingEnabled(enabled: boolean, format?: DebugLoggingFormat): void;
export declare function processStartLoggingForDebugging(): void;
export declare function expectVeEvents(expectedEvents: TestLogEntry[]): Promise<void>;
export {};
