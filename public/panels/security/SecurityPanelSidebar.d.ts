import * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
import { OriginTreeElement } from './OriginTreeElement.js';
import { OriginGroup } from './SecurityPanel.js';
export declare class SecurityPanelSidebar extends UI.Widget.VBox {
    #private;
    readonly sidebarTree: UI.TreeOutline.TreeOutlineInShadow;
    securityOverviewElement: OriginTreeElement;
    constructor(element?: HTMLElement);
    toggleOriginsList(hidden: boolean): void;
    addOrigin(origin: Platform.DevToolsPath.UrlString, securityState: Protocol.Security.SecurityState): void;
    setMainOrigin(origin: string): void;
    get mainOrigin(): string | null;
    get originGroups(): Map<OriginGroup, UI.TreeOutline.TreeElement>;
    updateOrigin(origin: string, securityState: Protocol.Security.SecurityState): void;
    clearOrigins(): void;
    wasShown(): void;
}
