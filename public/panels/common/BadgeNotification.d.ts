import * as Badges from '../../models/badges/badges.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface BadgeNotificationAction {
    label: string;
    jslogContext?: string;
    title?: string;
    onClick: () => void;
}
export interface BadgeNotificationProperties {
    message: HTMLElement | string;
    imageUri: string;
    actions: BadgeNotificationAction[];
}
export interface ViewInput extends BadgeNotificationProperties {
    onCloseClick: () => void;
}
declare const DEFAULT_VIEW: (input: ViewInput, _output: undefined, target: HTMLElement) => void;
type View = typeof DEFAULT_VIEW;
export declare class BadgeNotification extends UI.Widget.Widget {
    #private;
    message: HTMLElement | string;
    imageUri: string;
    actions: BadgeNotificationAction[];
    constructor(element?: HTMLElement, view?: View);
    present(badge: Badges.Badge): Promise<void>;
    wasShown(): void;
    performUpdate(): void;
}
export {};
