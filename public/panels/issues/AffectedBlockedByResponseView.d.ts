import '../../ui/components/request_link_icon/request_link_icon.js';
import type * as Platform from '../../core/platform/platform.js';
import type * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import type * as Logs from '../../models/logs/logs.js';
import { AffectedResourcesView, type FrameCellData } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export type { FrameCellData };
export interface BlockedByResponseRow {
    request: Protocol.Audits.AffectedRequest;
    parentFrame?: FrameCellData;
    blockedFrame?: FrameCellData;
}
export interface ViewInput {
    rows: BlockedByResponseRow[];
    requestResolver: Logs.RequestResolver.RequestResolver;
    onRequestClick: () => void;
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedBlockedByResponseView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
