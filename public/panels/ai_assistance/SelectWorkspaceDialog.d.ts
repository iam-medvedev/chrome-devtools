import * as Workspace from '../../models/workspace/workspace.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    projects: Array<{
        name: string;
        path: string;
    }>;
    selectedIndex: number;
    onProjectSelected: (index: number) => void;
    onSelectButtonClick: () => void;
    onCancelButtonClick: () => void;
    onAddFolderButtonClick: () => void;
}
type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare class SelectWorkspaceDialog extends UI.Widget.VBox {
    #private;
    constructor(options: {
        dialog: UI.Dialog.Dialog;
        onProjectSelected: (project: Workspace.Workspace.Project) => void;
        currentProject?: Workspace.Workspace.Project;
    }, view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
    static show(onProjectSelected: (project: Workspace.Workspace.Project) => void, currentProject?: Workspace.Workspace.Project): void;
}
export {};
