import '../../ui/legacy/legacy.js';
import * as SDK from '../../core/sdk/sdk.js';
import type * as Protocol from '../../generated/protocol.js';
import * as UI from '../../ui/legacy/legacy.js';
import { WebAudioModel } from './WebAudioModel.js';
interface ViewInput {
    contexts: Protocol.WebAudio.BaseAudioContext[];
    selectedContextIndex: number;
    onContextSelectorSelectionChanged: (contextId: string) => void;
    contextRealtimeData: Protocol.WebAudio.ContextRealtimeData | null;
}
type View = (input: ViewInput, output: object, target: HTMLElement) => void;
export declare const DEFAULT_VIEW: View;
export declare class WebAudioView extends UI.Widget.VBox implements SDK.TargetManager.SDKModelObserver<WebAudioModel> {
    private readonly knownContexts;
    private readonly contextSelectorItems;
    private contextRealtimeData;
    private readonly view;
    private selectedContextIndex;
    private readonly pollRealtimeDataThrottler;
    constructor(element?: HTMLElement, view?: View);
    wasShown(): void;
    willHide(): void;
    modelAdded(webAudioModel: WebAudioModel): void;
    modelRemoved(webAudioModel: WebAudioModel): void;
    performUpdate(): void;
    private addEventListeners;
    private removeEventListeners;
    private onContextSelectorSelectionChanged;
    private contextCreated;
    private contextDestroyed;
    private contextChanged;
    private reset;
    private setContextRealtimeData;
    private pollRealtimeData;
}
export {};
