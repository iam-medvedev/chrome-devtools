import '../../ui/components/adorners/adorners.js';
import '../../ui/components/request_link_icon/request_link_icon.js';
import '../../ui/kit/kit.js';
import * as Platform from '../../core/platform/platform.js';
import * as Protocol from '../../generated/protocol.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import type * as Logs from '../../models/logs/logs.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as UI from '../../ui/legacy/legacy.js';
/**
 * Data needed to render a request link cell in the affected resources tables.
 */
export interface RequestCellData {
    affectedRequest: Protocol.Audits.AffectedRequest;
    networkTab: NetworkForward.UIRequestLocation.UIRequestTabs;
}
export interface RequestRowsViewInput {
    requests: RequestCellData[];
    requestResolver: Logs.RequestResolver.RequestResolver;
    onRequestClick: () => void;
}
export type RequestRowsView = (input: RequestRowsViewInput, output: undefined, target: HTMLElement) => void;
export declare const REQUEST_ROWS_VIEW: RequestRowsView;
export interface MixedContentRow {
    request?: RequestCellData;
    insecureURL: string;
    shortPath: string;
    status: Platform.UIString.LocalizedString;
}
export interface MixedContentRowsViewInput {
    rows: MixedContentRow[];
    requestResolver: Logs.RequestResolver.RequestResolver;
    onRequestClick: () => void;
}
export type MixedContentRowsView = (input: MixedContentRowsViewInput, output: undefined, target: HTMLElement) => void;
export declare const MIXED_CONTENT_ROWS_VIEW: MixedContentRowsView;
export interface ViewInput {
    iconName: string;
    iconTitle: Platform.UIString.LocalizedString;
    aggregatedIssuesCount: number;
    title: string;
    isHidden: boolean;
    hideIssuesMenuLabel: Platform.UIString.LocalizedString;
    onToggleHideIssues: () => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class IssueView extends UI.TreeOutline.TreeElement {
    #private;
    toggleOnClick: boolean;
    affectedResources: UI.TreeOutline.TreeElement;
    constructor(issue: IssuesManager.IssueAggregator.AggregatedIssue, description: IssuesManager.MarkdownIssueDescription.IssueDescription, view?: View);
    /**
     * Sets the issue to take the resources from. Assumes that the description
     * this IssueView was initialized with fits the new issue as well, i.e.
     * title and issue description will not be updated.
     */
    setIssue(issue: IssuesManager.IssueAggregator.AggregatedIssue): void;
    getIssueTitle(): string;
    onattach(): void;
    createContent(): void;
    appendAffectedResource(resource: UI.TreeOutline.TreeElement): void;
    onexpand(): void;
    updateAffectedResourceVisibility(): void;
    update(): void;
    clear(): void;
    getIssueKind(): IssuesManager.Issue.IssueKind;
    isForHiddenIssue(): boolean;
    toggle(expand?: boolean): void;
}
