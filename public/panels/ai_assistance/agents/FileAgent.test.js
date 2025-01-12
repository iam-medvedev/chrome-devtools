// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as Platform from '../../../core/platform/platform.js';
import * as SDK from '../../../core/sdk/sdk.js';
import * as Bindings from '../../../models/bindings/bindings.js';
import * as Logs from '../../../models/logs/logs.js';
import * as Workspace from '../../../models/workspace/workspace.js';
import { createTarget, getGetHostConfigStub, } from '../../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../../testing/MockConnection.js';
import { loadBasicSourceMapExample } from '../../../testing/SourceMapHelpers.js';
import { createContentProviderUISourceCodes } from '../../../testing/UISourceCodeHelpers.js';
import { FileAgent, FileContext, formatFile, formatSourceMapDetails } from '../ai_assistance.js';
const { urlString } = Platform.DevToolsPath;
describeWithMockConnection('FileAgent', () => {
    function mockHostConfig(modelId, temperature) {
        getGetHostConfigStub({
            devToolsAiAssistanceFileAgent: {
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
    beforeEach(() => {
        const workspace = Workspace.Workspace.WorkspaceImpl.instance();
        const targetManager = SDK.TargetManager.TargetManager.instance();
        const resourceMapping = new Bindings.ResourceMapping.ResourceMapping(targetManager, workspace);
        const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
            forceNew: true,
            resourceMapping,
            targetManager,
        });
        Bindings.IgnoreListManager.IgnoreListManager.instance({ forceNew: true, debuggerWorkspaceBinding });
    });
    afterEach(() => {
        sinon.restore();
    });
    describe('buildRequest', () => {
        beforeEach(() => {
            sinon.restore();
        });
        it('builds a request with a model id', async () => {
            mockHostConfig('test model');
            const agent = new FileAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with a temperature', async () => {
            mockHostConfig('test model', 1);
            const agent = new FileAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.temperature, 1);
        });
        it('structure matches the snapshot', () => {
            mockHostConfig('test model');
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
            const agent = new FileAgent({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            sinon.stub(agent, 'preamble').value('preamble');
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'question',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'question',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'answer',
                },
            ];
            assert.deepEqual(agent.buildRequest({
                text: 'test input',
            }), {
                current_message: { parts: [{ text: 'test input' }], role: Host.AidaClient.Role.USER },
                client: 'CHROME_DEVTOOLS',
                preamble: 'preamble',
                historical_contexts: [
                    {
                        role: 1,
                        parts: [{ text: 'question' }],
                    },
                    {
                        role: 2,
                        parts: [{ text: 'answer' }],
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
    async function createUISourceCode(options) {
        const url = options?.url ?? urlString `http://example.test/script.js`;
        const { project } = createContentProviderUISourceCodes({
            items: [
                {
                    url,
                    mimeType: options?.mimeType ?? 'application/javascript',
                    resourceType: options?.resourceType ?? Common.ResourceType.resourceTypes.Script,
                    content: options?.content ?? undefined,
                },
            ],
            target: createTarget(),
        });
        const uiSourceCode = project.uiSourceCodeForURL(url);
        if (!uiSourceCode) {
            throw new Error('Failed to create a test uiSourceCode');
        }
        if (!uiSourceCode.contentType().isTextType()) {
            uiSourceCode?.setContent('binary', true);
        }
        if (options?.requestContentData) {
            await uiSourceCode.requestContentData();
        }
        return uiSourceCode;
    }
    function createNetworkRequest() {
        const networkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', urlString `https://www.example.com/script.js`, urlString ``, null, null, null);
        networkRequest.statusCode = 200;
        networkRequest.setRequestHeaders([{ name: 'content-type', value: 'bar1' }]);
        networkRequest.responseHeaders = [{ name: 'content-type', value: 'bar2' }, { name: 'x-forwarded-for', value: 'bar3' }];
        const initiatorNetworkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', urlString `https://www.initiator.com`, urlString ``, null, null, null);
        const initiatedNetworkRequest1 = SDK.NetworkRequest.NetworkRequest.create('requestId', urlString `https://www.example.com/1`, urlString ``, null, null, null);
        const initiatedNetworkRequest2 = SDK.NetworkRequest.NetworkRequest.create('requestId', urlString `https://www.example.com/2`, urlString ``, null, null, null);
        sinon.stub(Logs.NetworkLog.NetworkLog.instance(), 'initiatorGraphForRequest')
            .withArgs(networkRequest)
            .returns({
            initiators: new Set([networkRequest, initiatorNetworkRequest]),
            initiated: new Map([
                [networkRequest, initiatorNetworkRequest],
                [initiatedNetworkRequest1, networkRequest],
                [initiatedNetworkRequest2, networkRequest],
            ]),
        })
            .withArgs(initiatedNetworkRequest1)
            .returns({
            initiators: new Set([]),
            initiated: new Map([
                [initiatedNetworkRequest1, networkRequest],
            ]),
        })
            .withArgs(initiatedNetworkRequest2)
            .returns({
            initiators: new Set([]),
            initiated: new Map([
                [initiatedNetworkRequest2, networkRequest],
            ]),
        });
        return networkRequest;
    }
    describe('run', () => {
        const testArguments = [
            {
                name: 'content loaded',
                requestContentData: true,
            },
            {
                name: 'content not loaded',
                requestContentData: false,
            },
        ];
        testArguments.forEach(args => {
            it('generates an answer ' + args.name, async () => {
                async function* generateAnswer() {
                    yield {
                        explanation: 'This is the answer',
                        metadata: {
                            rpcGlobalId: 123,
                        },
                        completed: true,
                    };
                }
                const agent = new FileAgent({
                    aidaClient: mockAidaClient(generateAnswer),
                });
                const uiSourceCode = await createUISourceCode({
                    requestContentData: args.requestContentData,
                    content: 'content',
                });
                const responses = await Array.fromAsync(agent.run('test', { selected: uiSourceCode ? new FileContext(uiSourceCode) : null }));
                assert.deepEqual(responses, [
                    {
                        type: "user-query" /* ResponseType.USER_QUERY */,
                        query: 'test',
                    },
                    {
                        type: "context" /* ResponseType.CONTEXT */,
                        title: 'Analyzing file',
                        details: [
                            {
                                title: 'Selected file',
                                text: `File name: script.js
URL: http://example.test/script.js
File content:
\`\`\`
content
\`\`\``,
                            },
                        ],
                    },
                    {
                        type: "querying" /* ResponseType.QUERYING */,
                        query: `# Selected file
File name: script.js
URL: http://example.test/script.js
File content:
\`\`\`
content
\`\`\`

# User request

test`,
                    },
                    {
                        type: "answer" /* ResponseType.ANSWER */,
                        text: 'This is the answer',
                        suggestions: undefined,
                        rpcId: 123,
                    },
                ]);
                assert.deepEqual(agent.chatHistoryForTesting, [
                    {
                        role: 1,
                        parts: [{
                                text: `# Selected file
File name: script.js
URL: http://example.test/script.js
File content:
\`\`\`
content
\`\`\`

# User request

test`,
                            }],
                    },
                    {
                        role: 2,
                        parts: [{ text: 'This is the answer' }],
                    },
                ]);
            });
        });
    });
    describe('formatSourceMapDetails', () => {
        it('returns source map', async () => {
            const target = createTarget();
            const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
            const debuggerModel = target.model(SDK.DebuggerModel.DebuggerModel);
            assert.exists(debuggerModel);
            const script = (await loadBasicSourceMapExample(target)).script;
            const uiSourceCode = debuggerWorkspaceBinding.uiSourceCodeForScript(script);
            assert.exists(uiSourceCode);
            const response = formatSourceMapDetails(uiSourceCode, debuggerWorkspaceBinding);
            assert.strictEqual(response, 'Source map: file://gen.js.map');
        });
    });
    describe('formatFile', () => {
        it('formats file content', async () => {
            const uiSourceCode = await createUISourceCode({
                content: 'lorem ipsum',
                requestContentData: true,
            });
            assert.strictEqual(formatFile(uiSourceCode), `File name: script.js
URL: http://example.test/script.js
File content:
\`\`\`
lorem ipsum
\`\`\``);
        });
        it('formats file with associated request initiator chain', async () => {
            const networkRequest = createNetworkRequest();
            const uiSourceCode = await createUISourceCode({
                content: 'lorem ipsum',
                requestContentData: true,
                url: networkRequest.url(),
            });
            sinon.stub(SDK.ResourceTreeModel.ResourceTreeModel.prototype, 'resourceForURL')
                .withArgs(networkRequest.url())
                .returns({ request: networkRequest });
            assert.strictEqual(formatFile(uiSourceCode), `File name: script.js
URL: https://www.example.com/script.js
Request initiator chain:
- URL: <redacted cross-origin initiator URL>
\t- URL: https://www.example.com/script.js
\t\t- URL: https://www.example.com/1
\t\t- URL: https://www.example.com/2
File content:
\`\`\`
lorem ipsum
\`\`\``);
        });
        it('formats file content of a binary file', async () => {
            const uiSourceCode = await createUISourceCode({
                resourceType: Common.ResourceType.resourceTypes.Image,
                mimeType: 'application/png',
                url: urlString `http://example.test/test.png`,
                requestContentData: true,
            });
            assert.strictEqual(formatFile(uiSourceCode), `File name: test.png
URL: http://example.test/test.png
File content:
\`\`\`
<binary data>
\`\`\``);
        });
        it('truncates long file content', async () => {
            const uiSourceCode = await createUISourceCode({
                content: 'lorem ipsum'.repeat(10_000),
                requestContentData: true,
            });
            assert.strictEqual(formatFile(uiSourceCode), `File name: script.js
URL: http://example.test/script.js
File content:
\`\`\`
lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsuml...
\`\`\``);
        });
    });
});
//# sourceMappingURL=FileAgent.test.js.map