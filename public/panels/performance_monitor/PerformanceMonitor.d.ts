import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class PerformanceMonitorImpl extends UI.Widget.HBox implements SDK.TargetManager.SDKModelObserver<SDK.PerformanceMetricsModel.PerformanceMetricsModel> {
    private metricsBuffer;
    private readonly pixelsPerMs;
    private pollIntervalMs;
    private readonly scaleHeight;
    private graphHeight;
    private gridColor;
    private controlPane;
    private canvas;
    private animationId;
    private width;
    private height;
    private model?;
    private pollTimer?;
    constructor(pollIntervalMs?: number);
    wasShown(): void;
    willHide(): void;
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
}
export declare const enum Format {
    PERCENT = "Percent",
    BYTES = "Bytes"
}
export declare class ControlPane extends Common.ObjectWrapper.ObjectWrapper<EventTypes> {
    element: Element;
    private readonly enabledChartsSetting;
    private readonly enabledCharts;
    private chartsInfo;
    private indicators;
    constructor(parent: Element);
    instantiateMetricData(): void;
    private onToggle;
    charts(): ChartInfo[];
    isActive(metricName: string): boolean;
    updateMetrics(metrics: Map<string, number>): void;
}
declare const enum Events {
    METRIC_CHANGED = "MetricChanged"
}
interface EventTypes {
    [Events.METRIC_CHANGED]: void;
}
export declare class MetricIndicator {
    private info;
    element: HTMLElement;
    private readonly swatchElement;
    private valueElement;
    private color;
    constructor(parent: Element, info: ChartInfo, active: boolean, onToggle: (arg0: boolean) => void);
    static formatNumber(value: number, info: ChartInfo): string;
    setValue(value: number): void;
}
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
