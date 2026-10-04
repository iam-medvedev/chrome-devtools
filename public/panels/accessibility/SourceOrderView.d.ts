import '../../ui/legacy/legacy.js';
import type * as SDK from '../../core/sdk/sdk.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
interface ViewInput {
    childCount: number;
    showSourceOrder: boolean | undefined;
    onShowSourceOrderChanged: (showSourceOrder: boolean) => void;
}
type View = (input: ViewInput, output: unknown, target: HTMLElement | DocumentFragment) => void;
export declare class SourceOrderPane extends AccessibilitySubPane<ShadowRoot> {
    #private;
    constructor(element?: HTMLElement, view?: View);
    protected setNode(node: SDK.DOMModel.DOMNode | null): void;
    performUpdate(): Promise<void>;
}
export {};
