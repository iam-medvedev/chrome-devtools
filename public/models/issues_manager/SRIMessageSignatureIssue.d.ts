import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import { type MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare const enum IssueCode {
    MISSING_SIGNATURE_HEADER = "SRIMessageSignatureIssue::MissingSignatureHeader",
    MISSING_SIGNATURE_INPUT_HEADER = "SRIMessageSignatureIssue::MissingSignatureInputHeader",
    INVALID_SIGNATURE_HEADER = "SRIMessageSignatureIssue::InvalidSignatureHeader",
    INVALID_SIGNATURE_INPUT_HEADER = "SRIMessageSignatureIssue::InvalidSignatureInputHeader",
    SIGNATURE_HEADER_VALUE_IS_NOT_BYTE_SEQUENCE = "SRIMessageSignatureIssue::SignatureHeaderValueIsNotByteSequence",
    SIGNATURE_HEADER_VALUE_IS_PARAMETERIZED = "SRIMessageSignatureIssue::SignatureHeaderValueIsParameterized",
    SIGNATURE_HEADER_VALUE_IS_INCORRECT_LENGTH = "SRIMessageSignatureIssue::SignatureHeaderValueIsIncorrectLength",
    SIGNATURE_INPUT_HEADER_MISSING_LABEL = "SRIMessageSignatureIssue::SignatureInputHeaderMissingLabel",
    SIGNATURE_INPUT_HEADER_VALUE_NOT_INNER_LIST = "SRIMessageSignatureIssue::SignatureInputHeaderValueNotInnerList",
    SIGNATURE_INPUT_HEADER_VALUE_MISSING_COMPONENTS = "SRIMessageSignatureIssue::SignatureInputHeaderValueMissingComponents",
    SIGNATURE_INPUT_HEADER_INVALID_COMPONENT_TYPE = "SRIMessageSignatureIssue::SignatureInputHeaderInvalidComponentType",
    SIGNATURE_INPUT_HEADER_INVALID_COMPONENT_NAME = "SRIMessageSignatureIssue::SignatureInputHeaderInvalidComponentName",
    SIGNATURE_INPUT_HEADER_INVALID_HEADER_COMPONENT_PARAMETER = "SRIMessageSignatureIssue::SignatureInputHeaderInvalidHeaderComponentParameter",
    SIGNATURE_INPUT_HEADER_INVALID_DERIVED_COMPONENT_PARAMETER = "SRIMessageSignatureIssue::SignatureInputHeaderInvalidDerivedComponentParameter",
    SIGNATURE_INPUT_HEADER_KEY_ID_LENGTH = "SRIMessageSignatureIssue::SignatureInputHeaderKeyIdLength",
    SIGNATURE_INPUT_HEADER_INVALID_PARAMETER = "SRIMessageSignatureIssue::SignatureInputHeaderInvalidParameter",
    SIGNATURE_INPUT_HEADER_MISSING_REQUIRED_PARAMETERS = "SRIMessageSignatureIssue::SignatureInputHeaderMissingRequiredParameters",
    VALIDATION_FAILED_SIGNATURE_EXPIRED = "SRIMessageSignatureIssue::ValidationFailedSignatureExpired",
    VALIDATION_FAILED_INVALID_LENGTH = "SRIMessageSignatureIssue::ValidationFailedInvalidLength",
    VALIDATION_FAILED_SIGNATURE_MISMATCH = "SRIMessageSignatureIssue::ValidationFailedSignatureMismatch"
}
export declare class SRIMessageSignatureIssue extends Issue {
    #private;
    constructor(issueDetails: Protocol.Audits.SRIMessageSignatureIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel);
    requests(): Iterable<Protocol.Audits.AffectedRequest>;
    getCategory(): IssueCategory;
    details(): Protocol.Audits.SRIMessageSignatureIssueDetails;
    getDescription(): MarkdownIssueDescription | null;
    primaryKey(): string;
    getKind(): IssueKind;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): SRIMessageSignatureIssue[];
}
