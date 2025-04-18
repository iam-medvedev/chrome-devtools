import '../../../ui/components/icon_button/icon_button.js';
import '../../../ui/components/tree_outline/tree_outline.js';
import * as Protocol from '../../../generated/protocol.js';
import type * as TreeOutline from '../../../ui/components/tree_outline/tree_outline.js';
export interface BadgeData {
    badgeContent: string;
    style: 'error' | 'success' | 'secondary';
}
export declare class Badge extends HTMLElement {
    #private;
    set data(data: BadgeData);
}
type TreeNode<DataType> = TreeOutline.TreeOutlineUtils.TreeNode<DataType>;
export type OriginTrialTreeNodeData = Protocol.Page.OriginTrial | Protocol.Page.OriginTrialTokenWithStatus | string;
export interface OriginTrialTokenRowsData {
    node: TreeNode<OriginTrialTreeNodeData>;
}
export declare class OriginTrialTokenRows extends HTMLElement {
    #private;
    set data(data: OriginTrialTokenRowsData);
    connectedCallback(): void;
}
export interface OriginTrialTreeViewData {
    trials: Protocol.Page.OriginTrial[];
}
export declare class OriginTrialTreeView extends HTMLElement {
    #private;
    set data(data: OriginTrialTreeViewData);
}
declare global {
    interface HTMLElementTagNameMap {
        'devtools-resources-origin-trial-tree-view': OriginTrialTreeView;
        'devtools-resources-origin-trial-token-rows': OriginTrialTokenRows;
        'devtools-resources-origin-trial-tree-view-badge': Badge;
    }
}
export {};
