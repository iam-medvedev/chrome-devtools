// Copyright 2025 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as Root from '../../core/root/root.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
export class AiCodeCompletion {
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
            },
            metadata: {
                disable_user_content_logging: !(this.#serverSideLoggingEnabled ?? false),
                string_session_id: this.#sessionId,
                user_tier: userTier,
                client_version: Root.Runtime.getChromeVersion(),
            },
        };
    }
    async #requestAidaSuggestion(request) {
        const response = await this.#aidaClient.completeCode(request);
        if (response && response.generatedSamples.length > 0 && response.generatedSamples[0].generationString) {
            this.#editor.dispatch({
                effects: TextEditor.Config.setAiAutoCompleteSuggestion.of(response.generatedSamples[0].generationString),
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
            modelId,
        };
    }
    onTextChanged(prefix, suffix) {
        void this.#aidaRequestThrottler.schedule(() => this.#requestAidaSuggestion(this.#buildRequest(prefix, suffix)));
    }
}
//# sourceMappingURL=AiCodeCompletion.js.map