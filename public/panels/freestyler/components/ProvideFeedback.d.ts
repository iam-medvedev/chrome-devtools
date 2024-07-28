import * as Host from '../../../core/host/host.js';
export interface ProvideFeedbackProps {
    onFeedbackSubmit: (rate: Host.AidaClient.Rating, feedback?: string) => void;
    canShowFeedbackForm: boolean;
}
export declare class ProvideFeedback extends HTMLElement {
    #private;
    static readonly litTagName: import("../../../ui/lit-html/static.js").Static;
    constructor(props: ProvideFeedbackProps);
    set props(props: ProvideFeedbackProps);
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-provide-feedback': ProvideFeedback;
    }
}
