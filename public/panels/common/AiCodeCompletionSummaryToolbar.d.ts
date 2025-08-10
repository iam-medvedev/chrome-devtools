import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    disclaimerTooltipId: string;
    panelName: string;
    citations?: string[];
    citationsTooltipId: string;
    noLogging: boolean;
    onManageInSettingsTooltipClick: () => void;
}
export interface ViewOutput {
    hideTooltip?: () => void;
    setLoading?: (isLoading: boolean) => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_SUMMARY_TOOLBAR_VIEW: View;
export declare class AiCodeCompletionSummaryToolbar extends UI.Widget.Widget {
    #private;
    constructor(disclaimerTooltipId: string, citationsTooltipId: string, panelName: string, view?: View);
    setLoading(loading: boolean): void;
    updateCitations(citations: string[]): void;
    clearCitations(): void;
    performUpdate(): void;
}
