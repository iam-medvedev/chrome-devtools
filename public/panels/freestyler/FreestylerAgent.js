// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
import { ExecutionError, FreestylerEvaluateAction } from './FreestylerEvaluateAction.js';
const preamble = `You are a CSS debugging assistant integrated into Chrome DevTools.
The user selected a DOM element in the browser's DevTools and sends a CSS-related
query about the selected DOM element. You are going to answer to the query in these steps:
* THOUGHT
* ACTION
* ANSWER
Use THOUGHT to explain why you take the ACTION.
Use ACTION to evaluate JavaScript code on the page to gather all the data needed to answer the query and put it inside the data variable - then return STOP.
You have access to a special $0 variable referencing the current element in the scope of the JavaScript code.
OBSERVATION will be the result of running the JS code on the page.
After that, you can answer the question with ANSWER or run another ACTION query.
Please run ACTION again if the information you received is not enough to answer the query.
Please answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.
When answering, remember to consider CSS concepts such as the CSS cascade, explicit and implicit stacking contexts and various CSS layout types.
When answering, always consider MULTIPLE possible solutions.

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
export var Step;
(function (Step) {
    Step["THOUGHT"] = "thought";
    Step["ACTION"] = "action";
    Step["ANSWER"] = "answer";
    Step["ERROR"] = "error";
})(Step || (Step = {}));
async function executeJsCode(code) {
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
    const { executionContextId } = await pageAgent.invoke_createIsolatedWorld({ frameId: resourceTreeModel.mainFrame.id, worldName: 'devtools_freestyler' });
    const executionContext = runtimeModel?.executionContext(executionContextId);
    if (!executionContext) {
        throw new Error('Execution context is not found for executing code');
    }
    try {
        return await FreestylerEvaluateAction.execute(code, executionContext);
    }
    catch (err) {
        if (err instanceof ExecutionError) {
            return `Error: ${err.message}`;
        }
        throw err;
    }
}
const MAX_STEPS = 10;
export class FreestylerAgent {
    #aidaClient;
    #chatHistory = new Map();
    #execJs;
    constructor({ aidaClient, execJs }) {
        this.#aidaClient = aidaClient;
        this.#execJs = execJs ?? executeJsCode;
    }
    static buildRequest(input, preamble, chatHistory) {
        const config = Common.Settings.Settings.instance().getHostConfig();
        const request = {
            input,
            preamble,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            chat_history: chatHistory,
            client: 'CHROME_DEVTOOLS',
            options: {
                temperature: config?.devToolsFreestylerDogfood.aidaTemperature ?? 0,
                model_id: config?.devToolsFreestylerDogfood.aidaModelId ?? undefined,
            },
            metadata: {
                // TODO: enable logging later.
                disable_user_content_logging: true,
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            functionality_type: Host.AidaClient.FunctionalityType.CHAT,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            client_feature: Host.AidaClient.ClientFeature.CHROME_FREESTYLER,
        };
        return request;
    }
    get #getHistoryEntry() {
        return [...this.#chatHistory.values()].flat();
    }
    get chatHistoryForTesting() {
        return this.#getHistoryEntry;
    }
    static parseResponse(response) {
        const lines = response.split('\n');
        let thought;
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
        return { thought, action, answer };
    }
    async #aidaFetch(request) {
        let response = '';
        let rpcId;
        for await (const lastResult of this.#aidaClient.fetch(request)) {
            response = lastResult.explanation;
            rpcId = lastResult.metadata.rpcGlobalId ?? rpcId;
        }
        return { response, rpcId };
    }
    resetHistory() {
        this.#chatHistory = new Map();
    }
    #runId = 0;
    async *run(query, options) {
        const structuredLog = [];
        query = `QUERY: ${query}`;
        const currentRunId = ++this.#runId;
        options?.signal.addEventListener('abort', () => {
            this.#chatHistory.delete(currentRunId);
        });
        for (let i = 0; i < MAX_STEPS; i++) {
            const request = FreestylerAgent.buildRequest(query, preamble, this.#chatHistory.size ? this.#getHistoryEntry : undefined);
            let response;
            let rpcId;
            try {
                const fetchResult = await this.#aidaFetch(request);
                response = fetchResult.response;
                rpcId = fetchResult.rpcId;
            }
            catch (err) {
                if (options?.signal.aborted) {
                    break;
                }
                yield { step: Step.ERROR, text: err.message, rpcId };
                break;
            }
            if (options?.signal.aborted) {
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
            const { thought, action, answer } = FreestylerAgent.parseResponse(response);
            if (!thought && !action && !answer) {
                yield { step: Step.ANSWER, text: 'Sorry, I could not help you with this query.', rpcId };
                break;
            }
            if (answer) {
                yield { step: Step.ANSWER, text: answer, rpcId };
                break;
            }
            if (thought) {
                yield { step: Step.THOUGHT, text: thought, rpcId };
            }
            if (action) {
                debugLog(`Action to execute: ${action}`);
                const observation = await this.#execJs(`{${action};((typeof data !== "undefined") ? data : undefined)}`);
                debugLog(`Action result: ${observation}`);
                yield { step: Step.ACTION, code: action, output: observation, rpcId };
                query = `OBSERVATION: ${observation}`;
            }
            if (i === MAX_STEPS - 1) {
                yield { step: Step.ERROR, text: 'Max steps reached, please try again.' };
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