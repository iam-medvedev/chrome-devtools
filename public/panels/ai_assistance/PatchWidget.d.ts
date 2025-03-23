import '../../ui/legacy/legacy.js';
import '../../ui/components/markdown_view/markdown_view.js';
import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as Host from '../../core/host/host.js';
import type * as Platform from '../../core/platform/platform.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives } from '../../ui/lit/lit.js';
export declare enum PatchSuggestionState {
    INITIAL = "initial",// The user did not attempt patching yet.
    LOADING = "loading",// Applying to workspace is in progress.
    SUCCESS = "success",// Applying to workspace succeeded.
    ERROR = "error"
}
export interface ViewInput {
    workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl;
    patchSuggestionState: PatchSuggestionState;
    changeSummary?: string;
    sources?: string;
    projectName?: string;
    savedToDisk?: boolean;
    projectPath: Platform.DevToolsPath.UrlString;
    applyToWorkspaceTooltipText: Platform.UIString.LocalizedString;
    onLearnMoreTooltipClick: () => void;
    onApplyToWorkspace: () => void;
    onCancel: () => void;
    onDiscard: () => void;
    onSaveAll: () => void;
    onChangeWorkspaceClick: () => void;
}
export interface ViewOutput {
    tooltipRef?: Directives.Ref<HTMLElement>;
}
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
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
