import './Table.js';
import type { UseCacheInsightModel } from '../../../../models/trace/insights/UseCache.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class UseCache extends BaseInsightComponent<UseCacheInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    mapToRow(req: Trace.Insights.Models.UseCache.CacheableRequest): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Insights.Models.UseCache.CacheableRequest[]): TableDataRow;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsBytes(): number | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-use-cache': UseCache;
    }
}
