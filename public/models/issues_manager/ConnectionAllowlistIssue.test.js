// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from '../issues_manager/issues_manager.js';
describe('ConnectionAllowlistIssue', () => {
    setupLocaleHooks();
    const mockModel = new MockIssuesModel([]);
    it('can be created from an inspector issue', () => {
        const details = {
            error: "InvalidHeader" /* Protocol.Audits.ConnectionAllowlistError.InvalidHeader */,
            request: {
                requestId: 'n1',
                url: 'https://example.com',
            },
        };
        const inspectorIssue = {
            code: "ConnectionAllowlistIssue" /* Protocol.Audits.InspectorIssueCode.ConnectionAllowlistIssue */,
            details: {
                connectionAllowlistIssueDetails: details,
            },
        };
        const issues = IssuesManager.ConnectionAllowlistIssue.ConnectionAllowlistIssue.fromInspectorIssue(mockModel, inspectorIssue);
        assert.lengthOf(issues, 1);
        assert.strictEqual(issues[0].code(), 'ConnectionAllowlistIssue::InvalidHeader');
    });
    it('correctly creates descriptions for all error types', () => {
        const errors = [
            "InvalidHeader" /* Protocol.Audits.ConnectionAllowlistError.InvalidHeader */,
            "MoreThanOneList" /* Protocol.Audits.ConnectionAllowlistError.MoreThanOneList */,
            "ItemNotInnerList" /* Protocol.Audits.ConnectionAllowlistError.ItemNotInnerList */,
            "InvalidAllowlistItemType" /* Protocol.Audits.ConnectionAllowlistError.InvalidAllowlistItemType */,
            "ReportingEndpointNotToken" /* Protocol.Audits.ConnectionAllowlistError.ReportingEndpointNotToken */,
            "InvalidUrlPattern" /* Protocol.Audits.ConnectionAllowlistError.InvalidUrlPattern */,
        ];
        for (const error of errors) {
            const details = {
                error,
                request: {
                    requestId: 'n1',
                    url: 'https://example.com',
                },
            };
            const issue = new IssuesManager.ConnectionAllowlistIssue.ConnectionAllowlistIssue(details, mockModel);
            const description = issue.getDescription();
            assert.exists(description, `Description for ${error} should exist`);
            assert.strictEqual(description?.file, `connectionAllowlist${error}.md`);
        }
    });
});
//# sourceMappingURL=ConnectionAllowlistIssue.test.js.map