import * as Common from '../../../core/common/common.js';
import * as UI from '../../../ui/legacy/legacy.js';
export interface ViewInput {
    menuItemLabel: Common.UIString.LocalizedString;
    menuItemAction: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement | DocumentFragment) => void;
export declare const DEFAULT_VIEW: View;
export declare class HideIssuesMenu extends UI.Widget.Widget<ShadowRoot> {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set menuItemLabel(menuItemLabel: Common.UIString.LocalizedString);
    set menuItemAction(menuItemAction: () => void);
    wasShown(): void;
    performUpdate(): void;
}
