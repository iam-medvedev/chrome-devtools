import type * as TextUtils from '../../../../models/text_utils/text_utils.js';
import { type ColumnDescriptor } from './DataGrid.js';
/**
 * A data grid (table) element that can be used as progressive enhancement over a <table> element.
 *
 * It can be used as
 * ```
 * <devtools-data-grid striped name=${'Display Name'}>
 *   <table>
 *     <tr>
 *       <th id="column-1">Column 1</th>
 *       <th id="column-2">Column 2</th>
 *     </tr>
 *     <tr>
 *       <td>Value 1</td>
 *       <td>Value 2</td>
 *     </tr>
 *   </table>
 * </devtools-data-grid>
 * ```
 * where a row with <th> configures the columns and rows with <td> provide the data.
 *
 * Under the hood it uses SortableDataGrid, which extends ViewportDataGrid so only
 * visible rows are layed out and sorting is provided out of the box.
 *
 * @attr striped
 * @attr displayName
 * @prop filters
 */
declare class DataGridElement extends HTMLElement {
    #private;
    static readonly observedAttributes: string[];
    constructor();
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    set striped(striped: boolean);
    get striped(): boolean;
    set inline(striped: boolean);
    get inline(): boolean;
    set displayName(displayName: string);
    get displayName(): string | null;
    set filters(filters: TextUtils.TextUtils.ParsedFilter[]);
    get columns(): ColumnDescriptor[];
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-data-grid': DataGridElement;
    }
}
export interface DataGridInternalToken {
    token: 'DataGridInternalToken';
}
export {};
