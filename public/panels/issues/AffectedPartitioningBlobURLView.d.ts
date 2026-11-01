import type * as Platform from '../../core/platform/platform.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface ViewInput {
    messages: Platform.UIString.LocalizedString[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedPartitioningBlobURLView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): string;
    update(): void;
}
