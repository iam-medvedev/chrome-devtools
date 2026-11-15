import type * as Platform from '../../core/platform/platform.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView, type FrameCellData } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export type { FrameCellData };
export interface HeavyAdRow {
    reason: string;
    status: string;
    frame: FrameCellData;
}
export interface ViewInput {
    rows: HeavyAdRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedHeavyAdView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
