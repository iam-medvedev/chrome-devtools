import * as Lit from '../../lit/lit.js';
export interface ExpandableListData {
    rows: Lit.TemplateResult[];
    title?: string;
}
export declare class ExpandableList extends HTMLElement {
    #private;
    set data(data: ExpandableListData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-expandable-list': ExpandableList;
    }
}
