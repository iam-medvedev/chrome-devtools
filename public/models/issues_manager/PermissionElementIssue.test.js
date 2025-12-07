// Copyright 2025 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as IssuesManager from './issues_manager.js';
describe('PermissionElementIssue', () => {
    setupLocaleHooks();
    const mockModel = new MockIssuesModel([]);
    function createProtocolIssue(permissionElementIssueDetails) {
        return {
            code: "PermissionElementIssue" /* Protocol.Audits.InspectorIssueCode.PermissionElementIssue */,
            details: {
                permissionElementIssueDetails,
            },
        };
    }
    it('should be created correctly for all issue types', () => {
        const enumValues = [
            "InvalidType" /* Protocol.Audits.PermissionElementIssueType.InvalidType */,
            "FencedFrameDisallowed" /* Protocol.Audits.PermissionElementIssueType.FencedFrameDisallowed */,
            "CspFrameAncestorsMissing" /* Protocol.Audits.PermissionElementIssueType.CspFrameAncestorsMissing */,
            "PermissionsPolicyBlocked" /* Protocol.Audits.PermissionElementIssueType.PermissionsPolicyBlocked */,
            "PaddingRightUnsupported" /* Protocol.Audits.PermissionElementIssueType.PaddingRightUnsupported */,
            "PaddingBottomUnsupported" /* Protocol.Audits.PermissionElementIssueType.PaddingBottomUnsupported */,
            "InsetBoxShadowUnsupported" /* Protocol.Audits.PermissionElementIssueType.InsetBoxShadowUnsupported */,
            "RequestInProgress" /* Protocol.Audits.PermissionElementIssueType.RequestInProgress */,
            "UntrustedEvent" /* Protocol.Audits.PermissionElementIssueType.UntrustedEvent */,
            "RegistrationFailed" /* Protocol.Audits.PermissionElementIssueType.RegistrationFailed */,
            "TypeNotSupported" /* Protocol.Audits.PermissionElementIssueType.TypeNotSupported */,
            "InvalidTypeActivation" /* Protocol.Audits.PermissionElementIssueType.InvalidTypeActivation */,
            "SecurityChecksFailed" /* Protocol.Audits.PermissionElementIssueType.SecurityChecksFailed */,
            "ActivationDisabled" /* Protocol.Audits.PermissionElementIssueType.ActivationDisabled */,
            "GeolocationDeprecated" /* Protocol.Audits.PermissionElementIssueType.GeolocationDeprecated */,
            "InvalidDisplayStyle" /* Protocol.Audits.PermissionElementIssueType.InvalidDisplayStyle */,
            "NonOpaqueColor" /* Protocol.Audits.PermissionElementIssueType.NonOpaqueColor */,
            "LowContrast" /* Protocol.Audits.PermissionElementIssueType.LowContrast */,
            "FontSizeTooSmall" /* Protocol.Audits.PermissionElementIssueType.FontSizeTooSmall */,
            "FontSizeTooLarge" /* Protocol.Audits.PermissionElementIssueType.FontSizeTooLarge */,
            "InvalidSizeValue" /* Protocol.Audits.PermissionElementIssueType.InvalidSizeValue */,
        ];
        for (const issueType of enumValues) {
            const details = {
                issueType,
                nodeId: 1,
                type: 'test-type', // Default type for most issues
            };
            // Add/override specific fields required by certain issue types
            switch (issueType) {
                case "PermissionsPolicyBlocked" /* Protocol.Audits.PermissionElementIssueType.PermissionsPolicyBlocked */:
                    details.permissionName = 'test-permission';
                    break;
                case "ActivationDisabled" /* Protocol.Audits.PermissionElementIssueType.ActivationDisabled */:
                    details.disableReason = 'test-reason';
                    break;
                case "GeolocationDeprecated" /* Protocol.Audits.PermissionElementIssueType.GeolocationDeprecated */:
                    delete details.type; // This type does not use the 'type' field
                    break;
            }
            const inspectorIssue = createProtocolIssue(details);
            const issues = IssuesManager.PermissionElementIssue.PermissionElementIssue.fromInspectorIssue(mockModel, inspectorIssue);
            assert.lengthOf(issues, 1, `For ${issueType}: fromInspectorIssue should return one issue.`);
            const issue = issues[0];
            assert.strictEqual(issue.code(), `${"PermissionElementIssue" /* Protocol.Audits.InspectorIssueCode.PermissionElementIssue */}::${issueType}`, `For ${issueType}: issue code should be specific to the issueType.`);
            assert.strictEqual(issue.getCategory(), "PermissionElement" /* IssuesManager.Issue.IssueCategory.PERMISSION_ELEMENT */, `For ${issueType}: category should be PERMISSION_ELEMENT.`);
            assert.strictEqual(issue.getKind(), details.isWarning ? "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */ : "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */, `For ${issueType}: kind should be correct based on isWarning.`);
            assert.include(issue.primaryKey(), details.issueType, `For ${issueType}: primary key should include issueType.`);
            if (details.nodeId) {
                assert.lengthOf(Array.from(issue.elements()), 1, `For ${issueType}: should have one affected element.`);
            }
            const description = issue.getDescription();
            assert.isNotNull(description, `For ${issueType}: description should not be null.`);
            if (description) {
                assert.include(description.file, 'permissionElement', `For ${issueType}: description file should be a permissionElement file.`);
            }
        }
    });
});
//# sourceMappingURL=PermissionElementIssue.test.js.map