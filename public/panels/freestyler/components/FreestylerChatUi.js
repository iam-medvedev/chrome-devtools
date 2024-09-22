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
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
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
    inputPlaceholderForFreestylerAgent: 'Ask a question about the selected element',
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholderForDrJonesNetworkAgent: 'Ask a question about the selected network request',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForFreestylerAgent: 'Chat messages and any data the inspected page can access via Web APIs are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won\'t always get it right.',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimerForDrJonesNetworkAgent: 'Chat messages and the selected network request are sent to Google and may be seen by human reviewers to improve this feature. This is an experimental AI feature and won\'t always get it right.',
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
     *@description Text for the empty state of the AI assistant panel.
     */
    emptyStateText: 'How can I help you?',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    notLoggedIn: 'This feature is only available when you sign into Chrome with your Google account',
    /**
     * @description The error message when the user is not logged in into Chrome.
     */
    syncIsOff: 'This feature requires you to turn on Chrome sync',
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
     * @description Message shown when the user is offline.
     */
    offline: 'Check your internet connection and try again',
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
     * @description Side effect confirmation text for the button that says "Continue"
     */
    positiveSideEffectConfirmation: 'Continue',
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
    feedbackLink: 'Send feedback',
    /**
     *@description Button text for "Fix this issue" button
     */
    fixThisIssue: 'Fix this issue',
    /**
     *@description The generic name of the AI Assistant (do not translate)
     */
    aiAssistant: 'AI assistant',
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
};
// const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/FreestylerChatUi.ts', UIStrings);
// const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
/* eslint-disable  rulesdir/l10n_i18nString_call_only_with_uistrings */
const i18nString = i18n.i18n.lockedString;
function getInputPlaceholderString(aidaAvailability, agentType) {
    switch (aidaAvailability) {
        case "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */:
            switch (agentType) {
                case "freestyler" /* AgentType.FREESTYLER */:
                    return i18nString(UIStringsTemp.inputPlaceholderForFreestylerAgent);
                case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                    return i18nString(UIStringsTemp.inputPlaceholderForDrJonesNetworkAgent);
            }
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
    #isTextInputDisabled = () => {
        const isAidaAvailable = this.#props.aidaAvailability === "available" /* Host.AidaClient.AidaAccessPreconditions.AVAILABLE */;
        const showsSideEffects = this.#props.messages.some(message => {
            return message.entity === "model" /* ChatMessageEntity.MODEL */ && message.steps.some(step => {
                return Boolean(step.sideEffect);
            });
        });
        const isInputDisabledCheckForFreestylerAgent = !Boolean(this.#props.selectedElement) || showsSideEffects;
        const isInputDisabledCheckForDrJonesNetworkAgent = !Boolean(this.#props.selectedNetworkRequest);
        return (this.#props.agentType === "freestyler" /* AgentType.FREESTYLER */ && isInputDisabledCheckForFreestylerAgent) ||
            (this.#props.agentType === "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */ && isInputDisabledCheckForDrJonesNetworkAgent) ||
            !isAidaAvailable;
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
        const paused = step.sideEffect ? LitHtml.html `<span class="paused">${i18nString(UIStringsTemp.paused)}: </span>` :
            LitHtml.nothing;
        const actionTitle = step.title ?? `${i18nString(UIStringsTemp.investigating)}…`;
        return LitHtml.html `<span class="title">${paused}${actionTitle}</span>`;
    }
    #renderStepDetails(step, options) {
        const sideEffects = options.isLast && step.sideEffect ? this.#renderSideEffectConfirmationUi(step) : LitHtml.nothing;
        const thought = step.thought ? LitHtml.html `<p>${this.#renderTextAsMarkdown(step.thought)}</p>` : LitHtml.nothing;
        // If there is no "output" yet, it means we didn't execute the code yet (e.g. maybe it is still waiting for confirmation from the user)
        // thus we show "Code to execute" text rather than "Code executed" text on the heading of the code block.
        const codeHeadingText = (step.output && !step.canceled) ? i18nString(UIStringsTemp.codeExecuted) :
            i18nString(UIStringsTemp.codeToExecute);
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
            text: i18nString(UIStringsTemp.dataReturned),
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
                    text: i18nString(contextDetail.title),
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
      <p>${i18nString(UIStringsTemp.sideEffectConfirmationDescription)}</p>
      <div class="side-effect-buttons-container">
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
            jslogContext: 'decline-execute-code',
        }}
          @click=${() => sideEffectAction(false)}
        >${i18nString(UIStringsTemp.negativeSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
        <${Buttons.Button.Button.litTagName}
          .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept-execute-code',
            iconName: 'play',
        }}
          @click=${() => sideEffectAction(true)}
        >${i18nString(UIStringsTemp.positiveSideEffectConfirmation)}</${Buttons.Button.Button.litTagName}>
      </div>
    </div>`;
        // clang-format on
    }
    #renderError(message) {
        if (message.error) {
            let errorMessage;
            switch (message.error) {
                case "unknown" /* ErrorType.UNKNOWN */:
                    errorMessage = UIStringsTemp.systemError;
                    break;
                case "max-steps" /* ErrorType.MAX_STEPS */:
                    errorMessage = UIStringsTemp.maxStepsError;
                    break;
                case "abort" /* ErrorType.ABORT */:
                    return LitHtml.html `<p class="aborted" jslog=${VisualLogging.section('aborted')}>${i18nString(UIStringsTemp.stoppedResponse)}</p>`;
            }
            return LitHtml.html `<p class="error" jslog=${VisualLogging.section('error')}>${i18nString(errorMessage)}</p>`;
        }
        return LitHtml.nothing;
    }
    #renderChatMessage = (message, { isLast }) => {
        // TODO(b/365068104): Render user's message as markdown too.
        if (message.entity === "user" /* ChatMessageEntity.USER */) {
            const name = this.#props.userInfo.accountFullName || i18nString(UIStringsTemp.you);
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
        // clang-format off
        return LitHtml.html `
      <div class="chat-message answer" jslog=${VisualLogging.section('answer')}>
        <div class="message-info">
          <${IconButton.Icon.Icon.litTagName}
            name="smart-assistant"
          ></${IconButton.Icon.Icon.litTagName}>
          <div class="message-name">
            <span>${i18nString(UIStringsTemp.aiAssistant)}</span>
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
          ${message.suggestingFix && isLast
            ? LitHtml.html `<${Buttons.Button.Button.litTagName}
                  .data=${{
                variant: "outlined" /* Buttons.Button.Variant.OUTLINED */,
                jslogContext: 'fix-this-issue',
            }}
                  @click=${this.#props.onFixThisIssueClick}
                >${i18nString(UIStringsTemp.fixThisIssue)}</${Buttons.Button.Button.litTagName}>`
            : LitHtml.nothing}
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
            title: i18nString(UIStringsTemp.selectAnElement),
            jslogContext: 'select-element',
        }}
          @click=${this.#props.onInspectElementClick}
        ></${Buttons.Button.Button.litTagName}>
        <div class=${resourceClass}>${this.#props.selectedElement
            ? LitHtml.Directives.until(Common.Linkifier.Linkifier.linkify(this.#props.selectedElement))
            : LitHtml.html `<span>${i18nString(UIStringsTemp.noElementSelected)}</span>`}</div>
      </div>`;
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
          jslog=${VisualLogging.link('freestyler.feedback').track({
            click: true,
        })}>${i18nString(UIStringsTemp.feedbackLink)}</x-link>`;
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
        ${i18nString(UIStringsTemp.emptyStateText)}
      </div>
      <div class="suggestions">
        ${suggestions.map(suggestion => {
            return LitHtml.html `<${Buttons.Button.Button.litTagName}
            class="suggestion"
            @click=${() => this.#props.onTextSubmit(suggestion)}
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
                    'Why is the element not visible?',
                    'Why is this element overlapping another element?',
                    'How can I center this element?',
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
          placeholder=${getInputPlaceholderString(this.#props.aidaAvailability, this.#props.agentType)}
          jslog=${VisualLogging.textField('query').track({ keydown: 'Enter' })}></textarea>
          ${this.#props.isLoading
            ? LitHtml.html `<${Buttons.Button.Button.litTagName}
              class="chat-input-button"
              aria-label=${i18nString(UIStringsTemp.cancelButtonTitle)}
              @click=${this.#handleCancel}
              .data=${{
                variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                disabled: this.#isTextInputDisabled(),
                iconName: 'stop',
                title: i18nString(UIStringsTemp.cancelButtonTitle),
                jslogContext: 'stop',
            }}
            ></${Buttons.Button.Button.litTagName}>`
            : LitHtml.html `<${Buttons.Button.Button.litTagName}
              class="chat-input-button"
              aria-label=${i18nString(UIStringsTemp.sendButtonTitle)}
              .data=${{
                type: 'submit',
                variant: "icon" /* Buttons.Button.Variant.ICON */,
                size: "SMALL" /* Buttons.Button.Size.SMALL */,
                disabled: this.#isTextInputDisabled(),
                iconName: 'send',
                title: i18nString(UIStringsTemp.sendButtonTitle),
                jslogContext: 'send',
            }}
            ></${Buttons.Button.Button.litTagName}>`}
      </div>`;
        // clang-format on
    };
    #getDisclaimerText = () => {
        switch (this.#props.agentType) {
            case "freestyler" /* AgentType.FREESTYLER */:
                return UIStringsTemp.inputDisclaimerForFreestylerAgent;
            case "drjones-network-request" /* AgentType.DRJONES_NETWORK_REQUEST */:
                return UIStringsTemp.inputDisclaimerForDrJonesNetworkAgent;
        }
    };
    #renderChatUi = () => {
        // clang-format off
        return LitHtml.html `
      <div class="chat-ui">
        ${this.#props.messages.length > 0
            ? this.#renderMessages()
            : this.#renderEmptyState()}
        <form class="input-form" @submit=${this.#handleSubmit}>
          <div class="input-header">
            <div class="header-link-container">
              ${this.#renderSelection()}
            </div>
            <div class="header-link-container">
              ${this.#renderFeedbackLink()}
            </div>
          </div>
          ${this.#renderChatInput()}
        </form>
        <footer class="disclaimer">
          <p class="disclaimer-text">${i18nString(this.#getDisclaimerText())} See <x-link
              class="link"
              href=${DOGFOOD_INFO}
              jslog=${VisualLogging.link('freestyler.dogfood-info').track({
            click: true,
        })}
            >dogfood terms</x-link>.
          </p>
        </footer>
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
            <li>See <x-link
              class="link"
              href=${DOGFOOD_INFO}
              jslog=${VisualLogging.link('freestyler.dogfood-info').track({
            click: true,
        })}
            >dogfood terms</x-link>.</li>
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