var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/ai_code_completion/AiCodeCompletion.js
var AiCodeCompletion_exports = {};
__export(AiCodeCompletion_exports, {
  AiCodeCompletion: () => AiCodeCompletion
});
import * as Host from "./../../core/host/host.js";
import * as Root from "./../../core/root/root.js";
import * as TextEditor from "./../../ui/components/text_editor/text_editor.js";
var AiCodeCompletion = class {
  #aidaRequestThrottler;
  #editor;
  #sessionId = crypto.randomUUID();
  #aidaClient;
  #serverSideLoggingEnabled;
  constructor(opts, editor, throttler) {
    this.#aidaClient = opts.aidaClient;
    this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    this.#editor = editor;
    this.#aidaRequestThrottler = throttler;
  }
  #buildRequest(prefix, suffix, inferenceLanguage = "JAVASCRIPT") {
    const userTier = Host.AidaClient.convertToUserTierEnum(this.#userTier);
    function validTemperature(temperature) {
      return typeof temperature === "number" && temperature >= 0 ? temperature : void 0;
    }
    return {
      client: Host.AidaClient.CLIENT_NAME,
      prefix,
      suffix,
      options: {
        inference_language: inferenceLanguage,
        temperature: validTemperature(this.#options.temperature),
        model_id: this.#options.modelId || void 0
      },
      metadata: {
        disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
        string_session_id: this.#sessionId,
        user_tier: userTier,
        client_version: Root.Runtime.getChromeVersion()
      }
    };
  }
  async #requestAidaSuggestion(request) {
    const response = await this.#aidaClient.completeCode(request);
    if (response && response.generatedSamples.length > 0 && response.generatedSamples[0].generationString) {
      this.#editor.dispatch({
        effects: TextEditor.Config.setAiAutoCompleteSuggestion.of(response.generatedSamples[0].generationString)
      });
    }
  }
  get #userTier() {
    return Root.Runtime.hostConfig.devToolsAiCodeCompletion?.userTier;
  }
  get #options() {
    const temperature = Root.Runtime.hostConfig.devToolsAiCodeCompletion?.temperature;
    const modelId = Root.Runtime.hostConfig.devToolsAiCodeCompletion?.modelId;
    return {
      temperature,
      modelId
    };
  }
  onTextChanged(prefix, suffix) {
    void this.#aidaRequestThrottler.schedule(() => this.#requestAidaSuggestion(this.#buildRequest(prefix, suffix)));
  }
};
export {
  AiCodeCompletion_exports as AiCodeCompletion
};
//# sourceMappingURL=ai_code_completion.js.map
