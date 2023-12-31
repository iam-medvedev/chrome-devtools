import * as UI from '../../ui/legacy/legacy.js';
export declare class WorkspaceSettingsTab extends UI.Widget.VBox {
    containerElement: HTMLElement;
    private readonly fileSystemsListContainer;
    private readonly elementByPath;
    private readonly mappingViewByPath;
    constructor();
    wasShown(): void;
    private createFolderExcludePatternInput;
    private addItem;
    private renderFileSystem;
    private removeFileSystemClicked;
    private addFileSystemClicked;
    private fileSystemAdded;
    private fileSystemRemoved;
}
