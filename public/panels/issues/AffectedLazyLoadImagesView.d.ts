import type * as Platform from '../../core/platform/platform.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView, type ElementCellData } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface ViewInput {
    elements: ElementCellData[];
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedLazyLoadImagesView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    update(): void;
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
}
