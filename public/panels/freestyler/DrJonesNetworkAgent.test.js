// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Logs from '../../models/logs/logs.js';
import { getGetHostConfigStub, } from '../../testing/EnvironmentHelpers.js';
import { describeWithMockConnection } from '../../testing/MockConnection.js';
import { createNetworkPanelForMockConnection } from '../../testing/NetworkHelpers.js';
import * as Coordinator from '../../ui/components/render_coordinator/render_coordinator.js';
import { allowHeader, DrJonesNetworkAgent, formatHeaders, formatInitiatorUrl, RequestContext, } from './freestyler.js';
const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();
describeWithMockConnection('DrJonesNetworkAgent', () => {
    let networkPanel;
    function mockHostConfig(modelId, temperature) {
        getGetHostConfigStub({
            devToolsAiAssistanceNetworkAgent: {
                modelId,
                temperature,
            },
        });
    }
    beforeEach(async () => {
        networkPanel = await createNetworkPanelForMockConnection();
    });
    afterEach(async () => {
        await coordinator.done();
        networkPanel.detach();
    });
    describe('buildRequest', () => {
        beforeEach(() => {
            sinon.restore();
        });
        it('builds a request with a model id', async () => {
            mockHostConfig('test model');
            const agent = new DrJonesNetworkAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with a temperature', async () => {
            mockHostConfig('test model', 1);
            const agent = new DrJonesNetworkAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.temperature, 1);
        });
        it('structure matches the snapshot', () => {
            mockHostConfig('test model');
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
            const agent = new DrJonesNetworkAgent({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            sinon.stub(agent, 'preamble').value('preamble');
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'questions',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'questions',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'answer',
                },
            ];
            assert.deepStrictEqual(agent.buildRequest({
                text: 'test input',
            }), {
                current_message: { parts: [{ text: 'test input' }], role: Host.AidaClient.Role.USER },
                client: 'CHROME_DEVTOOLS',
                preamble: 'preamble',
                historical_contexts: [
                    {
                        role: 1,
                        parts: [{ text: 'questions' }],
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
                client_feature: 7,
                functionality_type: 1,
            });
        });
    });
    describe('run', () => {
        let selectedNetworkRequest;
        const timingInfo = {
            requestTime: 500,
            proxyStart: 0,
            proxyEnd: 0,
            dnsStart: 0,
            dnsEnd: 0,
            connectStart: 0,
            connectEnd: 0,
            sslStart: 0,
            sslEnd: 0,
            sendStart: 800,
            sendEnd: 900,
            pushStart: 0,
            pushEnd: 0,
            receiveHeadersStart: 1000,
            receiveHeadersEnd: 0,
        };
        beforeEach(() => {
            selectedNetworkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', 'https://www.example.com', '', null, null, null);
            selectedNetworkRequest.statusCode = 200;
            selectedNetworkRequest.setRequestHeaders([{ name: 'content-type', value: 'bar1' }]);
            selectedNetworkRequest.responseHeaders =
                [{ name: 'content-type', value: 'bar2' }, { name: 'x-forwarded-for', value: 'bar3' }];
            selectedNetworkRequest.timing = timingInfo;
            const initiatorNetworkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', 'https://www.initiator.com', '', null, null, null);
            const initiatedNetworkRequest1 = SDK.NetworkRequest.NetworkRequest.create('requestId', 'https://www.example.com/1', '', null, null, null);
            const initiatedNetworkRequest2 = SDK.NetworkRequest.NetworkRequest.create('requestId', 'https://www.example.com/2', '', null, null, null);
            sinon.stub(Logs.NetworkLog.NetworkLog.instance(), 'initiatorGraphForRequest')
                .withArgs(selectedNetworkRequest)
                .returns({
                initiators: new Set([selectedNetworkRequest, initiatorNetworkRequest]),
                initiated: new Map([
                    [selectedNetworkRequest, initiatorNetworkRequest],
                    [initiatedNetworkRequest1, selectedNetworkRequest],
                    [initiatedNetworkRequest2, selectedNetworkRequest],
                ]),
            })
                .withArgs(initiatedNetworkRequest1)
                .returns({
                initiators: new Set([]),
                initiated: new Map([
                    [initiatedNetworkRequest1, selectedNetworkRequest],
                ]),
            })
                .withArgs(initiatedNetworkRequest2)
                .returns({
                initiators: new Set([]),
                initiated: new Map([
                    [initiatedNetworkRequest2, selectedNetworkRequest],
                ]),
            });
        });
        afterEach(() => {
            sinon.restore();
        });
        function mockAidaClient(fetch) {
            return {
                fetch,
                registerClientEvent: () => Promise.resolve({}),
            };
        }
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
            const agent = new DrJonesNetworkAgent({
                aidaClient: mockAidaClient(generateAnswer),
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new RequestContext(selectedNetworkRequest) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* ResponseType.CONTEXT */,
                    title: 'Analyzing network data',
                    details: [
                        {
                            title: 'Request',
                            text: 'Request URL: https://www.example.com\n\nRequest Headers\ncontent-type: bar1',
                        },
                        {
                            title: 'Response',
                            text: 'Response Status: 200 \n\nResponse Headers\ncontent-type: bar2\nx-forwarded-for: bar3',
                        },
                        {
                            title: 'Timing',
                            text: 'Queued at (timestamp): 0 μs\nStarted at (timestamp): 8.4 min\nQueueing (duration): 8.4 min\nConnection start (stalled) (duration): 800.00 ms\nRequest sent (duration): 100.00 ms\nDuration (duration): 8.4 min',
                        },
                        {
                            title: 'Request initiator chain',
                            text: `- URL: <redacted cross-origin initiator URL>
\t- URL: https://www.example.com
\t\t- URL: https://www.example.com/1
\t\t- URL: https://www.example.com/2`,
                        },
                    ],
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: '# Selected network request \nRequest: https://www.example.com\n\nRequest headers:\ncontent-type: bar1\n\nResponse headers:\ncontent-type: bar2\nx-forwarded-for: bar3\n\nResponse status: 200 \n\nRequest timing:\nQueued at (timestamp): 0 μs\nStarted at (timestamp): 8.4 min\nQueueing (duration): 8.4 min\nConnection start (stalled) (duration): 800.00 ms\nRequest sent (duration): 100.00 ms\nDuration (duration): 8.4 min\n\nRequest initiator chain:\n- URL: <redacted cross-origin initiator URL>\n\t- URL: https://www.example.com\n\t\t- URL: https://www.example.com/1\n\t\t- URL: https://www.example.com/2\n\n# User request\n\ntest',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'This is the answer',
                    suggestions: undefined,
                    rpcId: 123,
                },
            ]);
            assert.deepStrictEqual(agent.chatHistoryForTesting, [
                {
                    role: 1,
                    parts: [{
                            text: `# Selected network request \nRequest: https://www.example.com

Request headers:
content-type: bar1

Response headers:
content-type: bar2
x-forwarded-for: bar3

Response status: 200 \n
Request timing:
Queued at (timestamp): 0 μs
Started at (timestamp): 8.4 min
Queueing (duration): 8.4 min
Connection start (stalled) (duration): 800.00 ms
Request sent (duration): 100.00 ms
Duration (duration): 8.4 min

Request initiator chain:
- URL: <redacted cross-origin initiator URL>
\t- URL: https://www.example.com
\t\t- URL: https://www.example.com/1
\t\t- URL: https://www.example.com/2

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
    describe('allowHeader', () => {
        it('allows a header from the list', () => {
            assert.isTrue(allowHeader({ name: 'content-type', value: 'foo' }));
        });
        it('disallows headers not on the list', () => {
            assert.isFalse(allowHeader({ name: 'cookie', value: 'foo' }));
            assert.isFalse(allowHeader({ name: 'set-cookie', value: 'foo' }));
            assert.isFalse(allowHeader({ name: 'authorization', value: 'foo' }));
        });
    });
    describe('formatInitiatorUrl', () => {
        const tests = [
            {
                allowedResource: 'https://example.test',
                targetResource: 'https://example.test',
                shouldBeRedacted: false,
            },
            {
                allowedResource: 'https://example.test',
                targetResource: 'https://another-example.test',
                shouldBeRedacted: true,
            },
            {
                allowedResource: 'file://test',
                targetResource: 'https://another-example.test',
                shouldBeRedacted: true,
            },
            {
                allowedResource: 'https://another-example.test',
                targetResource: 'file://test',
                shouldBeRedacted: true,
            },
            {
                allowedResource: 'https://test.example.test',
                targetResource: 'https://example.test',
                shouldBeRedacted: true,
            },
            {
                allowedResource: 'https://test.example.test:9900',
                targetResource: 'https://test.example.test:9901',
                shouldBeRedacted: true,
            },
        ];
        for (const t of tests) {
            it(`${t.targetResource} test when allowed resource is ${t.allowedResource}`, () => {
                const formatted = formatInitiatorUrl(new URL(t.targetResource).origin, new URL(t.allowedResource).origin);
                if (t.shouldBeRedacted) {
                    assert.strictEqual(formatted, '<redacted cross-origin initiator URL>', `${JSON.stringify(t)} was not redacted`);
                }
                else {
                    assert.strictEqual(formatted, t.targetResource, `${JSON.stringify(t)} was redacted`);
                }
            });
        }
    });
    describe('formatHeaders', () => {
        it('does not redact a header from the list', () => {
            assert.strictEqual(formatHeaders('test:', [{ name: 'content-type', value: 'foo' }]), 'test:\ncontent-type: foo');
        });
        it('disallows headers not on the list', () => {
            assert.strictEqual(formatHeaders('test:', [{ name: 'cookie', value: 'foo' }]), 'test:\ncookie: <redacted>');
            assert.strictEqual(formatHeaders('test:', [{ name: 'set-cookie', value: 'foo' }]), 'test:\nset-cookie: <redacted>');
            assert.strictEqual(formatHeaders('test:', [{ name: 'authorization', value: 'foo' }]), 'test:\nauthorization: <redacted>');
        });
    });
});
//# sourceMappingURL=DrJonesNetworkAgent.test.js.map