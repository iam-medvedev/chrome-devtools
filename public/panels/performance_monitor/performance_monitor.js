var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/performance_monitor/PerformanceMonitor.js
var PerformanceMonitor_exports = {};
__export(PerformanceMonitor_exports, {
  ControlPane: () => ControlPane,
  PerformanceMonitorImpl: () => PerformanceMonitorImpl,
  format: () => format,
  formatNumber: () => formatNumber
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as Platform2 from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as ThemeSupport from "./../../ui/legacy/theme_support/theme_support.js";
import { Directives, html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/performance_monitor/performanceMonitor.css.js
var performanceMonitor_css_default = `/*
 * Copyright 2017 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;

  --override-color-perf-monitor-cpu: var(--sys-color-yellow-bright);
  --override-color-perf-monitor-cpu-task-duration: var(--sys-color-neutral-bright);
  --override-color-perf-monitor-cpu-script-duration: var(--sys-color-yellow-bright);
  --override-color-perf-monitor-cpu-layout-duration: var(--sys-color-purple);
  --override-color-perf-monitor-cpu-recalc-style-duration: var(--sys-color-purple-bright);
  --override-color-perf-monitor-jsheap: var(--sys-color-purple-bright);
  --override-color-perf-monitor-jsheap-total-size: var(--ref-palette-purple70);
  --override-color-perf-monitor-jsheap-used-size: var(--sys-color-purple-bright);
  --override-color-perf-monitor-dom-nodes: var(--sys-color-green);
  --override-color-perf-monitor-js-event-listeners: var(--ref-palette-green80);
  --override-color-perf-monitor-documents: var(--sys-color-blue);
  --override-color-perf-monitor-document-frames: var(--sys-color-cyan-bright);
  --override-color-perf-monitor-layout-count: var(--sys-color-pink-bright);
  --override-color-perf-monitor-recalc-style-count: var(--sys-color-pink);
}

:host-context(.theme-with-dark-background) {
  --override-color-perf-monitor-jsheap-total-size: var(--ref-palette-purple50);
  --override-color-perf-monitor-js-event-listeners: var(--ref-palette-green50);
}

.suspended {
  opacity: 40%;
  pointer-events: none;
}

.perfmon-chart-suspend-overlay {
  display: flex;
  font-size: 26px;
  align-items: center;
  justify-content: center;
}

.perfmon-control-pane {
  display: flex;
  flex: initial;
  flex-direction: column;
  padding: 6px 0;
  overflow: hidden auto;
}

.perfmon-chart-container {
  display: flex;
  flex: 1 1;
  border-left: 1px solid var(--sys-color-divider);
  overflow-y: auto;
}

.perfmon-chart-container canvas {
  width: 100%;
}

.perfmon-indicator {
  padding: 3px 9px;
  margin: -1px 0;
  display: flex;
  flex-shrink: 0;
  width: 210px;
}

.perfmon-indicator span {
  flex: 0 0 135px;
}

.perfmon-indicator-value {
  flex: 0 0 55px;
  text-align: right;
  overflow: visible;
  align-self: center;
  margin-left: auto;
}

.perfmon-indicator:not(.active) .perfmon-indicator-value {
  opacity: 0%;
}

/*# sourceURL=${import.meta.resolve("./performanceMonitor.css")} */`;

// gen/front_end/panels/performance_monitor/PerformanceMonitor.js
var UIStrings = {
  /**
   * @description Aria accessible name in Performance Monitor of the Performance monitor tab
   */
  graphsDisplayingARealtimeViewOf: "Graphs displaying a real-time view of performance metrics",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  paused: "Paused",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  cpuUsage: "CPU usage",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  jsHeapSize: "JS heap size",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  domNodes: "DOM Nodes",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  jsEventListeners: "JS event listeners",
  /**
   * @description Text for documents, a type of resources
   */
  documents: "Documents",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  documentFrames: "Document Frames",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  layoutsSec: "Layouts / sec",
  /**
   * @description Text in Performance Monitor of the Performance monitor tab
   */
  styleRecalcsSec: "Style recalcs / sec"
};
var str_ = i18n.i18n.registerUIStrings("panels/performance_monitor/PerformanceMonitor.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var { widgetConfig } = UI.Widget;
var { classMap, ref } = Directives;
var DEFAULT_VIEW = (input, output, target) => {
  render(html`
    <devtools-widget .widgetConfig=${widgetConfig(ControlPane, {
    onMetricChanged: input.onMetricChanged,
    chartsInfo: input.chartsInfo,
    metrics: input.metrics
  })} class=${classMap({ suspended: input.suspended })}></devtools-widget>
    <div class="perfmon-chart-container ${classMap({ suspended: input.suspended })}">
      <canvas tabindex="-1" aria-label=${i18nString(UIStrings.graphsDisplayingARealtimeViewOf)}
          .width=${Math.round(input.width * window.devicePixelRatio)} .height=${input.height}
          style="height:${input.height / window.devicePixelRatio}px" ${ref((e) => {
    if (e) {
      const canvas = e;
      output.graphRenderingContext = canvas.getContext("2d");
      output.width = canvas.offsetWidth;
    }
  })}>
      </canvas>
    </div>
    ${input.suspended ? html`
      <div class="perfmon-chart-suspend-overlay fill">
        <div>${i18nString(UIStrings.paused)}</div>
      </div>` : ""}`, target);
};
var PerformanceMonitorImpl = class extends UI.Widget.HBox {
  view;
  chartInfos = [];
  activeCharts = /* @__PURE__ */ new Set();
  metricsBuffer;
  pixelsPerMs;
  pollIntervalMs;
  scaleHeight;
  graphHeight;
  gridColor;
  animationId;
  width;
  height;
  model;
  pollTimer;
  metrics;
  suspended = false;
  graphRenderingContext = null;
  constructor(pollIntervalMs = 500, view = DEFAULT_VIEW) {
    super({
      jslog: `${VisualLogging.panel("performance.monitor").track({ resize: true })}`,
      useShadowDom: true
    });
    this.view = view;
    this.registerRequiredCSS(performanceMonitor_css_default);
    this.metricsBuffer = [];
    this.pixelsPerMs = 10 / 1e3;
    this.pollIntervalMs = pollIntervalMs;
    this.scaleHeight = 16;
    this.graphHeight = 90;
    this.gridColor = ThemeSupport.ThemeSupport.instance().getComputedValue("--divider-line");
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.PerformanceMetricsModel.PerformanceMetricsModel, this);
  }
  onMetricStateChanged(metricName, active) {
    if (active) {
      this.activeCharts.add(metricName);
    } else {
      this.activeCharts.delete(metricName);
    }
    this.recalcChartHeight();
  }
  wasShown() {
    if (!this.model) {
      return;
    }
    this.chartInfos = this.createChartInfos();
    const themeSupport = ThemeSupport.ThemeSupport.instance();
    themeSupport.addEventListener(ThemeSupport.ThemeChangeEvent.eventName, () => {
      this.chartInfos = this.createChartInfos();
      this.requestUpdate();
    });
    SDK.TargetManager.TargetManager.instance().addEventListener("SuspendStateChanged", this.suspendStateChanged, this);
    void this.model.enable();
    this.suspendStateChanged();
    this.requestUpdate();
  }
  willHide() {
    if (!this.model) {
      return;
    }
    SDK.TargetManager.TargetManager.instance().removeEventListener("SuspendStateChanged", this.suspendStateChanged, this);
    this.stopPolling();
    void this.model.disable();
  }
  performUpdate() {
    const input = {
      onMetricChanged: this.onMetricStateChanged.bind(this),
      chartsInfo: this.chartInfos,
      metrics: this.metrics,
      width: this.width,
      height: this.height,
      suspended: this.suspended
    };
    const output = { graphRenderingContext: null, width: 0 };
    this.view(input, output, this.contentElement);
    this.graphRenderingContext = output.graphRenderingContext;
    this.width = output.width;
    this.draw();
  }
  modelAdded(model) {
    if (model.target() !== SDK.TargetManager.TargetManager.instance().primaryPageTarget()) {
      return;
    }
    this.model = model;
    if (this.isShowing()) {
      this.wasShown();
    }
  }
  modelRemoved(model) {
    if (this.model !== model) {
      return;
    }
    if (this.isShowing()) {
      this.willHide();
    }
    this.model = null;
  }
  suspendStateChanged() {
    const suspended = SDK.TargetManager.TargetManager.instance().allTargetsSuspended();
    if (suspended) {
      this.stopPolling();
    } else {
      this.startPolling();
    }
    this.suspended = suspended;
    this.requestUpdate();
  }
  startPolling() {
    this.pollTimer = window.setInterval(() => this.poll(), this.pollIntervalMs);
    this.onResize();
    const animate = () => {
      this.draw();
      this.animationId = this.contentElement.window().requestAnimationFrame(() => {
        animate();
      });
    };
    animate();
  }
  stopPolling() {
    window.clearInterval(this.pollTimer);
    this.contentElement.window().cancelAnimationFrame(this.animationId);
    this.metricsBuffer = [];
  }
  async poll() {
    if (!this.model) {
      return;
    }
    const data = await this.model.requestMetrics();
    const timestamp = data.timestamp;
    const metrics = data.metrics;
    this.metricsBuffer.push({ timestamp, metrics });
    const millisPerWidth = this.width / this.pixelsPerMs;
    const maxCount = Math.ceil(millisPerWidth / this.pollIntervalMs * 2);
    if (this.metricsBuffer.length > maxCount * 2) {
      this.metricsBuffer.splice(0, this.metricsBuffer.length - maxCount);
    }
    this.metrics = metrics;
    this.requestUpdate();
  }
  draw() {
    if (!this.graphRenderingContext) {
      return;
    }
    const ctx = this.graphRenderingContext;
    ctx.save();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.translate(0, this.scaleHeight);
    for (const chartInfo of this.chartInfos) {
      if (!this.activeCharts.has(chartInfo.metrics[0].name)) {
        continue;
      }
      this.drawChart(ctx, chartInfo, this.graphHeight);
      ctx.translate(0, this.graphHeight);
    }
    ctx.restore();
    this.drawHorizontalGrid(ctx);
    ctx.restore();
  }
  drawHorizontalGrid(ctx) {
    const labelDistanceSeconds = 10;
    const lightGray = ThemeSupport.ThemeSupport.instance().getComputedValue("--color-background-inverted-opacity-2");
    ctx.font = "10px " + Host.Platform.fontFamily();
    ctx.fillStyle = ThemeSupport.ThemeSupport.instance().getComputedValue("--color-background-inverted-opacity-50");
    const currentTime = Date.now() / 1e3;
    for (let sec = Math.ceil(currentTime); ; --sec) {
      const x = this.width - ((currentTime - sec) * 1e3 - this.pollIntervalMs) * this.pixelsPerMs;
      if (x < -50) {
        break;
      }
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      if (sec >= 0 && sec % labelDistanceSeconds === 0) {
        ctx.fillText(new Date(sec * 1e3).toLocaleTimeString(), x + 4, 12);
      }
      ctx.strokeStyle = sec % labelDistanceSeconds ? lightGray : this.gridColor;
      ctx.stroke();
    }
  }
  drawChart(ctx, chartInfo, height) {
    ctx.save();
    ctx.rect(0, 0, this.width, height);
    ctx.clip();
    const bottomPadding = 8;
    const extraSpace = 1.05;
    const max = this.calcMax(chartInfo) * extraSpace;
    const stackedChartBaseLandscape = chartInfo.stacked ? /* @__PURE__ */ new Map() : null;
    const paths = [];
    for (let i = chartInfo.metrics.length - 1; i >= 0; --i) {
      const metricInfo = chartInfo.metrics[i];
      paths.push({
        path: this.buildMetricPath(chartInfo, metricInfo, height - bottomPadding, max, i ? stackedChartBaseLandscape : null),
        color: metricInfo.color
      });
    }
    const backgroundColor = Common.Color.parse(ThemeSupport.ThemeSupport.instance().getComputedValue("--sys-color-cdt-base-container"))?.asLegacyColor();
    if (backgroundColor) {
      for (const path of paths.reverse()) {
        const color = path.color;
        ctx.save();
        const parsedColor = Common.Color.parse(color);
        if (!parsedColor) {
          continue;
        }
        ctx.fillStyle = backgroundColor.blendWith(parsedColor.setAlpha(0.2).asLegacyColor()).asString() || "";
        ctx.fill(path.path);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.5;
        ctx.stroke(path.path);
        ctx.restore();
      }
    }
    ctx.fillStyle = ThemeSupport.ThemeSupport.instance().getComputedValue("--color-background-inverted-opacity-50");
    ctx.font = `10px  ${Host.Platform.fontFamily()}`;
    ctx.fillText(chartInfo.title, 8, 10);
    this.drawVerticalGrid(ctx, height - bottomPadding, max, chartInfo);
    ctx.restore();
  }
  calcMax(chartInfo) {
    if (chartInfo.max) {
      return chartInfo.max;
    }
    const width = this.width;
    const startTime = performance.now() - this.pollIntervalMs - width / this.pixelsPerMs;
    let max = -Infinity;
    for (const metricInfo of chartInfo.metrics) {
      for (let i = this.metricsBuffer.length - 1; i >= 0; --i) {
        const metrics = this.metricsBuffer[i];
        const value = metrics.metrics.get(metricInfo.name);
        if (value !== void 0) {
          max = Math.max(max, value);
        }
        if (metrics.timestamp < startTime) {
          break;
        }
      }
    }
    if (!this.metricsBuffer.length) {
      return 10;
    }
    const base10 = Math.pow(10, Math.floor(Math.log10(max)));
    max = Math.ceil(max / base10 / 2) * base10 * 2;
    const alpha = 0.2;
    chartInfo.currentMax = max * alpha + (chartInfo.currentMax || max) * (1 - alpha);
    return chartInfo.currentMax;
  }
  drawVerticalGrid(ctx, height, max, info) {
    let base = Math.pow(10, Math.floor(Math.log10(max)));
    const firstDigit = Math.floor(max / base);
    if (firstDigit !== 1 && firstDigit % 2 === 1) {
      base *= 2;
    }
    let scaleValue = Math.floor(max / base) * base;
    const span = max;
    const topPadding = 18;
    const visibleHeight = height - topPadding;
    ctx.fillStyle = ThemeSupport.ThemeSupport.instance().getComputedValue("--color-background-inverted-opacity-50");
    ctx.strokeStyle = this.gridColor;
    ctx.beginPath();
    for (let i = 0; i < 2; ++i) {
      const y = calcY(scaleValue);
      const labelText = formatNumber(scaleValue, info);
      ctx.moveTo(0, y);
      ctx.lineTo(4, y);
      ctx.moveTo(ctx.measureText(labelText).width + 12, y);
      ctx.lineTo(this.width, y);
      ctx.fillText(labelText, 8, calcY(scaleValue) + 3);
      scaleValue /= 2;
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height + 0.5);
    ctx.lineTo(this.width, height + 0.5);
    ctx.strokeStyle = ThemeSupport.ThemeSupport.instance().getComputedValue("--color-background-inverted-opacity-2");
    ctx.stroke();
    function calcY(value) {
      return Math.round(height - visibleHeight * value / span) + 0.5;
    }
  }
  buildMetricPath(chartInfo, metricInfo, height, scaleMax, stackedChartBaseLandscape) {
    const path = new Path2D();
    const topPadding = 18;
    const visibleHeight = height - topPadding;
    if (visibleHeight < 1) {
      return path;
    }
    const span = scaleMax;
    const metricName = metricInfo.name;
    const pixelsPerMs = this.pixelsPerMs;
    const startTime = performance.now() - this.pollIntervalMs - this.width / pixelsPerMs;
    const smooth = chartInfo.smooth;
    let x = 0;
    let lastY = 0;
    let lastX = 0;
    if (this.metricsBuffer.length) {
      x = (this.metricsBuffer[0].timestamp - startTime) * pixelsPerMs;
      path.moveTo(x, calcY(0));
      path.lineTo(this.width + 5, calcY(0));
      lastY = calcY(this.metricsBuffer[this.metricsBuffer.length - 1].metrics.get(metricName) || 0);
      lastX = this.width + 5;
      path.lineTo(lastX, lastY);
    }
    for (let i = this.metricsBuffer.length - 1; i >= 0; --i) {
      const metrics = this.metricsBuffer[i];
      const timestamp = metrics.timestamp;
      let value = metrics.metrics.get(metricName) || 0;
      if (stackedChartBaseLandscape) {
        value += stackedChartBaseLandscape.get(timestamp) || 0;
        value = Platform2.NumberUtilities.clamp(value, 0, 1);
        stackedChartBaseLandscape.set(timestamp, value);
      }
      const y = calcY(value);
      x = (timestamp - startTime) * pixelsPerMs;
      if (smooth) {
        const midX = (lastX + x) / 2;
        path.bezierCurveTo(midX, lastY, midX, y, x, y);
      } else {
        path.lineTo(x, lastY);
        path.lineTo(x, y);
      }
      lastX = x;
      lastY = y;
      if (timestamp < startTime) {
        break;
      }
    }
    return path;
    function calcY(value) {
      return Math.round(height - visibleHeight * value / span) + 0.5;
    }
  }
  onResize() {
    super.onResize();
    this.recalcChartHeight();
  }
  recalcChartHeight() {
    let height = this.scaleHeight;
    for (const chartInfo of this.chartInfos) {
      if (this.activeCharts.has(chartInfo.metrics[0].name)) {
        height += this.graphHeight;
      }
    }
    this.height = Math.ceil(height * window.devicePixelRatio);
    this.requestUpdate();
  }
  createChartInfos() {
    const themeSupport = ThemeSupport.ThemeSupport.instance();
    const elementForStyles = this.contentElement;
    const defaults = {
      color: void 0,
      format: void 0,
      currentMax: void 0,
      max: void 0,
      smooth: void 0,
      stacked: void 0
    };
    return [
      {
        ...defaults,
        title: i18nString(UIStrings.cpuUsage),
        metrics: [
          {
            name: "TaskDuration",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-cpu-task-duration", elementForStyles)
          },
          {
            name: "ScriptDuration",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-cpu-script-duration", elementForStyles)
          },
          {
            name: "LayoutDuration",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-cpu-layout-duration", elementForStyles)
          },
          {
            name: "RecalcStyleDuration",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-cpu-recalc-style-duration", elementForStyles)
          }
        ],
        format: "Percent",
        smooth: true,
        stacked: true,
        color: themeSupport.getComputedValue("--override-color-perf-monitor-cpu", elementForStyles),
        max: 1,
        currentMax: void 0
      },
      {
        ...defaults,
        title: i18nString(UIStrings.jsHeapSize),
        metrics: [
          {
            name: "JSHeapTotalSize",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-jsheap-total-size", elementForStyles)
          },
          {
            name: "JSHeapUsedSize",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-jsheap-used-size", elementForStyles)
          }
        ],
        format: "Bytes",
        color: themeSupport.getComputedValue("--override-color-perf-monitor-jsheap", elementForStyles)
      },
      {
        ...defaults,
        title: i18nString(UIStrings.domNodes),
        metrics: [
          {
            name: "Nodes",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-dom-nodes", elementForStyles)
          }
        ]
      },
      {
        ...defaults,
        title: i18nString(UIStrings.jsEventListeners),
        metrics: [
          {
            name: "JSEventListeners",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-js-event-listeners", elementForStyles)
          }
        ]
      },
      {
        ...defaults,
        title: i18nString(UIStrings.documents),
        metrics: [{
          name: "Documents",
          color: themeSupport.getComputedValue("--override-color-perf-monitor-documents", elementForStyles)
        }]
      },
      {
        ...defaults,
        title: i18nString(UIStrings.documentFrames),
        metrics: [{
          name: "Frames",
          color: themeSupport.getComputedValue("--override-color-perf-monitor-document-frames", elementForStyles)
        }]
      },
      {
        ...defaults,
        title: i18nString(UIStrings.layoutsSec),
        metrics: [{
          name: "LayoutCount",
          color: themeSupport.getComputedValue("--override-color-perf-monitor-layout-count", elementForStyles)
        }]
      },
      {
        ...defaults,
        title: i18nString(UIStrings.styleRecalcsSec),
        metrics: [
          {
            name: "RecalcStyleCount",
            color: themeSupport.getComputedValue("--override-color-perf-monitor-recalc-style-count", elementForStyles)
          }
        ]
      }
    ];
  }
};
var CONTROL_PANE_DEFAULT_VIEW = (input, _output, target) => {
  render(input.chartsInfo.map((chartInfo) => {
    const chartName = chartInfo.metrics[0].name;
    const active = input.enabledCharts.has(chartName);
    const value = input.metricValues.get(chartName) || 0;
    return renderMetricIndicator(chartInfo, active, value, (e) => input.onCheckboxChange(chartName, e));
  }), target);
};
var ControlPane = class extends UI.Widget.VBox {
  #enabledChartsSetting;
  #enabledCharts;
  #onMetricChanged = null;
  #chartsInfo = [];
  #metricValues = /* @__PURE__ */ new Map();
  #view;
  constructor(element, view = CONTROL_PANE_DEFAULT_VIEW) {
    super(element, { useShadowDom: false, classes: ["perfmon-control-pane"] });
    this.#view = view;
    this.#enabledChartsSetting = Common.Settings.Settings.instance().createSetting("perfmon-active-indicators2", ["TaskDuration", "JSHeapTotalSize", "Nodes"]);
    this.#enabledCharts = new Set(this.#enabledChartsSetting.get());
  }
  set chartsInfo(chartsInfo) {
    this.#chartsInfo = chartsInfo;
    this.requestUpdate();
  }
  set onMetricChanged(callback) {
    this.#onMetricChanged = callback;
    for (const chartName of this.#enabledCharts) {
      callback(chartName, true);
    }
  }
  performUpdate() {
    const input = {
      chartsInfo: this.#chartsInfo,
      enabledCharts: this.#enabledCharts,
      metricValues: this.#metricValues,
      onCheckboxChange: this.#onCheckboxChange.bind(this)
    };
    this.#view(input, {}, this.element);
  }
  #onCheckboxChange(chartName, e) {
    this.#onToggle(chartName, e.target.checked);
    this.requestUpdate();
  }
  #onToggle(chartName, active) {
    if (active) {
      this.#enabledCharts.add(chartName);
    } else {
      this.#enabledCharts.delete(chartName);
    }
    this.#enabledChartsSetting.set(Array.from(this.#enabledCharts));
    if (this.#onMetricChanged) {
      this.#onMetricChanged(chartName, active);
    }
  }
  set metrics(metrics) {
    if (!metrics) {
      return;
    }
    for (const [name, value] of metrics.entries()) {
      this.#metricValues.set(name, value);
    }
    this.requestUpdate();
  }
};
var numberFormatter;
var percentFormatter;
function formatNumber(value, info) {
  if (!numberFormatter) {
    numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
    percentFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1, style: "percent" });
  }
  switch (info.format) {
    case "Percent":
      return percentFormatter.format(value);
    case "Bytes":
      return i18n.ByteUtilities.bytesToString(value);
    default:
      return numberFormatter.format(value);
  }
}
function renderMetricIndicator(info, active, value, onCheckboxChange) {
  const color = info.color || info.metrics[0].color;
  const chartName = info.metrics[0].name;
  return html`
      <div class="perfmon-indicator ${active ? "active" : ""}" jslog=${VisualLogging.toggle().track({
    click: true,
    keydown: "Enter"
  }).context(Platform2.StringUtilities.toKebabCase(chartName))}>
        <devtools-checkbox .checked=${active}
            @change=${onCheckboxChange} .jslogContext=${chartName}>${info.title}</devtools-checkbox>
        <div class="perfmon-indicator-value" style="color:${color}">${formatNumber(value, info)}</div>
      </div>
    `;
}
var format = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
export {
  PerformanceMonitor_exports as PerformanceMonitor
};
//# sourceMappingURL=performance_monitor.js.map
