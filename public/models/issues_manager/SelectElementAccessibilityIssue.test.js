// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describeWithLocale('SelectElementAccessibilityIssue', () => {
    const mockModel = new MockIssuesModel([]);
    function createProtocolIssueWithoutDetails() {
        return {
            code: "SelectElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.SelectElementAccessibilityIssue */,
            details: {},
        };
    }
    function createProtocolIssueWithDetails(selectElementAccessibilityIssueDetails) {
        return {
            code: "SelectElementAccessibilityIssue" /* Protocol.Audits.InspectorIssueCode.SelectElementAccessibilityIssue */,
            details: { selectElementAccessibilityIssueDetails },
        };
    }
    it('can be created for various reasons', () => {
        const reasons = [
            "DisallowedSelectChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.DisallowedSelectChild */,
            "DisallowedOptGroupChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.DisallowedOptGroupChild */,
            "NonPhrasingContentOptionChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.NonPhrasingContentOptionChild */,
            "InteractiveContentOptionChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.InteractiveContentOptionChild */,
            "InteractiveContentLegendChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.InteractiveContentLegendChild */,
        ];
        for (const reason of reasons) {
            const issueDetails = {
                nodeId: 1,
                selectElementAccessibilityIssueReason: reason,
                hasDisallowedAttributes: false,
            };
            const issue = createProtocolIssueWithDetails(issueDetails);
            const selectIssues = IssuesManager.SelectElementAccessibilityIssue.SelectElementAccessibilityIssue.fromInspectorIssue(mockModel, issue);
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
        const selectIssues = IssuesManager.SelectElementAccessibilityIssue.SelectElementAccessibilityIssue.fromInspectorIssue(mockModel, inspectorIssueWithoutGenericDetails);
        assert.isEmpty(selectIssues);
    });
    it('adds an interactive content attributes select child issue with valid details', () => {
        const issueDetails = {
            nodeId: 1,
            selectElementAccessibilityIssueReason: "InteractiveContentOptionChild" /* Protocol.Audits.SelectElementAccessibilityIssueReason.InteractiveContentOptionChild */,
            hasDisallowedAttributes: true,
        };
        const issue = createProtocolIssueWithDetails(issueDetails);
        const selectIssues = IssuesManager.SelectElementAccessibilityIssue.SelectElementAccessibilityIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(selectIssues, 1);
        const selectIssue = selectIssues[0];
        assert.strictEqual(selectIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
        assert.deepEqual(selectIssue.details(), issueDetails);
        assert.strictEqual(selectIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
        assert.isNotNull(selectIssue.getDescription());
    });
});
//# sourceMappingURL=SelectElementAccessibilityIssue.test.js.map