import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as UI from '../../ui/legacy/legacy.js';
import { BinaryResourceView } from './BinaryResourceView.js';
export declare class ResourceWebSocketFrameView extends UI.Widget.VBox {
    private readonly request;
    private readonly splitWidget;
    private dataGrid;
    private readonly timeComparator;
    private readonly mainToolbar;
    private readonly clearAllButton;
    private readonly filterTypeCombobox;
    private filterType;
    private readonly filterTextInput;
    private filterRegex;
    private readonly frameEmptyWidget;
    private readonly selectedNode;
    private currentSelectedNode?;
    private messageFilterSetting;
    constructor(request: SDK.NetworkRequest.NetworkRequest);
    static opCodeDescription(opCode: number, mask: boolean): string;
    wasShown(): void;
    willHide(): void;
    private frameAdded;
    private frameFilter;
    private clearFrames;
    private updateFilterSetting;
    private applyFilter;
    private onFrameSelected;
    private onFrameDeselected;
    refresh(): void;
    private sortItems;
}
declare const enum OpCodes {
    CONTINUATION_FRAME = 0,
    TEXT_FRAME = 1,
    BINARY_FRAME = 2,
    CONNECTION_CLOSE_FRAME = 8,
    PING_FRAME = 9,
    PONG_FRAME = 10
}
export declare const opCodeDescriptions: (() => string)[];
export declare class ResourceWebSocketFrameNode extends DataGrid.SortableDataGrid.SortableDataGridNode<unknown> {
    private readonly url;
    readonly frame: SDK.NetworkRequest.WebSocketFrame;
    private readonly isTextFrame;
    private dataTextInternal;
    private binaryViewInternal;
    constructor(url: Platform.DevToolsPath.UrlString, frame: SDK.NetworkRequest.WebSocketFrame);
    createCells(element: Element): void;
    nodeSelfHeight(): number;
    dataText(): string;
    opCode(): OpCodes;
    binaryView(): BinaryResourceView | null;
}
export {};
