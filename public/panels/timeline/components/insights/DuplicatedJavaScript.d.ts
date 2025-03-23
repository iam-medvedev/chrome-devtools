import './Table.js';
import type { DuplicateJavaScriptInsightModel } from '../../../../models/trace/insights/DuplicatedJavaScript.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class DuplicatedJavaScript extends BaseInsightComponent<DuplicateJavaScriptInsightModel> {
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-duplicated-javascript': DuplicatedJavaScript;
    }
}
