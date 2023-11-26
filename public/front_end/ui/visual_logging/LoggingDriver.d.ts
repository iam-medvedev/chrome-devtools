import * as Common from '../../core/common/common.js';
export declare function startLogging(options?: {
    domProcessingThrottler?: Common.Throttler.Throttler;
    keyboardLogThrottler?: Common.Throttler.Throttler;
    hoverLogThrottler?: Common.Throttler.Throttler;
    dragLogThrottler?: Common.Throttler.Throttler;
}): Promise<void>;
export declare function stopLogging(): void;
