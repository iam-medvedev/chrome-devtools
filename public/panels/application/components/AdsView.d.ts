import type * as Protocol from '../../../generated/protocol.js';
import * as UI from '../../../ui/legacy/legacy.js';
export interface ViewInput {
    metrics: Protocol.Ads.AdMetrics;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement | DocumentFragment) => void;
export declare class AdsView extends UI.Widget.Widget {
    #private;
    constructor(view?: View);
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
}
