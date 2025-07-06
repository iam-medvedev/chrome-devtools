import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import { type MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare class ElementAccessibilityIssue extends Issue {
    private issueDetails;
    constructor(issueDetails: Protocol.Audits.ElementAccessibilityIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel, issueId?: Protocol.Audits.IssueId);
    primaryKey(): string;
    getDescription(): MarkdownIssueDescription | null;
    getKind(): IssueKind;
    getCategory(): IssueCategory;
    details(): Protocol.Audits.ElementAccessibilityIssueDetails;
    isInteractiveContentAttributesSelectDescendantIssue(): boolean;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): ElementAccessibilityIssue[];
}
