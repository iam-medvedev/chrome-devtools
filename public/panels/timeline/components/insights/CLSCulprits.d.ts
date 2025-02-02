import type { CLSCulpritsInsightModel } from '../../../../models/trace/insights/CLSCulprits.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class CLSCulprits extends BaseInsightComponent<CLSCulpritsInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    /**
     * getTopCulprits gets the top 3 shift root causes based on worst cluster.
     */
    getTopCulprits(cluster: Trace.Types.Events.SyntheticLayoutShiftCluster, culpritsByShift: Map<Trace.Types.Events.SyntheticLayoutShift, Trace.Insights.Models.CLSCulprits.LayoutShiftRootCausesData>): string[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-cls-culprits': CLSCulprits;
    }
}
