import type * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    showImageCallback: (arg0?: string | undefined) => void;
    snapshot: SDK.PaintProfiler.PaintProfilerSnapshot | null;
    log: SDK.PaintProfiler.PaintProfilerLogItem[];
    scale: number;
    selectionWindow: {
        left: number;
        right: number;
    } | null;
    onWindowChanged: (window: {
        left: number;
        right: number;
    } | null) => void;
}
export type ViewOutput = undefined;
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: (input: ViewInput, _output: ViewOutput, target: HTMLElement) => void;
export declare class LayerPaintProfilerView extends UI.Widget.VBox {
    #private;
    constructor(showImageCallback: (arg0?: string | undefined) => void, view?: View);
    wasShown(): void;
    performUpdate(): void;
    reset(): void;
    profile(snapshot: SDK.PaintProfiler.PaintProfilerSnapshot): void;
    setScale(scale: number): void;
    private onWindowChanged;
}
