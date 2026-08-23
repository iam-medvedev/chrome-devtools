import '../../ui/legacy/components/data_grid/data_grid.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface HeapDetachedElements {
    detachedElements: Protocol.DOM.DetachedElementInfo[];
    domModel: SDK.DOMModel.DOMModel;
}
export interface ParsedElement {
    elementInfo: Protocol.DOM.DetachedElementInfo;
    node: SDK.DOMModel.DOMNode;
    nodeCount: number;
}
export interface ViewInput {
    parsedElements: ParsedElement[];
}
export type ViewOutput = undefined;
declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement | ShadowRoot) => void;
type View = typeof DEFAULT_VIEW;
export declare class HeapDetachedElementsDataGrid extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    performUpdate(): void;
    set data(data: HeapDetachedElements);
}
export {};
