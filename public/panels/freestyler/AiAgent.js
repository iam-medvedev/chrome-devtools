// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
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
}
export class AiAgent {
    static validTemperature(temperature) {
        return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
    }
    #sessionId = crypto.randomUUID();
    #aidaClient;
    #serverSideLoggingEnabled;
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
    #structuredLog = [];
    async aidaFetch(request, options) {
        let rawResponse = undefined;
        let response = '';
        let rpcId;
        for await (rawResponse of this.#aidaClient.fetch(request, options)) {
            response = rawResponse.explanation;
            rpcId = rawResponse.metadata.rpcGlobalId ?? rpcId;
            if (rawResponse.metadata.attributionMetadata?.some(meta => meta.attributionAction === Host.AidaClient.RecitationAction.BLOCK)) {
                throw new Error('Attribution action does not allow providing the response');
            }
        }
        debugLog({
            request,
            response: rawResponse,
        });
        this.#structuredLog.push({
            request: structuredClone(request),
            response,
            rawResponse,
        });
        localStorage.setItem('freestylerStructuredLog', JSON.stringify(this.#structuredLog));
        return { response, rpcId };
    }
    buildRequest(opts) {
        const history = this.#chatHistoryForAida;
        const request = {
            input: opts.input,
            preamble: this.preamble,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            chat_history: history.length ? history : undefined,
            client: Host.AidaClient.CLIENT_NAME,
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
        return {
            answer: response,
        };
    }
    formatHistoryChunkAnswer(text) {
        return text;
    }
    formatHistoryChunkObservation(observation) {
        let text = '';
        if (observation.thought) {
            text = `THOUGHT: ${observation.thought}`;
        }
        if (observation.title) {
            text += `\nTITLE: ${observation.title}`;
        }
        if (observation.action) {
            text += `\nACTION
${observation.action}
STOP`;
        }
        return text;
    }
    get #chatHistoryForAida() {
        const history = [];
        let response = {};
        let lastRunStartIdx = 0;
        for (const data of this.#history) {
            switch (data.type) {
                case "context" /* ResponseType.CONTEXT */:
                case "side-effect" /* ResponseType.SIDE_EFFECT */:
                    break;
                case "user-query" /* ResponseType.USER_QUERY */:
                    lastRunStartIdx = history.length;
                    break;
                case "querying" /* ResponseType.QUERYING */: {
                    const observation = this.formatHistoryChunkObservation(response);
                    if (observation) {
                        history.push({
                            entity: Host.AidaClient.Entity.SYSTEM,
                            text: observation,
                        });
                        response = {};
                    }
                    history.push({
                        entity: Host.AidaClient.Entity.USER,
                        text: data.query,
                    });
                    break;
                }
                case "answer" /* ResponseType.ANSWER */:
                    history.push({
                        entity: Host.AidaClient.Entity.SYSTEM,
                        text: this.formatHistoryChunkAnswer(data.text),
                    });
                    break;
                case "title" /* ResponseType.TITLE */:
                    response.title = data.title;
                    break;
                case "thought" /* ResponseType.THOUGHT */:
                    response.thought = data.thought;
                    break;
                case "action" /* ResponseType.ACTION */:
                    response.action = data.code;
                    break;
                case "error" /* ResponseType.ERROR */:
                    // Delete the end of history.
                    history.splice(lastRunStartIdx);
                    response = {};
                    break;
            }
        }
        // Trailing history, should be the same as handling the
        // ResponseType.QUERYING branch above.
        const observation = this.formatHistoryChunkObservation(response);
        if (observation) {
            history.push({
                entity: Host.AidaClient.Entity.USER,
                text: observation,
            });
        }
        return history;
    }
    #addHistory(data) {
        this.#history.push(data);
    }
    async *run(query, options) {
        if (this.#generatedFromHistory) {
            throw new Error('History entries are read-only.');
        }
        // First context set on the agent determines its origin from now on.
        if (options.selected && this.#origin === undefined && options.selected) {
            this.#origin = options.selected.getOrigin();
        }
        // Remember if the context that is set.
        if (options.selected && !this.#context) {
            this.#context = options.selected;
        }
        const enhancedQuery = await this.enhanceQuery(query, options.selected);
        // Request is built here to capture history up to this point.
        let request = this.buildRequest({
            input: enhancedQuery,
        });
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
            let response;
            let rpcId;
            try {
                const fetchResult = await this.aidaFetch(request, { signal: options.signal });
                response = fetchResult.response;
                rpcId = fetchResult.rpcId;
            }
            catch (err) {
                debugLog('Error calling the AIDA API', err);
                if (err instanceof Host.AidaClient.AidaAbortError) {
                    const response = {
                        type: "error" /* ResponseType.ERROR */,
                        error: "abort" /* ErrorType.ABORT */,
                        rpcId,
                    };
                    this.#addHistory(response);
                    yield response;
                    break;
                }
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error: "unknown" /* ErrorType.UNKNOWN */,
                    rpcId,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(response);
                yield response;
                break;
            }
            const parsedResponse = this.parseResponse(response);
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
                        rpcId,
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
                const result = yield* this.handleAction(action, rpcId);
                this.#addHistory(result);
                query = `OBSERVATION: ${result.output}`;
                // Capture history state for the next iteration query.
                request = this.buildRequest({
                    input: query,
                });
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
//# sourceMappingURL=AiAgent.js.map