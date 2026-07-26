// gen/front_end/models/badges/badges-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
var UIStrings = {
  /**
   * @description Label for a checkbox in the settings UI. Allows developers to opt-in/opt-out
   * of receiving Google Developer Program (GDP) badges based on their activity in Chrome DevTools.
   */
  earnBadges: "Earn badges"
};
var str_ = i18n.i18n.registerUIStrings("models/badges/badges-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
Common.Settings.registerSettingExtension({
  category: "ACCOUNT",
  settingName: "receive-gdp-badges",
  settingType: "boolean",
  storageType: "Synced",
  title: i18nLazyString(UIStrings.earnBadges),
  defaultValue: false,
  reloadRequired: true
});
//# sourceMappingURL=badges-meta.js.map
