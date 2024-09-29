// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../../core/host/host.js';
import { renderElementIntoDOM } from '../../../testing/DOMHelpers.js';
import { describeWithEnvironment } from '../../../testing/EnvironmentHelpers.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as Freestyler from '../freestyler.js';
const { MarkdownRendererWithCodeBlock } = Freestyler.FOR_TEST;
describeWithEnvironment('FreestylerChatUi', () => {
    describe('MarkdownRendererWithCodeBlock', () => {
        it('should transform code token for multiline code blocks with `css` language written in the first line', () => {
            const renderer = new MarkdownRendererWithCodeBlock();
            const templateForTokenStub = sinon.stub(MarkdownView.MarkdownView.MarkdownInsightRenderer.prototype, 'templateForToken');
            const codeBlock = `\`\`\`
css
* {
  color: red;
}
\`\`\``;
            const codeToken = Marked.Marked.lexer(codeBlock)[0];
            assert.isEmpty(codeToken.lang);
            renderer.renderToken(codeToken);
            sinon.assert.calledWith(templateForTokenStub, sinon.match({
                lang: 'css',
                text: `* {
  color: red;
}`,
            }));
        });
    });
    function getProp(options) {
        const noop = () => { };
        const messages = options.messages ?? [];
        return {
            onTextSubmit: noop,
            onInspectElementClick: noop,
            onFeedbackSubmit: noop,
            onCancelClick: noop,
            onSelectedNetworkRequestClick: noop,
            inspectElementToggled: false,
            state: "chat-view" /* Freestyler.State.CHAT_VIEW */,
            agentType: "freestyler" /* Freestyler.AgentType.FREESTYLER */,
            aidaAvailability: "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */,
            messages,
            selectedElement: {},
            selectedNetworkRequest: {},
            isLoading: false,
            canShowFeedbackForm: false,
            userInfo: {},
            ...options,
        };
    }
    describe('SideEffects', () => {
        it('should show SideEffects when the step contains "sideEffect" object', async () => {
            const props = getProp({
                messages: [
                    {
                        entity: "model" /* Freestyler.ChatMessageEntity.MODEL */,
                        suggestions: [],
                        steps: [
                            {
                                isLoading: false,
                                title: 'Updating element styles',
                                thought: 'Updating element styles',
                                code: '$0.style.background = "blue";',
                                sideEffect: {
                                    onAnswer: () => { },
                                },
                            },
                        ],
                    },
                ],
            });
            const chat = new Freestyler.FreestylerChatUi(props);
            renderElementIntoDOM(chat);
            const sideEffect = chat.shadowRoot.querySelector('.side-effect-confirmation');
            assert.exists(sideEffect);
        });
        it('shows the consent view', async () => {
            const props = getProp({
                state: "consent-view" /* Freestyler.State.CONSENT_VIEW */,
            });
            const chat = new Freestyler.FreestylerChatUi(props);
            renderElementIntoDOM(chat);
            const optIn = chat.shadowRoot?.querySelector('.opt-in');
            assert.strictEqual(optIn?.textContent?.trim(), 'Turn on AI assistance in Settings to get help with understanding CSS styles');
            const chatInput = chat.shadowRoot?.querySelector('.chat-input');
            assert.isTrue(chatInput.disabled);
            assert.strictEqual(chatInput.placeholder, 'Follow the steps above to ask a question');
        });
    });
});
//# sourceMappingURL=FreestylerChatUi.test.js.map