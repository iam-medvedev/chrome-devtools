import '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as NetworkForward from '../network/forward/forward.js';
export interface ViewInput {
    rules: NetworkForward.BackendLinking.BackendLinkingRule[];
    onAddRule: (rule: NetworkForward.BackendLinking.BackendLinkingRule) => void;
    onUpdateRule: (oldRule: NetworkForward.BackendLinking.BackendLinkingRule, newRule: NetworkForward.BackendLinking.BackendLinkingRule) => void;
    onDeleteRule: (rule: NetworkForward.BackendLinking.BackendLinkingRule) => void;
}
export type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class BackendLinkingSettingsTab extends UI.Widget.VBox {
    #private;
    constructor(target?: HTMLElement, view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
