import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { BaseInsight } from './Helpers.js';
import { InsightsCategories } from './types.js';
export declare class SlowCSSSelector extends BaseInsight {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    insightCategory: InsightsCategories;
    internalName: string;
    userVisibleTitle: string;
    getSlowCSSSelectorData(insights: Trace.Insights.Types.TraceInsightSets | null, navigationId: string | null): Trace.Insights.InsightRunners.SlowCSSSelector.SlowCSSSelectorInsightResult | null;
    createOverlays(): Overlays.Overlays.TimelineOverlay[];
    renderSlowCSSSelector(): LitHtml.LitTemplate;
    render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-slow-css-selector': SlowCSSSelector;
    }
}
