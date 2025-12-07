import '../../../ui/kit/kit.js';
import './StepEditor.js';
import * as Menus from '../../../ui/components/menus/menus.js';
import * as UI from '../../../ui/legacy/legacy.js';
import type * as Converters from '../converters/converters.js';
import * as Models from '../models/models.js';
import type { StepEditedEvent } from './StepEditor.js';
export declare const enum State {
    DEFAULT = "default",
    SUCCESS = "success",
    CURRENT = "current",
    OUTSTANDING = "outstanding",
    ERROR = "error",
    STOPPED = "stopped"
}
export declare class CaptureSelectorsEvent extends Event {
    static readonly eventName = "captureselectors";
    data: Models.Schema.StepWithSelectors & Partial<Models.Schema.ClickAttributes>;
    constructor(step: Models.Schema.StepWithSelectors & Partial<Models.Schema.ClickAttributes>);
}
export declare class CopyStepEvent extends Event {
    static readonly eventName = "copystep";
    step: Models.Schema.Step;
    constructor(step: Models.Schema.Step);
}
export declare class StepChanged extends Event {
    static readonly eventName = "stepchanged";
    currentStep: Models.Schema.Step;
    newStep: Models.Schema.Step;
    constructor(currentStep: Models.Schema.Step, newStep: Models.Schema.Step);
}
export declare const enum AddStepPosition {
    BEFORE = "before",
    AFTER = "after"
}
export declare class AddStep extends Event {
    static readonly eventName = "addstep";
    position: AddStepPosition;
    stepOrSection: Models.Schema.Step | Models.Section.Section;
    constructor(stepOrSection: Models.Schema.Step | Models.Section.Section, position: AddStepPosition);
}
export declare class RemoveStep extends Event {
    static readonly eventName = "removestep";
    step: Models.Schema.Step;
    constructor(step: Models.Schema.Step);
}
export declare class AddBreakpointEvent extends Event {
    static readonly eventName = "addbreakpoint";
    index: number;
    constructor(index: number);
}
export declare class RemoveBreakpointEvent extends Event {
    static readonly eventName = "removebreakpoint";
    index: number;
    constructor(index: number);
}
interface Action {
    id: string;
    label: string;
    group: string;
    groupTitle: string;
    jslogContext?: string;
}
export interface ViewInput {
    step?: Models.Schema.Step;
    section?: Models.Section.Section;
    state: State;
    error?: Error;
    showDetails: boolean;
    isEndOfGroup: boolean;
    isStartOfGroup: boolean;
    stepIndex: number;
    sectionIndex: number;
    isFirstSection: boolean;
    isLastSection: boolean;
    isRecording: boolean;
    isPlaying: boolean;
    isVisible: boolean;
    hasBreakpoint: boolean;
    removable: boolean;
    builtInConverters: Converters.Converter.Converter[];
    extensionConverters: Converters.Converter.Converter[];
    isSelected: boolean;
    recorderSettings?: Models.RecorderSettings.RecorderSettings;
    actions: Action[];
    stepEdited: (event: StepEditedEvent) => void;
    onBreakpointClick: () => void;
    handleStepAction: (event: Menus.Menu.MenuItemSelectedEvent) => void;
    toggleShowDetails: () => void;
    onToggleShowDetailsKeydown: (event: Event) => void;
    populateStepContextMenu: (contextMenu: UI.ContextMenu.ContextMenu) => void;
    onStepClick: (step: Models.Schema.Step | Models.Section.Section) => void;
    onStepHover: (step: Models.Schema.Step | Models.Section.Section) => void;
}
export type ViewOutput = unknown;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement | ShadowRoot) => void;
export declare class StepView extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set step(step: Models.Schema.Step | undefined);
    set section(section: Models.Section.Section | undefined);
    set state(state: State);
    set error(error: Error | undefined);
    set isEndOfGroup(isEndOfGroup: boolean);
    set isStartOfGroup(isStartOfGroup: boolean);
    set stepIndex(stepIndex: number);
    set sectionIndex(sectionIndex: number);
    set isFirstSection(isFirstSection: boolean);
    set isLastSection(isLastSection: boolean);
    set isRecording(isRecording: boolean);
    set isPlaying(isPlaying: boolean);
    set hasBreakpoint(hasBreakpoint: boolean);
    set removable(removable: boolean);
    set builtInConverters(builtInConverters: Converters.Converter.Converter[]);
    set extensionConverters(extensionConverters: Converters.Converter.Converter[]);
    set isSelected(isSelected: boolean);
    set recorderSettings(recorderSettings: Models.RecorderSettings.RecorderSettings | undefined);
    set onStepClick(onStepClick: (step: Models.Schema.Step | Models.Section.Section) => void);
    set onStepHover(onStepHover: (step: Models.Schema.Step | Models.Section.Section) => void);
    get step(): Models.Schema.Step | undefined;
    get section(): Models.Section.Section | undefined;
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
export {};
