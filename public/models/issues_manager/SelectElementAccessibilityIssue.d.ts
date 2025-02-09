import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import { type MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare class SelectElementAccessibilityIssue extends Issue {
    private issueDetails;
    constructor(issueDetails: Protocol.Audits.SelectElementAccessibilityIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel, issueId?: Protocol.Audits.IssueId);
    primaryKey(): string;
    getDescription(): MarkdownIssueDescription | null;
    getKind(): IssueKind;
    getCategory(): IssueCategory;
    details(): Protocol.Audits.SelectElementAccessibilityIssueDetails;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): SelectElementAccessibilityIssue[];
}
