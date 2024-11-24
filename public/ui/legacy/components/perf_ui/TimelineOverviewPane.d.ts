import * as Common from '../../../../core/common/common.js';
import * as Trace from '../../../../models/trace/trace.js';
import * as UI from '../../legacy.js';
import { TimelineOverviewCalculator } from './TimelineOverviewCalculator.js';
declare const TimelineOverviewPane_base: (new (...args: any[]) => {
    "__#13@#events": Common.ObjectWrapper.ObjectWrapper<EventTypes>;
    addEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): Common.EventTarget.EventDescriptor<EventTypes, T>;
    once<T extends keyof EventTypes>(eventType: T): Promise<EventTypes[T]>;
    removeEventListener<T extends keyof EventTypes>(eventType: T, listener: (arg0: Common.EventTarget.EventTargetEvent<EventTypes[T], any>) => void, thisObject?: Object): void;
    hasEventListeners(eventType: keyof EventTypes): boolean;
    dispatchEventToListeners<T extends keyof EventTypes>(eventType: import("../../../../core/platform/TypescriptUtilities.js").NoUnion<T>, ...eventData: Common.EventTarget.EventPayloadToRestParameters<EventTypes, T>): void;
}) & typeof UI.Widget.VBox;
export declare class TimelineOverviewPane extends TimelineOverviewPane_base {
    #private;
    readonly overviewCalculator: TimelineOverviewCalculator;
    private readonly overviewGrid;
    private readonly cursorArea;
    private cursorElement;
    private overviewControls;
    private markers;
    private readonly overviewInfo;
    private readonly updateThrottler;
    private cursorEnabled;
    private cursorPosition;
    private lastWidth;
    private windowStartTime;
    private windowEndTime;
    private muteOnWindowChanged;
    constructor(prefix: string);
    enableCreateBreadcrumbsButton(): void;
    private onMouseMove;
    private buildOverviewInfo;
    private hideCursor;
    wasShown(): void;
    willHide(): void;
    onResize(): void;
    setOverviewControls(overviewControls: TimelineOverview[]): void;
    set showingScreenshots(isShowing: boolean);
    setBounds(minimumBoundary: Trace.Types.Timing.MilliSeconds, maximumBoundary: Trace.Types.Timing.MilliSeconds): void;
    setNavStartTimes(navStartTimes: readonly Trace.Types.Events.NavigationStart[]): void;
    scheduleUpdate(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
    update(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
    setMarkers(markers: Map<number, HTMLDivElement>): void;
    getMarkers(): Map<number, HTMLDivElement>;
    private updateMarkers;
    reset(): void;
    private onClick;
    private onBreadcrumbAdded;
    private onWindowChanged;
    setWindowTimes(startTime: number, endTime: number): void;
    private updateWindow;
    highlightBounds(bounds: Trace.Types.Timing.TraceWindowMicroSeconds, withBracket: boolean): void;
    clearBoundsHighlight(): void;
}
export declare const enum Events {
    OVERVIEW_PANE_WINDOW_CHANGED = "OverviewPaneWindowChanged",
    OVERVIEW_PANE_BREADCRUMB_ADDED = "OverviewPaneBreadcrumbAdded",
    OVERVIEW_PANE_MOUSE_MOVE = "OverviewPaneMouseMove",
    OVERVIEW_PANE_MOUSE_LEAVE = "OverviewPaneMouseLeave"
}
export interface OverviewPaneWindowChangedEvent {
    startTime: Trace.Types.Timing.MilliSeconds;
    endTime: Trace.Types.Timing.MilliSeconds;
}
export interface OverviewPaneBreadcrumbAddedEvent {
    startTime: Trace.Types.Timing.MilliSeconds;
    endTime: Trace.Types.Timing.MilliSeconds;
}
export interface OverviewPaneMouseMoveEvent {
    timeInMicroSeconds: Trace.Types.Timing.MicroSeconds;
}
export type EventTypes = {
    [Events.OVERVIEW_PANE_WINDOW_CHANGED]: OverviewPaneWindowChangedEvent;
    [Events.OVERVIEW_PANE_BREADCRUMB_ADDED]: OverviewPaneBreadcrumbAddedEvent;
    [Events.OVERVIEW_PANE_MOUSE_MOVE]: OverviewPaneMouseMoveEvent;
    [Events.OVERVIEW_PANE_MOUSE_LEAVE]: void;
};
export interface TimelineOverview {
    show(parentElement: Element, insertBefore?: Element | null): void;
    update(start?: Trace.Types.Timing.MilliSeconds, end?: Trace.Types.Timing.MilliSeconds): void;
    dispose(): void;
    reset(): void;
    overviewInfoPromise(x: number): Promise<Element | null>;
    onClick(event: Event): boolean;
    setCalculator(calculator: TimelineOverviewCalculator): void;
}
export declare class TimelineOverviewBase extends UI.Widget.VBox implements TimelineOverview {
    private calculatorInternal;
    private canvas;
    private contextInternal;
    constructor();
    width(): number;
    height(): number;
    context(): CanvasRenderingContext2D;
    calculator(): TimelineOverviewCalculator | null;
    update(): void;
    dispose(): void;
    reset(): void;
    overviewInfoPromise(_x: number): Promise<Element | null>;
    setCalculator(calculator: TimelineOverviewCalculator): void;
    onClick(_event: Event): boolean;
    resetCanvas(): void;
    setCanvasSize(width: number, height: number): void;
}
export declare class OverviewInfo {
    private readonly anchorElement;
    private glassPane;
    private visible;
    private readonly element;
    constructor(anchor: Element);
    setContent(contentPromise: Promise<DocumentFragment>): Promise<void>;
    hide(): void;
}
export {};
