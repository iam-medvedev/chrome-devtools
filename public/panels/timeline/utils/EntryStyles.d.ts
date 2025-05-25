import type * as Platform from '../../../core/platform/platform.js';
import * as Trace from '../../../models/trace/trace.js';
export declare enum EventCategory {
    DRAWING = "drawing",
    RASTERIZING = "rasterizing",
    LAYOUT = "layout",
    LOADING = "loading",
    EXPERIENCE = "experience",
    SCRIPTING = "scripting",
    MESSAGING = "messaging",
    RENDERING = "rendering",
    PAINTING = "painting",
    GPU = "gpu",
    ASYNC = "async",
    OTHER = "other",
    IDLE = "idle"
}
export declare class TimelineRecordStyle {
    title: string;
    category: TimelineCategory;
    hidden: boolean;
    constructor(title: string, category: TimelineCategory, hidden?: boolean | undefined);
}
export declare class TimelineCategory {
    #private;
    name: EventCategory;
    title: Platform.UIString.LocalizedString;
    visible: boolean;
    childColor: string;
    colorInternal: string;
    constructor(name: EventCategory, title: Platform.UIString.LocalizedString, visible: boolean, childColor: string, color: string);
    get hidden(): boolean;
    get color(): string;
    getCSSValue(): string;
    getComputedColorValue(): string;
    set hidden(hidden: boolean);
}
export type CategoryPalette = Record<EventCategory, TimelineCategory>;
type EventStylesMap = Partial<Record<Trace.Types.Events.Name, TimelineRecordStyle>>;
export declare function getEventStyle(eventName: Trace.Types.Events.Name): TimelineRecordStyle | undefined;
export declare function stringIsEventCategory(it: string): it is EventCategory;
export declare function getCategoryStyles(): CategoryPalette;
export declare function maybeInitSylesMap(): EventStylesMap;
export declare function setEventStylesMap(eventStyles: EventStylesMap): void;
export declare function setCategories(cats: CategoryPalette): void;
export declare function visibleTypes(): string[];
export declare function getTimelineMainEventCategories(): EventCategory[];
export declare function setTimelineMainEventCategories(categories: EventCategory[]): void;
export declare function markerDetailsForEvent(event: Trace.Types.Events.Event): {
    color: string;
    title: string;
};
export {};
