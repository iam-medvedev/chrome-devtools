import type * as Handlers from '../handlers/handlers.js';
import type * as Lantern from '../lantern/lantern.js';
import type * as Types from '../types/types.js';
import type * as InsightsRunners from './InsightRunners.js';
/**
 * Context for the portion of the trace an insight should look at.
 */
export type InsightSetContext = InsightSetContextWithoutNavigation | InsightSetContextWithNavigation;
export interface InsightSetContextWithoutNavigation {
    bounds: Types.Timing.TraceWindowMicroSeconds;
    frameId: string;
    navigation?: never;
}
export interface InsightSetContextWithNavigation {
    bounds: Types.Timing.TraceWindowMicroSeconds;
    frameId: string;
    navigation: Types.Events.NavigationStart;
    navigationId: string;
    lantern?: LanternContext;
}
export interface LanternContext {
    graph: Lantern.Graph.Node<Types.Events.SyntheticNetworkRequest>;
    simulator: Lantern.Simulation.Simulator<Types.Events.SyntheticNetworkRequest>;
    metrics: Record<string, Lantern.Metrics.MetricResult>;
}
export type InsightRunnersType = typeof InsightsRunners;
export declare enum InsightWarning {
    NO_FP = "NO_FP",
    NO_LCP = "NO_LCP",
    NO_DOCUMENT_REQUEST = "NO_DOCUMENT_REQUEST",
    NO_LAYOUT = "NO_LAYOUT"
}
export type InsightResult<R extends Record<string, unknown>> = R & {
    warnings?: InsightWarning[];
    metricSavings?: {
        FCP?: number;
        LCP?: number;
        TBT?: number;
        CLS?: number;
        INP?: number;
    };
};
/**
 * Contains insights for a specific navigation. If a trace began after a navigation already started,
 * this could instead represent the duration from the beginning of the trace up to the first recorded
 * navigation (or the end of the trace).
 */
export type InsightSets = {
    /** If for a navigation, this is the navigationId. Else it is NO_NAVIGATION. */
    id: string;
    /** The URL. Shown in the accordion list. */
    label: string;
    frameId: string;
    bounds: Types.Timing.TraceWindowMicroSeconds;
    data: InsightResults;
    navigation?: Types.Events.NavigationStart;
};
/**
 * Contains insights for a specific navigation.
 */
export type InsightResults = {
    [I in keyof InsightRunnersType]: ReturnType<InsightRunnersType[I]['generateInsight']>;
};
/**
 * Contains insights for the entire trace. Insights are mostly grouped by `navigationId`, with one exception:
 *
 * If the analyzed trace started after the navigation, and has meaningful work with that span, there is no
 * navigation to map it to. In this case NO_NAVIGATION is used for the key.
 * TODO(crbug.com/366049346): Consider using a symbol. Wait until no-navigation insights are shown in the panel.
 */
export type TraceInsightSets = Map<string, InsightSets>;
export declare const NO_NAVIGATION = "NO_NAVIGATION";
/**
 * Represents the narrow set of dependencies defined by an insight's `deps()` function. `Meta` is always included regardless of `deps()`.
 */
export type RequiredData<D extends () => Array<keyof typeof Handlers.ModelHandlers>> = Handlers.Types.EnabledHandlerDataWithMeta<Pick<typeof Handlers.ModelHandlers, ReturnType<D>[number]>>;
