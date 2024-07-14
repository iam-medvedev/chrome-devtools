import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as Workspace from '../../models/workspace/workspace.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
declare const ChangesSidebar_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.SelectedUISourceCodeChanged>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.SelectedUISourceCodeChanged>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.SelectedUISourceCodeChanged>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.SelectedUISourceCodeChanged): boolean;
    dispatchEventToListeners<T extends Events.SelectedUISourceCodeChanged>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.Widget;
export declare class ChangesSidebar extends ChangesSidebar_base {
    private treeoutline;
    private readonly treeElements;
    private readonly workspaceDiff;
    constructor(workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl);
    selectUISourceCode(uiSourceCode: Workspace.UISourceCode.UISourceCode, omitFocus?: boolean | undefined): void;
    selectedUISourceCode(): Workspace.UISourceCode.UISourceCode | null;
    private selectionChanged;
    private uiSourceCodeMofiedStatusChanged;
    private removeUISourceCode;
    private addUISourceCode;
    wasShown(): void;
}
export declare const enum Events {
    SelectedUISourceCodeChanged = "SelectedUISourceCodeChanged"
}
export type EventTypes = {
    [Events.SelectedUISourceCodeChanged]: void;
};
export declare class UISourceCodeTreeElement extends UI.TreeOutline.TreeElement {
    uiSourceCode: Workspace.UISourceCode.UISourceCode;
    private readonly eventListeners;
    constructor(uiSourceCode: Workspace.UISourceCode.UISourceCode);
    private updateTitle;
    dispose(): void;
}
export {};
