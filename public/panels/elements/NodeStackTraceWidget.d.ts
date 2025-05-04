import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    stackTracePreview: HTMLElement | null;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class NodeStackTraceWidget extends UI.ThrottledWidget.ThrottledWidget {
    #private;
    constructor(view?: View);
    wasShown(): void;
    willHide(): void;
    doUpdate(): Promise<void>;
}
export declare const MaxLengthForLinks = 40;
export {};
