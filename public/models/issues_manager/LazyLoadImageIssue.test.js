// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describe('LazyLoadImageIssue', () => {
    setupLocaleHooks();
    const mockModel = new MockIssuesModel([]);
    function createProtocolIssueWithoutDetails() {
        return {
            code: "LazyLoadImageIssue" /* Protocol.Audits.InspectorIssueCode.LazyLoadImageIssue */,
            details: {},
        };
    }
    function createProtocolIssueWithDetails(lazyLoadImageIssueDetails) {
        return {
            code: "LazyLoadImageIssue" /* Protocol.Audits.InspectorIssueCode.LazyLoadImageIssue */,
            details: { lazyLoadImageIssueDetails },
        };
    }
    it('creates a lazy load image issue with valid details', () => {
        const issueDetails = {
            nodeId: 42,
            url: 'https://example.com/image.jpg',
            frameId: 'main',
        };
        const issue = createProtocolIssueWithDetails(issueDetails);
        const issues = IssuesManager.LazyLoadImageIssue.LazyLoadImageIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(issues, 1);
        const lazyIssue = issues[0];
        assert.strictEqual(lazyIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
        assert.strictEqual(lazyIssue.primaryKey(), `LazyLoadImageIssue-(42)-(https://example.com/image.jpg)`);
        assert.strictEqual(lazyIssue.getKind(), "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */);
        assert.isNotNull(lazyIssue.getDescription());
    });
    it('returns empty array without details', () => {
        const inspectorIssueWithoutDetails = createProtocolIssueWithoutDetails();
        const issues = IssuesManager.LazyLoadImageIssue.LazyLoadImageIssue.fromInspectorIssue(mockModel, inspectorIssueWithoutDetails);
        assert.isEmpty(issues);
    });
});
//# sourceMappingURL=LazyLoadImageIssue.test.js.map