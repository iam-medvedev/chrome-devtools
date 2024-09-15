// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
/* clang-format off */
const preamble = `You are the most advanced network request debugging assistant integrated into Chrome DevTools.
The user selected a network request in the browser's DevTools Network Panel and sends a query to understand the request.
Provide a comprehensive analysis of the network request, focusing on areas crucial for a software engineer. Your analysis should include:
* Briefly explain the purpose of the request based on the URL, method, and any relevant headers or payload.
* Highlight potential issues indicated by the status code.

# Considerations
* If the response payload or request payload contains sensitive data, redact or generalize it in your analysis to ensure privacy.
* Tailor your explanations and suggestions to the specific context of the request and the technologies involved (if discernible from the provided details).
* Keep your analysis concise and focused, highlighting only the most critical aspects for a software engineer.

## Example session

Explain this network request
Request: https://api.example.com/products/search?q=laptop&category=electronics
Response Headers:
    Content-Type: application/json
    Cache-Control: max-age=300
...
Request Headers:
    User-Agent: Mozilla/5.0
...
Request Status: 200 OK


This request aims to retrieve a list of products matching the search query "laptop" within the "electronics" category. The successful 200 OK status confirms that the server fulfilled the request and returned the relevant data.
`;
/* clang-format on */
const MAX_HEADERS_SIZE = 1000;
export var DrJonesNetworkAgentResponseType;
(function (DrJonesNetworkAgentResponseType) {
    DrJonesNetworkAgentResponseType["ANSWER"] = "answer";
    DrJonesNetworkAgentResponseType["ERROR"] = "error";
})(DrJonesNetworkAgentResponseType || (DrJonesNetworkAgentResponseType = {}));
/**
 * One agent instance handles one conversation. Create a new agent
 * instance for a new conversation.
 */
export class DrJonesNetworkAgent {
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
                user_tier: Host.AidaClient.convertToUserTierEnum(config.devToolsFreestylerDogfood?.userTier),
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            functionality_type: Host.AidaClient.FunctionalityType.CHAT,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            client_feature: Host.AidaClient.ClientFeature.CHROME_FREESTYLER,
        };
        return request;
    }
    #aidaClient;
    #chatHistory = new Map();
    #serverSideLoggingEnabled;
    #sessionId = crypto.randomUUID();
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
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
    #runId = 0;
    async *run(query, options) {
        const structuredLog = [];
        query = `${options.selectedNetworkRequest ?
            `# Selected network request \n${formatNetworkRequest(options.selectedNetworkRequest)}\n\n# User request\n\n` :
            ''}${query}`;
        const currentRunId = ++this.#runId;
        options.signal?.addEventListener('abort', () => {
            this.#chatHistory.delete(currentRunId);
        });
        const request = DrJonesNetworkAgent.buildRequest({
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
                return;
            }
            yield {
                type: DrJonesNetworkAgentResponseType.ERROR,
                rpcId,
            };
            return;
        }
        if (options.signal?.aborted) {
            return;
        }
        debugLog('Request', request, 'Response', response);
        structuredLog.push({
            request: structuredClone(request),
            response,
        });
        const addToHistory = (text) => {
            this.#chatHistory.set(currentRunId, [
                ...currentRunEntries,
                {
                    text: query,
                    entity: Host.AidaClient.Entity.USER,
                },
                {
                    text,
                    entity: Host.AidaClient.Entity.SYSTEM,
                },
            ]);
        };
        const currentRunEntries = this.#chatHistory.get(currentRunId) ?? [];
        addToHistory(`ANSWER: ${response}`);
        yield {
            type: DrJonesNetworkAgentResponseType.ANSWER,
            text: response,
            rpcId,
        };
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
function formatLines(title, lines, maxLength) {
    let result = '';
    for (const line of lines) {
        if (result.length + line.length > maxLength) {
            break;
        }
        result += line;
    }
    result = result.trim();
    return result && title ? title + '\n' + result : result;
}
export function allowHeader(header) {
    const normalizedName = header.name.toLowerCase().trim();
    // Skip custom headers.
    if (normalizedName.startsWith('x-')) {
        return false;
    }
    // Skip cookies as they might contain auth.
    if (normalizedName === 'cookie' || normalizedName === 'set-cookie') {
        return false;
    }
    if (normalizedName === 'authorization') {
        return false;
    }
    return true;
}
export function formatNetworkRequest(request) {
    const formatHeaders = (title, headers) => formatLines(title, headers.filter(allowHeader).map(header => header.name + ': ' + header.value + '\n'), MAX_HEADERS_SIZE);
    // TODO: anything else that might be relavant?
    // TODO: handle missing headers
    return `Request: ${request.url()}

${formatHeaders('Request headers:', request.requestHeaders())}

${formatHeaders('Response headers:', request.responseHeaders)}

Response status: ${request.statusCode} ${request.statusText}`;
}
// @ts-ignore
globalThis.setDebugFreestylerEnabled = setDebugFreestylerEnabled;
//# sourceMappingURL=DrJonesNetworkAgent.js.map