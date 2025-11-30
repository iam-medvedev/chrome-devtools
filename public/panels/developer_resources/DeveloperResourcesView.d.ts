import '../../ui/legacy/legacy.js';
import type * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as TextUtils from '../../models/text_utils/text_utils.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class DeveloperResourcesRevealer implements Common.Revealer.Revealer<SDK.PageResourceLoader.ResourceKey> {
    reveal(resourceInitiatorKey: SDK.PageResourceLoader.ResourceKey): Promise<void>;
}
interface ViewInput {
    onFilterChanged: (e: CustomEvent<string>) => void;
    items: Iterable<SDK.PageResourceLoader.PageResource>;
    selectedItem: SDK.PageResourceLoader.PageResource | null;
    onSelect: (resource: SDK.PageResourceLoader.PageResource | null) => void;
    filters: TextUtils.TextUtils.ParsedFilter[];
    numResources: number;
    numLoading: number;
    loadThroughTargetSetting: Common.Settings.Setting<boolean>;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class DeveloperResourcesView extends UI.Widget.VBox {
    #private;
    constructor(view?: View);
    performUpdate(): Promise<void>;
    select(resource: SDK.PageResourceLoader.PageResource): Promise<void>;
    selectedItem(): Promise<SDK.PageResourceLoader.PageResource | null>;
    private onFilterChanged;
}
export {};
