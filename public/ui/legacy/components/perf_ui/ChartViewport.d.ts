import * as UI from '../../legacy.js';
export interface ChartViewportDelegate {
    windowChanged(startTime: number, endTime: number, animate: boolean): void;
    updateRangeSelection(startTime: number, endTime: number): void;
    setSize(width: number, height: number): void;
    update(): void;
}
export interface Config {
    enableCursorElement: boolean;
}
export declare class ChartViewport extends UI.Widget.VBox {
    #private;
    private readonly delegate;
    viewportElement: HTMLElement;
    private alwaysShowVerticalScrollInternal;
    private rangeSelectionEnabled;
    private vScrollElement;
    private vScrollContent;
    private readonly selectionOverlay;
    private selectedTimeSpanLabel;
    private cursorElement;
    private isDraggingInternal;
    private totalHeight;
    private offsetHeight;
    private scrollTop;
    private rangeSelectionStart;
    private rangeSelectionEnd;
    private dragStartPointX;
    private dragStartPointY;
    private dragStartScrollTop;
    private visibleLeftTime;
    private visibleRightTime;
    private offsetWidth;
    private targetLeftTime;
    private targetRightTime;
    private selectionOffsetShiftX;
    private selectionStartX;
    private lastMouseOffsetX?;
    private minimumBoundary;
    private totalTime;
    private isUpdateScheduled?;
    private cancelWindowTimesAnimation?;
    constructor(delegate: ChartViewportDelegate, config: Config);
    alwaysShowVerticalScroll(): void;
    disableRangeSelection(): void;
    isDragging(): boolean;
    elementsToRestoreScrollPositionsFor(): Element[];
    private updateScrollBar;
    onResize(): void;
    reset(): void;
    private updateContentElementSize;
    setContentHeight(totalHeight: number): void;
    /**
     * @param centered - If true, scrolls offset to where it is centered on the chart,
     * based on current the this.offsetHeight value.
     */
    setScrollOffset(offset: number, height?: number, centered?: boolean): void;
    scrollOffset(): number;
    chartHeight(): number;
    setBoundaries(zeroTime: number, totalTime: number): void;
    private onMouseWheel;
    private startDragging;
    private dragging;
    private endDragging;
    private startRangeSelection;
    private endRangeSelection;
    hideRangeSelection(): void;
    /**
     * @param startTime - the start time of the selection in MilliSeconds
     * @param endTime - the end time of the selection in MilliSeconds
     * TODO(crbug.com/346312365): update the type definitions in ChartViewport.ts
     */
    setRangeSelection(startTime: number, endTime: number): void;
    onClick(event: Event): void;
    private rangeSelectionDragging;
    private updateRangeSelectionOverlay;
    private onScroll;
    private onMouseOut;
    private updateCursorPosition;
    pixelToTime(x: number): number;
    pixelToTimeOffset(x: number): number;
    timeToPosition(time: number): number;
    timeToPixel(): number;
    private showCursor;
    private onChartKeyDown;
    private onChartKeyUp;
    private handleZoomPanKeys;
    private handleZoomGesture;
    private handlePanGesture;
    private requestWindowTimes;
    scheduleUpdate(): void;
    private update;
    setWindowTimes(startTime: number, endTime: number, animate?: boolean): void;
    windowLeftTime(): number;
    windowRightTime(): number;
}
