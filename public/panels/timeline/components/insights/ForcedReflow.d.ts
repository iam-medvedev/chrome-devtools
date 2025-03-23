import './Table.js';
import type { ForcedReflowInsightModel } from '../../../../models/trace/insights/ForcedReflow.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class ForcedReflow extends BaseInsightComponent<ForcedReflowInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    mapToRow(data: Trace.Insights.Models.ForcedReflow.BottomUpCallStack): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Insights.Models.ForcedReflow.BottomUpCallStack[]): TableDataRow;
    internalName: string;
    renderContent(): Lit.LitTemplate;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-forced-reflow': ForcedReflow;
    }
}
