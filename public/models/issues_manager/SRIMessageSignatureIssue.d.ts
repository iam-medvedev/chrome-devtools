import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import { type MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare class SRIMessageSignatureIssue extends Issue<string> {
    #private;
    constructor(issueDetails: Protocol.Audits.SRIMessageSignatureIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel);
    details(): Protocol.Audits.SRIMessageSignatureIssueDetails;
    primaryKey(): string;
    getDescription(): MarkdownIssueDescription | null;
    getCategory(): IssueCategory;
    getKind(): IssueKind;
    requests(): Iterable<Protocol.Audits.AffectedRequest>;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): SRIMessageSignatureIssue[];
}
