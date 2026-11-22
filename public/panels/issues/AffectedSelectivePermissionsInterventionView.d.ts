import * as Platform from '../../core/platform/platform.js';
import type * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import type * as StackTrace from '../../models/stack_trace/stack_trace.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface AdAncestryScript {
    target: SDK.Target.Target | null;
    scriptId: Protocol.Runtime.ScriptId;
}
export type ScriptCellState = {
    status: 'unknown';
} | {
    status: 'loading';
} | {
    status: 'ready';
    stackTrace: StackTrace.StackTrace.StackTrace;
};
export interface InterventionRow {
    apiName: string;
    script: ScriptCellState;
    adAncestryScripts: AdAncestryScript[];
    rootScriptFilterlistRule?: string;
}
export interface ViewInput {
    rows: InterventionRow[];
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedSelectivePermissionsInterventionView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    clear(): void;
    update(): void;
}
