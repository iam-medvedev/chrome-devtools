import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
export declare class ComputedStyleModel extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    private nodeInternal;
    private cssModelInternal;
    private eventListeners;
    private frameResizedTimer?;
    private computedStylePromise?;
    constructor();
    node(): SDK.DOMModel.DOMNode | null;
    cssModel(): SDK.CSSModel.CSSModel | null;
    private onNodeChanged;
    private updateModel;
    private onComputedStyleChanged;
    private onDOMModelChanged;
    private onFrameResized;
    private elementNode;
    fetchComputedStyle(): Promise<ComputedStyle | null>;
}
export declare const enum Events {
    COMPUTED_STYLE_CHANGED = "ComputedStyleChanged"
}
export type ComputedStyleChangedEvent = SDK.CSSStyleSheetHeader.CSSStyleSheetHeader | SDK.CSSModel.StyleSheetChangedEvent | void | SDK.CSSModel.PseudoStateForcedEvent | null;
export type EventTypes = {
    [Events.COMPUTED_STYLE_CHANGED]: ComputedStyleChangedEvent;
};
export declare class ComputedStyle {
    node: SDK.DOMModel.DOMNode;
    computedStyle: Map<string, string>;
    constructor(node: SDK.DOMModel.DOMNode, computedStyle: Map<string, string>);
}
