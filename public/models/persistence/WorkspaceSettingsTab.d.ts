import '../../ui/legacy/legacy.js';
import '../../ui/components/buttons/buttons.js';
import '../../ui/components/cards/cards.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import { IsolatedFileSystem } from './IsolatedFileSystem.js';
export interface WorkspaceSettingsTabInput {
    excludePatternSetting: Common.Settings.RegExpSetting;
    fileSystems: Array<{
        displayName: string;
        fileSystem: IsolatedFileSystem;
    }>;
    onAddClicked: () => void;
    onRemoveClicked: (fileSystem: IsolatedFileSystem) => void;
}
export type View = (input: WorkspaceSettingsTabInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class WorkspaceSettingsTab extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
