import * as Host from '../../../core/host/host.js';
import type * as TimelineUtils from '../../../panels/timeline/utils/utils.js';
import { PerformanceAgent } from './PerformanceAgent.js';
export declare class PerformanceAnnotationsAgent extends PerformanceAgent {
    get clientFeature(): Host.AidaClient.ClientFeature;
    /**
     * Used in the Performance panel to automatically generate a label for a selected entry.
     */
    generateAIEntryLabel(callTree: TimelineUtils.AICallTree.AICallTree): Promise<string>;
}
