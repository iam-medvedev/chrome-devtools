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
import { ProvideFeedback } from './ProvideFeedback.js';
const DOGFOOD_FEEDBACK_URL = 'https://goo.gle/freestyler-feedback';
export const DOGFOOD_INFO = 'https://goo.gle/freestyler-dogfood';
/*
  * TODO(nvitkov): b/346933425
  * Temporary string that should not be translated
  * as they may change often during development.
  */
const UIStringsTemp = {
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholder: 'Ask a question about the selected element',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimer: 'Chat messages and data from this page will be sent to Google, reviewed by humans, and used to improve the feature. Do not use on pages with personal or sensitive information. Freestyler may display inaccurate information.',
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
    consentTextAiDisclaimer: 'This feature uses AI and might produce inaccurate information.',
    /**
     *@description Consent view data collection text
     */
    consentTextDataDisclaimer: 'Your inputs and the information from the page you are using this feature for are sent to Google.',
    /**
     *@description Consent view data collection text
     */
    consentTextDoNotUseDisclaimer: 'Do not use on pages with personal or sensitive information.',
    /**
     *@description Consent view data visibility text
     */
    consentTextVisibilityDisclaimer: 'Data may be seen by human reviewers and can be used to improve this feature.',
    /**
     * @description Side effect confirmation text
     */
    sideEffectConfirmationDescription: 'The code contains side effects. Do you wish to continue?',
    /**
     * @description Side effect confirmation text for the button that says "Execute"
     */
    positiveSideEffectConfirmation: 'Execute',
    /**
     * @description Side effect confirmation text for the button that says "Cancel"
     */
    negativeSideEffectConfirmation: 'Cancel',
    /**
     *@description Name of the dogfood program.
     */
    dogfood: 'Dogfood',
    /**
     *@description Link text for redirecting to feedback form
     */
    feedbackLink: 'Send Feedback',
    /**
     *@description Button text for "Fix this issue" button
     */
    fixThisIssue: 'Fix this issue',
};
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/FreestylerChatUi.ts', UIStrings);
// const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nString = i18n.i18n.lockedString;
function getInputPlaceholderString(aidaAvailability) {
    switch (aidaAvailability) {
        case "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */:
            return i18nString(UIStringsTemp.inputPlaceholder);
        case "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */:
            return i18nString(UIStringsTemp.notLoggedIn);
        case "no-active-sync" /* Host.AidaClient.AidaAccessPreconditions.NO_ACTIVE_SYNC */:
            return i18nString(UIStringsTemp.syncIsOff);
        case "no-internet" /* Host.AidaClient.AidaAccessPreconditions.NO_INTERNET */:
            return i18nString(UIStringsTemp.offline);
    }
}
// The model returns multiline code blocks in an erroneous way with the language being in new line.
// This renderer takes that into account and correctly updates the parsed multiline token with the language
// correctly identified and stripped from the content.
// Example:
// ```
// css <-- This should have been on the first line.
// * {
//   color: red;
// }
// ```
class MarkdownRendererWithCodeBlock extends MarkdownView.MarkdownView.MarkdownInsightRenderer {
    templateForToken(token) {
        if (token.type === 'code') {
            const lines = token.text.split('\n');
            if (lines[0]?.trim() === 'css') {
                token.lang = 'css';
                token.text = lines.slice(1).join('\n');
            }
        }
        return super.templateForToken(token);
    }
}
export class FreestylerChatUi extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-freestyler-chat-ui`;
    #shadow = this.attachShadow({ mode: 'open' });
    #markdownRenderer = new MarkdownRendererWithCodeBlock();
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
    scrollToLastMessage() {
        const message = this.#shadow.querySelector('.chat-message:last-child');
        if (!message) {
            return;
        }
        message.scrollIntoViewIfNeeded();
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
        return LitHtml.html `<${ProvideFeedback.litTagName}
      .props=${{
            onFeedbackSubmit: (rating, feedback) => {
                this.#props.onFeedbackSubmit(rpcId, rating, feedback);
            },
            canShowFeedbackForm: this.#props.canShowFeedbackForm,
        }}
      ></${ProvideFeedback.litTagName}>`;
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
            .displayNotice=${true}
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
    #renderSideEffectConfirmationUi(confirmSideEffectDialog) {
        // clang-format off
        return LitHtml.html `<div
      class="side-effect-confirmation"
      jslog=${VisualLogging.section('side-effect-confirmation')}
    >
      <p>${i18nString(UIStringsTemp.sideEffectConfirmationDescription)}</p>
      <${MarkdownView.CodeBlock.CodeBlock.litTagName}
        .code=${confirmSideEffectDialog.code}
        .codeLang=${'js'}
        .displayToolbar=${false}
      ></${MarkdownView.CodeBlock.CodeBlock.litTagName}>
      <div class="side-effect-buttons-container">
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept-execute-code',
        }}
          @click=${() => confirmSideEffectDialog.onAnswer(true)}
          >${i18nString(UIStringsTemp.positiveSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            jslogContext: 'decline-execute-code',
        }}
          @click=${() => confirmSideEffectDialog.onAnswer(false)}
        >${i18nString(UIStringsTemp.negativeSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
      </div>
    </div>`;
        // clang-format on
    }
    #renderChatMessage = (message, { isLast }) => {
        if (message.entity === "user" /* ChatMessageEntity.USER */) {
            return LitHtml.html `<div class="chat-message query" jslog=${VisualLogging.section('question')}>${message.text}</div>`;
        }
        const shouldShowFixThisIssueButton = !this.#props.isLoading && isLast && message.suggestingFix;
        const shouldShowRating = !isLast || (!this.#props.confirmSideEffectDialog && isLast);
        const shouldShowLoading = this.#props.isLoading && isLast && !this.#props.confirmSideEffectDialog;
        // clang-format off
        return LitHtml.html `
      <div class="chat-message answer" jslog=${VisualLogging.section('answer')}>
        ${message.steps.map(step => this.#renderStep(step))}
        ${this.#props.confirmSideEffectDialog && isLast
            ? this.#renderSideEffectConfirmationUi(this.#props.confirmSideEffectDialog)
            : LitHtml.nothing}
        <div class="actions">
          ${shouldShowRating && message.rpcId !== undefined
            ? this.#renderRateButtons(message.rpcId)
            : LitHtml.nothing}
          ${shouldShowFixThisIssueButton
            ? LitHtml.html `<${Buttons.Button.Button.litTagName}
                  .data=${{
                variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
                jslogContext: 'fix-this-issue',
            }}
                  @click=${this.#props.onFixThisIssueClick}
                >${i18nString(UIStringsTemp.fixThisIssue)}</${Buttons.Button.Button.litTagName}>`
            : LitHtml.nothing}
        </div>
        ${shouldShowLoading
            ? LitHtml.html `<div class="chat-loading">Loading...</div>`
            : LitHtml.nothing}
      </div>
    `;
        // clang-format on
    };
    #renderSelectAnElement = () => {
        const data = {
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'select-element',
            toggledIconName: 'select-element',
            toggleType: "primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */,
            toggled: this.#props.inspectElementToggled,
            title: i18nString(UIStringsTemp.selectAnElement),
            jslogContext: 'select-element',
        };
        // clang-format off
        return this.#props.selectedNode
            ? LitHtml.html `
        <${Buttons.Button.Button.litTagName}
          .data=${{
                variant: "icon_toggle" /* Buttons.Button.Variant.ICON_TOGGLE */,
                ...data,
            }}
          @click=${this.#props.onInspectElementClick}
        ></${Buttons.Button.Button.litTagName}>
        ${LitHtml.Directives.until(Common.Linkifier.Linkifier.linkify(this.#props.selectedNode))}`
            : LitHtml.html `
        <${Buttons.Button.Button.litTagName}
          .data=${{
                variant: "text" /* Buttons.Button.Variant.TEXT */,
                ...data,
            }}
          @click=${this.#props.onInspectElementClick}
        ><span class="select-an-element-text">${i18nString(UIStringsTemp.selectAnElement)}</span></${Buttons.Button.Button.litTagName}>`;
        // clang-format on
    };
    #renderFeedbackLink = () => {
        // clang-format off
        return LitHtml.html `
        <${IconButton.Icon.Icon.litTagName}
          name="dog-paw"
          class="feedback-icon"
        ></${IconButton.Icon.Icon.litTagName}>
        <span>${i18nString(UIStringsTemp.dogfood)}</span>
        <span>-</span>
        <x-link href=${DOGFOOD_FEEDBACK_URL}
          class="link"
          jslog=${VisualLogging.action('freestyler.feedback').track({
            click: true,
        })}>
         ${i18nString(UIStringsTemp.feedbackLink)}
        </x-link>`;
        // clang-format on
    };
    #renderMessages = () => {
        // clang-format off
        return LitHtml.html `
      <div class="messages-scroll-container">
        <div class="messages-container">
          ${this.#props.messages.map((message, _, array) => this.#renderChatMessage(message, { isLast: array.at(-1) === message }))}
        </div>
      </div>
    `;
        // clang-format on
    };
    #renderEmptyState = () => {
        // clang-format off
        return LitHtml.html `<div class="empty-state-container">
      <${IconButton.Icon.Icon.litTagName} name="spark" style="width: 36px; height: 36px;"></${IconButton.Icon.Icon.litTagName}>
      ${i18nString(UIStringsTemp.emptyStateText)}
    </div>`;
        // clang-format on
    };
    #renderChatUi = () => {
        // TODO(ergunsh): Show a better UI for the states where Aida client is not available.
        const isAidaAvailable = this.#props.aidaAvailability === "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */;
        const isInputDisabled = !Boolean(this.#props.selectedNode) || !isAidaAvailable || Boolean(this.#props.confirmSideEffectDialog);
        // clang-format off
        return LitHtml.html `
      <div class="chat-ui">
        ${this.#props.messages.length > 0
            ? this.#renderMessages()
            : this.#renderEmptyState()}
        <form class="input-form" @submit=${this.#handleSubmit}>
          <div class="input-header">
            <div class="header-link-container">
              ${this.#renderSelectAnElement()}
            </div>
            <div class="header-link-container">
              ${this.#renderFeedbackLink()}
            </div>
          </div>
          <div class="chat-input-container">
            <input type="text" class="chat-input" .disabled=${isInputDisabled}
              placeholder=${getInputPlaceholderString(this.#props.aidaAvailability)}
              jslog=${VisualLogging.textField('query').track({ change: true })}
            >${this.#props.isLoading
            ? LitHtml.html `
                    <${Buttons.Button.Button.litTagName}
                      class="step-actions"
                      aria-label=${i18nString(UIStringsTemp.cancelButtonTitle)}
                      @click=${this.#handleCancel}
                      .data=${{
                variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                disabled: isInputDisabled,
                iconName: 'stop',
                title: i18nString(UIStringsTemp.cancelButtonTitle),
                jslogContext: 'stop',
            }}
                    ></${Buttons.Button.Button.litTagName}>`
            : LitHtml.html `
                    <${Buttons.Button.Button.litTagName}
                      class="step-actions"
                      aria-label=${i18nString(UIStringsTemp.sendButtonTitle)}
                      .data=${{
                type: 'submit',
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                disabled: isInputDisabled,
                iconName: 'send',
                title: i18nString(UIStringsTemp.sendButtonTitle),
                jslogContext: 'send',
            }}
                    ></${Buttons.Button.Button.litTagName}>`}
          </div>
          <span class="chat-input-disclaimer">${i18nString(UIStringsTemp.inputDisclaimer)} See <x-link class="link" href=${DOGFOOD_INFO}>dogfood terms</x-link>.</span>
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
          ${i18nString(UIStringsTemp.consentScreenHeading)}
        </h2>
        <main>
          ${i18nString(UIStringsTemp.consentTextAiDisclaimer)}
          <ul>
            <li>${i18nString(UIStringsTemp.consentTextDataDisclaimer)}</li>
            <li>${i18nString(UIStringsTemp.consentTextVisibilityDisclaimer)}</li>
            <li>${i18nString(UIStringsTemp.consentTextDoNotUseDisclaimer)}</li>
            <li>See <x-link class="link" href=${DOGFOOD_INFO}>dogfood terms</x-link>.</li>
          </ul>
          <${Buttons.Button.Button.litTagName}
            class="accept-button"
            @click=${this.#props.onAcceptConsentClick}
            .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept',
        }}
          >${i18nString(UIStringsTemp.acceptButtonTitle)}</${Buttons.Button.Button.litTagName}>
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
export const FOR_TEST = {
    MarkdownRendererWithCodeBlock,
};
customElements.define('devtools-freestyler-chat-ui', FreestylerChatUi);
//# sourceMappingURL=FreestylerChatUi.js.map