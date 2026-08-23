import type * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    mainOrigin: string | null;
    origins: Map<Platform.DevToolsPath.UrlString, Protocol.Security.SecurityState>;
    originsHidden: boolean;
    showOriginsUnconditionally: boolean;
    overviewSecurityState: Protocol.Security.SecurityState;
    selectedElementId: string;
}
export interface ViewOutput {
    onElementSelected: (id: string) => void;
    onShowOrigin: (origin: Platform.DevToolsPath.UrlString | null) => void;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class SecurityPanelSidebar extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set onShowOrigin(callback: (origin: Platform.DevToolsPath.UrlString | null) => void);
    wasShown(): void;
    showLastSelectedElement(): void;
    toggleOriginsList(hidden: boolean): void;
    addOrigin(origin: Platform.DevToolsPath.UrlString, securityState: Protocol.Security.SecurityState): void;
    setMainOrigin(origin: string): void;
    get mainOrigin(): string | null;
    updateOrigin(origin: Platform.DevToolsPath.UrlString, securityState: Protocol.Security.SecurityState): void;
    updateOverviewSecurityState(securityState: Protocol.Security.SecurityState): void;
    clearOrigins(): void;
    elementsByOrigin(): Map<string, {
        select: (omitFocus?: boolean, selectedByUser?: boolean) => void;
        showElement: () => void;
        origin: () => string;
        securityState: () => Protocol.Security.SecurityState | undefined;
    }>;
    set selectedOrigin(origin: Platform.DevToolsPath.UrlString | null);
    get selectedOrigin(): string;
    performUpdate(): void;
}
