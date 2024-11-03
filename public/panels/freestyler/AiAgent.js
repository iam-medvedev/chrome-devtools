// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
const MAX_STEP = 10;
export class AiAgent {
    static validTemperature(temperature) {
        return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
    }
    #sessionId = crypto.randomUUID();
    #aidaClient;
    #serverSideLoggingEnabled;
    /**
     * Mapping between the unique request id and
     * the history chuck it created
     */
    #history = new Map();
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
        this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    }
    get chatHistoryForTesting() {
        return this.#historyEntry;
    }
    set chatNewHistoryForTesting(history) {
        this.#history = history;
    }
    get isEmpty() {
        return this.#history.size <= 0;
    }
    get title() {
        return [...this.#history.values()]
            .flat()
            .filter(response => {
            return response.type === "user-query" /* ResponseType.USER_QUERY */;
        })
            .at(0)
            ?.query;
    }
    #structuredLog = [];
    async aidaFetch(input, options) {
        const request = this.buildRequest({
            input,
        });
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
        const request = {
            input: opts.input,
            preamble: this.preamble,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            chat_history: this.#history.size ? this.#historyEntry : undefined,
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
    get #historyEntry() {
        const historyAll = new Map();
        for (const [id, entry] of this.#history.entries()) {
            const history = [];
            historyAll.set(id, history);
            let response = {};
            for (const data of entry) {
                switch (data.type) {
                    case "context" /* ResponseType.CONTEXT */:
                    case "side-effect" /* ResponseType.SIDE_EFFECT */:
                    case "user-query" /* ResponseType.USER_QUERY */:
                        continue;
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
                        historyAll.delete(id);
                        break;
                }
            }
            const observation = this.formatHistoryChunkObservation(response);
            if (observation) {
                history.push({
                    entity: Host.AidaClient.Entity.USER,
                    text: observation,
                });
            }
        }
        return [...historyAll.values()].flat();
    }
    #addHistory(id, data) {
        const currentRunEntries = this.#history.get(id);
        if (currentRunEntries) {
            currentRunEntries.push(data);
            return;
        }
        this.#history.set(id, [data]);
    }
    #runId = 0;
    async *run(query, options) {
        const id = this.#runId++;
        const response = {
            type: "user-query" /* ResponseType.USER_QUERY */,
            query,
        };
        this.#addHistory(id, response);
        yield response;
        for await (const response of this.handleContextDetails(options.selected)) {
            this.#addHistory(id, response);
            yield response;
        }
        query = await this.enhanceQuery(query, options.selected);
        for (let i = 0; i < MAX_STEP; i++) {
            const queryResponse = {
                type: "querying" /* ResponseType.QUERYING */,
                query,
            };
            this.#addHistory(id, queryResponse);
            yield queryResponse;
            let response;
            let rpcId;
            try {
                const fetchResult = await this.aidaFetch(query, { signal: options.signal });
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
                    this.#addHistory(id, response);
                    yield response;
                    break;
                }
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error: "unknown" /* ErrorType.UNKNOWN */,
                    rpcId,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(id, response);
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
                    this.#addHistory(id, response);
                    yield response;
                }
                else {
                    const response = {
                        type: "error" /* ResponseType.ERROR */,
                        error: "unknown" /* ErrorType.UNKNOWN */,
                        rpcId,
                    };
                    Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                    this.#addHistory(id, response);
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
                this.#addHistory(id, response);
                yield response;
            }
            if (thought) {
                const response = {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought,
                    rpcId,
                };
                this.#addHistory(id, response);
                yield response;
            }
            if (action) {
                const result = yield* this.handleAction(action, rpcId);
                this.#addHistory(id, result);
                yield result;
                query = `OBSERVATION: ${result.output}`;
            }
            if (i === MAX_STEP - 1) {
                const response = {
                    type: "error" /* ResponseType.ERROR */,
                    error: "max-steps" /* ErrorType.MAX_STEPS */,
                };
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
                this.#addHistory(id, response);
                yield response;
                break;
            }
        }
        if (isDebugMode()) {
            window.dispatchEvent(new CustomEvent('freestylerdone'));
        }
    }
    async *runFromHistory() {
        for (const historyChunk of this.#history.values()) {
            for (const entry of historyChunk) {
                yield entry;
            }
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