import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Types from '../types/types.js';
import { type InsightResult, type NavigationInsightContext, type RequiredData } from './types.js';
export declare function deps(): ['Meta', 'NetworkRequests', 'Renderer', 'ImagePainting'];
type Entity = typeof ThirdPartyWeb.ThirdPartyWeb.entities[number];
interface Summary {
    transferSize: number;
    mainThreadTime: Types.Timing.MicroSeconds;
}
export type ThirdPartyWebInsightResult = InsightResult<{
    entityByRequest: Map<Types.TraceEvents.SyntheticNetworkRequest, Entity>;
    requestsByEntity: Map<Entity, Types.TraceEvents.SyntheticNetworkRequest[]>;
    summaryByRequest: Map<Types.TraceEvents.SyntheticNetworkRequest, Summary>;
    summaryByEntity: Map<Entity, Summary>;
    /** The entity for this navigation's URL. Any other entity is from a third party. */
    firstPartyEntity?: Entity;
}>;
export declare function generateInsight(traceData: RequiredData<typeof deps>, context: NavigationInsightContext): ThirdPartyWebInsightResult;
export {};
