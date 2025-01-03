import * as CrUXManager from '../../../models/crux-manager/crux-manager.js';
export interface MetricCardData {
    metric: 'LCP' | 'CLS' | 'INP';
    localValue?: number;
    fieldValue?: number | string;
    histogram?: CrUXManager.MetricResponse['histogram'];
    tooltipContainer?: HTMLElement;
    phases?: Array<[string, number]>;
    warnings?: string[];
}
export declare class MetricCard extends HTMLElement {
    #private;
    constructor();
    set data(data: MetricCardData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-metric-card': MetricCard;
    }
}
