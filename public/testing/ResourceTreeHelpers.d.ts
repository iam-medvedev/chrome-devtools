import type * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
import * as Protocol from '../generated/protocol.js';
export declare const LOADER_ID: Protocol.Network.LoaderId;
export declare const MAIN_FRAME_ID: Protocol.Page.FrameId;
export declare const DOMAIN = "example.com";
export declare const SECURITY_ORIGIN = "https://example.com";
export declare const FRAME_URL: Platform.DevToolsPath.UrlString;
export declare function setMockResourceTree(shouldMock: boolean): void;
export declare function getInitializedResourceTreeModel(target: SDK.Target.Target): Promise<SDK.ResourceTreeModel.ResourceTreeModel>;
export declare function getMainFrame(target: SDK.Target.Target, framePayload?: Partial<Protocol.Page.Frame>): SDK.ResourceTreeModel.ResourceTreeFrame;
export declare function addChildFrame(target: SDK.Target.Target, framePayload?: Partial<Protocol.Page.Frame>): Promise<SDK.ResourceTreeModel.ResourceTreeFrame>;
export declare function createResource(frame: SDK.ResourceTreeModel.ResourceTreeFrame, networkScriptUrl: Platform.DevToolsPath.UrlString, mimeType: string, content: string): SDK.Resource.Resource;
export declare function navigate(frame: SDK.ResourceTreeModel.ResourceTreeFrame, framePayload?: Partial<Protocol.Page.Frame>, type?: Protocol.Page.NavigationType): void;
export declare function activate(target: SDK.Target.Target): void;
