// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describe('SharedDictionaryIssue', () => {
    setupLocaleHooks();
    function createProtocolIssue(sharedDictionaryIssueDetails) {
        return {
            code: "SharedDictionaryIssue" /* Protocol.Audits.InspectorIssueCode.SharedDictionaryIssue */,
            details: { sharedDictionaryIssueDetails },
        };
    }
    const mockModel = new MockIssuesModel([]);
    it('can be created for various error reasons', () => {
        const errorReasons = [
            "UseErrorCrossOriginNoCorsRequest" /* Protocol.Audits.SharedDictionaryError.UseErrorCrossOriginNoCorsRequest */,
            "UseErrorDictionaryLoadFailure" /* Protocol.Audits.SharedDictionaryError.UseErrorDictionaryLoadFailure */,
            "UseErrorMatchingDictionaryNotUsed" /* Protocol.Audits.SharedDictionaryError.UseErrorMatchingDictionaryNotUsed */,
            "UseErrorUnexpectedContentDictionaryHeader" /* Protocol.Audits.SharedDictionaryError.UseErrorUnexpectedContentDictionaryHeader */,
            "WriteErrorCossOriginNoCorsRequest" /* Protocol.Audits.SharedDictionaryError.WriteErrorCossOriginNoCorsRequest */,
            "WriteErrorDisallowedBySettings" /* Protocol.Audits.SharedDictionaryError.WriteErrorDisallowedBySettings */,
            "WriteErrorExpiredResponse" /* Protocol.Audits.SharedDictionaryError.WriteErrorExpiredResponse */,
            "WriteErrorFeatureDisabled" /* Protocol.Audits.SharedDictionaryError.WriteErrorFeatureDisabled */,
            "WriteErrorInsufficientResources" /* Protocol.Audits.SharedDictionaryError.WriteErrorInsufficientResources */,
            "WriteErrorInvalidMatchField" /* Protocol.Audits.SharedDictionaryError.WriteErrorInvalidMatchField */,
            "WriteErrorInvalidStructuredHeader" /* Protocol.Audits.SharedDictionaryError.WriteErrorInvalidStructuredHeader */,
            "WriteErrorInvalidTTLField" /* Protocol.Audits.SharedDictionaryError.WriteErrorInvalidTTLField */,
            "WriteErrorNavigationRequest" /* Protocol.Audits.SharedDictionaryError.WriteErrorNavigationRequest */,
            "WriteErrorNoMatchField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNoMatchField */,
            "WriteErrorNonIntegerTTLField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonIntegerTTLField */,
            "WriteErrorNonListMatchDestField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonListMatchDestField */,
            "WriteErrorNonSecureContext" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonSecureContext */,
            "WriteErrorNonStringIdField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonStringIdField */,
            "WriteErrorNonStringInMatchDestList" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonStringInMatchDestList */,
            "WriteErrorNonStringMatchField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonStringMatchField */,
            "WriteErrorNonTokenTypeField" /* Protocol.Audits.SharedDictionaryError.WriteErrorNonTokenTypeField */,
            "WriteErrorRequestAborted" /* Protocol.Audits.SharedDictionaryError.WriteErrorRequestAborted */,
            "WriteErrorShuttingDown" /* Protocol.Audits.SharedDictionaryError.WriteErrorShuttingDown */,
            "WriteErrorTooLongIdField" /* Protocol.Audits.SharedDictionaryError.WriteErrorTooLongIdField */,
            "WriteErrorUnsupportedType" /* Protocol.Audits.SharedDictionaryError.WriteErrorUnsupportedType */,
        ];
        for (const errorReason of errorReasons) {
            const issueDetails = {
                sharedDictionaryError: errorReason,
                request: {
                    requestId: 'test-request-id',
                    url: 'https://example.com/',
                },
            };
            const issue = createProtocolIssue(issueDetails);
            const sharedDictionaryIssues = IssuesManager.SharedDictionaryIssue.SharedDictionaryIssue.fromInspectorIssue(mockModel, issue);
            assert.lengthOf(sharedDictionaryIssues, 1);
            const sharedDictionaryIssue = sharedDictionaryIssues[0];
            assert.strictEqual(sharedDictionaryIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
            assert.deepEqual(sharedDictionaryIssue.details(), issueDetails);
            assert.strictEqual(sharedDictionaryIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
            assert.isNotNull(sharedDictionaryIssue.getDescription());
        }
    });
});
//# sourceMappingURL=SharedDictionaryIssue.test.js.map