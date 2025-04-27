import './Table.js';
import type { CacheInsightModel } from '../../../../models/trace/insights/Cache.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
import { type TableDataRow } from './Table.js';
export declare class Cache extends BaseInsightComponent<CacheInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    mapToRow(req: Trace.Insights.Models.Cache.CacheableRequest): TableDataRow;
    createAggregatedTableRow(remaining: Trace.Insights.Models.Cache.CacheableRequest[]): TableDataRow;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-cache': Cache;
    }
}
