import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Types from '../types/types.js';
import type { InsightResult, InsightSetContext, RequiredData } from './types.js';
export declare function deps(): ['Meta', 'NetworkRequests', 'Renderer', 'ImagePainting'];
export type Entity = typeof ThirdPartyWeb.ThirdPartyWeb.entities[number];
export interface Summary {
    transferSize: number;
    mainThreadTime: Types.Timing.MicroSeconds;
}
export type ThirdPartyWebInsightResult = InsightResult<{
    entityByRequest: Map<Types.Events.SyntheticNetworkRequest, Entity>;
    requestsByEntity: Map<Entity, Types.Events.SyntheticNetworkRequest[]>;
    summaryByRequest: Map<Types.Events.SyntheticNetworkRequest, Summary>;
    summaryByEntity: Map<Entity, Summary>;
    /** The entity for this navigation's URL. Any other entity is from a third party. */
    firstPartyEntity?: Entity;
}>;
export declare function generateInsight(parsedTrace: RequiredData<typeof deps>, context: InsightSetContext): ThirdPartyWebInsightResult;
