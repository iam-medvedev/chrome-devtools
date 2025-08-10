// gen/front_end/panels/media/media-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   * @description Text that appears on a button for the media resource type filter.
   */
  media: "Media",
  /**
   * @description The type of media. Lower case.
   */
  video: "video",
  /**
   * @description Command for showing the media tool.
   */
  showMedia: "Show Media"
};
var str_ = i18n.i18n.registerUIStrings("panels/media/media-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedMediaModule;
async function loadMediaModule() {
  if (!loadedMediaModule) {
    loadedMediaModule = await import("./media.js");
  }
  return loadedMediaModule;
}
UI.ViewManager.registerViewExtension({
  location: "panel",
  id: "medias",
  title: i18nLazyString(UIStrings.media),
  commandPrompt: i18nLazyString(UIStrings.showMedia),
  persistence: "closeable",
  order: 100,
  async loadView() {
    const Media = await loadMediaModule();
    return new Media.MainView.MainView();
  },
  tags: [
    i18nLazyString(UIStrings.media),
    i18nLazyString(UIStrings.video)
  ]
});
//# sourceMappingURL=media-meta.js.map
