import * as SDK from '../../core/sdk/sdk.js';
import { AccessibilitySubPane } from './AccessibilitySubPane.js';
interface ViewInput {
    propertyCompletions: Map<SDK.DOMModel.Attribute, string[]>;
    onStartEditing: (attribute: SDK.DOMModel.Attribute) => void;
    onCommitEditing: (attribute: SDK.DOMModel.Attribute, result: string) => void;
    onCancelEditing: (attribute: SDK.DOMModel.Attribute) => void;
    attributeBeingEdited: SDK.DOMModel.Attribute | null;
    attributes: SDK.DOMModel.Attribute[];
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class ARIAAttributesPane extends AccessibilitySubPane {
    #private;
    constructor(view?: View);
    setNode(node: SDK.DOMModel.DOMNode | null): void;
    performUpdate(): void;
    private isARIAAttribute;
}
export {};
