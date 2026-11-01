import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedElementsView } from './AffectedElementsView.js';
import type { IssueView } from './IssueView.js';
export interface QuirksModeRow {
    nodeName: string;
    backendNodeId: Protocol.DOM.BackendNodeId;
    target: SDK.Target.Target | null;
    onElementClick: () => void;
    mode: string;
    url: string;
}
export interface ViewInput {
    rows: QuirksModeRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedDocumentsInQuirksModeView extends AffectedElementsView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    update(): void;
    protected getResourceName(count: number): Platform.UIString.LocalizedString;
}
