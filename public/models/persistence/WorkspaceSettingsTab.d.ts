import '../../ui/components/cards/cards.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class WorkspaceSettingsTab extends UI.Widget.VBox {
    #private;
    containerElement: HTMLElement;
    private readonly elementByPath;
    private readonly mappingViewByPath;
    constructor();
    private createFolderExcludePatternInput;
    private addItem;
    private getFilename;
    private removeFileSystemClicked;
    private addFileSystemClicked;
    private fileSystemAdded;
    private fileSystemRemoved;
}
