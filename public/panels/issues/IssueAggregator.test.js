// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import { createFakeSetting, createTarget, describeWithEnvironment, } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { MockIssuesManager } from '../../testing/MockIssuesManager.js';
import { StubIssue } from '../../testing/StubIssue.js';
import * as Issues from './issues.js';
function requestIds(...issues) {
    const requestIds = new Set();
    for (const issue of issues) {
        for (const { requestId } of issue.requests()) {
            requestIds.add(requestId);
        }
    }
    return requestIds;
}
describeWithEnvironment('AggregatedIssue', () => {
    const aggregationKey = 'key';
    it('deduplicates network requests across issues', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1', 'id2']);
        const issue2 = StubIssue.createFromRequestIds(['id1']);
        const aggregatedIssue = new Issues.IssueAggregator.AggregatedIssue('code', aggregationKey);
        aggregatedIssue.addInstance(issue1);
        aggregatedIssue.addInstance(issue2);
        assert.deepEqual(requestIds(aggregatedIssue), new Set(['id1', 'id2']));
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
        assert.deepEqual(actualCookieNames, ['cookie1', 'cookie2']);
    });
});
function createModel() {
    const target = createTarget();
    const model = target.model(SDK.IssuesModel.IssuesModel);
    assert.exists(model);
    return model;
}
describeWithMockConnection('IssueAggregator', () => {
    it('deduplicates issues with the same code', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1']);
        const issue2 = StubIssue.createFromRequestIds(['id2']);
        const model = createModel();
        const mockManager = new MockIssuesManager([]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue2 });
        assert.deepEqual(requestIds(...aggregator.aggregatedIssues()), new Set(['id1', 'id2']));
    });
    it('deduplicates issues with the same code added before its creation', () => {
        const issue1 = StubIssue.createFromRequestIds(['id1']);
        const issue2 = StubIssue.createFromRequestIds(['id2']);
        const issue1b = StubIssue.createFromRequestIds(['id1']); // Duplicate id.
        const issue3 = StubIssue.createFromRequestIds(['id3']);
        const model = createModel();
        const mockManager = new MockIssuesManager([issue1b, issue3]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue2 });
        assert.deepEqual(requestIds(...aggregator.aggregatedIssues()), new Set(['id1', 'id2', 'id3']));
    });
    it('keeps issues with different codes separate', () => {
        const issue1 = new StubIssue('codeA', ['id1'], []);
        const issue2 = new StubIssue('codeB', ['id1'], []);
        const issue1b = new StubIssue('codeC', ['id1'], []);
        const issue3 = new StubIssue('codeA', ['id1'], []);
        const model = createModel();
        const mockManager = new MockIssuesManager([issue1b, issue3]);
        const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.lengthOf(issues, 3);
        const issueCodes = issues.map(r => r.aggregationKey().toString()).sort((a, b) => a.localeCompare(b));
        assert.deepEqual(issueCodes, ['codeA', 'codeB', 'codeC']);
    });
    describe('aggregates issue kind', () => {
        it('for a single issue', () => {
            const issues = StubIssue.createFromIssueKinds(["Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.lengthOf(aggregatedIssues, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */);
        });
        it('for issues of two different kinds', () => {
            const issues = StubIssue.createFromIssueKinds([
                "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */,
                "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */,
                "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */,
            ]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.lengthOf(aggregatedIssues, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */);
        });
        it('for issues of three different kinds', () => {
            const issues = StubIssue.createFromIssueKinds([
                "BreakingChange" /* IssuesManager.Issue.IssueKind.BREAKING_CHANGE */,
                "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */,
                "Improvement" /* IssuesManager.Issue.IssueKind.IMPROVEMENT */,
            ]);
            const mockManager = new MockIssuesManager(issues);
            const aggregator = new Issues.IssueAggregator.IssueAggregator(mockManager);
            const aggregatedIssues = Array.from(aggregator.aggregatedIssues());
            assert.lengthOf(aggregatedIssues, 1);
            const aggregatedIssue = aggregatedIssues[0];
            assert.strictEqual(aggregatedIssue.getKind(), "PageError" /* IssuesManager.Issue.IssueKind.PAGE_ERROR */);
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
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue1 });
        mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue: issue2 });
        const issues = Array.from(aggregator.aggregatedIssues());
        assert.lengthOf(issues, 1);
        const resolutions = [...issues[0].getHeavyAdIssues()].map(r => r.details().resolution).sort();
        assert.deepEqual(resolutions, [
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
                mockManager.dispatchEventToListeners("IssueAdded" /* IssuesManager.IssuesManager.Events.ISSUE_ADDED */, { issuesModel: model, issue });
            }
            const issues = Array.from(aggregator.aggregatedIssues());
            assert.lengthOf(issues, 1);
            const locations = [...issues[0].sources()].sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
            assert.deepEqual(locations, [
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
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            HiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
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
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
        });
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 3);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 1);
        hideIssueByCodeSetting.set({
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            HiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
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
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            HiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            UnhiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            UnhiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
        });
        for (const issue of issues) {
            issuesManager.addIssue(model, issue);
        }
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 4);
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 0);
        hideIssueByCodeSetting.set({
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            HiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            UnhiddenStubIssue1: "Unhidden" /* IssuesManager.IssuesManager.IssueStatus.UNHIDDEN */,
            UnhiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
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
            HiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            HiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            UnhiddenStubIssue1: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
            UnhiddenStubIssue2: "Hidden" /* IssuesManager.IssuesManager.IssueStatus.HIDDEN */,
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
describeWithMockConnection('IssueAggregator', () => {
    function getTestCookieIssue(warningReason, exclusionReason) {
        return IssuesManager.IssuesManager.createIssuesFromProtocolIssue(model, {
            code: "CookieIssue" /* Protocol.Audits.InspectorIssueCode.CookieIssue */,
            details: {
                cookieIssueDetails: {
                    cookie: {
                        name: 'test',
                        path: '/',
                        domain: 'a.test',
                    },
                    cookieExclusionReasons: exclusionReason ? [exclusionReason] : [],
                    cookieWarningReasons: warningReason ? [warningReason] : [],
                    operation: "ReadCookie" /* Protocol.Audits.CookieOperation.ReadCookie */,
                    cookieUrl: 'a.test',
                },
            },
        })[0];
    }
    let issuesManager;
    let model;
    beforeEach(() => {
        const showThirdPartyIssuesSetting = createFakeSetting('third party flag', true);
        issuesManager = new IssuesManager.IssuesManager.IssuesManager(showThirdPartyIssuesSetting);
        const target = createTarget();
        model = target.model(SDK.IssuesModel.IssuesModel);
    });
    it('should not aggregate third-party cookie phaseout or mitigation related issues', async () => {
        // Preexisting issues should not be added
        issuesManager.addIssue(model, getTestCookieIssue("WarnDeprecationTrialMetadata" /* Protocol.Audits.CookieWarningReason.WarnDeprecationTrialMetadata */));
        issuesManager.addIssue(model, getTestCookieIssue("WarnThirdPartyCookieHeuristic" /* Protocol.Audits.CookieWarningReason.WarnThirdPartyCookieHeuristic */));
        issuesManager.addIssue(model, getTestCookieIssue("WarnThirdPartyPhaseout" /* Protocol.Audits.CookieWarningReason.WarnThirdPartyPhaseout */));
        issuesManager.addIssue(model, getTestCookieIssue(undefined, "ExcludeThirdPartyPhaseout" /* Protocol.Audits.CookieExclusionReason.ExcludeThirdPartyPhaseout */));
        const aggregator = new Issues.IssueAggregator.IssueAggregator(issuesManager);
        // Issues added after aggregator creation should not exist either
        issuesManager.addIssue(model, getTestCookieIssue("WarnDeprecationTrialMetadata" /* Protocol.Audits.CookieWarningReason.WarnDeprecationTrialMetadata */));
        issuesManager.addIssue(model, getTestCookieIssue("WarnThirdPartyCookieHeuristic" /* Protocol.Audits.CookieWarningReason.WarnThirdPartyCookieHeuristic */));
        issuesManager.addIssue(model, getTestCookieIssue("WarnThirdPartyPhaseout" /* Protocol.Audits.CookieWarningReason.WarnThirdPartyPhaseout */));
        issuesManager.addIssue(model, getTestCookieIssue(undefined, "ExcludeThirdPartyPhaseout" /* Protocol.Audits.CookieExclusionReason.ExcludeThirdPartyPhaseout */));
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 0);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 0);
        // But other cookie issues should get aggregated
        issuesManager.addIssue(model, getTestCookieIssue("WarnDomainNonASCII" /* Protocol.Audits.CookieWarningReason.WarnDomainNonASCII */));
        issuesManager.addIssue(model, getTestCookieIssue(undefined, "ExcludeDomainNonASCII" /* Protocol.Audits.CookieExclusionReason.ExcludeDomainNonASCII */));
        assert.strictEqual(aggregator.numberOfAggregatedIssues(), 2);
        assert.strictEqual(aggregator.numberOfHiddenAggregatedIssues(), 0);
    });
});
//# sourceMappingURL=IssueAggregator.test.js.map