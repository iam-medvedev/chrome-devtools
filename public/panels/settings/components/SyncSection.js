// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/* eslint-disable rulesdir/no-lit-render-outside-of-view */
import '../../../ui/components/chrome_link/chrome_link.js';
import '../../../ui/components/settings/settings.js';
import '../../../ui/components/tooltips/tooltips.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as ComponentHelpers from '../../../ui/components/helpers/helpers.js';
import * as Lit from '../../../ui/lit/lit.js';
import syncSectionStyles from './syncSection.css.js';
const { html } = Lit;
const UIStrings = {
    /**
     * @description Text shown to the user in the Settings UI. 'This setting' refers
     * to a checkbox that is disabled.
     */
    syncDisabled: 'To turn this setting on, you must enable Chrome sync.',
    /**
     * @description Text shown to the user in the Settings UI. 'This setting' refers
     * to a checkbox that is disabled.
     */
    preferencesSyncDisabled: 'To turn this setting on, you must first enable settings sync in Chrome.',
    /**
     * @description Label for the account email address. Shown in the DevTools Settings UI in
     * front of the email address currently used for Chrome Sync.
     */
    signedIn: 'Signed into Chrome as:',
    /**
     * @description Label for the account settings. Shown in the DevTools Settings UI in
     * case the user is not logged in to Chrome.
     */
    notSignedIn: 'You\'re not signed into Chrome.',
};
const str_ = i18n.i18n.registerUIStrings('panels/settings/components/SyncSection.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class SyncSection extends HTMLElement {
    #shadow = this.attachShadow({ mode: 'open' });
    #syncInfo = { isSyncActive: false };
    #syncSetting;
    set data(data) {
        this.#syncInfo = data.syncInfo;
        this.#syncSetting = data.syncSetting;
        void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    }
    #render() {
        if (!this.#syncSetting) {
            throw new Error('SyncSection is not properly initialized');
        }
        // TODO: this should not probably happen in render, instead, the setting
        // should be disabled.
        const checkboxDisabled = !this.#syncInfo.isSyncActive || !this.#syncInfo.arePreferencesSynced;
        this.#syncSetting?.setDisabled(checkboxDisabled);
        // Disabled until https://crbug.com/1079231 is fixed.
        // clang-format off
        Lit.render(html `
      <style>${syncSectionStyles}</style>
      <fieldset>
        ${renderAccountInfo(this.#syncInfo)}
        ${renderSettingCheckboxIfNeeded(this.#syncInfo, this.#syncSetting)}
      </fieldset>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
function renderSettingCheckboxIfNeeded(syncInfo, syncSetting) {
    if (!syncInfo.accountEmail) {
        return Lit.nothing;
    }
    // clang-format off
    return html `
    <div class="setting-checkbox-container">
      <setting-checkbox class="setting-checkbox" .data=${{ setting: syncSetting }}>
      </setting-checkbox>
      ${renderWarningIfNeeded(syncInfo)}
    </div>
  `;
    // clang-format on
}
function renderWarningIfNeeded(syncInfo) {
    const hasWarning = !syncInfo.isSyncActive || !syncInfo.arePreferencesSynced;
    if (!hasWarning) {
        return Lit.nothing;
    }
    const warningLink = !syncInfo.isSyncActive ?
        'chrome://settings/syncSetup' :
        'chrome://settings/syncSetup/advanced';
    const warningText = !syncInfo.isSyncActive ? i18nString(UIStrings.syncDisabled) : i18nString(UIStrings.preferencesSyncDisabled);
    // clang-format off
    return html `
    <devtools-chrome-link .href=${warningLink}>
      <devtools-button
        aria-describedby=settings-sync-info
        .iconName=${'info'}
        .variant=${"icon" /* Buttons.Button.Variant.ICON */}
        .size=${"SMALL" /* Buttons.Button.Size.SMALL */}>
      </devtools-button>
    </devtools-chrome-link>
    <devtools-tooltip
        id=settings-sync-info
        variant=simple>
      ${warningText}
    </devtools-tooltip>
  `;
    // clang-format on
}
function renderAccountInfo(syncInfo) {
    if (!syncInfo.accountEmail) {
        // clang-format off
        return html `
      <div class="not-signed-in">${i18nString(UIStrings.notSignedIn)}</div>
    `;
        // clang-format on
    }
    // clang-format off
    return html `
    <div class="account-info">
      <img src="data:image/png;base64, ${syncInfo.accountImage}" alt="Account avatar" />
      <div class="account-email">
        <span>${i18nString(UIStrings.signedIn)}</span>
        <span>${syncInfo.accountEmail}</span>
      </div>
    </div>`;
    // clang-format on
}
customElements.define('devtools-sync-section', SyncSection);
//# sourceMappingURL=SyncSection.js.map