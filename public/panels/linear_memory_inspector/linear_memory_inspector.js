var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/panels/linear_memory_inspector/LinearMemoryInspectorController.ts
var LinearMemoryInspectorController_exports = {};
__export(LinearMemoryInspectorController_exports, {
  LinearMemoryInspectorController: () => LinearMemoryInspectorController,
  RemoteArrayBufferWrapper: () => RemoteArrayBufferWrapper
});
import * as Common2 from "../../core/common/common.js";
import * as i18n3 from "../../core/i18n/i18n.js";
import * as SDK from "../../core/sdk/sdk.js";
import * as Bindings from "../../models/bindings/bindings.js";
import * as UI3 from "../../ui/legacy/legacy.js";
import * as LinearMemoryInspectorComponents2 from "./components/components.js";

// ../../front_end/panels/linear_memory_inspector/LinearMemoryInspectorPane.ts
var LinearMemoryInspectorPane_exports = {};
__export(LinearMemoryInspectorPane_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW2,
  Events: () => Events,
  LinearMemoryInspectorPane: () => LinearMemoryInspectorPane
});
import "../../ui/kit/kit.js";
import * as Common from "../../core/common/common.js";
import * as i18n from "../../core/i18n/i18n.js";
import * as UI2 from "../../ui/legacy/legacy.js";
import { Directives, html as html2, render as render2 } from "../../ui/lit/lit.js";
import * as VisualLogging from "../../ui/visual_logging/visual_logging.js";

// ../../front_end/panels/linear_memory_inspector/LinearMemoryInspectorView.ts
var LinearMemoryInspectorView_exports = {};
__export(LinearMemoryInspectorView_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  LinearMemoryInspectorView: () => LinearMemoryInspectorView
});
import * as UI from "../../ui/legacy/legacy.js";
import { html, nothing, render } from "../../ui/lit/lit.js";
import * as LinearMemoryInspectorComponents from "./components/components.js";
var { widget } = UI.Widget;
var DEFAULT_VIEW = (input, _output, target) => {
  if (!input.memory) {
    render(nothing, target);
    return;
  }
  render(html`
    ${widget(LinearMemoryInspectorComponents.LinearMemoryInspector.LinearMemoryInspector, {
    memory: input.memory,
    memoryOffset: input.offset,
    address: input.address,
    outerMemoryLength: input.outerMemoryLength,
    highlightInfo: input.highlightInfo,
    hideValueInspector: input.hideValueInspector,
    valueTypes: input.valueTypes,
    valueTypeModes: input.valueTypeModes,
    endianness: input.endianness,
    onMemoryRequest: input.onMemoryRequest,
    onAddressChanged: input.onAddressChanged,
    onSettingsChanged: input.onSettingsChanged,
    onDeleteMemoryHighlight: input.onDeleteMemoryHighlight
  })}
  `, target);
};
var LinearMemoryInspectorView = class extends UI.Widget.VBox {
  #memoryWrapper;
  #memory;
  #offset = 0;
  #address = 0;
  #tabId = "";
  #hideValueInspector = false;
  #refreshSequence = 0;
  #currentRequestId = 0;
  #settings;
  #onAddressChanged;
  #view;
  constructor(element, view = DEFAULT_VIEW) {
    super(element);
    this.#view = view;
  }
  set memoryWrapper(memoryWrapper) {
    if (this.#memoryWrapper === memoryWrapper) {
      return;
    }
    if (memoryWrapper.length() === 0 || this.#address >= memoryWrapper.length()) {
      throw new Error("Requested address is out of bounds.");
    }
    this.#memoryWrapper = memoryWrapper;
    this.#memory = void 0;
    this.refreshData();
  }
  set address(address) {
    if (address < 0 || this.#memoryWrapper && address >= this.#memoryWrapper.length()) {
      throw new Error("Requested address is out of bounds.");
    }
    if (this.#address === address) {
      return;
    }
    this.#address = address;
    this.requestUpdate();
  }
  set tabId(tabId) {
    if (this.#tabId === tabId) {
      return;
    }
    this.#tabId = tabId;
    this.requestUpdate();
  }
  set hideValueInspector(hideValueInspector) {
    if (this.#hideValueInspector === hideValueInspector) {
      return;
    }
    this.#hideValueInspector = hideValueInspector;
    this.requestUpdate();
  }
  set onAddressChanged(onAddressChanged) {
    this.#onAddressChanged = onAddressChanged;
  }
  set refreshSequence(value) {
    if (this.#refreshSequence === value) {
      return;
    }
    this.#refreshSequence = value;
    if (this.isShowing()) {
      this.refreshData();
    }
  }
  performUpdate() {
    if (!this.#settings) {
      this.#settings = LinearMemoryInspectorController.instance().loadSettings();
    }
    if (!this.#memoryWrapper) {
      return;
    }
    const viewInput = {
      memory: this.#memory,
      offset: this.#offset,
      address: this.#address,
      outerMemoryLength: this.#memoryWrapper.length(),
      highlightInfo: this.#getHighlightInfo(),
      hideValueInspector: this.#hideValueInspector,
      valueTypes: this.#settings.valueTypes,
      valueTypeModes: this.#settings.modes,
      endianness: this.#settings.endianness,
      onMemoryRequest: this.#memoryRequested,
      onAddressChanged: this.updateAddress.bind(this),
      onSettingsChanged: this.#settingsChanged,
      onDeleteMemoryHighlight: this.#deleteMemoryHighlight
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
  wasShown() {
    super.wasShown();
    this.#settings = LinearMemoryInspectorController.instance().loadSettings();
    this.refreshData();
  }
  updateAddress(address) {
    this.address = address;
    this.#onAddressChanged?.(this.#tabId, address);
  }
  refreshData() {
    if (!this.#memoryWrapper) {
      return;
    }
    const requestId = ++this.#currentRequestId;
    void LinearMemoryInspectorController.getMemoryForAddress(this.#memoryWrapper, this.#address).then(({ memory, offset }) => {
      if (requestId !== this.#currentRequestId) {
        return;
      }
      this.#memory = memory;
      this.#offset = offset;
      this.requestUpdate();
    });
  }
  #memoryRequested = (request) => {
    if (!this.#memoryWrapper) {
      return;
    }
    const { start, end, address } = request;
    if (address < start || address >= end) {
      throw new Error("Requested address is out of bounds.");
    }
    const requestId = ++this.#currentRequestId;
    void LinearMemoryInspectorController.getMemoryRange(this.#memoryWrapper, start, end).then((memory) => {
      if (requestId !== this.#currentRequestId) {
        return;
      }
      this.#memory = memory;
      this.#offset = start;
      this.requestUpdate();
    });
  };
  #settingsChanged = (settings) => {
    this.#settings = settings;
    LinearMemoryInspectorController.instance().saveSettings(settings);
    this.requestUpdate();
  };
  #deleteMemoryHighlight = (highlightInfo) => {
    LinearMemoryInspectorController.instance().removeHighlight(this.#tabId, highlightInfo);
    this.refreshData();
  };
  #getHighlightInfo() {
    const highlightInfo = LinearMemoryInspectorController.instance().getHighlightInfo(this.#tabId);
    if (highlightInfo !== void 0 && this.#memoryWrapper) {
      if (highlightInfo.startAddress < 0 || highlightInfo.startAddress >= this.#memoryWrapper.length()) {
        throw new Error("HighlightInfo start address is out of bounds.");
      }
      if (highlightInfo.size <= 0) {
        throw new Error("Highlight size must be a positive number.");
      }
    }
    return highlightInfo;
  }
};

// ../../front_end/panels/linear_memory_inspector/LinearMemoryInspectorPane.ts
var { repeat } = Directives;
var { widget: widget2 } = UI2.Widget;
var UIStrings = {
  /**
   * @description Label in the Memory inspector panel that serves as a placeholder if no inspections are open (i.e., nothing to see here).
   *             Inspection here refers to viewing, navigating, and understanding the memory through this panel.
   */
  noOpenInspections: "No open inspections",
  /**
   * @description Label in the Memory inspector panel that serves as a placeholder if no inspections are open (i.e., nothing to see here).
   *             Inspection here refers to viewing, navigating, and understanding the memory through this panel.
   */
  memoryInspectorExplanation: "On this page you can inspect binary data",
  /**
   * @description Label in the Memory inspector panel for a link.
   */
  learnMore: "Learn more"
};
var str_ = i18n.i18n.registerUIStrings("panels/linear_memory_inspector/LinearMemoryInspectorPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var inspectorInstance;
var MEMORY_INSPECTOR_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/memory-inspector";
function renderPlaceholder() {
  return html2`
    <div class="empty-state">
      <span class="empty-state-header">${i18nString(UIStrings.noOpenInspections)}</span>
      <div class="empty-state-description">
        <span>${i18nString(UIStrings.memoryInspectorExplanation)}</span>
        <devtools-link
          class="devtools-link"
          href=${MEMORY_INSPECTOR_EXPLANATION_URL}
          jslogcontext="learn-more"
        >${i18nString(UIStrings.learnMore)}</devtools-link>
      </div>
    </div>`;
}
var DEFAULT_VIEW2 = (input, _output, target) => {
  render2(html2`
    <devtools-tabbed-pane
      .closeableTabs=${true}
      .allowTabReorder=${true}
      .automaticReorder=${true}
      .placeholder=${renderPlaceholder()}
      .headerJslog=${`${VisualLogging.toolbar().track({ keydown: "ArrowUp|ArrowLeft|ArrowDown|ArrowRight|Enter|Space" })}`}
      @close=${(event) => input.onTabClosed(event.detail.tabId)}
      @select=${(event) => input.onTabSelected(event.detail.tabId)}
    >
      ${repeat(input.tabs, (tab) => tab.tabId, (tab) => html2`
        <devtools-widget
          id=${tab.tabId}
          label=${tab.title}
          ?closeable=${true}
          ?selected=${tab.tabId === input.selectedTabId}
          ${widget2(LinearMemoryInspectorView, {
    tabId: tab.tabId,
    address: tab.address,
    memoryWrapper: tab.memoryWrapper,
    refreshSequence: tab.refreshSequence,
    onAddressChanged: input.onAddressChanged
  })}
        ></devtools-widget>
      `)}
    </devtools-tabbed-pane>
  `, target, {
    container: {
      attributes: {
        jslog: `${VisualLogging.panel("linear-memory-inspector").track({ resize: true })}`
      }
    }
  });
  target.querySelector("devtools-tabbed-pane")?.tabs;
};
var LinearMemoryInspectorPaneBase = Common.ObjectWrapper.eventMixin(
  UI2.Widget.VBox
);
var LinearMemoryInspectorPane = class _LinearMemoryInspectorPane extends LinearMemoryInspectorPaneBase {
  #view;
  #tabs = /* @__PURE__ */ new Map();
  #selectedTabId;
  constructor(element, view = DEFAULT_VIEW2) {
    super(element);
    this.#view = view;
  }
  static instance() {
    if (!inspectorInstance) {
      inspectorInstance = new _LinearMemoryInspectorPane();
    }
    return inspectorInstance;
  }
  wasShown() {
    super.wasShown();
    this.requestUpdate();
  }
  performUpdate() {
    const viewInput = {
      tabs: Array.from(this.#tabs.values()),
      selectedTabId: this.#selectedTabId,
      onTabClosed: this.#onTabClosed,
      onTabSelected: this.#onTabSelected,
      onAddressChanged: this.#onAddressChanged
    };
    this.#view(viewInput, void 0, this.contentElement);
  }
  #getTab(tabId) {
    const tab = this.#tabs.get(tabId);
    if (!tab) {
      throw new Error(`No linear memory inspector view for the given tab id: ${tabId}`);
    }
    return tab;
  }
  create(tabId, title, arrayWrapper, address = 0) {
    if (address < 0 || arrayWrapper.length() === 0 || address >= arrayWrapper.length()) {
      throw new Error("Requested address is out of bounds.");
    }
    this.#tabs.set(tabId, {
      tabId,
      title,
      memoryWrapper: arrayWrapper,
      address,
      refreshSequence: 0
    });
    this.#selectedTabId = tabId;
    this.requestUpdate();
  }
  close(tabId) {
    this.#onTabClosed(tabId);
  }
  reveal(tabId, address) {
    const tab = this.#getTab(tabId);
    if (address !== void 0) {
      if (address < 0 || address >= tab.memoryWrapper.length()) {
        throw new Error("Requested address is out of bounds.");
      }
      this.#tabs.set(tabId, { ...tab, address });
    }
    this.refreshView(tabId);
    this.#selectedTabId = tabId;
    this.requestUpdate();
  }
  refreshView(tabId) {
    const tab = this.#getTab(tabId);
    this.#tabs.set(tabId, { ...tab, refreshSequence: tab.refreshSequence + 1 });
    this.requestUpdate();
  }
  #onTabClosed = (tabId) => {
    if (!this.#tabs.has(tabId)) {
      return;
    }
    this.#tabs.delete(tabId);
    if (this.#selectedTabId === tabId) {
      this.#selectedTabId = this.#tabs.keys().next().value;
    }
    this.dispatchEventToListeners("ViewClosed" /* VIEW_CLOSED */, tabId);
    this.requestUpdate();
  };
  #onTabSelected = (tabId) => {
    if (!tabId || !this.#tabs.has(tabId) || this.#selectedTabId === tabId) {
      return;
    }
    this.#selectedTabId = tabId;
    this.requestUpdate();
  };
  #onAddressChanged = (tabId, address) => {
    const tab = this.#tabs.get(tabId);
    if (!tab || tab.address === address) {
      return;
    }
    this.#tabs.set(tabId, { ...tab, address });
    this.requestUpdate();
  };
};
var Events = /* @__PURE__ */ ((Events2) => {
  Events2["VIEW_CLOSED"] = "ViewClosed";
  return Events2;
})(Events || {});

// ../../front_end/panels/linear_memory_inspector/LinearMemoryInspectorController.ts
var UIStrings2 = {
  /**
   * @description Error message that shows up in the console if a buffer to be opened in the Memory inspector panel cannot be found.
   */
  couldNotOpenLinearMemory: "Couldn\u2019t open Memory inspector: buffer not found",
  /**
   * @description A context menu item in the Scope view of the Sources panel.
   */
  openInMemoryInspectorPanel: "Open in Memory inspector panel"
};
var str_2 = i18n3.i18n.registerUIStrings("panels/linear_memory_inspector/LinearMemoryInspectorController.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var LINEAR_MEMORY_INSPECTOR_OBJECT_GROUP = "linear-memory-inspector";
var MEMORY_TRANSFER_MIN_CHUNK_SIZE = 1e3;
var controllerInstance;
var RemoteArrayBufferWrapper = class {
  #remoteArrayBuffer;
  constructor(arrayBuffer) {
    this.#remoteArrayBuffer = arrayBuffer;
  }
  length() {
    return this.#remoteArrayBuffer.byteLength();
  }
  async getRange(start, end) {
    const newEnd = Math.min(end, this.length());
    if (start < 0 || start > newEnd) {
      console.error(`Requesting invalid range of memory: (${start}, ${end})`);
      return new Uint8Array(0);
    }
    const array = await this.#remoteArrayBuffer.bytes(start, newEnd);
    return new Uint8Array(array ?? []);
  }
};
async function getBufferFromObject(obj) {
  const response = await obj.runtimeModel().agent.invoke_callFunctionOn({
    objectId: obj.objectId,
    functionDeclaration: "function() { return this instanceof ArrayBuffer || (typeof SharedArrayBuffer !== 'undefined' && this instanceof SharedArrayBuffer) ? this : this.buffer; }",
    silent: true,
    // Set object group in order to bind the object lifetime to the linear memory inspector.
    objectGroup: LINEAR_MEMORY_INSPECTOR_OBJECT_GROUP
  });
  const error = response.getError();
  if (error) {
    throw new Error(`Remote object representing ArrayBuffer could not be retrieved: ${error}`);
  }
  obj = obj.runtimeModel().createRemoteObject(response.result);
  return new SDK.RemoteObject.RemoteArrayBuffer(obj);
}
var LinearMemoryInspectorController = class _LinearMemoryInspectorController extends SDK.TargetManager.SDKModelObserver {
  #paneInstance = LinearMemoryInspectorPane.instance();
  #bufferIdToRemoteObject = /* @__PURE__ */ new Map();
  #bufferIdToHighlightInfo = /* @__PURE__ */ new Map();
  #settings;
  constructor() {
    super();
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.RuntimeModel.RuntimeModel, this);
    SDK.TargetManager.TargetManager.instance().addModelListener(
      SDK.DebuggerModel.DebuggerModel,
      SDK.DebuggerModel.Events.GlobalObjectCleared,
      this.#onGlobalObjectClear,
      this
    );
    this.#paneInstance.addEventListener("ViewClosed" /* VIEW_CLOSED */, this.#viewClosed.bind(this));
    SDK.TargetManager.TargetManager.instance().addModelListener(
      SDK.DebuggerModel.DebuggerModel,
      SDK.DebuggerModel.Events.DebuggerPaused,
      this.#onDebuggerPause,
      this
    );
    const defaultValueTypeModes = LinearMemoryInspectorComponents2.ValueInterpreterDisplayUtils.getDefaultValueTypeMapping();
    const defaultSettings = {
      valueTypes: Array.from(defaultValueTypeModes.keys()),
      valueTypeModes: Array.from(defaultValueTypeModes),
      endianness: LinearMemoryInspectorComponents2.ValueInterpreterDisplayUtils.Endianness.LITTLE
    };
    this.#settings = Common2.Settings.Settings.instance().createSetting("lmi-interpreter-settings", defaultSettings);
  }
  static instance() {
    if (controllerInstance) {
      return controllerInstance;
    }
    controllerInstance = new _LinearMemoryInspectorController();
    return controllerInstance;
  }
  static async getMemoryForAddress(memoryWrapper, address) {
    const memoryChunkStart = Math.max(0, address - MEMORY_TRANSFER_MIN_CHUNK_SIZE / 2);
    const memoryChunkEnd = memoryChunkStart + MEMORY_TRANSFER_MIN_CHUNK_SIZE;
    const memory = await memoryWrapper.getRange(memoryChunkStart, memoryChunkEnd);
    return { memory, offset: memoryChunkStart };
  }
  static async getMemoryRange(memoryWrapper, start, end) {
    if (start < 0 || start > end || start >= memoryWrapper.length()) {
      throw new Error("Requested range is out of bounds.");
    }
    const chunkEnd = Math.max(end, start + MEMORY_TRANSFER_MIN_CHUNK_SIZE);
    return await memoryWrapper.getRange(start, chunkEnd);
  }
  async evaluateExpression(callFrame, expressionName) {
    const result = await callFrame.evaluate({ expression: expressionName });
    if ("error" in result) {
      console.error(`Tried to evaluate the expression '${expressionName}' but got an error: ${result.error}`);
      return void 0;
    }
    if ("exceptionDetails" in result && result?.exceptionDetails?.text) {
      console.error(
        `Tried to evaluate the expression '${expressionName}' but got an exception: ${result.exceptionDetails.text}`
      );
      return void 0;
    }
    return result.object;
  }
  saveSettings(data) {
    const valueTypes = Array.from(data.valueTypes);
    const modes = [...data.modes];
    this.#settings.set({ valueTypes, valueTypeModes: modes, endianness: data.endianness });
  }
  loadSettings() {
    const settings = this.#settings.get();
    return {
      valueTypes: new Set(settings.valueTypes),
      modes: new Map(settings.valueTypeModes),
      endianness: settings.endianness
    };
  }
  getHighlightInfo(bufferId) {
    return this.#bufferIdToHighlightInfo.get(bufferId);
  }
  removeHighlight(bufferId, highlightInfo) {
    const currentHighlight = this.getHighlightInfo(bufferId);
    if (currentHighlight === highlightInfo) {
      this.#bufferIdToHighlightInfo.delete(bufferId);
    }
  }
  setHighlightInfo(bufferId, highlightInfo) {
    this.#bufferIdToHighlightInfo.set(bufferId, highlightInfo);
  }
  #resetHighlightInfo(bufferId) {
    this.#bufferIdToHighlightInfo.delete(bufferId);
  }
  static async retrieveDWARFMemoryObjectAndAddress(obj) {
    if (!(obj instanceof Bindings.DebuggerLanguagePlugins.ExtensionRemoteObject)) {
      return void 0;
    }
    const valueNode = obj;
    const address = obj.linearMemoryAddress;
    if (address === void 0) {
      return void 0;
    }
    const callFrame = valueNode.callFrame;
    const response = await obj.debuggerModel().agent.invoke_evaluateOnCallFrame({
      callFrameId: callFrame.id,
      expression: "memories[0]"
    });
    const error = response.getError();
    if (error) {
      console.error(error);
      Common2.Console.Console.instance().error(i18nString2(UIStrings2.couldNotOpenLinearMemory));
    }
    const runtimeModel = obj.debuggerModel().runtimeModel();
    return { obj: runtimeModel.createRemoteObject(response.result), address };
  }
  // This function returns the size of the source language value represented by the ValueNode or ExtensionRemoteObject.
  // If the value is a pointer, the function returns the size of the pointed-to value. If the pointed-to value is also a
  // pointer, it returns the size of the pointer (usually 4 bytes). This is the convention taken by the DWARF extension.
  // > double x = 42.0;
  // > double *ptr = &x;
  // > double **dblptr = &ptr;
  //
  // retrieveObjectSize(ptr_ValueNode) -> 8, the size of a double
  // retrieveObjectSize(dblptr_ValueNode) -> 4, the size of a pointer
  static extractObjectSize(obj) {
    return obj.linearMemorySize ?? 0;
  }
  // The object type description corresponds to the type of the highlighted memory
  // that the user sees in the memory inspector. For pointers, we highlight the pointed to object.
  //
  // Example: The variable `x` has the type `int *`. Assume that `x` points to the value 3.
  // -> The memory inspector will jump to the address where 3 is stored.
  // -> The memory inspector will highlight the bytes that represent the 3.
  // -> The object type description of what we show will thus be `int` and not `int *`.
  static extractObjectTypeDescription(obj) {
    const objType = obj.description;
    if (!objType) {
      return "";
    }
    const lastChar = objType.charAt(objType.length - 1);
    const secondToLastChar = objType.charAt(objType.length - 2);
    const isPointerType = lastChar === "*" || lastChar === "&";
    const isOneLevelPointer = secondToLastChar === " ";
    if (!isPointerType) {
      return objType;
    }
    if (isOneLevelPointer) {
      return objType.slice(0, objType.length - 2);
    }
    return objType.slice(0, objType.length - 1);
  }
  // When inspecting a pointer variable, we indicate that we display the pointed-to object in the viewer
  // by prepending an asterisk to the pointer expression's name (mimicking C++ dereferencing).
  // If the object isn't a pointer, we return the expression unchanged.
  //
  // Examples:
  // (int *) myNumber -> (int) *myNumber
  // (int[]) numbers -> (int[]) numbers
  static extractObjectName(obj, expression) {
    const lastChar = obj.description?.charAt(obj.description.length - 1);
    const isPointerType = lastChar === "*";
    if (isPointerType) {
      return "*" + expression;
    }
    return expression;
  }
  async reveal({ object, expression }, omitFocus) {
    const response = await _LinearMemoryInspectorController.retrieveDWARFMemoryObjectAndAddress(object);
    let memoryObject = object;
    let memoryAddress = void 0;
    if (response !== void 0) {
      memoryAddress = response.address;
      memoryObject = response.obj;
    }
    const buffer = await getBufferFromObject(memoryObject);
    const { internalProperties } = await buffer.object().getOwnProperties(false);
    const idProperty = internalProperties?.find(({ name }) => name === "[[ArrayBufferData]]");
    const id = idProperty?.value?.value;
    if (!id) {
      throw new Error("Unable to find backing store id for array buffer");
    }
    const memoryProperty = internalProperties?.find(({ name }) => name === "[[WebAssemblyMemory]]");
    const memory = memoryProperty?.value;
    const highlightInfo = _LinearMemoryInspectorController.extractHighlightInfo(object, expression);
    if (highlightInfo) {
      this.setHighlightInfo(id, highlightInfo);
    } else {
      this.#resetHighlightInfo(id);
    }
    if (this.#bufferIdToRemoteObject.has(id)) {
      this.#paneInstance.reveal(id, memoryAddress);
      void UI3.ViewManager.ViewManager.instance().showView("linear-memory-inspector", omitFocus);
      return;
    }
    const title = String(memory ? memory.description : buffer.object().description);
    this.#bufferIdToRemoteObject.set(id, buffer.object());
    const arrayBufferWrapper = new RemoteArrayBufferWrapper(buffer);
    this.#paneInstance.create(id, title, arrayBufferWrapper, memoryAddress);
    void UI3.ViewManager.ViewManager.instance().showView("linear-memory-inspector", omitFocus);
  }
  appendApplicableItems(_event, contextMenu, target) {
    if (target.object?.isLinearMemoryInspectable()) {
      const expression = target.path;
      const object = target.object;
      contextMenu.debugSection().appendItem(
        i18nString2(UIStrings2.openInMemoryInspectorPanel),
        this.reveal.bind(this, new SDK.RemoteObject.LinearMemoryInspectable(object, expression)),
        { jslogContext: "reveal-in-memory-inspector" }
      );
    }
  }
  static extractHighlightInfo(obj, expression) {
    if (!(obj instanceof Bindings.DebuggerLanguagePlugins.ExtensionRemoteObject)) {
      return void 0;
    }
    const startAddress = obj.linearMemoryAddress ?? 0;
    let highlightInfo;
    try {
      highlightInfo = {
        startAddress,
        size: _LinearMemoryInspectorController.extractObjectSize(obj),
        name: expression ? _LinearMemoryInspectorController.extractObjectName(obj, expression) : expression,
        type: _LinearMemoryInspectorController.extractObjectTypeDescription(obj)
      };
    } catch {
      highlightInfo = void 0;
    }
    return highlightInfo;
  }
  modelRemoved(model) {
    for (const [bufferId, remoteObject] of this.#bufferIdToRemoteObject) {
      if (model === remoteObject.runtimeModel()) {
        this.#bufferIdToRemoteObject.delete(bufferId);
        this.#resetHighlightInfo(bufferId);
        this.#paneInstance.close(bufferId);
      }
    }
  }
  #onDebuggerPause(event) {
    const debuggerModel = event.data;
    for (const [bufferId, remoteObject] of this.#bufferIdToRemoteObject) {
      if (debuggerModel.runtimeModel() === remoteObject.runtimeModel()) {
        const topCallFrame = debuggerModel.debuggerPausedDetails()?.callFrames[0];
        if (topCallFrame) {
          void this.updateHighlightedMemory(bufferId, topCallFrame).then(() => this.#paneInstance.refreshView(bufferId));
        } else {
          this.#resetHighlightInfo(bufferId);
          this.#paneInstance.refreshView(bufferId);
        }
      }
    }
  }
  #onGlobalObjectClear(event) {
    this.modelRemoved(event.data.runtimeModel());
  }
  #viewClosed({ data: bufferId }) {
    const remoteObj = this.#bufferIdToRemoteObject.get(bufferId);
    if (remoteObj) {
      remoteObj.release();
    }
    this.#bufferIdToRemoteObject.delete(bufferId);
    this.#resetHighlightInfo(bufferId);
  }
  async updateHighlightedMemory(bufferId, callFrame) {
    const oldHighlightInfo = this.getHighlightInfo(bufferId);
    const expressionName = oldHighlightInfo?.name;
    if (!oldHighlightInfo || !expressionName) {
      this.#resetHighlightInfo(bufferId);
      return;
    }
    const obj = await this.evaluateExpression(callFrame, expressionName);
    if (!obj) {
      this.#resetHighlightInfo(bufferId);
      return;
    }
    const newHighlightInfo = _LinearMemoryInspectorController.extractHighlightInfo(obj, expressionName);
    if (!newHighlightInfo || !this.#pointToSameMemoryObject(newHighlightInfo, oldHighlightInfo)) {
      this.#resetHighlightInfo(bufferId);
    } else {
      this.setHighlightInfo(bufferId, newHighlightInfo);
    }
  }
  #pointToSameMemoryObject(highlightInfoA, highlightInfoB) {
    return highlightInfoA.type === highlightInfoB.type && highlightInfoA.startAddress === highlightInfoB.startAddress;
  }
};
export {
  LinearMemoryInspectorController_exports as LinearMemoryInspectorController,
  LinearMemoryInspectorPane_exports as LinearMemoryInspectorPane,
  LinearMemoryInspectorView_exports as LinearMemoryInspectorView
};
//# sourceMappingURL=linear_memory_inspector.js.map
