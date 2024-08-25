import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class LiveMetricsView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-live-metrics-view': LiveMetricsView;
    }
}
