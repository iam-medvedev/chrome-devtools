import type * as TraceEngine from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare const enum SelectorTimingsKey {
    Elapsed = "elapsed (us)",
    RejectPercentage = "reject_percentage",
    FastRejectCount = "fast_reject_count",
    MatchAttempts = "match_attempts",
    MatchCount = "match_count",
    Selector = "selector",
    StyleSheetId = "style_sheet_id"
}
export declare class TimelineSelectorStatsView extends UI.Widget.VBox {
    #private;
    constructor();
    setEvent(event: TraceEngine.Legacy.CompatibleTraceEvent): boolean;
    setAggregatedEvent(events: TraceEngine.Legacy.Event[]): boolean;
    private createRowsForTable;
}
