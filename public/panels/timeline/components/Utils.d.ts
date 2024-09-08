import type * as TraceEngine from '../../../models/trace/trace.js';
export declare enum NetworkCategory {
    DOC = "Doc",
    CSS = "CSS",
    JS = "JS",
    FONT = "Font",
    IMG = "Img",
    MEDIA = "Media",
    WASM = "Wasm",
    OTHER = "Other"
}
export declare function colorForNetworkCategory(category: NetworkCategory): string;
export declare function colorForNetworkRequest(request: TraceEngine.Types.TraceEvents.SyntheticNetworkRequest): string;
export type MetricRating = 'good' | 'needs-improvement' | 'poor';
export type MetricThresholds = [number, number];
export declare const LCP_THRESHOLDS: MetricThresholds;
export declare const CLS_THRESHOLDS: MetricThresholds;
export declare const INP_THRESHOLDS: MetricThresholds;
export declare function rateMetric(value: number, thresholds: MetricThresholds): MetricRating;
/**
 * Ensure to also include `metricValueStyles.css` when generating metric value elements.
 */
export declare function renderMetricValue(jslogContext: string, value: number | undefined, thresholds: MetricThresholds, format: (value: number) => string, options?: {
    dim?: boolean;
}): HTMLElement;
