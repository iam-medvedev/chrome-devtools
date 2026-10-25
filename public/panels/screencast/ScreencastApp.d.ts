import * as SDK from '../../core/sdk/sdk.js';
import type * as Foundation from '../../foundation/foundation.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    screencastEnabled: boolean;
    screenCaptureModel?: SDK.ScreenCaptureModel.ScreenCaptureModel;
}
export type ViewOutput = unknown;
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ScreencastApp implements UI.App.App, SDK.TargetManager.SDKModelObserver<SDK.ScreenCaptureModel.ScreenCaptureModel> {
    #private;
    constructor(universe: Foundation.Universe.Universe, view?: View);
    static instance(universe?: Foundation.Universe.Universe): ScreencastApp;
    get toggleButton(): UI.Toolbar.ToolbarToggle;
    get rootView(): UI.RootView.RootView | undefined;
    presentUI(document: Document): void;
    modelAdded(screenCaptureModel: SDK.ScreenCaptureModel.ScreenCaptureModel): void;
    modelRemoved(screenCaptureModel: SDK.ScreenCaptureModel.ScreenCaptureModel): void;
    performUpdate(): void;
}
export declare class ToolbarButtonProvider implements UI.Toolbar.Provider {
    static instance(opts?: {
        forceNew: boolean;
    }): ToolbarButtonProvider;
    item(): UI.Toolbar.ToolbarItem | null;
}
export declare class ScreencastAppProvider implements UI.AppProvider.AppProvider {
    static instance(opts?: {
        forceNew: boolean;
    }): ScreencastAppProvider;
    createApp(universe: Foundation.Universe.Universe): UI.App.App;
}
