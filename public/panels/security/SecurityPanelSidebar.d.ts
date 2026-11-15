import type * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    mainOrigin: string | null;
    origins: ReadonlyMap<Platform.DevToolsPath.UrlString, Protocol.Security.SecurityState>;
    originsHidden: boolean;
    showOriginsUnconditionally: boolean;
    overviewSecurityState: Protocol.Security.SecurityState;
    selectedElementId: string;
    onElementSelected: (id: string) => void;
    onShowOrigin: (origin: Platform.DevToolsPath.UrlString | null) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class SecurityPanelSidebar extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set onShowOrigin(callback: ((origin: Platform.DevToolsPath.UrlString | null) => void) | undefined);
    get onShowOrigin(): ((origin: Platform.DevToolsPath.UrlString | null) => void) | undefined;
    wasShown(): void;
    set mainOrigin(origin: string | null);
    get mainOrigin(): string | null;
    set origins(origins: ReadonlyMap<Platform.DevToolsPath.UrlString, Protocol.Security.SecurityState>);
    get origins(): ReadonlyMap<Platform.DevToolsPath.UrlString, Protocol.Security.SecurityState>;
    set originsHidden(originsHidden: boolean);
    get originsHidden(): boolean;
    set showOriginsUnconditionally(showOriginsUnconditionally: boolean);
    get showOriginsUnconditionally(): boolean;
    set overviewSecurityState(overviewSecurityState: Protocol.Security.SecurityState);
    get overviewSecurityState(): Protocol.Security.SecurityState;
    set activeOrigin(origin: Platform.DevToolsPath.UrlString | null);
    get activeOrigin(): Platform.DevToolsPath.UrlString | null;
    performUpdate(): void;
}
