import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export interface TrendInfo {
    text: string;
    label?: string;
    increasing: boolean;
}
export interface IsolateItemInfo {
    id: string;
    heapText: string;
    trend: TrendInfo;
    titles: string[];
}
export interface ViewInput {
    items: IsolateItemInfo[];
    selectedIndex: number;
    trendIntervalMinutes: number;
    totalText: string;
    trend: TrendInfo;
    onSelect: (index: number) => void;
}
export type View = (input: ViewInput, _output: undefined, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class IsolateSelector extends UI.Widget.VBox implements SDK.IsolateManager.Observer {
    #private;
    constructor(element?: HTMLElement, view?: View);
    performUpdate(): void;
    wasShown(): void;
    willHide(): void;
    isolateAdded(isolate: SDK.IsolateManager.Isolate): void;
    isolateChanged(isolate: SDK.IsolateManager.Isolate): void;
    isolateRemoved(isolate: SDK.IsolateManager.Isolate): void;
    targetChanged(event: Common.EventTarget.EventTargetEvent<SDK.Target.Target>): void;
    heapStatsChanged(event: Common.EventTarget.EventTargetEvent<SDK.IsolateManager.Isolate>): void;
    updateTotal(): void;
}
