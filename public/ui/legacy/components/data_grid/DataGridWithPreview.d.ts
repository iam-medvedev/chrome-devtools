import { Widget } from '../../legacy.js';
import { type ColumnDescriptor, DataGridImpl } from './DataGrid.js';
interface Callbacks {
    refreshItems: () => void;
    removeItem: (key: string) => void;
    setItem: (key: string, value: string) => void;
    setCanDeleteSelected: (canSelect: boolean) => void;
    createPreview: (key: string, value: string) => Promise<Widget.Widget | null>;
}
interface Messages {
    title: string;
    itemDeleted: string;
    itemsCleared: string;
}
/**
 * A helper typically used in the Application panel. Renders a split view
 * between a DataGrid displaying key-value pairs and a preview Widget.
 */
export declare class DataGridWithPreview {
    #private;
    constructor(id: string, parent: HTMLElement, columns: ColumnDescriptor[], callbacks: Callbacks, messages: Messages);
    get dataGridForTesting(): DataGridImpl<unknown>;
    clearItems(): void;
    removeItem(key: string): void;
    addItem(item: string[]): void;
    updateItem(key: string, value: string): void;
    showItems(items: string[][]): void;
    deleteSelectedItem(): void;
    showPreview(preview: Widget.Widget | null, value: string | null): void;
}
export {};
