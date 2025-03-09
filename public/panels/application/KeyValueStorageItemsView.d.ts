import * as UI from '../../ui/legacy/legacy.js';
import type * as ApplicationComponents from './components/components.js';
import { StorageItemsView } from './StorageItemsView.js';
type Widget = UI.Widget.Widget;
export interface ViewInput {
    items: Array<{
        key: string;
        value: string;
    }>;
    selectedKey: string | null;
    editable: boolean;
    preview: Widget;
    onSelect: (event: CustomEvent<HTMLElement | null>) => void;
    onSort: (event: CustomEvent<{
        columnId: string;
        ascending: boolean;
    }>) => void;
    onCreate: (event: CustomEvent<{
        key: string;
        value: string;
    }>) => void;
    onReferesh: () => void;
    onEdit: (event: CustomEvent<{
        node: HTMLElement;
        columnId: string;
        valueBeforeEditing: string;
        newText: string;
    }>) => void;
    onDelete: (event: CustomEvent<HTMLElement>) => void;
}
export type View = (input: ViewInput, output: object, target: HTMLElement) => void;
/**
 * A helper typically used in the Application panel. Renders a split view
 * between a DataGrid displaying key-value pairs and a preview Widget.
 */
export declare abstract class KeyValueStorageItemsView extends StorageItemsView {
    #private;
    constructor(title: string, id: string, editable: boolean, view?: View, metadataView?: ApplicationComponents.StorageMetadataView.StorageMetadataView);
    performUpdate(): void;
    itemsCleared(): void;
    itemRemoved(key: string): void;
    itemAdded(key: string, value: string): void;
    itemUpdated(key: string, value: string): void;
    showItems(items: Array<{
        key: string;
        value: string;
    }>): void;
    deleteSelectedItem(): void;
    protected isEditAllowed(_columnIdentifier: string, _oldText: string, _newText: string): boolean;
    showPreview(preview: Widget | null, value: string | null): void;
    set editable(editable: boolean);
    protected keys(): string[];
    protected abstract setItem(key: string, value: string): void;
    protected abstract removeItem(key: string): void;
    protected abstract createPreview(key: string, value: string): Promise<Widget | null>;
}
export {};
