import * as SDK from '../../core/sdk/sdk.js';
import type * as Foundation from '../../foundation/foundation.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class ScreencastApp implements UI.App.App, SDK.TargetManager.SDKModelObserver<SDK.ScreenCaptureModel.ScreenCaptureModel> {
    #private;
    private readonly enabledSetting;
    toggleButton: UI.Toolbar.ToolbarToggle;
    private rootSplitWidget?;
    private screenCaptureModel?;
    private screencastView?;
    rootView?: UI.RootView.RootView;
    constructor(universe: Foundation.Universe.Universe);
    static instance(universe?: Foundation.Universe.Universe): ScreencastApp;
    presentUI(document: Document): void;
    modelAdded(screenCaptureModel: SDK.ScreenCaptureModel.ScreenCaptureModel): void;
    modelRemoved(screenCaptureModel: SDK.ScreenCaptureModel.ScreenCaptureModel): void;
    private toggleButtonClicked;
    private onScreencastEnabledChanged;
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
