import * as TraceEngine from '../../models/trace/trace.js';
export declare const EventCategories: readonly ["Loading", "Experience", "Scripting", "Rendering", "Painting", "GPU", "Async", "Other", "Idle"];
export type EventCategory = typeof EventCategories[number];
export declare class TimelineRecordStyle {
    title: string;
    category: TimelineCategory;
    hidden: boolean;
    constructor(title: string, category: TimelineCategory, hidden?: boolean | undefined);
}
export declare class TimelineCategory {
    name: string;
    title: string;
    visible: boolean;
    childColor: string;
    colorInternal: string;
    private hiddenInternal?;
    constructor(name: string, title: string, visible: boolean, childColor: string, color: string);
    get hidden(): boolean;
    get color(): string;
    getCSSValue(): string;
    getComputedColorValue(): string;
    set hidden(hidden: boolean);
}
export type CategoryPalette = {
    [c in EventCategory]: TimelineCategory;
};
export declare function getEventStyle(eventName: TraceEngine.Types.TraceEvents.KnownEventName): TimelineRecordStyle | undefined;
export declare function getCategoryStyles(): CategoryPalette;
