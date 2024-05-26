// Copyright 2024 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as i18n from '../../../core/i18n/i18n.js';
import * as Buttons from '../../../ui/components/buttons/buttons.js';
import * as LitHtml from '../../../ui/lit-html/lit-html.js';
import * as VisualLogging from '../../../ui/visual_logging/visual_logging.js';
import freestylerChatUiStyles from './freestylerChatUi.css.js';
const UIStrings = {
    /**
     *@description Placeholder text for the chat UI input.
     */
    inputPlaceholder: 'Ask Freestyler or type / for commands',
    /**
     *@description Disclaimer text right after the chat input.
     */
    inputDisclaimer: 'Freestyler may display inaccurate information and may not get it right',
    /**
     *@description Title for the send icon button.
     */
    sendButtonTitle: 'Send',
    /**
     *@description Title of the button for accepting the privacy notice.
     */
    acceptButtonTitle: 'Accept',
};
const str_ = i18n.i18n.registerUIStrings('panels/freestyler/components/FreestylerChatUi.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
var ChatMessageEntity;
(function (ChatMessageEntity) {
    ChatMessageEntity["MODEL"] = "model";
    ChatMessageEntity["USER"] = "user";
})(ChatMessageEntity || (ChatMessageEntity = {}));
const EXAMPLE_MESSAGES = [
    {
        entity: ChatMessageEntity.USER,
        text: 'This is an example message',
    },
    {
        entity: ChatMessageEntity.MODEL,
        text: 'This is an example message',
    },
];
export class FreestylerChatUi extends HTMLElement {
    static litTagName = LitHtml.literal `devtools-freestyler-chat-ui`;
    #shadow = this.attachShadow({ mode: 'open' });
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
    #handleSubmit = (ev) => {
        ev.preventDefault();
        const input = this.#shadow.querySelector('.chat-input');
        if (!input) {
            return;
        }
        this.#props.onTextSubmit(input.value);
    };
    #renderConsentOnboarding = () => {
        // clang-format off
        return LitHtml.html `
      <h2 tabindex="-1" class="consent-onboarding-heading">
        Privacy Notice
      </h2>
      <main>
        TODO: content

        <div class="consent-buttons-container">
          <${Buttons.Button.Button.litTagName}
            class="next-button"
            @click=${this.#props.onAcceptPrivacyNotice}
            .data=${{
            variant: "primary" /* Buttons.Button.Variant.PRIMARY */,
            jslogContext: 'accept',
        }}
          >
            ${i18nString(UIStrings.acceptButtonTitle)}
          </${Buttons.Button.Button.litTagName}>
        </div>
      </main>
    `;
        // clang-format on
    };
    #renderChatMessage = (content, entity) => {
        const classes = LitHtml.Directives.classMap({
            'chat-message': true,
            'query': entity === ChatMessageEntity.USER,
            'answer': entity === ChatMessageEntity.MODEL,
        });
        return LitHtml.html `
      <div class=${classes}>
        ${content}
      </div>
    `;
    };
    #renderChatUi = () => {
        // clang-format off
        return LitHtml.html `
      <div class="chat-ui">
        <div class="messages-container">
          ${EXAMPLE_MESSAGES.map(message => this.#renderChatMessage(message.text, message.entity))}
        </div>
        <form class="input-form" @submit=${this.#handleSubmit}>
          <div class="chat-input-container">
            <input type="text" class="chat-input" autofocus
              placeholder=${i18nString(UIStrings.inputPlaceholder)}>
            <${Buttons.Button.Button.litTagName}
              class="step-actions"
              type="submit"
              title=${i18nString(UIStrings.sendButtonTitle)}
              aria-label=${i18nString(UIStrings.sendButtonTitle)}
              jslog=${VisualLogging.action('send').track({ click: true })}
              .data=${{
            variant: "icon" /* Buttons.Button.Variant.ICON */,
            size: "SMALL" /* Buttons.Button.Size.SMALL */,
            iconName: 'send',
            title: i18nString(UIStrings.sendButtonTitle),
        }}
            ></${Buttons.Button.Button.litTagName}>
          </div>
          <span class="chat-input-disclaimer">${i18nString(UIStrings.inputDisclaimer)}</span>
        </form>
      </div>
    `;
        // clang-format on
    };
    #render() {
        switch (this.#props.state) {
            case "consent" /* State.CONSENT_VIEW */:
                LitHtml.render(this.#renderConsentOnboarding(), this.#shadow, { host: this });
                break;
            case "chat" /* State.CHAT_VIEW */:
                LitHtml.render(this.#renderChatUi(), this.#shadow, { host: this });
                break;
        }
    }
}
customElements.define('devtools-freestyler-chat-ui', FreestylerChatUi);
//# sourceMappingURL=FreestylerChatUi.js.map