export interface CategoryData {
    value: number;
    color: string;
    title: string;
}
export interface SummaryTableData {
    total: number;
    rangeStart: number;
    rangeEnd: number;
    categories: CategoryData[];
}
export declare class TimelineSummary extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: SummaryTableData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-timeline-summary': TimelineSummary;
    }
}
