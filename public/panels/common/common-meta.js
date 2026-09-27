// ../../front_end/panels/common/common-meta.ts
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title of an action that toggles comment mode.
   */
  toggleCommentMode: "Add comments to send to your AI coding agent",
  /**
   * @description Label for the comments status bar when it's not showing.
   */
  showComments: "Show comments",
  /**
   * @description Label for the comments status bar when it's showing.
   */
  comments: "Comments"
};
var str_ = i18n.i18n.registerUIStrings("panels/common/common-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedCommonModule;
async function loadCommonModule() {
  if (!loadedCommonModule) {
    loadedCommonModule = await import("./common.js");
  }
  return loadedCommonModule;
}
function isCommentsEnabled(config) {
  return Boolean(config?.devToolsComments?.enabled);
}
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.STATUS_BAR,
  id: "comments-status-bar-pill",
  order: 1,
  condition: isCommentsEnabled,
  commandPrompt: i18nLazyString(UIStrings.showComments),
  title: i18nLazyString(UIStrings.comments),
  async loadView(universe) {
    const Common = await loadCommonModule();
    return new Common.CommentsStatusBarPill.CommentsStatusBarPill(void 0, [universe.commentManager]);
  }
});
UI.ActionRegistration.registerActionExtension({
  category: UI.ActionRegistration.ActionCategory.GLOBAL,
  actionId: "comments.toggle-comment-mode",
  title: i18nLazyString(UIStrings.toggleCommentMode),
  iconClass: UI.ActionRegistration.IconClass.COMMENT_MODE,
  toggleable: true,
  condition: isCommentsEnabled,
  async loadActionDelegate() {
    const Common = await loadCommonModule();
    return new Common.CommentsOverlayWidget.ActionDelegate();
  }
});
UI.Toolbar.registerToolbarItem({
  async loadItem() {
    const Common = await loadCommonModule();
    return new Common.CommentsOverlayWidget.ButtonProvider();
  },
  location: UI.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT,
  order: 1,
  condition: isCommentsEnabled
});
//# sourceMappingURL=common-meta.js.map
