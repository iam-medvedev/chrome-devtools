import * as Common from '../../core/common/common.js';
import type { ExtensionStorage } from './ExtensionStorageModel.js';
import { StorageItemsView } from './StorageItemsView.js';
export declare namespace ExtensionStorageItemsDispatcher {
    const enum Events {
        ITEMS_REFRESHED = "ItemsRefreshed"
    }
    type EventTypes = {
        [Events.ITEMS_REFRESHED]: void;
    };
}
export declare class ExtensionStorageItemsView extends StorageItemsView {
    #private;
    readonly extensionStorageItemsDispatcher: Common.ObjectWrapper.ObjectWrapper<ExtensionStorageItemsDispatcher.EventTypes>;
    constructor(extensionStorage: ExtensionStorage);
    setStorage(extensionStorage: ExtensionStorage): void;
    deleteSelectedItem(): void;
    refreshItems(): void;
    deleteAllItems(): void;
    getEntriesForTesting(): Array<{
        key: string;
        value: string;
    }>;
}
