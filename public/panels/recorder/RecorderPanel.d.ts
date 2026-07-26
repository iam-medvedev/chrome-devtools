import '../../ui/kit/kit.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as PublicExtensions from '../../models/extensions/extensions.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import type * as Dialogs from '../../ui/components/dialogs/dialogs.js';
import type * as Menus from '../../ui/components/menus/menus.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Converters from './converters/converters.js';
import { CreateRecordingView } from './CreateRecordingView.js';
import * as Extensions from './extensions/extensions.js';
import * as Models from './models/models.js';
import * as Actions from './recorder-actions/recorder-actions.js';
import { type PlayRecordingEvent as ViewPlayRecordingEvent, RecordingView, type ReplayState } from './RecordingView.js';
import { AddStepPosition } from './StepView.js';
export interface StoredRecording {
    storageName: string;
    flow: Models.Schema.UserFlow;
}
export declare const enum Pages {
    START_PAGE = "StartPage",
    ALL_RECORDINGS_PAGE = "AllRecordingsPage",
    CREATE_RECORDING_PAGE = "CreateRecordingPage",
    RECORDING_PAGE = "RecordingPage"
}
export interface ViewInput {
    recordings: StoredRecording[];
    currentRecording?: StoredRecording;
    currentPage: Pages;
    isRecording: boolean;
    isToggling: boolean;
    importError?: Error;
    recordingError?: Error;
    sections: Models.Section.Section[];
    settings?: Models.RecordingSettings.RecordingSettings;
    recorderSettings: Models.RecorderSettings.RecorderSettings;
    lastReplayResult?: Models.RecordingPlayer.ReplayResult;
    replayAllowed: boolean;
    breakpointIndexes: Set<number>;
    builtInConverters: readonly Converters.Converter.Converter[];
    extensionConverters: Converters.Converter.Converter[];
    replayExtensions: Extensions.ExtensionManager.Extension[];
    extensionDescriptor?: PublicExtensions.RecorderPluginManager.ViewDescriptor;
    exportMenuExpanded: boolean;
    replayState: ReplayState;
    shortcutsInfo: Dialogs.ShortcutDialog.Shortcut[];
    currentStep?: Models.Schema.Step;
    onCreateNewRecording: (event?: Event) => void;
    onImportRecording: (event: Event) => void;
    onExportRecording: (event: Event) => void;
    onDeleteRecording: (event: Event | string) => void;
    onRecordingSelected: (event: Event | string) => void;
    onPlayRecordingByName: (storageName: string) => void;
    onPlayRecording: (event: ViewPlayRecordingEvent) => void;
    onAbortReplay: () => void;
    onNetworkConditionsChanged: (data?: SDK.NetworkManager.Conditions) => void;
    onTimeoutChanged: (timeout?: number) => void;
    handleRecordingTitleChanged: (title: string) => void;
    handleRecordingChanged: (currentStep: Models.Schema.Step, newStep: Models.Schema.Step) => void;
    handleStepAdded: (stepOrSection: Models.Schema.Step | Models.Section.Section, position: AddStepPosition) => void;
    handleStepRemoved: (step: Models.Schema.Step) => void;
    onAddBreakpoint: (index: number) => void;
    onRemoveBreakpoint: (index: number) => void;
    onExtensionViewClosed: () => void;
    onExportMenuClosed: () => void;
    onExportOptionSelected: (event: Menus.SelectMenu.SelectMenuItemSelectedEvent) => void;
    onRecordingFinished: () => void;
    handleAddAssertionEvent: () => void;
    onSetRecording: (event: Event) => void;
    onContinueReplay: () => void;
    onStepOverReplay: () => void;
    getExportMenuButton: () => Buttons.Button.Button;
    onRecordingStarted: (data: {
        name: string;
        selectorTypesToRecord: Models.Schema.SelectorType[];
        selectorAttribute?: string;
    }) => void;
    onRecordingCancelled: () => void;
}
export interface ViewOutput {
    exportMenuButton: Buttons.Button.Button;
    recordingView: RecordingView;
    createRecordingView: CreateRecordingView;
}
export type View = (input: ViewInput, output: ViewOutput, target: DocumentFragment) => void;
export declare const DEFAULT_VIEW: View;
export declare class RecorderPanel extends UI.Widget.VBox<DocumentFragment> {
    #private;
    static panelName: string;
    static instance(opts?: {
        forceNew?: boolean;
    }): RecorderPanel;
    get currentRecordingSession(): Models.RecordingSession.RecordingSession | undefined;
    set currentRecordingSession(value: Models.RecordingSession.RecordingSession | undefined);
    get currentRecording(): StoredRecording | undefined;
    set currentRecording(value: StoredRecording | undefined);
    get currentStep(): Models.Schema.Step | undefined;
    set currentStep(value: Models.Schema.Step | undefined);
    get recordingError(): Error | undefined;
    set recordingError(value: Error | undefined);
    get isRecording(): boolean;
    set isRecording(value: boolean);
    get isToggling(): boolean;
    set isToggling(value: boolean);
    get recordingPlayer(): Models.RecordingPlayer.RecordingPlayer | undefined;
    set recordingPlayer(value: Models.RecordingPlayer.RecordingPlayer | undefined);
    get lastReplayResult(): Models.RecordingPlayer.ReplayResult | undefined;
    set lastReplayResult(value: Models.RecordingPlayer.ReplayResult | undefined);
    get currentPage(): Pages;
    set currentPage(value: Pages);
    get previousPage(): Pages | undefined;
    set previousPage(value: Pages | undefined);
    get sections(): Models.Section.Section[] | undefined;
    set sections(value: Models.Section.Section[] | undefined);
    get settings(): Models.RecordingSettings.RecordingSettings | undefined;
    set settings(value: Models.RecordingSettings.RecordingSettings | undefined);
    get importError(): Error | undefined;
    set importError(value: Error | undefined);
    get exportMenuExpanded(): boolean;
    set exportMenuExpanded(value: boolean);
    get extensionConverters(): Converters.Converter.Converter[];
    set extensionConverters(value: Converters.Converter.Converter[]);
    get replayExtensions(): Extensions.ExtensionManager.Extension[];
    set replayExtensions(value: Extensions.ExtensionManager.Extension[]);
    get viewDescriptor(): PublicExtensions.RecorderPluginManager.ViewDescriptor | undefined;
    set viewDescriptor(value: PublicExtensions.RecorderPluginManager.ViewDescriptor | undefined);
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    wasShown(): void;
    willHide(): void;
    onDetach(): void;
    setIsRecordingStateForTesting(isRecording: boolean): void;
    setRecordingStateForTesting(state: ReplayState): void;
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
    performUpdate(): void;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(_context: UI.Context.Context, actionId: Actions.RecorderActions): boolean;
}
