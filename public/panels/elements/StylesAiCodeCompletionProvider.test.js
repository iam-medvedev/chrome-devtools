// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as AiCodeCompletion from '../../models/ai_code_completion/ai_code_completion.js';
import { describeWithEnvironment, updateHostConfig } from '../../testing/EnvironmentHelpers.js';
import * as Elements from './elements.js';
function createProvider() {
    const config = {
        // TODO: Update this to Styles panel
        panel: "sources" /* AiCodeCompletion.AiCodeCompletion.ContextFlavor.SOURCES */,
        completionContext: {},
        generationContext: {},
        onFeatureEnabled: sinon.spy(),
        onFeatureDisabled: sinon.spy(),
        onSuggestionAccepted: () => { },
        onRequestTriggered: () => { },
        onResponseReceived: () => { },
    };
    const provider = Elements.StylesAiCodeCompletionProvider.StylesAiCodeCompletionProvider.createInstance(config);
    return { provider, config };
}
describeWithEnvironment('StylesAiCodeCompletionProvider', () => {
    it('does not create a provider when the feature is disabled', () => {
        updateHostConfig({
            devToolsAiCodeCompletionStyles: {
                enabled: false,
            },
        });
        assert.throws(() => createProvider(), 'AI code completion feature in Styles is not enabled.');
    });
});
//# sourceMappingURL=StylesAiCodeCompletionProvider.test.js.map