import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as Trace from '../../models/trace/trace.js';
import * as LegacyComponents from '../../ui/legacy/components/utils/utils.js';
import * as Utils from './utils/utils.js';
type LinkifyLocationOptions = {
    scriptId: Protocol.Runtime.ScriptId | null;
    url: string;
    lineNumber: number;
    target: SDK.Target.Target | null;
    linkifier: LegacyComponents.Linkifier.Linkifier;
    isFreshRecording?: boolean;
    columnNumber?: number;
};
export declare class TimelineUIUtils {
    static frameDisplayName(frame: Protocol.Runtime.CallFrame): string;
    static testContentMatching(traceEvent: Trace.Types.Events.Event, regExp: RegExp, parsedTrace?: Trace.Handlers.Types.ParsedTrace): boolean;
    static eventStyle(event: Trace.Types.Events.Event): Utils.EntryStyles.TimelineRecordStyle;
    static eventColor(event: Trace.Types.Events.Event): string;
    static eventTitle(event: Trace.Types.Events.Event): string;
    static isUserFrame(frame: Protocol.Runtime.CallFrame): boolean;
    static buildDetailsTextForTraceEvent(event: Trace.Types.Events.Event, parsedTrace: Trace.Handlers.Types.ParsedTrace): Promise<string | null>;
    static buildDetailsNodeForTraceEvent(event: Trace.Types.Events.Event, target: SDK.Target.Target | null, linkifier: LegacyComponents.Linkifier.Linkifier, isFreshRecording: boolean | undefined, parsedTrace: Trace.Handlers.Types.ParsedTrace): Promise<Node | null>;
    static linkifyLocation(linkifyOptions: LinkifyLocationOptions): Element | null;
    static linkifyTopCallFrame(event: Trace.Types.Events.Event, target: SDK.Target.Target | null, linkifier: LegacyComponents.Linkifier.Linkifier, isFreshRecording?: boolean): Element | null;
    static buildDetailsNodeForMarkerEvents(event: Trace.Types.Events.MarkerEvent): HTMLElement;
    static buildConsumeCacheDetails(eventData: {
        consumedCacheSize?: number;
        cacheRejected?: boolean;
        cacheKind?: string;
    }, contentHelper: TimelineDetailsContentHelper): void;
    static buildTraceEventDetails(parsedTrace: Trace.Handlers.Types.ParsedTrace, event: Trace.Types.Events.Event, linkifier: LegacyComponents.Linkifier.Linkifier, detailed: boolean): Promise<DocumentFragment>;
    static statsForTimeRange(events: Trace.Types.Events.Event[], startTime: Trace.Types.Timing.MilliSeconds, endTime: Trace.Types.Timing.MilliSeconds): {
        [x: string]: number;
    };
    private static renderEventJson;
    private static renderObjectJson;
    static stackTraceFromCallFrames(callFrames: Protocol.Runtime.CallFrame[] | Trace.Types.Events.CallFrame[]): Protocol.Runtime.StackTrace;
    static generateCauses(event: Trace.Types.Events.Event, contentHelper: TimelineDetailsContentHelper, parsedTrace: Trace.Handlers.Types.ParsedTrace): Promise<void>;
    private static createEntryLink;
    private static generateInvalidationsList;
    private static generateInvalidationsForReason;
    private static aggregatedStatsForTraceEvent;
    static buildPicturePreviewContent(parsedTrace: Trace.Handlers.Types.ParsedTrace, event: Trace.Types.Events.Paint, target: SDK.Target.Target): Promise<Element | null>;
    static createEventDivider(event: Trace.Types.Events.Event, zeroTime: number): HTMLDivElement;
    static visibleEventsFilter(): Trace.Extras.TraceFilter.TraceFilter;
    static categories(): Utils.EntryStyles.CategoryPalette;
    static generatePieChart(aggregatedStats: {
        [x: string]: number;
    }, selfCategory?: Utils.EntryStyles.TimelineCategory, selfTime?: number): Element;
    static generateSummaryDetails(aggregatedStats: Record<string, number>, rangeStart: number, rangeEnd: number): Element;
    static generateDetailsContentForFrame(frame: Trace.Types.Events.LegacyTimelineFrame, filmStrip: Trace.Extras.FilmStrip.Data | null, filmStripFrame: Trace.Extras.FilmStrip.Frame | null): DocumentFragment;
    static frameDuration(frame: Trace.Types.Events.LegacyTimelineFrame): Element;
    static quadWidth(quad: number[]): number;
    static quadHeight(quad: number[]): number;
    static eventDispatchDesciptors(): EventDispatchTypeDescriptor[];
    static markerStyleForEvent(event: Trace.Types.Events.Event): TimelineMarkerStyle;
    static colorForId(id: string): string;
    static displayNameForFrame(frame: Trace.Types.Events.TraceFrame, trimAt?: number): string;
}
export declare const aggregatedStatsKey: unique symbol;
export declare const previewElementSymbol: unique symbol;
export declare class EventDispatchTypeDescriptor {
    priority: number;
    color: string;
    eventTypes: string[];
    constructor(priority: number, color: string, eventTypes: string[]);
}
export declare class TimelineDetailsContentHelper {
    fragment: DocumentFragment;
    private linkifierInternal;
    private target;
    element: HTMLDivElement;
    private tableElement;
    constructor(target: SDK.Target.Target | null, linkifier: LegacyComponents.Linkifier.Linkifier | null);
    addSection(title: string, swatchColor?: string): void;
    linkifier(): LegacyComponents.Linkifier.Linkifier | null;
    appendTextRow(title: string, value: string | number | boolean): void;
    appendElementRow(title: string, content: string | Node, isWarning?: boolean, isStacked?: boolean): void;
    appendLocationRow(title: string, url: string, startLine: number, startColumn?: number): void;
    appendLocationRange(title: string, url: Platform.DevToolsPath.UrlString, startLine: number, endLine?: number): void;
    createChildStackTraceElement(stackTrace: Protocol.Runtime.StackTrace): void;
}
export declare const categoryBreakdownCacheSymbol: unique symbol;
export interface TimelineMarkerStyle {
    title: string;
    color: string;
    lineWidth: number;
    dashStyle: number[];
    tall: boolean;
    lowPriority: boolean;
}
/**
 * Given a particular event, this method can adjust its timestamp by
 * substracting the timestamp of the previous navigation. This helps in cases
 * where the user has navigated multiple times in the trace, so that we can show
 * the LCP (for example) relative to the last navigation.
 **/
export declare function timeStampForEventAdjustedForClosestNavigationIfPossible(event: Trace.Types.Events.Event, parsedTrace: Trace.Handlers.Types.ParsedTrace | null): Trace.Types.Timing.MilliSeconds;
/**
 * Determines if an event is potentially a marker event. A marker event here
 * is a single moment in time that we want to highlight on the timeline, such as
 * the LCP time. This method does not filter out events: for example, it treats
 * every LCP Candidate event as a potential marker event.
 **/
export declare function isMarkerEvent(parsedTrace: Trace.Handlers.Types.ParsedTrace, event: Trace.Types.Events.Event): boolean;
export {};
