// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { createContentProviderUISourceCode } from '../../testing/UISourceCodeHelpers.js';
import * as Coordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import * as Coverage from '../coverage/coverage.js';
import * as Sources from './sources.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithMockConnection('CoveragePlugin', () => {
    let target;
    let uiSourceCode;
    let model;
    let coverageInfo;
    const URL = 'test.js';
    beforeEach(() => {
        const tabTarget = createTarget({ type: SDK.Target.Type.Tab });
        createTarget({ parentTarget: tabTarget, subtype: 'prerender' });
        target = createTarget({ parentTarget: tabTarget });
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        const targetManager = SDK.TargetManager.TargetManager.instance();
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(targetManager, workspace);
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager,
        });
        Bindings.CSSWorkspaceBinding.CSSWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager,
        });
        model = target.model(Coverage.CoverageModel.CoverageModel);
        coverageInfo = new Coverage.CoverageModel.URLCoverageInfo(URL);
        coverageInfo.addToSizes(9, 28);
        sinon.stub(model, 'getCoverageForUrl').withArgs(URL).returns(coverageInfo);
        ({ uiSourceCode } = createContentProviderUISourceCode({ url: URL, mimeType: 'text/javascript' }));
    });
    it('shows stats', async () => {
        const coveragePlugin = new Sources.CoveragePlugin.CoveragePlugin(uiSourceCode, {});
        await coordinator.done({ waitForWork: true });
        const [toolbarItem] = coveragePlugin.rightToolbarItems();
        assert.strictEqual('Show Details', toolbarItem.element.shadowRoot?.querySelector('button')?.title);
        assert.strictEqual('Coverage: 32.1%', toolbarItem.element.textContent);
    });
    it('updates stats', async () => {
        const coveragePlugin = new Sources.CoveragePlugin.CoveragePlugin(uiSourceCode, {});
        await coordinator.done({ waitForWork: true });
        const [toolbarItem] = coveragePlugin.rightToolbarItems();
        assert.strictEqual('Coverage: 32.1%', toolbarItem.element.textContent);
        coverageInfo.addToSizes(10, 2);
        assert.strictEqual('Coverage: 63.3%', toolbarItem.element.textContent);
    });
    it('resets stats', async () => {
        const coveragePlugin = new Sources.CoveragePlugin.CoveragePlugin(uiSourceCode, {});
        await coordinator.done({ waitForWork: true });
        const [toolbarItem] = coveragePlugin.rightToolbarItems();
        assert.strictEqual('Coverage: 32.1%', toolbarItem.element.textContent);
        model.dispatchEventToListeners(Coverage.CoverageModel.Events.CoverageReset);
        assert.strictEqual('Click to show Coverage Panel', toolbarItem.element.ariaLabel);
        assert.strictEqual('Coverage: n/a', toolbarItem.element.textContent);
    });
});
//# sourceMappingURL=CoveragePlugin.test.js.map