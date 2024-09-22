import * as Types from '../types/types.js';
import type * as Protocol from '../../../generated/protocol.js';
export declare function reset(): void;
export declare function handleEvent(event: Types.Events.Event): void;
export declare function data(): Map<Protocol.DOM.BackendNodeId, Types.Events.LargestImagePaintCandidate>;
