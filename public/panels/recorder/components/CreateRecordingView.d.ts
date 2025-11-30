import '../../../ui/kit/kit.js';
import './ControlButton.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as Models from '../models/models.js';
export interface ViewInput {
    name: string;
    selectorAttribute: string;
    selectorTypes: Array<{
        selectorType: Models.Schema.SelectorType;
        checked: boolean;
    }>;
    error?: Error;
    onRecordingStarted: () => void;
    onRecordingCancelled: () => void;
    onErrorReset: () => void;
    onUpdate: (update: {
        selectorType: Models.Schema.SelectorType;
        checked: boolean;
    } | {
        name: string;
    } | {
        selectorAttribute: string;
    }) => void;
}
export interface ViewOutput {
    focusInput?: () => void;
}
export declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class CreateRecordingView extends UI.Widget.Widget {
    #private;
    onRecordingStarted: (data: {
        name: string;
        selectorTypesToRecord: Models.Schema.SelectorType[];
        selectorAttribute?: string;
    }) => void;
    onRecordingCancelled: () => void;
    set recorderSettings(value: Models.RecorderSettings.RecorderSettings);
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    wasShown(): void;
    startRecording(): void;
    performUpdate(): void;
}
