import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView, type FrameCellData } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export type { FrameCellData };
export interface ElementCellData {
    nodeName: string;
    deferredNode?: SDK.DOMModel.DeferredDOMNode;
    onElementClick: () => void;
}
export interface GenericIssueRow {
    frame?: FrameCellData;
    element?: ElementCellData;
}
export interface ViewInput {
    showFrameHeader: boolean;
    rows: GenericIssueRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class GenericIssueDetailsView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    clear(): void;
    update(): void;
}
