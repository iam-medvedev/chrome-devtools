import * as Common from '../../../../core/common/common.js';
import * as TraceEngine from '../../../../models/trace/trace.js';
import * as UI from '../../legacy.js';
declare const FilmStripView_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T]>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: import("../../../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.HBox;
export declare class FilmStripView extends FilmStripView_base {
    #private;
    private statusLabel;
    private zeroTime;
    constructor();
    static setImageData(imageElement: HTMLImageElement, dataUri: string | null): void;
    setModel(filmStrip: TraceEngine.Extras.FilmStrip.Data): void;
    createFrameElement(frame: TraceEngine.Extras.FilmStrip.Frame): HTMLButtonElement;
    update(): void;
    private onMouseEvent;
    private onDoubleClick;
    reset(): void;
    setStatusText(text: string): void;
}
export declare const enum Events {
    FrameSelected = "FrameSelected",
    FrameEnter = "FrameEnter",
    FrameExit = "FrameExit"
}
export type EventTypes = {
    [Events.FrameSelected]: number;
    [Events.FrameEnter]: number;
    [Events.FrameExit]: number;
};
export declare class Dialog {
    #private;
    private fragment;
    private readonly widget;
    private index;
    private dialog;
    static fromFilmStrip(filmStrip: TraceEngine.Extras.FilmStrip.Data, selectedFrameIndex: number): Dialog;
    private constructor();
    hide(): void;
    private resize;
    private keyDown;
    private onPrevFrame;
    private onNextFrame;
    private onFirstFrame;
    private onLastFrame;
    private render;
}
export {};
