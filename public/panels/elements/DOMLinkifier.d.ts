import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
export interface Options extends Common.Linkifier.Options {
    hiddenClassList?: string[];
    disabled?: boolean;
}
export declare const decorateNodeLabel: (node: SDK.DOMModel.DOMNode, parentElement: HTMLElement, options: Options) => void;
export declare const linkifyNodeReference: (node: SDK.DOMModel.DOMNode | null, options?: Options | undefined) => Node;
export declare const linkifyDeferredNodeReference: (deferredNode: SDK.DOMModel.DeferredDOMNode, options?: Options | undefined) => Node;
export declare class Linkifier implements Common.Linkifier.Linkifier {
    static instance(opts?: {
        forceNew: boolean | null;
    }): Linkifier;
    linkify(object: Object, options?: Options): Node;
}
