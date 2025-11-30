// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describe('FederatedAuthUserInfoRequestIssue', () => {
    setupLocaleHooks();
    function createProtocolIssue(federatedAuthUserInfoRequestIssueDetails) {
        return {
            code: "FederatedAuthUserInfoRequestIssue" /* Protocol.Audits.InspectorIssueCode.FederatedAuthUserInfoRequestIssue */,
            details: { federatedAuthUserInfoRequestIssueDetails },
        };
    }
    const mockModel = new MockIssuesModel([]);
    it('can be created for various error reasons', () => {
        const errorReasons = [
            "NotSameOrigin" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NotSameOrigin */,
            "NotIframe" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NotIframe */,
            "NotPotentiallyTrustworthy" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NotPotentiallyTrustworthy */,
            "NoApiPermission" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NoAPIPermission */,
            "NotSignedInWithIdp" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NotSignedInWithIdp */,
            "NoAccountSharingPermission" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NoAccountSharingPermission */,
            "InvalidConfigOrWellKnown" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.InvalidConfigOrWellKnown */,
            "InvalidAccountsResponse" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.InvalidAccountsResponse */,
            "NoReturningUserFromFetchedAccounts" /* Protocol.Audits.FederatedAuthUserInfoRequestIssueReason.NoReturningUserFromFetchedAccounts */,
        ];
        for (const errorReason of errorReasons) {
            const issueDetails = {
                federatedAuthUserInfoRequestIssueReason: errorReason,
            };
            const issue = createProtocolIssue(issueDetails);
            const federatedAuthUserInfoRequestIssues = IssuesManager.FederatedAuthUserInfoRequestIssue.FederatedAuthUserInfoRequestIssue.fromInspectorIssue(mockModel, issue);
            assert.lengthOf(federatedAuthUserInfoRequestIssues, 1);
            const federatedAuthUserInfoRequestIssue = federatedAuthUserInfoRequestIssues[0];
            assert.strictEqual(federatedAuthUserInfoRequestIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
            assert.deepEqual(federatedAuthUserInfoRequestIssue.details(), issueDetails);
            assert.strictEqual(federatedAuthUserInfoRequestIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
            assert.isNotNull(federatedAuthUserInfoRequestIssue.getDescription());
        }
    });
});
//# sourceMappingURL=FederatedAuthUserInfoRequestIssue.test.js.map