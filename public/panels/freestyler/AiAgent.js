// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
export var ResponseType;
(function (ResponseType) {
    ResponseType["TITLE"] = "title";
    ResponseType["THOUGHT"] = "thought";
    ResponseType["ACTION"] = "action";
    ResponseType["SIDE_EFFECT"] = "side-effect";
    ResponseType["ANSWER"] = "answer";
    ResponseType["ERROR"] = "error";
    ResponseType["QUERYING"] = "querying";
})(ResponseType || (ResponseType = {}));
export class AiAgent {
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
    addToHistory({ id, query, output, }) {
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
    static validTemperature(temperature) {
        return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
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