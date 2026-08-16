// gen/front_end/ui/comments/comments-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title of an action that toggles comment mode.
   */
  toggleCommentMode: "Add comments to send to your AI coding agent"
};
var str_ = i18n.i18n.registerUIStrings("ui/comments/comments-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedCommentsModule;
async function loadCommentsModule() {
  if (!loadedCommentsModule) {
    loadedCommentsModule = await import("./comments.js");
  }
  return loadedCommentsModule;
}
function isCommentsEnabled(config) {
  return Boolean(config?.devToolsComments?.enabled);
}
UI.ActionRegistration.registerActionExtension({
  category: "GLOBAL",
  actionId: "comments.toggle-comment-mode",
  title: i18nLazyString(UIStrings.toggleCommentMode),
  iconClass: "comment-mode",
  toggleable: true,
  condition: isCommentsEnabled,
  async loadActionDelegate() {
    const Comments = await loadCommentsModule();
    return new Comments.CommentsOverlayWidget.ActionDelegate();
  }
});
UI.Toolbar.registerToolbarItem({
  actionId: "comments.toggle-comment-mode",
  location: "main-toolbar-left",
  order: 1,
  condition: isCommentsEnabled
});
//# sourceMappingURL=comments-meta.js.map
