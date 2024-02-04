import * as Common from '../../core/common/common.js';
export declare function isLogging(): boolean;
export declare function startLogging(options?: {
    processingThrottler?: Common.Throttler.Throttler;
    keyboardLogThrottler?: Common.Throttler.Throttler;
    hoverLogThrottler?: Common.Throttler.Throttler;
    dragLogThrottler?: Common.Throttler.Throttler;
    clickLogThrottler?: Common.Throttler.Throttler;
}): Promise<void>;
export declare function addDocument(document: Document): Promise<void>;
export declare function stopLogging(): void;
export declare function scheduleProcessing(): void;
