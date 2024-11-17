import '../icon_button/icon_button.js';
interface FloatingButtonData {
    iconName: string;
    title?: string;
    disabled?: boolean;
}
export declare class FloatingButton extends HTMLElement {
    #private;
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
