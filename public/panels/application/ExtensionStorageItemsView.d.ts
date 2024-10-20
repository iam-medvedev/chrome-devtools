import * as Common from '../../core/common/common.js';
import type * as DataGridImpl from '../../ui/legacy/components/data_grid/data_grid.js';
import type { ExtensionStorage } from './ExtensionStorageModel.js';
import { StorageItemsView } from './StorageItemsView.js';
export declare namespace ExtensionStorageItemsDispatcher {
    const enum Events {
        ITEM_EDITED = "ItemEdited",
        ITEMS_REFRESHED = "ItemsRefreshed"
    }
    type EventTypes = {
        [Events.ITEM_EDITED]: void;
        [Events.ITEMS_REFRESHED]: void;
    };
}
export declare class ExtensionStorageItemsView extends StorageItemsView {
    #private;
    readonly extensionStorageItemsDispatcher: Common.ObjectWrapper.ObjectWrapper<ExtensionStorageItemsDispatcher.EventTypes>;
    constructor(extensionStorage: ExtensionStorage);
    /**
     * When parsing a value provided by the user, attempt to treat it as JSON,
     * falling back to a string otherwise.
     */
    parseValue(input: string): unknown;
    setStorage(extensionStorage: ExtensionStorage): void;
    deleteSelectedItem(): void;
    refreshItems(): void;
    deleteAllItems(): void;
    getEntriesForTesting(): Array<{
        key: string;
        value: string;
    }>;
    get dataGridForTesting(): DataGridImpl.DataGrid.DataGridImpl<unknown>;
}
