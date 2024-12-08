// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../common/common.js';
import { InspectorFrontendHostInstance } from './InspectorFrontendHost.js';
import { bindOutputStream } from './ResourceLoader.js';
export var Role;
(function (Role) {
    // Unspecified role.
    Role[Role["ROLE_UNSPECIFIED"] = 0] = "ROLE_UNSPECIFIED";
    // The user.
    Role[Role["USER"] = 1] = "USER";
    // The model.
    Role[Role["MODEL"] = 2] = "MODEL";
})(Role || (Role = {}));
export var FunctionalityType;
(function (FunctionalityType) {
    // Unspecified functionality type.
    FunctionalityType[FunctionalityType["FUNCTIONALITY_TYPE_UNSPECIFIED"] = 0] = "FUNCTIONALITY_TYPE_UNSPECIFIED";
    // The generic AI chatbot functionality.
    FunctionalityType[FunctionalityType["CHAT"] = 1] = "CHAT";
    // The explain error functionality.
    FunctionalityType[FunctionalityType["EXPLAIN_ERROR"] = 2] = "EXPLAIN_ERROR";
})(FunctionalityType || (FunctionalityType = {}));
export var ClientFeature;
(function (ClientFeature) {
    // Unspecified client feature.
    ClientFeature[ClientFeature["CLIENT_FEATURE_UNSPECIFIED"] = 0] = "CLIENT_FEATURE_UNSPECIFIED";
    // Chrome console insights feature.
    ClientFeature[ClientFeature["CHROME_CONSOLE_INSIGHTS"] = 1] = "CHROME_CONSOLE_INSIGHTS";
    // Chrome freestyler.
    ClientFeature[ClientFeature["CHROME_FREESTYLER"] = 2] = "CHROME_FREESTYLER";
    // Chrome DrJones Network Agent.
    ClientFeature[ClientFeature["CHROME_DRJONES_NETWORK_AGENT"] = 7] = "CHROME_DRJONES_NETWORK_AGENT";
    // Chrome DrJones Performance Agent.
    ClientFeature[ClientFeature["CHROME_DRJONES_PERFORMANCE_AGENT"] = 8] = "CHROME_DRJONES_PERFORMANCE_AGENT";
    // Chrome DrJones File Agent.
    ClientFeature[ClientFeature["CHROME_DRJONES_FILE_AGENT"] = 9] = "CHROME_DRJONES_FILE_AGENT";
})(ClientFeature || (ClientFeature = {}));
export var UserTier;
(function (UserTier) {
    // Unspecified user tier.
    UserTier[UserTier["USER_TIER_UNSPECIFIED"] = 0] = "USER_TIER_UNSPECIFIED";
    // Users who are internal testers.
    UserTier[UserTier["TESTERS"] = 1] = "TESTERS";
    // Users who are early adopters.
    UserTier[UserTier["BETA"] = 2] = "BETA";
    // Users in the general public.
    UserTier[UserTier["PUBLIC"] = 3] = "PUBLIC";
})(UserTier || (UserTier = {}));
export var RecitationAction;
(function (RecitationAction) {
    RecitationAction["ACTION_UNSPECIFIED"] = "ACTION_UNSPECIFIED";
    RecitationAction["CITE"] = "CITE";
    RecitationAction["BLOCK"] = "BLOCK";
    RecitationAction["NO_ACTION"] = "NO_ACTION";
    RecitationAction["EXEMPT_FOUND_IN_PROMPT"] = "EXEMPT_FOUND_IN_PROMPT";
})(RecitationAction || (RecitationAction = {}));
export const CLIENT_NAME = 'CHROME_DEVTOOLS';
const CODE_CHUNK_SEPARATOR = '\n`````\n';
export class AidaAbortError extends Error {
}
export class AidaBlockError extends Error {
}
export class AidaClient {
    static buildConsoleInsightsRequest(input) {
        const request = {
            current_message: { parts: [{ text: input }], role: Role.USER },
            client: CLIENT_NAME,
            functionality_type: FunctionalityType.EXPLAIN_ERROR,
            client_feature: ClientFeature.CHROME_CONSOLE_INSIGHTS,
        };
        const config = Common.Settings.Settings.instance().getHostConfig();
        let temperature = -1;
        let modelId = '';
        if (config.devToolsConsoleInsights?.enabled) {
            temperature = config.devToolsConsoleInsights.temperature ?? -1;
            modelId = config.devToolsConsoleInsights.modelId || '';
        }
        const disallowLogging = config.aidaAvailability?.disallowLogging ?? true;
        if (temperature >= 0) {
            request.options ??= {};
            request.options.temperature = temperature;
        }
        if (modelId) {
            request.options ??= {};
            request.options.model_id = modelId;
        }
        if (disallowLogging) {
            request.metadata = {
                disable_user_content_logging: true,
            };
        }
        return request;
    }
    static async checkAccessPreconditions() {
        if (!navigator.onLine) {
            return "no-internet" /* AidaAccessPreconditions.NO_INTERNET */;
        }
        const syncInfo = await new Promise(resolve => InspectorFrontendHostInstance.getSyncInformation(syncInfo => resolve(syncInfo)));
        if (!syncInfo.accountEmail) {
            return "no-account-email" /* AidaAccessPreconditions.NO_ACCOUNT_EMAIL */;
        }
        if (syncInfo.isSyncPaused) {
            return "sync-is-paused" /* AidaAccessPreconditions.SYNC_IS_PAUSED */;
        }
        return "available" /* AidaAccessPreconditions.AVAILABLE */;
    }
    async *fetch(request, options) {
        if (!InspectorFrontendHostInstance.doAidaConversation) {
            throw new Error('doAidaConversation is not available');
        }
        const stream = (() => {
            let { promise, resolve, reject } = Promise.withResolvers();
            options?.signal?.addEventListener('abort', () => {
                reject(new AidaAbortError());
            });
            return {
                write: async (data) => {
                    resolve(data);
                    ({ promise, resolve, reject } = Promise.withResolvers());
                },
                close: async () => {
                    resolve(null);
                },
                read: () => {
                    return promise;
                },
                fail: (e) => reject(e),
            };
        })();
        const streamId = bindOutputStream(stream);
        InspectorFrontendHostInstance.doAidaConversation(JSON.stringify(request), streamId, result => {
            if (result.statusCode === 403) {
                stream.fail(new Error('Server responded: permission denied'));
            }
            else if (result.error) {
                stream.fail(new Error(`Cannot send request: ${result.error} ${result.detail || ''}`));
            }
            else if (result.statusCode !== 200) {
                stream.fail(new Error(`Request failed: ${JSON.stringify(result)}`));
            }
            else {
                void stream.close();
            }
        });
        let chunk;
        const text = [];
        let inCodeChunk = false;
        let functionCall = undefined;
        const metadata = { rpcGlobalId: 0 };
        while ((chunk = await stream.read())) {
            let textUpdated = false;
            // The AIDA response is a JSON array of objects, split at the object
            // boundary. Therefore each chunk may start with `[` or `,` and possibly
            // followed by `]`. Each chunk may include one or more objects, so we
            // make sure that each chunk becomes a well-formed JSON array when we
            // parse it by adding `[` and `]` and removing `,` where appropriate.
            if (!chunk.length) {
                continue;
            }
            if (chunk.startsWith(',')) {
                chunk = chunk.slice(1);
            }
            if (!chunk.startsWith('[')) {
                chunk = '[' + chunk;
            }
            if (!chunk.endsWith(']')) {
                chunk = chunk + ']';
            }
            let results;
            try {
                results = JSON.parse(chunk);
            }
            catch (error) {
                throw new Error('Cannot parse chunk: ' + chunk, { cause: error });
            }
            for (const result of results) {
                if ('metadata' in result) {
                    metadata.rpcGlobalId = result.metadata.rpcGlobalId;
                    if ('attributionMetadata' in result.metadata) {
                        if (!metadata.attributionMetadata) {
                            metadata.attributionMetadata = [];
                        }
                        metadata.attributionMetadata.push(result.metadata.attributionMetadata);
                        if (result.metadata.attributionMetadata.attributionAction === RecitationAction.BLOCK) {
                            throw new AidaBlockError();
                        }
                    }
                }
                if ('textChunk' in result) {
                    if (inCodeChunk) {
                        text.push(CODE_CHUNK_SEPARATOR);
                        inCodeChunk = false;
                    }
                    text.push(result.textChunk.text);
                    textUpdated = true;
                }
                else if ('codeChunk' in result) {
                    if (!inCodeChunk) {
                        text.push(CODE_CHUNK_SEPARATOR);
                        inCodeChunk = true;
                    }
                    text.push(result.codeChunk.code);
                    textUpdated = true;
                }
                else if ('functionCallChunk' in result) {
                    functionCall = {
                        name: result.functionCallChunk.functionCall.name,
                        args: result.functionCallChunk.functionCall.args,
                    };
                }
                else if ('error' in result) {
                    throw new Error(`Server responded: ${JSON.stringify(result)}`);
                }
                else {
                    throw new Error('Unknown chunk result');
                }
            }
            if (textUpdated) {
                yield {
                    explanation: text.join('') + (inCodeChunk ? CODE_CHUNK_SEPARATOR : ''),
                    metadata,
                    completed: false,
                };
            }
        }
        yield {
            explanation: text.join('') + (inCodeChunk ? CODE_CHUNK_SEPARATOR : ''),
            metadata,
            functionCall,
            completed: true,
        };
    }
    registerClientEvent(clientEvent) {
        const { promise, resolve } = Promise.withResolvers();
        InspectorFrontendHostInstance.registerAidaClientEvent(JSON.stringify({
            client: CLIENT_NAME,
            event_time: new Date().toISOString(),
            ...clientEvent,
        }), resolve);
        return promise;
    }
}
export function convertToUserTierEnum(userTier) {
    if (userTier) {
        switch (userTier) {
            case 'TESTERS':
                return UserTier.TESTERS;
            case 'BETA':
                return UserTier.BETA;
            case 'PUBLIC':
                return UserTier.PUBLIC;
        }
    }
    return UserTier.BETA;
}
let hostConfigTrackerInstance;
export class HostConfigTracker extends Common.ObjectWrapper.ObjectWrapper {
    #pollTimer;
    #aidaAvailability;
    constructor() {
        super();
    }
    static instance() {
        if (!hostConfigTrackerInstance) {
            hostConfigTrackerInstance = new HostConfigTracker();
        }
        return hostConfigTrackerInstance;
    }
    addEventListener(eventType, listener) {
        const isFirst = !this.hasEventListeners(eventType);
        const eventDescriptor = super.addEventListener(eventType, listener);
        if (isFirst) {
            window.clearTimeout(this.#pollTimer);
            void this.pollAidaAvailability();
        }
        return eventDescriptor;
    }
    removeEventListener(eventType, listener) {
        super.removeEventListener(eventType, listener);
        if (!this.hasEventListeners(eventType)) {
            window.clearTimeout(this.#pollTimer);
        }
    }
    async pollAidaAvailability() {
        this.#pollTimer = window.setTimeout(() => this.pollAidaAvailability(), 2000);
        const currentAidaAvailability = await AidaClient.checkAccessPreconditions();
        if (currentAidaAvailability !== this.#aidaAvailability) {
            this.#aidaAvailability = currentAidaAvailability;
            const config = await new Promise(resolve => InspectorFrontendHostInstance.getHostConfig(config => resolve(config)));
            Common.Settings.Settings.instance().setHostConfig(config);
            this.dispatchEventToListeners("aidaAvailabilityChanged" /* Events.AIDA_AVAILABILITY_CHANGED */);
        }
    }
}
//# sourceMappingURL=AidaClient.js.map