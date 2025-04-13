import type { RenderBlockingInsightModel } from '../../../../models/trace/insights/RenderBlocking.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class RenderBlocking extends BaseInsightComponent<RenderBlockingInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    mapToRow(request: Trace.Types.Events.SyntheticNetworkRequest): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Types.Events.SyntheticNetworkRequest[]): TableDataRow;
    internalName: string;
    protected hasAskAiSupport(): boolean;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-render-blocking-requests': RenderBlocking;
    }
}
