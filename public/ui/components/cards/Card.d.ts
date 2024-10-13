import type * as Common from '../../../core/common/common.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-card': Card;
    }
}
export interface CardData {
    heading?: Common.UIString.LocalizedString;
    content: HTMLElement[];
}
export declare class Card extends HTMLElement {
    #private;
    set data(data: CardData);
    connectedCallback(): void;
}
