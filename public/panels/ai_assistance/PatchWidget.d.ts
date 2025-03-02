import '../../ui/legacy/legacy.js';
import '../../ui/components/markdown_view/markdown_view.js';
import * as Host from '../../core/host/host.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    changeSummary?: string;
    patchSuggestion?: string;
    patchSuggestionLoading?: boolean;
    projectName?: string;
    onApplyToWorkspace?: () => void;
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
