import type * as Platform from '../../core/platform/platform.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
export interface ViewInput {
    trackingSites: readonly string[];
}
export type ViewOutput = object;
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare function defaultView(input: ViewInput, output: ViewOutput, target: HTMLElement): void;
export declare class AffectedTrackingSitesView extends AffectedResourcesView {
    #private;
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
