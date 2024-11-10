import './Table.js';
import type { ThirdPartiesInsightModel } from '../../../../models/trace/insights/ThirdParties.js';
import type * as Trace from '../../../../models/trace/trace.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './Helpers.js';
import { Category } from './types.js';
export declare class ThirdParties extends BaseInsightComponent<ThirdPartiesInsightModel> {
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
        'devtools-performance-third-parties': ThirdParties;
    }
}
