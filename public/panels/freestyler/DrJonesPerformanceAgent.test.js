// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment, getGetHostConfigStub } from '../../testing/EnvironmentHelpers.js';
import { TraceLoader } from '../../testing/TraceLoader.js';
import * as TimelineUtils from '../timeline/utils/utils.js';
import { DrJonesPerformanceAgent } from './freestyler.js';
describeWithEnvironment('DrJonesPerformanceAgent', () => {
    function mockHostConfig(modelId, temperature) {
        getGetHostConfigStub({
            devToolsAiAssistancePerformanceAgentDogfood: {
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
            const agent = new DrJonesPerformanceAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with a temperature', async () => {
            mockHostConfig('test model', 1);
            const agent = new DrJonesPerformanceAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.temperature, 1);
        });
        it('structure matches the snapshot', () => {
            mockHostConfig('test model');
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
            const agent = new DrJonesPerformanceAgent({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            sinon.stub(agent, 'preamble').value('preamble');
            agent.chatNewHistoryForTesting = new Map([[
                    0,
                    [
                        {
                            type: "querying" /* ResponseType.QUERYING */,
                            query: 'question',
                        },
                        {
                            type: "answer" /* ResponseType.ANSWER */,
                            text: 'answer',
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
                        entity: 1,
                        text: 'question',
                    },
                    {
                        entity: 2,
                        text: 'answer',
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
                client_feature: 8,
                functionality_type: 1,
            });
        });
    });
    describe('run', function () {
        it('generates an answer', async function () {
            const { parsedTrace } = await TraceLoader.traceEngine(this, 'web-dev-outermost-frames.json.gz');
            // A basic Layout.
            const layoutEvt = parsedTrace.Renderer.allTraceEntries.find(event => event.ts === 465457096322);
            assert.exists(layoutEvt);
            const aiCallTree = TimelineUtils.AICallTree.AICallTree.from(layoutEvt, parsedTrace.Renderer.allTraceEntries, parsedTrace);
            assert.exists(aiCallTree);
            async function* generateAnswer() {
                yield {
                    explanation: 'This is the answer',
                    metadata: {
                        rpcGlobalId: 123,
                    },
                    completed: true,
                };
            }
            const agent = new DrJonesPerformanceAgent({
                aidaClient: mockAidaClient(generateAnswer),
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: aiCallTree }));
            const expectedData = '\n\n' +
                `


# Call tree:

Node: 1 – Task
dur: 3
Children:
  * 2 – Layout

Node: 2 – Layout
Selected: true
dur: 3
self: 3
`.trim();
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* ResponseType.CONTEXT */,
                    title: 'Analyzing call tree',
                    details: [
                        { title: 'Selected call tree', text: expectedData },
                    ],
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: `${expectedData}\n\n# User request\n\ntest`,
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
                    entity: 1,
                    text: `${aiCallTree.serialize()}\n\n# User request\n\ntest`,
                },
                {
                    entity: 2,
                    text: 'This is the answer',
                },
            ]);
        });
    });
    describe('enhanceQuery', () => {
        it('does not send the serialized calltree again if it is a followup chat about the same calltree', async () => {
            const agent = new DrJonesPerformanceAgent({
                aidaClient: {},
            });
            const mockAiCallTree = {
                serialize: () => 'Mock call tree',
            };
            const enhancedQuery1 = await agent.enhanceQuery('What is this?', mockAiCallTree);
            assert.strictEqual(enhancedQuery1, 'Mock call tree\n\n# User request\n\nWhat is this?');
            // Create history state of the above query
            agent.chatNewHistoryForTesting = new Map([[
                    0,
                    [
                        {
                            type: "context" /* ResponseType.CONTEXT */,
                            title: 'Analyzing call tree',
                            details: [
                                {
                                    title: 'Selected call tree',
                                    text: mockAiCallTree.serialize(),
                                },
                            ],
                        },
                        {
                            type: "querying" /* ResponseType.QUERYING */,
                            query: enhancedQuery1,
                        },
                        {
                            type: "answer" /* ResponseType.ANSWER */,
                            text: 'test answer',
                        },
                    ],
                ]]);
            const query2 = 'But what about this follow-up question?';
            const enhancedQuery2 = await agent.enhanceQuery(query2, mockAiCallTree);
            assert.strictEqual(enhancedQuery2, query2);
            assert.isFalse(enhancedQuery2.includes(mockAiCallTree.serialize()));
            // Just making sure any subsequent chat doesnt include it either.
            const query3 = 'And this 3rd question?';
            const enhancedQuery3 = await agent.enhanceQuery(query3, mockAiCallTree);
            assert.strictEqual(enhancedQuery3, query3);
            assert.isFalse(enhancedQuery3.includes(mockAiCallTree.serialize()));
        });
    });
});
//# sourceMappingURL=DrJonesPerformanceAgent.test.js.map