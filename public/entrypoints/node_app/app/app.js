var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/entrypoints/node_app/app/NodeConnectionsPanel.js
var NodeConnectionsPanel_exports = {};
__export(NodeConnectionsPanel_exports, {
  NodeConnectionsPanel: () => NodeConnectionsPanel,
  NodeConnectionsView: () => NodeConnectionsView
});
import * as Host from "./../../../core/host/host.js";
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Buttons from "./../../../ui/components/buttons/buttons.js";
import * as uiI18n from "./../../../ui/i18n/i18n.js";
import { Link } from "./../../../ui/kit/kit.js";
import * as UI from "./../../../ui/legacy/legacy.js";

// gen/front_end/entrypoints/node_app/app/nodeConnectionsPanel.css.js
var nodeConnectionsPanel_css_default = `/*
 * Copyright 2015 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.add-network-target-button {
  margin: 10px 25px;
  align-self: center;
}

.network-discovery-list {
  flex: none;
  max-width: 600px;
  max-height: 202px;
  margin: 20px 0 5px;
}

.network-discovery-list-empty {
  flex: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.network-discovery-list-item {
  padding: 3px 5px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  flex: auto 1 1;
}

.network-discovery-value {
  flex: 3 1 0;
}

.list-item .network-discovery-value {
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
  color: var(--sys-color-on-surface);
  overflow: hidden;
}

.network-discovery-edit-row {
  flex: none;
  display: flex;
  flex-direction: row;
  margin: 6px 5px;
  align-items: center;
}

.network-discovery-edit-row input {
  width: 100%;
  text-align: inherit;
}

.network-discovery-footer {
  margin: 0;
  overflow: hidden;
  max-width: 500px;
  padding: 3px;
}

.network-discovery-footer > * {
  white-space: pre-wrap;
}

.node-panel {
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
}

.network-discovery-view {
  min-width: 400px;
  text-align: left;
}

:host-context(.node-frontend) .network-discovery-list-empty {
  height: 40px;
}

:host-context(.node-frontend) .network-discovery-list-item {
  padding: 3px 15px;
  height: 40px;
}

.node-panel-center {
  max-width: 600px;
  padding-top: 50px;
  text-align: center;
}

.node-panel-logo {
  width: 400px;
  margin-bottom: 50px;
}

:host-context(.node-frontend) .network-discovery-edit-row input {
  height: 30px;
  padding-left: 5px;
}

:host-context(.node-frontend) .network-discovery-edit-row {
  margin: 6px 9px;
}

/*# sourceURL=${import.meta.resolve("./nodeConnectionsPanel.css")} */`;

// gen/front_end/entrypoints/node_app/app/NodeConnectionsPanel.js
var UIStrings = {
  /**
   * @description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  nodejsDebuggingGuide: "Node.js debugging guide",
  /**
   * @description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   * @example {Node.js debugging guide} PH1
   */
  specifyNetworkEndpointAnd: "Specify network endpoint and DevTools will connect to it automatically. Read {PH1} to learn more.",
  /**
   * @description Placeholder text content in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  noConnectionsSpecified: "No connections specified",
  /**
   * @description Text of add network target button in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  addConnection: "Add connection",
  /**
   * @description Text in Node Connections Panel of the Sources panel when debugging a Node.js app
   */
  networkAddressEgLocalhost: "Network address (e.g. localhost:9229)"
};
var str_ = i18n.i18n.registerUIStrings("entrypoints/node_app/app/NodeConnectionsPanel.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var nodejsIconUrl = new URL("../../../Images/node-stack-icon.svg", import.meta.url).toString();
var NodeConnectionsPanel = class extends UI.Panel.Panel {
  #config;
  #networkDiscoveryView;
  constructor() {
    super("node-connection");
    this.contentElement.classList.add("node-panel");
    const container = this.contentElement.createChild("div", "node-panel-center");
    const image = container.createChild("img", "node-panel-logo");
    image.src = nodejsIconUrl;
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    this.contentElement.tabIndex = 0;
    this.setDefaultFocusedElement(this.contentElement);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
    this.#networkDiscoveryView = new NodeConnectionsView((config) => {
      this.#config.networkDiscoveryConfig = config;
      Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesDiscoveryConfig(this.#config);
    });
    this.#networkDiscoveryView.show(container);
  }
  #devicesDiscoveryConfigChanged({ data: config }) {
    this.#config = config;
    this.#networkDiscoveryView.discoveryConfigChanged(this.#config.networkDiscoveryConfig);
  }
  wasShown() {
    super.wasShown();
    this.registerRequiredCSS(nodeConnectionsPanel_css_default);
  }
};
var NodeConnectionsView = class extends UI.Widget.VBox {
  #callback;
  #list;
  #editor;
  #networkDiscoveryConfig;
  constructor(callback) {
    super();
    this.#callback = callback;
    this.element.classList.add("network-discovery-view");
    const networkDiscoveryFooter = this.element.createChild("div", "network-discovery-footer");
    const documentationLink = Link.create("https://nodejs.org/en/docs/inspector/", i18nString(UIStrings.nodejsDebuggingGuide), void 0, "node-js-debugging");
    networkDiscoveryFooter.appendChild(uiI18n.getFormatLocalizedString(str_, UIStrings.specifyNetworkEndpointAnd, { PH1: documentationLink }));
    this.#list = new UI.ListWidget.ListWidget(this);
    this.#list.registerRequiredCSS(nodeConnectionsPanel_css_default);
    this.#list.element.classList.add("network-discovery-list");
    const placeholder = document.createElement("div");
    placeholder.classList.add("network-discovery-list-empty");
    placeholder.textContent = i18nString(UIStrings.noConnectionsSpecified);
    this.#list.setEmptyPlaceholder(placeholder);
    this.#list.show(this.element);
    this.#editor = null;
    const addButton = UI.UIUtils.createTextButton(i18nString(UIStrings.addConnection), this.#addNetworkTargetButtonClicked.bind(this), {
      className: "add-network-target-button",
      variant: "primary"
      /* Buttons.Button.Variant.PRIMARY */
    });
    this.element.appendChild(addButton);
    this.#networkDiscoveryConfig = [];
    this.element.classList.add("node-frontend");
  }
  #update() {
    const config = this.#networkDiscoveryConfig.map((item) => item.address);
    this.#callback.call(null, config);
  }
  #addNetworkTargetButtonClicked() {
    this.#list.addNewItem(this.#networkDiscoveryConfig.length, { address: "", port: "" });
  }
  discoveryConfigChanged(networkDiscoveryConfig) {
    this.#networkDiscoveryConfig = [];
    this.#list.clear();
    for (const address of networkDiscoveryConfig) {
      const item = { address, port: "" };
      this.#networkDiscoveryConfig.push(item);
      this.#list.appendItem(item, true);
    }
  }
  renderItem(rule, _editable) {
    const element = document.createElement("div");
    element.classList.add("network-discovery-list-item");
    element.createChild("div", "network-discovery-value network-discovery-address").textContent = rule.address;
    return element;
  }
  removeItemRequested(_rule, index) {
    this.#networkDiscoveryConfig.splice(index, 1);
    this.#list.removeItem(index);
    this.#update();
  }
  commitEdit(rule, editor, isNew) {
    rule.address = editor.control("address").value.trim();
    if (isNew) {
      this.#networkDiscoveryConfig.push(rule);
    }
    this.#update();
  }
  beginEdit(rule) {
    const editor = this.#createEditor();
    editor.control("address").value = rule.address;
    return editor;
  }
  #createEditor() {
    if (this.#editor) {
      return this.#editor;
    }
    const editor = new UI.ListWidget.Editor();
    this.#editor = editor;
    const content = editor.contentElement();
    const fields = content.createChild("div", "network-discovery-edit-row");
    const input = editor.createInput("address", "text", i18nString(UIStrings.networkAddressEgLocalhost), addressValidator);
    fields.createChild("div", "network-discovery-value network-discovery-address").appendChild(input);
    return editor;
    function addressValidator(_rule, _index, input2) {
      const match = input2.value.trim().match(/^([a-zA-Z0-9\.\-_]+):(\d+)$/);
      if (!match) {
        return {
          valid: false,
          errorMessage: void 0
        };
      }
      const port = parseInt(match[2], 10);
      return {
        valid: port <= 65535,
        errorMessage: void 0
      };
    }
  }
};

// gen/front_end/entrypoints/node_app/app/NodeMain.js
var NodeMain_exports = {};
__export(NodeMain_exports, {
  NodeChildTargetManager: () => NodeChildTargetManager,
  NodeConnection: () => NodeConnection,
  NodeMainImpl: () => NodeMainImpl
});
import * as Host2 from "./../../../core/host/host.js";
import * as i18n3 from "./../../../core/i18n/i18n.js";
import * as ProtocolClient from "./../../../core/protocol_client/protocol_client.js";
import * as SDK from "./../../../core/sdk/sdk.js";
import * as Components from "./../../../ui/legacy/components/utils/utils.js";
var UIStrings2 = {
  /**
   * @description Text that refers to the main target
   */
  main: "Main",
  /**
   * @description Text in Node Main of the Sources panel when debugging a Node.js app
   * @example {example.com} PH1
   */
  nodejsS: "Node.js: {PH1}",
  /**
   * @description Text in DevTools window title when debugging a Node.js app
   * @example {example.com} PH1
   */
  NodejsTitleS: "DevTools - Node.js: {PH1}"
};
var str_2 = i18n3.i18n.registerUIStrings("entrypoints/node_app/app/NodeMain.ts", UIStrings2);
var i18nString2 = i18n3.i18n.getLocalizedString.bind(void 0, str_2);
var nodeMainImplInstance;
var NodeMainImpl = class _NodeMainImpl {
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!nodeMainImplInstance || forceNew) {
      nodeMainImplInstance = new _NodeMainImpl();
    }
    return nodeMainImplInstance;
  }
  async run() {
    Host2.userMetrics.actionTaken(Host2.UserMetrics.Action.ConnectToNodeJSFromFrontend);
    void SDK.Connections.initMainConnection(async () => {
      const target = SDK.TargetManager.TargetManager.instance().createTarget(
        // TODO: Use SDK.Target.Type.NODE rather thatn BROWSER once DevTools is loaded appropriately in that case.
        "main",
        i18nString2(UIStrings2.main),
        SDK.Target.Type.BROWSER,
        null
      );
      target.setInspectedURL("Node.js");
    }, Components.TargetDetachedDialog.TargetDetachedDialog.connectionLost);
  }
};
var NodeChildTargetManager = class extends SDK.SDKModel.SDKModel {
  #targetManager;
  #parentTarget;
  #targetAgent;
  #childTargets = /* @__PURE__ */ new Map();
  #childConnections = /* @__PURE__ */ new Map();
  constructor(parentTarget) {
    super(parentTarget);
    this.#targetManager = parentTarget.targetManager();
    this.#parentTarget = parentTarget;
    this.#targetAgent = parentTarget.targetAgent();
    parentTarget.registerTargetDispatcher(this);
    void this.#targetAgent.invoke_setDiscoverTargets({ discover: true });
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
  }
  #devicesDiscoveryConfigChanged({ data: config }) {
    const locations = [];
    for (const address of config.networkDiscoveryConfig) {
      const parts = address.split(":");
      const port = parseInt(parts[1], 10);
      if (parts[0] && port) {
        locations.push({ host: parts[0], port });
      }
    }
    void this.#targetAgent.invoke_setRemoteLocations({ locations });
  }
  dispose() {
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
    for (const sessionId of this.#childTargets.keys()) {
      this.detachedFromTarget({ sessionId });
    }
  }
  targetCreated({ targetInfo }) {
    if (targetInfo.type === "node" && !targetInfo.attached) {
      void this.#targetAgent.invoke_attachToTarget({ targetId: targetInfo.targetId, flatten: false });
    } else if (targetInfo.type === "node_worker") {
      void this.#targetAgent.invoke_setAutoAttach({ autoAttach: true, waitForDebuggerOnStart: false });
    }
  }
  targetInfoChanged(_event) {
  }
  targetDestroyed(_event) {
  }
  async attachedToTarget({ sessionId, targetInfo }) {
    let target;
    if (targetInfo.type === "node_worker") {
      target = this.#targetManager.createTarget(targetInfo.targetId, targetInfo.title, SDK.Target.Type.NODE_WORKER, this.#parentTarget, sessionId, true, void 0, targetInfo);
    } else {
      const name = i18nString2(UIStrings2.nodejsS, { PH1: targetInfo.url });
      document.title = i18nString2(UIStrings2.NodejsTitleS, { PH1: targetInfo.url });
      const connection = new NodeConnection(this.#targetAgent, sessionId);
      this.#childConnections.set(sessionId, connection);
      target = this.#targetManager.createTarget(targetInfo.targetId, name, SDK.Target.Type.NODE, null, void 0, void 0, new ProtocolClient.DevToolsCDPConnection.DevToolsCDPConnection(connection));
    }
    this.#childTargets.set(sessionId, target);
    void target.runtimeAgent().invoke_runIfWaitingForDebugger();
    await this.#initializeStorage(target);
  }
  async #initializeStorage(target) {
    const storageAgent = target.storageAgent();
    const response = await storageAgent.invoke_getStorageKey({});
    const storageKey = response.storageKey;
    if (response.getError() || !storageKey) {
      console.error(`Failed to get storage key for target ${target.id()}: ${response.getError()}`);
      return;
    }
    const storageKeyManager = target.model(SDK.StorageKeyManager.StorageKeyManager);
    if (storageKeyManager) {
      storageKeyManager.setMainStorageKey(storageKey);
      storageKeyManager.updateStorageKeys(/* @__PURE__ */ new Set([storageKey]));
    }
  }
  detachedFromTarget({ sessionId }) {
    const childTarget = this.#childTargets.get(sessionId);
    if (childTarget) {
      childTarget.dispose("target terminated");
    }
    this.#childTargets.delete(sessionId);
    this.#childConnections.delete(sessionId);
  }
  receivedMessageFromTarget({ sessionId, message }) {
    const connection = this.#childConnections.get(sessionId);
    const onMessage = connection ? connection.onMessage : null;
    if (onMessage) {
      onMessage.call(null, message);
    }
  }
  targetCrashed(_event) {
  }
};
var NodeConnection = class {
  #targetAgent;
  #sessionId;
  onMessage;
  #onDisconnect;
  constructor(targetAgent, sessionId) {
    this.#targetAgent = targetAgent;
    this.#sessionId = sessionId;
    this.onMessage = null;
    this.#onDisconnect = null;
  }
  setOnMessage(onMessage) {
    this.onMessage = onMessage;
  }
  setOnDisconnect(onDisconnect) {
    this.#onDisconnect = onDisconnect;
  }
  sendRawMessage(message) {
    void this.#targetAgent.invoke_sendMessageToTarget({ message, sessionId: this.#sessionId });
  }
  async disconnect() {
    if (this.#onDisconnect) {
      this.#onDisconnect.call(null, "force disconnect");
    }
    this.#onDisconnect = null;
    this.onMessage = null;
    await this.#targetAgent.invoke_detachFromTarget({ sessionId: this.#sessionId });
  }
};
SDK.SDKModel.SDKModel.register(NodeChildTargetManager, { capabilities: 32, autostart: true });
export {
  NodeConnectionsPanel_exports as NodeConnectionsPanel,
  NodeMain_exports as NodeMain
};
//# sourceMappingURL=app.js.map
