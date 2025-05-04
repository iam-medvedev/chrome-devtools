import * as UI from '../../ui/legacy/legacy.js';
import { type OverviewController } from './CSSOverviewController.js';
interface ViewInput {
    onCancel: () => void;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class CSSOverviewProcessingView extends UI.Widget.Widget {
    #private;
    fragment?: UI.Fragment.Fragment;
    constructor(controller: OverviewController, view?: View);
}
export {};
