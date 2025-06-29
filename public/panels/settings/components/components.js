var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/panels/settings/components/SyncSection.js
var SyncSection_exports = {};
__export(SyncSection_exports, {
  SyncSection: () => SyncSection
});
import "./../../../ui/components/chrome_link/chrome_link.js";
import "./../../../ui/components/settings/settings.js";
import * as i18n from "./../../../core/i18n/i18n.js";
import * as ComponentHelpers from "./../../../ui/components/helpers/helpers.js";
import * as Lit from "./../../../ui/lit/lit.js";

// gen/front_end/panels/settings/components/syncSection.css.js
var syncSection_css_default = `/*
 * Copyright (c) 2021 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  break-inside: avoid;
  display: block;
  padding-bottom: 9px;
  width: 288px;
}

fieldset {
  border: 0;
  padding: 0;
}

.link {
  color: var(--sys-color-primary);
  text-decoration: underline;
  cursor: pointer;
  outline-offset: 2px;
}

img {
  border: 0;
  border-radius: var(--sys-shape-corner-full);
  display: block;
  height: var(--sys-size-9);
  width: var(--sys-size-9);
}

.warning {
  display: block;
}

.account-info {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.account-email {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
}

/*# sourceURL=${import.meta.resolve("./syncSection.css")} */`;

// gen/front_end/panels/settings/components/SyncSection.js
var { html } = Lit;
var UIStrings = {
  /**
   * @description Text shown to the user in the Settings UI. 'This setting' refers
   * to a checkbox that is disabled.
   */
  syncDisabled: "To turn this setting on, you must enable Chrome sync.",
  /**
   * @description Text shown to the user in the Settings UI. 'This setting' refers
   * to a checkbox that is disabled.
   */
  preferencesSyncDisabled: "To turn this setting on, you must first enable settings sync in Chrome.",
  /**
   * @description Label for a link that take the user to the "Sync" section of the
   * chrome settings. The link is shown in the DevTools Settings UI.
   */
  settings: "Go to Settings",
  /**
   * @description Label for the account email address. Shown in the DevTools Settings UI in
   * front of the email address currently used for Chrome Sync.
   */
  signedIn: "Signed into Chrome as:"
};
var str_ = i18n.i18n.registerUIStrings("panels/settings/components/SyncSection.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var SyncSection = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #syncInfo = { isSyncActive: false };
  #syncSetting;
  set data(data) {
    this.#syncInfo = data.syncInfo;
    this.#syncSetting = data.syncSetting;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  #render() {
    if (!this.#syncSetting) {
      throw new Error("SyncSection not properly initialized");
    }
    const checkboxDisabled = !this.#syncInfo.isSyncActive || !this.#syncInfo.arePreferencesSynced;
    this.#syncSetting?.setDisabled(checkboxDisabled);
    Lit.render(html`
      <style>${syncSection_css_default}</style>
      <fieldset>
        ${renderAccountInfoOrWarning(this.#syncInfo)}
        <setting-checkbox .data=${{ setting: this.#syncSetting }}>
        </setting-checkbox>
      </fieldset>
    `, this.#shadow, { host: this });
  }
};
function renderAccountInfoOrWarning(syncInfo) {
  if (!syncInfo.isSyncActive) {
    const link = "chrome://settings/syncSetup";
    return html`
      <span class="warning">
        ${i18nString(UIStrings.syncDisabled)}
        <devtools-chrome-link .href=${link}>${i18nString(UIStrings.settings)}</devtools-chrome-link>
      </span>`;
  }
  if (!syncInfo.arePreferencesSynced) {
    const link = "chrome://settings/syncSetup/advanced";
    return html`
      <span class="warning">
        ${i18nString(UIStrings.preferencesSyncDisabled)}
        <devtools-chrome-link .href=${link}>${i18nString(UIStrings.settings)}</devtools-chrome-link>
      </span>`;
  }
  return html`
    <div class="account-info">
      <img src="data:image/png;base64, ${syncInfo.accountImage}" alt="Account avatar" />
      <div class="account-email">
        <span>${i18nString(UIStrings.signedIn)}</span>
        <span>${syncInfo.accountEmail}</span>
      </div>
    </div>`;
}
customElements.define("devtools-sync-section", SyncSection);
export {
  SyncSection_exports as SyncSection
};
//# sourceMappingURL=components.js.map
