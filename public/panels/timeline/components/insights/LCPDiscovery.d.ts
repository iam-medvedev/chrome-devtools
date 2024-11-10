import '../../../../ui/components/icon_button/icon_button.js';
import type { LCPDiscoveryInsightModel } from '../../../../models/trace/insights/LCPDiscovery.js';
import * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './Helpers.js';
import { Category } from './types.js';
export declare class LCPDiscovery extends BaseInsightComponent<LCPDiscoveryInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: Category;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getRelatedEvents(): Trace.Types.Events.Event[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-lcp-discovery': LCPDiscovery;
    }
}
