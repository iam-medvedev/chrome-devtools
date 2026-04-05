import '../../ui/components/switch/switch.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class AccessibilitySidebarView extends UI.Widget.VBox {
    #private;
    private skipNextPullNode;
    private readonly sidebarPaneStack;
    private readonly ariaSubPane;
    private readonly axNodeSubPane;
    private readonly sourceOrderSubPane;
    private readonly toggleContainer;
    private readonly toggleAction;
    private constructor();
    static instance(opts?: {
        forceNew: boolean;
    }): AccessibilitySidebarView;
    node(): SDK.DOMModel.DOMNode | null;
    axNode(): SDK.AccessibilityModel.AccessibilityNode | null;
    setNode(node: SDK.DOMModel.DOMNode | null, fromAXTree?: boolean): void;
    accessibilityNodeCallback(axNode: SDK.AccessibilityModel.AccessibilityNode | null): void;
    performUpdate(): Promise<void>;
    wasShown(): void;
    willHide(): void;
    private pullNode;
    private updateToggle;
    private onToggleChange;
    private onNodeChange;
}
