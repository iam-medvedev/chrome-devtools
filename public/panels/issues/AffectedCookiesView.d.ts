import type * as Platform from '../../core/platform/platform.js';
import type * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { AffectedResourcesView } from './AffectedResourcesView.js';
import type { IssueView } from './IssueView.js';
export interface CookieViewItem {
    name: string;
    domainAndPath: string;
    hasRequest: boolean;
    onClick: () => void;
}
export interface CookiesViewInput {
    cookies: CookieViewItem[];
}
export type CookiesView = (input: CookiesViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: CookiesView;
export interface RawCookieLinesViewInput {
    cookieLines: Array<{
        rawCookieLine: string;
        hasRequest: boolean;
    }>;
    onRawCookieClick: (rawCookieLine: string) => void;
}
export type RawCookieLinesView = (input: RawCookieLinesViewInput, _output: undefined, target: HTMLElement) => void;
export declare const RAW_COOKIE_LINES_VIEW: RawCookieLinesView;
export declare class AffectedCookiesView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: CookiesView);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
export declare class AffectedRawCookieLinesView extends AffectedResourcesView {
    #private;
    constructor(parent: IssueView, issue: IssuesManager.IssueAggregator.AggregatedIssue, jslogContext: string, view?: RawCookieLinesView);
    protected getResourceNameWithCount(count: number): Platform.UIString.LocalizedString;
    update(): void;
}
