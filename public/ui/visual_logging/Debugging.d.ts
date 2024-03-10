import { type Loggable } from './Loggable.js';
import { type LoggingConfig } from './LoggingConfig.js';
export declare function processForDebugging(loggable: Loggable): void;
export declare function showDebugPopoverForEvent(name: string, config?: LoggingConfig, context?: string): void;
export declare function debugString(config: LoggingConfig): string;
