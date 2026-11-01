import * as Platform from '../../core/platform/platform.js';
import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface SourceLocationData {
    target: SDK.Target.Target | null;
    scriptId: Protocol.Runtime.ScriptId | null;
    url: Platform.DevToolsPath.UrlString;
    lineNumber: number;
    columnNumber?: number;
}
export interface SharedArrayBufferRow {
    sourceLocation?: SourceLocationData;
    triggerText: Platform.UIString.LocalizedString;
    triggerTitle: Platform.UIString.LocalizedString;
    isWarning: boolean;
}
export interface ViewInput {
    rows: SharedArrayBufferRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedSharedArrayBufferIssueDetailsView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
