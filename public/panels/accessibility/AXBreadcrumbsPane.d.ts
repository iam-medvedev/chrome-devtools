import * as SDK from '../../core/sdk/sdk.js';
import type { AccessibilitySidebarView } from './AccessibilitySidebarView.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
export declare class AXBreadcrumbsPane extends AccessibilitySubPane {
    #private;
    private readonly axSidebarView;
    private preselectedBreadcrumb;
    private inspectedNodeBreadcrumb;
    private collapsingBreadcrumbId;
    private hoveredBreadcrumb;
    private readonly rootElement;
    constructor(axSidebarView: AccessibilitySidebarView);
    focus(): void;
    setAXNode(axNode: SDK.AccessibilityModel.AccessibilityNode | null): void;
    willHide(): void;
    private onKeyDown;
    private preselectPrevious;
    private preselectNext;
    private preselectParent;
    private setPreselectedBreadcrumb;
    private collapseBreadcrumb;
    private onMouseLeave;
    private onMouseMove;
    private onFocusOut;
    private onClick;
    private setHoveredBreadcrumb;
    private inspectDOMNode;
    private contextMenuEventFired;
}
export declare class AXBreadcrumb {
    private readonly axNodeInternal;
    private readonly elementInternal;
    private nodeElementInternal;
    private readonly nodeWrapper;
    private readonly selectionElement;
    private readonly childrenGroupElement;
    private readonly children;
    private hovered;
    private preselectedInternal;
    private parent;
    private inspectedInternal;
    expandLoggable: {};
    constructor(axNode: SDK.AccessibilityModel.AccessibilityNode, depth: number, inspected: boolean);
    element(): HTMLElement;
    nodeElement(): HTMLElement;
    appendChild(breadcrumb: AXBreadcrumb): void;
    hasExpandedChildren(): number;
    setParent(breadcrumb: AXBreadcrumb): void;
    preselected(): boolean;
    setPreselected(preselected: boolean, selectedByUser: boolean): void;
    setHovered(hovered: boolean): void;
    axNode(): SDK.AccessibilityModel.AccessibilityNode;
    inspected(): boolean;
    isDOMNode(): boolean;
    nextBreadcrumb(): AXBreadcrumb | null;
    previousBreadcrumb(): AXBreadcrumb | null;
    parentBreadcrumb(): AXBreadcrumb | null;
    lastChild(): AXBreadcrumb;
    private appendNameElement;
    private appendRoleElement;
    private appendIgnoredNodeElement;
}
type RoleStyles = Record<string, string>;
export declare const RoleStyles: RoleStyles;
export {};
