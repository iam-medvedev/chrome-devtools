import * as UI from '../../../ui/legacy/legacy.js';
export interface TimelineSectionData {
    isFirstSection: boolean;
    isLastSection: boolean;
    isStartOfGroup: boolean;
    isEndOfGroup: boolean;
    isSelected: boolean;
}
export type ViewInput = TimelineSectionData;
export type ViewOutput = unknown;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void;
export declare class TimelineSection extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void);
    set isEndOfGroup(value: boolean);
    set isStartOfGroup(value: boolean);
    set isFirstSection(value: boolean);
    set isLastSection(value: boolean);
    set isSelected(value: boolean);
    performUpdate(): void;
}
