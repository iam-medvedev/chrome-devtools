import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import type { MarkdownIssueDescription } from './MarkdownIssueDescription.js';
/** TODO(b/305738703): Move this issue into a warning on CookieIssue. **/
export declare class CookieDeprecationMetadataIssue extends Issue {
    #private;
    constructor(issueDetails: Protocol.Audits.CookieDeprecationMetadataIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel);
    getCategory(): IssueCategory;
    getDescription(): MarkdownIssueDescription;
    details(): Protocol.Audits.CookieDeprecationMetadataIssueDetails;
    getKind(): IssueKind;
    primaryKey(): string;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): CookieDeprecationMetadataIssue[];
}
