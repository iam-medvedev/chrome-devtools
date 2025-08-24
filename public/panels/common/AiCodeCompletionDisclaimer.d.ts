import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    disclaimerTooltipId?: string;
    noLogging: boolean;
    onManageInSettingsTooltipClick: () => void;
}
export interface ViewOutput {
    hideTooltip?: () => void;
    setLoading?: (isLoading: boolean) => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_SUMMARY_TOOLBAR_VIEW: View;
export declare class AiCodeCompletionDisclaimer extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set disclaimerTooltipId(disclaimerTooltipId: string);
    set loading(loading: boolean);
    performUpdate(): void;
}
