// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as LitHtml from '../../ui/lit-html/lit-html.js';
import { ChatMessageEntity, FreestylerChatUi, } from './components/FreestylerChatUi.js';
import freestylerPanelStyles from './freestylerPanel.css.js';
const UIStrings = {
    /**
     *@description Freestyler UI text for clearing messages.
     */
    clearMessages: 'Clear messages',
    /**
     *@description Freestyler UI text for sending feedback.
     */
    sendFeedback: 'Send feedback',
};
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/FreestylerPanel.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
// TODO(ergunsh): Use the WidgetElement instead of separately creating the toolbar.
function createToolbar(target, { onClearClick }) {
    const toolbarContainer = target.createChild('div', 'freestyler-toolbar-container');
    const leftToolbar = new UI.Toolbar.Toolbar('', toolbarContainer);
    const rightToolbar = new UI.Toolbar.Toolbar('freestyler-right-toolbar', toolbarContainer);
    const clearButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.clearMessages), 'clear', undefined, 'freestyler.clear');
    clearButton.addEventListener("Click" /* UI.Toolbar.ToolbarButton.Events.Click */, onClearClick);
    leftToolbar.appendToolbarItem(clearButton);
    rightToolbar.appendSeparator();
    const feedbackButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.sendFeedback), 'bug', undefined, 'freestyler.feedback');
    const helpButton = new UI.Toolbar.ToolbarButton(i18nString(UIStrings.sendFeedback), 'help', undefined, 'freestyler.help');
    rightToolbar.appendToolbarItem(feedbackButton);
    rightToolbar.appendToolbarItem(helpButton);
}
function defaultView(input, output, target) {
    // clang-format off
    LitHtml.render(LitHtml.html `
    <${FreestylerChatUi.litTagName} .props=${{
        onTextSubmit: input.onTextSubmit,
        onAcceptPrivacyNotice: input.onAcceptPrivacyNotice,
        state: input.state,
        messages: input.messages,
    }} >
    </${FreestylerChatUi.litTagName}>
  `, target, { host: input }); // eslint-disable-line rulesdir/lit_html_host_this
    // clang-format on
}
let freestylerPanelInstance;
export class FreestylerPanel extends UI.Panel.Panel {
    view;
    #contentContainer;
    #aidaClient;
    #isAidaFetchCancelled = false;
    #viewProps;
    constructor(view = defaultView) {
        super('freestyler');
        this.view = view;
        createToolbar(this.contentElement, { onClearClick: this.#handleClearClick.bind(this) });
        this.#aidaClient = new Host.AidaClient.AidaClient();
        this.#contentContainer = this.contentElement.createChild('div', 'freestyler-chat-ui-container');
        this.#viewProps = {
            state: "consent" /* FreestylerChatUiState.CONSENT_VIEW */,
            messages: [],
            onTextSubmit: this.#handleTextSubmit.bind(this),
            onAcceptPrivacyNotice: this.#handleAcceptPrivacyNotice.bind(this),
        };
        this.doUpdate();
    }
    static instance(opts = { forceNew: null }) {
        const { forceNew } = opts;
        if (!freestylerPanelInstance || forceNew) {
            freestylerPanelInstance = new FreestylerPanel();
        }
        return freestylerPanelInstance;
    }
    wasShown() {
        this.registerCSSFiles([freestylerPanelStyles]);
    }
    doUpdate() {
        this.view(this.#viewProps, this, this.#contentContainer);
    }
    #handleClearClick() {
        this.#viewProps.messages = [];
        this.#viewProps.state = "chat-view" /* FreestylerChatUiState.CHAT_VIEW */;
        this.#isAidaFetchCancelled = true;
        this.doUpdate();
    }
    async #handleTextSubmit(text) {
        this.#isAidaFetchCancelled = false;
        this.#viewProps.messages.push({
            entity: ChatMessageEntity.USER,
            text,
        });
        this.#viewProps.state = "chat-view-loading" /* FreestylerChatUiState.CHAT_VIEW_LOADING */;
        this.doUpdate();
        let systemMessage = undefined;
        for await (const response of this.#aidaClient.fetch(text)) {
            if (this.#isAidaFetchCancelled) {
                return;
            }
            if (!systemMessage) {
                systemMessage = {
                    entity: ChatMessageEntity.MODEL,
                    text: response.explanation,
                };
                this.#viewProps.state = "chat-view" /* FreestylerChatUiState.CHAT_VIEW */;
                this.#viewProps.messages.push(systemMessage);
            }
            else {
                systemMessage.text = response.explanation;
            }
            this.doUpdate();
        }
    }
    #handleAcceptPrivacyNotice() {
        this.#viewProps.state = "chat-view" /* FreestylerChatUiState.CHAT_VIEW */;
        this.doUpdate();
    }
}
//# sourceMappingURL=FreestylerPanel.js.map