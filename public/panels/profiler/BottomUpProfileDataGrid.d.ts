import type * as CPUProfile from '../../models/cpu_profile/cpu_profile.js';
import type * as UI from '../../ui/legacy/legacy.js';
import { type Formatter, ProfileDataGridTree, ProfileEntry } from './ProfileDataGrid.js';
import type { TopDownProfileDataGridTree } from './TopDownProfileDataGrid.js';
export interface NodeInfo {
    ancestor: CPUProfile.ProfileTreeModel.ProfileNode;
    focusNode: CPUProfile.ProfileTreeModel.ProfileNode;
    totalAccountedFor: boolean;
}
export declare class BottomUpProfileEntry extends ProfileEntry {
    remainingNodeInfos: NodeInfo[] | undefined;
    constructor(profileNode: CPUProfile.ProfileTreeModel.ProfileNode, owningTree: TopDownProfileDataGridTree);
    static sharedPopulate(container: BottomUpProfileEntry | BottomUpProfileDataGridTree): void;
    takePropertiesFromProfileEntry(profileEntry: ProfileEntry): void;
    /**
     * When focusing, we keep just the members of the callstack.
     */
    keepOnlyChild(child: ProfileEntry): void;
    exclude(aCallUID: string): void;
    restore(): void;
    merge(child: ProfileEntry, shouldAbsorb: boolean): void;
    populateChildren(): void;
    willHaveChildren(profileNode: CPUProfile.ProfileTreeModel.ProfileNode): boolean;
}
export declare class BottomUpProfileDataGridTree extends ProfileDataGridTree {
    deepSearch: boolean;
    remainingNodeInfos: NodeInfo[] | undefined;
    constructor(formatter: Formatter, searchableView: UI.SearchableView.SearchableView, rootProfileNode: CPUProfile.ProfileTreeModel.ProfileNode, total: number);
    /**
     * When focusing, we keep the entire callstack up to this ancestor.
     */
    focus(profileDataGridNode: ProfileEntry): void;
    exclude(profileDataGridNode: ProfileEntry): void;
    populateChildren(): void;
}
