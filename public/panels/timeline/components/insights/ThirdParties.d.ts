import './Table.js';
import type { ThirdPartiesInsightModel } from '../../../../models/trace/insights/ThirdParties.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class ThirdParties extends BaseInsightComponent<ThirdPartiesInsightModel> {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-third-parties': ThirdParties;
    }
}
