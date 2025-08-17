var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/web_audio/WebAudioModel.js
var WebAudioModel_exports = {};
__export(WebAudioModel_exports, {
  WebAudioModel: () => WebAudioModel
});
import * as SDK from "./../../core/sdk/sdk.js";
var WebAudioModel = class extends SDK.SDKModel.SDKModel {
  enabled;
  agent;
  constructor(target) {
    super(target);
    this.enabled = false;
    this.agent = target.webAudioAgent();
    target.registerWebAudioDispatcher(this);
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.ResourceTreeModel.ResourceTreeModel, SDK.ResourceTreeModel.Events.FrameNavigated, this.flushContexts, this);
  }
  flushContexts() {
    this.dispatchEventToListeners(
      "ModelReset"
      /* Events.MODEL_RESET */
    );
  }
  async suspendModel() {
    this.dispatchEventToListeners(
      "ModelSuspend"
      /* Events.MODEL_SUSPEND */
    );
    await this.agent.invoke_disable();
  }
  async resumeModel() {
    if (!this.enabled) {
      return await Promise.resolve();
    }
    await this.agent.invoke_enable();
  }
  ensureEnabled() {
    if (this.enabled) {
      return;
    }
    void this.agent.invoke_enable();
    this.enabled = true;
  }
  contextCreated({ context }) {
    this.dispatchEventToListeners("ContextCreated", context);
  }
  contextWillBeDestroyed({ contextId }) {
    this.dispatchEventToListeners("ContextDestroyed", contextId);
  }
  contextChanged({ context }) {
    this.dispatchEventToListeners("ContextChanged", context);
  }
  audioListenerCreated({ listener }) {
    this.dispatchEventToListeners("AudioListenerCreated", listener);
  }
  audioListenerWillBeDestroyed({ listenerId, contextId }) {
    this.dispatchEventToListeners("AudioListenerWillBeDestroyed", { listenerId, contextId });
  }
  audioNodeCreated({ node }) {
    this.dispatchEventToListeners("AudioNodeCreated", node);
  }
  audioNodeWillBeDestroyed({ contextId, nodeId }) {
    this.dispatchEventToListeners("AudioNodeWillBeDestroyed", { contextId, nodeId });
  }
  audioParamCreated({ param }) {
    this.dispatchEventToListeners("AudioParamCreated", param);
  }
  audioParamWillBeDestroyed({ contextId, nodeId, paramId }) {
    this.dispatchEventToListeners("AudioParamWillBeDestroyed", { contextId, nodeId, paramId });
  }
  nodesConnected({ contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex }) {
    this.dispatchEventToListeners("NodesConnected", { contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex });
  }
  nodesDisconnected({ contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex }) {
    this.dispatchEventToListeners("NodesDisconnected", { contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex });
  }
  nodeParamConnected({ contextId, sourceId, destinationId, sourceOutputIndex }) {
    this.dispatchEventToListeners("NodeParamConnected", { contextId, sourceId, destinationId, sourceOutputIndex });
  }
  nodeParamDisconnected({ contextId, sourceId, destinationId, sourceOutputIndex }) {
    this.dispatchEventToListeners("NodeParamDisconnected", { contextId, sourceId, destinationId, sourceOutputIndex });
  }
  async requestRealtimeData(contextId) {
    const realtimeResponse = await this.agent.invoke_getRealtimeData({ contextId });
    return realtimeResponse.realtimeData;
  }
};
SDK.SDKModel.SDKModel.register(WebAudioModel, { capabilities: 2, autostart: false });

// gen/front_end/panels/web_audio/WebAudioView.js
var WebAudioView_exports = {};
__export(WebAudioView_exports, {
  WebAudioView: () => WebAudioView
});
import "./../../ui/legacy/legacy.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";
import * as GraphVisualizer from "./graph_visualizer/graph_visualizer.js";

// gen/front_end/panels/web_audio/webAudio.css.js
var webAudio_css_default = `/*
 * Copyright 2019 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  overflow: hidden;
}

.web-audio-toolbar-container {
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  min-height: fit-content;
}

.web-audio-landing-page {
  position: absolute;
  background-color: var(--sys-color-cdt-base-container);
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 13px;
  color: var(--sys-color-on-surface);
}

.web-audio-landing-page > div {
  max-width: 500px;
  margin: 10px;
}

.web-audio-landing-page > div > p {
  flex: none;
  white-space: pre-line;
}

.web-audio-content-container {
  overflow-y: auto;
}

.web-audio-details-container {
  min-height: fit-content;
}

.web-audio-summary-container {
  flex-shrink: 0;
}

.context-detail-container {
  flex: none;
  display: flex;
  background-color: var(--sys-color-cdt-base-container);
  flex-direction: column;
}

.context-detail-header {
  border-bottom: 1px solid var(--sys-color-divider);
  padding: var(--sys-size-7) var(--sys-size-9);
  margin-bottom: var(--sys-size-5);
}

.context-detail-title {
  font: var(--sys-typescale-headline4);
}

.context-detail-subtitle {
  font: var(--sys-typescale-body4-regular);
  user-select: text;
}

.context-detail-row {
  grid-template-columns: min-content 1fr;
  display: grid;
  line-height: 18px;
  margin: var(--sys-size-3) var(--sys-size-9) var(--sys-size-3) var(--sys-size-9);
  gap:  var(--sys-size-6);
}

.context-detail-row-entry:not(:empty) {
  color: var(--sys-color-on-surface-subtle);
  overflow: hidden;
  min-width: 130px;
  font: var(--sys-typescale-body5-medium);
}

.context-detail-row-value {
  user-select: text;
  text-overflow: ellipsis;
  overflow: hidden;
  font: var(--sys-typescale-body4-regular);
}

.context-summary-container {
  flex: 0 0 27px;
  line-height: 27px;
  padding-left: 5px;
  background-color: var(--sys-color-cdt-base-container);
  border-top: 1px solid var(--sys-color-divider);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.context-summary-container span {
  margin-right: 6px;
}

/*# sourceURL=${import.meta.resolve("./webAudio.css")} */`;

// gen/front_end/panels/web_audio/WebAudioView.js
var UIStrings = {
  /**
   * @description Text in Web Audio View if there is nothing to show.
   * Web Audio API is an API for controlling audio on the web.
   */
  noWebAudio: "No Web Audio API usage detected",
  /**
   * @description Text in Web Audio View
   */
  openAPageThatUsesWebAudioApiTo: "Open a page that uses Web Audio API to start monitoring.",
  /**
   * @description Text that shows there is no recording
   */
  noRecordings: "(no recordings)",
  /**
   * @description Label prefix for an audio context selection
   * @example {realtime (1e03ec)} PH1
   */
  audioContextS: "Audio context: {PH1}",
  /**
   * @description The current state of an item
   */
  state: "State",
  /**
   * @description Text in Web Audio View
   */
  sampleRate: "Sample Rate",
  /**
   * @description Text in Web Audio View
   */
  callbackBufferSize: "Callback Buffer Size",
  /**
   * @description Label in the Web Audio View for the maximum number of output channels
   * that this Audio Context has.
   */
  maxOutputChannels: "Max Output Channels",
  /**
   * @description Text in Web Audio View
   */
  currentTime: "Current Time",
  /**
   * @description Text in Web Audio View
   */
  callbackInterval: "Callback Interval",
  /**
   * @description Text in Web Audio View
   */
  renderCapacity: "Render Capacity"
};
var str_ = i18n.i18n.registerUIStrings("panels/web_audio/WebAudioView.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var WEBAUDIO_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/webaudio";
var WebAudioView = class extends UI.ThrottledWidget.ThrottledWidget {
  contentContainer;
  detailViewContainer;
  graphManager;
  landingPage;
  summaryBarContainer;
  contextSelectorPlaceholderText;
  contextSelectorElement;
  contextSelectorItems;
  contextSelectorToolbarItem;
  constructor() {
    super(true, 1e3);
    this.registerRequiredCSS(webAudio_css_default);
    this.element.setAttribute("jslog", `${VisualLogging.panel("web-audio").track({ resize: true })}`);
    this.element.classList.add("web-audio-drawer");
    const toolbarContainer = this.contentElement.createChild("div", "web-audio-toolbar-container vbox");
    toolbarContainer.role = "toolbar";
    this.contextSelectorPlaceholderText = i18nString(UIStrings.noRecordings);
    this.contextSelectorItems = new UI.ListModel.ListModel();
    this.contextSelectorElement = document.createElement("select");
    this.contextSelectorToolbarItem = new UI.Toolbar.ToolbarItem(this.contextSelectorElement);
    this.contextSelectorToolbarItem.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.contextSelectorPlaceholderText }));
    this.contextSelectorElement.addEventListener("change", this.onContextSelectorSelectionChanged.bind(this));
    this.contextSelectorElement.disabled = true;
    this.addContextSelectorPlaceholderOption();
    this.contextSelectorItems.addEventListener("ItemsReplaced", this.onContextSelectorListItemReplaced, this);
    const toolbar2 = toolbarContainer.createChild("devtools-toolbar", "web-audio-toolbar");
    toolbar2.role = "presentation";
    toolbar2.appendToolbarItem(UI.Toolbar.Toolbar.createActionButton("components.collect-garbage"));
    toolbar2.appendSeparator();
    toolbar2.appendToolbarItem(this.contextSelectorToolbarItem);
    toolbar2.setAttribute("jslog", `${VisualLogging.toolbar()}`);
    this.contentContainer = this.contentElement.createChild("div", "web-audio-content-container vbox flex-auto");
    this.detailViewContainer = this.contentContainer.createChild("div", "web-audio-details-container vbox flex-auto");
    this.graphManager = new GraphVisualizer.GraphManager.GraphManager();
    this.landingPage = new UI.EmptyWidget.EmptyWidget(i18nString(UIStrings.noWebAudio), i18nString(UIStrings.openAPageThatUsesWebAudioApiTo));
    this.landingPage.link = WEBAUDIO_EXPLANATION_URL;
    this.landingPage.show(this.detailViewContainer);
    this.summaryBarContainer = this.contentContainer.createChild("div", "web-audio-summary-container");
    SDK2.TargetManager.TargetManager.instance().observeModels(WebAudioModel, this);
  }
  wasShown() {
    super.wasShown();
    for (const model of SDK2.TargetManager.TargetManager.instance().models(WebAudioModel)) {
      this.addEventListeners(model);
    }
  }
  willHide() {
    for (const model of SDK2.TargetManager.TargetManager.instance().models(WebAudioModel)) {
      this.removeEventListeners(model);
    }
  }
  modelAdded(webAudioModel) {
    if (this.isShowing()) {
      this.addEventListeners(webAudioModel);
    }
  }
  modelRemoved(webAudioModel) {
    this.removeEventListeners(webAudioModel);
  }
  async doUpdate() {
    await this.pollRealtimeData();
    this.update();
  }
  addEventListeners(webAudioModel) {
    webAudioModel.ensureEnabled();
    webAudioModel.addEventListener("ContextCreated", this.contextCreated, this);
    webAudioModel.addEventListener("ContextDestroyed", this.contextDestroyed, this);
    webAudioModel.addEventListener("ContextChanged", this.contextChanged, this);
    webAudioModel.addEventListener("ModelReset", this.reset, this);
    webAudioModel.addEventListener("ModelSuspend", this.suspendModel, this);
    webAudioModel.addEventListener("AudioListenerCreated", this.audioListenerCreated, this);
    webAudioModel.addEventListener("AudioListenerWillBeDestroyed", this.audioListenerWillBeDestroyed, this);
    webAudioModel.addEventListener("AudioNodeCreated", this.audioNodeCreated, this);
    webAudioModel.addEventListener("AudioNodeWillBeDestroyed", this.audioNodeWillBeDestroyed, this);
    webAudioModel.addEventListener("AudioParamCreated", this.audioParamCreated, this);
    webAudioModel.addEventListener("AudioParamWillBeDestroyed", this.audioParamWillBeDestroyed, this);
    webAudioModel.addEventListener("NodesConnected", this.nodesConnected, this);
    webAudioModel.addEventListener("NodesDisconnected", this.nodesDisconnected, this);
    webAudioModel.addEventListener("NodeParamConnected", this.nodeParamConnected, this);
    webAudioModel.addEventListener("NodeParamDisconnected", this.nodeParamDisconnected, this);
  }
  removeEventListeners(webAudioModel) {
    webAudioModel.removeEventListener("ContextCreated", this.contextCreated, this);
    webAudioModel.removeEventListener("ContextDestroyed", this.contextDestroyed, this);
    webAudioModel.removeEventListener("ContextChanged", this.contextChanged, this);
    webAudioModel.removeEventListener("ModelReset", this.reset, this);
    webAudioModel.removeEventListener("ModelSuspend", this.suspendModel, this);
    webAudioModel.removeEventListener("AudioListenerCreated", this.audioListenerCreated, this);
    webAudioModel.removeEventListener("AudioListenerWillBeDestroyed", this.audioListenerWillBeDestroyed, this);
    webAudioModel.removeEventListener("AudioNodeCreated", this.audioNodeCreated, this);
    webAudioModel.removeEventListener("AudioNodeWillBeDestroyed", this.audioNodeWillBeDestroyed, this);
    webAudioModel.removeEventListener("AudioParamCreated", this.audioParamCreated, this);
    webAudioModel.removeEventListener("AudioParamWillBeDestroyed", this.audioParamWillBeDestroyed, this);
    webAudioModel.removeEventListener("NodesConnected", this.nodesConnected, this);
    webAudioModel.removeEventListener("NodesDisconnected", this.nodesDisconnected, this);
    webAudioModel.removeEventListener("NodeParamConnected", this.nodeParamConnected, this);
    webAudioModel.removeEventListener("NodeParamDisconnected", this.nodeParamDisconnected, this);
  }
  addContextSelectorPlaceholderOption() {
    const placeholderOption = UI.Fragment.html`
    <option value="" hidden>${this.contextSelectorPlaceholderText}</option>`;
    this.contextSelectorElement.appendChild(placeholderOption);
  }
  onContextSelectorListItemReplaced() {
    this.contextSelectorElement.removeChildren();
    if (this.contextSelectorItems.length === 0) {
      this.addContextSelectorPlaceholderOption();
      this.contextSelectorElement.disabled = true;
      this.onContextSelectorSelectionChanged();
      return;
    }
    for (const context of this.contextSelectorItems) {
      const option = UI.Fragment.html`
    <option value=${context.contextId}>${this.titleForContext(context)}</option>`;
      this.contextSelectorElement.appendChild(option);
    }
    this.contextSelectorElement.disabled = false;
    this.onContextSelectorSelectionChanged();
  }
  selectedContext() {
    const selectedValue = this.contextSelectorElement.value;
    if (!selectedValue) {
      return null;
    }
    return this.contextSelectorItems.find((context) => context.contextId === selectedValue) || null;
  }
  onContextSelectorSelectionChanged() {
    const selectedContext = this.selectedContext();
    if (selectedContext) {
      this.contextSelectorToolbarItem.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.titleForContext(selectedContext) }));
    } else {
      this.contextSelectorToolbarItem.setTitle(i18nString(UIStrings.audioContextS, { PH1: this.contextSelectorPlaceholderText }));
    }
    this.updateDetailView(selectedContext);
    void this.doUpdate();
  }
  titleForContext(context) {
    return `${context.contextType} (${context.contextId.substr(-6)})`;
  }
  contextCreated(event) {
    const context = event.data;
    this.graphManager.createContext(context.contextId);
    this.contextSelectorItems.insert(this.contextSelectorItems.length, context);
    this.onContextSelectorListItemReplaced();
  }
  contextDestroyed(event) {
    const contextId = event.data;
    this.graphManager.destroyContext(contextId);
    const index = this.contextSelectorItems.findIndex((context) => context.contextId === contextId);
    if (index > -1) {
      this.contextSelectorItems.remove(index);
      this.onContextSelectorListItemReplaced();
    }
  }
  contextChanged(event) {
    const context = event.data;
    if (!this.graphManager.hasContext(context.contextId)) {
      return;
    }
    const changedContext = event.data;
    const index = this.contextSelectorItems.findIndex((context2) => context2.contextId === changedContext.contextId);
    if (index > -1) {
      this.contextSelectorItems.replace(index, changedContext);
      this.onContextSelectorListItemReplaced();
    }
  }
  reset() {
    this.contextSelectorItems.replaceAll([]);
    this.onContextSelectorListItemReplaced();
    if (this.landingPage.isShowing()) {
      this.landingPage.detach();
    }
    this.detailViewContainer.removeChildren();
    this.landingPage.show(this.detailViewContainer);
    this.graphManager.clearGraphs();
  }
  suspendModel() {
    this.graphManager.clearGraphs();
  }
  audioListenerCreated(event) {
    const listener = event.data;
    const graph = this.graphManager.getGraph(listener.contextId);
    if (!graph) {
      return;
    }
    graph.addNode({
      nodeId: listener.listenerId,
      nodeType: "Listener",
      numberOfInputs: 0,
      numberOfOutputs: 0
    });
  }
  audioListenerWillBeDestroyed(event) {
    const { contextId, listenerId } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    graph.removeNode(listenerId);
  }
  audioNodeCreated(event) {
    const node = event.data;
    const graph = this.graphManager.getGraph(node.contextId);
    if (!graph) {
      return;
    }
    graph.addNode({
      nodeId: node.nodeId,
      nodeType: node.nodeType,
      numberOfInputs: node.numberOfInputs,
      numberOfOutputs: node.numberOfOutputs
    });
  }
  audioNodeWillBeDestroyed(event) {
    const { contextId, nodeId } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    graph.removeNode(nodeId);
  }
  audioParamCreated(event) {
    const param = event.data;
    const graph = this.graphManager.getGraph(param.contextId);
    if (!graph) {
      return;
    }
    graph.addParam({
      paramId: param.paramId,
      paramType: param.paramType,
      nodeId: param.nodeId
    });
  }
  audioParamWillBeDestroyed(event) {
    const { contextId, paramId } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    graph.removeParam(paramId);
  }
  nodesConnected(event) {
    const { contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    graph.addNodeToNodeConnection({
      sourceId,
      destinationId,
      sourceOutputIndex,
      destinationInputIndex
    });
  }
  nodesDisconnected(event) {
    const { contextId, sourceId, destinationId, sourceOutputIndex, destinationInputIndex } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    graph.removeNodeToNodeConnection({
      sourceId,
      destinationId,
      sourceOutputIndex,
      destinationInputIndex
    });
  }
  nodeParamConnected(event) {
    const { contextId, sourceId, destinationId, sourceOutputIndex } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    const nodeId = graph.getNodeIdByParamId(destinationId);
    if (!nodeId) {
      return;
    }
    graph.addNodeToParamConnection({
      sourceId,
      destinationId: nodeId,
      sourceOutputIndex,
      destinationParamId: destinationId
    });
  }
  nodeParamDisconnected(event) {
    const { contextId, sourceId, destinationId, sourceOutputIndex } = event.data;
    const graph = this.graphManager.getGraph(contextId);
    if (!graph) {
      return;
    }
    const nodeId = graph.getNodeIdByParamId(destinationId);
    if (!nodeId) {
      return;
    }
    graph.removeNodeToParamConnection({
      sourceId,
      destinationId: nodeId,
      sourceOutputIndex,
      destinationParamId: destinationId
    });
  }
  updateDetailView(context) {
    if (!context) {
      this.landingPage.detach();
      this.detailViewContainer.removeChildren();
      this.landingPage.show(this.detailViewContainer);
      return;
    }
    if (this.landingPage.isShowing()) {
      this.landingPage.detach();
    }
    this.detailViewContainer.removeChildren();
    const container = document.createElement("div");
    container.classList.add("context-detail-container");
    const addEntry = (entry, value, unit) => {
      const valueWithUnit = value + (unit ? ` ${unit}` : "");
      container.appendChild(UI.Fragment.html`
        <div class="context-detail-row">
          <div class="context-detail-row-entry">${entry}</div>
          <div class="context-detail-row-value">${valueWithUnit}</div>
        </div>
      `);
    };
    const title = context.contextType === "realtime" ? i18n.i18n.lockedString("AudioContext") : i18n.i18n.lockedString("OfflineAudioContext");
    container.appendChild(UI.Fragment.html`
      <div class="context-detail-header">
        <div class="context-detail-title">${title}</div>
        <div class="context-detail-subtitle">${context.contextId}</div>
      </div>
    `);
    addEntry(i18nString(UIStrings.state), context.contextState);
    addEntry(i18nString(UIStrings.sampleRate), context.sampleRate, "Hz");
    if (context.contextType === "realtime") {
      addEntry(i18nString(UIStrings.callbackBufferSize), context.callbackBufferSize, "frames");
    }
    addEntry(i18nString(UIStrings.maxOutputChannels), context.maxOutputChannelCount, "ch");
    this.detailViewContainer.appendChild(container);
  }
  updateSummaryBar(contextRealtimeData) {
    this.summaryBarContainer.removeChildren();
    const time = contextRealtimeData.currentTime.toFixed(3);
    const mean = (contextRealtimeData.callbackIntervalMean * 1e3).toFixed(3);
    const stddev = (Math.sqrt(contextRealtimeData.callbackIntervalVariance) * 1e3).toFixed(3);
    const capacity = (contextRealtimeData.renderCapacity * 100).toFixed(3);
    this.summaryBarContainer.appendChild(UI.Fragment.html`
      <div class="context-summary-container">
        <span>${i18nString(UIStrings.currentTime)}: ${time} s</span>
        <span>\u2758</span>
        <span>${i18nString(UIStrings.callbackInterval)}: μ = ${mean} ms, σ = ${stddev} ms</span>
        <span>\u2758</span>
        <span>${i18nString(UIStrings.renderCapacity)}: ${capacity} %</span>
      </div>
    `);
  }
  clearSummaryBar() {
    this.summaryBarContainer.removeChildren();
  }
  async pollRealtimeData() {
    const context = this.selectedContext();
    if (!context) {
      this.clearSummaryBar();
      return;
    }
    for (const model of SDK2.TargetManager.TargetManager.instance().models(WebAudioModel)) {
      if (context.contextType === "realtime") {
        if (!this.graphManager.hasContext(context.contextId)) {
          continue;
        }
        const realtimeData = await model.requestRealtimeData(context.contextId);
        if (realtimeData) {
          this.updateSummaryBar(realtimeData);
        }
      } else {
        this.clearSummaryBar();
      }
    }
  }
};

// gen/front_end/panels/web_audio/web_audio.prebundle.js
import { EdgeView, GraphManager as GraphManager2, GraphStyle, GraphView, NodeRendererUtility, NodeView } from "./graph_visualizer/graph_visualizer.js";
export {
  EdgeView,
  GraphManager2 as GraphManager,
  GraphStyle,
  GraphView,
  NodeRendererUtility,
  NodeView,
  WebAudioModel_exports as WebAudioModel,
  WebAudioView_exports as WebAudioView
};
//# sourceMappingURL=web_audio.js.map
