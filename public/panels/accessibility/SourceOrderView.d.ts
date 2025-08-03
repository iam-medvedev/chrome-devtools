import '../../ui/legacy/legacy.js';
import type * as SDK from '../../core/sdk/sdk.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
interface ViewInput {
    childCount: number;
    showSourceOrder: boolean | undefined;
    onShowSourceOrderChanged: (showSourceOrder: boolean) => void;
}
type View = (input: ViewInput, output: unknown, target: HTMLElement) => void;
export declare class SourceOrderPane extends AccessibilitySubPane {
    #private;
    constructor(view?: View);
    setNodeAsync(node: SDK.DOMModel.DOMNode | null): Promise<void>;
    performUpdate(): Promise<void>;
}
export {};
