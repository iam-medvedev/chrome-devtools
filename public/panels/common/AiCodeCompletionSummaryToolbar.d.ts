import '../../ui/components/spinners/spinners.js';
import '../../ui/components/tooltips/tooltips.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface AiCodeCompletionSummaryToolbarProps {
    citationsTooltipId: string;
    disclaimerTooltipId?: string;
    hasTopBorder?: boolean;
}
export interface ViewInput {
    disclaimerTooltipId?: string;
    citations?: Set<string>;
    citationsTooltipId: string;
    loading: boolean;
    hasTopBorder: boolean;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_SUMMARY_TOOLBAR_VIEW: View;
export declare class AiCodeCompletionSummaryToolbar extends UI.Widget.Widget {
    #private;
    constructor(props: AiCodeCompletionSummaryToolbarProps, view?: View);
    setLoading(loading: boolean): void;
    updateCitations(citations: string[]): void;
    clearCitations(): void;
    performUpdate(): void;
}
