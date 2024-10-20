// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
export var ResponseType;
(function (ResponseType) {
    ResponseType["CONTEXT"] = "context";
    ResponseType["TITLE"] = "title";
    ResponseType["THOUGHT"] = "thought";
    ResponseType["ACTION"] = "action";
    ResponseType["SIDE_EFFECT"] = "side-effect";
    ResponseType["ANSWER"] = "answer";
    ResponseType["ERROR"] = "error";
    ResponseType["QUERYING"] = "querying";
})(ResponseType || (ResponseType = {}));
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
    #chatHistory = new Map();
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
        this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    }
    get historyEntry() {
        return [...this.#chatHistory.values()].flat();
    }
    get chatHistoryForTesting() {
        return this.historyEntry;
    }
    set chatHistoryForTesting(history) {
        this.#chatHistory = history;
    }
    removeHistoryRun(id) {
        this.#chatHistory.delete(id);
    }
    addToHistory(options) {
        const response = options.response;
        if ('answer' in response) {
            this.#storeHistoryEntries({
                id: options.id,
                query: options.query,
                output: response.answer,
            });
            return;
        }
        const { title, thought, action, } = response;
        if (thought) {
            this.#storeHistoryEntries({
                id: options.id,
                query: options.query,
                output: `THOUGHT: ${thought}
TITLE: ${title}
ACTION
${action}
STOP`,
            });
        }
        else {
            this.#storeHistoryEntries({
                id: options.id,
                query: options.query,
                output: `ACTION
${action}
STOP`,
            });
        }
    }
    #storeHistoryEntries({ id, query, output, }) {
        const currentRunEntries = this.#chatHistory.get(id) ?? [];
        this.#chatHistory.set(id, [
            ...currentRunEntries,
            {
                text: query,
                entity: Host.AidaClient.Entity.USER,
            },
            {
                text: output,
                entity: Host.AidaClient.Entity.SYSTEM,
            },
        ]);
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
            chat_history: this.#chatHistory.size ? this.historyEntry : undefined,
            client: Host.AidaClient.CLIENT_NAME,
            options: this.options,
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
    handleAction(_action, _rpcId) {
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
    #runId = 0;
    async *run(query, options) {
        yield* this.handleContextDetails(options.selected);
        query = await this.enhanceQuery(query, options.selected);
        const currentRunId = ++this.#runId;
        for (let i = 0; i < MAX_STEP; i++) {
            yield {
                type: ResponseType.QUERYING,
            };
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
                    this.removeHistoryRun(currentRunId);
                    yield {
                        type: ResponseType.ERROR,
                        error: "abort" /* ErrorType.ABORT */,
                        rpcId,
                    };
                    break;
                }
                yield {
                    type: ResponseType.ERROR,
                    error: "unknown" /* ErrorType.UNKNOWN */,
                    rpcId,
                };
                break;
            }
            const parsedResponse = this.parseResponse(response);
            this.addToHistory({
                id: currentRunId,
                query,
                response: parsedResponse,
            });
            if ('answer' in parsedResponse) {
                const { answer, suggestions, } = parsedResponse;
                if (answer) {
                    yield {
                        type: ResponseType.ANSWER,
                        text: answer,
                        rpcId,
                        suggestions,
                    };
                }
                else {
                    this.removeHistoryRun(currentRunId);
                    yield {
                        type: ResponseType.ERROR,
                        error: "unknown" /* ErrorType.UNKNOWN */,
                        rpcId,
                    };
                }
                break;
            }
            const { title, thought, action, } = parsedResponse;
            if (title) {
                yield {
                    type: ResponseType.TITLE,
                    title,
                    rpcId,
                };
            }
            if (thought) {
                yield {
                    type: ResponseType.THOUGHT,
                    thought,
                    rpcId,
                };
            }
            if (action) {
                const result = yield* this.handleAction(action, rpcId);
                yield result;
                query = `OBSERVATION: ${result.output}`;
            }
            if (i === MAX_STEP - 1) {
                yield {
                    type: ResponseType.ERROR,
                    error: "max-steps" /* ErrorType.MAX_STEPS */,
                };
                break;
            }
        }
        if (isDebugMode()) {
            window.dispatchEvent(new CustomEvent('freestylerdone'));
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