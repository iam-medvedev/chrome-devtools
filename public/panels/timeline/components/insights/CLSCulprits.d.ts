import * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { InsightsCategories } from './types.js';
export declare function getCLSInsight(insights: Trace.Insights.Types.TraceInsightSets | null, navigationId: string | null): Trace.Insights.Types.InsightResults['CumulativeLayoutShift'] | null;
export declare class CLSCulprits extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: InsightsCategories;
    internalName: string;
    userVisibleTitle: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    /**
     * getTopCulprits gets the top 3 shift root causes based on clusters.
     */
    getTopCulprits(clusters: Trace.Types.Events.SyntheticLayoutShiftCluster[], culpritsByShift: Map<Trace.Types.Events.LayoutShift, Trace.Insights.InsightRunners.CumulativeLayoutShift.LayoutShiftRootCausesData> | undefined): string[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-cls-culprits': CLSCulprits;
    }
}
