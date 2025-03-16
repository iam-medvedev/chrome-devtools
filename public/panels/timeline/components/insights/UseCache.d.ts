import './Table.js';
import type { UseCacheInsightModel } from '../../../../models/trace/insights/UseCache.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class UseCache extends BaseInsightComponent<UseCacheInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    getEstimatedSavingsBytes(): number | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-use-cache': UseCache;
    }
}
