// ../../front_end/panels/comments/comments-meta.ts
import * as i18n from "../../core/i18n/i18n.js";
import * as UI from "../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Title for the Comments drawer panel.
   */
  comments: "Comments",
  /**
   * @description Command menu command for showing the Comments drawer panel.
   */
  showComments: "Show Comments"
};
var str_ = i18n.i18n.registerUIStrings("panels/comments/comments-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedCommentsModule;
async function loadCommentsModule() {
  if (!loadedCommentsModule) {
    loadedCommentsModule = await import("./comments.js");
  }
  return loadedCommentsModule;
}
UI.ViewManager.registerViewExtension({
  location: UI.ViewManager.ViewLocationValues.DRAWER_VIEW,
  id: "comments",
  title: i18nLazyString(UIStrings.comments),
  commandPrompt: i18nLazyString(UIStrings.showComments),
  order: 105,
  persistence: UI.ViewManager.ViewPersistence.CLOSEABLE,
  condition: (config) => Boolean(config?.devToolsComments?.enabled),
  async loadView(universe) {
    const Comments = await loadCommentsModule();
    return new Comments.CommentsPane.CommentsPane(
      void 0,
      [universe.commentManager]
    );
  }
});
//# sourceMappingURL=comments-meta.js.map
