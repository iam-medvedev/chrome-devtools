import * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { Category } from './types.js';
export declare class CLSCulprits extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
    userVisibleTitle: string;
    description: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    /**
     * getTopCulprits gets the top 3 shift root causes based on worst cluster.
     */
    getTopCulprits(cluster: Trace.Types.Events.SyntheticLayoutShiftCluster, culpritsByShift: Map<Trace.Types.Events.LayoutShift, Trace.Insights.InsightRunners.CumulativeLayoutShift.LayoutShiftRootCausesData>): string[];
    getRelatedEvents(): Trace.Types.Events.Event[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-cls-culprits': CLSCulprits;
    }
}
