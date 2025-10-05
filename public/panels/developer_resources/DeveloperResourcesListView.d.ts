import '../../ui/legacy/components/data_grid/data_grid.js';
import '../../ui/components/highlighting/highlighting.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import type * as TextUtils from '../../models/text_utils/text_utils.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface ViewInput {
    items: SDK.PageResourceLoader.PageResource[];
    selectedItem: SDK.PageResourceLoader.PageResource | null;
    filters: TextUtils.TextUtils.ParsedFilter[];
    onContextMenu: (e: CustomEvent<{
        menu: UI.ContextMenu.ContextMenu;
        element: HTMLElement;
    }>) => void;
    onSelect: (e: CustomEvent<HTMLElement>) => void;
    onInitiatorMouseEnter: (frameId: Protocol.Page.FrameId | null) => void;
    onInitiatorMouseLeave: () => void;
}
export type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare class DeveloperResourcesListView extends UI.Widget.VBox {
    #private;
    constructor(element: HTMLElement, view?: View);
    set selectedItem(item: SDK.PageResourceLoader.PageResource | null);
    set onSelect(onSelect: (item: SDK.PageResourceLoader.PageResource | null) => void);
    set items(items: Iterable<SDK.PageResourceLoader.PageResource>);
    reset(): void;
    set filters(filters: TextUtils.TextUtils.ParsedFilter[]);
    performUpdate(): void;
}
