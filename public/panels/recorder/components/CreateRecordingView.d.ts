import '../../../ui/legacy/legacy.js';
import '../../../ui/components/icon_button/icon_button.js';
import './ControlButton.js';
import * as Models from '../models/models.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-create-recording-view': CreateRecordingView;
    }
    interface HTMLElementEventMap {
        recordingstarted: RecordingStartedEvent;
        recordingcancelled: RecordingCancelledEvent;
    }
}
export declare class RecordingStartedEvent extends Event {
    static readonly eventName = "recordingstarted";
    name: string;
    selectorAttribute?: string;
    selectorTypesToRecord: Models.Schema.SelectorType[];
    constructor(name: string, selectorTypesToRecord: Models.Schema.SelectorType[], selectorAttribute?: string);
}
export declare class RecordingCancelledEvent extends Event {
    static readonly eventName = "recordingcancelled";
    constructor();
}
export interface CreateRecordingViewData {
    recorderSettings: Models.RecorderSettings.RecorderSettings;
}
export declare class CreateRecordingView extends HTMLElement {
    #private;
    constructor();
    connectedCallback(): void;
    set data(data: CreateRecordingViewData);
    startRecording(): void;
}
