import '../../ui/legacy/legacy.js';
import '../../ui/components/markdown_view/markdown_view.js';
import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as Host from '../../core/host/host.js';
import type * as Platform from '../../core/platform/platform.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl;
    changeSummary?: string;
    patchSuggestion?: string;
    patchSuggestionLoading?: boolean;
    projectName?: string;
    projectPath: Platform.DevToolsPath.UrlString;
    onApplyToWorkspace?: () => void;
    onDiscard: () => void;
    onSaveAll: () => void;
    onChangeWorkspaceClick: () => void;
}
type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare class PatchWidget extends UI.Widget.Widget {
    #private;
    changeSummary: string;
    constructor(element?: HTMLElement, view?: View, opts?: {
        aidaClient: Host.AidaClient.AidaClient;
    });
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
}
export declare function isAiAssistancePatchingEnabled(): boolean;
export {};
