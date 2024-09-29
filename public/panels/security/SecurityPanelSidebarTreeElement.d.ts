import * as UI from '../../ui/legacy/legacy.js';
import { type SecurityPanel } from './SecurityPanel.js';
export declare class SecurityPanelSidebarTreeElement extends UI.TreeOutline.TreeElement {
    protected readonly securityPanel: SecurityPanel | undefined;
    constructor(securityPanel: SecurityPanel | undefined, title?: string, expandable?: boolean);
    showView(view: UI.Widget.VBox): void;
}
