import type * as TraceEngine from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const enum SelectorTimingsKey {
    ELAPSED = "elapsed (us)",
    REJECT_PERCENTAGE = "reject_percentage",
    FAST_REJECT_COUNT = "fast_reject_count",
    MATCH_ATTEMPTS = "match_attempts",
    MATCH_COUNT = "match_count",
    SELECTOR = "selector",
    STYLE_SHEET_ID = "style_sheet_id"
}
export declare class TimelineSelectorStatsView extends UI.Widget.VBox {
    #private;
    constructor(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null);
    setEvent(event: TraceEngine.Types.TraceEvents.TraceEventUpdateLayoutTree): boolean;
    setAggregatedEvents(events: TraceEngine.Types.TraceEvents.TraceEventUpdateLayoutTree[]): void;
    private createRowsForTable;
}
