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
declare const ProfileLauncherView_base: (new (...args: any[]) => {
    __events: Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends Events.PROFILE_TYPE_SELECTED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends Events.PROFILE_TYPE_SELECTED>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends Events.PROFILE_TYPE_SELECTED>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: Events.PROFILE_TYPE_SELECTED): boolean;
    dispatchEventToListeners<T extends Events.PROFILE_TYPE_SELECTED>(eventType: import("../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
    dispatchDOMEvent?(event: Event): void;
}) & typeof UI.Widget.VBox;
export declare class ProfileLauncherView extends ProfileLauncherView_base {
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
