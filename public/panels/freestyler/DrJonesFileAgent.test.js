// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Workspace from '../../models/workspace/workspace.js';
import { createTarget, describeWithEnvironment, getGetHostConfigStub, } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { createContentProviderUISourceCodes } from '../../testing/UISourceCodeHelpers.js';
import { DrJonesFileAgent, ResponseType } from './freestyler.js';
describeWithEnvironment('DrJonesFileAgent', () => {
    function mockHostConfig(modelId, temperature) {
        getGetHostConfigStub({
            devToolsAiAssistanceFileAgentDogfood: {
                modelId,
                temperature,
            },
        });
    }
    function mockAidaClient(fetch) {
        return {
            fetch,
            registerClientEvent: () => Promise.resolve({}),
        };
    }
    describe('buildRequest', () => {
        beforeEach(() => {
            sinon.restore();
        });
        it('builds a request with a model id', async () => {
            mockHostConfig('test model');
            const agent = new DrJonesFileAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with a temperature', async () => {
            mockHostConfig('test model', 1);
            const agent = new DrJonesFileAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.temperature, 1);
        });
        it('structure matches the snapshot', () => {
            mockHostConfig('test model');
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
            const agent = new DrJonesFileAgent({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            sinon.stub(agent, 'preamble').value('preamble');
            agent.chatHistoryForTesting = new Map([[
                    0,
                    [
                        {
                            text: 'first',
                            entity: Host.AidaClient.Entity.UNKNOWN,
                        },
                        {
                            text: 'second',
                            entity: Host.AidaClient.Entity.SYSTEM,
                        },
                        {
                            text: 'third',
                            entity: Host.AidaClient.Entity.USER,
                        },
                    ],
                ]]);
            assert.deepStrictEqual(agent.buildRequest({
                input: 'test input',
            }), {
                input: 'test input',
                client: 'CHROME_DEVTOOLS',
                preamble: 'preamble',
                chat_history: [
                    {
                        entity: 0,
                        text: 'first',
                    },
                    {
                        entity: 2,
                        text: 'second',
                    },
                    {
                        entity: 1,
                        text: 'third',
                    },
                ],
                metadata: {
                    disable_user_content_logging: false,
                    string_session_id: 'sessionId',
                    user_tier: 2,
                },
                options: {
                    model_id: 'test model',
                    temperature: undefined,
                },
                client_feature: 9,
                functionality_type: 1,
            });
        });
    });
    describeWithMockConnection('run', () => {
        it('generates an answer', async () => {
            async function* generateAnswer() {
                yield {
                    explanation: 'This is the answer',
                    metadata: {
                        rpcGlobalId: 123,
                    },
                    completed: true,
                };
            }
            const agent = new DrJonesFileAgent({
                aidaClient: mockAidaClient(generateAnswer),
            });
            const url = 'http://example.com/script.js';
            const target = createTarget({ type: SDK.Target.Type.TAB });
            const { project } = createContentProviderUISourceCodes({
                items: [
                    {
                        url,
                        mimeType: 'application/javascript',
                        resourceType: Common.ResourceType.resourceTypes.Script,
                    },
                ],
                projectType: Workspace.Workspace.projectTypes.Network,
                target,
            });
            const uiSourceCode = project.uiSourceCodeForURL(url);
            const responses = await Array.fromAsync(agent.run('test', { selected: uiSourceCode }));
            assert.deepStrictEqual(responses, [
                {
                    type: ResponseType.CONTEXT,
                    title: 'Analyzing file',
                    details: [
                        {
                            title: 'Selected file',
                            text: `File Name: script.js
URL: http://example.com/script.js
File Content:
`,
                        },
                    ],
                },
                {
                    type: ResponseType.QUERYING,
                },
                {
                    type: ResponseType.ANSWER,
                    text: 'This is the answer',
                    suggestions: undefined,
                    rpcId: 123,
                },
            ]);
            assert.deepStrictEqual(agent.chatHistoryForTesting, [
                {
                    entity: 1,
                    text: `# Selected file\nFile Name: script.js
URL: http://example.com/script.js
File Content:\n\n\n# User request\n\ntest`,
                },
                {
                    entity: 2,
                    text: 'This is the answer',
                },
            ]);
        });
    });
});
//# sourceMappingURL=DrJonesFileAgent.test.js.map