import '../../ui/components/linkifier/linkifier.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class TimelineSelectorStatsView extends UI.Widget.VBox {
    #private;
    constructor(parsedTrace: Trace.Handlers.Types.ParsedTrace | null);
    setEvent(event: Trace.Types.Events.UpdateLayoutTree): boolean;
    setAggregatedEvents(events: Trace.Types.Events.UpdateLayoutTree[]): void;
    private createRowsForTable;
}
