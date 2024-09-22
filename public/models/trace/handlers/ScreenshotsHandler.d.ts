import * as Types from '../types/types.js';
import { type HandlerName } from './types.js';
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function finalize(): Promise<void>;
export declare function data(): Types.Events.SyntheticScreenshot[];
export declare function deps(): HandlerName[];
