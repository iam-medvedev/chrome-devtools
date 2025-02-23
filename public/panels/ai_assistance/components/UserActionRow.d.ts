import * as Host from '../../../core/host/host.js';
import * as UI from '../../../ui/legacy/legacy.js';
export interface RatingViewInput {
    currentRating?: Host.AidaClient.Rating;
    onRatingClick: (rating: Host.AidaClient.Rating) => void;
    showRateButtons: boolean;
    onReportClick: () => void;
}
export interface SuggestionViewInput {
    suggestions?: [string, ...string[]];
    scrollSuggestionsScrollContainer: (direction: 'left' | 'right') => void;
    onSuggestionsScrollOrResize: () => void;
    onSuggestionClick: (suggestion: string) => void;
}
export interface FeedbackFormViewInput {
    isShowingFeedbackForm: boolean;
    onSubmit: (event: SubmitEvent) => void;
    onClose: () => void;
    onInputChange: (input: string) => void;
    isSubmitButtonDisabled: boolean;
}
export type UserActionRowViewInput = RatingViewInput & SuggestionViewInput & FeedbackFormViewInput;
export interface ViewOutput {
    suggestionsLeftScrollButtonContainer?: Element;
    suggestionsScrollContainer?: Element;
    suggestionsRightScrollButtonContainer?: Element;
}
export interface UserActionRowWidgetParams {
    showRateButtons: boolean;
    onFeedbackSubmit: (rate: Host.AidaClient.Rating, feedback?: string) => void;
    suggestions?: [string, ...string[]];
    onSuggestionClick: (suggestion: string) => void;
    canShowFeedbackForm: boolean;
}
export type View = (input: UserActionRowViewInput, output: ViewOutput, target: HTMLElement) => void;
/**
 * This presenter has too many responsibilities (rating buttons, feedback
 * form, suggestions).
 */
export declare class UserActionRow extends UI.Widget.Widget implements UserActionRowWidgetParams {
    #private;
    showRateButtons: boolean;
    onFeedbackSubmit: (rate: Host.AidaClient.Rating, feedback?: string) => void;
    suggestions: [string, ...string[]] | undefined;
    onSuggestionClick: (suggestion: string) => void;
    canShowFeedbackForm: boolean;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    performUpdate(): Promise<void> | void;
    disconnectedCallback(): void;
}
