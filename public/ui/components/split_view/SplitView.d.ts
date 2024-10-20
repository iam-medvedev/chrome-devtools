declare global {
    interface HTMLElementTagNameMap {
        'devtools-split-view': SplitView;
    }
}
export declare class SplitView extends HTMLElement {
    #private;
    connectedCallback(): void;
    get horizontal(): boolean;
    set horizontal(horizontal: boolean);
}
