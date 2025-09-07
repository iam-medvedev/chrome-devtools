export interface Calculator {
    computePosition(value: number): number;
    formatValue(value: number, precision?: number): string;
    minimumBoundary(): number;
    zeroTime(): number;
    maximumBoundary(): number;
    boundarySpan(): number;
}
