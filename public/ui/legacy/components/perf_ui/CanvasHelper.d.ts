import { type Legend } from './FlameChart.js';
export declare function horizontalLine(context: CanvasRenderingContext2D, width: number, y: number): void;
export declare function drawExpansionArrow(context: CanvasRenderingContext2D, x: number, y: number, expanded: boolean): void;
export declare function drawIcon(context: CanvasRenderingContext2D, x: number, y: number, width: number, pathData: string, iconColor?: string): void;
export declare function drawLegends(context: CanvasRenderingContext2D, x: number, y: number, legends: Legend[]): void;
