import type * as TraceEngine from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { type ActiveInsight, InsightsCategories } from './types.js';
export declare function shouldRenderForCategory(options: {
    activeCategory: InsightsCategories;
    insightCategory: InsightsCategories;
}): boolean;
export declare function insightIsActive(options: {
    activeInsight: ActiveInsight | null;
    insightName: string;
    insightNavigationId: string | null;
}): boolean;
export interface BaseInsightData {
    insights: TraceEngine.Insights.Types.TraceInsightData | null;
    navigationId: string | null;
    activeInsight: ActiveInsight | null;
    activeCategory: InsightsCategories;
}
export declare abstract class BaseInsight extends HTMLElement {
    #private;
    abstract internalName: string;
    abstract insightCategory: InsightsCategories;
    abstract userVisibleTitle: string;
    protected readonly shadow: ShadowRoot;
    protected data: BaseInsightData;
    protected scheduleRender(): void;
    connectedCallback(): void;
    set insights(insights: TraceEngine.Insights.Types.TraceInsightData | null);
    set navigationId(navigationId: string | null);
    set activeInsight(activeInsight: ActiveInsight);
    set activeCategory(activeCategory: InsightsCategories);
    protected onSidebarClick(): void;
    abstract createOverlays(): Overlays.Overlays.TimelineOverlay[];
    abstract render(): void;
    protected isActive(): boolean;
}
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export declare function md(markdown: string): LitHtml.TemplateResult;
