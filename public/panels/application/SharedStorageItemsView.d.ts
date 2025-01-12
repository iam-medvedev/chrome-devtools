import * as Common from '../../core/common/common.js';
import type * as Protocol from '../../generated/protocol.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import { SharedStorageForOrigin } from './SharedStorageModel.js';
import { StorageItemsView } from './StorageItemsView.js';
export declare namespace SharedStorageItemsDispatcher {
    const enum Events {
        FILTERED_ITEMS_CLEARED = "FilteredItemsCleared",
        ITEM_DELETED = "ItemDeleted",
        ITEM_EDITED = "ItemEdited",
        ITEMS_CLEARED = "ItemsCleared",
        ITEMS_REFRESHED = "ItemsRefreshed"
    }
    interface ItemDeletedEvent {
        key: string;
    }
    interface ItemEditedEvent {
        columnIdentifier: string;
        oldText: string | null;
        newText: string;
    }
    interface EventTypes {
        [Events.FILTERED_ITEMS_CLEARED]: void;
        [Events.ITEM_DELETED]: ItemDeletedEvent;
        [Events.ITEM_EDITED]: ItemEditedEvent;
        [Events.ITEMS_CLEARED]: void;
        [Events.ITEMS_REFRESHED]: void;
    }
}
export declare class SharedStorageItemsView extends StorageItemsView {
    #private;
    readonly outerSplitWidget: UI.SplitWidget.SplitWidget;
    readonly innerSplitWidget: UI.SplitWidget.SplitWidget;
    readonly dataGrid: DataGrid.DataGrid.DataGridImpl<Protocol.Storage.SharedStorageEntry>;
    readonly sharedStorageItemsDispatcher: Common.ObjectWrapper.ObjectWrapper<SharedStorageItemsDispatcher.EventTypes>;
    constructor(sharedStorage: SharedStorageForOrigin);
    static createView(sharedStorage: SharedStorageForOrigin): Promise<SharedStorageItemsView>;
    updateEntriesOnly(): Promise<void>;
    refreshItems(): Promise<void>;
    deleteSelectedItem(): Promise<void>;
    deleteAllItems(): Promise<void>;
    getEntriesForTesting(): Array<Protocol.Storage.SharedStorageEntry>;
}
