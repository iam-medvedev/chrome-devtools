import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    selectedSourceCode: Workspace.UISourceCode.UISourceCode | null;
    onSelect: (uiSourceCode: Workspace.UISourceCode.UISourceCode | null) => void;
    sourceCodes: Set<Workspace.UISourceCode.UISourceCode>;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare const ChangesSidebar_base: import("../../core/platform/Constructor.js").Constructor<Common.EventTarget.EventTarget<EventTypes>, any[]> & typeof UI.Widget.Widget;
export declare class ChangesSidebar extends ChangesSidebar_base {
    #private;
    constructor(target?: HTMLElement, view?: View);
    set workspaceDiff(workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl);
    selectedUISourceCode(): Workspace.UISourceCode.UISourceCode | null;
    performUpdate(): void;
    private uiSourceCodeModifiedStatusChanged;
}
export declare const enum Events {
    SELECTED_UI_SOURCE_CODE_CHANGED = "SelectedUISourceCodeChanged"
}
export interface EventTypes {
    [Events.SELECTED_UI_SOURCE_CODE_CHANGED]: void;
}
export {};
