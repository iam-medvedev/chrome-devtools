import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type Client } from './TimelineController.js';
import { TimelineFlameChartView } from './TimelineFlameChartView.js';
import { TimelineMiniMap } from './TimelineMiniMap.js';
import { type TimelineSelection } from './TimelineSelection.js';
export declare class TimelinePanel extends UI.Panel.Panel implements Client, TimelineModeViewDelegate {
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
    private settingsPane;
    private controller;
    private cpuProfiler;
    private clearButton;
    private brickBreakerToolbarButton;
    private brickBreakerToolbarButtonAdded;
    private loadButton;
    private saveButton;
    private homeButton?;
    private statusPane;
    private landingPage;
    private loader?;
    private showScreenshotsToolbarCheckbox?;
    private showMemoryToolbarCheckbox?;
    private networkThrottlingSelect?;
    private cpuThrottlingSelect?;
    private fileSelectorElement?;
    private selection;
    private traceLoadStart;
    private primaryPageTargetPromiseCallback;
    private primaryPageTargetPromise;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
        isNode: boolean;
    } | undefined): TimelinePanel;
    static extensionDataVisibilitySetting(): Common.Settings.Setting<boolean>;
    searchableView(): UI.SearchableView.SearchableView | null;
    wasShown(): void;
    willHide(): void;
    loadFromEvents(events: Trace.Types.Events.Event[]): void;
    getFlameChart(): TimelineFlameChartView;
    getMinimap(): TimelineMiniMap;
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
    private populateToolbar;
    private createSettingsPane;
    private createNetworkConditionsSelectToolbarItem;
    private prepareToLoadTimeline;
    private createFileSelector;
    private contextMenu;
    saveToFile(isEnhancedTraces?: boolean, addModifications?: boolean): Promise<void>;
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
     * user switches to an existing trace, please {@see setModel} and put your
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
    selectEntryAtTime(events: Trace.Types.Events.Event[] | null, time: number): void;
    highlightEvent(event: Trace.Types.Events.Event | null): void;
}
export declare class StatusPane extends UI.Widget.VBox {
    #private;
    private status;
    private time;
    private progressLabel;
    private progressBar;
    private readonly description;
    private button;
    private downloadTraceButton;
    private startTime;
    private timeUpdateTimer?;
    constructor(options: {
        showTimer?: boolean;
        showProgress?: boolean;
        description?: string;
        buttonText?: string;
        buttonDisabled?: boolean;
    }, buttonCallback: () => (Promise<void> | void));
    finish(): void;
    enableDownloadOfEvents(rawEvents: Trace.Types.Events.Event[]): void;
    remove(): void;
    showPane(parent: Element): void;
    enableAndFocusButton(): void;
    updateStatus(text: string): void;
    updateProgressBar(activity: string, percent: number): void;
    startTimer(): void;
    private stopTimer;
    private updateTimer;
    private arrangeDialog;
    wasShown(): void;
}
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
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
