import type * as Platform from '../../../core/platform/platform.js';
import * as ThirdPartyWeb from '../../../third_party/third-party-web/third-party-web.js';
import * as Types from '../types/types.js';
import type { ParsedTrace } from './types.js';
export type Entity = typeof ThirdPartyWeb.ThirdPartyWeb.entities[number];
export interface EntityMappings {
    createdEntityCache: Map<string, Entity>;
    entityByEvent: Map<Types.Events.Event, Entity>;
    /**
     * This holds the entities that had to be created, because they were not found using the
     * ThirdPartyWeb database.
     */
    eventsByEntity: Map<Entity, Types.Events.Event[]>;
}
export declare function getEntityForEvent(event: Types.Events.Event, entityByUrlCache: Map<string, Entity>): Entity | undefined;
export declare function getEntityForUrl(url: string, entityByUrlCache: Map<string, Entity>): Entity | undefined;
export declare function getNonResolvedURL(entry: Types.Events.Event, parsedTrace?: ParsedTrace): Platform.DevToolsPath.UrlString | null;
export declare function makeUpEntity(entityCache: Map<string, Entity>, url: string): Entity | undefined;
export declare function updateEventForEntities(entry: Types.Events.Event, entityMappings: EntityMappings): void;
