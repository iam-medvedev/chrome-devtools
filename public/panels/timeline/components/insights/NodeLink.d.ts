import * as Common from '../../../../core/common/common.js';
import type * as Protocol from '../../../../generated/protocol.js';
export interface NodeLinkData {
    backendNodeId: Protocol.DOM.BackendNodeId;
    frame: string;
    options?: Common.Linkifier.Options;
    /**
     * Text to display if backendNodeId cannot be resolved (ie for traces loaded from disk).
     * Displayed as monospace code. Use this or the next field.
     */
    fallbackHtmlSnippet?: string;
    /**
     * Text to display if backendNodeId cannot be resolved (ie for traces loaded from disk).
     * Displayed as plain text. Use this or the previous field.
     */
    fallbackText?: string;
}
export declare class NodeLink extends HTMLElement {
    #private;
    set data(data: NodeLinkData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-performance-node-link': NodeLink;
    }
}
