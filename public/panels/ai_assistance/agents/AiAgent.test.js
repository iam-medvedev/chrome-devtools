// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import { describeWithEnvironment, } from '../../../testing/EnvironmentHelpers.js';
import * as AiAssistance from '../ai_assistance.js';
const { AiAgent, ResponseType, ConversationContext, ErrorType } = AiAssistance;
function mockAidaClient(fetch) {
    return {
        fetch,
        registerClientEvent: () => Promise.resolve({}),
    };
}
function mockConversationContext() {
    return new (class extends ConversationContext {
        getOrigin() {
            return 'origin';
        }
        getItem() {
            return null;
        }
        getIcon() {
            return document.createElement('span');
        }
        getTitle() {
            return 'title';
        }
    })();
}
class AiAgentMock extends AiAgent {
    type = "freestyler" /* AiAssistance.AgentType.STYLING */;
    preamble = 'preamble';
    // eslint-disable-next-line require-yield
    async *handleContextDetails() {
        return;
    }
    clientFeature = 0;
    userTier;
    options = {
        temperature: 1,
        modelId: 'test model',
    };
}
describeWithEnvironment('AiAgent', () => {
    describe('buildRequest', () => {
        beforeEach(() => {
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
        });
        afterEach(() => {
            sinon.restore();
        });
        it('builds a request with a temperature', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.temperature, 1);
        });
        it('builds a request with a temperature -1', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.options.temperature = -1;
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.temperature, undefined);
        });
        it('builds a request with a model id', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with logging', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).metadata?.disable_user_content_logging, false);
        });
        it('builds a request without logging', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: false,
            });
            assert.strictEqual(agent
                .buildRequest({
                text: 'test input',
            })
                .metadata?.disable_user_content_logging, true);
        });
        it('builds a request with input', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: false,
            });
            const request = agent.buildRequest({ text: 'test input' });
            assert.deepStrictEqual(request.current_message?.parts[0], { text: 'test input' });
            assert.strictEqual(request.historical_contexts, undefined);
        });
        it('builds a request with a sessionId', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            const request = agent.buildRequest({ text: 'test input' });
            assert.strictEqual(request.metadata?.string_session_id, 'sessionId');
        });
        it('builds a request with preamble', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            const request = agent.buildRequest({ text: 'test input' });
            assert.deepStrictEqual(request.current_message?.parts[0], { text: 'test input' });
            assert.strictEqual(request.preamble, 'preamble');
            assert.strictEqual(request.historical_contexts, undefined);
        });
        it('builds a request with chat history', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'test',
                },
                {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought: 'thought',
                },
                {
                    type: "title" /* ResponseType.TITLE */,
                    title: 'title',
                },
                {
                    type: "action" /* ResponseType.ACTION */,
                    code: 'action',
                    output: 'result',
                    canceled: false,
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'OBSERVATION: result',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'answer',
                },
            ];
            const request = agent.buildRequest({ text: 'test input' });
            assert.deepStrictEqual(request.current_message?.parts[0], { text: 'test input' });
            assert.deepStrictEqual(request.historical_contexts, [
                {
                    parts: [{ text: 'test' }],
                    role: 1,
                },
                {
                    role: 2,
                    parts: [{ text: 'THOUGHT: thought\nTITLE: title\nACTION\naction\nSTOP' }],
                },
                {
                    role: 1,
                    parts: [{ text: 'OBSERVATION: result' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'answer' }],
                },
            ]);
        });
        it('builds a request with aborted query in history', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'test',
                },
                {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought: 'thought',
                },
                {
                    type: "title" /* ResponseType.TITLE */,
                    title: 'title',
                },
                {
                    type: "error" /* ResponseType.ERROR */,
                    error: "abort" /* ErrorType.ABORT */,
                },
            ];
            const request = agent.buildRequest({ text: 'test input' });
            assert.deepStrictEqual(request.current_message?.parts[0], { text: 'test input' });
            assert.deepStrictEqual(request.historical_contexts, undefined);
        });
        it('builds a request with aborted query in history before a real request', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'test',
                },
                {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought: 'thought',
                },
                {
                    type: "title" /* ResponseType.TITLE */,
                    title: 'title',
                },
                {
                    type: "error" /* ResponseType.ERROR */,
                    error: "abort" /* ErrorType.ABORT */,
                },
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'test2',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'test2',
                },
                {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought: 'thought2',
                },
                {
                    type: "title" /* ResponseType.TITLE */,
                    title: 'title2',
                },
                {
                    type: "action" /* ResponseType.ACTION */,
                    code: 'action2',
                    output: 'result2',
                    canceled: false,
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'OBSERVATION: result2',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'answer2',
                },
            ];
            const request = agent.buildRequest({ text: 'test input' });
            assert.deepStrictEqual(request.current_message?.parts[0], { text: 'test input' });
            assert.deepStrictEqual(request.historical_contexts, [
                {
                    parts: [{ text: 'test2' }],
                    role: 1,
                },
                {
                    role: 2,
                    parts: [{ text: 'THOUGHT: thought2\nTITLE: title2\nACTION\naction2\nSTOP' }],
                },
                {
                    role: 1,
                    parts: [{ text: 'OBSERVATION: result2' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'answer2' }],
                },
            ]);
        });
    });
    describe('run', () => {
        describe('partial yielding for answers', () => {
            it('should yield partial answer with final answer at the end', async () => {
                async function* generateAnswerAfterPartial() {
                    yield {
                        explanation: 'Partial ans',
                        metadata: {},
                        completed: false,
                    };
                    yield {
                        explanation: 'Partial answer is now completed',
                        metadata: {},
                        completed: true,
                    };
                }
                const agent = new AiAgentMock({
                    aidaClient: mockAidaClient(generateAnswerAfterPartial),
                });
                const responses = await Array.fromAsync(agent.run('query', { selected: mockConversationContext() }));
                assert.deepStrictEqual(responses, [
                    {
                        type: "user-query" /* ResponseType.USER_QUERY */,
                        query: 'query',
                    },
                    {
                        type: "querying" /* ResponseType.QUERYING */,
                        query: 'query',
                    },
                    {
                        type: "answer" /* ResponseType.ANSWER */,
                        text: 'Partial ans',
                    },
                    {
                        type: "answer" /* ResponseType.ANSWER */,
                        text: 'Partial answer is now completed',
                        rpcId: undefined,
                        suggestions: undefined,
                    },
                ]);
            });
            it('should not add partial answers to history', async () => {
                async function* generateAnswerAfterPartial() {
                    yield {
                        explanation: 'Partial ans',
                        metadata: {},
                        completed: false,
                    };
                    yield {
                        explanation: 'Partial answer is now completed',
                        metadata: {},
                        completed: true,
                    };
                }
                const agent = new AiAgentMock({
                    aidaClient: mockAidaClient(generateAnswerAfterPartial),
                });
                await Array.fromAsync(agent.run('query', { selected: mockConversationContext() }));
                assert.deepStrictEqual(agent.chatHistoryForTesting, [
                    {
                        role: Host.AidaClient.Role.USER,
                        parts: [{ text: 'query' }],
                    },
                    {
                        role: Host.AidaClient.Role.MODEL,
                        parts: [{ text: 'Partial answer is now completed' }],
                    },
                ]);
            });
        });
        it('should yield unknown error when aidaFetch does not return anything', async () => {
            async function* generateNothing() {
            }
            const agent = new AiAgentMock({
                aidaClient: mockAidaClient(generateNothing),
            });
            const responses = await Array.fromAsync(agent.run('query', { selected: mockConversationContext() }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'query',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'query',
                },
                {
                    type: "error" /* ResponseType.ERROR */,
                    error: "unknown" /* ErrorType.UNKNOWN */,
                },
            ]);
        });
    });
    describe('runFromHistory', () => {
        it('should run', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'first question',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'first enhancements',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'first answer',
                },
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'second question',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'second enhancements',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'second answer',
                },
            ];
            const responses = await Array.fromAsync(agent.runFromHistory());
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'first question',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'first enhancements',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'first answer',
                },
                {
                    type: "user-query" /* ResponseType.USER_QUERY */,
                    query: 'second question',
                },
                {
                    type: "querying" /* ResponseType.QUERYING */,
                    query: 'second enhancements',
                },
                {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: 'second answer',
                },
            ]);
        });
    });
    describe('ConversationContext', () => {
        function getTestContext(origin) {
            class TestContext extends ConversationContext {
                getIcon() {
                    throw new Error('Method not implemented.');
                }
                getTitle() {
                    throw new Error('Method not implemented.');
                }
                getOrigin() {
                    return origin;
                }
                getItem() {
                    return undefined;
                }
            }
            return new TestContext();
        }
        it('checks context origins', () => {
            const tests = [
                {
                    contextOrigin: 'https://google.test',
                    agentOrigin: 'https://google.test',
                    isAllowed: true,
                },
                {
                    contextOrigin: 'https://google.test',
                    agentOrigin: 'about:blank',
                    isAllowed: false,
                },
                {
                    contextOrigin: 'https://google.test',
                    agentOrigin: 'https://www.google.test',
                    isAllowed: false,
                },
                {
                    contextOrigin: 'https://a.test',
                    agentOrigin: 'https://b.test',
                    isAllowed: false,
                },
                {
                    contextOrigin: 'https://a.test',
                    agentOrigin: 'file:///tmp',
                    isAllowed: false,
                },
                {
                    contextOrigin: 'https://a.test',
                    agentOrigin: 'http://a.test',
                    isAllowed: false,
                },
            ];
            for (const test of tests) {
                assert.strictEqual(getTestContext(test.contextOrigin).isOriginAllowed(test.agentOrigin), test.isAllowed);
            }
        });
    });
    describe('functions', () => {
        class AgentWithFunction extends AiAgent {
            type = "freestyler" /* AiAssistance.AgentType.STYLING */;
            preamble = 'preamble';
            called = 0;
            constructor(opts) {
                super(opts);
                this.functionDeclarations.set('testFn', {
                    description: 'test fn description',
                    parameters: { type: 6 /* Host.AidaClient.ParametersTypes.OBJECT */, properties: {}, description: 'arg description' },
                    handler: this.#test.bind(this),
                });
            }
            async #test(args) {
                this.called++;
                return args;
            }
            // eslint-disable-next-line require-yield
            async *handleContextDetails() {
                return;
            }
            clientFeature = 0;
            userTier;
            options = {
                temperature: 1,
                modelId: 'test model',
            };
        }
        it('should build a request with functions', () => {
            const agent = new AgentWithFunction({
                aidaClient: {},
            });
            agent.options.temperature = -1;
            assert.deepStrictEqual(agent.buildRequest({ text: 'test input' }).function_declarations, [{
                    description: 'test fn description',
                    name: 'testFn',
                    parameters: {
                        description: 'arg description',
                        properties: {},
                        type: 6,
                    },
                }]);
        });
    });
});
//# sourceMappingURL=AiAgent.test.js.map