var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/webauthn/WebauthnPane.js
var WebauthnPane_exports = {};
__export(WebauthnPane_exports, {
  WebauthnPaneImpl: () => WebauthnPaneImpl
});
import "./../../ui/legacy/legacy.js";
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as DataGrid from "./../../ui/legacy/components/data_grid/data_grid.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as Lit from "./../../ui/lit/lit.js";
import * as VisualLogging from "./../../ui/visual_logging/visual_logging.js";

// gen/front_end/panels/webauthn/webauthnPane.css.js
var webauthnPane_css_default = `/*
 * Copyright (c) 2020 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

.webauthn-pane {
  overflow: auto;
  min-width: 500px;
}

.webauthn-toolbar-container {
  display: flex;
  background-color: var(--sys-color-cdt-base-container);
  border-bottom: 1px solid var(--sys-color-divider);
  flex: 0 0 auto;
}

.webauthn-toolbar {
  display: inline-block;
}

.authenticators-view {
  padding: 0 var(--sys-size-9);
  min-height: auto;
  display: none;
}

.webauthn-pane.enabled .authenticators-view {
  display: block;
}

/* New Authenticator Section */
.new-authenticator-title {
  display: block;
  padding: var(--sys-size-7) 0 var(--sys-size-5) 0;
  font: var(--sys-typescale-headline5);

  &:has(devtools-button) {
    padding-top: var(--sys-size-4);
  }
}

.new-authenticator-container {
  display: none;
  padding-left:  var(--sys-size-9);
}

.authenticator-option {
  > select {
    margin: 0 var(--sys-size-9) var(--sys-size-3) var(--sys-size-9);
  }

  > devtools-button {
    margin: var(--sys-size-3) var(--sys-size-9);
  }

  > input[type="checkbox"] {
    margin: var(--sys-size-5) var(--sys-size-9);
  }
}

.webauthn-pane.enabled .new-authenticator-container {
  display: block;
}

.new-authenticator-form {
  border: none;
  flex: 0 0 auto;
  margin: 0;
  padding-bottom: var(--sys-size-5);
}

.webauthn-pane select {
  width: 120px;
}
/* Active Authenticator Section */
.authenticator-section {
  display: block;
}

.divider {
  border-bottom: var(--sys-size-1) solid var(--sys-color-divider);
  margin: 10px calc(var(--sys-size-9) * -1) 0;
}

.authenticator-fields {
  border: none;
  flex: 0 0 auto;
  margin-bottom: 10px;
}

.authenticator-section-header {
  margin: var(--sys-size-4) 0 var(--sys-size-5) calc(var(--sys-size-5) * -1);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.authenticator-section-title {
  line-height: 24px;
  display: inline-flex;
}

.authenticator-section-title .authenticator-name-field {
  display: inline-block;
  border: none;
  animation: save-flash 0.2s;
  text-overflow: ellipsis;
  font: var(--sys-typescale-headline5);
}

.authenticator-section-title.editing-name .authenticator-name-field {
  border-bottom: 1px solid var(--sys-color-neutral-outline);
  font-weight: normal;
  animation: none;
}

.authenticator-field-value {
  font: var(--sys-typescale-monospace-regular);
  line-height: 18px;
}

.authenticator-field {
  margin: var(--sys-size-3) 0;
}

.authenticator-field,
.authenticator-option {
  display: flex;
  align-items: center;
}

.authenticator-option-label {
  color: var(--sys-color-on-surface-subtle);
  font: var(--sys-typescale-body5-medium);
  padding-right: var(--sys-size-6);
  text-align: left;
  min-width: 152px;
  line-height: 18px;
}

td .text-button {
  min-width: 20px;
  margin: auto;
}

.active-button-container {
  display: inline-block;
  min-width: 28px;
}

.edit-name-toolbar {
  display: inline-block;
  vertical-align: middle;
}

@keyframes save-flash {
  from { opacity: 0%; }
  to { opacity: 100%; }
}
/* Credentials Table */

.data-grid-data-grid-node.centered {
  text-align: center;
}

.data-grid td {
  vertical-align: middle;
}

.credentials-title {
  display: block;
  font: var(--sys-typescale-headline5);
  padding: var(--sys-size-7) 0 var(--sys-size-5) 0;
  border-top: var(--sys-size-1) solid var(--sys-color-divider);
  margin-right: calc(var(--sys-size-9) * -1);
}

.code {
  font-family: monospace;
}

.learn-more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  overflow: hidden;
}

.webauthn-pane.enabled .learn-more {
  display: none;
}

/*# sourceURL=${import.meta.resolve("./webauthnPane.css")} */`;

// gen/front_end/panels/webauthn/WebauthnPane.js
var { render, html, Directives: { ref } } = Lit;
var { widgetConfig } = UI.Widget;
var UIStrings = {
  /**
   *@description Label for button that allows user to download the private key related to a credential.
   */
  export: "Export",
  /**
   *@description Label for an item to remove something
   */
  remove: "Remove",
  /**
   *@description Label for empty credentials table.
   *@example {navigator.credentials.create()} PH1
   */
  noCredentialsTryCallingSFromYour: "No credentials. Try calling {PH1} from your website.",
  /**
   *@description Label for checkbox to toggle the virtual authenticator environment allowing user to interact with software-based virtual authenticators.
   */
  enableVirtualAuthenticator: "Enable virtual authenticator environment",
  /**
   *@description Label for ID field for credentials.
   */
  id: "ID",
  /**
   *@description Label for field that describes whether a credential is a resident credential.
   */
  isResident: "Is Resident",
  /**
   *@description Label for credential field that represents the Relying Party ID that the credential is scoped to.
   */
  rpId: "RP ID",
  /**
   *@description Label for a column in a table. A field/unique ID that represents the user a credential is mapped to.
   */
  userHandle: "User Handle",
  /**
   *@description Label for signature counter field for credentials which represents the number of successful assertions.
   * See https://w3c.github.io/webauthn/#signature-counter.
   */
  signCount: "Signature Count",
  /**
   *@description Label for column with actions for credentials.
   */
  actions: "Actions",
  /**
   *@description Title for the table that holds the credentials that a authenticator has registered.
   */
  credentials: "Credentials",
  /**
   *@description Text that shows before the virtual environment is enabled.
   */
  noAuthenticator: "No authenticator set up",
  /**
   *@description That that shows before virtual environment is enabled explaining the panel.
   */
  useWebauthnForPhishingresistant: "Use WebAuthn for phishing-resistant authentication.",
  /**
   *@description Title for section of interface that allows user to add a new virtual authenticator.
   */
  newAuthenticator: "New authenticator",
  /**
   *@description Text for security or network protocol
   */
  protocol: "Protocol",
  /**
   *@description Label for input to select which transport option to use on virtual authenticators, e.g. USB or Bluetooth.
   */
  transport: "Transport",
  /**
   *@description Label for checkbox that toggles resident key support on virtual authenticators.
   */
  supportsResidentKeys: "Supports resident keys",
  /**
   *@description Label for checkbox that toggles large blob support on virtual authenticators. Large blobs are opaque data associated
   * with a WebAuthn credential that a website can store, like an SSH certificate or a symmetric encryption key.
   * See https://w3c.github.io/webauthn/#sctn-large-blob-extension
   */
  supportsLargeBlob: "Supports large blob",
  /**
   *@description Text to add something
   */
  add: "Add",
  /**
   *@description Label for radio button that toggles whether an authenticator is active.
   */
  active: "Active",
  /**
   *@description Title for button that enables user to customize name of authenticator.
   */
  editName: "Edit name",
  /**
   *@description Placeholder for the input box to customize name of authenticator.
   */
  enterNewName: "Enter new name",
  /**
   *@description Title for button that enables user to save name of authenticator after editing it.
   */
  saveName: "Save name",
  /**
   *@description Title for a user-added virtual authenticator which is uniquely identified with its AUTHENTICATORID.
   *@example {8c7873be-0b13-4996-a794-1521331bbd96} PH1
   */
  authenticatorS: "Authenticator {PH1}",
  /**
   *@description Name for generated file which user can download. A private key is a secret code which enables encoding and decoding of a credential. .pem is the file extension.
   */
  privateKeypem: "Private key.pem",
  /**
   *@description Label for field that holds an authenticator's universally unique identifier (UUID).
   */
  uuid: "UUID",
  /**
   *@description Label for checkbox that toggles user verification support on virtual authenticators.
   */
  supportsUserVerification: "Supports user verification",
  /**
   *@description Text in Timeline indicating that input has happened recently
   */
  yes: "Yes",
  /**
   *@description Text in Timeline indicating that input has not happened recently
   */
  no: "No",
  /**
   *@description Title of radio button that sets an authenticator as active.
   *@example {Authenticator ABCDEF} PH1
   */
  setSAsTheActiveAuthenticator: "Set {PH1} as the active authenticator"
};
var str_ = i18n.i18n.registerUIStrings("panels/webauthn/WebauthnPane.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var i18nTemplate2 = Lit.i18nTemplate.bind(void 0, str_);
var WEB_AUTHN_EXPLANATION_URL = "https://developer.chrome.com/docs/devtools/webauthn";
var DataGridNode = class extends DataGrid.DataGrid.DataGridNode {
  credential;
  constructor(credential) {
    super(credential);
    this.credential = credential;
  }
  nodeSelfHeight() {
    return 24;
  }
  createCell(columnId) {
    const cell = super.createCell(columnId);
    UI.Tooltip.Tooltip.install(cell, cell.textContent || "");
    if (columnId !== "actions") {
      return cell;
    }
    const onExportCredential = () => {
      if (this.dataGrid) {
        this.dataGrid.onExportCredential(this.credential);
      }
    };
    const onRemoveCredential = () => {
      if (this.dataGrid) {
        this.dataGrid.onRemoveCredential(this.credential);
      }
    };
    render(html`
       <devtools-button .variant=${"outlined"}
           @click=${onExportCredential} .jslogContext=${"webauthn.export-credential"}>
        ${i18nString(UIStrings.export)}
      </devtools-button>
      <devtools-button .variant=${"outlined"}
          @click=${onRemoveCredential} .jslogContext=${"webauthn.remove-credential"}>
        ${i18nString(UIStrings.remove)}
      </devtools-button>`, cell);
    return cell;
  }
};
var WebauthnDataGrid = class extends DataGrid.DataGrid.DataGridImpl {
  onExportCredential = (_) => {
  };
  onRemoveCredential = (_) => {
  };
};
var EmptyDataGridNode = class extends DataGrid.DataGrid.DataGridNode {
  createCells(element) {
    element.removeChildren();
    render(html`
      <td class=${"center"} colspan=${this.dataGrid?.visibleColumnsArray.length ?? 1}>
        ${i18nTemplate2(UIStrings.noCredentialsTryCallingSFromYour, { PH1: html`<span class="code">navigator.credentials.create()</span>` })}
      </td>`, element);
  }
};
var PRIVATE_NAME = "PRIVATE";
var PRIVATE_KEY_HEADER = `-----BEGIN ${PRIVATE_NAME} KEY-----
`;
var PRIVATE_KEY_FOOTER = `-----END ${PRIVATE_NAME} KEY-----`;
var PROTOCOL_AUTHENTICATOR_VALUES = {
  Ctap2: "ctap2",
  U2f: "u2f"
};
var WebauthnPaneImpl = class extends UI.Widget.VBox {
  #createCredentialsDataGrid(authenticatorId) {
    const columns = [
      {
        id: "credentialId",
        title: i18nString(UIStrings.id),
        longText: true,
        weight: 24
      },
      {
        id: "isResidentCredential",
        title: i18nString(UIStrings.isResident),
        dataType: "Boolean",
        weight: 10
      },
      {
        id: "rpId",
        title: i18nString(UIStrings.rpId)
      },
      {
        id: "userHandle",
        title: i18nString(UIStrings.userHandle)
      },
      {
        id: "signCount",
        title: i18nString(UIStrings.signCount)
      },
      { id: "actions", title: i18nString(UIStrings.actions) }
    ];
    const dataGridConfig = {
      displayName: i18nString(UIStrings.credentials),
      columns,
      editCallback: void 0,
      deleteCallback: void 0,
      refreshCallback: void 0
    };
    const dataGrid = new WebauthnDataGrid(dataGridConfig);
    dataGrid.renderInline();
    dataGrid.setStriped(true);
    dataGrid.onExportCredential = this.#exportCredential.bind(this);
    dataGrid.onRemoveCredential = ({ credentialId }) => this.#removeCredential(authenticatorId, credentialId);
    dataGrid.rootNode().appendChild(new EmptyDataGridNode());
    this.dataGrids.set(authenticatorId, dataGrid);
    return dataGrid;
  }
  #renderToolbar() {
    const enableCheckboxTitle = i18nString(UIStrings.enableVirtualAuthenticator);
    return html`
      <div class="webauthn-toolbar-container" jslog=${VisualLogging.toolbar()} role="toolbar">
        <devtools-toolbar class="webauthn-toolbar" role="presentation">
          <devtools-checkbox title=${enableCheckboxTitle}
              @click=${this.#handleCheckboxToggle.bind(this)}
              .jslogContext=${"virtual-authenticators"}
              ${ref((e) => {
      this.#enableCheckbox = e;
    })}>
            ${enableCheckboxTitle}
          </devtools-checkbox>
        </devtools-toolbar>
      </div>`;
  }
  #renderLearnMoreView() {
    return html`
      <devtools-widget class="learn-more" .widgetConfig=${widgetConfig(UI.EmptyWidget.EmptyWidget, {
      header: i18nString(UIStrings.noAuthenticator),
      text: i18nString(UIStrings.useWebauthnForPhishingresistant),
      link: WEB_AUTHN_EXPLANATION_URL
    })}>
      </devtools-widget>`;
  }
  #renderNewAuthenticatorSection() {
    const options = this.#newAuthenticatorOptions;
    const isCtap2 = options.protocol === "ctap2";
    return html`
      <div class="new-authenticator-container">
        <label class="new-authenticator-title">
          ${i18nString(UIStrings.newAuthenticator)}
        </label>
        <div class="new-authenticator-form" jslog=${VisualLogging.section("new-authenticator")}>
          <div class="authenticator-option">
            <label class="authenticator-option-label" for="protocol">
              ${i18nString(UIStrings.protocol)}
            </label>
            <select id="protocol" jslog=${VisualLogging.dropDown("protocol").track({ change: true })}
                value=${options.protocol}
                @change=${(e) => this.#updateNewAuthenticatorSectionOptions({ protocol: e.target.value })}>
              ${Object.values(PROTOCOL_AUTHENTICATOR_VALUES).sort().map((option) => html`
                <option value=${option} jslog=${VisualLogging.item(option).track({ click: true })}
                        .selected=${options.protocol === option}>
                  ${option}
                </option>`)}
            </select>
          </div>
          <div class="authenticator-option">
            <label for="transport" class="authenticator-option-label">
              ${i18nString(UIStrings.transport)}
            </label>
            <select id="transport"
                value=${options.transport}
                jslog=${VisualLogging.dropDown("transport").track({ change: true })}
                @change=${(e) => this.#updateNewAuthenticatorSectionOptions({ transport: e.target.value })}>
              ${[
      "usb",
      "ble",
      "nfc",
      ...isCtap2 ? [
        "internal"
        /* Protocol.WebAuthn.AuthenticatorTransport.Internal */
      ] : []
    ].map((option) => html`
                  <option value=${option} jslog=${VisualLogging.item(option).track({ click: true })}
                      .selected=${options.transport === option}
                      .disabled=${this.#hasInternalAuthenticator && option === "internal"}>
                    ${option}
                  </option>`)}
            </select>
          </div>
          <div class="authenticator-option">
            <label for="resident-key" class="authenticator-option-label">
              ${i18nString(UIStrings.supportsResidentKeys)}
            </label>
            <input id="resident-key" class="authenticator-option-checkbox" type="checkbox"
                jslog=${VisualLogging.toggle("resident-key").track({ change: true })}
                @change=${(e) => this.#updateNewAuthenticatorSectionOptions({ hasResidentKey: e.target.checked })}
                .checked=${Boolean(options.hasResidentKey && isCtap2)} .disabled=${!isCtap2}>
          </div>
          <div class="authenticator-option">
            <label for="user-verification" class="authenticator-option-label">
              ${i18nString(UIStrings.supportsUserVerification)}
            </label>
            <input id="user-verification" class="authenticator-option-checkbox" type="checkbox"
                jslog=${VisualLogging.toggle("user-verification").track({ change: true })}
                @change=${(e) => this.#updateNewAuthenticatorSectionOptions({ hasUserVerification: e.target.checked })}
                .checked=${Boolean(options.hasUserVerification && isCtap2)} .disabled=${!isCtap2}>
          </div>
          <div class="authenticator-option">
            <label for="large-blob" class="authenticator-option-label">
              ${i18nString(UIStrings.supportsLargeBlob)}
            </label>
            <input id="large-blob" class="authenticator-option-checkbox" type="checkbox"
                jslog=${VisualLogging.toggle("large-blob").track({ change: true })}
                @change=${(e) => this.#updateNewAuthenticatorSectionOptions({ hasLargeBlob: e.target.checked })}
                .checked=${Boolean(options.hasLargeBlob && isCtap2 && options.hasResidentKey)}
                .disabled=${!options.hasResidentKey || !isCtap2}>
          </div>
          <div class="authenticator-option">
            <div class="authenticator-option-label"></div>
            <devtools-button @click=${this.#handleAddAuthenticatorButton}
                id="add-authenticator"
                .jslogContext=${"webauthn.add-authenticator"}
                .variant=${"outlined"}>
              ${i18nString(UIStrings.add)}
            </devtools-button>
          </div>
        </div>
      </div>`;
  }
  async #addAuthenticatorSection(authenticatorId, options) {
    const section2 = document.createElement("div");
    section2.classList.add("authenticator-section");
    section2.setAttribute("data-authenticator-id", authenticatorId);
    section2.setAttribute("jslog", `${VisualLogging.section("authenticator")}`);
    this.#authenticatorsView.appendChild(section2);
    await this.#clearActiveAuthenticator();
    this.#activeAuthId = authenticatorId;
    const userFriendlyName = authenticatorId.slice(-5);
    render(html`
      <div class="authenticator-section-header">
        <div class="authenticator-section-title" role="heading" aria-level="2">
          <devtools-toolbar class="edit-name-toolbar">
            <devtools-button title=${i18nString(UIStrings.editName)}
                class="edit-name"
                @click=${(e) => this.#handleEditNameButton(e.target)}
                .iconName=${"edit"} .variant=${"toolbar"}
                .jslogContext=${"edit-name"}></devtools-button>
            <devtools-button title=${i18nString(UIStrings.saveName)}
                @click=${(e) => this.#handleSaveNameButton(e.target)}
                .iconName=${"checkmark"} .variant=${"toolbar"}
                class="save-name hidden"
                .jslogContext=${"save-name"}></devtools-button>
          </devtools-toolbar>
          <input class="authenticator-name-field"
              placeholder=${i18nString(UIStrings.enterNewName)}
              jslog=${VisualLogging.textField("name").track({ keydown: "Enter", change: true })}
              value=${i18nString(UIStrings.authenticatorS, { PH1: userFriendlyName })} disabled
              @focusout=${(e) => this.#handleSaveNameButton(e.target)}
              @keydown=${(event) => {
      if (event.key === "Enter") {
        this.#handleSaveNameButton(event.target);
      }
    }}>
        </div>
        <div class="active-button-container">
          <label title=${i18nString(UIStrings.setSAsTheActiveAuthenticator, { PH1: userFriendlyName })}>
            <input type="radio" checked @change=${this.#setActiveAuthenticator.bind(this, authenticatorId)}
                  jslog=${VisualLogging.toggle("webauthn.active-authenticator").track({ change: true })}>
            ${i18nString(UIStrings.active)}
          </label>
        </div>
        <button class="text-button" @click=${this.removeAuthenticator.bind(this, authenticatorId)}
            jslog=${VisualLogging.action("webauthn.remove-authenticator").track({ click: true })}>
          ${i18nString(UIStrings.remove)}
        </button>
      </div>
      ${this.#renderAuthenticatorFields(authenticatorId, options)}
      <div class="credentials-title">${i18nString(UIStrings.credentials)}</div>
    `, section2, { host: this });
    const dataGrid = this.#createCredentialsDataGrid(authenticatorId);
    dataGrid.asWidget().show(section2);
    if (this.#model) {
      this.#model.addEventListener("CredentialAdded", this.#addCredential.bind(this, authenticatorId));
      this.#model.addEventListener("CredentialAsserted", this.#updateCredential.bind(this, authenticatorId));
      this.#model.addEventListener("CredentialUpdated", this.#updateCredential.bind(this, authenticatorId));
      this.#model.addEventListener("CredentialDeleted", this.#deleteCredential.bind(this, authenticatorId));
    }
    section2.createChild("div", "divider");
    return section2;
  }
  /**
   * Creates the fields describing the authenticator in the front end.
   */
  #renderAuthenticatorFields(authenticatorId, options) {
    return html`
      <div class="authenticator-fields">
        <div class="authenticator-field">
          <label class="authenticator-option-label">${i18nString(UIStrings.uuid)}</label>
          <div class="authenticator-field-value">${authenticatorId}</div>
        </div>
        <div class="authenticator-field">
          <label class="authenticator-option-label">${i18nString(UIStrings.protocol)}</label>
          <div class="authenticator-field-value">${options.protocol}</div>
        </div>
        <div class="authenticator-field">
          <label class="authenticator-option-label">${i18nString(UIStrings.transport)}</label>
          <div class="authenticator-field-value">${options.transport}</div>
        </div>
        <div class="authenticator-field">
          <label class="authenticator-option-label">
            ${i18nString(UIStrings.supportsResidentKeys)}
          </label>
          <div class="authenticator-field-value">
            ${options.hasResidentKey ? i18nString(UIStrings.yes) : i18nString(UIStrings.no)}
          </div>
        </div>
        <div class="authenticator-field">
          <label class="authenticator-option-label">
            ${i18nString(UIStrings.supportsLargeBlob)}
          </label>
          <div class="authenticator-field-value">
           ${options.hasLargeBlob ? i18nString(UIStrings.yes) : i18nString(UIStrings.no)}
          </div>
        </div>
        <div class="authenticator-field">
          <label class="authenticator-option-label">
            ${i18nString(UIStrings.supportsUserVerification)}
          </label>
          <div class="authenticator-field-value">
            ${options.hasUserVerification ? i18nString(UIStrings.yes) : i18nString(UIStrings.no)}
          </div>
        </div>
      </div>`;
  }
  #activeAuthId = null;
  #hasBeenEnabled = false;
  dataGrids = /* @__PURE__ */ new Map();
  #enableCheckbox;
  #availableAuthenticatorSetting;
  #model;
  #authenticatorsView;
  #newAuthenticatorOptions = {
    protocol: "ctap2",
    transport: "usb",
    hasResidentKey: false,
    hasUserVerification: false,
    hasLargeBlob: false,
    automaticPresenceSimulation: true,
    isUserVerified: true
  };
  #hasInternalAuthenticator = false;
  #isEnabling;
  constructor() {
    super(true);
    this.registerRequiredCSS(webauthnPane_css_default);
    this.element.setAttribute("jslog", `${VisualLogging.panel("webauthn").track({ resize: true })}`);
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.WebAuthnModel.WebAuthnModel, this, { scoped: true });
    this.contentElement.classList.add("webauthn-pane");
    this.#availableAuthenticatorSetting = Common.Settings.Settings.instance().createSetting("webauthn-authenticators", []);
    this.#updateInternalTransportAvailability();
    this.#authenticatorsView = this.contentElement.createChild("div", "authenticators-view");
    this.performUpdate();
    this.#updateVisibility(false);
  }
  performUpdate() {
    render([
      this.#renderToolbar(),
      this.#authenticatorsView,
      this.#renderLearnMoreView(),
      this.#renderNewAuthenticatorSection()
    ], this.contentElement, { host: this });
  }
  modelAdded(model) {
    if (model.target() === model.target().outermostTarget()) {
      this.#model = model;
    }
  }
  modelRemoved(model) {
    if (model.target() === model.target().outermostTarget()) {
      this.#model = void 0;
    }
  }
  async #loadInitialAuthenticators() {
    let activeAuthenticatorId = null;
    const availableAuthenticators = this.#availableAuthenticatorSetting.get();
    for (const options of availableAuthenticators) {
      if (!this.#model) {
        continue;
      }
      const authenticatorId = await this.#model.addAuthenticator(options);
      void this.#addAuthenticatorSection(authenticatorId, options);
      options.authenticatorId = authenticatorId;
      if (options.active) {
        activeAuthenticatorId = authenticatorId;
      }
    }
    this.#availableAuthenticatorSetting.set(availableAuthenticators);
    if (activeAuthenticatorId) {
      void this.#setActiveAuthenticator(activeAuthenticatorId);
    }
  }
  async ownerViewDisposed() {
    if (this.#enableCheckbox) {
      this.#enableCheckbox.checked = false;
    }
    await this.#setVirtualAuthEnvEnabled(false);
  }
  #addCredential(authenticatorId, { data: event }) {
    const dataGrid = this.dataGrids.get(authenticatorId);
    if (!dataGrid) {
      return;
    }
    const emptyNode = dataGrid.rootNode().children.find((node2) => !Object.keys(node2.data).length);
    if (emptyNode) {
      dataGrid.rootNode().removeChild(emptyNode);
    }
    const node = new DataGridNode(event.credential);
    dataGrid.rootNode().appendChild(node);
  }
  #updateCredential(authenticatorId, { data: event }) {
    const dataGrid = this.dataGrids.get(authenticatorId);
    if (!dataGrid) {
      return;
    }
    const node = dataGrid.rootNode().children.find((node2) => node2.data?.credentialId === event.credential.credentialId);
    if (!node) {
      return;
    }
    node.data = event.credential;
  }
  #deleteCredential(authenticatorId, { data: event }) {
    const dataGrid = this.dataGrids.get(authenticatorId);
    if (!dataGrid) {
      return;
    }
    const node = dataGrid.rootNode().children.find((node2) => node2.data?.credentialId === event.credentialId);
    if (!node) {
      return;
    }
    node.remove();
  }
  async #setVirtualAuthEnvEnabled(enable) {
    await this.#isEnabling;
    this.#isEnabling = new Promise(async (resolve) => {
      if (enable && !this.#hasBeenEnabled) {
        Host.userMetrics.actionTaken(Host.UserMetrics.Action.VirtualAuthenticatorEnvironmentEnabled);
        this.#hasBeenEnabled = true;
      }
      if (this.#model) {
        await this.#model.setVirtualAuthEnvEnabled(enable);
      }
      if (enable) {
        await this.#loadInitialAuthenticators();
      } else {
        this.#removeAuthenticatorSections();
      }
      this.#updateVisibility(enable);
      this.#isEnabling = void 0;
      resolve();
    });
  }
  #updateVisibility(enabled) {
    this.contentElement.classList.toggle("enabled", enabled);
  }
  #removeAuthenticatorSections() {
    this.#authenticatorsView.innerHTML = "";
    for (const dataGrid of this.dataGrids.values()) {
      dataGrid.asWidget().detach();
    }
    this.dataGrids.clear();
  }
  #handleCheckboxToggle(e) {
    void this.#setVirtualAuthEnvEnabled(e.target.checked);
  }
  #updateNewAuthenticatorSectionOptions(change) {
    Object.assign(this.#newAuthenticatorOptions, change);
    this.requestUpdate();
  }
  #updateInternalTransportAvailability() {
    this.#hasInternalAuthenticator = Boolean(this.#availableAuthenticatorSetting.get().find(
      (authenticator) => authenticator.transport === "internal"
      /* Protocol.WebAuthn.AuthenticatorTransport.Internal */
    ));
    if (this.#hasInternalAuthenticator && this.#newAuthenticatorOptions.transport === "internal") {
      this.#newAuthenticatorOptions.transport = "nfc";
    }
    this.requestUpdate();
  }
  async #handleAddAuthenticatorButton() {
    const options = this.#newAuthenticatorOptions;
    if (this.#model) {
      const authenticatorId = await this.#model.addAuthenticator(options);
      const availableAuthenticators = this.#availableAuthenticatorSetting.get();
      availableAuthenticators.push({ authenticatorId, active: true, ...options });
      this.#availableAuthenticatorSetting.set(availableAuthenticators.map((a) => ({ ...a, active: a.authenticatorId === authenticatorId })));
      const section2 = await this.#addAuthenticatorSection(authenticatorId, options);
      const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
      const prefersReducedMotion = mediaQueryList.matches;
      section2.scrollIntoView({ block: "start", behavior: prefersReducedMotion ? "auto" : "smooth" });
      this.#updateInternalTransportAvailability();
    }
  }
  #exportCredential(credential) {
    let pem = PRIVATE_KEY_HEADER;
    for (let i = 0; i < credential.privateKey.length; i += 64) {
      pem += credential.privateKey.substring(i, i + 64) + "\n";
    }
    pem += PRIVATE_KEY_FOOTER;
    const link = document.createElement("a");
    link.download = i18nString(UIStrings.privateKeypem);
    link.href = "data:application/x-pem-file," + encodeURIComponent(pem);
    link.click();
  }
  #removeCredential(authenticatorId, credentialId) {
    const dataGrid = this.dataGrids.get(authenticatorId);
    if (!dataGrid) {
      return;
    }
    dataGrid.rootNode().children.find((n) => n.data.credentialId === credentialId).remove();
    if (!dataGrid.rootNode().children.length) {
      dataGrid.rootNode().appendChild(new EmptyDataGridNode());
    }
    if (this.#model) {
      void this.#model.removeCredential(authenticatorId, credentialId);
    }
  }
  #handleEditNameButton(target) {
    const titleElement = target.closest(".authenticator-section-title");
    const nameField = titleElement.querySelector(".authenticator-name-field");
    const editName = titleElement.querySelector(".edit-name");
    const saveName = titleElement.querySelector(".save-name");
    nameField.disabled = false;
    titleElement.classList.add("editing-name");
    nameField.focus();
    saveName.classList.remove("hidden");
    editName.classList.add("hidden");
  }
  #handleSaveNameButton(target) {
    const titleElement = target.closest(".authenticator-section-title");
    const nameField = titleElement.querySelector(".authenticator-name-field");
    const editName = titleElement.querySelector(".edit-name");
    const saveName = titleElement.querySelector(".save-name");
    const activeLabel = titleElement.querySelector(".active-button-container > label");
    const name = nameField.value;
    if (!name) {
      return;
    }
    nameField.disabled = true;
    titleElement.classList.remove("editing-name");
    editName.classList.remove("hidden");
    saveName.classList.add("hidden");
    this.#updateActiveLabelTitle(activeLabel, name);
  }
  #updateActiveLabelTitle(activeLabel, authenticatorName) {
    UI.Tooltip.Tooltip.install(activeLabel, i18nString(UIStrings.setSAsTheActiveAuthenticator, { PH1: authenticatorName }));
  }
  /**
   * Removes both the authenticator and its respective UI element.
   */
  removeAuthenticator(authenticatorId) {
    if (this.#authenticatorsView) {
      const child = this.#authenticatorsView.querySelector(`[data-authenticator-id=${CSS.escape(authenticatorId)}]`);
      if (child) {
        child.remove();
      }
    }
    const dataGrid = this.dataGrids.get(authenticatorId);
    if (dataGrid) {
      dataGrid.asWidget().detach();
      this.dataGrids.delete(authenticatorId);
    }
    if (this.#model) {
      void this.#model.removeAuthenticator(authenticatorId);
    }
    const prevAvailableAuthenticators = this.#availableAuthenticatorSetting.get();
    const newAvailableAuthenticators = prevAvailableAuthenticators.filter((a) => a.authenticatorId !== authenticatorId);
    this.#availableAuthenticatorSetting.set(newAvailableAuthenticators);
    if (this.#activeAuthId === authenticatorId) {
      const availableAuthenticatorIds = Array.from(this.dataGrids.keys());
      if (availableAuthenticatorIds.length) {
        void this.#setActiveAuthenticator(availableAuthenticatorIds[0]);
      } else {
        this.#activeAuthId = null;
      }
    }
    this.#updateInternalTransportAvailability();
  }
  /**
   * Sets the given authenticator as active.
   * Note that a newly added authenticator will automatically be set as active.
   */
  async #setActiveAuthenticator(authenticatorId) {
    await this.#clearActiveAuthenticator();
    if (this.#model) {
      await this.#model.setAutomaticPresenceSimulation(authenticatorId, true);
    }
    this.#activeAuthId = authenticatorId;
    const prevAvailableAuthenticators = this.#availableAuthenticatorSetting.get();
    const newAvailableAuthenticators = prevAvailableAuthenticators.map((a) => ({ ...a, active: a.authenticatorId === authenticatorId }));
    this.#availableAuthenticatorSetting.set(newAvailableAuthenticators);
    this.#updateActiveButtons();
  }
  #updateActiveButtons() {
    const authenticators = this.#authenticatorsView.getElementsByClassName("authenticator-section");
    Array.from(authenticators).forEach((authenticator) => {
      const button = authenticator.querySelector('input[type="radio"]');
      if (!button) {
        return;
      }
      button.checked = authenticator.dataset.authenticatorId === this.#activeAuthId;
    });
  }
  async #clearActiveAuthenticator() {
    if (this.#activeAuthId && this.#model) {
      await this.#model.setAutomaticPresenceSimulation(this.#activeAuthId, false);
    }
    this.#activeAuthId = null;
    this.#updateActiveButtons();
  }
};
export {
  WebauthnPane_exports as WebauthnPane
};
//# sourceMappingURL=webauthn.js.map
