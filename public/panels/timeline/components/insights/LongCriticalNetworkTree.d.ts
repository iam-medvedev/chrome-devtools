import '../../../../ui/components/icon_button/icon_button.js';
import type { LongCriticalNetworkTreeInsightModel } from '../../../../models/trace/insights/LongCriticalNetworkTree.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LongCriticalNetworkTree extends BaseInsightComponent<LongCriticalNetworkTreeInsightModel> {
    static readonly litTagName: LitHtml.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): LitHtml.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-long-critical-network-tree': LongCriticalNetworkTree;
    }
}
