import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as UI from '../../ui/legacy/legacy.js';
import { SecurityAndPrivacyPanelSidebar } from './SecurityAndPrivacyPanelSidebar.js';
import { type PageVisibleSecurityState, SecurityModel } from './SecurityModel.js';
export declare function getSecurityStateIconForDetailedView(securityState: Protocol.Security.SecurityState, className: string): IconButton.Icon.Icon;
export declare function getSecurityStateIconForOverview(securityState: Protocol.Security.SecurityState, className: string): IconButton.Icon.Icon;
export declare function createHighlightedUrl(url: Platform.DevToolsPath.UrlString, securityState: string): Element;
export declare class SecurityPanel extends UI.Panel.PanelWithSidebar implements SDK.TargetManager.SDKModelObserver<SecurityModel> {
    readonly mainView: SecurityMainView;
    readonly sidebar: SecurityAndPrivacyPanelSidebar;
    private readonly lastResponseReceivedForLoaderId;
    private readonly origins;
    private readonly filterRequestCounts;
    private visibleView;
    private eventListeners;
    private securityModel;
    constructor();
    static instance(opts?: {
        forceNew: boolean | null;
    }): SecurityPanel;
    static createCertificateViewerButtonForOrigin(text: string, origin: string): Element;
    static createCertificateViewerButtonForCert(text: string, names: string[]): Element;
    private updateVisibleSecurityState;
    private onVisibleSecurityStateChanged;
    selectAndSwitchToMainView(): void;
    showOrigin(origin: Platform.DevToolsPath.UrlString): void;
    wasShown(): void;
    focus(): void;
    setVisibleView(view: UI.Widget.VBox): void;
    private onResponseReceived;
    private processRequest;
    private onRequestFinished;
    private updateFilterRequestCounts;
    filterRequestCount(filterKey: string): number;
    modelAdded(securityModel: SecurityModel): void;
    modelRemoved(securityModel: SecurityModel): void;
    private onPrimaryPageChanged;
    private onInterstitialShown;
    private onInterstitialHidden;
}
export declare enum OriginGroup {
    MainOrigin = "MainOrigin",
    NonSecure = "NonSecure",
    Secure = "Secure",
    Unknown = "Unknown"
}
export declare class SecurityMainView extends UI.Widget.VBox {
    private readonly panel;
    private readonly summarySection;
    private readonly securityExplanationsMain;
    private readonly securityExplanationsExtra;
    private readonly lockSpectrum;
    private summaryText;
    private explanations;
    private securityState;
    constructor(panel: SecurityPanel);
    getLockSpectrumDiv(securityState: Protocol.Security.SecurityState): HTMLElement;
    private addExplanation;
    updateVisibleSecurityState(visibleSecurityState: PageVisibleSecurityState): void;
    private getSecuritySummaryAndExplanations;
    private explainSafetyTipSecurity;
    private explainCertificateSecurity;
    private explainConnectionSecurity;
    private explainContentSecurity;
    private orderExplanations;
    refreshExplanations(): void;
    private addMixedContentExplanation;
    showNetworkFilter(filterKey: string, e: Event): void;
    wasShown(): void;
}
export declare class SecurityOriginView extends UI.Widget.VBox {
    private readonly panel;
    private readonly originLockIcon;
    constructor(panel: SecurityPanel, origin: Platform.DevToolsPath.UrlString, originState: OriginState);
    private createSanDiv;
    setSecurityState(newSecurityState: Protocol.Security.SecurityState): void;
    wasShown(): void;
}
export declare class SecurityDetailsTable {
    private readonly elementInternal;
    constructor();
    element(): HTMLTableElement;
    addRow(key: string, value: string | Node): void;
}
export interface OriginState {
    securityState: Protocol.Security.SecurityState;
    securityDetails: Protocol.Network.SecurityDetails | null;
    loadedFromCache: boolean;
    originView?: SecurityOriginView | null;
}
export type Origin = Platform.DevToolsPath.UrlString;
