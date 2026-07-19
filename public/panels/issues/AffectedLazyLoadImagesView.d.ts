import type * as Platform from '../../core/platform/platform.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface ViewInput {
    issues: Iterable<IssuesManager.LazyLoadImageIssue.LazyLoadImageIssue>;
    issueCategory: IssuesManager.Issue.IssueCategory;
    createElementCell: (element: IssuesManager.Issue.AffectedElement, category: IssuesManager.Issue.IssueCategory) => Promise<Element>;
}
export type View = (input: ViewInput, output: object, target: HTMLElement) => Promise<void>;
export declare const DEFAULT_VIEW: View;
export declare class AffectedLazyLoadImagesView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    update(): void;
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
}
