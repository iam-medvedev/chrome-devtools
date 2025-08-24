import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
interface PerformanceMonitorInput {
    onMetricChanged: (metricName: string, active: boolean) => void;
    chartsInfo: ChartInfo[];
    metrics?: Map<string, number>;
    width: number;
    height: number;
    suspended: boolean;
}
interface PerformanceMonitorOutput {
    graphRenderingContext: CanvasRenderingContext2D | null;
    width: number;
}
type PerformanceMonitorView = (input: PerformanceMonitorInput, output: PerformanceMonitorOutput, target: HTMLElement) => void;
export declare class PerformanceMonitorImpl extends UI.Widget.HBox implements SDK.TargetManager.SDKModelObserver<SDK.PerformanceMetricsModel.PerformanceMetricsModel> {
    private view;
    private chartInfos;
    private activeCharts;
    private metricsBuffer;
    private readonly pixelsPerMs;
    private pollIntervalMs;
    private readonly scaleHeight;
    private graphHeight;
    private gridColor;
    private animationId;
    private width;
    private height;
    private model?;
    private pollTimer?;
    private metrics?;
    private suspended;
    private graphRenderingContext;
    constructor(pollIntervalMs?: number, view?: PerformanceMonitorView);
    private onMetricStateChanged;
    wasShown(): void;
    willHide(): void;
    performUpdate(): void;
    modelAdded(model: SDK.PerformanceMetricsModel.PerformanceMetricsModel): void;
    modelRemoved(model: SDK.PerformanceMetricsModel.PerformanceMetricsModel): void;
    private suspendStateChanged;
    private startPolling;
    private stopPolling;
    private poll;
    private draw;
    private drawHorizontalGrid;
    private drawChart;
    private calcMax;
    private drawVerticalGrid;
    private buildMetricPath;
    onResize(): void;
    private recalcChartHeight;
    private createChartInfos;
}
export declare const enum Format {
    PERCENT = "Percent",
    BYTES = "Bytes"
}
interface ControlPaneInput {
    chartsInfo: ChartInfo[];
    enabledCharts: Set<string>;
    metricValues: Map<string, number>;
    onCheckboxChange: (chartName: string, e: Event) => void;
}
type ControlPaneView = (input: ControlPaneInput, output: object, target: HTMLElement) => void;
export declare class ControlPane extends UI.Widget.VBox {
    #private;
    constructor(element: HTMLElement, view?: ControlPaneView);
    set chartsInfo(chartsInfo: ChartInfo[]);
    set onMetricChanged(callback: (metricName: string, active: boolean) => void);
    performUpdate(): void;
    set metrics(metrics: Map<string, number> | undefined);
}
export declare function formatNumber(value: number, info: ChartInfo): string;
export declare const format: Intl.NumberFormat;
export interface MetricInfo {
    name: string;
    color: string;
}
export interface ChartInfo {
    title: Common.UIString.LocalizedString;
    metrics: Array<{
        name: string;
        color: string;
    }>;
    max?: number;
    currentMax?: number;
    format?: Format;
    smooth?: boolean;
    color?: string;
    stacked?: boolean;
}
export {};
