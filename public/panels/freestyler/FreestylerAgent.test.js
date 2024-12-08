// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import { describeWithEnvironment, getGetHostConfigStub, } from '../../testing/EnvironmentHelpers.js';
import * as Freestyler from './freestyler.js';
const { FreestylerAgent } = Freestyler;
describeWithEnvironment('FreestylerAgent', () => {
    function mockHostConfig(modelId, temperature, userTier, executionMode) {
        getGetHostConfigStub({
            devToolsFreestyler: {
                modelId,
                temperature,
                userTier,
                executionMode,
            },
        });
    }
    function createExtensionScope() {
        return {
            async install() {
            },
            async uninstall() {
            },
        };
    }
    describe('parseResponse', () => {
        const agent = new FreestylerAgent({
            aidaClient: {},
        });
        function getParsedTextResponse(explanation) {
            return agent.parseResponse({
                explanation,
                metadata: {},
                completed: false,
            });
        }
        it('parses a thought', async () => {
            const payload = 'some response';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT: ${payload}`), {
                title: undefined,
                thought: payload,
            });
            assert.deepStrictEqual(getParsedTextResponse(`   THOUGHT: ${payload}`), {
                title: undefined,
                thought: payload,
            });
            assert.deepStrictEqual(getParsedTextResponse(`Something\n   THOUGHT: ${payload}`), {
                title: undefined,
                thought: payload,
            });
        });
        it('parses a answer', async () => {
            const payload = 'some response';
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`   ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`Something\n   ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
        });
        it('parses a multiline answer', async () => {
            const payload = `a
b
c`;
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`   ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`Something\n   ANSWER: ${payload}`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER: ${payload}\nTHOUGHT: thought`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER: ${payload}\nOBSERVATION: observation`), {
                answer: payload,
                suggestions: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER: ${payload}\nACTION\naction\nSTOP`), {
                action: 'action',
                title: undefined,
                thought: undefined,
            });
        });
        it('parses an action', async () => {
            const payload = `const data = {
  someKey: "value",
}`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}\nSTOP`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n\n${payload}\n\nSTOP`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n\n${payload}\n\nANSWER: answer`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
        });
        it('parses an action where the last line of the code block ends with STOP keyword', async () => {
            const payload = `const styles = window.getComputedStyle($0);
        const data = {
          styles
        };`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}STOP`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
        });
        it('parses a thought and title', async () => {
            const payload = 'some response';
            const title = 'this is the title';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT: ${payload}\nTITLE: ${title}`), {
                thought: payload,
                title,
            });
        });
        it('parses an action with backticks in the code', async () => {
            const payload = `const data = {
  someKey: "value",
}`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n\`\`\`\n${payload}\n\`\`\`\nSTOP`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
        });
        it('parses an action with 5 backticks in the code and `js` text in the prelude', async () => {
            const payload = `const data = {
  someKey: "value",
}`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n\`\`\`\`\`\njs\n${payload}\n\`\`\`\`\`\nSTOP`), {
                action: payload,
                title: undefined,
                thought: undefined,
            });
        });
        it('parses a thought and an action', async () => {
            const actionPayload = `const data = {
  someKey: "value",
}`;
            const thoughtPayload = 'thought';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT:${thoughtPayload}\nACTION\n${actionPayload}\nSTOP`), {
                action: actionPayload,
                title: undefined,
                thought: thoughtPayload,
            });
        });
        it('parses a thought and an answer', async () => {
            const answerPayload = 'answer';
            const thoughtPayload = 'thought';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT:${thoughtPayload}\nANSWER:${answerPayload}`), {
                answer: answerPayload,
                suggestions: undefined,
            });
        });
        it('parses an answer and suggestions', async () => {
            const answerPayload = 'answer';
            const suggestions = ['suggestion'];
            const suggestionsText = JSON.stringify(suggestions);
            assert.deepStrictEqual(getParsedTextResponse(`ANSWER:${answerPayload}\nSUGGESTIONS: ${suggestionsText}`), {
                answer: answerPayload,
                suggestions,
            });
        });
        it('parses a thought, title, action and answer from same response', async () => {
            const answerPayload = 'answer';
            const thoughtPayload = 'thought';
            const actionPayload = `const data = {
  someKey: "value",
}`;
            const title = 'title';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT: ${thoughtPayload}\nTITLE: ${title}\nACTION\n${actionPayload}\nSTOP\nANSWER:${answerPayload}`), {
                thought: thoughtPayload,
                action: actionPayload,
                title,
            });
        });
        it('parses an action when STOP appearing in its last line and has ANSWER after that', async () => {
            const answerPayload = 'answer';
            const suggestions = ['suggestion'];
            const payload = `const styles = window.getComputedStyle($0);
        const data = {
          styles
        };`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}STOP\nANSWER:${answerPayload}\nSUGGESTIONS: ${JSON.stringify(suggestions)}`), {
                action: payload,
                thought: undefined,
                title: undefined,
            });
        });
        it('parses an action when STOP appearing in its last line and has OBSERVATION after that', async () => {
            const payload = `const styles = window.getComputedStyle($0);
        const data = {
          styles
        };`;
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}STOP\nOBSERVATION:{styles: {}}`), {
                action: payload,
                thought: undefined,
                title: undefined,
            });
        });
        it('parses an action when STOP appearing in its last line and has THOUGHT after that', async () => {
            const payload = `const styles = window.getComputedStyle($0);
        const data = {
          styles
        };`;
            const thoughtPayload = 'thought';
            assert.deepStrictEqual(getParsedTextResponse(`ACTION\n${payload}STOP\nTHOUGHT:${thoughtPayload}`), {
                action: payload,
                thought: thoughtPayload,
                title: undefined,
            });
        });
        it('parses a response as an answer', async () => {
            assert.deepStrictEqual(getParsedTextResponse('This is also an answer'), {
                answer: 'This is also an answer',
                suggestions: undefined,
            });
        });
        it('parses a response with no instruction tags as an answer and correctly parses suggestions', async () => {
            assert.deepStrictEqual(getParsedTextResponse('This is also an answer\nSUGGESTIONS: [\"suggestion\"]'), {
                answer: 'This is also an answer',
                suggestions: ['suggestion'],
            });
        });
        it('parses multi line thoughts', () => {
            const thoughtText = 'first line\nsecond line';
            assert.deepStrictEqual(getParsedTextResponse(`THOUGHT: ${thoughtText}`), {
                thought: thoughtText,
                title: undefined,
            });
        });
    });
    describe('describeElement', () => {
        let element;
        beforeEach(() => {
            element = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        });
        afterEach(() => {
            sinon.restore();
        });
        it('should describe an element with no children, siblings, or parent', async () => {
            element.simpleSelector.returns('div#myElement');
            element.getChildNodesPromise.resolves(null);
            const result = await FreestylerAgent.describeElement(element);
            assert.strictEqual(result, '* Its selector is `div#myElement`');
        });
        it('should describe an element with child element and text nodes', async () => {
            const childNodes = [
                sinon.createStubInstance(SDK.DOMModel.DOMNode),
                sinon.createStubInstance(SDK.DOMModel.DOMNode),
                sinon.createStubInstance(SDK.DOMModel.DOMNode),
            ];
            childNodes[0].nodeType.returns(Node.ELEMENT_NODE);
            childNodes[0].simpleSelector.returns('span.child1');
            childNodes[1].nodeType.returns(Node.TEXT_NODE);
            childNodes[2].nodeType.returns(Node.ELEMENT_NODE);
            childNodes[2].simpleSelector.returns('span.child2');
            element.simpleSelector.returns('div#parentElement');
            element.getChildNodesPromise.resolves(childNodes);
            element.nextSibling = null;
            element.previousSibling = null;
            element.parentNode = null;
            const result = await FreestylerAgent.describeElement(element);
            const expectedOutput = `* Its selector is \`div#parentElement\`
* It has 2 child element nodes: \`span.child1\`, \`span.child2\`
* It only has 1 child text node`;
            assert.strictEqual(result, expectedOutput);
        });
        it('should describe an element with siblings and a parent', async () => {
            const nextSibling = sinon.createStubInstance(SDK.DOMModel.DOMNode);
            nextSibling.nodeType.returns(Node.ELEMENT_NODE);
            const previousSibling = sinon.createStubInstance(SDK.DOMModel.DOMNode);
            previousSibling.nodeType.returns(Node.TEXT_NODE);
            const parentNode = sinon.createStubInstance(SDK.DOMModel.DOMNode);
            parentNode.simpleSelector.returns('div#grandparentElement');
            const parentChildNodes = [
                sinon.createStubInstance(SDK.DOMModel.DOMNode),
                sinon.createStubInstance(SDK.DOMModel.DOMNode),
            ];
            parentChildNodes[0].nodeType.returns(Node.ELEMENT_NODE);
            parentChildNodes[0].simpleSelector.returns('span.sibling1');
            parentChildNodes[1].nodeType.returns(Node.TEXT_NODE);
            parentNode.getChildNodesPromise.resolves(parentChildNodes);
            element.simpleSelector.returns('div#parentElement');
            element.getChildNodesPromise.resolves(null);
            element.nextSibling = nextSibling;
            element.previousSibling = previousSibling;
            element.parentNode = parentNode;
            const result = await FreestylerAgent.describeElement(element);
            const expectedOutput = `* Its selector is \`div#parentElement\`
* It has a next sibling and it is an element node
* It has a previous sibling and it is a non element node
* Its parent's selector is \`div#grandparentElement\`
* Its parent has only 1 child element node
* Its parent has only 1 child text node`;
            assert.strictEqual(result, expectedOutput);
        });
    });
    describe('buildRequest', () => {
        beforeEach(() => {
            sinon.stub(crypto, 'randomUUID').returns('sessionId');
        });
        afterEach(() => {
            sinon.restore();
        });
        it('builds a request with a model id', async () => {
            mockHostConfig('test model');
            const agent = new FreestylerAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.model_id, 'test model');
        });
        it('builds a request with a temperature', async () => {
            mockHostConfig('test model', 1);
            const agent = new FreestylerAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).options?.temperature, 1);
        });
        it('builds a request with a user tier', async () => {
            mockHostConfig('test model', 1, 'PUBLIC');
            const agent = new FreestylerAgent({
                aidaClient: {},
            });
            assert.strictEqual(agent.buildRequest({ text: 'test input' }).metadata?.user_tier, 3);
        });
        it('structure matches the snapshot', () => {
            mockHostConfig('test model');
            const agent = new FreestylerAgent({
                aidaClient: {},
                serverSideLoggingEnabled: true,
            });
            sinon.stub(agent, 'preamble').value('preamble');
            agent.chatNewHistoryForTesting = [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'question',
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: 'question',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'answer',
                },
            ];
            assert.deepStrictEqual(agent.buildRequest({
                text: 'test input',
            }), {
                current_message: { role: Host.AidaClient.Role.USER, parts: [{ text: 'test input' }] },
                client: 'CHROME_DEVTOOLS',
                preamble: 'preamble',
                historical_contexts: [
                    {
                        role: 1,
                        parts: [{ text: 'question' }],
                    },
                    {
                        role: 2,
                        parts: [{ text: 'ANSWER: answer' }],
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
                client_feature: 2,
                functionality_type: 1,
            });
        });
    });
    function mockAidaClient(fetch) {
        return {
            fetch,
            registerClientEvent: () => Promise.resolve({}),
        };
    }
    describe('run', () => {
        let element;
        beforeEach(() => {
            mockHostConfig();
            element = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        });
        describe('side effect handling', () => {
            it('calls confirmSideEffect when the code execution contains a side effect', async () => {
                const promise = Promise.withResolvers();
                const stub = sinon.stub().returns(promise);
                let count = 0;
                async function* generateActionAndAnswer() {
                    if (count === 0) {
                        yield {
                            explanation: `ACTION
              $0.style.backgroundColor = 'red'
              STOP`,
                            metadata: {},
                            completed: true,
                        };
                    }
                    else {
                        yield {
                            explanation: 'ANSWER: This is the answer',
                            metadata: {},
                            completed: true,
                        };
                    }
                    count++;
                }
                const execJs = sinon.mock().throws(new Freestyler.SideEffectError('EvalError: Possible side-effect in debug-evaluate'));
                const agent = new FreestylerAgent({
                    aidaClient: mockAidaClient(generateActionAndAnswer),
                    createExtensionScope,
                    confirmSideEffectForTest: stub,
                    execJs,
                });
                promise.resolve(true);
                await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                sinon.assert.match(execJs.getCall(0).args[1], sinon.match({ throwOnSideEffect: true }));
            });
            it('calls execJs with allowing side effects when confirmSideEffect resolves to true', async () => {
                const promise = Promise.withResolvers();
                const stub = sinon.stub().returns(promise);
                let count = 0;
                async function* generateActionAndAnswer() {
                    if (count === 0) {
                        yield {
                            explanation: `ACTION
              $0.style.backgroundColor = 'red'
              STOP`,
                            metadata: {},
                            completed: true,
                        };
                    }
                    else {
                        yield {
                            explanation: 'ANSWER: This is the answer',
                            metadata: {},
                            completed: true,
                        };
                    }
                    count++;
                }
                const execJs = sinon.mock().twice();
                execJs.onCall(0).throws(new Freestyler.SideEffectError('EvalError: Possible side-effect in debug-evaluate'));
                execJs.onCall(1).resolves('value');
                const agent = new FreestylerAgent({
                    aidaClient: mockAidaClient(generateActionAndAnswer),
                    createExtensionScope,
                    confirmSideEffectForTest: stub,
                    execJs,
                });
                promise.resolve(true);
                await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                assert.strictEqual(execJs.getCalls().length, 2);
                sinon.assert.match(execJs.getCall(1).args[1], sinon.match({ throwOnSideEffect: false }));
            });
            it('returns side effect error when confirmSideEffect resolves to false', async () => {
                const promise = Promise.withResolvers();
                const stub = sinon.stub().returns(promise);
                let count = 0;
                async function* generateActionAndAnswer() {
                    if (count === 0) {
                        yield {
                            explanation: `ACTION
              $0.style.backgroundColor = 'red'
              STOP`,
                            metadata: {},
                            completed: true,
                        };
                    }
                    else {
                        yield {
                            explanation: 'ANSWER: This is the answer',
                            metadata: {},
                            completed: true,
                        };
                    }
                    count++;
                }
                const execJs = sinon.mock().twice();
                execJs.onCall(0).throws(new Freestyler.SideEffectError('EvalError: Possible side-effect in debug-evaluate'));
                const agent = new FreestylerAgent({
                    aidaClient: mockAidaClient(generateActionAndAnswer),
                    createExtensionScope,
                    confirmSideEffectForTest: stub,
                    execJs,
                });
                promise.resolve(false);
                const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                const actionStep = responses.find(response => response.type === "action" /* Freestyler.ResponseType.ACTION */);
                assert.strictEqual(actionStep.output, 'Error: User denied code execution with side effects.');
                assert.strictEqual(execJs.getCalls().length, 1);
            });
        });
        describe('long `Observation` text handling', () => {
            it('errors with too long input', async () => {
                let count = 0;
                async function* generateActionAndAnswer() {
                    if (count === 0) {
                        yield {
                            explanation: `ACTION
              $0.style.backgroundColor = 'red'
              STOP`,
                            metadata: {},
                            completed: true,
                        };
                    }
                    else {
                        yield {
                            explanation: 'ANSWER: This is the answer',
                            metadata: {},
                            completed: true,
                        };
                    }
                    count++;
                }
                const execJs = sinon.mock().returns(new Array(10_000).fill('<div>...</div>').join());
                const agent = new FreestylerAgent({
                    aidaClient: mockAidaClient(generateActionAndAnswer),
                    createExtensionScope,
                    execJs,
                });
                const result = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                const actionSteps = result.filter(step => {
                    return step.type === "action" /* Freestyler.ResponseType.ACTION */;
                });
                assert(actionSteps.length === 1, 'Found non or multiple action steps');
                const actionStep = actionSteps.at(0);
                assert(actionStep.output.includes('Error: Output exceeded the maximum allowed length.'));
            });
        });
        it('generates an answer immediately', async () => {
            async function* generateAnswer() {
                yield {
                    explanation: 'ANSWER: this is the answer',
                    metadata: {},
                    completed: true,
                };
            }
            const execJs = sinon.spy();
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAnswer),
                execJs,
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'this is the answer',
                    suggestions: undefined,
                    rpcId: undefined,
                },
            ]);
            sinon.assert.notCalled(execJs);
            assert.deepStrictEqual(agent.chatHistoryForTesting, [
                {
                    role: 1,
                    parts: [{ text: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'ANSWER: this is the answer' }],
                },
            ]);
        });
        it('correctly handles historical_contexts in AIDA requests', async () => {
            const requests = [];
            let i = 0;
            async function* generateAnswer(request) {
                requests.push(request);
                if (i !== 0) {
                    yield {
                        explanation: 'ANSWER: this is the actual answer',
                        metadata: {},
                        completed: true,
                    };
                    return;
                }
                yield {
                    explanation: `THOUGHT: I am thinking.
TITLE: thinking
ACTION
const data = {"test": "observation"};
STOP`,
                    metadata: {},
                    completed: false,
                };
                i++;
            }
            const execJs = sinon.mock().once();
            execJs.onCall(0).returns('test data');
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAnswer),
                createExtensionScope,
                execJs,
            });
            await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.lengthOf(requests, 2, 'Unexpected number of AIDA requests');
            assert.isUndefined(requests[0].historical_contexts, 'Unexpected historical contexts in the initial request');
            assert.exists(requests[0].current_message);
            assert.lengthOf(requests[0].current_message.parts, 1);
            assert.deepStrictEqual(requests[0].current_message.parts[0], { text: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test' }, 'Unexpected input text in the initial request');
            assert.strictEqual(requests[0].current_message.role, Host.AidaClient.Role.USER);
            assert.deepStrictEqual(requests[1].historical_contexts, [
                {
                    role: 1,
                    parts: [{ text: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test' }],
                },
                {
                    role: 2,
                    parts: [{
                            text: 'THOUGHT: I am thinking.\nTITLE: thinking\nACTION\nconst data = {\"test\": \"observation\"};\nSTOP',
                        }],
                },
            ], 'Unexpected historical contexts in the follow-up request');
            assert.exists(requests[1].current_message);
            assert.lengthOf(requests[1].current_message.parts, 1);
            assert.deepStrictEqual(requests[1].current_message.parts[0], { text: 'OBSERVATION: test data' }, 'Unexpected input in the follow-up request');
        });
        it('generates an rpcId for the answer', async () => {
            async function* generateAnswer() {
                yield {
                    explanation: 'ANSWER: this is the answer',
                    metadata: {
                        rpcGlobalId: 123,
                    },
                    completed: true,
                };
            }
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAnswer),
                execJs: sinon.spy(),
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'this is the answer',
                    suggestions: undefined,
                    rpcId: 123,
                },
            ]);
        });
        it('throws an error based on the attribution metadata including RecitationAction.BLOCK', async () => {
            async function* generateAnswer() {
                yield {
                    explanation: 'ANSWER: this is the answer',
                    metadata: {
                        rpcGlobalId: 123,
                    },
                    completed: false,
                };
                throw new Host.AidaClient.AidaBlockError();
            }
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAnswer),
                execJs: sinon.spy(),
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    text: 'this is the answer',
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                },
                {
                    type: "error" /* Freestyler.ResponseType.ERROR */,
                    error: "block" /* Freestyler.ErrorType.BLOCK */,
                },
            ]);
        });
        it('does not throw an error based on attribution metadata not including RecitationAction.BLOCK', async () => {
            async function* generateAnswer() {
                yield {
                    explanation: 'ANSWER: this is the answer',
                    metadata: {
                        rpcGlobalId: 123,
                        attributionMetadata: [{
                                attributionAction: Host.AidaClient.RecitationAction.ACTION_UNSPECIFIED,
                                citations: [],
                            }],
                    },
                    completed: true,
                };
            }
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAnswer),
                execJs: sinon.spy(),
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'this is the answer',
                    suggestions: undefined,
                    rpcId: 123,
                },
            ]);
        });
        it('should execute an action only once even when the partial response contains an action', async () => {
            const execJs = sinon.spy();
            async function* generatePartialAndFullAction() {
                yield {
                    explanation: `THOUGHT: I am thinking.

ACTION
console.log('hel
          `,
                    metadata: {},
                    completed: false,
                };
                sinon.assert.notCalled(execJs);
                yield {
                    explanation: `THOUGHT: I am thinking.

ACTION
console.log('hello');
STOP
          `,
                    metadata: {},
                    completed: true,
                };
            }
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generatePartialAndFullAction),
                createExtensionScope,
                execJs,
            });
            await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            sinon.assert.calledOnce(execJs);
            assert.include(execJs.lastCall.args[0], 'console.log(\'hello\');');
        });
        it('generates a response if nothing is returned', async () => {
            async function* generateNothing() {
                yield {
                    explanation: '',
                    metadata: {},
                    completed: true,
                };
            }
            const execJs = sinon.spy();
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateNothing),
                execJs,
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "error" /* Freestyler.ResponseType.ERROR */,
                    error: "unknown" /* Freestyler.ErrorType.UNKNOWN */,
                },
            ]);
            sinon.assert.notCalled(execJs);
            assert.deepStrictEqual(agent.chatHistoryForTesting, []);
        });
        it('generates an action response if action and answer both present', async () => {
            let i = 0;
            async function* generateNothing() {
                if (i !== 0) {
                    yield {
                        explanation: 'ANSWER: this is the actual answer',
                        metadata: {},
                        completed: true,
                    };
                    return;
                }
                yield {
                    explanation: `THOUGHT: I am thinking.

ACTION
console.log('hello');
STOP

ANSWER: this is the answer`,
                    metadata: {},
                    completed: false,
                };
                i++;
            }
            const execJs = sinon.mock().once();
            execJs.onCall(0).returns('hello');
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateNothing),
                createExtensionScope,
                execJs,
            });
            const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(responses, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [
                        {
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        },
                    ],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "thought" /* Freestyler.ResponseType.THOUGHT */,
                    thought: 'I am thinking.',
                    rpcId: undefined,
                },
                {
                    type: "action" /* Freestyler.ResponseType.ACTION */,
                    code: 'console.log(\'hello\');',
                    output: 'hello',
                    canceled: false,
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: 'OBSERVATION: hello',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'this is the actual answer',
                    suggestions: undefined,
                    rpcId: undefined,
                },
            ]);
            sinon.assert.calledOnce(execJs);
        });
        it('generates history for multiple actions', async () => {
            let count = 0;
            async function* generateMultipleTimes() {
                if (count === 3) {
                    yield {
                        explanation: 'ANSWER: this is the answer',
                        metadata: {},
                        completed: true,
                    };
                    return;
                }
                count++;
                yield {
                    explanation: `THOUGHT: thought ${count}\nTITLE:test\nACTION\nconsole.log('test')\nSTOP\n`,
                    metadata: {},
                    completed: false,
                };
            }
            const execJs = sinon.spy(async () => 'undefined');
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateMultipleTimes),
                createExtensionScope,
                execJs,
            });
            await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(agent.chatHistoryForTesting, [
                {
                    role: 1,
                    parts: [{ text: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'THOUGHT: thought 1\nTITLE: test\nACTION\nconsole.log(\'test\')\nSTOP' }],
                },
                {
                    role: 1,
                    parts: [{ text: 'OBSERVATION: undefined' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'THOUGHT: thought 2\nTITLE: test\nACTION\nconsole.log(\'test\')\nSTOP' }],
                },
                {
                    role: 1,
                    parts: [{ text: 'OBSERVATION: undefined' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'THOUGHT: thought 3\nTITLE: test\nACTION\nconsole.log(\'test\')\nSTOP' }],
                },
                {
                    role: 1,
                    parts: [{ text: 'OBSERVATION: undefined' }],
                },
                {
                    role: 2,
                    parts: [{ text: 'ANSWER: this is the answer' }],
                },
            ]);
        });
        it('stops when aborted', async () => {
            let count = 0;
            async function* generateAndAbort(_, options) {
                if (options?.signal.aborted) {
                    throw new Host.AidaClient.AidaAbortError();
                }
                if (count === 3) {
                    yield {
                        explanation: 'ANSWER: this is the answer',
                        metadata: {},
                        completed: true,
                    };
                    return;
                }
                count++;
                yield {
                    explanation: `THOUGHT: thought ${count}\nACTION\nconsole.log('test')\nSTOP\n`,
                    metadata: {},
                    completed: false,
                };
            }
            const execJs = sinon.spy();
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateAndAbort),
                createExtensionScope,
                execJs,
            });
            const controller = new AbortController();
            controller.abort();
            await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element), signal: controller.signal }));
            assert.deepStrictEqual(agent.chatHistoryForTesting, []);
        });
    });
    describe('history', () => {
        let element;
        beforeEach(() => {
            mockHostConfig();
            element = sinon.createStubInstance(SDK.DOMModel.DOMNode);
            // @ts-ignore
            setAiAssistancePersistentHistory(true);
        });
        it('stores history via AiHistoryStorage', async () => {
            let count = 0;
            async function* generateMultipleTimes() {
                if (count === 1) {
                    yield {
                        explanation: 'ANSWER: this is the answer',
                        metadata: {},
                        completed: true,
                    };
                    return;
                }
                count++;
                yield {
                    explanation: `THOUGHT: thought ${count}\nTITLE:test\nACTION\nconsole.log('test')\nSTOP\n`,
                    metadata: {},
                    completed: false,
                };
            }
            const historyStub = sinon.stub(Freestyler.AiHistoryStorage.instance(), 'upsertHistoryEntry');
            const execJs = sinon.spy(async () => 'undefined');
            const agent = new FreestylerAgent({
                aidaClient: mockAidaClient(generateMultipleTimes),
                createExtensionScope,
                execJs,
            });
            await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
            assert.deepStrictEqual(historyStub.lastCall.args[0].history, [
                {
                    type: "user-query" /* Freestyler.ResponseType.USER_QUERY */,
                    query: 'test',
                },
                {
                    type: "context" /* Freestyler.ResponseType.CONTEXT */,
                    title: 'Analyzing the prompt',
                    details: [{
                            text: '* Its selector is `undefined`',
                            title: 'Data used',
                        }],
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: '# Inspected element\n\n* Its selector is `undefined`\n\n# User request\n\nQUERY: test',
                },
                {
                    type: "title" /* Freestyler.ResponseType.TITLE */,
                    title: 'test',
                    rpcId: undefined,
                },
                {
                    type: "thought" /* Freestyler.ResponseType.THOUGHT */,
                    thought: 'thought 1',
                    rpcId: undefined,
                },
                {
                    type: "action" /* Freestyler.ResponseType.ACTION */,
                    code: 'console.log(\'test\')',
                    output: 'undefined',
                    canceled: false,
                },
                {
                    type: "querying" /* Freestyler.ResponseType.QUERYING */,
                    query: 'OBSERVATION: undefined',
                },
                {
                    type: "answer" /* Freestyler.ResponseType.ANSWER */,
                    text: 'this is the answer',
                    suggestions: undefined,
                    rpcId: undefined,
                },
            ]);
        });
    });
    describe('HostConfigFreestylerExecutionMode', () => {
        let element;
        beforeEach(() => {
            element = sinon.createStubInstance(SDK.DOMModel.DOMNode);
        });
        function getMockClient() {
            let count = 0;
            async function* generateActionAndAnswer() {
                if (count === 0) {
                    yield {
                        explanation: `ACTION
            $0.style.backgroundColor = 'red'
            STOP`,
                        metadata: {},
                        completed: true,
                    };
                }
                else {
                    yield {
                        explanation: 'ANSWER: This is the answer',
                        metadata: {},
                        completed: true,
                    };
                }
                count++;
            }
            return mockAidaClient(generateActionAndAnswer);
        }
        describe('NO_SCRIPTS', () => {
            beforeEach(() => {
                mockHostConfig(undefined, undefined, undefined, Root.Runtime.HostConfigFreestylerExecutionMode.NO_SCRIPTS);
            });
            it('returns an error if scripts are disabled', async () => {
                const execJs = sinon.mock();
                const agent = new FreestylerAgent({
                    aidaClient: getMockClient(),
                    createExtensionScope,
                    execJs,
                });
                const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                const actionStep = responses.find(response => response.type === "action" /* Freestyler.ResponseType.ACTION */);
                assert.strictEqual(actionStep.output, 'Error: JavaScript execution is currently disabled.');
                assert.strictEqual(execJs.getCalls().length, 0);
            });
        });
        describe('SIDE_EFFECT_FREE_SCRIPTS_ONLY', () => {
            beforeEach(() => {
                mockHostConfig(undefined, undefined, undefined, Root.Runtime.HostConfigFreestylerExecutionMode.SIDE_EFFECT_FREE_SCRIPTS_ONLY);
            });
            it('returns an error if a script causes a side effect', async () => {
                const execJs = sinon.mock().throws(new Freestyler.SideEffectError('EvalError: Possible side-effect in debug-evaluate'));
                const agent = new FreestylerAgent({
                    aidaClient: getMockClient(),
                    createExtensionScope,
                    execJs,
                });
                const responses = await Array.fromAsync(agent.run('test', { selected: new Freestyler.NodeContext(element) }));
                const actionStep = responses.find(response => response.type === "action" /* Freestyler.ResponseType.ACTION */);
                assert.strictEqual(actionStep.output, 'Error: JavaScript execution that modifies the page is currently disabled.');
                assert.strictEqual(execJs.getCalls().length, 1);
            });
        });
    });
});
//# sourceMappingURL=FreestylerAgent.test.js.map