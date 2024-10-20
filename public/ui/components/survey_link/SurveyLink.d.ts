import '../icon_button/icon_button.js';
import * as Common from '../../../core/common/common.js';
import type * as Host from '../../../core/host/host.js';
export type CanShowSurveyCallback = (result: Host.InspectorFrontendHostAPI.CanShowSurveyResult) => void;
export type ShowSurveyCallback = (result: Host.InspectorFrontendHostAPI.ShowSurveyResult) => void;
export interface SurveyLinkData {
    trigger: string;
    promptText: Common.UIString.LocalizedString;
    canShowSurvey: (trigger: string, callback: CanShowSurveyCallback) => void;
    showSurvey: (trigger: string, callback: ShowSurveyCallback) => void;
}
export declare class SurveyLink extends HTMLElement {
    #private;
    connectedCallback(): void;
    set data(data: SurveyLinkData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-survey-link': SurveyLink;
    }
}
