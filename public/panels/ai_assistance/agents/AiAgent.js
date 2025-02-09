// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import { debugLog, isDebugMode } from '../debug.js';
export const MAX_STEPS = 10;
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
     * It will be overridden in subclasses to fetch data related to the context item.
     */
    async refresh() {
        return;
    }
}
const OBSERVATION_PREFIX = 'OBSERVATION:';
export class AiAgent {
    #sessionId = crypto.randomUUID();
    #aidaClient;
    #serverSideLoggingEnabled;
    confirmSideEffect;
    #functionDeclarations = new Map();
    /**
     * Used in the debug mode and evals.
     */
    #structuredLog = [];
    /**
     * Might need to be part of history in case we allow chatting in
     * historical conversations.
     */
    #origin;
    #context;
    #id = crypto.randomUUID();
    #history = [];
    constructor(opts) {
        this.#aidaClient = opts.aidaClient;
        this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
        this.confirmSideEffect = opts.confirmSideEffectForTest ?? (() => Promise.withResolvers());
    }
    async enhanceQuery(query) {
        return query;
    }
    buildRequest(part, role) {
        const currentMessage = {
            parts: [part],
            role,
        };
        const history = [...this.#history];
        const declarations = [];
        for (const [name, definition] of this.#functionDeclarations.entries()) {
            declarations.push({
                name,
                description: definition.description,
                parameters: definition.parameters,
            });
        }
        function validTemperature(temperature) {
            return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
        }
        const request = {
            client: Host.AidaClient.CLIENT_NAME,
            current_message: currentMessage,
            preamble: this.preamble,
            historical_contexts: history.length ? history : undefined,
            ...(declarations.length ? { function_declarations: declarations } : {}),
            options: {
                temperature: validTemperature(this.options.temperature),
                model_id: this.options.modelId,
            },
            metadata: {
                disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
                string_session_id: this.#sessionId,
                user_tier: Host.AidaClient.convertToUserTierEnum(this.userTier),
            },
            functionality_type: declarations.length ? Host.AidaClient.FunctionalityType.AGENTIC_CHAT :
                Host.AidaClient.FunctionalityType.CHAT,
            client_feature: this.clientFeature,
        };
        return request;
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
    parseResponse(response) {
        if (response.functionCalls && response.completed) {
            throw new Error('Function calling not supported yet');
        }
        return {
            answer: response.explanation,
        };
    }
    /**
     * Declare a function that the AI model can call.
     * @param name - The name of the function
     * @param declaration - the function declaration. Currently functions must:
     * 1. Return an object of serializable key/value pairs. You cannot return
     *    anything other than a plain JavaScript object that can be serialized.
     * 2. Take one parameter which is an object that can have
     *    multiple keys and values. For example, rather than a function being called
     *    with two args, `foo` and `bar`, you should instead have the function be
     *    called with one object with `foo` and `bar` keys.
     */
    declareFunction(name, declaration) {
        if (this.#functionDeclarations.has(name)) {
            throw new Error(`Duplicate function declaration ${name}`);
        }
        this.#functionDeclarations.set(name, declaration);
    }
    formatParsedAnswer({ answer }) {
        return answer;
    }
    handleAction() {
        throw new Error('Unexpected action found');
    }
    async *run(initialQuery, options) {
        await options.selected?.refresh();
        // First context set on the agent determines its origin from now on.
        if (options.selected && this.#origin === undefined && options.selected) {
            this.#origin = options.selected.getOrigin();
        }
        // Remember if the context that is set.
        if (options.selected && !this.#context) {
            this.#context = options.selected;
        }
        const enhancedQuery = await this.enhanceQuery(initialQuery, options.selected);
        Host.userMetrics.freestylerQueryLength(enhancedQuery.length);
        let query = { text: enhancedQuery };
        // Request is built here to capture history up to this point.
        let request = this.buildRequest(query, Host.AidaClient.Role.USER);
        yield {
            type: "user-query" /* ResponseType.USER_QUERY */,
            query: initialQuery,
        };
        yield* this.handleContextDetails(options.selected);
        for (let i = 0; i < MAX_STEPS; i++) {
            yield {
                type: "querying" /* ResponseType.QUERYING */,
            };
            let rpcId;
            let parsedResponse = undefined;
            let functionCall = undefined;
            try {
                for await (const fetchResult of this.#aidaFetch(request, { signal: options.signal })) {
                    rpcId = fetchResult.rpcId;
                    parsedResponse = fetchResult.parsedResponse;
                    functionCall = fetchResult.functionCall;
                    // Only yield partial responses here and do not add partial answers to the history.
                    if (!fetchResult.completed && !fetchResult.functionCall && 'answer' in parsedResponse &&
                        parsedResponse.answer) {
                        yield {
                            type: "answer" /* ResponseType.ANSWER */,
                            text: parsedResponse.answer,
                        };
                    }
                }
            }
            catch (err) {
                debugLog('Error calling the AIDA API', err);
                let error = "unknown" /* ErrorType.UNKNOWN */;
                if (err instanceof Host.AidaClient.AidaAbortError) {
                    error = "abort" /* ErrorType.ABORT */;
                }
                else if (err instanceof Host.AidaClient.AidaBlockError) {
                    error = "block" /* ErrorType.BLOCK */;
                }
                yield this.#createErrorResponse(error);
                break;
            }
            this.#history.push(request.current_message);
            if (parsedResponse && 'answer' in parsedResponse && Boolean(parsedResponse.answer)) {
                this.#history.push({
                    parts: [{
                            text: this.formatParsedAnswer(parsedResponse),
                        }],
                    role: Host.AidaClient.Role.MODEL,
                });
                Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceAnswerReceived);
                yield {
                    type: "answer" /* ResponseType.ANSWER */,
                    text: parsedResponse.answer,
                    suggestions: parsedResponse.suggestions,
                    rpcId,
                };
                break;
            }
            else if (parsedResponse && !('answer' in parsedResponse)) {
                const { title, thought, action, } = parsedResponse;
                if (title) {
                    yield {
                        type: "title" /* ResponseType.TITLE */,
                        title,
                        rpcId,
                    };
                }
                if (thought) {
                    yield {
                        type: "thought" /* ResponseType.THOUGHT */,
                        thought,
                        rpcId,
                    };
                }
                this.#history.push({
                    parts: [{
                            text: this.#formatParsedStep(parsedResponse),
                        }],
                    role: Host.AidaClient.Role.MODEL,
                });
                if (action) {
                    const result = yield* this.handleAction(action, { signal: options.signal });
                    if (options?.signal?.aborted) {
                        yield this.#createErrorResponse("abort" /* ErrorType.ABORT */);
                        break;
                    }
                    query = { text: `${OBSERVATION_PREFIX} ${result.output}` };
                    // Capture history state for the next iteration query.
                    request = this.buildRequest(query, Host.AidaClient.Role.USER);
                    yield result;
                }
            }
            else if (functionCall) {
                try {
                    const result = yield* this.#callFunction(functionCall.name, functionCall.args);
                    if (result.result) {
                        yield {
                            type: "action" /* ResponseType.ACTION */,
                            output: JSON.stringify(result.result),
                            canceled: false,
                        };
                    }
                    query = {
                        functionResponse: {
                            name: functionCall.name,
                            response: result,
                        },
                    };
                    request = this.buildRequest(query, Host.AidaClient.Role.ROLE_UNSPECIFIED);
                }
                catch {
                    yield this.#createErrorResponse("unknown" /* ErrorType.UNKNOWN */);
                    break;
                }
            }
            else {
                yield this.#createErrorResponse(i - 1 === MAX_STEPS ? "max-steps" /* ErrorType.MAX_STEPS */ : "unknown" /* ErrorType.UNKNOWN */);
                break;
            }
        }
        if (isDebugMode()) {
            window.dispatchEvent(new CustomEvent('aiassistancedone'));
        }
    }
    async *#callFunction(name, args, options) {
        const call = this.#functionDeclarations.get(name);
        if (!call) {
            throw new Error(`Function ${name} is not found.`);
        }
        this.#history.push({
            parts: [{
                    functionCall: {
                        name,
                        args,
                    },
                }],
            role: Host.AidaClient.Role.MODEL,
        });
        if (call.displayInfoFromArgs) {
            const { title, thought, code, suggestions } = call.displayInfoFromArgs(args);
            if (title) {
                yield {
                    type: "title" /* ResponseType.TITLE */,
                    title,
                };
            }
            if (thought) {
                yield {
                    type: "thought" /* ResponseType.THOUGHT */,
                    thought,
                };
            }
            if (code) {
                yield {
                    type: "action" /* ResponseType.ACTION */,
                    code,
                    canceled: false,
                };
            }
            if (suggestions) {
                yield {
                    type: "suggestions" /* ResponseType.SUGGESTIONS */,
                    suggestions,
                };
            }
        }
        let result = await call.handler(args, options);
        if ('requiresApproval' in result) {
            const sideEffectConfirmationPromiseWithResolvers = this.confirmSideEffect();
            void sideEffectConfirmationPromiseWithResolvers.promise.then(result => {
                Host.userMetrics.actionTaken(result ? Host.UserMetrics.Action.AiAssistanceSideEffectConfirmed :
                    Host.UserMetrics.Action.AiAssistanceSideEffectRejected);
            });
            if (options?.signal?.aborted) {
                sideEffectConfirmationPromiseWithResolvers.resolve(false);
            }
            options?.signal?.addEventListener('abort', () => {
                sideEffectConfirmationPromiseWithResolvers.resolve(false);
            }, { once: true });
            yield {
                type: "side-effect" /* ResponseType.SIDE_EFFECT */,
                confirm: (result) => {
                    sideEffectConfirmationPromiseWithResolvers.resolve(result);
                },
            };
            const approvedRun = await sideEffectConfirmationPromiseWithResolvers.promise;
            if (!approvedRun) {
                yield {
                    type: "action" /* ResponseType.ACTION */,
                    code: '',
                    canceled: true,
                };
                return {
                    result: 'Error: User denied code execution with side effects.',
                };
            }
            result = await call.handler(args, {
                ...options,
                approved: approvedRun,
            });
        }
        return result;
    }
    async *#aidaFetch(request, options) {
        let aidaResponse = undefined;
        let response = '';
        let rpcId;
        for await (aidaResponse of this.#aidaClient.fetch(request, options)) {
            if (aidaResponse.functionCalls?.length) {
                debugLog('functionCalls.length', aidaResponse.functionCalls.length);
                yield {
                    rpcId,
                    parsedResponse: { answer: '' },
                    functionCall: aidaResponse.functionCalls[0],
                    completed: true,
                };
                break;
            }
            response = aidaResponse.explanation;
            rpcId = aidaResponse.metadata.rpcGlobalId ?? rpcId;
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
        if (isDebugMode()) {
            this.#structuredLog.push({
                request: structuredClone(request),
                response,
                aidaResponse,
            });
            localStorage.setItem('aiAssistanceStructuredLog', JSON.stringify(this.#structuredLog));
        }
    }
    #formatParsedStep(step) {
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
    #removeLastRunParts() {
        this.#history.splice(this.#history.findLastIndex(item => {
            return item.role === Host.AidaClient.Role.USER;
        }));
    }
    #createErrorResponse(error) {
        this.#removeLastRunParts();
        if (error !== "abort" /* ErrorType.ABORT */) {
            Host.userMetrics.actionTaken(Host.UserMetrics.Action.AiAssistanceError);
        }
        return {
            type: "error" /* ResponseType.ERROR */,
            error,
        };
    }
}
//# sourceMappingURL=AiAgent.js.map