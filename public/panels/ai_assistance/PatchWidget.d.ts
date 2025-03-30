import '../../ui/components/markdown_view/markdown_view.js';
import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import '../../ui/legacy/legacy.js';
import * as Host from '../../core/host/host.js';
import type * as Platform from '../../core/platform/platform.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as WorkspaceDiff from '../../models/workspace_diff/workspace_diff.js';
import * as UI from '../../ui/legacy/legacy.js';
import { Directives } from '../../ui/lit/lit.js';
export declare enum PatchSuggestionState {
    /**
     * The user did not attempt patching yet
     */
    INITIAL = "initial",
    /**
     * Applying to page tree is in progress
     */
    LOADING = "loading",
    /**
     * Applying to page tree succeeded
     */
    SUCCESS = "success",
    /**
     * Applying to page tree failed
     */
    ERROR = "error"
}
export interface ViewInput {
    workspaceDiff: WorkspaceDiff.WorkspaceDiff.WorkspaceDiffImpl;
    patchSuggestionState: PatchSuggestionState;
    changeSummary?: string;
    sources?: string;
    savedToDisk?: boolean;
    disclaimerTooltipText: Platform.UIString.LocalizedString;
    onLearnMoreTooltipClick: () => void;
    onApplyToPageTree: () => void;
    onCancel: () => void;
    onDiscard: () => void;
    onSaveToWorkspace?: () => void;
}
export interface ViewOutput {
    tooltipRef?: Directives.Ref<HTMLElement>;
}
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class PatchWidget extends UI.Widget.Widget {
    #private;
    changeSummary: string;
    changeManager: AiAssistanceModel.ChangeManager | undefined;
    constructor(element?: HTMLElement, view?: View, opts?: {
        aidaClient: Host.AidaClient.AidaClient;
    });
    performUpdate(): void;
    wasShown(): void;
}
export declare function isAiAssistancePatchingEnabled(): boolean;
export {};
