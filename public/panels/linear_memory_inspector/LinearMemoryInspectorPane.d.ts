import '../../ui/kit/kit.js';
import * as Common from '../../core/common/common.js';
import * as UI from '../../ui/legacy/legacy.js';
import type { LazyUint8Array } from './LinearMemoryInspectorController.js';
export interface TabData {
    tabId: string;
    title: string;
    memoryWrapper: LazyUint8Array;
    address: number;
    refreshSequence: number;
}
export interface ViewInput {
    tabs: TabData[];
    selectedTabId?: string;
    onTabClosed: (tabId: string) => void;
    onTabSelected: (tabId: string) => void;
    onAddressChanged: (tabId: string, address: number) => void;
}
export type View = (input: ViewInput, output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
declare const LinearMemoryInspectorPaneBase: Common.ObjectWrapper.EventMixin<EventTypes, typeof UI.Widget.VBox>;
export declare class LinearMemoryInspectorPane extends LinearMemoryInspectorPaneBase {
    #private;
    constructor(element?: HTMLElement, view?: View);
    static instance(): LinearMemoryInspectorPane;
    wasShown(): void;
    performUpdate(): void;
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
export {};
