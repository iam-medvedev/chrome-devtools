import '../../../ui/components/icon_button/icon_button.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-card': Card;
    }
}
export interface CardData {
    heading?: string;
    headingIconName?: string;
    headingSuffix?: HTMLElement;
    content: HTMLElement[];
}
export declare class Card extends HTMLElement {
    #private;
    set data(data: CardData);
    connectedCallback(): void;
}
