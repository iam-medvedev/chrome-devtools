import '../../ui/kit/kit.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type TemplateResult } from '../../ui/lit/lit.js';
import { type PageVisibleSecurityState, SecurityModel } from './SecurityModel.js';
export declare function getSecurityStateIconForDetailedView(securityState: Protocol.Security.SecurityState, className: string): TemplateResult;
export declare function getSecurityStateIconForOverview(securityState: Protocol.Security.SecurityState, className: string, title?: string): TemplateResult;
export declare function renderHighlightedUrl(url: Platform.DevToolsPath.UrlString, securityState: string): TemplateResult;
export declare function renderCertificateViewerButton(text: string, jslogContext: string, onClick: () => void): TemplateResult;
export interface ViewInput {
    mainOrigin: string | null;
    sidebarOrigins: ReadonlyMap<Platform.DevToolsPath.UrlString, Protocol.Security.SecurityState>;
    originsHidden: boolean;
    showOriginsUnconditionally: boolean;
    overviewSecurityState: Protocol.Security.SecurityState;
    activeOrigin: Platform.DevToolsPath.UrlString | null;
    activeOriginState: OriginState | null;
    visibleSecurityState: PageVisibleSecurityState | null;
    filterRequestCounts: ReadonlyMap<string, number>;
    onShowOrigin: (origin: Platform.DevToolsPath.UrlString | null) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class SecurityPanel extends UI.Panel.Panel implements SDK.TargetManager.SDKModelObserver<SecurityModel> {
    #private;
    constructor(view?: View);
    static instance(opts?: {
        forceNew: boolean | null;
    }): SecurityPanel;
    wasShown(): void;
    performUpdate(): void;
    showOrigin(origin: Platform.DevToolsPath.UrlString | null): void;
    modelAdded(securityModel: SecurityModel): void;
    modelRemoved(securityModel: SecurityModel): void;
}
export declare enum OriginGroup {
    MainOrigin = "MainOrigin",
    NonSecure = "NonSecure",
    Secure = "Secure",
    Unknown = "Unknown"
}
export interface SecurityMainViewExplanation {
    securityState: Protocol.Security.SecurityState;
    title?: string;
    summary: string;
    description: string;
    certificate: string[];
    recommendations?: string[];
    mixedContent?: {
        filterKey: string;
        count: number;
    };
}
export interface SecurityMainViewInput {
    securityState: Protocol.Security.SecurityState | null;
    summaryText: string;
    mainExplanations: SecurityMainViewExplanation[];
    extraExplanations: SecurityMainViewExplanation[];
    onShowCertificateViewer: (certificate: string[]) => void;
    onShowNetworkFilter: (filterKey: string) => void;
}
export type SecurityMainViewFunction = (input: SecurityMainViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_SECURITY_MAIN_VIEW: SecurityMainViewFunction;
export declare class SecurityMainView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: SecurityMainViewFunction);
    wasShown(): void;
    performUpdate(): void;
    set filterRequestCounts(filterRequestCounts: ReadonlyMap<string, number>);
    get filterRequestCounts(): ReadonlyMap<string, number>;
    set visibleSecurityState(visibleSecurityState: PageVisibleSecurityState | null);
    get visibleSecurityState(): PageVisibleSecurityState | null;
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
    constructor(element?: HTMLElement, view?: SecurityOriginViewFunction);
    wasShown(): void;
    set origin(origin: Platform.DevToolsPath.UrlString);
    get origin(): Platform.DevToolsPath.UrlString;
    set securityState(securityState: Protocol.Security.SecurityState);
    get securityState(): Protocol.Security.SecurityState;
    set securityDetails(securityDetails: Protocol.Network.SecurityDetails | null);
    get securityDetails(): Protocol.Network.SecurityDetails | null;
    set loadedFromCache(loadedFromCache: boolean);
    get loadedFromCache(): boolean;
    performUpdate(): void;
}
export interface OriginState {
    securityState: Protocol.Security.SecurityState;
    securityDetails: Protocol.Network.SecurityDetails | null;
    loadedFromCache: boolean;
}
export type Origin = Platform.DevToolsPath.UrlString;
