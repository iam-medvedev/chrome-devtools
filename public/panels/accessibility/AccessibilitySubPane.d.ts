import type * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class AccessibilitySubPane<ContentTypeT extends HTMLElement | DocumentFragment = HTMLElement> extends UI.View.SimpleView<ContentTypeT> {
    axNode: SDK.AccessibilityModel.AccessibilityNode | null;
    protected nodeInternal?: SDK.DOMModel.DOMNode | null;
    constructor(options: UI.View.SimpleViewOptions<ContentTypeT>);
    setAXNode(_axNode: SDK.AccessibilityModel.AccessibilityNode | null): void;
    node(): SDK.DOMModel.DOMNode | null;
    setNode(node: SDK.DOMModel.DOMNode | null): void;
    createInfo(textContent: string, ...classNames: string[]): UI.Widget.Widget;
    createTreeOutline(): UI.TreeOutline.TreeOutline;
}
