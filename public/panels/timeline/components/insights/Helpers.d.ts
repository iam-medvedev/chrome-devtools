import '../../../../ui/components/markdown_view/markdown_view.js';
import type { InsightModel } from '../../../../models/trace/insights/types.js';
import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import type { TableState } from './Table.js';
import { type ActiveInsight, Category } from './types.js';
export declare function shouldRenderForCategory(options: {
    activeCategory: Category;
    insightCategory: Category;
}): boolean;
export declare function insightIsActive(options: {
    activeInsight: ActiveInsight | null;
    insightName: string;
    insightSetKey: string | null;
}): boolean;
export interface BaseInsightData {
    parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
    /** The key into `insights` that contains this particular insight. */
    insightSetKey: string | null;
    activeInsight: ActiveInsight | null;
    activeCategory: Category;
}
export declare abstract class BaseInsightComponent<T extends InsightModel<{}>> extends HTMLElement {
    #private;
    abstract internalName: string;
    abstract insightCategory: Category;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    protected readonly shadow: ShadowRoot;
    get model(): T | null;
    protected data: BaseInsightData;
    readonly sharedTableState: TableState;
    protected scheduleRender(): void;
    connectedCallback(): void;
    set model(model: T);
    set parsedTrace(parsedTrace: Trace.Handlers.Types.ParsedTrace | null);
    set insightSetKey(insightSetKey: string | null);
    set activeInsight(activeInsight: ActiveInsight | null);
    set activeCategory(activeCategory: Category);
    protected onSidebarClick(): void;
    /**
     * Replaces the initial insight overlays with the ones provided.
     *
     * If `overlays` is null, reverts back to the initial overlays.
     *
     * This allows insights to provide an initial set of overlays,
     * and later temporarily replace all of those insights with a different set.
     * This enables the hover/click table interactions.
     */
    toggleTemporaryOverlays(overlays: Overlays.Overlays.TimelineOverlay[] | null, options: Overlays.Overlays.TimelineOverlaySetOptions): void;
    getInitialOverlays(): Overlays.Overlays.TimelineOverlay[];
    protected getRelatedEvents(): Trace.Types.Events.Event[];
    protected abstract createOverlays(): Overlays.Overlays.TimelineOverlay[];
    abstract render(): void;
    protected isActive(): boolean;
}
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export declare function md(markdown: string): LitHtml.TemplateResult;
