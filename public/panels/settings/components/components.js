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
import * as Host from "./../../../core/host/host.js";
import * as i18n from "./../../../core/i18n/i18n.js";
import * as Root from "./../../../core/root/root.js";
import * as Badges from "./../../../models/badges/badges.js";
import * as Buttons from "./../../../ui/components/buttons/buttons.js";
import * as ComponentHelpers from "./../../../ui/components/helpers/helpers.js";
import * as Lit from "./../../../ui/lit/lit.js";
import * as PanelCommon from "./../../common/common.js";
import * as PanelUtils from "./../../utils/utils.js";

// gen/front_end/panels/settings/components/syncSection.css.js
var syncSection_css_default = `/*
 * Copyright 2021 The Chromium Authors
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

:host {
  break-inside: avoid;
  display: block;
  width: 100%;
  position: relative;
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

.gdp-profile-container {
  padding-bottom: var(--sys-size-4);

  & .divider {
    left: 0;
    position: absolute;
    width: 100%;
    height: var(--sys-size-1);
    background: var(--sys-color-divider);
  }

  & .gdp-profile-header {
    display: flex;
    align-items: center;
    gap: var(--sys-size-5);
    font-family: "Google Sans", system-ui;
    font-size: var(--sys-typescale-body3-size);
    height: var(--sys-size-11);

    .gdp-logo {
      width: 34px;
      height: fit-content;
    }
  }

  & .gdp-profile-sign-up-content {
    padding-top: var(--sys-size-7);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .gdp-profile-details-content {
    padding-top: var(--sys-size-7);
    font: var(--sys-typescale-body4-regular);

    & .plan-details {
      margin-top: var(--sys-size-3);
      height: 18px;
      display: flex;
      align-items: center;
    }

    & .setting-container {
      /* \\'<settigns-checkbox>\\' already provides 6px margin and we want to get rid of it here */
      margin: calc(var(--sys-size-3) - 6px) -6px -6px;
      display: flex;
      align-items: center;
      gap: var(--sys-size-2);
    }
  }
}

/*# sourceURL=${import.meta.resolve("./syncSection.css")} */`;

// gen/front_end/panels/settings/components/SyncSection.js
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
  notSignedIn: "You're not signed into Chrome.",
  /**
   * @description Label for the Google Developer Program profile status that corresponds to
   * standard plan (No subscription).
   */
  gdpStandardPlan: "Standard plan",
  /**
   * @description Label for the Google Developer Program subscription status that corresponds to
   * `PREMIUM_ANNUAL` plan.
   */
  gdpPremiumAnnualSubscription: "Premium (Annual)",
  /**
   * @description Label for the Google Developer Program subscription status that corresponds to
   * `PREMIUM_MONTHLY` plan.
   */
  gdpPremiumMonthlySubscription: "Premium (Monthly)",
  /**
   * @description Label for the Google Developer Program subscription status that corresponds to
   * `PRO_ANNUAL` plan.
   */
  gdpProAnnualSubscription: "Pro (Annual)",
  /**
   * @description Label for the Google Developer Program subscription status that corresponds to
   * `PRO_MONTHLY` plan.
   */
  gdpProMonthlySubscription: "Pro (Monthly)",
  /**
   * @description Label for the Google Developer Program subscription status that corresponds
   * to a plan not known by the client.
   */
  gdpUnknownSubscription: "Unknown plan",
  /**
   * @description Label for Sign-Up button for the Google Developer Program profiles.
   */
  signUp: "Sign up",
  /**
   * @description Text for the data notice right after the settings checkbox.
   */
  relevantDataDisclaimer: "(Relevant data is sent to Google)",
  /**
   * @description Link text for opening the Google Developer Program profile page.
   */
  viewProfile: "View profile"
};
var str_ = i18n.i18n.registerUIStrings("panels/settings/components/SyncSection.ts", UIStrings);
var i18nString = i18n.i18n.getLocalizedString.bind(void 0, str_);
var lockedString = i18n.i18n.lockedString;
var { html, Directives: { ref, createRef } } = Lit;
function getGdpSubscriptionText(profile) {
  if (!profile.activeSubscription || profile.activeSubscription.subscriptionStatus !== Host.GdpClient.SubscriptionStatus.ENABLED) {
    return i18nString(UIStrings.gdpStandardPlan);
  }
  switch (profile.activeSubscription.subscriptionTier) {
    case Host.GdpClient.SubscriptionTier.PREMIUM_ANNUAL:
      return i18nString(UIStrings.gdpPremiumAnnualSubscription);
    case Host.GdpClient.SubscriptionTier.PREMIUM_MONTHLY:
      return i18nString(UIStrings.gdpPremiumMonthlySubscription);
    case Host.GdpClient.SubscriptionTier.PRO_ANNUAL:
      return i18nString(UIStrings.gdpProAnnualSubscription);
    case Host.GdpClient.SubscriptionTier.PRO_MONTHLY:
      return i18nString(UIStrings.gdpProMonthlySubscription);
    default:
      return i18nString(UIStrings.gdpUnknownSubscription);
  }
}
var GDP_LOGO_IMAGE_URL = new URL("../../../Images/gdp-logo-standalone.svg", import.meta.url).toString();
var SyncSection = class extends HTMLElement {
  #shadow = this.attachShadow({ mode: "open" });
  #syncInfo = { isSyncActive: false };
  #syncSetting;
  #receiveBadgesSetting;
  #receiveBadgesSettingContainerRef = createRef();
  #gdpProfile;
  set data(data) {
    this.#syncInfo = data.syncInfo;
    this.#syncSetting = data.syncSetting;
    this.#receiveBadgesSetting = data.receiveBadgesSetting;
    void this.#updateGdpProfile();
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
  }
  async highlightReceiveBadgesSetting() {
    await ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
    const element = this.#receiveBadgesSettingContainerRef.value;
    if (element) {
      PanelUtils.PanelUtils.highlightElement(element);
    }
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
        ${renderGdpSectionIfNeeded({
      receiveBadgesSetting: this.#receiveBadgesSetting,
      receiveBadgesSettingContainerRef: this.#receiveBadgesSettingContainerRef,
      gdpProfile: this.#gdpProfile
    })}
      </fieldset>
    `, this.#shadow, { host: this });
  }
  async #updateGdpProfile() {
    this.#gdpProfile = await Host.GdpClient.GdpClient.instance().getProfile() ?? void 0;
    void ComponentHelpers.ScheduledRender.scheduleRender(this, this.#render);
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
function renderGdpSectionIfNeeded({ receiveBadgesSetting, receiveBadgesSettingContainerRef, gdpProfile }) {
  if (!Root.Runtime.hostConfig.devToolsGdpProfiles?.enabled) {
    return Lit.nothing;
  }
  function renderBrand() {
    return html`
      <div class="gdp-profile-header">
        <img src=${GDP_LOGO_IMAGE_URL} class="gdp-logo" alt="Google Developer Program">
        ${lockedString("Google Developer Program")}
      </div>
    `;
  }
  return html`
    <div class="gdp-profile-container">
      <div class="divider"></div>
      ${gdpProfile ? html`
        <div class="gdp-profile-details-content">
          ${renderBrand()}
          <div class="plan-details">
            ${getGdpSubscriptionText(gdpProfile)}
            &nbsp;·&nbsp;
            <x-link class="link" href=${Host.GdpClient.GOOGLE_DEVELOPER_PROGRAM_PROFILE_LINK}>
              ${i18nString(UIStrings.viewProfile)}
            </x-link></div>
            ${receiveBadgesSetting ? html`
              <div class="setting-container"  ${ref(receiveBadgesSettingContainerRef)}>
                <setting-checkbox class="setting-checkbox" .data=${{ setting: receiveBadgesSetting }} @change=${(e) => {
    const settingCheckbox = e.target;
    void Badges.UserBadges.instance().initialize().then(() => {
      if (!settingCheckbox.checked) {
        return;
      }
      Badges.UserBadges.instance().recordAction(Badges.BadgeAction.RECEIVE_BADGES_SETTING_ENABLED);
    });
  }}></setting-checkbox>
                <span>${i18nString(UIStrings.relevantDataDisclaimer)}</span>
              </div>` : Lit.nothing}
        </div>
      ` : html`
        <div class="gdp-profile-sign-up-content">
          ${renderBrand()}
          <devtools-button
            @click=${() => PanelCommon.GdpSignUpDialog.show()}
            .jslogContext=${"gdp.sign-up-dialog-open"}
            .variant=${"outlined"}>
              ${i18nString(UIStrings.signUp)}
          </devtools-button>
        </div>
      `}
    </div>
  `;
}
customElements.define("devtools-sync-section", SyncSection);
export {
  SyncSection_exports as SyncSection
};
//# sourceMappingURL=components.js.map
