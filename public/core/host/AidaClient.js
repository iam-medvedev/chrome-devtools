// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../platform/platform.js';
import * as Root from '../root/root.js';
import { InspectorFrontendHostInstance } from './InspectorFrontendHost.js';
import { bindOutputStream } from './ResourceLoader.js';
export class AidaClient {
    static buildApiRequest(input) {
        const request = {
            input,
            client: 'CHROME_DEVTOOLS',
        };
        const temperature = parseFloat(Root.Runtime.Runtime.queryParam('aidaTemperature') || '');
        if (!isNaN(temperature)) {
            request.options ??= {};
            request.options.temperature = temperature;
        }
        const modelId = Root.Runtime.Runtime.queryParam('aidaModelId');
        if (modelId) {
            request.options ??= {};
            request.options.model_id = modelId;
        }
        return request;
    }
    async *fetch(input) {
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
        InspectorFrontendHostInstance.doAidaConversation(JSON.stringify(AidaClient.buildApiRequest(input)), streamId, result => {
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
        while ((chunk = await stream.read())) {
            if (chunk.endsWith(']')) {
                chunk = chunk.slice(0, -1);
            }
            if (chunk.startsWith(',') || chunk.startsWith('[')) {
                chunk = chunk.slice(1);
            }
            if (!chunk.length) {
                continue;
            }
            const result = JSON.parse(chunk);
            const CODE_CHUNK_SEPARATOR = '\n`````\n';
            if ('textChunk' in result) {
                if (inCodeChunk) {
                    text.push(CODE_CHUNK_SEPARATOR);
                    inCodeChunk = false;
                }
                text.push(result.textChunk.text);
            }
            else if ('codeChunk' in result) {
                if (!inCodeChunk) {
                    text.push(CODE_CHUNK_SEPARATOR);
                    inCodeChunk = true;
                }
                text.push(result.codeChunk.code);
            }
            else if ('error' in result) {
                throw new Error(`Server responded: ${JSON.stringify(result)}`);
            }
            else {
                throw new Error('Unknown chunk result');
            }
            yield {
                explanation: text.join('') + (inCodeChunk ? CODE_CHUNK_SEPARATOR : ''),
                metadata: { rpcGlobalId: result?.metadata?.rpcGlobalId },
            };
        }
    }
}
//# sourceMappingURL=AidaClient.js.map