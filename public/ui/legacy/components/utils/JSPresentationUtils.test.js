// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Bindings from '../../../../models/bindings/bindings.js';
import * as StackTrace from '../../../../models/stack_trace/stack_trace.js';
import * as Workspace from '../../../../models/workspace/workspace.js';
import { createTarget } from '../../../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../../../testing/MockConnection.js';
import * as Components from './utils.js';
// TODO(crbug.com/456517732): remove when all usages of runtimeStackTrace are migrated.
describeWithMockConnection('JSPresentationUtils (legacy stack trace)', () => {
    function setUpEnvironment() {
        const target = createTarget();
        const linkifier = new Components.Linkifier.Linkifier(100, false);
        linkifier.targetAdded(target);
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        const targetManager = target.targetManager();
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(targetManager, workspace);
        const ignoreListManager = Workspace.IgnoreListManager.IgnoreListManager.instance({ forceNew: true });
        Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager,
            ignoreListManager,
        });
        return { target, linkifier };
    }
    function checkLinkContentForStackTracePreview(url, expectedLinkContent) {
        const { target, linkifier } = setUpEnvironment();
        const callFrame = { scriptId: 'scriptId', functionName: 'func', url, lineNumber: 0, columnNumber: 0 };
        const stackTrace = { callFrames: [callFrame] };
        const options = { tabStops: false, runtimeStackTrace: stackTrace };
        const { linkElements: links } = new Components.JSPresentationUtils.StackTracePreviewContent(undefined, target, linkifier, options);
        assert.lengthOf(links, 1);
        assert.strictEqual(links[0].textContent, expectedLinkContent);
    }
    it('uses \'unknown\' as link content if url is not available', () => {
        const url = '';
        const expectedLinkContent = 'unknown';
        checkLinkContentForStackTracePreview(url, expectedLinkContent);
    });
    it('uses url as link content if url is available', () => {
        const url = 'https://www.google.com/script.js';
        const expectedLinkContent = 'www.google.com/script.js:1';
        checkLinkContentForStackTracePreview(url, expectedLinkContent);
    });
});
describeWithMockConnection('JSPresentationUtils', () => {
    function setUpEnvironment() {
        const target = createTarget();
        const linkifier = new Components.Linkifier.Linkifier(100, false);
        linkifier.targetAdded(target);
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        const targetManager = target.targetManager();
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(targetManager, workspace);
        const ignoreListManager = Workspace.IgnoreListManager.IgnoreListManager.instance({ forceNew: true });
        const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager,
            ignoreListManager,
        });
        return { target, debuggerWorkspaceBinding, linkifier };
    }
    async function createStackTrace(target, debuggerWorkspaceBinding) {
        const url = 'https://www.google.com/script.js';
        const scriptId = '1';
        return await debuggerWorkspaceBinding.createStackTraceFromProtocolRuntime({
            callFrames: [
                { scriptId, url, lineNumber: 0, columnNumber: 10, functionName: 'foo' },
                { scriptId, url: 'bar.js', lineNumber: 1, columnNumber: 20, functionName: 'bar' },
                { scriptId, url: 'baz.js', lineNumber: 2, columnNumber: 30, functionName: 'baz' },
            ],
        }, target);
    }
    function checkLinkContentForStackTracePreview(target, linkifier, stackTrace, expectedNumLinks, expectedLinkContent) {
        const options = { tabStops: false, stackTrace };
        const { linkElements: links } = new Components.JSPresentationUtils.StackTracePreviewContent(undefined, target, linkifier, options);
        assert.lengthOf(links, expectedNumLinks);
        assert.strictEqual(links[0].textContent, expectedLinkContent);
    }
    it('renders stack trace, and re-renders on update', async () => {
        const { target, debuggerWorkspaceBinding, linkifier } = setUpEnvironment();
        const stackTrace = await createStackTrace(target, debuggerWorkspaceBinding);
        const expectedNumLinks = 3;
        checkLinkContentForStackTracePreview(target, linkifier, stackTrace, expectedNumLinks, 'www.google.com/script.js:1');
        // Modify stack trace and re-render.
        // @ts-expect-error
        stackTrace.syncFragment.frames[0].line = 100;
        stackTrace.dispatchEventToListeners("UPDATED" /* StackTrace.StackTrace.Events.UPDATED */);
        checkLinkContentForStackTracePreview(target, linkifier, stackTrace, expectedNumLinks, 'www.google.com/script.js:101');
    });
});
//# sourceMappingURL=JSPresentationUtils.test.js.map