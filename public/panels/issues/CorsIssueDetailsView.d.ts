import '../../ui/components/request_link_icon/request_link_icon.js';
import * as Platform from '../../core/platform/platform.js';
import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import type * as Logs from '../../models/logs/logs.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface RequestCellData {
    affectedRequest: Protocol.Audits.AffectedRequest;
    linkToPreflight?: boolean;
    highlightHeader?: {
        section: NetworkForward.UIRequestLocation.UIHeaderSection;
        name: string;
    };
    additionalOnClickAction?: () => void;
}
export interface SourceLocationData {
    target: SDK.Target.Target | null;
    scriptId: Protocol.Runtime.ScriptId | null;
    url: Platform.DevToolsPath.UrlString;
    lineNumber: number;
    columnNumber?: number;
}
export interface CorsRow {
    request: RequestCellData;
    isWarning: boolean;
    preflight?: RequestCellData;
    header: string;
    problem: string;
    failedParameter: string;
    initiatorOrigin: string;
    resourceIPAddressSpace: string;
    initiatorIPAddressSpace: string;
    initiatorIsSecureContext: boolean | undefined;
    sourceLocation?: SourceLocationData;
}
export interface ViewInput {
    issueCode?: IssuesManager.CorsIssue.IssueCode;
    rows: CorsRow[];
    requestResolver: Logs.RequestResolver.RequestResolver;
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class CorsIssueDetailsView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
