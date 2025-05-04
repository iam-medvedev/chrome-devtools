import type * as Platform from '../../core/platform/platform.js';
import * as UI from '../../ui/legacy/legacy.js';
interface ViewInput {
    label: Platform.UIString.LocalizedString;
    onKeyDown: (event: KeyboardEvent) => void;
    apply: () => void;
}
interface ViewOutput {
    input: HTMLInputElement;
}
type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AddDebugInfoURLDialog extends UI.Widget.HBox {
    private input;
    private readonly dialog;
    private readonly callback;
    private constructor();
    static createAddSourceMapURLDialog(callback: (arg0: Platform.DevToolsPath.UrlString) => void): AddDebugInfoURLDialog;
    static createAddDWARFSymbolsURLDialog(callback: (arg0: Platform.DevToolsPath.UrlString) => void): AddDebugInfoURLDialog;
    show(): void;
    private done;
    private apply;
    private onKeyDown;
}
export {};
