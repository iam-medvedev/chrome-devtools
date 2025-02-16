import * as Common from '../../core/common/common.js';
import * as Diff from '../../third_party/diff/diff.js';
import * as FormatterModule from '../formatter/formatter.js';
import * as Workspace from '../workspace/workspace.js';
interface DiffResponse {
    diff: Diff.Diff.DiffArray;
    formattedCurrentMapping?: FormatterModule.ScriptFormatter.FormatterSourceMapping;
}
export declare class WorkspaceDiffImpl extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    #private;
    private readonly loadingUISourceCodes;
    constructor(workspace: Workspace.Workspace.WorkspaceImpl);
    requestDiff(uiSourceCode: Workspace.UISourceCode.UISourceCode): Promise<DiffResponse | null>;
    subscribeToDiffChange(uiSourceCode: Workspace.UISourceCode.UISourceCode, callback: () => void, thisObj?: Object): void;
    unsubscribeFromDiffChange(uiSourceCode: Workspace.UISourceCode.UISourceCode, callback: () => void, thisObj?: Object): void;
    modifiedUISourceCodes(): Workspace.UISourceCode.UISourceCode[];
    private uiSourceCodeDiff;
    private uiSourceCodeChanged;
    private uiSourceCodeAdded;
    private uiSourceCodeRemoved;
    private projectRemoved;
    private removeUISourceCode;
    private markAsUnmodified;
    private markAsModified;
    private uiSourceCodeProcessedForTest;
    private updateModifiedState;
    requestOriginalContentForUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode): Promise<string | null>;
    revertToOriginal(uiSourceCode: Workspace.UISourceCode.UISourceCode): Promise<void>;
}
export declare const enum Events {
    MODIFIED_STATUS_CHANGED = "ModifiedStatusChanged"
}
export interface ModifiedStatusChangedEvent {
    uiSourceCode: Workspace.UISourceCode.UISourceCode;
    isModified: boolean;
}
export interface EventTypes {
    [Events.MODIFIED_STATUS_CHANGED]: ModifiedStatusChangedEvent;
}
export declare class UISourceCodeDiff extends Common.ObjectWrapper.ObjectWrapper<UISourceCodeDiffEventTypes> {
    private uiSourceCode;
    private requestDiffPromise;
    private pendingChanges;
    dispose: boolean;
    constructor(uiSourceCode: Workspace.UISourceCode.UISourceCode);
    private uiSourceCodeChanged;
    requestDiff(): Promise<DiffResponse | null>;
    originalContent(): Promise<string | null>;
    private innerRequestDiff;
}
export declare const enum UISourceCodeDiffEvents {
    DIFF_CHANGED = "DiffChanged"
}
export interface UISourceCodeDiffEventTypes {
    [UISourceCodeDiffEvents.DIFF_CHANGED]: void;
}
export declare function workspaceDiff(): WorkspaceDiffImpl;
export declare const UpdateTimeout = 200;
export {};
