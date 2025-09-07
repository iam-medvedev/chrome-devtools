import * as UI from '../../ui/legacy/legacy.js';
import * as Lit from '../../ui/lit/lit.js';
export interface BadgeNotificationAction {
    label: string;
    jslogContext?: string;
    title?: string;
    onClick: () => void;
}
export interface BadgeNotificationProperties {
    message: Lit.LitTemplate;
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
    message: Lit.LitTemplate;
    imageUri: string;
    actions: BadgeNotificationAction[];
    constructor(element?: HTMLElement, view?: View);
    static show(properties: BadgeNotificationProperties): BadgeNotification;
    wasShown(): void;
    performUpdate(): void;
}
export {};
