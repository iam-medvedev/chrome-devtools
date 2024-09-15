import * as TraceEngine from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class TimelineSelectorStatsView extends UI.Widget.VBox {
    #private;
    constructor(traceParsedData: TraceEngine.Handlers.Types.TraceParseData | null);
    setEvent(event: TraceEngine.Types.TraceEvents.TraceEventUpdateLayoutTree): boolean;
    setAggregatedEvents(events: TraceEngine.Types.TraceEvents.TraceEventUpdateLayoutTree[]): void;
    private createRowsForTable;
}
