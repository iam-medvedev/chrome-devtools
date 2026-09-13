import * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
import { OriginTreeElement } from './OriginTreeElement.js';
import { OriginGroup } from './SecurityPanel.js';
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
    readonly sidebarTree: UI.TreeOutline.TreeOutlineInShadow;
    securityOverviewElement: OriginTreeElement;
    constructor(element?: HTMLElement);
    elementsByOrigin(): Map<string, OriginTreeElement>;
    set selectedOrigin(origin: Platform.DevToolsPath.UrlString | string | null);
    get selectedOrigin(): string;
    showLastSelectedElement(): void;
    toggleOriginsList(hidden: boolean): void;
    addOrigin(origin: Platform.DevToolsPath.UrlString, securityState: Protocol.Security.SecurityState): void;
    setMainOrigin(origin: string): void;
    get mainOrigin(): string | null;
    get originGroups(): Map<OriginGroup, UI.TreeOutline.TreeElement>;
    updateOrigin(origin: string, securityState: Protocol.Security.SecurityState): void;
    clearOrigins(): void;
    focus(): void;
}
