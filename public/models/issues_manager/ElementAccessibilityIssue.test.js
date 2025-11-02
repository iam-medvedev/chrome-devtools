// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { expectConsoleLogs } from '../../testing/EnvironmentHelpers.js';
import { describeWithLocale } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describeWithLocale('ElementAccessibilityIssue', () => {
    const mockModel = new MockIssuesModel([]);
    function createProtocolIssueWithoutDetails() {
        return {
            code: "ElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.ElementAccessibilityIssue */,
            details: {},
        };
    }
    function createProtocolIssueWithDetails(elementAccessibilityIssueDetails) {
        return {
            code: "ElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.ElementAccessibilityIssue */,
            details: { elementAccessibilityIssueDetails },
        };
    }
    expectConsoleLogs({
        warn: ['Select Element Accessibility issue without details received.'],
    });
    it('can be created for various reasons', () => {
        const reasons = [
            "DisallowedSelectChild" /* Protocol.Audits.ElementAccessibilityIssueReason.DisallowedSelectChild */,
            "DisallowedOptGroupChild" /* Protocol.Audits.ElementAccessibilityIssueReason.DisallowedOptGroupChild */,
            "NonPhrasingContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.NonPhrasingContentOptionChild */,
            "InteractiveContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentOptionChild */,
            "InteractiveContentLegendChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentLegendChild */,
            "InteractiveContentSummaryDescendant" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentSummaryDescendant */,
        ];
        for (const reason of reasons) {
            const issueDetails = {
                nodeId: 1,
                elementAccessibilityIssueReason: reason,
                hasDisallowedAttributes: false,
            };
            const issue = createProtocolIssueWithDetails(issueDetails);
            const selectIssues = IssuesManager.ElementAccessibilityIssue.ElementAccessibilityIssue.fromInspectorIssue(mockModel, issue);
            assert.lengthOf(selectIssues, 1);
            const selectIssue = selectIssues[0];
            assert.strictEqual(selectIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
            assert.deepEqual(selectIssue.details(), issueDetails);
            assert.strictEqual(selectIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
            assert.isNotNull(selectIssue.getDescription());
        }
    });
    it('adds a disallowed select child issue without details', () => {
        const inspectorIssueWithoutGenericDetails = createProtocolIssueWithoutDetails();
        const selectIssues = IssuesManager.ElementAccessibilityIssue.ElementAccessibilityIssue.fromInspectorIssue(mockModel, inspectorIssueWithoutGenericDetails);
        assert.isEmpty(selectIssues);
    });
    it('adds an interactive content attributes select child issue with valid details', () => {
        const issueDetails = {
            nodeId: 1,
            elementAccessibilityIssueReason: "InteractiveContentOptionChild" /* Protocol.Audits.ElementAccessibilityIssueReason.InteractiveContentOptionChild */,
            hasDisallowedAttributes: true,
        };
        const issue = createProtocolIssueWithDetails(issueDetails);
        const selectIssues = IssuesManager.ElementAccessibilityIssue.ElementAccessibilityIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(selectIssues, 1);
        const selectIssue = selectIssues[0];
        assert.strictEqual(selectIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
        assert.deepEqual(selectIssue.details(), issueDetails);
        assert.strictEqual(selectIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
        assert.isNotNull(selectIssue.getDescription());
    });
});
//# sourceMappingURL=ElementAccessibilityIssue.test.js.map