import './Table.js';
import type { DuplicatedJavaScriptInsightModel } from '../../../../models/trace/insights/DuplicatedJavaScript.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DuplicatedJavaScript extends BaseInsightComponent<DuplicatedJavaScriptInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    getEstimatedSavingsBytes(): number | null;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-duplicated-javascript': DuplicatedJavaScript;
    }
}
