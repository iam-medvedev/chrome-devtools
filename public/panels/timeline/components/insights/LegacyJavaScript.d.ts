import './Table.js';
import type { LegacyJavaScriptInsightModel } from '../../../../models/trace/insights/LegacyJavaScript.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import { BaseInsightComponent } from './BaseInsightComponent.js';
export declare class LegacyJavaScript extends BaseInsightComponent<LegacyJavaScriptInsightModel> {
    #private;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    internalName: string;
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    renderContent(): Lit.LitTemplate;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-legacy-javascript': LegacyJavaScript;
    }
}
