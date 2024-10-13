import '../../../ui/legacy/legacy.js';
import '../../../ui/components/panel_introduction_steps/panel_introduction_steps.js';
import '../../../ui/components/panel_feedback/panel_feedback.js';
import type * as Platform from '../../../core/platform/platform.js';
export declare const FEEDBACK_URL: Platform.DevToolsPath.UrlString;
declare global {
    interface HTMLElementTagNameMap {
        'devtools-start-view': StartView;
    }
}
export declare class CreateRecordingEvent extends Event {
    static readonly eventName = "createrecording";
    constructor();
}
export declare class StartView extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
}
