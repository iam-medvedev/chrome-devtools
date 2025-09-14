// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithLocale } from '../../testing/EnvironmentHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
function createProtocolIssue(unencodedDigestIssueDetails) {
    return {
        code: "UnencodedDigestIssue" /* Protocol.Audits.InspectorIssueCode.UnencodedDigestIssue */,
        details: { unencodedDigestIssueDetails },
    };
}
describeWithLocale('UnencodedDigestIssue', () => {
    const mockModel = new MockIssuesModel([]);
    it('can be created for various error reasons', () => {
        const errorReasons = [
            "IncorrectDigestLength" /* Protocol.Audits.UnencodedDigestError.IncorrectDigestLength */,
            "IncorrectDigestType" /* Protocol.Audits.UnencodedDigestError.IncorrectDigestType */,
            "MalformedDictionary" /* Protocol.Audits.UnencodedDigestError.MalformedDictionary */,
            "UnknownAlgorithm" /* Protocol.Audits.UnencodedDigestError.UnknownAlgorithm */,
        ];
        for (const errorReason of errorReasons) {
            const issueDetails = {
                error: errorReason,
                request: {
                    requestId: 'test-request-id',
                    url: 'https://example.com/',
                },
            };
            const issue = createProtocolIssue(issueDetails);
            const unencodedDigestIssues = IssuesManager.UnencodedDigestIssue.UnencodedDigestIssue.fromInspectorIssue(mockModel, issue);
            assert.lengthOf(unencodedDigestIssues, 1);
            const unencodedDigestIssue = unencodedDigestIssues[0];
            assert.strictEqual(unencodedDigestIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
            assert.deepEqual(unencodedDigestIssue.details(), issueDetails);
            assert.strictEqual(unencodedDigestIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
            assert.isNotNull(unencodedDigestIssue.getDescription());
        }
    });
});
//# sourceMappingURL=UnencodedDigestIssue.test.js.map