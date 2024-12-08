import '../../../../ui/components/icon_button/icon_button.js';
import type { LCPDiscoveryInsightModel } from '../../../../models/trace/insights/LCPDiscovery.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LCPDiscovery extends BaseInsightComponent<LCPDiscoveryInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsTime(): Trace.Types.Timing.MilliSeconds | null;
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-discovery': LCPDiscovery;
    }
}
