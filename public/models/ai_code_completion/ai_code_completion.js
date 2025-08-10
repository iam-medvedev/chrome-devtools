var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// gen/front_end/models/ai_code_completion/AiCodeCompletion.js
var AiCodeCompletion_exports = {};
__export(AiCodeCompletion_exports, {
  AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS: () => AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS,
  AiCodeCompletion: () => AiCodeCompletion,
  DELAY_BEFORE_SHOWING_RESPONSE_MS: () => DELAY_BEFORE_SHOWING_RESPONSE_MS
});
import * as Common from "./../../core/common/common.js";
import * as Host from "./../../core/host/host.js";
import * as Root from "./../../core/root/root.js";
import * as TextEditor from "./../../ui/components/text_editor/text_editor.js";
var DELAY_BEFORE_SHOWING_RESPONSE_MS = 500;
var AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS = 200;
var AiCodeCompletion = class extends Common.ObjectWrapper.ObjectWrapper {
  #editor;
  #sessionId = crypto.randomUUID();
  #aidaClient;
  #serverSideLoggingEnabled;
  constructor(opts, editor) {
    super();
    this.#aidaClient = opts.aidaClient;
    this.#serverSideLoggingEnabled = opts.serverSideLoggingEnabled ?? false;
    this.#editor = editor;
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
        model_id: this.#options.modelId || void 0,
        stop_sequences: ["\n"]
        // We are prioritizing single line suggestions to reduce noise
      },
      metadata: {
        disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
        string_session_id: this.#sessionId,
        user_tier: userTier,
        client_version: Root.Runtime.getChromeVersion()
      }
    };
  }
  async #requestAidaSuggestion(request, cursor) {
    const startTime = performance.now();
    this.dispatchEventToListeners("RequestTriggered", {});
    try {
      const response = await this.#aidaClient.completeCode(request);
      if (response && response.generatedSamples.length > 0 && response.generatedSamples[0].generationString) {
        if (response.generatedSamples[0].attributionMetadata?.attributionAction === Host.AidaClient.RecitationAction.BLOCK) {
          this.dispatchEventToListeners("ResponseReceived", {});
          return;
        }
        const remainderDelay = Math.max(DELAY_BEFORE_SHOWING_RESPONSE_MS - (performance.now() - startTime), 0);
        setTimeout(() => {
          this.#editor.dispatch({
            effects: TextEditor.Config.setAiAutoCompleteSuggestion.of({ text: response.generatedSamples[0].generationString, from: cursor })
          });
          const citations = response.generatedSamples[0].attributionMetadata?.citations;
          this.dispatchEventToListeners("ResponseReceived", { citations });
        }, remainderDelay);
      } else {
        this.dispatchEventToListeners("ResponseReceived", {});
      }
    } catch {
      this.dispatchEventToListeners("ResponseReceived", {});
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
  onTextChanged = Common.Debouncer.debounce((prefix, suffix, cursor) => {
    void this.#requestAidaSuggestion(this.#buildRequest(prefix, suffix), cursor);
  }, AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS);
};
export {
  AiCodeCompletion_exports as AiCodeCompletion
};
//# sourceMappingURL=ai_code_completion.js.map
