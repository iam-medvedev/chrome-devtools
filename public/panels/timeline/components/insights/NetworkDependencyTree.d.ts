import '../../../../ui/components/icon_button/icon_button.js';
import type { CriticalRequestNode, NetworkDependencyTreeInsightModel } from '../../../../models/trace/insights/NetworkDependencyTree.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class NetworkDependencyTree extends BaseInsightComponent<NetworkDependencyTreeInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    hoveredChain: Trace.Types.Events.SyntheticNetworkRequest[];
    connectedCallback(): void;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderTree(nodes: CriticalRequestNode[]): Lit.LitTemplate | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-long-critical-network-tree': NetworkDependencyTree;
    }
}
