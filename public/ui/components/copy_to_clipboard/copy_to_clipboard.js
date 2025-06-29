// gen/front_end/ui/components/copy_to_clipboard/copyToClipboard.js
import * as Host from "./../../../core/host/host.js";
import * as UI from "./../../legacy/legacy.js";
function copyTextToClipboard(text, alert) {
  Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(text);
  if (alert) {
    UI.ARIAUtils.alert(alert);
  }
}
export {
  copyTextToClipboard
};
//# sourceMappingURL=copy_to_clipboard.js.map
