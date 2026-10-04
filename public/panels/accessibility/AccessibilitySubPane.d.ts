import type * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class AccessibilitySubPane<ContentTypeT extends HTMLElement | DocumentFragment = HTMLElement> extends UI.View.SimpleView<ContentTypeT> {
    protected axNodeInternal: SDK.AccessibilityModel.AccessibilityNode | null;
    protected nodeInternal: SDK.DOMModel.DOMNode | null;
    constructor(element: HTMLElement | undefined, options: UI.View.SimpleViewOptions<ContentTypeT>);
    get axNode(): SDK.AccessibilityModel.AccessibilityNode | null;
    set axNode(axNode: SDK.AccessibilityModel.AccessibilityNode | null);
    protected setAXNode(axNode: SDK.AccessibilityModel.AccessibilityNode | null): void;
    get node(): SDK.DOMModel.DOMNode | null;
    set node(node: SDK.DOMModel.DOMNode | null);
    protected setNode(node: SDK.DOMModel.DOMNode | null): void;
    createInfo(textContent: string, ...classNames: string[]): UI.Widget.Widget;
    createTreeOutline(): UI.TreeOutline.TreeOutline;
}
