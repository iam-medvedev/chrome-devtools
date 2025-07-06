// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { Issue } from './Issue.js';
import { resolveLazyDescription } from './MarkdownIssueDescription.js';
export class ElementAccessibilityIssue extends Issue {
    issueDetails;
    constructor(issueDetails, issuesModel, issueId) {
        const issueCode = [
            "ElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.ElementAccessibilityIssue */,
            issueDetails.elementAccessibilityIssueReason,
        ].join('::');
        super(issueCode, issuesModel, issueId);
        this.issueDetails = issueDetails;
    }
    primaryKey() {
        return JSON.stringify(this.issueDetails);
    }
    getDescription() {
        if (this.isInteractiveContentAttributesSelectDescendantIssue()) {
            return {
                file: 'selectElementAccessibilityInteractiveContentAttributesSelectDescendant.md',
                links: [],
            };
        }
        const description = issueDescriptions.get(this.issueDetails.elementAccessibilityIssueReason);
        if (!description) {
            return null;
        }
        return resolveLazyDescription(description);
    }
    getKind() {
        return "PageError" /* IssueKind.PAGE_ERROR */;
    }
    getCategory() {
        return "Other" /* IssueCategory.OTHER */;
    }
    details() {
        return this.issueDetails;
    }
    isInteractiveContentAttributesSelectDescendantIssue() {
        return this.issueDetails.hasDisallowedAttributes &&
            (this.issueDetails.elementAccessibilityIssueReason !==
                "InteractiveContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentOptionChild */ &&
                this.issueDetails.elementAccessibilityIssueReason !==
                    "InteractiveContentSummaryDescendant" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentSummaryDescendant */);
    }
    static fromInspectorIssue(issuesModel, inspectorIssue) {
        const elementAccessibilityIssueDetails = inspectorIssue.details.elementAccessibilityIssueDetails;
        if (!elementAccessibilityIssueDetails) {
            console.warn('Element Accessibility issue without details received.');
            return [];
        }
        return [new ElementAccessibilityIssue(elementAccessibilityIssueDetails, issuesModel, inspectorIssue.issueId)];
    }
}
const issueDescriptions = new Map([
    [
        "DisallowedSelectChild" /* Protocol.Audits.ElementAccessibilityIssueReason.DisallowedSelectChild */,
        {
            file: 'selectElementAccessibilityDisallowedSelectChild.md',
            links: [],
        },
    ],
    [
        "DisallowedOptGroupChild" /* Protocol.Audits.ElementAccessibilityIssueReason.DisallowedOptGroupChild */,
        {
            file: 'selectElementAccessibilityDisallowedOptGroupChild.md',
            links: [],
        },
    ],
    [
        "NonPhrasingContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.NonPhrasingContentOptionChild */,
        {
            file: 'selectElementAccessibilityNonPhrasingContentOptionChild.md',
            links: [],
        },
    ],
    [
        "InteractiveContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentOptionChild */,
        {
            file: 'selectElementAccessibilityInteractiveContentOptionChild.md',
            links: [],
        },
    ],
    [
        "InteractiveContentLegendChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentLegendChild */,
        {
            file: 'selectElementAccessibilityInteractiveContentLegendChild.md',
            links: [],
        },
    ],
    [
        "InteractiveContentSummaryDescendant" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentSummaryDescendant */,
        {
            file: 'summaryElementAccessibilityInteractiveContentSummaryDescendant.md',
            links: [],
        },
    ],
]);
//# sourceMappingURL=ElementAccessibilityIssue.js.map