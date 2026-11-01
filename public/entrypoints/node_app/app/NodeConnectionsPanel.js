// Copyright 2015 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import '../../../ui/components/lists/lists.js';
import '../../../ui/kit/kit.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as UI from '../../../ui/legacy/legacy.js';
import { html, i18nTemplate, render } from '../../../ui/lit/lit.js';
import nodeConnectionsPanelStyles from './nodeConnectionsPanel.css.js';
const { widget } = UI.Widget;
const UIStrings = {
    /**
     * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
     */
    nodejsDebuggingGuide: 'Node.js debugging guide',
    /**
     * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
     * @example {Node.js debugging guide} PH1
     */
    specifyNetworkEndpointAnd: 'Specify network endpoint and DevTools will connect to it automatically. Read {PH1} to learn more.',
    /**
     * @description Placeholder text content in Node connections panel of the Sources panel when debugging a Node.js app.
     */
    noConnectionsSpecified: 'No connections specified',
    /**
     * @description Text of add network target button in Node connections panel of the Sources panel when debugging a Node.js app.
     */
    addConnection: 'Add connection',
    /**
     * @description Text in Node connections panel of the Sources panel when debugging a Node.js app.
     */
    networkAddressEgLocalhost: 'Network address (e.g. localhost:9229)',
};
const str_ = i18n.i18n.registerUIStrings('entrypoints/node_app/app/NodeConnectionsPanel.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const nodejsIconUrl = new URL('../../../Images/node-stack-icon.svg', import.meta.url).toString();
const PANEL_DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    render(html `
    <style>${nodeConnectionsPanelStyles}</style>
    <div class="node-panel vbox flex-auto" tabindex="0" autofocus>
      <div class="node-panel-center">
        <img class="node-panel-logo" src=${nodejsIconUrl} alt="">
        ${widget(NodeConnectionsView, {
        discoveryConfig: input.discoveryConfig,
        callback: input.onDiscoveryConfigChanged,
    })}
      </div>
    </div>
  `, target);
    // clang-format on
};
export class NodeConnectionsPanel extends UI.Panel.Panel {
    #config;
    #view;
    constructor(view = PANEL_DEFAULT_VIEW) {
        super('node-connection');
        this.#view = view;
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(Host.InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged, this.#devicesDiscoveryConfigChanged, this);
        // Trigger notification once.
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(false);
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.setDevicesUpdatesEnabled(true);
        this.performUpdate();
    }
    performUpdate() {
        this.#view({
            discoveryConfig: this.#config?.networkDiscoveryConfig ?? [],
            onDiscoveryConfigChanged: this.#onDiscoveryConfigChanged,
        }, undefined, this.contentElement);
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
}
export const DEFAULT_VIEW = (input, _output, target) => {
    // clang-format off
    const documentationLink = html `
    <devtools-link href="https://nodejs.org/learn/getting-started/debugging"
                   jslogcontext="node-js-debugging">
      ${i18nString(UIStrings.nodejsDebuggingGuide)}
    </devtools-link>`;
    const items = input.editingIndex === input.connections.length
        ? [...input.connections, '']
        : input.connections;
    render(html `
    <style>${nodeConnectionsPanelStyles}</style>
    <div class="vbox network-discovery-view node-frontend">
      <div class="network-discovery-footer">
        ${i18nTemplate(str_, UIStrings.specifyNetworkEndpointAnd, { PH1: documentationLink })}
      </div>
      ${items.length === 0 ? html `
        <div class="network-discovery-list-empty">${i18nString(UIStrings.noConnectionsSpecified)}</div>
      ` : html `
        <devtools-list
          class="network-discovery-list"
          .editable=${true}
          .deletable=${true}
          @edit=${(e) => input.onBeginEdit(e.detail.index)}
          @delete=${(e) => input.onDelete(e.detail.index)}>
          ${items.map((address, index) => {
        const editing = input.editingIndex === index;
        return html `
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
            if (!editing && e.key === 'Enter') {
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
          .variant=${"primary" /* Buttons.Button.Variant.PRIMARY */}
          .jslogContext=${'add-network-target'}
          @click=${input.onAddClick}>
        ${i18nString(UIStrings.addConnection)}
      </devtools-button>
    </div>
  `, target);
    // clang-format on
};
export class NodeConnectionsView extends UI.Widget.VBox {
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
        this.#view({
            connections: this.#networkDiscoveryConfig,
            editingIndex: this.#editingIndex,
            onAddClick: this.#addNetworkTargetButtonClicked.bind(this),
            onBeginEdit: this.#beginEdit.bind(this),
            onCommitEdit: this.#commitEdit.bind(this),
            onCancelEdit: this.#cancelEdit.bind(this),
            onDelete: this.#deleteItem.bind(this),
            validator: NodeConnectionsView.validateAddress,
        }, undefined, this.element);
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
        }
        else if (index >= 0 && index < this.#networkDiscoveryConfig.length) {
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
            }
            else if (this.#editingIndex > index) {
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
}
//# sourceMappingURL=NodeConnectionsPanel.js.map