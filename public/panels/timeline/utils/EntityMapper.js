// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
export class EntityMapper {
    #parsedTrace;
    #entityMappings;
    constructor(parsedTrace) {
        this.#parsedTrace = parsedTrace;
        this.#entityMappings = this.#initializeEntityMappings(this.#parsedTrace);
    }
    /**
     * This initializes our maps using the parsedTrace data from both the RendererHandler and
     * the NetworkRequestsHandler.
     */
    #initializeEntityMappings(parsedTrace) {
        // NetworkRequestHander caches.
        const entityByNetworkEvent = parsedTrace.NetworkRequests.entityMappings.entityByEvent;
        const networkEventsByEntity = parsedTrace.NetworkRequests.entityMappings.eventsByEntity;
        const networkCreatedCache = parsedTrace.NetworkRequests.entityMappings.createdEntityCache;
        // RendrerHandler caches.
        const entityByRendererEvent = parsedTrace.Renderer.entityMappings.entityByEvent;
        const rendererEventsByEntity = parsedTrace.Renderer.entityMappings.eventsByEntity;
        const rendererCreatedCache = parsedTrace.Renderer.entityMappings.createdEntityCache;
        // Build caches.
        const entityByEvent = new Map([...entityByNetworkEvent, ...entityByRendererEvent]);
        const createdEntityCache = new Map([...networkCreatedCache, ...rendererCreatedCache]);
        const eventsByEntity = this.#mergeEventsByEntities(rendererEventsByEntity, networkEventsByEntity);
        return {
            entityByEvent,
            eventsByEntity,
            createdEntityCache,
        };
    }
    #mergeEventsByEntities(a, b) {
        const merged = new Map(a);
        for (const [entity, events] of b.entries()) {
            if (merged.has(entity)) {
                const currentEvents = merged.get(entity) ?? [];
                merged.set(entity, [...currentEvents, ...events]);
            }
            else {
                merged.set(entity, [...events]);
            }
        }
        return merged;
    }
    /**
     * Returns an entity for a given event if any.
     */
    entityForEvent(event) {
        return this.#entityMappings.entityByEvent.get(event) ?? null;
    }
    /**
     * Returns trace events that correspond with a given entity if any.
     */
    eventsForEntity(entity) {
        return this.#entityMappings.eventsByEntity.get(entity) ?? [];
    }
    mappings() {
        return this.#entityMappings;
    }
}
//# sourceMappingURL=EntityMapper.js.map