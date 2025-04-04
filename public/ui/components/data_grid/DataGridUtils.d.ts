import * as Platform from '../../../core/platform/platform.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import type * as LitHtml from '../../../ui/lit-html/lit-html.js';
export interface CSSStylesObject {
    readonly [name: string]: string;
}
export interface Column {
    /** `id`: a unique ID for that column. */
    id: Lowercase<string>;
    /** `title`: the user visible title. */
    title: string;
    /** An element to use rather than the `title` as text. */
    titleElement?: LitHtml.TemplateResult;
    /** `sortable`: an optional property to denote if the  column is sortable.
     *   Note, if you're rendering a data-grid yourself you likely  shouldn't set
     *   this. It's set by the `data-grid-controller`, which is the component you
     *   want if your table needs to be sortable. */
    sortable?: boolean;
    /** `widthWeighting`: a number that denotes the width of the column. This is a proportion
     *   of the total weighting of all columns (for details see below).*/
    widthWeighting: number;
    /** `hideable`: if the user is able to show/hide the column via the context menu. */
    hideable: boolean;
    /** `visible`: if the column is visible when rendered */
    visible: boolean;
    /** `styles`: an optional property of key-value sets of CSS properties and values. */
    styles?: CSSStylesObject;
}
export type CellValue = string | number | boolean | IconButton.Icon.Icon | null;
/**
 * A cell contains a `columnId`, which is the ID of the column the cell
 * represents, and the `value`, which is a string value for that cell.
 *
 * Note that currently cells cannot render complex data (e.g. nested HTML) but
 * in future we may extend the DataGrid to support this.
 */
export interface Cell {
    columnId: string;
    value: CellValue;
    title?: string;
    renderer?: (value: CellValue) => LitHtml.TemplateResult | typeof LitHtml.nothing;
}
export declare function getStringifiedCellValues(cells: Cell[]): string;
export interface Row {
    cells: Cell[];
    hidden?: boolean;
    styles?: CSSStylesObject;
}
export declare const enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}
export interface SortState {
    columnId: string;
    direction: SortDirection;
}
export type CellPosition = readonly [columnIndex: number, rowIndex: number];
export declare function getRowEntryForColumnId(row: Row, id: string): Cell;
export declare function renderCellValue(cell: Cell): LitHtml.LitTemplate;
/**
 * When the user passes in columns we want to know how wide each one should be.
 * We don't work in exact percentages, or pixel values, because it's then
 * unclear what to do in the event that one column is hidden. How do we
 * distribute up the extra space?
 *
 * Instead, each column has a weighting, which is its width proportionate to the
 * total weighting of all columns. For example:
 *
 * -> two columns both with widthWeighting: 1, will be 50% each, because the
 * total weight = 2, and each column is 1
 *
 * -> if you have two columns, the first width a weight of 2, and the second
 * with a weight of 1, the first will take up 66% and the other 33%.
 *
 * This way, when you are calculating the %, it's easy to do because if a
 * particular column becomes hidden, you ignore it / give it a weighting of 0,
 * and the space is evenly distributed amongst the remaining visible columns.
 *
 * @param allColumns
 * @param columnId
 */
export declare function calculateColumnWidthPercentageFromWeighting(allColumns: readonly Column[], columnId: string): number;
export interface HandleArrowKeyOptions {
    key: Platform.KeyboardUtilities.ArrowKey;
    currentFocusedCell: readonly [number, number];
    columns: readonly Column[];
    rows: readonly Row[];
}
export declare function handleArrowKeyNavigation(options: HandleArrowKeyOptions): CellPosition;
export declare const calculateFirstFocusableCell: (options: {
    columns: readonly Column[];
    rows: readonly Row[];
}) => [colIndex: number, rowIndex: number];
export declare const getCellTitleFromCellContent: (text: string) => string;
