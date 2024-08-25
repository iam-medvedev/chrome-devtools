// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ChangeManager } from './ChangeManager.js';
import { ExtensionScope, FREESTYLER_WORLD_NAME } from './ExtensionScope.js';
import { ExecutionError, FreestylerEvaluateAction, SideEffectError } from './FreestylerEvaluateAction.js';
const preamble = `You are a CSS debugging assistant integrated into Chrome DevTools.
The user selected a DOM element in the browser's DevTools and sends a CSS-related
query about the selected DOM element. You are going to answer to the query in these steps:
* THOUGHT
* TITLE
* ACTION
* ANSWER
Use THOUGHT to explain why you take the ACTION. Use TITLE to provide a short summary of the thought.
Use ACTION to evaluate JavaScript code on the page to gather all the data needed to answer the query and put it inside the data variable - then return STOP.
You have access to a special $0 variable referencing the current element in the scope of the JavaScript code.
OBSERVATION will be the result of running the JS code on the page.
After that, you can answer the question with ANSWER or run another ACTION query.
Please run ACTION again if the information you received is not enough to answer the query.
Please answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.
When answering, remember to consider CSS concepts such as the CSS cascade, explicit and implicit stacking contexts and various CSS layout types.
When answering, always consider MULTIPLE possible solutions.

If you need to set styles on an HTML element, always call the \`async setElementStyles(el: Element, styles: object)\` function.

Example:
ACTION
const data = {
  color: window.getComputedStyle($0)['color'],
  backgroundColor: window.getComputedStyle($0)['backgroundColor'],
}
STOP

Example session:

QUERY: Why is this element centered in its container?
THOUGHT: Let's check the layout properties of the container.
TITLE: Checking layout properties
ACTION
/* COLLECT_INFORMATION_HERE */
const data = {
  /* THE RESULT YOU ARE GOING TO USE AS INFORMATION */
}
STOP

You will be called again with this:
OBSERVATION
/* OBJECT_CONTAINING_YOUR_DATA */

You then output:
ANSWER: The element is centered on the page because the parent is a flex container with justify-content set to center.

The example session ends here.`;
export const FIX_THIS_ISSUE_PROMPT = 'Fix this issue using JavaScript code execution';
export var Step;
(function (Step) {
    Step["THOUGHT"] = "thought";
    Step["ACTION"] = "action";
    Step["ANSWER"] = "answer";
    Step["ERROR"] = "error";
    Step["QUERYING"] = "querying";
})(Step || (Step = {}));
// TODO: this should use the current execution context pased on the
// node.
async function executeJsCode(code, { throwOnSideEffect }) {
    const target = UI.Context.Context.instance().flavor(SDK.Target.Target);
    if (!target) {
        throw new Error('Target is not found for executing code');
    }
    const resourceTreeModel = target.model(SDK.ResourceTreeModel.ResourceTreeModel);
    const runtimeModel = target.model(SDK.RuntimeModel.RuntimeModel);
    const pageAgent = target.pageAgent();
    if (!resourceTreeModel?.mainFrame) {
        throw new Error('Main frame is not found for executing code');
    }
    // This returns previously created world if it exists for the frame.
    const { executionContextId } = await pageAgent.invoke_createIsolatedWorld({ frameId: resourceTreeModel.mainFrame.id, worldName: FREESTYLER_WORLD_NAME });
    const executionContext = runtimeModel?.executionContext(executionContextId);
    if (!executionContext) {
        throw new Error('Execution context is not found for executing code');
    }
    try {
        return await FreestylerEvaluateAction.execute(code, executionContext, { throwOnSideEffect });
    }
    catch (err) {
        if (err instanceof ExecutionError) {
            return `Error: ${err.message}`;
        }
        throw err;
    }
}
const MAX_STEPS = 10;
const MAX_OBSERVATION_BYTE_LENGTH = 25_000;
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class FreestylerAgent {
    static buildRequest(opts) {
        const config = Common.Settings.Settings.instance().getHostConfig();
        const request = {
            input: opts.input,
            preamble: opts.preamble,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            chat_history: opts.chatHistory,
            client: Host.AidaClient.CLIENT_NAME,
            options: {
                temperature: config.devToolsFreestylerDogfood?.temperature ?? 0,
                model_id: config.devToolsFreestylerDogfood?.modelId ?? undefined,
            },
            metadata: {
                // TODO: disable logging based on query params.
                disable_user_content_logging: !(opts.serverSideLoggingEnabled ?? false),
                string_session_id: opts.sessionId,
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            functionality_type: Host.AidaClient.FunctionalityType.CHAT,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            client_feature: Host.AidaClient.ClientFeature.CHROME_FREESTYLER,
        };
        return request;
    }
    static parseResponse(response) {
        const lines = response.split('\n');
        let thought;
        let title;
        let action;
        let answer;
        let i = 0;
        while (i < lines.length) {
            const trimmed = lines[i].trim();
            if (trimmed.startsWith('THOUGHT:') && !thought) {
                // TODO: multiline thoughts.
                thought = trimmed.substring('THOUGHT:'.length).trim();
                i++;
            }
            else if (trimmed.startsWith('TITLE:')) {
                title = trimmed.substring('TITLE:'.length).trim();
                i++;
            }
            else if (trimmed.startsWith('ACTION') && !action) {
                const actionLines = [];
                let j = i + 1;
                while (j < lines.length && lines[j].trim() !== 'STOP') {
                    // Sometimes the code block is in the form of "`````\njs\n{code}`````"
                    if (lines[j].trim() !== 'js') {
                        actionLines.push(lines[j]);
                    }
                    j++;
                }
                // TODO: perhaps trying to parse with a Markdown parser would
                // yield more reliable results.
                action = actionLines.join('\n').replaceAll('```', '').replaceAll('``', '').trim();
                i = j + 1;
            }
            else if (trimmed.startsWith('ANSWER:') && !answer) {
                const answerLines = [
                    trimmed.substring('ANSWER:'.length).trim(),
                ];
                let j = i + 1;
                while (j < lines.length) {
                    const line = lines[j].trim();
                    if (line.startsWith('ACTION') || line.startsWith('OBSERVATION:') || line.startsWith('THOUGHT:')) {
                        break;
                    }
                    answerLines.push(lines[j]);
                    j++;
                }
                answer = answerLines.join('\n').trim();
                i = j;
            }
            else {
                i++;
            }
        }
        // If we could not parse the parts, consider the response to be an
        // answer.
        if (!answer && !thought && !action) {
            answer = response;
        }
        return { thought, title, action, answer };
    }
    #aidaClient;
    #chatHistory = new Map();
    #serverSideLoggingEnabled;
    #confirmSideEffect;
    #execJs;
    #sessionId = crypto.randomUUID();
    #changes;
    #createExtensionScope;
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
        this.#changes = opts.changeManager || new ChangeManager();
        this.#execJs = opts.execJs ?? executeJsCode;
        this.#createExtensionScope = opts.createExtensionScope ?? ((changes) => {
            return new ExtensionScope(changes);
        });
        this.#confirmSideEffect = opts.confirmSideEffect;
        this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    }
    get #getHistoryEntry() {
        return [...this.#chatHistory.values()].flat();
    }
    get chatHistoryForTesting() {
        return this.#getHistoryEntry;
    }
    async #aidaFetch(request) {
        let response = '';
        let rpcId;
        for await (const lastResult of this.#aidaClient.fetch(request)) {
            response = lastResult.explanation;
            rpcId = lastResult.metadata.rpcGlobalId ?? rpcId;
            if (lastResult.metadata.attributionMetadata?.some(meta => meta.attributionAction === Host.AidaClient.RecitationAction.BLOCK)) {
                throw new Error('Attribution action does not allow providing the response');
            }
        }
        return { response, rpcId };
    }
    async #generateObservation(action, { throwOnSideEffect, confirmExecJs: confirm, execJsDeniedMesssage: denyErrorMessage }) {
        const actionExpression = `{${action};((typeof data !== "undefined") ? data : undefined)}`;
        try {
            const runConfirmed = await (confirm?.call(this, action) ?? Promise.resolve(true));
            if (!runConfirmed) {
                throw new Error(denyErrorMessage ?? 'Code execution is not allowed');
            }
            const result = await this.#execJs(actionExpression, { throwOnSideEffect });
            const byteCount = Platform.StringUtilities.countWtf8Bytes(result);
            if (byteCount > MAX_OBSERVATION_BYTE_LENGTH) {
                throw new Error('Output exceeded the maximum allowed length.');
            }
            return result;
        }
        catch (error) {
            if (error instanceof SideEffectError) {
                return await this.#generateObservation(action, {
                    throwOnSideEffect: false,
                    confirmExecJs: this.#confirmSideEffect,
                    execJsDeniedMesssage: error.message,
                });
            }
            return `Error: ${error.message}`;
        }
    }
    #runId = 0;
    async *run(query, options = { isFixQuery: false }) {
        const genericErrorMessage = 'Sorry, I could not help you with this query.';
        const structuredLog = [];
        query = `QUERY: ${query}`;
        const currentRunId = ++this.#runId;
        options.signal?.addEventListener('abort', () => {
            this.#chatHistory.delete(currentRunId);
        });
        // We need the first id for queueing to match
        // the one of the first response
        let id = `${currentRunId}-${0}`;
        yield {
            step: Step.QUERYING,
            id,
        };
        for (let i = 0; i < MAX_STEPS; i++) {
            id = `${currentRunId}-${i}`;
            const request = FreestylerAgent.buildRequest({
                input: query,
                preamble,
                chatHistory: this.#chatHistory.size ? this.#getHistoryEntry : undefined,
                serverSideLoggingEnabled: this.#serverSideLoggingEnabled,
                sessionId: this.#sessionId,
            });
            let response;
            let rpcId;
            try {
                const fetchResult = await this.#aidaFetch(request);
                response = fetchResult.response;
                rpcId = fetchResult.rpcId;
            }
            catch (err) {
                debugLog('Error calling the AIDA API', err);
                if (options.signal?.aborted) {
                    break;
                }
                yield { step: Step.ERROR, id, text: genericErrorMessage, rpcId };
                break;
            }
            if (options.signal?.aborted) {
                break;
            }
            debugLog(`Iteration: ${i}`, 'Request', request, 'Response', response);
            structuredLog.push({
                request: structuredClone(request),
                response: response,
            });
            const currentRunEntries = this.#chatHistory.get(currentRunId) ?? [];
            this.#chatHistory.set(currentRunId, [
                ...currentRunEntries,
                {
                    text: query,
                    entity: Host.AidaClient.Entity.USER,
                },
                {
                    text: response,
                    entity: Host.AidaClient.Entity.SYSTEM,
                },
            ]);
            const { thought, title, action, answer } = FreestylerAgent.parseResponse(response);
            // Sometimes the answer will follow an action and a thought. In
            // that case, we only use the action and the thought (if present)
            // since the answer is not based on the observation resulted from
            // the action.
            if (action) {
                if (thought) {
                    yield {
                        step: Step.THOUGHT,
                        id,
                        text: thought,
                        title,
                        rpcId,
                    };
                    id = `${currentRunId}-${i}-action`;
                }
                debugLog(`Action to execute: ${action}`);
                const scope = this.#createExtensionScope(this.#changes);
                await scope.install();
                try {
                    const observation = await this.#generateObservation(action, { throwOnSideEffect: !options.isFixQuery });
                    debugLog(`Action result: ${observation}`);
                    yield {
                        step: Step.ACTION,
                        code: action,
                        id,
                        output: observation,
                        rpcId,
                    };
                    query = `OBSERVATION: ${observation}`;
                }
                finally {
                    await scope.uninstall();
                }
            }
            else if (answer) {
                yield { step: Step.ANSWER, id, text: answer, rpcId };
                break;
            }
            else {
                yield { step: Step.ERROR, id, text: genericErrorMessage, rpcId };
                break;
            }
            if (i === MAX_STEPS - 1) {
                yield { step: Step.ERROR, id, text: 'Max steps reached, please try again.' };
                break;
            }
        }
        if (isDebugMode()) {
            localStorage.setItem('freestylerStructuredLog', JSON.stringify(structuredLog));
            window.dispatchEvent(new CustomEvent('freestylerdone'));
        }
    }
}
function isDebugMode() {
    return Boolean(localStorage.getItem('debugFreestylerEnabled'));
}
function debugLog(...log) {
    if (!isDebugMode()) {
        return;
    }
    // eslint-disable-next-line no-console
    console.log(...log);
}
function setDebugFreestylerEnabled(enabled) {
    if (enabled) {
        localStorage.setItem('debugFreestylerEnabled', 'true');
    }
    else {
        localStorage.removeItem('debugFreestylerEnabled');
    }
}
// @ts-ignore
globalThis.setDebugFreestylerEnabled = setDebugFreestylerEnabled;
//# sourceMappingURL=FreestylerAgent.js.map