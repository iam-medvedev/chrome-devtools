import * as Common from '../core/common/common.js';
import * as Host from '../core/host/host.js';
import * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
import type * as Workspace from '../models/workspace/workspace.js';
import * as AiAssistance from '../panels/ai_assistance/ai_assistance.js';
export type MockAidaResponse = Omit<Host.AidaClient.AidaResponse, 'completed' | 'metadata'> & {
    metadata?: Host.AidaClient.AidaResponseMetadata;
};
/**
 * Creates a mock AIDA client that responds using `data`.
 *
 * Each first-level item of `data` is a single response.
 * Each second-level item of `data` is a chunk of a response.
 * The last chunk sets completed flag to true;
 */
export declare function mockAidaClient(data?: Array<[MockAidaResponse, ...MockAidaResponse[]]>): Host.AidaClient.AidaClient;
export declare function createUISourceCode(options?: {
    content?: string;
    mimeType?: string;
    url?: Platform.DevToolsPath.UrlString;
    resourceType?: Common.ResourceType.ResourceType;
    requestContentData?: boolean;
}): Promise<Workspace.UISourceCode.UISourceCode>;
export declare function createNetworkRequest(opts?: {
    url?: Platform.DevToolsPath.UrlString;
    includeInitiators?: boolean;
}): SDK.NetworkRequest.NetworkRequest;
/**
 * Creates and shows an AiAssistancePanel instance returning the view
 * stubs and the initial view input caused by Widget.show().
 */
export declare function createAiAssistancePanel(options?: {
    aidaClient?: Host.AidaClient.AidaClient;
    aidaAvailability?: Host.AidaClient.AidaAccessPreconditions;
    syncInfo?: Host.InspectorFrontendHostAPI.SyncInformation;
}): Promise<{
    initialViewInput: AiAssistance.ViewInput;
    panel: AiAssistance.AiAssistancePanel;
    view: import("sinon").SinonStub<[AiAssistance.ViewInput, unknown, HTMLElement], any>;
    aidaClient: Host.AidaClient.AidaClient;
    expectViewUpdate: (action: () => void) => Promise<AiAssistance.ViewInput>;
}>;
export declare function detachPanels(): void;
