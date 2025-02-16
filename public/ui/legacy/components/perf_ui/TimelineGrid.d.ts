export declare class TimelineGrid {
    element: HTMLDivElement;
    private readonly dividersElementInternal;
    private readonly gridHeaderElement;
    private eventDividersElement;
    private dividersLabelBarElementInternal;
    constructor();
    static calculateGridOffsets(calculator: Calculator, freeZoneAtLeft?: number): DividersData;
    static drawCanvasGrid(context: CanvasRenderingContext2D, dividersData: DividersData): void;
    static drawCanvasHeaders(context: CanvasRenderingContext2D, dividersData: DividersData, formatTimeFunction: (arg0: number) => string, paddingTop: number, headerHeight: number, freeZoneAtLeft?: number): void;
    get dividersElement(): HTMLElement;
    get dividersLabelBarElement(): HTMLElement;
    updateDividers(calculator: Calculator, freeZoneAtLeft?: number): boolean;
    addEventDivider(divider: Element): void;
    addEventDividers(dividers: Element[]): void;
    removeEventDividers(): void;
    hideEventDividers(): void;
    showEventDividers(): void;
    setScrollTop(scrollTop: number): void;
}
export interface Calculator {
    computePosition(value: number): number;
    formatValue(value: number, precision?: number): string;
    minimumBoundary(): number;
    zeroTime(): number;
    maximumBoundary(): number;
    boundarySpan(): number;
}
export interface DividersData {
    offsets: Array<{
        position: number;
        time: number;
    }>;
    precision: number;
}
