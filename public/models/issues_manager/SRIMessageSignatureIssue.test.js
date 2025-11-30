// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describe('SRIMessageSignatureIssue', () => {
    setupLocaleHooks();
    function createProtocolIssue(sriMessageSignatureIssueDetails) {
        return {
            code: "SRIMessageSignatureIssue" /* Protocol.Audits.InspectorIssueCode.SRIMessageSignatureIssue */,
            details: { sriMessageSignatureIssueDetails },
        };
    }
    const mockModel = new MockIssuesModel([]);
    it('can be created for various error reasons', () => {
        const errorReasons = [
            "MissingSignatureHeader" /* Protocol.Audits.SRIMessageSignatureError.MissingSignatureHeader */,
            "MissingSignatureInputHeader" /* Protocol.Audits.SRIMessageSignatureError.MissingSignatureInputHeader */,
            "InvalidSignatureHeader" /* Protocol.Audits.SRIMessageSignatureError.InvalidSignatureHeader */,
            "InvalidSignatureInputHeader" /* Protocol.Audits.SRIMessageSignatureError.InvalidSignatureInputHeader */,
            "SignatureHeaderValueIsNotByteSequence" /* Protocol.Audits.SRIMessageSignatureError.SignatureHeaderValueIsNotByteSequence */,
            "SignatureHeaderValueIsParameterized" /* Protocol.Audits.SRIMessageSignatureError.SignatureHeaderValueIsParameterized */,
            "SignatureHeaderValueIsIncorrectLength" /* Protocol.Audits.SRIMessageSignatureError.SignatureHeaderValueIsIncorrectLength */,
            "SignatureInputHeaderMissingLabel" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderMissingLabel */,
            "SignatureInputHeaderValueNotInnerList" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderValueNotInnerList */,
            "SignatureInputHeaderValueMissingComponents" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderValueMissingComponents */,
            "SignatureInputHeaderInvalidComponentType" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderInvalidComponentType */,
            "SignatureInputHeaderInvalidComponentName" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderInvalidComponentName */,
            "SignatureInputHeaderInvalidHeaderComponentParameter" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderInvalidHeaderComponentParameter */,
            "SignatureInputHeaderInvalidDerivedComponentParameter" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderInvalidDerivedComponentParameter */,
            "SignatureInputHeaderKeyIdLength" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderKeyIdLength */,
            "SignatureInputHeaderInvalidParameter" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderInvalidParameter */,
            "SignatureInputHeaderMissingRequiredParameters" /* Protocol.Audits.SRIMessageSignatureError.SignatureInputHeaderMissingRequiredParameters */,
            "ValidationFailedSignatureExpired" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedSignatureExpired */,
            "ValidationFailedInvalidLength" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedInvalidLength */,
            "ValidationFailedSignatureMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedSignatureMismatch */,
            "ValidationFailedIntegrityMismatch" /* Protocol.Audits.SRIMessageSignatureError.ValidationFailedIntegrityMismatch */,
        ];
        for (const errorReason of errorReasons) {
            const issueDetails = {
                error: errorReason,
                request: {
                    requestId: 'test-request-id',
                    url: 'https://example.com/',
                },
                signatureBase: 'test-signature-base',
                integrityAssertions: [],
            };
            const issue = createProtocolIssue(issueDetails);
            const sriMessageSignatureIssues = IssuesManager.SRIMessageSignatureIssue.SRIMessageSignatureIssue.fromInspectorIssue(mockModel, issue);
            assert.lengthOf(sriMessageSignatureIssues, 1);
            const sriMessageSignatureIssue = sriMessageSignatureIssues[0];
            assert.strictEqual(sriMessageSignatureIssue.getCategory(), "Other" /* IssuesManager.Issue.IssueCategory.OTHER */);
            assert.deepEqual(sriMessageSignatureIssue.details(), issueDetails);
            assert.strictEqual(sriMessageSignatureIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
            assert.isNotNull(sriMessageSignatureIssue.getDescription());
        }
    });
});
//# sourceMappingURL=SRIMessageSignatureIssue.test.js.map