import { type Loggable } from './Loggable.js';
import { type LoggingConfig } from './LoggingConfig.js';
export interface LoggingState {
    impressionLogged: boolean;
    processed: boolean;
    config: LoggingConfig;
    context: ContextProvider;
    veid: number;
    parent: LoggingState | null;
    processedForDebugging?: boolean;
    size?: DOMRect;
    selectOpen?: boolean;
}
export declare function getOrCreateLoggingState(loggable: Loggable, config: LoggingConfig, parent?: Loggable): LoggingState;
export declare function getLoggingState(loggable: Loggable): LoggingState | null;
export type ContextProvider = (e: Loggable | Event) => Promise<number | undefined>;
export declare function registerContextProvider(name: string, provider: ContextProvider): void;
type ParentProvider = (e: Element) => Element | undefined;
export declare function registerParentProvider(name: string, provider: ParentProvider): void;
export {};
