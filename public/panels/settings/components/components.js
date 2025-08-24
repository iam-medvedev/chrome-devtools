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
import "./../../../ui/components/tooltips/tooltips.js";
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Buttons from "./../../../ui/components/buttons/buttons.js";
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
  width: 100%;
}

fieldset {
  border: 0;
  padding: 0;
  padding: 4px 0 0;
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

.account-info {
  display: flex;
  align-items: center;
}

.account-email {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
}

.not-signed-in {
  padding-bottom: 4px;
}

.setting-checkbox-container {
  display: flex;
  align-items: center;
  gap: var(--sys-size-2);
}

.setting-checkbox {
  display: inline-block;
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
   * @description Label for the account email address. Shown in the DevTools Settings UI in
   * front of the email address currently used for Chrome Sync.
   */
  signedIn: "Signed into Chrome as:",
  /**
   * @description Label for the account settings. Shown in the DevTools Settings UI in
   * case the user is not logged in to Chrome.
   */
  notSignedIn: "You're not signed into Chrome."
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
      throw new Error("SyncSection is not properly initialized");
    }
    const checkboxDisabled = !this.#syncInfo.isSyncActive || !this.#syncInfo.arePreferencesSynced;
    this.#syncSetting?.setDisabled(checkboxDisabled);
    Lit.render(html`
      <style>${syncSection_css_default}</style>
      <fieldset>
        ${renderAccountInfo(this.#syncInfo)}
        ${renderSettingCheckboxIfNeeded(this.#syncInfo, this.#syncSetting)}
      </fieldset>
    `, this.#shadow, { host: this });
  }
};
function renderSettingCheckboxIfNeeded(syncInfo, syncSetting) {
  if (!syncInfo.accountEmail) {
    return Lit.nothing;
  }
  return html`
    <div class="setting-checkbox-container">
      <setting-checkbox class="setting-checkbox" .data=${{ setting: syncSetting }}>
      </setting-checkbox>
      ${renderWarningIfNeeded(syncInfo)}
    </div>
  `;
}
function renderWarningIfNeeded(syncInfo) {
  const hasWarning = !syncInfo.isSyncActive || !syncInfo.arePreferencesSynced;
  if (!hasWarning) {
    return Lit.nothing;
  }
  const warningLink = !syncInfo.isSyncActive ? "chrome://settings/syncSetup" : "chrome://settings/syncSetup/advanced";
  const warningText = !syncInfo.isSyncActive ? i18nString(UIStrings.syncDisabled) : i18nString(UIStrings.preferencesSyncDisabled);
  return html`
    <devtools-chrome-link .href=${warningLink}>
      <devtools-button
        aria-describedby=settings-sync-info
        .iconName=${"info"}
        .variant=${"icon"}
        .size=${"SMALL"}>
      </devtools-button>
    </devtools-chrome-link>
    <devtools-tooltip
        id=settings-sync-info
        variant=simple>
      ${warningText}
    </devtools-tooltip>
  `;
}
function renderAccountInfo(syncInfo) {
  if (!syncInfo.accountEmail) {
    return html`
      <div class="not-signed-in">${i18nString(UIStrings.notSignedIn)}</div>
    `;
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
