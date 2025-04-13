import * as Common from '../common/common.js';
import * as Platform from '../platform/platform.js';
import * as Root from '../root/root.js';
import { type AidaClientResult, type CanShowSurveyResult, type ChangeEvent, type ClickEvent, type ContextMenuDescriptor, type DoAidaConversationResult, type DragEvent, type EnumeratedHistogram, type EventTypes, type ExtensionDescriptor, type HoverEvent, type ImpressionEvent, type InspectorFrontendHostAPI, type KeyDownEvent, type LoadNetworkResourceResult, type ResizeEvent, type SettingAccessEvent, type ShowSurveyResult, type SyncInformation } from './InspectorFrontendHostAPI.js';
/**
 * The InspectorFrontendHostStub is a stub interface used the frontend is loaded like a webpage. Examples:
 *   - devtools://devtools/bundled/devtools_app.html
 *   - https://chrome-devtools-frontend.appspot.com/serve_rev/@030cc140435b0152645522b9864b75cac6c0a854/worker_app.html
 *   - http://localhost:9222/devtools/inspector.html?ws=localhost:9222/devtools/page/xTARGET_IDx
 *
 * When the frontend runs within the native embedder, then the InspectorFrontendHostAPI methods are provided
 * by devtools_compatibility.js. Those leverage `DevToolsAPI.sendMessageToEmbedder()` which match up with
 * the embedder API defined here: https://source.chromium.org/search?q=f:devtools%20f:dispatcher%20f:cc%20symbol:CreateForDevToolsFrontend&sq=&ss=chromium%2Fchromium%2Fsrc
 * The native implementations live in devtools_ui_bindings.cc: https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/devtools/devtools_ui_bindings.cc
 */
export declare class InspectorFrontendHostStub implements InspectorFrontendHostAPI {
    #private;
    events: Common.EventTarget.EventTarget<EventTypes>;
    recordedCountHistograms: Array<{
        histogramName: string;
        sample: number;
        min: number;
        exclusiveMax: number;
        bucketSize: number;
    }>;
    recordedEnumeratedHistograms: Array<{
        actionName: EnumeratedHistogram;
        actionCode: number;
    }>;
    recordedPerformanceHistograms: Array<{
        histogramName: string;
        duration: number;
    }>;
    constructor();
    platform(): string;
    loadCompleted(): void;
    bringToFront(): void;
    closeWindow(): void;
    setIsDocked(_isDocked: boolean, callback: () => void): void;
    showSurvey(_trigger: string, callback: (arg0: ShowSurveyResult) => void): void;
    canShowSurvey(_trigger: string, callback: (arg0: CanShowSurveyResult) => void): void;
    /**
     * Requests inspected page to be placed atop of the inspector frontend with specified bounds.
     */
    setInspectedPageBounds(_bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }): void;
    inspectElementCompleted(): void;
    setInjectedScriptForOrigin(_origin: string, _script: string): void;
    inspectedURLChanged(url: Platform.DevToolsPath.UrlString): void;
    copyText(text: string | null | undefined): void;
    openInNewTab(url: Platform.DevToolsPath.UrlString): void;
    openSearchResultsInNewTab(_query: string): void;
    showItemInFolder(_fileSystemPath: Platform.DevToolsPath.RawPathString): void;
    save(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string, _forceSaveAs: boolean, _isBase64: boolean): void;
    append(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString, content: string): void;
    close(url: Platform.DevToolsPath.RawPathString | Platform.DevToolsPath.UrlString): void;
    sendMessageToBackend(_message: string): void;
    recordCountHistogram(histogramName: string, sample: number, min: number, exclusiveMax: number, bucketSize: number): void;
    recordEnumeratedHistogram(actionName: EnumeratedHistogram, actionCode: number, _bucketSize: number): void;
    recordPerformanceHistogram(histogramName: string, duration: number): void;
    recordUserMetricsAction(_umaName: string): void;
    connectAutomaticFileSystem(_fileSystemPath: Platform.DevToolsPath.RawPathString, _fileSystemUUID: string, _addIfMissing: boolean, callback: (result: {
        success: boolean;
    }) => void): void;
    disconnectAutomaticFileSystem(_fileSystemPath: Platform.DevToolsPath.RawPathString): void;
    requestFileSystems(): void;
    addFileSystem(_type?: string): void;
    removeFileSystem(_fileSystemPath: Platform.DevToolsPath.RawPathString): void;
    isolatedFileSystem(_fileSystemId: string, _registeredName: string): FileSystem | null;
    loadNetworkResource(url: string, _headers: string, streamId: number, callback: (arg0: LoadNetworkResourceResult) => void): void;
    registerPreference(_name: string, _options: {
        synced?: boolean;
    }): void;
    getPreferences(callback: (arg0: {
        [x: string]: string;
    }) => void): void;
    getPreference(name: string, callback: (arg0: string) => void): void;
    setPreference(name: string, value: string): void;
    removePreference(name: string): void;
    clearPreferences(): void;
    getSyncInformation(callback: (arg0: SyncInformation) => void): void;
    getHostConfig(callback: (hostConfig: Root.Runtime.HostConfig) => void): void;
    upgradeDraggedFileSystemPermissions(_fileSystem: FileSystem): void;
    indexPath(_requestId: number, _fileSystemPath: Platform.DevToolsPath.RawPathString, _excludedFolders: string): void;
    stopIndexing(_requestId: number): void;
    searchInPath(_requestId: number, _fileSystemPath: Platform.DevToolsPath.RawPathString, _query: string): void;
    zoomFactor(): number;
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    setWhitelistedShortcuts(_shortcuts: string): void;
    setEyeDropperActive(_active: boolean): void;
    showCertificateViewer(_certChain: string[]): void;
    reattach(_callback: () => void): void;
    readyForTest(): void;
    connectionReady(): void;
    setOpenNewWindowForPopups(_value: boolean): void;
    setDevicesDiscoveryConfig(_config: Adb.Config): void;
    setDevicesUpdatesEnabled(_enabled: boolean): void;
    openRemotePage(_browserId: string, _url: string): void;
    openNodeFrontend(): void;
    showContextMenuAtPoint(_x: number, _y: number, _items: ContextMenuDescriptor[], _document: Document): void;
    isHostedMode(): boolean;
    setAddExtensionCallback(_callback: (arg0: ExtensionDescriptor) => void): void;
    initialTargetId(): Promise<string | null>;
    doAidaConversation(_request: string, _streamId: number, callback: (result: DoAidaConversationResult) => void): void;
    registerAidaClientEvent(_request: string, callback: (result: AidaClientResult) => void): void;
    recordImpression(_event: ImpressionEvent): void;
    recordResize(_event: ResizeEvent): void;
    recordClick(_event: ClickEvent): void;
    recordHover(_event: HoverEvent): void;
    recordDrag(_event: DragEvent): void;
    recordChange(_event: ChangeEvent): void;
    recordKeyDown(_event: KeyDownEvent): void;
    recordSettingAccess(_event: SettingAccessEvent): void;
}
export declare let InspectorFrontendHostInstance: InspectorFrontendHostStub;
export declare function isUnderTest(prefs?: {
    [x: string]: string;
}): boolean;
