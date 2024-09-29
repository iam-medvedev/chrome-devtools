import * as Common from '../../../core/common/common.js';
import * as LiveMetrics from '../../../models/live-metrics/live-metrics.js';
import * as LegacyWrapper from '../../../ui/components/legacy_wrapper/legacy_wrapper.js';
export declare class LiveMetricsView extends LegacyWrapper.LegacyWrapper.WrappableComponent {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export declare class InteractionRevealer implements Common.Revealer.Revealer<LiveMetrics.Interaction> {
    #private;
    constructor(view: LiveMetricsView);
    reveal(interaction: LiveMetrics.Interaction): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-live-metrics-view': LiveMetricsView;
    }
}
