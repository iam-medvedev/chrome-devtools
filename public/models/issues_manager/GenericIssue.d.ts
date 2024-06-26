import type * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import { Issue, IssueCategory, IssueKind } from './Issue.js';
import { type MarkdownIssueDescription } from './MarkdownIssueDescription.js';
export declare class GenericIssue extends Issue {
    #private;
    constructor(issueDetails: Protocol.Audits.GenericIssueDetails, issuesModel: SDK.IssuesModel.IssuesModel, issueId?: Protocol.Audits.IssueId);
    requests(): Iterable<Protocol.Audits.AffectedRequest>;
    getCategory(): IssueCategory;
    primaryKey(): string;
    getDescription(): MarkdownIssueDescription | null;
    details(): Protocol.Audits.GenericIssueDetails;
    getKind(): IssueKind;
    static fromInspectorIssue(issuesModel: SDK.IssuesModel.IssuesModel, inspectorIssue: Protocol.Audits.InspectorIssue): GenericIssue[];
}
export declare const genericFormLabelForNameError: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormInputWithNoLabelError: {
    file: string;
    links: never[];
};
export declare const genericFormAutocompleteAttributeEmptyError: {
    file: string;
    links: never[];
};
export declare const genericFormDuplicateIdForInputError: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormAriaLabelledByToNonExistingId: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormEmptyIdAndNameAttributesForInputError: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormInputAssignedAutocompleteValueToIdOrNameAttributeError: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormInputHasWrongButWellIntendedAutocompleteValue: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormLabelForMatchesNonExistingIdError: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericFormLabelHasNeitherForNorNestedInput: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
export declare const genericResponseWasBlockedbyORB: {
    file: string;
    links: {
        link: string;
        linkTitle: () => import("../../core/platform/UIString.js").LocalizedString;
    }[];
};
