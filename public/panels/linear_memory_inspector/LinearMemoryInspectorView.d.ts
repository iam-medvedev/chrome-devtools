import * as UI from '../../ui/legacy/legacy.js';
import * as LinearMemoryInspectorComponents from './components/components.js';
import { type LazyUint8Array } from './LinearMemoryInspectorController.js';
export interface ViewInput {
    memory?: Uint8Array<ArrayBuffer>;
    offset: number;
    address: number;
    outerMemoryLength: number;
    highlightInfo?: LinearMemoryInspectorComponents.LinearMemoryViewerUtils.HighlightInfo;
    hideValueInspector: boolean;
    valueTypes: Set<LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType>;
    valueTypeModes: Map<LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueType, LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.ValueTypeMode>;
    endianness: LinearMemoryInspectorComponents.ValueInterpreterDisplayUtils.Endianness;
    onMemoryRequest: (request: {
        start: number;
        end: number;
        address: number;
    }) => void;
    onAddressChanged: (address: number) => void;
    onSettingsChanged: (settings: LinearMemoryInspectorComponents.LinearMemoryInspector.Settings) => void;
    onDeleteMemoryHighlight: (highlightInfo: LinearMemoryInspectorComponents.LinearMemoryViewerUtils.HighlightInfo) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class LinearMemoryInspectorView extends UI.Widget.VBox {
    #private;
    constructor(element?: HTMLElement, view?: View);
    set memoryWrapper(memoryWrapper: LazyUint8Array);
    set address(address: number);
    set tabId(tabId: string);
    set hideValueInspector(hideValueInspector: boolean);
    set onAddressChanged(onAddressChanged: ((tabId: string, address: number) => void) | undefined);
    set refreshSequence(value: number);
    performUpdate(): void;
    wasShown(): void;
    updateAddress(address: number): void;
    refreshData(): void;
}
