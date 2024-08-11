import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
export interface MetricCardData {
    metric: 'LCP' | 'CLS' | 'INP';
    localValue?: number;
    fieldValue?: number | string;
    histogram?: CrUXManager.MetricResponse['histogram'];
}
export declare class MetricCard extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    set data(data: MetricCardData);
    connectedCallback(): void;
}
export declare class LiveMetricsView extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-metric-card': MetricCard;
        'devtools-live-metrics-view': LiveMetricsView;
    }
}
