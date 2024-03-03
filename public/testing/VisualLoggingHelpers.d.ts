import type * as Host from '../core/host/host.js';
export declare function stabilizeImpressions(impressions: Host.InspectorFrontendHostAPI.VisualElementImpression[]): Host.InspectorFrontendHostAPI.VisualElementImpression[];
export declare function stabilizeEvent<Event extends {
    veid: number;
}>(event: Event): Event;
export declare function stabilizeState<State extends {
    veid: number;
    parent: State | null;
}>(state: State, mapping?: Map<number, number>): State;
