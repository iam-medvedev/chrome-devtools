import '../../../ui/components/icon_button/icon_button.js';
import './ExtensionView.js';
import './ControlButton.js';
import './ReplaySection.js';
import * as SDK from '../../../core/sdk/sdk.js';
import type * as PublicExtensions from '../../../models/extensions/extensions.js';
import * as CodeMirror from '../../../third_party/codemirror.next/codemirror.next.js';
import type * as Menus from '../../../ui/components/menus/menus.js';
import * as UI from '../../../ui/legacy/legacy.js';
import type * as Converters from '../converters/converters.js';
import type * as Extensions from '../extensions/extensions.js';
import * as Models from '../models/models.js';
import { PlayRecordingSpeed } from '../models/RecordingPlayer.js';
import type { StartReplayEvent } from './ReplaySection.js';
import { type CopyStepEvent, State } from './StepView.js';
declare global {
    interface HTMLElementTagNameMap {
        'devtools-recording-view': RecordingView;
    }
}
export interface ReplayState {
    isPlaying: boolean;
    isPausedOnBreakpoint: boolean;
}
export declare const enum TargetPanel {
    PERFORMANCE_PANEL = "timeline",
    DEFAULT = "chrome-recorder"
}
export interface PlayRecordingEvent {
    targetPanel: TargetPanel;
    speed: PlayRecordingSpeed;
    extension?: Extensions.ExtensionManager.Extension;
}
interface ViewInput {
    breakpointIndexes: Set<number>;
    builtInConverters: readonly Converters.Converter.Converter[];
    converterId: string;
    converterName: string | null;
    currentError: Error | null;
    currentStep: Models.Schema.Step | null;
    editorState: CodeMirror.EditorState | null;
    extensionConverters: readonly Converters.Converter.Converter[];
    extensionDescriptor?: PublicExtensions.RecorderPluginManager.ViewDescriptor;
    isRecording: boolean;
    isTitleInvalid: boolean;
    lastReplayResult: Models.RecordingPlayer.ReplayResult | null;
    recorderSettings: Models.RecorderSettings.RecorderSettings | null;
    recording: Models.Schema.UserFlow;
    recordingTogglingInProgress: boolean;
    replayAllowed: boolean;
    replayExtensions: Extensions.ExtensionManager.Extension[];
    replaySettingsExpanded: boolean;
    replayState: ReplayState;
    sections: Models.Section.Section[];
    selectedStep: Models.Schema.Step | null;
    settings: Models.RecordingSettings.RecordingSettings | null;
    showCodeView: boolean;
    onAddAssertion: () => void;
    onRecordingFinished: () => void;
    getSectionState: (section: Models.Section.Section) => State;
    getStepState: (step: Models.Schema.Step) => State;
    onAbortReplay: () => void;
    onMeasurePerformanceClick: (event: Event) => void;
    onTogglePlaying: (event: StartReplayEvent) => void;
    onCodeFormatChange: (event: Menus.SelectMenu.SelectMenuItemSelectedEvent) => void;
    onCopyStep: (event: CopyStepEvent) => void;
    onEditTitleButtonClick: (event: Event) => void;
    onNetworkConditionsChange: (event: Event) => void;
    onReplaySettingsKeydown: (event: Event) => void;
    onSelectMenuLabelClick: (event: Event) => void;
    onStepClick: (event: Event) => void;
    onStepHover: (event: MouseEvent) => void;
    onTimeoutInput: (event: Event) => void;
    onTitleBlur: (event: Event) => void;
    onTitleInputKeyDown: (event: KeyboardEvent) => void;
    onToggleReplaySettings: (event: Event) => void;
    onWrapperClick: () => void;
    showCodeToggle: () => void;
}
export interface ViewOutput {
    highlightLinesInEditor?: (line: number, length: number, scroll?: boolean) => void;
}
export declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class RecordingView extends UI.Widget.Widget {
    #private;
    replayState: ReplayState;
    isRecording: boolean;
    recordingTogglingInProgress: boolean;
    recording: Models.Schema.UserFlow;
    currentStep?: Models.Schema.Step;
    currentError?: Error;
    sections: Models.Section.Section[];
    settings?: Models.RecordingSettings.RecordingSettings;
    lastReplayResult?: Models.RecordingPlayer.ReplayResult;
    replayAllowed: boolean;
    breakpointIndexes: Set<number>;
    extensionConverters: readonly Converters.Converter.Converter[];
    replayExtensions?: Extensions.ExtensionManager.Extension[];
    extensionDescriptor?: PublicExtensions.RecorderPluginManager.ViewDescriptor;
    addAssertion?: () => void;
    abortReplay?: () => void;
    recordingFinished?: () => void;
    playRecording?: (event: PlayRecordingEvent) => void;
    networkConditionsChanged?: (data?: SDK.NetworkManager.Conditions) => void;
    timeoutChanged?: (timeout?: number) => void;
    titleChanged?: (title: string) => void;
    get recorderSettings(): Models.RecorderSettings.RecorderSettings | undefined;
    set recorderSettings(settings: Models.RecorderSettings.RecorderSettings | undefined);
    get builtInConverters(): readonly Converters.Converter.Converter[];
    set builtInConverters(converters: readonly Converters.Converter.Converter[]);
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
    scrollToBottom(): void;
    showCodeToggle: () => void;
}
export {};
