import type * as Common from '../../core/common/common.js';
import { type Loggable } from './Loggable.js';
export declare function logImpressions(loggables: Loggable[]): Promise<void>;
export declare const logResize: (throttler: Common.Throttler.Throttler) => (loggable: Loggable, size: DOMRect) => void;
export declare const logClick: (throttler: Common.Throttler.Throttler) => (loggable: Loggable, event: Event, options?: {
    doubleClick?: boolean;
}) => void;
export declare const logHover: (throttler: Common.Throttler.Throttler) => (event: Event) => Promise<void>;
export declare const logDrag: (throttler: Common.Throttler.Throttler) => (event: Event) => Promise<void>;
export declare function logChange(event: Event): Promise<void>;
export declare const logKeyDown: (throttler: Common.Throttler.Throttler, codes?: string[]) => (event: Event | null, context?: string) => Promise<void>;
