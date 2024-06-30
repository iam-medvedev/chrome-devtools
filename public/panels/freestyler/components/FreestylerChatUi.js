// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../../core/common/common.js';
import * as Host from '../../../core/host/host.js';
import * as i18n from '../../../core/i18n/i18n.js';
import * as Marked from '../../../third_party/marked/marked.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as IconButton from '../../../ui/components/icon_button/icon_button.js';
import * as MarkdownView from '../../../ui/components/markdown_view/markdown_view.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import { Step } from '../FreestylerAgent.js';
import freestylerChatUiStyles from './freestylerChatUi.css.js';
/*
  * TODO(nvitkov): b/346933425
  * Temporary string that should not be translated
  * as they may change often during development.
  */
const TempUIStrings = {
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholder: 'Ask a question about the selected element',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimer: 'Freestyler may display inaccurate information and may not get it right',
    /**
     *@description Title for the send icon button.
     */
    sendButtonTitle: 'Send',
    /**
     *@description Title for the cancel icon button.
     */
    cancelButtonTitle: 'Cancel',
    /**
     *@description Label for the "select an element" button.
     */
    selectAnElement: 'Select an element',
    /**
     *@description Text for the empty state of the Freestyler panel.
     */
    emptyStateText: 'How can I help you?',
    /**
     * @description The title of the button that allows submitting positive
     * feedback about the response for freestyler.
     */
    thumbsUp: 'Thumbs up',
    /**
     * @description The title of the button that allows submitting negative
     * feedback about the response for freestyler.
     */
    thumbsDown: 'Thumbs down',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    notLoggedIn: 'This feature is only available when you sign into Chrome with your Google account.',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    syncIsOff: 'This feature requires you to turn on Chrome sync.',
    /**
     * @description Message shown when the user is offline.
     */
    offline: 'Check your internet connection and try again.',
    /**
     *@description Heading for the consent view.
     */
    consentScreenHeading: 'Things to consider',
    /**
     *@description Title of the button for accepting in the consent screen.
     */
    acceptButtonTitle: 'Accept',
    /**
     *@description Consent view main text
     */
    consentTextAiDisclaimer: 'This feature uses AI and won\'t always get it right.',
    /**
     *@description Consent view data collection text
     */
    consentTextDataDisclaimer: 'Your inputs and the information from the page you are using this feature for are sent to Google.',
    /**
     *@description Consent view data visibility text
     */
    consentTextVisibilityDisclaimer: 'Data may be seen by trained reviewers to improve this feature.',
};
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/FreestylerChatUi.ts', UIStrings);
// const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nString = i18n.i18n.lockedString;
function getInputPlaceholderString(aidaAvailability) {
    switch (aidaAvailability) {
        case Host.AidaClient.AidaAvailability.AVAILABLE:
            return i18nString(TempUIStrings.inputPlaceholder);
        case Host.AidaClient.AidaAvailability.NO_ACCOUNT_EMAIL:
            return i18nString(TempUIStrings.notLoggedIn);
        case Host.AidaClient.AidaAvailability.NO_ACTIVE_SYNC:
            return i18nString(TempUIStrings.syncIsOff);
        case Host.AidaClient.AidaAvailability.NO_INTERNET:
            return i18nString(TempUIStrings.offline);
    }
}
export var ChatMessageEntity;
(function (ChatMessageEntity) {
    ChatMessageEntity["MODEL"] = "model";
    ChatMessageEntity["USER"] = "user";
})(ChatMessageEntity || (ChatMessageEntity = {}));
export class FreestylerChatUi extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-freestyler-chat-ui`;
    #shadow = this.attachShadow({ mode: 'open' });
    #markdownRenderer = new MarkdownView.MarkdownView.MarkdownInsightRenderer();
    #props;
    constructor(props) {
        super();
        this.#props = props;
    }
    set props(props) {
        this.#props = props;
        this.#render();
    }
    connectedCallback() {
        this.#shadow.adoptedStyleSheets = [freestylerChatUiStyles];
        this.#render();
    }
    focusTextInput() {
        const input = this.#shadow.querySelector('.chat-input');
        if (!input) {
            return;
        }
        input.focus();
    }
    #handleSubmit = (ev) => {
        ev.preventDefault();
        const input = this.#shadow.querySelector('.chat-input');
        if (!input || !input.value) {
            return;
        }
        this.#props.onTextSubmit(input.value);
        input.value = '';
    };
    #handleCancel = (ev) => {
        ev.preventDefault();
        if (!this.#props.isLoading) {
            return;
        }
        this.#props.onCancelClick();
    };
    #renderRateButtons(rpcId) {
        // clang-format off
        return LitHtml.html `
      <div class="rate-buttons">
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-up',
            active: false,
            title: i18nString(TempUIStrings.thumbsUp),
            jslogContext: 'thumbs-up',
        }}
          @click=${() => this.#props.onRateClick(rpcId, "positive" /* Rating.POSITIVE */)}
        ></${Buttons.Button.Button.litTagName}>
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'thumb-down',
            active: false,
            title: i18nString(TempUIStrings.thumbsDown),
            jslogContext: 'thumbs-down',
        }}
          @click=${() => this.#props.onRateClick(rpcId, "negative" /* Rating.NEGATIVE */)}
        ></${Buttons.Button.Button.litTagName}>
      </div>`;
        // clang-format on
    }
    #renderTextAsMarkdown(text) {
        let tokens = [];
        try {
            tokens = Marked.Marked.lexer(text);
            for (const token of tokens) {
                // Try to render all the tokens to make sure that
                // they all have a template defined for them. If there
                // isn't any template defined for a token, we'll fallback
                // to rendering the text as plain text instead of markdown.
                this.#markdownRenderer.renderToken(token);
            }
        }
        catch (err) {
            // The tokens were not parsed correctly or
            // one of the tokens are not supported, so we
            // continue to render this as text.
            return LitHtml.html `${text}`;
        }
        // clang-format off
        return LitHtml.html `<${MarkdownView.MarkdownView.MarkdownView.litTagName}
      .data=${{ tokens, renderer: this.#markdownRenderer }}>
    </${MarkdownView.MarkdownView.MarkdownView.litTagName}>`;
        // clang-format on
    }
    #renderStep(step) {
        if (step.step === Step.ACTION) {
            // clang-format off
            return LitHtml.html `
        <div class="action-result">
          <${MarkdownView.CodeBlock.CodeBlock.litTagName}
            .code=${step.code.trim()}
            .codeLang=${'js'}
            .displayToolbar=${false}
          ></${MarkdownView.CodeBlock.CodeBlock.litTagName}>
          <div class="js-code-output">${step.output}</div>
        </div>
      `;
            // clang-format on
        }
        if (step.step === Step.ERROR) {
            return LitHtml.html `<p class="error-step">${this.#renderTextAsMarkdown(step.text)}</p>`;
        }
        return LitHtml.html `<p>${this.#renderTextAsMarkdown(step.text)}</p>`;
    }
    #renderChatMessage = (message, { isLast }) => {
        if (message.entity === ChatMessageEntity.USER) {
            return LitHtml.html `<div class="chat-message query">${message.text}</div>`;
        }
        // clang-format off
        return LitHtml.html `
      <div class="chat-message answer">
        ${message.steps.map(step => LitHtml.html `${this.#renderStep(step)}${step.rpcId !== undefined
            ? this.#renderRateButtons(step.rpcId)
            : LitHtml.nothing}`)}
        ${this.#props.isLoading && isLast
            ? LitHtml.html `<div class='chat-loading' >Loading...</div>`
            : LitHtml.nothing}
      </div>
    `;
        // clang-format on
    };
    #renderSelectAnElement = () => {
        // clang-format off
        return LitHtml.html `
      <${Buttons.Button.Button.litTagName} .data=${{
            variant: "text" /* Buttons.Button.Variant.TEXT */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'select-element',
            toggledIconName: 'select-element',
            toggleType: "primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */,
            toggled: this.#props.inspectElementToggled,
            title: i18nString(TempUIStrings.sendButtonTitle),
        }} @click=${this.#props.onInspectElementClick}>
        <span class="select-an-element-text">${i18nString(TempUIStrings.selectAnElement)}</span>
      </${Buttons.Button.Button.litTagName}>
    `;
        // clang-format on
    };
    #renderMessages = () => {
        // clang-format off
        return LitHtml.html `
      <div class="messages-container">
        ${this.#props.messages.map((message, _, array) => this.#renderChatMessage(message, { isLast: array.at(-1) === message }))}
      </div>
    `;
        // clang-format on
    };
    #renderEmptyState = () => {
        // clang-format off
        return LitHtml.html `<div class="empty-state-container">
      <${IconButton.Icon.Icon.litTagName} name="spark" style="width: 36px; height: 36px;"></${IconButton.Icon.Icon.litTagName}>
      ${i18nString(TempUIStrings.emptyStateText)}
    </div>`;
        // clang-format on
    };
    #renderChatUi = () => {
        // TODO(ergunsh): Show a better UI for the states where Aida client is not available.
        const isAidaAvailable = this.#props.aidaAvailability === Host.AidaClient.AidaAvailability.AVAILABLE;
        const isTextInputDisabled = !Boolean(this.#props.selectedNode) || !isAidaAvailable;
        // clang-format off
        return LitHtml.html `
      <div class="chat-ui">
        ${this.#props.messages.length > 0
            ? this.#renderMessages()
            : this.#renderEmptyState()}
        <form class="input-form" @submit=${this.#handleSubmit}>
          <div class="dom-node-link-container">
            ${this.#props.selectedNode
            ? LitHtml.Directives.until(Common.Linkifier.Linkifier.linkify(this.#props.selectedNode))
            : this.#renderSelectAnElement()}
          </div>
          <div class="chat-input-container">
            <input type="text" class="chat-input" .disabled=${isTextInputDisabled}
              placeholder=${getInputPlaceholderString(this.#props.aidaAvailability)}>
              ${this.#props.isLoading
            ? LitHtml.html `
                    <${Buttons.Button.Button.litTagName}
                      class="step-actions"
                      type="button"
                      title=${i18nString(TempUIStrings.cancelButtonTitle)}
                      aria-label=${i18nString(TempUIStrings.cancelButtonTitle)}
                      jslog=${VisualLogging.action('stop').track({ click: true })}
                      @click=${this.#handleCancel}
                      .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                iconName: 'stop',
                title: i18nString(TempUIStrings.cancelButtonTitle),
            }}
                    ></${Buttons.Button.Button.litTagName}>`
            : LitHtml.html `
                    <${Buttons.Button.Button.litTagName}
                      class="step-actions"
                      type="submit"
                      title=${i18nString(TempUIStrings.sendButtonTitle)}
                      aria-label=${i18nString(TempUIStrings.sendButtonTitle)}
                      jslog=${VisualLogging.action('send').track({ click: true })}
                      @click=${this.#handleSubmit}
                      .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                iconName: 'send',
                title: i18nString(TempUIStrings.sendButtonTitle),
            }}
                    ></${Buttons.Button.Button.litTagName}>`}
          </div>
          <span class="chat-input-disclaimer">${i18nString(TempUIStrings.inputDisclaimer)}</span>
        </form>
      </div>
    `;
        // clang-format on
    };
    #renderConsentView = () => {
        // clang-format off
        return LitHtml.html `
      <div class="consent-view">
        <h2 tabindex="-1">
          ${i18nString(TempUIStrings.consentScreenHeading)}
        </h2>
        <main>
          ${i18nString(TempUIStrings.consentTextAiDisclaimer)}
          <ul>
            <li>${i18nString(TempUIStrings.consentTextDataDisclaimer)}</li>
            <li>${i18nString(TempUIStrings.consentTextVisibilityDisclaimer)}</li>
          </ul>
          <${Buttons.Button.Button.litTagName}
            class="accept-button"
            @click=${this.#props.onAcceptConsentClick}
            .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept',
        }}>
            ${i18nString(TempUIStrings.acceptButtonTitle)}
          </${Buttons.Button.Button.litTagName}>
        </main>
      </div>
    `;
        // clang-format on
    };
    #render() {
        switch (this.#props.state) {
            case "chat-view" /* State.CHAT_VIEW */:
                LitHtml.render(this.#renderChatUi(), this.#shadow, { host: this });
                break;
            case "consent-view" /* State.CONSENT_VIEW */:
                LitHtml.render(this.#renderConsentView(), this.#shadow, { host: this });
                break;
        }
    }
}
customElements.define('devtools-freestyler-chat-ui', FreestylerChatUi);
//# sourceMappingURL=FreestylerChatUi.js.map