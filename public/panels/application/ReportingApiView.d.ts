import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ApplicationComponents from './components/components.js';
export declare const i18nString: (id: string, values?: import("../../core/i18n/i18nTypes.js").Values | undefined) => Platform.UIString.LocalizedString;
interface ViewInput {
    hasReports: boolean;
    hasEndpoints: boolean;
    endpointsGrid: ApplicationComponents.EndpointsGrid.EndpointsGrid;
    reportsGrid: ApplicationComponents.ReportsGrid.ReportsGrid;
    focusedReport?: Protocol.Network.ReportingApiReport;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ReportingApiView extends UI.Widget.VBox implements SDK.TargetManager.SDKModelObserver<SDK.NetworkManager.NetworkManager> {
    #private;
    constructor(endpointsGrid: ApplicationComponents.EndpointsGrid.EndpointsGrid, view?: View);
    modelAdded(networkManager: SDK.NetworkManager.NetworkManager): void;
    modelRemoved(networkManager: SDK.NetworkManager.NetworkManager): void;
    performUpdate(): void;
}
export {};
