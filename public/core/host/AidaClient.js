// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../common/common.js';
import * as Platform from '../platform/platform.js';
import { InspectorFrontendHostInstance } from './InspectorFrontendHost.js';
import { bindOutputStream } from './ResourceLoader.js';
export var Entity;
(function (Entity) {
    Entity[Entity["UNKNOWN"] = 0] = "UNKNOWN";
    Entity[Entity["USER"] = 1] = "USER";
    Entity[Entity["SYSTEM"] = 2] = "SYSTEM";
})(Entity || (Entity = {}));
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
})(ClientFeature || (ClientFeature = {}));
export var RecitationAction;
(function (RecitationAction) {
    RecitationAction["ACTION_UNSPECIFIED"] = "ACTION_UNSPECIFIED";
    RecitationAction["CITE"] = "CITE";
    RecitationAction["BLOCK"] = "BLOCK";
    RecitationAction["NO_ACTION"] = "NO_ACTION";
    RecitationAction["EXEMPT_FOUND_IN_PROMPT"] = "EXEMPT_FOUND_IN_PROMPT";
})(RecitationAction || (RecitationAction = {}));
export var AidaAvailability;
(function (AidaAvailability) {
    AidaAvailability["AVAILABLE"] = "available";
    AidaAvailability["NO_ACCOUNT_EMAIL"] = "no-account-email";
    AidaAvailability["NO_ACTIVE_SYNC"] = "no-active-sync";
    AidaAvailability["NO_INTERNET"] = "no-internet";
})(AidaAvailability || (AidaAvailability = {}));
export const CLIENT_NAME = 'CHROME_DEVTOOLS';
export class AidaClient {
    static buildConsoleInsightsRequest(input) {
        const request = {
            input,
            client: CLIENT_NAME,
            functionality_type: FunctionalityType.EXPLAIN_ERROR,
            client_feature: ClientFeature.CHROME_CONSOLE_INSIGHTS,
        };
        const config = Common.Settings.Settings.instance().getHostConfig();
        let temperature = NaN;
        let modelId = null;
        let disallowLogging = false;
        if (config?.devToolsConsoleInsights.enabled) {
            temperature = config.devToolsConsoleInsights.aidaTemperature;
            modelId = config.devToolsConsoleInsights.aidaModelId;
            disallowLogging = config.devToolsConsoleInsights.disallowLogging;
        }
        if (!isNaN(temperature)) {
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
    static async getAidaClientAvailability() {
        if (!navigator.onLine) {
            return AidaAvailability.NO_INTERNET;
        }
        const syncInfo = await new Promise(resolve => InspectorFrontendHostInstance.getSyncInformation(syncInfo => resolve(syncInfo)));
        if (!syncInfo.accountEmail) {
            return AidaAvailability.NO_ACCOUNT_EMAIL;
        }
        if (!syncInfo.isSyncActive) {
            return AidaAvailability.NO_ACTIVE_SYNC;
        }
        return AidaAvailability.AVAILABLE;
    }
    async *fetch(request) {
        if (!InspectorFrontendHostInstance.doAidaConversation) {
            throw new Error('doAidaConversation is not available');
        }
        const stream = (() => {
            let { promise, resolve, reject } = Platform.PromiseUtilities.promiseWithResolvers();
            return {
                write: async (data) => {
                    resolve(data);
                    ({ promise, resolve, reject } = Platform.PromiseUtilities.promiseWithResolvers());
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
            const CODE_CHUNK_SEPARATOR = '\n`````\n';
            for (const result of results) {
                if ('metadata' in result) {
                    metadata.rpcGlobalId = result.metadata.rpcGlobalId;
                    if ('attributionMetadata' in result.metadata) {
                        if (!metadata.attributionMetadata) {
                            metadata.attributionMetadata = [];
                        }
                        metadata.attributionMetadata.push(result.metadata.attributionMetadata);
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
                };
            }
        }
    }
    registerClientEvent(clientEvent) {
        InspectorFrontendHostInstance.registerAidaClientEvent(JSON.stringify({
            client: CLIENT_NAME,
            event_time: new Date().toISOString(),
            ...clientEvent,
        }));
    }
}
//# sourceMappingURL=AidaClient.js.map