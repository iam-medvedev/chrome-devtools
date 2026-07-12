import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare enum GlobalAiButtonState {
    PROMOTION = "promotion",
    DEFAULT = "default"
}
interface ViewInput {
    state: GlobalAiButtonState;
    onClick: () => void;
}
export declare const DEFAULT_VIEW: (input: ViewInput, output: undefined, target: HTMLElement) => void;
export type View = typeof DEFAULT_VIEW;
export declare class GlobalAiButton extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View, settings?: Common.Settings.Settings, inspectorView?: UI.InspectorView.InspectorView, viewManager?: UI.ViewManager.ViewManager);
    willHide(): void;
    performUpdate(): Promise<void> | void;
}
export declare class GlobalAiButtonToolbarProvider implements UI.Toolbar.Provider {
    #private;
    constructor(settings?: Common.Settings.Settings, inspectorView?: UI.InspectorView.InspectorView, viewManager?: UI.ViewManager.ViewManager);
    item(): UI.Toolbar.ToolbarItem | null;
}
export {};
