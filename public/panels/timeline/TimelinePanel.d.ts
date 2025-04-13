import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Trace from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as TimelineComponents from './components/components.js';
import { type Client } from './TimelineController.js';
import { TimelineFlameChartView } from './TimelineFlameChartView.js';
import { TimelineMiniMap } from './TimelineMiniMap.js';
import { type TimelineSelection } from './TimelineSelection.js';
import * as Utils from './utils/utils.js';
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
    private settingsPane?;
    private controller;
    private cpuProfiler;
    private clearButton;
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
    constructor(traceModel?: Trace.TraceModel.Model);
    /**
     * This "disables" the 3P checkbox in the toolbar.
     * Disabling here does a couple of things:
     * 1) makes the checkbox dimmed and unclickable
     * 2) gives the checkbox UI an indeterminate state
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
    saveToFile(savingEnhancedTrace?: boolean, addModifications?: boolean): Promise<void>;
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
        hideStopButton: boolean;
        showTimer?: boolean;
        showProgress?: boolean;
        description?: string;
        buttonText?: string;
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
export declare class InsightRevealer implements Common.Revealer.Revealer<Utils.InsightAIContext.ActiveInsight> {
    reveal(revealable: Utils.InsightAIContext.ActiveInsight): Promise<void>;
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
