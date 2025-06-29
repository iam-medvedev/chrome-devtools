// gen/front_end/panels/web_audio/web_audio-meta.prebundle.js
import * as i18n from "./../../core/i18n/i18n.js";
import * as UI from "./../../ui/legacy/legacy.js";
var UIStrings = {
  /**
   *@description Title of the WebAudio tool
   */
  webaudio: "WebAudio",
  /**
   *@description A tags of WebAudio tool that can be searched in the command menu
   */
  audio: "audio",
  /**
   *@description Command for showing the WebAudio tool
   */
  showWebaudio: "Show WebAudio"
};
var str_ = i18n.i18n.registerUIStrings("panels/web_audio/web_audio-meta.ts", UIStrings);
var i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(void 0, str_);
var loadedWebAudioModule;
async function loadWebAudioModule() {
  if (!loadedWebAudioModule) {
    loadedWebAudioModule = await import("./web_audio.js");
  }
  return loadedWebAudioModule;
}
UI.ViewManager.registerViewExtension({
  location: "drawer-view",
  id: "web-audio",
  title: i18nLazyString(UIStrings.webaudio),
  commandPrompt: i18nLazyString(UIStrings.showWebaudio),
  persistence: "closeable",
  order: 100,
  async loadView() {
    const WebAudio = await loadWebAudioModule();
    return new WebAudio.WebAudioView.WebAudioView();
  },
  tags: [i18nLazyString(UIStrings.audio)]
});
//# sourceMappingURL=web_audio-meta.js.map
