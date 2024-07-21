import type * as SDK from '../../../core/sdk/sdk.js';
export type AnchorFunctionLinkSwatchData = {
    onLinkActivate: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    identifier?: string;
    anchorNode?: SDK.DOMModel.DOMNode;
    needsSpace?: boolean;
};
export declare class AnchorFunctionLinkSwatch extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(data: AnchorFunctionLinkSwatchData);
    dataForTest(): AnchorFunctionLinkSwatchData;
    connectedCallback(): void;
    set data(data: AnchorFunctionLinkSwatchData);
    protected render(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-anchor-function-link-swatch': AnchorFunctionLinkSwatch;
    }
}
