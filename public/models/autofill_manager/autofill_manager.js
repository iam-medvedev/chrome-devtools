var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/autofill_manager/AutofillManager.js
var AutofillManager_exports = {};
__export(AutofillManager_exports, {
  AutofillManager: () => AutofillManager
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as Platform from "./../../core/platform/platform.js";
import * as SDK from "./../../core/sdk/sdk.js";
import * as UI from "./../../ui/legacy/legacy.js";
var autofillManagerInstance;
var AutofillManager = class _AutofillManager extends Common.ObjectWrapper.ObjectWrapper {
  #autoOpenViewSetting;
  #address = "";
  #filledFields = [];
  #matches = [];
  #autofillModel = null;
  constructor() {
    super();
    SDK.TargetManager.TargetManager.instance().addModelListener(SDK.AutofillModel.AutofillModel, "AddressFormFilled", this.#addressFormFilled, this, { scoped: true });
    this.#autoOpenViewSetting = Common.Settings.Settings.instance().createSetting("auto-open-autofill-view-on-event", true);
  }
  static instance(opts = { forceNew: null }) {
    const { forceNew } = opts;
    if (!autofillManagerInstance || forceNew) {
      autofillManagerInstance = new _AutofillManager();
    }
    return autofillManagerInstance;
  }
  onShowAutofillTestAddressesSettingsChanged() {
    for (const autofillModel of SDK.TargetManager.TargetManager.instance().models(SDK.AutofillModel.AutofillModel)) {
      autofillModel.setTestAddresses();
    }
  }
  async #addressFormFilled({ data }) {
    if (this.#autoOpenViewSetting.get()) {
      await UI.ViewManager.ViewManager.instance().showView("autofill-view");
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.AutofillReceivedAndTabAutoOpened);
    } else {
      Host.userMetrics.actionTaken(Host.UserMetrics.Action.AutofillReceived);
    }
    this.#autofillModel = data.autofillModel;
    this.#processAddressFormFilledData(data.event);
    if (this.#address) {
      this.dispatchEventToListeners("AddressFormFilled", {
        address: this.#address,
        filledFields: this.#filledFields,
        matches: this.#matches,
        autofillModel: this.#autofillModel
      });
    }
  }
  getLastFilledAddressForm() {
    if (!this.#address || !this.#autofillModel) {
      return null;
    }
    return {
      address: this.#address,
      filledFields: this.#filledFields,
      matches: this.#matches,
      autofillModel: this.#autofillModel
    };
  }
  #processAddressFormFilledData({ addressUi, filledFields }) {
    const concatAddressFields = (addressFields) => addressFields.fields.filter((field) => field.value.length).map((field) => field.value).join(" ");
    this.#address = addressUi.addressFields.map((addressFields) => concatAddressFields(addressFields)).filter((str) => str.length).join("\n");
    this.#filledFields = filledFields;
    this.#matches = [];
    for (let i = 0; i < this.#filledFields.length; i++) {
      if (this.#filledFields[i].value === "") {
        continue;
      }
      const needle = Platform.StringUtilities.escapeForRegExp(this.#filledFields[i].value.replaceAll(/\s/g, " ")).replaceAll(/([.,]+)\s/g, "$1? ");
      const matches = this.#address.replaceAll(/\s/g, " ").matchAll(new RegExp(needle, "g"));
      for (const match of matches) {
        if (typeof match.index !== "undefined") {
          this.#matches.push({ startIndex: match.index, endIndex: match.index + match[0].length, filledFieldIndex: i });
        }
      }
    }
  }
};
export {
  AutofillManager_exports as AutofillManager
};
//# sourceMappingURL=autofill_manager.js.map
