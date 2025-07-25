import '../../ui/legacy/legacy.js';
import * as Common from '../../core/common/common.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as HAR from '../../models/har/har.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import { type EventTypes, NetworkGroupNode, type NetworkLogViewInterface, type NetworkNode, NetworkRequestNode } from './NetworkDataGridNode.js';
import { NetworkLogViewColumns } from './NetworkLogViewColumns.js';
import { type NetworkTimeCalculator } from './NetworkTimeCalculator.js';
declare const NetworkLogView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: Platform.TypeScriptUtilities.NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class NetworkLogView extends NetworkLogView_base implements SDK.TargetManager.SDKModelObserver<SDK.NetworkManager.NetworkManager>, NetworkLogViewInterface {
    #private;
    private readonly networkInvertFilterSetting;
    private readonly networkHideDataURLSetting;
    private readonly networkHideChromeExtensions;
    private readonly networkShowBlockedCookiesOnlySetting;
    private readonly networkOnlyBlockedRequestsSetting;
    private readonly networkOnlyThirdPartySetting;
    private readonly networkResourceTypeFiltersSetting;
    private readonly networkShowOptionsToGenerateHarWithSensitiveData;
    private readonly progressBarContainer;
    private readonly networkLogLargeRowsSetting;
    private rowHeightInternal;
    private readonly timeCalculatorInternal;
    private readonly durationCalculator;
    private calculatorInternal;
    private readonly columnsInternal;
    private staleRequests;
    private mainRequestLoadTime;
    private mainRequestDOMContentLoadedTime;
    private filters;
    private timeFilter;
    private hoveredNodeInternal;
    private recordingHint;
    private highlightedNode;
    private readonly linkifierInternal;
    private recording;
    private needsRefresh;
    private readonly headerHeightInternal;
    private readonly groupLookups;
    private activeGroupLookup;
    private readonly textFilterUI;
    private readonly invertFilterUI;
    private readonly moreFiltersDropDownUI;
    private readonly resourceCategoryFilterUI;
    private readonly filterParser;
    private readonly suggestionBuilder;
    private dataGrid;
    private readonly summaryToolbarInternal;
    private readonly filterBar;
    private readonly textFilterSetting;
    private networkRequestToNode;
    constructor(filterBar: UI.FilterBar.FilterBar, progressBarContainer: Element, networkLogLargeRowsSetting: Common.Settings.Setting<boolean>);
    private updateGroupByFrame;
    private static sortSearchValues;
    private static negativeFilter;
    private static requestPathFilter;
    private static subdomains;
    private static createRequestDomainFilter;
    private static requestDomainFilter;
    private static runningRequestFilter;
    private static fromCacheRequestFilter;
    private static interceptedByServiceWorkerFilter;
    private static initiatedByServiceWorkerFilter;
    private static requestResponseHeaderFilter;
    private static requestRequestHeaderFilter;
    private static requestResponseHeaderSetCookieFilter;
    private static requestMethodFilter;
    private static requestPriorityFilter;
    private static requestMimeTypeFilter;
    private static requestMixedContentFilter;
    private static requestSchemeFilter;
    private static requestCookieDomainFilter;
    private static requestCookieNameFilter;
    private static requestCookiePathFilter;
    private static requestCookieValueFilter;
    private static requestSetCookieDomainFilter;
    private static requestSetCookieNameFilter;
    private static requestSetCookieValueFilter;
    private static requestSizeLargerThanFilter;
    private static statusCodeFilter;
    private static hasOverridesFilter;
    static getHTTPRequestsFilter(request: SDK.NetworkRequest.NetworkRequest): boolean;
    private static resourceTypeFilter;
    private static requestUrlFilter;
    private static requestTimeFilter;
    private static copyRequestHeaders;
    private static copyResponseHeaders;
    private static copyResponse;
    private handleDrop;
    onLoadFromFile(file: File): Promise<void>;
    private harLoadFailed;
    private setGrouping;
    nodeForRequest(request: SDK.NetworkRequest.NetworkRequest): NetworkRequestNode | null;
    headerHeight(): number;
    setRecording(recording: boolean): void;
    columns(): NetworkLogViewColumns;
    summaryToolbar(): UI.Toolbar.Toolbar;
    modelAdded(networkManager: SDK.NetworkManager.NetworkManager): void;
    modelRemoved(networkManager: SDK.NetworkManager.NetworkManager): void;
    linkifier(): Components.Linkifier.Linkifier;
    setWindow(start: number, end: number): void;
    resetFocus(): void;
    private resetSuggestionBuilder;
    private filterChanged;
    resetFilter(): Promise<void>;
    private showRecordingHint;
    private hideRecordingHint;
    private setHidden;
    elementsToRestoreScrollPositionsFor(): Element[];
    columnExtensionResolved(): void;
    private setupDataGrid;
    private dataGridMouseMove;
    hoveredNode(): NetworkNode | null;
    private setHoveredNode;
    private dataGridMouseDown;
    private updateSummaryBar;
    scheduleRefresh(): void;
    addFilmStripFrames(times: number[]): void;
    selectFilmStripFrame(time: number): void;
    clearFilmStripFrame(): void;
    private refreshIfNeeded;
    private invalidateAllItems;
    timeCalculator(): NetworkTimeCalculator;
    calculator(): NetworkTimeCalculator;
    setCalculator(x: NetworkTimeCalculator): void;
    private loadEventFired;
    private domContentLoadedEventFired;
    wasShown(): void;
    willHide(): void;
    flatNodesList(): NetworkNode[];
    private onDataGridFocus;
    private onDataGridBlur;
    updateNodeBackground(): void;
    updateNodeSelectedClass(isSelected: boolean): void;
    stylesChanged(): void;
    private removeNodeAndMaybeAncestors;
    private refresh;
    private didRefreshForTest;
    private parentNodeForInsert;
    private reset;
    setTextFilterValue(filterString: string): void;
    private createNodeForRequest;
    private isInScope;
    private onRequestUpdated;
    private onRequestRemoved;
    private refreshRequest;
    rowHeight(): number;
    switchViewMode(gridMode: boolean): void;
    handleContextMenuForRequest(contextMenu: UI.ContextMenu.ContextMenu, request: SDK.NetworkRequest.NetworkRequest): void;
    private harRequests;
    private copyAllAsHAR;
    private copyAllURLs;
    private copyCurlCommand;
    private copyAllCurlCommand;
    private copyFetchCall;
    private copyAllFetchCall;
    private copyPowerShellCommand;
    private copyAllPowerShellCommand;
    exportAll(options: HAR.Log.BuildOptions): Promise<void>;
    private clearBrowserCache;
    private clearBrowserCookies;
    private applyFilter;
    private isValidUrl;
    private parseFilterQuery;
    private createSpecialFilter;
    private createSizeFilter;
    private filterRequests;
    private reveal;
    revealAndHighlightRequest(request: SDK.NetworkRequest.NetworkRequest): void;
    revealAndHighlightRequestWithId(requestId: NetworkForward.NetworkRequestId.NetworkRequestId): void;
    selectRequest(request: SDK.NetworkRequest.NetworkRequest, options?: NetworkForward.UIRequestLocation.FilterOptions): void;
    removeAllNodeHighlights(): void;
    private highlightNode;
    private filterOutBlobRequests;
    private generateFetchCall;
    private generateAllFetchCall;
    static generateCurlCommand(request: SDK.NetworkRequest.NetworkRequest, platform: 'unix' | 'win'): Promise<string>;
    private generateAllCurlCommand;
    private generatePowerShellCommand;
    private generateAllPowerShellCommand;
    static getDCLEventColor(): string;
    static getLoadEventColor(): string;
}
export declare function computeStackTraceText(stackTrace: Protocol.Runtime.StackTrace): string;
export declare function isRequestFilteredOut(request: NetworkRequestNode): boolean;
export declare const HTTPSchemas: {
    http: boolean;
    https: boolean;
    ws: boolean;
    wss: boolean;
};
export interface GroupLookupInterface {
    groupNodeForRequest(request: SDK.NetworkRequest.NetworkRequest): NetworkGroupNode | null;
    reset(): void;
}
export declare const overrideFilter: {
    yes: string;
    no: string;
    content: string;
    headers: string;
};
export type Filter = (request: SDK.NetworkRequest.NetworkRequest) => boolean;
export declare class MoreFiltersDropDownUI extends Common.ObjectWrapper.ObjectWrapper<UI.FilterBar.FilterUIEventTypes> implements UI.FilterBar.FilterUI {
    #private;
    private readonly filterElement;
    private readonly dropDownButton;
    private networkHideDataURLSetting;
    private networkHideChromeExtensionsSetting;
    private networkShowBlockedCookiesOnlySetting;
    private networkOnlyBlockedRequestsSetting;
    private networkOnlyThirdPartySetting;
    private activeFiltersCount;
    private activeFiltersCountAdorner;
    constructor();
    showMoreFiltersContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    selectedFilters(): string[];
    updateActiveFiltersCount(): void;
    updateTooltip(): void;
    isActive(): boolean;
    element(): HTMLDivElement;
}
export {};
