// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import * as Platform from '../../../core/platform/platform.js';
import * as Workspace from '../../../models/workspace/workspace.js';
import { mockAidaClient } from '../../../testing/AiAssistanceHelpers.js';
import { describeWithEnvironment, updateHostConfig } from '../../../testing/EnvironmentHelpers.js';
import { createContentProviderUISourceCode } from '../../../testing/UISourceCodeHelpers.js';
import { FileUpdateAgent, PatchAgent } from '../ai_assistance.js';
/**
 * TODO: the following tests have to be added:
 *
 * - listFiles should have restricted view on files (node_modules etc).
 * - searchInFiles should work with dirty UiSourceCodes.
 * - updateFiles should verify better that working copies are updated.
 */
describeWithEnvironment('PatchAgent', () => {
    async function testAgent(mock, fileAgentMock) {
        const { uiSourceCode } = createContentProviderUISourceCode({
            url: Platform.DevToolsPath.urlString `https://example.com/example.html`,
            projectType: Workspace.Workspace.projectTypes.Network,
            mimeType: 'text/html',
            content: 'content',
        });
        uiSourceCode.setWorkingCopy('content working copy');
        const agent = new PatchAgent({
            aidaClient: mockAidaClient(mock),
            fileUpdateAgent: new FileUpdateAgent({
                aidaClient: mockAidaClient(fileAgentMock),
            })
        });
        const { responses } = await agent.applyChanges('summary');
        return responses;
    }
    it('calls listFiles', async () => {
        const responses = await testAgent([
            [{ explanation: '', functionCalls: [{ name: 'listFiles', args: {} }] }], [{
                    explanation: 'done',
                }]
        ]);
        const action = responses.find(response => response.type === "action" /* ResponseType.ACTION */);
        assert.exists(action);
        assert.deepEqual(action, {
            type: 'action',
            output: '{"files":["/example.html"]}',
            canceled: false,
            code: undefined,
        });
    });
    it('calls searchInFiles', async () => {
        const responses = await testAgent([
            [{
                    explanation: '',
                    functionCalls: [{
                            name: 'searchInFiles',
                            args: {
                                query: 'content',
                            }
                        }]
                }],
            [{
                    explanation: 'done',
                }]
        ]);
        const action = responses.find(response => response.type === "action" /* ResponseType.ACTION */);
        assert.exists(action);
        assert.deepEqual(action, {
            type: 'action',
            output: '{"matches":[{"filepath":"/example.html","lineNumber":0,"columnNumber":0,"matchLength":7}]}',
            canceled: false,
            code: undefined
        });
    });
    it('calls updateFiles', async () => {
        const responses = await testAgent([
            [{ explanation: '', functionCalls: [{ name: 'updateFiles', args: { files: ['/example.html'] } }] }], [{
                    explanation: 'done',
                }]
        ], [[{
                    explanation: 'file updated',
                }]]);
        const action = responses.find(response => response.type === "action" /* ResponseType.ACTION */);
        assert.exists(action);
        assert.deepEqual(action, { type: 'action', output: '{"success":true}', code: undefined, canceled: false });
    });
    it('builds a request with a user tier', async () => {
        updateHostConfig({
            devToolsFreestyler: {
                userTier: 'PUBLIC',
            },
        });
        createContentProviderUISourceCode({
            url: Platform.DevToolsPath.urlString `file:///path/to/overrides/example.html`,
            mimeType: 'text/html',
            content: 'content',
        });
        const agent = new PatchAgent({
            aidaClient: mockAidaClient(),
            fileUpdateAgent: new FileUpdateAgent({
                aidaClient: mockAidaClient(),
            })
        });
        assert.strictEqual(agent.buildRequest({ text: 'test input' }, Host.AidaClient.Role.USER).metadata?.user_tier, 3);
    });
});
//# sourceMappingURL=PatchAgent.test.js.map