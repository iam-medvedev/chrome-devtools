// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { createTarget } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { MockExecutionContext } from '../../testing/MockExecutionContext.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as Snippets from './snippets.js';
const { urlString } = Platform.DevToolsPath;
describeWithMockConnection('ScriptSnippetFileSystem', () => {
    it('evaluates snippets with user gesture', async () => {
        UI.Context.Context.instance().setFlavor(SDK.RuntimeModel.ExecutionContext, new MockExecutionContext(createTarget()));
        const uiSourceCode = new Workspace.UISourceCode.UISourceCode({}, urlString `snippet://test.js`, Common.ResourceType.resourceTypes.Script);
        await Snippets.ScriptSnippetFileSystem.evaluateScriptSnippet(uiSourceCode);
        UI.Context.Context.instance().setFlavor(SDK.RuntimeModel.ExecutionContext, null);
    });
});
//# sourceMappingURL=ScriptSnippetFileSystem.test.js.map