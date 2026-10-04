import '../../ui/components/switch/switch.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    isToggled: boolean;
    onToggleChange: (event: Event) => void;
    node: SDK.DOMModel.DOMNode | null;
    axNode: SDK.AccessibilityModel.AccessibilityNode | null;
    showAriaSubPane: boolean;
    showAnnouncementsRecordingSubPane: boolean;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AccessibilitySidebarView extends UI.Widget.VBox {
    #private;
    private skipNextPullNode;
    private readonly toggleAction;
    constructor(view?: View);
    static instance(opts?: {
        forceNew: boolean;
        view?: View;
    }): AccessibilitySidebarView;
    node(): SDK.DOMModel.DOMNode | null;
    axNode(): SDK.AccessibilityModel.AccessibilityNode | null;
    setNode(node: SDK.DOMModel.DOMNode | null, fromAXTree?: boolean): void;
    accessibilityNodeCallback(axNode: SDK.AccessibilityModel.AccessibilityNode | null): void;
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
    private pullNode;
    private onToggleChange;
    private onNodeChange;
}
