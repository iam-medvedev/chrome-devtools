import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import type { MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare const enum IssueCode {
    PERMISSION_POLICY_DISABLED = "AttributionReportingIssue::PermissionPolicyDisabled",
    UNTRUSTWORTHY_REPORTING_ORIGIN = "AttributionReportingIssue::UntrustworthyReportingOrigin",
    INSECURE_CONTEXT = "AttributionReportingIssue::InsecureContext",
    INVALID_REGISTER_SOURCE_HEADER = "AttributionReportingIssue::InvalidRegisterSourceHeader",
    INVALID_REGISTER_TRIGGER_HEADER = "AttributionReportingIssue::InvalidRegisterTriggerHeader",
    SOURCE_AND_TRIGGER_HEADERS = "AttributionReportingIssue::SourceAndTriggerHeaders",
    SOURCE_IGNORED = "AttributionReportingIssue::SourceIgnored",
    TRIGGER_IGNORED = "AttributionReportingIssue::TriggerIgnored",
    OS_SOURCE_IGNORED = "AttributionReportingIssue::OsSourceIgnored",
    OS_TRIGGER_IGNORED = "AttributionReportingIssue::OsTriggerIgnored",
    INVALID_REGISTER_OS_SOURCE_HEADER = "AttributionReportingIssue::InvalidRegisterOsSourceHeader",
    INVALID_REGISTER_OS_TRIGGER_HEADER = "AttributionReportingIssue::InvalidRegisterOsTriggerHeader",
    WEB_AND_OS_HEADERS = "AttributionReportingIssue::WebAndOsHeaders",
    NAVIGATION_REGISTRATION_WITHOUT_TRANSIENT_USER_ACTIVATION = "AttributionReportingIssue::NavigationRegistrationWithoutTransientUserActivation",
    UNKNOWN = "AttributionReportingIssue::Unknown"
}
export declare class AttributionReportingIssue extends Issue<IssueCode> {
    issueDetails: Readonly<Protocol.Audits.AttributionReportingIssueDetails>;
    constructor(issueDetails: Protocol.Audits.AttributionReportingIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel);
    getCategory(): IssueCategory;
    getHeaderValidatorLink(name: string): {
        link: string;
        linkTitle: string;
    };
    getDescription(): MarkdownIssueDescription | null;
    primaryKey(): string;
    getKind(): IssueKind;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): AttributionReportingIssue[];
}
