import '../../../../ui/components/icon_button/icon_button.js';
import type { LongCriticalNetworkTreeInsightModel } from '../../../../models/trace/insights/LongCriticalNetworkTree.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LongCriticalNetworkTree extends BaseInsightComponent<LongCriticalNetworkTreeInsightModel> {
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-long-critical-network-tree': LongCriticalNetworkTree;
    }
}
