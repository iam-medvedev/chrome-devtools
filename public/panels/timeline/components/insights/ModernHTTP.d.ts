import './Table.js';
import type { UseModernHTTPInsightModel } from '../../../../models/trace/insights/ModernHTTP.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class ModernHTTP extends BaseInsightComponent<UseModernHTTPInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    mapToRow(req: Trace.Types.Events.SyntheticNetworkRequest): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Types.Events.SyntheticNetworkRequest[]): TableDataRow;
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-modern-http': ModernHTTP;
    }
}
