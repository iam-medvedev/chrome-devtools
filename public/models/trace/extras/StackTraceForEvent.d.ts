import type * as Protocol from '../../../generated/protocol.js';
import type * as Handlers from '../handlers/handlers.js';
import * as Types from '../types/types.js';
export declare const stackTraceForEventInTrace: Map<Readonly<Handlers.Types.EnabledHandlerDataWithMeta<typeof Handlers.ModelHandlers>>, Map<Types.Events.Event, Protocol.Runtime.StackTrace>>;
export declare function clearCacheForTrace(parsedTrace: Handlers.Types.ParsedTrace): void;
export declare function get(event: Types.Events.Event, parsedTrace: Handlers.Types.ParsedTrace): Protocol.Runtime.StackTrace | null;
