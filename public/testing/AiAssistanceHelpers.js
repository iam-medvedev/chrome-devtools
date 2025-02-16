// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../core/common/common.js';
import * as Host from '../core/host/host.js';
import * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
import * as Logs from '../models/logs/logs.js';
import * as AiAssistance from '../panels/ai_assistance/ai_assistance.js';
import { createTarget, } from './EnvironmentHelpers.js';
import { createContentProviderUISourceCodes } from './UISourceCodeHelpers.js';
function createMockAidaClient(fetch) {
    const fetchStub = sinon.stub();
    const registerClientEventStub = sinon.stub();
    return {
        fetch: fetchStub.callsFake(fetch),
        registerClientEvent: registerClientEventStub,
    };
}
/**
 * Creates a mock AIDA client that responds using `data`.
 *
 * Each first-level item of `data` is a single response.
 * Each second-level item of `data` is a chunk of a response.
 * The last chunk sets completed flag to true;
 */
export function mockAidaClient(data = []) {
    let callId = 0;
    async function* provideAnswer(_, options) {
        if (!data[callId]) {
            throw new Error('No data provided to the mock client');
        }
        for (const [idx, chunk] of data[callId].entries()) {
            if (options?.signal?.aborted) {
                throw new Host.AidaClient.AidaAbortError();
            }
            const metadata = chunk.metadata ?? {};
            if (metadata?.attributionMetadata?.attributionAction === Host.AidaClient.RecitationAction.BLOCK) {
                throw new Host.AidaClient.AidaBlockError();
            }
            if (chunk.functionCalls?.length) {
                callId++;
                yield { ...chunk, metadata, completed: true };
                break;
            }
            yield {
                ...chunk,
                metadata,
                completed: idx === data[callId].length - 1,
            };
        }
        callId++;
    }
    return createMockAidaClient(provideAnswer);
}
export async function createUISourceCode(options) {
    const url = options?.url ?? Platform.DevToolsPath.urlString `http://example.test/script.js`;
    const { project } = createContentProviderUISourceCodes({
        items: [
            {
                url,
                mimeType: options?.mimeType ?? 'application/javascript',
                resourceType: options?.resourceType ?? Common.ResourceType.resourceTypes.Script,
                content: options?.content ?? undefined,
            },
        ],
        target: createTarget(),
    });
    const uiSourceCode = project.uiSourceCodeForURL(url);
    if (!uiSourceCode) {
        throw new Error('Failed to create a test uiSourceCode');
    }
    if (!uiSourceCode.contentType().isTextType()) {
        uiSourceCode?.setContent('binary', true);
    }
    if (options?.requestContentData) {
        await uiSourceCode.requestContentData();
    }
    return uiSourceCode;
}
export function createNetworkRequest(opts) {
    const networkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', opts?.url ?? Platform.DevToolsPath.urlString `https://www.example.com/script.js`, Platform.DevToolsPath.urlString ``, null, null, null);
    networkRequest.statusCode = 200;
    networkRequest.setRequestHeaders([{ name: 'content-type', value: 'bar1' }]);
    networkRequest.responseHeaders = [{ name: 'content-type', value: 'bar2' }, { name: 'x-forwarded-for', value: 'bar3' }];
    if (opts?.includeInitiators) {
        const initiatorNetworkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId', Platform.DevToolsPath.urlString `https://www.initiator.com`, Platform.DevToolsPath.urlString ``, null, null, null);
        const initiatedNetworkRequest1 = SDK.NetworkRequest.NetworkRequest.create('requestId', Platform.DevToolsPath.urlString `https://www.example.com/1`, Platform.DevToolsPath.urlString ``, null, null, null);
        const initiatedNetworkRequest2 = SDK.NetworkRequest.NetworkRequest.create('requestId', Platform.DevToolsPath.urlString `https://www.example.com/2`, Platform.DevToolsPath.urlString ``, null, null, null);
        sinon.stub(Logs.NetworkLog.NetworkLog.instance(), 'initiatorGraphForRequest')
            .withArgs(networkRequest)
            .returns({
            initiators: new Set([networkRequest, initiatorNetworkRequest]),
            initiated: new Map([
                [networkRequest, initiatorNetworkRequest],
                [initiatedNetworkRequest1, networkRequest],
                [initiatedNetworkRequest2, networkRequest],
            ]),
        })
            .withArgs(initiatedNetworkRequest1)
            .returns({
            initiators: new Set([]),
            initiated: new Map([
                [initiatedNetworkRequest1, networkRequest],
            ]),
        })
            .withArgs(initiatedNetworkRequest2)
            .returns({
            initiators: new Set([]),
            initiated: new Map([
                [initiatedNetworkRequest2, networkRequest],
            ]),
        });
    }
    return networkRequest;
}
let panels = [];
export async function createAiAssistancePanel(options) {
    const view = sinon.stub();
    const aidaClient = options?.aidaClient ?? mockAidaClient();
    const panel = new AiAssistance.AiAssistancePanel(view, {
        aidaClient,
        aidaAvailability: options?.aidaAvailability ?? "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
        syncInfo: options?.syncInfo ?? { isSyncActive: true },
    });
    panel.markAsRoot();
    panel.show(document.body);
    panels.push(panel);
    await panel.updateComplete;
    return {
        panel,
        view,
        aidaClient,
    };
}
export function detachPanels() {
    for (const panel of panels) {
        panel.detach();
    }
    panels = [];
}
//# sourceMappingURL=AiAssistanceHelpers.js.map