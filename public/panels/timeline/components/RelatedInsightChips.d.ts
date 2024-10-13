import type * as Trace from '../../../models/trace/trace.js';
export interface RelatedInsight {
    insightLabel: string;
    activateInsight: () => void;
}
export type EventToRelatedInsightsMap = Map<Trace.Types.Events.Event, RelatedInsight[]>;
export interface Data {
    eventToRelatedInsightsMap: EventToRelatedInsightsMap;
    activeEvent: Trace.Types.Events.Event | null;
}
export declare class RelatedInsightChips extends HTMLElement {
    #private;
    connectedCallback(): void;
    set activeEvent(event: Data['activeEvent']);
    set eventToRelatedInsightsMap(map: Data['eventToRelatedInsightsMap']);
}
