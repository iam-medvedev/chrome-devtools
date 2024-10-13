import type * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import type { SecurityPanel } from './SecurityPanel.js';
import { SecurityPanelSidebarTreeElement } from './SecurityPanelSidebarTreeElement.js';
export declare class OriginTreeElement extends SecurityPanelSidebarTreeElement {
    #private;
    constructor(className: string, onSelect: () => void, renderTreeElement: (element: SecurityPanelSidebarTreeElement) => void, origin?: Platform.DevToolsPath.UrlString | null, securityPanel?: SecurityPanel | undefined);
    setSecurityState(newSecurityState: Protocol.Security.SecurityState): void;
    securityState(): Protocol.Security.SecurityState | null;
    origin(): Platform.DevToolsPath.UrlString | null;
    onselect(): boolean;
}
