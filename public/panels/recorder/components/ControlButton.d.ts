import * as UI from '../../../ui/legacy/legacy.js';
export interface ViewInput {
    label: string;
    shape: string;
    disabled: boolean;
    onClick: (event: Event) => void;
}
export declare const DEFAULT_VIEW: (input: ViewInput, _output: unknown, target: HTMLElement) => void;
export declare class ControlButton extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: typeof DEFAULT_VIEW);
    set label(label: string);
    set shape(shape: string);
    set disabled(disabled: boolean);
    set onClick(onClick: (event: Event) => void);
    performUpdate(): void;
}
