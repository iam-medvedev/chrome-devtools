import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import { DOMStorage } from './DOMStorageModel.js';
import { StorageItemsView } from './StorageItemsView.js';
export declare class DOMStorageItemsView extends StorageItemsView {
    private domStorage;
    private eventListeners;
    private grid;
    constructor(domStorage: DOMStorage);
    get dataGridForTesting(): DataGrid.DataGrid.DataGridImpl<unknown>;
    private createPreview;
    setStorage(domStorage: DOMStorage): void;
    private domStorageItemsCleared;
    private domStorageItemRemoved;
    private domStorageItemAdded;
    private domStorageItemUpdated;
    deleteSelectedItem(): void;
    refreshItems(): void;
    deleteAllItems(): void;
}
