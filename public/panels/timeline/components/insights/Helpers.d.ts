import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import { type TableState } from './Table.js';
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
    insights: Trace.Insights.Types.TraceInsightSets | null;
    parsedTrace: Trace.Handlers.Types.ParsedTrace | null;
    /** The key into `insights` that contains this particular insight. */
    insightSetKey: string | null;
    activeInsight: ActiveInsight | null;
    activeCategory: Category;
}
export declare abstract class BaseInsight extends HTMLElement {
    #private;
    abstract internalName: string;
    abstract insightCategory: Category;
    abstract userVisibleTitle: string;
    abstract description: string;
    protected readonly shadow: ShadowRoot;
    protected data: BaseInsightData;
    readonly sharedTableState: TableState;
    protected scheduleRender(): void;
    connectedCallback(): void;
    set insights(insights: Trace.Insights.Types.TraceInsightSets | null);
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
    protected abstract createOverlays(): Overlays.Overlays.TimelineOverlay[];
    abstract render(): void;
    protected isActive(): boolean;
}
export declare function shortenUrl(url: string): string;
/**
 * Returns a rendered MarkdownView component.
 *
 * This should not be used for markdown that is not guaranteed to be valid.
 */
export declare function md(markdown: string): LitHtml.TemplateResult;
export declare class EventReferenceClick extends Event {
    event: Trace.Types.Events.Event;
    static readonly eventName = "eventreferenceclick";
    constructor(event: Trace.Types.Events.Event);
}
declare class EventRef extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set text(text: string);
    set baseInsight(baseInsight: BaseInsight);
    set event(event: Trace.Types.Events.Event);
}
export declare function eventRef(baseInsight: BaseInsight, event: Trace.Types.Events.Event, text: string): LitHtml.TemplateResult;
declare global {
    interface GlobalEventHandlersEventMap {
        [EventReferenceClick.eventName]: EventReferenceClick;
    }
    interface HTMLElementTagNameMap {
        'devtools-performance-event-ref': EventRef;
    }
}
export {};
