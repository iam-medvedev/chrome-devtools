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
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  WebAudioView: () => WebAudioView
});
import "./../../ui/legacy/legacy.js";
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK2 from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
import { html, render } from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

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
var { widgetConfig } = UI.Widget;
var { bindToAction } = UI.UIUtils;
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
var DEFAULT_VIEW = (input, _output, target) => {
  const { contexts, selectedContextIndex, onContextSelectorSelectionChanged, contextRealtimeData } = input;
  const selectedContext = selectedContextIndex > -1 ? contexts[selectedContextIndex] : null;
  const titleForContext = (context) => context.contextType + " (" + context.contextId.substr(-6) + ")";
  const selectorTitle = i18nString(UIStrings.audioContextS, { PH1: selectedContext ? titleForContext(selectedContext) : i18nString(UIStrings.noRecordings) });
  render(html`
    <style>${webAudio_css_default}</style>
    <div class="web-audio-toolbar-container vbox" role="toolbar">
      <devtools-toolbar class="web-audio-toolbar" role="presentation"
          jslog=${VisualLogging.toolbar()}>
        <devtools-button ${bindToAction("components.collect-garbage")}></devtools-button>
        <div class="toolbar-divider"></div>
        <select
          title=${selectorTitle}
          aria-label=${selectorTitle}
          ?disabled=${contexts.length === 0}
          @change=${(e) => onContextSelectorSelectionChanged(e.target.value)}
          .value=${selectedContext ? selectedContext.contextId : ""}>
          ${contexts.length === 0 ? html`<option value="" hidden>${i18nString(UIStrings.noRecordings)}</option>` : contexts.map((context) => html`
            <option value=${context.contextId}>${titleForContext(context)}</option>
          `)}
        </select>
      </devtools-toolbar>
    </div>
    <div class="web-audio-content-container vbox flex-auto">
      ${!selectedContext ? html`
        <div class="web-audio-details-container vbox flex-auto">
          <devtools-widget .widgetConfig=${widgetConfig(UI.EmptyWidget.EmptyWidget, {
    header: i18nString(UIStrings.noWebAudio),
    text: i18nString(UIStrings.openAPageThatUsesWebAudioApiTo),
    link: WEBAUDIO_EXPLANATION_URL
  })}>
          </devtools-widget>
        </div>` : html`<div class="web-audio-details-container vbox flex-auto">
          <div class="context-detail-container">
            <div class="context-detail-header">
              <div class="context-detail-title">
                ${selectedContext.contextType === "realtime" ? i18n.i18n.lockedString("AudioContext") : i18n.i18n.lockedString("OfflineAudioContext")}
              </div>
              <div class="context-detail-subtitle">${selectedContext.contextId}</div>
            </div>
            <div class="context-detail-row">
              <div class="context-detail-row-entry">${i18nString(UIStrings.state)}</div>
              <div class="context-detail-row-value">${selectedContext.contextState}</div>
            </div>
            <div class="context-detail-row">
              <div class="context-detail-row-entry">${i18nString(UIStrings.sampleRate)}</div>
              <div class="context-detail-row-value">${selectedContext.sampleRate} Hz</div>
            </div>
            ${selectedContext.contextType === "realtime" ? html`
              <div class="context-detail-row">
                <div class="context-detail-row-entry">${i18nString(UIStrings.callbackBufferSize)}</div>
                <div class="context-detail-row-value">${selectedContext.callbackBufferSize} frames</div>
              </div>` : ""}
            <div class="context-detail-row">
              <div class="context-detail-row-entry">${i18nString(UIStrings.maxOutputChannels)}</div>
              <div class="context-detail-row-value">${selectedContext.maxOutputChannelCount} ch</div>
            </div>
          </div>
        </div>`}
      <div class="web-audio-summary-container">
        ${contextRealtimeData ? html`<div class="context-summary-container">
            <span>${i18nString(UIStrings.currentTime)}: ${contextRealtimeData.currentTime.toFixed(3)} s</span>
            <span>\u2758</span>
            <span>${i18nString(UIStrings.callbackInterval)}: μ = ${(contextRealtimeData.callbackIntervalMean * 1e3).toFixed(3)} ms, σ = ${(Math.sqrt(contextRealtimeData.callbackIntervalVariance) * 1e3).toFixed(3)} ms</span>
            <span>\u2758</span>
            <span>${i18nString(UIStrings.renderCapacity)}: ${(contextRealtimeData.renderCapacity * 100).toFixed(3)} %</span>
          </div>` : ""}
      </div>
    </div>`, target);
};
var WebAudioView = class extends UI.Widget.VBox {
  knownContexts = /* @__PURE__ */ new Set();
  contextSelectorItems;
  contextRealtimeData = null;
  view;
  selectedContextIndex = -1;
  pollRealtimeDataThrottler;
  constructor(element, view = DEFAULT_VIEW) {
    super({ jslog: `${VisualLogging.panel("web-audio").track({ resize: true })}`, useShadowDom: true });
    this.view = view;
    this.contextSelectorItems = new UI.ListModel.ListModel();
    this.contextSelectorItems.addEventListener("ItemsReplaced", this.requestUpdate, this);
    SDK2.TargetManager.TargetManager.instance().observeModels(WebAudioModel, this);
    this.pollRealtimeDataThrottler = new Common.Throttler.Throttler(1e3);
    this.performUpdate();
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
  performUpdate() {
    const input = {
      contexts: [...this.contextSelectorItems],
      selectedContextIndex: this.selectedContextIndex,
      onContextSelectorSelectionChanged: this.onContextSelectorSelectionChanged.bind(this),
      contextRealtimeData: this.contextRealtimeData
    };
    this.view(input, {}, this.contentElement);
  }
  addEventListeners(webAudioModel) {
    webAudioModel.ensureEnabled();
    webAudioModel.addEventListener("ContextCreated", this.contextCreated, this);
    webAudioModel.addEventListener("ContextDestroyed", this.contextDestroyed, this);
    webAudioModel.addEventListener("ContextChanged", this.contextChanged, this);
    webAudioModel.addEventListener("ModelReset", this.reset, this);
  }
  removeEventListeners(webAudioModel) {
    webAudioModel.removeEventListener("ContextCreated", this.contextCreated, this);
    webAudioModel.removeEventListener("ContextDestroyed", this.contextDestroyed, this);
    webAudioModel.removeEventListener("ContextChanged", this.contextChanged, this);
    webAudioModel.removeEventListener("ModelReset", this.reset, this);
  }
  onContextSelectorSelectionChanged(contextId) {
    this.selectedContextIndex = this.contextSelectorItems.findIndex((context) => context.contextId === contextId);
    void this.pollRealtimeDataThrottler.schedule(this.pollRealtimeData.bind(this));
    this.requestUpdate();
  }
  contextCreated(event) {
    const context = event.data;
    this.knownContexts.add(context.contextId);
    this.contextSelectorItems.insert(this.contextSelectorItems.length, context);
    if (this.selectedContextIndex === -1) {
      this.selectedContextIndex = this.contextSelectorItems.length - 1;
      void this.pollRealtimeDataThrottler.schedule(this.pollRealtimeData.bind(this));
    }
    this.requestUpdate();
  }
  contextDestroyed(event) {
    const contextId = event.data;
    this.knownContexts.delete(contextId);
    const index = this.contextSelectorItems.findIndex((context) => context.contextId === contextId);
    if (index > -1) {
      const selectedContext = this.selectedContextIndex > -1 ? this.contextSelectorItems.at(this.selectedContextIndex) : null;
      this.contextSelectorItems.remove(index);
      const newSelectedIndex = selectedContext ? this.contextSelectorItems.indexOf(selectedContext) : -1;
      if (newSelectedIndex > -1) {
        this.selectedContextIndex = newSelectedIndex;
      } else {
        this.selectedContextIndex = Math.min(index, this.contextSelectorItems.length - 1);
      }
    }
    this.requestUpdate();
  }
  contextChanged(event) {
    const context = event.data;
    if (!this.knownContexts.has(context.contextId)) {
      return;
    }
    const changedContext = event.data;
    const index = this.contextSelectorItems.findIndex((context2) => context2.contextId === changedContext.contextId);
    if (index > -1) {
      this.contextSelectorItems.replace(index, changedContext);
    }
    this.requestUpdate();
  }
  reset() {
    this.contextSelectorItems.replaceAll([]);
    this.selectedContextIndex = -1;
    this.knownContexts.clear();
    this.requestUpdate();
  }
  setContextRealtimeData(contextRealtimeData) {
    this.contextRealtimeData = contextRealtimeData;
    this.requestUpdate();
  }
  async pollRealtimeData() {
    if (this.selectedContextIndex < 0) {
      this.setContextRealtimeData(null);
      return;
    }
    const context = this.contextSelectorItems.at(this.selectedContextIndex);
    if (!context) {
      this.setContextRealtimeData(null);
      return;
    }
    for (const model of SDK2.TargetManager.TargetManager.instance().models(WebAudioModel)) {
      if (context.contextType === "realtime") {
        if (!this.knownContexts.has(context.contextId)) {
          continue;
        }
        const realtimeData = await model.requestRealtimeData(context.contextId);
        if (realtimeData) {
          this.setContextRealtimeData(realtimeData);
        }
        void this.pollRealtimeDataThrottler.schedule(this.pollRealtimeData.bind(this));
      } else {
        this.setContextRealtimeData(null);
      }
    }
  }
};
export {
  WebAudioModel_exports as WebAudioModel,
  WebAudioView_exports as WebAudioView
};
//# sourceMappingURL=web_audio.js.map
