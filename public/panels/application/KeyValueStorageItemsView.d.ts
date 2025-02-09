import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import { StorageItemsView } from './StorageItemsView.js';
declare const Widget: typeof UI.Widget.Widget, VBox: typeof UI.Widget.VBox;
declare const DataGridImpl: typeof DataGrid.DataGrid.DataGridImpl;
type DataGridImpl<T> = DataGrid.DataGrid.DataGridImpl<T>;
type Widget = UI.Widget.Widget;
type VBox = UI.Widget.VBox;
/**
 * A helper typically used in the Application panel. Renders a split view
 * between a DataGrid displaying key-value pairs and a preview Widget.
 */
export declare abstract class KeyValueStorageItemsView extends StorageItemsView {
    #private;
    constructor(title: string, id: string, editable: boolean);
    get dataGridForTesting(): DataGridImpl<unknown>;
    get previewPanelForTesting(): VBox;
    itemsCleared(): void;
    itemRemoved(key: string): void;
    itemAdded(key: string, value: string): void;
    itemUpdated(key: string, value: string): void;
    showItems(items: {
        key: string;
        value: string;
    }[]): void;
    deleteSelectedItem(): void;
    showPreview(preview: Widget | null, value: string | null): void;
    set editable(editable: boolean);
    protected abstract setItem(key: string, value: string): void;
    protected abstract removeItem(key: string): void;
    protected abstract createPreview(key: string, value: string): Promise<Widget | null>;
}
export {};
