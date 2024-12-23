import * as LitHtml from '../../lit-html/lit-html.js';
export interface ExpandableListData {
    rows: LitHtml.TemplateResult[];
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
