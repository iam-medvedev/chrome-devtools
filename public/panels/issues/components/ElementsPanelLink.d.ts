import * as UI from '../../../ui/legacy/legacy.js';
export interface ViewInput {
    onElementRevealIconClick: () => void;
    onElementRevealIconMouseEnter: () => void;
    onElementRevealIconMouseLeave: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export interface ElementsPanelLinkData {
    onElementRevealIconClick: () => void;
    onElementRevealIconMouseEnter: () => void;
    onElementRevealIconMouseLeave: () => void;
}
export declare class ElementsPanelLink extends UI.Widget.Widget {
    #private;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    set onElementRevealIconClick(onElementRevealIconClick: () => void);
    set onElementRevealIconMouseEnter(onElementRevealIconMouseEnter: () => void);
    set onElementRevealIconMouseLeave(onElementRevealIconMouseLeave: () => void);
    set data(data: ElementsPanelLinkData);
    performUpdate(): void;
}
