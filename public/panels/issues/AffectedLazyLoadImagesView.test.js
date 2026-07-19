// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { assert } from 'chai';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { raf } from '../../testing/DOMHelpers.js';
import { createTarget, describeWithEnvironment } from '../../testing/EnvironmentHelpers.js';
import { setupLocaleHooks } from '../../testing/LocaleHelpers.js';
import { MockIssuesModel } from '../../testing/MockIssuesModel.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Issues from './issues.js';
describeWithEnvironment('AffectedLazyLoadImagesView', () => {
    setupLocaleHooks();
    const mockModel = new MockIssuesModel([]);
    let target;
    beforeEach(() => {
        const workspace = Workspace.Workspace.WorkspaceImpl.instance({ forceNew: true });
        const targetManager = SDK.TargetManager.TargetManager.instance();
        const ignoreListManager = Workspace.IgnoreListManager.IgnoreListManager.instance({ forceNew: true });
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping: new Bindings.ResourceMapping.ResourceMapping(targetManager, workspace),
            targetManager,
            ignoreListManager,
            workspace,
        });
        target = createTarget();
        mockModel.target = () => target;
    });
    function createProtocolIssueWithDetails(lazyLoadImageIssueDetails) {
        return {
            code: "LazyLoadImageIssue" /* Protocol.Audits.InspectorIssueCode.LazyLoadImageIssue */,
            details: { lazyLoadImageIssueDetails },
        };
    }
    const issueDetails = {
        nodeId: 42,
        url: 'https://example.com/image.png',
        frameId: 'main',
    };
    it('appends affected element details correctly', async () => {
        const issue = createProtocolIssueWithDetails(issueDetails);
        const lazyLoadIssues = IssuesManager.LazyLoadImageIssue.LazyLoadImageIssue.fromInspectorIssue(mockModel, issue);
        assert.lengthOf(lazyLoadIssues, 1);
        const lazyLoadIssue = lazyLoadIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(lazyLoadIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(lazyLoadIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedLazyLoadImagesView.AffectedLazyLoadImagesView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        view.update();
        await raf();
        const resourceRows = view.affectedResources.querySelectorAll('tr');
        assert.lengthOf(resourceRows, 1);
        const row = resourceRows[0];
        assert.exists(row.cells[0]);
    });
    it('re-renders correctly without duplicating rows on multiple updates', async () => {
        const issue = createProtocolIssueWithDetails(issueDetails);
        const lazyLoadIssues = IssuesManager.LazyLoadImageIssue.LazyLoadImageIssue.fromInspectorIssue(mockModel, issue);
        const lazyLoadIssue = lazyLoadIssues[0];
        const aggregationKey = 'key';
        const aggregatedIssue = new IssuesManager.IssueAggregator.AggregatedIssue(lazyLoadIssue.code(), aggregationKey);
        aggregatedIssue.addInstance(lazyLoadIssue);
        const mockIssueView = {
            updateAffectedResourceVisibility: () => { },
        };
        const view = new Issues.AffectedLazyLoadImagesView.AffectedLazyLoadImagesView(mockIssueView, aggregatedIssue, 'js-log-context');
        const treeOutline = new UI.TreeOutline.TreeOutline();
        treeOutline.appendChild(view);
        // First update
        view.update();
        await raf();
        let resourceRows = view.affectedResources.querySelectorAll('tr');
        assert.lengthOf(resourceRows, 1);
        // Second update
        view.update();
        await raf();
        resourceRows = view.affectedResources.querySelectorAll('tr');
        assert.lengthOf(resourceRows, 1);
    });
});
//# sourceMappingURL=AffectedLazyLoadImagesView.test.js.map