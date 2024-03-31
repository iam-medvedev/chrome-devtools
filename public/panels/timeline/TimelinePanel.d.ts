import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import type * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as TraceEngine from '../../models/trace/trace.js';
import * as UI from '../../ui/legacy/legacy.js';
import { PerformanceModel } from './PerformanceModel.js';
import { type Client } from './TimelineController.js';
import { TimelineFlameChartView } from './TimelineFlameChartView.js';
import { TimelineMiniMap } from './TimelineMiniMap.js';
import { TimelineSelection } from './TimelineSelection.js';
export declare class TimelinePanel extends UI.Panel.Panel implements Client, TimelineModeViewDelegate {
    #private;
    private readonly dropTarget;
    private readonly recordingOptionUIControls;
    private state;
    private recordingPageReload;
    private readonly millisecondsToRecordAfterLoadEvent;
    private readonly toggleRecordAction;
    private readonly recordReloadAction;
    private performanceModel;
    private disableCaptureJSProfileSetting;
    private readonly captureLayersAndPicturesSetting;
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
    private fixMeButton;
    private fixMeButtonAdded;
    private loadButton;
    private saveButton;
    private statusPane;
    private landingPage;
    private loader?;
    private showScreenshotsToolbarCheckbox?;
    private showMemoryToolbarCheckbox?;
    private networkThrottlingSelect?;
    private cpuThrottlingSelect?;
    private fileSelectorElement?;
    private selection?;
    private traceLoadStart;
    private primaryPageTargetPromiseCallback;
    private primaryPageTargetPromise;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
        isNode: boolean;
    } | undefined): TimelinePanel;
    searchableView(): UI.SearchableView.SearchableView | null;
    wasShown(): void;
    willHide(): void;
    loadFromEvents(events: TraceEngine.TracingManager.EventPayload[]): void;
    getFlameChart(): TimelineFlameChartView;
    getMinimap(): TimelineMiniMap;
    private loadFromCpuProfile;
    private setState;
    private createSettingCheckbox;
    private populateToolbar;
    private createSettingsPane;
    private createNetworkConditionsSelect;
    private prepareToLoadTimeline;
    private createFileSelector;
    private contextMenu;
    saveToFile(): Promise<void>;
    showHistory(): Promise<void>;
    navigateHistory(direction: number): boolean;
    selectFileToLoad(): void;
    loadFromFile(file: File): Promise<void>;
    loadFromURL(url: Platform.DevToolsPath.UrlString): Promise<void>;
    private updateOverviewControls;
    private onModeChanged;
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
    private onFixMe;
    private clear;
    private reset;
    applyFilters(_perfModel: PerformanceModel | null, exclusiveFilter?: TimelineModel.TimelineModelFilter.TimelineModelFilter | null): void;
    setModel(model: PerformanceModel | null, exclusiveFilter?: TimelineModel.TimelineModelFilter.TimelineModelFilter | null, traceEngineIndex?: number, metadata?: TraceEngine.Types.File.MetaData | null): void;
    private recordingStarted;
    recordingProgress(usage: number): void;
    private showLandingPage;
    private hideLandingPage;
    loadingStarted(): Promise<void>;
    loadingProgress(progress?: number): Promise<void>;
    processingStarted(): Promise<void>;
    loadingComplete(collectedEvents: TraceEngine.Types.TraceEvents.TraceEventData[], tracingModel: TraceEngine.Legacy.TracingModel | null, exclusiveFilter: TimelineModel.TimelineModelFilter.TimelineModelFilter | null | undefined, isCpuProfile: boolean, recordingStartTime: number | null, metadata: TraceEngine.Types.File.MetaData | null): Promise<void>;
    recordTraceLoadMetric(): void;
    loadingCompleteForTest(): void;
    private showRecordingStarted;
    private cancelLoading;
    private loadEventFired;
    private frameForSelection;
    jumpToFrame(offset: number): true | undefined;
    select(selection: TimelineSelection | null): void;
    selectEntryAtTime(events: TraceEngine.Types.TraceEvents.TraceEventData[] | null, time: number): void;
    highlightEvent(event: TraceEngine.Legacy.Event | null): void;
    private handleDrop;
}
export declare const enum State {
    Idle = "Idle",
    StartPending = "StartPending",
    Recording = "Recording",
    StopPending = "StopPending",
    Loading = "Loading",
    RecordingFailed = "RecordingFailed"
}
export declare const rowHeight = 18;
export declare const headerHeight = 20;
export interface TimelineModeViewDelegate {
    select(selection: TimelineSelection | null): void;
    selectEntryAtTime(events: TraceEngine.Types.TraceEvents.TraceEventData[] | null, time: number): void;
    highlightEvent(event: TraceEngine.Legacy.CompatibleTraceEvent | null): void;
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
    enableDownloadOfEvents(rawEvents: TraceEngine.Types.TraceEvents.TraceEventData[]): void;
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
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
