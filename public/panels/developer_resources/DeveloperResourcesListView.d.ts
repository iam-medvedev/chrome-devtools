import '../../ui/legacy/components/data_grid/data_grid.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    items: SDK.PageResourceLoader.PageResource[];
    highlight: (element: Element, textContent: string, columnId: string) => void;
    filters: TextUtils.TextUtils.ParsedFilter[];
    onContextMenu: (e: CustomEvent<{
        menu: UI.ContextMenu.ContextMenu;
        element: HTMLElement;
    }>) => void;
    onInitiatorMouseEnter: (frameId: Protocol.Page.FrameId | null) => void;
    onInitiatorMouseLeave: () => void;
}
export interface ViewOutput {
}
export type View = (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class DeveloperResourcesListView extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    select(item: SDK.PageResourceLoader.PageResource): void;
    selectedItem(): SDK.PageResourceLoader.PageResource | null;
    set items(items: Iterable<SDK.PageResourceLoader.PageResource>);
    reset(): void;
    updateFilterAndHighlight(filters: TextUtils.TextUtils.ParsedFilter[]): void;
    getNumberOfVisibleItems(): number;
    wasShown(): void;
    performUpdate(): void;
}
