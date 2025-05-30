import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type DataDisplayDelegate, ProfileHeader, type ProfileType } from './ProfileHeader.js';
import { ProfileLauncherView } from './ProfileLauncherView.js';
import { ProfileSidebarTreeElement } from './ProfileSidebarTreeElement.js';
export declare class ProfilesPanel extends UI.Panel.PanelWithSidebar implements DataDisplayDelegate {
    #private;
    readonly profileTypes: ProfileType[];
    profilesItemTreeElement: ProfilesSidebarTreeElement;
    sidebarTree: UI.TreeOutline.TreeOutlineInShadow;
    profileViews: HTMLDivElement;
    readonly toolbarElement: HTMLDivElement;
    toggleRecordAction: UI.ActionRegistration.Action;
    readonly toggleRecordButton: UI.Toolbar.ToolbarButton;
    readonly profileViewToolbar: UI.Toolbar.Toolbar;
    profileGroups: Record<string, ProfileGroup>;
    launcherView: ProfileLauncherView;
    visibleView: UI.Widget.Widget | undefined;
    readonly profileToView: Array<{
        profile: ProfileHeader;
        view: UI.Widget.Widget;
    }>;
    typeIdToSidebarSection: Record<string, ProfileTypeSidebarSection>;
    fileSelectorElement: HTMLInputElement;
    selectedProfileType?: ProfileType;
    constructor(name: string, profileTypes: ProfileType[], recordingActionId: string);
    onKeyDown(event: KeyboardEvent): void;
    searchableView(): UI.SearchableView.SearchableView | null;
    createFileSelectorElement(): void;
    findProfileTypeByExtension(fileName: string): ProfileType | null;
    loadFromFile(file: File): Promise<void>;
    toggleRecord(): boolean;
    onSuspendStateChanged(): void;
    updateToggleRecordAction(toggled: boolean): void;
    profileBeingRecordedRemoved(): void;
    onProfileTypeSelected(event: Common.EventTarget.EventTargetEvent<ProfileType>): void;
    updateProfileTypeSpecificUI(): void;
    reset(): void;
    showLauncherView(): void;
    registerProfileType(profileType: ProfileType): void;
    showLoadFromFileDialog(): void;
    addProfileHeader(profile: ProfileHeader): void;
    removeProfileHeader(profile: ProfileHeader): void;
    showProfile(profile: ProfileHeader | null): UI.Widget.Widget | null;
    showObject(_snapshotObjectId: string, _perspectiveName: string): void;
    linkifyObject(_nodeIndex: number): Promise<Element | null>;
    viewForProfile(profile: ProfileHeader): UI.Widget.Widget;
    indexOfViewForProfile(profile: ProfileHeader): number;
    closeVisibleView(): void;
    focus(): void;
    wasShown(): void;
    willHide(): void;
}
export declare class ProfileTypeSidebarSection extends UI.TreeOutline.TreeElement {
    dataDisplayDelegate: DataDisplayDelegate;
    readonly profileTreeElements: ProfileSidebarTreeElement[];
    profileGroups: Record<string, ProfileGroup>;
    constructor(dataDisplayDelegate: DataDisplayDelegate, profileType: ProfileType);
    addProfileHeader(profile: ProfileHeader): void;
    removeProfileHeader(profile: ProfileHeader): boolean;
    sidebarElementForProfile(profile: ProfileHeader): ProfileSidebarTreeElement | null;
    sidebarElementIndex(profile: ProfileHeader): number;
    onattach(): void;
}
export declare class ProfileGroup {
    profileSidebarTreeElements: ProfileSidebarTreeElement[];
    sidebarTreeElement: ProfileGroupSidebarTreeElement | null;
    constructor();
}
export declare class ProfileGroupSidebarTreeElement extends UI.TreeOutline.TreeElement {
    readonly dataDisplayDelegate: DataDisplayDelegate;
    profileTitle: string;
    toggleOnClick: boolean;
    constructor(dataDisplayDelegate: DataDisplayDelegate, title: string);
    onselect(): boolean;
    onattach(): void;
}
export declare class ProfilesSidebarTreeElement extends UI.TreeOutline.TreeElement {
    readonly panel: ProfilesPanel;
    constructor(panel: ProfilesPanel);
    onselect(): boolean;
    onattach(): void;
}
export declare class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
    handleAction(context: UI.Context.Context, actionId: string): boolean;
}
