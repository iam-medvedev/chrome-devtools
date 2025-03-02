import '../../../../ui/components/markdown_view/markdown_view.js';
import type * as Protocol from '../../../../generated/protocol.js';
import type { InsightModel } from '../../../../models/trace/insights/types.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import type { TableState } from './Table.js';
export interface BaseInsightData {
    bounds: Trace.Types.Timing.TraceWindowMicro | null;
    /** The key into `insights` that contains this particular insight. */
    insightSetKey: string | null;
}
export declare abstract class BaseInsightComponent<T extends InsightModel<{}, {}>> extends HTMLElement {
    #private;
    abstract internalName: string;
    static readonly litTagName: Lit.StaticHtml.StaticValue;
    protected readonly shadow: ShadowRoot;
    get model(): T | null;
    protected data: BaseInsightData;
    readonly sharedTableState: TableState;
    protected scheduleRender(): void;
    connectedCallback(): void;
    set selected(selected: boolean);
    get selected(): boolean;
    set model(model: T);
    set insightSetKey(insightSetKey: string | null);
    get bounds(): Trace.Types.Timing.TraceWindowMicro | null;
    set bounds(bounds: Trace.Types.Timing.TraceWindowMicro | null);
    set parsedTrace(parsedTrace: Trace.Handlers.Types.ParsedTrace);
    set fieldMetrics(fieldMetrics: Trace.Insights.Common.CrUXFieldMetricResults);
    get fieldMetrics(): Trace.Insights.Common.CrUXFieldMetricResults | null;
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
    protected abstract renderContent(): Lit.LitTemplate;
    getEstimatedSavingsTime(): Trace.Types.Timing.Milli | null;
    getEstimatedSavingsBytes(): number | null;
    protected renderNode(backendNodeId: Protocol.DOM.BackendNodeId, fallbackText?: string): Lit.LitTemplate;
}
