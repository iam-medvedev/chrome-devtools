import '../../ui/components/lists/lists.js';
import * as Platform from '../../core/platform/platform.js';
import type * as Persistence from '../../models/persistence/persistence.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface EditFileSystemViewInput {
    fileSystemPath: Platform.DevToolsPath.UrlString;
    excludedFolders: Platform.DevToolsPath.EncodedPathString[];
    editingIndex: number | null;
    onAdd: () => void;
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
    onCommit: (index: number, value: string) => void;
    onCancel: () => void;
    validateFolder: (index: number, value: string) => Platform.UIString.LocalizedString | null;
}
export type View = (input: EditFileSystemViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class EditFileSystemView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set fileSystem(fileSystem: Persistence.PlatformFileSystem.PlatformFileSystem);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
