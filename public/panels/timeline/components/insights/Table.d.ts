import type * as Trace from '../../../../models/trace/trace.js';
import * as Lit from '../../../../ui/lit/lit.js';
import type * as Overlays from '../../overlays/overlays.js';
import type * as BaseInsightComponent from './BaseInsightComponent.js';
type BaseInsightComponent = BaseInsightComponent.BaseInsightComponent<Trace.Insights.Types.InsightModel>;
/**
 * @fileoverview An interactive table component.
 *
 * On hover:
 *           desaturates the relevant events (in both the minimap and the flamegraph), and
 *           replaces the current insight's overlays with the overlays attached to that row.
 *           The currently selected trace bounds does not change.
 *
 *           Removing the mouse from the table without clicking on any row restores the original
 *           overlays.
 *
 * On click:
 *           "sticks" the selection, replaces overlays like hover does, and additionally updates
 *           the current trace bounds to fit the bounds of the row's overlays.
 */
export interface TableState {
    selectedRowEl: HTMLElement | null;
    selectionIsSticky: boolean;
}
export interface TableData {
    insight: BaseInsightComponent;
    headers: string[];
    rows: TableDataRow[];
}
export interface TableDataRow {
    values: Array<number | string | Lit.LitTemplate>;
    overlays?: Overlays.Overlays.TimelineOverlay[];
}
export declare class Table extends HTMLElement {
    #private;
    set data(data: TableData);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-table': Table;
    }
}
export {};
