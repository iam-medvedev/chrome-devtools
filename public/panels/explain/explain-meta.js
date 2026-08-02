// gen/front_end/panels/explain/explain-meta.prebundle.js
import * as Common from "./../../core/common/common.js";
import * as i18n from "./../../core/i18n/i18n.js";
import * as AiAssistanceModel from "./../../models/ai_assistance/ai_assistance.js";
import * as Console from "./../console/console.js";
import * as UI from "./../../ui/legacy/legacy.js";
import * as SettingUIRegistration from "./../../ui/settings/settings.js";
var UIStrings = {
  /**
   * @description Message to offer insights for a console error message.
   */
  explainThisError: "Understand this error",
  /**
   * @description Message to offer insights for a console warning message.
   */
  explainThisWarning: "Understand this warning",
  /**
   * @description Message to offer insights for a console message.
   */
  explainThisMessage: "Understand this message",
  /**
   * @description The setting title to enable the console insights feature via
   * the settings tab.
   */
  enableConsoleInsights: "Understand console messages with AI"
};
var str_ = i18n.i18n.registerUIStrings("panels/explain/explain-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var actions = [
  {
    actionId: "explain.console-message.hover",
    title: i18nLazyString(UIStrings.explainThisMessage),
    configurableBindings: false,
    contextTypes() {
      return [Console.ConsoleViewMessage.ConsoleViewMessage];
    }
  },
  {
    actionId: "explain.console-message.teaser",
    title: i18nLazyString(UIStrings.explainThisMessage),
    configurableBindings: false,
    contextTypes() {
      return [];
    }
  },
  {
    actionId: "explain.console-message.context.error",
    title: i18nLazyString(UIStrings.explainThisError),
    configurableBindings: false,
    contextTypes() {
      return [];
    }
  },
  {
    actionId: "explain.console-message.context.warning",
    title: i18nLazyString(UIStrings.explainThisWarning),
    configurableBindings: false,
    contextTypes() {
      return [];
    }
  },
  {
    actionId: "explain.console-message.context.other",
    title: i18nLazyString(UIStrings.explainThisMessage),
    configurableBindings: false,
    contextTypes() {
      return [];
    }
  }
];
function isGeoRestricted(config) {
  return config?.aidaAvailability?.blockedByGeo === true;
}
function isPolicyRestricted(config) {
  return config?.aidaAvailability?.blockedByEnterprisePolicy === true;
}
function isFeatureEnabled(config) {
  return (config?.aidaAvailability?.enabled && config?.devToolsConsoleInsights?.enabled) === true;
}
SettingUIRegistration.SettingUIRegistration.register(AiAssistanceModel.AiUtils.consoleInsightsEnabledSettingDescriptor, {
  category: "AI",
  title: i18nLazyString(UIStrings.enableConsoleInsights)
});
for (const action of actions) {
  UI.ActionRegistration.registerActionExtension({
    ...action,
    category: "CONSOLE",
    async loadActionDelegate() {
      const Explain = await import("./explain.js");
      return new Explain.ActionDelegate();
    },
    condition: (config) => {
      return isFeatureEnabled(config) && !isPolicyRestricted(config) && !isGeoRestricted(config);
    }
  });
}
//# sourceMappingURL=explain-meta.js.map
