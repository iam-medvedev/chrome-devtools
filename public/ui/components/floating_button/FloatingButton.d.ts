import '../icon_button/icon_button.js';
interface FloatingButtonData {
    iconName: string;
    disabled?: boolean;
}
export declare class FloatingButton extends HTMLElement {
    #private;
    static readonly litTagName: import("../../lit-html/static.js").Static;
    constructor(data: FloatingButtonData);
    connectedCallback(): void;
    set data(floatingButtonData: FloatingButtonData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-floating-button': FloatingButton;
    }
}
export {};
