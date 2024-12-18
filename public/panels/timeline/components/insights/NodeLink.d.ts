import * as Common from '../../../../core/common/common.js';
import type * as Protocol from '../../../../generated/protocol.js';
export interface NodeLinkData {
    backendNodeId: Protocol.DOM.BackendNodeId;
    options?: Common.Linkifier.Options;
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
