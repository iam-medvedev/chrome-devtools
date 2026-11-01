import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import * as IssuesComponents from './components/components.js';
import type { IssueView } from './IssueView.js';
export interface SourceLocationData {
    target: SDK.Target.Target | null;
    scriptId: Protocol.Runtime.ScriptId | null;
    url: Platform.DevToolsPath.UrlString;
    lineNumber: number;
    columnNumber?: number;
}
export interface DirectiveRow {
    violatedDirective: string;
    isReportOnly: boolean;
    blockedURL: Platform.DevToolsPath.UrlString;
    sourceLocation?: SourceLocationData;
    hasModel: boolean;
    elementsPanelLinkData?: IssuesComponents.ElementsPanelLink.ElementsPanelLinkData;
}
export interface ViewInput {
    issueCode: string;
    rows: DirectiveRow[];
    linkifier: Components.Linkifier.Linkifier;
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class AffectedDirectivesView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
