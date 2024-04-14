// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assertNotNullOrUndefined } from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { createFakeSetting, createTarget, describeWithEnvironment, } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { MockIssuesManager } from '../../testing/MockIssuesManager.js';
import { StubIssue } from '../../testing/StubIssue.js';
import * as Issues from './issues.js';
describeWithEnvironment('AggregatedIssue', () => {
    const aggregationKey = 'key';
    it('deduplicates network requests across issues', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1', 'id2']);
        const issue2 = StubIssue.createFromRequestIds(['id1']);
        const aggregatedIssue = new Issues.IssueAggregator.AggregatedIssue('code', aggregationKey);
        aggregatedIssue.addInstance(issue1);
        aggregatedIssue.addInstance(issue2);
        const actualRequestIds = [...aggregatedIssue.requests()].map(r => r.requestId).sort();
        assert.deepStrictEqual(actualRequestIds, ['id1', 'id2']);
    });
    it('deduplicates affected cookies across issues', () => {
        const issue1 = StubIssue.createFromCookieNames(['cookie1']);
        const issue2 = StubIssue.createFromCookieNames(['cookie2']);
        const issue3 = StubIssue.createFromCookieNames(['cookie1', 'cookie2']);
        const aggregatedIssue = new Issues.IssueAggregator.AggregatedIssue('code', aggregationKey);
        aggregatedIssue.addInstance(issue1);
        aggregatedIssue.addInstance(issue2);
        aggregatedIssue.addInstance(issue3);
        const actualCookieNames = [...aggregatedIssue.cookies()].map(c => c.name).sort();
        assert.deepStrictEqual(actualCookieNames, ['cookie1', 'cookie2']);
    });
});
function createModel() {
    const target = createTarget();
    const model = target.model(SDK.IssuesModel.IssuesModel);
    assertNotNullOrUndefined(model);
    return model;
}
describeWithMockConnection('IssueAggregator', () => {
    it('deduplicates issues with the same code', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1']);
        const issue2 = StubIssue.createFromRequestIds(['id2']);
        const model = createModel();
        const mockManager = new MockIssuesManager([]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.strictEqual(issues.length, 1);
        const requestIds = [...issues[0].requests()].map(r => r.requestId).sort();
        assert.deepStrictEqual(requestIds, ['id1', 'id2']);
    });
    it('deduplicates issues with the same code added before its creation', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1']);
        const issue2 = StubIssue.createFromRequestIds(['id2']);
        const issue1b = StubIssue.createFromRequestIds(['id1']); // Duplicate id.
        const issue3 = StubIssue.createFromRequestIds(['id3']);
        const model = createModel();
        const mockManager = new MockIssuesManager([issue1b, issue3]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.strictEqual(issues.length, 1);
        const requestIds = [...issues[0].requests()].map(r => r.requestId).sort();
        assert.deepStrictEqual(requestIds, ['id1', 'id2', 'id3']);
    });
    it('keeps issues with different codes separate', () => {
        const issue1 = new StubIssue('codeA', ['id1'], []);
        const issue2 = new StubIssue('codeB', ['id1'], []);
        const issue1b = new StubIssue('codeC', ['id1'], []);
        const issue3 = new StubIssue('codeA', ['id1'], []);
        const model = createModel();
        const mockManager = new MockIssuesManager([issue1b, issue3]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.strictEqual(issues.length, 3);
        const issueCodes = issues.map(r => r.aggregationKey().toString()).sort((a, b) => a.localeCompare(b));
        assert.deepStrictEqual(issueCodes, ['codeA', 'codeB', 'codeC']);
    });
    describe('aggregates issue kind', () => {
        it('for a single issue', () => {
            const issues = StubIssue.createFromIssueKinds(["Improvement" /* IssuesManager.Issue.IssueKind.Improvement */]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.strictEqual(aggregatedIssues.length, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "Improvement" /* IssuesManager.Issue.IssueKind.Improvement */);
        });
        it('for issues of two different kinds', () => {
            const issues = StubIssue.createFromIssueKinds([
                "Improvement" /* IssuesManager.Issue.IssueKind.Improvement */,
                "BreakingChange" /* IssuesManager.Issue.IssueKind.BreakingChange */,
                "Improvement" /* IssuesManager.Issue.IssueKind.Improvement */,
            ]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.strictEqual(aggregatedIssues.length, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "BreakingChange" /* IssuesManager.Issue.IssueKind.BreakingChange */);
        });
        it('for issues of three different kinds', () => {
            const issues = StubIssue.createFromIssueKinds([
                "BreakingChange" /* IssuesManager.Issue.IssueKind.BreakingChange */,
                "PageError" /* IssuesManager.Issue.IssueKind.PageError */,
                "Improvement" /* IssuesManager.Issue.IssueKind.Improvement */,
            ]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.strictEqual(aggregatedIssues.length, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PageError */);
        });
    });
});
describeWithMockConnection('IssueAggregator', () => {
    it('aggregates heavy ad issues correctly', () => {
        const model = createModel();
        const details1 = {
            resolution: "HeavyAdBlocked" /* Protocol.Audits.HeavyAdResolutionStatus.HeavyAdBlocked */,
            reason: "CpuPeakLimit" /* Protocol.Audits.HeavyAdReason.CpuPeakLimit */,
            frame: { frameId: 'main' },
        };
        const issue1 = new IssuesManager.HeavyAdIssue.HeavyAdIssue(details1, model);
        const details2 = {
            resolution: "HeavyAdWarning" /* Protocol.Audits.HeavyAdResolutionStatus.HeavyAdWarning */,
            reason: "NetworkTotalLimit" /* Protocol.Audits.HeavyAdReason.NetworkTotalLimit */,
            frame: { frameId: 'main' },
        };
        const issue2 = new IssuesManager.HeavyAdIssue.HeavyAdIssue(details2, model);
        const mockManager = new MockIssuesManager([]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.strictEqual(issues.length, 1);
        const resolutions = [...issues[0].getHeavyAdIssues()].map(r => r.details().resolution).sort();
        assert.deepStrictEqual(resolutions, [
            "HeavyAdBlocked" /* Protocol.Audits.HeavyAdResolutionStatus.HeavyAdBlocked */,
            "HeavyAdWarning" /* Protocol.Audits.HeavyAdResolutionStatus.HeavyAdWarning */,
        ]);
    });
    const scriptId1 = '1';
    describe('IssueAggregator', () => {
        it('aggregates affected locations correctly', () => {
            const model = createModel();
            const issue1 = StubIssue.createFromAffectedLocations([{ url: 'foo', lineNumber: 1, columnNumber: 1 }]);
            const issue2 = StubIssue.createFromAffectedLocations([
                { url: 'foo', lineNumber: 1, columnNumber: 1 },
                { url: 'foo', lineNumber: 1, columnNumber: 12 },
            ]);
            const issue3 = StubIssue.createFromAffectedLocations([
                { url: 'bar', lineNumber: 1, columnNumber: 1 },
                { url: 'baz', lineNumber: 1, columnNumber: 1 },
            ]);
            const issue4 = StubIssue.createFromAffectedLocations([
                { url: 'bar', lineNumber: 1, columnNumber: 1, scriptId: scriptId1 },
                { url: 'foo', lineNumber: 2, columnNumber: 1 },
            ]);
            const mockManager = new MockIssuesManager([]);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            for (const issue of [issue1, issue2, issue3, issue4]) {
                mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.IssueAdded */, { issuesModel: model, issue: issue });
            }
            const issues = Array.from(aggregator.aggregatedIssues());
            assert.strictEqual(issues.length, 1);
            const locations = [...issues[0].sources()].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
            assert.deepStrictEqual(locations, [
                { url: 'bar', lineNumber: 1, columnNumber: 1, scriptId: scriptId1 },
                { url: 'bar', lineNumber: 1, columnNumber: 1 },
                { url: 'baz', lineNumber: 1, columnNumber: 1 },
                { url: 'foo', lineNumber: 1, columnNumber: 1 },
                { url: 'foo', lineNumber: 1, columnNumber: 12 },
                { url: 'foo', lineNumber: 2, columnNumber: 1 },
            ]);
        });
    });
});
describeWithMockConnection('IssueAggregator', () => {
    let hideIssueByCodeSetting;
    let showThirdPartyIssuesSetting;
    let issuesManager;
    let model;
    let aggregator;
    beforeEach(() => {
        hideIssueByCodeSetting =
            createFakeSetting('hide by code', {});
        showThirdPartyIssuesSetting = createFakeSetting('third party flag', false);
        issuesManager = new IssuesManager.IssuesManager.IssuesManager(showThirdPartyIssuesSetting, hideIssueByCodeSetting);
        const target = createTarget();
        model = target.model(SDK.IssuesModel.IssuesModel);
        aggregator = new Issues.IssueAggregator.IssueAggregator(issuesManager);
    });
    it('aggregates hidden issues correctly', () => {
        const issues = [
            new StubIssue('HiddenStubIssue1', [], []),
            new StubIssue('HiddenStubIssue2', [], []),
            new StubIssue('UnhiddenStubIssue1', [], []),
            new StubIssue('UnhiddenStubIssue2', [], []),
        ];
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'HiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        for (const issue of issues) {
            issuesManager.addIssue(model, issue);
        }
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 2);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 2);
    });
    it('aggregates hidden issues correctly on updating settings', () => {
        const issues = [
            new StubIssue('HiddenStubIssue1', [], []),
            new StubIssue('HiddenStubIssue2', [], []),
            new StubIssue('UnhiddenStubIssue1', [], []),
            new StubIssue('UnhiddenStubIssue2', [], []),
        ];
        for (const issue of issues) {
            issuesManager.addIssue(model, issue);
        }
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 3);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 1);
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'HiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 2);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 2);
    });
    it('aggregates hidden issues correctly when issues get unhidden', () => {
        const issues = [
            new StubIssue('HiddenStubIssue1', [], []),
            new StubIssue('HiddenStubIssue2', [], []),
            new StubIssue('UnhiddenStubIssue1', [], []),
            new StubIssue('UnhiddenStubIssue2', [], []),
        ];
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'HiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'UnhiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'UnhiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        for (const issue of issues) {
            issuesManager.addIssue(model, issue);
        }
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 4);
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 0);
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'HiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'UnhiddenStubIssue1': "Unhidden" /* IssuesManager.IssuesManager.IssueStatus.Unhidden */,
            'UnhiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 1);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 3);
    });
    it('aggregates hidden issues correctly when all issues get unhidden', () => {
        const issues = [
            new StubIssue('HiddenStubIssue1', [], []),
            new StubIssue('HiddenStubIssue2', [], []),
            new StubIssue('UnhiddenStubIssue1', [], []),
            new StubIssue('UnhiddenStubIssue2', [], []),
        ];
        hideIssueByCodeSetting.set({
            'HiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'HiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'UnhiddenStubIssue1': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
            'UnhiddenStubIssue2': "Hidden" /* IssuesManager.IssuesManager.IssueStatus.Hidden */,
        });
        for (const issue of issues) {
            issuesManager.addIssue(model, issue);
        }
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 4);
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 0);
        issuesManager.unhideAllIssues();
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 4);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 0);
    });
});
//# sourceMappingURL=IssueAggregator.test.js.map