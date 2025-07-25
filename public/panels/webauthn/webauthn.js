var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/webauthn/WebauthnPane.js
var WebauthnPane_exports = {};
__export(WebauthnPane_exports, {
  DEFAULT_VIEW: () => DEFAULT_VIEW,
  WebauthnPaneImpl: () => WebauthnPaneImpl
});
import "./../../ui/legacy/legacy.js";
import "./../../ui/legacy/components/data_grid/data_grid.js";
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as Buttons from "./../../ui/components/buttons/buttons.js";
import * as Input from "./../../ui/components/input/input.js";
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

::part(action-button) {
  min-width: 20px;
  margin: 4px;
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

::part(credentialId-column),
::part(isResidentCredential-column),
::part(rpId-column),
::part(userHandle-column),
::part(signCount-column),
::part(actions-column) {
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
var { render, html, Directives: { ref, repeat, classMap } } = Lit;
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
function renderCredentialsDataGrid(authenticatorId, credentials, onExport, onRemove) {
  return html`
    <devtools-data-grid name=${i18nString(UIStrings.credentials)} inline striped>
      <table>
        <thead>
          <tr>
            <th id="credentialId" weight="24" text-overflow="ellipsis">${i18nString(UIStrings.id)}</th>
            <th id="isResidentCredential" type="boolean" weight="10">${i18nString(UIStrings.isResident)}</th>
            <th id="rpId" weight="16.5">${i18nString(UIStrings.rpId)}</th>
            <th id="userHandle" weight="16.5">${i18nString(UIStrings.userHandle)}</th>
            <th id="signCount" weight="16.5">${i18nString(UIStrings.signCount)}</th>
            <th id="actions" weight="16.5">${i18nString(UIStrings.actions)}</th>
          </tr>
        </thead>
        <tbody>
        ${credentials.length ? repeat(credentials, (c) => c.credentialId, (credential) => html`
          <tr>
            <td>${credential.credentialId}</td>
            <td>${credential.isResidentCredential}</td>
            <td>${credential.rpId}</td>
            <td>${credential.userHandle}</td>
            <td>${credential.signCount}</td>
            <td>
              <devtools-button .variant=${"outlined"}
                  part="action-button"
                  @click=${() => onExport(credential)}
                  .jslogContext=${"webauthn.export-credential"}>
                ${i18nString(UIStrings.export)}
              </devtools-button>
              <devtools-button .variant=${"outlined"}
                  part="action-button"
                  @click=${() => onRemove(credential.credentialId)}
                  .jslogContext=${"webauthn.remove-credential"}>
                ${i18nString(UIStrings.remove)}
              </devtools-button>
            </td>
          </tr>`) : html`
          <tr>
            <td class="center" colspan=6>
              ${i18nTemplate2(UIStrings.noCredentialsTryCallingSFromYour, { PH1: html`<span class="code">navigator.credentials.create()</span>` })}
            </td>
          </tr>`}
        </tbody>
      </table>
    </devtools-data-grid>`;
}
var PRIVATE_NAME = "PRIVATE";
var PRIVATE_KEY_HEADER = `-----BEGIN ${PRIVATE_NAME} KEY-----
`;
var PRIVATE_KEY_FOOTER = `-----END ${PRIVATE_NAME} KEY-----`;
var PROTOCOL_AUTHENTICATOR_VALUES = {
  Ctap2: "ctap2",
  U2f: "u2f"
};
function renderToolbar(enabled, onToggle) {
  const enableCheckboxTitle = i18nString(UIStrings.enableVirtualAuthenticator);
  return html`
    <div class="webauthn-toolbar-container" jslog=${VisualLogging.toolbar()} role="toolbar">
      <devtools-toolbar class="webauthn-toolbar" role="presentation">
        <devtools-checkbox title=${enableCheckboxTitle}
            @click=${onToggle}
            .jslogContext=${"virtual-authenticators"}
            .checked=${enabled}>
          ${enableCheckboxTitle}
        </devtools-checkbox>
      </devtools-toolbar>
    </div>`;
}
function renderLearnMoreView() {
  return html`
    <devtools-widget class="learn-more" .widgetConfig=${widgetConfig(UI.EmptyWidget.EmptyWidget, {
    header: i18nString(UIStrings.noAuthenticator),
    text: i18nString(UIStrings.useWebauthnForPhishingresistant),
    link: WEB_AUTHN_EXPLANATION_URL
  })}>
    </devtools-widget>`;
}
function renderNewAuthenticatorSection(options, internalTransportAvailable, onUpdate, onAdd) {
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
              @change=${(e) => onUpdate({ protocol: e.target.value })}>
            ${Object.values(PROTOCOL_AUTHENTICATOR_VALUES).sort().map((option) => html`
              <option value=${option} jslog=${VisualLogging.item(option).track({ click: true })}>
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
              @change=${(e) => onUpdate({ transport: e.target.value })}>
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
                        .disabled=${!internalTransportAvailable && option === "internal"}>
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
              @change=${(e) => onUpdate({ hasResidentKey: e.target.checked })}
              .checked=${Boolean(options.hasResidentKey && isCtap2)} .disabled=${!isCtap2}>
        </div>
        <div class="authenticator-option">
          <label for="user-verification" class="authenticator-option-label">
            ${i18nString(UIStrings.supportsUserVerification)}
          </label>
          <input id="user-verification" class="authenticator-option-checkbox" type="checkbox"
              jslog=${VisualLogging.toggle("user-verification").track({ change: true })}
              @change=${(e) => onUpdate({ hasUserVerification: e.target.checked })}
              .checked=${Boolean(options.hasUserVerification && isCtap2)}
              .disabled=${!isCtap2}>
        </div>
        <div class="authenticator-option">
          <label for="large-blob" class="authenticator-option-label">
            ${i18nString(UIStrings.supportsLargeBlob)}
          </label>
          <input id="large-blob" class="authenticator-option-checkbox" type="checkbox"
              jslog=${VisualLogging.toggle("large-blob").track({ change: true })}
              @change=${(e) => onUpdate({ hasLargeBlob: e.target.checked })}
              .checked=${Boolean(options.hasLargeBlob && isCtap2 && options.hasResidentKey)}
              .disabled=${!options.hasResidentKey || !isCtap2}>
        </div>
        <div class="authenticator-option">
          <div class="authenticator-option-label"></div>
          <devtools-button @click=${onAdd}
              id="add-authenticator"
              .jslogContext=${"webauthn.add-authenticator"}
              .variant=${"outlined"}>
            ${i18nString(UIStrings.add)}
          </devtools-button>
        </div>
      </div>
    </div>`;
}
function renderAuthenticatorSection(authenticatorId, authenticator, active, editing, onActivate, onEditName, onSaveName, onRemove, onExportCredential, onRemoveCredential, output) {
  function revealSection(section2) {
    if (!section2) {
      return;
    }
    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQueryList.matches;
    section2.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
  return html`
    <div class="authenticator-section" data-authenticator-id=${authenticatorId}
         jslog=${VisualLogging.section("authenticator")}
          ${ref((e) => {
    output.revealSection.set(authenticatorId, revealSection.bind(null, e));
  })}>
      <div class="authenticator-section-header">
        <div class="authenticator-section-title" role="heading" aria-level="2">
          <devtools-toolbar class="edit-name-toolbar">
            <devtools-button title=${i18nString(UIStrings.editName)}
                class=${classMap({ hidden: editing })}
                @click=${onEditName}
                .iconName=${"edit"} .variant=${"toolbar"}
                .jslogContext=${"edit-name"}></devtools-button>
            <devtools-button title=${i18nString(UIStrings.saveName)}
                @click=${(e) => onSaveName((e.target.parentElement?.nextSibling).value)}
                .iconName=${"checkmark"} .variant=${"toolbar"}
                class=${classMap({ hidden: !editing })}
                .jslogContext=${"save-name"}></devtools-button>
          </devtools-toolbar>
          <input class="authenticator-name-field"
              placeholder=${i18nString(UIStrings.enterNewName)}
              jslog=${VisualLogging.textField("name").track({ keydown: "Enter", change: true })}
              value=${i18nString(UIStrings.authenticatorS, { PH1: authenticator.name })} .disabled=${!editing}
              ${ref((e) => {
    if (e instanceof HTMLInputElement && editing) {
      e.focus();
    }
  })}
              @focusout=${(e) => onSaveName(e.target.value)}
              @keydown=${(event) => {
    if (event.key === "Enter") {
      onSaveName(event.target.value);
    }
  }}>
        </div>
        <div class="active-button-container">
          <label title=${i18nString(UIStrings.setSAsTheActiveAuthenticator, { PH1: authenticator.name })}>
            <input type="radio" .checked=${active} @change=${(e) => {
    if (e.target.checked) {
      onActivate();
    }
  }}
                  jslog=${VisualLogging.toggle("webauthn.active-authenticator").track({ change: true })}>
            ${i18nString(UIStrings.active)}
          </label>
        </div>
        <button class="text-button" @click=${onRemove}
            jslog=${VisualLogging.action("webauthn.remove-authenticator").track({ click: true })}>
          ${i18nString(UIStrings.remove)}
        </button>
      </div>
      ${renderAuthenticatorFields(authenticatorId, authenticator.options)}
      <div class="credentials-title">${i18nString(UIStrings.credentials)}</div>
      ${renderCredentialsDataGrid(authenticatorId, authenticator.credentials, onExportCredential, onRemoveCredential)}
      <div class="divider"></div>
    </div>`;
}
function renderAuthenticatorFields(authenticatorId, options) {
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
var DEFAULT_VIEW = (input, output, target) => {
  render(html`
    <style>${Input.checkboxStyles}</style>
    <style>${webauthnPane_css_default}</style>
    <div class="webauthn-pane flex-auto ${classMap({ enabled: input.enabled })}">
      ${renderToolbar(input.enabled, input.onToggleEnabled)}
      <div class="authenticators-view">
         ${repeat([...input.authenticators.entries()], ([id]) => id, ([id, authenticator]) => renderAuthenticatorSection(id, authenticator, input.activeAuthenticatorId === id, input.editingAuthenticatorId === id, input.onActivateAuthenticator.bind(input, id), input.onEditName.bind(input, id), input.onSaveName.bind(input, id), input.onRemoveAuthenticator.bind(input, id), input.onExportCredential, input.onRemoveCredential.bind(input, id), output))}
      </div>
      ${renderLearnMoreView()}
      ${renderNewAuthenticatorSection(input.newAuthenticatorOptions, input.internalTransportAvailable, input.updateNewAuthenticatorOptions, input.addAuthenticator)}
    </div>`, target, { host: input });
};
var WebauthnPaneImpl = class extends UI.Panel.Panel {
  async #addAuthenticator(options) {
    if (!this.#model) {
      throw new Error("WebAuthn model is not available.");
    }
    const authenticatorId = await this.#model.addAuthenticator(options);
    const userFriendlyName = authenticatorId.slice(-5);
    this.#authenticators.set(authenticatorId, {
      name: userFriendlyName,
      options,
      credentials: []
    });
    this.requestUpdate();
    this.#model.addEventListener("CredentialAdded", this.#addCredential.bind(this, authenticatorId));
    this.#model.addEventListener("CredentialAsserted", this.#updateCredential.bind(this, authenticatorId));
    this.#model.addEventListener("CredentialUpdated", this.#updateCredential.bind(this, authenticatorId));
    this.#model.addEventListener("CredentialDeleted", this.#deleteCredential.bind(this, authenticatorId));
    return authenticatorId;
  }
  #activeAuthId = null;
  #editingAuthId = null;
  #hasBeenEnabled = false;
  #authenticators = /* @__PURE__ */ new Map();
  #enabled = false;
  #availableAuthenticatorSetting;
  #model;
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
  #view;
  #viewOutput = {
    revealSection: /* @__PURE__ */ new Map()
  };
  constructor(view = DEFAULT_VIEW) {
    super("webauthn");
    this.#view = view;
    SDK.TargetManager.TargetManager.instance().observeModels(SDK.WebAuthnModel.WebAuthnModel, this, { scoped: true });
    this.#availableAuthenticatorSetting = Common.Settings.Settings.instance().createSetting("webauthn-authenticators", []);
    this.#updateInternalTransportAvailability();
    this.performUpdate();
  }
  performUpdate() {
    const viewInput = {
      enabled: this.#enabled,
      onToggleEnabled: this.#handleCheckboxToggle.bind(this),
      authenticators: this.#authenticators,
      activeAuthenticatorId: this.#activeAuthId,
      editingAuthenticatorId: this.#editingAuthId,
      newAuthenticatorOptions: this.#newAuthenticatorOptions,
      internalTransportAvailable: !this.#hasInternalAuthenticator,
      updateNewAuthenticatorOptions: this.#updateNewAuthenticatorSectionOptions.bind(this),
      addAuthenticator: this.#handleAddAuthenticatorButton.bind(this),
      onActivateAuthenticator: this.#setActiveAuthenticator.bind(this),
      onEditName: this.#handleEditNameButton.bind(this),
      onSaveName: this.#handleSaveNameButton.bind(this),
      onRemoveAuthenticator: this.removeAuthenticator.bind(this),
      onExportCredential: this.#exportCredential.bind(this),
      onRemoveCredential: this.#removeCredential.bind(this)
    };
    this.#view(viewInput, this.#viewOutput, this.contentElement);
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
      const authenticatorId = await this.#addAuthenticator(options);
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
    this.#enabled = false;
    await this.#setVirtualAuthEnvEnabled(false);
  }
  #addCredential(authenticatorId, { data: event }) {
    const authenticator = this.#authenticators.get(authenticatorId);
    if (!authenticator) {
      return;
    }
    authenticator.credentials.push(event.credential);
    this.requestUpdate();
  }
  #updateCredential(authenticatorId, { data: event }) {
    const authenticator = this.#authenticators.get(authenticatorId);
    if (!authenticator) {
      return;
    }
    const credential = authenticator.credentials.find((credential2) => credential2.credentialId === event.credential.credentialId);
    if (!credential) {
      return;
    }
    Object.assign(credential, event.credential);
    this.requestUpdate();
  }
  #deleteCredential(authenticatorId, { data: event }) {
    const authenticator = this.#authenticators.get(authenticatorId);
    if (!authenticator) {
      return;
    }
    const credentialIndex = authenticator.credentials.findIndex((credential) => credential.credentialId === event.credentialId);
    if (credentialIndex < 0) {
      return;
    }
    authenticator.credentials.splice(credentialIndex, 1);
    this.requestUpdate();
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
      this.#isEnabling = void 0;
      this.#enabled = enable;
      this.requestUpdate();
      resolve();
    });
  }
  #removeAuthenticatorSections() {
    this.#authenticators.clear();
  }
  #handleCheckboxToggle() {
    void this.#setVirtualAuthEnvEnabled(!this.#enabled);
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
      const authenticatorId = await this.#addAuthenticator(options);
      this.#activeAuthId = authenticatorId;
      const availableAuthenticators = this.#availableAuthenticatorSetting.get();
      availableAuthenticators.push({ authenticatorId, active: true, ...options });
      this.#availableAuthenticatorSetting.set(availableAuthenticators.map((a) => ({ ...a, active: a.authenticatorId === authenticatorId })));
      this.#updateInternalTransportAvailability();
      await this.updateComplete;
      this.#viewOutput.revealSection.get(authenticatorId)?.();
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
    const authenticator = this.#authenticators.get(authenticatorId);
    if (!authenticator) {
      return;
    }
    const authenticatorIndex = authenticator.credentials.findIndex((credential) => credential.credentialId === credentialId);
    if (authenticatorIndex < 0) {
      return;
    }
    authenticator.credentials.splice(authenticatorIndex, 1);
    this.requestUpdate();
    if (this.#model) {
      void this.#model.removeCredential(authenticatorId, credentialId);
    }
  }
  #handleEditNameButton(authenticatorId) {
    this.#editingAuthId = authenticatorId;
    this.requestUpdate();
  }
  #handleSaveNameButton(authenticatorId, name) {
    const authenticator = this.#authenticators.get(authenticatorId);
    if (!authenticator) {
      return;
    }
    authenticator.name = name;
    this.#editingAuthId = null;
    this.requestUpdate();
  }
  /**
   * Removes both the authenticator and its respective UI element.
   */
  removeAuthenticator(authenticatorId) {
    this.#authenticators.delete(authenticatorId);
    this.requestUpdate();
    if (this.#model) {
      void this.#model.removeAuthenticator(authenticatorId);
    }
    const prevAvailableAuthenticators = this.#availableAuthenticatorSetting.get();
    const newAvailableAuthenticators = prevAvailableAuthenticators.filter((a) => a.authenticatorId !== authenticatorId);
    this.#availableAuthenticatorSetting.set(newAvailableAuthenticators);
    if (this.#activeAuthId === authenticatorId) {
      const availableAuthenticatorIds = Array.from(this.#authenticators.keys());
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
    this.requestUpdate();
  }
  async #clearActiveAuthenticator() {
    if (this.#activeAuthId && this.#model) {
      await this.#model.setAutomaticPresenceSimulation(this.#activeAuthId, false);
    }
    this.#activeAuthId = null;
    this.requestUpdate();
  }
};
export {
  WebauthnPane_exports as WebauthnPane
};
//# sourceMappingURL=webauthn.js.map
