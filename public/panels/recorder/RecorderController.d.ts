import '../../ui/kit/kit.js';
import * as Lit from '../../ui/lit/lit.js';
import * as Components from './components/components.js';
import * as Models from './models/models.js';
import * as Actions from './recorder-actions/recorder-actions.js';
declare const LitElement: typeof Lit.LitElement;
declare global {
    interface HTMLElementTagNameMap {
        'devtools-recorder-controller': RecorderController;
    }
}
interface StoredRecording {
    storageName: string;
    flow: Models.Schema.UserFlow;
}
export declare const enum Pages {
    START_PAGE = "StartPage",
    ALL_RECORDINGS_PAGE = "AllRecordingsPage",
    CREATE_RECORDING_PAGE = "CreateRecordingPage",
    RECORDING_PAGE = "RecordingPage"
}
export declare class RecorderController extends LitElement {
    #private;
    private currentRecordingSession?;
    private currentRecording;
    private currentStep?;
    private recordingError?;
    private isRecording;
    private isToggling;
    private recordingPlayer?;
    private lastReplayResult?;
    private currentPage;
    private previousPage?;
    private sections?;
    private settings?;
    private importError?;
    private exportMenuExpanded;
    private extensionConverters;
    private replayExtensions;
    private viewDescriptor?;
    constructor();
    disconnectedCallback(): void;
    setIsRecordingStateForTesting(isRecording: boolean): void;
    setRecordingStateForTesting(state: Components.RecordingView.ReplayState): void;
    setCurrentPageForTesting(page: Pages): void;
    getCurrentPageForTesting(): Pages;
    getCurrentRecordingForTesting(): StoredRecording | undefined;
    getStepBreakpointIndexesForTesting(): number[];
    setCurrentRecordingForTesting(recording: StoredRecording | undefined): void;
    getSectionsForTesting(): Models.Section.Section[] | undefined;
    getUserFlow(): Models.Schema.UserFlow | undefined;
    onRecordingCancelled(): Promise<void>;
    handleActions(actionId: Actions.RecorderActions): void;
    isActionPossible(actionId: Actions.RecorderActions): boolean;
    protected render(): Lit.TemplateResult;
}
export {};
