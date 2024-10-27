// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { describeWithEnvironment, } from '../../testing/EnvironmentHelpers.js';
import * as Freestyler from './freestyler.js';
const { AiAgent, ResponseType } = Freestyler;
class AiAgentMock extends AiAgent {
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
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.temperature, 1);
        });
        it('builds a request with a temperature -1', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.options.temperature = -1;
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.temperature, undefined);
        });
        it('builds a request with a model id', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with logging', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            assert.strictEqual(agent.buildRequest({ input: 'test input' }).metadata?.disable_user_content_logging, false);
        });
        it('builds a request without logging', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: false,
            });
            assert.strictEqual(agent
                .buildRequest({
                input: 'test input',
            })
                .metadata?.disable_user_content_logging, true);
        });
        it('builds a request with input', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
                serverSideLoggingEnabled: false,
            });
            const request = agent.buildRequest({ input: 'test input' });
            assert.strictEqual(request.input, 'test input');
            assert.strictEqual(request.chat_history, undefined);
        });
        it('builds a request with a sessionId', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            const request = agent.buildRequest({ input: 'test input' });
            assert.strictEqual(request.metadata?.string_session_id, 'sessionId');
        });
        it('builds a request with preamble', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            const request = agent.buildRequest({ input: 'test input' });
            assert.strictEqual(request.input, 'test input');
            assert.strictEqual(request.preamble, 'preamble');
            assert.strictEqual(request.chat_history, undefined);
        });
        it('builds a request with chat history', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = new Map([
                [
                    0,
                    [
                        {
                            type: "querying" /* ResponseType.QUERYING */,
                            query: 'test',
                        },
                    ],
                ],
            ]);
            const request = agent.buildRequest({
                input: 'test input',
            });
            assert.strictEqual(request.input, 'test input');
            assert.deepStrictEqual(request.chat_history, [
                {
                    text: 'test',
                    entity: 1,
                },
            ]);
        });
    });
    describe('runFromHistory', () => {
        it('should run', async () => {
            const agent = new AiAgentMock({
                aidaClient: {},
            });
            agent.chatNewHistoryForTesting = new Map([
                [
                    0,
                    [
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
                    ],
                ],
                [
                    1,
                    [
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
                    ],
                ],
            ]);
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
});
//# sourceMappingURL=AiAgent.test.js.map