import type * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Logs from '../../models/logs/logs.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type LitTemplate } from '../../ui/lit/lit.js';
import type { IssueView } from './IssueView.js';
export declare const enum AffectedItem {
    COOKIE = "Cookie",
    DIRECTIVE = "Directive",
    ELEMENT = "Element",
    REQUEST = "Request",
    SOURCE = "Source"
}
export declare const extractShortPath: (path: Platform.DevToolsPath.UrlString) => string;
export interface ElementCellData {
    nodeName: string;
    deferredNode?: SDK.DOMModel.DeferredDOMNode;
    onElementClick: () => void;
}
export declare function renderElementCell(element: ElementCellData): LitTemplate;
export interface FrameCellData {
    url: string;
    hasFrame: boolean;
    onReveal: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}
export declare function renderFrameCell(frame: FrameCellData | undefined): LitTemplate;
export interface ViewInput {
    resourceNameWithCount: string;
    labelClass?: string;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export interface TableViewInput {
    onTableRef: (table: HTMLTableElement) => void;
}
export type TableView = (input: TableViewInput, output: undefined, target: HTMLElement) => void;
export declare const TABLE_VIEW: TableView;
/**
 * The base class for all affected resource views. It provides basic scaffolding
 * as well as machinery for resolving request and frame ids to SDK objects.
 */
export declare abstract class AffectedResourcesView extends UI.TreeOutline.TreeElement {
    #private;
    protected issue: IssuesManager.IssueAggregator.AggregatedIssue;
    protected affectedResources: HTMLElement;
    protected requestResolver: Logs.RequestResolver.RequestResolver;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: View, tableView?: TableView);
    setIssue(issue: IssuesManager.IssueAggregator.AggregatedIssue): void;
    protected getAffectedResourcesLabelClass(): string | undefined;
    protected abstract getResourceNameWithCount(count: number): string;
    protected updateAffectedResourceCount(count: number): void;
    isEmpty(): boolean;
    clear(): void;
    expandIfOneResource(): void;
    protected createFrameCellData(frameId: Protocol.Page.FrameId, issueCategory: IssuesManager.Issue.IssueCategory): FrameCellData;
    protected createElementCellData({ backendNodeId, nodeName, target }: IssuesManager.Issue.AffectedElement, issueCategory: IssuesManager.Issue.IssueCategory): ElementCellData;
    abstract update(): void;
}
