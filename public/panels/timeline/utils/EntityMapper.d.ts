import type * as Protocol from '../../../generated/protocol.js';
import * as Trace from '../../../models/trace/trace.js';
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
    firstPartyEntity(): Trace.Handlers.Helpers.Entity | null;
    thirdPartyEvents(): Trace.Types.Events.Event[];
    mappings(): Trace.Handlers.Helpers.EntityMappings;
    /**
     * This updates entity mapping given a callFrame and sourceURL (newly resolved),
     * updating both eventsByEntity and entityByEvent. The call frame provides us the
     * URL and sourcemap source location that events map to. This describes the exact events we
     * want to update. We then update the events with the new sourceURL.
     *
     * compiledURLs -> the actual file's url (e.g. my-big-bundle.min.js)
     * sourceURLs -> the resolved urls (e.g. react.development.js, my-app.ts)
     * @param callFrame
     * @param sourceURL
     */
    updateSourceMapEntities(callFrame: Protocol.Runtime.CallFrame, sourceURL: string): void;
}
