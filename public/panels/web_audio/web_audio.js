var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/web_audio/AudioContextContentBuilder.js
var AudioContextContentBuilder_exports = {};
__export(AudioContextContentBuilder_exports, {
  ContextDetailBuilder: () => ContextDetailBuilder,
  ContextSummaryBuilder: () => ContextSummaryBuilder
});
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description The current state of an item
   */
  state: "State",
  /**
   * @description Text in Audio Context Content Builder
   */
  sampleRate: "Sample Rate",
  /**
   * @description Text in Audio Context Content Builder
   */
  callbackBufferSize: "Callback Buffer Size",
  /**
   * @description Label in the Audio Context Content Builder for the maximum number of output channels
   * that this Audio Context has.
   */
  maxOutputChannels: "Max Output Channels",
  /**
   * @description Text in Audio Context Content Builder
   */
  currentTime: "Current Time",
  /**
   * @description Text in Audio Context Content Builder
   */
  callbackInterval: "Callback Interval",
  /**
   * @description Text in Audio Context Content Builder
   */
  renderCapacity: "Render Capacity"
};
var str_ = i18n.i18n.registerUIStrings("panels/web_audio/AudioContextContentBuilder.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var ContextDetailBuilder = class {
  fragment;
  container;
  constructor(context) {
    this.fragment = document.createDocumentFragment();
    this.container = document.createElement("div");
    this.container.classList.add("context-detail-container");
    this.fragment.appendChild(this.container);
    this.build(context);
  }
  build(context) {
    const title = context.contextType === "realtime" ? i18n.i18n.lockedString("AudioContext") : i18n.i18n.lockedString("OfflineAudioContext");
    this.addTitle(title, context.contextId);
    this.addEntry(i18nString(UIStrings.state), context.contextState);
    this.addEntry(i18nString(UIStrings.sampleRate), context.sampleRate, "Hz");
    if (context.contextType === "realtime") {
      this.addEntry(i18nString(UIStrings.callbackBufferSize), context.callbackBufferSize, "frames");
    }
    this.addEntry(i18nString(UIStrings.maxOutputChannels), context.maxOutputChannelCount, "ch");
  }
  addTitle(title, subtitle) {
    this.container.appendChild(UI.Fragment.html`
  <div class="context-detail-header">
  <div class="context-detail-title">${title}</div>
  <div class="context-detail-subtitle">${subtitle}</div>
  </div>
  `);
  }
  addEntry(entry, value, unit) {
    const valueWithUnit = value + (unit ? ` ${unit}` : "");
    this.container.appendChild(UI.Fragment.html`
  <div class="context-detail-row">
  <div class="context-detail-row-entry">${entry}</div>
  <div class="context-detail-row-value">${valueWithUnit}</div>
  </div>
  `);
  }
  getFragment() {
    return this.fragment;
  }
};
var ContextSummaryBuilder = class {
  fragment;
  constructor(contextRealtimeData) {
    const time = contextRealtimeData.currentTime.toFixed(3);
    const mean = (contextRealtimeData.callbackIntervalMean * 1e3).toFixed(3);
    const stddev = (Math.sqrt(contextRealtimeData.callbackIntervalVariance) * 1e3).toFixed(3);
    const capacity = (contextRealtimeData.renderCapacity * 100).toFixed(3);
    this.fragment = document.createDocumentFragment();
    this.fragment.appendChild(UI.Fragment.html`
  <div class="context-summary-container">
  <span>${i18nString(UIStrings.currentTime)}: ${time} s</span>
  <span>\u2758</span>
  <span>${i18nString(UIStrings.callbackInterval)}: μ = ${mean} ms, σ = ${stddev} ms</span>
  <span>\u2758</span>
  <span>${i18nString(UIStrings.renderCapacity)}: ${capacity} %</span>
  </div>
  `);
  }
  getFragment() {
    return this.fragment;
  }
};

// gen/front_end/panels/web_audio/AudioContextSelector.js
var AudioContextSelector_exports = {};
__export(AudioContextSelector_exports, {
  AudioContextSelector: () => AudioContextSelector
});
import * as Common from "./../../core/common/common.js";
import * as i18n3 from "./../../core/i18n/i18n.js";
import * as UI2 from "./../../ui/legacy/legacy.js";
var UIStrings2 = {
  /**
   * @description Text that shows there is no recording
   */
  noRecordings: "(no recordings)",
  /**
   * @description Label prefix for an audio context selection
   * @example {realtime (1e03ec)} PH1
   */
  audioContextS: "Audio context: {PH1}"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/web_audio/AudioContextSelector.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var AudioContextSelector = class extends Common.ObjectWrapper.ObjectWrapper {
  placeholderText;
  selectElement;
  items;
  toolbarItemInternal;
  constructor() {
    super();
    this.placeholderText = i18nString2(UIStrings2.noRecordings);
    this.items = new UI2.ListModel.ListModel();
    this.selectElement = document.createElement("select");
    this.toolbarItemInternal = new UI2.Toolbar.ToolbarItem(this.selectElement);
    this.toolbarItemInternal.setTitle(i18nString2(UIStrings2.audioContextS, { PH1: this.placeholderText }));
    this.selectElement.addEventListener("change", this.onSelectionChanged.bind(this));
    this.selectElement.disabled = true;
    this.addPlaceholderOption();
    this.items.addEventListener("ItemsReplaced", this.onListItemReplaced, this);
  }
  addPlaceholderOption() {
    const placeholderOption = UI2.Fragment.html`
    <option value="" hidden>${this.placeholderText}</option>`;
    this.selectElement.appendChild(placeholderOption);
  }
  onListItemReplaced() {
    this.selectElement.removeChildren();
    if (this.items.length === 0) {
      this.addPlaceholderOption();
      this.selectElement.disabled = true;
      this.onSelectionChanged();
      return;
    }
    for (const context of this.items) {
      const option = UI2.Fragment.html`
    <option value=${context.contextId}>${this.titleFor(context)}</option>`;
      this.selectElement.appendChild(option);
    }
    this.selectElement.disabled = false;
    this.onSelectionChanged();
  }
  contextCreated({ data: context }) {
    this.items.insert(this.items.length, context);
    this.onListItemReplaced();
  }
  contextDestroyed({ data: contextId }) {
    const index = this.items.findIndex((context) => context.contextId === contextId);
    if (index !== -1) {
      this.items.remove(index);
      this.onListItemReplaced();
    }
  }
  contextChanged({ data: changedContext }) {
    const index = this.items.findIndex((context) => context.contextId === changedContext.contextId);
    if (index !== -1) {
      this.items.replace(index, changedContext);
      this.onListItemReplaced();
    }
  }
  selectedContext() {
    const selectedValue = this.selectElement.value;
    if (!selectedValue) {
      return null;
    }
    return this.items.find((context) => context.contextId === selectedValue) || null;
  }
  onSelectionChanged() {
    const selectedContext = this.selectedContext();
    if (selectedContext) {
      this.toolbarItemInternal.setTitle(i18nString2(UIStrings2.audioContextS, { PH1: this.titleFor(selectedContext) }));
    } else {
      this.toolbarItemInternal.setTitle(i18nString2(UIStrings2.audioContextS, { PH1: this.placeholderText }));
    }
    this.dispatchEventToListeners("ContextSelected", selectedContext);
  }
  itemSelected(item) {
    if (!item) {
      return;
    }
    this.selectElement.value = item.contextId;
    this.onSelectionChanged();
  }
  reset() {
    this.items.replaceAll([]);
    this.onListItemReplaced();
  }
  titleFor(context) {
    return `${context.contextType} (${context.contextId.substr(-6)})`;
  }
  toolbarItem() {
    return this.toolbarItemInternal;
  }
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
import * as i18n5 from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI3 from "./../../ui/legacy/legacy.js";
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
var UIStrings3 = {
  /**
   * @description Text in Web Audio View if there is nothing to show.
   * Web Audio API is an API for controlling audio on the web.
   */
  noWebAudio: "No Web Audio API usage detected",
  /**
   * @description Text in Web Audio View
   */
  openAPageThatUsesWebAudioApiTo: "Open a page that uses Web Audio API to start monitoring."
};
var str_3 = i18n5.i18n.registerUIStrings("panels/web_audio/WebAudioView.ts", UIStrings3);
var i18nString3 = i18n5.i18n.getLocalizedString.bind(void 0, str_3);
var WEBAUDIO_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/webaudio";
var WebAudioView = class extends UI3.ThrottledWidget.ThrottledWidget {
  contextSelector;
  contentContainer;
  detailViewContainer;
  graphManager;
  landingPage;
  summaryBarContainer;
  constructor() {
    super(true, 1e3);
    this.registerRequiredCSS(webAudio_css_default);
    this.element.setAttribute("jslog", `${VisualLogging.panel("web-audio").track({ resize: true })}`);
    this.element.classList.add("web-audio-drawer");
    const toolbarContainer = this.contentElement.createChild("div", "web-audio-toolbar-container vbox");
    toolbarContainer.role = "toolbar";
    this.contextSelector = new AudioContextSelector();
    const toolbar2 = toolbarContainer.createChild("devtools-toolbar", "web-audio-toolbar");
    toolbar2.role = "presentation";
    toolbar2.appendToolbarItem(UI3.Toolbar.Toolbar.createActionButton("components.collect-garbage"));
    toolbar2.appendSeparator();
    toolbar2.appendToolbarItem(this.contextSelector.toolbarItem());
    toolbar2.setAttribute("jslog", `${VisualLogging.toolbar()}`);
    this.contentContainer = this.contentElement.createChild("div", "web-audio-content-container vbox flex-auto");
    this.detailViewContainer = this.contentContainer.createChild("div", "web-audio-details-container vbox flex-auto");
    this.graphManager = new GraphVisualizer.GraphManager.GraphManager();
    this.landingPage = new UI3.EmptyWidget.EmptyWidget(i18nString3(UIStrings3.noWebAudio), i18nString3(UIStrings3.openAPageThatUsesWebAudioApiTo));
    this.landingPage.link = WEBAUDIO_EXPLANATION_URL;
    this.landingPage.show(this.detailViewContainer);
    this.summaryBarContainer = this.contentContainer.createChild("div", "web-audio-summary-container");
    this.contextSelector.addEventListener("ContextSelected", (event) => {
      const context = event.data;
      this.updateDetailView(context);
      void this.doUpdate();
    });
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
  contextCreated(event) {
    const context = event.data;
    this.graphManager.createContext(context.contextId);
    this.contextSelector.contextCreated(event);
  }
  contextDestroyed(event) {
    const contextId = event.data;
    this.graphManager.destroyContext(contextId);
    this.contextSelector.contextDestroyed(event);
  }
  contextChanged(event) {
    const context = event.data;
    if (!this.graphManager.hasContext(context.contextId)) {
      return;
    }
    this.contextSelector.contextChanged(event);
  }
  reset() {
    this.contextSelector.reset();
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
    const detailBuilder = new ContextDetailBuilder(context);
    this.detailViewContainer.removeChildren();
    this.detailViewContainer.appendChild(detailBuilder.getFragment());
  }
  updateSummaryBar(contextRealtimeData) {
    const summaryBuilder = new ContextSummaryBuilder(contextRealtimeData);
    this.summaryBarContainer.removeChildren();
    this.summaryBarContainer.appendChild(summaryBuilder.getFragment());
  }
  clearSummaryBar() {
    this.summaryBarContainer.removeChildren();
  }
  async pollRealtimeData() {
    const context = this.contextSelector.selectedContext();
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
  AudioContextContentBuilder_exports as AudioContextContentBuilder,
  AudioContextSelector_exports as AudioContextSelector,
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
