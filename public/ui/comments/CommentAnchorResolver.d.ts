export interface CommentAnchorSignature {
    /** Visual logging tree path, e.g. "Panel: elements > Pane: styles > TreeOutline > TreeItem: color" */
    vePath: string;
    /** Normalized text content of the target node */
    textSignature: string;
    /** Text content of the parent container VE node for sibling disambiguation */
    parentTextSignature?: string;
    /** 0-indexed position among siblings sharing the same visual logging path and text signature */
    siblingIndex?: number;
    /** Optional backend RequestId for Network panel elements (`data-network-request-id`) */
    networkRequestId?: string;
    /** Optional backend NodeId for Elements panel DOM nodes (`data-backend-node-id`) */
    backendNodeId?: number;
    /** Optional 1-indexed line number for CodeMirror text editors */
    editorLineNumber?: number;
    /** Optional file path of the document displayed in the CodeMirror editor */
    editorFilePath?: string;
}
export interface CommentThread {
    id: string;
    anchor: CommentAnchorSignature;
    comments: Array<{
        author: 'DEVELOPER' | 'AGENT';
        text: string;
        timestamp: number;
    }>;
    status: 'ACTIVE' | 'RESOLVED';
    changes?: Array<Record<string, unknown>>;
}
export declare function closestAcrossShadow(element: Element, selector: string): Element | null;
export declare function isNonEmptyItem(element: Element): boolean;
export declare function isTabTitle(element: Element): boolean;
export declare function resolveCommentAnchorElement(element: Element): Element | null;
export declare function isElementVisible(element: Element): boolean;
