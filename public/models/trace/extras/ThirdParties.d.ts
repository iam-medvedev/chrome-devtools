import type * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
export type Entity = typeof ThirdPartyWeb.ThirdPartyWeb.entities[number];
export interface Summary {
    transferSize: number;
    mainThreadTime: Types.Timing.Milli;
    relatedEvents?: Types.Events.Event[];
    entity: Entity;
}
export interface ThirdPartySummary {
    byEntity: Map<Entity, Summary>;
    byUrl: Map<string, Summary>;
    urlsByEntity: Map<Entity, Set<string>>;
    eventsByEntity: Map<Entity, Types.Events.Event[]>;
    madeUpEntityCache: Map<string, Entity>;
}
/**
 * @param networkRequests Won't be filtered by trace bounds, so callers should ensure it is filtered.
 */
export declare function summarizeThirdParties(parsedTrace: Handlers.Types.ParsedTrace, traceBounds: Types.Timing.TraceWindowMicro): Summary[];
