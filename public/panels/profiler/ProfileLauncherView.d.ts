import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import { IsolateSelector } from './IsolateSelector.js';
import type { ProfileType } from './ProfileHeader.js';
import type { ProfilesPanel } from './ProfilesPanel.js';
interface ProfileTypeEntry {
    profileType: ProfileType;
    selected: boolean;
    customContent: Element | null;
}
export interface ViewInput {
    headerText: string;
    profileTypes: ProfileTypeEntry[];
    controlButtonText: string;
    controlButtonDisabled: boolean;
    controlButtonTooltip: string;
    isProfiling: boolean;
    isolateSelector: IsolateSelector | null;
    onControlClick: () => void;
    onLoadClick: () => void;
    onProfileTypeChange: (profileType: ProfileType) => void;
}
export interface ViewOutput {
    isolateSelector: IsolateSelector;
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare const ProfileLauncherViewBase: Common.ObjectWrapper.EventMixin<EventTypes, typeof UI.Widget.VBox>;
export declare class ProfileLauncherView extends ProfileLauncherViewBase {
    #private;
    readonly panel: ProfilesPanel;
    readonly selectedProfileTypeSetting: Common.Settings.Setting<string>;
    constructor(profilesPanel: ProfilesPanel, view?: View);
    wasShown(): void;
    profileStarted(): void;
    profileFinished(): void;
    updateProfileType(profileType: ProfileType, recordButtonEnabled: boolean): void;
    addProfileType(profileType: ProfileType): void;
    restoreSelectedProfileType(): void;
    performUpdate(): void;
}
export declare const enum Events {
    PROFILE_TYPE_SELECTED = "ProfileTypeSelected"
}
export interface EventTypes {
    [Events.PROFILE_TYPE_SELECTED]: ProfileType;
}
export {};
