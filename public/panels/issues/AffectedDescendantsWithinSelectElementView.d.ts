import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedElementsView } from './AffectedElementsView.js';
import type { IssueView } from './IssueView.js';
export interface SelectDescendantRow {
    backendNodeId: Protocol.DOM.BackendNodeId;
    nodeName: string;
    target: SDK.Target.Target | null;
    onElementClick: () => void;
}
export interface ViewInput {
    rows: SelectDescendantRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedDescendantsWithinSelectElementView extends AffectedElementsView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    update(): void;
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
}
