import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LinearMemoryInspectorComponents from './components/components.js';
import { type LazyUint8Array } from './LinearMemoryInspectorController.js';
declare const LinearMemoryInspectorPaneBase: Common.ObjectWrapper.EventMixin<EventTypes, typeof UI.Widget.VBox>;
export declare class LinearMemoryInspectorPane extends LinearMemoryInspectorPaneBase {
    #private;
    constructor();
    createPlaceholder(): HTMLElement;
    static instance(): LinearMemoryInspectorPane;
    create(tabId: string, title: string, arrayWrapper: LazyUint8Array, address?: number): void;
    close(tabId: string): void;
    reveal(tabId: string, address?: number): void;
    refreshView(tabId: string): void;
}
export declare const enum Events {
    VIEW_CLOSED = "ViewClosed"
}
export interface EventTypes {
    [Events.VIEW_CLOSED]: string;
}
export declare class LinearMemoryInspectorView extends UI.Widget.VBox {
    #private;
    firstTimeOpen: boolean;
    constructor(memoryWrapper: LazyUint8Array, address: number | undefined, tabId: string, hideValueInspector?: boolean);
    render(): void;
    wasShown(): void;
    saveSettings(settings: LinearMemoryInspectorComponents.LinearMemoryInspector.Settings): void;
    updateAddress(address: number): void;
    refreshData(): void;
}
export {};
