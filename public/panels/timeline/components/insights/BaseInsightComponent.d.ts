import '../../../../ui/components/markdown_view/markdown_view.js';
import type { InsightModel } from '../../../../models/trace/insights/types.js';
import type * as Trace from '../../../../models/trace/trace.js';
import * as LitHtml from '../../../../ui/lit-html/lit-html.js';
import type * as Overlays from '../../overlays/overlays.js';
import type { TableState } from './Table.js';
export interface BaseInsightData {
    bounds: Trace.Types.Timing.TraceWindowMicroSeconds | null;
    /** The key into `insights` that contains this particular insight. */
    insightSetKey: string | null;
}
export declare abstract class BaseInsightComponent<T extends InsightModel<{}>> extends HTMLElement {
    #private;
    abstract internalName: string;
    static readonly litTagName: import("../../../../ui/lit-html/static.js").Static;
    get model(): T | null;
    protected data: BaseInsightData;
    readonly sharedTableState: TableState;
    protected scheduleRender(): void;
    connectedCallback(): void;
    set selected(selected: boolean);
    get selected(): boolean;
    set model(model: T);
    set insightSetKey(insightSetKey: string | null);
    get bounds(): Trace.Types.Timing.TraceWindowMicroSeconds | null;
    set bounds(bounds: Trace.Types.Timing.TraceWindowMicroSeconds | null);
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
    protected abstract renderContent(): LitHtml.LitTemplate;
    getEstimatedSavingsTime(): Trace.Types.Timing.MilliSeconds | null;
    getEstimatedSavingsBytes(): number | null;
}
