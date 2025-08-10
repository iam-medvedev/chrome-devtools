// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Snackbars from '../../ui/components/snackbars/snackbars.js';
import * as VisualLogging from '../../ui/visual_logging/visual_logging.js';
import { FileAgent } from './agents/FileAgent.js';
import { NetworkAgent, RequestContext } from './agents/NetworkAgent.js';
import { PerformanceAgent } from './agents/PerformanceAgent.js';
import { StylingAgent, StylingAgentWithFunctionCalling } from './agents/StylingAgent.js';
import { Conversation, } from './AiHistoryStorage.js';
import { getDisabledReasons } from './AiUtils.js';
const UIStrings = {
    /**
     * @description Notification shown to the user whenever DevTools receives an external request.
     */
    externalRequestReceived: '`DevTools` received an external request',
};
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     * @description Error message shown when AI assistance is not enabled in DevTools settings.
     */
    enableInSettings: 'For AI features to be available, you need to enable AI assistance in DevTools settings.',
};
const str_ = i18n.i18n.registerUIStrings('models/ai_assistance/ConversationHandler.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const lockedString = i18n.i18n.lockedString;
function isAiAssistanceStylingWithFunctionCallingEnabled() {
    return Boolean(Root.Runtime.hostConfig.devToolsFreestyler?.functionCalling);
}
function isAiAssistanceServerSideLoggingEnabled() {
    return !Root.Runtime.hostConfig.aidaAvailability?.disallowLogging;
}
async function inspectNetworkRequestByUrl(selector) {
    const networkManagers = SDK.TargetManager.TargetManager.instance().models(SDK.NetworkManager.NetworkManager, { scoped: true });
    const results = networkManagers
        .map(networkManager => {
        let request = networkManager.requestForURL(Platform.DevToolsPath.urlString `${selector}`);
        if (!request && selector.at(-1) === '/') {
            request =
                networkManager.requestForURL(Platform.DevToolsPath.urlString `${selector.slice(0, -1)}`);
        }
        else if (!request && selector.at(-1) !== '/') {
            request = networkManager.requestForURL(Platform.DevToolsPath.urlString `${selector}/`);
        }
        return request;
    })
        .filter(req => !!req);
    const request = results.at(0);
    return request ?? null;
}
let conversationHandlerInstance;
export class ConversationHandler {
    #aiAssistanceEnabledSetting;
    #aidaClient;
    #aidaAvailability;
    constructor(aidaClient, aidaAvailability) {
        this.#aidaClient = aidaClient;
        if (aidaAvailability) {
            this.#aidaAvailability = aidaAvailability;
        }
        this.#aiAssistanceEnabledSetting = this.#getAiAssistanceEnabledSetting();
    }
    static instance(opts) {
        if (opts?.forceNew || conversationHandlerInstance === undefined) {
            const aidaClient = opts?.aidaClient ?? new Host.AidaClient.AidaClient();
            conversationHandlerInstance = new ConversationHandler(aidaClient, opts?.aidaAvailability ?? undefined);
        }
        return conversationHandlerInstance;
    }
    static removeInstance() {
        conversationHandlerInstance = undefined;
    }
    #getAiAssistanceEnabledSetting() {
        try {
            return Common.Settings.moduleSetting('ai-assistance-enabled');
        }
        catch {
            return;
        }
    }
    async #getDisabledReasons() {
        if (this.#aidaAvailability === undefined) {
            this.#aidaAvailability = await Host.AidaClient.AidaClient.checkAccessPreconditions();
        }
        return getDisabledReasons(this.#aidaAvailability);
    }
    /**
     * Handles an external request using the given prompt and uses the
     * conversation type to use the correct agent.
     */
    async handleExternalRequest(parameters) {
        // eslint-disable-next-line require-yield
        async function* generateErrorResponse(message) {
            return {
                type: "error" /* ExternalRequestResponseType.ERROR */,
                message,
            };
        }
        try {
            Snackbars.Snackbar.Snackbar.show({ message: i18nString(UIStrings.externalRequestReceived) });
            const disabledReasons = await this.#getDisabledReasons();
            const aiAssistanceSetting = this.#aiAssistanceEnabledSetting?.getIfNotDisabled();
            if (!aiAssistanceSetting) {
                disabledReasons.push(lockedString(UIStringsNotTranslate.enableInSettings));
            }
            if (disabledReasons.length > 0) {
                return generateErrorResponse(disabledReasons.join(' '));
            }
            void VisualLogging.logFunctionCall(`start-conversation-${parameters.conversationType}`, 'external');
            switch (parameters.conversationType) {
                case "freestyler" /* ConversationType.STYLING */: {
                    return generateErrorResponse('Not implemented here');
                }
                case "performance-insight" /* ConversationType.PERFORMANCE_INSIGHT */:
                    return generateErrorResponse('Not implemented here');
                case "drjones-network-request" /* ConversationType.NETWORK */:
                    if (!parameters.requestUrl) {
                        return generateErrorResponse('The url is required for debugging a network request.');
                    }
                    return this.#handleExternalNetworkConversation(parameters.prompt, parameters.requestUrl);
            }
        }
        catch (error) {
            return generateErrorResponse(error.message);
        }
    }
    async *handleConversationWithHistory(items, conversation) {
        for await (const data of items) {
            // We don't want to save partial responses to the conversation history.
            if (data.type !== "answer" /* ResponseType.ANSWER */ || data.complete) {
                void conversation?.addHistoryItem(data);
            }
            yield data;
        }
    }
    async *#handleExternalNetworkConversation(prompt, requestUrl) {
        const options = {
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: isAiAssistanceServerSideLoggingEnabled(),
        };
        const networkAgent = new NetworkAgent(options);
        const externalConversation = new Conversation("drjones-network-request" /* ConversationType.NETWORK */, [], networkAgent.id, 
        /* isReadOnly */ true, 
        /* isExternal */ true);
        const request = await inspectNetworkRequestByUrl(requestUrl);
        if (!request) {
            return {
                type: "error" /* ExternalRequestResponseType.ERROR */,
                message: `Can't find request with the given selector ${requestUrl}`,
            };
        }
        const generator = networkAgent.run(prompt, {
            selected: new RequestContext(request),
        });
        const generatorWithHistory = this.handleConversationWithHistory(generator, externalConversation);
        const devToolsLogs = [];
        for await (const data of generatorWithHistory) {
            // We don't want to save partial responses to the conversation history.
            if (data.type !== "answer" /* ResponseType.ANSWER */ || data.complete) {
                void externalConversation.addHistoryItem(data);
                devToolsLogs.push(data);
            }
            if (data.type === "context" /* ResponseType.CONTEXT */ || data.type === "title" /* ResponseType.TITLE */) {
                yield {
                    type: "notification" /* ExternalRequestResponseType.NOTIFICATION */,
                    message: data.title,
                };
            }
            if (data.type === "side-effect" /* ResponseType.SIDE_EFFECT */) {
                data.confirm(true);
            }
            if (data.type === "answer" /* ResponseType.ANSWER */ && data.complete) {
                return {
                    type: "answer" /* ExternalRequestResponseType.ANSWER */,
                    message: data.text,
                    devToolsLogs,
                };
            }
        }
        return {
            type: "error" /* ExternalRequestResponseType.ERROR */,
            message: 'Something went wrong. No answer was generated.',
        };
    }
    createAgent(conversationType, changeManager) {
        const options = {
            aidaClient: this.#aidaClient,
            serverSideLoggingEnabled: isAiAssistanceServerSideLoggingEnabled(),
        };
        let agent;
        switch (conversationType) {
            case "freestyler" /* ConversationType.STYLING */: {
                agent = new StylingAgent({
                    ...options,
                    changeManager,
                });
                if (isAiAssistanceStylingWithFunctionCallingEnabled()) {
                    agent = new StylingAgentWithFunctionCalling({
                        ...options,
                        changeManager,
                    });
                }
                break;
            }
            case "drjones-network-request" /* ConversationType.NETWORK */: {
                agent = new NetworkAgent(options);
                break;
            }
            case "drjones-file" /* ConversationType.FILE */: {
                agent = new FileAgent(options);
                break;
            }
            case "performance-insight" /* ConversationType.PERFORMANCE_INSIGHT */:
            case "drjones-performance" /* ConversationType.PERFORMANCE */: {
                agent = new PerformanceAgent(options, conversationType);
                break;
            }
        }
        return agent;
    }
}
//# sourceMappingURL=ConversationHandler.js.map