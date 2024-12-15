import type * as Trace from '../../../models/trace/trace.js';
export declare class EntityMapper {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    /**
     * Returns an entity for a given event if any.
     */
    entityForEvent(event: Trace.Types.Events.Event): Trace.Handlers.Helpers.Entity | null;
    /**
     * Returns trace events that correspond with a given entity if any.
     */
    eventsForEntity(entity: Trace.Handlers.Helpers.Entity): Trace.Types.Events.Event[];
    mappings(): Trace.Handlers.Helpers.EntityMappings;
}
