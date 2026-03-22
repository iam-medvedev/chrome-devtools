// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Issues from './issues.js';
describeWithEnvironment('AffectedSelectivePermissionsInterventionView', () => {
    setupLocaleHooks();
    const mockModel = new MockIssuesModel([]);
    const mockTarget = {
        id: () => 'fake-id',
        isDisposed: () => false,
        model: () => null,
    };
    mockModel.target = () => mockTarget;
    function createProtocolIssueWithDetails(selectivePermissionsInterventionIssueDetails) {
        return {
            code: "SelectivePermissionsInterventionIssue" /* Protocol.Audits.InspectorIssueCode.SelectivePermissionsInterventionIssue */,
            details: { selectivePermissionsInterventionIssueDetails },
        };
    }
    const issueDetails = {
        apiName: 'geolocation',
        stackTrace: {
            callFrames: [
                {
                    functionName: 'foo',
                    scriptId: '1',
                    url: 'https://example.com/foo.js',
                    lineNumber: 10,
                    columnNumber: 5,
                },
            ],
        },
        adAncestry: {
            ancestryChain: [
                {
                    scriptId: '2',
                    debuggerId: '123',
                    name: 'https://ads.com/ad.js',
                },
            ],
            rootScriptFilterlistRule: '||ads.com^',
        },
    };
    it('appends details correctly', () => {
        const issue = createProtocolIssueWithDetails(issueDetails);
        const interventionIssues = IssuesManager.SelectivePermissionsInterventionIssue.SelectivePermissionsInterventionIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(interventionIssues, 1);
        const interventionIssue = interventionIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(interventionIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(interventionIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedSelectivePermissionsInterventionView.AffectedSelectivePermissionsInterventionView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        view.update();
        const resourceRows = view.affectedResources.querySelectorAll('.affected-resource-directive');
        assert.lengthOf(resourceRows, 1);
        const row = resourceRows[0];
        assert.strictEqual(row.cells[0].textContent, 'geolocation');
        assert.include(row.cells[2].textContent || '', 'ads.com/ad.js');
        assert.include(row.cells[2].textContent || '', 'Rule: ||ads.com^');
    });
    it('handles issues with missing ad ancestry rule', () => {
        const issueDetailsMinimal = {
            apiName: 'geolocation',
            adAncestry: {
                ancestryChain: [],
            },
        };
        const issue = createProtocolIssueWithDetails(issueDetailsMinimal);
        const interventionIssues = IssuesManager.SelectivePermissionsInterventionIssue.SelectivePermissionsInterventionIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(interventionIssues, 1);
        const interventionIssue = interventionIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(interventionIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(interventionIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedSelectivePermissionsInterventionView.AffectedSelectivePermissionsInterventionView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        view.update();
        const resourceRows = view.affectedResources.querySelectorAll('.affected-resource-directive');
        assert.lengthOf(resourceRows, 1);
        const row = resourceRows[0];
        assert.strictEqual(row.cells[0].textContent, 'geolocation');
        assert.isEmpty(row.cells[2].textContent);
    });
    it('handles issues with empty stack trace', () => {
        const issueDetailsWithEmptyStack = {
            apiName: 'geolocation',
            stackTrace: {
                callFrames: [],
            },
            adAncestry: {
                ancestryChain: [],
            },
        };
        const issue = createProtocolIssueWithDetails(issueDetailsWithEmptyStack);
        const interventionIssues = IssuesManager.SelectivePermissionsInterventionIssue.SelectivePermissionsInterventionIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(interventionIssues, 1);
        const interventionIssue = interventionIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(interventionIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(interventionIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedSelectivePermissionsInterventionView.AffectedSelectivePermissionsInterventionView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        view.update();
        const resourceRows = view.affectedResources.querySelectorAll('.affected-resource-directive');
        assert.lengthOf(resourceRows, 1);
        const row = resourceRows[0];
        assert.strictEqual(row.cells[0].textContent, 'geolocation');
        assert.exists(row.cells[1]);
    });
    it('re-renders correctly on multiple updates', () => {
        const issue = createProtocolIssueWithDetails(issueDetails);
        const interventionIssues = IssuesManager.SelectivePermissionsInterventionIssue.SelectivePermissionsInterventionIssue.fromInspectorIssue(mockModel, issue);
        const interventionIssue = interventionIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(interventionIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(interventionIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedSelectivePermissionsInterventionView.AffectedSelectivePermissionsInterventionView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        // First update
        view.update();
        let resourceRows = view.affectedResources.querySelectorAll('.affected-resource-directive');
        assert.lengthOf(resourceRows, 1);
        // Second update
        view.update();
        resourceRows = view.affectedResources.querySelectorAll('.affected-resource-directive');
        // Should still have exactly 1 row (not 0, and not 2 if it was appending instead of replacing)
        assert.lengthOf(resourceRows, 1);
        const row = resourceRows[0];
        assert.strictEqual(row.cells[0].textContent, 'geolocation');
    });
});
//# sourceMappingURL=AffectedSelectivePermissionsInterventionView.test.js.map