// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import { AiHistoryStorage } from './AiHistoryStorage.js';
const MAX_STEP = 10;
export class ConversationContext {
    isOriginAllowed(agentOrigin) {
        if (!agentOrigin) {
            return true;
        }
        // Currently does not handle opaque origins because they
        // are not available to DevTools, instead checks
        // that serialization of the origin is the same
        // https://html.spec.whatwg.org/#ascii-serialisation-of-an-origin.
        return this.getOrigin() === agentOrigin;
    }
    /**
     * This method is called at the start of `AiAgent.run`.
     * It will be overriden in subclasses to fetch data related to the context item.
     */
    async refresh() {
        return;
    }
}
export class AiAgent {
    static validTemperature(temperature) {
        return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
    }
    #id = crypto.randomUUID();
    #sessionId = crypto.randomUUID();
    #aidaClient;
    #serverSideLoggingEnabled;
    functionDefinitions;
    #generatedFromHistory = false;
    /**
     * Historical responses.
     */
    #history = [];
    /**
     * Might need to be part of history in case we allow chatting in
     * historical conversations.
     */
    #origin;
    #context;
    #structuredLog = [];
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
        this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    }
    get chatHistoryForTesting() {
        return this.#chatHistoryForAida;
    }
    set chatNewHistoryForTesting(history) {
        this.#history = history;
    }
    get id() {
        return this.#id;
    }
    get isEmpty() {
        return this.#history.length === 0;
    }
    get origin() {
        return this.#origin;
    }
    get context() {
        return this.#context;
    }
    get title() {
        return this.#history
            .filter(response => {
            return response.type === "user-query" /* ResponseType.USER_QUERY */;
        })
            .at(0)
            ?.query;
    }
    get isHistoryEntry() {
        return this.#generatedFromHistory;
    }
    get functionDeclarations() {
        return this.functionDefinitions?.map(call => {
            return {
                name: call.name,
                description: call.description,
                parameters: call.parameters,
            };
        });
    }
    serialized() {
        return {
            id: this.id,
            type: this.type,
            history: this.#history,
        };
    }
    populateHistoryFromStorage(entry) {
        this.#id = entry.id;
        this.#history = entry.history;
        this.#generatedFromHistory = true;
    }
    async *aidaFetch(request, options) {
        let aidaResponse = undefined;
        let response = '';
        let rpcId;
        for await (aidaResponse of this.#aidaClient.fetch(request, options)) {
            response = aidaResponse.explanation;
            rpcId = aidaResponse.metadata.rpcGlobalId ?? rpcId;
            if (aidaResponse.functionCall) {
                throw new Error('Function calling not supported yet');
            }
            const parsedResponse = this.parseResponse(aidaResponse);
            yield {
                rpcId,
                parsedResponse,
                completed: aidaResponse.completed,
            };
        }
        debugLog({
            request,
            response: aidaResponse,
        });
        this.#structuredLog.push({
            request: structuredClone(request),
            response,
            aidaResponse,
        });
        localStorage.setItem('freestylerStructuredLog', JSON.stringify(this.#structuredLog));
    }
    buildRequest(part) {
        const currentMessage = {
            parts: [part],
            role: Host.AidaClient.Role.USER,
        };
        const history = this.#chatHistoryForAida;
        const declarations = this.functionDeclarations;
        const request = {
            client: Host.AidaClient.CLIENT_NAME,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            current_message: currentMessage,
            preamble: this.preamble,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            historical_contexts: history.length ? history : undefined,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ...(declarations ? { function_declarations: declarations } : {}),
            options: {
                temperature: AiAgent.validTemperature(this.options.temperature),
                // eslint-disable-next-line @typescript-eslint/naming-convention
                model_id: this.options.modelId,
            },
            metadata: {
                disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
                string_session_id: this.#sessionId,
                user_tier: Host.AidaClient.convertToUserTierEnum(this.userTier),
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            functionality_type: Host.AidaClient.FunctionalityType.CHAT,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            client_feature: this.clientFeature,
        };
        return request;
    }
    handleAction() {
        throw new Error('Unexpected action found');
    }
    async enhanceQuery(query) {
        return query;
    }
    parseResponse(response) {
        if (response.functionCall && response.completed) {
            throw new Error('Function calling not supported yet');
        }
        return {
            answer: response.explanation,
        };
    }
    formatParsedAnswer({ answer }) {
        return answer;
    }
    formatParsedStep(step) {
        let text = '';
        if (step.thought) {
            text = `THOUGHT: ${step.thought}`;
        }
        if (step.title) {
            text += `\nTITLE: ${step.title}`;
        }
        if (step.action) {
            text += `\nACTION
${step.action}
STOP`;
        }
        return text;
    }
    get #chatHistoryForAida() {
        const history = [];
        let currentParsedStep = {};
        let lastRunStartIdx = 0;
        const flushCurrentStep = () => {
            const text = this.formatParsedStep(currentParsedStep);
            if (text) {
                history.push({
                    role: Host.AidaClient.Role.MODEL,
                    parts: [{ text }],
                });
                currentParsedStep = {};
            }
        };
        for (const data of this.#history) {
            switch (data.type) {
                case "context" /* ResponseType.CONTEXT */:
                case "side-effect" /* ResponseType.SIDE_EFFECT */:
                    break;
                case "user-query" /* ResponseType.USER_QUERY */:
                    lastRunStartIdx = history.length;
                    break;
                case "querying" /* ResponseType.QUERYING */: {
                    flushCurrentStep();
                    history.push({
                        role: Host.AidaClient.Role.USER,
                        parts: [{
                                text: data.query,
                            }],
                    });
                    break;
                }
                case "answer" /* ResponseType.ANSWER */:
                    history.push({
                        role: Host.AidaClient.Role.MODEL,
                        parts: [{
                                text: this.formatParsedAnswer({ answer: data.text }),
                            }],
                    });
                    break;
                case "title" /* ResponseType.TITLE */:
                    currentParsedStep.title = data.title;
                    break;
                case "thought" /* ResponseType.THOUGHT */:
                    currentParsedStep.thought = data.thought;
                    break;
                case "action" /* ResponseType.ACTION */:
                    currentParsedStep.action = data.code;
                    break;
                case "error" /* ResponseType.ERROR */:
                    // Delete the end of history.
                    history.splice(lastRunStartIdx);
                    currentParsedStep = {};
                    break;
            }
        }
        // Flush remaining step data into history.
        flushCurrentStep();
        return history;
    }
    #addHistory(data) {
        this.#history.push(data);
        // Remove condition to store the history in storage
        if (isHistoryEnabled()) {
            void AiHistoryStorage.instance().upsertHistoryEntry(this.serialized());
        }
    }
    async *run(query, options) {
        if (this.#generatedFromHistory) {
            throw new Error('History entries are read-only.');
        }
        await options.selected?.refresh();
        // First context set on the agent determines its origin from now on.
        if (options.selected && this.#origin === undefined && options.selected) {
            this.#origin = options.selected.getOrigin();
        }
        // Remember if the context that is set.
        if (options.selected && !this.#context) {
            this.#context = options.selected;
        }
        const enhancedQuery = await this.enhanceQuery(query, options.selected);
        Host.userMetrics.freestylerQueryLength(enhancedQuery.length);
        // Request is built here to capture history up to this point.
        let request = this.buildRequest({ text: enhancedQuery });
        const response = {
            type: "user-query" /* ResponseType.USER_QUERY */,
            query,
        };
        this.#addHistory(response);
        yield response;
        for await (const response of this.handleContextDetails(options.selected)) {
            this.#addHistory(response);
            yield response;
        }
        query = enhancedQuery;
        for (let i = 0; i < MAX_STEP; i++) {
            const queryResponse = {
                type: "querying" /* ResponseType.QUERYING */,
                query,
            };
            this.#addHistory(queryResponse);
            yield queryResponse;
            let rpcId;
            let parsedResponse = undefined;
            try {
                for await (const fetchResult of this.aidaFetch(request, { signal: options.signal })) {
                    rpcId = fetchResult.rpcId;
                    parsedResponse = fetchResult.parsedResponse;
                    // Only yield partial responses here and do not add partial answers to the history.
                    if (!fetchResult.completed && 'answer' in parsedResponse && parsedResponse.answer) {
                        yield {
                            type: "answer" /* ResponseType.ANSWER */,
                            text: parsedResponse.answer,
                        };
                    }
                }
            }
            catch (err) {
                debugLog('Error calling the AIDA API', err);
                if (err instanceof Host.AidaClient.AidaAbortError) {
                    const response = {
                        type: "error" /* ResponseType.ERROR */,
                        error: "abort" /* ErrorType.ABORT */,
                    };
                    this.#addHistory(response);
                    yield response;
                    break;
                }
                const error = (err instanceof Host.AidaClient.AidaBlockError) ? "block" /* ErrorType.BLOCK */ : "unknown" /* ErrorType.UNKNOWN */;
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(response);
                yield response;
                break;
            }
            if (!parsedResponse) {
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error: "unknown" /* ErrorType.UNKNOWN */,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(response);
                yield response;
                break;
            }
            if ('answer' in parsedResponse) {
                const { answer, suggestions, } = parsedResponse;
                if (answer) {
                    const response = {
                        type: "answer" /* ResponseType.ANSWER */,
                        text: answer,
                        rpcId,
                        suggestions,
                    };
                    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceAnswerReceived);
                    this.#addHistory(response);
                    yield response;
                }
                else {
                    const response = {
                        type: "error" /* ResponseType.ERROR */,
                        error: "unknown" /* ErrorType.UNKNOWN */,
                    };
                    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                    this.#addHistory(response);
                    yield response;
                }
                break;
            }
            const { title, thought, action, } = parsedResponse;
            if (title) {
                const response = {
                    type: "title" /* ResponseType.TITLE */,
                    title,
                    rpcId,
                };
                this.#addHistory(response);
                yield response;
            }
            if (thought) {
                const response = {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought,
                    rpcId,
                };
                this.#addHistory(response);
                yield response;
            }
            if (action) {
                const result = yield* this.handleAction(action);
                this.#addHistory(result);
                query = `OBSERVATION: ${result.output}`;
                // Capture history state for the next iteration query.
                request = this.buildRequest({ text: query });
                yield result;
            }
            if (i === MAX_STEP - 1) {
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error: "max-steps" /* ErrorType.MAX_STEPS */,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(response);
                yield response;
                break;
            }
        }
        if (isDebugMode()) {
            window.dispatchEvent(new CustomEvent('freestylerdone'));
        }
    }
    async *runFromHistory() {
        if (this.isEmpty) {
            return;
        }
        this.#generatedFromHistory = true;
        for (const entry of this.#history) {
            yield entry;
        }
    }
}
export function isDebugMode() {
    return Boolean(localStorage.getItem('debugFreestylerEnabled'));
}
export function debugLog(...log) {
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
export function isHistoryEnabled() {
    return Boolean(localStorage.getItem('persistentHistoryAiAssistance'));
}
function setAiAssistancePersistentHistory(enabled) {
    if (enabled) {
        localStorage.setItem('persistentHistoryAiAssistance', 'true');
    }
    else {
        localStorage.removeItem('persistentHistoryAiAssistance');
    }
}
// @ts-ignore
globalThis.setAiAssistancePersistentHistory = setAiAssistancePersistentHistory;
//# sourceMappingURL=AiAgent.js.map