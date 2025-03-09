// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../core/common/common.js';
import * as Host from '../core/host/host.js';
import * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
import * as Bindings from '../models/bindings/bindings.js';
import * as Breakpoints from '../models/breakpoints/breakpoints.js';
import * as Logs from '../models/logs/logs.js';
import * as Persistence from '../models/persistence/persistence.js';
import * as Workspace from '../models/workspace/workspace.js';
import * as AiAssistance from '../panels/ai_assistance/ai_assistance.js';
import { findMenuItemWithLabel, getMenu } from './ContextMenuHelpers.js';
import { createTarget, } from './EnvironmentHelpers.js';
import { createContentProviderUISourceCodes, createFileSystemUISourceCode } from './UISourceCodeHelpers.js';
import { createViewFunctionStub } from './ViewFunctionHelpers.js';
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
            const completed = idx === data[callId].length - 1;
            if (completed) {
                callId++;
            }
            yield {
                ...chunk,
                metadata,
                completed,
            };
        }
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
    const networkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId-0', opts?.url ?? Platform.DevToolsPath.urlString `https://www.example.com/script.js`, Platform.DevToolsPath.urlString ``, null, null, null);
    networkRequest.statusCode = 200;
    networkRequest.setRequestHeaders([{ name: 'content-type', value: 'bar1' }]);
    networkRequest.responseHeaders = [{ name: 'content-type', value: 'bar2' }, { name: 'x-forwarded-for', value: 'bar3' }];
    if (opts?.includeInitiators) {
        const initiatorNetworkRequest = SDK.NetworkRequest.NetworkRequest.create('requestId-1', Platform.DevToolsPath.urlString `https://www.initiator.com`, Platform.DevToolsPath.urlString ``, null, null, null);
        const initiatedNetworkRequest1 = SDK.NetworkRequest.NetworkRequest.create('requestId-2', Platform.DevToolsPath.urlString `https://www.example.com/1`, Platform.DevToolsPath.urlString ``, null, null, null);
        const initiatedNetworkRequest2 = SDK.NetworkRequest.NetworkRequest.create('requestId-3', Platform.DevToolsPath.urlString `https://www.example.com/2`, Platform.DevToolsPath.urlString ``, null, null, null);
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
/**
 * Creates and shows an AiAssistancePanel instance returning the view
 * stubs and the initial view input caused by Widget.show().
 */
export async function createAiAssistancePanel(options) {
    let aidaAvailabilityForStub = options?.aidaAvailability ?? "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */;
    const view = createViewFunctionStub(AiAssistance.AiAssistancePanel);
    const aidaClient = options?.aidaClient ?? mockAidaClient();
    const checkAccessPreconditionsStub = sinon.stub(Host.AidaClient.AidaClient, 'checkAccessPreconditions').callsFake(() => {
        return Promise.resolve(aidaAvailabilityForStub);
    });
    const panel = new AiAssistance.AiAssistancePanel(view, {
        aidaClient,
        aidaAvailability: aidaAvailabilityForStub,
        syncInfo: options?.syncInfo ?? { isSyncActive: true },
    });
    panels.push(panel);
    panel.markAsRoot();
    panel.show(document.body);
    await view.nextInput;
    const stubAidaCheckAccessPreconditions = (aidaAvailability) => {
        aidaAvailabilityForStub = aidaAvailability;
        return checkAccessPreconditionsStub;
    };
    return {
        panel,
        view,
        aidaClient,
        stubAidaCheckAccessPreconditions,
    };
}
let patchWidgets = [];
/**
 * Creates and shows an AiAssistancePanel instance returning the view
 * stubs and the initial view input caused by Widget.show().
 */
export async function createPatchWidget(options) {
    const view = createViewFunctionStub(AiAssistance.PatchWidget.PatchWidget);
    const aidaClient = options?.aidaClient ?? mockAidaClient();
    const widget = new AiAssistance.PatchWidget.PatchWidget(undefined, view, {
        aidaClient,
    });
    patchWidgets.push(widget);
    widget.markAsRoot();
    widget.show(document.body);
    await view.nextInput;
    return {
        panel: widget,
        view,
        aidaClient,
    };
}
export function initializePersistenceImplForTests() {
    const workspace = Workspace.Workspace.WorkspaceImpl.instance({ forceNew: true });
    const debuggerWorkspaceBinding = Bindings.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
        forceNew: true,
        targetManager: SDK.TargetManager.TargetManager.instance(),
        resourceMapping: new Bindings.ResourceMapping.ResourceMapping(SDK.TargetManager.TargetManager.instance(), workspace),
    });
    const breakpointManager = Breakpoints.BreakpointManager.BreakpointManager.instance({
        forceNew: true,
        targetManager: SDK.TargetManager.TargetManager.instance(),
        workspace,
        debuggerWorkspaceBinding,
    });
    Persistence.Persistence.PersistenceImpl.instance({ forceNew: true, workspace, breakpointManager });
}
export function cleanup() {
    for (const panel of panels) {
        panel.detach();
    }
    panels = [];
    for (const widget of patchWidgets) {
        widget.detach();
    }
    patchWidgets = [];
}
export function openHistoryContextMenu(lastUpdate, item) {
    const contextMenu = getMenu(() => {
        lastUpdate.onHistoryClick(new MouseEvent('click'));
    });
    const freestylerEntry = findMenuItemWithLabel(contextMenu.defaultSection(), item);
    return {
        contextMenu,
        id: freestylerEntry?.id(),
    };
}
export function createTestFilesystem(fileSystemPath, files) {
    const { project, uiSourceCode } = createFileSystemUISourceCode({
        url: Platform.DevToolsPath.urlString `${fileSystemPath}/index.html`,
        mimeType: 'text/html',
        content: 'content',
        fileSystemPath,
    });
    uiSourceCode.setWorkingCopy('content');
    for (const file of files ?? []) {
        const uiSourceCode = project.createUISourceCode(Platform.DevToolsPath.urlString `${fileSystemPath}/${file.path}`, Common.ResourceType.resourceTypes.Script);
        project.addUISourceCode(uiSourceCode);
        uiSourceCode.setWorkingCopy(file.content);
    }
    return { project, uiSourceCode };
}
//# sourceMappingURL=AiAssistanceHelpers.js.map