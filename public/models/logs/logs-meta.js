// gen/front_end/models/logs/logs-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
var UIStrings = {
  /**
   * @description Text to keep the log after refreshing.
   */
  keepLog: "Keep log",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  keep: "keep",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  preserve: "preserve",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  clear: "clear",
  /**
   * @description A term that can be used to search in the command menu, and will find the search
   * result 'Keep log on page reload / navigation'. This is an additional search term to help
   * the user find the setting even when they don't know the exact name of it.
   */
  reset: "reset",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  keepLogOnPageReload: "Keep log on page reload / navigation",
  /**
   * @description Title of a setting under the Network category that can be invoked through the Command Menu.
   */
  doNotKeepLogOnPageReload: "Don\u2019t keep log on page reload / navigation",
  /**
   * @description Title of an action in the network tool to toggle recording.
   */
  recordNetworkLog: "Record network log"
};
var str_ = i18n.i18n.registerUIStrings("models/logs/logs-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString(UIStrings.keepLog),
  settingName: "network-log.preserve-log",
  settingType: "boolean",
  defaultValue: false,
  tags: [
    i18nLazyString(UIStrings.keep),
    i18nLazyString(UIStrings.preserve),
    i18nLazyString(UIStrings.clear),
    i18nLazyString(UIStrings.reset)
  ],
  options: [
    {
      value: true,
      title: i18nLazyString(UIStrings.keepLogOnPageReload)
    },
    {
      value: false,
      title: i18nLazyString(UIStrings.doNotKeepLogOnPageReload)
    }
  ]
});
Common.Settings.registerSettingExtension({
  category: "NETWORK",
  title: i18nLazyString(UIStrings.recordNetworkLog),
  settingName: "network-log.record-log",
  settingType: "boolean",
  defaultValue: true,
  storageType: "Session"
});
//# sourceMappingURL=logs-meta.js.map
