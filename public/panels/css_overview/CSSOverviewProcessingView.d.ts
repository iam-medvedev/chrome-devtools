import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    onCancel: () => void;
}
export type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class CSSOverviewProcessingView extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set onCancel(onCancel: () => void);
    performUpdate(): void;
}
