import type * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { InsightsCategories } from './types.js';
export declare function getThirdPartiesInsight(insights: Trace.Insights.Types.TraceInsightSets | null, navigationId: string | null): Trace.Insights.Types.InsightResults['ThirdPartyWeb'] | null;
export declare class ThirdParties extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: InsightsCategories;
    internalName: string;
    userVisibleTitle: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-third-parties': ThirdParties;
    }
}
