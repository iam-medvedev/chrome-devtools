import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { type Icon } from '../../ui/kit/kit.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type TemplateResult } from '../../ui/lit/lit.js';
import { type PageVisibleSecurityState, SecurityModel } from './SecurityModel.js';
import { SecurityPanelSidebar } from './SecurityPanelSidebar.js';
export declare function getSecurityStateIconForDetailedView(securityState: Protocol.Security.SecurityState, className: string): Icon;
export declare function getSecurityStateIconForOverview(securityState: Protocol.Security.SecurityState, className: string): Icon;
export declare function renderHighlightedUrl(url: Platform.DevToolsPath.UrlString, securityState: string): TemplateResult;
export declare function renderCertificateViewerButton(text: string, jslogContext: string, onClick: () => void): TemplateResult;
export interface ViewInput {
    panel: SecurityPanel;
}
export interface ViewOutput {
    setVisibleView: (view: UI.Widget.VBox) => void;
    splitWidget: UI.SplitWidget.SplitWidget;
    mainView: SecurityMainView;
    visibleView: UI.Widget.VBox | null;
    sidebar: SecurityPanelSidebar;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class SecurityPanel extends UI.Panel.Panel implements SDK.TargetManager.SDKModelObserver<SecurityModel> {
    readonly mainView: SecurityMainView;
    readonly sidebar: SecurityPanelSidebar;
    private readonly lastResponseReceivedForLoaderId;
    private readonly origins;
    private readonly filterRequestCounts;
    visibleView: UI.Widget.VBox | null;
    private eventListeners;
    private securityModel;
    readonly splitWidget: UI.SplitWidget.SplitWidget;
    private view;
    constructor(view?: View | undefined);
    static instance(opts?: {
        forceNew: boolean | null;
    }): SecurityPanel;
    static createCertificateViewerButtonForCert(text: string, names: string[]): Element;
    update(): void;
    private updateVisibleSecurityState;
    private onVisibleSecurityStateChanged;
    showOrigin(origin: Platform.DevToolsPath.UrlString): void;
    wasShown(): void;
    focus(): void;
    setVisibleView(view: UI.Widget.VBox): void;
    private onResponseReceived;
    private processRequest;
    private onRequestFinished;
    private updateFilterRequestCounts;
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
    #private;
    constructor(element?: HTMLElement);
    setFilterRequestCounts(filterRequestCounts: ReadonlyMap<string, number>): void;
    updateVisibleSecurityState(visibleSecurityState: PageVisibleSecurityState): void;
    refreshExplanations(): void;
}
export interface SecurityOriginViewInput {
    origin: Platform.DevToolsPath.UrlString;
    securityState: Protocol.Security.SecurityState;
    securityDetails: Protocol.Network.SecurityDetails | null;
    loadedFromCache: boolean;
    isSanListTruncated: boolean;
    isCertificateTransparencyDetailsShown: boolean;
    onRevealInNetwork: () => void;
    onToggleSanTruncation: () => void;
    onToggleCertificateTransparencyDetails: () => void;
    onViewCertificate: () => void;
}
export type SecurityOriginViewFunction = (input: SecurityOriginViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_SECURITY_ORIGIN_VIEW: SecurityOriginViewFunction;
export declare class SecurityOriginView extends UI.Widget.VBox {
    #private;
    constructor(origin: Platform.DevToolsPath.UrlString, originState: OriginState, view?: SecurityOriginViewFunction);
    setSecurityState(newSecurityState: Protocol.Security.SecurityState, securityDetails: Protocol.Network.SecurityDetails | null): void;
}
export interface OriginState {
    securityState: Protocol.Security.SecurityState;
    securityDetails: Protocol.Network.SecurityDetails | null;
    loadedFromCache: boolean;
    originView?: SecurityOriginView | null;
}
export type Origin = Platform.DevToolsPath.UrlString;
