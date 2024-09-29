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
import * as Spinners from '../../../ui/components/spinners/spinners.js';
import * as UI from '../../../ui/legacy/legacy.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import freestylerChatUiStyles from './freestylerChatUi.css.js';
import { ProvideFeedback } from './ProvideFeedback.js';
const UIStrings = {
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    notLoggedIn: 'This feature is only available when you sign into Chrome with your Google account',
    /**
     * @description Message shown when the user is offline.
     */
    offline: 'Check your internet connection and try again',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForEmptyState: 'This is an experimental AI feature and won\'t always get it right.',
    /**
     * @description Text for a link to Chrome DevTools Settings.
     */
    settingsLink: 'AI assistance in Settings',
    /**
     * @description Placeholder text for an inactive text field. When active, it's used for the user's input to the GenAI assistance.
     */
    followTheSteps: 'Follow the steps above to ask a question',
    /**
     *@description Text for asking the user to turn the AI assistance feature in settings first before they are able to use it.
     *@example {AI assistance in Settings} PH1
     */
    turnOnForStyles: 'Turn on {PH1} to get help with understanding CSS styles',
};
/*
* Strings that don't need to be translated at this time.
*/
const UIStringsNotTranslate = {
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForFreestylerAgent: 'Chat messages and any data the inspected page can access via Web APIs are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForDrJonesNetworkAgent: 'Chat messages and the selected call stack are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won’t always get it right.',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForFreestylerAgent: 'Ask a question about the selected element',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForDrJonesNetworkAgent: 'Ask a question about the selected network request',
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
     *@description Label for the "select an element" button.
     */
    noElementSelected: 'No element selected',
    /**
     *@description Text for the empty state of the AI assistance panel.
     */
    emptyStateText: 'How can I help you?',
    /**
     * @description The error message when the LLM loop is stopped for some reason (Max steps reached or request to LLM failed)
     */
    systemError: 'Something unforeseen happened and I can no longer continue. Try your request again and see if that resolves the issue.',
    /**
     * @description The error message when the LLM loop is stopped for some reason (Max steps reached or request to LLM failed)
     */
    maxStepsError: 'Seems like I am stuck with the investigation. It would be better if you start over.',
    /**
     *@description Displayed when the user stop the response
     */
    stoppedResponse: 'You stopped this response',
    /**
     * @description Side effect confirmation text
     */
    sideEffectConfirmationDescription: 'The code contains side effects. Do you wish to continue?',
    /**
     * @description Side effect confirmation text for the button that says "Continue"
     */
    positiveSideEffectConfirmation: 'Continue',
    /**
     * @description Side effect confirmation text for the button that says "Cancel"
     */
    negativeSideEffectConfirmation: 'Cancel',
    /**
     *@description Link text for redirecting to feedback form
     */
    feedbackLink: 'Send feedback',
    /**
     *@description Button text for "Fix this issue" button
     */
    fixThisIssue: 'Fix this issue',
    /**
     *@description The generic name of the AI assistance (do not translate)
     */
    aiAssistance: 'AI assistance',
    /**
     *@description The fallback text when we can't find the user full name
     */
    you: 'You',
    /**
     *@description The fallback text when a step has no title yet
     */
    investigating: 'Investigating',
    /**
     *@description Prefix to the title of each thinking step of a user action is required to continue
     */
    paused: 'Paused',
    /**
     *@description Heading text for the code block that shows the executed code.
     */
    codeExecuted: 'Code executed',
    /**
     *@description Heading text for the code block that shows the code to be executed after side effect confirmation.
     */
    codeToExecute: 'Code to execute',
    /**
     *@description Heading text for the code block that shows the returned data.
     */
    dataReturned: 'Data returned',
    /**
     *@description The footer disclaimer that links to more information about the AI feature.
     */
    learnAbout: 'Learn about AI in DevTools',
    /**
     * @description Text for a link to Chrome DevTools Settings.
     */
    settingsLink: 'AI assistance in Settings',
    /**
     * @description Placeholder text for an inactive text field. When active, it's used for the user's input to the GenAI assistance.
     */
    followTheSteps: 'Follow the steps above to ask a question',
};
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/FreestylerChatUi.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
const lockedString = i18n.i18n.lockedString;
function getInputPlaceholderString(aidaAvailability, agentType, state) {
    if (state === "consent-view" /* State.CONSENT_VIEW */) {
        return i18nString(UIStrings.followTheSteps);
    }
    switch (aidaAvailability) {
        case "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */:
            switch (agentType) {
                case "freestyler" /* AgentType.FREESTYLER */:
                    return lockedString(UIStringsNotTranslate.inputPlaceholderForFreestylerAgent);
                case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                    return lockedString(UIStringsNotTranslate.inputPlaceholderForDrJonesNetworkAgent);
            }
        case "no-account-email" /* Host.AidaClient.AidaAccessPreconditions.NO_ACCOUNT_EMAIL */:
        case "sync-is-paused" /* Host.AidaClient.AidaAccessPreconditions.SYNC_IS_PAUSED */:
            return i18nString(UIStrings.notLoggedIn);
        case "no-internet" /* Host.AidaClient.AidaAccessPreconditions.NO_INTERNET */:
            return i18nString(UIStrings.offline);
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
    #scrollTop;
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
        const textArea = this.#shadow.querySelector('.chat-input');
        if (!textArea) {
            return;
        }
        textArea.focus();
    }
    restoreScrollPosition() {
        if (this.#scrollTop === undefined) {
            return;
        }
        const scrollContainer = this.#shadow.querySelector('.messages-scroll-container');
        if (!scrollContainer) {
            return;
        }
        scrollContainer.scrollTop = this.#scrollTop;
    }
    scrollToLastMessage() {
        const message = this.#shadow.querySelector('.chat-message:last-child');
        if (!message) {
            return;
        }
        message.scrollIntoViewIfNeeded();
    }
    #setInputText(text) {
        const textArea = this.#shadow.querySelector('.chat-input');
        if (!textArea) {
            return;
        }
        textArea.value = text;
    }
    #isTextInputDisabled = () => {
        const isAidaAvailable = this.#props.aidaAvailability === "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */;
        const isConsentView = this.#props.state === "consent-view" /* State.CONSENT_VIEW */;
        const showsSideEffects = this.#props.messages.some(message => {
            return message.entity === "model" /* ChatMessageEntity.MODEL */ && message.steps.some(step => {
                return Boolean(step.sideEffect);
            });
        });
        const isInputDisabledCheckForFreestylerAgent = !Boolean(this.#props.selectedElement) || showsSideEffects;
        const isInputDisabledCheckForDrJonesNetworkAgent = !Boolean(this.#props.selectedNetworkRequest);
        return (this.#props.agentType === "freestyler" /* AgentType.FREESTYLER */ && isInputDisabledCheckForFreestylerAgent) ||
            (this.#props.agentType === "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */ && isInputDisabledCheckForDrJonesNetworkAgent) ||
            !isAidaAvailable || isConsentView;
    };
    #handleScroll = (ev) => {
        if (!ev.target || !(ev.target instanceof HTMLElement)) {
            return;
        }
        this.#scrollTop = ev.target.scrollTop;
    };
    #handleSubmit = (ev) => {
        ev.preventDefault();
        const textArea = this.#shadow.querySelector('.chat-input');
        if (!textArea || !textArea.value) {
            return;
        }
        this.#props.onTextSubmit(textArea.value);
        textArea.value = '';
    };
    #handleTextAreaKeyDown = (ev) => {
        if (!ev.target || !(ev.target instanceof HTMLTextAreaElement)) {
            return;
        }
        if (ev.key === 'Enter' && !ev.shiftKey) {
            // Do not go to a new line whenver Shift + Enter is pressed.
            ev.preventDefault();
            // Only submit the text when there isn't a request already in flight.
            if (!this.#props.isLoading) {
                this.#props.onTextSubmit(ev.target.value);
                ev.target.value = '';
            }
        }
    };
    #handleCancel = (ev) => {
        ev.preventDefault();
        if (!this.#props.isLoading) {
            return;
        }
        this.#props.onCancelClick();
    };
    #handleSuggestionClick = (suggestion) => {
        this.#setInputText(suggestion);
        this.focusTextInput();
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
    #renderTitle(step) {
        const paused = step.sideEffect ?
            LitHtml.html `<span class="paused">${lockedString(UIStringsNotTranslate.paused)}: </span>` :
            LitHtml.nothing;
        const actionTitle = step.title ?? `${lockedString(UIStringsNotTranslate.investigating)}…`;
        return LitHtml.html `<span class="title">${paused}${actionTitle}</span>`;
    }
    #renderStepDetails(step, options) {
        const sideEffects = options.isLast && step.sideEffect ? this.#renderSideEffectConfirmationUi(step) : LitHtml.nothing;
        const thought = step.thought ? LitHtml.html `<p>${this.#renderTextAsMarkdown(step.thought)}</p>` : LitHtml.nothing;
        // If there is no "output" yet, it means we didn't execute the code yet (e.g. maybe it is still waiting for confirmation from the user)
        // thus we show "Code to execute" text rather than "Code executed" text on the heading of the code block.
        const codeHeadingText = (step.output && !step.canceled) ? lockedString(UIStringsNotTranslate.codeExecuted) :
            lockedString(UIStringsNotTranslate.codeToExecute);
        // If there is output, we don't show notice on this code block and instead show
        // it in the data returned code block.
        // clang-format off
        const code = step.code ? LitHtml.html `<div class="action-result">
        <${MarkdownView.CodeBlock.CodeBlock.litTagName}
          .code=${step.code.trim()}
          .codeLang=${'js'}
          .displayToolbar=${false}
          .displayNotice=${!Boolean(step.output)}
          .heading=${{
            text: codeHeadingText,
            showCopyButton: true,
        }}
        ></${MarkdownView.CodeBlock.CodeBlock.litTagName}>
    </div>` : LitHtml.nothing;
        const output = step.output ? LitHtml.html `<div class="js-code-output">
      <${MarkdownView.CodeBlock.CodeBlock.litTagName}
        .code=${step.output}
        .codeLang=${'js'}
        .displayToolbar=${false}
        .displayNotice=${true}
        .heading=${{
            text: lockedString(UIStringsNotTranslate.dataReturned),
            showCopyButton: false,
        }}
      ></${MarkdownView.CodeBlock.CodeBlock.litTagName}>
    </div>` : LitHtml.nothing;
        const contextDetails = step.contextDetails && step.contextDetails?.length > 0 ?
            LitHtml.html `${LitHtml.Directives.repeat(step.contextDetails, contextDetail => {
                return LitHtml.html `<div class="context-details">
        <${MarkdownView.CodeBlock.CodeBlock.litTagName}
          .code=${contextDetail.text}
          .codeLang=${'js'}
          .displayToolbar=${false}
          .displayNotice=${false}
          .heading=${{
                    text: contextDetail.title,
                    showCopyButton: true,
                }}
        ></${MarkdownView.CodeBlock.CodeBlock.litTagName}>
      </div>`;
            })}` : LitHtml.nothing;
        return LitHtml.html `<div class="step-details">
      ${thought}
      ${code}
      ${sideEffects}
      ${output}
      ${contextDetails}
    </div>`;
        // clang-format on
    }
    #renderStepBadge(step, options) {
        if (this.#props.isLoading && options.isLast && !step.sideEffect) {
            return LitHtml.html `<${Spinners.Spinner.Spinner.litTagName}></${Spinners.Spinner.Spinner.litTagName}>`;
        }
        let iconName = 'checkmark';
        if (options.isLast && step.sideEffect) {
            iconName = 'pause-circle';
        }
        else if (step.canceled) {
            iconName = 'cross';
        }
        return LitHtml.html `<${IconButton.Icon.Icon.litTagName}
        class="indicator"
        .name=${iconName}
      ></${IconButton.Icon.Icon.litTagName}>`;
    }
    #renderStep(step, options) {
        const stepClasses = LitHtml.Directives.classMap({
            step: true,
            empty: !step.thought && !step.code,
            paused: Boolean(step.sideEffect),
            canceled: Boolean(step.canceled),
        });
        // clang-format off
        return LitHtml.html `
      <details class=${stepClasses}
        jslog=${VisualLogging.section('step')}
        .open=${Boolean(step.sideEffect)}>
        <summary>
          <div class="summary">
            ${this.#renderStepBadge(step, options)}
            ${this.#renderTitle(step)}
            <${IconButton.Icon.Icon.litTagName}
              class="arrow"
              .name=${'chevron-down'}
            ></${IconButton.Icon.Icon.litTagName}>
          </div>
        </summary>
        ${this.#renderStepDetails(step, {
            isLast: options.isLast,
        })}
      </details>`;
        // clang-format on
    }
    #renderSideEffectConfirmationUi(step) {
        if (!step.sideEffect) {
            return LitHtml.nothing;
        }
        const sideEffectAction = step.sideEffect.onAnswer;
        // clang-format off
        return LitHtml.html `<div
      class="side-effect-confirmation"
      jslog=${VisualLogging.section('side-effect-confirmation')}
    >
      <p>${lockedString(UIStringsNotTranslate.sideEffectConfirmationDescription)}</p>
      <div class="side-effect-buttons-container">
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            jslogContext: 'decline-execute-code',
        }}
          @click=${() => sideEffectAction(false)}
        >${lockedString(UIStringsNotTranslate.negativeSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept-execute-code',
            iconName: 'play',
        }}
          @click=${() => sideEffectAction(true)}
        >${lockedString(UIStringsNotTranslate.positiveSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
      </div>
    </div>`;
        // clang-format on
    }
    #renderError(message) {
        if (message.error) {
            let errorMessage;
            switch (message.error) {
                case "unknown" /* ErrorType.UNKNOWN */:
                    errorMessage = UIStringsNotTranslate.systemError;
                    break;
                case "max-steps" /* ErrorType.MAX_STEPS */:
                    errorMessage = UIStringsNotTranslate.maxStepsError;
                    break;
                case "abort" /* ErrorType.ABORT */:
                    return LitHtml.html `<p class="aborted" jslog=${VisualLogging.section('aborted')}>${lockedString(UIStringsNotTranslate.stoppedResponse)}</p>`;
            }
            return LitHtml.html `<p class="error" jslog=${VisualLogging.section('error')}>${lockedString(errorMessage)}</p>`;
        }
        return LitHtml.nothing;
    }
    #renderChatMessage = (message, { isLast }) => {
        if (message.entity === "user" /* ChatMessageEntity.USER */) {
            const name = this.#props.userInfo.accountFullName || lockedString(UIStringsNotTranslate.you);
            const image = this.#props.userInfo.accountImage ?
                LitHtml.html `<img src="data:image/png;base64, ${this.#props.userInfo.accountImage}" alt="Account avatar" />` :
                LitHtml.html `<${IconButton.Icon.Icon.litTagName}
            .name=${'profile'}
          ></${IconButton.Icon.Icon.litTagName}>`;
            // clang-format off
            return LitHtml.html `<div
        class="chat-message query"
        jslog=${VisualLogging.section('question')}
      >
        <div class="message-info">
          ${image}
          <div class="message-name">
            <span>${name}</span>
          </div>
        </div>
        <div class="message-content">${this.#renderTextAsMarkdown(message.text)}</div>
      </div>`;
            // clang-format on
        }
        const shouldShowSuggestions = (isLast && !this.#props.isLoading && message.suggestions?.length > 0);
        // clang-format off
        return LitHtml.html `
      <div class="chat-message answer" jslog=${VisualLogging.section('answer')}>
        <div class="message-info">
          <${IconButton.Icon.Icon.litTagName}
            name="smart-assistant"
          ></${IconButton.Icon.Icon.litTagName}>
          <div class="message-name">
            <span>${lockedString(UIStringsNotTranslate.aiAssistance)}</span>
          </div>
        </div>
        ${LitHtml.Directives.repeat(message.steps, (_, index) => index, step => {
            return this.#renderStep(step, {
                isLast: [...message.steps.values()].at(-1) === step && isLast,
            });
        })}
        ${message.answer
            ? LitHtml.html `<p>${this.#renderTextAsMarkdown(message.answer)}</p>`
            : LitHtml.nothing}
        ${this.#renderError(message)}
        <div class="actions">
          ${message.rpcId !== undefined
            ? this.#renderRateButtons(message.rpcId)
            : LitHtml.nothing}
          ${shouldShowSuggestions ?
            LitHtml.html `<div class="suggestions">
              ${message.suggestions.map(suggestion => LitHtml.html `<${Buttons.Button.Button.litTagName}
                  .data=${{
                variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
                jslogContext: 'fix-this-issue',
            }}
                  @click=${() => this.#handleSuggestionClick(suggestion)}
                >${suggestion}</${Buttons.Button.Button.litTagName}>`)}
            </div>` : LitHtml.nothing}
        </div>
      </div>
    `;
        // clang-format on
    };
    #renderSelection() {
        switch (this.#props.agentType) {
            case "freestyler" /* AgentType.FREESTYLER */:
                return this.#renderSelectAnElement();
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                return this.#renderSelectedNetworkRequest();
        }
    }
    #renderSelectedNetworkRequest = () => {
        const resourceClass = LitHtml.Directives.classMap({
            'not-selected': !this.#props.selectedNetworkRequest,
            'resource-link': true,
        });
        // clang-format off
        return LitHtml.html `<div class="select-element">
      <div class=${resourceClass}
      @click=${this.#props.onSelectedNetworkRequestClick}>
        <${IconButton.Icon.Icon.litTagName} name="file-script"></${IconButton.Icon.Icon.litTagName}>
        ${this.#props.selectedNetworkRequest?.name()}
      </div></div>`;
        // clang-format on
    };
    #renderSelectAnElement = () => {
        const resourceClass = LitHtml.Directives.classMap({
            'not-selected': !this.#props.selectedElement,
            'resource-link': true,
        });
        // clang-format off
        return LitHtml.html `
      <div class="select-element">
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "icon_toggle" /* Buttons.Button.Variant.ICON_TOGGLE */,
            size: "REGULAR" /* Buttons.Button.Size.REGULAR */,
            iconName: 'select-element',
            toggledIconName: 'select-element',
            toggleType: "primary-toggle" /* Buttons.Button.ToggleType.PRIMARY */,
            toggled: this.#props.inspectElementToggled,
            title: lockedString(UIStringsNotTranslate.selectAnElement),
            jslogContext: 'select-element',
        }}
          @click=${this.#props.onInspectElementClick}
        ></${Buttons.Button.Button.litTagName}>
        <div class=${resourceClass}>${this.#props.selectedElement
            ? LitHtml.Directives.until(Common.Linkifier.Linkifier.linkify(this.#props.selectedElement))
            : LitHtml.html `<span>${lockedString(UIStringsNotTranslate.noElementSelected)}</span>`}</div>
      </div>`;
        // clang-format on
    };
    #renderMessages = () => {
        // clang-format off
        return LitHtml.html `
      <div class="messages-scroll-container" @scroll=${this.#handleScroll}>
        <div class="messages-container">
          ${this.#props.messages.map((message, _, array) => this.#renderChatMessage(message, {
            isLast: array.at(-1) === message,
        }))}
        </div>
      </div>
    `;
        // clang-format on
    };
    #renderEmptyState = () => {
        const suggestions = this.#getSuggestions();
        // clang-format off
        return LitHtml.html `<div class="empty-state-container messages-scroll-container">
      <div class="header">
        <div class="icon">
          <${IconButton.Icon.Icon.litTagName}
            name="smart-assistant"
          ></${IconButton.Icon.Icon.litTagName}>
        </div>
        ${lockedString(UIStringsNotTranslate.emptyStateText)}
      </div>
      <div class="suggestions">
        ${suggestions.map(suggestion => {
            return LitHtml.html `<${Buttons.Button.Button.litTagName}
            class="suggestion"
            @click=${() => this.#handleSuggestionClick(suggestion)}
            .data=${{
                variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
                size: "REGULAR" /* Buttons.Button.Size.REGULAR */,
                title: suggestion,
                jslogContext: 'suggestion',
                disabled: this.#isTextInputDisabled(),
            }}
          >${suggestion}</${Buttons.Button.Button.litTagName}>`;
        })}
      </div>
    </div>`;
        // clang-format on
    };
    #getSuggestions = () => {
        switch (this.#props.agentType) {
            case "freestyler" /* AgentType.FREESTYLER */:
                return [
                    'Why isn’t this element visible?',
                    'Why does this element overlap another?',
                    'How do I center this element?',
                ];
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                return [
                    'Why is this network request taking longer to complete?',
                ];
        }
    };
    #renderChatInput = () => {
        // clang-format off
        return LitHtml.html `
      <div class="chat-input-container">
        <textarea class="chat-input"
          .disabled=${this.#isTextInputDisabled()}
          wrap="hard"
          @keydown=${this.#handleTextAreaKeyDown}
          placeholder=${getInputPlaceholderString(this.#props.aidaAvailability, this.#props.agentType, this.#props.state)}
          jslog=${VisualLogging.textField('query').track({ keydown: 'Enter' })}></textarea>
          ${this.#props.isLoading
            ? LitHtml.html `<${Buttons.Button.Button.litTagName}
              class="chat-input-button"
              aria-label=${lockedString(UIStringsNotTranslate.cancelButtonTitle)}
              @click=${this.#handleCancel}
              .data=${{
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "REGULAR" /* Buttons.Button.Size.REGULAR */,
                disabled: this.#isTextInputDisabled(),
                iconName: 'record-stop',
                title: lockedString(UIStringsNotTranslate.cancelButtonTitle),
                jslogContext: 'stop',
            }}
            ></${Buttons.Button.Button.litTagName}>`
            : LitHtml.html `<${Buttons.Button.Button.litTagName}
              class="chat-input-button"
              aria-label=${lockedString(UIStringsNotTranslate.sendButtonTitle)}
              .data=${{
                type: 'submit',
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "REGULAR" /* Buttons.Button.Size.REGULAR */,
                disabled: this.#isTextInputDisabled(),
                iconName: 'send',
                title: lockedString(UIStringsNotTranslate.sendButtonTitle),
                jslogContext: 'send',
            }}
            ></${Buttons.Button.Button.litTagName}>`}
      </div>`;
        // clang-format on
    };
    #getDisclaimerText = () => {
        if (this.#props.state === "consent-view" /* State.CONSENT_VIEW */) {
            return i18nString(UIStrings.inputDisclaimerForEmptyState);
        }
        switch (this.#props.agentType) {
            case "freestyler" /* AgentType.FREESTYLER */:
                return lockedString(UIStringsNotTranslate.inputDisclaimerForFreestylerAgent);
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                return lockedString(UIStringsNotTranslate.inputDisclaimerForDrJonesNetworkAgent);
        }
    };
    #renderOptIn() {
        const settingsLink = document.createElement('button');
        settingsLink.textContent = i18nString(UIStrings.settingsLink);
        settingsLink.classList.add('link');
        UI.ARIAUtils.markAsLink(settingsLink);
        settingsLink.addEventListener('click', () => {
            void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
        });
        settingsLink.setAttribute('jslog', `${VisualLogging.action('open-ai-settings').track({ click: true })}`);
        // clang-format off
        return LitHtml.html `
      <div class="empty-state-container">
        <div class="opt-in">
          <div class="opt-in-icon-container">
            <${IconButton.Icon.Icon.litTagName} .data=${{
            iconName: 'smart-assistant',
            width: 'var(--sys-size-8)',
            height: 'var(--sys-size-8)',
        }}>
          </div>
          <div>
            ${i18n.i18n.getFormatLocalizedString(str_, UIStrings.turnOnForStyles, { PH1: settingsLink })}
          </div>
        </div>
      </div>
    `;
        // clang-format on
    }
    #render() {
        // clang-format off
        LitHtml.render(LitHtml.html `
      <div class="chat-ui">
        ${this.#props.state === "consent-view" /* State.CONSENT_VIEW */ ? this.#renderOptIn()
            : (this.#props.messages.length > 0
                ? this.#renderMessages()
                : this.#renderEmptyState())}
        <form class="input-form" @submit=${this.#handleSubmit}>
          ${this.#props.state !== "consent-view" /* State.CONSENT_VIEW */ ? LitHtml.html `
            <div class="input-header">
              <div class="header-link-container">
                ${this.#renderSelection()}
              </div>
            </div>
          ` : LitHtml.nothing}
          ${this.#renderChatInput()}
        </form>
        <footer class="disclaimer">
          <p class="disclaimer-text">${lockedString(this.#getDisclaimerText())} <x-link
              href="#"
              class="link"
              jslog=${VisualLogging.link('open-ai-settings').track({
            click: true,
        })}
              @click=${(event) => {
            event.preventDefault();
            void UI.ViewManager.ViewManager.instance().showView('chrome-ai');
        }}
            >${lockedString(UIStringsNotTranslate.learnAbout)}</x-link>
          </p>
        </footer>
      </div>
    `, this.#shadow, { host: this });
        // clang-format on
    }
}
export const FOR_TEST = {
    MarkdownRendererWithCodeBlock,
};
customElements.define('devtools-freestyler-chat-ui', FreestylerChatUi);
//# sourceMappingURL=FreestylerChatUi.js.map