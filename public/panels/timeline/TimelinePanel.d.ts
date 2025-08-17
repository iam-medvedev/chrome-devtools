import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as AiAssistanceModel from '../../models/ai_assistance/ai_assistance.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineComponents from './components/components.js';
import { type Client } from './TimelineController.js';
import { TimelineFlameChartView } from './TimelineFlameChartView.js';
import { type TimelineSelection } from './TimelineSelection.js';
import * as Utils from './utils/utils.js';
declare const TimelinePanel_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Panel.Panel;
export declare class TimelinePanel extends TimelinePanel_base implements Client, TimelineModeViewDelegate {
    #private;
    private readonly dropTarget;
    private readonly recordingOptionUIControls;
    private state;
    private recordingPageReload;
    private readonly millisecondsToRecordAfterLoadEvent;
    private readonly toggleRecordAction;
    private readonly recordReloadAction;
    private disableCaptureJSProfileSetting;
    private readonly captureLayersAndPicturesSetting;
    private readonly captureSelectorStatsSetting;
    private showScreenshotsSetting;
    private showMemorySetting;
    private readonly panelToolbar;
    private readonly panelRightToolbar;
    private readonly timelinePane;
    private readonly statusPaneContainer;
    private readonly flameChart;
    private readonly searchableViewInternal;
    private showSettingsPaneButton;
    private showSettingsPaneSetting;
    private settingsPane?;
    private controller;
    private cpuProfiler;
    private clearButton;
    private loadButton;
    private saveButton;
    private homeButton?;
    private statusDialog;
    private landingPage;
    private loader?;
    private showScreenshotsToolbarCheckbox?;
    private showMemoryToolbarCheckbox?;
    private networkThrottlingSelect?;
    private cpuThrottlingSelect?;
    private fileSelectorElement?;
    private selection;
    private traceLoadStart;
    constructor(traceModel?: Trace.TraceModel.Model);
    /**
     * This disables the 3P checkbox in the toolbar.
     * If the checkbox was checked, we flip it to indeterminiate to communicate it doesn't currently apply.
     */
    set3PCheckboxDisabled(disabled: boolean): void;
    static instance(opts?: {
        forceNew: boolean | null;
        isNode: boolean;
        traceModel?: Trace.TraceModel.Model;
    } | undefined): TimelinePanel;
    static removeInstance(): void;
    static extensionDataVisibilitySetting(): Common.Settings.Setting<boolean>;
    searchableView(): UI.SearchableView.SearchableView | null;
    wasShown(): void;
    willHide(): void;
    loadFromEvents(events: Trace.Types.Events.Event[]): void;
    loadFromTraceFile(traceFile: Trace.Types.File.TraceFile): void;
    getFlameChart(): TimelineFlameChartView;
    hasActiveTrace(): boolean;
    /**
     * Exposed for handling external requests.
     */
    get model(): Trace.TraceModel.Model;
    /**
     * NOTE: this method only exists to enable some layout tests to be migrated to the new engine.
     * DO NOT use this method within DevTools. It is marked as deprecated so
     * within DevTools you are warned when using the method.
     * @deprecated
     **/
    getParsedTraceForLayoutTests(): Trace.Handlers.Types.ParsedTrace;
    /**
     * NOTE: this method only exists to enable some layout tests to be migrated to the new engine.
     * DO NOT use this method within DevTools. It is marked as deprecated so
     * within DevTools you are warned when using the method.
     * @deprecated
     **/
    getTraceEngineRawTraceEventsForLayoutTests(): readonly Trace.Types.Events.Event[];
    private loadFromCpuProfile;
    private setState;
    private createSettingCheckbox;
    /**
     * Returns false if this was loaded in a standalone context such that recording is
     * not possible, like an enhanced trace (which opens a new devtools window) or
     * trace.cafe.
     */
    private canRecord;
    private populateToolbar;
    private createSettingsPane;
    private createNetworkConditionsSelectToolbarItem;
    private prepareToLoadTimeline;
    private createFileSelector;
    private contextMenu;
    /**
     * Saves a trace file to disk.
     * Pass `config.savingEnhancedTrace === true` to include source maps in the resulting metadata.
     * Pass `config.addModifications === true` to include user modifications to the trace file, which includes:
     *      1. Annotations
     *      2. Filtering / collapsing of the flame chart.
     *      3. Visual track configuration (re-ordering or hiding tracks).
     */
    saveToFile(config: {
        includeScriptContent: boolean;
        includeSourceMaps: boolean;
        addModifications: boolean;
    }): Promise<void>;
    innerSaveToFile(traceEvents: readonly Trace.Types.Events.Event[], metadata: Trace.Types.File.MetaData, config: {
        savingEnhancedTrace: boolean;
        addModifications: boolean;
    }): Promise<void>;
    showHistoryDropdown(): Promise<void>;
    navigateHistory(direction: number): boolean;
    selectFileToLoad(): void;
    loadFromFile(file: File): Promise<void>;
    loadFromURL(url: Platform.DevToolsPath.UrlString): Promise<void>;
    private updateMiniMap;
    private onMemoryModeChanged;
    private onDimThirdPartiesChanged;
    private updateSettingsPaneVisibility;
    private updateShowSettingsToolbarButton;
    private setUIControlsEnabled;
    private startRecording;
    private stopRecording;
    private recordingFailed;
    private onSuspendStateChanged;
    private consoleProfileFinished;
    private updateTimelineControls;
    toggleRecording(): Promise<void>;
    recordReload(): void;
    private onClearButton;
    private buildColorsAnnotationsMap;
    private getEntryColorByEntry;
    private recordingStarted;
    recordingProgress(usage: number): void;
    loadingStarted(): Promise<void>;
    loadingProgress(progress?: number): Promise<void>;
    processingStarted(): Promise<void>;
    /**
     * This is called with we are done loading a trace from a file, or after we
     * have recorded a fresh trace.
     *
     * IMPORTANT: All the code in here should be code that is only required when we have
     * recorded or loaded a brand new trace. If you need the code to run when the
     * user switches to an existing trace, please @see #setModelForActiveTrace and put your
     * code in there.
     **/
    loadingComplete(collectedEvents: Trace.Types.Events.Event[], exclusiveFilter: (Trace.Extras.TraceFilter.TraceFilter | null) | undefined, metadata: Trace.Types.File.MetaData | null): Promise<void>;
    recordTraceLoadMetric(): void;
    loadingCompleteForTest(): void;
    private showRecordingStarted;
    private cancelLoading;
    private loadEventFired;
    private frameForSelection;
    jumpToFrame(offset: number): true | undefined;
    select(selection: TimelineSelection | null): void;
    selectEntryAtTime(events: Trace.Types.Events.Event[] | null, time: number): void;
    highlightEvent(event: Trace.Types.Events.Event | null): void;
    private handleDrop;
    /**
     * Used to reveal an insight - and is called from the AI Assistance panel when the user clicks on the Insight context button that is shown.
     * Revealing an insight should:
     * 1. Ensure the sidebar is open
     * 2. Ensure the insight is expanded
     *    (both of these should be true in the AI Assistance case)
     * 3. Flash the Insight with the highlight colour we use in other panels.
     */
    revealInsight(insightModel: Trace.Insights.Types.InsightModel): void;
    static handleExternalRecordRequest(): AsyncGenerator<AiAssistanceModel.ExternalRequestResponse, AiAssistanceModel.ExternalRequestResponse>;
}
export declare const enum State {
    IDLE = "Idle",
    START_PENDING = "StartPending",
    RECORDING = "Recording",
    STOP_PENDING = "StopPending",
    LOADING = "Loading",
    RECORDING_FAILED = "RecordingFailed"
}
export declare const rowHeight = 18;
export declare const headerHeight = 20;
export interface TimelineModeViewDelegate {
    select(selection: TimelineSelection | null): void;
    element: Element;
    set3PCheckboxDisabled(disabled: boolean): void;
    selectEntryAtTime(events: Trace.Types.Events.Event[] | null, time: number): void;
    highlightEvent(event: Trace.Types.Events.Event | null): void;
}
export declare let loadTimelineHandlerInstance: LoadTimelineHandler;
export declare class LoadTimelineHandler implements Common.QueryParamHandler.QueryParamHandler {
    static instance(opts?: {
        forceNew: boolean | null;
    }): LoadTimelineHandler;
    handleQueryParam(value: string): void;
}
export declare class TraceRevealer implements Common.Revealer.Revealer<SDK.TraceObject.TraceObject> {
    reveal(trace: SDK.TraceObject.TraceObject): Promise<void>;
}
export declare class EventRevealer implements Common.Revealer.Revealer<SDK.TraceObject.RevealableEvent> {
    reveal(rEvent: SDK.TraceObject.RevealableEvent): Promise<void>;
}
export declare class InsightRevealer implements Common.Revealer.Revealer<Utils.Helpers.RevealableInsight> {
    reveal(revealable: Utils.Helpers.RevealableInsight): Promise<void>;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
/**
 * Used to set the UI.Context when the user expands an Insight. This is only
 * relied upon in the AI Agent code to know which agent to pick by default based
 * on the context of the panel.
 */
export declare class SelectedInsight {
    insight: TimelineComponents.Sidebar.ActiveInsight;
    constructor(insight: TimelineComponents.Sidebar.ActiveInsight);
}
export declare const enum Events {
    IS_VIEWING_TRACE = "IsViewingTrace",
    RECORDING_COMPLETED = "RecordingCompleted"
}
export interface EventTypes {
    [Events.IS_VIEWING_TRACE]: boolean;
    [Events.RECORDING_COMPLETED]: {
        traceIndex: number;
    } | {
        errorText: string;
    };
}
export {};
