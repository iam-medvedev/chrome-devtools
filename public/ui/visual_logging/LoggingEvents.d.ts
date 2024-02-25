import type * as Common from '../../core/common/common.js';
import { type Loggable } from './Loggable.js';
export declare function logImpressions(loggables: Loggable[]): Promise<void>;
export declare function logResize(loggable: Loggable, size: DOMRect, resizeLogThrottler?: Common.Throttler.Throttler): Promise<void>;
export declare function logClick(loggable: Loggable, event: Event, options?: {
    doubleClick?: boolean;
}): Promise<void>;
export declare const logHover: (hoverLogThrottler: Common.Throttler.Throttler) => (event: Event) => Promise<void>;
export declare const logDrag: (dragLogThrottler: Common.Throttler.Throttler) => (event: Event) => Promise<void>;
export declare function logChange(event: Event): Promise<void>;
export declare const logKeyDown: (codes: string[], keyboardLogThrottler: Common.Throttler.Throttler) => (event: Event) => Promise<void>;
