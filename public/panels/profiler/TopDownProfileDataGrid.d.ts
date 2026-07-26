import type * as CPUProfile from '../../models/cpu_profile/cpu_profile.js';
import type * as UI from '../../ui/legacy/legacy.js';
import { type Formatter, ProfileDataGridTree, ProfileEntry } from './ProfileDataGrid.js';
export declare class TopDownProfileEntry extends ProfileEntry {
    remainingChildren: CPUProfile.ProfileTreeModel.ProfileNode[];
    constructor(profileNode: CPUProfile.ProfileTreeModel.ProfileNode, owningTree: TopDownProfileDataGridTree);
    static sharedPopulate(container: TopDownProfileDataGridTree | TopDownProfileEntry): void;
    static excludeRecursively(container: TopDownProfileDataGridTree | TopDownProfileEntry, aCallUID: string): void;
    populateChildren(): void;
}
export declare class TopDownProfileDataGridTree extends ProfileDataGridTree {
    remainingChildren: CPUProfile.ProfileTreeModel.ProfileNode[];
    constructor(formatter: Formatter, searchableView: UI.SearchableView.SearchableView, rootProfileNode: CPUProfile.ProfileTreeModel.ProfileNode, total: number);
    focus(profileDataGridNode: ProfileEntry): void;
    exclude(profileDataGridNode: ProfileEntry): void;
    restore(): void;
    populateChildren(): void;
}
