import type * as Trace from '../../../models/trace/trace.js';
export declare class InteractionBreakdown extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    connectedCallback(): void;
    set entry(entry: Trace.Types.Events.SyntheticInteractionPair);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-interaction-breakdown': InteractionBreakdown;
    }
}
