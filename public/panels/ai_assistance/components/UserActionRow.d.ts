import * as Host from '../../../core/host/host.js';
export interface UserActionRowProps {
    showRateButtons: boolean;
    onFeedbackSubmit: (rate: Host.AidaClient.Rating, feedback?: string) => void;
    suggestions?: [string, ...string[]];
    handleSuggestionClick: (suggestion: string) => void;
    canShowFeedbackForm: boolean;
}
export declare class UserActionRow extends HTMLElement {
    #private;
    constructor(props: UserActionRowProps);
    set props(props: UserActionRowProps);
    connectedCallback(): void;
    disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-user-action-row': UserActionRow;
    }
}
