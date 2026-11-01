import '../../../ui/components/lists/lists.js';
import '../../../ui/kit/kit.js';
import type * as Common from '../../../core/common/common.js';
import * as UI from '../../../ui/legacy/legacy.js';
interface PanelViewInput {
    discoveryConfig: Adb.NetworkDiscoveryConfig;
    onDiscoveryConfigChanged: (config: Adb.NetworkDiscoveryConfig) => void;
}
type PanelView = (input: PanelViewInput, output: undefined, target: HTMLElement) => void;
export declare class NodeConnectionsPanel extends UI.Panel.Panel {
    #private;
    constructor(view?: PanelView);
    performUpdate(): void;
}
export interface ViewInput {
    connections: string[];
    editingIndex: number | null;
    onAddClick: () => void;
    onBeginEdit: (index: number) => void;
    onCommitEdit: (index: number, value: string) => void;
    onCancelEdit: () => void;
    onDelete: (index: number) => void;
    validator: (value: string) => Common.UIString.LocalizedString | null;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class NodeConnectionsView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    static validateAddress(value: string): Common.UIString.LocalizedString | null;
    set callback(callback: (arg0: Adb.NetworkDiscoveryConfig) => void);
    set discoveryConfig(networkDiscoveryConfig: Adb.NetworkDiscoveryConfig);
    performUpdate(): void;
    discoveryConfigChanged(networkDiscoveryConfig: Adb.NetworkDiscoveryConfig): void;
}
export {};
