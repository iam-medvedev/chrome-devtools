import { SecurityPanelSidebarTreeElement } from './SecurityPanelSidebarTreeElement.js';
export declare class ShowCookieReportEvent extends Event {
    static readonly eventName = "showcookiereport";
    constructor();
}
export declare class CookieReportTreeElement extends SecurityPanelSidebarTreeElement {
    constructor(title: string);
    onselect(): boolean;
}
