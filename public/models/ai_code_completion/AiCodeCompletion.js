// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as Root from '../../core/root/root.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
export const DELAY_BEFORE_SHOWING_RESPONSE_MS = 500;
export const AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS = 200;
/**
 * The AiCodeCompletion class is responsible for fetching code completion suggestions
 * from the AIDA backend and displaying them in the text editor.
 *
 * 1. **Debouncing requests:** As the user types, we don't want to send a request
 *    for every keystroke. Instead, we use debouncing to schedule a request
 *    only after the user has paused typing for a short period
 *    (AIDA_REQUEST_THROTTLER_TIMEOUT_MS). This prevents spamming the backend with
 *    requests for intermediate typing states.
 *
 * 2. **Delaying suggestions:** When a suggestion is received from the AIDA
 *    backend, we don't show it immediately. There is a minimum delay
 *    (DELAY_BEFORE_SHOWING_RESPONSE_MS) from when the request was sent to when
 *    the suggestion is displayed.
 */
export class AiCodeCompletion extends Common.ObjectWrapper.ObjectWrapper {
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
    #buildRequest(prefix, suffix, inferenceLanguage = "JAVASCRIPT" /* Host.AidaClient.AidaInferenceLanguage.JAVASCRIPT */) {
        const userTier = Host.AidaClient.convertToUserTierEnum(this.#userTier);
        function validTemperature(temperature) {
            return typeof temperature === 'number' && temperature >= 0 ? temperature : undefined;
        }
        return {
            client: Host.AidaClient.CLIENT_NAME,
            prefix,
            suffix,
            options: {
                inference_language: inferenceLanguage,
                temperature: validTemperature(this.#options.temperature),
                model_id: this.#options.modelId || undefined,
                stop_sequences: ['\n'], // We are prioritizing single line suggestions to reduce noise
            },
            metadata: {
                disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
                string_session_id: this.#sessionId,
                user_tier: userTier,
                client_version: Root.Runtime.getChromeVersion(),
            },
        };
    }
    async #requestAidaSuggestion(request, cursor) {
        const startTime = performance.now();
        const response = await this.#aidaClient.completeCode(request);
        if (response && response.generatedSamples.length > 0 && response.generatedSamples[0].generationString) {
            const remainderDelay = Math.max(DELAY_BEFORE_SHOWING_RESPONSE_MS - (performance.now() - startTime), 0);
            // Delays the rendering of the Code completion
            setTimeout(() => {
                // We are not cancelling the previous responses even when there are more recent responses
                // from the LLM as:
                // In case the user kept typing characters that are prefix of the previous suggestion, it
                // is a valid suggestion and we should display it to the user.
                // In case the user typed a different character, the config for AI auto complete suggestion
                // will set the suggestion to null.
                this.#editor.dispatch({
                    effects: TextEditor.Config.setAiAutoCompleteSuggestion.of({ text: response.generatedSamples[0].generationString, from: cursor }),
                });
                const citations = response.generatedSamples[0].attributionMetadata?.citations;
                if (citations) {
                    this.dispatchEventToListeners("CitationsUpdated" /* Events.CITATIONS_UPDATED */, { citations });
                }
            }, remainderDelay);
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
            modelId,
        };
    }
    onTextChanged = Common.Debouncer.debounce((prefix, suffix, cursor) => {
        void this.#requestAidaSuggestion(this.#buildRequest(prefix, suffix), cursor);
    }, AIDA_REQUEST_DEBOUNCE_TIMEOUT_MS);
}
//# sourceMappingURL=AiCodeCompletion.js.map