import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
export type Entity = typeof ThirdPartyWeb.ThirdPartyWeb.entities[number];
export interface Summary {
    transferSize: number;
    mainThreadTime: Types.Timing.MicroSeconds;
}
export interface SummaryMaps {
    byEntity: Map<Entity, Summary>;
    byEvent: Map<Types.Events.Event, Summary>;
    eventsByEntity: Map<Entity, Types.Events.Event[]>;
}
export declare function getEntitiesByRequest(requests: Types.Events.SyntheticNetworkRequest[]): {
    entityByRequest: Map<Types.Events.SyntheticNetworkRequest, Entity>;
    madeUpEntityCache: Map<string, Entity>;
};
export declare function getSummariesAndEntitiesForTraceBounds(parsedTrace: Handlers.Types.ParsedTrace, traceBounds: Types.Timing.TraceWindowMicroSeconds, networkRequests: Types.Events.SyntheticNetworkRequest[]): {
    summaries: SummaryMaps;
    entityByRequest: Map<Types.Events.SyntheticNetworkRequest, Entity>;
    madeUpEntityCache: Map<string, Entity>;
};
export declare function getSummariesAndEntitiesWithMapping(parsedTrace: Handlers.Types.ParsedTrace, traceBounds: Types.Timing.TraceWindowMicroSeconds, entityMapping: Handlers.Helpers.EntityMappings): {
    summaries: SummaryMaps;
    entityByEvent: Map<Types.Events.Event, Handlers.Helpers.Entity>;
};
