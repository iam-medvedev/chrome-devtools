// Copyright 2023 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
export class InsightProvider {
    async getInsights(input) {
        return new Promise((resolve, reject) => {
            if (!Host.InspectorFrontendHost.InspectorFrontendHostInstance.doAidaConversation) {
                return reject(new Error('doAidaConversation is not available'));
            }
            console.time('request');
            Host.InspectorFrontendHost.InspectorFrontendHostInstance.doAidaConversation(JSON.stringify({
                input,
                client: 'CHROME_DEVTOOLS',
            }), result => {
                console.timeEnd('request');
                try {
                    const results = JSON.parse(result.response);
                    const text = results
                        .map((result) => {
                        if ('textChunk' in result) {
                            return result.textChunk.text;
                        }
                        if ('codeChunk' in result) {
                            return '\n`````\n' + result.codeChunk.code + '\n`````\n';
                        }
                        if ('error' in result) {
                            throw new Error(`${result['error']}: ${result['detail']}`);
                        }
                        throw new Error('Unknown chunk result');
                    })
                        .join('');
                    resolve(text);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}
//# sourceMappingURL=InsightProvider.js.map