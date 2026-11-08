var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../../front_end/entrypoints/node_app/app/NodeConnectionsPanel.ts
var NodeConnectionsPanel_exports = {};
__export(NodeConnectionsPanel_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  NodeConnectionsPanel: () => NodeConnectionsPanel,
  NodeConnectionsView: () => NodeConnectionsView
});
import "../../../ui/components/lists/lists.js";
import "../../../ui/kit/kit.js";
import * as Host from "../../../core/host/host.js";
import * as i18n from "../../../core/i18n/i18n.js";
import * as Buttons from "../../../ui/components/buttons/buttons.js";
import * as UI from "../../../ui/legacy/legacy.js";
import { html, i18nTemplate, render } from "../../../ui/lit/lit.js";

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
  margin: var(--sys-size-9) 0 5px;
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
  height: var(--sys-size-14);
}

:host-context(.node-frontend) .network-discovery-list-item {
  padding: 3px 15px;
  height: var(--sys-size-14);
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

/*# sourceURL=${import.meta.resolve("./nodeConnectionsPanel.css")} */`;

// ../../front_end/entrypoints/node_app/app/NodeConnectionsPanel.ts
var { widget } = UI.Widget;
var UIStrings = {
  /**
   * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
   */
  nodejsDebuggingGuide: "Node.js debugging guide",
  /**
   * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
   * @example {Node.js debugging guide} PH1
   */
  specifyNetworkEndpointAnd: "Specify network endpoint and DevTools will connect to it automatically. Read {PH1} to learn more.",
  /**
   * @description Placeholder text content in Node connections panel of the Sources panel when debugging a Node.js app.
   */
  noConnectionsSpecified: "No connections specified",
  /**
   * @description Text of add network target button in Node connections panel of the Sources panel when debugging a Node.js app.
   */
  addConnection: "Add connection",
  /**
   * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
   */
  networkAddressEgLocalhost: "Network address (e.g. localhost:9229)"
};
var str_ = i18n.i18n.registerUIStrings("entrypoints/node_app/app/NodeConnectionsPanel.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var nodejsIconUrl = new URL("../../../Images/node-stack-icon.svg", import.meta.url).toString();
var PANEL_DEFAULT_VIEW = (input, _output, target) => {
  render(html`
    <style>${nodeConnectionsPanel_css_default}</style>
    <div class="node-panel vbox flex-auto" tabindex="0" autofocus>
      <div class="node-panel-center">
        <img class="node-panel-logo" src=${nodejsIconUrl} alt="">
        ${widget(NodeConnectionsView, {
    discoveryConfig: input.discoveryConfig,
    callback: input.onDiscoveryConfigChanged
  })}
      </div>
    </div>
  `, target);
};
var NodeConnectionsPanel = class extends UI.Panel.Panel {
  #config;
  #view;
  constructor(view = PANEL_DEFAULT_VIEW) {
    super("node-connection");
    this.#view = view;
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(
      Host.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,
      this.#devicesDiscoveryConfigChanged,
      this
    );
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
    this.performUpdate();
  }
  performUpdate() {
    this.#view(
      {
        discoveryConfig: this.#config?.networkDiscoveryConfig ?? [],
        onDiscoveryConfigChanged: this.#onDiscoveryConfigChanged
      },
      void 0,
      this.contentElement
    );
  }
  #onDiscoveryConfigChanged = (config) => {
    if (!this.#config) {
      return;
    }
    this.#config.networkDiscoveryConfig = config;
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesDiscoveryConfig(this.#config);
  };
  #devicesDiscoveryConfigChanged({ data: config }) {
    this.#config = config;
    this.requestUpdate();
  }
};
var DEFAULT_VIEW = (input, _output, target) => {
  const documentationLink = html`
    <devtools-link href="https://nodejs.org/learn/getting-started/debugging"
                   jslogcontext="node-js-debugging">
      ${i18nString(UIStrings.nodejsDebuggingGuide)}
    </devtools-link>`;
  const items = input.editingIndex === input.connections.length ? [...input.connections, ""] : input.connections;
  render(html`
    <style>${nodeConnectionsPanel_css_default}</style>
    <div class="vbox network-discovery-view node-frontend">
      <div class="network-discovery-footer">
        ${i18nTemplate(str_, UIStrings.specifyNetworkEndpointAnd, { PH1: documentationLink })}
      </div>
      ${items.length === 0 ? html`
        <div class="network-discovery-list-empty">${i18nString(UIStrings.noConnectionsSpecified)}</div>
      ` : html`
        <devtools-list
          class="network-discovery-list"
          .editable=${true}
          .deletable=${true}
          @edit=${(e) => input.onBeginEdit(e.detail.index)}
          @delete=${(e) => input.onDelete(e.detail.index)}>
          ${items.map((address, index) => {
    const editing = input.editingIndex === index;
    return html`
              <div slot="slot-${index}" class="network-discovery-list-item">
                <devtools-prompt
                  class="network-discovery-value network-discovery-address"
                  placeholder=${i18nString(UIStrings.networkAddressEgLocalhost)}
                  value=${address}
                  ?editing=${editing}
                  .validator=${input.validator}
                  @click=${(e) => {
      if (!editing) {
        input.onBeginEdit(index);
        e.consume(true);
      }
    }}
                  @keydown=${(e) => {
      if (!editing && e.key === "Enter") {
        input.onBeginEdit(index);
        e.consume(true);
      }
    }}
                  @commit=${(e) => input.onCommitEdit(index, e.detail)}
                  @cancel=${input.onCancelEdit}>
                  ${address}
                </devtools-prompt>
              </div>
            `;
  })}
        </devtools-list>
      `}
      <devtools-button
          class="add-network-target-button"
          .variant=${Buttons.Button.Variant.PRIMARY}
          .jslogContext=${"add-network-target"}
          @click=${input.onAddClick}>
        ${i18nString(UIStrings.addConnection)}
      </devtools-button>
    </div>
  `, target);
};
var NodeConnectionsView = class _NodeConnectionsView extends UI.Widget.VBox {
  #callback;
  #networkDiscoveryConfig = [];
  #editingIndex = null;
  #view;
  constructor(element, view = DEFAULT_VIEW) {
    super(element);
    this.#view = view;
    this.performUpdate();
  }
  static validateAddress(value) {
    const match = value.trim().match(/^([a-zA-Z0-9\.\-_]+):(\d+)$/);
    if (!match) {
      return i18nString(UIStrings.networkAddressEgLocalhost);
    }
    const port = parseInt(match[2], 10);
    return port <= 65535 ? null : i18nString(UIStrings.networkAddressEgLocalhost);
  }
  set callback(callback) {
    this.#callback = callback;
  }
  set discoveryConfig(networkDiscoveryConfig) {
    this.discoveryConfigChanged(networkDiscoveryConfig);
  }
  performUpdate() {
    this.#view(
      {
        connections: this.#networkDiscoveryConfig,
        editingIndex: this.#editingIndex,
        onAddClick: this.#addNetworkTargetButtonClicked.bind(this),
        onBeginEdit: this.#beginEdit.bind(this),
        onCommitEdit: this.#commitEdit.bind(this),
        onCancelEdit: this.#cancelEdit.bind(this),
        onDelete: this.#deleteItem.bind(this),
        validator: _NodeConnectionsView.validateAddress
      },
      void 0,
      this.element
    );
  }
  #update() {
    this.#callback?.call(null, [...this.#networkDiscoveryConfig]);
  }
  #addNetworkTargetButtonClicked() {
    this.#editingIndex = this.#networkDiscoveryConfig.length;
    this.requestUpdate();
  }
  #beginEdit(index) {
    this.#editingIndex = index;
    this.requestUpdate();
  }
  #commitEdit(index, value) {
    const trimmed = value.trim();
    if (index === this.#networkDiscoveryConfig.length) {
      this.#networkDiscoveryConfig.push(trimmed);
    } else if (index >= 0 && index < this.#networkDiscoveryConfig.length) {
      this.#networkDiscoveryConfig[index] = trimmed;
    }
    this.#editingIndex = null;
    this.requestUpdate();
    this.#update();
  }
  #cancelEdit() {
    this.#editingIndex = null;
    this.requestUpdate();
  }
  #deleteItem(index) {
    this.#networkDiscoveryConfig.splice(index, 1);
    if (this.#editingIndex !== null) {
      if (this.#editingIndex === index) {
        this.#editingIndex = null;
      } else if (this.#editingIndex > index) {
        this.#editingIndex--;
      }
    }
    this.requestUpdate();
    this.#update();
  }
  discoveryConfigChanged(networkDiscoveryConfig) {
    this.#networkDiscoveryConfig = [...networkDiscoveryConfig];
    this.#editingIndex = null;
    this.requestUpdate();
  }
};

// ../../front_end/entrypoints/node_app/app/NodeMain.ts
var NodeMain_exports = {};
__export(NodeMain_exports, {
  NodeChildTargetManager: () => NodeChildTargetManager,
  NodeConnection: () => NodeConnection,
  NodeMainImpl: () => NodeMainImpl
});
import * as Host2 from "../../../core/host/host.js";
import * as i18n3 from "../../../core/i18n/i18n.js";
import * as ProtocolClient from "../../../core/protocol_client/protocol_client.js";
import * as SDK from "../../../core/sdk/sdk.js";
import * as Components from "../../../ui/legacy/components/utils/utils.js";
var UIStrings2 = {
  /**
   * @description Text that refers to the main target.
   */
  main: "Main",
  /**
   * @description Text in Node main of the Sources panel when debugging a Node.js app.
   * @example {example.com} PH1
   */
  nodejsS: "Node.js: {PH1}",
  /**
   * @description Text in DevTools window title when debugging a Node.js app.
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
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(
      Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,
      this.#devicesDiscoveryConfigChanged,
      this
    );
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
    Host2.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(
      Host2.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,
      this.#devicesDiscoveryConfigChanged,
      this
    );
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
  async attachedToTarget({ sessionId, targetInfo }) {
    let target;
    if (targetInfo.type === "node_worker") {
      target = this.#targetManager.createTarget(
        targetInfo.targetId,
        targetInfo.title,
        SDK.Target.Type.NODE_WORKER,
        this.#parentTarget,
        sessionId,
        true,
        void 0,
        targetInfo
      );
    } else {
      const name = i18nString2(UIStrings2.nodejsS, { PH1: targetInfo.url });
      document.title = i18nString2(UIStrings2.NodejsTitleS, { PH1: targetInfo.url });
      const connection = new NodeConnection(this.#targetAgent, sessionId);
      this.#childConnections.set(sessionId, connection);
      target = this.#targetManager.createTarget(
        targetInfo.targetId,
        name,
        SDK.Target.Type.NODE,
        null,
        void 0,
        void 0,
        new ProtocolClient.DevToolsCDPConnection.DevToolsCDPConnection(connection)
      );
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
SDK.SDKModel.SDKModel.register(NodeChildTargetManager, { capabilities: SDK.Target.Capability.TARGET, autostart: true });
export {
  NodeConnectionsPanel_exports as NodeConnectionsPanel,
  NodeMain_exports as NodeMain
};
//# sourceMappingURL=app.js.map
